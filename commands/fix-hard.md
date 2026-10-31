---
description: ⚡⚡⚡ Full Fix — Complete issue resolution with parallel root-cause & pattern research and direct fix dispatch
version: "5.4"
category: debugging
execution-mode: execute
---

# /fix:hard — Complete Issue Resolution (DAG Parallel Fan-Out & Direct Plan Dispatch)

> **MISSION**: Full bug resolution workflow with parallel root-cause debugging + solution research, surgical planning, direct engineer implementation, and regression validation (`Model: "inherit"` Pro High default).

<issue>$ARGUMENTS</issue>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/boomopen-workflow-kit/rules/`):
1. `CORE.md` — 2-Mode Gate, Quality-First Model Policy, Brain Artifact Routing
2. `PHASES.md` — DAG-Aware Parallel Fan-Out, Direct Plan Dispatch & Warm Session Reuse
3. `AGENTS.md` — Tiered Execution (`Model: "inherit"`), Structured Handoff Packet (`OWNED_FILES`)

---

## 🔀 TIERED EXECUTION, MODEL POLICY & WARM SESSION REUSE

| Tier | When | Action |
|------|------|--------|
| **TIER 1** | Antigravity 2.0 Native Sub-Agents (`define_subagent`, `invoke_subagent`, `send_message`) or `runSubagent` EXISTS | Invoke isolated sub-agent with `Model: "inherit"` (Pro High default; NEVER `flash_lite`). Record `conversationId` and reuse warm sessions via `send_message`. |
| **TIER 2** | Tool MISSING or system error | EMBODY agent file (FALLBACK) |

---

## 📁 DELIVERABLE FILES (BRAIN ARTIFACTS FIRST ON ANTIGRAVITY 2.0)

> **Antigravity 2.0 Default**: Write transient deliverables to `<appDataDir>\brain\<conversation-id>\` to keep the Git tree clean. Use `./reports/{topic}/` only on non-Antigravity tools or when explicitly requested.

| Agent | Antigravity 2.0 Brain Artifact (Default) | Workspace Fallback |
|-------|------------------------------------------|--------------------|
| `debugger` | `<appDataDir>\brain\<conversation-id>\DEBUG-{issue}.md` | `./reports/{topic}/debugs/DEBUG-{issue}.md` |
| `researcher` | `<appDataDir>\brain\<conversation-id>\RESEARCH-{issue}.md` | `./reports/{topic}/researchers/RESEARCH-{issue}.md` |
| `planner` | `<appDataDir>\brain\<conversation-id>\PLAN-{issue}.md` | `./reports/{topic}/plans/PLAN-{issue}.md` |

All deliverables → Write in the user's input language (technical terms in English). Code comments remain in English.

---

## ⚡ PARALLEL FAN-OUT: Phase 1 (`debugger`) + Phase 2 (`researcher`)

> **🚀 DAG FAN-OUT DIRECTIVE**: Launch `debugger` (root-cause codebase trace) AND `researcher` (remediation patterns / framework edge cases) **concurrently in a single turn** (`Model: "inherit"`), and join via Reactive Async Wakeup before Phase 3.

### 🎭 Phase 1: DEEP ROOT-CAUSE ANALYSIS (`debugger`)
- **Goal**: Full 5-Whys root cause analysis, failure chain trace, and blast radius assessment.
- **Output**: `<appDataDir>\brain\<conversation-id>\DEBUG-{issue}.md`

### 🎭 Phase 2: SOLUTION PATTERN RESEARCH (`researcher`)
- **Goal**: Research proven remediation patterns and framework-specific gotchas.
- **Output**: `<appDataDir>\brain\<conversation-id>\RESEARCH-{issue}.md`

---

## 🎭 Phase 3: FIX PLANNING (`planner` — Sequential Gate)

| Agent | `planner` (`Model: "inherit"`) |
|-------|--------------------------------|
| Prerequisite | **READ** `DEBUG-{issue}.md` + `RESEARCH-{issue}.md` |
| Goal | Create surgical fix plan with atomic steps, explicit `OWNED_FILES`, and rollback strategy |
| Output | `<appDataDir>\brain\<conversation-id>\PLAN-{issue}.md` |
| Exit | Fix plan created, `OWNED_FILES` and rollback strategy documented |

---

## 🎭 Phase 4: DIRECT IMPLEMENTATION (Orchestrator → Domain Engineer)

| Agent | Orchestrator dispatches **directly** from `PLAN-{issue}.md` to domain engineer (`backend-engineer`, `frontend-engineer`, etc., `Model: "inherit"`) — **no middleman `tech-lead` hop** |
|-------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Prerequisite | **READ and FOLLOW** `PLAN-{issue}.md` + `DEBUG-{issue}.md` |
| Handoff Packet | Provide `MISSION`, `OWNED_FILES`, `READ_ONLY_FILES`, and `VERIFICATION`; record engineer's `conversationId` |
| Goal | Execute surgical fix while enforcing Pragmatic 2-Tier Coding Standards (~200–350 lines/file target, ≤ 400–450 cohesive ceiling, 0 `any`) and running `node cli/install.js check <dir>` |
| Exit | Fix implemented, build/lint/check passes with 0 errors |

---

## 🎭 Phase 5: VALIDATION & REGRESSION TESTING (`tester`)

| Agent | `tester` (`Model: "inherit"`) |
|-------|-------------------------------|
| Goal | Write regression test reproducing the bug and verify all test suites pass. If any test fails, send fix request to the warm engineer via `send_message(Recipient: conversationId)`. |
| Output | `<appDataDir>\brain\<conversation-id>\TEST-{issue}.md` |
| Exit | Original issue resolved, regression test passes, zero new failures |

---

## 🎭 Phase 5.5: ROLLBACK VERIFICATION (If Critical — `devops-engineer`)

| Agent | `devops-engineer` (`Model: "inherit"`) |
|-------|----------------------------------------|
| Trigger | Fix affects production deployment, database migrations, or critical infrastructure |
| Goal | Verify rollback procedure and recovery time |

---

## ✅ COMPLETION

Present fix report with:
1. ✅ **Fixed** — Root cause eliminated and verified by regression tests
2. 🔍 **Review** → `/review:fast`
3. 📝 **Docs** → `/docs:core`
