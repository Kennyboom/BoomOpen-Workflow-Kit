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

---

## 🎯 INTENT DETECTION (BEFORE ROUTING — MANDATORY)

> ⛔ **ALL design workflows produce DESIGN DOCUMENTS ONLY. NO CODE.**
>
> - ❌ NEVER write implementation code
> - ❌ NEVER auto-transition to `/code`, `/cook`, `/fix` after designing
> - ✅ Output design documents and STOP. Wait for user's explicit next command.
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

| Route           | When to Use                                        |
| --------------- | -------------------------------------------------- |
| `/design:fast`  | Quick component design, simple UI                  |
| `/design:hard`  | Full feature design, system design                 |
| `/design:team`  | Maximum quality with parallel agent team collaboration |

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
