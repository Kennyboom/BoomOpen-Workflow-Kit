# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.2.0] - 2026-10-31

### Added
- **Quality-First Model Policy (`Model: "inherit"` / Pro High Default)**:
  - Enforced across `GEMINI.md`, `SKILL.md`, `rules/CORE.md`, `rules/AGENTS.md`, `rules/PHASES.md`, and `commands/*.md`: all 21 specialist agents across engineering, architecture, planning, scouting, debugging, testing, reviewing, security, design, and documentation **MUST use `Model: "inherit"` (or `"pro"` — User's Pro High model)** so reasoning and code quality never degrade.
  - Restricted `Model: "flash"` (Latest Flash High) strictly to trivial mechanical chores (raw log aggregation, simple formatting, status ping).
  - Strictly banned `flash_lite` across all BoomOpen workflows.
- **DAG-Aware Parallel Fan-Out Execution (`rules/PHASES.md`, `rules/CORE.md`, `commands/*-hard.md`)**:
  - Replaced rigid single-file sequential phase queueing with **DAG-Aware Parallel Fan-Out**: independent phases (`researcher` + `scouter` in `/cook:hard`, `/plan:hard`, `/ask:hard`; `debugger` + `researcher` in `/fix:hard`; 4-way `tech-lead` + `reviewer` + `security-engineer` + `performance-engineer` in `/review:hard`; decoupled `backend-engineer` + `frontend-engineer` in implementation) launch concurrently in a single turn via multiple `invoke_subagent` calls and join via Reactive Async Wakeup.
- **Pre-Compiled Compact Skill Index (`matrix-skills/compact-index.json`)**:
  - Added `buildCompactSkillIndex()` in `cli/doctor.js` and pre-generated `matrix-skills/compact-index.json` mapping 1,430+ matrix skills to `{ domain, priority, category, path }` for millisecond lookup without parsing multi-thousand-line YAML files.
- **CLI Health Doctor (`cli/doctor.js`) & Code Standards Checker (`cli/checker.js`)**:
  - Added `node cli/install.js doctor` (`npm run doctor`) to verify Antigravity installation health, `≤ 300` line limits, zero UTF-8 mojibake, zero legacy `agent-assistant` refs, and `compact-index.json` integrity.
  - Added `node cli/install.js check [dir]` (`npm run check`) to deterministically audit source files against **Professional Coding Standards** (file length ≤ 300 lines, no explicit `any`, no leftover production `console.log`).

### Changed
- **Fast Incremental Sync in `cli/install.js`**:
  - Removed slow per-file `fs.fsyncSync(fd)` inside tight file-copy loops (`fs.writeFileSync(dest, content, 'utf8')`).
  - Added size + mtime incremental sync for `skills_library` (unless `--force` is passed) while preserving full verification tracking.
- **Complete Brain Artifact Path Standardization (`commands/*.md`)**:
  - Standardized remaining inline `./reports/{topic}/...` references across `commands/*.md` to prioritize `<appDataDir>\brain\<conversation-id>\` on Antigravity 2.0 (with `./reports/{topic}/` as workspace fallback).

## [5.1.0] - 2026-10-31

### Added
- **Smart-Hybrid 2-Mode Complexity Threshold Gate (Mode A vs. Mode B)**:
  - **Mode A — Direct Execution (`TIER 0`)**: Simple tasks touching **≤ 3 files** (without `/cmd`) execute directly with zero sub-agent cold-start overhead.
  - **Mode B — Strict Multi-Agent Orchestration (`TIER 1`)**: Triggered by explicit `/cmd` workflows or tasks touching **> 3 files** / **≥ 2 domains**.
- **Antigravity 2.0 Native Sub-Agent & Interactive UI Primitives**:
  - Added native `define_subagent`, `invoke_subagent`, `send_message`, `ask_question`, and `generative_ui` (`<agent-embed>`) integration.
- **Brain Artifact Routing (Clean Git Working Tree)**:
  - Routed transient deliverables on Antigravity 2.0 to `<appDataDir>\brain\<conversation-id>\`.

### Removed
- Removed 13 duplicate legacy v2.0 subdirectories under `commands/` and foreign `AG Kit` remnant files.

## [1.3.2] - 2026-03-30

### Removed
- Removed deprecated `focus` workflow variants across commands and documentation.

## [1.3.0] - 2026-03-23

### Added
- Expanded domain skill library to 1,400+ skills across 19 domains.

## [1.2.0] - 2026-03-09

### Added
- **Golden Triangle Agent Teams (`:team`)** and **OpenAI Codex (`~/.codex/`)** support.

## [1.0.0] - 2026-01-26

### Added
- Initial release of BoomOpen Workflow Kit and CLI installer.
