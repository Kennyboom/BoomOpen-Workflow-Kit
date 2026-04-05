---
description: "ðŸ”º Team Fix â€” Golden Triangle adversarial collaboration for maximum quality issue resolution"
version: "3.0"
category: debugging
execution-mode: execute
---

# /fix:team â€” Golden Triangle Issue Resolution

> **MISSION**: Maximum quality issue resolution through adversarial collaboration.
> Each phase spawns a **Golden Triangle** of 3 agents. Output is released ONLY
> upon consensus after debate.

<issue>$ARGUMENTS</issue>

---

## â›” MANDATORY REFERENCE â€” READ BEFORE PROCEEDING

> **ðŸ”´ YOU MUST READ these reference files NOW. Do NOT skip.**
>
> 1. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/golden-triangle-protocol.md` â€” Tiered Execution, Mailbox, Pre-Flight, Triangle Loop
> 2. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/implementation-loop.md` â€” Phase 4 Implementation step-by-step (CRITICAL)
>
> **Failure to read = incorrect execution. These files contain BINDING protocols.**

---

## ðŸ“ DELIVERABLE FILES

| Phase | Output |
|-------|--------|
| P1: Investigation | `./reports/{topic}/debugs/INVESTIGATION-{issue}` |
| P2: Root Cause | `./reports/{topic}/debugs/DEBUG-{issue}` |
| P3: Fix Planning | `./reports/{topic}/plans/PLAN-{issue}` |
| P5: Testing | `./reports/{topic}/qa/QA-{issue}` |
| ALL Phases | `./reports/{topic}/MAILBOX-{date}.md` |

**âš ï¸ Paths = base names.** â‰¤ 150 lines â†’ `{name}.md`. > 150 lines â†’ `{name}/` folder.

---

## ðŸ”— PHASE DEPENDENCIES

| Phase | Requires | Blocking |
|-------|----------|----------|
| P1: Investigation | User issue report | No |
| P2: Root Cause Analysis | P1 investigation findings | **YES** |
| P3: Fix Planning | P2 confirmed root cause | **YES** |
| P4: Implementation | **PLAN file** | **YES** |
| P5: Testing & Verification | PLAN + Code changes | **YES** |

---

## ðŸŽ­ Phase 1: INVESTIGATION â€” ðŸ”º GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `debugger` | Triage, define investigation areas, coordinate |
| Executor | `scouter` | Trace errors, analyze code paths, identify root cause candidates |
| Reviewer | `researcher` (Devil's Advocate) | Challenge hypotheses, find alternative explanations |

**Focus areas**: Reproduction, error tracing, code path analysis, environmental factors, recent changes (git blame)
**Deliverable**: `INVESTIGATION-{issue}`
**Consensus**: âœ… CONSENSUS: debugger âœ“ | scouter âœ“ | researcher âœ“

---

## ðŸŽ­ Phase 2: ROOT CAUSE ANALYSIS â€” ðŸ”º GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `debugger` | Select top candidates, plan validation tasks |
| Executor | `backend-engineer` or `frontend-engineer` | Deep-dive root cause, validate with code evidence |
| Reviewer | `reviewer` | Verify root cause correctness, check regression risk |

> Executor selection: server/API/DB bug â†’ backend-engineer. UI/state bug â†’ frontend-engineer.

**Prerequisite**: READ `INVESTIGATION-{issue}`
**Deliverable**: `DEBUG-{issue}` â€” confirmed root cause, exact fault lines, impact scope, related issues
**Consensus**: âœ… CONSENSUS: debugger âœ“ | {executor} âœ“ | reviewer âœ“

---

## ðŸŽ­ Phase 3: FIX PLANNING â€” ðŸ”º GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `planner` | Plan fix steps, acceptance criteria, rollback strategy |
| Executor | `researcher` | Research fix approaches, evaluate trade-offs |
| Reviewer | `tech-lead` (feasibility critic) | Verify no side effects, check regression risk |

**Prerequisite**: READ `DEBUG-{issue}`
**Key outputs**: Fix approaches compared (patch vs refactor), implementation tasks, rollback steps, acceptance criteria
**Deliverable**: `PLAN-{issue}`
**Consensus**: âœ… CONSENSUS: planner âœ“ | researcher âœ“ | tech-lead âœ“

---

## ðŸŽ­ Phase 4: IMPLEMENTATION â€” ðŸ”º GOLDEN TRIANGLE (CRITICAL)

> **â›” READ `_ref/implementation-loop.md` for full step-by-step protocol and team selection.**

**Prerequisite**: READ and FOLLOW `PLAN-{issue}`
**Exit Criteria**: All fix tasks implemented, reviews passed, root cause addressed
**Consensus**: âœ… CONSENSUS: tech-lead âœ“ | {executor} âœ“ | reviewer âœ“

---

## ðŸŽ­ Phase 5: TESTING & VERIFICATION â€” ðŸ”º GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `tester` | Test strategy: fix verification + regression testing |
| Executor | `tester` (self-implements) | Write fix proofs, regression suite, coverage report |
| Reviewer | `security-engineer` | Edge cases, security implications, no regressions |

**ROOT CAUSE VERIFICATION** (MANDATORY): For EACH symptom â†’ write test that FAILS without fix, PASSES with fix
**REGRESSION VERIFICATION** (MANDATORY): For EACH affected component â†’ regression test for adjacent functionality

**Deliverable**: `QA-{issue}`
**Consensus**: âœ… CONSENSUS: tester âœ“ | tester(exec) âœ“ | security-engineer âœ“

---

## âœ… COMPLETION TEMPLATE

```markdown
# ðŸ”º Golden Triangle Issue Resolution Report: {issue}

## Phase Results
| Phase | Triangle | Consensus | Rounds |
|-------|----------|-----------|--------|
| P1: Investigation | debugger / scouter / researcher | âœ… | {n} |
| P2: Root Cause | debugger / {executor} / reviewer | âœ… | {n} |
| P3: Fix Planning | planner / researcher / tech-lead | âœ… | {n} |
| P4: Implementation | tech-lead / {executor} / reviewer | âœ… | {n} |
| P5: Testing | tester / tester / security-engineer | âœ… | {n} |

## Next Actions
1. âœ… **Fixed** â€” Issue resolved (triangle-validated)
2. ðŸš€ `/deploy:preview` â†’ Deploy to staging
```
