# Awesome Vibe Coding (한국어)

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Weekly Update](https://github.com/roboco-io/awesome-vibecoding/actions/workflows/weekly-update.yml/badge.svg)](https://github.com/roboco-io/awesome-vibecoding/actions/workflows/weekly-update.yml)
[![Maintained by Pi](https://img.shields.io/badge/Maintained%20by-Pi-blueviolet)](https://pi.dev/)
[![Issues Welcome](https://img.shields.io/badge/Issues-welcome-brightgreen.svg)](../../issues/new)
[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](https://creativecommons.org/publicdomain/zero/1.0/)

*Language: [English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md)*

**AI로 소프트웨어를 만드는 데** 필요한 도구와 학습 자료를 찾아보세요. 하려는 작업을 먼저 고르고, 이용 조건을 확인한 뒤, 검증 날짜로 검토된 정보와 오래된 항목을 구분하세요.

| 하고 싶은 일 | 시작할 곳 |
|---|---|
| 변경 사항 확인 | [최근 검증된 업데이트](#recent-updates) |
| 소프트웨어 개발·개선 | [작업별 도구 찾기](#tools) |
| 첫 프로젝트로 학습 | [시작하기](#start-here) · [학습과 실습](#learning) |

[코딩](#code) · [앱 & UI](#apps) · [컨텍스트 & 명세](#context) · [테스트 & 리뷰](#quality) · [배포 & 실행](#delivery) · [작업 공간 & 사용량](#operations) · [커뮤니티](#community)

<a id="recent-updates"></a>
## 최근 검증된 업데이트

지난 30일의 검토와 주요 변경 사항을 최신순으로 정리했습니다. 검토 날짜는 **제품 출시일이 아닙니다**. 확인한 내용은 [검토 기록과 근거](docs/issue-review-2026-09-18.md)에 남깁니다.

<!-- recent-updates:start -->
| 검증일 | 업데이트 | 변경 사항 |
|---|---|---|
| 2026-09-18 | [Pi](#resource-pi) | 검토 후 추가: 다중 프로바이더 모델과 SDK를 갖춘 MIT 라이선스 확장형 터미널 코딩 에이전트. |
| 2026-09-18 | [NextReset](#resource-nextreset) | 검토 후 추가: 비공식 공개 초기화 이력과 로컬 카운트다운; 예측의 정확성을 보증하지 않음. |
| 2026-09-18 | [Superagent](#resource-superagent) | 검토 후 추가: 브라우저 및 iOS 워크플로우를 지원하는 macOS 코딩 에이전트 작업 공간. |
| 2026-09-18 | [Publish.my](#resource-publish-my) | 검토 후 추가: 에이전트용 정적 사이트 게시; 이메일 활성화 필요. |
| 2026-09-18 | [Agent QA](#resource-agent-qa) | 검토 후 추가: 웹·모바일 테스트 워크플로우; FSL-1.1-ALv2 라이선스 명시. |
| 2026-09-18 | [Duckweed](#resource-duckweed) | 검토 후 추가: 코딩 에이전트용 로컬 터미널 작업 공간; 소스 공개 라이선스. |
| 2026-09-18 | [Vibe Coding with Confidence (Mahmoud Zalt)](#resource-vibe-coding-with-confidence-mahmoud-zalt) | 검토 후 추가: 무료로 읽을 수 있는 개발 핸드북. |
| 2026-09-18 | [opencode](#resource-opencode) | 상태 확인: 과거 저장소가 아카이브되었으며 Crush를 후속 프로젝트로 안내함. |
<!-- recent-updates:end -->

<a id="start-here"></a>
## 시작하기

**개발이 처음이라면:** 작은 프로젝트 하나를 고르고, Git으로 변경 사항을 저장하는 법을 익힌 뒤, 기능을 하나씩 테스트하세요. 프로젝트 폴더를 열고 선택한 튜토리얼의 명령을 실행할 수 있어야 합니다. 이 과정이 낯설다면 해당 자료의 환경 설정 부분부터 시작하세요.

1. [첫 프로젝트 가이드](#first-project)를 읽고 로컬 할 일 목록처럼 결과를 직접 설명할 수 있는 목표를 고르세요.
2. [코딩 어시스턴트](#code) 또는 [앱 프로토타이핑 도구](#apps)를 하나 고르세요. 이용 조건부터 확인하세요. 클라이언트가 무료여도 유료 모델, 구독 또는 API 키가 필요할 수 있습니다.
3. 짧은 목표와 완료 기준을 적으세요. 작은 단계 하나를 구현하고, 변경 사항을 살피고, 테스트를 실행한 뒤 Git으로 진행 상태를 저장하세요.
4. 공유하기 전에 [테스트와 리뷰 도구](#quality)를 사용하세요. 인증 정보는 프롬프트나 커밋에 넣지 말고, 사용하는 생성 코드의 동작을 이해하세요.
5. [호스팅·런타임 제약](#delivery), 특히 백엔드가 필요한지를 확인한 뒤 배포하세요.

**개발 경험이 있다면:** 위에서 작업을 선택한 뒤 [실전 워크플로우](#practical-guides)를 계획, 리팩토링, 디버깅, 검증에 활용하세요.

<a id="tools"></a>
## 작업별 도구 찾기

각 리소스는 하나의 주된 분류에 배치했습니다. **CLI, IDE, Web, Desktop, MCP** 는 도구의 사용 방식을 나타내며 품질 순위가 아닙니다. 이 페이지에서 `MCP`를 검색하면 여러 작업에 걸친 프로토콜 통합을 찾을 수 있습니다.

**메타데이터 읽는 법:** `—`는 실질적인 검증 날짜가 기록되지 않았다는 뜻입니다. `이용 조건 확인` / `접근 조건 확인`은 현재 요금이나 접근 조건이 검증되지 않았다는 뜻입니다. 오픈소스와 소스 공개는 라이선스의 구분이며 모델을 무료로 사용할 수 있다는 의미가 아닙니다. 검증 날짜는 기재된 기능과 이용 조건의 근거를 확인한 날짜이며 보안 감사일이 아닙니다. 기존 설명은 재검증이 필요할 수 있습니다.

<a id="code"></a>
### 코딩과 편집

저장소를 이해하고, 기능을 구현하거나 기존 코드를 리팩토링합니다.

<!-- catalog:code -->
| 리소스 | 활용 목적 | 이용 조건 | 검증일 |
|---|---|---|---|
| <a id="resource-agentless"></a>[**Agentless**](https://github.com/OpenAutoCoder/Agentless) | 자율 소프트웨어 엔지니어링을 위한 미니멀리스트 오픈소스 접근 방식 | 이용 조건 확인 | — |
| <a id="resource-aide"></a>[**Aide**](https://aide.dev) · IDE | 코드베이스 전반의 문제를 능동적으로 수정하는 AI 에이전트가 탑재된 VS Code 포크 | 이용 조건 확인 | — |
| <a id="resource-aider"></a>[**Aider**](https://github.com/paul-gauthier/aider) · CLI | git 통합을 갖춘 터미널 AI 페어 프로그래밍 | 이용 조건 확인 | — |
| <a id="resource-amazon-q-developer"></a>[**Amazon Q Developer**](https://aws.amazon.com/q/developer/) | AWS 통합 AI 코딩 어시스턴트 | 이용 조건 확인 | — |
| <a id="resource-amp"></a>[**Amp**](https://ampcode.com) · CLI | Sourcegraph의 터미널 우선 에이전트 코딩 어시스턴트 | 이용 조건 확인 | — |
| <a id="resource-augment-code"></a>[**Augment Code**](https://www.augmentcode.com) | 프로젝트 컨텍스트를 활용하는 코딩 지원 | 이용 조건 확인 | — |
| <a id="resource-blackbox-ai"></a>[**Blackbox AI**](https://www.blackbox.ai) | 20개 이상 언어를 지원하는 AI 코드 자동완성 및 생성 도구, 브라우저 내 코딩으로 인기 | 이용 조건 확인 | — |
| <a id="resource-claude-code"></a>[**Claude Code**](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview) · CLI | Anthropic의 CLI 기반 에이전트 코딩 어시스턴트 | 이용 조건 확인 | — |
| <a id="resource-cline"></a>[**Cline**](https://github.com/cline/cline) | 파일·터미널·브라우저 자동화를 지원하는 AI 어시스턴트 | 이용 조건 확인 | — |
| <a id="resource-codebuff"></a>[**Codebuff**](https://github.com/CodebuffAI/codebuff) · CLI | 하위 에이전트와 터미널 코딩 작업 조율 | 이용 조건 확인 | — |
| <a id="resource-codegpt"></a>[**CodeGPT**](https://codegpt.co) | VS Code 및 IDE용 다중 LLM 지원 AI 코딩 어시스턴트 | 이용 조건 확인 | — |
| <a id="resource-codeium"></a>[**Codeium**](https://codeium.com/) | 여러 개발 환경에서 코드 완성 지원; 현재 브랜드명과 이용 조건 확인 필요 | 이용 조건 확인 | — |
| <a id="resource-codesandbox-ai"></a>[**CodeSandbox AI**](https://codesandbox.io/ai) · Web | 브라우저 샌드박스에서 AI 기반 코드 생성 | 이용 조건 확인 | — |
| <a id="resource-continue"></a>[**Continue**](https://www.continue.dev) | 설정을 변경할 수 있는 AI 어시스턴트 프레임워크 | 이용 조건 확인 | — |
| <a id="resource-copilot-workspace"></a>[**Copilot Workspace**](https://githubnext.com/projects/copilot-workspace) · Web | 이슈에서 PR까지의 워크플로우를 위한 GitHub의 에이전트 환경 | 이용 조건 확인 | — |
| <a id="resource-cosine"></a>[**Cosine**](https://cosine.sh) · Web | 복잡한 코드베이스 작업을 위한 자율 AI 소프트웨어 엔지니어 | 이용 조건 확인 | — |
| <a id="resource-crush"></a>[**Crush**](https://github.com/charmbracelet/crush) · CLI | Charmbracelet 의 매력적인 터미널 AI 코딩 에이전트, LSP 통합 및 멀티 모델 지원 | 이용 조건 확인 | — |
| <a id="resource-cursor"></a>[**Cursor**](https://www.cursor.com/) · IDE | 컨텍스트 기반 코드 생성 및 인라인 채팅을 갖춘 VS Code 포크 | 이용 조건 확인 | — |
| <a id="resource-dbforge-ai-assistant"></a>[**dbForge AI Assistant**](https://www.devart.com/dbforge/ai-assistant/) | dbForge 제품에 통합된 AI 기반 SQL 코딩 도구 | 이용 조건 확인 | — |
| <a id="resource-deepseek-cli"></a>[**DeepSeek CLI**](https://github.com/holasoymalva/deepseek-cli) · CLI | DeepSeek Coder 모델 기반 터미널 AI 코딩 어시스턴트 | 이용 조건 확인 | — |
| <a id="resource-devika"></a>[**Devika**](https://github.com/stitionai/devika) | 에이전트 기반 소프트웨어 엔지니어링 워크플로우 | 이용 조건 확인 | — |
| <a id="resource-devin"></a>[**Devin**](https://www.cognition.ai/devin) · Web | Cognition의 자율 AI 소프트웨어 엔지니어 | 이용 조건 확인 | — |
| <a id="resource-devon"></a>[**Devon**](https://github.com/entropy-research/Devon) | Devin의 대안인 자율 코딩 에이전트 | 이용 조건 확인 | — |
| <a id="resource-fusion"></a>[**Fusion**](https://www.builder.io/fusion) · Web | 디자인 시스템 인식 및 Figma 통합 기능을 갖춘 GitHub 연결 비주얼 AI IDE | 이용 조건 확인 | — |
| <a id="resource-gemini-cli"></a>[**Gemini CLI**](https://github.com/google-gemini/gemini-cli) · CLI | Gemini 모델 기반 Google의 오픈소스 에이전트 코딩 CLI | 이용 조건 확인 | — |
| <a id="resource-gemini-code-assist"></a>[**Gemini Code Assist**](https://cloud.google.com/products/gemini/code-assist) | Cloud/IDE용 Google의 AI 코드 완성 및 채팅 | 이용 조건 확인 | — |
| <a id="resource-github-copilot"></a>[**GitHub Copilot**](https://github.com/features/copilot) | 자동 완성, 채팅, 다중 IDE 지원을 갖춘 AI 페어 프로그래머 | 이용 조건 확인 | — |
| <a id="resource-google-antigravity"></a>[**Google Antigravity**](https://antigravity.google) · IDE | 멀티 에이전트 오케스트레이션을 지원하는 에이전트 중심 IDE | 이용 조건 확인 | — |
| <a id="resource-google-jules"></a>[**Google Jules**](https://jules.google) · Web | 저장소 코딩 작업을 자율 에이전트에 위임 | 이용 조건 확인 | — |
| <a id="resource-goose"></a>[**Goose**](https://block.github.io/goose/) · CLI | MCP를 지원하는 Block의 코딩 어시스턴트 | 이용 조건 확인 | — |
| <a id="resource-gpt-engineer"></a>[**gpt-engineer**](https://github.com/gpt-engineer-org/gpt-engineer) | 자연어 명세로부터 전체 코드베이스 구축 | 이용 조건 확인 | — |
| <a id="resource-jetbrains-ai"></a>[**JetBrains AI**](https://www.jetbrains.com/ai/) | Junie 에이전트를 갖춘 IntelliJ/PyCharm 깊은 통합 | 이용 조건 확인 | — |
| <a id="resource-kilo-code"></a>[**Kilo Code**](https://kilo.ai) | 모델 선택과 브라우저 자동화를 지원하는 AI 코딩 어시스턴트 | 이용 조건 확인 | — |
| <a id="resource-kiro"></a>[**Kiro**](https://kiro.dev) · IDE | 요구사항을 코드와 테스트로 변환하는 AWS 스펙 기반 AI IDE | 이용 조건 확인 | — |
| <a id="resource-melty"></a>[**Melty**](https://github.com/meltylabs/melty) · IDE | 대화형 인터페이스를 갖춘 채팅 우선 코드 편집기 | 이용 조건 확인 | — |
| <a id="resource-metagpt"></a>[**MetaGPT**](https://github.com/geekan/MetaGPT) | 소프트웨어 회사 역할을 시뮬레이션하는 멀티 에이전트 프레임워크 | 이용 조건 확인 | — |
| <a id="resource-openai-codex-cli"></a>[**OpenAI Codex CLI**](https://openai.com/codex/) · CLI | 자연어 프롬프트를 사용하는 CLI 코딩 에이전트 | 이용 조건 확인 | — |
| <a id="resource-openhands"></a>[**OpenHands**](https://github.com/All-Hands-AI/OpenHands) | 자율 AI 소프트웨어 개발자 | 이용 조건 확인 | — |
| <a id="resource-pearai"></a>[**PearAI**](https://trypear.ai) · IDE | 검색 기능이 통합된 VS Code AI 편집기 | 이용 조건 확인 | — |
| <a id="resource-pi"></a>[**Pi**](https://github.com/earendil-works/pi) · CLI | TypeScript 확장, 다중 프로바이더 모델, 임베딩 가능한 SDK를 갖춘 확장형 터미널 코딩 에이전트 | MIT; 모델 API 또는 구독 비용 발생 | 2026-09-18 |
| <a id="resource-plandex"></a>[**Plandex**](https://plandex.ai) · CLI | 복잡한 다단계 작업을 위한 터미널 AI 코딩 엔진 | 이용 조건 확인 | — |
| <a id="resource-ra-aid"></a>[**RA.Aid**](https://github.com/ai-christianson/RA.Aid) · CLI | 리서치, 계획 수립, 다단계 코드 생성을 결합한 자율 개발 에이전트 | 이용 조건 확인 | — |
| <a id="resource-refact-ai"></a>[**Refact.ai**](https://refact.ai/) | 자체 호스팅 AI 코딩 어시스턴트 | 이용 조건 확인 | — |
| <a id="resource-roo-code"></a>[**Roo Code**](https://github.com/RooVetGit/Roo-Code) | 여러 역할(설계자, QA, PM)을 지원하는 AI 어시스턴트 | 이용 조건 확인 | — |
| <a id="resource-sourcegraph-cody"></a>[**Sourcegraph Cody**](https://sourcegraph.com/cody) | 코드 이해 및 검색을 위한 AI 어시스턴트 | 이용 조건 확인 | — |
| <a id="resource-supermaven"></a>[**Supermaven**](https://supermaven.com) | 고속 AI 코드 완성 | 이용 조건 확인 | — |
| <a id="resource-superninja"></a>[**SuperNinja**](https://www.ninjatech.ai) · Web | 개발 전 과정을 수행하는 자율 AI 개발 에이전트 | 이용 조건 확인 | — |
| <a id="resource-swe-agent"></a>[**SWE-agent**](https://github.com/princeton-nlp/SWE-agent) | 저장소 이슈를 해결하는 에이전트 | 이용 조건 확인 | — |
| <a id="resource-sweep"></a>[**Sweep**](https://github.com/sweepai/sweep) | 이슈 및 PR을 위한 AI 기반 GitHub 어시스턴트 | 이용 조건 확인 | — |
| <a id="resource-tabby"></a>[**Tabby**](https://tabbyml.com) | 프라이버시 우선 설계의 자체 호스팅 오픈소스 AI 코딩 어시스턴트 | 이용 조건 확인 | — |
| <a id="resource-tabnine"></a>[**Tabnine**](https://www.tabnine.com/) | 코딩 스타일에 적응하는 딥러닝 자동 완성 | 이용 조건 확인 | — |
| <a id="resource-trae-ai"></a>[**Trae AI**](https://www.trae.ai/) · Web | 콘텐츠 제작을 위한 AI 플랫폼 | 이용 조건 확인 | — |
| <a id="resource-twill"></a>[**Twill**](https://twill.ai) · Web | PR을 제출하는 클라우드 기반 자율 코딩 에이전트 | 이용 조건 확인 | — |
| <a id="resource-vibe-compiler-vibec"></a>[**Vibe Compiler (vibec)**](https://github.com/Strawberry-Computer/vibe-compiler) | 프롬프트를 코드로 변환하는 자체 컴파일 도구 | 이용 조건 확인 | — |
| <a id="resource-void"></a>[**Void**](https://github.com/voideditor/void) · IDE | 자율 AI 코딩 기능을 갖춘 VS Code 포크 | 이용 조건 확인 | — |
| <a id="resource-windsurf"></a>[**Windsurf**](https://codeium.com/windsurf) · IDE | Codeium의 AI 네이티브 IDE, Cascade AI 및 다중 LLM 지원 | 이용 조건 확인 | — |
| <a id="resource-wingman-ai"></a>[**Wingman AI**](https://github.com/RussellCanfield/wingman-ai-vscode-extension) | Ollama, HuggingFace, OpenAI, Anthropic을 지원하는 VSCode 확장 | 이용 조건 확인 | — |
| <a id="resource-zed-ai"></a>[**Zed AI**](https://zed.dev/) · IDE | 네이티브 AI 어시스턴트를 통합한 고성능 편집기 | 이용 조건 확인 | — |
<!-- /catalog:code -->

<a id="apps"></a>
### 앱과 UI 프로토타이핑

설명이나 디자인을 바탕으로 첫 앱 또는 인터페이스를 만듭니다.

<!-- catalog:apps -->
| 리소스 | 활용 목적 | 이용 조건 | 검증일 |
|---|---|---|---|
| <a id="resource-appsmith"></a>[**Appsmith**](https://www.appsmith.com) · Web | 내부 도구를 구축하는 로우코드 플랫폼 | 이용 조건 확인 | — |
| <a id="resource-berrry"></a>[**Berrry**](https://berrry.app) · Web | 소셜 게시물을 웹 앱으로 변환 | 이용 조건 확인 | — |
| <a id="resource-bolt-diy"></a>[**Bolt.diy**](https://github.com/stackblitz-labs/bolt.diy) · Web | 개인 API 키 사용을 지원하는 Bolt.new 대안 | 이용 조건 확인 | — |
| <a id="resource-bolt-new"></a>[**Bolt.new**](https://bolt.new/) · Web | StackBlitz의 자연어 앱 빌딩 | 이용 조건 확인 | — |
| <a id="resource-buildship"></a>[**BuildShip**](https://buildship.com) · Web | 로우코드 노드를 갖춘 비주얼 AI 워크플로우 및 백엔드 빌더 | 이용 조건 확인 | — |
| <a id="resource-create-xyz"></a>[**Create.xyz**](https://create.xyz/) · Web | 자연어 프롬프트를 사용한 웹 앱 구축 | 이용 조건 확인 | — |
| <a id="resource-databutton"></a>[**Databutton**](https://databutton.com) · Web | Python 백엔드를 갖춘 AI 기반 풀스택 앱 빌더 | 이용 조건 확인 | — |
| <a id="resource-dyad"></a>[**Dyad**](https://github.com/dyad-sh/dyad) · Web | 로컬 오픈소스 AI 앱 빌더 (v0/Lovable/Bolt 대안) | 이용 조건 확인 | — |
| <a id="resource-emergent"></a>[**Emergent**](https://emergent.sh) · Web | 원클릭 배포와 커스텀 도메인을 지원하는 AI 풀스택 바이브 코딩 플랫폼 | 이용 조건 확인 | — |
| <a id="resource-figma-mcp"></a>[**Figma MCP**](https://github.com/figma/figma-developer-mcp) · MCP | 디자인 데이터를 UI 구현에 활용 | 이용 조건 확인 | — |
| <a id="resource-firebase-studio"></a>[**Firebase Studio**](https://firebase.studio) · Web | Gemini를 갖춘 Google의 AI 우선 브라우저 IDE, 구 Project IDX | 이용 조건 확인 | — |
| <a id="resource-github-spark"></a>[**GitHub Spark**](https://githubnext.com/projects/spark) · Web | GitHub Next가 개발한 자연어 마이크로 앱 빌더, 브라우저에서 실행 | 이용 조건 확인 | — |
| <a id="resource-hostinger-horizons"></a>[**Hostinger Horizons**](https://hostinger.com/horizons) · Web | 음성/텍스트/이미지 프롬프트와 내장 호스팅을 지원하는 AI 노코드 앱 빌더 | 이용 조건 확인 | — |
| <a id="resource-kombai"></a>[**Kombai**](https://kombai.com/) · Web | Figma 디자인을 코드로 변환하는 AI | 이용 조건 확인 | — |
| <a id="resource-lazy-ai"></a>[**Lazy AI**](https://www.getlazy.ai) · Web | 원클릭 클라우드 배포를 지원하는 채팅 기반 웹 앱 빌더 | 이용 조건 확인 | — |
| <a id="resource-lovable"></a>[**Lovable**](https://lovable.dev/) · Web | Supabase를 사용한 풀스택 앱 생성 | 이용 조건 확인 | — |
| <a id="resource-marblism"></a>[**Marblism**](https://marblism.com) · Web | 텍스트 프롬프트에서 풀스택 Next.js 앱을 생성하는 AI | 이용 조건 확인 | — |
| <a id="resource-onlook"></a>[**Onlook**](https://onlook.dev) · Web | AI 코드 생성을 지원하는 React/Next.js용 브라우저 기반 시각적 편집기 | 이용 조건 확인 | — |
| <a id="resource-openbolt-dev"></a>[**OpenBolt.dev**](https://openbolt.dev) · Web | 자체 호스팅과 맞춤 설정이 가능한 Bolt.new 대안 | 이용 조건 확인 | — |
| <a id="resource-playcode"></a>[**Playcode**](https://playcode.io/ai-website-builder) · Web | 시각적 편집, 호스팅, 커스텀 도메인, 원클릭 퍼블리싱을 지원하는 AI 웹사이트 및 앱 빌더 | 이용 조건 확인 | — |
| <a id="resource-rapidnative"></a>[**RapidNative**](https://rapidnative.com/) · Web | 스케치/텍스트 입력으로 React Native를 생성하는 AI 모바일 앱 빌더 | 이용 조건 확인 | — |
| <a id="resource-replit"></a>[**Replit**](https://replit.com/) · Web | Ghostwriter AI를 갖춘 브라우저 기반 IDE | 이용 조건 확인 | — |
| <a id="resource-rosebud-ai"></a>[**Rosebud AI**](https://rosebud.ai) · Web | 3D 게임과 인터랙티브 웹 앱을 위한 바이브 코딩 플랫폼 | 이용 조건 확인 | — |
| <a id="resource-subframe"></a>[**Subframe**](https://subframe.com) · Web | 깔끔한 React 컴포넌트 코드를 생성하는 AI 보조 UI 빌더 | 이용 조건 확인 | — |
| <a id="resource-tempo-labs"></a>[**Tempo Labs**](https://tempolabs.ai/) · Web | 시각적 편집기와 코드 내보내기를 갖춘 AI 기반 React UI 빌더 | 이용 조건 확인 | — |
| <a id="resource-v0"></a>[**v0**](https://v0.dev/) · Web | Vercel의 UI/React 생성 AI | 이용 조건 확인 | — |
| <a id="resource-vibekit-bot"></a>[**VibeKit.bot**](https://vibekit.bot) · Web | 앱별 지속적 AI 코딩 에이전트로 빌드, 호스팅(라이브 도메인), 지속적 개선을 수행하며 휴대폰이나 CLI로 구동; BYOK 또는 사용량 기반 과금 | 이용 조건 확인 | — |
<!-- /catalog:apps -->

<a id="context"></a>
### 컨텍스트, 명세와 통합

에이전트에 요구사항, 규칙, 문서와 연결된 프로젝트 데이터를 제공합니다.

<!-- catalog:context -->
| 리소스 | 활용 목적 | 이용 조건 | 검증일 |
|---|---|---|---|
| <a id="resource-anycrawl"></a>[**AnyCrawl**](https://github.com/any4ai/anycrawl-mcp-server) · MCP | 에이전트 컨텍스트에 사용할 웹사이트 콘텐츠 가져오기 | 이용 조건 확인 | — |
| <a id="resource-breaking-coding-chaos"></a>[**breaking-coding-chaos**](https://github.com/bo-cao/breaking-coding-chaos) | 휴먼-인-더-루프 이중 루프 제어 플레인 스킬 스위트 | 이용 조건 확인 | — |
| <a id="resource-caliber"></a>[**Caliber**](https://github.com/caliber-ai-org/ai-setup) | Claude Code, Cursor, Codex용 AI 에이전트 설정을 생성하고 동기화하는 CLI | 이용 조건 확인 | — |
| <a id="resource-chroma"></a>[**Chroma**](https://github.com/chroma-core/chroma-mcp) · MCP | 벡터 데이터베이스에서 컨텍스트 검색 | 이용 조건 확인 | — |
| <a id="resource-clickhouse"></a>[**ClickHouse**](https://github.com/ClickHouse/mcp-clickhouse) · MCP | ClickHouse 데이터 쿼리 및 확인 | 이용 조건 확인 | — |
| <a id="resource-composio-mcp"></a>[**Composio MCP**](https://github.com/ComposioHQ/composio) · MCP | 코딩 에이전트를 외부 서비스에 연결 | 이용 조건 확인 | — |
| <a id="resource-context7"></a>[**Context7**](https://github.com/upstash/context7) · MCP | 코딩 컨텍스트에 사용할 라이브러리 문서 검색 | 이용 조건 확인 | — |
| <a id="resource-everything-claude-code"></a>[**everything-claude-code**](https://github.com/serithemage/everything-claude-code) | Anthropic 해커톤 수상자의 실전 검증된 Claude Code 설정 (에이전트, 스킬, 훅, 커맨드) | 이용 조건 확인 | — |
| <a id="resource-exa-mcp"></a>[**Exa MCP**](https://github.com/exa-labs/exa-mcp-server) · MCP | 관련 참고 자료를 웹에서 검색 | 이용 조건 확인 | — |
| <a id="resource-excel"></a>[**Excel**](https://github.com/haris-musa/excel-mcp-server) · MCP | 스프레드시트 데이터 읽기 및 수정 | 이용 조건 확인 | — |
| <a id="resource-fetch"></a>[**Fetch**](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch) · MCP | 코딩 작업에 사용할 웹 콘텐츠 가져오기 | 이용 조건 확인 | — |
| <a id="resource-filesystem-mcp"></a>[**Filesystem MCP**](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) · MCP | 에이전트에 프로젝트 파일 접근 권한을 통제하여 제공 | 이용 조건 확인 | — |
| <a id="resource-firecrawl-mcp"></a>[**Firecrawl MCP**](https://github.com/mendableai/firecrawl-mcp-server) · MCP | 조사 및 컨텍스트 확보를 위한 웹 콘텐츠 추출 | 이용 조건 확인 | — |
| <a id="resource-git-mcp"></a>[**Git MCP**](https://github.com/modelcontextprotocol/servers/tree/main/src/git) · MCP | 저장소 이력과 변경 사항 읽기 | 이용 조건 확인 | — |
| <a id="resource-github-mcp"></a>[**GitHub MCP**](https://github.com/github/github-mcp-server) · MCP | 저장소·이슈·풀 리퀘스트 워크플로우 연결 | 이용 조건 확인 | — |
| <a id="resource-intent-engineering"></a>[**intent-engineering**](https://github.com/roboco-io/intent-engineering) | AI 실행을 통해 코드 대신 의도를 전달하는 운영 모델 | 이용 조건 확인 | — |
| <a id="resource-jira-mcp"></a>[**Jira MCP**](https://github.com/sooperset/mcp-atlassian) · MCP | Jira 이슈와 Confluence 프로젝트 컨텍스트 연결 | 이용 조건 확인 | — |
| <a id="resource-linear-mcp"></a>[**Linear MCP**](https://github.com/jerhadf/linear-mcp-server) · MCP | 프로젝트 이슈와 계획 컨텍스트 연결 | 이용 조건 확인 | — |
| <a id="resource-mongodb"></a>[**MongoDB**](https://github.com/mongodb-js/mongodb-mcp-server) · MCP | MongoDB 컬렉션 확인 및 쿼리 | 이용 조건 확인 | — |
| <a id="resource-mymir"></a>[**mymir**](https://github.com/FrkAk/mymir) | 컨텍스트 네트워크를 갖춘 AI 코딩 에이전트용 프로젝트 관리 레이어 | 이용 조건 확인 | — |
| <a id="resource-neon"></a>[**Neon**](https://github.com/neondatabase/mcp-server-neon) · MCP | 개발 워크플로우를 Neon 데이터베이스에 연결 | 이용 조건 확인 | — |
| <a id="resource-notion-mcp"></a>[**Notion MCP**](https://github.com/makenotion/notion-mcp-server) · MCP | 프로젝트 문서 검색 및 수정 | 이용 조건 확인 | — |
| <a id="resource-oh-my-claudecode"></a>[**oh-my-claudecode**](https://github.com/Yeachan-Heo/oh-my-claudecode) | 학습 곡선 제로의 Claude Code 멀티 에이전트 오케스트레이션 | 이용 조건 확인 | — |
| <a id="resource-openspec"></a>[**OpenSpec**](https://github.com/Fission-AI/OpenSpec) | AI 코딩 어시스턴트를 위한 스펙 기반 개발 프레임워크 | 이용 조건 확인 | — |
| <a id="resource-perplexity-mcp"></a>[**Perplexity MCP**](https://github.com/anthropics/mcp-perplexity) · MCP | 리서치 통합; 기재된 출처 검토 필요 | 이용 조건 확인 | — |
| <a id="resource-phind"></a>[**Phind**](https://www.phind.com) | 코드, 오류, 기술 Q&A를 위한 AI 기반 개발자 검색 엔진 | 이용 조건 확인 | — |
| <a id="resource-pieces-for-developers"></a>[**Pieces for Developers**](https://pieces.app/) | 자동 코드 스니펫 관리 및 컨텍스트를 갖춘 AI 어시스턴트 | 이용 조건 확인 | — |
| <a id="resource-roboco-cli"></a>[**roboco-cli**](https://github.com/roboco-io/roboco-cli) | Claude Code를 활용한 바이브 코딩을 위한 AI 네이티브 개발 스캐폴딩 시스템 | 이용 조건 확인 | — |
| <a id="resource-rube"></a>[**Rube**](https://github.com/ComposioHQ/Rube) · MCP | 저장소와 서비스 워크플로우 연결 | 이용 조건 확인 | — |
| <a id="resource-solar-mcp"></a>[**Solar MCP**](https://github.com/serithemage/solar-mcp) · MCP | 에이전트를 Upstage Solar 모델에 연결 | 이용 조건 확인 | — |
| <a id="resource-spec-workflow-mcp"></a>[**Spec Workflow MCP**](https://github.com/Pimzino/spec-workflow-mcp) · MCP | 명세와 체계적인 개발 단계 관리 | 이용 조건 확인 | — |
| <a id="resource-stripe-mcp"></a>[**Stripe MCP**](https://github.com/stripe/agent-toolkit) · MCP | 앱 개발 과정에서 결제 API 연결 | 이용 조건 확인 | — |
| <a id="resource-supabase"></a>[**Supabase**](https://github.com/supabase-community/supabase-mcp) · MCP | 스키마 확인, 쿼리 실행 및 마이그레이션 관리 | 이용 조건 확인 | — |
| <a id="resource-tavily"></a>[**Tavily**](https://github.com/tavily-ai/tavily-mcp) · MCP | 에이전트 작업에 필요한 웹 근거 수집 | 이용 조건 확인 | — |
| <a id="resource-vibe-coding-prompt-template"></a>[**vibe-coding-prompt-template**](https://github.com/KhazP/vibe-coding-prompt-template) · 템플릿 | 포괄적인 프롬프트 템플릿 | 이용 조건 확인 | — |
| <a id="resource-vibe-lead"></a>[**vibe-lead**](https://github.com/roboco-io/vibe-lead) | 조직에서 AI 기반 바이브 코딩 도입을 위한 변화 관리 프레임워크 | 이용 조건 확인 | — |
| <a id="resource-vibeworkflow-app"></a>[**vibeworkflow.app**](https://vibeworkflow.app) | Vibe coding을 위한 워크플로우 자동화 | 이용 조건 확인 | — |
<!-- /catalog:context -->

<a id="quality"></a>
### 테스트, 리뷰와 보안

동작을 확인하고, 생성된 변경 사항을 검토하며, 실패 원인을 진단합니다.

<!-- catalog:quality -->
| 리소스 | 활용 목적 | 이용 조건 | 검증일 |
|---|---|---|---|
| <a id="resource-agent-qa"></a>[**Agent QA**](https://github.com/vostride/agent-qa) · MCP | 자연어로 웹·모바일 테스트 작성 및 실행 | FSL-1.1-ALv2; 모델 비용 발생 | 2026-09-18 |
| <a id="resource-bito-ai"></a>[**Bito AI**](https://bito.ai) | VS Code 및 JetBrains IDE용 AI 코드 리뷰 및 생성 어시스턴트 | 이용 조건 확인 | — |
| <a id="resource-browserbase"></a>[**Browserbase**](https://github.com/browserbase/mcp-server-browserbase) · MCP | 클라우드에서 에이전트 기반 브라우저 워크플로우 실행 | 이용 조건 확인 | — |
| <a id="resource-chrome-mcp"></a>[**Chrome MCP**](https://github.com/hangwin/mcp-chrome) · MCP | 브라우저를 제어하여 앱 확인 및 테스트 | 이용 조건 확인 | — |
| <a id="resource-factory"></a>[**Factory**](https://factory.ai) | 자율 코드 리뷰, 테스트, PR 생성을 위한 AI Droids | 이용 조건 확인 | — |
| <a id="resource-micro-agent"></a>[**micro-agent**](https://github.com/BuilderIO/micro-agent) | 테스트가 통과할 때까지 TDD 방식으로 코드를 작성하고 반복 수정하는 CLI 도구 | 이용 조건 확인 | — |
| <a id="resource-mobile-mcp"></a>[**Mobile MCP**](https://github.com/mobile-next/mobile-mcp) · MCP | 모바일 앱 자동화 및 확인 | 이용 조건 확인 | — |
| <a id="resource-mutable-ai"></a>[**Mutable.ai**](https://mutable.ai/) | 자동 테스트, 문서화, 리팩토링을 위한 AI | 이용 조건 확인 | — |
| <a id="resource-playwright-mcp"></a>[**Playwright MCP**](https://github.com/executeautomation/mcp-playwright) · MCP | 브라우저 자동화 및 종단 간 검사 실행 | 이용 조건 확인 | — |
| <a id="resource-potpie"></a>[**Potpie**](https://github.com/potpie-ai/potpie) | 코드베이스 디버깅·테스트·코드 리뷰를 위한 AI 에이전트 | 이용 조건 확인 | — |
| <a id="resource-pr-agent"></a>[**PR-Agent**](https://github.com/Codium-ai/pr-agent) | 풀 리퀘스트 분석 및 리뷰를 자동화하는 AI 에이전트 | 이용 조건 확인 | — |
| <a id="resource-qodo"></a>[**Qodo**](https://www.qodo.ai) | AI 코드 리뷰 엔진 (구 CodiumAI) | 이용 조건 확인 | — |
| <a id="resource-semgrep"></a>[**Semgrep**](https://github.com/semgrep/mcp) · MCP | 코드의 보안 및 품질 문제 스캔 | 이용 조건 확인 | — |
| <a id="resource-sentry"></a>[**Sentry**](https://github.com/getsentry/sentry-mcp) · MCP | 앱 오류 확인 및 장애 진단 | 이용 조건 확인 | — |
| <a id="resource-vibe-ready"></a>[**vibe-ready**](https://github.com/roboco-io/vibe-ready-cli) | Claude Agent SDK를 활용하여 6개 카테고리 스코어링으로 리포지토리의 바이브 코딩 준비도를 분석하는 CLI 도구 | 이용 조건 확인 | — |
<!-- /catalog:quality -->

<a id="delivery"></a>
### 배포와 실행

적절한 실행 환경에서 코드를 빌드하고, 게시하거나 실행합니다.

<!-- catalog:delivery -->
| 리소스 | 활용 목적 | 이용 조건 | 검증일 |
|---|---|---|---|
| <a id="resource-cloudflare"></a>[**Cloudflare**](https://github.com/cloudflare/mcp-server-cloudflare) · MCP | 앱 배포 및 클라우드 리소스 관리 | 이용 조건 확인 | — |
| <a id="resource-e2b"></a>[**E2B**](https://github.com/e2b-dev/e2b) | 엔터프라이즈급 AI 에이전트를 위한 안전한 클라우드 샌드박스 환경 | 이용 조건 확인 | — |
| <a id="resource-e2b-mcp"></a>[**E2B MCP**](https://github.com/e2b-dev/mcp-server) · MCP | 격리된 샌드박스에서 에이전트가 생성한 코드 실행 | 이용 조건 확인 | — |
| <a id="resource-publish-my"></a>[**Publish.my**](https://publish.my/) · Web | 이메일 활성화를 사용하는 에이전트 기반 정적 사이트 게시 서비스 | 무료 티어; 정적 사이트만 지원 | 2026-09-18 |
| <a id="resource-serverless-openclaw"></a>[**serverless-openclaw**](https://github.com/serithemage/serverless-openclaw) | Web UI 및 Telegram 인터페이스를 갖춘 AWS 서버리스 인프라에서 OpenClaw AI 에이전트를 온디맨드로 실행 | 이용 조건 확인 | — |
| <a id="resource-vercel-mcp"></a>[**Vercel MCP**](https://github.com/vercel/mcp-adapter) · MCP | 배포 워크플로우를 Vercel에 연결 | 이용 조건 확인 | — |
| <a id="resource-xcode-build-mcp"></a>[**Xcode Build MCP**](https://github.com/cameroncooke/XcodeBuildMCP) · MCP | Apple 플랫폼 프로젝트 빌드 및 실행 | 이용 조건 확인 | — |
<!-- /catalog:delivery -->

<a id="operations"></a>
### 에이전트 작업 공간과 사용량

세션을 정리하고, 실행 내용을 확인하며, 사용량이나 이용 가능 상태를 파악합니다.

<!-- catalog:operations -->
| 리소스 | 활용 목적 | 이용 조건 | 검증일 |
|---|---|---|---|
| <a id="resource-agent-island"></a>[**Agent Island**](https://github.com/tristan666666/agent-island) · Desktop | macOS/Windows용 Claude Code/Codex 데스크탑 상태 컴패니언 | 이용 조건 확인 | — |
| <a id="resource-dev-janitor"></a>[**Dev Janitor**](https://github.com/cocojojo5213/Dev-Janitor) | AI 코딩 어시스턴트 및 의존성 관리를 위한 크로스 플랫폼 데스크탑 툴킷 | 이용 조건 확인 | — |
| <a id="resource-duckweed"></a>[**Duckweed**](https://github.com/MusicMaster4/Duckweed) · Desktop | 소스가 공개된 코딩 에이전트용 로컬 터미널 작업 공간 | 소스 공개; 모델 비용 확인 | 2026-09-18 |
| <a id="resource-gitpod"></a>[**Gitpod**](https://www.gitpod.io/) · Web | AI 지원 워크스페이스 자동화를 갖춘 클라우드 개발 환경 | 이용 조건 확인 | — |
| <a id="resource-intent"></a>[**Intent**](https://www.augmentcode.com/intent) | 명세를 기반으로 체계적인 감독을 제공하는 멀티 에이전트 오케스트레이션 작업 공간 | 이용 조건 확인 | — |
| <a id="resource-llm-log"></a>[**llm.log**](https://github.com/lanesket/llm.log) | AI 에이전트 API 호출을 캡처하는 로컬 프록시 — 토큰, 비용, 프롬프트, 지연 시간을 TUI 대시보드에서 확인 | 이용 조건 확인 | — |
| <a id="resource-nextreset"></a>[**NextReset**](https://nextreset.ai/) · Web | 비공식 Codex 사용량 초기화 이력과 브라우저에 로컬로 저장되는 카운트다운 | 무료; 비공식 | 2026-09-18 |
| <a id="resource-parallel-code"></a>[**Parallel Code**](https://github.com/johannesjo/parallel-code) · Desktop | 병렬 워크트리에서 AI 코딩 에이전트를 실행하는 데스크톱 앱 | 이용 조건 확인 | — |
| <a id="resource-superagent"></a>[**Superagent**](https://github.com/pungme/superagent-desktop) · Desktop | 코딩 에이전트, 브라우저 및 iOS 워크플로우를 위한 MIT 라이선스 macOS 앱 | MIT; 모델 비용 확인 | 2026-09-18 |
| <a id="resource-usage"></a>[**usage**](https://github.com/aqua5230/usage) · Desktop | Claude Code/Codex 할당량을 한눈에 보여주는 macOS 메뉴 바 앱 | 이용 조건 확인 | — |
| <a id="resource-vmux"></a>[**vmux**](https://github.com/roboco-io/vmux) | AI 코딩 에이전트를 위한 알림 및 세션 관리 기능이 있는 VS Code 터미널 확장 | 이용 조건 확인 | — |
| <a id="resource-warp"></a>[**Warp**](https://www.warp.dev) | 자연어 명령과 에이전트 모드를 갖춘 AI 네이티브 터미널 | 이용 조건 확인 | — |
<!-- /catalog:operations -->

<a id="learning"></a>
## 학습과 실습

달성하려는 목표에 따라 고르세요. 가이드, 영상, 논문, 템플릿 표시는 자료의 형식입니다. 사전 지식, 언어, 예상 소요 시간, API·구독 비용은 연결된 자료에서 확인하세요. 확인되지 않은 소요 시간을 임의로 적지 않습니다.

<a id="first-project"></a>
### 첫 프로젝트

환경 설정부터 결과물까지 순서대로 따라가세요. 각 자료에서 요구하는 사전 조건을 확인하고, 도구를 더 모으기 전에 작게나마 동작하는 앱 하나를 완성하세요.

| 리소스 | 활용 목적 | 이용 조건 | 검증일 |
|---|---|---|---|
| <a id="resource-ai-book-ai-coding"></a>[**AI Book: AI Coding**](https://aibook.ren/categories/ai-coding) · 가이드 | Cursor, Codex, Claude Code, Kiro를 활용한 코딩 에이전트 워크플로우, 도구 선택 및 실습에 대한 중국어 핸드북 | 접근 조건 확인 | — |
| <a id="resource-applighter"></a>[**AppLighter**](https://applighter.com/) · 템플릿 | AI 에이전트 워크플로우를 위한 CLAUDE.md, AGENTS.md, .cursorrules가 포함된 프로덕션 레디 React Native + Expo 템플릿 | 이용 조건 확인 | — |
| <a id="resource-vibe-coding-manual-roboco"></a>[**Vibe Coding Manual (Roboco)**](https://roboco.io/posts/vibe-coding-manual/) · 가이드 | 템플릿이 포함된 포괄적 가이드 | 접근 조건 확인 | — |
| <a id="resource-vibe-coding-tutorial-and-best-practices"></a>[**Vibe Coding Tutorial and Best Practices**](https://www.youtube.com/watch?v=YWwS911iLhg) · 영상 | Cursor/Windsurf의 AI agents | 접근 조건 확인 | — |
| <a id="resource-vibe-coding-with-confidence-mahmoud-zalt"></a>[**Vibe Coding with Confidence (Mahmoud Zalt)**](https://zalt.me/guides/vibe-coding) · 가이드 | AI 보조 앱의 구축·테스트·보안 강화·배포를 위한 핸드북 | 무료 열람 · 영어 | 2026-09-18 |

<a id="practical-guides"></a>
### 실전 워크플로우

이미 프로젝트가 있고 구체적인 문제를 해결해야 할 때 활용하세요.

| 작업 | 진행 순서 |
|---|---|
| 새 기능 | 목표와 완료 기준 → 컨텍스트 확인 → 작은 구현 → 리뷰와 테스트 |
| 리팩토링 | 현재 동작 기록 → 작은 변경 선택 → 동작 비교 → 반복 |
| 버그 수정 | 재현 → 가설 수립 → 회귀 검사 추가 → 수정과 검증 |
| 테스트 | 핵심 동작 파악 → 의미 있는 검사 선택 → 실행 및 실패 원인 확인 |

[전체 워크플로우와 프롬프트 템플릿](docs/workflows-and-templates.md)에는 세션 설정과 재사용 가능한 작업 절차가 있습니다. 요구사항과 결정 사항은 프로젝트 문서에 남기고, 필요에 따라 샌드박스를 사용하며, 보안에 민감한 변경 사항은 배포 전에 검토하세요.

| 리소스 | 활용 목적 | 이용 조건 | 검증일 |
|---|---|---|---|
| <a id="resource-12-best-practices-for-ai-coding-questera"></a>[**12 Best Practices for AI Coding (Questera)**](https://www.questera.ai/blogs/12-best-practices-to-use-ai-in-coding-in-2025) · 가이드 | 2025년 모범 사례 | 접근 조건 확인 | — |
| <a id="resource-agentic-coding-armin-ronacher"></a>[**Agentic Coding (Armin Ronacher)**](https://lucumr.pocoo.org/2025/6/12/agentic-coding/) · 가이드 | AI 기반 자율 개발 접근법 | 접근 조건 확인 | — |
| <a id="resource-ai-tool-showdown-japanese"></a>[**AI Tool Showdown (Japanese)**](https://www.youtube.com/watch?v=EQHXIVItNxs) · 영상 | Copilot vs Cursor vs 기타 | 접근 조건 확인 | — |
| <a id="resource-here-s-how-i-use-llms-to-help-me-write-code-simon-willison"></a>[**Here's how I use LLMs to help me write code (Simon Willison)**](https://simonwillison.net/2025/Mar/11/using-llms-for-code/) · 가이드 | 실용적인 통합 팁 | 접근 조건 확인 | — |
| <a id="resource-how-i-use-llms"></a>[**How I use LLMs**](https://www.youtube.com/watch?v=EWvNQjAaOHw) · 영상 | Andrej Karpathy의 가이드 | 접근 조건 확인 | — |
| <a id="resource-new-tools-for-building-agents"></a>[**New Tools for Building Agents**](https://www.youtube.com/watch?v=hciNKcLwSes) · 영상 | OpenAI의 에이전트 도구 | 접근 조건 확인 | — |
| <a id="resource-secure-vibe-coding-guide-csa"></a>[**Secure Vibe Coding Guide (CSA)**](https://cloudsecurityalliance.org/blog/2025/04/09/secure-vibe-coding-guide) · 가이드 | 보안 고려사항 | 접근 조건 확인 | — |
| <a id="resource-vibecodex"></a>[**vibecodex**](https://github.com/yerdaulet-damir/vibecodex) · 가이드 | 바이브 코딩을 위한 54가지 원칙을 담은 프로덕션 아키텍처 바이블 (FastAPI, Next.js, Go) | 접근 조건 확인 | — |
| <a id="resource-windsurf-90-of-your-code"></a>[**Windsurf: 90% of Your Code**](https://www.youtube.com/watch?v=bVNNvWq6dKo) · 영상 | 에이전트 IDE 심층 분석 | 접근 조건 확인 | — |

<a id="concepts-research"></a>
### 개념과 연구

작은 프로젝트를 시도한 뒤 도구의 원리를 이해하거나, 평가와 개발 방법을 더 깊이 살펴보세요.

[Vibe coding](https://en.wikipedia.org/wiki/Vibe_coding)은 자연어로 표현한 의도로 AI의 소프트웨어 생성을 이끄는 방식입니다. [Model Context Protocol](https://modelcontextprotocol.io/)은 에이전트를 도구와 데이터에 연결합니다. 코딩 에이전트, 기반 모델, 통합 도구는 각각 별개의 선택입니다. 하나를 바꾼다고 다른 것까지 자동으로 바뀌지는 않습니다.

| 리소스 | 활용 목적 | 이용 조건 | 검증일 |
|---|---|---|---|
| <a id="resource-a-review-on-vibe-coding"></a>[**A Review on Vibe Coding**](https://www.techrxiv.org/users/913189/articles/1292402) · 논문 | 기본 개념, 과제, 미래 방향 | 접근 조건 확인 | — |
| <a id="resource-context-engineering-intro-coleam00"></a>[**Context Engineering Intro (coleam00)**](https://github.com/coleam00/context-engineering-intro) · 가이드 | Claude Code를 사용하여 AI 코딩 어시스턴트를 효과적으로 작동시키는 방법 | 접근 조건 확인 | — |
| <a id="resource-mcp-in-10-minutes"></a>[**MCP in 10 Minutes**](https://www.youtube.com/watch?v=EswVjHZMn74) · 영상 | MCP 빠른 소개 | 접근 조건 확인 | — |
| <a id="resource-model-context-protocol-explained"></a>[**Model Context Protocol Explained**](https://www.youtube.com/watch?v=VChRPFUzJGA) · 영상 | MCP 기본 개념 | 접근 조건 확인 | — |
| <a id="resource-swe-agent-agent-computer-interfaces-enable-automated-software-engineering"></a>[**SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering**](https://arxiv.org/abs/2405.15793) · 논문 | Agent-Computer Interface를 사용하여 실제 버그를 수정하는 자율 에이전트 | 접근 조건 확인 | — |
| <a id="resource-swe-bench-can-language-models-resolve-real-world-github-issues"></a>[**SWE-bench: Can Language Models Resolve Real-World GitHub Issues?**](https://arxiv.org/abs/2310.06770) · 논문 | AI 코딩 에이전트 평가를 위한 표준 벤치마크 | 접근 조건 확인 | — |
| <a id="resource-the-model-context-protocol-guide-anthropic"></a>[**The Model Context Protocol Guide (Anthropic)**](https://modelcontextprotocol.io/introduction) · 가이드 | MCP 아키텍처 이해하기 | 접근 조건 확인 | — |
| <a id="resource-vibe-coding-and-ai-led-conversational-programming"></a>[**Vibe Coding and AI-Led Conversational Programming**](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5469367) · 논문 | 개발자-AI 상호작용 | 접근 조건 확인 | — |
| <a id="resource-vibe-coding-is-the-future"></a>[**Vibe Coding Is The Future**](https://www.youtube.com/watch?v=IACHfKmZMr8) · 영상 | Y Combinator의 vibe coding | 접근 조건 확인 | — |
| <a id="resource-vibe-coding-ai-voice-based-code-generation"></a>[**Vibe Coding: AI/Voice Based Code Generation**](https://papers.academic-conferences.org/index.php/icair/article/view/3975) · 논문 | 비개발자를 위한 연구 도구 | 접근 조건 확인 | — |
| <a id="resource-vibe-coding-toward-an-ai-native-paradigm"></a>[**Vibe Coding: Toward an AI-Native Paradigm**](https://arxiv.org/abs/2510.17842) · 논문 | 시맨틱 소프트웨어 개발 | 접근 조건 확인 | — |
| <a id="resource-vibecoding-is-here"></a>[**Vibecoding is Here**](https://www.youtube.com/watch?v=xxA-M3HrKrc) · 영상 | AI가 바꾸는 개발 | 접근 조건 확인 | — |
| <a id="resource-what-is-vibe-coding-ibm"></a>[**What is Vibe Coding? (IBM)**](https://www.ibm.com/think/topics/vibe-coding) · 가이드 | 기업 관점 | 접근 조건 확인 | — |

<details>
<summary>배경과 기원</summary>

> "완전히 분위기에 몸을 맡기고, 지수적 성장을 받아들이며, 코드가 존재한다는 사실조차 잊으세요."
> — Andrej Karpathy, 2025년 2월

![Vibe Coding Meme](images/vibecoding-meme.png)

학습과 실제 서비스 개발에서는 자연어 지시에 이해, 리뷰, 테스트, 결과에 대한 명확한 책임을 함께 갖추세요.

</details>

<a id="related-context"></a>
## 관련 플랫폼과 심화 분야

<details>
<summary>관련 AI 플랫폼과 전문 인프라 펼치기</summary>

기존 목록에서 가져온 이 항목들은 더 넓은 AI 활용, 개인 어시스턴트, 데이터 워크플로우 또는 전문 인프라를 다룹니다. 코딩 워크플로우에 직접 적합한지는 별도 검토가 필요합니다. 여기에 배치했다고 새로 추천하거나 검증한 것은 아닙니다.

| 리소스 | 활용 목적 | 이용 조건 | 검증일 |
|---|---|---|---|
| <a id="resource-5ire"></a>[**5ire**](https://github.com/nanbingxyz/5ire) · MCP | 로컬 지식과 MCP를 지원하는 데스크톱 AI 인터페이스 | 이용 조건 확인 | — |
| <a id="resource-alphacode"></a>[**AlphaCode**](https://alphacode.deepmind.com/) | DeepMind의 경쟁 프로그래밍 AI | 이용 조건 확인 | — |
| <a id="resource-autogpt"></a>[**AutoGPT**](https://github.com/Significant-Gravitas/AutoGPT) | 복잡한 코딩 작업을 위한 자율 AI 에이전트 | 이용 조건 확인 | — |
| <a id="resource-botmadang-mcp"></a>[**Botmadang MCP**](https://github.com/serithemage/botmadang-mcp) · MCP | 한국 AI 커뮤니티 플랫폼에 연결 | 이용 조건 확인 | — |
| <a id="resource-botpress"></a>[**Botpress**](https://botpress.com) · Web | LLM 기반 챗봇 개발 플랫폼 | 이용 조건 확인 | — |
| <a id="resource-chatgpt"></a>[**ChatGPT**](https://chat.openai.com/) | 관련 개발 또는 AI 플랫폼; 자신의 워크플로우에 맞는지 평가 필요 | 이용 조건 확인 | — |
| <a id="resource-cherry-studio"></a>[**Cherry Studio**](https://github.com/CherryHQ/cherry-studio) | 자율 코딩 및 300개 이상의 어시스턴트를 갖춘 AI Agent 데스크탑 | 이용 조건 확인 | — |
| <a id="resource-claude"></a>[**Claude**](https://claude.ai/) | 관련 개발 또는 AI 플랫폼; 자신의 워크플로우에 맞는지 평가 필요 | 이용 조건 확인 | — |
| <a id="resource-copilotkit"></a>[**CopilotKit**](https://github.com/CopilotKit/CopilotKit) | 채팅 및 생성 UI를 갖춘 AI 코파일럿 구축 프레임워크 | 이용 조건 확인 | — |
| <a id="resource-dify"></a>[**Dify**](https://github.com/langgenius/dify) · Web | LLM 기반 앱을 구축하고 배포하는 플랫폼 | 이용 조건 확인 | — |
| <a id="resource-duet-ai"></a>[**Duet AI**](https://workspace.google.com/solutions/ai/) · Web | Google Workspace AI 통합 | 이용 조건 확인 | — |
| <a id="resource-google-ai-studio"></a>[**Google AI Studio**](https://aistudio.google.com) · Web | Gemini 모델로 빌드 및 프로토타이핑을 위한 브라우저 IDE | 이용 조건 확인 | — |
| <a id="resource-hermes-agent"></a>[**Hermes Agent**](https://github.com/nousresearch/hermes-agent) | 지속 메모리와 스킬 생성을 지원하는 범용 AI 에이전트 | 이용 조건 확인 | — |
| <a id="resource-langflow"></a>[**Langflow**](https://github.com/langflow-ai/langflow) | AI 에이전트와 워크플로우를 시각적으로 구축하는 도구 | 이용 조건 확인 | — |
| <a id="resource-n8n"></a>[**n8n**](https://n8n.io/) | 관련 개발 또는 AI 플랫폼; 자신의 워크플로우에 맞는지 평가 필요 | 이용 조건 확인 | — |
| <a id="resource-open-webui"></a>[**Open WebUI**](https://github.com/open-webui/open-webui) | 로컬 및 호스팅 모델을 위한 자체 호스팅 AI 인터페이스 | 이용 조건 확인 | — |
| <a id="resource-openclaw"></a>[**OpenClaw**](https://github.com/openclaw/openclaw) | 자율 워크플로우와 로컬 실행을 지원하는 개인 AI 어시스턴트 | 이용 조건 확인 | — |
| <a id="resource-openmanus"></a>[**OpenManus**](https://github.com/mannaandpoem/OpenManus) | AI 보조 문서 작성을 위한 프레임워크 | 이용 조건 확인 | — |
| <a id="resource-openpaw"></a>[**OpenPaw**](https://github.com/daxaur/openpaw) | Claude Code를 38개 이상의 스킬을 갖춘 개인 어시스턴트로 확장하는 CLI 도구 | 이용 조건 확인 | — |
| <a id="resource-pulumi"></a>[**Pulumi**](https://www.pulumi.com/) | 관련 개발 또는 AI 플랫폼; 자신의 워크플로우에 맞는지 평가 필요 | 이용 조건 확인 | — |
| <a id="resource-serverless-autoresearch"></a>[**serverless-autoresearch**](https://github.com/roboco-io/serverless-autoresearch) | HUGI 패턴을 적용한 SageMaker Spot Training(H100)에서 Karpathy의 autoresearch를 병렬 진화시키는 파이프라인 | 이용 조건 확인 | — |
| <a id="resource-smol-ai-developer"></a>[**smol-ai developer**](https://github.com/smol-ai/developer) | 앱용 임베드 가능한 개발자 에이전트 라이브러리 | 이용 조건 확인 | — |
| <a id="resource-suna"></a>[**Suna**](https://github.com/kortix-ai/suna) | 개발 작업을 위한 브라우저·코드 실행·파일 시스템을 갖춘 범용 AI 에이전트 | 이용 조건 확인 | — |
| <a id="resource-terraform"></a>[**Terraform**](https://www.terraform.io/) | 관련 개발 또는 AI 플랫폼; 자신의 워크플로우에 맞는지 평가 필요 | 이용 조건 확인 | — |
| <a id="resource-wordware"></a>[**Wordware**](https://www.wordware.ai/) · Web | 개발자를 위한 노코드 AI 에이전트 빌더 | 이용 조건 확인 | — |
| <a id="resource-zapier"></a>[**Zapier**](https://zapier.com/) | 관련 개발 또는 AI 플랫폼; 자신의 워크플로우에 맞는지 평가 필요 | 이용 조건 확인 | — |

</details>

<a id="archive"></a>
## 과거 참고 자료

<details>
<summary>아카이브 상태가 확인된 구현 펼치기</summary>

이 항목들은 과거 참고 자료를 보존하기 위한 것이며 현재 입문용 추천이 아닙니다. 기존 OpenCode 저장소는 [Crush](#resource-crush)를 후속 프로젝트로 안내합니다. MCP 프로젝트의 [아카이브된 서버 목록](https://github.com/modelcontextprotocol/servers#archived)은 아래의 과거 참조 구현을 명시합니다. 해당 목록에서 아카이브된 소스나 후속 구현을 찾으세요.

| 리소스 | 활용 목적 | 이용 조건 | 검증일 |
|---|---|---|---|
| <a id="resource-brave-search-mcp-legacy"></a>[**Brave Search MCP (legacy)**](https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search) · MCP | 아카이브된 웹 검색 참조 구현 | 아카이브된 참조 구현 | 2026-09-18 |
| <a id="resource-github-mcp-legacy"></a>[**GitHub MCP (legacy)**](https://github.com/modelcontextprotocol/servers/tree/main/src/github) · MCP | 아카이브된 참조 구현; 유지보수 중인 GitHub 통합 사용 권장 | 아카이브된 참조 구현 | 2026-09-18 |
| <a id="resource-opencode"></a>[**opencode**](https://github.com/opencode-ai/opencode) | 아카이브된 저장소; 프로젝트는 Crush로 계속됨 | 아카이브됨 | 2026-09-18 |
| <a id="resource-postgresql-mcp-legacy"></a>[**PostgreSQL MCP (legacy)**](https://github.com/modelcontextprotocol/servers/tree/main/src/postgres) · MCP | 아카이브된 PostgreSQL 접근 참조 구현 | 아카이브된 참조 구현 | 2026-09-18 |
| <a id="resource-puppeteer-mcp-legacy"></a>[**Puppeteer MCP (legacy)**](https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer) · MCP | 아카이브된 브라우저 자동화 참조 구현 | 아카이브된 참조 구현 | 2026-09-18 |
| <a id="resource-slack-mcp-legacy"></a>[**Slack MCP (legacy)**](https://github.com/modelcontextprotocol/servers/tree/main/src/slack) · MCP | 아카이브된 Slack 접근 참조 구현 | 아카이브된 참조 구현 | 2026-09-18 |

</details>

<a id="community"></a>
## 커뮤니티와 관련 목록

커뮤니티에서 토론하고 새로운 도구를 발견한 뒤, 제품의 주장은 공식 출처로 확인하세요.

### 커뮤니티

- [r/vibecoding](https://reddit.com/r/vibecoding) — Vibe coding 전용 커뮤니티
- [r/ChatGPTCoding](https://reddit.com/r/ChatGPTCoding) — ChatGPT + 코딩 워크플로우
- [r/ClaudeAI](https://reddit.com/r/ClaudeAI) — Claude 및 Claude Code 토론
- [r/CursorAI](https://reddit.com/r/CursorAI) — Cursor IDE 워크플로우 및 팁
- [r/copilot](https://reddit.com/r/copilot) — GitHub Copilot 커뮤니티
- [r/Jetbrains](https://reddit.com/r/Jetbrains) — JetBrains IDE 및 AI Assistant
- [r/Tabnine](https://reddit.com/r/Tabnine) — Tabnine AI 자동 완성
- [r/continue_dev](https://reddit.com/r/continue_dev) — Continue.dev 오픈소스 어시스턴트
- [r/LocalLlama](https://reddit.com/r/LocalLlama) — 로컬 LLM 개발
- [r/replit](https://reddit.com/r/replit) — Replit 및 Ghostwriter 커뮤니티
- [Cursor Discord](https://discord.gg/cursor) — 워크플로우, 확장 프로그램, 프로젝트 쇼케이스
- [Lovable AI Discord](https://discord.gg/lovable) — 풀스택 앱 생성 공유
- [Bolt.new Discord](https://discord.gg/stackblitz) — 자연어 앱 빌딩 (StackBlitz)
- [v0 by Vercel Discord](https://discord.gg/vercel) — UI/React 생성 커뮤니티
- [Replit Discord](https://discord.gg/replit) — 멀티플레이어 vibe coding

### 관련 목록

- [awesome-vibe-coding](https://github.com/filipecalegario/awesome-vibe-coding) — Vibe coding 리소스를 선별한 또 다른 모음
- [awesome-code-ai](https://github.com/sourcegraph/awesome-code-ai) — Sourcegraph의 AI 코딩 도구
- [awesome-ai-assisted-coding](https://github.com/saviorand/awesome-ai-assisted-coding) — AI 보조 코딩 리소스
- [awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers) — Model Context Protocol 서버
- [awesome-chatgpt](https://github.com/humanloop/awesome-chatgpt) — ChatGPT 리소스
- [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) — Cursor IDE를 위한 커뮤니티 큐레이션 `.cursorrules` 파일
- [awesome-vibe-coding](https://github.com/taskade/awesome-vibe-coding) — Taskade의 245개 이상 Vibe Coding 도구, 플랫폼, 리소스

- [전체 MCP 서버 목록](https://github.com/wong2/awesome-mcp-servers) — 작업별로 선별한 이 목록 외의 통합도 찾아보세요.

<a id="contributing"></a>
<a id="contribution-guidelines"></a>
## 기여하기

[이슈로 리소스를 제안하세요](../../issues/new). 모든 추가 항목은 **직접적인 관련성, 확인 가능한 공개 근거, 고유한 가치, 투명한 이용 조건·주장, 유지보수 또는 실질적인 완성도** 기준을 통과해야 합니다. 유료 제품과 제작자의 직접 제출에도 같은 기준을 적용합니다. 이해관계와 주요 제한 사항을 공개하세요. GitHub stars 수만으로 등재가 보장되지는 않습니다.

[큐레이션 정책](docs/curation-policy.md)과 [기여 가이드](.github/CONTRIBUTING.md)를 읽어보세요. 기준을 명확히 충족하지 못하면 사유와 함께 반려하고, 불확실한 경우에는 이슈를 열어 두고 검토합니다. 승인된 변경은 영어·한국어·일본어에 동기화하며, 게시에 성공한 뒤에만 이슈를 닫습니다.

주간 및 이슈 워크플로우는 Kimi 또는 Qwen과 함께 [Pi](https://pi.dev/), [Exa Search](https://exa.ai/)를 사용합니다. 구현과 메인테이너 설정은 [자동화와 구성](docs/automation.md)에 설명되어 있습니다.

<a id="license"></a>
## 라이선스

이 문서는 [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)에 따라 퍼블릭 도메인에 제공됩니다. 연결된 프로젝트와 학습 자료에는 각자의 라이선스와 이용 조건이 적용됩니다.
