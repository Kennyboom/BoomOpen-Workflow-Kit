---
description: ⚡⚡⚡ Full Test — Comprehensive QA and TDD Workflow
version: "3.0"
category: validation
execution-mode: execute
---

# /test:hard — Test Engineer v3.0

> **MISSION**: Full QA workflow with quality gates, complete coverage reporting, and TDD enforcement.

<scope>$ARGUMENTS</scope>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.gemini/antigravity/skills/boomopen-workflow-kit/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand for fitness calculation and dynamic discovery (hard/team variants enable find-skills).

---

## 🔀 TIERED EXECUTION

| Tier       | When               | Action                       |
| ---------- | ------------------ | ---------------------------- |
| **TIER 1** | runSubagent EXISTS | Invoke sub-agent (MANDATORY) |
| **TIER 2** | Tool MISSING       | EMBODY agent file (FALLBACK) |

---

## GOLDEN RULES

```
1. TEST BEHAVIOR, NOT IMPLEMENTATION — Refactor-proof tests
2. ONE ASSERTION PER TEST — Clear failure messages
3. ARRANGE-ACT-ASSERT — Consistent structure
4. TEST PYRAMID — Many unit, some integration, few E2E
5. NO FLAKY TESTS — Deterministic, no timing deps
6. REGRESSION FIRST — Add test for bugs BEFORE fixing
```

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what’s happening (announce before doing).

---

## 🎭 Phase 1: Test Strategy & Spec Traceability

| Agent | `tester`                                |
| ----- | --------------------------------------- |
| Goal  | Design test strategy from Specs         |
| Rules | MUST map specs to test files            |
| Exit  | Strategy defined, test types identified |

```
BEFORE writing tests:

1. SCAN project:
   □ Test framework detected (Jest/Vitest/Playwright?)
   □ Existing test count and coverage
   □ Test patterns already in use

2. CLASSIFY target:
   □ Pure function → Unit test
   □ Component with state → Component test
   □ API endpoint → Integration test
   □ User flow → E2E test

3. SPEC TRACEABILITY (Check if specs exist e.g. plans/)
   □ Map each AC -> test file
   □ Report Gaps
```

---

## 🎭 Phase 2: DEPENDENCY MAPPING & COVERAGE

| Agent | `scouter`                              |
| ----- | -------------------------------------- |
| Goal  | Map test dependencies & plan coverage  |
| Exit  | Dependencies mapped, environment ready |

```
COVERAGE BUDGET TARGETS:
| Layer | Target | Minimum | Tool |
|-------|:------:|:-------:|------|
| Statements | 80% | 70% | Framework Coverage |
| Branches | 75% | 65% | Framework Coverage |

PRIORITY (what to test FIRST):
1. Business logic / utils (highest ROI)
2. API route handlers
3. Complex components with state
4. Edge cases from bug history
```

---

## 🎭 Phase 3: TEST EXECUTION (TDD Workflow)

| Agent        | `tester`                                                        |
| ------------ | --------------------------------------------------------------- |
| Prerequisite | READ PLAN file if exists                                        |
| Goal         | Run/write full test suite following TDD workflow                |
| Exit         | All tests run, coverage measured, checkpoint mapping documented |

```
TDD WORKFLOW (Red → Green → Refactor):
🔴 RED — Write FAILING test first.
🟢 GREEN — Minimal code to pass.
🔵 REFACTOR — Clean without breaking.

PATTERNS:
- Use describes for grouping.
- Use Arrange-Act-Assert.
- Edge cases and Error Paths should be explicitly tested.
```

---

## 🎭 Phase 4: FAILURE ANALYSIS (IF FAILURES)

| Agent   | `debugger`             |
| ------- | ---------------------- |
| Trigger | If failures exist      |
| Goal    | Analyze failures       |
| Exit    | Root causes identified |

---

## 🎭 Phase 5: QUALITY GATES

| Agent | `tester`                          |
| ----- | --------------------------------- |
| Goal  | Verify quality gates              |
| Exit  | All gates pass, coverage adequate |

```
BEFORE submitting tests:
□ Tests are independent (no shared state)
□ No hardcoded waits (use waitFor/findBy)
□ Mocks reset between tests (afterEach)
□ Edge cases covered (null, empty, max, min)
□ Error paths covered (network, validation, auth)
□ No console.log left in tests
□ Coverage meets targets
```

---

## COMPLETION

Present test report with:

1. ✅ **Pass** — All tests green
2. 🔧 **Fix** → `/fix:fast`
3. 📝 **Review** → `/review`
