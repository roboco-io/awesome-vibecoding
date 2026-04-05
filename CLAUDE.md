# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**awesome-vibecoding** is a curated list of resources about Vibe Coding (AI-assisted programming). This is a documentation-only repository with no build/test steps.

## Architecture

```
awesome-vibecoding/
├── README.md                    # English source (edit this only)
├── README.ko.md                 # Korean translation (auto-generated)
├── README.ja.md                 # Japanese translation (auto-generated)
├── package.json                 # SDK dependency (@anthropic-ai/claude-agent-sdk)
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
    │   ├── weekly-update.yml    # Weekly content update via Claude Code SDK
    │   ├── auto-process-issue.yml # Issue auto-processing via Claude Code SDK
    │   └── issue-approval.yml   # Manual approval via Claude Code SDK
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

### GitHub Actions Workflows (Claude Code SDK)
- **weekly-update.yml**: Runs every Sunday, uses Perplexity MCP to find new tools, commits directly to main. Script: `scripts/weekly-update.mjs`
- **auto-process-issue.yml**: Triggers on issue creation with `addition` label — validates URL, checks duplicates, then auto-processes and commits to main. Script: `scripts/auto-process-issue.mjs`
- **issue-approval.yml**: Manual fallback — `/approve` forces add, `/reject` closes with reason. Script: `scripts/issue-approval.mjs`

## Content Editing Rules

1. **Only edit README.md** — translations are auto-generated
2. **Run `/translate` after changes** — or let the hook remind you
3. **Follow table formats** — each section uses specific table structures
4. **All tools need links** — use official GitHub repos or product pages

## Hook System

The `PostToolUse` hook (`translate-readme.sh`) monitors Edit/Write operations and prompts to run `/translate` when README.md is modified.

## Translation Guidelines

- Keep technical terms, URLs, and product names in English
- Korean: Add space after **bold text** followed by Korean characters
- Japanese: Use appropriate particles and natural phrasing
- Preserve all markdown formatting exactly
