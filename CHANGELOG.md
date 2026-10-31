# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.4.0] - 2026-10-31

### Added
- **Pragmatic 2-Tier Coding Standards (`~/.gemini/GEMINI.md`, `GEMINI.md`, `rules/CORE.md`, `documents/knowledge-standards/01-code-style.md`, `skills/clean-code/SKILL.md`)**:
  - Replaced rigid mechanical line-count limits (`≤ 300` lines/file, `≤ 25` lines/function) with **Pragmatic 2-Tier Coding Standards**:
    - **Tier 1 (Strict Quality & Safety — Zero Tolerance)**: No `any`, no magic numbers, no leftover debug `console.log`, mandatory `try/catch` + typed errors on async/API boundaries, clean sorted imports, and semantic naming.
    - **Tier 2 (Flexible Structural Guidelines — Cohesion Over Mechanical Line Cutting)**: Target `~200–350` lines/file with a `~400–450` line soft ceiling for cohesive modules (`>500` lines hard split; test/spec/type files exempt), `~25–40` lines/function (`≤ 60` lines for linear UI JSX, switch reducers, or config builders), and the **Anti-Fragmentation Rule** prohibiting artificial splitting of cohesive classes/components.
- **2-Tier CLI Code Checker & Recursive Doctor (`cli/checker.js`, `cli/doctor.js`, `cli/install.test.js`)**:
  - Updated `cli/checker.js` with `SOFT_FILE_LINES = 400` (warning `401–500` lines) and `HARD_FILE_LINES = 500` (violation `>500` lines), while automatically exempting `*.test.*`, `*.spec.*`, `*.d.ts`, and `install.js`.
  - Updated `cli/doctor.js` (`MAX_ENTRY_LINES = 350`, `MAX_DOC_LINES = 450`) to recursively validate all `agents/teams/**/*.md` files while preserving 100% of the 14 `agents/teams/*/reviewer.md` review checklists (`322–406` lines).
- **Synchronized Core Skills (`skills/`) & 5-Whys (SPIE v3.0) Debugging (`agents/debugger.md`, `commands/debug-*.md`)**:
  - Upgraded `agents/debugger.md`, `skills/debugger/SKILL.md`, `commands/debug-hard.md`, and `commands/debug-fast.md` with the **5-Whys (SPIE v3.0)** causal framework and `<appDataDir>\brain\<conversation-id>\DEBUG-{issue}.md` routing.
  - Upgraded `skills/clean-code/SKILL.md`, `skills/plan-writing/SKILL.md`, `skills/intelligent-routing/SKILL.md`, `skills/frontend-design/SKILL.md`, `skills/mobile-developer/SKILL.md`, and `skills/doc.md` to v5.4 (removing legacy `.brain/session.json` references, fixing broken relative paths, and enforcing `Model: "inherit"`).
- **Full v5.4 Synchronization Across All 21 Agents, 51 Team Files & 72 Commands**:
  - Upgraded `commands/code-fast.md`, `commands/fix-fast.md`, `commands/test-hard.md` (with DAG Parallel Fan-Out for `tester` + `scouter`), `commands/test-fast.md`, `commands/review-fast.md`, and all `agents/teams/*/*.md` mailbox/plan paths to prioritize `<appDataDir>\brain\<conversation-id>\` before `./reports/{topic}/`.

## [5.3.0] - 2026-10-31

### Added
- **Direct Plan-to-Executor Dispatch (`rules/AGENTS.md`, `rules/PHASES.md`, `commands/*-hard.md`, `agents/tech-lead.md`)**:
  - Eliminated the redundant `Orchestrator → tech-lead → domain-engineer` double-hop in `:fast`, `:hard`, and `/orchestrate` workflows once `PLAN-{feature}.md` exists.
- **Stateful Warm Sub-agent Reuse Registry (`send_message` by `conversationId`)**:
  - Added the **Active Sub-agent Session Registry (`Role → conversationId`)** across `GEMINI.md`, `rules/CORE.md`, `rules/AGENTS.md`, `rules/PHASES.md`, `rules/TEAMS.md`, and `commands/_ref/implementation-loop.md`.
- **Contract-First Parallel Dispatch & File Ownership Locks (`SHARED_CONTRACT` + `OWNED_FILES`)**:
  - Upgraded `agents/planner.md`, `rules/AGENTS.md`, `rules/PHASES.md`, and `commands/orchestrate.md` with the mandatory 5-field **Structured Handoff Packet**.
- **Warm Sub-agent Auto-Revive (`E0`) in `rules/ERRORS.md`**:
  - Upgraded `rules/ERRORS.md` to v5.3 with `E0: Sub-agent Interrupted / Server Restart` automatic revival via `send_message(Recipient: conversationId)` and anti-patterns `A1`–`A12`.

## [5.2.0] - 2026-10-31

### Added
- **Quality-First Model Policy (`Model: "inherit"` / Pro High Default)**, **DAG-Aware Parallel Fan-Out Execution**, and **Pre-Compiled Compact Skill Index (`matrix-skills/compact-index.json`) & CLI `doctor` / `check`**.

## [5.1.0] - 2026-10-31

### Added
- **Smart-Hybrid 2-Mode Complexity Threshold Gate (Mode A vs. Mode B)**, Antigravity 2.0 native primitives, and Brain Artifact routing (`<appDataDir>\brain\<conversation-id>\`).

## [1.3.2] - 2026-03-30

### Removed
- Removed deprecated `focus` workflow variants across commands and documentation.

## [1.2.0] - 2026-03-09

### Added
- **Golden Triangle Agent Teams (`:team`)** and **OpenAI Codex (`~/.codex/`)** support.

## [1.0.0] - 2026-01-26

### Added
- Initial release of BoomOpen Workflow Kit and CLI installer.
