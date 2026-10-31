---
description: "⚙️ Implementation Loop — Step-by-step Golden Triangle & Warm Session Reuse coding protocol"
version: "5.4"
type: reference
---

# ⚙️ Golden Triangle Implementation Loop (v5.3 — Warm Session Reuse & File Ownership Locks)

> **REFERENCED BY**: `cook-team.md` (Phase 6), `code-team.md` (Phase 3), `fix-team.md` (Phase 3)
> **CRITICAL**: Do NOT implement the entire plan in one giant pass. Execute **per task / module** through the Golden Triangle loop, and **reuse warm sub-agent sessions (`send_message` by `conversationId`)** across all iterations.

---

## 🛑 PREREQUISITE CHECK & ACTIVE SESSION REGISTRY

Before writing ANY code:
1. Verify `PLAN-{feature}.md` (or `DEBUG-{issue}.md` for fixes) exists in `<appDataDir>\brain\<conversation-id>\` (or `./reports/{topic}/`) and has been READ.
2. Extract `SHARED_CONTRACT` and explicit `OWNED_FILES` / `READ_ONLY_FILES` for each module.
3. Identify the domain Executor (`Model: "inherit"`):
   - Backend / API / Services → `backend-engineer`
   - Frontend / UI / State → `frontend-engineer`
   - Database / Migrations / Queries → `database-architect`
   - Mobile → `mobile-engineer` | Game → `game-engineer` | DevOps → `devops-engineer`
4. **Spawn Once, Reuse Many (`Active Sub-agent Session Registry`)**:
   - Spawn `tech-lead`, `{domain-engineer}`, and `reviewer` **once** via `invoke_subagent` (`Model: "inherit"`) and store their `conversationId`s.
   - For all subsequent modules and fix/review rounds, communicate via `send_message(Recipient: conversationId, Message: ...)` (0s cold-start latency, 100% retained file context).

---

## 🔄 PER-MODULE / PER-TASK TRIANGLE LOOP

For EACH implementation phase/module in the Plan:

### STEP 1 — TASK BRIEF (`tech-lead` via `invoke_subagent` or warm `send_message`)
- Reads the current section of `PLAN-{feature}.md`
- Issues `[TASK_BRIEF]` containing the 5 mandatory Handoff fields:
  1. `MISSION & ACCEPTANCE CRITERIA`
  2. `SHARED_CONTRACT` (locked API/DTO/schema definitions)
  3. `OWNED_FILES (Write Permitted)`
  4. `READ_ONLY_FILES (Do Not Edit)`
  5. `VERIFICATION & DELIVERABLE` (`node cli/install.js check <dir>` + test command)
- Appends `[TASK_BRIEF]` to `<appDataDir>\brain\<conversation-id>\MAILBOX-{date}.md`

### STEP 2 — CODE EXECUTION (`{domain-engineer}` via `invoke_subagent` or warm `send_message`)
- Reads `[TASK_BRIEF]` + `PLAN-{feature}.md`
- Modifies **ONLY** files listed in `OWNED_FILES` (`write_file` / `edit_file`)
- Runs build/typecheck/linter AND `node cli/install.js check <dir>` (`run_command`) to verify Pragmatic 2-Tier Coding Standards (≤ 400 soft / ≤ 500 hard lines/file, 0 `any`)
- Marks completed step in `PLAN-{feature}.md`: `[ ]` → `[x]`
- Appends `[REPORT]` (files changed + verification output) to `MAILBOX-{date}.md`

### STEP 3 — ADVERSARIAL CODE REVIEW (`reviewer` via `invoke_subagent` or warm `send_message`)
- Reads `[TASK_BRIEF]`, `[REPORT]`, and the actual modified files
- Audits against 5 mandatory gates:
  1. **Plan & Contract Compliance**: Matches `PLAN-{feature}.md` and `SHARED_CONTRACT` 100%? Only `OWNED_FILES` touched?
  2. **Correctness & Edge Cases**: Null/undefined handling, async error handling, race conditions?
  3. **Security**: Input validation, auth checks, injection prevention, no hardcoded secrets?
  4. **Performance**: No N+1 queries, no blocking loops, proper memoization/indexing?
  5. **Code Quality (Pragmatic 2-Tier)**: Cohesive file (~200–350 target, ≤ 400–450 soft ceiling)? Focused functions (~25–40 lines)? Strong types (no `any`)?
- If ANY gate fails (🔴 CRITICAL or 🟠 HIGH):
  - Appends `[CRITIQUE]` with exact `File:Line` and required fix to `MAILBOX-{date}.md`
- If ALL gates pass:
  - Appends `[APPROVAL]` to `MAILBOX-{date}.md`

### STEP 4 — WARM FIX & RE-VERIFY LOOP (If `[CRITIQUE]` issued, max 3 rounds)
- **WARM CALL (`send_message` to `{domain-engineer}` `conversationId`)**: `{domain-engineer}` applies exact fixes (or defends with technical evidence), re-runs build/tests + `check`, and appends `[REVISION]` to `MAILBOX-{date}.md`
- **WARM CALL (`send_message` to `reviewer` `conversationId`)**: `reviewer` re-inspects modified lines → issues `[APPROVAL]` or remaining `[CRITIQUE]`
- **WARM CALL (`send_message` to `tech-lead` `conversationId`)**: `tech-lead` verifies resolution (or arbitrates after round 3) and records:
  `✅ CONSENSUS (Module {X}): tech-lead ✓ | {domain-engineer} ✓ | reviewer ✓`

---

## 🚨 STOP-AND-ESCALATE RULE

If during implementation `{domain-engineer}` discovers `PLAN-{feature}.md` or `SHARED_CONTRACT` is blocked:
1. **STOP IMMEDIATELY** — do NOT invent an unapproved workaround or touch `READ_ONLY_FILES`.
2. Document the blocker in `MAILBOX-{date}.md` as `[ESCALATION]`.
3. `tech-lead` + `planner` update `PLAN-{feature}.md` and `SHARED_CONTRACT` first, then resume via `send_message`.
