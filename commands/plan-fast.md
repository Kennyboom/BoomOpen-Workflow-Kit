---
description: ⚡ Quick Plan — Fast planning without deep research
version: "5.4"
category: planning
execution-mode: execute
---

> **📂 Deliverable Routing (v5.1)**: On Antigravity 2.0, write transient deliverables (`BRAINSTORM`, `RESEARCH`, `SCOUT`, `DESIGN`, `PLAN`, `DEBUG`, `TEST`, `REVIEW`, `REPORT`, `MAILBOX`) to `<appDataDir>\brain\<conversation-id>\` to keep the Git tree clean (use `./reports/{topic}/` on non-Antigravity tools or when explicitly requested).

---

# /plan:fast — Quick Planning

> **MISSION**: Create quick implementation plan for clear tasks.

<task>$ARGUMENTS</task>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/boomopen-workflow-kit/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand. Fast variant uses matrix-only (no dynamic discovery for speed optimization).

---

## 🔀 TIERED EXECUTION

| Tier       | When               | Action                       |
| ---------- | ------------------ | ---------------------------- |
| **TIER 1** | Antigravity 2.0 Native Sub-Agents (`define_subagent`, `invoke_subagent`, `send_message`) or `runSubagent` EXISTS | Invoke isolated sub-agent (MANDATORY) |
| **TIER 2** | Tool MISSING       | EMBODY agent file (FALLBACK) |

**Deliverables:** All deliverables in `<appDataDir>\\brain\\<conversation-id>\\` (or `./reports/{topic}/`) → Write in the same language the user communicates with you. Code comments remain in English.
**⚠️ Paths above = base names.** Small (≤ 150 lines) → `{name}.md`. Large (> 150 lines) → `{name}/` folder.

---

## ⛔ ABSOLUTE PROHIBITION — NO CODE

> **🔴 THIS WORKFLOW PRODUCES PLAN FILES ONLY. NO CODE.**
>
> - ❌ NEVER write implementation code (TypeScript, Python, Rust, etc.)
> - ❌ NEVER modify source files
> - ❌ NEVER auto-implement plans or auto-transition to `/code`, `/cook`, `/fix`
> - ✅ ONLY produce plan files in `<appDataDir>\\brain\\<conversation-id>\\` (or `./reports/{topic}/`)

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

Execute phases using **DAG Parallel Fan-Out** for independent tracks, **Direct Plan-to-Executor Dispatch** (`Model: "inherit"`), and **Stateful Warm Sub-agent Reuse** (`send_message`) per `rules/PHASES.md` (v5.4).

---

## 🎭 Phase 1: CONTEXT SCAN

| Agent | `scouter`                                              |
| ----- | ------------------------------------------------------ |
| Goal  | Quick context gathering                                |
| Exit  | Relevant patterns found, integration points identified |

---

## 🎭 Phase 2: PLAN CREATION

| Agent  | `planner`                          |
| ------ | ---------------------------------- |
| Goal   | Create focused implementation plan |
| Output | `<appDataDir>\\brain\\<conversation-id>\\PLAN-{task}` (or `./reports/{topic}/plans/PLAN-{task}`)   |
| Exit   | Steps defined, approach clear      |

---

## ⛔ HARD STOP — AWAIT USER DECISION

> **WORKFLOW COMPLETE. DO NOT PROCEED FURTHER.**
>
> Present plan file link to user and STOP. Wait for explicit user command.
>
> Suggested next steps (USER must explicitly choose):
> 1. ✅ Plan Ready — `<appDataDir>\\brain\\<conversation-id>\\PLAN-{task}` (or `./reports/{topic}/plans/PLAN-{task}`)
> 2. 🏗️ `/cook:fast` → Implement plan
> 3. 🔍 `/plan:hard` → More detailed planning
> 4. 🔄 Iterate → Refine plan
>
> **⛔ DO NOT auto-transition to any workflow. YIELD control to user.**
