# Awesome Vibe Coding (한국어)

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Weekly Update](https://github.com/roboco-io/awesome-vibecoding/actions/workflows/weekly-update.yml/badge.svg)](https://github.com/roboco-io/awesome-vibecoding/actions/workflows/weekly-update.yml)
[![Maintained by Pi](https://img.shields.io/badge/Maintained%20by-Pi-blueviolet)](https://pi.dev/)
[![Issues Welcome](https://img.shields.io/badge/Issues-welcome-brightgreen.svg)](../../issues/new)
[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](https://creativecommons.org/publicdomain/zero/1.0/)

*Language: [English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md)*

**AI로 소프트웨어를 만드는 데** 필요한 출발점을 간결하게 선별하고 검토했습니다. 아래 핵심 도구는 **2026-09-18** 기준으로 실제 이용 가능한 제품·서비스와 이를 뒷받침하는 공식 근거가 확인되었습니다. 종료가 알려진 서비스, 아카이브된 구현, 확인이 끝나지 않은 항목은 이 목록에서 제외했습니다.

| 하고 싶은 일 | 시작할 곳 |
|---|---|
| 변경 사항 확인 | [최근 검증된 업데이트](#recent-updates) |
| 소프트웨어 개발·개선 | [작업별 도구 찾기](#tools) |
| 첫 프로젝트로 학습 | [시작하기](#start-here) · [학습과 실습](#learning) |

[코딩](#code) · [앱 & UI](#apps) · [컨텍스트 & 명세](#context) · [테스트 & 리뷰](#quality) · [배포 & 실행](#delivery) · [작업 공간 & 사용량](#operations) · [커뮤니티](#community)

<a id="recent-updates"></a>
<details>
<summary><strong>최근 검증된 업데이트</strong></summary>

지난 30일의 검토와 주요 변경 사항을 최신순으로 정리했습니다. 검토 날짜는 **제품 출시일이 아닙니다**. 확인한 내용은 [서비스 상태 검토와 근거](docs/lifecycle-review-2026-09-18.md)에 남깁니다.

<!-- recent-updates:start -->
| 검증일 | 업데이트 | 변경 사항 |
|---|---|---|
| 2026-09-18 | [Shep](#resource-shep) | 검토 후 추가: 격리된 Git worktree에서 여러 코딩 에이전트를 병렬 실행해 초안 PR까지 자동화하는 로컬 우선 오케스트레이터. |
| 2026-09-18 | [서비스 상태 정리](docs/lifecycle-review-2026-09-18.md) | 이용 불가·신규 사용자 접근 제한 항목 제거, 공식 제품명 수정, 핵심 도구 목록을 156개에서 40개로 축소. |
| 2026-09-18 | [Pi](#resource-pi) | 검토 후 추가: 다중 프로바이더 모델과 SDK를 갖춘 MIT 라이선스 확장형 터미널 코딩 에이전트. |
| 2026-09-18 | [NextReset](docs/verified-catalog.md#resource-nextreset) | 검토 후 추가: 비공식 공개 초기화 이력과 로컬 카운트다운; 예측의 정확성을 보증하지 않음. |
| 2026-09-18 | [Superagent](#resource-superagent) | 검토 후 추가: 브라우저 및 iOS 워크플로우를 지원하는 macOS 코딩 에이전트 작업 공간. |
| 2026-09-18 | [Publish.my](#resource-publish-my) | 검토 후 추가: 에이전트용 정적 사이트 게시; 이메일 활성화 필요. |
| 2026-09-18 | [Agent QA](#resource-agent-qa) | 검토 후 추가: 웹·모바일 테스트 워크플로우; FSL-1.1-ALv2 라이선스 명시. |
| 2026-09-18 | [Duckweed](#resource-duckweed) | 검토 후 추가: 코딩 에이전트용 로컬 터미널 작업 공간; 소스 공개 라이선스. |
| 2026-09-18 | [Vibe Coding with Confidence (Mahmoud Zalt)](#resource-vibe-coding-with-confidence-mahmoud-zalt) | 이용 조건 명확화: 기본 장은 무료, 심화 장은 유료. |
| 2026-09-18 | [opencode](docs/catalog-history.md#resource-opencode) | 상태 확인: 과거 저장소가 아카이브되었으며 Crush를 후속 프로젝트로 안내함. |
<!-- recent-updates:end -->

</details>

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

메인 페이지에는 작업별로 구별되는 소수의 출발점만 담았습니다. 인기 순위나 전체 목록은 아닙니다. [검증된 다른 선택지](docs/verified-catalog.md)도 확인할 수 있습니다. 각 리소스는 하나의 주된 분류에 배치했습니다. **CLI, IDE, Web, Desktop, MCP** 는 도구의 사용 방식을 나타내며 품질 순위가 아닙니다. 이 페이지에서 `MCP`를 검색하면 여러 작업에 걸친 프로토콜 통합을 찾을 수 있습니다.

**메타데이터 읽는 법:** 각 검증 날짜는 서비스 상태를 확인한 근거로 연결됩니다. 해당 날짜 기준으로 기재된 기능과 이용 범위를 확인했다는 뜻이며, 보안 감사나 향후 이용 가능성을 보장하지 않습니다. `요금 확인`은 현재 요금을 종합적으로 검토하지 않았다는 뜻입니다. 클라이언트가 오픈소스여도 모델 추론이 무료인 것은 아닙니다. 신규 사용자 제한과 유료 장은 명시합니다.

<a id="code"></a>
### 코딩과 편집

저장소를 이해하고, 기능을 구현하거나 기존 코드를 리팩토링합니다.

<!-- catalog:code -->
| 리소스 | 활용 목적 | 이용 조건·범위 | 검증일 |
|---|---|---|---|
| <a id="resource-aider"></a>[**Aider**](https://github.com/Aider-AI/aider) · CLI | 클라우드 또는 로컬 모델과 Git 통합을 활용하는 터미널 페어 프로그래밍 | 오픈소스 클라이언트; API 또는 로컬 모델 비용 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-aider) |
| <a id="resource-claude-code"></a>[**Claude Code**](https://code.claude.com/docs/en/overview) · CLI | 터미널 및 프로젝트 워크플로우를 지원하는 에이전트 기반 코딩 어시스턴트 | 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-claude-code) |
| <a id="resource-cline"></a>[**Cline**](https://github.com/cline/cline) | 파일·명령·브라우저 도구를 갖추고 IDE·터미널·데스크톱 워크플로우를 지원하는 코딩 에이전트 | 클라이언트와 모델 공급자 필요; 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-cline) |
| <a id="resource-cursor"></a>[**Cursor**](https://www.cursor.com/) · IDE | 구현·디버깅·코드 리뷰를 위한 코딩 편집기와 에이전트 | 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-cursor) |
| <a id="resource-gemini-cli"></a>[**Gemini CLI**](https://github.com/google-gemini/gemini-cli) · CLI | API 키, Vertex 또는 자격 요건을 충족하는 기업용 접근으로 사용하는 오픈소스 터미널 코딩 에이전트; 개인 구독을 통한 접근은 종료됨 | API·Vertex 또는 자격 요건을 충족하는 기업용 접근; 종료된 개인 구독 경로는 사용 불가 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-gemini-cli) |
| <a id="resource-github-copilot"></a>[**GitHub Copilot**](https://github.com/features/copilot) | GitHub 및 지원 IDE 전반에서 코딩 지원과 에이전트 워크플로우 제공 | 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-github-copilot) |
| <a id="resource-goose"></a>[**Goose**](https://github.com/aaif-goose/goose) · CLI | 코딩 워크플로우, 데스크톱·CLI 인터페이스, MCP 도구를 갖춘 확장 가능한 로컬 에이전트 | 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-goose) |
| <a id="resource-kiro"></a>[**Kiro**](https://kiro.dev) · IDE | IDE·CLI 워크플로우, 명세 및 테스트를 지원하는 AWS 코딩 에이전트 | 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-kiro) |
| <a id="resource-openai-codex-cli"></a>[**OpenAI Codex CLI**](https://openai.com/codex/) · CLI | 터미널에서 로컬로 실행되는 OpenAI 코딩 에이전트 | 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-openai-codex-cli) |
| <a id="resource-pi"></a>[**Pi**](https://github.com/earendil-works/pi) · CLI | 확장 가능한 터미널 코딩 에이전트와 다른 앱에 내장할 수 있는 실행 프레임워크 | MIT 클라이언트; 모델·공급자 이용 조건 별도 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-pi) |
<!-- /catalog:code -->

<a id="apps"></a>
### 앱과 UI 프로토타이핑

설명이나 디자인을 바탕으로 첫 앱 또는 인터페이스를 만듭니다.

<!-- catalog:apps -->
| 리소스 | 활용 목적 | 이용 조건·범위 | 검증일 |
|---|---|---|---|
| <a id="resource-bolt-new"></a>[**Bolt.new**](https://bolt.new/) · Web | StackBlitz의 자연어 앱 빌딩 | 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-bolt-new) |
| <a id="resource-dyad"></a>[**Dyad**](https://github.com/dyad-sh/dyad) · Desktop | 모델 공급자를 설정하여 로컬에서 앱 개발 | 요금 확인; 로컬 데스크톱 앱 및 모델 공급자 비용. | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-dyad) |
| <a id="resource-lovable"></a>[**Lovable**](https://lovable.dev/) · Web | Supabase를 사용한 풀스택 앱 생성 | 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-lovable) |
| <a id="resource-onlook"></a>[**Onlook**](https://www.onlook.com/) · Web | 코드 작업과 함께 앱 인터페이스를 시각적으로 편집 | 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-onlook) |
| <a id="resource-replit"></a>[**Replit**](https://replit.com/) · Web | Replit Agent로 앱을 개발하고 반복적으로 개선 | 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-replit) |
| <a id="resource-v0"></a>[**v0**](https://v0.app/) · Web | Vercel의 UI/React 생성 AI | 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-v0) |
<!-- /catalog:apps -->

<a id="context"></a>
### 컨텍스트, 명세와 통합

에이전트에 요구사항, 규칙, 문서와 연결된 프로젝트 데이터를 제공합니다.

<!-- catalog:context -->
| 리소스 | 활용 목적 | 이용 조건·범위 | 검증일 |
|---|---|---|---|
| <a id="resource-caliber"></a>[**Caliber**](https://github.com/caliber-ai-org/ai-setup) | Claude Code, Cursor, Codex용 AI 에이전트 설정을 생성하고 동기화하는 CLI | 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-caliber) |
| <a id="resource-context7"></a>[**Context7**](https://github.com/upstash/context7) · MCP | 코딩 컨텍스트에 사용할 라이브러리 문서 검색 | 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-context7) |
| <a id="resource-filesystem-mcp"></a>[**Filesystem MCP**](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) · MCP | 에이전트에 프로젝트 파일 접근 권한을 통제하여 제공 | 요금 확인; 참조 구현이며 실제 서비스에 바로 사용 가능한 수준을 보장하지 않음 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-filesystem-mcp) |
| <a id="resource-github-mcp"></a>[**GitHub MCP**](https://github.com/github/github-mcp-server) · MCP | 저장소·이슈·풀 리퀘스트 워크플로우 연결 | 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-github-mcp) |
| <a id="resource-neon"></a>[**Neon**](https://github.com/neondatabase/mcp-server-neon) · MCP | 개발 워크플로우를 Neon 데이터베이스에 연결 | 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-neon) |
| <a id="resource-notion-mcp"></a>[**Notion MCP**](https://developers.notion.com/guides/mcp/overview) · MCP | Notion 콘텐츠 검색·읽기·수정을 위한 공식 호스팅 MCP | 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-notion-mcp) |
| <a id="resource-openspec"></a>[**OpenSpec**](https://github.com/Fission-AI/OpenSpec) | AI 코딩 어시스턴트를 위한 스펙 기반 개발 프레임워크 | 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-openspec) |
| <a id="resource-supabase"></a>[**Supabase MCP**](https://github.com/supabase/mcp) · MCP | Supabase 스키마·쿼리·프로젝트 설정을 위한 공식 MCP | 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-supabase) |
<!-- /catalog:context -->

<a id="quality"></a>
### 테스트, 리뷰와 보안

동작을 확인하고, 생성된 변경 사항을 검토하며, 실패 원인을 진단합니다.

<!-- catalog:quality -->
| 리소스 | 활용 목적 | 이용 조건·범위 | 검증일 |
|---|---|---|---|
| <a id="resource-agent-qa"></a>[**Agent QA**](https://github.com/vostride/agent-qa) · MCP | 자연어로 웹·모바일 테스트 작성 및 실행 | FSL-1.1-ALv2; 소스 공개, 경쟁 용도 사용 제한; 모델 비용 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-agent-qa) |
| <a id="resource-playwright-mcp-official"></a>[**Playwright MCP (Microsoft)**](https://github.com/microsoft/playwright-mcp) · MCP | 구조화된 페이지 스냅샷을 활용하는 공식 브라우저 자동화 | Apache-2.0 클라이언트; 모델 이용 조건 별도 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-playwright-mcp-official) |
| <a id="resource-pr-agent"></a>[**PR-Agent**](https://github.com/The-PR-Agent/pr-agent) | Qodo와 별개로 커뮤니티가 유지보수하는 풀 리퀘스트 리뷰 도구 | 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-pr-agent) |
| <a id="resource-qodo"></a>[**Qodo**](https://www.qodo.ai) | AI 코드 리뷰 엔진 (구 CodiumAI) | 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-qodo) |
| <a id="resource-semgrep"></a>[**Semgrep MCP**](https://github.com/semgrep/semgrep/tree/develop/cli/src/semgrep/mcp) · MCP | 유지보수 중인 Semgrep CLI를 통한 MCP 보안 검사 | 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-semgrep) |
| <a id="resource-sentry"></a>[**Sentry**](https://github.com/getsentry/sentry-mcp) · MCP | 앱 오류 확인 및 장애 진단 | Functional Source License; 소스 공개; 호스팅 이용 조건 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-sentry) |
<!-- /catalog:quality -->

<a id="delivery"></a>
### 배포와 실행

적절한 실행 환경에서 코드를 빌드하고, 게시하거나 실행합니다.

<!-- catalog:delivery -->
| 리소스 | 활용 목적 | 이용 조건·범위 | 검증일 |
|---|---|---|---|
| <a id="resource-cloudflare"></a>[**Cloudflare**](https://github.com/cloudflare/mcp-server-cloudflare) · MCP | 앱 배포 및 클라우드 리소스 관리 | 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-cloudflare) |
| <a id="resource-e2b"></a>[**E2B**](https://github.com/e2b-dev/E2B) | 엔터프라이즈급 AI 에이전트를 위한 안전한 클라우드 샌드박스 환경 | 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-e2b) |
| <a id="resource-publish-my"></a>[**Publish.my**](https://publish.my/) · Web | 이메일 활성화를 사용하는 에이전트 기반 정적 사이트 게시 서비스 | 무료 티어; 정적 사이트만 지원; 이메일 활성화 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-publish-my) |
| <a id="resource-xcode-build-mcp"></a>[**XcodeBuildMCP**](https://github.com/getsentry/XcodeBuildMCP) · MCP | Apple 플랫폼 프로젝트의 빌드·실행·디버깅을 위한 CLI 및 MCP 도구 | 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-xcode-build-mcp) |
<!-- /catalog:delivery -->

<a id="operations"></a>
### 에이전트 작업 공간과 사용량

세션을 정리하고, 실행 내용을 확인하며, 사용량이나 이용 가능 상태를 파악합니다.

<!-- catalog:operations -->
| 리소스 | 활용 목적 | 이용 조건·범위 | 검증일 |
|---|---|---|---|
| <a id="resource-duckweed"></a>[**Duckweed**](https://github.com/MusicMaster4/Duckweed) · Desktop | 여러 운영체제를 지원하는 로컬 작업 공간에서 코딩 에이전트·셸·Git diff·세션 관리 | 소스 공개; 라이선스 확인; 모델·공급자 비용 별도 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-duckweed) |
| <a id="resource-llm-log"></a>[**llm.log**](https://github.com/lanesket/llm.log) | 로컬 프록시를 통해 모델 비용·토큰·요청 추적 정보 확인 | MIT; 모델·공급자 비용 별도 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-llm-log) |
| <a id="resource-parallel-code"></a>[**Parallel Code**](https://github.com/johannesjo/parallel-code) · Desktop | 격리된 Git worktree에서 코딩 에이전트를 실행하고 변경 사항 검토 | MIT; 모델·공급자 비용 별도 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-parallel-code) |
| <a id="resource-shep"></a>[**Shep**](https://github.com/shep-ai/shep) · CLI | 격리된 Git worktree에서 여러 코딩 에이전트를 병렬 실행하고 커밋·푸시·CI 감시·초안 PR까지 자동화 | MIT 클라이언트; 에이전트 구독 또는 API 비용 별도 | 2026-09-18 |
| <a id="resource-superagent"></a>[**Superagent**](https://github.com/pungme/superagent-desktop) · Desktop | 브라우저 및 iOS 도구를 갖춘 macOS 작업 공간에서 Claude Code 또는 Codex 사용 | MIT; macOS Apple Silicon; 모델 구독 별도 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-superagent) |
| <a id="resource-usage"></a>[**usage**](https://github.com/aqua5230/usage) · Desktop | macOS 메뉴 막대 또는 Windows 시스템 트레이에서 코딩 에이전트 사용 한도 확인 | AGPL-3.0; 모델·공급자 비용 별도 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-usage) |
| <a id="resource-warp"></a>[**Warp Terminal**](https://www.warp.dev/terminal) | 에이전트 중심 터미널 사용 및 코딩 워크플로우 확인 | 터미널 다운로드; AI 사용 요금 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-warp) |
<!-- /catalog:operations -->

<a id="learning"></a>
## 학습과 실습

달성하려는 목표에 따라 고르세요. 가이드와 논문 표시는 자료의 형식입니다. 오래된 개념 자료도 유용할 수 있지만, 과거 도구 예시와 벤치마크 순위는 현재 제품에 대한 조언이 아닙니다. 시작하기 전에 언어, 사전 지식, 유료 부분을 확인하세요. 과거 영상과 추가 읽을거리는 확장 목록에 있습니다.

<a id="first-project"></a>
### 첫 프로젝트

환경 설정부터 결과물까지 순서대로 따라가세요. 각 자료에서 요구하는 사전 조건을 확인하고, 도구를 더 모으기 전에 작게나마 동작하는 앱 하나를 완성하세요.

| 리소스 | 활용 목적 | 이용 조건·범위 | 검증일 |
|---|---|---|---|
| <a id="resource-ai-book-ai-coding"></a>[**AI Book: AI Coding**](https://aibook.ren/categories/ai-coding) · 가이드 | Cursor, Codex, Claude Code, Kiro를 활용한 코딩 에이전트 워크플로우, 도구 선택 및 실습에 대한 중국어 핸드북 | 무료 열람; 재사용 조건 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-ai-book-ai-coding) |
| <a id="resource-vibe-coding-manual-roboco"></a>[**Vibe Coding Manual (Roboco)**](https://roboco.io/posts/vibe-coding-manual/) · 가이드 | 한국어 워크플로우 및 프로젝트 규칙 템플릿; 예시는 작성 당시 기준 | 무료 열람; 재사용 조건 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-vibe-coding-manual-roboco) |
| <a id="resource-vibe-coding-with-confidence-mahmoud-zalt"></a>[**Vibe Coding with Confidence (Mahmoud Zalt)**](https://zalt.me/guides/vibe-coding) · 가이드 | 입문 장을 읽을 수 있고 심화 자료는 유료로 제공하는 개발 핸드북 | 기본 장 무료; 심화 장 유료; 영어 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-vibe-coding-with-confidence-mahmoud-zalt) |

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

| 리소스 | 활용 목적 | 이용 조건·범위 | 검증일 |
|---|---|---|---|
| <a id="resource-agentic-coding-armin-ronacher"></a>[**Agentic Coding Recommendations (Armin Ronacher)**](https://lucumr.pocoo.org/2025/6/12/agentic-coding/) · 가이드 | 실용적인 에이전트 워크플로우와 테스트 조언; 2025년 실무자 관점 | 무료 열람; 재사용 조건 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-agentic-coding-armin-ronacher) |
| <a id="resource-here-s-how-i-use-llms-to-help-me-write-code-simon-willison"></a>[**Here's how I use LLMs to help me write code (Simon Willison)**](https://simonwillison.net/2025/Mar/11/using-llms-for-code/) · 가이드 | 반복적인 코딩 및 QA 방법; 도구 예시는 2025년 당시 기준 | 무료 열람; 재사용 조건 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-here-s-how-i-use-llms-to-help-me-write-code-simon-willison) |
| <a id="resource-secure-vibe-coding-guide-csa"></a>[**Secure Vibe Coding Guide (CSA)**](https://cloudsecurityalliance.org/blog/2025/04/09/secure-vibe-coding-guide) · 가이드 | 비밀 정보·인가·검증·리뷰를 다루는 보안 체크리스트 | 무료 열람; 재사용 조건 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-secure-vibe-coding-guide-csa) |

<a id="concepts-research"></a>
### 개념과 연구

작은 프로젝트를 시도한 뒤 도구의 원리를 이해하거나, 평가와 개발 방법을 더 깊이 살펴보세요.

[Vibe coding](https://en.wikipedia.org/wiki/Vibe_coding)은 자연어로 표현한 의도로 AI의 소프트웨어 생성을 이끄는 방식입니다. [Model Context Protocol](https://modelcontextprotocol.io/)은 에이전트를 도구와 데이터에 연결합니다. 코딩 에이전트, 기반 모델, 통합 도구는 각각 별개의 선택입니다. 하나를 바꾼다고 다른 것까지 자동으로 바뀌지는 않습니다.

| 리소스 | 활용 목적 | 이용 조건·범위 | 검증일 |
|---|---|---|---|
| <a id="resource-context-engineering-intro-coleam00"></a>[**Context Engineering Intro (coleam00)**](https://github.com/coleam00/context-engineering-intro) · 가이드 | 코딩 에이전트를 위한 프로젝트 컨텍스트와 지침 예시 | 무료 열람; 재사용 조건 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-context-engineering-intro-coleam00) |
| <a id="resource-the-model-context-protocol-guide-anthropic"></a>[**Model Context Protocol documentation**](https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro) · 가이드 | 현재 MCP 아키텍처와 통합을 설명하는 공식 입문 문서 | 무료 열람; 재사용 조건 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-the-model-context-protocol-guide-anthropic) |
| <a id="resource-swe-agent-agent-computer-interfaces-enable-automated-software-engineering"></a>[**SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering**](https://arxiv.org/abs/2405.15793) · 논문 | Agent-Computer Interface를 사용하여 실제 버그를 수정하는 자율 에이전트 | 무료 열람; 재사용 조건 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-swe-agent-agent-computer-interfaces-enable-automated-software-engineering) |
| <a id="resource-swe-bench-can-language-models-resolve-real-world-github-issues"></a>[**SWE-bench: Can Language Models Resolve Real-World GitHub Issues?**](https://arxiv.org/abs/2310.06770) · 논문 | AI 코딩 에이전트 평가를 위한 표준 벤치마크 | 무료 열람; 재사용 조건 확인 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-swe-bench-can-language-models-resolve-real-world-github-issues) |

<details>
<summary>배경과 기원</summary>

> "완전히 분위기에 몸을 맡기고, 지수적 성장을 받아들이며, 코드가 존재한다는 사실조차 잊으세요."
> — Andrej Karpathy, 2025년 2월

![Vibe Coding Meme](images/vibecoding-meme.png)

학습과 실제 서비스 개발에서는 자연어 지시에 이해, 리뷰, 테스트, 결과에 대한 명확한 책임을 함께 갖추세요.

</details>

<a id="community"></a>
## 더 많은 선택지와 지원

- [추가 검증 리소스](docs/verified-catalog.md) — 핵심 목록 외의 현재 이용 가능한 대안과 과거에 작성된 학습 자료.
- [서비스 상태 근거와 검토 결정](docs/lifecycle-review-2026-09-18.md) — 출처, 이용 범위의 제한, 현재 공식 명칭.
- [제거·대체·미검증 항목](docs/catalog-history.md) — 현재 추천이 아닌 이력과 사유.
- 제품 지원은 각 리소스의 근거 기록에 연결된 공식 문서를 이용하세요. 상태 변경이나 정정 사항은 [저장소 이슈](../../issues/new)로 알려주세요.

<a id="contributing"></a>
<a id="contribution-guidelines"></a>
## 기여하기

[이슈로 리소스를 제안하세요](../../issues/new). 모든 추가 항목은 **직접적인 관련성, 확인 가능한 공개 근거, 고유한 가치, 투명한 이용 조건·주장, 유지보수 또는 실질적인 완성도** 기준을 통과해야 합니다. 유료 제품과 제작자의 직접 제출에도 같은 기준을 적용합니다. 이해관계와 주요 제한 사항을 공개하세요. GitHub stars 수만으로 등재가 보장되지는 않습니다.

[큐레이션 정책](docs/curation-policy.md)과 [기여 가이드](.github/CONTRIBUTING.md)를 읽어보세요. 기준을 명확히 충족하지 못하면 사유와 함께 반려하고, 불확실한 경우에는 이슈를 열어 두고 검토합니다. 승인된 변경은 영어·한국어·일본어에 동기화하며, 게시에 성공한 뒤에만 이슈를 닫습니다.

주간 및 이슈 워크플로우는 Kimi 또는 Qwen과 함께 [Pi](https://pi.dev/), [Exa Search](https://exa.ai/)를 사용합니다. 구현과 메인테이너 설정은 [자동화와 구성](docs/automation.md)에 설명되어 있습니다.

<a id="license"></a>
## 라이선스

이 문서는 [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)에 따라 퍼블릭 도메인에 제공됩니다. 연결된 프로젝트와 학습 자료에는 각자의 라이선스와 이용 조건이 적용됩니다.
