# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.1.0] - 2026-10-31

### Added
- **Smart-Hybrid 2-Mode Complexity Threshold Gate (Mode A vs. Mode B)**:
  - **Mode A — Direct Execution (`TIER 0`)**: Simple tasks, Q&A, single-domain bug fixes, and edits touching **≤ 3 files** (without an explicit `/cmd`) execute directly with zero sub-agent cold-start overhead while enforcing **Professional Coding Standards** (≤ 300 lines/file, ≤ 25 lines/fn) and **Persistent Testing & Bug Fixing**.
  - **Mode B — Strict Multi-Agent Orchestration (`TIER 1`)**: Triggered by explicit `/cmd` workflows (`/cook`, `/fix`, `/plan:hard`, `/review:team`, etc.), tasks touching **> 3 files**, spanning **≥ 2 domains**, or requiring architectural design.
- **Antigravity 2.0 Native Sub-Agent & Interactive UI Primitives**:
  - First-class support for `define_subagent`, `invoke_subagent`, `send_message` (with **Reactive Async Wakeup**), `manage_subagents`, and `manage_task` across all rules and workflows (while retaining `runSubagent` cross-platform compatibility).
  - Empowered `brainstormer` and `planner` agents with Antigravity 2.0's native `ask_question` interactive multiple-choice UI tool.
  - Empowered `designer` and `reporter` agents with `generative_ui` (`<agent-embed>`) and Mermaid diagrams for interactive prototypes and visual reports.
- **Brain Artifact Routing (Clean Git Working Tree)**:
  - Defaulted transient deliverables (`BRAINSTORM`, `RESEARCH`, `SCOUT`, `DESIGN`, `PLAN`, `DEBUG`, `TEST`, `REVIEW`, `REPORT`, `MAILBOX`, `SESSION-HANDOVER`) on Antigravity 2.0 to `<appDataDir>\brain\<conversation-id>\` so deliverables render natively in the Artifact UI pane without polluting `git status`.
- **Root `SKILL.md` & `commands/cook.md` Router**:
  - Added root `SKILL.md` for native skill discovery of `boomopen-workflow-kit` and `commands/cook.md` router for `/cook` (`:fast`, `:hard`, `:team`).
  - Upgraded `/save` (`commands/save.md`) and `/recap` (`commands/recap.md`) to v5.1 with dual Brain Artifact (`SESSION-HANDOVER.md`) and `.brain/` support.

### Changed
- **Fast 2-Step Progressive Skill Lookup (`rules/SKILLS.md`)**:
  - Replaced legacy 6-phase math fitness formulas with a fast 2-step lookup: Step 1 checks pre-loaded `<skills>` (`~/.gemini/config/skills/`); Step 2 uses `skill-seeker` to search `~/.gemini/config/skills_library/` on demand.
- **Unified Language Rule (CORE Law 6)**:
  - Standardized across all entrypoints, rules, commands, and agents: respond in the user's language, write code/comments in English, and write deliverables/reports/docs in the user's input language (keeping technical terms in English).
- **Installer (`cli/install.js`) Hardening & Speed Optimization**:
  - Consolidated Antigravity framework installation into `~/.gemini/config/skills/boomopen-workflow-kit/`, stripping legacy `AGENT-ASSISTANT` blocks from `~/.gemini/GEMINI.md` and preserving `commands/_ref/` during flat command installation.
  - Added fast completeness check for `skills_library` (reducing reinstall time to ~5.6 seconds) and fixed `verifyInstallation()` tracking after subdirectory cleanup (`5997/5997` files verified with 0 warnings).
  - Relocated destructive command validation hook to `code-assistants/antigravity-assistant/hooks/validate-tool-call.mjs`.

### Removed
- Removed 13 duplicate legacy v2.0 subdirectories under `commands/` (`ask`, `brainstorm`, `code`, `cook`, `debug`, `deploy`, `design`, `docs`, `fix`, `plan`, `report`, `review`, `test`), standardizing on flat `commands/*.md` + `commands/_ref/*.md`.
- Removed foreign `AG Kit` remnant files (`rules/code-rules.md`, `rules/core-protocol.md`, `rules/design-rules.md`, `rules/quick-reference.md`, `rules/request-routing.md`, `rules/universal-rules.md`, `.agents/`, `MIGRATION.md`, `SECURITY.md`).

## [1.3.2] - 2026-03-30

### Removed
- **Focus workflow variant deprecation (complete)**:
  - Removed remaining focus workflow files and command-level focus routing references.
  - Removed focus variant mentions from active command metadata and workflow documentation.

## [1.3.1] - 2026-03-26

### Changed
- **Documentation Workflows — Folder-Based Architecture**: Migrated all 3 `/docs` sub-command workflows (`/docs:core`, `/docs:business`, `/docs:audit`) from single-file to folder-based structure with `00-index.md` + numbered sub-files, Thinking Protocol, and Evidence Ledger.

## [1.3.0] - 2026-03-23

### Added
- **1400+ Domain Skills**: Expanded skill library across 19 domains with automatic Matrix Skill Discovery.

## [1.2.2] - 2026-03-12

### Fixed
- **Context Gate Enforcement**: Replaced `rules/CONTEXT-GATE.md` with phase-specific blocking checkpoints in Golden Triangle workflows.

## [1.2.0] - 2026-03-09

### Added
- **Agent Teams — Golden Triangle Architecture**: Adversarial 3-agent collaboration (`Tech Lead`, `Executor`, `Reviewer`) with Mailbox communication and `:team` command variants.
- **Codex Support**: Full integration of OpenAI Codex (`~/.codex/`).

## [1.1.0] - 2026-02-03

### Added
- **HSOL Documentation**: Hybrid Skill Orchestration Layer architecture and dynamic skill manifest.

## [1.0.0] - 2026-01-26

### Added
- **Initial Release**: Core multi-agent orchestration framework and CLI installer for Cursor, GitHub Copilot, Claude Code, Codex, and Antigravity.
