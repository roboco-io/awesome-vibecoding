# Awesome Vibe Coding

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Weekly Update](https://github.com/roboco-io/awesome-vibecoding/actions/workflows/weekly-update.yml/badge.svg)](https://github.com/roboco-io/awesome-vibecoding/actions/workflows/weekly-update.yml)
[![Maintained by Pi](https://img.shields.io/badge/Maintained%20by-Pi-blueviolet)](https://pi.dev/)
[![Issues Welcome](https://img.shields.io/badge/Issues-welcome-brightgreen.svg)](../../issues/new)
[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](https://creativecommons.org/publicdomain/zero/1.0/)

*Language: [English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md)*

Find tools and learning resources for **building software with AI**. Start with a task, check access conditions, and use the verification date to distinguish reviewed information from older listings.

| I want to… | Start here |
|---|---|
| See what changed | [Recent verified updates](#recent-updates) |
| Build or improve software | [Find tools by task](#tools) |
| Learn from a first project | [Start here](#start-here) · [Learn & practice](#learning) |

[Code](#code) · [App & UI](#apps) · [Context & specs](#context) · [Test & review](#quality) · [Deploy & run](#delivery) · [Workspaces & usage](#operations) · [Community](#community)

<a id="recent-updates"></a>
## Recent Verified Updates

Recent reviews and material changes from the last 30 days, newest first. A review date is **not a product release date**. [Review notes and evidence](docs/issue-review-2026-09-18.md) record what was checked.

<!-- recent-updates:start -->
| Verified on | Update | What changed |
|---|---|---|
| 2026-09-18 | [NextReset](#resource-nextreset) | Reviewed addition: unofficial public reset history and local countdowns; forecasts are not endorsed. |
| 2026-09-18 | [Superagent](#resource-superagent) | Reviewed addition: macOS coding-agent workspace with browser and iOS workflows. |
| 2026-09-18 | [Publish.my](#resource-publish-my) | Reviewed addition: agent-oriented static-site publishing; email activation required. |
| 2026-09-18 | [Agent QA](#resource-agent-qa) | Reviewed addition: web/mobile test workflows; FSL-1.1-ALv2 is identified. |
| 2026-09-18 | [Duckweed](#resource-duckweed) | Reviewed addition: local coding-agent terminal workspace; source-available license. |
| 2026-09-18 | [Vibe Coding with Confidence (Mahmoud Zalt)](#resource-vibe-coding-with-confidence-mahmoud-zalt) | Reviewed addition: a free-to-read development handbook. |
| 2026-09-18 | [opencode](#resource-opencode) | Status checked: this historical repository is archived and points to Crush. |
<!-- recent-updates:end -->

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

Each resource has one primary home. **CLI, IDE, Web, Desktop, and MCP** describe how you use a tool; they are not quality rankings. Search this page for `MCP` to find protocol integrations across tasks.

**Read the metadata:** `—` means no substantive verification date has been recorded. `Check terms` / `Check access` means current pricing or access has not been verified. Open source and source-available describe licenses, not whether model usage is free. Reviewed dates cover the stated functionality and access evidence, not a security audit. Older descriptions remain candidates for re-verification.

<a id="code"></a>
### Code & Editing

Understand a repository, implement a feature, or refactor existing code.

<!-- catalog:code -->
| Resource | When to use it | Access / terms | Verified |
|---|---|---|---|
| <a id="resource-agentless"></a>[**Agentless**](https://github.com/OpenAutoCoder/Agentless) | Minimalist open-source approach to autonomous software engineering | Check terms | — |
| <a id="resource-aide"></a>[**Aide**](https://aide.dev) · IDE | VS Code fork with proactive AI agent that can fix issues across the codebase | Check terms | — |
| <a id="resource-aider"></a>[**Aider**](https://github.com/paul-gauthier/aider) · CLI | AI pair programming in terminal with git integration | Check terms | — |
| <a id="resource-amazon-q-developer"></a>[**Amazon Q Developer**](https://aws.amazon.com/q/developer/) | AWS-integrated AI coding assistant | Check terms | — |
| <a id="resource-amp"></a>[**Amp**](https://ampcode.com) · CLI | Sourcegraph's terminal-first agentic coding assistant | Check terms | — |
| <a id="resource-augment-code"></a>[**Augment Code**](https://www.augmentcode.com) | Coding assistance with project context | Check terms | — |
| <a id="resource-blackbox-ai"></a>[**Blackbox AI**](https://www.blackbox.ai) | AI code completion and generation supporting 20+ languages, popular for in-browser coding | Check terms | — |
| <a id="resource-claude-code"></a>[**Claude Code**](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview) · CLI | Anthropic's CLI-based agentic coding assistant | Check terms | — |
| <a id="resource-cline"></a>[**Cline**](https://github.com/cline/cline) | AI assistant with file/terminal/browser automation | Check terms | — |
| <a id="resource-codebuff"></a>[**Codebuff**](https://github.com/CodebuffAI/codebuff) · CLI | Coordinate terminal coding work with sub-agents | Check terms | — |
| <a id="resource-codegpt"></a>[**CodeGPT**](https://codegpt.co) | AI coding assistant with multi-LLM support for VS Code and IDEs | Check terms | — |
| <a id="resource-codeium"></a>[**Codeium**](https://codeium.com/) | Code completion across development environments; verify current branding and terms | Check terms | — |
| <a id="resource-codesandbox-ai"></a>[**CodeSandbox AI**](https://codesandbox.io/ai) · Web | AI-powered code generation in browser sandbox | Check terms | — |
| <a id="resource-continue"></a>[**Continue**](https://www.continue.dev) | configurable AI assistant framework | Check terms | — |
| <a id="resource-copilot-workspace"></a>[**Copilot Workspace**](https://githubnext.com/projects/copilot-workspace) · Web | GitHub's agentic environment for issue-to-PR workflows | Check terms | — |
| <a id="resource-cosine"></a>[**Cosine**](https://cosine.sh) · Web | Autonomous AI software engineer for complex codebase tasks | Check terms | — |
| <a id="resource-crush"></a>[**Crush**](https://github.com/charmbracelet/crush) · CLI | Glamorous terminal AI coding agent by Charmbracelet with LSP integration and multi-model support | Check terms | — |
| <a id="resource-cursor"></a>[**Cursor**](https://www.cursor.com/) · IDE | VS Code fork with contextual code generation and inline chat | Check terms | — |
| <a id="resource-dbforge-ai-assistant"></a>[**dbForge AI Assistant**](https://www.devart.com/dbforge/ai-assistant/) | AI-powered SQL coding tool, integrated into dbForge products | Check terms | — |
| <a id="resource-deepseek-cli"></a>[**DeepSeek CLI**](https://github.com/holasoymalva/deepseek-cli) · CLI | Terminal AI coding assistant powered by DeepSeek Coder models | Check terms | — |
| <a id="resource-devika"></a>[**Devika**](https://github.com/stitionai/devika) | Agentic software engineering workflows | Check terms | — |
| <a id="resource-devin"></a>[**Devin**](https://www.cognition.ai/devin) · Web | Autonomous AI software engineer by Cognition | Check terms | — |
| <a id="resource-devon"></a>[**Devon**](https://github.com/entropy-research/Devon) | autonomous coding agent, alternative to Devin | Check terms | — |
| <a id="resource-fusion"></a>[**Fusion**](https://www.builder.io/fusion) · Web | Visual AI IDE connecting to GitHub with design system awareness and Figma integration | Check terms | — |
| <a id="resource-gemini-cli"></a>[**Gemini CLI**](https://github.com/google-gemini/gemini-cli) · CLI | Google's open-source agentic CLI for coding powered by Gemini models | Check terms | — |
| <a id="resource-gemini-code-assist"></a>[**Gemini Code Assist**](https://cloud.google.com/products/gemini/code-assist) | Google's AI code completion and chat for Cloud/IDEs | Check terms | — |
| <a id="resource-github-copilot"></a>[**GitHub Copilot**](https://github.com/features/copilot) | AI pair programmer with autocomplete, chat, multi-IDE support | Check terms | — |
| <a id="resource-google-antigravity"></a>[**Google Antigravity**](https://antigravity.google) · IDE | Agent-first IDE with multi-agent orchestration | Check terms | — |
| <a id="resource-google-jules"></a>[**Google Jules**](https://jules.google) · Web | Delegate repository coding tasks to an autonomous agent | Check terms | — |
| <a id="resource-goose"></a>[**Goose**](https://block.github.io/goose/) · CLI | coding assistant by Block with MCP support | Check terms | — |
| <a id="resource-gpt-engineer"></a>[**gpt-engineer**](https://github.com/gpt-engineer-org/gpt-engineer) | Build entire codebases from natural language specifications | Check terms | — |
| <a id="resource-jetbrains-ai"></a>[**JetBrains AI**](https://www.jetbrains.com/ai/) | Deep integration in IntelliJ/PyCharm with Junie agent | Check terms | — |
| <a id="resource-kilo-code"></a>[**Kilo Code**](https://kilo.ai) | AI coding assistance with model selection and browser automation | Check terms | — |
| <a id="resource-kiro"></a>[**Kiro**](https://kiro.dev) · IDE | AWS spec-driven AI IDE turning requirements into code and tests | Check terms | — |
| <a id="resource-melty"></a>[**Melty**](https://github.com/meltylabs/melty) · IDE | Chat-first code editor with conversational interface | Check terms | — |
| <a id="resource-metagpt"></a>[**MetaGPT**](https://github.com/geekan/MetaGPT) | Multi-agent framework simulating software company roles | Check terms | — |
| <a id="resource-openai-codex-cli"></a>[**OpenAI Codex CLI**](https://openai.com/codex/) · CLI | CLI coding agent with natural language prompts | Check terms | — |
| <a id="resource-openhands"></a>[**OpenHands**](https://github.com/All-Hands-AI/OpenHands) | autonomous AI software developer | Check terms | — |
| <a id="resource-pearai"></a>[**PearAI**](https://trypear.ai) · IDE | VS Code AI editor with integrated search | Check terms | — |
| <a id="resource-plandex"></a>[**Plandex**](https://plandex.ai) · CLI | terminal AI coding engine for complex multi-step tasks | Check terms | — |
| <a id="resource-ra-aid"></a>[**RA.Aid**](https://github.com/ai-christianson/RA.Aid) · CLI | Autonomous dev agent combining research, planning, and multi-step code generation | Check terms | — |
| <a id="resource-refact-ai"></a>[**Refact.ai**](https://refact.ai/) | self-hosted AI coding assistant | Check terms | — |
| <a id="resource-roo-code"></a>[**Roo Code**](https://github.com/RooVetGit/Roo-Code) | AI assistant supporting multiple roles (architect, QA, PM) | Check terms | — |
| <a id="resource-sourcegraph-cody"></a>[**Sourcegraph Cody**](https://sourcegraph.com/cody) | AI assistant for code understanding and search | Check terms | — |
| <a id="resource-supermaven"></a>[**Supermaven**](https://supermaven.com) | High-speed AI code completion | Check terms | — |
| <a id="resource-superninja"></a>[**SuperNinja**](https://www.ninjatech.ai) · Web | End-to-end autonomous AI development agent | Check terms | — |
| <a id="resource-swe-agent"></a>[**SWE-agent**](https://github.com/princeton-nlp/SWE-agent) | Agent for resolving repository issues | Check terms | — |
| <a id="resource-sweep"></a>[**Sweep**](https://github.com/sweepai/sweep) | AI-powered GitHub assistant for issues and PRs | Check terms | — |
| <a id="resource-tabby"></a>[**Tabby**](https://tabbyml.com) | Self-hosted, open-source AI coding assistant with privacy-first design | Check terms | — |
| <a id="resource-tabnine"></a>[**Tabnine**](https://www.tabnine.com/) | Deep learning autocomplete adapting to your coding style | Check terms | — |
| <a id="resource-trae-ai"></a>[**Trae AI**](https://www.trae.ai/) · Web | AI platform for content creation | Check terms | — |
| <a id="resource-twill"></a>[**Twill**](https://twill.ai) · Web | Cloud-based autonomous coding agent that ships PRs | Check terms | — |
| <a id="resource-vibe-compiler-vibec"></a>[**Vibe Compiler (vibec)**](https://github.com/Strawberry-Computer/vibe-compiler) | Self-compiling tool that transforms prompts into code | Check terms | — |
| <a id="resource-void"></a>[**Void**](https://github.com/voideditor/void) · IDE | VS Code fork with autonomous AI coding capabilities | Check terms | — |
| <a id="resource-windsurf"></a>[**Windsurf**](https://codeium.com/windsurf) · IDE | AI-native IDE from Codeium with Cascade AI and multi-LLM support | Check terms | — |
| <a id="resource-wingman-ai"></a>[**Wingman AI**](https://github.com/RussellCanfield/wingman-ai-vscode-extension) | VSCode extension supporting Ollama, HuggingFace, OpenAI, Anthropic | Check terms | — |
| <a id="resource-zed-ai"></a>[**Zed AI**](https://zed.dev/) · IDE | High-performance editor with native AI assistant integration | Check terms | — |
<!-- /catalog:code -->

<a id="apps"></a>
### App & UI Prototyping

Create a first application or interface from a description or design.

<!-- catalog:apps -->
| Resource | When to use it | Access / terms | Verified |
|---|---|---|---|
| <a id="resource-appsmith"></a>[**Appsmith**](https://www.appsmith.com) · Web | Low-code platform for building internal tools | Check terms | — |
| <a id="resource-berrry"></a>[**Berrry**](https://berrry.app) · Web | Transform social posts into web apps | Check terms | — |
| <a id="resource-bolt-diy"></a>[**Bolt.diy**](https://github.com/stackblitz-labs/bolt.diy) · Web | Bolt.new alternative with bring-your-own-API-key support | Check terms | — |
| <a id="resource-bolt-new"></a>[**Bolt.new**](https://bolt.new/) · Web | Natural language app building by StackBlitz | Check terms | — |
| <a id="resource-buildship"></a>[**BuildShip**](https://buildship.com) · Web | Visual AI workflow and backend builder with low-code nodes | Check terms | — |
| <a id="resource-create-xyz"></a>[**Create.xyz**](https://create.xyz/) · Web | Build web apps using natural language prompts | Check terms | — |
| <a id="resource-databutton"></a>[**Databutton**](https://databutton.com) · Web | AI-powered full-stack app builder with Python backend | Check terms | — |
| <a id="resource-dyad"></a>[**Dyad**](https://github.com/dyad-sh/dyad) · Web | Local open-source AI app builder (v0/Lovable/Bolt alternative) | Check terms | — |
| <a id="resource-emergent"></a>[**Emergent**](https://emergent.sh) · Web | AI full-stack vibe coding platform with one-click deployment and custom domains | Check terms | — |
| <a id="resource-figma-mcp"></a>[**Figma MCP**](https://github.com/figma/figma-developer-mcp) · MCP | Bring design data into UI implementation | Check terms | — |
| <a id="resource-firebase-studio"></a>[**Firebase Studio**](https://firebase.studio) · Web | Google's AI-first browser IDE with Gemini, formerly Project IDX | Check terms | — |
| <a id="resource-github-spark"></a>[**GitHub Spark**](https://githubnext.com/projects/spark) · Web | Natural language micro-app builder by GitHub Next, runs in the browser | Check terms | — |
| <a id="resource-hostinger-horizons"></a>[**Hostinger Horizons**](https://hostinger.com/horizons) · Web | AI no-code app builder with voice/text/image prompts and built-in hosting | Check terms | — |
| <a id="resource-kombai"></a>[**Kombai**](https://kombai.com/) · Web | AI that converts Figma designs to code | Check terms | — |
| <a id="resource-lazy-ai"></a>[**Lazy AI**](https://www.getlazy.ai) · Web | Chat-based web app builder with one-click cloud deployment | Check terms | — |
| <a id="resource-lovable"></a>[**Lovable**](https://lovable.dev/) · Web | Full-stack app generation with Supabase | Check terms | — |
| <a id="resource-marblism"></a>[**Marblism**](https://marblism.com) · Web | AI that generates full-stack Next.js apps from a text prompt | Check terms | — |
| <a id="resource-onlook"></a>[**Onlook**](https://onlook.dev) · Web | browser-based visual editor for React/Next.js with AI code generation | Check terms | — |
| <a id="resource-openbolt-dev"></a>[**OpenBolt.dev**](https://openbolt.dev) · Web | Bolt.new alternative, self-hosted and customizable | Check terms | — |
| <a id="resource-playcode"></a>[**Playcode**](https://playcode.io/ai-website-builder) · Web | AI website and app builder with visual editing, hosting, custom domains, and one-click publishing | Check terms | — |
| <a id="resource-rapidnative"></a>[**RapidNative**](https://rapidnative.com/) · Web | AI mobile app builder with sketch/text input for React Native | Check terms | — |
| <a id="resource-replit"></a>[**Replit**](https://replit.com/) · Web | Browser-based IDE with Ghostwriter AI | Check terms | — |
| <a id="resource-rosebud-ai"></a>[**Rosebud AI**](https://rosebud.ai) · Web | Vibe coding platform for 3D games and interactive web apps | Check terms | — |
| <a id="resource-subframe"></a>[**Subframe**](https://subframe.com) · Web | AI-assisted UI builder that generates clean React component code | Check terms | — |
| <a id="resource-tempo-labs"></a>[**Tempo Labs**](https://tempolabs.ai/) · Web | AI-powered React UI builder with visual editor and code export | Check terms | — |
| <a id="resource-v0"></a>[**v0**](https://v0.dev/) · Web | Vercel's AI for UI/React generation | Check terms | — |
| <a id="resource-vibekit-bot"></a>[**VibeKit.bot**](https://vibekit.bot) · Web | Persistent AI coding agent per app that builds, hosts (live domain), and keeps improving it, driven from your phone or CLI; BYOK or pay-as-you-go | Check terms | — |
<!-- /catalog:apps -->

<a id="context"></a>
### Context, Specs & Integrations

Give agents requirements, rules, documentation, and connected project data.

<!-- catalog:context -->
| Resource | When to use it | Access / terms | Verified |
|---|---|---|---|
| <a id="resource-anycrawl"></a>[**AnyCrawl**](https://github.com/any4ai/anycrawl-mcp-server) · MCP | Fetch website content for agent context | Check terms | — |
| <a id="resource-breaking-coding-chaos"></a>[**breaking-coding-chaos**](https://github.com/bo-cao/breaking-coding-chaos) | Human-in-the-loop dual-loop control-plane skill suite | Check terms | — |
| <a id="resource-caliber"></a>[**Caliber**](https://github.com/caliber-ai-org/ai-setup) | CLI that generates and syncs AI agent configs for Claude Code, Cursor, and Codex | Check terms | — |
| <a id="resource-chroma"></a>[**Chroma**](https://github.com/chroma-core/chroma-mcp) · MCP | Retrieve context from a vector database | Check terms | — |
| <a id="resource-clickhouse"></a>[**ClickHouse**](https://github.com/ClickHouse/mcp-clickhouse) · MCP | Query and inspect ClickHouse data | Check terms | — |
| <a id="resource-composio-mcp"></a>[**Composio MCP**](https://github.com/ComposioHQ/composio) · MCP | Connect coding agents to external services | Check terms | — |
| <a id="resource-context7"></a>[**Context7**](https://github.com/upstash/context7) · MCP | Retrieve library documentation for coding context | Check terms | — |
| <a id="resource-everything-claude-code"></a>[**everything-claude-code**](https://github.com/serithemage/everything-claude-code) | Battle-tested Claude Code configs (agents, skills, hooks, commands) from Anthropic hackathon winner | Check terms | — |
| <a id="resource-exa-mcp"></a>[**Exa MCP**](https://github.com/exa-labs/exa-mcp-server) · MCP | Search the web for relevant reference material | Check terms | — |
| <a id="resource-excel"></a>[**Excel**](https://github.com/haris-musa/excel-mcp-server) · MCP | Read and update spreadsheet data | Check terms | — |
| <a id="resource-fetch"></a>[**Fetch**](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch) · MCP | Retrieve web content for a coding task | Check terms | — |
| <a id="resource-filesystem-mcp"></a>[**Filesystem MCP**](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) · MCP | Give agents controlled access to project files | Check terms | — |
| <a id="resource-firecrawl-mcp"></a>[**Firecrawl MCP**](https://github.com/mendableai/firecrawl-mcp-server) · MCP | Extract web content for research and context | Check terms | — |
| <a id="resource-git-mcp"></a>[**Git MCP**](https://github.com/modelcontextprotocol/servers/tree/main/src/git) · MCP | Read repository history and changes | Check terms | — |
| <a id="resource-github-mcp"></a>[**GitHub MCP**](https://github.com/github/github-mcp-server) · MCP | Connect repository, issue, and pull-request workflows | Check terms | — |
| <a id="resource-intent-engineering"></a>[**intent-engineering**](https://github.com/roboco-io/intent-engineering) | Operating model for shipping intent instead of code with AI execution | Check terms | — |
| <a id="resource-jira-mcp"></a>[**Jira MCP**](https://github.com/sooperset/mcp-atlassian) · MCP | Connect Jira issues and Confluence project context | Check terms | — |
| <a id="resource-linear-mcp"></a>[**Linear MCP**](https://github.com/jerhadf/linear-mcp-server) · MCP | Connect project issues and planning context | Check terms | — |
| <a id="resource-mongodb"></a>[**MongoDB**](https://github.com/mongodb-js/mongodb-mcp-server) · MCP | Inspect collections and query MongoDB | Check terms | — |
| <a id="resource-mymir"></a>[**mymir**](https://github.com/FrkAk/mymir) | Project management layer for AI coding agents with context network | Check terms | — |
| <a id="resource-neon"></a>[**Neon**](https://github.com/neondatabase/mcp-server-neon) · MCP | Connect development workflows to Neon databases | Check terms | — |
| <a id="resource-notion-mcp"></a>[**Notion MCP**](https://github.com/makenotion/notion-mcp-server) · MCP | Retrieve and update project documentation | Check terms | — |
| <a id="resource-oh-my-claudecode"></a>[**oh-my-claudecode**](https://github.com/Yeachan-Heo/oh-my-claudecode) | Multi-agent orchestration for Claude Code with zero learning curve | Check terms | — |
| <a id="resource-openspec"></a>[**OpenSpec**](https://github.com/Fission-AI/OpenSpec) | Spec-driven development framework for AI coding assistants | Check terms | — |
| <a id="resource-perplexity-mcp"></a>[**Perplexity MCP**](https://github.com/anthropics/mcp-perplexity) · MCP | Research integration; the listed source needs review | Check terms | — |
| <a id="resource-phind"></a>[**Phind**](https://www.phind.com) | AI-powered developer search engine for code, errors, and technical Q&A | Check terms | — |
| <a id="resource-pieces-for-developers"></a>[**Pieces for Developers**](https://pieces.app/) | AI assistant with automatic code snippet management and context | Check terms | — |
| <a id="resource-roboco-cli"></a>[**roboco-cli**](https://github.com/roboco-io/roboco-cli) | AI-native development scaffolding system for vibe coding with Claude Code | Check terms | — |
| <a id="resource-rube"></a>[**Rube**](https://github.com/ComposioHQ/Rube) · MCP | Connect repository and service workflows | Check terms | — |
| <a id="resource-solar-mcp"></a>[**Solar MCP**](https://github.com/serithemage/solar-mcp) · MCP | Connect agents to Upstage Solar models | Check terms | — |
| <a id="resource-spec-workflow-mcp"></a>[**Spec Workflow MCP**](https://github.com/Pimzino/spec-workflow-mcp) · MCP | Maintain specifications and structured development steps | Check terms | — |
| <a id="resource-stripe-mcp"></a>[**Stripe MCP**](https://github.com/stripe/agent-toolkit) · MCP | Connect payment APIs while developing an application | Check terms | — |
| <a id="resource-supabase"></a>[**Supabase**](https://github.com/supabase-community/supabase-mcp) · MCP | Inspect schemas, run queries, and manage migrations | Check terms | — |
| <a id="resource-tavily"></a>[**Tavily**](https://github.com/tavily-ai/tavily-mcp) · MCP | Retrieve web evidence for an agent task | Check terms | — |
| <a id="resource-vibe-coding-prompt-template"></a>[**vibe-coding-prompt-template**](https://github.com/KhazP/vibe-coding-prompt-template) · Template | Comprehensive prompt templates | Check terms | — |
| <a id="resource-vibe-lead"></a>[**vibe-lead**](https://github.com/roboco-io/vibe-lead) | Change management framework for AI-based vibe coding adoption in organizations | Check terms | — |
| <a id="resource-vibeworkflow-app"></a>[**vibeworkflow.app**](https://vibeworkflow.app) | Workflow automation for vibe coding | Check terms | — |
<!-- /catalog:context -->

<a id="quality"></a>
### Testing, Review & Security

Check behavior, review generated changes, and diagnose failures.

<!-- catalog:quality -->
| Resource | When to use it | Access / terms | Verified |
|---|---|---|---|
| <a id="resource-agent-qa"></a>[**Agent QA**](https://github.com/vostride/agent-qa) · MCP | Author and run natural-language web and mobile tests | FSL-1.1-ALv2; model costs | 2026-09-18 |
| <a id="resource-bito-ai"></a>[**Bito AI**](https://bito.ai) | AI code review and generation assistant for VS Code and JetBrains IDEs | Check terms | — |
| <a id="resource-browserbase"></a>[**Browserbase**](https://github.com/browserbase/mcp-server-browserbase) · MCP | Run agent-driven browser workflows in the cloud | Check terms | — |
| <a id="resource-chrome-mcp"></a>[**Chrome MCP**](https://github.com/hangwin/mcp-chrome) · MCP | Drive a browser to inspect and test applications | Check terms | — |
| <a id="resource-factory"></a>[**Factory**](https://factory.ai) | AI Droids for autonomous code review, testing, and PR creation | Check terms | — |
| <a id="resource-micro-agent"></a>[**micro-agent**](https://github.com/BuilderIO/micro-agent) | CLI tool that writes and iteratively fixes code using TDD until tests pass | Check terms | — |
| <a id="resource-mobile-mcp"></a>[**Mobile MCP**](https://github.com/mobile-next/mobile-mcp) · MCP | Automate and inspect mobile applications | Check terms | — |
| <a id="resource-mutable-ai"></a>[**Mutable.ai**](https://mutable.ai/) | AI for automated testing, documentation, and refactoring | Check terms | — |
| <a id="resource-playwright-mcp"></a>[**Playwright MCP**](https://github.com/executeautomation/mcp-playwright) · MCP | Run browser automation and end-to-end checks | Check terms | — |
| <a id="resource-potpie"></a>[**Potpie**](https://github.com/potpie-ai/potpie) | AI agents for codebase debugging, testing, and code review | Check terms | — |
| <a id="resource-pr-agent"></a>[**PR-Agent**](https://github.com/Codium-ai/pr-agent) | AI agent for automated pull request analysis and review | Check terms | — |
| <a id="resource-qodo"></a>[**Qodo**](https://www.qodo.ai) | AI code review engine (formerly CodiumAI) | Check terms | — |
| <a id="resource-semgrep"></a>[**Semgrep**](https://github.com/semgrep/mcp) · MCP | Scan code for security and quality issues | Check terms | — |
| <a id="resource-sentry"></a>[**Sentry**](https://github.com/getsentry/sentry-mcp) · MCP | Inspect application errors and diagnose failures | Check terms | — |
| <a id="resource-vibe-ready"></a>[**vibe-ready**](https://github.com/roboco-io/vibe-ready-cli) | CLI tool that analyzes repository readiness for vibe coding using Claude Agent SDK with 6-category scoring | Check terms | — |
<!-- /catalog:quality -->

<a id="delivery"></a>
### Deployment & Execution

Build, publish, or run code in an appropriate execution environment.

<!-- catalog:delivery -->
| Resource | When to use it | Access / terms | Verified |
|---|---|---|---|
| <a id="resource-cloudflare"></a>[**Cloudflare**](https://github.com/cloudflare/mcp-server-cloudflare) · MCP | Manage application deployment and cloud resources | Check terms | — |
| <a id="resource-e2b"></a>[**E2B**](https://github.com/e2b-dev/e2b) | Secure cloud sandbox environment for enterprise-grade AI agents | Check terms | — |
| <a id="resource-e2b-mcp"></a>[**E2B MCP**](https://github.com/e2b-dev/mcp-server) · MCP | Run agent-generated code in an isolated sandbox | Check terms | — |
| <a id="resource-publish-my"></a>[**Publish.my**](https://publish.my/) · Web | Agent-driven static-site publishing with email activation | Free tier; static sites only | 2026-09-18 |
| <a id="resource-serverless-openclaw"></a>[**serverless-openclaw**](https://github.com/serithemage/serverless-openclaw) | Run OpenClaw AI agent on-demand on AWS serverless infrastructure with Web UI and Telegram interfaces | Check terms | — |
| <a id="resource-vercel-mcp"></a>[**Vercel MCP**](https://github.com/vercel/mcp-adapter) · MCP | Connect deployment workflows to Vercel | Check terms | — |
| <a id="resource-xcode-build-mcp"></a>[**Xcode Build MCP**](https://github.com/cameroncooke/XcodeBuildMCP) · MCP | Build and run Apple-platform projects | Check terms | — |
<!-- /catalog:delivery -->

<a id="operations"></a>
### Agent Workspaces & Usage

Organize sessions, inspect runs, and understand usage or availability.

<!-- catalog:operations -->
| Resource | When to use it | Access / terms | Verified |
|---|---|---|---|
| <a id="resource-agent-island"></a>[**Agent Island**](https://github.com/tristan666666/agent-island) · Desktop | Desktop status companion for Claude Code/Codex on macOS/Windows | Check terms | — |
| <a id="resource-dev-janitor"></a>[**Dev Janitor**](https://github.com/cocojojo5213/Dev-Janitor) | Cross-platform desktop toolkit for managing AI coding assistants and dependencies | Check terms | — |
| <a id="resource-duckweed"></a>[**Duckweed**](https://github.com/MusicMaster4/Duckweed) · Desktop | Source-available local terminal workspace for coding agents | Source-available; check model costs | 2026-09-18 |
| <a id="resource-gitpod"></a>[**Gitpod**](https://www.gitpod.io/) · Web | Cloud dev environments with AI-assisted workspace automation | Check terms | — |
| <a id="resource-intent"></a>[**Intent**](https://www.augmentcode.com/intent) | Multi-agent orchestration workspace with spec-driven structured oversight | Check terms | — |
| <a id="resource-llm-log"></a>[**llm.log**](https://github.com/lanesket/llm.log) | Local proxy that captures AI agent API calls — tokens, costs, prompts, latency in a TUI dashboard | Check terms | — |
| <a id="resource-nextreset"></a>[**NextReset**](https://nextreset.ai/) · Web | Unofficial Codex reset history and browser-local countdowns | Free; unofficial | 2026-09-18 |
| <a id="resource-parallel-code"></a>[**Parallel Code**](https://github.com/johannesjo/parallel-code) · Desktop | Desktop app for running AI coding agents in parallel worktrees | Check terms | — |
| <a id="resource-superagent"></a>[**Superagent**](https://github.com/pungme/superagent-desktop) · Desktop | MIT macOS app for coding agents, browser and iOS workflows | MIT; check model costs | 2026-09-18 |
| <a id="resource-usage"></a>[**usage**](https://github.com/aqua5230/usage) · Desktop | macOS menu bar app showing Claude Code/Codex quota at a glance | Check terms | — |
| <a id="resource-vmux"></a>[**vmux**](https://github.com/roboco-io/vmux) | VS Code terminal extension for AI coding agents with notifications and session management | Check terms | — |
| <a id="resource-warp"></a>[**Warp**](https://www.warp.dev) | AI-native terminal with natural language commands and agent mode | Check terms | — |
<!-- /catalog:operations -->

<a id="learning"></a>
## Learn & Practice

Choose by what you want to achieve. Guide, video, paper, and template labels describe the format. Check the linked material for prerequisites, language, estimated time, and any API or subscription costs; unverified durations are not invented here.

<a id="first-project"></a>
### First Project

Follow a setup-to-result sequence. Use the material's own prerequisites and finish a small working application before collecting more tools.

| Resource | When to use it | Access / terms | Verified |
|---|---|---|---|
| <a id="resource-ai-book-ai-coding"></a>[**AI Book: AI Coding**](https://aibook.ren/categories/ai-coding) · Guide | Chinese handbook on coding-agent workflows, tool selection, and practices with Cursor, Codex, Claude Code, and Kiro | Check access | — |
| <a id="resource-applighter"></a>[**AppLighter**](https://applighter.com/) · Template | Production-ready React Native + Expo templates with CLAUDE.md, AGENTS.md, .cursorrules for AI agent workflows | Check terms | — |
| <a id="resource-vibe-coding-manual-roboco"></a>[**Vibe Coding Manual (Roboco)**](https://roboco.io/posts/vibe-coding-manual/) · Guide | Comprehensive guide with templates | Check access | — |
| <a id="resource-vibe-coding-tutorial-and-best-practices"></a>[**Vibe Coding Tutorial and Best Practices**](https://www.youtube.com/watch?v=YWwS911iLhg) · Video | AI agents in Cursor/Windsurf | Check access | — |
| <a id="resource-vibe-coding-with-confidence-mahmoud-zalt"></a>[**Vibe Coding with Confidence (Mahmoud Zalt)**](https://zalt.me/guides/vibe-coding) · Guide | handbook for building, testing, securing, and shipping AI-assisted apps | Free reading · EN | 2026-09-18 |

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

| Resource | When to use it | Access / terms | Verified |
|---|---|---|---|
| <a id="resource-12-best-practices-for-ai-coding-questera"></a>[**12 Best Practices for AI Coding (Questera)**](https://www.questera.ai/blogs/12-best-practices-to-use-ai-in-coding-in-2025) · Guide | 2025 best practices | Check access | — |
| <a id="resource-agentic-coding-armin-ronacher"></a>[**Agentic Coding (Armin Ronacher)**](https://lucumr.pocoo.org/2025/6/12/agentic-coding/) · Guide | AI-driven autonomous development approaches | Check access | — |
| <a id="resource-ai-tool-showdown-japanese"></a>[**AI Tool Showdown (Japanese)**](https://www.youtube.com/watch?v=EQHXIVItNxs) · Video | Copilot vs Cursor vs others | Check access | — |
| <a id="resource-here-s-how-i-use-llms-to-help-me-write-code-simon-willison"></a>[**Here's how I use LLMs to help me write code (Simon Willison)**](https://simonwillison.net/2025/Mar/11/using-llms-for-code/) · Guide | Practical integration tips | Check access | — |
| <a id="resource-how-i-use-llms"></a>[**How I use LLMs**](https://www.youtube.com/watch?v=EWvNQjAaOHw) · Video | Andrej Karpathy's guide | Check access | — |
| <a id="resource-new-tools-for-building-agents"></a>[**New Tools for Building Agents**](https://www.youtube.com/watch?v=hciNKcLwSes) · Video | OpenAI's agent tools | Check access | — |
| <a id="resource-secure-vibe-coding-guide-csa"></a>[**Secure Vibe Coding Guide (CSA)**](https://cloudsecurityalliance.org/blog/2025/04/09/secure-vibe-coding-guide) · Guide | Security considerations | Check access | — |
| <a id="resource-vibecodex"></a>[**vibecodex**](https://github.com/yerdaulet-damir/vibecodex) · Guide | Production architecture bible with 54 principles for vibe-coding (FastAPI, Next.js, Go) | Check access | — |
| <a id="resource-windsurf-90-of-your-code"></a>[**Windsurf: 90% of Your Code**](https://www.youtube.com/watch?v=bVNNvWq6dKo) · Video | Agentic IDE deep dive | Check access | — |

<a id="concepts-research"></a>
### Concepts & Research

Understand the tools after trying a small project, or go deeper into evaluation and development practices.

[Vibe coding](https://en.wikipedia.org/wiki/Vibe_coding) uses natural-language intent to guide AI-generated software. The [Model Context Protocol](https://modelcontextprotocol.io/) connects agents to tools and data. A coding agent, its underlying model, and its integrations are different choices: changing one does not automatically change the others.

| Resource | When to use it | Access / terms | Verified |
|---|---|---|---|
| <a id="resource-a-review-on-vibe-coding"></a>[**A Review on Vibe Coding**](https://www.techrxiv.org/users/913189/articles/1292402) · Paper | Fundamentals, challenges, future directions | Check access | — |
| <a id="resource-context-engineering-intro-coleam00"></a>[**Context Engineering Intro (coleam00)**](https://github.com/coleam00/context-engineering-intro) · Guide | How to make AI coding assistants work effectively with Claude Code | Check access | — |
| <a id="resource-mcp-in-10-minutes"></a>[**MCP in 10 Minutes**](https://www.youtube.com/watch?v=EswVjHZMn74) · Video | Quick MCP intro | Check access | — |
| <a id="resource-model-context-protocol-explained"></a>[**Model Context Protocol Explained**](https://www.youtube.com/watch?v=VChRPFUzJGA) · Video | MCP fundamentals | Check access | — |
| <a id="resource-swe-agent-agent-computer-interfaces-enable-automated-software-engineering"></a>[**SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering**](https://arxiv.org/abs/2405.15793) · Paper | Autonomous agent fixing real bugs using Agent-Computer Interface | Check access | — |
| <a id="resource-swe-bench-can-language-models-resolve-real-world-github-issues"></a>[**SWE-bench: Can Language Models Resolve Real-World GitHub Issues?**](https://arxiv.org/abs/2310.06770) · Paper | Standard benchmark for evaluating AI coding agents | Check access | — |
| <a id="resource-the-model-context-protocol-guide-anthropic"></a>[**The Model Context Protocol Guide (Anthropic)**](https://modelcontextprotocol.io/introduction) · Guide | Understanding MCP architecture | Check access | — |
| <a id="resource-vibe-coding-and-ai-led-conversational-programming"></a>[**Vibe Coding and AI-Led Conversational Programming**](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5469367) · Paper | Developer-AI interaction | Check access | — |
| <a id="resource-vibe-coding-is-the-future"></a>[**Vibe Coding Is The Future**](https://www.youtube.com/watch?v=IACHfKmZMr8) · Video | Y Combinator on vibe coding | Check access | — |
| <a id="resource-vibe-coding-ai-voice-based-code-generation"></a>[**Vibe Coding: AI/Voice Based Code Generation**](https://papers.academic-conferences.org/index.php/icair/article/view/3975) · Paper | Research tool for non-coders | Check access | — |
| <a id="resource-vibe-coding-toward-an-ai-native-paradigm"></a>[**Vibe Coding: Toward an AI-Native Paradigm**](https://arxiv.org/abs/2510.17842) · Paper | Semantic software development | Check access | — |
| <a id="resource-vibecoding-is-here"></a>[**Vibecoding is Here**](https://www.youtube.com/watch?v=xxA-M3HrKrc) · Video | AI changing development | Check access | — |
| <a id="resource-what-is-vibe-coding-ibm"></a>[**What is Vibe Coding? (IBM)**](https://www.ibm.com/think/topics/vibe-coding) · Guide | Enterprise perspective | Check access | — |

<details>
<summary>Background and origin</summary>

> "Fully give in to the vibes, embrace exponentials, and forget that the code even exists."
> — Andrej Karpathy, February 2025

![Vibe Coding Meme](images/vibecoding-meme.png)

For learning and production work, pair natural-language instructions with understanding, review, tests, and clear responsibility for the result.

</details>

<a id="related-context"></a>
## Related Platforms & Advanced Context

<details>
<summary>Expand adjacent AI platforms and specialist infrastructure</summary>

These inherited entries cover broader AI applications, personal assistants, data workflows, or specialist infrastructure. Their direct fit for a coding workflow needs separate review; their placement here is not a new recommendation or a fresh verification.

| Resource | When to use it | Access / terms | Verified |
|---|---|---|---|
| <a id="resource-5ire"></a>[**5ire**](https://github.com/nanbingxyz/5ire) · MCP | Desktop AI interface with local knowledge and MCP | Check terms | — |
| <a id="resource-alphacode"></a>[**AlphaCode**](https://alphacode.deepmind.com/) | DeepMind's competitive programming AI | Check terms | — |
| <a id="resource-autogpt"></a>[**AutoGPT**](https://github.com/Significant-Gravitas/AutoGPT) | Autonomous AI agent for complex coding tasks | Check terms | — |
| <a id="resource-botmadang-mcp"></a>[**Botmadang MCP**](https://github.com/serithemage/botmadang-mcp) · MCP | Connect to a Korean AI community platform | Check terms | — |
| <a id="resource-botpress"></a>[**Botpress**](https://botpress.com) · Web | LLM-powered chatbot development platform | Check terms | — |
| <a id="resource-chatgpt"></a>[**ChatGPT**](https://chat.openai.com/) | Related development or AI platform; assess the fit for your workflow | Check terms | — |
| <a id="resource-cherry-studio"></a>[**Cherry Studio**](https://github.com/CherryHQ/cherry-studio) | AI Agent desktop with autonomous coding and 300+ assistants | Check terms | — |
| <a id="resource-claude"></a>[**Claude**](https://claude.ai/) | Related development or AI platform; assess the fit for your workflow | Check terms | — |
| <a id="resource-copilotkit"></a>[**CopilotKit**](https://github.com/CopilotKit/CopilotKit) | Framework for building AI copilots with chat and generative UI | Check terms | — |
| <a id="resource-dify"></a>[**Dify**](https://github.com/langgenius/dify) · Web | platform for building and deploying LLM-powered applications | Check terms | — |
| <a id="resource-duet-ai"></a>[**Duet AI**](https://workspace.google.com/solutions/ai/) · Web | Google Workspace AI integration | Check terms | — |
| <a id="resource-google-ai-studio"></a>[**Google AI Studio**](https://aistudio.google.com) · Web | Browser IDE for building and prototyping with Gemini models | Check terms | — |
| <a id="resource-hermes-agent"></a>[**Hermes Agent**](https://github.com/nousresearch/hermes-agent) | General AI agent with persistent memory and skill creation | Check terms | — |
| <a id="resource-langflow"></a>[**Langflow**](https://github.com/langflow-ai/langflow) | Visual builder for AI agents and workflows | Check terms | — |
| <a id="resource-n8n"></a>[**n8n**](https://n8n.io/) | Related development or AI platform; assess the fit for your workflow | Check terms | — |
| <a id="resource-open-webui"></a>[**Open WebUI**](https://github.com/open-webui/open-webui) | Self-hosted AI interface for local and hosted models | Check terms | — |
| <a id="resource-openclaw"></a>[**OpenClaw**](https://github.com/openclaw/openclaw) | Personal AI assistant with autonomous workflows and local execution | Check terms | — |
| <a id="resource-openmanus"></a>[**OpenManus**](https://github.com/mannaandpoem/OpenManus) | framework for AI-assisted document creation | Check terms | — |
| <a id="resource-openpaw"></a>[**OpenPaw**](https://github.com/daxaur/openpaw) | CLI tool that extends Claude Code into a personal assistant with 38+ skills | Check terms | — |
| <a id="resource-pulumi"></a>[**Pulumi**](https://www.pulumi.com/) | Related development or AI platform; assess the fit for your workflow | Check terms | — |
| <a id="resource-serverless-autoresearch"></a>[**serverless-autoresearch**](https://github.com/roboco-io/serverless-autoresearch) | Parallel evolution pipeline for Karpathy's autoresearch on SageMaker Spot Training (H100) with HUGI pattern | Check terms | — |
| <a id="resource-smol-ai-developer"></a>[**smol-ai developer**](https://github.com/smol-ai/developer) | Embeddable developer agent library for apps | Check terms | — |
| <a id="resource-suna"></a>[**Suna**](https://github.com/kortix-ai/suna) | generalist AI agent with browser, code execution, and file system for dev tasks | Check terms | — |
| <a id="resource-terraform"></a>[**Terraform**](https://www.terraform.io/) | Related development or AI platform; assess the fit for your workflow | Check terms | — |
| <a id="resource-wordware"></a>[**Wordware**](https://www.wordware.ai/) · Web | No-code AI agent builder for developers | Check terms | — |
| <a id="resource-zapier"></a>[**Zapier**](https://zapier.com/) | Related development or AI platform; assess the fit for your workflow | Check terms | — |

</details>

<a id="archive"></a>
## Historical References

<details>
<summary>Expand confirmed archived implementations</summary>

These entries preserve earlier references and are not current starting recommendations. The legacy OpenCode repository names [Crush](#resource-crush) as its continuation. The MCP project's [archived-server index](https://github.com/modelcontextprotocol/servers#archived) identifies the old reference implementations below; use that index to find their archived source or successor.

| Resource | When to use it | Access / terms | Verified |
|---|---|---|---|
| <a id="resource-brave-search-mcp-legacy"></a>[**Brave Search MCP (legacy)**](https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search) · MCP | Archived reference implementation for web search | Archived reference | 2026-09-18 |
| <a id="resource-github-mcp-legacy"></a>[**GitHub MCP (legacy)**](https://github.com/modelcontextprotocol/servers/tree/main/src/github) · MCP | Archived reference implementation; use a maintained GitHub integration | Archived reference | 2026-09-18 |
| <a id="resource-opencode"></a>[**opencode**](https://github.com/opencode-ai/opencode) | Archived repository; the project continues as Crush | Archived | 2026-09-18 |
| <a id="resource-postgresql-mcp-legacy"></a>[**PostgreSQL MCP (legacy)**](https://github.com/modelcontextprotocol/servers/tree/main/src/postgres) · MCP | Archived reference implementation for PostgreSQL access | Archived reference | 2026-09-18 |
| <a id="resource-puppeteer-mcp-legacy"></a>[**Puppeteer MCP (legacy)**](https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer) · MCP | Archived reference implementation for browser automation | Archived reference | 2026-09-18 |
| <a id="resource-slack-mcp-legacy"></a>[**Slack MCP (legacy)**](https://github.com/modelcontextprotocol/servers/tree/main/src/slack) · MCP | Archived reference implementation for Slack access | Archived reference | 2026-09-18 |

</details>

<a id="community"></a>
## Community & Related Lists

Use communities for discussion and discovery, then verify product claims against first-party sources.

### Communities

- [r/vibecoding](https://reddit.com/r/vibecoding) — Dedicated vibe coding community
- [r/ChatGPTCoding](https://reddit.com/r/ChatGPTCoding) — ChatGPT + coding workflows
- [r/ClaudeAI](https://reddit.com/r/ClaudeAI) — Claude and Claude Code discussions
- [r/CursorAI](https://reddit.com/r/CursorAI) — Cursor IDE workflows and tips
- [r/copilot](https://reddit.com/r/copilot) — GitHub Copilot community
- [r/Jetbrains](https://reddit.com/r/Jetbrains) — JetBrains IDEs and AI Assistant
- [r/Tabnine](https://reddit.com/r/Tabnine) — Tabnine AI autocomplete
- [r/continue_dev](https://reddit.com/r/continue_dev) — Continue.dev open-source assistant
- [r/LocalLlama](https://reddit.com/r/LocalLlama) — Local LLM development
- [r/replit](https://reddit.com/r/replit) — Replit & Ghostwriter community
- [Cursor Discord](https://discord.gg/cursor) — Workflows, extensions, project showcases
- [Lovable AI Discord](https://discord.gg/lovable) — Full-stack app generation sharing
- [Bolt.new Discord](https://discord.gg/stackblitz) — Natural language app building (StackBlitz)
- [v0 by Vercel Discord](https://discord.gg/vercel) — UI/React generation community
- [Replit Discord](https://discord.gg/replit) — Multiplayer vibe coding

### Related Lists

- [awesome-vibe-coding](https://github.com/filipecalegario/awesome-vibe-coding) — Another curated collection of vibe-coding resources
- [awesome-code-ai](https://github.com/sourcegraph/awesome-code-ai) — AI coding tools by Sourcegraph
- [awesome-ai-assisted-coding](https://github.com/saviorand/awesome-ai-assisted-coding) — AI-assisted coding resources
- [awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers) — Model Context Protocol servers
- [awesome-chatgpt](https://github.com/humanloop/awesome-chatgpt) — ChatGPT resources
- [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) — Community-curated `.cursorrules` files for Cursor IDE
- [awesome-vibe-coding](https://github.com/taskade/awesome-vibe-coding) — 245+ vibe coding tools, platforms, and resources by Taskade

- [Comprehensive MCP server list](https://github.com/wong2/awesome-mcp-servers) — Browse integrations beyond this task-focused selection.

<a id="contributing"></a>
<a id="contribution-guidelines"></a>
## Contributing

[Suggest a resource through an issue](../../issues/new). Every addition must pass **direct relevance, usable public evidence, distinct value, transparent access/claims, and maintenance or substantive completeness**. Paid products and self-submissions follow the same rules; disclose affiliations and material limitations. GitHub stars do not guarantee admission.

Read the [curation policy](docs/curation-policy.md) and [contribution guide](.github/CONTRIBUTING.md). Clear failures are rejected with reasons; uncertain cases remain open for review. Accepted changes are synchronized in English, Korean, and Japanese and issues are closed only after publishing succeeds.

The weekly and issue workflows use [Pi](https://pi.dev/) with Kimi or Qwen and [Exa Search](https://exa.ai/). [Automation and configuration](docs/automation.md) explains the implementation and maintainer controls.

<a id="license"></a>
## License

This work is dedicated to the public domain under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). Linked projects and learning materials retain their own licenses and access conditions.
