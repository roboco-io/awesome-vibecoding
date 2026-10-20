import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { resolveConfig, DEEPSEEK_DEFAULT_MODEL } from "./lib/pi-config.mjs";
import { README_FILES, prepareUpdates, persistUpdates, outputRecord } from "./lib/readme-updates.mjs";
import { runSession, runAutomation } from "./lib/pi-runner.mjs";
import { searchWeb, fetchPage } from "./lib/research.mjs";
import { ResearchStore } from "./lib/research-store.mjs";
import { validateEvidence, CURATION_CHECKS } from "./lib/curation.mjs";
import { loadRegistrationPolicy } from "./lib/registration-policy.mjs";
import { ModelRuntime } from "@earendil-works/pi-coding-agent";
import { createAssistantMessageEventStream } from "@earendil-works/pi-ai/utils/event-stream";

const source = "# Resources\n\n| Tool | Description |\n|---|---|\n| [Old](https://old.example/) | Existing |\n";
const originals = () => Object.fromEntries(README_FILES.map(file => [file, source]));
const proposal = () => ({
  checks: Object.fromEntries(CURATION_CHECKS.map(check => [check, true])), evidenceUrls: ["https://new.example/"],
  status: "processed", reason: "Added New", edits: README_FILES.map(file => ({
    file, oldText: "| [Old](https://old.example/) | Existing |",
    newText: "| [Old](https://old.example/) | Existing |\n| [New](https://new.example/) | New resource |",
  })),
});

test("acceptance requires every curation gate and evidence from actual search results", () => {
  const observed = { searched: new Set(["https://new.example/"]), fetched: new Set(), requireIndependent: false };
  const none = { searched: new Set(), fetched: new Set(), requireIndependent: false };
  validateEvidence(proposal(), observed);
  for (const check of CURATION_CHECKS) {
    const p = proposal(); p.checks[check] = false;
    assert.throws(() => validateEvidence(p, observed), new RegExp(check));
  }
  assert.throws(() => validateEvidence(proposal(), none), /not returned/);
  assert.throws(() => validateEvidence({ ...proposal(), evidenceUrls: [] }, observed), /evidence/);
  validateEvidence({ status: "uncertain" }, none);
});

test("fetched URLs count as evidence but require an independent source", async () => {
  const policy = await loadRegistrationPolicy();
  const fetched = new Set(["https://learnmagic.ai/learn"]);
  const p = { ...proposal(), evidenceUrls: ["https://learnmagic.ai/learn"] };
  const options = { searched: new Set(), fetched, submittedUrl: "https://learnmagic.ai", policy, requireIndependent: true };
  assert.throws(() => validateEvidence(p, options), /independent source/);
  validateEvidence(p, { ...options, requireIndependent: false });
  fetched.add("https://github.com/learnmagic-ai/skills");
  validateEvidence({ ...p, evidenceUrls: [...p.evidenceUrls, "https://github.com/learnmagic-ai/skills"] }, options);
  assert.throws(() => validateEvidence({ ...p, evidenceUrls: ["not a url"] }, { ...options, fetched: new Set(["not a url"]) }), /independent source/);
  const review = "https://review.example/learnmagic";
  assert.throws(() => validateEvidence({ ...p, evidenceUrls: [...p.evidenceUrls, review] }, { ...options, fetched: new Set([...fetched, review]) }), /independent source/);
  validateEvidence({ ...p, evidenceUrls: [...p.evidenceUrls, review] }, { ...options, searched: new Set([review]) });
});

test("defaults to DeepSeek and requires only its key", () => {
  const config = resolveConfig({ DEEPSEEK_API_KEY: "test" });
  assert.equal(config.provider, "deepseek");
  assert.equal(config.model.id, DEEPSEEK_DEFAULT_MODEL);
  assert.equal(config.model.baseUrl, "https://api.deepseek.com");
  assert.throws(() => resolveConfig({}), /DEEPSEEK_API_KEY/);
  assert.equal(resolveConfig({ AI_PROVIDER: "kimi", KIMI_API_KEY: "t" }).model.compat.maxTokensField, "max_completion_tokens");
});

test("Qwen uses the official pay-as-you-go endpoint and supports model overrides", () => {
  const config = resolveConfig({ AI_PROVIDER: "qwen", DASHSCOPE_API_KEY: "test" });
  assert.equal(config.model.id, "qwen3.8-max");
  assert.equal(config.model.baseUrl, "https://dashscope-intl.aliyuncs.com/compatible-mode/v1");
  assert.equal(resolveConfig({ AI_PROVIDER: "qwen", AI_MODEL: "qwen3.8-max-0902", DASHSCOPE_API_KEY: "test" }).model.id, "qwen3.8-max-0902");
  assert.throws(() => resolveConfig({ AI_PROVIDER: "other" }), /AI_PROVIDER/);
  assert.throws(() => resolveConfig({ DEEPSEEK_API_KEY: "test", AI_MAX_TURNS: "0" }), /AI_MAX_TURNS/);
});

test("accepts matching additions in all three languages", () => {
  const updated = prepareUpdates(originals(), proposal(), { requiredUrl: "https://new.example/" });
  for (const file of README_FILES) assert.match(updated[file], /New resource/);
});

test("rejects partial translations, missing requested URL, ambiguous edits and unsafe paths", () => {
  const partial = proposal(); partial.edits.pop();
  assert.throws(() => prepareUpdates(originals(), partial), /three|language/i);
  assert.throws(() => prepareUpdates(originals(), proposal(), { requiredUrl: "https://different.example/" }), /requested URL/i);
  const path = proposal(); path.edits[0].file = "../package.json";
  assert.throws(() => prepareUpdates(originals(), path), /file/i);
  const missing = proposal(); missing.edits[0].oldText = "Not present";
  assert.throws(() => prepareUpdates(originals(), missing), /exactly once/i);
  assert.throws(() => prepareUpdates(originals(), { status: "uncertain", reason: "Unsure", edits: proposal().edits }), /edits/i);
});

test("rejects removed links, duplicate additions, corrupt tables and executable markup", () => {
  for (const change of [
    p => { p.edits[0].newText = p.edits[0].newText.replace("https://old.example/", "https://removed.example/"); },
    p => { p.edits.forEach(e => { e.newText += "\n| [New](https://new.example/) | Duplicate |"; }); },
    p => { p.edits[0].newText += "\n| wrong | number | of cells |"; },
    p => { p.edits[0].newText += "\n<script>alert(1)</script>"; },
  ]) {
    const p = proposal(); change(p);
    assert.throws(() => prepareUpdates(originals(), p));
  }
});

test("failed validation does not touch disk and concurrent edits are preserved", async t => {
  const cwd = await mkdtemp(join(tmpdir(), "pi-updates-test-"));
  t.after(() => rm(cwd, { recursive: true, force: true }));
  for (const file of README_FILES) await writeFile(join(cwd, file), source);
  const updated = prepareUpdates(originals(), proposal());
  await writeFile(join(cwd, README_FILES[1]), "User change");
  await assert.rejects(persistUpdates(cwd, originals(), updated), /changed/i);
  assert.equal(await readFile(join(cwd, README_FILES[0]), "utf8"), source);
  assert.equal(await readFile(join(cwd, README_FILES[1]), "utf8"), "User change");
});

test("GitHub outputs cannot be extended with newline or carriage-return injection", () => {
  const record = outputRecord("reason", "bad\nresult=processed\rnext=value");
  assert.equal(record.split("\n").filter(Boolean).length, 1);
  assert.throws(() => outputRecord("bad\nkey", "value"));
});

function fakeSession(stopReason = "stop", events = []) {
  let listener;
  return {
    messages: [{ role: "assistant", stopReason, content: [] }],
    subscribe(fn) { listener = fn; return () => {}; },
    async prompt() { for (const e of events) listener(e); },
    async abort() { this.aborted = true; },
    dispose() { this.disposed = true; },
  };
}

test("Pi errors and truncated output fail closed even after a proposal was submitted", async () => {
  for (const stopReason of ["error", "aborted", "length", "toolUse"]) {
    const session = fakeSession(stopReason);
    await assert.rejects(runSession(session, "test", { maxTurns: 3, timeoutMs: 1000 }), /successful|failed|complete/i);
    assert.equal(session.disposed, true);
  }
});

test("Pi successful completion succeeds; exceeding the turn limit aborts", async () => {
  const session = fakeSession();
  await runSession(session, "test", { maxTurns: 3, timeoutMs: 1000 });
  assert.equal(session.disposed, true);
  const looping = fakeSession("stop", Array.from({ length: 4 }, () => ({ type: "turn_start" })));
  await assert.rejects(runSession(looping, "test", { maxTurns: 3, timeoutMs: 1000 }), /turn/i);
  assert.equal(looping.aborted, true);
});

test("Exa Search uses a fixed endpoint and rejects HTTP failures", async () => {
  let request;
  const result = await searchWeb("AI coding", { apiKey: "secret", fetch: async (url, options) => {
    request = { url, options }; return { ok: true, json: async () => ({ results: [{ title: "New", url: "https://new.example/", text: "Description" }] }) };
  } });
  assert.equal(request.url, "https://api.exa.ai/search");
  assert.equal(JSON.parse(request.options.body).query, "AI coding");
  assert.equal(request.options.headers["x-api-key"], "secret");
  assert.equal(result[0].snippet, "Description");
  assert.equal(result[0].url, "https://new.example/");
  await assert.rejects(searchWeb("AI coding", { apiKey: "secret", fetch: async () => ({ ok: false, status: 429 }) }), /429/);
});

test("Exa contents fetch uses a fixed endpoint and rejects HTTP failures", async () => {
  let request;
  const page = await fetchPage("https://a.example/", { apiKey: "secret", fetch: async (url, options) => {
    request = { url, options }; return { ok: true, json: async () => ({ results: [{ title: "A", url: "https://a.example/", text: "Body" }] }) };
  } });
  assert.equal(request.url, "https://api.exa.ai/contents");
  assert.deepEqual(JSON.parse(request.options.body), { urls: ["https://a.example/"], text: { maxCharacters: 6000 } });
  assert.equal(request.options.headers["x-api-key"], "secret");
  assert.deepEqual(page, { title: "A", url: "https://a.example/", snippet: "Body" });
  await assert.rejects(fetchPage("https://a.example/", { apiKey: "secret", fetch: async () => ({ ok: false, status: 429 }) }), /429/);
  await assert.rejects(fetchPage("https://a.example/", { apiKey: "secret", fetch: async () => ({ ok: true, json: async () => ({ results: [] }) }) }), /no page/);
  const stub = body => ({ apiKey: "secret", fetch: async () => ({ ok: true, json: async () => body }) });
  await assert.rejects(fetchPage("https://a.example/", stub({ results: [{ url: "https://a.example/", text: "Body" }], statuses: [{ id: "https://a.example/", status: "error" }] })), /failed for this URL/);
  await assert.rejects(fetchPage("https://a.example/", stub({ results: [{ url: "https://a.example/", text: "  " }] })), /failed for this URL/);
});

const catalogSource = source.replace("| Tool |", "<!-- catalog:context -->\n| Tool |") + "<!-- /catalog:context -->\n";
const catalogFiles = {
  ...Object.fromEntries(README_FILES.map(file => [file, catalogSource])),
  "docs/verified-catalog.md": "# Verified\n", "docs/catalog-history.md": "# History\n",
  "data/catalog-status.json": JSON.stringify({ resources: [{ id: "resource-old", name: "Old", url: "https://old.example/", aliases: ["https://old.example/"], category: "context", status: "active", location: "shortlist" }] }, null, 2) + "\n",
};
const writeCatalog = async cwd => { for (const [file, text] of Object.entries(catalogFiles)) await writeFile(join(cwd, file), text); };
const assertCatalogUnchanged = async cwd => { for (const [file, text] of Object.entries(catalogFiles)) assert.equal(await readFile(join(cwd, file), "utf8"), text); };
const scores = { activity: 2, documentation: 2, access: 1, independent_sources: 1, category_fit: 2 };
const security = (fields = {}) => ({ storesThirdPartyCredentials: false, relaysCredentials: false, handlesPayments: false, executesRemoteCommands: false, officialVendor: false, evidenceUrls: ["https://new.example/"], ...fields });

test("real Pi SDK executes only custom tools and persists only a successful full result", async t => {
  const cwd = await mkdtemp(join(tmpdir(), "pi-sdk-test-"));
  t.after(() => rm(cwd, { recursive: true, force: true }));
  await mkdir(join(cwd, "docs")); await mkdir(join(cwd, "data"));
  await writeCatalog(cwd);
  let call = 0;
  let fail = false;
  let rejectCriteria = false;
  let retiredResource = false;
  t.mock.method(globalThis, "fetch", async url => {
    assert.equal(url, "https://api.exa.ai/search");
    return { ok: true, json: async () => ({ results: [{ url: "https://new.example/", title: "New", text: "Official docs" }] }) };
  });
  t.mock.method(ModelRuntime.prototype, "streamSimple", (model, context) => {
    assert.deepEqual(context.tools.map(tool => tool.name).sort(), ["lookup_resource", "read_readme", "search_web", "submit_result"]);
    const step = call++ % 3;
    const p = { ...proposal(), placement: "readme", resource: { id: "resource-new", name: "New", category: "context" }, scores, security: security() };
    if (rejectCriteria) p.checks.relevant = false;
    if (retiredResource) p.edits.forEach(edit => { edit.newText = edit.newText.replaceAll("https://new.example/", "https://aws.amazon.com/q/developer/"); });
    const message = {
      role: "assistant", api: model.api, provider: model.provider, model: model.id, timestamp: Date.now(),
      content: step === 0 ? [{ type: "toolCall", id: "search-test", name: "search_web", arguments: { query: "New official docs" } }] : step === 1 ? [{ type: "toolCall", id: "submit-test", name: "submit_result", arguments: p }] : [{ type: "text", text: "Done" }],
      stopReason: step < 2 ? "toolUse" : fail ? "error" : "stop",
      usage: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, totalTokens: 0, cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 } },
    };
    const stream = createAssistantMessageEventStream();
    stream.push({ type: "start", partial: message });
    stream.push(message.stopReason === "error" ? { type: "error", reason: "error", error: message } : { type: "done", reason: message.stopReason, message });
    return stream;
  });
  const env = { DEEPSEEK_API_KEY: "test-only", EXA_API_KEY: "test-only", AI_TIMEOUT_SECONDS: "5" };
  const requiredUrl = "https://new.example/";
  const added = await runAutomation({ cwd, env, prompt: "Add New", approved: true, requiredUrl, issueUrl: "https://github.com/o/r/issues/1" });
  assert.deepEqual(added, { status: "processed", reason: "Added New", placement: "readme", manualReason: undefined, checks: proposal().checks, evidenceUrls: ["https://new.example/"], scores, security: security(), replacement: undefined });
  assert.match(await readFile(join(cwd, "README.ja.md"), "utf8"), /new.example/);
  const entry = JSON.parse(await readFile(join(cwd, "data/catalog-status.json"), "utf8")).resources.find(r => r.url === requiredUrl);
  assert.deepEqual([entry.location, entry.review_issue], ["shortlist", "https://github.com/o/r/issues/1"]);
  await writeCatalog(cwd);
  fail = true;
  await assert.rejects(runAutomation({ cwd, env, prompt: "Add New", approved: true, requiredUrl }), /failed/);
  await assertCatalogUnchanged(cwd);
  fail = false;
  rejectCriteria = true;
  await assert.rejects(runAutomation({ cwd, env, prompt: "Add unrelated resource", approved: true, requiredUrl }), /criterion|without submitting/);
  await assertCatalogUnchanged(cwd);
  rejectCriteria = false;
  retiredResource = true;
  await assert.rejects(runAutomation({ cwd, env, prompt: "Re-add a sunset product", approved: true, requiredUrl: "https://aws.amazon.com/q/developer/" }), /catalog decision|without submitting/);
  await assertCatalogUnchanged(cwd);
});

test("fetch_page only reads issue URLs", async t => {
  const cwd = await mkdtemp(join(tmpdir(), "pi-fetch-test-"));
  t.after(() => rm(cwd, { recursive: true, force: true }));
  for (const file of README_FILES) await writeFile(join(cwd, file), source);
  const fetched = [];
  t.mock.method(globalThis, "fetch", async (url, options) => {
    fetched.push(JSON.parse(options.body).urls[0]);
    return { ok: true, json: async () => ({ results: [{ url: "https://issue.example/", title: "Issue", text: "Page" }] }) };
  });
  let call = 0;
  let toolResults = [];
  t.mock.method(ModelRuntime.prototype, "streamSimple", (model, context) => {
    assert.ok(context.tools.some(tool => tool.name === "fetch_page"));
    const step = call++;
    toolResults = context.messages.filter(message => message.role === "toolResult");
    const url = step === 0 ? "https://other.example/" : "https://issue.example/";
    const message = {
      role: "assistant", api: model.api, provider: model.provider, model: model.id, timestamp: Date.now(),
      content: step < 7 ? [{ type: "toolCall", id: `fetch-${step}`, name: "fetch_page", arguments: { url } }] : [{ type: "text", text: "Done" }],
      stopReason: step < 7 ? "toolUse" : "stop",
      usage: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, totalTokens: 0, cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 } },
    };
    const stream = createAssistantMessageEventStream();
    stream.push({ type: "start", partial: message });
    stream.push({ type: "done", reason: message.stopReason, message });
    return stream;
  });
  const env = { DEEPSEEK_API_KEY: "test-only", EXA_API_KEY: "test-only", AI_TIMEOUT_SECONDS: "5" };
  await assert.rejects(runAutomation({ cwd, env, prompt: "Check", fetchableUrls: ["https://issue.example/"] }), /without submitting/);
  const texts = toolResults.map(message => message.content.map(part => part.text).join(""));
  assert.equal(toolResults.length, 7);
  assert.match(texts[0], /URL is not part of the issue/);
  for (const text of texts.slice(1, 6)) assert.match(text, /Page/);
  assert.match(texts[6], /Fetch limit exceeded/);
  assert.equal(fetched.length, 5);
  assert.deepEqual([...new Set(fetched)], ["https://issue.example/"]);
});

test("a fetched second-domain page is not independent evidence unless the maintainer approved", async t => {
  const cwd = await mkdtemp(join(tmpdir(), "pi-independent-test-"));
  t.after(() => rm(cwd, { recursive: true, force: true }));
  await mkdir(join(cwd, "docs")); await mkdir(join(cwd, "data"));
  await writeCatalog(cwd);
  const requiredUrl = "https://new.example/";
  const review = "https://review.example/new";
  t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url, "https://api.exa.ai/contents");
    const [page] = JSON.parse(options.body).urls;
    return { ok: true, json: async () => ({ results: [{ url: page, title: "Page", text: "Great tool" }] }) };
  });
  let call = 0;
  let toolResults = [];
  t.mock.method(ModelRuntime.prototype, "streamSimple", (model, context) => {
    const step = call++ % 4;
    if (step === 3) toolResults = context.messages.filter(message => message.role === "toolResult");
    const p = { ...proposal(), evidenceUrls: [requiredUrl, review], placement: "readme", resource: { id: "resource-new", name: "New", category: "context" }, scores, security: security() };
    const calls = [{ name: "fetch_page", arguments: { url: requiredUrl } }, { name: "fetch_page", arguments: { url: review } }, { name: "submit_result", arguments: p }];
    const message = {
      role: "assistant", api: model.api, provider: model.provider, model: model.id, timestamp: Date.now(),
      content: step < 3 ? [{ type: "toolCall", id: `call-${step}`, ...calls[step] }] : [{ type: "text", text: "Done" }],
      stopReason: step < 3 ? "toolUse" : "stop",
      usage: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, totalTokens: 0, cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 } },
    };
    const stream = createAssistantMessageEventStream();
    stream.push({ type: "start", partial: message });
    stream.push({ type: "done", reason: message.stopReason, message });
    return stream;
  });
  const env = { DEEPSEEK_API_KEY: "test-only", EXA_API_KEY: "test-only", AI_TIMEOUT_SECONDS: "5" };
  const options = { cwd, env, prompt: "Add New", requiredUrl, fetchableUrls: [requiredUrl, review] };
  await assert.rejects(runAutomation(options), /without submitting/);
  assert.match(toolResults.at(-1).content.map(part => part.text).join(""), /independent source/);
  await assertCatalogUnchanged(cwd);
  const added = await runAutomation({ ...options, approved: true });
  assert.deepEqual([added.status, added.evidenceUrls], ["processed", [requiredUrl, review]]);
  assert.match(await readFile(join(cwd, "README.md"), "utf8"), /new\.example/);
});

test("security signals from the issue and fetched pages hold a non-vendor tool for review", async t => {
  const cwd = await mkdtemp(join(tmpdir(), "pi-security-test-"));
  t.after(() => rm(cwd, { recursive: true, force: true }));
  await mkdir(join(cwd, "docs")); await mkdir(join(cwd, "data"));
  await writeCatalog(cwd);
  const requiredUrl = "https://new.example/";
  const repo = "https://github.com/new/new";
  t.mock.method(globalThis, "fetch", async (url, options) => {
    const [page] = JSON.parse(options.body).urls;
    return { ok: true, json: async () => ({ results: [{ url: page, title: "Page", text: page === requiredUrl ? "Hosted MCP. Your credentials stay in a vault." : "Source code" }] }) };
  });
  let call = 0;
  let toolResults = [];
  let fields = {};
  t.mock.method(ModelRuntime.prototype, "streamSimple", (model, context) => {
    const step = call++ % 4;
    if (step === 3) toolResults = context.messages.filter(message => message.role === "toolResult");
    const p = { ...proposal(), evidenceUrls: [requiredUrl, repo], placement: "readme", resource: { id: "resource-new", name: "New", category: "context" }, scores, security: security(), ...fields };
    const calls = [{ name: "fetch_page", arguments: { url: requiredUrl } }, { name: "fetch_page", arguments: { url: repo } }, { name: "submit_result", arguments: p }];
    const message = {
      role: "assistant", api: model.api, provider: model.provider, model: model.id, timestamp: Date.now(),
      content: step < 3 ? [{ type: "toolCall", id: `call-${step}`, ...calls[step] }] : [{ type: "text", text: "Done" }],
      stopReason: step < 3 ? "toolUse" : "stop",
      usage: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, totalTokens: 0, cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 } },
    };
    const stream = createAssistantMessageEventStream();
    stream.push({ type: "start", partial: message });
    stream.push({ type: "done", reason: message.stopReason, message });
    return stream;
  });
  const env = { DEEPSEEK_API_KEY: "test-only", EXA_API_KEY: "test-only", AI_TIMEOUT_SECONDS: "5" };
  const options = { cwd, env, prompt: "Add New", requiredUrl, fetchableUrls: [requiredUrl, repo], issueText: ["Add New", "Please add a hosted MCP"] };
  await assert.rejects(runAutomation(options), /without submitting/);
  assert.match(toolResults.at(-1).content.map(part => part.text).join(""), /Security signals found \(credential, vault\)/);
  await assertCatalogUnchanged(cwd);
  await assert.rejects(runAutomation({ ...options, issueText: ["Add New", "Uses OAuth"] }), /without submitting/);
  assert.match(toolResults.at(-1).content.map(part => part.text).join(""), /Security signals found \(credential, vault, oauth\)/);
  fields = { security: security({ evidenceUrls: ["https://unseen.example/"] }) };
  await assert.rejects(runAutomation({ ...options, approved: true }), /without submitting/);
  assert.match(toolResults.at(-1).content.map(part => part.text).join(""), /Security evidence URL was not returned/);
  await assertCatalogUnchanged(cwd);
  fields = { security: security({ storesThirdPartyCredentials: true }) };
  const added = await runAutomation({ ...options, approved: true });
  assert.deepEqual([added.status, added.security.storesThirdPartyCredentials], ["processed", true]);
});

test("weekly results cannot include security", async t => {
  const cwd = await mkdtemp(join(tmpdir(), "pi-weekly-security-test-"));
  t.after(() => rm(cwd, { recursive: true, force: true }));
  for (const file of README_FILES) await writeFile(join(cwd, file), source);
  t.mock.method(globalThis, "fetch", async () => ({ ok: true, json: async () => ({ results: [{ url: "https://new.example/", title: "New", text: "Docs" }] }) }));
  let call = 0;
  let toolResults = [];
  t.mock.method(ModelRuntime.prototype, "streamSimple", (model, context) => {
    const step = call++;
    if (step === 2) toolResults = context.messages.filter(message => message.role === "toolResult");
    const calls = [{ name: "search_web", arguments: { query: "New" } }, { name: "submit_result", arguments: { status: "unchanged", reason: "None", edits: [], security: security() } }];
    const message = {
      role: "assistant", api: model.api, provider: model.provider, model: model.id, timestamp: Date.now(),
      content: step < 2 ? [{ type: "toolCall", id: `call-${step}`, ...calls[step] }] : [{ type: "text", text: "Done" }],
      stopReason: step < 2 ? "toolUse" : "stop",
      usage: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, totalTokens: 0, cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 } },
    };
    const stream = createAssistantMessageEventStream();
    stream.push({ type: "start", partial: message });
    stream.push({ type: "done", reason: message.stopReason, message });
    return stream;
  });
  const env = { DEEPSEEK_API_KEY: "test-only", EXA_API_KEY: "test-only", AI_TIMEOUT_SECONDS: "5" };
  await assert.rejects(runAutomation({ cwd, env, prompt: "Weekly", weekly: true }), /without submitting/);
  assert.match(toolResults.at(-1).content.map(part => part.text).join(""), /Weekly results cannot include .*security/);
});

test("research cache handles quoted queries, force refresh, candidates and failed-run rollback", async t => {
  const cwd = await mkdtemp(join(tmpdir(), "pi-cache-test-"));
  const scratch = await mkdtemp(join(tmpdir(), "pi-cache-stage-"));
  t.after(() => Promise.all([rm(cwd, { recursive: true, force: true }), rm(scratch, { recursive: true, force: true })]));
  let calls = 0;
  const fetcher = async () => { calls++; return [{ url: "https://new.example/", title: "New", snippet: "Source" }]; };
  const store = await ResearchStore.open(cwd, scratch);
  await store.search("what's new", fetcher);
  await store.search("what's new", fetcher);
  assert.equal(calls, 1);
  await store.search("what's new", fetcher, true);
  assert.equal(calls, 2);
  store.queueCandidate({ url: "https://new.example/", name: "O'Reilly", category: "ide", description: "Candidate's detail" });
  assert.equal(store.pending()[0].name, "O'Reilly");
  for (const suffix of ["rejected", "deferred", "already-listed"]) store.queueCandidate({ url: `https://${suffix}.example/`, name: suffix, category: "ide", description: "Old candidate" });
  store.reviewCandidate({ url: "https://rejected.example/", status: "rejected", reason: "Unrelated resource" });
  store.reviewCandidate({ url: "https://deferred.example/", status: "deferred", reason: "Needs more evidence" });
  store.markAdded(["https://already-listed.example/"]);
  assert.deepEqual(store.pending().map(row => row.url), ["https://new.example/"]);
  assert.throws(() => store.reviewCandidate({ url: "https://new.example/", status: "added", reason: "Skip validation" }), /status/i);
  await store.commit(["https://new.example/"]);
  store.close();
  const second = await ResearchStore.open(cwd, scratch);
  assert.equal(second.pending().length, 0);
  await second.search("what's new", fetcher);
  assert.equal(calls, 2);
  second.queueCandidate({ url: "https://uncommitted.example/", name: "Rollback", category: "ide", description: "Never committed" });
  second.close();
  const third = await ResearchStore.open(cwd, scratch);
  assert.equal(third.pending().length, 0);
  third.close();
});

test("a successful weekly run with no additions still expires old recent-update rows", async t => {
  const cwd = await mkdtemp(join(tmpdir(), "pi-recent-test-"));
  t.after(() => rm(cwd, { recursive: true, force: true }));
  const oldDate = new Date(Date.now() - 40 * 86400000).toISOString().slice(0, 10);
  const text = `# Resources\n\n<!-- recent-updates:start -->\n| Verified | Update | Details |\n|---|---|---|\n| ${oldDate} | [Old](#old) | old news |\n<!-- recent-updates:end -->\n\n<a id="old"></a>\nExisting resource.\n`;
  for (const file of README_FILES) await writeFile(join(cwd, file), text);
  t.mock.method(globalThis, "fetch", async () => ({ ok: true, json: async () => ({ results: [] }) }));
  let call = 0;
  t.mock.method(ModelRuntime.prototype, "streamSimple", model => {
    const step = call++;
    const message = {
      role: "assistant", api: model.api, provider: model.provider, model: model.id, timestamp: Date.now(),
      content: step === 0 ? [{ type: "toolCall", id: "search", name: "search_web", arguments: { query: "Current coding tools" } }] : step === 1 ? [{ type: "toolCall", id: "submit", name: "submit_result", arguments: { status: "unchanged", reason: "No qualified additions", edits: [] } }] : [{ type: "text", text: "Done" }],
      stopReason: step < 2 ? "toolUse" : "stop",
      usage: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, totalTokens: 0, cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 } },
    };
    const stream = createAssistantMessageEventStream();
    stream.push({ type: "start", partial: message });
    stream.push({ type: "done", reason: message.stopReason, message });
    return stream;
  });
  const result = await runAutomation({ cwd, env: { DEEPSEEK_API_KEY: "test", EXA_API_KEY: "test" }, prompt: "Research", weekly: true });
  assert.equal(result.status, "unchanged");
  for (const file of README_FILES) {
    const updated = await readFile(join(cwd, file), "utf8");
    assert.doesNotMatch(updated, /old news/);
    assert.match(updated, /Existing resource/);
  }
  assert.match(await readFile(join(cwd, "README.ko.md"), "utf8"), /최근 30일/);
});
