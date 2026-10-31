---
description: ⚡⚡⚡ Full Development Cycle — Plan → Implement → Test → Review
version: "5.1"
category: engineering
execution-mode: execute
---

# /code:hard — Full Development Cycle

> **MISSION**: Execute complete development workflow with planning, implementation, testing, and review.

<task>$ARGUMENTS</task>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/boomopen-workflow-kit/rules/`):
1. `CORE.md` — 2-Mode Gate, 10 Laws, Brain Artifact Routing
2. `PHASES.md` — Phase Execution
3. `AGENTS.md` — Tiered Execution (TIER 0 / TIER 1 / TIER 2)
4. `SKILLS.md` — Fast 2-Step Progressive Skill Lookup

---

## 📌 PLAN-ALREADY-PROVIDED: SKIP REDUNDANT PHASES

Before starting Phase 1, check whether the user is coding from an existing plan:
- User references `@plan`, `@PLAN-...`, `<appDataDir>\brain\<conversation-id>\PLAN-{task}.md`, or `./reports/{topic}/plans/PLAN-{task}.md`.
- **IF PLAN EXISTS**:
  - **SKIP** Phase 1 (Requirements), Phase 2 (Scout), Phase 3 (Planning).
  - **ANNOUNCE**: `"✅ Plan found — skipping discovery, scout, and planning. Proceeding to Phase 4 (Implementation)."`
  - **GO TO**: Phase 4 (Implementation) → Phase 5 (Testing) → Phase 6 (Review).
- **IF NO PLAN**: Run Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6.

---

## 🔀 TIERED EXECUTION & DELIVERABLES (MANDATORY)

| Tier | When | Action |
|------|------|--------|
| **TIER 1** | Antigravity 2.0 Native Sub-Agents (`define_subagent`, `invoke_subagent`, `send_message`) or `runSubagent` EXISTS | Invoke isolated sub-agent per phase (MANDATORY) |
| **TIER 2** | Tool MISSING or system error | Load `{AGENTS_PATH}/{agent}.md` and EMBODY persona (FALLBACK ONLY) |

**Deliverable Routing (Antigravity 2.0 Clean Git Tree)**:
- **Default**: `<appDataDir>\brain\<conversation-id>\{TYPE}-{task}.md` (`BRAINSTORM-{task}.md`, `SCOUT-{task}.md`, `PLAN-{task}.md`, `TEST-{task}.md`)
- **Workspace Fallback**: `./reports/{topic}/{type_plural}/{TYPE}-{task}.md` (only on non-Antigravity tools or when explicitly requested)
- **Language**: Write deliverables in the user's input language (technical terms in English). Code/comments in English.

---

## 🔗 PHASE CONTINUITY & BLOCKING MATRIX

| Phase | Required Input | Blocking | Output Deliverable |
|-------|----------------|:--------:|--------------------|
| **P1: Requirements** | User Request | No | `BRAINSTORM-{task}.md` |
| **P2: Codebase Analysis** | User Request | No | `SCOUT-{task}.md` |
| **P3: Planning** | `SCOUT-{task}.md` | **YES** | `PLAN-{task}.md` |
| **P4: Implementation** | `PLAN-{task}.md` | **YES** | Source Code Changes |
| **P5: Testing** | `PLAN-{task}.md` + Code | **YES** | Tests + `TEST-{task}.md` |
| **P6: Review** | `PLAN-{task}.md` + Code + Tests | **YES** | Final Review Report |

**⛔ Blocking Enforcement**: Before entering any BLOCKING phase, verify its required input deliverable exists. If missing, STOP and run the prerequisite agent first.

---

## 🎭 Phase 1: REQUIREMENTS CLARIFICATION (`brainstormer`)

| Attribute | Value |
|-----------|-------|
| **Agent** | `brainstormer` (isolated sub-agent via TIER 1) |
| **Trigger** | Run if requirements or scope are ambiguous |
| **Goal** | Clarify requirements using Socratic inquiry / `ask_question` UI widget |
| **Exit** | Requirements clear, scope defined, acceptance criteria established |

---

## 🎭 Phase 2: CODEBASE ANALYSIS (`scouter`)

| Attribute | Value |
|-----------|-------|
| **Agent** | `scouter` (isolated sub-agent via TIER 1) |
| **Goal** | Map architecture, file locations, existing patterns, and integration points |
| **Output** | `<appDataDir>\brain\<conversation-id>\SCOUT-{task}.md` (or `./reports/{topic}/scouts/SCOUT-{task}.md`) |
| **Exit** | Architecture understood, patterns documented as binding constraints |

---

## 🎭 Phase 3: IMPLEMENTATION PLANNING (`planner`)

| Attribute | Value |
|-----------|-------|
| **Agent** | `planner` (isolated sub-agent via TIER 1) |
| **Prerequisite** | **READ** `SCOUT-{task}.md` (and `BRAINSTORM-{task}.md` if created) |
| **Goal** | Create self-contained implementation plan with atomic tasks (≤ 2h each) |
| **Output** | `<appDataDir>\brain\<conversation-id>\PLAN-{task}.md` (or `./reports/{topic}/plans/PLAN-{task}.md`) |
| **Exit** | Plan created, steps defined, risks and rollback strategy documented |

---

## 🎭 Phase 4: IMPLEMENTATION (`tech-lead` → Specialists)

| Attribute | Value |
|-----------|-------|
| **Agent** | `tech-lead` → delegates to `backend-engineer`, `frontend-engineer`, `database-architect`, etc. |
| **Prerequisite** | **READ and FOLLOW** `PLAN-{task}.md` |
| **Goal** | Execute plan steps with **Professional Coding Standards** (≤ 300 lines/file, ≤ 25 lines/fn) |

### ⚡ Strict Adherence Directive
1. **READ** `PLAN-{task}.md` completely before modifying any code.
2. **FOR EACH** plan step:
   - Implement EXACTLY as specified.
   - Verify build/lint passes (`run_command`).
   - Mark complete: `- [ ]` → `- [x]`.
3. **IF** a deviation is needed:
   - **STOP** → Document blocker → Request Re-Planning from `planner`.

**Exit Criteria**: All plan steps executed, code compiles with 0 errors, no unauthorized deviations.

---

## 🎭 Phase 5: TESTING (`tester`)

| Attribute | Value |
|-----------|-------|
| **Agent** | `tester` (isolated sub-agent via TIER 1) |
| **Prerequisite** | **READ** `PLAN-{task}.md` + Code changes from Phase 4 |
| **Goal** | Write and execute tests covering every acceptance criterion and edge case in the plan |
| **Exit** | All unit/integration tests pass, deterministic verification confirmed |

---

## 🎭 Phase 6: REVIEW (`reviewer`)

| Attribute | Value |
|-----------|-------|
| **Agent** | `reviewer` (isolated sub-agent via TIER 1) |
| **Prerequisite** | **READ** `PLAN-{task}.md` + Code + Test outputs |
| **Goal** | Audit plan compliance, correctness, security, performance, and coding standards |
| **Exit** | Code matches plan intent 100%, 0 blocking issues |

---

## ✅ COMPLETION

Present the implementation summary with:
1. ✅ **Done** — Feature implemented, tested, and reviewed
2. 🚀 **Deploy** → `/deploy:preview`
3. 📝 **Docs** → `/docs:core`
