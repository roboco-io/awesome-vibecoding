# Weekly README Update

You are updating the awesome-vibecoding README.md with the latest AI coding tools.

## Arguments

- $ARGUMENTS: Category filter (all, ide, agentic, cloud, learning). Default: all
  - If 'all': Update all categories
  - If specific: Only update that category
- $FORCE: Cache force refresh (true/false). Default: false
  - If 'true': Ignore all cache TTLs, re-fetch everything from sources

## Task

Research and update each section of the README with new tools using multiple sources and search strategies. Use the SQLite cache to avoid redundant API calls and track candidates across runs.

## Categories

1. **IDE & Editor Assistants** - AI-powered code completion and IDE integrations
2. **Agentic Coding Environments** - Autonomous AI systems for end-to-end development
3. **Cloud & Platform Integrations** - Browser-based and cloud AI development platforms
4. **MCP Servers & Tooling** - Model Context Protocol servers and related tools
5. **Learning Resources** - Research papers, articles, videos about vibe coding

---

## Step 0: Cache Initialization

Before any research, initialize the SQLite cache database.

```bash
mkdir -p .cache

# Verify DB integrity; recreate if corrupted
TABLES=$(sqlite3 .cache/awesome-vibecoding.db ".tables" 2>/dev/null || echo "")
if [ -z "$TABLES" ] || ! echo "$TABLES" | grep -q "search_cache"; then
  rm -f .cache/awesome-vibecoding.db
fi

# Create tables (idempotent)
sqlite3 .cache/awesome-vibecoding.db "CREATE TABLE IF NOT EXISTS search_cache (query TEXT NOT NULL, source TEXT NOT NULL, response TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')), ttl_days INTEGER NOT NULL DEFAULT 7, PRIMARY KEY (query, source));"

sqlite3 .cache/awesome-vibecoding.db "CREATE TABLE IF NOT EXISTS tool_metadata (url TEXT PRIMARY KEY, name TEXT NOT NULL, category TEXT, stars INTEGER, last_commit TEXT, description TEXT, in_readme INTEGER NOT NULL DEFAULT 0, checked_at TEXT NOT NULL DEFAULT (datetime('now')), ttl_days INTEGER NOT NULL DEFAULT 30);"

sqlite3 .cache/awesome-vibecoding.db "CREATE TABLE IF NOT EXISTS candidate_queue (url TEXT PRIMARY KEY, name TEXT NOT NULL, category TEXT, description TEXT, source TEXT, discovered_at TEXT NOT NULL DEFAULT (datetime('now')), status TEXT NOT NULL DEFAULT 'pending', reject_reason TEXT, CHECK (status IN ('pending','added','rejected','deferred')));"

sqlite3 .cache/awesome-vibecoding.db "CREATE TABLE IF NOT EXISTS run_stats (run_id TEXT PRIMARY KEY, run_at TEXT NOT NULL DEFAULT (datetime('now')), cache_hits INTEGER NOT NULL DEFAULT 0, cache_misses INTEGER NOT NULL DEFAULT 0, api_calls_saved INTEGER NOT NULL DEFAULT 0, tools_added INTEGER NOT NULL DEFAULT 0, tools_queued INTEGER NOT NULL DEFAULT 0, db_size_bytes INTEGER);"
```

Initialize hit/miss counters as shell variables:

```bash
CACHE_HITS=0
CACHE_MISSES=0
```

---

## Step 1: Process Candidate Queue

Before searching for new tools, process any pending candidates from previous runs:

```bash
sqlite3 .cache/awesome-vibecoding.db "SELECT url, name, category, description, source FROM candidate_queue WHERE status='pending';"
```

For each pending candidate:
1. Verify it still meets quality criteria (check stars, activity)
2. If it qualifies: add to README.md and mark as added: `sqlite3 .cache/awesome-vibecoding.db "UPDATE candidate_queue SET status='added' WHERE url='$URL';"`
3. If it doesn't qualify: mark as deferred or rejected: `sqlite3 .cache/awesome-vibecoding.db "UPDATE candidate_queue SET status='rejected', reject_reason='$REASON' WHERE url='$URL';"`

---

## Step 2: Multi-Source Research Strategy (with Cache)

For EVERY search query below, follow this cache-check pattern:

### Cache Check Pattern

Before each search:
```bash
CACHED=$(sqlite3 .cache/awesome-vibecoding.db "SELECT response FROM search_cache WHERE query='$QUERY' AND source='$SOURCE' AND datetime(created_at, '+' || ttl_days || ' days') > datetime('now');")
```

- If `$FORCE` is `true`: Skip cache check, always perform the search.
- If `$CACHED` is non-empty (cache HIT): Use the cached response. Increment: `CACHE_HITS=$((CACHE_HITS + 1))`
- If `$CACHED` is empty (cache MISS): Perform the actual search, then save:
  ```bash
  CACHE_MISSES=$((CACHE_MISSES + 1))
  ESCAPED_RESPONSE=$(echo "$RESPONSE" | sed "s/'/''/g")
  sqlite3 .cache/awesome-vibecoding.db "INSERT OR REPLACE INTO search_cache (query, source, response, created_at, ttl_days) VALUES ('$QUERY', '$SOURCE', '$ESCAPED_RESPONSE', datetime('now'), 7);"
  ```

**IMPORTANT**: Always escape single quotes in responses with `sed "s/'/''/g"` before inserting into SQLite.

### 1. Perplexity Search Queries (Use ALL of these)

For each category, run multiple targeted queries (source = 'perplexity'):

**General Discovery:**
- "new AI coding tools released 2025"
- "trending AI coding assistants January 2025"
- "best vibe coding tools 2025"

**Category-Specific (IDE & Editor):**
- "new VS Code AI extensions 2025"
- "Claude Code alternatives 2025"
- "AI coding CLI tools 2025"
- "terminal AI coding assistant"

**Category-Specific (Agentic):**
- "autonomous AI coding agents 2025"
- "AI software engineer tools like Devin"
- "open source AI coding agent"

**Category-Specific (Cloud):**
- "AI app builders like Bolt.new 2025"
- "no-code AI development platforms"

**Trending/Buzz:**
- "opencode AI coding" (example of trending tool)
- "what AI coding tools are developers using 2025"
- "AI coding tools trending on GitHub"
- "AI coding tools trending on Hacker News"

### 2. Community Signal Queries (source = 'community')

Search for community discussions:
- "r/vibecoding new tools"
- "r/ClaudeAI alternatives"
- "r/ChatGPTCoding best tools 2025"
- "Hacker News AI coding tools"

### 3. GitHub Org Repos (source = 'github_org')

Check these GitHub organizations/users for new vibe coding related projects:

**How to check:**
1. Use `gh repo list roboco-io --json name,description,url,updatedAt --limit 50` to list repos
2. Use `gh repo list serithemage --json name,description,url,updatedAt --limit 50` to list repos
3. Filter for repos related to AI coding, vibe coding, MCP, Claude Code, or developer tools
4. Cross-check against README.md to find repos not yet listed
5. Add any qualifying repos to the appropriate category

**Examples of qualifying repos:** CLI tools, AI agent frameworks, MCP servers, scaffolding tools, analysis tools, serverless AI infrastructure.

### 4. GeekNews (source = 'geeknews')

Check Korean tech community GeekNews for vibe coding related projects and tools:

**How to check:**
1. Fetch https://news.hada.io/search?q=vibe+coding and extract links to projects/tools
2. Fetch https://news.hada.io/search?q=AI+coding and extract links to projects/tools
3. Fetch https://news.hada.io/search?q=claude+code and extract links
4. Fetch https://news.hada.io/search?q=cursor+AI and extract links
5. Fetch https://news.hada.io/search?q=MCP+server and extract links
6. From each search result, identify tools/projects that are not yet in README.md
7. Verify each candidate meets the quality criteria before adding

### 5. GitHub Trending Check (source = 'trending')

Search for:
- "GitHub trending AI coding repositories this week"
- "most starred AI coding tools 2025"

---

## Step 3: Filter and Verify Candidates (with Metadata Cache)

For each candidate tool discovered from searches:

### Metadata Cache Check

Before fetching stars/activity for a tool, check the metadata cache:
```bash
CACHED_META=$(sqlite3 .cache/awesome-vibecoding.db "SELECT stars, last_commit FROM tool_metadata WHERE url='$URL' AND datetime(checked_at, '+' || ttl_days || ' days') > datetime('now');")
```

- If `$FORCE` is `true`: Skip cache, fetch fresh metadata.
- If `$CACHED_META` is non-empty: Use cached stars/activity. Increment `CACHE_HITS`.
- If empty: Fetch via `gh` CLI or web, then save:
  ```bash
  CACHE_MISSES=$((CACHE_MISSES + 1))
  ESCAPED_DESC=$(echo "$DESCRIPTION" | sed "s/'/''/g")
  sqlite3 .cache/awesome-vibecoding.db "INSERT OR REPLACE INTO tool_metadata (url, name, category, stars, last_commit, description, in_readme, checked_at, ttl_days) VALUES ('$URL', '$NAME', '$CATEGORY', $STARS, '$LAST_COMMIT', '$ESCAPED_DESC', $IN_README, datetime('now'), 30);"
  ```

### Verification Criteria

A tool should be added if it meets ANY of these:
- 1000+ GitHub stars
- Featured in major tech publications
- Active development (multiple releases in 2025)
- Mentioned in multiple community discussions
- Offers unique capability not covered by existing tools

### Queue Unqualified Candidates

Tools that are promising but don't yet meet criteria should be queued:
```bash
ESCAPED_CDESC=$(echo "$CDESC" | sed "s/'/''/g")
sqlite3 .cache/awesome-vibecoding.db "INSERT OR IGNORE INTO candidate_queue (url, name, category, description, source) VALUES ('$URL', '$NAME', '$CATEGORY', '$ESCAPED_CDESC', '$SOURCE');"
```

---

## Step 4: Update README

### Entry Format

Follow the existing table format in README.md:

```markdown
| [**Tool Name**](url) | Short description (under 80 chars) |
```

Add verified tools to the appropriate section. Mark added tools in metadata:
```bash
sqlite3 .cache/awesome-vibecoding.db "UPDATE tool_metadata SET in_readme=1 WHERE url='$URL';"
sqlite3 .cache/awesome-vibecoding.db "UPDATE candidate_queue SET status='added' WHERE url='$URL';"
```

---

## Step 5: Translation

After updating README.md, synchronize changes to:
- README.ko.md (Korean)
- README.ja.md (Japanese)

Use the /translate command after all changes are complete.

---

## Step 6: Cache Statistics and Cleanup

### Prune Expired Rows

```bash
sqlite3 .cache/awesome-vibecoding.db "DELETE FROM search_cache WHERE datetime(created_at, '+' || ttl_days || ' days') < datetime('now');"
sqlite3 .cache/awesome-vibecoding.db "DELETE FROM tool_metadata WHERE datetime(checked_at, '+' || ttl_days || ' days') < datetime('now');"
```

### Record Run Stats

```bash
DB_SIZE=$(wc -c < .cache/awesome-vibecoding.db)
RUN_ID=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
sqlite3 .cache/awesome-vibecoding.db "INSERT INTO run_stats (run_id, cache_hits, cache_misses, api_calls_saved, tools_added, tools_queued, db_size_bytes) VALUES ('$RUN_ID', $CACHE_HITS, $CACHE_MISSES, $CACHE_HITS, $TOOLS_ADDED, $TOOLS_QUEUED, $DB_SIZE);"
```

### Print Summary

Print a cache statistics summary:

```
## Cache Statistics
| Metric | Value |
|--------|-------|
| Cache Hits | $CACHE_HITS |
| Cache Misses | $CACHE_MISSES |
| Hit Rate | $(( CACHE_HITS * 100 / (CACHE_HITS + CACHE_MISSES) ))% |
| API Calls Saved | $CACHE_HITS |
| Tools Added | $TOOLS_ADDED |
| Tools Queued | $TOOLS_QUEUED |
| DB Size | $DB_SIZE bytes |
```

### Stage DB for Git

```bash
git add .cache/awesome-vibecoding.db
```

---

## Output

After completing the update, provide:
1. Cache statistics summary (from Step 6)
2. Number of new tools added per category
3. List of new tools with brief justification
4. Any tools flagged for review or queued for next run
5. Any tools that were considered but not added (and why)
