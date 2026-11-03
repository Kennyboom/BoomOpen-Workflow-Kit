# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.5.0] - 2026-11-03

### Added
- **3-Surface Unified Settings & Mode Selection Control Center (`cli/settings.js`, `cli/settings-ui.js`, `commands/settings.md`)**:
  - Added `/settings` (and `/config`) in-chat interactive control center, Local Web Dashboard (`npm run settings:ui` at `http://127.0.0.1:4567`), and Terminal CLI (`npm run settings -- ...`) with `< 10ms` AOT hot-sync (`<!-- BOOMOPEN-SETTINGS-START -->`) across all 5 platforms (`GEMINI.md`, `CLAUDE.md`, `CODEX.md`, `CURSOR.md`, `COPILOT.md`).
  - Added 4 one-click presets (`smart-hybrid`, `solo-fast`, `deep-architect`, `adversarial-team`) and defaulted `workflows.naturalLanguageResearchTrigger` to `auto_team` so natural-language research/ideation requests automatically activate the 3-agent Golden Triangle (`/brainstorm:team`).
- **Official Full HD Launch Trailers & 17-Language Localized Documentation (`README.md`, `i18n/README.*.md`, `assets/media/*`)**:
  - Embedded Full HD 1080p launch trailers (`boomopen_v55_trailer_en.mp4` and `boomopen_v55_trailer_vi.mp4`) and 16 pure localized README translations (`vi`, `zh-CN`, `zh-TW`, `ja`, `ko`, `es`, `fr`, `de`, `pt-BR`, `ru`, `hi`, `ar`, `id`, `th`, `tr`, `it`) with 100% valid HTML header navigation.
- **Unified 5-Platform Architecture (`platforms/{antigravity,claude,codex,copilot,cursor}/`)**:
  - Standardized all platform configuration bundles under `platforms/<tool>/` and added `install:claude` / `uninstall:claude` scripts in `package.json`.
  - Upgraded all 5 platform templates (`platforms/antigravity/*`, `platforms/claude/CLAUDE.md`, `platforms/codex/CODEX.md` & `agents/*.toml`, `platforms/copilot/boomopen-workflow-kit.agent.md`, `platforms/cursor/.cursorrules` & `rules/boomopen-workflow-kit.mdc`) and all 6 root entrypoints (`GEMINI.md`, `CLAUDE.md`, `CODEX.md`, `COPILOT.md`, `CURSOR.md`, `AGENT.md`) to 100% `v5.5` Smart-Hybrid parity.
  - Embedded **Pragmatic 2-Tier Coding Standards**, **Persistent Testing & Bug Fixing**, **2-Mode Smart Complexity Threshold Gate (Mode A vs. Mode B)**, **Quality-First Model Policy (`Model: "inherit"`)**, **DAG Parallel Fan-Out**, **Direct Plan-to-Executor Dispatch**, **Contract-First Handoffs (`SHARED_CONTRACT` + `OWNED_FILES`)**, and flat command routing (`commands/{cmd}-{variant}.md`) across all 5 platforms.
- **Complete Legacy Name & Path Cleanup (`scripts/*.py`, `documents/**/*.md`, `cli/doctor.js`)**:
  - Updated `scripts/auto_preview.py`, `scripts/checklist.py`, `scripts/session_manager.py`, and `scripts/verify_all.py` to BoomOpen Workflow Kit branding and real `skills/.../scripts/*.py` paths.
  - Updated all architecture and source-base documentation (`documents/**/*.md`) to reference `platforms/<tool>/`.
  - Enhanced `cli/doctor.js` and `cli/install.test.js` to validate all 5 platform bundles and enforce zero legacy directory/branding references across the repository.

## [5.4.0] - 2026-10-31

### Added
- **Pragmatic 2-Tier Coding Standards (`~/.gemini/GEMINI.md`, `GEMINI.md`, `rules/CORE.md`, `documents/knowledge-standards/01-code-style.md`, `skills/clean-code/SKILL.md`)**:
  - Replaced rigid mechanical line-count limits (`≤ 300` lines/file, `≤ 25` lines/function) with **Pragmatic 2-Tier Coding Standards** (Tier 1 strict type/error safety + Tier 2 cohesive structure with `~200–350` target, `≤ 400–450` soft ceiling, `>500` hard split).
- **2-Tier CLI Code Checker & Recursive Doctor (`cli/checker.js`, `cli/doctor.js`, `cli/install.test.js`)**:
  - Updated `cli/checker.js` with `SOFT_FILE_LINES = 400` and `HARD_FILE_LINES = 500` (exempting `*.test.*`, `*.spec.*`, `*.d.ts`, `install.js`), and updated `cli/doctor.js` to recursively validate `agents/teams/**/*.md`.
- **Synchronized Core Skills (`skills/`) & 5-Whys (SPIE v3.0) Debugging (`agents/debugger.md`, `commands/debug-*.md`)**:
  - Upgraded `agents/debugger.md`, `skills/debugger/SKILL.md`, `commands/debug-hard.md`, and `commands/debug-fast.md` with the **5-Whys (SPIE v3.0)** causal framework.

## [5.3.0] - 2026-10-31

### Added
- **Direct Plan-to-Executor Dispatch**, **Stateful Warm Sub-agent Reuse Registry (`send_message` by `conversationId`)**, **Contract-First Parallel Dispatch & File Ownership Locks (`SHARED_CONTRACT` + `OWNED_FILES`)**, and **Warm Sub-agent Auto-Revive (`E0`)**.

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
