---
description: "🔺 Team Plan — Golden Triangle adversarial collaboration for maximum quality planning"
version: "2.0"
category: planning
execution-mode: execute
---

# /plan:team — Golden Triangle Planning & Architecture

> **MISSION**: Maximum quality technical planning through adversarial collaboration.
> Each phase spawns a **Golden Triangle** of 3 agents: Tech Lead (coordinator),
> Executor (implementer), Reviewer (devil's advocate). Output is released ONLY
> upon consensus after debate.

<task>$ARGUMENTS</task>

---


---

## ⛔ MANDATORY REFERENCE — READ BEFORE PROCEEDING

> **🔴 YOU MUST READ these reference files NOW. Do NOT skip.**
>
> 1. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/golden-triangle-protocol.md` — Tiered Execution, Mailbox, Pre-Flight, Triangle Loop
> 2. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/convergent-analysis-loop.md` — Convergent Analysis detailed protocol
> 3. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/implementation-loop.md` — Implementation step-by-step (for coding phases)
>
> **Failure to read = incorrect execution. These files contain BINDING protocols.**

---
## ðŸ“ DELIVERABLE FILES

| Phase / Team     | Output                                          |
| ---------------- | ----------------------------------------------- |
| Phase 1 (Disc.)  | `./reports/{topic}/brainstorms/BRAINSTORM-{task}` + `./reports/{topic}/scouts/SCOUT-{task}` |
| Phase 2 (Arch.)  | `./reports/{topic}/researchers/RESEARCH-{task}` + `./reports/{topic}/designs/ADR-{task}` |
| Phase 3 (Plan)   | `./reports/{topic}/plans/PLAN-{task}` (or `PLAN-{task}-phase1`, …) |
| Phase 4 (Review) | `./reports/{topic}/qa/QA-PLAN-{task}`                |
| ALL Phases        | `./reports/{topic}/MAILBOX-{date}.md`                  |

All files in `./reports/{topic}/` → English only. If plan has **> 3 phases** or **> 3 days** effort → produce **multiple plan files** (one per phase/milestone), each executable in sequence.
**âš ï¸ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## 🔗 PHASE DEPENDENCIES

| Phase                           | Requires                          | Blocking    |
| ------------------------------- | --------------------------------- | ----------- |
| P1: Requirements Discovery      | User request                      | No          |
| P2: Architecture & Research     | P1 requirements + codebase map    | **YES**     |
| P3: Plan Creation               | RESEARCH + ADRs + SCOUT           | **YES**     |
| P4: Review & Finalization       | **PLAN file(s)**                  | **YES**     |

**⛔ Blocking**: If input missing → STOP → Create it first → Resume

---

## 🎭 Phase 1: REQUIREMENTS DISCOVERY — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `researcher`                         | Decompose: requirement areas, stakeholder analysis, scope boundaries |
| Executor  | `scouter` + `business-analyst`       | Execute: codebase analysis, business requirements extraction |
| Reviewer  | `brainstormer` (Devil's Advocate)    | Challenge: missed requirements, unstated assumptions |

**Triangle Loop**:
1. `researcher` decomposes into: functional reqs, non-functional reqs, codebase context, stakeholder needs → TASK_ASSIGNMENT to Mailbox
2. `scouter` surveys codebase → posts SUBMISSION: architecture map, dependency graph, existing patterns, constraints
3. `business-analyst` extracts business reqs → posts SUBMISSION: user stories, business rules, priorities, success metrics
4. `brainstormer` reviews EACH SUBMISSION → posts REVIEW:
   - Requirements complete? Edge cases missed? Assumptions validated?
   - Conflicting requirements? Adversarial scenarios?
5. If FAIL → executors address gaps or defend → RESUBMISSION/DEFENSE → max 3 rounds
6. `researcher` synthesizes all approved findings into unified artifacts

**Deliverable**: `./reports/{topic}/brainstorms/BRAINSTORM-{task}` + `./reports/{topic}/scouts/SCOUT-{task}`
**Exit Criteria**: All requirements captured, codebase mapped, business context validated, assumptions challenged
**Consensus**: ✅ CONSENSUS: researcher ✓ | scouter+business-analyst ✓ | brainstormer ✓

---

## 🎭 Phase 2: ARCHITECTURE & RESEARCH — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `tech-lead`                          | Decompose: architecture decisions, pattern selection |
| Executor  | `researcher`                         | Execute: research patterns, evaluate technologies, draft ADRs |
| Reviewer  | `reviewer` (feasibility critic)      | Challenge: over-engineering, complexity, scalability concerns |

**Prerequisite**: **READ** BRAINSTORM + SCOUT files from Phase 1.

**Triangle Loop**:
1. `tech-lead` reads Phase 1 artifacts → decomposes: pattern selection, tech evaluation, data model, API contracts, NFR architecture → TASK_ASSIGNMENT to Mailbox
2. `researcher` deep-dives each area → posts SUBMISSION: trade-off matrix, evaluation pros/cons, draft ADR per decision, evidence (benchmarks, case studies)
3. `reviewer` reviews with feasibility lens → posts REVIEW:
   - Does this pattern fit our codebase? Complexity justified?
   - Simpler alternatives? Maintenance burden? Evidence-backed?
4. Debate loop if FAIL → `researcher` defends or pivots → max 3 rounds
5. `tech-lead` arbitrates disputes → DECISION → synthesizes deliverables

**CONSTRAINT INHERITANCE**: Architecture decisions MUST reference Phase 1 ("Based on requirement R1...", "Codebase constraint from SCOUT...", "Business rule from BA...")

**Deliverable**: `./reports/{topic}/researchers/RESEARCH-{task}` + `./reports/{topic}/designs/ADR-{task}`
**Exit Criteria**: Patterns researched, alternatives documented, ADRs drafted, feasibility validated
**Consensus**: ✅ CONSENSUS: tech-lead ✓ | researcher ✓ | reviewer ✓

---

## 🎭 Phase 3: PLAN CREATION — 🔺 GOLDEN TRIANGLE

> **THIS IS THE MOST CRITICAL PHASE.** Every step is detailed. No shortcuts.

| Role      | Agent                                         | Mission                                                    |
| --------- | --------------------------------------------- | ---------------------------------------------------------- |
| Tech Lead | `planner`                                     | Decompose: plan structure, task breakdown, dependencies |
| Executor  | `planner` (self-implements)                   | Execute: write detailed PLAN-{task}.md |
| Reviewer  | `tech-lead` + `security-engineer` lens        | Challenge: missing tasks, wrong estimates, security gaps, unfeasible steps |

**Prerequisite**: **READ** BRAINSTORM + SCOUT + RESEARCH + ADR files from Phases 1–2.

### GOLDEN TRIANGLE PLAN CREATION LOOP (CRITICAL — Step by Step)


> **⛔ See `_ref/convergent-analysis-loop.md` or `_ref/implementation-loop.md` for detailed step-by-step protocol.**


### PLAN QUALITY ENFORCEMENT (ENFORCED BY REVIEWER)

```
1. Every task MUST trace to a requirement or ADR — orphans = automatic FAIL
2. Every external input path must have validation planned
3. Every phase must have a rollback strategy
4. Deviations from prior phase findings require explicit justification
```

**Deliverable**: `./reports/{topic}/plans/PLAN-{task}` (single) or `PLAN-{task}-phase1`, … (multi-phase)
**Exit Criteria**: Plan complete, all sections reviewed, security validated, estimates challenged, traceability verified
**Consensus**: ✅ CONSENSUS: planner ✓ | planner(exec) ✓ | tech-lead+security ✓

---

## 🎭 Phase 4: REVIEW & FINALIZATION — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `tech-lead`                          | Final review, integration check |
| Executor  | `reviewer`                           | Execute: comprehensive plan review |
| Reviewer  | `business-analyst`                   | Challenge: business alignment, acceptance criteria coverage |

**Prerequisite**: **READ** PLAN file(s) + all Phase 1–2 artifacts.

**Triangle Loop**:
1. `tech-lead` decomposes into: technical coherence, cross-phase traceability, risk adequacy, testability → TASK_ASSIGNMENT to Mailbox
2. `reviewer` audits plan → posts SUBMISSION: structure assessment, completeness vs Phase 1 reqs, ADR alignment, security posture, executability score
3. `business-analyst` reviews with business lens → posts REVIEW:
   - Acceptance criteria cover all business requirements?
   - Success metrics testable? Priority aligned with value?
   - Stakeholders would approve as-is?
4. Debate loop if FAIL → `reviewer` addresses gaps or defends → max 3 rounds
5. `tech-lead` synthesizes final validation report

**FINAL QUALITY GATE**:
```
FOR EACH requirement in BRAINSTORM-{task}.md:
  → reviewer: Verify ≥1 plan task addresses this requirement
  → business-analyst: Confirm AC matches business intent
  → Document: "REQ-{id} → Task: {ref} → AC: {criteria} → ✓/✗"
```

**Deliverable**: `./reports/{topic}/qa/QA-PLAN-{task}` — includes: PASS/REVISE verdict, traceability matrix, security summary, business confirmation
**Exit Criteria**: Plan validated, technically coherent, security reviewed, business-aligned
**Consensus**: ✅ CONSENSUS: tech-lead ✓ | reviewer ✓ | business-analyst ✓

**âš ï¸ IF VERDICT = NEEDS REVISION:**
```
1. QA-PLAN lists specific amendments
2. RETURN to Phase 3 → planner addresses amendments
3. RE-RUN Phase 4 → max 2 revision cycles → then escalate to user
```

---

## ✅ COMPLETION

```markdown
# 🔺 Golden Triangle Planning Report: {task}

## Phase Results
| Phase | Triangle | Consensus | Rounds |
|-------|----------|-----------|--------|
| P1: Requirements | researcher / scouter+BA / brainstormer | ✅ | {n} |
| P2: Architecture | tech-lead / researcher / reviewer | ✅ | {n} |
| P3: Plan Creation | planner / planner / tech-lead+security | ✅ | {n} |
| P4: Review | tech-lead / reviewer / business-analyst | ✅ | {n} |

## Debate Summary
- Total submissions: {count} | First-pass: {count} | Debates: {count} | Arbitrations: {count}

## Deliverables
1. ✅ **Plan** — `./reports/{topic}/plans/PLAN-{task}` (or multi-phase files)
2. ✅ **QA** — `./reports/{topic}/qa/QA-PLAN-{task}` confirms PASS
3. 📬 **Debate** — `./reports/{topic}/MAILBOX-{date}.md`

## Next Actions
1. ðŸ³ **Implement** → `/cook:team` or `/cook:hard`
2. ðŸ“ **Docs** → `/docs:core`
3. 🔄 **Revise** → Re-run Phase 3 with updated requirements
```
