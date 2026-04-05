---
description: âš¡âš¡âš¡ Full Test â€” Comprehensive QA and TDD Workflow
version: "3.0"
category: validation
execution-mode: execute
---

# /test:hard â€” Test Engineer v3.0

> **MISSION**: Full QA workflow with quality gates, complete coverage reporting, and TDD enforcement.

<scope>$ARGUMENTS</scope>

---

## ðŸ›‘ PRE-FLIGHT (DO FIRST â€” BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.gemini/antigravity/skills/agent-assistant/rules/`):

1. CORE.md â€” Identity, Laws, Routing
2. PHASES.md â€” Phase Execution
3. AGENTS.md â€” Tiered Execution

**â›” Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand for fitness calculation and dynamic discovery (hard/team variants enable find-skills).

---

## ðŸ”€ TIERED EXECUTION

| Tier       | When               | Action                       |
| ---------- | ------------------ | ---------------------------- |
| **TIER 1** | runSubagent EXISTS | Invoke sub-agent (MANDATORY) |
| **TIER 2** | Tool MISSING       | EMBODY agent file (FALLBACK) |

---

## GOLDEN RULES

```
1. TEST BEHAVIOR, NOT IMPLEMENTATION â€” Refactor-proof tests
2. ONE ASSERTION PER TEST â€” Clear failure messages
3. ARRANGE-ACT-ASSERT â€” Consistent structure
4. TEST PYRAMID â€” Many unit, some integration, few E2E
5. NO FLAKY TESTS â€” Deterministic, no timing deps
6. REGRESSION FIRST â€” Add test for bugs BEFORE fixing
```

---

## â›” INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 â†’ then Phase 2 â†’ â€¦ in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees whatâ€™s happening (announce before doing).

---

## ðŸŽ­ Phase 1: Test Strategy & Spec Traceability

| Agent | `tester`                                |
| ----- | --------------------------------------- |
| Goal  | Design test strategy from Specs         |
| Rules | MUST map specs to test files            |
| Exit  | Strategy defined, test types identified |

```
BEFORE writing tests:

1. SCAN project:
   â–¡ Test framework detected (Jest/Vitest/Playwright?)
   â–¡ Existing test count and coverage
   â–¡ Test patterns already in use

2. CLASSIFY target:
   â–¡ Pure function â†’ Unit test
   â–¡ Component with state â†’ Component test
   â–¡ API endpoint â†’ Integration test
   â–¡ User flow â†’ E2E test

3. SPEC TRACEABILITY (Check if specs exist e.g. plans/)
   â–¡ Map each AC -> test file
   â–¡ Report Gaps
```

---

## ðŸŽ­ Phase 2: DEPENDENCY MAPPING & COVERAGE

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

## ðŸŽ­ Phase 3: TEST EXECUTION (TDD Workflow)

| Agent        | `tester`                                                        |
| ------------ | --------------------------------------------------------------- |
| Prerequisite | READ PLAN file if exists                                        |
| Goal         | Run/write full test suite following TDD workflow                |
| Exit         | All tests run, coverage measured, checkpoint mapping documented |

```
TDD WORKFLOW (Red â†’ Green â†’ Refactor):
ðŸ”´ RED â€” Write FAILING test first.
ðŸŸ¢ GREEN â€” Minimal code to pass.
ðŸ”µ REFACTOR â€” Clean without breaking.

PATTERNS:
- Use describes for grouping.
- Use Arrange-Act-Assert.
- Edge cases and Error Paths should be explicitly tested.
```

---

## ðŸŽ­ Phase 4: FAILURE ANALYSIS (IF FAILURES)

| Agent   | `debugger`             |
| ------- | ---------------------- |
| Trigger | If failures exist      |
| Goal    | Analyze failures       |
| Exit    | Root causes identified |

---

## ðŸŽ­ Phase 5: QUALITY GATES

| Agent | `tester`                          |
| ----- | --------------------------------- |
| Goal  | Verify quality gates              |
| Exit  | All gates pass, coverage adequate |

```
BEFORE submitting tests:
â–¡ Tests are independent (no shared state)
â–¡ No hardcoded waits (use waitFor/findBy)
â–¡ Mocks reset between tests (afterEach)
â–¡ Edge cases covered (null, empty, max, min)
â–¡ Error paths covered (network, validation, auth)
â–¡ No console.log left in tests
â–¡ Coverage meets targets
```

---

## COMPLETION

Present test report with:

1. âœ… **Pass** â€” All tests green
2. ðŸ”§ **Fix** â†’ `/fix:fast`
3. ðŸ“ **Review** â†’ `/review`
