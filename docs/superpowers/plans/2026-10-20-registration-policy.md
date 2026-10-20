# Registration Request Auto-Processing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Issue-based resource requests that meet policy are fully processed by DeepSeek + Pi + Exa into the README, the extended catalog, or a README replacement, and the rest go to manual review with a named reason.

**Architecture:** Policy values live in `data/registration-policy.json` and pure rule functions in `scripts/lib/registration-policy.mjs`. The model returns a richer structured result (placement, scores, replacement, manual reason); code validates every rule it can check (evidence origin, independent source, capacity, protection, score ordering) before any file is written. Code, not the model, writes `data/catalog-status.json`. Weekly update behavior is unchanged apart from the default provider.

**Tech Stack:** Node.js 24.14+, ESM, `node:test`, `@earendil-works/pi-coding-agent` 0.85.1, `typebox`, Exa REST API, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-10-20-registration-policy-design.md` (Korean). Section numbers below (§) refer to it.

## Global Constraints

- Run `npm test` after each task; all tests must pass before commit.
- Five curation checks plus `available_to_new_users` and `not_sunsetting` stay mandatory (`CURATION_CHECKS` unchanged).
- Protection period 90 days; stored score validity 90 days; scores 0-2 per item, 5 items, total 0-10.
- Score items: `activity`, `documentation`, `access`, `independent_sources`, `category_fit`. For category `learning`, `activity` means content currency (§3.5).
- Automatic disqualifications: `archived`, `sunset_announced`, `unavailable_to_new_users`. `inactive` is allowed only after `/approve` (§3.4, §5.1).
- Manual reasons: `security_sensitive`, `directory_or_affiliate`, `ambiguous_replacement`, `conflicting_evidence` (§5).
- No quantity limits on additions or replacements (§3.4).
- Model IDs come from env (`AI_PROVIDER`, `AI_MODEL`); never hard-code a model outside `PROVIDERS`.
- Weekly runs (`weekly: true`) keep current behavior: README-only edits, 12 searches, no placement/replacement fields.
- Markdown in docs: no `~` for ranges; space after closing `**` before CJK text.

## Review Focus

1. A replacement whose outgoing row is removed from README but never appears in `docs/verified-catalog.md` or `docs/catalog-history.md` — must fail validation (Task 4 test `replacement must relocate the outgoing row`).
2. Evidence whose only sources share the submitted host (submitter's own site, fetched) — must fail unless approved (Task 3 test `submitter-only evidence is not independent`).
3. Model tries `placement: "extended"` while the category still has room — must fail so free slots are used (Task 4 test `extended placement requires a full shortlist`).
4. `/approve` rerun returns `uncertain` with the same manual reason — must be refused so the loop cannot repeat (Task 5 test `approval waives manual reasons`).
5. `fetch_page` called on a URL not in the issue body (prompt-injected link) — must be refused (Task 3 test `fetch_page only reads issue URLs`).

---

### Task 1: DeepSeek as default provider

**Files:**
- Modify: `scripts/lib/pi-config.mjs:3-17`
- Modify: `.github/workflows/auto-process-issue.yml:202-210`, `.github/workflows/issue-approval.yml:51-…` (agent step env), `.github/workflows/weekly-update.yml:47-…`
- Test: `scripts/automation.test.mjs`, `scripts/workflows.test.mjs:32-45`

**Interfaces:**
- Produces: `resolveConfig(env)` accepts `AI_PROVIDER` in `deepseek | kimi | qwen`, default `deepseek`.

- [ ] **Step 1: Write failing tests.** In `automation.test.mjs` replace `defaults to official Kimi K3…` with:

```js
test("defaults to DeepSeek and requires only its key", () => {
  const config = resolveConfig({ DEEPSEEK_API_KEY: "test" });
  assert.equal(config.provider, "deepseek");
  assert.equal(config.model.id, DEEPSEEK_DEFAULT_MODEL); // imported from pi-config.mjs
  assert.equal(config.model.baseUrl, "https://api.deepseek.com");
  assert.throws(() => resolveConfig({}), /DEEPSEEK_API_KEY/);
  assert.equal(resolveConfig({ AI_PROVIDER: "kimi", KIMI_API_KEY: "t" }).model.compat.maxTokensField, "max_completion_tokens");
});
```
Update the `AI_PROVIDER` error regex test and the `AI_MAX_TURNS` test to pass `DEEPSEEK_API_KEY`. In `workflows.test.mjs` add `"DEEPSEEK_API_KEY"` to the secrets loop and expect `AI_PROVIDER` `"${{ vars.AI_PROVIDER || 'deepseek' }}"`.

- [ ] **Step 2: Run `npm test`** — Expected: FAIL on the new assertions.
- [ ] **Step 3: Implement.** Add `deepseek: { catalog: "deepseek", model: DEEPSEEK_DEFAULT_MODEL, key: "DEEPSEEK_API_KEY", baseUrl: "https://api.deepseek.com" }` and export `DEEPSEEK_DEFAULT_MODEL` = `"deepseek-v4-flash"` (maintainer decision 2026-10-20; upgrade path is the `AI_MODEL` repository variable set to `deepseek-v4-pro`). Default provider `"deepseek"`; error text `AI_PROVIDER must be deepseek, kimi, or qwen`. In all three workflows add `DEEPSEEK_API_KEY: ${{ secrets.DEEPSEEK_API_KEY }}` and change the default to `'deepseek'`.
- [ ] **Step 4: Run `npm test`** — Expected: PASS.
- [ ] **Step 5: Commit** `feat(automation): add DeepSeek as default provider`.

### Task 2: Policy config and pure rule functions

**Files:**
- Create: `data/registration-policy.json`, `scripts/lib/registration-policy.mjs`
- Modify: `scripts/lib/catalog-status.mjs` (extract shortlist parsing)
- Test: `scripts/registration.test.mjs` (new; picked up by `node --test scripts/*.test.mjs`)

**Interfaces:**
- Produces (`registration-policy.mjs`):
  - `loadRegistrationPolicy(): Promise<Policy>` — reads and validates the JSON.
  - `scoreTotal(scores: Record<string, number>, policy): number` — throws unless keys equal `policy.scoreItems` and each value is an integer 0-2.
  - `isProtected(entry: { listed_on?: string }, today: string, policy): boolean` — true only when `listed_on` exists and fewer than `policy.protectionDays` days have passed.
  - `isScoreFresh(entry: { scored_on?: string }, today: string, policy): boolean`
  - `isIndependentSource(url: string, submittedUrl: string, policy): boolean` — true if the hostname (without `www.`) is in `policy.independentHosts`, or differs from the submitted hostname and neither is a subdomain of the other.
- Produces (`catalog-status.mjs`):
  - `shortlistEntries(text: string, category: string): Array<{ id: string | null, url: string }>` — rows of that category block (same block rules as `assertShortlistCapacity`, which now uses it).
- Policy JSON shape:

```json
{
  "protectionDays": 90,
  "scoreTtlDays": 90,
  "maxSearches": 20,
  "maxFetches": 5,
  "scoreItems": ["activity", "documentation", "access", "independent_sources", "category_fit"],
  "disqualifications": ["archived", "sunset_announced", "unavailable_to_new_users"],
  "approvalOnlyDisqualifications": ["inactive"],
  "manualReasons": ["security_sensitive", "directory_or_affiliate", "ambiguous_replacement", "conflicting_evidence"],
  "independentHosts": ["github.com", "gitlab.com", "codeberg.org", "npmjs.com", "pypi.org", "crates.io", "marketplace.visualstudio.com", "open-vsx.org", "registry.modelcontextprotocol.io", "hub.docker.com"],
  "officialVendorRule": "Official when documentation is on the operator's domain or the repository is under the operator's official organization account."
}
```

- [ ] **Step 1: Write failing tests** in `registration.test.mjs`:
  - `scoreTotal sums five items and rejects missing, extra, or out-of-range values` — `{activity:2,documentation:1,access:2,independent_sources:0,category_fit:2}` → 7; value 3, `-1`, `1.5`, missing key, extra key each throw.
  - `protection applies for 90 days only when listed_on exists` — `listed_on: "2026-08-01"`, today `2026-10-20` → true; `"2026-07-01"` → false; no field → false.
  - `stored scores expire after 90 days` — same dates on `scored_on`.
  - `submitter-only evidence is not independent` — submitted `https://learnmagic.ai`: `https://learnmagic.ai/about` false, `https://docs.learnmagic.ai/x` false, `https://github.com/learnmagic-ai/skills` true, `https://news.example.com/a` true.
  - `shortlistEntries returns rows of one category block` — fixture with `<!-- catalog:context -->` block of two rows returns two `{id,url}` with ids from `<a id="…">`.
- [ ] **Step 2: Run `npm test`** — Expected: FAIL (module not found).
- [ ] **Step 3: Implement** the JSON and the functions above. Date math uses UTC `Date.parse(\`${d}T00:00:00Z\`)`.
- [ ] **Step 4: Run `npm test`** — Expected: PASS, including the existing `lifecycle.test.mjs` capacity test.
- [ ] **Step 5: Commit** `feat(automation): add registration policy config and rules`.

### Task 3: Direct page reading and evidence origin

**Files:**
- Modify: `scripts/lib/research.mjs` (add `fetchPage`), `scripts/lib/curation.mjs:3-14`, `scripts/lib/pi-runner.mjs:42-121`
- Test: `scripts/automation.test.mjs`

**Interfaces:**
- Consumes: `isIndependentSource` (Task 2), `loadRegistrationPolicy` (Task 2).
- Produces:
  - `fetchPage(url: string, { apiKey, fetch?, signal }): Promise<{ title: string, url: string, snippet: string }>` — POST `https://api.exa.ai/contents` with `{ urls: [url], text: { maxCharacters: 6000 } }`, `redirect: "error"`, 30 s timeout; throws on non-OK or empty `results`.
  - `validateEvidence(proposal, { searched: Set<string>, fetched: Set<string>, submittedUrl?: string, policy?, requireIndependent: boolean }): void` — existing checks; evidence URL must be in `searched ∪ fetched`; when `requireIndependent`, at least one evidence URL must satisfy `isIndependentSource`. Error text for the last rule: `Acceptance requires an independent source; submit uncertain with manualReason conflicting_evidence`.
  - `runAutomation({ …, fetchableUrls?: string[], approved?: boolean, issueUrl?: string })` — new options; `fetch_page` tool is registered only when `fetchableUrls?.length` and `EXA_API_KEY` exist.

- [ ] **Step 1: Write failing tests:**
  - `Exa contents fetch uses a fixed endpoint and rejects HTTP failures` — mirror the existing `searchWeb` test with a stub `fetch`; assert endpoint and body `{ urls: ["https://a.example/"], text: { maxCharacters: 6000 } }`.
  - `fetched URLs count as evidence but require an independent source` — `validateEvidence` with only `fetched = {"https://learnmagic.ai/learn"}`, submitted `https://learnmagic.ai`, `requireIndependent: true` → throws `/independent source/`; adding `https://github.com/learnmagic-ai/skills` to `fetched` and evidence passes; `requireIndependent: false` passes without it.
  - Update the existing `acceptance requires every curation gate…` test to the new signature.
  - `fetch_page only reads issue URLs` — in the real-Pi-SDK test harness pattern (`automation.test.mjs:141`), call the tool with a URL not in `fetchableUrls` → tool error `URL is not part of the issue`; sixth call → `Fetch limit exceeded`.
- [ ] **Step 2: Run `npm test`** — Expected: FAIL.
- [ ] **Step 3: Implement.** In `pi-runner.mjs`, track `searchedUrls` and `fetchedUrls` separately; search limit is `weekly ? 12 : policy.maxSearches`; fetch limit `policy.maxFetches`; compare fetch targets after `normalizeResourceUrl`. Pass `requireIndependent: !weekly && !approved` to `validateEvidence`.
- [ ] **Step 4: Run `npm test`** — Expected: PASS.
- [ ] **Step 5: Commit** `feat(automation): read submitted pages and require independent evidence`.

### Task 4: Placement, replacement, and registry updates

**Files:**
- Create: `scripts/lib/catalog-updates.mjs`
- Modify: `scripts/lib/readme-updates.mjs` (managed files, removable URLs), `scripts/lib/catalog-status.mjs` (registry writer)
- Test: `scripts/registration.test.mjs`

**Interfaces:**
- Consumes: Task 2 functions, `shortlistEntries`.
- Produces:
  - `MANAGED_FILES = [...README_FILES, "docs/verified-catalog.md", "docs/catalog-history.md", "data/catalog-status.json"]` in `readme-updates.mjs`; `readOriginals` and `persistUpdates` iterate it (temp file in the target's own directory). Model edits may target the first five only.
  - `prepareUpdates(originals, proposal, { requiredUrl, removableUrls = [], readmeUnchanged = false })` — existing rules; a URL in `removableUrls` may drop to zero occurrences; with `readmeUnchanged` the three READMEs must have no edits.
  - `prepareCatalogUpdates(originals, proposal, ctx): Record<string, string> | null` in `catalog-updates.mjs`, where `ctx = { requiredUrl, registry, policy, today, approved, observedUrls, issueUrl }`. Returns all changed managed files, including the regenerated registry text.
  - `applyRegistryUpdate(registry: object, change: { incoming, outgoing?, categoryScores, today, issueUrl }): object` in `catalog-status.mjs`; serialized as `JSON.stringify(data, null, 2) + "\n"`.
- Proposal fields consumed (defined in Task 5 schema): `placement: "readme" | "extended"`, `resource: { id, name, category }`, `scores`, `replacement?: { outgoingUrl, path: "disqualified" | "superseded", disqualification?, covers, rationale, evidenceUrls }`, `categoryScores?: Array<{ url, scores }>`.

Validation rules `prepareCatalogUpdates` enforces (spec §3.3-§3.6):
1. `placement: "readme"` without replacement → category block (`shortlistEntries`) has fewer than `limit` rows before the edit.
2. `placement: "extended"` → block is at `limit`; READMEs unchanged; `docs/verified-catalog.md` gains `requiredUrl` exactly once; no `replacement`.
3. `replacement.path: "disqualified"` → `disqualification` in `policy.disqualifications` (or `approvalOnlyDisqualifications` when `approved`); `evidenceUrls` non-empty and all observed; protection ignored; outgoing URL appears in `docs/catalog-history.md` after edits.
4. `replacement.path: "superseded"` → outgoing not protected; `covers === true`; `rationale` non-empty; every unprotected row in the block has a fresh stored score or an entry in `categoryScores`; outgoing has the minimum total; incoming total is strictly greater; outgoing URL appears in `docs/verified-catalog.md` after edits.
5. Outgoing URL must be a current row of the same category block; it is passed to `prepareUpdates` as the only removable URL.
6. Registry: incoming gets `location` `shortlist` or `extended`, `status: "active"`, `listed_on: today` (shortlist only), `verified_on`, `reviewed_on`, `scores`, `scored_on`, `evidence_urls`, `review_issue: issueUrl`. Outgoing (matched by normalized URL; minimal entry created if absent) gets `location: "extended"` for superseded, or `location: "excluded"` with `status` mapped `archived→archived`, `sunset_announced→sunsetting`, `unavailable_to_new_users→retired`, `inactive→inactive`, plus `previous_status` and `reason`. `categoryScores` update `scores`/`scored_on` only on entries already in the registry.

- [ ] **Step 1: Write failing tests** (fixtures: README block with `limit` rows built from `CATEGORIES.context.limit`):
  - `readme placement fills a free slot` and `readme placement without replacement fails on a full shortlist`.
  - `extended placement requires a full shortlist` (block below limit → throws) and `extended placement leaves READMEs untouched and adds to verified-catalog`.
  - `disqualified replacement ignores protection and moves the row to history`.
  - `inactive disqualification requires approval`.
  - `superseded replacement respects the 90-day protection` (outgoing `listed_on` 30 days ago → throws).
  - `superseded replacement requires the lowest score and a strictly higher incoming score` (tie → throws; non-minimum outgoing → throws; unscored unprotected row → throws `/score/`).
  - `replacement must relocate the outgoing row` (removed from README, absent from both docs → throws).
  - `registry records listed_on, scores and review issue for the incoming entry` (assert fields and trailing newline).
- [ ] **Step 2: Run `npm test`** — Expected: FAIL.
- [ ] **Step 3: Implement** the functions above; keep `prepareUpdates` behavior unchanged for existing callers (default options).
- [ ] **Step 4: Run `npm test`** — Expected: PASS, including all pre-existing `prepareUpdates` and persistence tests.
- [ ] **Step 5: Commit** `feat(automation): support extended placement and rule-checked replacement`.

### Task 5: Structured result, manual reasons, approval waiver, issue comment

**Files:**
- Create: `scripts/lib/issue-comment.mjs`
- Modify: `scripts/lib/pi-runner.mjs:84-106,147,164`, `scripts/lib/process-issue.mjs`
- Test: `scripts/registration.test.mjs`, `scripts/automation.test.mjs`

**Interfaces:**
- Consumes: Task 3 `runAutomation` options, Task 4 `prepareCatalogUpdates`.
- Produces:
  - `submit_result` schema (non-weekly runs) adds optional `placement`, `resource`, `scores`, `replacement`, `categoryScores`, `manualReason` (enum from policy). Weekly runs reject these fields.
  - Tool rules: `manualReason` only with `status: "uncertain"`; when `approved`, any `manualReason` throws `Maintainer approval waives manual-review reasons; decide placement or reject`; non-weekly `processed` requires `placement`, `resource`, `scores`.
  - `runAutomation` returns `{ status, reason, placement, manualReason, checks, evidenceUrls, scores, replacement }`.
  - `formatIssueComment(result, { issueUrl }): string` — Markdown: headline per outcome (`✅ Added to the README`, `✅ Added to the extended catalog` + why not README, `✅ Added to the README, replacing …`, `🤔 Needs maintainer review — <manual reason label>`, `❌ Rejected`), then reason, check table, evidence URLs, score table. Ends with the `/approve` / `/reject [reason]` hint for uncertain results.
  - `processIssue` passes `fetchableUrls` (all `https?://` URLs in the body, max 10), `approved`, `issueUrl = https://github.com/${GITHUB_REPOSITORY}/issues/${ISSUE_NUMBER}`; writes the comment to `${RUNNER_TEMP}/issue-comment.md` and GitHub outputs `result`, `reason`, `placement`, `manual_reason`, `comment_file`.

- [ ] **Step 1: Write failing tests:**
  - `approval waives manual reasons` — tool call with `approved: true`, `status: "uncertain"`, `manualReason: "security_sensitive"` → error above; without approval it is accepted.
  - `manualReason is only valid for uncertain results`.
  - `weekly results cannot use placement or replacement`.
  - `issue comment names the placement, evidence and scores` — `formatIssueComment` snapshot-style assertions for extended and replacement outcomes (contains outgoing name, total scores `7 > 5`, each evidence URL).
  - `processIssue writes outputs and a comment file` — stub `runAutomation` via an injectable parameter `processIssue({ approved, env, run = runAutomation })`.
- [ ] **Step 2: Run `npm test`** — Expected: FAIL.
- [ ] **Step 3: Implement.** In `submit_result.execute`, call `prepareCatalogUpdates` for non-weekly runs and the existing `prepareUpdates` path for weekly. Recent-updates refresh runs only when READMEs changed.
- [ ] **Step 4: Run `npm test`** — Expected: PASS.
- [ ] **Step 5: Commit** `feat(automation): structured placement results and manual review reasons`.

### Task 6: Workflows commit all managed files and post the generated comment

**Files:**
- Modify: `.github/workflows/auto-process-issue.yml:216-331`, `.github/workflows/issue-approval.yml:70-145`
- Test: `scripts/workflows.test.mjs`

**Interfaces:**
- Consumes: Task 5 outputs `result`, `placement`, `manual_reason`, `comment_file`.

- [ ] **Step 1: Write failing tests:**
  - `issue workflows commit every managed catalog file` — commit step `run` contains `git add README.md README.ko.md README.ja.md docs/verified-catalog.md docs/catalog-history.md data/catalog-status.json`.
  - `issue comments come from the generated comment file` — processed/uncertain/rejected comment steps read `process.env.COMMENT_FILE` with `fs.readFileSync` and set `COMMENT_FILE: ${{ steps.pi.outputs.comment_file }}`; keep the existing "data, never JavaScript" test passing.
  - Existing `accepted additions close as completed` test still passes for both placements.
- [ ] **Step 2: Run `npm test`** — Expected: FAIL.
- [ ] **Step 3: Implement.** Commit message: `docs: <Add resource|Add extended resource|Replace resource> from issue #N`. `needs-review` label is added only for `uncertain`; processed issues remove it if present (`removeLabel`, ignore 404).
- [ ] **Step 4: Run `npm test`** and `actionlint` if installed — Expected: PASS.
- [ ] **Step 5: Commit** `feat(workflows): commit catalog files and post structured issue comments`.

### Task 7: Prompts and policy documents

**Files:**
- Modify: `.github/prompts/issue-auto-process.md`, `.github/prompts/issue-approval.md`, `docs/curation-policy.md`, `docs/automation.md`
- Test: `scripts/workflows.test.mjs`

- [ ] **Step 1: Write failing test** `issue prompts describe placement, replacement and manual reasons` — both prompt files mention every `policy.manualReasons` value, every `policy.scoreItems` value, `placement`, `fetch_page`, and `90 days`.
- [ ] **Step 2: Run `npm test`** — Expected: FAIL.
- [ ] **Step 3: Update prompts.** Cover: independent-source rule (§3.2); placement order (§3.3); replacement paths A/B and protection (§3.4); scoring rubric with the learning `activity` meaning (§3.5); outgoing row destinations (§3.6); official vendor vs third-party security rule (§4); four manual reasons with criteria (§5); approval prompt states manual reasons are waived and `inactive` is an allowed disqualification (§5.1); Verified cell for issue additions is `[YYYY-MM-DD](<issueUrl>)` in all three languages and in `docs/verified-catalog.md`; recent-updates row only for README placement.
- [ ] **Step 4: Update docs.** `docs/curation-policy.md`: replace the "Needs review" outcome text and "Lifecycle and list size" paragraph with §3-§5 rules in English. `docs/automation.md`: provider table adds DeepSeek (`DEEPSEEK_API_KEY`, default), tool table adds `fetch_page`, and a "Reprocessing pending issues" runbook: after the secret exists, remove and re-add the `addition` label on each pending issue in ascending number order (queued concurrency runs them serially).
- [ ] **Step 5: Run `npm test`** — Expected: PASS.
- [ ] **Step 6: Commit** `docs: document registration auto-processing policy`.

### Task 8: Reprocess the seven pending issues (maintainer-gated)

Not code. Do not start until the maintainer confirms `DEEPSEEK_API_KEY` is registered as an organization secret (§7).

- [ ] **Step 1:** Push Tasks 1-7 to `main`; confirm `automation-tests.yml` passes.
- [ ] **Step 2:** Ask the maintainer to confirm the secret. Stop here without confirmation.
- [ ] **Step 3:** Re-label #47, #49, #53, #54, #55, #56, #58 in that order (`gh issue edit N --remove-label addition` then `--add-label addition`).
- [ ] **Step 4:** After the runs finish, report each issue's outcome (README / extended / replacement / manual reason / rejected) with links to commits or comments.
