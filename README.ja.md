# Awesome Vibe Coding

*Language: [English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md)*

![Vibe Coding Meme](images/vibecoding-meme.png)

**Vibe Coding**に関するリソースのキュレーションリスト。Vibe Codingとは、自然言語で意図を記述し、AIにコードを生成させるAIネイティブなプログラミングパラダイムです。

> **「完全にバイブに身を任せ、指数関数的な成長を受け入れ、コードの存在すら忘れましょう。」**
> — Andrej Karpathy、2025年2月

---

## 目次

- [Vibe Codingとは？](#vibe-codingとは)
- [主要な原則](#主要な原則)
- [ツール](#ツール)
  - [IDE & エディタアシスタント](#ide--エディタアシスタント)
  - [エージェント型コーディング環境](#エージェント型コーディング環境)
  - [MCPサーバー & ツール](#mcpサーバー--ツール)
  - [クラウド & プラットフォーム統合](#クラウド--プラットフォーム統合)
- [ワークフロー & テンプレート](#ワークフロー--テンプレート)
- [ベストプラクティス](#ベストプラクティス)
- [ドメイン別アプリケーション](#ドメイン別アプリケーション)
- [学習リソース](#学習リソース)
  - [研究論文](#研究論文)
  - [記事 & マニュアル](#記事--マニュアル)
  - [動画 & チュートリアル](#動画--チュートリアル)
- [コミュニティ](#コミュニティ)
- [関連するAwesomeリスト](#関連するawesomeリスト)
- [貢献](#貢献)

---

## Vibe Codingとは？

[Vibe Coding](https://en.wikipedia.org/wiki/Vibe_coding)は、ユーザーが自然言語で問題を記述し、AIが必要なコードを生成するAI支援プログラミングアプローチです。開発者は詳細なコードロジックを深く理解したり関与したりする必要がありません。この用語は、AI研究者の**Andrej Karpathy**が2025年2月に作りました。

### パラダイムの比較

| パラダイム | アプローチ | 人間の役割 | 最適な用途 |
|----------|----------|------------|----------|
| **従来のコーディング** | 手動での構文ベースの記述 | すべてのコードを記述/読み取り | 完全な制御、本番システム |
| **AI支援コーディング** | LLMが提案し、人間がレビュー/編集 | コードをレビューして洗練 | 監視を伴う高速開発 |
| **Vibe Coding** | 自然言語からAIへ、テストのみで評価 | 意図を導き、結果をテスト | 迅速なプロトタイピング、MVP |

---

## 主要な原則

- **自然言語第一** — 実装方法ではなく、何を望むかを記述する
- **仕様 vs バイブ** — 詳細な仕様よりも、緩やかで意図駆動の記述
- **コンテキスト管理** — 複数ターンの会話で状態を維持
- **責任の境界** — 人間が判断/テストを担当し、AIが生成を担当
- **信頼の構築** — 反復的なテストとフィードバックがAI出力への信頼を育む
- **不確実性の受容** — 行ごとのレビューではなく、テストに基づいてAIコードを受け入れる

---

## ツール

### IDE & エディタアシスタント

開発環境に統合されたAI駆動のコード補完と支援。

| ツール | 説明 | リンク |
|------|-------------|-------|
| **GitHub Copilot** | オートコンプリート、チャット、マルチIDE対応のAIペアプログラマー | [Website](https://github.com/features/copilot) |
| **Cursor** | コンテキストに応じたコード生成とインラインチャット機能を持つVS Codeフォーク | [Website](https://www.cursor.com/) |
| **Windsurf** | CodeiumのAIネイティブIDEでCascade AIとマルチLLMサポート | [Website](https://codeium.com/windsurf) |
| **Claude Code** | AnthropicのCLIベースのエージェント型コーディングアシスタント | [Docs](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview) |
| **JetBrains AI** | IntelliJ/PyCharmにMellum LLMとの深い統合 | [Website](https://www.jetbrains.com/ai/) |
| **Tabnine** | コーディングスタイルに適応する深層学習オートコンプリート | [Website](https://www.tabnine.com/) |
| **Amazon Q Developer** | AWS統合AIコーディングアシスタント | [Website](https://aws.amazon.com/q/developer/) |
| **Cline** | ファイル/ターミナル/ブラウザ自動化を備えたオープンソースAIアシスタント | [GitHub](https://github.com/cline/cline) |
| **Roo Code** | 複数の役割（アーキテクト、QA、PM）をサポートするAIアシスタント | [GitHub](https://github.com/RooVetGit/Roo-Code) |

### エージェント型コーディング環境

エンドツーエンドの開発タスクを処理する自律型AIシステム。

| ツール | 説明 | リンク |
|------|-------------|-------|
| **Devin** | Cognitionによる自律型AIソフトウェアエンジニア | [Website](https://www.cognition.ai/devin) |
| **OpenHands** | オープンソースの自律型AIソフトウェア開発者 | [GitHub](https://github.com/All-Hands-AI/OpenHands) |
| **Goose** | BlockによるMCPサポート付きオープンソースコーディングアシスタント | [Website](https://block.github.io/goose/) |
| **OpenManus** | AI支援ドキュメント作成のためのオープンソースフレームワーク | [GitHub](https://github.com/mannaandpoem/OpenManus) |
| **Vibe Compiler (vibec)** | プロンプトをコードに変換する自己コンパイルツール | [GitHub](https://github.com/Strawberry-Computer/vibe-compiler) |
| **AlphaCode** | DeepMindの競技プログラミングAI | [Website](https://alphacode.deepmind.com/) |

### MCPサーバー & ツール

AI機能を拡張する[Model Context Protocol](https://modelcontextprotocol.io/)サーバー。

| カテゴリ | サーバー | 説明 |
|----------|---------|-------------|
| **Git操作** | Git、Rube | リポジトリの読み取り/検索/操作 |
| **データベース** | ClickHouse、MongoDB、Prisma、Chroma | クエリ、マイグレーション、セマンティック検索 |
| **テスト** | CircleCI、Semgrep | CI/CD統合、コードスキャン |
| **ブラウザ** | AnyCrawl、Fetch | Webスクレイピング、コンテンツ取得 |
| **ファイルシステム** | Filesystem | 安全な読み取り/書き込み操作 |
| **DevOps** | Terraform-Cloud、Sentry | インフラストラクチャ、エラートラッキング |

📚 包括的なリストは[awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers)を参照してください。

### クラウド & プラットフォーム統合

AI支援開発のためのブラウザベースおよびクラウドプラットフォーム。

| ツール | 説明 | リンク |
|------|-------------|-------|
| **Replit** | Ghostwriter AIを備えたブラウザベースIDE | [Website](https://replit.com/) |
| **v0** | VercelのUI/React生成AI | [Website](https://v0.dev/) |
| **Bolt.new** | StackBlitzによる自然言語アプリ構築 | [Website](https://bolt.new/) |
| **Lovable** | Supabaseを使用したフルスタックアプリ生成 | [Website](https://lovable.dev/) |
| **Berrry** | ソーシャル投稿をWebアプリに変換 | [Website](https://berrry.app) |
| **Duet AI** | Google WorkspaceのAI統合 | [Website](https://workspace.google.com/solutions/ai/) |
| **Trae AI** | コンテンツ作成のためのAIプラットフォーム | [Website](https://www.trae.ai/) |

---

## ワークフロー & テンプレート

### セッションセットアップパターン

```markdown
Project: {1行の説明}
Stack: {技術スタック}
Repo layout: {主要なディレクトリ/ファイル}

Artifacts:
- PRD: {パス}
- TECH_DESIGN: {パス}
- NOTES: {パス}

Task: {1〜3文、単一の焦点}

What I want: 1) 明確化の質問 2) 短い計画 3) ステップ1の実装
```

### 推奨されるアーティファクト

リポジトリにこれらのAI可読ドキュメントを保持します。
- **PRD.md** — 製品要件とユーザーストーリー
- **TECH_DESIGN.md** — アーキテクチャ、データモデル、統合ポイント
- **NOTES.md** — 決定事項とTODOの継続的なログ
- **CHANGELOG.md** — 人間/AI維持の変更履歴

### 作業タイプ別プレイブック

| ワークフロー | 主要なステップ |
|----------|-----------|
| **新機能** | バイブブリーフ → PRDで検証 → バーティカルスライス計画 → 段階的実装 |
| **リファクタリング** | パターン/臭いを分析 → 安全戦略 → 順次小さなステップ |
| **バグ修正** | トリアージと仮説 → 最小限の失敗するテスト → 修正 → 検証 |
| **テスト生成** | 重要な動作を特定 → リスクで優先順位付け → テスト生成 |

📚 詳細なテンプレートは[Vibe Coding Prompt Template](https://github.com/KhazP/vibe-coding-prompt-template)を参照してください。

---

## ベストプラクティス

### すべきこと ✅

- **コンテキストから始める** — アーキテクチャ、制約、関連コードを提供
- **タスクを分解する** — 計画 → 生成 → テスト → リファクタリングに分割
- **テストファースト** — コードの前または同時にテストを生成
- **サンドボックスを使用** — 分離された環境でAIコードを実行
- **「ジュニアエンジニア」としてレビュー** — セキュリティとアーキテクチャのために常に人間がレビュー
- **アーティファクトを維持** — PRD、NOTES、CHANGELOGを更新し続ける

### してはいけないこと ❌

- **「簡単な」コードのレビューをスキップ** — AIは微妙なバグを導入する可能性がある
- **プロンプトに秘密を含める** — 環境変数やボールトを使用
- **パブリックモデルに独自コードを提供** — データ漏洩のリスク
- **生の出力を盲目的に受け入れる** — バイブ ≠ 検証なしのバイブ
- **複雑な決定にAIに過度に依存** — 人間が判断を処理

---

## ドメイン別アプリケーション

| ドメイン | ユースケース | ツール例 |
|--------|-----------|---------------|
| **Web/アプリ/バックエンド** | CRUDアプリ、SaaS、マイクロサービス | Lovable、Cursor、v0 |
| **データ & ML** | パイプライン生成、実験自動化 | Zapier Agents、n8n |
| **DevOps** | IaC、CI/CDセットアップ、監視 | Terraform MCP、AutoVibe |
| **研究** | ノートブック自動化、データ可視化 | ChatGPT、Claude |

---

## 学習リソース

### 研究論文

| 論文 | 焦点 | リンク |
|-------|-------|------|
| **Vibe Coding: Toward an AI-Native Paradigm** | セマンティックソフトウェア開発 | [arXiv:2510.17842](https://arxiv.org/abs/2510.17842) |
| **A Review on Vibe Coding** | 基礎、課題、将来の方向性 | [TechRxiv](https://www.techrxiv.org/users/913189/articles/1292402) |
| **Vibe Coding and AI-Led Conversational Programming** | 開発者とAIの相互作用 | [SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5469367) |
| **Vibe Coding: AI/Voice Based Code Generation** | 非コーダー向け研究ツール | [ICAIR](https://papers.academic-conferences.org/index.php/icair/article/view/3975) |

### 記事 & マニュアル

- [What is Vibe Coding? (IBM)](https://www.ibm.com/think/topics/vibe-coding) — エンタープライズの視点
- [Vibe Coding Manual (Roboco)](https://roboco.io/posts/vibe-coding-manual/) — テンプレート付き包括的ガイド
- [12 Best Practices for AI Coding (Questera)](https://www.questera.ai/blogs/12-best-practices-to-use-ai-in-coding-in-2025) — 2025年のベストプラクティス
- [Secure Vibe Coding Guide (CSA)](https://cloudsecurityalliance.org/blog/2025/04/09/secure-vibe-coding-guide) — セキュリティの考慮事項
- [Here's how I use LLMs to help me write code (Simon Willison)](https://simonwillison.net/2025/Mar/11/using-llms-for-code/) — 実践的な統合のヒント

### 動画 & チュートリアル

| 動画 | トピック | リンク |
|-------|-------|------|
| **Vibe Coding Tutorial and Best Practices** | Cursor/WindsurfでのAIエージェント | [YouTube](https://www.youtube.com/watch?v=YWwS911iLhg) |
| **Vibe Coding Is The Future** | Y CombinatorのVibe Coding | [YouTube](https://www.youtube.com/watch?v=IACHfKmZMr8) |
| **How I use LLMs** | Andrej Karpathyのガイド | [YouTube](https://www.youtube.com/watch?v=EWvNQjAaOHw) |
| **Model Context Protocol Explained** | MCPの基礎 | [YouTube](https://www.youtube.com/watch?v=VChRPFUzJGA) |
| **Windsurf: 90% of Your Code** | エージェント型IDEの詳細 | [YouTube](https://www.youtube.com/watch?v=bVNNvWq6dKo) |
| **Vibecoding is Here** | AIが開発を変える | [YouTube](https://www.youtube.com/watch?v=xxA-M3HrKrc) |
| **New Tools for Building Agents** | OpenAIのエージェントツール | [YouTube](https://www.youtube.com/watch?v=hciNKcLwSes) |
| **AI Tool Showdown (Japanese)** | Copilot vs Cursor等 | [YouTube](https://www.youtube.com/watch?v=EQHXIVItNxs) |
| **MCP in 10 Minutes** | MCPクイックイントロ | [YouTube](https://www.youtube.com/watch?v=EswVjHZMn74) |

---

## コミュニティ

### Reddit

- [r/vibecoding](https://reddit.com/r/vibecoding) — Vibe Coding専用コミュニティ
- [r/ChatGPTCoding](https://reddit.com/r/ChatGPTCoding) — ChatGPT + コーディングワークフロー
- [r/LocalLlama](https://reddit.com/r/LocalLlama) — ローカルLLM開発
- [r/replit](https://reddit.com/r/replit) — ReplitとGhostwriterコミュニティ

### Discord

- **Cursor Discord** — ワークフロー、拡張機能、プロジェクトショーケース
- **Lovable AI Discord** — フルスタックアプリ生成の共有
- **Bolt.new Discord** — 自然言語アプリ構築
- **v0 by Vercel Discord** — UI/React生成コミュニティ
- **Replit Discord** — マルチプレイヤーVibe Coding

### スターターキット

- [vibe-coding-prompt-template](https://github.com/KhazP/vibe-coding-prompt-template) — 包括的なプロンプトテンプレート
- [awesome-vibe-coding](https://github.com/filipecalegario/awesome-vibe-coding) — 別のキュレーションリスト
- [vibeworkflow.app](https://vibeworkflow.app) — Vibe Codingのワークフロー自動化

---

## 関連するAwesomeリスト

- [awesome-code-ai](https://github.com/sourcegraph/awesome-code-ai) — SourcegraphによるAIコーディングツール
- [awesome-ai-assisted-coding](https://github.com/saviorand/awesome-ai-assisted-coding) — AI支援コーディングリソース
- [awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers) — Model Context Protocolサーバー
- [awesome-chatgpt](https://github.com/humanloop/awesome-chatgpt) — ChatGPTリソース

---

## 貢献

このリポジトリを強化するための貢献を歓迎します。以下のガイドラインに従ってください。

1. **フォーク & ブランチ作成** — このリポジトリをフォークし、フィーチャーブランチを作成
2. **貢献を追加** — 既存の形式に従う：`[名前](URL) — 説明`
3. **コミット & プッシュ** — 説明的なコミットメッセージを使用
4. **プルリクエスト作成** — 貢献内容を明確に説明

### キュレーション原則

リソースは以下であるべきです。
- **関連性** — Vibe CodingまたはAI支援開発に直接関連
- **品質** — 適切に維持され、文書化され、積極的に使用されている
- **アクセス可能性** — 無料または無料ティアが利用可能なものが望ましい

---

## ライセンス

この作品は[CC0 1.0 Universal License](https://creativecommons.org/publicdomain/zero/1.0/)の下でパブリックドメインに捧げられています。
