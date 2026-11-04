---
description: "🔺 Team Design — Golden Triangle adversarial collaboration for maximum quality design"
version: "5.5"
category: design
execution-mode: execute
---

# /design:team — Golden Triangle Design System Development

> **MISSION**: Maximum quality UI/UX design through adversarial collaboration.
> Each phase spawns a **Golden Triangle** of 3 agents. Output is released ONLY
> upon consensus after debate.

<request>$ARGUMENTS</request>

---

## ⛔ MANDATORY REFERENCE & 2026 UI/UX SKILL BUNDLE

> **🔴 YOU MUST READ these reference files NOW. Do NOT skip.**
>
> 1. `~/.{TOOL}/skills/boomopen-workflow-kit/commands/_ref/golden-triangle-protocol.md` — Tiered Execution, Mailbox, Pre-Flight, Triangle Loop
> 2. **Core Design Skills**: `skills/design-spec/SKILL.md` and `skills/frontend-design/SKILL.md`
> 3. **2026 Craft & Accessibility Library Skills**:
>    - `skills_library/anti-ai-slop-visual-craft/SKILL.md` (Anti-Slop Aesthetic Direction & 1-Axis Border Rule)
>    - `skills_library/oklch-bento-grid-architecture/SKILL.md` (OKLCH Tokens & Responsive Bento Grids)
>    - `skills_library/motion-v12-view-transitions-css/SKILL.md` (Spring Physics & View Transitions)
>    - `skills_library/ai-native-generative-ui-ux/SKILL.md` (Streaming Skeletons, Tool Cards & Artifact Panes)
>    - `skills_library/wcag-22-accessibility-ergonomics/SKILL.md` (WCAG 2.2 AA: `Target Size >= 24x24px web / 44x44pt mobile`, `2.4.11 Focus Not Obscured`, `2.5.7 Dragging Alternatives`, `3.3.8 Accessible Auth`)
>
> **Failure to load = incorrect execution. These files contain BINDING protocols.**

---

## 📁 DELIVERABLE FILES (BRAIN ARTIFACTS FIRST ON ANTIGRAVITY 2.0)

> **Antigravity 2.0 Default**: Write transient deliverables (`BRAINSTORM`, `RESEARCH`, `SCOUT`, `DESIGN`, `PLAN`, `DEBUG`, `TEST`, `REVIEW`, `REPORT`, `MAILBOX`) to `<appDataDir>\brain\<conversation-id>\` to keep the Git tree clean. Use `./reports/{topic}/` only on non-Antigravity tools or when explicitly requested.

| Phase | Output |
|-------|--------|
| P1: Research | `<appDataDir>\\brain\\<conversation-id>\\RESEARCH-{request}.md` (or `./reports/{topic}/researchers/RESEARCH-{request}.md`) + `<appDataDir>\\brain\\<conversation-id>\\SCOUT-{request}.md` (or `./reports/{topic}/scouts/SCOUT-{request}.md`) |
| P2: Design Spec | `<appDataDir>\\brain\\<conversation-id>\\DESIGN-{request}.md` (or `./reports/{topic}/designs/DESIGN-{request}.md`) |
| P3: Impl Spec | `<appDataDir>\\brain\\<conversation-id>\\DESIGN-SPEC-{request}.md` (or `./reports/{topic}/designs/DESIGN-SPEC-{request}.md`) |
| P4: Handoff | `<appDataDir>\\brain\\<conversation-id>\\REVIEW-{request}.md` (or `./reports/{topic}/reviews/REVIEW-{request}.md`) |
| ALL Phases | `<appDataDir>\\brain\\<conversation-id>\\MAILBOX-{date}.md` (or `./reports/{topic}/MAILBOX-{date}.md`) |

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
| Tech Lead | `designer` (`design-team-techlead`) | Research areas, JTBD user needs, design constraints |
| Executor | `researcher` + `scouter` (parallel fan-out) | Audit existing design system, competitive analysis, 2026 UX patterns |
| Reviewer | `brainstormer` (Devil's Advocate) | Challenge user assumptions, missing personas, WCAG 2.2 AA accessibility gaps |

**Focus**: User needs (JTBD), existing design token audit, competitive patterns, **WCAG 2.2 AA** requirements (`2.4.11 Focus Not Obscured`, `2.5.7 Dragging Movements`, `2.5.8 Target Size >= 24x24px web / 44x44pt mobile`, `3.3.8 Accessible Auth`)
**Deliverable**: `RESEARCH-{request}.md` + `SCOUT-{request}.md`
**Consensus**: ✅ CONSENSUS: designer ✓ | researcher+scouter ✓ | brainstormer ✓

---

## 🎭 Phase 2: DESIGN SPEC & WIREFRAMES — 🔺 GOLDEN TRIANGLE (CRITICAL)

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `designer` (`design-team-techlead`) | Component hierarchy, interaction patterns, OKLCH design tokens |
| Executor | `designer` (`design-team-executor`) | Detailed design specs, Bento/Swiss layouts, 5-state component structures |
| Reviewer | `frontend-engineer` + `reviewer` (`design-team-reviewer`) | Technical feasibility, Anti-AI-Slop visual craft, responsive, WCAG 2.2 AA, performance |

**Prerequisite**: READ `RESEARCH-{request}.md` + `SCOUT-{request}.md` from P1

**Deliverable must include**: Visual specs (layout/typography/OKLCH color/spacing), W3C DTCG / Tailwind v4 `@theme inline` tokens, component hierarchy with all 5 UI states (`Idle`, `Loading`, `Empty`, `Error`, `Success`) + interactive states (`hover`, `focus-visible`, `active`, `disabled`), spring micro-interactions, responsive container queries, **WCAG 2.2 AA** specs (`>= 24x24px` web / `44x44pt` mobile targets, `scroll-padding-top/bottom` for sticky bars, single-pointer drag alternatives), feasibility notes

**Consensus**: ✅ CONSENSUS: designer ✓ | designer(exec) ✓ | frontend-engineer ✓

---

## 🎭 Phase 3: IMPLEMENTATION SPEC — 🔺 GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `tech-lead` | Bridge design → code, define component contracts |
| Executor | `frontend-engineer` | Write `DESIGN-SPEC` with TypeScript/CVA component APIs, state machines |
| Reviewer | `designer` | Verify spec matches design intent, visual fidelity, and WCAG 2.2 AA |

**Prerequisite**: READ `DESIGN-{request}.md`

**Deliverable must include**: TypeScript component interfaces (`cva` variants + Radix `asChild`), 5-state machine definitions, design token → CSS variable mapping, spring/view-transition animation specs (`prefers-reduced-motion`), ARIA + WCAG 2.2 AA implementation plan, integration points

**Consensus**: ✅ CONSENSUS: tech-lead ✓ | frontend-engineer ✓ | designer ✓

---

## 🎭 Phase 4: REVIEW & HANDOFF — 🔺 GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `designer` | Final review, design system & Anti-AI-Slop compliance |
| Executor | `docs-manager` | Write component catalog, usage guidelines, developer FAQ |
| Reviewer | `tech-lead` | Can a developer implement from this alone? All 5 states + WCAG 2.2 AA covered? |

**Prerequisite**: READ `DESIGN-{request}.md` + `DESIGN-SPEC-{request}.md`

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
