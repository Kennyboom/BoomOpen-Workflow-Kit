---
description: "⚡ Quick test execution and targeted regression test authoring"
version: "5.5"
---

# /test:fast — Quick Test

> **Mode Gate**:
> - **Mode A (Direct Execution)**: For `≤ 3 files` in a single domain, run tests and write missing unit tests directly.
> - **Mode B (Tier 1 Delegation)**: For multi-module test runs, delegate to `tester` (`Model: "inherit"`) or message the warm `tester` session via `send_message`.

---

## Workflow

1. **Run Targeted Tests**: Execute the test runner (`npm test`, `vitest`, `jest`, `pytest`, etc.) on the affected files.
2. **Add Missing Happy-Path & Edge-Case Tests**: Ensure changed functions have unit test coverage for valid inputs, boundary values, and error paths (AAA pattern).
3. **Verify & Report**:
   - Re-run tests to confirm 100% pass rate.
   - Summarize test results inline or in `<appDataDir>\brain\<conversation-id>\TEST-{topic}.md`.
