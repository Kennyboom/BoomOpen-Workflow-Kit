---
description: "⚡⚡⚡ Deep investigation using the 5-Whys (SPIE v3.0) causal framework and Brain Artifact reporting"
version: "5.5"
---

# /debug:hard — Deep Investigation (5-Whys SPIE v3.0)

> **Skill Notice**: Load `rules/CORE.md`, `rules/PHASES.md`, and `rules/AGENTS.md` on-demand for Mode B orchestration.

---

## PRE-FLIGHT

1. **Classify Request**: `/debug:hard` activates **Mode B (Tier 1 Sub-agent Delegation)** for deep root-cause analysis.
2. **Check Brain Artifacts First**: Inspect `<appDataDir>\brain\<conversation-id>\` for existing `SCOUT-*.md`, `PLAN-*.md`, or `DEBUG-*.md` context (fallback to `./reports/{topic}/` if present).
3. **Session Registry Check**: If a warm `debugger` session already exists in the Active Sub-agent Session Registry (`Role → conversationId`), reuse it via `send_message(Recipient: conversationId, Message: ...)`.

---

## Phase 1: Deep Root Cause Investigation (`debugger`)

> **Sub-agent Delegation (TIER 1)**:
> - **Sub-agent**: `debugger` (`EnableWriteTools: true` if writing `DEBUG-{issue}.md` artifact, or `false` for pure read-only investigation where Orchestrator writes the artifact)
> - **Model**: `"inherit"` (Pro High default — NEVER use `flash_lite`)
> - **Prompt (5-Field Handoff Packet)**:
>   - `MISSION`: Investigate `{issue}` using the 3-Hypothesis + **5-Whys (SPIE v3.0)** causal framework. Do NOT apply production code fixes during `/debug:hard` — produce the root cause proof and exact fix specification.
>   - `SHARED_CONTRACT`: Existing API/type boundaries relevant to `{issue}`.
>   - `OWNED_FILES`: `<appDataDir>\brain\<conversation-id>\DEBUG-{issue}.md`
>   - `READ_ONLY_FILES`: Target codebase files under investigation.
>   - `VERIFICATION`: Reproduce the issue (or trace exact failure path) and complete all 5 Whys.

### Investigation Checklist:
1. **Reproduce & Isolate**: Capture the exact error message, stack trace, and recent `git diff` / `git log`.
2. **3 Ranked Hypotheses**: Formulate and test at least 3 hypotheses (Most Likely, Upstream Contract/State, Edge Case/Race Condition).
3. **5-Whys Causal Chain (SPIE v3.0)**:
   - **Why 1**: Immediate symptom at crash/failure line
   - **Why 2**: Proximate invalid state or input
   - **Why 3**: Missing boundary or contract validation
   - **Why 4**: Control-flow or architectural vulnerability
   - **Why 5**: Systemic root cause
4. **Deliverable**: Write `<appDataDir>\brain\<conversation-id>\DEBUG-{issue}.md` containing Symptom, Hypotheses Tested table, 5-Whys Causal Chain, Recommended Fix (`[file:line]`), and Regression Prevention test spec.

---

## Gate & Next Steps

- [ ] Root cause proven with concrete `[file:line]` evidence
- [ ] All 5 Whys documented in `<appDataDir>\brain\<conversation-id>\DEBUG-{issue}.md`
- [ ] Zero production files mutated during investigation

**Next Action**: Present key findings from `DEBUG-{issue}.md` and recommend `/fix:hard` or `/fix:fast` to apply and verify the fix.
