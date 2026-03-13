# Contributing to awesome-vibecoding

This repository is **fully automated with AI**. Content updates, translations, and curation are handled by **Claude Code** and **Perplexity MCP** via GitHub Actions.

## How to Contribute

1. **Open an Issue** — Use the [Add Resource template](https://github.com/roboco-io/awesome-vibecoding/issues/new?template=add-resource.yml)
   - Select a category, provide name, URL, and description
2. **Automatic Processing** — The system automatically:
   - Validates the URL (reachability, duplicates)
   - Checks content quality with Claude Code
   - Adds the resource and generates translations (English, Korean, Japanese)
   - Commits to main and closes the issue
3. **Manual Review** — If auto-processing can't handle it, a `needs-review` label is added and a maintainer will use `/approve` or `/reject`

## Please Submit Issues, Not PRs

This repository is AI-operated. Claude Code handles all content editing, formatting, and translation to ensure consistency across all three language versions. Direct PRs will cause merge conflicts with the automated pipeline.

## Gate-keeping

Submissions are automatically rejected if:

- URL is unreachable
- Resource is already listed (duplicate)
- Content is unrelated to AI-assisted coding
- Submission appears to be spam

## Curation Principles

Resources should be:

- **Relevant** — Directly related to vibe coding or AI-assisted development
- **Quality** — Well-maintained, documented, and actively used
- **Accessible** — Free or with free tier available preferred

## Quality Criteria

A tool is typically added if it meets any of these:

- 1000+ GitHub stars
- Featured in major tech publications
- Active development (multiple releases in 2025)
- Mentioned in multiple community discussions
- Offers unique capability not covered by existing tools
