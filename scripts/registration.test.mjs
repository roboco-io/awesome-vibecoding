import test from "node:test";
import assert from "node:assert/strict";
import { loadRegistrationPolicy, scoreTotal, isProtected, isScoreFresh, isIndependentSource } from "./lib/registration-policy.mjs";
import { shortlistEntries } from "./lib/catalog-status.mjs";

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
