---
description: "ðŸ”º Team Design â€” Golden Triangle adversarial collaboration for maximum quality design"
version: "3.0"
category: design
execution-mode: execute
---

# /design:team â€” Golden Triangle Design System Development

> **MISSION**: Maximum quality UI/UX design through adversarial collaboration.
> Each phase spawns a **Golden Triangle** of 3 agents. Output is released ONLY
> upon consensus after debate.

<request>$ARGUMENTS</request>

---

## â›” MANDATORY REFERENCE â€” READ BEFORE PROCEEDING

> **ðŸ”´ YOU MUST READ these reference files NOW. Do NOT skip.**
>
> 1. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/golden-triangle-protocol.md` â€” Tiered Execution, Mailbox, Pre-Flight, Triangle Loop
>
> **Failure to read = incorrect execution. These files contain BINDING protocols.**

---

## ðŸ“ DELIVERABLE FILES

| Phase | Output |
|-------|--------|
| P1: Research | `./reports/{topic}/researchers/RESEARCH-{request}` + `./reports/{topic}/scouts/SCOUT-{request}` |
| P2: Design Spec | `./reports/{topic}/designs/DESIGN-{request}` |
| P3: Impl Spec | `./reports/{topic}/designs/DESIGN-SPEC-{request}` |
| P4: Handoff | `./reports/{topic}/reviews/REVIEW-{request}` |
| ALL Phases | `./reports/{topic}/MAILBOX-{date}.md` |

**âš ï¸ Paths = base names.** â‰¤ 150 lines â†’ `{name}.md`. > 150 lines â†’ `{name}/` folder.

---

## ðŸ”— PHASE DEPENDENCIES

| Phase | Requires | Blocking |
|-------|----------|----------|
| P1: Design Research | User request | No |
| P2: Design Spec & Wireframes | Research from P1 | **YES** |
| P3: Implementation Spec | DESIGN from P2 | **YES** |
| P4: Review & Handoff | DESIGN-SPEC from P3 | **YES** |

---

## ðŸŽ­ Phase 1: DESIGN RESEARCH â€” ðŸ”º GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `designer` | Research areas, user needs, design constraints |
| Executor | `researcher` + `scouter` | Audit existing design system, competitive analysis, UX patterns |
| Reviewer | `brainstormer` (Devil's Advocate) | Challenge user assumptions, missing personas, accessibility gaps |

**Focus**: User needs, existing design audit, competitive patterns, WCAG 2.1 AA requirements
**Deliverable**: `RESEARCH-{request}` + `SCOUT-{request}`
**Consensus**: âœ… CONSENSUS: designer âœ“ | researcher+scouter âœ“ | brainstormer âœ“

---

## ðŸŽ­ Phase 2: DESIGN SPEC & WIREFRAMES â€” ðŸ”º GOLDEN TRIANGLE (CRITICAL)

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `designer` | Component hierarchy, interaction patterns, design tokens |
| Executor | `designer` (self-implements) | Detailed design specs, layouts, component structures |
| Reviewer | `frontend-engineer` + `reviewer` | Technical feasibility, responsive, a11y, performance |

**Prerequisite**: READ RESEARCH + SCOUT files from P1

**Deliverable must include**: Visual specs (layout/typography/color/spacing), design tokens, component hierarchy with all states (default/hover/active/disabled/error/loading/empty/focused), micro-interactions, responsive breakpoints, WCAG a11y specs, feasibility notes

**Consensus**: âœ… CONSENSUS: designer âœ“ | designer(exec) âœ“ | frontend-engineer âœ“

---

## ðŸŽ­ Phase 3: IMPLEMENTATION SPEC â€” ðŸ”º GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `tech-lead` | Bridge design â†’ code, define component contracts |
| Executor | `frontend-engineer` | Write DESIGN-SPEC with component APIs, state machines |
| Reviewer | `designer` | Verify spec matches design intent, visual fidelity |

**Prerequisite**: READ `DESIGN-{request}`

**Deliverable must include**: TypeScript component interfaces, state machine definitions, design token â†’ CSS variable mapping, animation specs, ARIA implementation plan, integration points

**Consensus**: âœ… CONSENSUS: tech-lead âœ“ | frontend-engineer âœ“ | designer âœ“

---

## ðŸŽ­ Phase 4: REVIEW & HANDOFF â€” ðŸ”º GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `designer` | Final review, design system compliance |
| Executor | `docs-manager` | Write component catalog, usage guidelines, developer FAQ |
| Reviewer | `tech-lead` | Can a developer implement from this alone? Edge states covered? |

**Prerequisite**: READ `DESIGN-{request}` + `DESIGN-SPEC-{request}`

**Deliverable must include**: Component catalog entries, usage do/don't examples, design token reference, developer integration guide, edge case documentation

**Consensus**: âœ… CONSENSUS: designer âœ“ | docs-manager âœ“ | tech-lead âœ“

---

## âœ… COMPLETION TEMPLATE

```markdown
# ðŸ”º Golden Triangle Design Report: {request}

## Phase Results
| Phase | Triangle | Consensus | Rounds |
|-------|----------|-----------|--------|
| P1: Research | designer / researcher+scouter / brainstormer | âœ… | {n} |
| P2: Design Spec | designer / designer / frontend-engineer | âœ… | {n} |
| P3: Impl Spec | tech-lead / frontend-engineer / designer | âœ… | {n} |
| P4: Handoff | designer / docs-manager / tech-lead | âœ… | {n} |

## Next Actions
1. âœ… **Done** â€” Design complete (triangle-validated)
2. ðŸš€ `/cook:team {request}` â†’ Build from design specs
3. ðŸ“‹ `/plan:team {request}` â†’ Create implementation plan
```
