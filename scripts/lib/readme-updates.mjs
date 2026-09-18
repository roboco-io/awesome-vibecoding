import { lstat, readFile, writeFile, rename, rm } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

export const README_FILES = ["README.md", "README.ko.md", "README.ja.md"];

export function outputRecord(key, value) {
  if (!/^[a-z_]+$/.test(key)) throw new Error("Invalid output key");
  return `${key}=${String(value).replace(/[\r\n\u2028\u2029]+/g, " ")}\n`;
}

export function links(text) {
  const counts = new Map();
  for (const match of text.matchAll(/\]\((https?:\/\/[^\s)]+)\)/g)) counts.set(match[1], (counts.get(match[1]) || 0) + 1);
  return counts;
}

function checkTables(text) {
  let width = null;
  let fence = false;
  for (const line of text.split("\n")) {
    if (/^\s*```/.test(line)) { fence = !fence; width = null; continue; }
    if (fence) continue;
    if (!line.startsWith("|")) { width = null; continue; }
    const cells = line.replace(/\\\|/g, "").split("|").length - 2;
    if (width !== null && width !== cells) throw new Error("Inconsistent Markdown table columns");
    width = cells;
  }
}

export function prepareUpdates(originals, proposal, { requiredUrl } = {}) {
  if (!proposal || !["processed", "rejected", "uncertain", "unchanged"].includes(proposal.status)) throw new Error("Missing or invalid result status");
  if (typeof proposal.reason !== "string" || !proposal.reason.trim() || proposal.reason.length > 1000) throw new Error("A concise result reason is required");
  if (!Array.isArray(proposal.edits) || proposal.edits.length > 60) throw new Error("Invalid edits");
  if (proposal.status !== "processed") {
    if (proposal.edits.length) throw new Error("Non-processed results must not contain edits");
    return null;
  }
  if (new Set(proposal.edits.map(e => e.file)).size !== 3) throw new Error("Update all three languages together");
  const updated = { ...originals };
  for (const edit of proposal.edits) {
    if (!README_FILES.includes(edit.file)) throw new Error("Unsupported file in edit");
    if (typeof edit.oldText !== "string" || !edit.oldText || typeof edit.newText !== "string") throw new Error("Edits require oldText and newText");
    if (edit.oldText === edit.newText || edit.oldText.length > 30000 || edit.newText.length > 50000) throw new Error("Use small, meaningful edits");
    if (/<\s*(script|iframe|object|embed|style)\b|\]\(\s*(javascript|data|vbscript):/i.test(edit.newText)) throw new Error("Unsafe markup in edit");
    const text = updated[edit.file];
    if (text.split(edit.oldText).length !== 2) throw new Error(`oldText must occur exactly once in ${edit.file}`);
    updated[edit.file] = text.replace(edit.oldText, () => edit.newText);
  }
  let reference;
  for (const file of README_FILES) {
    if (updated[file] === originals[file]) throw new Error("Update all three languages together");
    if (updated[file].length > 1000000) throw new Error("README size limit exceeded");
    checkTables(updated[file]);
    const before = links(originals[file]);
    const after = links(updated[file]);
    const additions = [];
    for (const [url, count] of before) if ((after.get(url) || 0) < count) throw new Error("Existing links must not be removed");
    for (const [url, count] of after) {
      const delta = count - (before.get(url) || 0);
      if (delta <= 0) continue;
      if (before.has(url) || delta > 1) throw new Error("Duplicate resource URL added");
      additions.push(url);
    }
    if (!additions.length) throw new Error("A processed result must add a resource URL");
    if (requiredUrl && !additions.includes(requiredUrl)) throw new Error("The requested URL must be added to every language");
    const signature = JSON.stringify(additions.sort());
    if (reference !== undefined && signature !== reference) throw new Error("New resource URLs must match across all three languages");
    reference = signature;
  }
  return updated;
}

export async function readOriginals(cwd) {
  const result = {};
  for (const file of README_FILES) {
    const path = join(cwd, file);
    const stat = await lstat(path);
    if (!stat.isFile() || stat.isSymbolicLink()) throw new Error(`${file} must be a regular file`);
    result[file] = await readFile(path, "utf8");
  }
  return result;
}

export async function persistUpdates(cwd, originals, updated) {
  if (!updated) return;
  const current = await readOriginals(cwd);
  for (const file of README_FILES) if (current[file] !== originals[file]) throw new Error(`${file} changed during the run`);
  const temporary = new Map();
  const replaced = [];
  try {
    for (const file of README_FILES) {
      const path = join(cwd, `.${file}.${randomUUID()}.tmp`);
      temporary.set(file, path);
      await writeFile(path, updated[file], { flag: "wx" });
    }
    for (const file of README_FILES) {
      await rename(temporary.get(file), join(cwd, file));
      replaced.push(file);
    }
  } catch (error) {
    for (const file of replaced) await writeFile(join(cwd, file), originals[file]);
    throw error;
  } finally {
    for (const path of temporary.values()) await rm(path, { force: true });
  }
}
