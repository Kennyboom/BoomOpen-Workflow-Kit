---
description: "⚡ Quick debug — Fast root cause trace and actionable fix recommendation"
version: "5.4"
---

# /debug:fast — Quick Debug

> **Mode Gate**:
> - **Mode A (Direct Execution)**: If single-domain and `≤ 3 files`, execute directly using the `debugger` skill mindset (`skills/debugger/SKILL.md`).
> - **Mode B (Tier 1 Delegation)**: If multi-domain or part of a multi-agent workflow, delegate to `debugger` (`Model: "inherit"`) or reuse a warm `debugger` session via `send_message`.

---

## Workflow

1. **Symptom & Stack Trace**: Read the exact error message and inspect the top stack trace frames (`[file:line]`).
2. **Recent Changes Check**: Run `git diff` / `git log --oneline -5` if the bug is a regression.
3. **Rapid Causal Trace (Mini 5-Whys)**:
   - Identify the immediate trigger (`Why 1`) and underlying root cause (`Why 5`).
   - Verify whether an upstream caller or missing boundary check caused the invalid state.
4. **Output**:
   - Write `<appDataDir>\brain\<conversation-id>\DEBUG-{issue}.md` (or report inline if trivial single-file Q&A) with:
     - **Root Cause**: Exact `[file:line]` and causal explanation
     - **Recommended Fix**: Minimal change adhering to **Pragmatic 2-Tier Coding Standards**
     - **Verification Command**: Exact test or reproduction command to confirm the fix
