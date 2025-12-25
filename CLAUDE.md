# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **awesome-vibecoding**, a curated list of resources about Vibe Coding (AI-assisted programming). The repository is primarily a documentation project containing:
- English README.md (source of truth)
- Auto-translated Korean (README.ko.md) and Japanese (README.ja.md) versions
- Python translation automation script

## Architecture

```
awesome-vibecoding/
├── README.md              # Primary English documentation (edit this)
├── README.ko.md           # Auto-generated Korean translation
├── README.ja.md           # Auto-generated Japanese translation
├── .claude/
│   ├── commands/
│   │   └── translate.md   # /translate skill definition
│   ├── hooks/
│   │   └── translate-readme.sh  # Hook: notifies when README.md changes
│   └── settings.json      # Claude Code hooks configuration
└── .github/workflows/
    └── translate-readme.yml  # Backup: GitHub Actions translation
```

## Key Workflow

**Content changes should only be made to README.md.** Translations are triggered via:
1. Claude Code hook detects README.md modification → prompts to run `/translate`
2. `/translate` command launches translation agents

## Commands

### Translate README (Claude Code)
```
/translate
```
Launches parallel translation agents for Korean and Japanese.

### Legacy: Run Translation via Python
```bash
export OPENAI_KEY=your_api_key
python scripts/translate_readme.py
```

## Translation System

When `/translate` is executed:
- Two translation agents run in parallel (Korean, Japanese)
- Each agent reads README.md and writes the translated version
- Claude Code hook automatically notifies when README.md is modified

## Content Guidelines

When adding entries to README.md:
- Follow existing format: `- [Name](URL) - Description`
- Keep descriptions concise but informative
- Place entries under appropriate sections (Projects/Guides/YouTube)
