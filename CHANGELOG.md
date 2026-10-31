# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.3.0] - 2026-10-31

### Added
- **Direct Plan-to-Executor Dispatch (`rules/AGENTS.md`, `rules/PHASES.md`, `commands/*-hard.md`, `agents/tech-lead.md`)**:
  - Eliminated the redundant `Orchestrator → tech-lead → domain-engineer` double-hop in `:fast`, `:hard`, and `/orchestrate` workflows once `PLAN-{feature}.md` exists. The Orchestrator now dispatches tasks directly from `PLAN` to `backend-engineer`, `frontend-engineer`, `database-architect`, etc., reserving `tech-lead` for complex Architecture Design/Review (`/review:hard`) and `:team` Golden Triangle arbitration.
- **Stateful Warm Sub-agent Reuse Registry (`send_message` by `conversationId`)**:
  - Added the **Active Sub-agent Session Registry (`Role → conversationId`)** across `GEMINI.md`, `rules/CORE.md`, `rules/AGENTS.md`, `rules/PHASES.md`, `rules/TEAMS.md`, and `commands/_ref/implementation-loop.md`. Follow-up tasks, fix-after-test/review iterations, and Golden Triangle debate rounds reuse existing warm sub-agent sessions via `send_message(Recipient: conversationId)` with 0s cold-start latency and 100% retained file context.
- **Contract-First Parallel Dispatch & File Ownership Locks (`SHARED_CONTRACT` + `OWNED_FILES`)**:
  - Upgraded `agents/planner.md`, `rules/AGENTS.md`, `rules/PHASES.md`, and `commands/orchestrate.md` with the mandatory 5-field **Structured Handoff Packet** (`MISSION`, `SHARED_CONTRACT`, `OWNED_FILES (Write Permitted)`, `READ_ONLY_FILES (Do Not Edit)`, `VERIFICATION`) so parallel `backend-engineer` + `frontend-engineer` sub-agents execute simultaneously with zero write collisions or API schema mismatches.
- **Warm Sub-agent Auto-Revive (`E0`) in `rules/ERRORS.md`**:
  - Upgraded `rules/ERRORS.md` to v5.3 with `E0: Sub-agent Interrupted / Server Restart` automatic revival via `send_message(Recipient: conversationId)` and anti-patterns `A1`–`A12` (`A9` middleman hop, `A10` `flash_lite` ban, `A11` cold re-spawning warm sub-agents, `A12` un-locked parallel writes).

## [5.2.0] - 2026-10-31

### Added
- **Quality-First Model Policy (`Model: "inherit"` / Pro High Default)**:
  - Enforced across `GEMINI.md`, `SKILL.md`, `rules/CORE.md`, `rules/AGENTS.md`, `rules/PHASES.md`, and `commands/*.md`: all 21 specialist agents **MUST use `Model: "inherit"` (or `"pro"` — User's Pro High model)**. Restricted `"flash"` strictly to trivial mechanical chores and banned `flash_lite`.
- **DAG-Aware Parallel Fan-Out Execution (`rules/PHASES.md`, `rules/CORE.md`, `commands/*-hard.md`)**:
  - Independent phases (`researcher` + `scouter`, `debugger` + `researcher`, 4-way `/review:hard`) launch concurrently in a single turn via multiple `invoke_subagent` calls.
- **Pre-Compiled Compact Skill Index (`matrix-skills/compact-index.json`) & CLI `doctor` / `check`**:
  - Added `cli/doctor.js` (`npm run doctor`) and `cli/checker.js` (`npm run check`).

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
