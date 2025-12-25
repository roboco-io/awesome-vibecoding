# Workflows & Templates

*[← Back to Main](../README.md)*

This document provides detailed workflows, templates, and playbooks for effective vibe coding sessions.

---

## Table of Contents

- [Session Setup](#session-setup)
- [Recommended Artifacts](#recommended-artifacts)
- [Work-Type Playbooks](#work-type-playbooks)
  - [New Feature Implementation](#new-feature-implementation)
  - [Refactoring & Legacy Migration](#refactoring--legacy-migration)
  - [Bug Debugging & Fixing](#bug-debugging--fixing)
  - [Test Generation](#test-generation)
- [Prompt Templates](#prompt-templates)
  - [System Prompt Template](#system-prompt-template)
  - [Session Opener Template](#session-opener-template)
  - [Vibe Brief Template](#vibe-brief-template)
- [Session Lifecycle](#session-lifecycle)

---

## Session Setup

### Session Opener Pattern

Use this template to start any vibe coding session:

```markdown
Project: {one-line description}
Stack: {tech stack}
Repo layout: {key dirs/files}

Artifacts:
- PRD: {path}
- TECH_DESIGN: {path}
- NOTES: {path}

Task: {1-3 sentences, single focus}

What I want: 1) Clarifying questions 2) Short plan 3) Implement step 1
```

### Example Session Opener

```markdown
Project: E-commerce checkout flow
Stack: Next.js 14, TypeScript, Prisma, Stripe
Repo layout: src/app/, src/components/, prisma/schema.prisma

Artifacts:
- PRD: docs/PRD.md
- TECH_DESIGN: docs/TECH_DESIGN.md
- NOTES: docs/NOTES.md

Task: Add guest checkout option that skips account creation but still captures email for order confirmation.

What I want: 1) Clarifying questions 2) Short plan 3) Implement step 1
```

---

## Recommended Artifacts

Keep these AI-readable documents in your repo for context persistence across sessions:

| Artifact | Purpose | Update Frequency |
|----------|---------|------------------|
| **PRD.md** | Product requirements & user stories | Per feature |
| **TECH_DESIGN.md** | Architecture, data models, integration points | Per major change |
| **NOTES.md** | Running log of decisions and TODOs | Every session |
| **CHANGELOG.md** | Human/AI-maintained change history | Every release |

### PRD.md Template

```markdown
# Product Requirements Document

## Overview
{Brief product description}

## User Stories
- As a {user}, I want {goal} so that {benefit}

## Requirements
### Functional
- [ ] Requirement 1
- [ ] Requirement 2

### Non-Functional
- Performance: {targets}
- Security: {requirements}
```

### NOTES.md Template

```markdown
# Project Notes

## Current Session
- Date: {date}
- Focus: {current task}
- Decisions made:
  - {decision 1}
  - {decision 2}

## Open Questions
- [ ] Question 1
- [ ] Question 2

## Technical Debt
- [ ] Item 1
- [ ] Item 2
```

---

## Work-Type Playbooks

### New Feature Implementation

**Overview**

| Phase | Key Steps |
|-------|-----------|
| 1. Brief | Write Vibe Brief → Verify with PRD |
| 2. Plan | Vertical slice plan → Get approval |
| 3. Implement | Step by step → Test each step |
| 4. Validate | Integration test → Update docs |

**Feature Implementation Prompt**

```markdown
You are implementing a new feature in an existing codebase.

Inputs:
- Vibe Brief: {attached}
- Relevant excerpts from PRD.md and TECH_DESIGN.md
- File tree excerpt + key files

Task:
1) Verify the feature is consistent with PRD and TECH_DESIGN. Flag mismatches.
2) Propose a vertical slice plan (DB → API → domain → UI) with 3–7 steps.
3) For step 1 only, show:
   - Proposed data structures / contracts
   - Any migrations or API changes
   - A short checklist of tests we will need

Stop and wait for review before modifying code.
```

**Follow-up Implementation Prompt**

```markdown
Plan is approved. Implement step {N} now.

Rules:
- Only modify files listed in the plan unless a dependency forces a change
- Show code in full for any edited function/class/module
- After coding, mental checklist:
  - Edge cases?
  - Error handling?
  - Logging/observability?
  - Backwards compatibility?

Finally:
- Generate concrete test cases for this step
- Suggest an update snippet for NOTES.md and CHANGELOG.md
```

---

### Refactoring & Legacy Migration

**Overview**

| Phase | Key Steps |
|-------|-----------|
| 1. Analyze | Classify patterns/smells → Identify risks |
| 2. Strategize | Safety strategy → Parity tests |
| 3. Execute | Small sequential steps → Each mergeable |
| 4. Validate | Run parity tests → Update docs |

**Refactor Analysis Prompt**

```markdown
Context:
- Goal of refactor / migration: {goal}
- Code excerpts: {attached or file list}
- Constraints: {no behavior change, perf target, rollout strategy}

Task:
1) Classify this code: patterns, smells, coupling points.
2) Propose a refactor plan with:
   - Safety strategy (tests/feature flags/parity checks)
   - Small, sequential steps (each mergeable)
3) Identify high-risk areas and how to de-risk them.

Output:
- Plan
- Suggested "parity tests" that must pass before/after
- Proposed temporary flags or adapters for incremental rollout
```

**Refactor Execution Prompt**

```markdown
Implement step {N} of the refactor plan.

Rules:
- Preserve behavior unless explicitly allowed to change it
- Add or improve tests before aggressive changes
- For any non-obvious decision, add a code comment and NOTES.md entry

Deliver:
- Updated code with clear before/after
- New/updated tests
- Short checklist: "What to manually verify"
```

---

### Bug Debugging & Fixing

**Overview**

| Phase | Key Steps |
|-------|-----------|
| 1. Triage | Restate bug → Rank hypotheses |
| 2. Reproduce | Create failing test → Confirm bug |
| 3. Fix | Minimal fix → Verify test passes |
| 4. Validate | Check regressions → Update docs |

**Bug Triage Prompt**

```markdown
Bug report:
{logs, stacktrace, user report, reproduction steps}

Relevant code:
{snippets or file names}

Task:
1) Restate the bug in your own words, including scope and suspected impact.
2) Infer probable root causes ranked by likelihood, referencing specific code lines.
3) Design a minimal failing test that would prove the bug exists.
4) Suggest targeted instrumentation/logging to confirm the hypothesis.

Output:
- Hypotheses list
- Proposed failing test(s)
- "Debug checklist" I can follow
```

**Bug Fix Prompt**

```markdown
Given the confirmed bug and {test / repro}:

1) Update or add tests so the bug is captured (red).
2) Propose a minimal fix that:
   - Fixes the bug
   - Minimizes collateral behavior changes
   - Matches existing architecture patterns
3) Implement the fix and show the now-passing tests.

Finally:
- List potential regressions to watch for
- Provide CHANGELOG and NOTES snippets describing the fix
```

---

### Test Generation

**Overview**

| Phase | Key Steps |
|-------|-----------|
| 1. Analyze | Identify critical behaviors → List edge cases |
| 2. Prioritize | Rank by risk and business value |
| 3. Generate | Create tests following conventions |
| 4. Review | Verify coverage → Avoid overfitting |

**Test Generation Prompt**

```markdown
Goal: Raise coverage and confidence without overfitting to implementation.

Inputs:
- Target module(s): {paths}
- Existing tests: {paths or "none"}
- Invariants/business rules: {from PRD/TECH_DESIGN/NOTES}

Task:
1) Summarize what this module is responsible for.
2) List critical behaviors and edge cases that *should* be tested.
3) Propose a set of tests prioritized by risk and business value.
4) Implement the top {N} tests in {framework} style, following existing conventions.
```

---

## Prompt Templates

### System Prompt Template

Use this as a base for any vibe coding session:

```markdown
You are a senior {ROLE} working on the {PROJECT} codebase.

Goals:
- Ship reliable, maintainable code.
- Preserve and update project knowledge in shared docs.
- Minimize hallucinations: say "I don't know" if repo/docs don't support a claim.

Rules:
- Always ask 1–3 clarification questions if requirements are ambiguous.
- Before coding: summarize your understanding and propose a short plan.
- Only touch files explicitly listed in the current task, unless asked otherwise.
- When editing: show diff-style or clearly separated "before/after" sections.
- Keep code idiomatic to the stack already used in this repo.
- Prefer small, reversible changes; suggest tests for any non-trivial logic.
- If context may be missing, ask for: PRD.md, TECH_DESIGN.md, NOTES.md, CHANGELOG.md.
```

### Session Opener Template

```markdown
Project: {name}
Branch: {branch/tag}
Context:
- Latest CHANGELOG section: {paste}
- Relevant NOTES excerpt: {paste}

Task for this session: {brief}

Please:
1) Summarize current project state in 3–7 bullets.
2) Confirm what you will *not* touch today.
3) Draft a mini-plan for this session only.
```

### Vibe Brief Template

Use for any substantial piece of work:

```markdown
# Vibe Brief – {Short name}

## Goal
- {1–3 bullet points describing outcome, not implementation}

## User Stories / Scenarios
- As a {user}, I want {goal} so that {benefit}
- {Edge/negative cases if known}

## Current Behavior / State
- {What the app does today}
- {Known constraints: performance, SLAs, regulatory, etc.}

## Scope
- **In**: {bullets}
- **Out**: {bullets}

## Interfaces & Contracts
- APIs / events / DB tables involved
- External systems / services

## Risks / Unknowns
- {Things we don't know yet that might change design}

## Definition of Done
- [ ] Functional requirements met
- [ ] Tests passing
- [ ] Docs / UX updated
```

---

## Session Lifecycle

### Start of Session

```markdown
Project: {name}
Branch: {branch/tag}
Context:
- Latest CHANGELOG section: {paste}
- Relevant NOTES excerpt: {paste}

Task for this session: {brief}

Please:
1) Summarize current project state in 3–7 bullets.
2) Confirm what you will *not* touch today.
3) Draft a mini-plan for this session only.
```

### Mid-Session Consolidation

After each logical chunk of work:

```markdown
We just finished this chunk of work:
{short human summary + any diffs}

1) Generate:
   - A concise NOTES.md update
   - A CHANGELOG entry under version {vX.Y.Z or "Unreleased"}
2) Suggest tags/keywords so we can easily find this later.
3) List open questions / follow-ups for future sessions.
```

### End of Session Handoff

```markdown
We are ending the session.

Please create a "Session Summary" with:
- What changed (high level)
- Files touched
- Any risky areas or TODOs
- How to resume: "Next 3 steps" for the next session

Format as Markdown so I can paste it into NOTES.md.
```

---

## References

- [Vibe Coding Prompt Template](https://github.com/KhazP/vibe-coding-prompt-template) — Comprehensive prompt templates
- [Structured Workflow for Vibe Coding](https://dev.to/wasp/a-structured-workflow-for-vibe-coding-full-stack-apps-352l) — Full-stack workflow guide
- [vibeworkflow.app](https://vibeworkflow.app) — Workflow automation for vibe coding

---

*[← Back to Main](../README.md)*
