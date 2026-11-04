---
description: 🎨 Design Router — Route to design workflows
version: "5.5"
category: design
execution-mode: router
---

# /design — Design Router

> **ROUTER DIRECTIVE**: Analyze design need and route to appropriate workflow.

<request>$ARGUMENTS</request>

---

## ⚡ TURN-1 ZERO-TAX DISPATCH & ON-DEMAND RULES

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/boomopen-workflow-kit/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution

⚡ **TURN-1 ZERO-TAX DISPATCH**: Core orchestration laws and the 5-Field Handoff Packet are pre-loaded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Route and launch Phase 1 sub-agents **immediately on Turn 1** via `invoke_subagent(TypeName: "self", Model: "inherit")`; load `rules/TEAMS.md` or `rules/PHASES.md` in parallel only when needed.

### 🎨 Mandatory 2026 UI/UX Skill Bundle & WCAG 2.2 AA Baseline

Every delegated design agent (`designer`, `frontend-engineer`, `reviewer`, `design-team`) **MUST** load and enforce:
- **Core Design Skills**: `skills/design-spec/SKILL.md` and `skills/frontend-design/SKILL.md`
- **2026 Visual Craft & Token Architecture**: `skills_library/anti-ai-slop-visual-craft/SKILL.md`, `skills_library/oklch-bento-grid-architecture/SKILL.md`, `skills_library/motion-v12-view-transitions-css/SKILL.md`, `skills_library/ai-native-generative-ui-ux/SKILL.md`
- **WCAG 2.2 AA Ergonomics (`skills_library/wcag-22-accessibility-ergonomics/SKILL.md`)**:
  - `SC 2.5.8 Target Size (Minimum)`: `>= 24x24px` on desktop/web (`>= 44x44pt` on mobile/touch)
  - `SC 2.4.11 Focus Not Obscured`: Sticky headers/footers MUST declare `scroll-padding-top` / `scroll-padding-bottom`
  - `SC 2.5.7 Dragging Movements`: Single-pointer click/keyboard alternatives for all drag/slider UI

---

## 🎯 INTENT DETECTION (BEFORE ROUTING — MANDATORY)

> ⛔ **ALL design workflows produce DESIGN DOCUMENTS ONLY. NO CODE.**
>
> - ❌ NEVER write implementation code
> - ❌ NEVER auto-transition to `/code`, `/cook`, `/fix` after designing
> - ✅ Output design documents to `<appDataDir>\brain\<conversation-id>\DESIGN-{request}.md` and STOP. Wait for user's explicit next command.
> - ✅ Design files MUST be written in the same language the user communicates with you.

---

## ROUTING LOGIC

```
IF design is simple (component, quick mockup):
  → Route to /design:fast

IF design is complex (full feature, system):
  → Route to /design:hard

IF design is complex AND maximum quality with team collaboration needed:
  → Route to /design:team

IF unsure:
  → Default to /design:fast
```

---

## AVAILABLE ROUTES

| Route           | When to Use                                             |
| --------------- | ------------------------------------------------------- |
| `/design:fast`  | Quick component design, simple UI                       |
| `/design:hard`  | Full feature design, system design (parallel discovery) |
| `/design:team`  | Maximum quality with Golden Triangle adversarial review |

---

## PRESENT OPTIONS

```markdown
## 🎨 Design Mode Selection

**Request**: [parsed request]

**Choose workflow:**

1. ⚡ **Fast** → `/design:fast` — Quick design
2. ⚡⚡⚡ **Hard** → `/design:hard` — Full design process
3. 👥 **Team** → `/design:team` — Full team collaboration (parallel agents, maximum quality)

⏳ Awaiting selection...
```
