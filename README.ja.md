# Awesome Vibe Coding (日本語)

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Weekly Update](https://github.com/roboco-io/awesome-vibecoding/actions/workflows/weekly-update.yml/badge.svg)](https://github.com/roboco-io/awesome-vibecoding/actions/workflows/weekly-update.yml)
[![Maintained by Pi](https://img.shields.io/badge/Maintained%20by-Pi-blueviolet)](https://pi.dev/)
[![Issues Welcome](https://img.shields.io/badge/Issues-welcome-brightgreen.svg)](../../issues/new)
[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](https://creativecommons.org/publicdomain/zero/1.0/)

*Language: [English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md)*

**AIでソフトウェアを作る**ためのツールと学習リソースを探せます。まず目的を選び、利用条件を確認してください。確認日を見れば、レビュー済みの情報と以前からの掲載項目を区別できます。

| やりたいこと | 入口 |
|---|---|
| 変更点を見る | [最近の確認済み更新](#recent-updates) |
| ソフトウェアを作る・改善する | [目的別にツールを探す](#tools) |
| 最初のプロジェクトで学ぶ | [はじめに](#start-here) · [学習と実践](#learning) |

[コード](#code) · [アプリ・UI](#apps) · [コンテキスト・仕様](#context) · [テスト・レビュー](#quality) · [デプロイ・実行](#delivery) · [ワークスペース・使用状況](#operations) · [コミュニティ](#community)

<a id="recent-updates"></a>
## 最近の確認済み更新

過去30日間のレビューと重要な変更を新しい順に掲載しています。確認日は **製品のリリース日ではありません**。[レビュー記録と根拠](docs/issue-review-2026-09-18.md)に確認内容を記録しています。

<!-- recent-updates:start -->
| 確認日 | 更新項目 | 変更内容 |
|---|---|---|
| 2026-09-18 | [Pi](#resource-pi) | レビュー後に追加：マルチプロバイダーモデルとSDKを備えたMITライセンスの拡張型ターミナルコーディングエージェント。 |
| 2026-09-18 | [NextReset](#resource-nextreset) | レビュー後に追加：非公式の公開リセット履歴とローカルのカウントダウン。予測の正確性を保証するものではありません。 |
| 2026-09-18 | [Superagent](#resource-superagent) | レビュー後に追加：ブラウザとiOSのワークフローに対応したmacOS用コーディングエージェントワークスペース。 |
| 2026-09-18 | [Publish.my](#resource-publish-my) | レビュー後に追加：エージェント向け静的サイト公開サービス。メールによる利用開始手続きが必要です。 |
| 2026-09-18 | [Agent QA](#resource-agent-qa) | レビュー後に追加：Web・モバイルのテストワークフロー。FSL-1.1-ALv2ライセンスを明記しています。 |
| 2026-09-18 | [Duckweed](#resource-duckweed) | レビュー後に追加：コーディングエージェント用ローカルターミナルワークスペース。ソース公開ライセンスを採用しています。 |
| 2026-09-18 | [Vibe Coding with Confidence (Mahmoud Zalt)](#resource-vibe-coding-with-confidence-mahmoud-zalt) | レビュー後に追加：無料で閲覧できる開発ハンドブック。 |
| 2026-09-18 | [opencode](#resource-opencode) | 状態を確認：旧リポジトリはアーカイブ済みで、Crushを案内しています。 |
<!-- recent-updates:end -->

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

各リソースは主な用途の一か所に掲載しています。**CLI、IDE、Web、Desktop、MCP** は利用形態を示し、品質の順位ではありません。このページで `MCP` を検索すると、用途をまたいで連携機能を探せます。

**メタデータの読み方：** `—` は実質的な確認日が記録されていないことを示します。`条件を要確認` / `利用方法を要確認` は現在の料金や利用条件が未確認であることを意味します。オープンソースとソース公開はライセンスの区分であり、モデルの利用が無料であることを意味しません。確認日は記載した機能と利用条件の根拠に関するもので、セキュリティ監査日ではありません。古い説明は今後の再確認対象です。

<a id="code"></a>
### コード作成・編集

リポジトリを理解し、機能を実装し、既存コードをリファクタリングします。

<!-- catalog:code -->
| リソース | 用途 | 利用方法・条件 | 確認日 |
|---|---|---|---|
| <a id="resource-agentless"></a>[**Agentless**](https://github.com/OpenAutoCoder/Agentless) | 自律型ソフトウェアエンジニアリングのためのミニマリストなオープンソースアプローチ | 条件を要確認 | — |
| <a id="resource-aide"></a>[**Aide**](https://aide.dev) · IDE | コードベース全体の問題を修正できる能動的なAIエージェントを備えたVS Codeフォーク | 条件を要確認 | — |
| <a id="resource-aider"></a>[**Aider**](https://github.com/paul-gauthier/aider) · CLI | git統合を備えたターミナルAIペアプログラミング | 条件を要確認 | — |
| <a id="resource-amazon-q-developer"></a>[**Amazon Q Developer**](https://aws.amazon.com/q/developer/) | AWS統合AIコーディングアシスタント | 条件を要確認 | — |
| <a id="resource-amp"></a>[**Amp**](https://ampcode.com) · CLI | Sourcegraphのターミナルファーストなエージェント型コーディングアシスタント | 条件を要確認 | — |
| <a id="resource-augment-code"></a>[**Augment Code**](https://www.augmentcode.com) | プロジェクトのコンテキストを活用したコーディング支援 | 条件を要確認 | — |
| <a id="resource-blackbox-ai"></a>[**Blackbox AI**](https://www.blackbox.ai) | 20以上の言語に対応したAIコード補完・生成ツール、ブラウザ内コーディングで人気 | 条件を要確認 | — |
| <a id="resource-claude-code"></a>[**Claude Code**](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview) · CLI | AnthropicのCLIベースのエージェント型コーディングアシスタント | 条件を要確認 | — |
| <a id="resource-cline"></a>[**Cline**](https://github.com/cline/cline) | ファイル・ターミナル・ブラウザの自動化に対応したAIアシスタント | 条件を要確認 | — |
| <a id="resource-codebuff"></a>[**Codebuff**](https://github.com/CodebuffAI/codebuff) · CLI | サブエージェントと連携してターミナルでのコーディング作業を進める | 条件を要確認 | — |
| <a id="resource-codegpt"></a>[**CodeGPT**](https://codegpt.co) | VS CodeとIDEに対応したマルチLLMサポートのAIコーディングアシスタント | 条件を要確認 | — |
| <a id="resource-codeium"></a>[**Codeium**](https://codeium.com/) | 各種開発環境でのコード補完。現在のブランド名と利用条件を要確認 | 条件を要確認 | — |
| <a id="resource-codesandbox-ai"></a>[**CodeSandbox AI**](https://codesandbox.io/ai) · Web | ブラウザサンドボックスでのAI駆動型コード生成 | 条件を要確認 | — |
| <a id="resource-continue"></a>[**Continue**](https://www.continue.dev) | 設定をカスタマイズできるAIアシスタントフレームワーク | 条件を要確認 | — |
| <a id="resource-copilot-workspace"></a>[**Copilot Workspace**](https://githubnext.com/projects/copilot-workspace) · Web | Issue-to-PRワークフロー向けGitHubのエージェント型環境 | 条件を要確認 | — |
| <a id="resource-cosine"></a>[**Cosine**](https://cosine.sh) · Web | 複雑なコードベースのタスクに対応する自律型AIソフトウェアエンジニア | 条件を要確認 | — |
| <a id="resource-crush"></a>[**Crush**](https://github.com/charmbracelet/crush) · CLI | LSP統合とマルチモデル対応を備えたCharmbracelet製グラマラスなターミナルAIコーディングエージェント | 条件を要確認 | — |
| <a id="resource-cursor"></a>[**Cursor**](https://www.cursor.com/) · IDE | コンテキストに応じたコード生成とインラインチャット機能を持つVS Codeフォーク | 条件を要確認 | — |
| <a id="resource-dbforge-ai-assistant"></a>[**dbForge AI Assistant**](https://www.devart.com/dbforge/ai-assistant/) | dbForge製品に統合されたAI搭載SQLコーディングツール | 条件を要確認 | — |
| <a id="resource-deepseek-cli"></a>[**DeepSeek CLI**](https://github.com/holasoymalva/deepseek-cli) · CLI | DeepSeek Coderモデル搭載のターミナルAIコーディングアシスタント | 条件を要確認 | — |
| <a id="resource-devika"></a>[**Devika**](https://github.com/stitionai/devika) | エージェントによるソフトウェア開発ワークフロー | 条件を要確認 | — |
| <a id="resource-devin"></a>[**Devin**](https://www.cognition.ai/devin) · Web | Cognitionによる自律型AIソフトウェアエンジニア | 条件を要確認 | — |
| <a id="resource-devon"></a>[**Devon**](https://github.com/entropy-research/Devon) | Devinの代替となる自律型コーディングエージェント | 条件を要確認 | — |
| <a id="resource-fusion"></a>[**Fusion**](https://www.builder.io/fusion) · Web | デザインシステム認識とFigma統合機能を備えたGitHub接続ビジュアルAI IDE | 条件を要確認 | — |
| <a id="resource-gemini-cli"></a>[**Gemini CLI**](https://github.com/google-gemini/gemini-cli) · CLI | Geminiモデル搭載のGoogleのオープンソースエージェント型コーディングCLI | 条件を要確認 | — |
| <a id="resource-gemini-code-assist"></a>[**Gemini Code Assist**](https://cloud.google.com/products/gemini/code-assist) | Cloud/IDE向けGoogleのAIコード補完とチャット | 条件を要確認 | — |
| <a id="resource-github-copilot"></a>[**GitHub Copilot**](https://github.com/features/copilot) | コード補完、チャット、複数IDE対応を備えたAIペアプログラマー | 条件を要確認 | — |
| <a id="resource-google-antigravity"></a>[**Google Antigravity**](https://antigravity.google) · IDE | マルチエージェント連携を備えたエージェント中心のIDE | 条件を要確認 | — |
| <a id="resource-google-jules"></a>[**Google Jules**](https://jules.google) · Web | リポジトリのコーディング作業を自律型エージェントに委任 | 条件を要確認 | — |
| <a id="resource-goose"></a>[**Goose**](https://block.github.io/goose/) · CLI | MCPに対応したBlockのコーディングアシスタント | 条件を要確認 | — |
| <a id="resource-gpt-engineer"></a>[**gpt-engineer**](https://github.com/gpt-engineer-org/gpt-engineer) | 自然言語仕様から完全なコードベースを構築 | 条件を要確認 | — |
| <a id="resource-jetbrains-ai"></a>[**JetBrains AI**](https://www.jetbrains.com/ai/) | Junieエージェントを備えたIntelliJ/PyCharmの深い統合 | 条件を要確認 | — |
| <a id="resource-kilo-code"></a>[**Kilo Code**](https://kilo.ai) | モデル選択とブラウザ自動化に対応したAIコーディング支援 | 条件を要確認 | — |
| <a id="resource-kiro"></a>[**Kiro**](https://kiro.dev) · IDE | 要件をコードとテストに変換するAWSのスペック駆動型AI IDE | 条件を要確認 | — |
| <a id="resource-melty"></a>[**Melty**](https://github.com/meltylabs/melty) · IDE | 対話型インターフェースを備えたチャット優先のコードエディタ | 条件を要確認 | — |
| <a id="resource-metagpt"></a>[**MetaGPT**](https://github.com/geekan/MetaGPT) | ソフトウェア会社の役割をシミュレートするマルチエージェントフレームワーク | 条件を要確認 | — |
| <a id="resource-openai-codex-cli"></a>[**OpenAI Codex CLI**](https://openai.com/codex/) · CLI | 自然言語プロンプトで操作するCLIコーディングエージェント | 条件を要確認 | — |
| <a id="resource-openhands"></a>[**OpenHands**](https://github.com/All-Hands-AI/OpenHands) | 自律型AIソフトウェア開発エージェント | 条件を要確認 | — |
| <a id="resource-pearai"></a>[**PearAI**](https://trypear.ai) · IDE | 検索機能を統合したVS CodeベースのAIエディタ | 条件を要確認 | — |
| <a id="resource-pi"></a>[**Pi**](https://github.com/earendil-works/pi) · CLI | TypeScript拡張、マルチプロバイダーモデル、埋め込み可能なSDKを備えた拡張型ターミナルコーディングエージェント | MIT；モデルAPIまたはサブスクリプション利用料あり | 2026-09-18 |
| <a id="resource-plandex"></a>[**Plandex**](https://plandex.ai) · CLI | 複雑な多段階タスクに対応するターミナルAIコーディングエンジン | 条件を要確認 | — |
| <a id="resource-ra-aid"></a>[**RA.Aid**](https://github.com/ai-christianson/RA.Aid) · CLI | リサーチ・計画・多段階コード生成を組み合わせた自律型開発エージェント | 条件を要確認 | — |
| <a id="resource-refact-ai"></a>[**Refact.ai**](https://refact.ai/) | セルフホスト型AIコーディングアシスタント | 条件を要確認 | — |
| <a id="resource-roo-code"></a>[**Roo Code**](https://github.com/RooVetGit/Roo-Code) | 複数の役割（アーキテクト、QA、PM）をサポートするAIアシスタント | 条件を要確認 | — |
| <a id="resource-sourcegraph-cody"></a>[**Sourcegraph Cody**](https://sourcegraph.com/cody) | コード理解と検索のためのAIアシスタント | 条件を要確認 | — |
| <a id="resource-supermaven"></a>[**Supermaven**](https://supermaven.com) | 高速AIコード補完 | 条件を要確認 | — |
| <a id="resource-superninja"></a>[**SuperNinja**](https://www.ninjatech.ai) · Web | 開発工程全体を担う自律型AI開発エージェント | 条件を要確認 | — |
| <a id="resource-swe-agent"></a>[**SWE-agent**](https://github.com/princeton-nlp/SWE-agent) | リポジトリのIssueを解決するエージェント | 条件を要確認 | — |
| <a id="resource-sweep"></a>[**Sweep**](https://github.com/sweepai/sweep) | issueとPRのためのAI駆動型GitHubアシスタント | 条件を要確認 | — |
| <a id="resource-tabby"></a>[**Tabby**](https://tabbyml.com) | プライバシー重視のセルフホスト型オープンソースAIコーディングアシスタント | 条件を要確認 | — |
| <a id="resource-tabnine"></a>[**Tabnine**](https://www.tabnine.com/) | コーディングスタイルに適応する深層学習オートコンプリート | 条件を要確認 | — |
| <a id="resource-trae-ai"></a>[**Trae AI**](https://www.trae.ai/) · Web | コンテンツ作成のためのAIプラットフォーム | 条件を要確認 | — |
| <a id="resource-twill"></a>[**Twill**](https://twill.ai) · Web | PRを作成するクラウド型の自律コーディングエージェント | 条件を要確認 | — |
| <a id="resource-vibe-compiler-vibec"></a>[**Vibe Compiler (vibec)**](https://github.com/Strawberry-Computer/vibe-compiler) | プロンプトをコードに変換する自己コンパイルツール | 条件を要確認 | — |
| <a id="resource-void"></a>[**Void**](https://github.com/voideditor/void) · IDE | 自律型AIコーディング機能を備えたVS Codeフォーク | 条件を要確認 | — |
| <a id="resource-windsurf"></a>[**Windsurf**](https://codeium.com/windsurf) · IDE | CodeiumのAIネイティブIDEでCascade AIとマルチLLMサポート | 条件を要確認 | — |
| <a id="resource-wingman-ai"></a>[**Wingman AI**](https://github.com/RussellCanfield/wingman-ai-vscode-extension) | Ollama、HuggingFace、OpenAI、Anthropicに対応したVSCode拡張機能 | 条件を要確認 | — |
| <a id="resource-zed-ai"></a>[**Zed AI**](https://zed.dev/) · IDE | ネイティブAIアシスタントを統合した高性能エディタ | 条件を要確認 | — |
<!-- /catalog:code -->

<a id="apps"></a>
### アプリ・UIの試作

説明やデザインから最初のアプリやインターフェースを作ります。

<!-- catalog:apps -->
| リソース | 用途 | 利用方法・条件 | 確認日 |
|---|---|---|---|
| <a id="resource-appsmith"></a>[**Appsmith**](https://www.appsmith.com) · Web | 社内ツールを構築するためのローコードプラットフォーム | 条件を要確認 | — |
| <a id="resource-berrry"></a>[**Berrry**](https://berrry.app) · Web | ソーシャル投稿をWebアプリに変換 | 条件を要確認 | — |
| <a id="resource-bolt-diy"></a>[**Bolt.diy**](https://github.com/stackblitz-labs/bolt.diy) · Web | 独自APIキーの利用に対応したBolt.new代替 | 条件を要確認 | — |
| <a id="resource-bolt-new"></a>[**Bolt.new**](https://bolt.new/) · Web | StackBlitzによる自然言語アプリ構築 | 条件を要確認 | — |
| <a id="resource-buildship"></a>[**BuildShip**](https://buildship.com) · Web | ローコードノードを備えたビジュアルAIワークフロー・バックエンドビルダー | 条件を要確認 | — |
| <a id="resource-create-xyz"></a>[**Create.xyz**](https://create.xyz/) · Web | 自然言語プロンプトを使用したWebアプリ構築 | 条件を要確認 | — |
| <a id="resource-databutton"></a>[**Databutton**](https://databutton.com) · Web | Pythonバックエンドを備えたAI駆動フルスタックアプリビルダー | 条件を要確認 | — |
| <a id="resource-dyad"></a>[**Dyad**](https://github.com/dyad-sh/dyad) · Web | ローカルのオープンソースAIアプリビルダー（v0/Lovable/Boltの代替） | 条件を要確認 | — |
| <a id="resource-emergent"></a>[**Emergent**](https://emergent.sh) · Web | ワンクリックデプロイとカスタムドメインを備えたAIフルスタックバイブコーディングプラットフォーム | 条件を要確認 | — |
| <a id="resource-figma-mcp"></a>[**Figma MCP**](https://github.com/figma/figma-developer-mcp) · MCP | デザインデータをUI実装に取り込む | 条件を要確認 | — |
| <a id="resource-firebase-studio"></a>[**Firebase Studio**](https://firebase.studio) · Web | 旧Project IDXで、GeminiによるGoogleのAIファーストブラウザIDE | 条件を要確認 | — |
| <a id="resource-github-spark"></a>[**GitHub Spark**](https://githubnext.com/projects/spark) · Web | GitHub Nextが開発した自然言語マイクロアプリビルダー、ブラウザ上で動作 | 条件を要確認 | — |
| <a id="resource-hostinger-horizons"></a>[**Hostinger Horizons**](https://hostinger.com/horizons) · Web | 音声・テキスト・画像プロンプトとホスティング内蔵のAIノーコードアプリビルダー | 条件を要確認 | — |
| <a id="resource-kombai"></a>[**Kombai**](https://kombai.com/) · Web | Figmaデザインをコードに変換するAI | 条件を要確認 | — |
| <a id="resource-lazy-ai"></a>[**Lazy AI**](https://www.getlazy.ai) · Web | ワンクリッククラウドデプロイ対応のチャットベースWebアプリビルダー | 条件を要確認 | — |
| <a id="resource-lovable"></a>[**Lovable**](https://lovable.dev/) · Web | Supabaseを使用したフルスタックアプリ生成 | 条件を要確認 | — |
| <a id="resource-marblism"></a>[**Marblism**](https://marblism.com) · Web | テキストプロンプトからフルスタックNext.jsアプリを生成するAI | 条件を要確認 | — |
| <a id="resource-onlook"></a>[**Onlook**](https://onlook.dev) · Web | AIコード生成に対応したReact/Next.js向けブラウザ型ビジュアルエディタ | 条件を要確認 | — |
| <a id="resource-openbolt-dev"></a>[**OpenBolt.dev**](https://openbolt.dev) · Web | セルフホストとカスタマイズに対応したBolt.new代替 | 条件を要確認 | — |
| <a id="resource-playcode"></a>[**Playcode**](https://playcode.io/ai-website-builder) · Web | ビジュアル編集、ホスティング、カスタムドメイン、ワンクリック公開を備えたAIウェブサイト・アプリビルダー | 条件を要確認 | — |
| <a id="resource-rapidnative"></a>[**RapidNative**](https://rapidnative.com/) · Web | スケッチ/テキスト入力でReact Nativeを生成するAIモバイルアプリビルダー | 条件を要確認 | — |
| <a id="resource-replit"></a>[**Replit**](https://replit.com/) · Web | Ghostwriter AIを備えたブラウザベースIDE | 条件を要確認 | — |
| <a id="resource-rosebud-ai"></a>[**Rosebud AI**](https://rosebud.ai) · Web | 3DゲームとインタラクティブWebアプリのためのバイブコーディングプラットフォーム | 条件を要確認 | — |
| <a id="resource-subframe"></a>[**Subframe**](https://subframe.com) · Web | クリーンなReactコンポーネントコードを生成するAI支援UIビルダー | 条件を要確認 | — |
| <a id="resource-tempo-labs"></a>[**Tempo Labs**](https://tempolabs.ai/) · Web | ビジュアルエディタとコードエクスポートを備えたAI駆動のReact UIビルダー | 条件を要確認 | — |
| <a id="resource-v0"></a>[**v0**](https://v0.dev/) · Web | VercelのUI/React生成AI | 条件を要確認 | — |
| <a id="resource-vibekit-bot"></a>[**VibeKit.bot**](https://vibekit.bot) · Web | アプリごとに永続的なAIコーディングエージェントを提供し、ビルド、ホスティング(ライブドメイン)、継続的な改善を実行。携帯電話やCLIから駆動可能。BYOKまたは従量課金制 | 条件を要確認 | — |
<!-- /catalog:apps -->

<a id="context"></a>
### コンテキスト・仕様・連携

要件、ルール、ドキュメント、連携先のプロジェクトデータをエージェントに提供します。

<!-- catalog:context -->
| リソース | 用途 | 利用方法・条件 | 確認日 |
|---|---|---|---|
| <a id="resource-anycrawl"></a>[**AnyCrawl**](https://github.com/any4ai/anycrawl-mcp-server) · MCP | エージェントのコンテキスト用にWebサイトの内容を取得 | 条件を要確認 | — |
| <a id="resource-breaking-coding-chaos"></a>[**breaking-coding-chaos**](https://github.com/bo-cao/breaking-coding-chaos) | ヒューマンインザループ二重ループ制御プレーンスキルスイート | 条件を要確認 | — |
| <a id="resource-caliber"></a>[**Caliber**](https://github.com/caliber-ai-org/ai-setup) | Claude Code、Cursor、Codex向けのAIエージェント設定を生成・同期するCLI | 条件を要確認 | — |
| <a id="resource-chroma"></a>[**Chroma**](https://github.com/chroma-core/chroma-mcp) · MCP | ベクトルデータベースからコンテキストを取得 | 条件を要確認 | — |
| <a id="resource-clickhouse"></a>[**ClickHouse**](https://github.com/ClickHouse/mcp-clickhouse) · MCP | ClickHouseデータの照会と確認 | 条件を要確認 | — |
| <a id="resource-composio-mcp"></a>[**Composio MCP**](https://github.com/ComposioHQ/composio) · MCP | コーディングエージェントを外部サービスに接続 | 条件を要確認 | — |
| <a id="resource-context7"></a>[**Context7**](https://github.com/upstash/context7) · MCP | コーディングのコンテキスト用にライブラリのドキュメントを取得 | 条件を要確認 | — |
| <a id="resource-everything-claude-code"></a>[**everything-claude-code**](https://github.com/serithemage/everything-claude-code) | Anthropicハッカソン優勝者による実戦検証済みClaude Code設定（エージェント、スキル、フック、コマンド） | 条件を要確認 | — |
| <a id="resource-exa-mcp"></a>[**Exa MCP**](https://github.com/exa-labs/exa-mcp-server) · MCP | 関連する参考資料をWeb検索 | 条件を要確認 | — |
| <a id="resource-excel"></a>[**Excel**](https://github.com/haris-musa/excel-mcp-server) · MCP | スプレッドシートのデータを読み取り・更新 | 条件を要確認 | — |
| <a id="resource-fetch"></a>[**Fetch**](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch) · MCP | コーディング作業に必要なWebコンテンツを取得 | 条件を要確認 | — |
| <a id="resource-filesystem-mcp"></a>[**Filesystem MCP**](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) · MCP | エージェントにプロジェクトファイルへの制御されたアクセスを提供 | 条件を要確認 | — |
| <a id="resource-firecrawl-mcp"></a>[**Firecrawl MCP**](https://github.com/mendableai/firecrawl-mcp-server) · MCP | 調査やコンテキスト用にWebコンテンツを抽出 | 条件を要確認 | — |
| <a id="resource-git-mcp"></a>[**Git MCP**](https://github.com/modelcontextprotocol/servers/tree/main/src/git) · MCP | リポジトリの履歴と変更を読み取る | 条件を要確認 | — |
| <a id="resource-github-mcp"></a>[**GitHub MCP**](https://github.com/github/github-mcp-server) · MCP | リポジトリ、Issue、プルリクエストのワークフローを接続 | 条件を要確認 | — |
| <a id="resource-intent-engineering"></a>[**intent-engineering**](https://github.com/roboco-io/intent-engineering) | AI実行によってコードではなく意図を提供する運用モデル | 条件を要確認 | — |
| <a id="resource-jira-mcp"></a>[**Jira MCP**](https://github.com/sooperset/mcp-atlassian) · MCP | JiraのIssueとConfluenceのプロジェクトコンテキストを接続 | 条件を要確認 | — |
| <a id="resource-linear-mcp"></a>[**Linear MCP**](https://github.com/jerhadf/linear-mcp-server) · MCP | プロジェクトのIssueと計画のコンテキストを接続 | 条件を要確認 | — |
| <a id="resource-mongodb"></a>[**MongoDB**](https://github.com/mongodb-js/mongodb-mcp-server) · MCP | MongoDBのコレクションを確認し、クエリを実行 | 条件を要確認 | — |
| <a id="resource-mymir"></a>[**mymir**](https://github.com/FrkAk/mymir) | コンテキストネットワークを備えたAIコーディングエージェント向けプロジェクト管理レイヤー | 条件を要確認 | — |
| <a id="resource-neon"></a>[**Neon**](https://github.com/neondatabase/mcp-server-neon) · MCP | 開発ワークフローをNeonデータベースに接続 | 条件を要確認 | — |
| <a id="resource-notion-mcp"></a>[**Notion MCP**](https://github.com/makenotion/notion-mcp-server) · MCP | プロジェクトのドキュメントを取得・更新 | 条件を要確認 | — |
| <a id="resource-oh-my-claudecode"></a>[**oh-my-claudecode**](https://github.com/Yeachan-Heo/oh-my-claudecode) | 学習コストゼロのClaude Code向けマルチエージェントオーケストレーション | 条件を要確認 | — |
| <a id="resource-openspec"></a>[**OpenSpec**](https://github.com/Fission-AI/OpenSpec) | AIコーディングアシスタント向けのスペック駆動開発フレームワーク | 条件を要確認 | — |
| <a id="resource-perplexity-mcp"></a>[**Perplexity MCP**](https://github.com/anthropics/mcp-perplexity) · MCP | 調査用の連携機能。掲載されたソースは再確認が必要 | 条件を要確認 | — |
| <a id="resource-phind"></a>[**Phind**](https://www.phind.com) | コード・エラー・技術的Q&AのためのAI搭載開発者向け検索エンジン | 条件を要確認 | — |
| <a id="resource-pieces-for-developers"></a>[**Pieces for Developers**](https://pieces.app/) | 自動コードスニペット管理とコンテキストを備えたAIアシスタント | 条件を要確認 | — |
| <a id="resource-roboco-cli"></a>[**roboco-cli**](https://github.com/roboco-io/roboco-cli) | Claude Codeによるバイブコーディングのための AI ネイティブ開発スキャフォールディングシステム | 条件を要確認 | — |
| <a id="resource-rube"></a>[**Rube**](https://github.com/ComposioHQ/Rube) · MCP | リポジトリとサービスのワークフローを接続 | 条件を要確認 | — |
| <a id="resource-solar-mcp"></a>[**Solar MCP**](https://github.com/serithemage/solar-mcp) · MCP | エージェントをUpstage Solarモデルに接続 | 条件を要確認 | — |
| <a id="resource-spec-workflow-mcp"></a>[**Spec Workflow MCP**](https://github.com/Pimzino/spec-workflow-mcp) · MCP | 仕様と体系的な開発手順を管理 | 条件を要確認 | — |
| <a id="resource-stripe-mcp"></a>[**Stripe MCP**](https://github.com/stripe/agent-toolkit) · MCP | アプリ開発時に決済APIを接続 | 条件を要確認 | — |
| <a id="resource-supabase"></a>[**Supabase**](https://github.com/supabase-community/supabase-mcp) · MCP | スキーマの確認、クエリの実行、マイグレーションの管理 | 条件を要確認 | — |
| <a id="resource-tavily"></a>[**Tavily**](https://github.com/tavily-ai/tavily-mcp) · MCP | エージェントのタスクに必要なWeb上の根拠を取得 | 条件を要確認 | — |
| <a id="resource-vibe-coding-prompt-template"></a>[**vibe-coding-prompt-template**](https://github.com/KhazP/vibe-coding-prompt-template) · テンプレート | 包括的なプロンプトテンプレート | 条件を要確認 | — |
| <a id="resource-vibe-lead"></a>[**vibe-lead**](https://github.com/roboco-io/vibe-lead) | 組織におけるAIベースのバイブコーディング導入のための変革管理フレームワーク | 条件を要確認 | — |
| <a id="resource-vibeworkflow-app"></a>[**vibeworkflow.app**](https://vibeworkflow.app) | Vibe Codingのワークフロー自動化 | 条件を要確認 | — |
<!-- /catalog:context -->

<a id="quality"></a>
### テスト・レビュー・セキュリティ

動作を確認し、生成された変更をレビューして、障害を診断します。

<!-- catalog:quality -->
| リソース | 用途 | 利用方法・条件 | 確認日 |
|---|---|---|---|
| <a id="resource-agent-qa"></a>[**Agent QA**](https://github.com/vostride/agent-qa) · MCP | 自然言語でWeb・モバイルテストを作成・実行 | FSL-1.1-ALv2；モデル利用料あり | 2026-09-18 |
| <a id="resource-bito-ai"></a>[**Bito AI**](https://bito.ai) | VS CodeおよびJetBrains IDE向けAIコードレビュー・生成アシスタント | 条件を要確認 | — |
| <a id="resource-browserbase"></a>[**Browserbase**](https://github.com/browserbase/mcp-server-browserbase) · MCP | エージェント主導のブラウザワークフローをクラウドで実行 | 条件を要確認 | — |
| <a id="resource-chrome-mcp"></a>[**Chrome MCP**](https://github.com/hangwin/mcp-chrome) · MCP | ブラウザを操作してアプリを確認・テスト | 条件を要確認 | — |
| <a id="resource-factory"></a>[**Factory**](https://factory.ai) | 自律的なコードレビュー、テスト、PR作成を行うAI Droids | 条件を要確認 | — |
| <a id="resource-micro-agent"></a>[**micro-agent**](https://github.com/BuilderIO/micro-agent) | テストが通過するまでTDDでコードを書き反復修正するCLIツール | 条件を要確認 | — |
| <a id="resource-mobile-mcp"></a>[**Mobile MCP**](https://github.com/mobile-next/mobile-mcp) · MCP | モバイルアプリの操作を自動化し、状態を確認 | 条件を要確認 | — |
| <a id="resource-mutable-ai"></a>[**Mutable.ai**](https://mutable.ai/) | 自動テスト、ドキュメント化、リファクタリングのためのAI | 条件を要確認 | — |
| <a id="resource-playwright-mcp"></a>[**Playwright MCP**](https://github.com/executeautomation/mcp-playwright) · MCP | ブラウザ自動化とエンドツーエンドの検証を実行 | 条件を要確認 | — |
| <a id="resource-potpie"></a>[**Potpie**](https://github.com/potpie-ai/potpie) | コードベースのデバッグ、テスト、コードレビュー用AIエージェント | 条件を要確認 | — |
| <a id="resource-pr-agent"></a>[**PR-Agent**](https://github.com/Codium-ai/pr-agent) | プルリクエストの分析とレビューを自動化するAIエージェント | 条件を要確認 | — |
| <a id="resource-qodo"></a>[**Qodo**](https://www.qodo.ai) | AIコードレビューエンジン（旧CodiumAI） | 条件を要確認 | — |
| <a id="resource-semgrep"></a>[**Semgrep**](https://github.com/semgrep/mcp) · MCP | コードをスキャンしてセキュリティと品質の問題を検出 | 条件を要確認 | — |
| <a id="resource-sentry"></a>[**Sentry**](https://github.com/getsentry/sentry-mcp) · MCP | アプリのエラーを確認し、障害を診断 | 条件を要確認 | — |
| <a id="resource-vibe-ready"></a>[**vibe-ready**](https://github.com/roboco-io/vibe-ready-cli) | Claude Agent SDKを使用してリポジトリのバイブコーディング準備度を6カテゴリスコアリングで分析するCLIツール | 条件を要確認 | — |
<!-- /catalog:quality -->

<a id="delivery"></a>
### デプロイ・実行

適切な実行環境でコードをビルド、公開、実行します。

<!-- catalog:delivery -->
| リソース | 用途 | 利用方法・条件 | 確認日 |
|---|---|---|---|
| <a id="resource-cloudflare"></a>[**Cloudflare**](https://github.com/cloudflare/mcp-server-cloudflare) · MCP | アプリのデプロイとクラウドリソースを管理 | 条件を要確認 | — |
| <a id="resource-e2b"></a>[**E2B**](https://github.com/e2b-dev/e2b) | エンタープライズグレードのAIエージェント向けセキュアなクラウドサンドボックス環境 | 条件を要確認 | — |
| <a id="resource-e2b-mcp"></a>[**E2B MCP**](https://github.com/e2b-dev/mcp-server) · MCP | エージェントが生成したコードを分離されたサンドボックスで実行 | 条件を要確認 | — |
| <a id="resource-publish-my"></a>[**Publish.my**](https://publish.my/) · Web | メールによる利用開始手続きを備えた、エージェント主導の静的サイト公開サービス | 無料枠あり；静的サイトのみ | 2026-09-18 |
| <a id="resource-serverless-openclaw"></a>[**serverless-openclaw**](https://github.com/serithemage/serverless-openclaw) | AWSサーバーレスインフラ上でOpenClaw AIエージェントをオンデマンド実行、Web UIとTelegramインターフェース対応 | 条件を要確認 | — |
| <a id="resource-vercel-mcp"></a>[**Vercel MCP**](https://github.com/vercel/mcp-adapter) · MCP | デプロイのワークフローをVercelに接続 | 条件を要確認 | — |
| <a id="resource-xcode-build-mcp"></a>[**Xcode Build MCP**](https://github.com/cameroncooke/XcodeBuildMCP) · MCP | Appleプラットフォーム向けプロジェクトをビルド・実行 | 条件を要確認 | — |
<!-- /catalog:delivery -->

<a id="operations"></a>
### エージェントのワークスペース・使用状況

セッションを整理し、実行内容を確認して、使用状況や利用可能性を把握します。

<!-- catalog:operations -->
| リソース | 用途 | 利用方法・条件 | 確認日 |
|---|---|---|---|
| <a id="resource-agent-island"></a>[**Agent Island**](https://github.com/tristan666666/agent-island) · Desktop | macOS/Windows用のClaude Code/Codexデスクトップステータスコンパニオン | 条件を要確認 | — |
| <a id="resource-dev-janitor"></a>[**Dev Janitor**](https://github.com/cocojojo5213/Dev-Janitor) | AIコーディングアシスタントと依存関係を管理するためのクロスプラットフォームデスクトップツールキット | 条件を要確認 | — |
| <a id="resource-duckweed"></a>[**Duckweed**](https://github.com/MusicMaster4/Duckweed) · Desktop | ソースコードを公開している、コーディングエージェント向けのローカルターミナルワークスペース | ソース公開；モデル利用料を要確認 | 2026-09-18 |
| <a id="resource-gitpod"></a>[**Gitpod**](https://www.gitpod.io/) · Web | AIによるワークスペース自動化を備えたクラウド開発環境 | 条件を要確認 | — |
| <a id="resource-intent"></a>[**Intent**](https://www.augmentcode.com/intent) | 仕様に基づく体系的な監督機能を備えたマルチエージェントオーケストレーション用ワークスペース | 条件を要確認 | — |
| <a id="resource-llm-log"></a>[**llm.log**](https://github.com/lanesket/llm.log) | AIエージェントのAPI呼び出しをキャプチャするローカルプロキシ — トークン、コスト、プロンプト、レイテンシをTUIダッシュボードで表示 | 条件を要確認 | — |
| <a id="resource-nextreset"></a>[**NextReset**](https://nextreset.ai/) · Web | Codexのリセット履歴とブラウザ内のカウントダウンを提供する非公式ツール | 無料；非公式 | 2026-09-18 |
| <a id="resource-parallel-code"></a>[**Parallel Code**](https://github.com/johannesjo/parallel-code) · Desktop | 並列ワークツリーでAIコーディングエージェントを実行するデスクトップアプリ | 条件を要確認 | — |
| <a id="resource-superagent"></a>[**Superagent**](https://github.com/pungme/superagent-desktop) · Desktop | コーディングエージェント、ブラウザ、iOSワークフロー向けのMITライセンスのmacOSアプリ | MIT；モデル利用料を要確認 | 2026-09-18 |
| <a id="resource-usage"></a>[**usage**](https://github.com/aqua5230/usage) · Desktop | Claude Code/Codexのクォータを一目で確認できるmacOSメニューバーアプリ | 条件を要確認 | — |
| <a id="resource-vmux"></a>[**vmux**](https://github.com/roboco-io/vmux) | AIコーディングエージェント向けの通知とセッション管理を備えたVS Codeターミナル拡張機能 | 条件を要確認 | — |
| <a id="resource-warp"></a>[**Warp**](https://www.warp.dev) | 自然言語コマンドとエージェントモードを備えたAIネイティブターミナル | 条件を要確認 | — |
<!-- /catalog:operations -->

<a id="learning"></a>
## 学習と実践

達成したいことに合わせて選んでください。ガイド、動画、論文、テンプレートのラベルは教材の形式を示します。前提知識、言語、所要時間、APIやサブスクリプションの費用はリンク先で確認してください。未確認の所要時間を推測して掲載することはしていません。

<a id="first-project"></a>
### 最初のプロジェクト

環境構築から完成まで順に進めましょう。教材に記載された前提条件に従い、ツールを増やす前に小さく動くアプリを一つ完成させてください。

| リソース | 用途 | 利用方法・条件 | 確認日 |
|---|---|---|---|
| <a id="resource-ai-book-ai-coding"></a>[**AI Book: AI Coding**](https://aibook.ren/categories/ai-coding) · ガイド | Cursor、Codex、Claude Code、Kiroを使用したコーディングエージェントワークフロー、ツール選択、実践に関する中国語ハンドブック | 利用方法を要確認 | — |
| <a id="resource-applighter"></a>[**AppLighter**](https://applighter.com/) · テンプレート | AIエージェントワークフロー向けのCLAUDE.md、AGENTS.md、.cursorrules付きプロダクションレディReact Native + Expoテンプレート | 条件を要確認 | — |
| <a id="resource-vibe-coding-manual-roboco"></a>[**Vibe Coding Manual (Roboco)**](https://roboco.io/posts/vibe-coding-manual/) · ガイド | テンプレート付き包括的ガイド | 利用方法を要確認 | — |
| <a id="resource-vibe-coding-tutorial-and-best-practices"></a>[**Vibe Coding Tutorial and Best Practices**](https://www.youtube.com/watch?v=YWwS911iLhg) · 動画 | Cursor/WindsurfでのAIエージェント | 利用方法を要確認 | — |
| <a id="resource-vibe-coding-with-confidence-mahmoud-zalt"></a>[**Vibe Coding with Confidence (Mahmoud Zalt)**](https://zalt.me/guides/vibe-coding) · ガイド | AI支援アプリの構築、テスト、セキュリティ対策、公開を学ぶハンドブック | 閲覧無料 · 英語 | 2026-09-18 |

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

| リソース | 用途 | 利用方法・条件 | 確認日 |
|---|---|---|---|
| <a id="resource-12-best-practices-for-ai-coding-questera"></a>[**12 Best Practices for AI Coding (Questera)**](https://www.questera.ai/blogs/12-best-practices-to-use-ai-in-coding-in-2025) · ガイド | 2025年のベストプラクティス | 利用方法を要確認 | — |
| <a id="resource-agentic-coding-armin-ronacher"></a>[**Agentic Coding (Armin Ronacher)**](https://lucumr.pocoo.org/2025/6/12/agentic-coding/) · ガイド | AI駆動型自律開発アプローチ | 利用方法を要確認 | — |
| <a id="resource-ai-tool-showdown-japanese"></a>[**AI Tool Showdown (Japanese)**](https://www.youtube.com/watch?v=EQHXIVItNxs) · 動画 | Copilot vs Cursor等 | 利用方法を要確認 | — |
| <a id="resource-here-s-how-i-use-llms-to-help-me-write-code-simon-willison"></a>[**Here's how I use LLMs to help me write code (Simon Willison)**](https://simonwillison.net/2025/Mar/11/using-llms-for-code/) · ガイド | 実践的な統合のヒント | 利用方法を要確認 | — |
| <a id="resource-how-i-use-llms"></a>[**How I use LLMs**](https://www.youtube.com/watch?v=EWvNQjAaOHw) · 動画 | Andrej Karpathyのガイド | 利用方法を要確認 | — |
| <a id="resource-new-tools-for-building-agents"></a>[**New Tools for Building Agents**](https://www.youtube.com/watch?v=hciNKcLwSes) · 動画 | OpenAIのエージェントツール | 利用方法を要確認 | — |
| <a id="resource-secure-vibe-coding-guide-csa"></a>[**Secure Vibe Coding Guide (CSA)**](https://cloudsecurityalliance.org/blog/2025/04/09/secure-vibe-coding-guide) · ガイド | セキュリティの考慮事項 | 利用方法を要確認 | — |
| <a id="resource-vibecodex"></a>[**vibecodex**](https://github.com/yerdaulet-damir/vibecodex) · ガイド | バイブコーディングのための54の原則を含むプロダクションアーキテクチャバイブル (FastAPI, Next.js, Go) | 利用方法を要確認 | — |
| <a id="resource-windsurf-90-of-your-code"></a>[**Windsurf: 90% of Your Code**](https://www.youtube.com/watch?v=bVNNvWq6dKo) · 動画 | エージェント型IDEの詳細 | 利用方法を要確認 | — |

<a id="concepts-research"></a>
### 概念と研究

小さなプロジェクトを試した後にツールへの理解を深めたり、評価や開発手法をさらに学んだりできます。

[Vibe coding](https://en.wikipedia.org/wiki/Vibe_coding)は自然言語で意図を伝え、AIによるソフトウェア生成を導く手法です。[Model Context Protocol](https://modelcontextprotocol.io/)はエージェントをツールやデータに接続します。コーディングエージェント、基盤モデル、連携機能はそれぞれ別の選択肢で、一つを変えても他が自動的に変わるわけではありません。

| リソース | 用途 | 利用方法・条件 | 確認日 |
|---|---|---|---|
| <a id="resource-a-review-on-vibe-coding"></a>[**A Review on Vibe Coding**](https://www.techrxiv.org/users/913189/articles/1292402) · 論文 | 基礎、課題、今後の方向性 | 利用方法を要確認 | — |
| <a id="resource-context-engineering-intro-coleam00"></a>[**Context Engineering Intro (coleam00)**](https://github.com/coleam00/context-engineering-intro) · ガイド | Claude Codeを使ってAIコーディングアシスタントを効果的に活用する方法 | 利用方法を要確認 | — |
| <a id="resource-mcp-in-10-minutes"></a>[**MCP in 10 Minutes**](https://www.youtube.com/watch?v=EswVjHZMn74) · 動画 | MCPクイックイントロ | 利用方法を要確認 | — |
| <a id="resource-model-context-protocol-explained"></a>[**Model Context Protocol Explained**](https://www.youtube.com/watch?v=VChRPFUzJGA) · 動画 | MCPの基礎 | 利用方法を要確認 | — |
| <a id="resource-swe-agent-agent-computer-interfaces-enable-automated-software-engineering"></a>[**SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering**](https://arxiv.org/abs/2405.15793) · 論文 | Agent-Computer Interfaceで実際のバグを修正する自律型エージェント | 利用方法を要確認 | — |
| <a id="resource-swe-bench-can-language-models-resolve-real-world-github-issues"></a>[**SWE-bench: Can Language Models Resolve Real-World GitHub Issues?**](https://arxiv.org/abs/2310.06770) · 論文 | AIコーディングエージェントを評価する標準ベンチマーク | 利用方法を要確認 | — |
| <a id="resource-the-model-context-protocol-guide-anthropic"></a>[**The Model Context Protocol Guide (Anthropic)**](https://modelcontextprotocol.io/introduction) · ガイド | MCPアーキテクチャの理解 | 利用方法を要確認 | — |
| <a id="resource-vibe-coding-and-ai-led-conversational-programming"></a>[**Vibe Coding and AI-Led Conversational Programming**](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5469367) · 論文 | 開発者とAIの相互作用 | 利用方法を要確認 | — |
| <a id="resource-vibe-coding-is-the-future"></a>[**Vibe Coding Is The Future**](https://www.youtube.com/watch?v=IACHfKmZMr8) · 動画 | Y CombinatorのVibe Coding | 利用方法を要確認 | — |
| <a id="resource-vibe-coding-ai-voice-based-code-generation"></a>[**Vibe Coding: AI/Voice Based Code Generation**](https://papers.academic-conferences.org/index.php/icair/article/view/3975) · 論文 | コーディングをしない人向けの研究ツール | 利用方法を要確認 | — |
| <a id="resource-vibe-coding-toward-an-ai-native-paradigm"></a>[**Vibe Coding: Toward an AI-Native Paradigm**](https://arxiv.org/abs/2510.17842) · 論文 | セマンティックなソフトウェア開発 | 利用方法を要確認 | — |
| <a id="resource-vibecoding-is-here"></a>[**Vibecoding is Here**](https://www.youtube.com/watch?v=xxA-M3HrKrc) · 動画 | AIが開発を変える | 利用方法を要確認 | — |
| <a id="resource-what-is-vibe-coding-ibm"></a>[**What is Vibe Coding? (IBM)**](https://www.ibm.com/think/topics/vibe-coding) · ガイド | エンタープライズの視点 | 利用方法を要確認 | — |

<details>
<summary>背景と起源</summary>

> 「完全にバイブに身を任せ、指数関数的な成長を受け入れ、コードの存在すら忘れましょう。」
> — Andrej Karpathy、2025年2月

![Vibe Coding Meme](images/vibecoding-meme.png)

学習や本番開発では、自然言語の指示に加えて、内容の理解、レビュー、テスト、成果に対する明確な責任を持ちましょう。

</details>

<a id="related-context"></a>
## 関連プラットフォームと専門的な用途

<details>
<summary>周辺のAIプラットフォームと専門インフラを表示</summary>

以前から掲載されている、広範なAIアプリ、パーソナルアシスタント、データ処理、専門インフラの項目です。コーディングのワークフローに直接適しているかは別途レビューが必要です。ここへの掲載は新たな推奨や再確認を意味しません。

| リソース | 用途 | 利用方法・条件 | 確認日 |
|---|---|---|---|
| <a id="resource-5ire"></a>[**5ire**](https://github.com/nanbingxyz/5ire) · MCP | ローカルナレッジとMCPを備えたデスクトップAIインターフェース | 条件を要確認 | — |
| <a id="resource-alphacode"></a>[**AlphaCode**](https://alphacode.deepmind.com/) | DeepMindの競技プログラミングAI | 条件を要確認 | — |
| <a id="resource-autogpt"></a>[**AutoGPT**](https://github.com/Significant-Gravitas/AutoGPT) | 複雑なコーディングタスクのための自律型AIエージェント | 条件を要確認 | — |
| <a id="resource-botmadang-mcp"></a>[**Botmadang MCP**](https://github.com/serithemage/botmadang-mcp) · MCP | 韓国のAIコミュニティプラットフォームに接続 | 条件を要確認 | — |
| <a id="resource-botpress"></a>[**Botpress**](https://botpress.com) · Web | LLMを活用したチャットボット開発プラットフォーム | 条件を要確認 | — |
| <a id="resource-chatgpt"></a>[**ChatGPT**](https://chat.openai.com/) | 関連する開発・AIプラットフォーム。自身のワークフローへの適合性を確認 | 条件を要確認 | — |
| <a id="resource-cherry-studio"></a>[**Cherry Studio**](https://github.com/CherryHQ/cherry-studio) | 自律型コーディングと300以上のアシスタントを備えたAI Agentデスクトップ | 条件を要確認 | — |
| <a id="resource-claude"></a>[**Claude**](https://claude.ai/) | 関連する開発・AIプラットフォーム。自身のワークフローへの適合性を確認 | 条件を要確認 | — |
| <a id="resource-copilotkit"></a>[**CopilotKit**](https://github.com/CopilotKit/CopilotKit) | チャットとジェネレーティブUIを備えたAIコパイロットを構築するためのフレームワーク | 条件を要確認 | — |
| <a id="resource-dify"></a>[**Dify**](https://github.com/langgenius/dify) · Web | LLM搭載アプリを構築・デプロイするプラットフォーム | 条件を要確認 | — |
| <a id="resource-duet-ai"></a>[**Duet AI**](https://workspace.google.com/solutions/ai/) · Web | Google WorkspaceのAI統合 | 条件を要確認 | — |
| <a id="resource-google-ai-studio"></a>[**Google AI Studio**](https://aistudio.google.com) · Web | Geminiモデルでの構築とプロトタイピングに対応するブラウザIDE | 条件を要確認 | — |
| <a id="resource-hermes-agent"></a>[**Hermes Agent**](https://github.com/nousresearch/hermes-agent) | 永続メモリとスキル作成機能を備えた汎用AIエージェント | 条件を要確認 | — |
| <a id="resource-langflow"></a>[**Langflow**](https://github.com/langflow-ai/langflow) | AIエージェントとワークフローを視覚的に構築するツール | 条件を要確認 | — |
| <a id="resource-n8n"></a>[**n8n**](https://n8n.io/) | 関連する開発・AIプラットフォーム。自身のワークフローへの適合性を確認 | 条件を要確認 | — |
| <a id="resource-open-webui"></a>[**Open WebUI**](https://github.com/open-webui/open-webui) | ローカルモデルとホスト型モデルに対応したセルフホスト型AIインターフェース | 条件を要確認 | — |
| <a id="resource-openclaw"></a>[**OpenClaw**](https://github.com/openclaw/openclaw) | 自律型ワークフローとローカル実行に対応したパーソナルAIアシスタント | 条件を要確認 | — |
| <a id="resource-openmanus"></a>[**OpenManus**](https://github.com/mannaandpoem/OpenManus) | AI支援による文書作成フレームワーク | 条件を要確認 | — |
| <a id="resource-openpaw"></a>[**OpenPaw**](https://github.com/daxaur/openpaw) | Claude Codeを38以上のスキルを持つパーソナルアシスタントに拡張するCLIツール | 条件を要確認 | — |
| <a id="resource-pulumi"></a>[**Pulumi**](https://www.pulumi.com/) | 関連する開発・AIプラットフォーム。自身のワークフローへの適合性を確認 | 条件を要確認 | — |
| <a id="resource-serverless-autoresearch"></a>[**serverless-autoresearch**](https://github.com/roboco-io/serverless-autoresearch) | SageMaker Spotトレーニング（H100）上でKarpathyのautoresearchをHUGIパターンで並列進化させるパイプライン | 条件を要確認 | — |
| <a id="resource-smol-ai-developer"></a>[**smol-ai developer**](https://github.com/smol-ai/developer) | アプリ用の組み込み可能な開発者エージェントライブラリ | 条件を要確認 | — |
| <a id="resource-suna"></a>[**Suna**](https://github.com/kortix-ai/suna) | 開発作業用のブラウザ、コード実行、ファイルシステムを備えた汎用AIエージェント | 条件を要確認 | — |
| <a id="resource-terraform"></a>[**Terraform**](https://www.terraform.io/) | 関連する開発・AIプラットフォーム。自身のワークフローへの適合性を確認 | 条件を要確認 | — |
| <a id="resource-wordware"></a>[**Wordware**](https://www.wordware.ai/) · Web | 開発者向けノーコードAIエージェントビルダー | 条件を要確認 | — |
| <a id="resource-zapier"></a>[**Zapier**](https://zapier.com/) | 関連する開発・AIプラットフォーム。自身のワークフローへの適合性を確認 | 条件を要確認 | — |

</details>

<a id="archive"></a>
## 過去の参照資料

<details>
<summary>アーカイブを確認した実装を表示</summary>

過去の参照先を保存するための項目で、現在の入門用の推奨ではありません。旧OpenCodeリポジトリは後継として[Crush](#resource-crush)を案内しています。MCPプロジェクトの[アーカイブ済みサーバー一覧](https://github.com/modelcontextprotocol/servers#archived)には、以下の旧参照実装が記載されています。保存されたソースや後継を探す際に利用してください。

| リソース | 用途 | 利用方法・条件 | 確認日 |
|---|---|---|---|
| <a id="resource-brave-search-mcp-legacy"></a>[**Brave Search MCP (legacy)**](https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search) · MCP | Web検索用のアーカイブ済み参照実装 | アーカイブ済み参照実装 | 2026-09-18 |
| <a id="resource-github-mcp-legacy"></a>[**GitHub MCP (legacy)**](https://github.com/modelcontextprotocol/servers/tree/main/src/github) · MCP | アーカイブ済みの参照実装。保守されているGitHub連携を利用してください | アーカイブ済み参照実装 | 2026-09-18 |
| <a id="resource-opencode"></a>[**opencode**](https://github.com/opencode-ai/opencode) | アーカイブ済みリポジトリ。プロジェクトはCrushとして継続 | アーカイブ済み | 2026-09-18 |
| <a id="resource-postgresql-mcp-legacy"></a>[**PostgreSQL MCP (legacy)**](https://github.com/modelcontextprotocol/servers/tree/main/src/postgres) · MCP | PostgreSQLアクセス用のアーカイブ済み参照実装 | アーカイブ済み参照実装 | 2026-09-18 |
| <a id="resource-puppeteer-mcp-legacy"></a>[**Puppeteer MCP (legacy)**](https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer) · MCP | ブラウザ自動化用のアーカイブ済み参照実装 | アーカイブ済み参照実装 | 2026-09-18 |
| <a id="resource-slack-mcp-legacy"></a>[**Slack MCP (legacy)**](https://github.com/modelcontextprotocol/servers/tree/main/src/slack) · MCP | Slackアクセス用のアーカイブ済み参照実装 | アーカイブ済み参照実装 | 2026-09-18 |

</details>

<a id="community"></a>
## コミュニティと関連リスト

コミュニティで議論や情報収集を行い、製品に関する主張は提供元の一次情報で確認しましょう。

### コミュニティ

- [r/vibecoding](https://reddit.com/r/vibecoding) — Vibe Coding専用コミュニティ
- [r/ChatGPTCoding](https://reddit.com/r/ChatGPTCoding) — ChatGPT + コーディングワークフロー
- [r/ClaudeAI](https://reddit.com/r/ClaudeAI) — ClaudeとClaude Codeのディスカッション
- [r/CursorAI](https://reddit.com/r/CursorAI) — Cursor IDEのワークフローとヒント
- [r/copilot](https://reddit.com/r/copilot) — GitHub Copilotコミュニティ
- [r/Jetbrains](https://reddit.com/r/Jetbrains) — JetBrains IDEとAI Assistant
- [r/Tabnine](https://reddit.com/r/Tabnine) — Tabnine AIオートコンプリート
- [r/continue_dev](https://reddit.com/r/continue_dev) — Continue.devオープンソースアシスタント
- [r/LocalLlama](https://reddit.com/r/LocalLlama) — ローカルLLM開発
- [r/replit](https://reddit.com/r/replit) — ReplitとGhostwriterコミュニティ
- [Cursor Discord](https://discord.gg/cursor) — ワークフロー、拡張機能、プロジェクトショーケース
- [Lovable AI Discord](https://discord.gg/lovable) — フルスタックアプリ生成の共有
- [Bolt.new Discord](https://discord.gg/stackblitz) — 自然言語アプリ構築（StackBlitz）
- [v0 by Vercel Discord](https://discord.gg/vercel) — UI/React生成コミュニティ
- [Replit Discord](https://discord.gg/replit) — マルチプレイヤーVibe Coding

### 関連リスト

- [awesome-vibe-coding](https://github.com/filipecalegario/awesome-vibe-coding) — Vibe Codingリソースをまとめた別のキュレーションリスト
- [awesome-code-ai](https://github.com/sourcegraph/awesome-code-ai) — SourcegraphによるAIコーディングツール
- [awesome-ai-assisted-coding](https://github.com/saviorand/awesome-ai-assisted-coding) — AI支援コーディングリソース
- [awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers) — Model Context Protocolサーバー
- [awesome-chatgpt](https://github.com/humanloop/awesome-chatgpt) — ChatGPTリソース
- [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) — Cursor IDE向けコミュニティ厳選の `.cursorrules` ファイル
- [awesome-vibe-coding](https://github.com/taskade/awesome-vibe-coding) — Taskadeによる245以上のVibe Codingツール、プラットフォーム、リソース

- [MCPサーバーの総合リスト](https://github.com/wong2/awesome-mcp-servers) — この目的別リスト以外の連携機能も探せます。

<a id="contributing"></a>
<a id="contribution-guidelines"></a>
## 貢献

[Issueでリソースを提案](../../issues/new)してください。追加には **直接的な関連性、利用可能性を示す公開情報、独自の価値、利用条件と主張の透明性、保守の継続または内容の実質的な完成度** が必要です。有料製品や開発者自身による提案にも同じ基準を適用します。関係者とのつながりと重要な制約を開示してください。GitHubのスター数だけで掲載が決まることはありません。

[キュレーションポリシー](docs/curation-policy.md)と[貢献ガイド](.github/CONTRIBUTING.md)をお読みください。明確に基準を満たさないものは理由を添えて却下し、判断が難しいものはレビューのため未解決のままにします。採用した変更は英語・韓国語・日本語で同期し、公開が成功してからIssueを閉じます。

週次更新とIssueのワークフローは[Pi](https://pi.dev/)、KimiまたはQwen、[Exa Search](https://exa.ai/)を使用します。実装とメンテナー向けの操作は[自動化と設定](docs/automation.md)で説明しています。

<a id="license"></a>
## ライセンス

この作品は[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)の下でパブリックドメインに捧げられています。リンク先のプロジェクトや教材には、それぞれ独自のライセンスと利用条件が適用されます。
