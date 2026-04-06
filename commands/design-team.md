---
description: "🔺 Team Design — Golden Triangle adversarial collaboration for maximum quality design"
version: "3.0"
category: design
execution-mode: execute
---

# /design:team — Golden Triangle Design System Development

> **MISSION**: Maximum quality UI/UX design through adversarial collaboration.
> Each phase spawns a **Golden Triangle** of 3 agents. Output is released ONLY
> upon consensus after debate.

<request>$ARGUMENTS</request>

---

## ⛔ MANDATORY REFERENCE — READ BEFORE PROCEEDING

> **🔴 YOU MUST READ these reference files NOW. Do NOT skip.**
>
> 1. `~/.gemini/antigravity/global_workflows/_ref/golden-triangle-protocol.md` — Tiered Execution, Mailbox, Pre-Flight, Triangle Loop
>
> **Failure to read = incorrect execution. These files contain BINDING protocols.**

---

## 📁 DELIVERABLE FILES

| Phase | Output |
|-------|--------|
| P1: Research | `./reports/{topic}/researchers/RESEARCH-{request}` + `./reports/{topic}/scouts/SCOUT-{request}` |
| P2: Design Spec | `./reports/{topic}/designs/DESIGN-{request}` |
| P3: Impl Spec | `./reports/{topic}/designs/DESIGN-SPEC-{request}` |
| P4: Handoff | `./reports/{topic}/reviews/REVIEW-{request}` |
| ALL Phases | `./reports/{topic}/MAILBOX-{date}.md` |

**⚠️ Paths = base names.** ≤ 150 lines → `{name}.md`. > 150 lines → `{name}/` folder.

---

## 🔗 PHASE DEPENDENCIES

| Phase | Requires | Blocking |
|-------|----------|----------|
| P1: Design Research | User request | No |
| P2: Design Spec & Wireframes | Research from P1 | **YES** |
| P3: Implementation Spec | DESIGN from P2 | **YES** |
| P4: Review & Handoff | DESIGN-SPEC from P3 | **YES** |

---

## 🎭 Phase 1: DESIGN RESEARCH — 🔺 GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `designer` | Research areas, user needs, design constraints |
| Executor | `researcher` + `scouter` | Audit existing design system, competitive analysis, UX patterns |
| Reviewer | `brainstormer` (Devil's Advocate) | Challenge user assumptions, missing personas, accessibility gaps |

**Focus**: User needs, existing design audit, competitive patterns, WCAG 2.1 AA requirements
**Deliverable**: `RESEARCH-{request}` + `SCOUT-{request}`
**Consensus**: ✅ CONSENSUS: designer ✓ | researcher+scouter ✓ | brainstormer ✓

---

## 🎭 Phase 2: DESIGN SPEC & WIREFRAMES — 🔺 GOLDEN TRIANGLE (CRITICAL)

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `designer` | Component hierarchy, interaction patterns, design tokens |
| Executor | `designer` (self-implements) | Detailed design specs, layouts, component structures |
| Reviewer | `frontend-engineer` + `reviewer` | Technical feasibility, responsive, a11y, performance |

**Prerequisite**: READ RESEARCH + SCOUT files from P1

**Deliverable must include**: Visual specs (layout/typography/color/spacing), design tokens, component hierarchy with all states (default/hover/active/disabled/error/loading/empty/focused), micro-interactions, responsive breakpoints, WCAG a11y specs, feasibility notes

**Consensus**: ✅ CONSENSUS: designer ✓ | designer(exec) ✓ | frontend-engineer ✓

---

## 🎭 Phase 3: IMPLEMENTATION SPEC — 🔺 GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `tech-lead` | Bridge design → code, define component contracts |
| Executor | `frontend-engineer` | Write DESIGN-SPEC with component APIs, state machines |
| Reviewer | `designer` | Verify spec matches design intent, visual fidelity |

**Prerequisite**: READ `DESIGN-{request}`

**Deliverable must include**: TypeScript component interfaces, state machine definitions, design token → CSS variable mapping, animation specs, ARIA implementation plan, integration points

**Consensus**: ✅ CONSENSUS: tech-lead ✓ | frontend-engineer ✓ | designer ✓

---

## 🎭 Phase 4: REVIEW & HANDOFF — 🔺 GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `designer` | Final review, design system compliance |
| Executor | `docs-manager` | Write component catalog, usage guidelines, developer FAQ |
| Reviewer | `tech-lead` | Can a developer implement from this alone? Edge states covered? |

**Prerequisite**: READ `DESIGN-{request}` + `DESIGN-SPEC-{request}`

**Deliverable must include**: Component catalog entries, usage do/don't examples, design token reference, developer integration guide, edge case documentation

**Consensus**: ✅ CONSENSUS: designer ✓ | docs-manager ✓ | tech-lead ✓

---

## ✅ COMPLETION TEMPLATE

```markdown
# 🔺 Golden Triangle Design Report: {request}

## Phase Results
| Phase | Triangle | Consensus | Rounds |
|-------|----------|-----------|--------|
| P1: Research | designer / researcher+scouter / brainstormer | ✅ | {n} |
| P2: Design Spec | designer / designer / frontend-engineer | ✅ | {n} |
| P3: Impl Spec | tech-lead / frontend-engineer / designer | ✅ | {n} |
| P4: Handoff | designer / docs-manager / tech-lead | ✅ | {n} |

## Next Actions
1. ✅ **Done** — Design complete (triangle-validated)
2. 🚀 `/cook:team {request}` → Build from design specs
3. 📋 `/plan:team {request}` → Create implementation plan
```
