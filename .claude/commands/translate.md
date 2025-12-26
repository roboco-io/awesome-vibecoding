---
description: Sync changes from README.md to Korean (README.ko.md) and Japanese (README.ja.md) translations.
argument-hint: Specific context or task to focus on (leave empty for comprehensive update)
---

## Modes

### 1. Full Translation
Retranslate the entire README.md. Use when structure has significantly changed.

### 2. Incremental Sync (Default)
Find added/modified/deleted items in README.md and apply them to the same positions in Korean/Japanese files.

## Translation Guidelines

### Common Rules
- Keep technical terms, product names, code, and URLs in English
- Preserve markdown formatting, links, and code blocks exactly
- Maintain table structure precisely

### Korean (README.ko.md)
- First line: `# Awesome Vibe Coding (한국어)`
- Keep language selection links: `*Language: [English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md)*`
- Add space after **bold text** when followed by Korean characters (e.g., `**텍스트** 다음`)

### Japanese (README.ja.md)
- First line: `# Awesome Vibe Coding (日本語)`
- Keep language selection links

## Execution

Use the Task tool to run two translation agents in parallel:

- Agent 1: README.md → README.ko.md (Korean)
- Agent 2: README.md → README.ja.md (Japanese)

### Incremental Sync Process (Default)

Each agent:
1. Reads both README.md and the target language file (README.ko.md or README.ja.md)
2. Identifies new or modified items in README.md
3. Locates the corresponding section/position in the target file
4. Translates new items and inserts them at the exact same position
5. Removes deleted items from the target file if any

### Full Translation Process

Each agent:
1. Reads README.md
2. Translates the entire content to the target language
3. Saves the translated file

## Position Sync Example

When new item added to README.md:
```markdown
### Cloud & Platform Integrations
| Tool | Description |
|------|-------------|
| [**Lovable**](https://lovable.dev/) | Full-stack app generation with Supabase |
| [**NewTool**](https://newtool.com/) | New AI tool description |
| [**Duet AI**](https://workspace.google.com/solutions/ai/) | Google Workspace AI integration |
```

→ Insert translated item at the same position (between Lovable and Duet AI) in README.ko.md and README.ja.md

Report translation results to the user upon completion.
