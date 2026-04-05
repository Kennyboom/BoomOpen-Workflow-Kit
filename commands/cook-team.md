---
description: "ðŸ”º Team Feature â€” Golden Triangle parallel agent collaboration for maximum quality"
version: "3.0"
category: engineering
execution-mode: execute
---

# /cook:team â€” Golden Triangle Feature Development

> **MISSION**: Maximum quality feature development through adversarial collaboration.
> Each phase spawns a **Golden Triangle** of 3 agents: Tech Lead (coordinator),
> Executor (implementer), Reviewer (devil's advocate). Output is released ONLY
> upon consensus after debate.

<feature>$ARGUMENTS</feature>

---

## â›” MANDATORY REFERENCE â€” READ BEFORE PROCEEDING

> **ðŸ”´ YOU MUST READ these reference files NOW. Do NOT skip.**
>
> 1. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/golden-triangle-protocol.md` â€” Tiered Execution, Mailbox, Pre-Flight, Triangle Loop
> 2. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/convergent-analysis-loop.md` â€” Phase 2 detailed analysis protocol
> 3. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/implementation-loop.md` â€” Phase 6 Implementation step-by-step (CRITICAL)
>
> **Failure to read = incorrect execution. These files contain BINDING protocols.**

---

## ðŸ“ DELIVERABLE FILES

| Phase | Output |
|-------|--------|
| P1: Discovery | `./reports/{topic}/brainstorms/BRAINSTORM-{feature}` |
| P2: Research | `./reports/{topic}/researchers/RESEARCH-{feature}` + `./reports/{topic}/scouts/SCOUT-{feature}` |
| P4: Design | `./reports/{topic}/designs/DESIGN-{feature}` |
| P5: Planning | `./reports/{topic}/plans/PLAN-{feature}` |
| ALL Phases | `./reports/{topic}/MAILBOX-{date}.md` |

**âš ï¸ Paths = base names.** â‰¤ 150 lines â†’ `{name}.md`. > 150 lines â†’ `{name}/` folder.

---

## ðŸ”— PHASE DEPENDENCIES

| Phase | Requires | Blocking |
|-------|----------|----------|
| P1: Requirements & Discovery | User request | No |
| P2: Research & Patterns | P1 requirements | No |
| P3: Database Design | Data requirements from P1/P2 | Conditional |
| P4: Design | Scout findings from P2 | Conditional |
| P5: Planning | RESEARCH + SCOUT + DESIGN | **YES** |
| P6: Implementation | **PLAN file** | **YES** |
| P7: Testing & Review | PLAN + Code + Tests | **YES** |

---

## ðŸŽ­ Phase 1: REQUIREMENTS & DISCOVERY â€” ðŸ”º GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `researcher` | Decompose: requirements, codebase survey, prior art |
| Executor | `scouter` | Deep codebase analysis, map architecture, integration points |
| Reviewer | `brainstormer` (Devil's Advocate) | Challenge: missed requirements? Unvalidated assumptions? |

**Triangle Loop**: researcher decomposes â†’ scouter surveys â†’ brainstormer challenges
**Deliverable**: Requirements + discovery report
**Consensus**: âœ… CONSENSUS: researcher âœ“ | scouter âœ“ | brainstormer âœ“

---

## ðŸŽ­ Phase 2: RESEARCH & PATTERNS â€” ðŸ”º GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `researcher` | Pattern research areas, technology evaluation criteria |
| Executor | `researcher` (self-executes) | Deep-dive patterns, libraries, best practices |
| Reviewer | `tech-lead` (feasibility critic) | Does pattern fit codebase? Complexity justified? Simpler alternatives? |

**Deliverable**: `RESEARCH-{feature}` + `SCOUT-{feature}`
**Consensus**: âœ… CONSENSUS: researcher âœ“ | researcher(exec) âœ“ | tech-lead âœ“

---

## ðŸŽ­ Phase 3: DATABASE DESIGN (IF DATA CHANGES) â€” ðŸ”º GOLDEN TRIANGLE

> **Trigger**: Feature involves database changes. Skip if no data changes.

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `tech-lead` | Schema design tasks, migration planning |
| Executor | `database-architect` | Design schema, write migrations, plan indexes |
| Reviewer | `reviewer` + security/perf lens | SQL injection, N+1 queries, missing indexes, data integrity |

**Consensus**: âœ… CONSENSUS: tech-lead âœ“ | database-architect âœ“ | reviewer âœ“

---

## ðŸŽ­ Phase 4: DESIGN (IF UI NEEDED) â€” ðŸ”º GOLDEN TRIANGLE

> **Trigger**: Feature has UI components. Skip if backend-only.

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `designer` | UI components, interaction flows, design tokens |
| Executor | `frontend-engineer` | Design specs, component structures, responsive layouts |
| Reviewer | `reviewer` + UX/a11y lens | WCAG 2.1 AA, keyboard nav, screen reader, mobile-first |

**Deliverable**: `DESIGN-{feature}`
**Consensus**: âœ… CONSENSUS: designer âœ“ | frontend-engineer âœ“ | reviewer âœ“

---

## ðŸŽ­ Phase 5: PLANNING â€” ðŸ”º GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `planner` | Plan creation, task ordering, effort estimation |
| Executor | `researcher` | Fill knowledge gaps, draft plan sections |
| Reviewer | `tech-lead` (feasibility critic) | Realistic estimates? Risks mitigated? Rollback strategy? |

**Prerequisite**: **READ** RESEARCH + SCOUT + DESIGN files
**Deliverable**: `PLAN-{feature}`
**Consensus**: âœ… CONSENSUS: planner âœ“ | researcher âœ“ | tech-lead âœ“

---

## ðŸŽ­ Phase 6: IMPLEMENTATION â€” ðŸ”º GOLDEN TRIANGLE (CRITICAL)

> **â›” MANDATORY: READ `_ref/implementation-loop.md` for the full step-by-step protocol.**

**Prerequisite**: **READ and FOLLOW** `./reports/{topic}/plans/PLAN-{feature}`
**Exit Criteria**: All plan tasks implemented, reviews passed, no unauthorized deviations
**Consensus**: âœ… CONSENSUS: tech-lead âœ“ | {executor} âœ“ | reviewer âœ“

---

## ðŸŽ­ Phase 7: TESTING & REVIEW â€” ðŸ”º GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `tester` | Test strategy, coverage targets, acceptance verification |
| Executor | `tester` (self-implements) | Write tests, run tests, coverage report |
| Reviewer | `reviewer` + security/perf lens | Test gaps, missing security tests, perf benchmarks |

**PLAN CHECKPOINT VERIFICATION** (MANDATORY):
- For EACH acceptance criterion in PLAN â†’ write test â†’ verify â†’ document

**Consensus**: âœ… CONSENSUS: tester âœ“ | tester(exec) âœ“ | reviewer âœ“

---

## âœ… COMPLETION TEMPLATE

```markdown
# ðŸ”º Golden Triangle Feature Report: {feature}

## Phase Results
| Phase | Triangle | Consensus | Rounds |
|-------|----------|-----------|--------|
| P1: Requirements | researcher / scouter / brainstormer | âœ… | {n} |
| P2: Research | researcher / researcher / tech-lead | âœ… | {n} |
| P3: Database | tech-lead / database-architect / reviewer | âœ… or SKIPPED | {n} |
| P4: Design | designer / frontend-engineer / reviewer | âœ… or SKIPPED | {n} |
| P5: Planning | planner / researcher / tech-lead | âœ… | {n} |
| P6: Implementation | tech-lead / {executor} / reviewer | âœ… | {n} |
| P7: Testing | tester / tester / reviewer | âœ… | {n} |

## Next Actions
1. âœ… **Done** â€” Feature complete (triangle-validated)
2. ðŸš€ `/deploy:preview` â†’ Deploy to staging
3. ðŸ“ `/docs:core` â†’ Generate documentation
```
