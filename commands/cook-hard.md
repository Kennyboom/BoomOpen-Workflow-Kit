---
description: ⚡⚡⚡ Full Feature — Complete feature development lifecycle with DAG Parallel Fan-Out
version: "5.2"
category: engineering
execution-mode: execute
---

# /cook:hard — Complete Feature Development (DAG Parallel Fan-Out)

> **MISSION**: Full feature development with research, codebase scouting, design, planning, implementation, and validation.

<feature>$ARGUMENTS</feature>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/boomopen-workflow-kit/rules/`):
1. `CORE.md` — 2-Mode Gate, Quality-First Model Policy, Brain Artifact Routing
2. `PHASES.md` — DAG-Aware Parallel Fan-Out & Phase Execution
3. `AGENTS.md` — Tiered Execution (`Model: "inherit"` Pro High Default)

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand (uses `<skills>` → `matrix-skills/compact-index.json` / `skill-seeker`).

---

## 🔀 TIERED EXECUTION & QUALITY-FIRST MODEL POLICY

| Tier | When | Action |
|------|------|--------|
| **TIER 1** | Antigravity 2.0 Native Sub-Agents (`define_subagent`, `invoke_subagent`, `send_message`) or `runSubagent` EXISTS | Invoke isolated sub-agent with `Model: "inherit"` (Pro High default; NEVER `flash_lite`) |
| **TIER 2** | Tool MISSING or system error | EMBODY agent file (FALLBACK) |

---

## 📁 DELIVERABLE FILES (BRAIN ARTIFACTS FIRST ON ANTIGRAVITY 2.0)

> **Antigravity 2.0 Default**: Write all transient deliverables to `<appDataDir>\brain\<conversation-id>\` to keep the Git working tree 100% clean. Use `./reports/{topic}/` only on non-Antigravity tools or when explicitly requested.

| Agent | Antigravity 2.0 Brain Artifact (Default) | Workspace Fallback |
|-------|------------------------------------------|--------------------|
| `brainstormer` | `<appDataDir>\brain\<conversation-id>\BRAINSTORM-{feature}.md` | `<appDataDir>\\brain\\<conversation-id>\\BRAINSTORM-{feature}.md` (or `./reports/{topic}/brainstorms/BRAINSTORM-{feature}.md`) |
| `researcher` | `<appDataDir>\brain\<conversation-id>\RESEARCH-{feature}.md` | `<appDataDir>\\brain\\<conversation-id>\\RESEARCH-{feature}.md` (or `./reports/{topic}/researchers/RESEARCH-{feature}.md`) |
| `scouter` | `<appDataDir>\brain\<conversation-id>\SCOUT-{feature}.md` | `<appDataDir>\\brain\\<conversation-id>\\SCOUT-{feature}.md` (or `./reports/{topic}/scouts/SCOUT-{feature}.md`) |
| `designer` | `<appDataDir>\brain\<conversation-id>\DESIGN-{feature}.md` | `<appDataDir>\\brain\\<conversation-id>\\DESIGN-{feature}.md` (or `./reports/{topic}/designs/DESIGN-{feature}.md`) |
| `planner` | `<appDataDir>\brain\<conversation-id>\PLAN-{feature}.md` | `<appDataDir>\\brain\\<conversation-id>\\PLAN-{feature}.md` (or `./reports/{topic}/plans/PLAN-{feature}.md`) |

All deliverables → Write in the user's input language (technical terms in English). Code/comments in English.

---

## 🔗 DAG PHASE DEPENDENCIES & PARALLEL FAN-OUT

| Stage | Phase(s) | Execution Mode | Requires | Blocking |
|-------|----------|----------------|----------|:--------:|
| **Stage 1** | P1: Brainstorm | Sequential (if unclear) | User request | No |
| **Stage 2** | **P2: Research + P3: Scout** | **⚡ PARALLEL FAN-OUT** (same turn) | User request / P1 | No |
| **Stage 3** | **P3.5: DB Design + P4: UI Design** | **⚡ PARALLEL FAN-OUT** (if both needed) | P2 + P3 outputs | Conditional |
| **Stage 4** | P5: Planning | Sequential Gate | `RESEARCH` + `SCOUT` (+ `DESIGN`) | **YES** |
| **Stage 5** | P6: Implementation | Sequential (or Parallel by decoupled module) | **`PLAN-{feature}.md`** | **YES** |
| **Stage 6** | P7: Testing | Sequential Gate | `PLAN` + Code | **YES** |
| **Stage 7** | P8: Review | Sequential Gate | `PLAN` + Code + Tests | **YES** |

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

## 🎭 Phase 5: PLANNING (`planner`)

| Agent | `planner` (`Model: "inherit"`) |
|-------|--------------------------------|
| Prerequisite | **READ** `RESEARCH-{feature}.md` + `SCOUT-{feature}.md` (+ `DESIGN-{feature}.md`) |
| Goal | Create detailed, self-contained implementation plan |
| Output | `<appDataDir>\brain\<conversation-id>\PLAN-{feature}.md` (or `./reports/{topic}/plans/PLAN-{feature}.md`) |
| Exit | Plan created, atomic tasks defined, risks & rollback identified |

---

## 🎭 Phase 6: IMPLEMENTATION (`tech-lead` → Specialists)

| Agent | `tech-lead` → routes to `backend-engineer`, `frontend-engineer`, `database-architect` (`Model: "inherit"`) |
|-------|------------------------------------------------------------------------------------------------------------|
| Prerequisite | **READ and FOLLOW** `<appDataDir>\brain\<conversation-id>\PLAN-{feature}.md` |
| Parallelism | If Backend and Frontend modules are decoupled in `PLAN-{feature}.md`, launch `backend-engineer` + `frontend-engineer` in parallel (`Workspace: "branch"` or disjoint paths) |
| Verification | Run build/typecheck and `node cli/install.js check <dir>` to verify ≤ 300 lines/file and 0 errors |

---

## 🎭 Phase 7: TESTING (`tester`)

| Agent | `tester` (`Model: "inherit"`) |
|-------|-------------------------------|
| Prerequisite | **READ** `PLAN-{feature}.md` + Code changes |
| Goal | Write and run tests verifying every checkpoint in `PLAN-{feature}.md` |
| Output | `<appDataDir>\brain\<conversation-id>\TEST-{feature}.md` |
| Exit | All tests pass, deterministic verification complete |

---

## 🎭 Phase 8: REVIEW (`reviewer`)

| Agent | `reviewer` (`Model: "inherit"`) |
|-------|---------------------------------|
| Prerequisite | **READ** `PLAN-{feature}.md` + Code + Test results |
| Goal | Quality review, security/performance check, and 100% plan compliance |
| Exit | Code matches plan intent, all standards met, approved |

---

## ✅ COMPLETION

Present feature report with:
1. ✅ **Done** — Feature complete and verified
2. 🚀 **Deploy** → `/deploy:preview`
3. 📝 **Docs** → `/docs:core`
