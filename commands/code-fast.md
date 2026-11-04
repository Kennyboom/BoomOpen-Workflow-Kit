---
description: "⚡ Quick implementation from an existing plan or clear specification"
version: "5.5"
---

# /code:fast — Quick Implementation

> **Mode Gate**:
> - **Mode A (Direct Execution)**: When changes touch `≤ 2 files` in a single domain and no multi-agent coordination is needed, implement and verify directly.
> - **Mode B (Direct Plan-to-Executor Dispatch)**: When reading from an existing `PLAN-{feature}.md` or touching `> 2 files`, dispatch directly to the domain specialist (`backend-engineer`, `frontend-engineer`, `mobile-engineer`, `database-architect`, etc.) with `Model: "inherit"`. Reuse existing warm sessions via `send_message` when iterating.

---

## Execution Steps

1. **Locate Plan / Context**:
   - Check `<appDataDir>\brain\<conversation-id>\PLAN-{feature}.md` first (fallback to `./reports/{topic}/plans/PLAN-{feature}.md` if workspace docs were used).
   - Extract `SHARED_CONTRACT` and `OWNED_FILES` for each task.
2. **Implement with Pragmatic 2-Tier Coding Standards**:
   - **Tier 1 (Strict Quality & Safety)**: Zero `any`, named constants for magic numbers, structured logger (no leftover debug `console.log`), `try/catch` with typed errors on async/API boundaries, clean sorted imports.
   - **Tier 2 (Flexible Structural Guidelines)**: Single responsibility per file (`~200–350` lines target, `~400–450` lines cohesive soft ceiling, `>500` lines hard split), focused functions (`~25–40` lines target, up to `~60` lines for linear UI/switch/config), guard clauses (`≤ 3` nesting depth), and config object pattern (`≤ 4` params).
3. **End-to-End Verification (Mandatory)**:
   - Run build/typecheck (`tsc --noEmit` or equivalent) and relevant unit/integration tests.
   - Fix any errors iteratively before reporting completion.
