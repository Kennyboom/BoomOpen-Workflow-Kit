---
description: ⚡ Detailed Report — Comprehensive project analysis and documentation
version: "5.5"
category: documentation
execution-mode: execute
---

> **📂 Deliverable Routing (v5.1)**: On Antigravity 2.0, write transient deliverables (`BRAINSTORM`, `RESEARCH`, `SCOUT`, `DESIGN`, `PLAN`, `DEBUG`, `TEST`, `REVIEW`, `REPORT`, `MAILBOX`) to `<appDataDir>\brain\<conversation-id>\` to keep the Git tree clean (use `./reports/{topic}/` on non-Antigravity tools or when explicitly requested).

---

# /report:hard — Comprehensive Project Report

> **MISSION**: Generate detailed output for **any topic** — reports, doc updates, or template-based files.
>
> Use for: sprint reviews, technical docs, any-topic reports, updating existing files, or generating from user format/template.

<task>$ARGUMENTS</task>

---

## ⚡ TURN-1 ZERO-TAX DISPATCH & ON-DEMAND RULES

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/boomopen-workflow-kit/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution

⚡ **TURN-1 ZERO-TAX DISPATCH**: Core orchestration laws and the 5-Field Handoff Packet are pre-loaded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Launch Phase 1 sub-agents **immediately on Turn 1** via `invoke_subagent(TypeName: "self", Model: "inherit")`; load `rules/TEAMS.md` or `rules/PHASES.md` in parallel only when needed.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand for fitness calculation and dynamic discovery (hard/team variants enable find-skills).

---

## 🔀 TIERED EXECUTION

| Tier       | When               | Action                       |
| ---------- | ------------------ | ---------------------------- |
| **TIER 1** | Antigravity 2.0 Native Sub-Agents (`define_subagent`, `invoke_subagent`, `send_message`) or `runSubagent` EXISTS | Invoke isolated sub-agent (MANDATORY) |
| **TIER 2** | Tool MISSING       | EMBODY agent file (FALLBACK) |

**❌ Anti-Lazy**: Never use TIER 2 when TIER 1 tool available.

---

## 📁 DELIVERABLES (Reporter chooses from user intent)

| User intent | Reporter output |
| ----------- | ---------------- |
| **Create report** | New file: `./reports/{topic}/general/REPORT-{type}-{date}` (or path user asks) |
| **Update existing** | **Edit** related files (docs, README, etc.); do **not** create new report unless also asked |
| **From template** | New file(s) matching user format/template (e.g. after scouting source) |

| Agent      | Output (when creating)                          |
| ---------- | ------------------------------------------------ |
| researcher | `<appDataDir>\\brain\\<conversation-id>\\RESEARCH-{task}` (or `./reports/{topic}/researchers/RESEARCH-{task}`) (optional) |
| scouter    | `<appDataDir>\\brain\\<conversation-id>\\SCOUT-{task}` (or `./reports/{topic}/scouts/SCOUT-{task}`) (optional)    |
| reporter   | Per table above — create report **or** update existing **or** generate from template |

All deliverables in `<appDataDir>\\brain\\<conversation-id>\\` (or `./reports/{topic}/`) → Write in the same language the user communicates with you. Code comments remain in English.
**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + section files.

---

## ⛔ ABSOLUTE PROHIBITION — NO CODE

> **🔴 THIS WORKFLOW PRODUCES REPORTS ONLY. NO CODE.**
>
> - ❌ NEVER write implementation code (TypeScript, Python, Rust, etc.)
> - ❌ NEVER modify source files
> - ❌ NEVER auto-implement findings or auto-transition to `/code`, `/cook`, `/fix`
> - ✅ ONLY produce report/analysis files
>
> If user wants implementation, they must EXPLICITLY invoke another workflow.

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

Execute phases using **DAG Parallel Fan-Out** for independent tracks, **Direct Plan-to-Executor Dispatch** (`Model: "inherit"`), and **Stateful Warm Sub-agent Reuse** (`send_message`) per `rules/PHASES.md` (v5.5).

---

## 🎭 Phase 1: RESEARCH

| Agent  | `researcher`                                                |
| ------ | ---------------------------------------------------------- |
| Goal   | Research report scope, audience, and best practices for project/technical reports |
| Output | `<appDataDir>\\brain\\<conversation-id>\\RESEARCH-{task}` (or `./reports/{topic}/researchers/RESEARCH-{task}`) (optional)       |
| Exit   | Report scope and criteria defined, templates identified   |

---

## 🎭 Phase 2: DEEP SCAN

| Agent  | `scouter`                         |
| ------ | --------------------------------- |
| Goal   | Full codebase structural analysis |
| Output | `<appDataDir>\\brain\\<conversation-id>\\SCOUT-{task}` (or `./reports/{topic}/scouts/SCOUT-{task}`) |
| Exit   | Architecture and recent changes documented                 |

---

## 🎭 Phase 3: DATA SYNTHESIS

| Agent       | `reporter`                                      |
| ----------- | ------------------------------------------------ |
| Prerequisite| **READ** RESEARCH + SCOUT outputs if present     |
| Goal        | Aggregate data from Scouter, Plans, and History; identify discrepancies and milestones |
| Exit        | Data synthesized, gaps and milestones identified |

---

## 🎭 Phase 4: OUTPUT (create / update / from template)

| Agent | `reporter`                                                                 |
| ----- | --------------------------------------------------------------------------- |
| Goal  | From **user intent**: (1) create new report, (2) **update** existing files, or (3) generate from template/format |
| Output| **Create**: `./reports/{topic}/general/REPORT-{type}-{date}` or path user asked. **Update**: edit related files. **Template**: file(s) matching user format. |
| Exit  | Deliverable matches intent — report file, updated docs, or template-based file(s). |

---

## ⛔ HARD STOP — AWAIT USER DECISION

> **WORKFLOW COMPLETE. DO NOT PROCEED FURTHER.**
>
> Present deliverable file links to user and STOP. Wait for explicit user command.
>
> Deliverable per **user intent**:
> 1. ✅ **Create report** → `./reports/{topic}/general/REPORT-{type}-{date}`
> 2. ✅ **Update existing** → Related files edited; list what was updated
> 3. ✅ **From template** → File(s) matching user format
>
> **⛔ DO NOT auto-transition to any workflow. YIELD control to user.**
