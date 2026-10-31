---
description: ⚡⚡⚡ Full Feature — Complete feature development lifecycle with DAG Parallel Fan-Out & Direct Plan Dispatch
version: "5.5"
category: engineering
execution-mode: execute
---

# /cook:hard — Complete Feature Development (DAG Parallel Fan-Out & Contract-First Dispatch)

> **MISSION**: Full feature development with parallel research + scouting, design, contract-first planning, direct plan-to-executor implementation, and validation (`Model: "inherit"` Pro High default).

<feature>$ARGUMENTS</feature>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/boomopen-workflow-kit/rules/`):
1. `CORE.md` — 2-Mode Gate, Quality-First Model Policy, Brain Artifact Routing
2. `PHASES.md` — DAG-Aware Parallel Fan-Out, Contract-First Dispatch & Warm Session Reuse
3. `AGENTS.md` — Tiered Execution (`Model: "inherit"`), Structured Handoff Packet (`OWNED_FILES`, `SHARED_CONTRACT`)

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand (uses `<skills>` → `matrix-skills/compact-index.json` / `skill-seeker`).

---

## 🔀 TIERED EXECUTION, MODEL POLICY & WARM SESSION REUSE

| Tier | When | Action |
|------|------|--------|
| **TIER 1** | Antigravity 2.0 Native Sub-Agents (`define_subagent`, `invoke_subagent`, `send_message`) or `runSubagent` EXISTS | Invoke isolated sub-agent with `Model: "inherit"` (Pro High default; NEVER `flash_lite`). Record `conversationId` and reuse warm sessions via `send_message`. |
| **TIER 2** | Tool MISSING or system error | EMBODY agent file (FALLBACK) |

---

## 📁 DELIVERABLE FILES (BRAIN ARTIFACTS FIRST ON ANTIGRAVITY 2.0)

> **Antigravity 2.0 Default**: Write all transient deliverables to `<appDataDir>\brain\<conversation-id>\` to keep the Git working tree 100% clean. Use `./reports/{topic}/` only on non-Antigravity tools or when explicitly requested.

| Agent | Antigravity 2.0 Brain Artifact (Default) | Workspace Fallback |
|-------|------------------------------------------|--------------------|
| `brainstormer` | `<appDataDir>\brain\<conversation-id>\BRAINSTORM-{feature}.md` | `./reports/{topic}/brainstorms/BRAINSTORM-{feature}.md` |
| `researcher` | `<appDataDir>\brain\<conversation-id>\RESEARCH-{feature}.md` | `./reports/{topic}/researchers/RESEARCH-{feature}.md` |
| `scouter` | `<appDataDir>\brain\<conversation-id>\SCOUT-{feature}.md` | `./reports/{topic}/scouts/SCOUT-{feature}.md` |
| `designer` | `<appDataDir>\brain\<conversation-id>\DESIGN-{feature}.md` | `./reports/{topic}/designs/DESIGN-{feature}.md` |
| `planner` | `<appDataDir>\brain\<conversation-id>\PLAN-{feature}.md` | `./reports/{topic}/plans/PLAN-{feature}.md` |

All deliverables → Write in the user's input language (technical terms in English). Code/comments in English.

---

## 🔗 DAG PHASE DEPENDENCIES & PARALLEL FAN-OUT

| Stage | Phase(s) | Execution Mode | Requires | Blocking |
|-------|----------|----------------|----------|:--------:|
| **Stage 1** | P1: Brainstorm | Sequential (if unclear) | User request | No |
| **Stage 2** | **P2: Research + P3: Scout** | **⚡ PARALLEL FAN-OUT** (same turn) | User request / P1 | No |
| **Stage 3** | **P3.5: DB Design + P4: UI Design** | **⚡ PARALLEL FAN-OUT** (if both needed) | P2 + P3 outputs | Conditional |
| **Stage 4** | P5: Planning (`SHARED_CONTRACT` + `OWNED_FILES`) | Sequential Gate | `RESEARCH` + `SCOUT` (+ `DESIGN`) | **YES** |
| **Stage 5** | P6: Direct Implementation | **🎯 Direct Plan-to-Executor** (Parallel if disjoint `OWNED_FILES`) | **`PLAN-{feature}.md`** | **YES** |
| **Stage 6** | P7: Testing | Sequential Gate (fix via warm `send_message`) | `PLAN` + Code | **YES** |
| **Stage 7** | P8: Review | Sequential Gate (fix via warm `send_message`) | `PLAN` + Code + Tests | **YES** |

---

## 🎭 Phase 1: REQUIREMENTS CLARIFICATION (`brainstormer`)

| Agent | `brainstormer` (`Model: "inherit"`) |
|-------|-------------------------------------|
| Goal | Full requirements discovery (use `ask_question` UI widget if ambiguous) |
| Output | `<appDataDir>\brain\<conversation-id>\BRAINSTORM-{feature}.md` |
| Exit | Requirements clear, constraints identified, success criteria defined |

---

## ⚡ PARALLEL FAN-OUT: Phase 2 (`researcher`) + Phase 3 (`scouter`)

> **🚀 DAG FAN-OUT DIRECTIVE**: Launch `researcher` AND `scouter` **concurrently in a single turn** via two `invoke_subagent` calls (`Model: "inherit"`). Wait for both via Reactive Async Wakeup before advancing to Stage 3/4.

### 🎭 Phase 2: RESEARCH (`researcher`)
- **Goal**: Research best practices, libraries, and architectural patterns.
- **Output**: `<appDataDir>\brain\<conversation-id>\RESEARCH-{feature}.md`

### 🎭 Phase 3: CODEBASE ANALYSIS (`scouter`)
- **Goal**: Map existing architecture, file locations, and integration points.
- **Output**: `<appDataDir>\brain\<conversation-id>\SCOUT-{feature}.md`

---

## ⚡ CONDITIONAL PARALLEL FAN-OUT: Phase 3.5 (`database-architect`) + Phase 4 (`designer`)

> If the feature requires both DB schema changes and UI design, launch `database-architect` and `designer` **in parallel in a single turn** (`Model: "inherit"`).

### 🎭 Phase 3.5: DATABASE DESIGN (If Data Changes — `database-architect`)
- **Goal**: Schema design, indexes, and migration strategy.

### 🎭 Phase 4: UI/UX DESIGN (If UI Needed — `designer`)
- **Goal**: Visual hierarchy, 5 UI states, accessibility, and `generative_ui` / Mermaid flow.
- **Output**: `<appDataDir>\brain\<conversation-id>\DESIGN-{feature}.md`

---

## 🎭 Phase 5: CONTRACT-FIRST PLANNING (`planner`)

| Agent | `planner` (`Model: "inherit"`) |
|-------|--------------------------------|
| Prerequisite | **READ** `RESEARCH-{feature}.md` + `SCOUT-{feature}.md` (+ `DESIGN-{feature}.md`) |
| Goal | Create self-contained implementation plan with locked `SHARED_CONTRACT` and disjoint `OWNED_FILES` per task |
| Output | `<appDataDir>\brain\<conversation-id>\PLAN-{feature}.md` (or `./reports/{topic}/plans/PLAN-{feature}.md`) |
| Exit | Plan created, `SHARED_CONTRACT` + `OWNED_FILES` defined, risks & rollback identified |

---

## 🎭 Phase 6: DIRECT IMPLEMENTATION (Orchestrator → Domain Engineers)

| Agent | Orchestrator dispatches **directly** from `PLAN-{feature}.md` to `backend-engineer`, `frontend-engineer`, `database-architect` (`Model: "inherit"`) — **no middleman `tech-lead` hop** |
|-------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Prerequisite | **READ and FOLLOW** `<appDataDir>\brain\<conversation-id>\PLAN-{feature}.md` |
| Handoff Packet | Pass `MISSION`, `SHARED_CONTRACT`, `OWNED_FILES (Write Permitted)`, `READ_ONLY_FILES`, and `VERIFICATION` to each engineer and save their `conversationId` |
| Parallelism | When Backend and Frontend tasks have locked `SHARED_CONTRACT` and disjoint `OWNED_FILES`, launch `backend-engineer` + `frontend-engineer` **in parallel in a single turn** (`Workspace: "inherit"` or `"branch"`) |
| Verification | Run build/typecheck and `node cli/install.js check <dir>` to verify Pragmatic 2-Tier Coding Standards (≤ 400 soft / ≤ 500 hard lines, 0 `any`) |

---

## 🎭 Phase 7: TESTING (`tester`)

| Agent | `tester` (`Model: "inherit"`) |
|-------|-------------------------------|
| Prerequisite | **READ** `PLAN-{feature}.md` + Code changes |
| Goal | Write and run tests verifying every checkpoint in `PLAN-{feature}.md`. If any test fails, send fix request to the warm engineer via `send_message(Recipient: conversationId)`. |
| Output | `<appDataDir>\brain\<conversation-id>\TEST-{feature}.md` |
| Exit | All tests pass, deterministic verification complete |

---

## 🎭 Phase 8: REVIEW (`reviewer`)

| Agent | `reviewer` (`Model: "inherit"`) |
|-------|---------------------------------|
| Prerequisite | **READ** `PLAN-{feature}.md` + `SHARED_CONTRACT` + Code + Test results |
| Goal | Audit quality, security/performance, and 100% plan compliance (if fixes needed, dispatch via warm `send_message` to engineer) |
| Exit | Code matches plan intent, all standards met, approved |

---

## ✅ COMPLETION

Present feature report with:
1. ✅ **Done** — Feature complete and verified
2. 🚀 **Deploy** → `/deploy:preview`
3. 📝 **Docs** → `/docs:core`
