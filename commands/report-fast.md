---
description: ⚡ Fast Report — Quick status updates and summaries
version: "5.4"
category: documentation
execution-mode: execute
---

> **📂 Deliverable Routing (v5.1)**: On Antigravity 2.0, write transient deliverables (`BRAINSTORM`, `RESEARCH`, `SCOUT`, `DESIGN`, `PLAN`, `DEBUG`, `TEST`, `REVIEW`, `REPORT`, `MAILBOX`) to `<appDataDir>\brain\<conversation-id>\` to keep the Git tree clean (use `./reports/{topic}/` on non-Antigravity tools or when explicitly requested).

---

# /report:fast — Quick Status Report

> **MISSION**: Generate concise, actionable status reports and summaries.
>
> Use for daily standups, progress checks, and high-level overviews.
> For **update existing files** or **generate from template**, use `/report:hard` or `/report:team`.

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

**❌ Anti-Lazy**: Never use TIER 2 when TIER 1 tool available.

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

Execute phases using **DAG Parallel Fan-Out** for independent tracks, **Direct Plan-to-Executor Dispatch** (`Model: "inherit"`), and **Stateful Warm Sub-agent Reuse** (`send_message`) per `rules/PHASES.md` (v5.4).

---

## ⛔ ABSOLUTE PROHIBITION — NO CODE

> **🔴 THIS WORKFLOW PRODUCES REPORTS ONLY. NO CODE.**
>
> - ❌ NEVER write implementation code (TypeScript, Python, Rust, etc.)
> - ❌ NEVER modify source files
> - ❌ NEVER auto-implement findings or auto-transition to `/code`, `/cook`, `/fix`
> - ✅ ONLY produce report files in `<appDataDir>\\brain\\<conversation-id>\\` (or `./reports/{topic}/`)
> - ✅ Report files MUST be written in the same language the user communicates with you
>
> If user wants implementation, they must EXPLICITLY invoke another workflow.

## ⛔ MANDATORY FILE OUTPUT

> Every completed report MUST be saved to `./reports/{topic}/general/REPORT-{topic}-{YYYY-MM-DD}`
> Chat-only responses for completed analysis are PROHIBITED.

---

## 🎭 Phase 1: INFORMATION GATHERING

| Agent | `reporter`                               |
| ----- | ---------------------------------------- |
| Goal  | Scan current state and recent activities |
| Exit  | Progress summarized, key sources scanned |

---

## 🎭 Phase 2: REPORT GENERATION

| Agent | `reporter`                                                                 |
| ----- | -------------------------------------------------------------------------- |
| Goal  | Infer intent; if **create report** → generate concise status report        |
| Exit  | Report with Summary, Key Changes, Next Steps — or recommend `/report:hard`/`/report:team` if user intent is update/template |

---

## ⛔ HARD STOP — AWAIT USER DECISION

> **WORKFLOW COMPLETE. DO NOT PROCEED FURTHER.**
>
> Present deliverable file link to user and STOP. Wait for explicit user command.
>
> Suggested next steps (USER must explicitly choose):
> 1. ✅ Report complete
> 2. 📋 `/report:hard` → More detailed report
> 3. 🔄 Iterate → Refine based on feedback
>
> **⛔ DO NOT auto-transition to any workflow. YIELD control to user.**

**⚠️ Paths = base names.** ≤ 150 lines → `{name}.md`. > 150 lines → `{name}/` folder.
