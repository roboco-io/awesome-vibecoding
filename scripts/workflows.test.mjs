import test from "node:test";
import assert from "node:assert/strict";
import { readFile, mkdtemp, writeFile, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import vm from "node:vm";
import { parse } from "yaml";
import { links, README_FILES } from "./lib/readme-updates.mjs";

const workflow = async name => parse(await readFile(new URL(`../.github/workflows/${name}.yml`, import.meta.url), "utf8"));

test("workflow comments treat issue and model strings as data, never JavaScript", async () => {
  const data = await workflow("auto-process-issue");
  const steps = data.jobs["validate-and-process"].steps.filter(step => step.uses?.startsWith("actions/github-script") && (step.env?.REASON || step.env?.RESOURCE_URL));
  assert.equal(steps.length, 5);
  for (const step of steps) {
    const comments = [];
    const payload = "https://example.invalid/${globalThis.marker=1}`";
    const context = vm.createContext({
      marker: 0, require: name => name === "fs" ? { readFileSync: file => `comment from ${file}` } : assert.fail(name), process: { env: { REASON: payload, RESOURCE_URL: payload, HTTP_CODE: "000", COMMENT_FILE: "/tmp/c.md" } },
      context: { repo: { owner: "owner", repo: "repo" }, issue: { number: 1 } },
      github: { rest: { issues: { createComment: async value => comments.push(value.body), update: async () => {}, addLabels: async () => {} } } },
    });
    assert.doesNotMatch(step.with.script, /\$\{\{\s*steps\./);
    await vm.runInContext(`(async () => {${step.with.script}})()`, context);
    assert.equal(context.marker, 0);
    assert.ok(comments.some(comment => comment.includes(payload) || comment.includes("comment from /tmp/c.md")));
  }
});

test("issue workflows commit every managed catalog file", async () => {
  for (const name of ["auto-process-issue", "issue-approval"]) {
    const data = await workflow(name);
    const commit = Object.values(data.jobs).flatMap(job => job.steps).find(step => step.id === "commit");
    assert.ok(commit.run.includes("git add README.md README.ko.md README.ja.md docs/verified-catalog.md docs/catalog-history.md data/catalog-status.json"), name);
    assert.equal(commit.env.PLACEMENT, "${{ steps.pi.outputs.placement }}");
    assert.equal(commit.env.REPLACED, "${{ steps.pi.outputs.replaced }}");
    for (const subject of ["Add resource", "Add extended resource", "Replace resource"]) assert.ok(commit.run.includes(`SUBJECT="${subject}"`), `${name}: ${subject}`);
  }
});

test("issue comments come from the generated comment file", async () => {
  for (const [name, stepNames] of [["auto-process-issue", ["Reject - Quality check failed", "Request maintainer review - Uncertain", "Comment on issue"]], ["issue-approval", ["Post review result", "Close issue on success"]]]) {
    const steps = Object.values((await workflow(name)).jobs).flatMap(job => job.steps);
    for (const stepName of stepNames) {
      const step = steps.find(item => item.name === stepName);
      assert.ok(step, `${name}: ${stepName}`);
      assert.equal(step.env.COMMENT_FILE, "${{ steps.pi.outputs.comment_file }}");
      assert.match(step.with.script, /fs\.readFileSync\(process\.env\.COMMENT_FILE, 'utf8'\)/);
    }
  }
});

test("uncertain comment appends only the maintainer mention, not a second approve hint", async () => {
  const step = (await workflow("auto-process-issue")).jobs["validate-and-process"].steps.find(item => item.name === "Request maintainer review - Uncertain");
  const comments = [];
  const context = vm.createContext({
    require: () => ({ readFileSync: () => "generated" }), process: { env: { COMMENT_FILE: "/tmp/c.md" } },
    context: { repo: { owner: "o", repo: "r" }, issue: { number: 1 } },
    github: { rest: { issues: { createComment: async value => comments.push(value.body), addLabels: async () => {} } } },
  });
  await vm.runInContext(`(async () => {${step.with.script}})()`, context);
  assert.equal(comments[0], "generated\n\n@serithemage Could you take a look?");
  assert.doesNotMatch(comments[0].slice("generated".length), /\/approve/);
});

test("all automation entrypoints use registered organization secrets and preserve queued runs", async () => {
  for (const name of ["weekly-update", "auto-process-issue", "issue-approval"]) {
    const data = await workflow(name);
    assert.equal(data.concurrency.queue, "max");
    assert.equal(data.concurrency["cancel-in-progress"], false);
    const steps = Object.values(data.jobs).flatMap(job => job.steps);
    const agent = steps.find(step => /^node scripts\//.test(step.run || ""));
    assert.ok(agent, `${name}: missing agent entrypoint`);
    for (const key of ["DEEPSEEK_API_KEY", "KIMI_API_KEY", "DASHSCOPE_API_KEY", "EXA_API_KEY"]) assert.equal(agent.env[key], `\${{ secrets.${key} }}`);
    assert.equal(agent.env.AI_PROVIDER, "${{ vars.AI_PROVIDER || 'deepseek' }}");
    assert.doesNotMatch(JSON.stringify(data), /ANTHROPIC_API_KEY|PERPLEXITY_API_KEY|Claude Code/);
  }
});

test("README translations contain the same external links in the same order", async () => {
  const texts = await Promise.all(README_FILES.map(file => readFile(new URL(`../${file}`, import.meta.url), "utf8")));
  const urls = text => [...text.matchAll(/\]\((https?:\/\/[^\s)]+)\)/g)].map(match => match[1]);
  for (const text of texts.slice(1)) {
    assert.deepEqual(urls(text), urls(texts[0]));
    assert.deepEqual(links(text), links(texts[0]));
  }
});

test("HTTP and transport timeouts leave issues open for review", async t => {
  const data = await workflow("auto-process-issue");
  const script = data.jobs["validate-and-process"].steps.find(step => step.id === "validate").run;
  const httpCheck = script.slice(script.indexOf("# Check if URL is reachable"), script.indexOf("# Check for duplicates"));
  const dir = await mkdtemp(join(tmpdir(), "pi-http-check-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const output = join(dir, "output");
  for (const [code, exit] of [["408", "0"], ["200", "28"], ["503", "0"], ["000", "6"]]) {
    await writeFile(output, "");
    const run = spawnSync("bash", ["-e", "-c", 'curl() { printf "%s" "$TEST_HTTP_CODE"; return "$TEST_CURL_EXIT"; }\n' + httpCheck], {
      env: { PATH: process.env.PATH, TEST_HTTP_CODE: code, TEST_CURL_EXIT: exit, URL: "https://example.invalid/", GITHUB_OUTPUT: output },
      encoding: "utf8",
    });
    assert.equal(run.status, 0, run.stderr);
    assert.match(await readFile(output, "utf8"), /status=needs_review/, `${code}/${exit} must not reject an issue`);
  }
});

test("rejected suggestions close as not planned and accepted additions close as completed", async () => {
  let checked = 0;
  for (const name of ["auto-process-issue", "issue-approval"]) {
    const data = await workflow(name);
    for (const [jobName, job] of Object.entries(data.jobs)) {
      for (const step of job.steps) {
        const script = step.with?.script;
        if (!script?.includes("state: 'closed'")) continue;
        const updates = [];
        const context = vm.createContext({
          require: () => ({ readFileSync: () => "comment" }),
          process: { env: { REASON: "Out of scope", RESOURCE_URL: "https://example.invalid/", HTTP_CODE: "404", COMMENT_FILE: "/tmp/c.md" } },
          context: { repo: { owner: "owner", repo: "repo" }, issue: { number: 1 }, payload: { issue: { number: 1 }, comment: { body: "/reject Out of scope" } } },
          github: { rest: { issues: { createComment: async () => {}, removeLabel: async () => {}, update: async value => updates.push(value) } } },
        });
        await vm.runInContext(`(async () => {${script.replace("${{ steps.validate.outputs.body_len }}", "5001")}})()`, context);
        assert.equal(updates.length, 1);
        const rejected = step.name.startsWith("Reject") || jobName === "handle-reject";
        assert.equal(updates[0].state_reason, rejected ? "not_planned" : "completed", `${name}: ${step.name}`);
        checked++;
      }
    }
  }
  assert.equal(checked, 8);
});

test("issue prompts describe placement, replacement and manual reasons", async () => {
  const policy = JSON.parse(await readFile(new URL("../data/registration-policy.json", import.meta.url), "utf8"));
  for (const name of ["issue-auto-process", "issue-approval"]) {
    const prompt = await readFile(new URL(`../.github/prompts/${name}.md`, import.meta.url), "utf8");
    for (const word of [...policy.manualReasons, ...policy.scoreItems, "placement", "fetch_page", "90 days", "outgoingUrl", "categoryScores", "listed_on", "security", "storesThirdPartyCredentials", "relaysCredentials", "handlesPayments", "executesRemoteCommands", "officialVendor", "security signal"]) assert.ok(prompt.includes(word), `${name} must mention ${word}`);
  }
});
