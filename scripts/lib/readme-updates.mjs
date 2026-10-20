import { lstat, readFile, writeFile, rename, rm } from "node:fs/promises";
import { join, dirname, basename } from "node:path";
import { randomUUID } from "node:crypto";

export const README_FILES = ["README.md", "README.ko.md", "README.ja.md"];
export const EDITABLE_FILES = [...README_FILES, "docs/verified-catalog.md", "docs/catalog-history.md"];
export const MANAGED_FILES = [...EDITABLE_FILES, "data/catalog-status.json"];

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

export function prepareUpdates(originals, proposal, { requiredUrl, removableUrls = [], readmeUnchanged = false, files = README_FILES } = {}) {
  if (!proposal || !["processed", "rejected", "uncertain", "unchanged"].includes(proposal.status)) throw new Error("Missing or invalid result status");
  if (typeof proposal.reason !== "string" || !proposal.reason.trim() || proposal.reason.length > 1000) throw new Error("A concise result reason is required");
  if (!Array.isArray(proposal.edits) || proposal.edits.length > 60) throw new Error("Invalid edits");
  if (proposal.status !== "processed") {
    if (proposal.edits.length) throw new Error("Non-processed results must not contain edits");
    return null;
  }
  if (proposal.edits.some(edit => !files.includes(edit.file) || !EDITABLE_FILES.includes(edit.file))) throw new Error("Unsupported file in edit");
  const readmeEdits = new Set(proposal.edits.map(e => e.file).filter(file => README_FILES.includes(file))).size;
  if (readmeUnchanged ? readmeEdits : readmeEdits !== 3) throw new Error(readmeUnchanged ? "README files must not change for this placement" : "Update all three languages together");
  const updated = { ...originals };
  for (const edit of proposal.edits) {
    if (typeof updated[edit.file] !== "string") throw new Error(`${edit.file} is not available`);
    if (typeof edit.oldText !== "string" || !edit.oldText || typeof edit.newText !== "string") throw new Error("Edits require oldText and newText");
    if (edit.oldText === edit.newText || edit.oldText.length > 30000 || edit.newText.length > 50000) throw new Error("Use small, meaningful edits");
    if (/<\s*(script|iframe|object|embed|style)\b|\]\(\s*(javascript|data|vbscript):/i.test(edit.newText)) throw new Error("Unsafe markup in edit");
    const text = updated[edit.file];
    if (text.split(edit.oldText).length !== 2) throw new Error(`oldText must occur exactly once in ${edit.file}`);
    updated[edit.file] = text.replace(edit.oldText, () => edit.newText);
  }
  for (const file of EDITABLE_FILES.filter(file => !README_FILES.includes(file) && updated[file] !== originals[file])) {
    if (updated[file].length > 1000000) throw new Error(`${file} size limit exceeded`);
    checkTables(updated[file]);
    const after = links(updated[file]);
    for (const [url, count] of links(originals[file])) if ((after.get(url) || 0) < count) throw new Error("Existing links must not be removed");
  }
  if (readmeUnchanged) return updated;
  let reference;
  for (const file of README_FILES) {
    if (updated[file] === originals[file]) throw new Error("Update all three languages together");
    if (updated[file].length > 1000000) throw new Error("README size limit exceeded");
    checkTables(updated[file]);
    const before = links(originals[file]);
    const after = links(updated[file]);
    const additions = [];
    for (const [url, count] of before) if ((after.get(url) || 0) < count && !removableUrls.includes(url)) throw new Error("Existing links must not be removed");
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
  for (const file of MANAGED_FILES) {
    const path = join(cwd, file);
    const stat = await lstat(path).catch(error => {
      if (error.code === "ENOENT" && !README_FILES.includes(file)) return null;
      throw error;
    });
    if (!stat) continue;
    if (!stat.isFile() || stat.isSymbolicLink()) throw new Error(`${file} must be a regular file`);
    result[file] = await readFile(path, "utf8");
  }
  return result;
}

export async function persistUpdates(cwd, originals, updated) {
  if (!updated) return;
  const current = await readOriginals(cwd);
  for (const file of MANAGED_FILES) if (current[file] !== originals[file]) throw new Error(`${file} changed during the run`);
  const files = MANAGED_FILES.filter(file => file in updated && updated[file] !== originals[file]);
  for (const file of files) if (typeof originals[file] !== "string" || typeof updated[file] !== "string") throw new Error(`${file} cannot be created by an update`);
  const temporary = new Map();
  const replaced = [];
  try {
    for (const file of files) {
      const path = join(cwd, dirname(file), `.${basename(file)}.${randomUUID()}.tmp`);
      temporary.set(file, path);
      await writeFile(path, updated[file], { flag: "wx" });
    }
    for (const file of files) {
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
