---
description: "⚡⚡⚡ Comprehensive testing with DAG Parallel Fan-Out (Unit/Integration/E2E + Coverage Gap Analysis)"
version: "5.4"
---

# /test:hard — Comprehensive Testing

> **Skill Notice**: Load `rules/CORE.md`, `rules/PHASES.md`, and `rules/AGENTS.md` on-demand for Mode B orchestration.

---

## PRE-FLIGHT

1. **Inspect Context**: Check `<appDataDir>\brain\<conversation-id>\` for `PLAN-*.md` or `DEBUG-*.md` to identify changed modules and acceptance criteria.
2. **Session Registry**: Reuse warm `tester` or `scouter` sessions via `send_message` if already active in this conversation.

---

## Phase 1 & Phase 2: DAG Parallel Fan-Out (`tester` + `scouter`)

Launch both independent discovery/execution tracks concurrently in a single turn:

### Track A — Test Suite Execution (`tester`)
> - **Sub-agent**: `tester` (`EnableWriteTools: true`, `Model: "inherit"`)
> - **MISSION**: Run existing unit, integration, and E2E test suites; capture pass/fail counts, coverage metrics, and exact failure stack traces.
> - **OWNED_FILES**: Existing/new `*.test.*` / `*.spec.*` files and `<appDataDir>\brain\<conversation-id>\TEST-{topic}.md`.

### Track B — Uncovered Edge-Case & Risk Scouting (`scouter`)
> - **Sub-agent**: `scouter` (`EnableWriteTools: false`, `Model: "inherit"`)
> - **MISSION**: Scan recently modified modules (`git diff`) for untested boundary conditions, error paths, race conditions, and security/input validation gaps.
> - **READ_ONLY_FILES**: Changed source files and existing test files.

---

## Phase 3: Write Missing Tests & Re-Verify (`tester`)

Reuse the warm `tester` sub-agent via `send_message(Recipient: testerConversationId, Message: ...)`:
1. Write unit/integration/E2E tests for all high-priority gaps identified in Track A & Track B.
2. Follow the **AAA Pattern (Arrange-Act-Assert)** and test behavior rather than implementation details.
3. Re-run the full test suite to verify 100% pass rate.
4. Write the final report to `<appDataDir>\brain\<conversation-id>\TEST-{topic}.md` (fallback to `./reports/{topic}/test/TEST-{topic}.md` only when workspace docs are requested).

---

## Gate
- [ ] All unit, integration, and E2E tests pass (`0` failures)
- [ ] Coverage meets or exceeds target (`≥ 80%` on changed modules)
- [ ] `<appDataDir>\brain\<conversation-id>\TEST-{topic}.md` generated with concrete command output
