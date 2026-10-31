---
description: ⚡⚡⚡ Full Fix — Complete issue resolution with parallel root-cause & pattern research
version: "5.2"
category: debugging
execution-mode: execute
---

# /fix:hard — Complete Issue Resolution (DAG Parallel Fan-Out)

> **MISSION**: Full bug resolution workflow with parallel root-cause debugging + solution research, planning, implementation, and regression validation.

<issue>$ARGUMENTS</issue>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/boomopen-workflow-kit/rules/`):
1. `CORE.md` — 2-Mode Gate, Quality-First Model Policy, Brain Artifact Routing
2. `PHASES.md` — DAG-Aware Parallel Fan-Out & Phase Execution
3. `AGENTS.md` — Tiered Execution (`Model: "inherit"` Pro High Default)

---

## 🔀 TIERED EXECUTION & QUALITY-FIRST MODEL POLICY

| Tier | When | Action |
|------|------|--------|
| **TIER 1** | Antigravity 2.0 Native Sub-Agents (`define_subagent`, `invoke_subagent`, `send_message`) or `runSubagent` EXISTS | Invoke isolated sub-agent with `Model: "inherit"` (Pro High default; NEVER `flash_lite`) |
| **TIER 2** | Tool MISSING or system error | EMBODY agent file (FALLBACK) |

---

## 📁 DELIVERABLE FILES (BRAIN ARTIFACTS FIRST ON ANTIGRAVITY 2.0)

> **Antigravity 2.0 Default**: Write transient deliverables to `<appDataDir>\brain\<conversation-id>\` to keep the Git tree clean. Use `./reports/{topic}/` only on non-Antigravity tools or when explicitly requested.

| Agent | Antigravity 2.0 Brain Artifact (Default) | Workspace Fallback |
|-------|------------------------------------------|--------------------|
| `debugger` | `<appDataDir>\brain\<conversation-id>\DEBUG-{issue}.md` | `<appDataDir>\\brain\\<conversation-id>\\DEBUG-{issue}.md` (or `./reports/{topic}/debugs/DEBUG-{issue}.md`) |
| `researcher` | `<appDataDir>\brain\<conversation-id>\RESEARCH-{issue}.md` | `<appDataDir>\\brain\\<conversation-id>\\RESEARCH-{issue}.md` (or `./reports/{topic}/researchers/RESEARCH-{issue}.md`) |
| `planner` | `<appDataDir>\brain\<conversation-id>\PLAN-{issue}.md` | `<appDataDir>\\brain\\<conversation-id>\\PLAN-{issue}.md` (or `./reports/{topic}/plans/PLAN-{issue}.md`) |

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
| Goal | Create surgical fix plan with atomic steps and rollback strategy |
| Output | `<appDataDir>\brain\<conversation-id>\PLAN-{issue}.md` |
| Exit | Fix plan created, rollback strategy documented |

---

## 🎭 Phase 4: IMPLEMENTATION (`tech-lead` → Specialists)

| Agent | `tech-lead` → domain engineer (`backend-engineer`, `frontend-engineer`, etc., `Model: "inherit"`) |
|-------|---------------------------------------------------------------------------------------------------|
| Prerequisite | **READ and FOLLOW** `PLAN-{issue}.md` |
| Goal | Execute surgical fix while enforcing Professional Coding Standards (≤ 300 lines/file, ≤ 25 lines/fn) |
| Exit | Fix implemented, build/lint passes with 0 errors |

---

## 🎭 Phase 5: VALIDATION & REGRESSION TESTING (`tester`)

| Agent | `tester` (`Model: "inherit"`) |
|-------|-------------------------------|
| Goal | Write regression test reproducing the bug and verify all test suites pass |
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
