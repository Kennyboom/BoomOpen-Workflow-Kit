<div align="center">
  <h1>⚡ BoomOpen Workflow Kit v5.5.0</h1>
  <p><strong>マルチプラットフォーム対応 スマートハイブリッド AI 開発オペレーティングシステム & マルチエージェント・オーケストレーションフレームワーク</strong></p>

  [![Version: 5.5.0](https://img.shields.io/badge/Version-5.5.0-7c3aed.svg)](https://github.com/Kennyboom/BoomOpen-Workflow-Kit/releases)
  [![Platforms: 5 Unified](https://img.shields.io/badge/Platforms-Antigravity%20%7C%20Claude%20%7C%20Codex%20%7C%20Cursor%20%7C%20Copilot-0ea5e9.svg)](#)
  [![Agents: 21 Specialists + 17 Teams](https://img.shields.io/badge/Agents-21%20Specialists%20%2B%2017%20Teams-10b981.svg)](#)
  [![Skills: 48 Core + 1,430+ Library](https://img.shields.io/badge/Skills-48%20Core%20%2B%201%2C430%2B%20Library-f59e0b.svg)](#)
  [![Node.js: >=18.0.0](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-22c55e.svg)](https://nodejs.org/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](../LICENSE)

  <p>
    [🇬🇧 English](../README.md) • [🇻🇳 Tiếng Việt](./README.vi.md) • [🇨🇳 简体中文](./README.zh-CN.md) • [🇹🇼 繁體中文](./README.zh-TW.md) • **🇯🇵 日本語** • [🇰🇷 한국어](./README.ko.md) • [🇪🇸 Español](./README.es.md) • [🇫🇷 Français](./README.fr.md) • [🇩🇪 Deutsch](./README.de.md)<br/>
    [🇧🇷 Português](./README.pt-BR.md) • [🇷🇺 Русский](./README.ru.md) • [🇮🇳 हिन्दी](./README.hi.md) • [🇸🇦 العربية](./README.ar.md) • [🇮🇩 Bahasa Indonesia](./README.id.md) • [🇹🇭 ไทย](./README.th.md) • [🇹🇷 Türkçe](./README.tr.md) • [🇮🇹 Italiano](./README.it.md)
  </p>
</div>

---

## 🌟 BoomOpen Workflow Kit v5.5 とは？

**BoomOpen Workflow Kit v5.5（Multi-Platform Unified & Smart-Hybrid Edition）** は、単一の AI コーディングアシスタントを **21 名の専門エージェント（Specialist Agents）**、**17 組のゴールデントライアングル・チーム（Golden Triangle Teams）**、**48 個のコアスキル（Core Skills）**、および **1,430 以上の専門ライブラリスキル（`skills_library`）** から成るエンジニアリング組織へと進化させるオープンソースのマルチエージェント OS です。

簡単な質問にも毎回コールドスタート遅延を発生させていた従来の重いエージェントラッパーとは異なり、BoomOpen v5.5 は **2モード・スマート複雑度ゲート（2-Mode Smart Complexity Threshold Gate）** を導入しています：
- **⚡ Mode A — 直接実行モード（コールドスタート 0 秒）**：日常的な Q&A、コード解説、単一ドメインのバグ修正、または **3 ファイル以下**（`/cmd` スラッシュコマンドなし）の明確な変更は、メインエージェントが**直接**実行・テスト・検証し、**実践的 2 階層コーディング規約（Pragmatic 2-Tier Coding Standards）** と **徹底的な検証・バグ修正（Persistent Testing & Bug Fixing）** を適用します。
- **🎻 Mode B — 厳格マルチエージェント・オーケストレーション（Strict Multi-Agent Orchestration）**：複雑な機能開発（**4 ファイル以上** または **2 ドメイン以上**）や明示的な `/cmd` ワークフロー実行時には、**DAG 並列ファンアウト（Parallel Fan-Out）**、**計画から実行役への直接ディスパッチ（Direct Plan-to-Executor Dispatch）**、**契約ファーストのファイルロック（`SHARED_CONTRACT` + `OWNED_FILES`）**、および **ウォームサブエージェント再利用（`send_message`）** を駆使した厳格なオーケストレーターモードを起動します。

---

## 🏗️ スマートハイブリッド・アーキテクチャ (v5.5)

```mermaid
flowchart TD
    User["👤 ユーザーリクエスト / スラッシュコマンド"] --> Gate{"🚦 2モード・スマート複雑度ゲート"}
    Gate -->|"≤ 3 ファイル, 単一ドメイン, /cmd なし"| ModeA["⚡ Mode A: 直接実行 (Tier 0)<br/>0秒起動 + 実践的2階層コーディング規約"]
    Gate -->|"> 3 ファイル, ≥ 2 ドメイン, または /cmd"| ModeB["🎻 Mode B: マルチエージェント・オーケストレーター (Tier 1)<br/>Model: inherit (Pro High デフォルト)"]

    ModeB --> FanOut["🔀 フェーズ 1: DAG 並列ファンアウト<br/>(researcher + scouter | debugger + researcher)"]
    FanOut --> Plan["📋 フェーズ 2: 契約ファースト設計 (planner)<br/>SHARED_CONTRACT + OWNED_FILES をロック"]
    Plan --> Dispatch{"🎯 実行バリアント分岐"}

    Dispatch -->|":fast / :hard"| Direct["⚡ 計画からエンジニアへ直接並列ディスパッチ<br/>(backend-engineer + frontend-engineer)"]
    Dispatch -->|":team"| Triangle["🔺 ゴールデントライアングル対抗レビューチーム<br/>(TechLead ⇄ Executor ⇄ Reviewer via MAILBOX)"]

    Direct --> Verify["🧪 フェーズ 4: 自動検証 & ウォームセッション再利用<br/>tester + reviewer (send_message 0秒ループ)"]
    Triangle --> Verify
```

---

## 🧠 v5.5 の 6 つのコアピラー（柱）

1. **🌐 5 大プラットフォーム完全統合サポート (`platforms/*`)**：
   - 単一の統合アーキテクチャから **Google Antigravity 2.0 (Gemini)**、**Claude Code**、**OpenAI Codex**、**Cursor**、**GitHub Copilot** の 5 大 AI ツールをネイティブサポートします。
2. **📏 実践的 2 階層コーディング規約（Pragmatic 2-Tier Coding Standards — 機械的なファイル細分化の防止）**：
   - **Tier 1 — 厳格な品質・安全ルール（ゼロトレランス）**：単一責任の原則（Single Responsibility）、**明示的な `any` の完全禁止**、**本番コードでのデバッグ用 `console.log` 放置禁止**、非同期/API 境界での `try/catch` と型付きエラー処理の徹底、`SCREAMING_SNAKE_CASE` 定数、DRY（3 回以上の重複を共通化）、クリーンな import 整理。
   - **Tier 2 — 柔軟な構造ガイドライン（凝集度優先）**：ファイル行数の目安は `~200–350 行`、凝集度の高い単一責務モジュールは `~400–450 行` まで許容（`500 行超` または複数ドメイン混在時のみ分割を強制。テスト・型定義・CLI・ドキュメントは除外）。関数はロジック `~20–40 行`、UI/ハンドラ `~40–80 行` が目安です。
3. **🎯 計画から実行者への直接ディスパッチ & ウォームサブエージェント再利用 (`send_message`)**：
   - `PLAN-{feature}.md` が作成された後は、`tech-lead` を中継せずドメインエンジニア（`backend-engineer`、`frontend-engineer`、`database-architect` 等）へ**直接タスクをディスパッチ**します。
   - 起動済みサブエージェントは **アクティブセッション・レジストリ (`Role → conversationId`)** に記録され、`send_message` で **コールドスタート 0 秒**・**ファイル文脈 100% 保持** のまま再利用されます。
4. **🤝 契約ファーストの並列ディスパッチ (`SHARED_CONTRACT` + `OWNED_FILES`)**：
   - 複数ドメインにまたがる計画では、並列実装の前に API エンドポイント・DTO スキーマ（`SHARED_CONTRACT`）と排他的な書き込み許可ファイル（`OWNED_FILES` vs. `READ_ONLY_FILES`）をロックし、競合やインターフェース不整合を完全に防ぎます。
5. **🔍 5-Whys (SPIE v3.0) 根本原因デバッグ & 100% クリーンな Git ツリー**：
   - `debugger` は最低 3 つの仮説検証と **5-Whys 因果チェーン**（`Why 1 直接の症状` → `Why 5 システム的根本原因`）でバグを追跡します。一時成果物（`PLAN`、`DEBUG`、`TEST`、`REVIEW`、`MAILBOX`）は `<appDataDir>\brain\<conversation-id>\` に出力され、Git 作業ツリーを 100% クリーンに保ちます。
6. **🩺 組み込み CLI 診断 (`doctor` & `check`) & O(1) スキルインデックス**：
   - `npm run doctor` は 5 つのプラットフォーム資産、21 エージェント、51 チームファイル、72 コマンド、および `matrix-skills/compact-index.json`（`1,430+` スキル）を検証します。`npm run check <dir>` は Tier 1・Tier 2 コーディング規約を自動監査します。

---

## 💻 サポート対象の AI プラットフォーム

| プラットフォーム | サポートレベル | グローバルエントリーポイント | フレームワークインストールパス |
|----------|:-------------:|-------------------|------------------------|
| **Antigravity (Gemini)** | ✅ ネイティブ v5.5 | `~/.gemini/GEMINI.md` | `~/.gemini/config/skills/boomopen-workflow-kit/` |
| **Claude Code** | ✅ ネイティブ v5.5 | `~/.claude/CLAUDE.md` | `~/.claude/skills/boomopen-workflow-kit/` |
| **OpenAI Codex** | ✅ ネイティブ v5.5 | `~/.codex/CODEX.md` & `AGENTS.md` | `~/.codex/skills/boomopen-workflow-kit/` |
| **Cursor** | ✅ ネイティブ v5.5 | `~/.cursor/rules/boomopen-workflow-kit.mdc` | `~/.cursor/skills/boomopen-workflow-kit/` |
| **GitHub Copilot** | ✅ ネイティブ v5.5 | `~/.copilot/COPILOT.md` | `~/.copilot/skills/boomopen-workflow-kit/` |

---

## 🚀 クイックスタート & インストール

```bash
# 1. リポジトリをクローン
git clone https://github.com/Kennyboom/BoomOpen-Workflow-Kit.git
cd BoomOpen-Workflow-Kit

# 2. お使いの AI コーディングアシスタント向けにインストール（1つ選択、または --all）
npm run install:antigravity   # Google Antigravity 2.0 (Gemini)
npm run install:claude        # Anthropic Claude Code
npm run install:codex         # OpenAI Codex CLI
npm run install:cursor        # Cursor AI Editor
npm run install:copilot       # GitHub Copilot (VS Code)
npm run install:all           # All 5 platforms

# 3. ヘルスチェック、2階層コード規約チェック、自動テストの実行
npm run doctor
npm run check ./cli
npm test
```

---

## 🎛️ Unified Settings & Mode Selection (`/settings` Control Center)

Switch execution modes (`auto` | `mode_a` | `mode_b` | `team`), 4 one-click presets (`smart-hybrid`, `solo-fast`, `deep-architect`, `adversarial-team`), and 12 system settings across all 5 platforms in `< 10ms` with **0ms Turn-1 latency**:

```bash
# 1. In-Chat Slash Command (Interactive UI Widget or One-Liner)
/settings                                     # Open interactive ask_question menu
/settings preset smart-hybrid                 # Default Recommended (Auto Mode A/B + auto_team)
/settings preset solo-fast                    # Force Mode A Direct Fast Execution
/settings preset deep-architect               # Force Mode B Multi-Agent Orchestrator
/settings preset adversarial-team             # Force Golden Triangle 3-Agent (:team)
/settings mode auto | mode_a | mode_b | team  # Override execution.mode directly

# 2. Local Web Control Center Dashboard (http://127.0.0.1:4567)
npm run settings:ui

# 3. Terminal CLI (Global ~/.boomopen/settings.json & Project ./.boomopen.json)
npm run settings -- status
npm run settings -- preset adversarial-team
npm run settings -- reset
```

---

## 🎯 スラッシュコマンド一覧

| コマンド | バリアント | 主な用途 |
|---------|----------|-----------------|
| **`/cook`** | `:fast`, `:hard`, `:team` | エンドツーエンドの機能開発（調査/スカウト → 計画 → 並列実装 → テスト → レビュー） |
| **`/code`** | `:fast`, `:hard`, `:team` | 既存の `PLAN-{feature}.md` に基づく直接実装と検証 |
| **`/plan`** | `:fast`, `:hard`, `:team` | `SHARED_CONTRACT`、`OWNED_FILES`、Given/When/Then 基準を含む実装ブループリント作成 |
| **`/fix`** | `:fast`, `:hard`, `:team` | 根本原因のバグ修正と必須回帰テストによる検証 |
| **`/debug`** | `:fast`, `:hard`, `:team` | 3つの仮説検証 + **5-Whys (SPIE v3.0)** による根本原因調査（`DEBUG-{issue}.md`） |
| **`/test`** | `:fast`, `:hard`, `:team` | DAG 並列ファンアウトによるテスト実行 + 未カバー境界ケースの探索（`tester` + `scouter`） |
| **`/review`** | `:fast`, `:hard`, `:team` | 4方向並列監査（アーキテクチャ、コード品質、OWASP セキュリティ、パフォーマンス） |
| **`/design`** | `:fast`, `:hard`, `:team` | システムアーキテクチャ、DB スキーマ、UI/UX 仕様書の策定（`DESIGN.md`） |
| **`/docs`** | `:core`, `:business`, `:audit` | 2階層構造のアーキテクチャ・ビジネスドキュメントの生成と同期（`./documents/`） |
| **`/deploy`** | `:check`, `:preview`, `:production`, `:rollback` | デプロイ前ゲートチェック、プレビュー環境、本番ロールアウト、安全なロールバック |
| **`/brainstorm`** | `:fast`, `:hard`, `:team` | ソクラテス式対話による要件定義、トレードオフ分析、アイデア創出 |
| **`/report`** | `:fast`, `:hard`, `:team` | メトリクスと図表を含む技術・エグゼクティブレポートの作成 |
| **`/orchestrate`** | — | 複数ドメインにまたがるカスタム・マルチエージェントパイプラインの編成 |
| **`/save` / `/recap`** | — | セッション状態（`SESSION-HANDOVER.md`）の保存と `< 5秒` での文脈復元 |

---

## 🤖 21 名の専門エージェント & 17 組のゴールデントライアングル・チーム

| カテゴリ | 専門エージェント (`agents/*.md`) | ゴールデントライアングル・チーム (`agents/teams/*-team/`) |
|----------|-----------------------------------|------------------------------------------------|
| **エンジニアリング & 実装** | `backend-engineer`, `frontend-engineer`, `mobile-engineer`, `game-engineer`, `database-architect`, `devops-engineer` | `backend-team`, `frontend-team`, `fullstack-team`, `mobile-team`, `game-team`, `database-team`, `devops-team` |
| **アーキテクチャ & 計画** | `tech-lead`, `planner`, `brainstormer`, `business-analyst`, `project-manager`, `designer` | `planning-team`, `project-team`, `design-team` |
| **品質・セキュリティ & デバッグ** | `debugger`, `tester`, `reviewer`, `security-engineer`, `performance-engineer` | `debug-team`, `qa-team`, `review-team`, `security-team`, `performance-team` |
| **リサーチ & ナレッジ** | `researcher`, `scouter`, `docs-manager`, `reporter` | `research-team`, `docs-team`, `report-team` |

---

## 📂 リポジトリ構成

```text
BoomOpen-Workflow-Kit/
├── agents/                  # 21 の専門エージェント定義 + 17 のゴールデントライアングル・チーム（51 ロールファイル）
├── cli/                     # インストーラー (install.js)、Doctor (doctor.js)、2階層コードチェッカー (checker.js) & テスト
├── commands/                # 72 のスラッシュコマンドワークフロー (:fast, :hard, :team) + _ref/ プロトコル
├── documents/               # 2階層アーキテクチャ、ドメイン、ソースベース、コーディング規約ドキュメント
├── i18n/                    # 多言語ドキュメント（主要 16 言語の完全翻訳版 README）
├── matrix-skills/           # ドメイン別 YAML スキルマトリクス + 事前コンパイル済み compact-index.json (1,430+ スキル)
├── platforms/               # 5大プラットフォーム統合テンプレート (antigravity/, claude/, codex/, copilot/, cursor/)
├── rules/                   # Mode B オンデマンドルール (CORE, PHASES, AGENTS, TEAMS, SKILLS, ERRORS, REFERENCE)
├── scripts/                 # Python 自動検証・補助スクリプト (checklist.py, verify_all.py など)
├── skills/                  # 48 のコアスキル (clean-code, debugger, plan-writing, frontend-design など)
├── skills_library/          # 2ステップ高速検索でオンデマンド読み込みされる 1,430+ の専門スキルライブラリ
└── GEMINI.md | CLAUDE.md | CODEX.md | COPILOT.md | CURSOR.md | AGENT.md
```

---

## 📄 ライセンス & セキュリティ

- **ライセンス**：[MIT License](../LICENSE) の下で配布されています。Copyright © 2026 **Kennyboom (BoomOpen)**。
- **セキュリティポリシー**：組み込みのセキュリティ保護機能と脆弱性の報告手順については、[SECURITY.md](../SECURITY.md) をご覧ください。
