# Awesome Vibe Coding (日本語)

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Weekly Update](https://github.com/roboco-io/awesome-vibecoding/actions/workflows/weekly-update.yml/badge.svg)](https://github.com/roboco-io/awesome-vibecoding/actions/workflows/weekly-update.yml)
[![Maintained by Pi](https://img.shields.io/badge/Maintained%20by-Pi-blueviolet)](https://pi.dev/)
[![Issues Welcome](https://img.shields.io/badge/Issues-welcome-brightgreen.svg)](../../issues/new)
[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](https://creativecommons.org/publicdomain/zero/1.0/)

*Language: [English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md)*

**AIでソフトウェアを作る**ための、レビュー済みの簡潔な入門リストです。以下の主要ツールは **2026-09-18** 時点で利用可能なサービスや実装があり、提供元の一次情報による裏付けを確認しています。終了が判明したもの、アーカイブ済みの実装、未確認事項が残る項目はこの候補一覧から除外しています。

| やりたいこと | 入口 |
|---|---|
| 変更点を見る | [最近の確認済み更新](#recent-updates) |
| ソフトウェアを作る・改善する | [目的別にツールを探す](#tools) |
| 最初のプロジェクトで学ぶ | [はじめに](#start-here) · [学習と実践](#learning) |

[コード](#code) · [アプリ・UI](#apps) · [コンテキスト・仕様](#context) · [テスト・レビュー](#quality) · [デプロイ・実行](#delivery) · [ワークスペース・使用状況](#operations) · [コミュニティ](#community)

<a id="recent-updates"></a>
<details>
<summary><strong>最近の確認済み更新</strong></summary>

過去30日間のレビューと重要な変更を新しい順に掲載しています。確認日は **製品のリリース日ではありません**。[提供状況のレビューと根拠](docs/lifecycle-review-2026-09-18.md)に確認内容を記録しています。

<!-- recent-updates:start -->
| 確認日 | 更新項目 | 変更内容 |
|---|---|---|
| 2026-09-18 | [提供状況に基づく整理](docs/lifecycle-review-2026-09-18.md) | 利用できない項目や新規利用できない項目を除外し、正式な製品情報を修正。主要ツールを156件から40件に絞りました。 |
| 2026-09-18 | [Pi](#resource-pi) | レビュー後に追加：マルチプロバイダーモデルとSDKを備えたMITライセンスの拡張型ターミナルコーディングエージェント。 |
| 2026-09-18 | [NextReset](docs/verified-catalog.md#resource-nextreset) | レビュー後に追加：非公式の公開リセット履歴とローカルのカウントダウン。予測の正確性を保証するものではありません。 |
| 2026-09-18 | [Superagent](#resource-superagent) | レビュー後に追加：ブラウザとiOSのワークフローに対応したmacOS用コーディングエージェントワークスペース。 |
| 2026-09-18 | [Publish.my](#resource-publish-my) | レビュー後に追加：エージェント向け静的サイト公開サービス。メールによる利用開始手続きが必要です。 |
| 2026-09-18 | [Agent QA](#resource-agent-qa) | レビュー後に追加：Web・モバイルのテストワークフロー。FSL-1.1-ALv2ライセンスを明記しています。 |
| 2026-09-18 | [Duckweed](#resource-duckweed) | レビュー後に追加：コーディングエージェント用ローカルターミナルワークスペース。ソース公開ライセンスを採用しています。 |
| 2026-09-18 | [Vibe Coding with Confidence (Mahmoud Zalt)](#resource-vibe-coding-with-confidence-mahmoud-zalt) | 利用条件を明確化：基本章は無料、上級章は有料です。 |
| 2026-09-18 | [opencode](docs/catalog-history.md#resource-opencode) | 状態を確認：旧リポジトリはアーカイブ済みで、Crushを案内しています。 |
<!-- recent-updates:end -->

</details>

<a id="start-here"></a>
## はじめに

**開発が初めての方：** 小さなプロジェクトを一つ選び、Gitで変更を保存する方法を学び、一機能ずつテストしましょう。プロジェクトフォルダを開き、選んだチュートリアルのコマンドを実行できることが前提です。不慣れな場合は、その教材の環境構築の章から始めてください。

1. [最初のプロジェクト向けガイド](#first-project)を読み、ローカルのタスク一覧など、自分で説明できる成果物を選びます。
2. [コーディングアシスタント](#code)か[アプリ試作ツール](#apps)を一つ選びます。無料のクライアントでも、有料モデル、サブスクリプション、APIキーが必要な場合があるため、先に利用条件を確認してください。
3. 短い目標と受け入れ条件を書きます。小さく実装し、変更を確認してテストを実行し、Gitに区切りとして保存します。
4. 公開前に[テスト・レビューツール](#quality)を使います。認証情報をプロンプトやコミットに含めず、利用する生成コードの内容を理解してください。
5. [ホスティング・実行環境の制約](#delivery)、特にバックエンドの必要性を確認してからデプロイします。

**開発経験のある方：** 上の目的別リンクから移動し、計画、リファクタリング、デバッグ、検証に[実践ワークフロー](#practical-guides)を活用してください。

<a id="tools"></a>
## 目的別にツールを探す

メインページには各用途の入口となる候補を少数ずつ掲載しています。人気ランキングや網羅的な一覧ではありません。[その他の確認済み候補](docs/verified-catalog.md)も参照できます。各リソースは主な用途の一か所に掲載しています。**CLI、IDE、Web、Desktop、MCP** は利用形態を示し、品質の順位ではありません。このページで `MCP` を検索すると、用途をまたいで連携機能を探せます。

**メタデータの読み方：** 各確認日から提供状況の根拠へ移動できます。その日時点で記載した機能と利用可能な範囲を確認したものであり、セキュリティ監査や将来の提供を保証するものではありません。`料金を要確認` は現行料金を網羅的には確認していないことを示します。クライアントがオープンソースでも、モデルの推論が無料になるわけではありません。新規利用の制限や有料の章は明記しています。

<a id="code"></a>
### コード作成・編集

リポジトリを理解し、機能を実装し、既存コードをリファクタリングします。

<!-- catalog:code -->
| リソース | 用途 | 利用方法・範囲 | 確認日 |
|---|---|---|---|
| <a id="resource-aider"></a>[**Aider**](https://github.com/Aider-AI/aider) · CLI | クラウドまたはローカルモデルとGit連携を使ったターミナルでのペアプログラミング | オープンソースのクライアント；APIまたはローカルモデルの費用あり | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-aider) |
| <a id="resource-claude-code"></a>[**Claude Code**](https://code.claude.com/docs/en/overview) · CLI | ターミナルとプロジェクトのワークフローを備えたエージェント型コーディングアシスタント | 料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-claude-code) |
| <a id="resource-cline"></a>[**Cline**](https://github.com/cline/cline) | ファイル、コマンド、ブラウザのツールを備えた、IDE・ターミナル・デスクトップ向けコーディングエージェント | クライアントとモデルプロバイダーを利用；料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-cline) |
| <a id="resource-cursor"></a>[**Cursor**](https://www.cursor.com/) · IDE | 実装、デバッグ、コードレビュー向けのコーディングエディタとエージェント | 料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-cursor) |
| <a id="resource-gemini-cli"></a>[**Gemini CLI**](https://github.com/google-gemini/gemini-cli) · CLI | APIキー、Vertex、または対象のエンタープライズ契約で利用できるオープンソースのターミナルコーディングエージェント。個人向けサブスクリプション経由の利用は終了 | API・Vertexまたは対象のエンタープライズ契約；終了した個人向け経路は利用不可 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-gemini-cli) |
| <a id="resource-github-copilot"></a>[**GitHub Copilot**](https://github.com/features/copilot) | GitHubと対応IDEで利用できるコーディング支援とエージェントワークフロー | 料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-github-copilot) |
| <a id="resource-goose"></a>[**Goose**](https://github.com/aaif-goose/goose) · CLI | コーディングワークフロー、デスクトップ・CLIインターフェース、MCPツールを備えた拡張可能なローカルエージェント | 料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-goose) |
| <a id="resource-kiro"></a>[**Kiro**](https://kiro.dev) · IDE | IDE・CLIワークフロー、仕様、テストに対応するAWSのコーディングエージェント | 料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-kiro) |
| <a id="resource-openai-codex-cli"></a>[**OpenAI Codex CLI**](https://openai.com/codex/) · CLI | ターミナルでローカル実行するOpenAIのコーディングエージェント | 料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-openai-codex-cli) |
| <a id="resource-pi"></a>[**Pi**](https://github.com/earendil-works/pi) · CLI | 拡張可能なターミナルコーディングエージェントと組み込み用の実行基盤 | MITクライアント；モデル・プロバイダーの利用条件は別途 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-pi) |
<!-- /catalog:code -->

<a id="apps"></a>
### アプリ・UIの試作

説明やデザインから最初のアプリやインターフェースを作ります。

<!-- catalog:apps -->
| リソース | 用途 | 利用方法・範囲 | 確認日 |
|---|---|---|---|
| <a id="resource-bolt-new"></a>[**Bolt.new**](https://bolt.new/) · Web | StackBlitzによる自然言語アプリ構築 | 料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-bolt-new) |
| <a id="resource-dyad"></a>[**Dyad**](https://github.com/dyad-sh/dyad) · Desktop | モデルプロバイダーを設定してローカルでアプリを構築 | 料金を要確認；ローカルデスクトップアプリとモデルプロバイダーの費用 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-dyad) |
| <a id="resource-lovable"></a>[**Lovable**](https://lovable.dev/) · Web | Supabaseを使用したフルスタックアプリ生成 | 料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-lovable) |
| <a id="resource-onlook"></a>[**Onlook**](https://www.onlook.com/) · Web | コードを扱いながらアプリのインターフェースを視覚的に編集 | 料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-onlook) |
| <a id="resource-replit"></a>[**Replit**](https://replit.com/) · Web | Replit Agentでアプリを構築し、反復改善 | 料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-replit) |
| <a id="resource-v0"></a>[**v0**](https://v0.app/) · Web | VercelのUI/React生成AI | 料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-v0) |
<!-- /catalog:apps -->

<a id="context"></a>
### コンテキスト・仕様・連携

要件、ルール、ドキュメント、連携先のプロジェクトデータをエージェントに提供します。

<!-- catalog:context -->
| リソース | 用途 | 利用方法・範囲 | 確認日 |
|---|---|---|---|
| <a id="resource-caliber"></a>[**Caliber**](https://github.com/caliber-ai-org/ai-setup) | Claude Code、Cursor、Codex向けのAIエージェント設定を生成・同期するCLI | 料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-caliber) |
| <a id="resource-context7"></a>[**Context7**](https://github.com/upstash/context7) · MCP | コーディングのコンテキスト用にライブラリのドキュメントを取得 | 料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-context7) |
| <a id="resource-filesystem-mcp"></a>[**Filesystem MCP**](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) · MCP | エージェントにプロジェクトファイルへの制御されたアクセスを提供 | 料金を要確認；参照実装であり、本番利用への適合性を保証するものではない | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-filesystem-mcp) |
| <a id="resource-github-mcp"></a>[**GitHub MCP**](https://github.com/github/github-mcp-server) · MCP | リポジトリ、Issue、プルリクエストのワークフローを接続 | 料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-github-mcp) |
| <a id="resource-neon"></a>[**Neon**](https://github.com/neondatabase/mcp-server-neon) · MCP | 開発ワークフローをNeonデータベースに接続 | 料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-neon) |
| <a id="resource-notion-mcp"></a>[**Notion MCP**](https://developers.notion.com/guides/mcp/overview) · MCP | Notionコンテンツの検索・読み取り・更新用の公式ホスト型MCP | 料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-notion-mcp) |
| <a id="resource-openspec"></a>[**OpenSpec**](https://github.com/Fission-AI/OpenSpec) | AIコーディングアシスタント向けのスペック駆動開発フレームワーク | 料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-openspec) |
| <a id="resource-supabase"></a>[**Supabase MCP**](https://github.com/supabase/mcp) · MCP | Supabaseのスキーマ、クエリ、プロジェクト設定用の公式MCP | 料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-supabase) |
<!-- /catalog:context -->

<a id="quality"></a>
### テスト・レビュー・セキュリティ

動作を確認し、生成された変更をレビューして、障害を診断します。

<!-- catalog:quality -->
| リソース | 用途 | 利用方法・範囲 | 確認日 |
|---|---|---|---|
| <a id="resource-agent-qa"></a>[**Agent QA**](https://github.com/vostride/agent-qa) · MCP | 自然言語でWeb・モバイルテストを作成・実行 | FSL-1.1-ALv2；競合用途を制限したソース公開；モデル利用料あり | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-agent-qa) |
| <a id="resource-playwright-mcp-official"></a>[**Playwright MCP (Microsoft)**](https://github.com/microsoft/playwright-mcp) · MCP | 構造化されたページスナップショットによる公式ブラウザ自動化 | Apache-2.0クライアント；モデルの利用条件は別途 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-playwright-mcp-official) |
| <a id="resource-pr-agent"></a>[**PR-Agent**](https://github.com/The-PR-Agent/pr-agent) | Qodoとは別にコミュニティが保守するプルリクエストレビューツール | 料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-pr-agent) |
| <a id="resource-qodo"></a>[**Qodo**](https://www.qodo.ai) | AIコードレビューエンジン（旧CodiumAI） | 料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-qodo) |
| <a id="resource-semgrep"></a>[**Semgrep MCP**](https://github.com/semgrep/semgrep/tree/develop/cli/src/semgrep/mcp) · MCP | 保守されているSemgrep CLIを通じたMCPセキュリティスキャン | 料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-semgrep) |
| <a id="resource-sentry"></a>[**Sentry**](https://github.com/getsentry/sentry-mcp) · MCP | アプリのエラーを確認し、障害を診断 | Functional Source License；ソース公開；ホスト型サービスの条件を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-sentry) |
<!-- /catalog:quality -->

<a id="delivery"></a>
### デプロイ・実行

適切な実行環境でコードをビルド、公開、実行します。

<!-- catalog:delivery -->
| リソース | 用途 | 利用方法・範囲 | 確認日 |
|---|---|---|---|
| <a id="resource-cloudflare"></a>[**Cloudflare**](https://github.com/cloudflare/mcp-server-cloudflare) · MCP | アプリのデプロイとクラウドリソースを管理 | 料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-cloudflare) |
| <a id="resource-e2b"></a>[**E2B**](https://github.com/e2b-dev/E2B) | エンタープライズグレードのAIエージェント向けセキュアなクラウドサンドボックス環境 | 料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-e2b) |
| <a id="resource-publish-my"></a>[**Publish.my**](https://publish.my/) · Web | メールによる利用開始手続きを備えた、エージェント主導の静的サイト公開サービス | 無料枠あり；静的サイトのみ；メールによる利用開始手続き | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-publish-my) |
| <a id="resource-xcode-build-mcp"></a>[**XcodeBuildMCP**](https://github.com/getsentry/XcodeBuildMCP) · MCP | Appleプラットフォーム向けプロジェクトのビルド・実行・デバッグ用CLIとMCPツール | 料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-xcode-build-mcp) |
<!-- /catalog:delivery -->

<a id="operations"></a>
### エージェントのワークスペース・使用状況

セッションを整理し、実行内容を確認して、使用状況や利用可能性を把握します。

<!-- catalog:operations -->
| リソース | 用途 | 利用方法・範囲 | 確認日 |
|---|---|---|---|
| <a id="resource-duckweed"></a>[**Duckweed**](https://github.com/MusicMaster4/Duckweed) · Desktop | クロスプラットフォームのローカルワークスペースでコーディングエージェント、シェル、Git差分、セッションを扱う | ソース公開；ライセンスを要確認；モデル・プロバイダー利用料は別途 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-duckweed) |
| <a id="resource-llm-log"></a>[**llm.log**](https://github.com/lanesket/llm.log) | ローカルプロキシでモデル利用料、トークン、リクエストの記録を確認 | MIT；モデル・プロバイダー利用料は別途 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-llm-log) |
| <a id="resource-parallel-code"></a>[**Parallel Code**](https://github.com/johannesjo/parallel-code) · Desktop | 分離したGitワークツリーでコーディングエージェントを実行し、変更をレビュー | MIT；モデル・プロバイダー利用料は別途 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-parallel-code) |
| <a id="resource-superagent"></a>[**Superagent**](https://github.com/pungme/superagent-desktop) · Desktop | ブラウザ・iOSツールを備えたmacOSワークスペースでClaude CodeまたはCodexを使用 | MIT；macOS Apple Silicon；モデルのサブスクリプションは別途 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-superagent) |
| <a id="resource-usage"></a>[**usage**](https://github.com/aqua5230/usage) · Desktop | macOSのメニューバーまたはWindowsのシステムトレイでコーディングエージェントの利用枠を確認 | AGPL-3.0；モデル・プロバイダー利用料は別途 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-usage) |
| <a id="resource-warp"></a>[**Warp Terminal**](https://www.warp.dev/terminal) | エージェント向けターミナルを使い、コーディングワークフローを確認 | ターミナルをダウンロード；AI利用料金を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-warp) |
<!-- /catalog:operations -->

<a id="learning"></a>
## 学習と実践

達成したいことに合わせて選んでください。ガイドと論文のラベルは教材の形式を示します。古い概念資料にも学ぶ価値はありますが、当時のツール例やベンチマーク順位は現在の製品選びの助言ではありません。開始前に言語、前提知識、有料部分を確認してください。過去の動画や追加の読み物は拡張カタログにあります。

<a id="first-project"></a>
### 最初のプロジェクト

環境構築から完成まで順に進めましょう。教材に記載された前提条件に従い、ツールを増やす前に小さく動くアプリを一つ完成させてください。

| リソース | 用途 | 利用方法・範囲 | 確認日 |
|---|---|---|---|
| <a id="resource-ai-book-ai-coding"></a>[**AI Book: AI Coding**](https://aibook.ren/categories/ai-coding) · ガイド | Cursor、Codex、Claude Code、Kiroを使用したコーディングエージェントワークフロー、ツール選択、実践に関する中国語ハンドブック | 閲覧無料；再利用条件を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-ai-book-ai-coding) |
| <a id="resource-vibe-coding-manual-roboco"></a>[**Vibe Coding Manual (Roboco)**](https://roboco.io/posts/vibe-coding-manual/) · ガイド | 韓国語のワークフローとプロジェクトルールのテンプレート。例は執筆当時のもの | 閲覧無料；再利用条件を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-vibe-coding-manual-roboco) |
| <a id="resource-vibe-coding-with-confidence-mahmoud-zalt"></a>[**Vibe Coding with Confidence (Mahmoud Zalt)**](https://zalt.me/guides/vibe-coding) · ガイド | 閲覧可能な入門章と有料の上級教材を含む開発ハンドブック | 基本章は無料；上級章は有料；英語 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-vibe-coding-with-confidence-mahmoud-zalt) |

<a id="practical-guides"></a>
### 実践ワークフロー

既存のプロジェクトで具体的な問題を解決する際に使います。

| 作業 | 手順 |
|---|---|
| 新機能 | 目標と受け入れ条件 → コンテキストを確認 → 小さく実装 → レビューとテスト |
| リファクタリング | 現在の動作を記録 → 小さな変更を選ぶ → 動作を比較 → 繰り返す |
| バグ修正 | 再現 → 仮説を立てる → 回帰チェックを追加 → 修正と検証 |
| テスト | 重要な動作を特定 → 意味のある検証を選ぶ → 実行して失敗を確認 |

[詳しいワークフローとプロンプトテンプレート](docs/workflows-and-templates.md)には、セッションの準備と再利用できる手順をまとめています。要件と判断をプロジェクト文書に記録し、必要に応じてサンドボックスを使い、セキュリティに関わる変更はデプロイ前にレビューしてください。

| リソース | 用途 | 利用方法・範囲 | 確認日 |
|---|---|---|---|
| <a id="resource-agentic-coding-armin-ronacher"></a>[**Agentic Coding Recommendations (Armin Ronacher)**](https://lucumr.pocoo.org/2025/6/12/agentic-coding/) · ガイド | 実践的なエージェントワークフローとテストの助言。2025年の実務者の視点 | 閲覧無料；再利用条件を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-agentic-coding-armin-ronacher) |
| <a id="resource-here-s-how-i-use-llms-to-help-me-write-code-simon-willison"></a>[**Here's how I use LLMs to help me write code (Simon Willison)**](https://simonwillison.net/2025/Mar/11/using-llms-for-code/) · ガイド | 反復的なコーディングと品質確認の実践。ツールの例は2025年当時のもの | 閲覧無料；再利用条件を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-here-s-how-i-use-llms-to-help-me-write-code-simon-willison) |
| <a id="resource-secure-vibe-coding-guide-csa"></a>[**Secure Vibe Coding Guide (CSA)**](https://cloudsecurityalliance.org/blog/2025/04/09/secure-vibe-coding-guide) · ガイド | 秘密情報、認可、入力検証、レビューを扱うセキュリティチェックリスト | 閲覧無料；再利用条件を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-secure-vibe-coding-guide-csa) |

<a id="concepts-research"></a>
### 概念と研究

小さなプロジェクトを試した後にツールへの理解を深めたり、評価や開発手法をさらに学んだりできます。

[Vibe coding](https://en.wikipedia.org/wiki/Vibe_coding)は自然言語で意図を伝え、AIによるソフトウェア生成を導く手法です。[Model Context Protocol](https://modelcontextprotocol.io/)はエージェントをツールやデータに接続します。コーディングエージェント、基盤モデル、連携機能はそれぞれ別の選択肢で、一つを変えても他が自動的に変わるわけではありません。

| リソース | 用途 | 利用方法・範囲 | 確認日 |
|---|---|---|---|
| <a id="resource-context-engineering-intro-coleam00"></a>[**Context Engineering Intro (coleam00)**](https://github.com/coleam00/context-engineering-intro) · ガイド | コーディングエージェント向けのプロジェクトコンテキストと指示の例 | 閲覧無料；再利用条件を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-context-engineering-intro-coleam00) |
| <a id="resource-the-model-context-protocol-guide-anthropic"></a>[**Model Context Protocol documentation**](https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro) · ガイド | MCPのアーキテクチャと連携についての現行の公式入門資料 | 閲覧無料；再利用条件を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-the-model-context-protocol-guide-anthropic) |
| <a id="resource-swe-agent-agent-computer-interfaces-enable-automated-software-engineering"></a>[**SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering**](https://arxiv.org/abs/2405.15793) · 論文 | Agent-Computer Interfaceで実際のバグを修正する自律型エージェント | 閲覧無料；再利用条件を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-swe-agent-agent-computer-interfaces-enable-automated-software-engineering) |
| <a id="resource-swe-bench-can-language-models-resolve-real-world-github-issues"></a>[**SWE-bench: Can Language Models Resolve Real-World GitHub Issues?**](https://arxiv.org/abs/2310.06770) · 論文 | AIコーディングエージェントを評価する標準ベンチマーク | 閲覧無料；再利用条件を要確認 | [2026-09-18](docs/lifecycle-review-2026-09-18.md#resource-swe-bench-can-language-models-resolve-real-world-github-issues) |

<details>
<summary>背景と起源</summary>

> 「完全にバイブに身を任せ、指数関数的な成長を受け入れ、コードの存在すら忘れましょう。」
> — Andrej Karpathy、2025年2月

![Vibe Coding Meme](images/vibecoding-meme.png)

学習や本番開発では、自然言語の指示に加えて、内容の理解、レビュー、テスト、成果に対する明確な責任を持ちましょう。

</details>

<a id="community"></a>
## その他の候補とサポート

- [追加の確認済みリソース](docs/verified-catalog.md) — 主要候補以外の現行の選択肢と、過去に執筆された学習資料。
- [提供状況の根拠とレビュー判断](docs/lifecycle-review-2026-09-18.md) — 情報源、確認範囲の制約、現在の正式名称。
- [削除・置換・未確認の項目](docs/catalog-history.md) — 経緯と理由の記録であり、現在の推奨ではありません。
- 製品のサポートは各リソースの根拠記録からリンクしている公式ドキュメントを利用してください。状態の変更や訂正は[リポジトリのIssue](../../issues/new)で報告できます。

<a id="contributing"></a>
<a id="contribution-guidelines"></a>
## 貢献

[Issueでリソースを提案](../../issues/new)してください。追加には **直接的な関連性、利用可能性を示す公開情報、独自の価値、利用条件と主張の透明性、保守の継続または内容の実質的な完成度** が必要です。有料製品や開発者自身による提案にも同じ基準を適用します。関係者とのつながりと重要な制約を開示してください。GitHubのスター数だけで掲載が決まることはありません。

[キュレーションポリシー](docs/curation-policy.md)と[貢献ガイド](.github/CONTRIBUTING.md)をお読みください。明確に基準を満たさないものは理由を添えて却下し、判断が難しいものはレビューのため未解決のままにします。採用した変更は英語・韓国語・日本語で同期し、公開が成功してからIssueを閉じます。

週次更新とIssueのワークフローは[Pi](https://pi.dev/)、KimiまたはQwen、[Exa Search](https://exa.ai/)を使用します。実装とメンテナー向けの操作は[自動化と設定](docs/automation.md)で説明しています。

<a id="license"></a>
## ライセンス

この作品は[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)の下でパブリックドメインに捧げられています。リンク先のプロジェクトや教材には、それぞれ独自のライセンスと利用条件が適用されます。
