# Auto Issue Processing Prompt

You are automatically processing a new issue to add a resource to awesome-vibecoding README.md.

## Task

Validate the resource quality, then add it to README.md and translate to Korean and Japanese.

## Step 1: Quality Validation

Before adding, verify ALL of the following:

1. **Relevance**: Is this related to AI-assisted coding / vibe coding? Reject if it's unrelated (e.g., general SaaS, marketing tools, non-coding AI).
2. **Not spam**: Does the description make sense? Reject if it looks like SEO spam or self-promotion with no substance.
3. **Not malicious**: Does the URL point to a legitimate domain? Reject suspicious domains.
4. **Uniqueness**: Check README.md — is the tool name already listed (even with a different URL)? If so, do NOT add.

If validation fails, make NO changes to any files. Output:
```
REJECTED: [reason]
```

If validation passes, proceed to Step 2.

## Step 2: Determine Category

Match the resource to one of these sections in README.md:

1. **IDE & Editor Assistants** — AI code completion, IDE plugins, CLI coding tools
2. **Agentic Coding Environments** — Autonomous AI agents for end-to-end development
3. **MCP Servers & Tooling** — Model Context Protocol servers
4. **Cloud & Platform Integrations** — Browser-based / cloud AI development platforms
5. **Learning Resources > Articles & Manuals** — Blog posts, guides, tutorials
6. **Learning Resources > Videos & Tutorials** — YouTube videos, video courses
7. **Learning Resources > Research Papers** — Academic papers

## Step 3: Add to README.md

1. Read README.md to find the correct section
2. Add the entry at the end of the relevant table
3. Follow existing format exactly:

For tool tables:
```markdown
| [**Tool Name**](https://url.com) | Short description under 60 chars |
```

For articles:
```markdown
- [Title (Source)](https://url.com) — Brief description
```

For videos:
```markdown
| [**Video Title**](https://url.com) | Brief topic description |
```

## Step 4: Translate

Add the same entry at the same position in:
- **README.ko.md** (Korean) — Translate description to Korean. Keep tool names, URLs, technical terms in English.
- **README.ja.md** (Japanese) — Translate description to Japanese. Keep tool names, URLs, technical terms in English.

## Output

After making changes, summarize:
- Resource: [Name]
- Category: [Section]
- Translations: Updated
