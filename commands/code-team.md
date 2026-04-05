---
description: "ðŸ”º Team Code â€” Golden Triangle adversarial collaboration for maximum quality coding"
version: "2.0"
category: engineering
execution-mode: execute
---

# /code:team â€” Golden Triangle Code Implementation

> **MISSION**: Maximum quality code implementation through adversarial collaboration.
> Each phase spawns a **Golden Triangle** of 3 agents: Tech Lead (coordinator),
> Executor (implementer), Reviewer (devil's advocate). Output is released ONLY
> upon consensus after debate.
>
> **KEY DIFFERENCE FROM /cook:team**: No research, no design, no planning phases.
> Pure coding: scope â†’ implement â†’ verify. Use when you know WHAT to build and just need it BUILT RIGHT.

<task>$ARGUMENTS</task>

---


---

## â›” MANDATORY REFERENCE â€” READ BEFORE PROCEEDING

> **ðŸ”´ YOU MUST READ these reference files NOW. Do NOT skip.**
>
> 1. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/golden-triangle-protocol.md` â€” Tiered Execution, Mailbox, Pre-Flight, Triangle Loop
> 2. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/convergent-analysis-loop.md` â€” Convergent Analysis detailed protocol
> 3. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/implementation-loop.md` â€” Implementation step-by-step (for coding phases)
>
> **Failure to read = incorrect execution. These files contain BINDING protocols.**

---
## [{TIMESTAMP}] {MESSAGE_TYPE} | {AGENT} â†’ {TARGET}
**Phase**: {phase number}
**Task**: {task ID from Shared Task List}
**Content**:
{message body}
---
```

**Message Types**:

| Type              | Sender    | Receiver  | Purpose                                        |
| ----------------- | --------- | --------- | ---------------------------------------------- |
| TASK_ASSIGNMENT   | Tech Lead | Executor  | Assign task with requirements and context       |
| SUBMISSION        | Executor  | Reviewer  | Submit completed work for review                |
| REVIEW            | Reviewer  | Executor  | Review result: PASS or FAIL with findings       |
| DEFENSE           | Executor  | Reviewer  | Defend implementation against FAIL findings     |
| RESUBMISSION      | Executor  | Reviewer  | Resubmit after fixing FAIL findings             |
| APPROVAL          | Reviewer  | Tech Lead | Confirm task passes all review criteria         |
| ESCALATION        | Any       | Tech Lead | Escalate unresolvable disagreement              |
| ARBITRATION       | Tech Lead | All       | Tech Lead resolves dispute with binding decision|
| DECISION          | Tech Lead | All       | Final phase decision with consensus stamp       |

---

## ðŸ“ DELIVERABLE FILES

| Phase / Team      | Output                                          |
| ----------------- | ----------------------------------------------- |
| Phase 1 (Scope)   | Shared Task List in Mailbox                     |
| Phase 2 (Impl.)   | Code changes + review trail in Mailbox          |
| Phase 3 (Verify)  | `./reports/{topic}/reviews/REVIEW-{task}`            |
| ALL Phases         | `./reports/{topic}/MAILBOX-{date}.md`                  |

All files in `./reports/{topic}/` â†’ English only.
**âš ï¸ Paths above = base names.** Small (â‰¤ 150 lines) â†’ create as `{name}.md`. Large (> 150 lines or â‰¥ 4 sections) â†’ create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## ðŸ”— PHASE DEPENDENCIES

| Phase                     | Requires                         | Blocking    |
| ------------------------- | -------------------------------- | ----------- |
| P1: Scope Analysis        | User request                     | No          |
| P2: Implementation        | Scope + Task List from P1        | **YES**     |
| P3: Verification          | Code changes from P2             | **YES**     |

**â›” Blocking**: If input missing â†’ STOP â†’ Create it first â†’ Resume

---

## ðŸŽ­ Phase 1: SCOPE ANALYSIS â€” ðŸ”º GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `tech-lead`                          | Decompose: analyze scope, identify affected files, define task list |
| Executor  | `scouter`                            | Execute: scan codebase, map dependencies, identify integration points |
| Reviewer  | `reviewer` (Devil's Advocate)        | Challenge: scope correct? Missing dependencies? Breaking changes? |

**Triangle Loop**:
1. `tech-lead` reads user request â†’ decomposes into scope areas: affected modules, files to change, dependencies, risks
2. `tech-lead` posts TASK_ASSIGNMENT to Mailbox â†’ dispatches to `scouter`
3. `scouter` scans codebase deeply â†’ posts SUBMISSION to Mailbox with:
   - Files to create/modify (exact paths)
   - Dependency map (what depends on what)
   - Integration points (APIs, imports, shared state)
   - Existing patterns to follow
   - Potential side effects
4. `reviewer` reviews SUBMISSION â†’ posts REVIEW to Mailbox:
   - Is the scope complete or are files missing?
   - Are there hidden dependencies not mapped?
   - Will these changes break existing functionality?
   - Are there cross-cutting concerns (auth, logging, error handling)?
5. If REVIEW = FAIL â†’ `scouter` addresses gaps or defends â†’ posts RESUBMISSION/DEFENSE
6. `reviewer` re-reviews â†’ max 3 rounds â†’ ESCALATION to `tech-lead` if unresolved
7. `tech-lead` synthesizes into final Shared Task List for Phase 2

**Deliverable**: Scoped task list with affected files, dependencies, and integration points
**Exit Criteria**: All affected files identified, dependencies mapped, risks surfaced, task list ready
**Consensus**: âœ… CONSENSUS: tech-lead âœ“ | scouter âœ“ | reviewer âœ“

---

## ðŸŽ­ Phase 2: IMPLEMENTATION â€” ðŸ”º GOLDEN TRIANGLE

> **THIS IS THE MOST CRITICAL PHASE.** Every step is detailed. No shortcuts.

### Team Selection

```
IF fullstack (frontend + backend changes) â†’
  Tech Lead: tech-lead
  Executor: backend-engineer (then frontend-engineer, sequential)
  Reviewer: reviewer

IF backend-only â†’
  Tech Lead: tech-lead
  Executor: backend-engineer
  Reviewer: reviewer

IF frontend-only â†’
  Tech Lead: tech-lead
  Executor: frontend-engineer
  Reviewer: reviewer

IF game development â†’
  Tech Lead: tech-lead
  Executor: game-engineer
  Reviewer: reviewer

IF mobile development â†’
  Tech Lead: tech-lead
  Executor: mobile-engineer
  Reviewer: reviewer

IF other domain â†’ Consult TEAMS.md roster for correct triangle
```

| Role      | Agent                                    | Mission                                                    |
| --------- | ---------------------------------------- | ---------------------------------------------------------- |
| Tech Lead | `tech-lead`                              | Load scope â†’ decompose into coding tasks â†’ coordinate all work |
| Executor  | `backend-engineer` / `frontend-engineer` / `game-engineer` / `mobile-engineer` | Implement code changes â†’ submit via Mailbox |
| Reviewer  | `reviewer`                               | Review EVERY submission: correctness, security, performance, style |

**Prerequisite**: **READ** Phase 1 scope output (task list + dependency map) before starting.

### GOLDEN TRIANGLE IMPLEMENTATION LOOP (CRITICAL â€” Step by Step)


> **â›” See `_ref/convergent-analysis-loop.md` or `_ref/implementation-loop.md` for detailed step-by-step protocol.**


### SCOPE ADHERENCE (ENFORCED BY REVIEWER)

```
1. READ SCOPE FIRST â€” every task MUST trace to Phase 1 scope
2. IF task seems wrong â†’ STOP â†’ Executor posts ESCALATION to Mailbox
   â†’ Tech Lead evaluates â†’ Re-scope or Override
3. NO scope creep â€” Reviewer explicitly checks for this:
   "Does this SUBMISSION stay within scoped changes? Any additions not in scope?"
4. Scope creep found by Reviewer â†’ automatic FAIL with:
   Severity: CRITICAL | Action: "Remove out-of-scope code or get scope amended"
```

**Exit Criteria**: All scoped tasks implemented, all reviews passed, no unauthorized scope creep, integration verified
**Consensus**: âœ… CONSENSUS: tech-lead âœ“ | {executor} âœ“ | reviewer âœ“

---

## ðŸŽ­ Phase 3: VERIFICATION â€” ðŸ”º GOLDEN TRIANGLE

| Role      | Agent                                        | Mission                                                    |
| --------- | -------------------------------------------- | ---------------------------------------------------------- |
| Tech Lead | `tester`                                     | Decompose: verification strategy, test what was changed    |
| Executor  | `tester` (self-implements tests)             | Execute: write tests, run tests, generate coverage report  |
| Reviewer  | `security-engineer`                          | Challenge: edge cases, regressions, security implications  |

**Triangle Loop**:
1. `tester` (as Tech Lead) reads Phase 2 implementation output â†’ decomposes verification into:
   - Unit tests for changed/new functions
   - Integration tests for affected endpoints or modules
   - Regression checks for dependent code
   - Edge case validation
2. `tester` (as Tech Lead) posts TASK_ASSIGNMENT to Mailbox with test plan
3. `tester` (as Executor) writes and runs tests â†’ posts SUBMISSION per test category:
   - Tests written (file list)
   - Tests passed / failed
   - Coverage percentage for changed files
   - Edge cases validated
4. `security-engineer` reviews test submissions â†’ posts REVIEW:
   - Are security-sensitive paths tested (auth, input validation, injection)?
   - Are edge cases truly edge cases or happy paths in disguise?
   - Are there regression risks in dependent code not covered?
   - Are error paths and failure modes tested?
5. Debate loop if FAIL â†’ `tester` fixes gaps or defends â†’ max 3 rounds
6. `tester` (as Tech Lead) synthesizes final verification report

**Deliverable**: `./reports/{topic}/reviews/REVIEW-{task}`
**Exit Criteria**: All tests pass, changed code covered, security validated, no regressions detected
**Consensus**: âœ… CONSENSUS: tester âœ“ | tester(exec) âœ“ | security-engineer âœ“

---

## âœ… COMPLETION

Present final code implementation report with consensus stamps from ALL phases:

```markdown
# ðŸ”º Golden Triangle Code Report: {task}

## Phase Results
| Phase | Triangle | Consensus | Rounds |
|-------|----------|-----------|--------|
| P1: Scope Analysis | tech-lead / scouter / reviewer | âœ… | {n} |
| P2: Implementation | tech-lead / {executor} / reviewer | âœ… | {n} |
| P3: Verification | tester / tester / security-engineer | âœ… | {n} |

## Debate Summary
- Total submissions: {count}
- First-pass approvals: {count}
- Debates triggered: {count}
- Arbitrations needed: {count}

## Files Changed
{list of all files created/modified}

## Mailbox Reference
Full debate history: `./reports/{topic}/MAILBOX-{date}.md`

## Next Actions
1. âœ… **Done** â€” Code complete (triangle-validated across all phases)
2. ðŸš€ **Deploy** â†’ `/deploy:preview`
3. ðŸ“ **Docs** â†’ `/docs:core`
4. âŒ **Changes required** â€” Critical issues found â†’ `/fix:team`
5. ðŸ§ª **Test gaps** â€” Insufficient coverage â†’ `/test:team`
```
