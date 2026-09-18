import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { resolveConfig } from "./lib/pi-config.mjs";
import { README_FILES, prepareUpdates, persistUpdates, outputRecord } from "./lib/readme-updates.mjs";
import { runSession, runAutomation } from "./lib/pi-runner.mjs";
import { searchWeb } from "./lib/research.mjs";
import { ResearchStore } from "./lib/research-store.mjs";
import { validateEvidence, CURATION_CHECKS } from "./lib/curation.mjs";
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
  const observed = new Set(["https://new.example/"]);
  validateEvidence(proposal(), observed);
  for (const check of CURATION_CHECKS) {
    const p = proposal(); p.checks[check] = false;
    assert.throws(() => validateEvidence(p, observed), new RegExp(check));
  }
  assert.throws(() => validateEvidence(proposal(), new Set()), /not returned/);
  assert.throws(() => validateEvidence({ ...proposal(), evidenceUrls: [] }, observed), /evidence/);
  validateEvidence({ status: "uncertain" }, new Set());
});

test("defaults to official Kimi K3 and requires only its key", () => {
  const config = resolveConfig({ KIMI_API_KEY: "test" });
  assert.equal(config.provider, "kimi");
  assert.equal(config.model.id, "kimi-k3");
  assert.equal(config.model.baseUrl, "https://api.moonshot.ai/v1");
  assert.equal(config.model.compat.maxTokensField, "max_completion_tokens");
  assert.throws(() => resolveConfig({}), /KIMI_API_KEY/);
});

test("Qwen uses the official pay-as-you-go endpoint and supports model overrides", () => {
  const config = resolveConfig({ AI_PROVIDER: "qwen", DASHSCOPE_API_KEY: "test" });
  assert.equal(config.model.id, "qwen3.8-max");
  assert.equal(config.model.baseUrl, "https://dashscope-intl.aliyuncs.com/compatible-mode/v1");
  assert.equal(resolveConfig({ AI_PROVIDER: "qwen", AI_MODEL: "qwen3.8-max-0902", DASHSCOPE_API_KEY: "test" }).model.id, "qwen3.8-max-0902");
  assert.throws(() => resolveConfig({ AI_PROVIDER: "other" }), /AI_PROVIDER/);
  assert.throws(() => resolveConfig({ KIMI_API_KEY: "test", AI_MAX_TURNS: "0" }), /AI_MAX_TURNS/);
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

test("real Pi SDK executes only custom tools and persists only a successful full result", async t => {
  const cwd = await mkdtemp(join(tmpdir(), "pi-sdk-test-"));
  t.after(() => rm(cwd, { recursive: true, force: true }));
  for (const file of README_FILES) await writeFile(join(cwd, file), source);
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
    const p = proposal();
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
  const env = { KIMI_API_KEY: "test-only", EXA_API_KEY: "test-only", AI_TIMEOUT_SECONDS: "5" };
  assert.equal((await runAutomation({ cwd, env, prompt: "Add New" })).status, "processed");
  assert.match(await readFile(join(cwd, "README.ja.md"), "utf8"), /new.example/);
  for (const file of README_FILES) await writeFile(join(cwd, file), source);
  fail = true;
  await assert.rejects(runAutomation({ cwd, env, prompt: "Add New" }), /failed/);
  for (const file of README_FILES) assert.equal(await readFile(join(cwd, file), "utf8"), source);
  fail = false;
  rejectCriteria = true;
  await assert.rejects(runAutomation({ cwd, env, prompt: "Add unrelated resource" }), /criterion|without submitting/);
  for (const file of README_FILES) assert.equal(await readFile(join(cwd, file), "utf8"), source);
  rejectCriteria = false;
  retiredResource = true;
  await assert.rejects(runAutomation({ cwd, env, prompt: "Re-add a sunset product" }), /catalog decision|without submitting/);
  for (const file of README_FILES) assert.equal(await readFile(join(cwd, file), "utf8"), source);
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
  const result = await runAutomation({ cwd, env: { KIMI_API_KEY: "test", EXA_API_KEY: "test" }, prompt: "Research", weekly: true });
  assert.equal(result.status, "unchanged");
  for (const file of README_FILES) {
    const updated = await readFile(join(cwd, file), "utf8");
    assert.doesNotMatch(updated, /old news/);
    assert.match(updated, /Existing resource/);
  }
  assert.match(await readFile(join(cwd, "README.ko.md"), "utf8"), /최근 30일/);
});
