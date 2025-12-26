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
├── docs/
│   ├── automation.md            # How the automation works
│   └── workflows-and-templates.md
├── .claude/
│   ├── commands/translate.md    # /translate skill
│   ├── hooks/translate-readme.sh
│   └── settings.json            # PostToolUse hook config
└── .github/
    ├── workflows/
    │   ├── weekly-update.yml    # Weekly content update via Claude Code
    │   └── issue-approval.yml   # Issue-based resource addition
    └── prompts/
        ├── weekly-update.md     # Prompt for weekly updates
        └── issue-approval.md    # Prompt for issue processing
```

## Key Commands

### Translation
```
/translate
```
Runs parallel agents to sync README.md changes to Korean and Japanese versions.

### GitHub Actions Workflows
- **weekly-update.yml**: Runs every Sunday, uses Perplexity MCP to find new tools
- **issue-approval.yml**: Triggered when owner comments `/approve` on an issue

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
