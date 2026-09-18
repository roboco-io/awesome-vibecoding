import { copyFile, mkdir, readFile, writeFile, lstat } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { DatabaseSync } from "node:sqlite";

// Work on a private copy. Failed agent runs must not publish cache/queue mutations.
export class ResearchStore {
  constructor(db, scratch, target) {
    this.db = db; this.scratch = scratch; this.target = target;
    this.hits = 0; this.misses = 0; this.queued = 0;
  }

  static async open(cwd, scratchDir) {
    const target = join(cwd, ".cache", "awesome-vibecoding.db");
    const scratch = join(scratchDir, `research-${randomUUID()}.db`);
    try {
      const stat = await lstat(target);
      if (!stat.isFile() || stat.isSymbolicLink()) throw new Error("Research cache must be a regular file");
      await copyFile(target, scratch);
    } catch (error) { if (error.code !== "ENOENT") throw error; }
    const db = new DatabaseSync(scratch);
    db.exec(`
      CREATE TABLE IF NOT EXISTS search_cache (query TEXT NOT NULL, source TEXT NOT NULL, response TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')), ttl_days INTEGER NOT NULL DEFAULT 7, PRIMARY KEY (query, source));
      CREATE TABLE IF NOT EXISTS candidate_queue (url TEXT PRIMARY KEY, name TEXT NOT NULL, category TEXT, description TEXT, source TEXT, discovered_at TEXT NOT NULL DEFAULT (datetime('now')), status TEXT NOT NULL DEFAULT 'pending', reject_reason TEXT, CHECK (status IN ('pending','added','rejected','deferred')));
      CREATE TABLE IF NOT EXISTS run_stats (run_id TEXT PRIMARY KEY, run_at TEXT NOT NULL DEFAULT (datetime('now')), cache_hits INTEGER NOT NULL DEFAULT 0, cache_misses INTEGER NOT NULL DEFAULT 0, api_calls_saved INTEGER NOT NULL DEFAULT 0, tools_added INTEGER NOT NULL DEFAULT 0, tools_queued INTEGER NOT NULL DEFAULT 0, db_size_bytes INTEGER);
    `);
    return new ResearchStore(db, scratch, target);
  }

  async search(query, fetcher, force = false) {
    const row = force ? null : this.db.prepare("SELECT response FROM search_cache WHERE query = ? AND source = 'exa' AND datetime(created_at, '+' || ttl_days || ' days') > datetime('now')").get(query);
    if (row) { this.hits++; return JSON.parse(row.response); }
    const results = await fetcher();
    this.misses++;
    this.db.prepare("INSERT OR REPLACE INTO search_cache (query, source, response, created_at, ttl_days) VALUES (?, 'exa', ?, datetime('now'), 7)").run(query, JSON.stringify(results));
    return results;
  }

  pending() {
    return this.db.prepare("SELECT url, name, category, description, source FROM candidate_queue WHERE status = 'pending' ORDER BY discovered_at LIMIT 20").all();
  }

  queueCandidate({ url, name, category, description }) {
    if (this.queued >= 20) throw new Error("Candidate queue limit exceeded");
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol) || parsed.username || parsed.password) throw new Error("Invalid candidate URL");
    for (const value of [url, name, category, description]) if (typeof value !== "string" || !value.trim() || value.length > 2000) throw new Error("Invalid candidate field");
    this.db.prepare("INSERT OR IGNORE INTO candidate_queue (url, name, category, description, source) VALUES (?, ?, ?, ?, 'exa')").run(url, name, category, description);
    this.queued++;
  }

  reviewCandidate({ url, status, reason }) {
    if (!["rejected", "deferred"].includes(status)) throw new Error("Invalid candidate review status");
    if (typeof reason !== "string" || !reason.trim() || reason.length > 1000) throw new Error("Candidate review requires a concise reason");
    const result = this.db.prepare("UPDATE candidate_queue SET status = ?, reject_reason = ? WHERE url = ? AND status = 'pending'").run(status, reason, url);
    if (!result.changes) throw new Error("Pending candidate not found");
  }

  markAdded(urls) {
    const statement = this.db.prepare("UPDATE candidate_queue SET status = 'added' WHERE url = ?");
    for (const url of urls) statement.run(url);
  }

  async commit(addedUrls) {
    this.markAdded(addedUrls);
    this.db.prepare("DELETE FROM search_cache WHERE datetime(created_at, '+' || ttl_days || ' days') < datetime('now')").run();
    this.db.prepare("INSERT INTO run_stats (run_id, cache_hits, cache_misses, api_calls_saved, tools_added, tools_queued) VALUES (?, ?, ?, ?, ?, ?)").run(randomUUID(), this.hits, this.misses, this.hits, addedUrls.length, this.queued);
    this.close();
    await mkdir(join(this.target, ".."), { recursive: true });
    await writeFile(this.target, await readFile(this.scratch));
  }

  close() { if (this.db) { this.db.close(); this.db = null; } }
}
