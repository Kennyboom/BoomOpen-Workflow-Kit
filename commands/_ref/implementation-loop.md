---
description: "🔺 Implementation Loop — Step-by-step protocol for Phase 6 of cook:team"
version: "1.0"
type: reference
---

# 🔺 Phase 6: Implementation — Detailed Loop

> **THIS IS THE MOST CRITICAL PHASE.** Every step is detailed. No shortcuts.

## Team Selection

| Project Type | Tech Lead | Executor | Reviewer |
|-------------|-----------|----------|----------|
| Fullstack (FE + BE) | `tech-lead` | `backend-engineer` then `frontend-engineer` (sequential) | `reviewer` |
| Backend-only | `tech-lead` | `backend-engineer` | `reviewer` |
| Frontend-only | `tech-lead` | `frontend-engineer` | `reviewer` |
| Game development | `tech-lead` | `game-engineer` | `reviewer` |
| Mobile development | `tech-lead` | `mobile-engineer` | `reviewer` |
| Other domain | Consult TEAMS.md roster for correct triangle | | |

## Step-by-Step Protocol

### STEP 1: Tech Lead reads PLAN
- Load full plan into working context
- Identify all implementation tasks
- Determine task ordering and dependencies

### STEP 2: Tech Lead creates Shared Task List
- Break plan into atomic implementation tasks
- Order by priority and dependency
- Format: `[ID] [Status] [Description] [Files] [Acceptance]`
- Post Shared Task List in Mailbox as `TASK_ASSIGNMENT`

### STEP 3: Dispatch ALL tasks
Each assignment includes:
- Task ID and description
- Exact files to create/modify
- Acceptance criteria from plan
- Dependencies on other tasks

### STEP 4: Executor implements each task
1. Read `TASK_ASSIGNMENT` from Mailbox
2. Implement task EXACTLY as plan specifies
3. Post `SUBMISSION` with:

| Field | Content |
|-------|---------|
| Task | Task ID |
| What was implemented | Description |
| Files changed | List of files |
| Approach taken | Rationale |
| Self-review notes | Any concerns |
| Plan step reference | Which plan step |

### STEP 5: Reviewer reviews each SUBMISSION
Check against ALL 5 dimensions:

| # | Dimension | Question |
|---|-----------|----------|
| 1 | CORRECTNESS | Does it work? Edge cases handled? |
| 2 | SECURITY | Injection, auth, input validation? |
| 3 | PERFORMANCE | N+1 queries, unnecessary loops? |
| 4 | PLAN COMPLIANCE | Matches plan spec exactly? |
| 5 | CODE QUALITY | Naming, structure, DRY, SOLID? |

Post `REVIEW` with: Task ID, Status (PASS/FAIL), Findings table, Required actions.

### STEP 6: IF FAIL — Debate Loop (max 3 rounds)
1. Executor reads REVIEW findings
2. For each finding: Fix (if valid) or post `DEFENSE` with evidence
3. Post `RESUBMISSION` or `DEFENSE`
4. Reviewer re-reviews → back to step 5
5. After round 3 without resolution → `ESCALATION` → Tech Lead `ARBITRATES`

### STEP 7: IF PASS
- Reviewer posts `APPROVAL`
- Tech Lead marks task ✅ in Shared Task List
- Move to next task

### STEP 8: ALL tasks complete
Tech Lead verifies full integration:
- All tasks ✅ in Shared Task List
- No cross-task conflicts
- API contracts match between backend and frontend
- Posts `DECISION` with consensus stamp → Phase output released

## STRICT PLAN ADHERENCE (ENFORCED BY REVIEWER)

1. READ PLAN FIRST — every task MUST trace to a plan step
2. IF step seems wrong → STOP → Executor posts `ESCALATION`
3. NO unauthorized deviations — Reviewer checks: "Does this SUBMISSION match the plan step?"
4. Deviations found → automatic FAIL (Severity: CRITICAL)
