import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadRegistrationPolicy, scoreTotal, isProtected, isScoreFresh, isIndependentSource, checkSecurity } from "./lib/registration-policy.mjs";
import { shortlistEntries } from "./lib/catalog-status.mjs";
import { CATEGORIES } from "./lib/categories.mjs";
import { README_FILES, prepareUpdates, readOriginals, persistUpdates } from "./lib/readme-updates.mjs";
import { prepareCatalogUpdates } from "./lib/catalog-updates.mjs";
import { checkResultFields } from "./lib/pi-runner.mjs";
import { formatIssueComment } from "./lib/issue-comment.mjs";
import { processIssue } from "./lib/process-issue.mjs";

const policy = await loadRegistrationPolicy();
const today = "2026-10-20";

test("scoreTotal sums five items and rejects missing, extra, or out-of-range values", () => {
  const ok = { activity: 2, documentation: 1, access: 2, independent_sources: 0, category_fit: 2 };
  assert.equal(scoreTotal(ok, policy), 7);
  for (const bad of [{ ...ok, activity: 3 }, { ...ok, activity: -1 }, { ...ok, activity: 1.5 }, { ...ok, extra: 1 }, { ...ok, activity: undefined }]) assert.throws(() => scoreTotal(bad, policy));
  const { activity, ...missing } = ok;
  assert.throws(() => scoreTotal(missing, policy));
});

test("protection applies for 90 days only when listed_on exists", () => {
  assert.equal(isProtected({ listed_on: "2026-08-01" }, today, policy), true);
  assert.equal(isProtected({ listed_on: "2026-07-01" }, today, policy), false);
  assert.equal(isProtected({}, today, policy), false);
});

test("stored scores expire after 90 days", () => {
  assert.equal(isScoreFresh({ scored_on: "2026-08-01" }, today, policy), true);
  assert.equal(isScoreFresh({ scored_on: "2026-07-01" }, today, policy), false);
  assert.equal(isScoreFresh({}, today, policy), false);
});

test("submitter-only evidence is not independent", () => {
  const submitted = "https://learnmagic.ai";
  assert.equal(isIndependentSource("https://learnmagic.ai/about", submitted, policy), false);
  assert.equal(isIndependentSource("https://docs.learnmagic.ai/x", submitted, policy), false);
  assert.equal(isIndependentSource("https://github.com/learnmagic-ai/skills", submitted, policy), true);
  assert.equal(isIndependentSource("https://news.example.com/a", submitted, policy), true);
});

test("shortlistEntries returns rows of one category block", () => {
  const text = `<!-- catalog:context -->\n| Resource | Use |\n|---|---|\n| <a id="resource-a"></a>[**A**](https://a.example/x) | one |\n| <a id="resource-b"></a>[**B**](https://b.example/y) | two |\n<!-- /catalog:context -->\n<!-- catalog:code -->\n| [**C**](https://c.example) | x |\n<!-- /catalog:code -->`;
  assert.deepEqual(shortlistEntries(text, "context"), [{ id: "resource-a", url: "https://a.example/x" }, { id: "resource-b", url: "https://b.example/y" }]);
  assert.deepEqual(shortlistEntries(text, "code"), [{ id: null, url: "https://c.example" }]);
});

const LIMIT = CATEGORIES.context.limit;
const row = n => `| <a id="resource-r${n}"></a>[**R${n}**](https://r${n}.example/) | Use ${n} |`;
const NEW_ROW = `| <a id="resource-new"></a>[**New**](https://new.example/) | New use |`;
const readmeText = count => `# List\n\n<!-- catalog:context -->\n| Resource | Use |\n|---|---|\n${Array.from({ length: count }, (_, i) => row(i)).join("\n")}\n<!-- /catalog:context -->\n\n<!-- catalog:code -->\n| Resource | Use |\n|---|---|\n| [**C**](https://c.example/) | x |\n<!-- /catalog:code -->\n`;
const VERIFIED = "# Verified\n\n## Context\n\n| Resource | Use |\n|---|---|\n| [**V**](https://v.example/) | v |\n";
const HISTORY = "# History\n\n<a id=\"resource-old\"></a>\n### Old\n\n- Status: **archived**.\n";
const good = { activity: 2, documentation: 2, access: 2, independent_sources: 2, category_fit: 2 };
const low = { activity: 1, documentation: 1, access: 1, independent_sources: 1, category_fit: 1 };
const registryEntries = (count, extra = {}) => Array.from({ length: count }, (_, i) => ({ id: `resource-r${i}`, name: `R${i}`, url: `https://r${i}.example/`, aliases: [`https://r${i}.example/`], category: "context", status: "active", location: "shortlist", scores: good, scored_on: "2026-10-01", ...extra[i] }));
const catalogOriginals = (count, extra) => ({
  ...Object.fromEntries(README_FILES.map(file => [file, readmeText(count)])),
  "docs/verified-catalog.md": VERIFIED, "docs/catalog-history.md": HISTORY,
  "data/catalog-status.json": JSON.stringify({ reviewed_on: "2026-09-18", scope: "test", resources: registryEntries(count, extra) }, null, 2) + "\n",
});
const readmeEdits = (oldText, newText) => README_FILES.map(file => ({ file, oldText, newText }));
const addRow = () => readmeEdits("<!-- /catalog:context -->", `${NEW_ROW}\n<!-- /catalog:context -->`);
const replaceRow = n => readmeEdits(row(n), NEW_ROW);
const toVerified = url => ({ file: "docs/verified-catalog.md", oldText: "| [**V**](https://v.example/) | v |", newText: `| [**V**](https://v.example/) | v |\n| [**X**](${url}) | moved |` });
const toHistory = url => ({ file: "docs/catalog-history.md", oldText: "- Status: **archived**.", newText: `- Status: **archived**.\n\n### Moved\n\n- Status: **archived**. [Source](${url}).` });
const security = (fields = {}) => ({ storesThirdPartyCredentials: false, relaysCredentials: false, handlesPayments: false, executesRemoteCommands: false, officialVendor: false, evidenceUrls: ["https://new.example/"], ...fields });
const catalogProposal = (fields = {}) => ({
  status: "processed", reason: "Added New", evidenceUrls: ["https://new.example/"], placement: "readme",
  resource: { id: "resource-new", name: "New", category: "context" }, scores: good, edits: addRow(), security: security(), ...fields,
});
const ctx = (fields = {}) => ({ requiredUrl: "https://new.example/", policy, today, approved: false, searchedUrls: ["https://new.example/", "https://evidence.example/archived"], fetchedUrls: [], issueUrl: "https://github.com/o/r/issues/1", ...fields });
const disqualified = (fields = {}) => ({ outgoingUrl: "https://r3.example/", path: "disqualified", disqualification: "archived", covers: true, rationale: "Archived", evidenceUrls: ["https://evidence.example/archived"], ...fields });
const superseded = (fields = {}) => ({ outgoingUrl: "https://r3.example/", path: "superseded", covers: true, rationale: "Broader and maintained", evidenceUrls: ["https://new.example/"], ...fields });

test("readme placement fills a free slot", () => {
  const updated = prepareCatalogUpdates(catalogOriginals(LIMIT - 1), catalogProposal(), ctx());
  for (const file of README_FILES) assert.ok(shortlistEntries(updated[file], "context").some(entry => entry.url === "https://new.example/"));
  assert.ok("data/catalog-status.json" in updated);
});

test("readme placement without replacement fails on a full shortlist", () => {
  assert.throws(() => prepareCatalogUpdates(catalogOriginals(LIMIT), catalogProposal(), ctx()), /full|limit/i);
});

test("readme placement must add the resource inside its category block", () => {
  const p = catalogProposal({ edits: readmeEdits("<!-- /catalog:code -->", `${NEW_ROW}\n<!-- /catalog:code -->`) });
  assert.throws(() => prepareCatalogUpdates(catalogOriginals(LIMIT - 1), p, ctx()), /category/i);
});

test("extended placement requires a full shortlist", () => {
  const p = catalogProposal({ placement: "extended", edits: [toVerified("https://new.example/")] });
  assert.throws(() => prepareCatalogUpdates(catalogOriginals(LIMIT - 1), p, ctx()), /full/i);
});

test("extended placement leaves READMEs untouched and adds to verified-catalog", () => {
  const originals = catalogOriginals(LIMIT);
  const p = catalogProposal({ placement: "extended", edits: [toVerified("https://new.example/")] });
  const updated = prepareCatalogUpdates(originals, p, ctx());
  for (const file of README_FILES) assert.ok(!(file in updated));
  assert.match(updated["docs/verified-catalog.md"], /new\.example/);
  const entry = JSON.parse(updated["data/catalog-status.json"]).resources.find(r => r.url === "https://new.example/");
  assert.equal(entry.location, "extended");
  assert.equal(entry.listed_on, undefined);
  assert.throws(() => prepareCatalogUpdates(originals, { ...p, edits: [...addRow(), ...p.edits] }, ctx()), /README/);
  assert.throws(() => prepareCatalogUpdates(originals, { ...p, replacement: superseded() }, ctx()), /replacement/i);
  assert.throws(() => prepareCatalogUpdates(originals, { ...p, edits: [] }, ctx()), /verified-catalog/);
});

test("disqualified replacement ignores protection and moves the row to history", () => {
  const originals = catalogOriginals(LIMIT, { 3: { listed_on: "2026-10-10" } });
  const p = catalogProposal({ replacement: disqualified(), edits: [...replaceRow(3), toHistory("https://r3.example/")] });
  const updated = prepareCatalogUpdates(originals, p, ctx());
  for (const file of README_FILES) assert.doesNotMatch(updated[file], /r3\.example/);
  const outgoing = JSON.parse(updated["data/catalog-status.json"]).resources.find(r => r.url === "https://r3.example/");
  assert.deepEqual([outgoing.location, outgoing.status, outgoing.previous_status], ["excluded", "archived", "active"]);
  assert.throws(() => prepareCatalogUpdates(originals, { ...p, edits: replaceRow(3) }, ctx()), /catalog-history/);
  assert.throws(() => prepareCatalogUpdates(originals, { ...p, replacement: disqualified({ evidenceUrls: ["https://unseen.example/"] }) }, ctx()), /observed|evidence/i);
  assert.throws(() => prepareCatalogUpdates(originals, { ...p, replacement: disqualified({ evidenceUrls: [] }) }, ctx()), /evidence/i);
  assert.throws(() => prepareCatalogUpdates(originals, { ...p, replacement: disqualified({ outgoingUrl: "https://c.example/" }) }, ctx()), /current row/i);
  const partial = { ...p, edits: [...replaceRow(3).slice(0, 2), { file: "README.ja.md", oldText: "<!-- /catalog:context -->", newText: `${NEW_ROW}\n<!-- /catalog:context -->` }, toHistory("https://r3.example/")] };
  assert.throws(() => prepareCatalogUpdates(catalogOriginals(LIMIT - 1), partial, ctx()), /must be removed from README\.ja\.md/);
});

test("inactive disqualification requires approval", () => {
  const p = catalogProposal({ replacement: disqualified({ disqualification: "inactive" }), edits: [...replaceRow(3), toHistory("https://r3.example/")] });
  assert.throws(() => prepareCatalogUpdates(catalogOriginals(LIMIT), p, ctx()), /disqualification/i);
  const updated = prepareCatalogUpdates(catalogOriginals(LIMIT), p, ctx({ approved: true }));
  assert.equal(JSON.parse(updated["data/catalog-status.json"]).resources.find(r => r.url === "https://r3.example/").status, "inactive");
});

test("superseded replacement respects the 90-day protection", () => {
  const extra = { 3: { listed_on: "2026-09-20", scores: low } };
  const p = catalogProposal({ replacement: superseded(), edits: [...replaceRow(3), toVerified("https://r3.example/")] });
  assert.throws(() => prepareCatalogUpdates(catalogOriginals(LIMIT, extra), p, ctx()), /protect/i);
  const updated = prepareCatalogUpdates(catalogOriginals(LIMIT, { 3: { listed_on: "2026-06-01", scores: low } }), p, ctx());
  const outgoing = JSON.parse(updated["data/catalog-status.json"]).resources.find(r => r.url === "https://r3.example/");
  assert.equal(outgoing.location, "extended");
});

test("superseded replacement requires the lowest score and a strictly higher incoming score", () => {
  const p = catalogProposal({ replacement: superseded(), edits: [...replaceRow(3), toVerified("https://r3.example/")] });
  assert.throws(() => prepareCatalogUpdates(catalogOriginals(LIMIT), p, ctx()), /higher/i);
  assert.throws(() => prepareCatalogUpdates(catalogOriginals(LIMIT, { 3: { scores: low }, 5: { scores: { ...low, activity: 0 } } }), p, ctx()), /lowest/i);
  assert.throws(() => prepareCatalogUpdates(catalogOriginals(LIMIT, { 3: { scores: low }, 5: { scored_on: "2026-01-01" } }), p, ctx()), /score/);
  const rescored = { ...p, categoryScores: [{ url: "https://r5.example/", scores: good }] };
  const updated = prepareCatalogUpdates(catalogOriginals(LIMIT, { 3: { scores: low }, 5: { scored_on: "2026-01-01" } }), rescored, ctx());
  assert.equal(JSON.parse(updated["data/catalog-status.json"]).resources.find(r => r.url === "https://r5.example/").scored_on, today);
  assert.throws(() => prepareCatalogUpdates(catalogOriginals(LIMIT, { 3: { scores: low } }), { ...p, replacement: superseded({ covers: false }) }, ctx()), /covers/i);
});

test("replacement must relocate the outgoing row", () => {
  const originals = catalogOriginals(LIMIT, { 3: { scores: low } });
  assert.throws(() => prepareCatalogUpdates(originals, catalogProposal({ replacement: superseded(), edits: replaceRow(3) }), ctx()), /verified-catalog/);
  assert.throws(() => prepareCatalogUpdates(originals, catalogProposal({ replacement: disqualified(), edits: replaceRow(3) }), ctx()), /catalog-history/);
});

test("a pre-existing link in the destination doc does not count as relocation", () => {
  const originals = { ...catalogOriginals(LIMIT, { 3: { scores: low } }), "docs/catalog-history.md": `${HISTORY}- Source: [R3](https://r3.example/).\n`, "docs/verified-catalog.md": `${VERIFIED}| [**R3**](https://r3.example/) | old |\n` };
  assert.throws(() => prepareCatalogUpdates(originals, catalogProposal({ replacement: disqualified(), edits: replaceRow(3) }), ctx()), /catalog-history/);
  assert.throws(() => prepareCatalogUpdates(originals, catalogProposal({ replacement: superseded(), edits: replaceRow(3) }), ctx()), /verified-catalog/);
});

test("fetched disqualification evidence counts only on the outgoing entry's host", () => {
  const originals = catalogOriginals(LIMIT);
  const evidence = url => catalogProposal({ replacement: disqualified({ evidenceUrls: [url] }), edits: [...replaceRow(3), toHistory("https://r3.example/")] });
  prepareCatalogUpdates(originals, evidence("https://www.r3.example/blog/sunset"), ctx({ searchedUrls: [], fetchedUrls: ["https://www.r3.example/blog/sunset"] }));
  assert.throws(() => prepareCatalogUpdates(originals, evidence("https://rival.example/r3-archived"), ctx({ searchedUrls: [], fetchedUrls: ["https://rival.example/r3-archived"] })), /outgoing entry's host/);
  prepareCatalogUpdates(originals, evidence("https://rival.example/r3-archived"), ctx({ searchedUrls: ["https://rival.example/r3-archived"] }));
});

test("catalog docs change only for their placement and gain only related links", () => {
  const originals = catalogOriginals(LIMIT, { 3: { scores: low } });
  const spam = "https://spam.example/";
  assert.throws(() => prepareCatalogUpdates(catalogOriginals(LIMIT - 1), catalogProposal({ edits: [...addRow(), toVerified("https://new.example/")] }), ctx()), /verified-catalog\.md may not be edited/);
  assert.throws(() => prepareCatalogUpdates(catalogOriginals(LIMIT - 1), catalogProposal({ edits: [...addRow(), toHistory("https://new.example/")] }), ctx()), /catalog-history\.md may not be edited/);
  assert.throws(() => prepareCatalogUpdates(originals, catalogProposal({ placement: "extended", edits: [toVerified("https://new.example/"), toHistory("https://new.example/")] }), ctx()), /catalog-history\.md may not be edited/);
  assert.throws(() => prepareCatalogUpdates(originals, catalogProposal({ replacement: disqualified(), edits: [...replaceRow(3), toHistory("https://r3.example/"), toVerified("https://r3.example/")] }), ctx()), /verified-catalog\.md may not be edited/);
  assert.throws(() => prepareCatalogUpdates(originals, catalogProposal({ replacement: superseded(), edits: [...replaceRow(3), toVerified("https://r3.example/"), toHistory("https://r3.example/")] }), ctx()), /catalog-history\.md may not be edited/);
  const extraLink = (edit, url) => ({ ...edit, newText: `${edit.newText}\n[More](${url})` });
  assert.throws(() => prepareCatalogUpdates(originals, catalogProposal({ placement: "extended", edits: [extraLink(toVerified("https://new.example/"), spam)] }), ctx()), /unrelated link: https:\/\/spam\.example\//);
  assert.throws(() => prepareCatalogUpdates(originals, catalogProposal({ replacement: superseded(), edits: [...replaceRow(3), extraLink(toVerified("https://r3.example/"), spam)] }), ctx()), /unrelated link/);
  assert.throws(() => prepareCatalogUpdates(originals, catalogProposal({ replacement: disqualified(), edits: [...replaceRow(3), extraLink(toHistory("https://r3.example/"), spam)] }), ctx()), /unrelated link/);
  const related = extraLink(extraLink(toHistory("https://r3.example/"), "https://evidence.example/archived"), "https://github.com/o/r/issues/1");
  assert.match(prepareCatalogUpdates(originals, catalogProposal({ replacement: disqualified(), edits: [...replaceRow(3), related] }), ctx())["docs/catalog-history.md"], /evidence\.example/);
});

test("categoryScores must be valid scores for current rows of the category", () => {
  const p = catalogProposal({ replacement: disqualified(), edits: [...replaceRow(3), toHistory("https://r3.example/")] });
  assert.throws(() => prepareCatalogUpdates(catalogOriginals(LIMIT), { ...p, categoryScores: [{ url: "https://r5.example/", scores: { ...good, activity: 3 } }] }, ctx()), /0-2/);
  assert.throws(() => prepareCatalogUpdates(catalogOriginals(LIMIT), { ...p, categoryScores: [{ url: "https://c.example/", scores: good }] }, ctx()), /current/);
});

test("default prepareUpdates edits README files only", () => {
  const p = catalogProposal({ edits: [...addRow(), toVerified("https://x.example/")] });
  assert.throws(() => prepareUpdates(catalogOriginals(LIMIT - 1), p, { requiredUrl: "https://new.example/" }), /Unsupported file/);
});

test("registry records listed_on, scores and review issue for the incoming entry", () => {
  const updated = prepareCatalogUpdates(catalogOriginals(LIMIT - 1), catalogProposal(), ctx());
  const text = updated["data/catalog-status.json"];
  assert.ok(text.endsWith("}\n"));
  const data = JSON.parse(text);
  assert.deepEqual([data.reviewed_on, data.scope], ["2026-09-18", "test"]);
  const entry = data.resources.find(r => r.url === "https://new.example/");
  assert.deepEqual(
    [entry.id, entry.name, entry.category, entry.location, entry.status, entry.listed_on, entry.verified_on, entry.reviewed_on, entry.scored_on, entry.review_issue],
    ["resource-new", "New", "context", "shortlist", "active", today, today, today, today, "https://github.com/o/r/issues/1"],
  );
  assert.deepEqual(entry.scores, good);
  assert.deepEqual(entry.evidence_urls, ["https://new.example/"]);
});

test("managed files are optional on read and written next to their target", async t => {
  const cwd = await mkdtemp(join(tmpdir(), "catalog-persist-test-"));
  t.after(() => rm(cwd, { recursive: true, force: true }));
  const originals = catalogOriginals(LIMIT - 1);
  for (const file of README_FILES) await writeFile(join(cwd, file), originals[file]);
  assert.deepEqual(Object.keys(await readOriginals(cwd)).sort(), [...README_FILES].sort());
  await mkdir(join(cwd, "docs")); await mkdir(join(cwd, "data"));
  for (const file of ["docs/verified-catalog.md", "docs/catalog-history.md", "data/catalog-status.json"]) await writeFile(join(cwd, file), originals[file]);
  const read = await readOriginals(cwd);
  assert.deepEqual(read, originals);
  const updated = prepareCatalogUpdates(read, catalogProposal(), ctx());
  await persistUpdates(cwd, read, updated);
  assert.match(await readFile(join(cwd, "README.ko.md"), "utf8"), /new\.example/);
  assert.match(await readFile(join(cwd, "data/catalog-status.json"), "utf8"), /resource-new/);
  assert.equal(await readFile(join(cwd, "docs/catalog-history.md"), "utf8"), HISTORY);
});

const uncertain = fields => ({ status: "uncertain", reason: "Holds third-party credentials", edits: [], ...fields });

test("approval waives manual reasons", () => {
  const p = uncertain({ manualReason: "security_sensitive" });
  assert.throws(() => checkResultFields(p, { approved: true, policy }), /^Error: Maintainer approval waives manual-review reasons; decide placement or reject$/);
  checkResultFields(p, { approved: false, policy });
  assert.throws(() => checkResultFields(uncertain({ manualReason: "not_a_reason" }), { policy }), /manualReason/);
});

test("manualReason is only valid for uncertain results", () => {
  for (const status of ["processed", "rejected", "unchanged"]) {
    assert.throws(() => checkResultFields({ ...catalogProposal(), status, manualReason: "conflicting_evidence" }, { policy }), /only valid for uncertain/);
  }
});

test("processed issue results require placement, resource and scores", () => {
  checkResultFields(catalogProposal(), { policy });
  for (const field of ["placement", "resource", "scores"]) {
    const { [field]: _, ...p } = catalogProposal();
    assert.throws(() => checkResultFields(p, { policy }), /placement, resource, and scores/);
  }
  const { security: _, ...noSecurity } = catalogProposal();
  for (const approved of [false, true]) assert.throws(() => checkResultFields(noSecurity, { approved, policy }), /require security/);
  checkResultFields({ status: "rejected", reason: "Out of scope", edits: [] }, { policy });
});

test("weekly results cannot use placement or replacement", () => {
  for (const field of ["placement", "resource", "scores", "replacement", "categoryScores", "manualReason", "security"]) {
    assert.throws(() => checkResultFields({ status: "unchanged", reason: "None", edits: [], [field]: catalogProposal({ replacement: superseded(), categoryScores: [], manualReason: "security_sensitive" })[field] }, { weekly: true, policy }), /Weekly results/);
  }
  checkResultFields({ status: "unchanged", reason: "None", edits: [] }, { weekly: true, policy });
});

const observedUrls = new Set(["https://new.example/", "https://github.com/new/new"]);
const securityCtx = (fields = {}) => ({ signals: policy.securitySignals, approved: false, observedUrls, texts: ["Add New", "A context tool"], ...fields });

test("policy lists lowercase security signals", () => {
  for (const signal of ["credential", "vault", "oauth", "api key", "access token", "connected app", "payment", "billing", "remote command", "shell access"]) assert.ok(policy.securitySignals.includes(signal), signal);
  assert.ok(policy.securitySignals.every(signal => signal === signal.toLowerCase()));
});

test("security signals in issue or fetched text route a non-vendor tool to manual review", () => {
  const texts = ["Add Aident Loadout", "Hosted MCP for your connected apps; your credentials stay in a vault."];
  assert.throws(() => checkSecurity(security(), securityCtx({ texts })), /^Error: Security signals found \(credential, vault, connected app\); submit uncertain with manualReason security_sensitive unless the resource is an official vendor tool$/);
  assert.throws(() => checkSecurity(security(), securityCtx({ texts: ["Supports OAUTH login"] })), /Security signals found \(oauth\)/);
  checkSecurity(security(), securityCtx());
});

test("risk flags on a non-vendor tool require manual review unless the maintainer approved", () => {
  for (const flag of ["storesThirdPartyCredentials", "relaysCredentials", "handlesPayments", "executesRemoteCommands"]) {
    assert.throws(() => checkSecurity(security({ [flag]: true }), securityCtx()), /^Error: Security-sensitive third-party tool; submit uncertain with manualReason security_sensitive$/);
    checkSecurity(security({ [flag]: true }), securityCtx({ approved: true }));
  }
  checkSecurity(security({ storesThirdPartyCredentials: true }), securityCtx({ approved: true, texts: ["credentials stay in a vault"] }));
});

test("an unflagged official vendor tool passes security signals, but risk flags hold even official tools", () => {
  checkSecurity(security({ officialVendor: true }), securityCtx({ texts: ["Prisma MCP server", "Sign in with OAuth to manage your databases"] }));
  assert.throws(() => checkSecurity(security({ officialVendor: true, storesThirdPartyCredentials: true }), securityCtx({ texts: ["Aident Loadout by Aident", "Your credentials for connected apps stay in a vault"] })), /^Error: Security-sensitive third-party tool; submit uncertain with manualReason security_sensitive$/);
  for (const flag of ["storesThirdPartyCredentials", "relaysCredentials", "handlesPayments", "executesRemoteCommands"]) assert.throws(() => checkSecurity(security({ officialVendor: true, [flag]: true }), securityCtx()), /Security-sensitive/);
});

test("security evidence must be observed and the field must be well formed", () => {
  for (const approved of [false, true]) {
    assert.throws(() => checkSecurity(security({ evidenceUrls: ["https://unseen.example/"] }), securityCtx({ approved })), /Security evidence URL was not returned/);
    for (const bad of [undefined, security({ evidenceUrls: [] }), security({ evidenceUrls: Array(6).fill("https://new.example/") }), security({ officialVendor: "no" }), { evidenceUrls: ["https://new.example/"] }]) {
      assert.throws(() => checkSecurity(bad, securityCtx({ approved })), /security requires/);
    }
  }
});

const checksPassed = { relevant: true, usable: true, distinct: true, transparent: true, maintained: true, available_to_new_users: true, not_sunsetting: true };
const issueUrl = "https://github.com/o/r/issues/7";

test("issue comment names the placement, evidence and scores", () => {
  const evidenceUrls = ["https://new.example/", "https://github.com/new/new"];
  const extended = formatIssueComment({ status: "processed", placement: "extended", reason: "Context is full and no row is disqualified or lower scored", checks: checksPassed, evidenceUrls, scores: low }, { issueUrl });
  assert.match(extended, /^## ✅ Added to the extended catalog/);
  assert.match(extended, /not added to the README/);
  assert.match(extended, /no row is disqualified/);
  for (const url of evidenceUrls) assert.ok(extended.includes(url));
  assert.match(extended, /\| maintained \| ✅ \|/);
  assert.match(extended, /\| activity \| 1 \|/);
  assert.match(extended, /\*\*Total\*\* \| \*\*5\*\*/);
  assert.doesNotMatch(extended, /\/approve/);
  const replaced = formatIssueComment({
    status: "processed", placement: "readme", reason: "Broader and maintained", checks: checksPassed, evidenceUrls, scores: { ...low, activity: 2, documentation: 2 },
    replacement: { outgoingUrl: "https://r3.example/", outgoingName: "R3", outgoingTotal: 5, path: "superseded", evidenceUrls: ["https://compare.example/"] },
  }, { issueUrl });
  assert.match(replaced, /^## ✅ Added to the README, replacing R3/);
  assert.match(replaced, /7 > 5/);
  for (const url of [...evidenceUrls, "https://compare.example/", "https://r3.example/"]) assert.ok(replaced.includes(url));
  assert.match(formatIssueComment({ status: "processed", placement: "readme", reason: "Free slot", checks: checksPassed, evidenceUrls, scores: good }, { issueUrl }), /^## ✅ Added to the README\n/);
  const disqualifiedComment = formatIssueComment({ status: "processed", placement: "readme", reason: "Archived", checks: checksPassed, evidenceUrls, scores: good, replacement: { outgoingUrl: "https://r3.example/", path: "disqualified", disqualification: "archived", evidenceUrls: ["https://evidence.example/archived"] } }, { issueUrl });
  assert.match(disqualifiedComment, /replacing https:\/\/r3\.example\//);
  assert.match(disqualifiedComment, /archived/);
  assert.ok(disqualifiedComment.includes("https://evidence.example/archived"));
  const review = formatIssueComment({ status: "uncertain", manualReason: "security_sensitive", reason: "Stores third-party credentials", evidenceUrls: ["https://new.example/"] }, { issueUrl });
  assert.match(review, /^## 🤔 Needs maintainer review — Security-sensitive third-party tool/);
  assert.match(review, /`\/approve`/);
  assert.match(review, /`\/reject \[reason\]`/);
  assert.match(formatIssueComment({ status: "uncertain", reason: "Unclear" }, { issueUrl }), /^## 🤔 Needs maintainer review\n/);
  const secured = formatIssueComment({ status: "processed", placement: "readme", reason: "Free slot", checks: checksPassed, evidenceUrls, scores: good, security: security({ officialVendor: true, storesThirdPartyCredentials: true }) }, { issueUrl });
  assert.match(secured, /\| Security flag \| Value \|/);
  assert.match(secured, /\| storesThirdPartyCredentials \| yes \|/);
  assert.match(secured, /\| executesRemoteCommands \| no \|/);
  assert.match(secured, /\| officialVendor \| yes \|/);
  assert.doesNotMatch(formatIssueComment({ status: "uncertain", reason: "Unclear" }, { issueUrl }), /Security flag/);
  const rejected = formatIssueComment({ status: "rejected", reason: "Out of scope" }, { issueUrl });
  assert.match(rejected, /^## ❌ Rejected/);
  assert.match(rejected, /Out of scope/);
  assert.doesNotMatch(rejected, /\/approve/);
});

test("processIssue writes outputs and a comment file", async t => {
  const dir = await mkdtemp(join(tmpdir(), "process-issue-test-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const output = join(dir, "output");
  const body = `Please add https://new.example/ (docs: https://docs.new.example/start).\n${Array.from({ length: 12 }, (_, i) => `https://more${i}.example/`).join("\n")}`;
  const env = { ISSUE_BODY: body, ISSUE_NUMBER: "7", ISSUE_TITLE: "Add New", GITHUB_REPOSITORY: "o/r", GITHUB_OUTPUT: output, RUNNER_TEMP: dir };
  let options;
  const run = async opts => { options = opts; return { status: "unchanged", reason: "Holds\nthird-party credentials", manualReason: "security_sensitive", evidenceUrls: ["https://new.example/"] }; };
  await processIssue({ approved: false, env, run });
  assert.equal(options.requiredUrl, "https://new.example/");
  assert.equal(options.approved, false);
  assert.equal(options.issueUrl, issueUrl);
  assert.equal(options.fetchableUrls.length, 10);
  assert.deepEqual(options.fetchableUrls.slice(0, 3), ["https://new.example/", "https://docs.new.example/start", "https://more0.example/"]);
  assert.match(options.prompt, /Maintainer approved: false/);
  assert.deepEqual(options.issueText, ["Add New", body]);
  const commentFile = join(dir, "issue-comment.md");
  assert.equal(await readFile(output, "utf8"), `result=uncertain\nreason=Holds third-party credentials\nplacement=\nmanual_reason=security_sensitive\nreplaced=false\ncomment_file=${commentFile}\n`);
  assert.match(await readFile(commentFile, "utf8"), /Needs maintainer review — Security-sensitive third-party tool/);
  await writeFile(output, "");
  await processIssue({ approved: true, env: { ...env, RUNNER_TEMP: undefined }, run: async opts => { options = opts; return { status: "processed", reason: "Added", placement: "extended", scores: good, evidenceUrls: [] }; } });
  assert.equal(options.approved, true);
  assert.equal(await readFile(output, "utf8"), "result=processed\nreason=Added\nplacement=extended\nmanual_reason=\nreplaced=false\n");
  await writeFile(output, "");
  await processIssue({ approved: true, env: { ...env, RUNNER_TEMP: undefined }, run: async () => ({ status: "processed", reason: "Swapped", placement: "readme", scores: good, evidenceUrls: [], replacement: { outgoingUrl: "https://old.example/", path: "disqualified" } }) });
  assert.match(await readFile(output, "utf8"), /placement=readme\nmanual_reason=\nreplaced=true\n/);
});

test("processIssue strips trailing punctuation and unmatched brackets from issue URLs", async () => {
  const body = "Add https://new.example/tool. See [docs](https://docs.new.example/start), (https://blog.example/post), https://wiki.example/A_(b)! and [https://repo.example/x]";
  let options;
  await processIssue({ env: { ISSUE_BODY: body }, run: async opts => { options = opts; return { status: "uncertain", reason: "Check" }; } });
  assert.equal(options.requiredUrl, "https://new.example/tool");
  assert.deepEqual(options.fetchableUrls, ["https://new.example/tool", "https://docs.new.example/start", "https://blog.example/post", "https://wiki.example/A_(b)", "https://repo.example/x"]);
});
