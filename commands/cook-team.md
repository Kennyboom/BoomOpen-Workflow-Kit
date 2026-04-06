---
description: "🔺 Team Feature — Golden Triangle parallel agent collaboration for maximum quality"
version: "3.0"
category: engineering
execution-mode: execute
---

# /cook:team — Golden Triangle Feature Development

> **MISSION**: Maximum quality feature development through adversarial collaboration.
> Each phase spawns a **Golden Triangle** of 3 agents: Tech Lead (coordinator),
> Executor (implementer), Reviewer (devil's advocate). Output is released ONLY
> upon consensus after debate.

<feature>$ARGUMENTS</feature>

---

## ⛔ MANDATORY REFERENCE — READ BEFORE PROCEEDING

> **🔴 YOU MUST READ these reference files NOW. Do NOT skip.**
>
> 1. `~/.gemini/antigravity/global_workflows/_ref/golden-triangle-protocol.md` — Tiered Execution, Mailbox, Pre-Flight, Triangle Loop
> 2. `~/.gemini/antigravity/global_workflows/_ref/convergent-analysis-loop.md` — Phase 2 detailed analysis protocol
> 3. `~/.gemini/antigravity/global_workflows/_ref/implementation-loop.md` — Phase 6 Implementation step-by-step (CRITICAL)
>
> **Failure to read = incorrect execution. These files contain BINDING protocols.**

---

## 📁 DELIVERABLE FILES

| Phase | Output |
|-------|--------|
| P1: Discovery | `./reports/{topic}/brainstorms/BRAINSTORM-{feature}` |
| P2: Research | `./reports/{topic}/researchers/RESEARCH-{feature}` + `./reports/{topic}/scouts/SCOUT-{feature}` |
| P4: Design | `./reports/{topic}/designs/DESIGN-{feature}` |
| P5: Planning | `./reports/{topic}/plans/PLAN-{feature}` |
| ALL Phases | `./reports/{topic}/MAILBOX-{date}.md` |

**⚠️ Paths = base names.** ≤ 150 lines → `{name}.md`. > 150 lines → `{name}/` folder.

---

## 🔗 PHASE DEPENDENCIES

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

## 🎭 Phase 1: REQUIREMENTS & DISCOVERY — 🔺 GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `researcher` | Decompose: requirements, codebase survey, prior art |
| Executor | `scouter` | Deep codebase analysis, map architecture, integration points |
| Reviewer | `brainstormer` (Devil's Advocate) | Challenge: missed requirements? Unvalidated assumptions? |

**Triangle Loop**: researcher decomposes → scouter surveys → brainstormer challenges
**Deliverable**: Requirements + discovery report
**Consensus**: ✅ CONSENSUS: researcher ✓ | scouter ✓ | brainstormer ✓

---

## 🎭 Phase 2: RESEARCH & PATTERNS — 🔺 GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `researcher` | Pattern research areas, technology evaluation criteria |
| Executor | `researcher` (self-executes) | Deep-dive patterns, libraries, best practices |
| Reviewer | `tech-lead` (feasibility critic) | Does pattern fit codebase? Complexity justified? Simpler alternatives? |

**Deliverable**: `RESEARCH-{feature}` + `SCOUT-{feature}`
**Consensus**: ✅ CONSENSUS: researcher ✓ | researcher(exec) ✓ | tech-lead ✓

---

## 🎭 Phase 3: DATABASE DESIGN (IF DATA CHANGES) — 🔺 GOLDEN TRIANGLE

> **Trigger**: Feature involves database changes. Skip if no data changes.

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `tech-lead` | Schema design tasks, migration planning |
| Executor | `database-architect` | Design schema, write migrations, plan indexes |
| Reviewer | `reviewer` + security/perf lens | SQL injection, N+1 queries, missing indexes, data integrity |

**Consensus**: ✅ CONSENSUS: tech-lead ✓ | database-architect ✓ | reviewer ✓

---

## 🎭 Phase 4: DESIGN (IF UI NEEDED) — 🔺 GOLDEN TRIANGLE

> **Trigger**: Feature has UI components. Skip if backend-only.

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `designer` | UI components, interaction flows, design tokens |
| Executor | `frontend-engineer` | Design specs, component structures, responsive layouts |
| Reviewer | `reviewer` + UX/a11y lens | WCAG 2.1 AA, keyboard nav, screen reader, mobile-first |

**Deliverable**: `DESIGN-{feature}`
**Consensus**: ✅ CONSENSUS: designer ✓ | frontend-engineer ✓ | reviewer ✓

---

## 🎭 Phase 5: PLANNING — 🔺 GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `planner` | Plan creation, task ordering, effort estimation |
| Executor | `researcher` | Fill knowledge gaps, draft plan sections |
| Reviewer | `tech-lead` (feasibility critic) | Realistic estimates? Risks mitigated? Rollback strategy? |

**Prerequisite**: **READ** RESEARCH + SCOUT + DESIGN files
**Deliverable**: `PLAN-{feature}`
**Consensus**: ✅ CONSENSUS: planner ✓ | researcher ✓ | tech-lead ✓

---

## 🎭 Phase 6: IMPLEMENTATION — 🔺 GOLDEN TRIANGLE (CRITICAL)

> **⛔ MANDATORY: READ `_ref/implementation-loop.md` for the full step-by-step protocol.**

**Prerequisite**: **READ and FOLLOW** `./reports/{topic}/plans/PLAN-{feature}`
**Exit Criteria**: All plan tasks implemented, reviews passed, no unauthorized deviations
**Consensus**: ✅ CONSENSUS: tech-lead ✓ | {executor} ✓ | reviewer ✓

---

## 🎭 Phase 7: TESTING & REVIEW — 🔺 GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `tester` | Test strategy, coverage targets, acceptance verification |
| Executor | `tester` (self-implements) | Write tests, run tests, coverage report |
| Reviewer | `reviewer` + security/perf lens | Test gaps, missing security tests, perf benchmarks |

**PLAN CHECKPOINT VERIFICATION** (MANDATORY):
- For EACH acceptance criterion in PLAN → write test → verify → document

**Consensus**: ✅ CONSENSUS: tester ✓ | tester(exec) ✓ | reviewer ✓

---

## ✅ COMPLETION TEMPLATE

```markdown
# 🔺 Golden Triangle Feature Report: {feature}

## Phase Results
| Phase | Triangle | Consensus | Rounds |
|-------|----------|-----------|--------|
| P1: Requirements | researcher / scouter / brainstormer | ✅ | {n} |
| P2: Research | researcher / researcher / tech-lead | ✅ | {n} |
| P3: Database | tech-lead / database-architect / reviewer | ✅ or SKIPPED | {n} |
| P4: Design | designer / frontend-engineer / reviewer | ✅ or SKIPPED | {n} |
| P5: Planning | planner / researcher / tech-lead | ✅ | {n} |
| P6: Implementation | tech-lead / {executor} / reviewer | ✅ | {n} |
| P7: Testing | tester / tester / reviewer | ✅ | {n} |

## Next Actions
1. ✅ **Done** — Feature complete (triangle-validated)
2. 🚀 `/deploy:preview` → Deploy to staging
3. 📝 `/docs:core` → Generate documentation
```
