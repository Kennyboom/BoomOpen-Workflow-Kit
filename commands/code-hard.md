---
description: ⚡⚡⚡ Full Development Cycle — Plan → Contract-First Parallel/Sequential Implement → Test → Review
version: "5.5"
category: engineering
execution-mode: execute
---

# /code:hard — Full Development Cycle (DAG Parallel Fan-Out & Direct Plan Dispatch)

> **MISSION**: Execute complete development workflow with discovery, contract-first planning, direct plan-to-executor implementation, testing, and review using `Model: "inherit"` (Pro High default) and Warm Sub-agent Reuse (`send_message`).

<task>$ARGUMENTS</task>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/boomopen-workflow-kit/rules/`):
1. `CORE.md` — 2-Mode Gate, Quality-First Model Policy, Brain Artifact Routing
2. `PHASES.md` — DAG-Aware Parallel Fan-Out, Contract-First Dispatch & Warm Session Reuse
3. `AGENTS.md` — Tiered Execution (`Model: "inherit"`), Structured Handoff Packet (`OWNED_FILES`, `SHARED_CONTRACT`)
4. `SKILLS.md` — Fast 2-Step Progressive Skill Lookup (`<skills>` → `compact-index.json`)

---

## 📌 PLAN-ALREADY-PROVIDED: SKIP REDUNDANT PHASES

Before starting Phase 1, check whether the user is coding from an existing plan:
- User references `@plan`, `@PLAN-...`, `<appDataDir>\brain\<conversation-id>\PLAN-{task}.md`, or `./reports/{topic}/plans/PLAN-{task}.md`.
- **IF PLAN EXISTS**:
  - **SKIP** Phase 1 (Requirements), Phase 2 (Scout), Phase 3 (Planning).
  - **ANNOUNCE**: `"✅ Plan found — skipping discovery, scout, and planning. Proceeding directly to Phase 4 (Implementation)."`
  - **GO TO**: Phase 4 (Direct Implementation) → Phase 5 (Testing) → Phase 6 (Review).
- **IF NO PLAN**: Run Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6.

---

## 🔀 TIERED EXECUTION, MODEL POLICY & DELIVERABLES

| Tier | When | Action |
|------|------|--------|
| **TIER 1** | Antigravity 2.0 Native Sub-Agents (`define_subagent`, `invoke_subagent`, `send_message`) or `runSubagent` EXISTS | Invoke isolated sub-agent with `Model: "inherit"` (Pro High default; NEVER `flash_lite`). Record `conversationId` and reuse warm sessions via `send_message`. |
| **TIER 2** | Tool MISSING or system error | Load `{AGENTS_PATH}/{agent}.md` and EMBODY persona (FALLBACK ONLY) |

**Deliverable Routing (Antigravity 2.0 Clean Git Tree)**:
- **Default**: `<appDataDir>\brain\<conversation-id>\{TYPE}-{task}.md` (`BRAINSTORM-{task}.md`, `SCOUT-{task}.md`, `PLAN-{task}.md`, `TEST-{task}.md`, `REVIEW-{task}.md`)
- **Workspace Fallback**: `./reports/{topic}/{type_plural}/{TYPE}-{task}.md` (only on non-Antigravity tools or when explicitly requested)
- **Language**: Write deliverables in the user's input language (technical terms in English). Code/comments in English.

---

## 🔗 PHASE CONTINUITY & BLOCKING MATRIX

| Phase | Required Input | Execution Mode | Blocking | Output Deliverable |
|-------|----------------|----------------|:--------:|--------------------|
| **P1: Requirements + P2: Scout** | User Request | **⚡ PARALLEL FAN-OUT** (when reqs clear) or Sequential | No | `BRAINSTORM-{task}.md` + `SCOUT-{task}.md` |
| **P3: Planning** | `SCOUT-{task}.md` | Sequential Gate (locks `SHARED_CONTRACT` + `OWNED_FILES`) | **YES** | `PLAN-{task}.md` |
| **P4: Direct Implementation** | `PLAN-{task}.md` | **🎯 Direct Plan-to-Executor** (Parallel if disjoint `OWNED_FILES`) | **YES** | Source Code Changes |
| **P5: Testing** | `PLAN-{task}.md` + Code | Sequential Gate (fix via warm `send_message`) | **YES** | Tests + `TEST-{task}.md` |
| **P6: Review** | `PLAN-{task}.md` + Code + Tests | Sequential Gate (fix via warm `send_message`) | **YES** | `REVIEW-{task}.md` |

---

## 🎭 Phase 1: REQUIREMENTS CLARIFICATION (`brainstormer`)

| Attribute | Value |
|-----------|-------|
| **Agent** | `brainstormer` (`Model: "inherit"`) |
| **Trigger** | Run if requirements or scope are ambiguous |
| **Goal** | Clarify requirements using Socratic inquiry / `ask_question` UI widget |
| **Output** | `<appDataDir>\brain\<conversation-id>\BRAINSTORM-{task}.md` |

---

## 🎭 Phase 2: CODEBASE ANALYSIS (`scouter`)

| Attribute | Value |
|-----------|-------|
| **Agent** | `scouter` (`Model: "inherit"`) |
| **Goal** | Map architecture, file locations, existing patterns, and integration points |
| **Output** | `<appDataDir>\brain\<conversation-id>\SCOUT-{task}.md` (or `./reports/{topic}/scouts/SCOUT-{task}.md`) |

---

## 🎭 Phase 3: CONTRACT-FIRST IMPLEMENTATION PLANNING (`planner`)

| Attribute | Value |
|-----------|-------|
| **Agent** | `planner` (`Model: "inherit"`) |
| **Prerequisite** | **READ** `<appDataDir>\brain\<conversation-id>\SCOUT-{task}.md` |
| **Goal** | Create self-contained plan with atomic tasks (≤ 2h each), locked `SHARED_CONTRACT`, and explicit `OWNED_FILES` / `READ_ONLY_FILES` |
| **Output** | `<appDataDir>\brain\<conversation-id>\PLAN-{task}.md` (or `./reports/{topic}/plans/PLAN-{task}.md`) |

---

## 🎭 Phase 4: DIRECT IMPLEMENTATION (Orchestrator → Domain Engineers)

| Attribute | Value |
|-----------|-------|
| **Agent** | Orchestrator dispatches **directly** from `PLAN-{task}.md` to `backend-engineer`, `frontend-engineer`, `database-architect`, etc. (`Model: "inherit"`) — **no middleman `tech-lead` hop** |
| **Prerequisite** | **READ and FOLLOW** `<appDataDir>\brain\<conversation-id>\PLAN-{task}.md` |
| **Handoff Packet** | Include `MISSION`, `SHARED_CONTRACT`, `OWNED_FILES (Write Permitted)`, `READ_ONLY_FILES (Do Not Edit)`, and `VERIFICATION`. Save `conversationId` in Active Sub-agent Registry. |
| **DAG Parallelism** | When `PLAN-{task}.md` defines locked `SHARED_CONTRACT` and disjoint `OWNED_FILES` for Backend and Frontend, launch `backend-engineer` + `frontend-engineer` **in parallel in a single turn** (`Workspace: "inherit"` or `"branch"`) |
| **Goal** | Execute plan steps with **Pragmatic 2-Tier Coding Standards** (~200–350 lines/file target, ≤ 400–450 cohesive ceiling, ~25–40 lines/fn target, 0 `any`) |

### ⚡ Strict Adherence & Verification Directive
1. **READ** `PLAN-{task}.md` completely before modifying any code.
2. **FOR EACH** plan step: modify only `OWNED_FILES`, verify build/lint + `node cli/install.js check <dir>` passes, and mark complete (`[ ]` → `[x]`).
3. **IF** a deviation is needed: **STOP** → Document blocker → Request Re-Planning from `planner`.

---

## 🎭 Phase 5: TESTING (`tester`)

| Attribute | Value |
|-----------|-------|
| **Agent** | `tester` (`Model: "inherit"`) |
| **Prerequisite** | **READ** `PLAN-{task}.md` + Code changes from Phase 4 |
| **Goal** | Write and execute tests covering every acceptance criterion. If any test fails, send fix instructions to the warm domain engineer via `send_message(Recipient: conversationId)`. |
| **Output** | `<appDataDir>\brain\<conversation-id>\TEST-{task}.md` |

---

## 🎭 Phase 6: REVIEW (`reviewer`)

| Attribute | Value |
|-----------|-------|
| **Agent** | `reviewer` (`Model: "inherit"`) |
| **Prerequisite** | **READ** `PLAN-{task}.md` + `SHARED_CONTRACT` + Code + Test outputs |
| **Goal** | Audit plan compliance, correctness, security, performance, and coding standards (dispatch any fixes via warm `send_message` to engineer) |
| **Output** | `<appDataDir>\brain\<conversation-id>\REVIEW-{task}.md` |

---

## ✅ COMPLETION

Present the implementation summary with:
1. ✅ **Done** — Feature implemented, tested, and reviewed
2. 🚀 **Deploy** → `/deploy:preview`
3. 📝 **Docs** → `/docs:core`
