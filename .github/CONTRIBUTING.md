# Contributing to awesome-vibecoding

This repository is **fully automated with AI**. Content updates, translations, and curation are handled by **Pi SDK**, **Kimi or Qwen**, and **Exa Search API** via GitHub Actions.

## How to Contribute

1. **Open an Issue** — Use the [Add Resource template](https://github.com/roboco-io/awesome-vibecoding/issues/new?template=add-resource.yml)
   - Select a category, provide name, URL, and description
2. **Automatic Processing** — The system automatically:
   - Validates the URL (reachability, duplicates)
   - Checks content quality with Pi
   - Adds the resource and generates translations (English, Korean, Japanese)
   - Commits to main and closes the issue
3. **Manual Review** — If auto-processing can't handle it, a `needs-review` label is added and a maintainer will use `/approve` or `/reject`

## Please Submit Issues, Not PRs

This repository is AI-operated. Pi handles all content editing, formatting, and translation to ensure consistency across all three language versions. Direct PRs will cause merge conflicts with the automated pipeline.

## Curation requirements

Every submission must pass all five conditions: direct relevance to AI-assisted development, usable public evidence, distinct value, transparent claims/access/license, and maintained or substantively complete content. Read the [full curation policy](../docs/curation-policy.md).

Paid products and self-submissions are allowed under the same criteria. Disclose your affiliation, pricing limitations, and material license restrictions. Source-available software must not be described as open source. GitHub stars are neither a minimum requirement nor sufficient evidence on their own.

A clear duplicate, out-of-scope resource, or deceptive submission is rejected with a reason. Missing or temporarily inaccessible evidence results in `needs-review`, not automatic acceptance. `/approve` retries a resource but does not waive the criteria.
