# 🛠️ ERRORS

> **VERSION**: 5.4 — Antigravity 2.0 Smart-Hybrid Edition | **LOAD**: When errors occur | **PURPOSE**: Self-healing & Warm Sub-agent Auto-Revive Protocols

---

## CORE PRINCIPLE

```
Every error MUST lead to:
  1. Automatic self-healing / warm sub-agent revival, OR
  2. Explicit user decision (via ask_question UI widget when available)

❌ FORBIDDEN: Silent halt, unexplained termination, or cold re-spawning a sub-agent that already has a warm conversationId
```

---

## ERROR CLASSIFICATION

| Code | Type | Description | Response |
|------|------|-------------|----------|
| **E0** | **Sub-agent Interrupted / Server Restart** | Sub-agent stopped mid-task or tool server restarted (`invoke_subagent` aborted) | **Warm Auto-Revive**: Call `send_message(Recipient: conversationId, Message: "Continue from current state and report via send_message")` to resume the exact warm sub-agent without losing context |
| **E1** | Transient | Timeout, network, temporary tool error | Retry up to 3x with backoff |
| **E1b** | Output Overflow | Deliverable > 150 lines or too large for single write | Switch to chunked deliverable strategy (`00-index.md` + `01-*.md`, see `PHASES.md`) |
| **E2** | Recoverable | Compilation, lint, test, or `check` violation | Send exact error log back to the warm domain engineer via `send_message(Recipient: conversationId)` to fix and re-verify |
| **E3** | Blocking | Plan mismatch, missing contract, or dependency blocker | Pause at safe point → evaluate best option → auto-recover or escalate via `ask_question` |
| **E4** | Cascading | Affects downstream phases or parallel workers | Stop propagation → Rollback affected `OWNED_FILES` → Re-align `SHARED_CONTRACT` → Report |

---

## RECOVERY PROTOCOL

```yaml
on_error:
  1. CAPTURE: error type, phase, agent, conversationId, owned_files
  2. CLASSIFY: E0 / E1 / E1b / E2 / E3 / E4
  3. ATTEMPT recovery:
     E0: Resume warm sub-agent via send_message(Recipient: conversationId, Message: "Resume task and report results")
     E1: Retry tool call (max 3)
     E1b: Switch to chunked deliverable strategy (see PHASES.md)
     E2: Dispatch fix to warm engineer via send_message(Recipient: conversationId) + re-run `node cli/install.js check`
     E3: Pick best recovery option → auto-recover or prompt user via ask_question
     E4: Rollback owned_files, update SHARED_CONTRACT if needed, report impact
  4. RESUME workflow immediately upon resolution
  5. NEVER halt silently
```

---

## USER ESCALATION (`ask_question` UI Widget Preferred)

When user input is required to resolve a blocking `E3`/`E4` error, prefer Antigravity 2.0's `ask_question` widget or present:

```markdown
## ⚠️ BLOCKED — Decision Required

**Error**: {description}
**Impact**: {affected items}

**Options**:
A) {Alternative} — {tradeoff} (Recommended)
B) {Skip with gap} — {limitation}
C) {Provide input} — {what's needed}
D) {Modify requirements} — {suggestion}

⏳ Awaiting selection...
```

---

## VIOLATION CORRECTION

```yaml
on_violation:
  1. PAUSE at safe point
  2. NOTIFY: "⚠️ Violation: {code}"
  3. BACKTRACK to correct state
  4. RE-EXECUTE correctly (reusing warm sub-agent session if applicable)
  5. UPDATE downstream
  6. RESUME

max_corrections_per_phase: 3
on_limit: Escalate to user
```

---

## ANTI-PATTERNS (A1–A12)

| Code | Anti-Pattern | Correct v5.5 Behavior |
|------|--------------|-----------------------|
| **A1** | Orchestrator coding in Mode B | In Mode B (`> 3 files`, `≥ 2 domains`, or `/cmd`), delegate to execution specialists; only execute directly in Mode A (`≤ 3 files`, no `/cmd`) |
| **A2** | Workflow gate bypass | Respect sequential DAG gates (`Plan` → `Implement` → `Test` → `Review`) |
| **A3** | Silent halt | Notify user + provide actionable recovery options |
| **A4** | Skipped verification step | Always run tests + `node cli/install.js check <dir>` before marking complete |
| **A5** | Lazy TIER 2 fallback | Always use TIER 1 (`invoke_subagent` / `send_message`) when sub-agent tools exist |
| **A6** | Assumed requirements | Clarify via `ask_question` widget before planning |
| **A7** | Unauthorized plan deviation | Treat `PLAN-{feature}.md` and `SHARED_CONTRACT` as immutable constraints |
| **A8** | Serializing independent phases | Launch independent DAG phases (`researcher` + `scouter`, 4-way `/review:hard`) in parallel in a single turn |
| **A9** | Redundant `tech-lead` middleman hop | In `:fast`/`:hard`/`/orchestrate`, dispatch directly from `PLAN` to domain engineers; reserve `tech-lead` for Architecture Review & `:team` arbitration |
| **A10** | Using low-tier `flash_lite` | Always use `Model: "inherit"` (Pro High default); `"flash"` only for trivial mechanical chores; NEVER `"flash_lite"` |
| **A11** | Cold re-spawning a warm sub-agent | Reuse existing specialist sessions via `send_message(Recipient: conversationId)` for follow-up tasks, review fixes, and debate rounds |
| **A12** | Un-locked parallel file writes | Always specify disjoint `OWNED_FILES` and `READ_ONLY_FILES` (plus `SHARED_CONTRACT`) before launching parallel engineers |

---

## RESILIENCE GUARANTEES

```yaml
guarantees:
  - NO task is ever silently skipped
  - Interrupted sub-agents are automatically revived via send_message(Recipient: conversationId)
  - Parallel engineers never overwrite each other's files thanks to explicit OWNED_FILES locks
  - EVERY error leads to deterministic resolution or structured user decision
```
