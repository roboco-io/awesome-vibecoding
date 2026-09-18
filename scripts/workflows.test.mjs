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
      marker: 0, process: { env: { REASON: payload, RESOURCE_URL: payload, HTTP_CODE: "000" } },
      context: { repo: { owner: "owner", repo: "repo" }, issue: { number: 1 } },
      github: { rest: { issues: { createComment: async value => comments.push(value.body), update: async () => {}, addLabels: async () => {} } } },
    });
    assert.doesNotMatch(step.with.script, /\$\{\{\s*steps\./);
    await vm.runInContext(`(async () => {${step.with.script}})()`, context);
    assert.equal(context.marker, 0);
    assert.ok(comments.some(comment => comment.includes(payload)));
  }
});

test("all automation entrypoints use registered organization secrets and preserve queued runs", async () => {
  for (const name of ["weekly-update", "auto-process-issue", "issue-approval"]) {
    const data = await workflow(name);
    assert.equal(data.concurrency.queue, "max");
    assert.equal(data.concurrency["cancel-in-progress"], false);
    const steps = Object.values(data.jobs).flatMap(job => job.steps);
    const agent = steps.find(step => /^node scripts\//.test(step.run || ""));
    assert.ok(agent, `${name}: missing agent entrypoint`);
    for (const key of ["KIMI_API_KEY", "DASHSCOPE_API_KEY", "EXA_API_KEY"]) assert.equal(agent.env[key], `\${{ secrets.${key} }}`);
    assert.equal(agent.env.AI_PROVIDER, "${{ vars.AI_PROVIDER || 'kimi' }}");
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
