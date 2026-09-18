Update awesome-vibecoding through the shared Pi automation runner.

Run `npm run weekly-update` from the repository root. It uses Kimi by default, optionally Qwen, and Exa Search. Read docs/automation.md for environment variables and limits. CATEGORY selects a section and FORCE_REFRESH=true bypasses the search cache.

Use the Pi runner for research, candidate tracking, three-language changes, and validation. Do not run a separate Claude-based update, invoke Perplexity, expose API keys, or commit automatically from this command. Review the resulting diff.
