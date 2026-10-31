---
description: "⚡ Fast bug fix for clear, localized issues with mandatory verification"
version: "5.5"
---

# /fix:fast — Quick Bug Fix

> **Mode Gate**:
> - **Mode A (Direct Execution)**: If localized (`≤ 3 files`, single domain), diagnose, fix, and test directly.
> - **Mode B (Tier 1 Delegation)**: If spanning `> 3 files` or following a `DEBUG-{issue}.md` artifact in `<appDataDir>\brain\<conversation-id>\`, dispatch directly to the domain engineer (`backend-engineer` / `frontend-engineer`, `Model: "inherit"`) or reuse the warm engineer session via `send_message`.

---

## Execution Protocol

1. **Read Context & Root Cause**:
   - Check `<appDataDir>\brain\<conversation-id>\DEBUG-{issue}.md` if a prior debug step ran; otherwise trace the stack trace to the exact `[file:line]` root cause.
2. **Apply Minimal Root-Cause Fix**:
   - Fix the underlying cause (not just masking the symptom).
   - Enforce **Pragmatic 2-Tier Coding Standards** (Tier 1 strict type/error safety + Tier 2 cohesive structure).
3. **Persistent Verification**:
   - Run the failing test or reproduction command to prove the bug is gone.
   - Add or update a regression test covering the fixed edge case.
   - Run typecheck/linter to confirm zero regressions.
