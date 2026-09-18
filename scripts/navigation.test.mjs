import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parse } from "yaml";
import { CATEGORIES } from "./lib/categories.mjs";
import { refreshRecentUpdates } from "./lib/recent-updates.mjs";

const read = path => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("the issue form and weekly dispatch expose the same task categories", async () => {
  const form = parse(await read(".github/ISSUE_TEMPLATE/add-resource.yml"));
  const options = form.body.find(field => field.id === "category").attributes.options;
  for (const { title } of Object.values(CATEGORIES)) assert.ok(options.includes(title), title);
  const workflow = parse(await read(".github/workflows/weekly-update.yml"));
  assert.deepEqual(workflow.on.workflow_dispatch.inputs.category.options, ["all", ...Object.keys(CATEGORIES)]);
});

test("README provides task catalogs, four-column resource rows, and valid local anchors", async () => {
  for (const file of ["README.md", "README.ko.md", "README.ja.md"]) {
    const text = await read(file);
    const ids = [...text.matchAll(/<a id="([^"]+)"><\/a>/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, `${file}: duplicate explicit anchors`);
    for (const match of text.matchAll(/\]\(#([^)]+)\)/g)) assert.ok(ids.includes(match[1]), `${file}: missing anchor ${match[1]}`);
    for (const key of Object.keys(CATEGORIES).filter(key => key !== "learning")) {
      const block = text.match(new RegExp(`<!-- catalog:${key} -->\\n([\\s\\S]*?)<!-- /catalog:${key} -->`))?.[1];
      assert.ok(block, `${file}: missing ${key} catalog`);
      const rows = block.split("\n").filter(line => line.startsWith("|"));
      assert.ok(rows.length > 2);
      for (const row of rows) assert.equal(row.replace(/\\\|/g, "").split("|").length - 2, 4, `${file}: four-column row required`);
    }
  }
});

test("recent updates retain only the last 30 dates, cap at ten, and never invent new entries", () => {
  const block = rows => `Before\n<!-- recent-updates:start -->\n| Verified | Update | Details |\n|---|---|---|\n${rows.join("\n")}\n<!-- recent-updates:end -->\nAfter`;
  const input = block([
    "| 2026-08-19 | [Old](#old) | old |", "| 2026-08-20 | [Boundary](#boundary) | current |",
    "| 2026-09-18 | [Today](#today) | current |", "| 2026-09-19 | [Future](#future) | invalid |",
  ]);
  const output = refreshRecentUpdates(input, "2026-09-18", "en");
  assert.doesNotMatch(output, /#old|#future/);
  assert.match(output, /#boundary/);
  assert.match(output, /#today/);
  assert.ok(output.startsWith("Before\n")); assert.ok(output.endsWith("\nAfter"));
  const many = block(Array.from({ length: 12 }, (_, i) => `| 2026-09-${String(i + 1).padStart(2, "0")} | [Item](#item-${i}) | current |`));
  assert.equal((refreshRecentUpdates(many, "2026-09-18", "en").match(/\| 2026-/g) || []).length, 10);
  const empty = refreshRecentUpdates(input, "2026-11-01", "ko");
  assert.doesNotMatch(empty, /\| 2026-/);
  assert.match(empty, /최근 30일/);
  assert.equal(refreshRecentUpdates("No updates block", "2026-09-18", "en"), "No updates block");
});
