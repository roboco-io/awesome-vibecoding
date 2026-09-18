# README Navigation Implementation Plan

**Goal:** Let students and developers quickly find recent verified information, task-specific tools, and an appropriate learning path.

**Spec:** [Approved navigation proposal](readme-navigation-proposal.md).

**Constraints:** Preserve existing resource URLs; distinguish reviewed facts from inherited descriptions; retain current Pi migration and issue-review work; keep English as the source and synchronize Korean/Japanese through the translation skill. Publish the completed changes to main after verification.

- [x] Rebuild the English README with quick navigation, a recent-review window, starter guidance, six task catalogs, purpose-based learning, and compact background/community sections.
- [x] Preserve source links, use four-column resource tables, alphabetize within categories, and distinguish unreviewed access information from the six verified additions. Separate confirmed archived references.
- [x] Update category constants, issue form, workflow inputs, and Pi prompts together. Add deterministic pruning for the rolling recent-updates block and tests for navigation/catalog consistency.
- [x] Synchronize both translations; verify URL parity, anchors, table widths, source-link preservation, regression tests, and workflow lint.

No new product claims, pricing, or verification dates will be inferred from moving an existing entry.

Validation: all three README files preserve the 248 pre-change unique external URLs; all explicit anchors, catalog boundaries, table widths, and URL ordering were checked. The automated test suite and workflow lint passed.
