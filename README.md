# Awesome Vibe Coding

*Language: [English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md)*

![Vibe Coding Meme](images/vibecoding-meme.png)

A curated list of resources for **Vibe Coding**—the AI-native programming paradigm where you describe your intent in natural language and let AI generate the code.

> **"Fully give in to the vibes, embrace exponentials, and forget that the code even exists."**
> — Andrej Karpathy, February 2025

---

## Contents

- [What is Vibe Coding?](#what-is-vibe-coding)
- [Key Principles](#key-principles)
- [Tools](#tools)
  - [IDE & Editor Assistants](#ide--editor-assistants)
  - [Agentic Coding Environments](#agentic-coding-environments)
  - [MCP Servers & Tooling](#mcp-servers--tooling)
  - [Cloud & Platform Integrations](#cloud--platform-integrations)
- [Workflows & Templates](#workflows--templates)
- [Best Practices](#best-practices)
- [Domain Applications](#domain-applications)
- [Learning Resources](#learning-resources)
  - [Research Papers](#research-papers)
  - [Articles & Manuals](#articles--manuals)
  - [Videos & Tutorials](#videos--tutorials)
- [Community](#community)
- [Related Awesome Lists](#related-awesome-lists)
- [Contributing](#contributing)

---

## What is Vibe Coding?

[Vibe Coding](https://en.wikipedia.org/wiki/Vibe_coding) is an AI-assisted programming approach where users describe their problem in natural language, and AI generates the necessary code without requiring the developer to deeply understand or engage with detailed code logic. The term was coined by AI researcher **Andrej Karpathy** in February 2025.

### Paradigm Comparison

| Paradigm | Approach | Human Role | Best For |
|----------|----------|------------|----------|
| **Traditional Coding** | Manual syntax-based writing | Writes/reads all code | Full control, production systems |
| **AI-Assisted Coding** | LLM suggests, human reviews/edits | Reviews and refines code | Faster development with oversight |
| **Vibe Coding** | Natural language to AI, test-only evaluation | Guides via intent, tests outcomes | Rapid prototyping, MVPs |

---

## Key Principles

- **Natural Language First** — Describe what you want, not how to implement it
- **Specification vs Vibe** — Loose, intent-driven descriptions over exhaustive specs
- **Context Management** — Maintain state across multi-turn conversations
- **Responsibility Boundaries** — Humans handle judgment/testing; AI handles generation
- **Trust Building** — Iterative testing and feedback foster reliance on AI outputs
- **Embrace Uncertainty** — Accept AI code based on tests, not line-by-line review

---

## Tools

### IDE & Editor Assistants

AI-powered code completion and assistance integrated into your development environment.

| Tool | Description | Links |
|------|-------------|-------|
| **GitHub Copilot** | AI pair programmer with autocomplete, chat, multi-IDE support | [Website](https://github.com/features/copilot) |
| **Cursor** | VS Code fork with contextual code generation and inline chat | [Website](https://www.cursor.com/) |
| **Windsurf** | AI-native IDE from Codeium with Cascade AI and multi-LLM support | [Website](https://codeium.com/windsurf) |
| **Claude Code** | Anthropic's CLI-based agentic coding assistant | [Docs](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview) |
| **JetBrains AI** | Deep integration in IntelliJ/PyCharm with Mellum LLM | [Website](https://www.jetbrains.com/ai/) |
| **Tabnine** | Deep learning autocomplete adapting to your coding style | [Website](https://www.tabnine.com/) |
| **Amazon Q Developer** | AWS-integrated AI coding assistant | [Website](https://aws.amazon.com/q/developer/) |
| **Cline** | Open-source AI assistant with file/terminal/browser automation | [GitHub](https://github.com/cline/cline) |
| **Roo Code** | AI assistant supporting multiple roles (architect, QA, PM) | [GitHub](https://github.com/RooVetGit/Roo-Code) |

### Agentic Coding Environments

Autonomous AI systems that handle end-to-end development tasks.

| Tool | Description | Links |
|------|-------------|-------|
| **Devin** | Autonomous AI software engineer by Cognition | [Website](https://www.cognition.ai/devin) |
| **OpenHands** | Open-source autonomous AI software developer | [GitHub](https://github.com/All-Hands-AI/OpenHands) |
| **Goose** | Open-source coding assistant by Block with MCP support | [Website](https://block.github.io/goose/) |
| **OpenManus** | Open-source framework for AI-assisted document creation | [GitHub](https://github.com/mannaandpoem/OpenManus) |
| **Vibe Compiler (vibec)** | Self-compiling tool that transforms prompts into code | [GitHub](https://github.com/Strawberry-Computer/vibe-compiler) |
| **AlphaCode** | DeepMind's competitive programming AI | [Website](https://alphacode.deepmind.com/) |

### MCP Servers & Tooling

[Model Context Protocol](https://modelcontextprotocol.io/) servers that extend AI capabilities.

| Category | Servers | Description |
|----------|---------|-------------|
| **Git Operations** | Git, Rube | Repository read/search/manipulation |
| **Databases** | ClickHouse, MongoDB, Prisma, Chroma | Query, migrations, semantic search |
| **Testing** | CircleCI, Semgrep | CI/CD integration, code scanning |
| **Browser** | AnyCrawl, Fetch | Web scraping, content fetching |
| **File System** | Filesystem | Secure read/write operations |
| **DevOps** | Terraform-Cloud, Sentry | Infrastructure, error tracking |

📚 See [awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers) for a comprehensive list.

### Cloud & Platform Integrations

Browser-based and cloud platforms for AI-assisted development.

| Tool | Description | Links |
|------|-------------|-------|
| **Replit** | Browser-based IDE with Ghostwriter AI | [Website](https://replit.com/) |
| **v0** | Vercel's AI for UI/React generation | [Website](https://v0.dev/) |
| **Bolt.new** | Natural language app building by StackBlitz | [Website](https://bolt.new/) |
| **Lovable** | Full-stack app generation with Supabase | [Website](https://lovable.dev/) |
| **Berrry** | Transform social posts into web apps | [Website](https://berrry.app) |
| **Duet AI** | Google Workspace AI integration | [Website](https://workspace.google.com/solutions/ai/) |
| **Trae AI** | AI platform for content creation | [Website](https://www.trae.ai/) |

---

## Workflows & Templates

### Session Setup Pattern

```markdown
Project: {one-line description}
Stack: {tech stack}
Repo layout: {key dirs/files}

Artifacts:
- PRD: {path}
- TECH_DESIGN: {path}
- NOTES: {path}

Task: {1-3 sentences, single focus}

What I want: 1) Clarifying questions 2) Short plan 3) Implement step 1
```

### Recommended Artifacts

Keep these AI-readable documents in your repo:
- **PRD.md** — Product requirements & user stories
- **TECH_DESIGN.md** — Architecture, data models, integration points
- **NOTES.md** — Running log of decisions and TODOs
- **CHANGELOG.md** — Human/AI-maintained change history

### Work-Type Playbooks

| Workflow | Key Steps |
|----------|-----------|
| **New Feature** | Vibe Brief → Verify with PRD → Vertical slice plan → Implement stepwise |
| **Refactoring** | Analyze patterns/smells → Safety strategy → Sequential small steps |
| **Bug Fixing** | Triage & hypotheses → Minimal failing test → Fix → Verify |
| **Test Generation** | Identify critical behaviors → Prioritize by risk → Generate tests |

📚 See [Vibe Coding Prompt Template](https://github.com/KhazP/vibe-coding-prompt-template) for detailed templates.

---

## Best Practices

### Do's ✅

- **Start with context** — Provide architecture, constraints, relevant code
- **Decompose tasks** — Break into planning → generation → testing → refactoring
- **Test first** — Generate tests before or alongside code
- **Use sandboxes** — Run AI code in isolated environments
- **Review as "junior engineer"** — Always human-review for security and architecture
- **Maintain artifacts** — Keep PRD, NOTES, CHANGELOG updated

### Don'ts ❌

- **Skip review for "simple" code** — AI can introduce subtle bugs
- **Include secrets in prompts** — Use environment variables or vaults
- **Feed proprietary code to public models** — Risk of data leakage
- **Accept raw output blindly** — Vibe ≠ vibes without verification
- **Over-rely on AI for complex decisions** — Humans handle judgment

---

## Domain Applications

| Domain | Use Cases | Example Tools |
|--------|-----------|---------------|
| **Web/App/Backend** | CRUD apps, SaaS, microservices | Lovable, Cursor, v0 |
| **Data & ML** | Pipeline generation, experiment automation | Zapier Agents, n8n |
| **DevOps** | IaC, CI/CD setup, monitoring | Terraform MCP, AutoVibe |
| **Research** | Notebook automation, data visualization | ChatGPT, Claude |

---

## Learning Resources

### Research Papers

| Paper | Focus | Link |
|-------|-------|------|
| **Vibe Coding: Toward an AI-Native Paradigm** | Semantic software development | [arXiv:2510.17842](https://arxiv.org/abs/2510.17842) |
| **A Review on Vibe Coding** | Fundamentals, challenges, future directions | [TechRxiv](https://www.techrxiv.org/users/913189/articles/1292402) |
| **Vibe Coding and AI-Led Conversational Programming** | Developer-AI interaction | [SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5469367) |
| **Vibe Coding: AI/Voice Based Code Generation** | Research tool for non-coders | [ICAIR](https://papers.academic-conferences.org/index.php/icair/article/view/3975) |

### Articles & Manuals

- [What is Vibe Coding? (IBM)](https://www.ibm.com/think/topics/vibe-coding) — Enterprise perspective
- [Vibe Coding Manual (Roboco)](https://roboco.io/posts/vibe-coding-manual/) — Comprehensive guide with templates
- [12 Best Practices for AI Coding (Questera)](https://www.questera.ai/blogs/12-best-practices-to-use-ai-in-coding-in-2025) — 2025 best practices
- [Secure Vibe Coding Guide (CSA)](https://cloudsecurityalliance.org/blog/2025/04/09/secure-vibe-coding-guide) — Security considerations
- [Here's how I use LLMs to help me write code (Simon Willison)](https://simonwillison.net/2025/Mar/11/using-llms-for-code/) — Practical integration tips

### Videos & Tutorials

| Video | Topic | Link |
|-------|-------|------|
| **Vibe Coding Tutorial and Best Practices** | AI agents in Cursor/Windsurf | [YouTube](https://www.youtube.com/watch?v=YWwS911iLhg) |
| **Vibe Coding Is The Future** | Y Combinator on vibe coding | [YouTube](https://www.youtube.com/watch?v=IACHfKmZMr8) |
| **How I use LLMs** | Andrej Karpathy's guide | [YouTube](https://www.youtube.com/watch?v=EWvNQjAaOHw) |
| **Model Context Protocol Explained** | MCP fundamentals | [YouTube](https://www.youtube.com/watch?v=VChRPFUzJGA) |
| **Windsurf: 90% of Your Code** | Agentic IDE deep dive | [YouTube](https://www.youtube.com/watch?v=bVNNvWq6dKo) |
| **Vibecoding is Here** | AI changing development | [YouTube](https://www.youtube.com/watch?v=xxA-M3HrKrc) |
| **New Tools for Building Agents** | OpenAI's agent tools | [YouTube](https://www.youtube.com/watch?v=hciNKcLwSes) |
| **AI Tool Showdown (Japanese)** | Copilot vs Cursor vs others | [YouTube](https://www.youtube.com/watch?v=EQHXIVItNxs) |
| **MCP in 10 Minutes** | Quick MCP intro | [YouTube](https://www.youtube.com/watch?v=EswVjHZMn74) |

---

## Community

### Reddit

- [r/vibecoding](https://reddit.com/r/vibecoding) — Dedicated vibe coding community
- [r/ChatGPTCoding](https://reddit.com/r/ChatGPTCoding) — ChatGPT + coding workflows
- [r/LocalLlama](https://reddit.com/r/LocalLlama) — Local LLM development
- [r/replit](https://reddit.com/r/replit) — Replit & Ghostwriter community

### Discord

- **Cursor Discord** — Workflows, extensions, project showcases
- **Lovable AI Discord** — Full-stack app generation sharing
- **Bolt.new Discord** — Natural language app building
- **v0 by Vercel Discord** — UI/React generation community
- **Replit Discord** — Multiplayer vibe coding

### Starter Kits

- [vibe-coding-prompt-template](https://github.com/KhazP/vibe-coding-prompt-template) — Comprehensive prompt templates
- [awesome-vibe-coding](https://github.com/filipecalegario/awesome-vibe-coding) — Another curated list
- [vibeworkflow.app](https://vibeworkflow.app) — Workflow automation for vibe coding

---

## Related Awesome Lists

- [awesome-code-ai](https://github.com/sourcegraph/awesome-code-ai) — AI coding tools by Sourcegraph
- [awesome-ai-assisted-coding](https://github.com/saviorand/awesome-ai-assisted-coding) — AI-assisted coding resources
- [awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers) — Model Context Protocol servers
- [awesome-chatgpt](https://github.com/humanloop/awesome-chatgpt) — ChatGPT resources

---

## Contributing

Contributions to enhance this repository are highly encouraged! Please follow these guidelines:

1. **Fork & Create Branch** — Fork this repository, then create your feature branch
2. **Add Your Contributions** — Follow the existing format: `[Name](URL) — Description`
3. **Commit & Push** — Use descriptive commit messages
4. **Create Pull Request** — Clearly describe your contribution

### Curation Principles

Resources should be:
- **Relevant** — Directly related to vibe coding or AI-assisted development
- **Quality** — Well-maintained, documented, and actively used
- **Accessible** — Free or with free tier available preferred

---

## License

This work is dedicated to the public domain under the [CC0 1.0 Universal License](https://creativecommons.org/publicdomain/zero/1.0/).
