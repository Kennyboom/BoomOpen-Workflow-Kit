---
description: "⚙️ Implementation Loop — Step-by-step Golden Triangle coding protocol for Phase 6"
version: "5.1"
type: reference
---

# ⚙️ Golden Triangle Implementation Loop

> **REFERENCED BY**: `cook-team.md` (Phase 6), `code-team.md` (Phase 3), `fix-team.md` (Phase 3)
> **CRITICAL**: Do NOT implement the entire plan in one giant pass. Execute **per task / module** through the Golden Triangle loop.

---

## 🛑 PREREQUISITE CHECK

Before writing ANY code:
1. Verify `PLAN-{feature}` (or `DEBUG-{issue}` for fixes) exists in `<appDataDir>\brain\<conversation-id>\` (or `./reports/{topic}/`) and has been READ.
2. Identify the domain for each task to select the right Executor:
   - Backend / API / Services → `backend-engineer`
   - Frontend / UI / State → `frontend-engineer`
   - Database / Migrations / Queries → `database-architect`
   - Mobile → `mobile-engineer`
   - Game → `game-engineer`
   - DevOps / CI/CD → `devops-engineer`

---

## 🔄 PER-MODULE / PER-TASK TRIANGLE LOOP

For EACH implementation phase/module in the Plan:

### STEP 1 — SUB-AGENT CALL #1: `tech-lead` (Implementation Brief)
- Reads the current section of `PLAN-{feature}`
- Defines exact files to create/modify, interfaces/types to respect, and edge cases to handle
- Enforces **Professional Coding Standards** (≤ 300 lines/file, ≤ 25 lines/fn, no `any`, no magic numbers)
- Appends `[TASK_BRIEF]` to `MAILBOX-{date}.md` (`<appDataDir>\brain\<conversation-id>\MAILBOX-{date}.md` or `./reports/{topic}/MAILBOX-{date}.md`)

### STEP 2 — SUB-AGENT CALL #2: `{domain-engineer}` (Code Execution)
- Reads `[TASK_BRIEF]` + `PLAN-{feature}`
- Writes clean, production-ready code (`write_file` / `edit_file`)
- Runs build/typecheck/linter (`run_command`) to verify code compiles with 0 errors
- Marks completed step in `PLAN-{feature}`: `[ ]` → `[x]`
- Appends `[REPORT]` (files changed + verification output) to `MAILBOX-{date}.md`

### STEP 3 — SUB-AGENT CALL #3: `reviewer` (Adversarial Code Review)
- Reads `[TASK_BRIEF]`, `[REPORT]`, and the actual modified files
- Audits against 5 mandatory gates:
  1. **Plan Compliance**: Does the code match `PLAN-{feature}` 100% with zero unauthorized deviations?
  2. **Correctness & Edge Cases**: Null/undefined handling, async error handling, race conditions?
  3. **Security**: Input validation, auth checks, injection prevention, no hardcoded secrets?
  4. **Performance**: No N+1 queries, no blocking loops, proper memoization/indexing?
  5. **Code Quality**: File ≤ 300 lines? Function ≤ 25 lines? Strong types (no `any`)?
- If ANY gate fails (🔴 CRITICAL or 🟠 HIGH):
  - Appends `[CRITIQUE]` with exact `File:Line` and required fix to `MAILBOX-{date}.md`
- If ALL gates pass:
  - Appends `[APPROVAL]` to `MAILBOX-{date}.md`

### STEP 4 — FIX & RE-VERIFY LOOP (If `[CRITIQUE]` issued, max 3 rounds)
- **SUB-AGENT CALL**: `{domain-engineer}` applies exact fixes for every `[CRITIQUE]` item, re-runs build/tests, and appends `[REVISION]` to `MAILBOX-{date}.md`
- **SUB-AGENT CALL**: `reviewer` re-inspects modified lines → issues `[APPROVAL]` or remaining `[CRITIQUE]`
- **SUB-AGENT CALL**: `tech-lead` verifies resolution and records:
  `✅ CONSENSUS (Module {X}): tech-lead ✓ | {domain-engineer} ✓ | reviewer ✓`

---

## 🚨 STOP-AND-ESCALATE RULE

If during implementation `{domain-engineer}` discovers the Plan is blocked or flawed:
1. **STOP IMMEDIATELY** — do NOT invent an unapproved workaround.
2. Document the blocker in `MAILBOX-{date}.md` as `[ESCALATION]`.
3. `tech-lead` + `planner` update `PLAN-{feature}` first, then resume implementation.
