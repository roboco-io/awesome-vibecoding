import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { normalizeResourceUrl, assertNewResource, findResources, assertShortlistCapacity } from "./lib/catalog-status.mjs";

const records = [
  { id: "q", name: "Amazon Q Developer", url: "https://aws.amazon.com/q/developer/", aliases: ["https://aws.amazon.com/q/developer/"], status: "sunsetting", location: "excluded", reason: "New signups closed" },
  { id: "pi", name: "Pi", url: "https://github.com/earendil-works/pi", aliases: ["https://github.com/badlogic/pi-mono"], status: "active", location: "extended", reason: "Already reviewed" },
  { id: "old", name: "Archived tool", url: "https://github.com/example/archived", aliases: [], status: "archived", location: "excluded" },
];

test("known sunsets and reviewed alternatives cannot be reintroduced as new discoveries", () => {
  assert.throws(() => assertNewResource("https://aws.amazon.com/q/developer?utm_source=search#pricing", records), /sunsetting/);
  assert.throws(() => assertNewResource("https://github.com/EARENDIL-WORKS/pi.git", records), /already reviewed/i);
  assert.throws(() => assertNewResource("https://github.com/badlogic/pi-mono", records), /already reviewed/i);
  assert.throws(() => assertNewResource("https://github.com/example/archived?tab=readme-ov-file", records), /archived/);
  assert.throws(() => assertNewResource("https://github.com/example/archived/blob/main/README.md", records), /archived/);
  assert.equal(findResources("https://aws.amazon.com/q/developer/pricing/", records)[0]?.status, "sunsetting");
  assert.doesNotThrow(() => assertNewResource("https://new.example/tool", records));
  assert.equal(findResources("Amazon Q", records)[0].status, "sunsetting");
});

test("URL normalization preserves identities encoded in query parameters", () => {
  assert.notEqual(normalizeResourceUrl("https://www.youtube.com/watch?v=one"), normalizeResourceUrl("https://youtube.com/watch?v=two"));
  assert.equal(normalizeResourceUrl("https://example.com/tool/?utm_medium=ref&a=1#top"), normalizeResourceUrl("http://www.example.com/tool?a=1"));
});

test("automatic additions cannot grow a task shortlist beyond its editorial limit", () => {
  const make = count => `<!-- catalog:code -->\n| Resource | Use | Terms | Verified |\n|---|---|---|---|\n${Array.from({ length: count }, (_, i) => `| [**Tool ${i}**](https://example.com/${i}) | coding | paid | 2026-09-18 |`).join("\n")}\n<!-- /catalog:code -->`;
  assert.doesNotThrow(() => assertShortlistCapacity(make(10)));
  assert.throws(() => assertShortlistCapacity(make(11)), /shortlist.*limit/i);
});

test("the visible catalog contains no known excluded sources and every core row has a review date", async () => {
  const catalog = JSON.parse(await readFile(new URL("../data/catalog-status.json", import.meta.url), "utf8"));
  const excluded = new Set(catalog.resources.filter(r => r.location === "excluded").flatMap(r => [r.url, ...r.aliases]).map(normalizeResourceUrl));
  // A consolidated old identity can point at the same current product as its retained row.
  for (const r of catalog.resources.filter(r => r.status === "active" && r.location !== "excluded")) excluded.delete(normalizeResourceUrl(r.url));
  for (const file of ["README.md", "README.ko.md", "README.ja.md"]) {
    const text = await readFile(new URL(`../${file}`, import.meta.url), "utf8");
    assertShortlistCapacity(text);
    for (const match of text.matchAll(/<!-- catalog:\w+ -->\n([\s\S]*?)<!-- \/catalog:\w+ -->/g)) {
      for (const row of match[1].split("\n").filter(row => row.startsWith("| ") && row.includes("]("))) {
        const url = row.match(/\]\((https?:\/\/[^)]+)\)/)?.[1];
        assert.ok(url);
        assert.ok(!excluded.has(normalizeResourceUrl(url)), `${file}: excluded source ${url}`);
        assert.match(row.split("|").at(-2), /\d{4}-\d{2}-\d{2}/);
      }
    }
  }
});
