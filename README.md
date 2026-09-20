# Awesome Vibe Coding

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Weekly Update](https://github.com/roboco-io/awesome-vibecoding/actions/workflows/weekly-update.yml/badge.svg)](https://github.com/roboco-io/awesome-vibecoding/actions/workflows/weekly-update.yml)
[![Maintained by Pi](https://img.shields.io/badge/Maintained%20by-Pi-blueviolet)](https://pi.dev/)
[![Issues Welcome](https://img.shields.io/badge/Issues-welcome-brightgreen.svg)](../../issues/new)
[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](https://creativecommons.org/publicdomain/zero/1.0/)

*Language: [English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md)*

A concise, reviewed starting point for **building software with AI**. The core tools below had a usable current offering and supporting first-party evidence on **2026-09-18**. Known sunsets, archived implementations, and unresolved entries are kept out of this shortlist.

| I want to… | Start here |
|---|---|
| See what changed | [Recent verified updates](#recent-updates) |
| Build or improve software | [Find tools by task](#tools) |
| Learn from a first project | [Start here](#start-here) · [Learn & practice](#learning) |

[Code](#code) · [App & UI](#apps) · [Context & specs](#context) · [Test & review](#quality) · [Deploy & run](#delivery) · [Workspaces & usage](#operations) · [Community](#community)

<a id="recent-updates"></a>
<details>
<summary><strong>Recent Verified Updates</strong></summary>

Recent reviews and material changes from the last 30 days, newest first. A review date is **not a product release date**. [Lifecycle review and evidence](docs/lifecycle-review-2026-09-18.md) record what was checked.

<!-- recent-updates:start -->
| Verified on | Update | What changed |
|---|---|---|
| 2026-09-20 | [Delta (Zed)](#resource-delta) | Reviewed addition: multiplayer agent-coding workspace with thread-based review; public beta, free during beta. |
| 2026-09-18 | [Shep](#resource-shep) | Reviewed addition: local-first orchestrator that runs parallel coding agents in isolated Git worktrees through to draft PRs. |
| 2026-09-18 | [Lifecycle cleanup](docs/lifecycle-review-2026-09-18.md) | Removed unavailable/new-user-blocked entries, corrected canonical products, and reduced the core tool list from 156 to 40. |
| 2026-09-18 | [Pi](#resource-pi) | Reviewed addition: extensible MIT terminal coding agent with multi-provider models and an SDK. |
| 2026-09-18 | [NextReset](docs/verified-catalog.md#resource-nextreset) | Reviewed addition: unofficial public reset history and local countdowns; forecasts are not endorsed. |
| 2026-09-18 | [Superagent](#resource-superagent) | Reviewed addition: macOS coding-agent workspace with browser and iOS workflows. |
| 2026-09-18 | [Publish.my](#resource-publish-my) | Reviewed addition: agent-oriented static-site publishing; email activation required. |
| 2026-09-18 | [Agent QA](#resource-agent-qa) | Reviewed addition: web/mobile test workflows; FSL-1.1-ALv2 is identified. |
| 2026-09-18 | [Duckweed](#resource-duckweed) | Reviewed addition: local coding-agent terminal workspace; source-available license. |
| 2026-09-18 | [Vibe Coding with Confidence (Mahmoud Zalt)](#resource-vibe-coding-with-confidence-mahmoud-zalt) | Access clarified: free core chapters and paid advanced chapters. |
<!-- recent-updates:end -->

</details>

<a id="start-here"></a>
## Start Here

**New to development:** Choose one small project, learn how to save changes with Git, and test one feature at a time. You should be able to open a project folder and run the commands in your chosen tutorial; use its setup chapter if those steps are new.

1. Read a [first-project guide](#first-project) and choose a result you can explain, such as a local task list.
2. Choose one [coding assistant](#code) or [app prototyping tool](#apps). Read the access conditions first: a free client can still require a paid model, subscription, or API key.
3. Write a short goal and acceptance checks. Build one small step, inspect the changes, run tests, then save a Git checkpoint.
4. Use the [testing and review tools](#quality) before sharing. Keep credentials outside prompts and commits, and understand the generated code you rely on.
5. Deploy only after checking the [hosting/runtime constraints](#delivery), especially whether the result needs a backend.

**Already a developer:** Jump to a task above, then use the [practical workflows](#practical-guides) for planning, refactoring, debugging, and validation.

<a id="tools"></a>
## Find Tools by Task

The main page keeps a small set of distinct starting points for each task; it is not a popularity ranking or an exhaustive list. [More verified options](docs/verified-catalog.md) remain available. Each resource has one primary home. **CLI, IDE, Web, Desktop, and MCP** describe how you use a tool; they are not quality rankings. Search this page for `MCP` to find protocol integrations across tasks.

**Read the metadata:** each verification date links to the lifecycle evidence. It confirms the described offering and access scope as of that date, not a security audit or a promise of future availability. `Check pricing` means the current price was not comprehensively reviewed. Open-source client licenses do not make model inference free. New-user restrictions and paid chapters are stated explicitly.

<a id="code"></a>
### Code & Editing

Understand a repository, implement a feature, or refactor existing code.

<!-- catalog:code -->
| Resource | When to use it | Access / scope | Verified |
|---|---|---|---|
| <a id="resource-aider"></a>[**Aider**](https://github.com/Aider-AI/aider) · CLI | Terminal pair programming with cloud or local models and Git integration | Open-source client; API or local-model costs | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-aider) |
| <a id="resource-claude-code"></a>[**Claude Code**](https://code.claude.com/docs/en/overview) · CLI | Agentic coding assistant with terminal and project workflows | Check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-claude-code) |
| <a id="resource-cline"></a>[**Cline**](https://github.com/cline/cline) | Coding agent for IDE, terminal, and desktop workflows with file, command, and browser tools | Client plus model provider; check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-cline) |
| <a id="resource-cursor"></a>[**Cursor**](https://www.cursor.com/) · IDE | Coding editor and agent for implementation, debugging, and code review | Check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-cursor) |
| <a id="resource-gemini-cli"></a>[**Gemini CLI**](https://github.com/google-gemini/gemini-cli) · CLI | Open-source terminal coding agent with API-key, Vertex, or eligible enterprise access; consumer subscription access retired | API/Vertex or eligible enterprise; no retired consumer route | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-gemini-cli) |
| <a id="resource-github-copilot"></a>[**GitHub Copilot**](https://github.com/features/copilot) | Coding assistance and agent workflows across GitHub and supported IDEs | Check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-github-copilot) |
| <a id="resource-goose"></a>[**Goose**](https://github.com/aaif-goose/goose) · CLI | Extensible local agent with coding workflows, desktop and CLI interfaces, and MCP tools | Check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-goose) |
| <a id="resource-kiro"></a>[**Kiro**](https://kiro.dev) · IDE | AWS coding agent with IDE and CLI workflows, specifications, and tests | Check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-kiro) |
| <a id="resource-openai-codex-cli"></a>[**OpenAI Codex CLI**](https://openai.com/codex/) · CLI | OpenAI coding agent that runs locally in the terminal | Check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-openai-codex-cli) |
| <a id="resource-pi"></a>[**Pi**](https://github.com/earendil-works/pi) · CLI | Extensible terminal coding agent and embeddable harness | MIT client; model/provider terms separate | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-pi) |
<!-- /catalog:code -->

<a id="apps"></a>
### App & UI Prototyping

Create a first application or interface from a description or design.

<!-- catalog:apps -->
| Resource | When to use it | Access / scope | Verified |
|---|---|---|---|
| <a id="resource-bolt-new"></a>[**Bolt.new**](https://bolt.new/) · Web | Natural language app building by StackBlitz | Check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-bolt-new) |
| <a id="resource-dyad"></a>[**Dyad**](https://github.com/dyad-sh/dyad) · Desktop | Build applications locally with configurable model providers | Check pricing; local desktop app and model-provider costs. | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-dyad) |
| <a id="resource-lovable"></a>[**Lovable**](https://lovable.dev/) · Web | Full-stack app generation with Supabase | Check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-lovable) |
| <a id="resource-onlook"></a>[**Onlook**](https://www.onlook.com/) · Web | Edit application interfaces visually while working with code | Check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-onlook) |
| <a id="resource-replit"></a>[**Replit**](https://replit.com/) · Web | Build and iterate on applications with Replit Agent | Check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-replit) |
| <a id="resource-v0"></a>[**v0**](https://v0.app/) · Web | Vercel's AI for UI/React generation | Check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-v0) |
<!-- /catalog:apps -->

<a id="context"></a>
### Context, Specs & Integrations

Give agents requirements, rules, documentation, and connected project data.

<!-- catalog:context -->
| Resource | When to use it | Access / scope | Verified |
|---|---|---|---|
| <a id="resource-caliber"></a>[**Caliber**](https://github.com/caliber-ai-org/ai-setup) | CLI that generates and syncs AI agent configs for Claude Code, Cursor, and Codex | Check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-caliber) |
| <a id="resource-context7"></a>[**Context7**](https://github.com/upstash/context7) · MCP | Retrieve library documentation for coding context | Check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-context7) |
| <a id="resource-filesystem-mcp"></a>[**Filesystem MCP**](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) · MCP | Give agents controlled access to project files | Check pricing; reference implementation, not a production-ready guarantee | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-filesystem-mcp) |
| <a id="resource-github-mcp"></a>[**GitHub MCP**](https://github.com/github/github-mcp-server) · MCP | Connect repository, issue, and pull-request workflows | Check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-github-mcp) |
| <a id="resource-neon"></a>[**Neon**](https://github.com/neondatabase/mcp-server-neon) · MCP | Connect development workflows to Neon databases | Check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-neon) |
| <a id="resource-notion-mcp"></a>[**Notion MCP**](https://developers.notion.com/guides/mcp/overview) · MCP | Official hosted MCP for searching, reading and updating Notion content | Check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-notion-mcp) |
| <a id="resource-openspec"></a>[**OpenSpec**](https://github.com/Fission-AI/OpenSpec) | Spec-driven development framework for AI coding assistants | Check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-openspec) |
| <a id="resource-supabase"></a>[**Supabase MCP**](https://github.com/supabase/mcp) · MCP | Official MCP for Supabase schemas, queries and project configuration | Check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-supabase) |
<!-- /catalog:context -->

<a id="quality"></a>
### Testing, Review & Security

Check behavior, review generated changes, and diagnose failures.

<!-- catalog:quality -->
| Resource | When to use it | Access / scope | Verified |
|---|---|---|---|
| <a id="resource-agent-qa"></a>[**Agent QA**](https://github.com/vostride/agent-qa) · MCP | Author and run natural-language web and mobile tests | FSL-1.1-ALv2; source-available with competing-use restriction; model costs | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-agent-qa) |
| <a id="resource-playwright-mcp-official"></a>[**Playwright MCP (Microsoft)**](https://github.com/microsoft/playwright-mcp) · MCP | Official browser automation through structured page snapshots | Apache-2.0 client; model terms separate | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-playwright-mcp-official) |
| <a id="resource-pr-agent"></a>[**PR-Agent**](https://github.com/The-PR-Agent/pr-agent) | Community-maintained pull request reviewer, separate from Qodo | Check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-pr-agent) |
| <a id="resource-qodo"></a>[**Qodo**](https://www.qodo.ai) | AI code review engine (formerly CodiumAI) | Check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-qodo) |
| <a id="resource-semgrep"></a>[**Semgrep MCP**](https://github.com/semgrep/semgrep/tree/develop/cli/src/semgrep/mcp) · MCP | MCP security scanning through the maintained Semgrep CLI | Check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-semgrep) |
| <a id="resource-sentry"></a>[**Sentry**](https://github.com/getsentry/sentry-mcp) · MCP | Inspect application errors and diagnose failures | Functional Source License; source-available; check hosted terms | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-sentry) |
<!-- /catalog:quality -->

<a id="delivery"></a>
### Deployment & Execution

Build, publish, or run code in an appropriate execution environment.

<!-- catalog:delivery -->
| Resource | When to use it | Access / scope | Verified |
|---|---|---|---|
| <a id="resource-cloudflare"></a>[**Cloudflare**](https://github.com/cloudflare/mcp-server-cloudflare) · MCP | Manage application deployment and cloud resources | Check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-cloudflare) |
| <a id="resource-e2b"></a>[**E2B**](https://github.com/e2b-dev/E2B) | Secure cloud sandbox environment for enterprise-grade AI agents | Check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-e2b) |
| <a id="resource-publish-my"></a>[**Publish.my**](https://publish.my/) · Web | Agent-driven static-site publishing with email activation | Free tier; static sites only; email activation | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-publish-my) |
| <a id="resource-xcode-build-mcp"></a>[**XcodeBuildMCP**](https://github.com/getsentry/XcodeBuildMCP) · MCP | CLI and MCP tools for building, running and debugging Apple-platform projects | Check pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-xcode-build-mcp) |
<!-- /catalog:delivery -->

<a id="operations"></a>
### Agent Workspaces & Usage

Organize sessions, inspect runs, and understand usage or availability.

<!-- catalog:operations -->
| Resource | When to use it | Access / scope | Verified |
|---|---|---|---|
| <a id="resource-delta"></a>[**Delta (Zed)**](https://delta.dev/) · Desktop | Run agent threads and review their changes in a multiplayer workspace that keeps conversation and code history connected; works with existing Git repositories | Free during public beta; paid plans planned; model costs separate | 2026-09-20 |
| <a id="resource-duckweed"></a>[**Duckweed**](https://github.com/MusicMaster4/Duckweed) · Desktop | Run coding agents, shells, Git diffs and sessions in a local cross-platform workspace | Source-available; see license; model/provider costs separate | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-duckweed) |
| <a id="resource-llm-log"></a>[**llm.log**](https://github.com/lanesket/llm.log) | Inspect model costs, tokens and request traces through a local proxy | MIT; model/provider costs separate | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-llm-log) |
| <a id="resource-parallel-code"></a>[**Parallel Code**](https://github.com/johannesjo/parallel-code) · Desktop | Run coding agents in isolated Git worktrees and review their changes | MIT; model/provider costs separate | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-parallel-code) |
| <a id="resource-shep"></a>[**Shep**](https://github.com/shep-ai/shep) · CLI | Orchestrate parallel coding agents in isolated Git worktrees through commit, push, CI watch and draft PRs | MIT client; agent subscription or API costs separate | 2026-09-18 |
| <a id="resource-superagent"></a>[**Superagent**](https://github.com/pungme/superagent-desktop) · Desktop | Use Claude Code or Codex in a macOS workspace with browser and iOS tools | MIT; macOS Apple Silicon; model subscription separate | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-superagent) |
| <a id="resource-usage"></a>[**usage**](https://github.com/aqua5230/usage) · Desktop | View coding-agent quotas from the macOS menu bar or Windows system tray | AGPL-3.0; model/provider costs separate | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-usage) |
| <a id="resource-warp"></a>[**Warp Terminal**](https://www.warp.dev/terminal) | Use an agent-oriented terminal and inspect coding workflows | Terminal download; check AI usage pricing | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-warp) |
<!-- /catalog:operations -->

<a id="learning"></a>
## Learn & Practice

Choose by what you want to achieve. Guide and paper labels describe the format. Dated conceptual material can remain useful; its old tool examples and benchmark rankings are not current product advice. Check language, prerequisites, and paid sections before starting. Historical videos and additional reading are in the extended catalog.

<a id="first-project"></a>
### First Project

Follow a setup-to-result sequence. Use the material's own prerequisites and finish a small working application before collecting more tools.

| Resource | When to use it | Access / scope | Verified |
|---|---|---|---|
| <a id="resource-ai-book-ai-coding"></a>[**AI Book: AI Coding**](https://aibook.ren/categories/ai-coding) · Guide | Chinese handbook on coding-agent workflows, tool selection, and practices with Cursor, Codex, Claude Code, and Kiro | Free reading; check reuse terms | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-ai-book-ai-coding) |
| <a id="resource-vibe-coding-manual-roboco"></a>[**Vibe Coding Manual (Roboco)**](https://roboco.io/posts/vibe-coding-manual/) · Guide | Korean workflow and project-rule templates; dated examples | Free reading; check reuse terms | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-vibe-coding-manual-roboco) |
| <a id="resource-vibe-coding-with-confidence-mahmoud-zalt"></a>[**Vibe Coding with Confidence (Mahmoud Zalt)**](https://zalt.me/guides/vibe-coding) · Guide | Development handbook with readable introductory chapters and paid advanced material | Free core chapters; paid advanced chapters; EN | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-vibe-coding-with-confidence-mahmoud-zalt) |

<a id="practical-guides"></a>
### Practical Workflows

Use these when a project already exists and you need to solve a specific problem.

| Task | Working sequence |
|---|---|
| New feature | Goal and acceptance checks → inspect context → small implementation → review and test |
| Refactoring | Capture current behavior → identify a small change → compare behavior → repeat |
| Bug fixing | Reproduce → form a hypothesis → add a regression check → fix and verify |
| Testing | Identify critical behaviors → choose meaningful checks → run and inspect failures |

[Full workflows and prompt templates](docs/workflows-and-templates.md) include session setup and reusable playbooks. Keep requirements and decisions in project documents, use sandboxes where appropriate, and review security-sensitive changes before deployment.

| Resource | When to use it | Access / scope | Verified |
|---|---|---|---|
| <a id="resource-agentic-coding-armin-ronacher"></a>[**Agentic Coding Recommendations (Armin Ronacher)**](https://lucumr.pocoo.org/2025/6/12/agentic-coding/) · Guide | Practical agent workflows and testing advice; 2025 practitioner perspective | Free reading; check reuse terms | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-agentic-coding-armin-ronacher) |
| <a id="resource-here-s-how-i-use-llms-to-help-me-write-code-simon-willison"></a>[**Here's how I use LLMs to help me write code (Simon Willison)**](https://simonwillison.net/2025/Mar/11/using-llms-for-code/) · Guide | Iterative coding and QA practices; 2025 tool examples are historical | Free reading; check reuse terms | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-here-s-how-i-use-llms-to-help-me-write-code-simon-willison) |
| <a id="resource-secure-vibe-coding-guide-csa"></a>[**Secure Vibe Coding Guide (CSA)**](https://cloudsecurityalliance.org/blog/2025/04/09/secure-vibe-coding-guide) · Guide | Security checklist covering secrets, authorization, validation and review | Free reading; check reuse terms | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-secure-vibe-coding-guide-csa) |

<a id="concepts-research"></a>
### Concepts & Research

Understand the tools after trying a small project, or go deeper into evaluation and development practices.

[Vibe coding](https://en.wikipedia.org/wiki/Vibe_coding) uses natural-language intent to guide AI-generated software. The [Model Context Protocol](https://modelcontextprotocol.io/) connects agents to tools and data. A coding agent, its underlying model, and its integrations are different choices: changing one does not automatically change the others.

| Resource | When to use it | Access / scope | Verified |
|---|---|---|---|
| <a id="resource-context-engineering-intro-coleam00"></a>[**Context Engineering Intro (coleam00)**](https://github.com/coleam00/context-engineering-intro) · Guide | Project-context and instruction examples for coding agents | Free reading; check reuse terms | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-context-engineering-intro-coleam00) |
| <a id="resource-the-model-context-protocol-guide-anthropic"></a>[**Model Context Protocol documentation**](https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro) · Guide | Current official introduction to MCP architecture and integrations | Free reading; check reuse terms | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-the-model-context-protocol-guide-anthropic) |
| <a id="resource-swe-agent-agent-computer-interfaces-enable-automated-software-engineering"></a>[**SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering**](https://arxiv.org/abs/2405.15793) · Paper | Autonomous agent fixing real bugs using Agent-Computer Interface | Free reading; check reuse terms | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-swe-agent-agent-computer-interfaces-enable-automated-software-engineering) |
| <a id="resource-swe-bench-can-language-models-resolve-real-world-github-issues"></a>[**SWE-bench: Can Language Models Resolve Real-World GitHub Issues?**](https://arxiv.org/abs/2310.06770) · Paper | Standard benchmark for evaluating AI coding agents | Free reading; check reuse terms | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-swe-bench-can-language-models-resolve-real-world-github-issues) |

<details>
<summary>Background and origin</summary>

> "Fully give in to the vibes, embrace exponentials, and forget that the code even exists."
> — Andrej Karpathy, February 2025

![Vibe Coding Meme](images/vibecoding-meme.png)

For learning and production work, pair natural-language instructions with understanding, review, tests, and clear responsibility for the result.

</details>

<a id="community"></a>
## More Options & Support

- [Additional verified resources](docs/verified-catalog.md) — current alternatives and dated learning material beyond the core shortlist.
- [Lifecycle evidence and review decisions](docs/lifecycle-review-2026-09-18.md) — sources, scope limitations, and current canonical names.
- [Removed, replaced, and unverified entries](docs/catalog-history.md) — history and reasons, not current recommendations.
- For product support, use the official documentation linked in each resource's evidence record. [Open a repository issue](../../issues/new) to report a status change or correction.

<a id="contributing"></a>
<a id="contribution-guidelines"></a>
## Contributing

[Suggest a resource through an issue](../../issues/new). Every addition must pass **direct relevance, usable public evidence, distinct value, transparent access/claims, and maintenance or substantive completeness**. Paid products and self-submissions follow the same rules; disclose affiliations and material limitations. GitHub stars do not guarantee admission.

Read the [curation policy](docs/curation-policy.md) and [contribution guide](.github/CONTRIBUTING.md). Clear failures are rejected with reasons; uncertain cases remain open for review. Accepted changes are synchronized in English, Korean, and Japanese and issues are closed only after publishing succeeds.

The weekly and issue workflows use [Pi](https://pi.dev/) with Kimi or Qwen and [Exa Search](https://exa.ai/). [Automation and configuration](docs/automation.md) explains the implementation and maintainer controls.

<a id="license"></a>
## License

This work is dedicated to the public domain under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). Linked projects and learning materials retain their own licenses and access conditions.
