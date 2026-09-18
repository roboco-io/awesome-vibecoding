# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**awesome-vibecoding** is a curated list of resources about Vibe Coding (AI-assisted programming). The repository contains curated documentation and Node.js automation. Use Node.js 24.14+ and run `npm test` for automation changes.

## Architecture

```
awesome-vibecoding/
├── README.md                    # English source (edit this only)
├── README.ko.md                 # Korean translation (auto-generated)
├── README.ja.md                 # Japanese translation (auto-generated)
├── package.json                 # Pi SDK dependencies (@earendil-works/pi-coding-agent)
├── scripts/
│   ├── weekly-update.mjs        # SDK script for weekly updates
│   ├── auto-process-issue.mjs   # SDK script for issue auto-processing
│   └── issue-approval.mjs       # SDK script for manual approval
├── docs/
│   ├── automation.md            # How the automation works
│   └── workflows-and-templates.md
├── .claude/
│   ├── commands/translate.md    # /translate skill
│   ├── hooks/translate-readme.sh
│   └── settings.json            # PostToolUse hook config
└── .github/
    ├── workflows/
    │   ├── weekly-update.yml    # Weekly content update via Pi + Kimi/Qwen + Exa
    │   ├── auto-process-issue.yml # Issue auto-processing via Pi SDK
    │   └── issue-approval.yml   # Manual approval via Pi SDK
    └── prompts/
        ├── issue-auto-process.md # Prompt for issue auto-processing
        └── issue-approval.md    # Prompt for issue approval
```

## Key Commands

### Translation
```
/translate
```
Runs parallel agents to sync README.md changes to Korean and Japanese versions.

### GitHub Actions Workflows (Pi SDK)
- **weekly-update.yml**: Runs every Sunday, uses Exa Search API with Pi and Kimi (default) or Qwen to find new tools, commits directly to main. Script: `scripts/weekly-update.mjs`
- **auto-process-issue.yml**: Triggers on issue creation with an `addition` label or URL, or when a human adds the label — validates URL, checks duplicates, then auto-processes and commits to main. Script: `scripts/auto-process-issue.mjs`
- **issue-approval.yml**: Manual fallback — `/approve` retries an approved resource with duplicate/translation validation, `/reject` closes with reason. Script: `scripts/issue-approval.mjs`

## Content Editing Rules

1. **Only edit README.md** — translations are auto-generated
2. **Run `/translate` after changes** — or let the hook remind you
3. **Follow table formats** — each section uses specific table structures
4. **All tools need links** — use official GitHub repos or product pages

CI uses `scripts/lib/pi-runner.mjs` and `.github/prompts/` with explicit custom tools. It does not load local Claude hooks. See `docs/automation.md` for provider variables and organization secrets.

## Hook System

The `PostToolUse` hook (`translate-readme.sh`) monitors Edit/Write operations and prompts to run `/translate` when README.md is modified.

## Translation Guidelines

- Keep technical terms, URLs, and product names in English
- Korean: Add space after **bold text** followed by Korean characters
- Japanese: Use appropriate particles and natural phrasing
- Preserve all markdown formatting exactly
