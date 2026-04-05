---
description: "🔺 Golden Triangle Shared Protocol — Referenced by all :team workflows"
version: "1.0"
type: reference
---

# 🔺 Golden Triangle — Shared Protocol Reference

> This file contains shared protocols used by ALL `:team` workflows.
> It is loaded on-demand when a `:team` workflow references it.

---

## 🔀 TIERED EXECUTION

| Tier       | When                          | Action                                                                    |
| ---------- | ----------------------------- | ------------------------------------------------------------------------- |
| **TIER 1** | runSubagent/Agent Tool EXISTS | Orchestrator spawns Tech Lead → Tech Lead spawns Executor + Reviewer      |
| **TIER 2** | Tool MISSING or SYSTEM error  | EMBODY Tech Lead → EMBODY Executor → EMBODY Reviewer → EMBODY Tech Lead  |

**❌ Anti-Lazy**: Never use TIER 2 when TIER 1 tool available.

---

## 📬 MAILBOX — Central Communication Hub

**Location**: `./reports/{topic}/MAILBOX-{date}.md` — Append only, never overwrite.

| Type              | Sender    | Receiver  | Purpose                                        |
| ----------------- | --------- | --------- | ---------------------------------------------- |
| TASK_ASSIGNMENT   | Tech Lead | Executor  | Assign task with requirements and context       |
| SUBMISSION        | Executor  | Reviewer  | Submit completed work for review                |
| REVIEW            | Reviewer  | Executor  | PASS or FAIL with findings table                |
| DEFENSE           | Executor  | Reviewer  | Defend work against FAIL findings               |
| RESUBMISSION      | Executor  | Reviewer  | Resubmit after addressing findings              |
| APPROVAL          | Reviewer  | Tech Lead | Confirm task passes review criteria             |
| ESCALATION        | Any       | Tech Lead | Escalate unresolvable disagreement              |
| ARBITRATION       | Tech Lead | All       | Binding resolution of dispute                   |
| DECISION          | Tech Lead | All       | Final phase decision with consensus stamp       |

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

**Deliverable paths = base names.** Small (≤ 150 lines) → `{name}.md`. Large (> 150 lines or ≥ 4 sections) → `{name}/` folder with `00-index.md` + section files.

One phase at a time. Per phase: Spawn Triangle → Decompose → Execute → Review → Debate → Consensus → Release.

**Consensus Stamp** (required per phase): `✅ CONSENSUS: {TechLead} ✓ | {Executor} ✓ | {Reviewer} ✓`

---

## 🔺 TRIANGLE LOOP TEMPLATE

Each phase follows this loop:

1. **Tech Lead** decomposes phase → creates Shared Task List → posts `TASK_ASSIGNMENT`
2. **Executor** executes each task → posts `SUBMISSION`
3. **Reviewer** checks submission → posts `REVIEW` (PASS or FAIL)
4. If `FAIL` → Executor posts `DEFENSE` or `RESUBMISSION` → max 3 rounds
5. If unresolved after 3 rounds → `ESCALATION` → Tech Lead `ARBITRATES`
6. If `PASS` → `APPROVAL` → next task
7. All tasks done → Tech Lead posts `DECISION` with **Consensus Stamp**

---

## 🛑 PRE-FLIGHT CHECKLIST

**LOAD now** (path `./rules/` or `~/.gemini/antigravity/skills/boomopen-workflow-kit/rules/`):
1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution
4. **TEAMS.md** — Golden Triangle protocol (MANDATORY)

**⛔ Do not run Phase 1 until all are loaded.**
