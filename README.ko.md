# Awesome Vibe Coding

*Language: [English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md)*

![Vibe Coding Meme](images/vibecoding-meme.png)

**Vibe Coding** 관련 리소스를 정리한 목록입니다. Vibe Coding은 AI 네이티브 프로그래밍 패러다임으로, 자연어로 의도를 설명하면 AI가 코드를 생성합니다.

> **"완전히 분위기에 몸을 맡기고, 지수적 성장을 받아들이며, 코드가 존재한다는 사실조차 잊으세요."**
> — Andrej Karpathy, 2025년 2월

---

## 목차

- [Vibe Coding이란?](#vibe-coding이란)
- [핵심 원칙](#핵심-원칙)
- [도구](#도구)
  - [IDE & 편집기 어시스턴트](#ide--편집기-어시스턴트)
  - [에이전트 기반 코딩 환경](#에이전트-기반-코딩-환경)
  - [MCP 서버 & 도구](#mcp-서버--도구)
  - [클라우드 & 플랫폼 통합](#클라우드--플랫폼-통합)
- [워크플로우 & 템플릿](#워크플로우--템플릿)
- [모범 사례](#모범-사례)
- [도메인별 응용](#도메인별-응용)
- [학습 자료](#학습-자료)
  - [연구 논문](#연구-논문)
  - [아티클 & 매뉴얼](#아티클--매뉴얼)
  - [비디오 & 튜토리얼](#비디오--튜토리얼)
- [커뮤니티](#커뮤니티)
- [관련 Awesome 리스트](#관련-awesome-리스트)
- [기여하기](#기여하기)

---

## Vibe Coding이란?

[Vibe Coding](https://en.wikipedia.org/wiki/Vibe_coding)은 사용자가 자연어로 문제를 설명하면 AI가 필요한 코드를 생성하는 AI 보조 프로그래밍 접근 방식입니다. 개발자가 상세한 코드 로직을 깊이 이해하거나 관여할 필요가 없습니다. 이 용어는 AI 연구자 **Andrej Karpathy** 가 2025년 2월에 만들었습니다.

### 패러다임 비교

| 패러다임 | 접근 방식 | 사람의 역할 | 적합한 용도 |
|----------|----------|------------|----------|
| **전통적 코딩** | 수동 구문 기반 작성 | 모든 코드 작성/읽기 | 완전한 제어, 프로덕션 시스템 |
| **AI 보조 코딩** | LLM이 제안, 사람이 검토/편집 | 코드 검토 및 정제 | 감독을 통한 빠른 개발 |
| **Vibe Coding** | 자연어에서 AI로, 테스트만 평가 | 의도로 가이드, 결과 테스트 | 빠른 프로토타이핑, MVP |

---

## 핵심 원칙

- **자연어 우선** — 구현 방법이 아닌 원하는 것을 설명
- **명세 vs Vibe** — 철저한 명세보다 느슨하고 의도 중심적인 설명
- **컨텍스트 관리** — 여러 턴의 대화에서 상태 유지
- **책임 경계** — 사람은 판단/테스트 담당, AI는 생성 담당
- **신뢰 구축** — 반복적 테스트와 피드백으로 AI 출력에 대한 의존도 향상
- **불확실성 수용** — 한 줄씩 검토하지 않고 테스트를 기반으로 AI 코드 수용

---

## 도구

### IDE & 편집기 어시스턴트

개발 환경에 통합된 AI 기반 코드 완성 및 지원.

| 도구 | 설명 | 링크 |
|------|-------------|-------|
| **GitHub Copilot** | 자동 완성, 채팅, 다중 IDE 지원을 갖춘 AI 페어 프로그래머 | [Website](https://github.com/features/copilot) |
| **Cursor** | 컨텍스트 기반 코드 생성 및 인라인 채팅을 갖춘 VS Code 포크 | [Website](https://www.cursor.com/) |
| **Windsurf** | Codeium의 AI 네이티브 IDE, Cascade AI 및 다중 LLM 지원 | [Website](https://codeium.com/windsurf) |
| **Claude Code** | Anthropic의 CLI 기반 에이전트 코딩 어시스턴트 | [Docs](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview) |
| **JetBrains AI** | Mellum LLM을 사용한 IntelliJ/PyCharm의 깊은 통합 | [Website](https://www.jetbrains.com/ai/) |
| **Tabnine** | 코딩 스타일에 적응하는 딥러닝 자동 완성 | [Website](https://www.tabnine.com/) |
| **Amazon Q Developer** | AWS 통합 AI 코딩 어시스턴트 | [Website](https://aws.amazon.com/q/developer/) |
| **Cline** | 파일/터미널/브라우저 자동화를 지원하는 오픈소스 AI 어시스턴트 | [GitHub](https://github.com/cline/cline) |
| **Roo Code** | 여러 역할(설계자, QA, PM)을 지원하는 AI 어시스턴트 | [GitHub](https://github.com/RooVetGit/Roo-Code) |

### 에이전트 기반 코딩 환경

엔드투엔드 개발 작업을 처리하는 자율 AI 시스템.

| 도구 | 설명 | 링크 |
|------|-------------|-------|
| **Devin** | Cognition의 자율 AI 소프트웨어 엔지니어 | [Website](https://www.cognition.ai/devin) |
| **OpenHands** | 오픈소스 자율 AI 소프트웨어 개발자 | [GitHub](https://github.com/All-Hands-AI/OpenHands) |
| **Goose** | Block의 오픈소스 코딩 어시스턴트, MCP 지원 | [Website](https://block.github.io/goose/) |
| **OpenManus** | AI 보조 문서 작성을 위한 오픈소스 프레임워크 | [GitHub](https://github.com/mannaandpoem/OpenManus) |
| **Vibe Compiler (vibec)** | 프롬프트를 코드로 변환하는 자체 컴파일 도구 | [GitHub](https://github.com/Strawberry-Computer/vibe-compiler) |
| **AlphaCode** | DeepMind의 경쟁 프로그래밍 AI | [Website](https://alphacode.deepmind.com/) |

### MCP 서버 & 도구

AI 기능을 확장하는 [Model Context Protocol](https://modelcontextprotocol.io/) 서버.

| 카테고리 | 서버 | 설명 |
|----------|---------|-------------|
| **Git 작업** | Git, Rube | 저장소 읽기/검색/조작 |
| **데이터베이스** | ClickHouse, MongoDB, Prisma, Chroma | 쿼리, 마이그레이션, 시맨틱 검색 |
| **테스팅** | CircleCI, Semgrep | CI/CD 통합, 코드 스캐닝 |
| **브라우저** | AnyCrawl, Fetch | 웹 스크래핑, 콘텐츠 가져오기 |
| **파일 시스템** | Filesystem | 안전한 읽기/쓰기 작업 |
| **DevOps** | Terraform-Cloud, Sentry | 인프라, 오류 추적 |

📚 전체 목록은 [awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers)를 참조하세요.

### 클라우드 & 플랫폼 통합

AI 보조 개발을 위한 브라우저 기반 및 클라우드 플랫폼.

| 도구 | 설명 | 링크 |
|------|-------------|-------|
| **Replit** | Ghostwriter AI를 갖춘 브라우저 기반 IDE | [Website](https://replit.com/) |
| **v0** | Vercel의 UI/React 생성 AI | [Website](https://v0.dev/) |
| **Bolt.new** | StackBlitz의 자연어 앱 빌딩 | [Website](https://bolt.new/) |
| **Lovable** | Supabase를 사용한 풀스택 앱 생성 | [Website](https://lovable.dev/) |
| **Berrry** | 소셜 게시물을 웹 앱으로 변환 | [Website](https://berrry.app) |
| **Duet AI** | Google Workspace AI 통합 | [Website](https://workspace.google.com/solutions/ai/) |
| **Trae AI** | 콘텐츠 제작을 위한 AI 플랫폼 | [Website](https://www.trae.ai/) |

---

## 워크플로우 & 템플릿

### 세션 설정 패턴

```markdown
Project: {한 줄 설명}
Stack: {기술 스택}
Repo layout: {주요 디렉토리/파일}

Artifacts:
- PRD: {경로}
- TECH_DESIGN: {경로}
- NOTES: {경로}

Task: {1-3문장, 단일 초점}

What I want: 1) 명확화 질문 2) 간단한 계획 3) 1단계 구현
```

### 권장 아티팩트

저장소에 다음과 같은 AI가 읽을 수 있는 문서를 유지하세요:
- **PRD.md** — 제품 요구사항 및 사용자 스토리
- **TECH_DESIGN.md** — 아키텍처, 데이터 모델, 통합 지점
- **NOTES.md** — 의사결정 및 TODO의 실행 로그
- **CHANGELOG.md** — 사람/AI가 유지하는 변경 이력

### 작업 유형별 플레이북

| 워크플로우 | 주요 단계 |
|----------|-----------|
| **새 기능** | Vibe Brief → PRD로 검증 → 수직 슬라이스 계획 → 단계별 구현 |
| **리팩토링** | 패턴/냄새 분석 → 안전 전략 → 순차적 작은 단계 |
| **버그 수정** | 분류 및 가설 → 최소 실패 테스트 → 수정 → 검증 |
| **테스트 생성** | 중요 동작 식별 → 위험도별 우선순위 → 테스트 생성 |

📚 자세한 템플릿은 [Vibe Coding Prompt Template](https://github.com/KhazP/vibe-coding-prompt-template)을 참조하세요.

---

## 모범 사례

### 해야 할 것 ✅

- **컨텍스트로 시작** — 아키텍처, 제약 조건, 관련 코드 제공
- **작업 분해** — 계획 → 생성 → 테스트 → 리팩토링으로 나누기
- **테스트 우선** — 코드 전이나 동시에 테스트 생성
- **샌드박스 사용** — 격리된 환경에서 AI 코드 실행
- **"주니어 엔지니어"로 검토** — 보안 및 아키텍처를 위해 항상 사람이 검토
- **아티팩트 유지** — PRD, NOTES, CHANGELOG 업데이트 유지

### 하지 말아야 할 것 ❌

- **"간단한" 코드의 검토 생략** — AI가 미묘한 버그를 도입할 수 있음
- **프롬프트에 비밀 포함** — 환경 변수나 vault 사용
- **공개 모델에 독점 코드 제공** — 데이터 유출 위험
- **원시 출력 맹목적 수용** — Vibe ≠ 검증 없는 분위기
- **복잡한 결정에 AI 과도하게 의존** — 사람이 판단 담당

---

## 도메인별 응용

| 도메인 | 사용 사례 | 예시 도구 |
|--------|-----------|---------------|
| **웹/앱/백엔드** | CRUD 앱, SaaS, 마이크로서비스 | Lovable, Cursor, v0 |
| **데이터 & ML** | 파이프라인 생성, 실험 자동화 | Zapier Agents, n8n |
| **DevOps** | IaC, CI/CD 설정, 모니터링 | Terraform MCP, AutoVibe |
| **연구** | 노트북 자동화, 데이터 시각화 | ChatGPT, Claude |

---

## 학습 자료

### 연구 논문

| 논문 | 초점 | 링크 |
|-------|-------|------|
| **Vibe Coding: Toward an AI-Native Paradigm** | 시맨틱 소프트웨어 개발 | [arXiv:2510.17842](https://arxiv.org/abs/2510.17842) |
| **A Review on Vibe Coding** | 기본 개념, 과제, 미래 방향 | [TechRxiv](https://www.techrxiv.org/users/913189/articles/1292402) |
| **Vibe Coding and AI-Led Conversational Programming** | 개발자-AI 상호작용 | [SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5469367) |
| **Vibe Coding: AI/Voice Based Code Generation** | 비개발자를 위한 연구 도구 | [ICAIR](https://papers.academic-conferences.org/index.php/icair/article/view/3975) |

### 아티클 & 매뉴얼

- [What is Vibe Coding? (IBM)](https://www.ibm.com/think/topics/vibe-coding) — 기업 관점
- [Vibe Coding Manual (Roboco)](https://roboco.io/posts/vibe-coding-manual/) — 템플릿이 포함된 포괄적 가이드
- [12 Best Practices for AI Coding (Questera)](https://www.questera.ai/blogs/12-best-practices-to-use-ai-in-coding-in-2025) — 2025년 모범 사례
- [Secure Vibe Coding Guide (CSA)](https://cloudsecurityalliance.org/blog/2025/04/09/secure-vibe-coding-guide) — 보안 고려사항
- [Here's how I use LLMs to help me write code (Simon Willison)](https://simonwillison.net/2025/Mar/11/using-llms-for-code/) — 실용적인 통합 팁

### 비디오 & 튜토리얼

| 비디오 | 주제 | 링크 |
|-------|-------|------|
| **Vibe Coding Tutorial and Best Practices** | Cursor/Windsurf의 AI agents | [YouTube](https://www.youtube.com/watch?v=YWwS911iLhg) |
| **Vibe Coding Is The Future** | Y Combinator의 vibe coding | [YouTube](https://www.youtube.com/watch?v=IACHfKmZMr8) |
| **How I use LLMs** | Andrej Karpathy의 가이드 | [YouTube](https://www.youtube.com/watch?v=EWvNQjAaOHw) |
| **Model Context Protocol Explained** | MCP 기본 개념 | [YouTube](https://www.youtube.com/watch?v=VChRPFUzJGA) |
| **Windsurf: 90% of Your Code** | 에이전트 IDE 심층 분석 | [YouTube](https://www.youtube.com/watch?v=bVNNvWq6dKo) |
| **Vibecoding is Here** | AI가 바꾸는 개발 | [YouTube](https://www.youtube.com/watch?v=xxA-M3HrKrc) |
| **New Tools for Building Agents** | OpenAI의 에이전트 도구 | [YouTube](https://www.youtube.com/watch?v=hciNKcLwSes) |
| **AI Tool Showdown (Japanese)** | Copilot vs Cursor vs 기타 | [YouTube](https://www.youtube.com/watch?v=EQHXIVItNxs) |
| **MCP in 10 Minutes** | MCP 빠른 소개 | [YouTube](https://www.youtube.com/watch?v=EswVjHZMn74) |

---

## 커뮤니티

### Reddit

- [r/vibecoding](https://reddit.com/r/vibecoding) — Vibe coding 전용 커뮤니티
- [r/ChatGPTCoding](https://reddit.com/r/ChatGPTCoding) — ChatGPT + 코딩 워크플로우
- [r/LocalLlama](https://reddit.com/r/LocalLlama) — 로컬 LLM 개발
- [r/replit](https://reddit.com/r/replit) — Replit 및 Ghostwriter 커뮤니티

### Discord

- **Cursor Discord** — 워크플로우, 확장 프로그램, 프로젝트 쇼케이스
- **Lovable AI Discord** — 풀스택 앱 생성 공유
- **Bolt.new Discord** — 자연어 앱 빌딩
- **v0 by Vercel Discord** — UI/React 생성 커뮤니티
- **Replit Discord** — 멀티플레이어 vibe coding

### 스타터 킷

- [vibe-coding-prompt-template](https://github.com/KhazP/vibe-coding-prompt-template) — 포괄적인 프롬프트 템플릿
- [awesome-vibe-coding](https://github.com/filipecalegario/awesome-vibe-coding) — 또 다른 큐레이션 리스트
- [vibeworkflow.app](https://vibeworkflow.app) — Vibe coding을 위한 워크플로우 자동화

---

## 관련 Awesome 리스트

- [awesome-code-ai](https://github.com/sourcegraph/awesome-code-ai) — Sourcegraph의 AI 코딩 도구
- [awesome-ai-assisted-coding](https://github.com/saviorand/awesome-ai-assisted-coding) — AI 보조 코딩 리소스
- [awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers) — Model Context Protocol 서버
- [awesome-chatgpt](https://github.com/humanloop/awesome-chatgpt) — ChatGPT 리소스

---

## 기여하기

이 저장소를 개선하기 위한 기여를 적극 환영합니다! 다음 가이드라인을 따라주세요:

1. **Fork & 브랜치 생성** — 이 저장소를 포크한 다음 기능 브랜치 생성
2. **기여 내용 추가** — 기존 형식 따르기: `[이름](URL) — 설명`
3. **커밋 & 푸시** — 설명적인 커밋 메시지 사용
4. **Pull Request 생성** — 기여 내용을 명확하게 설명

### 큐레이션 원칙

리소스는 다음과 같아야 합니다:
- **관련성** — Vibe coding 또는 AI 보조 개발과 직접 관련
- **품질** — 잘 유지되고, 문서화되고, 활발하게 사용됨
- **접근성** — 무료 또는 무료 티어가 있는 것 선호

---

## 라이선스

이 작품은 [CC0 1.0 Universal License](https://creativecommons.org/publicdomain/zero/1.0/)에 따라 퍼블릭 도메인에 제공됩니다.
