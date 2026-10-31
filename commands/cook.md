---
description: 🍳 Cook Router — Route to feature implementation workflows
version: "5.4"
category: engineering
execution-mode: router
---

# /cook — Feature Implementation Router

> **ROUTER DIRECTIVE**: Analyze feature complexity and route to the appropriate implementation workflow.

<feature>$ARGUMENTS</feature>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS EXECUTION)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/boomopen-workflow-kit/rules/`):

1. `CORE.md` — Identity, Laws, Routing
2. `PHASES.md` — Phase Execution
3. `AGENTS.md` — Tiered Execution

**⛔ Do not run any workflow phase until all are loaded.** Follow **all** rules in those files. Then run this file's ROUTING LOGIC, LOAD the chosen variant workflow, and execute it.

---

## ROUTING LOGIC

```
IF feature is simple (clear spec, low complexity):
  → Route to /cook:fast (commands/cook-fast.md)

IF feature is complex (multi-component, research needed):
  → Route to /cook:hard (commands/cook-hard.md)

IF feature is complex AND maximum quality with adversarial team collaboration needed:
  → Route to /cook:team (commands/cook-team.md)

IF unsure:
  → Default to /cook:fast (commands/cook-fast.md)
```

---

## AVAILABLE ROUTES

| Route        | Workflow File            | When to Use                                                        |
| ------------ | ------------------------ | ------------------------------------------------------------------ |
| `/cook:fast` | `commands/cook-fast.md`  | Quick features, clear specifications                               |
| `/cook:hard` | `commands/cook-hard.md`  | Complex features, full research → scout → plan → implement → test  |
| `/cook:team` | `commands/cook-team.md`  | Maximum quality with Golden Triangle adversarial team collaboration |

---

## PRESENT OPTIONS

```markdown
## 🍳 Feature Mode Selection

**Feature**: [parsed feature]

**Choose workflow:**

1. ⚡ **Fast** → `/cook:fast` — Quick implementation (`commands/cook-fast.md`)
2. ⚡⚡⚡ **Hard** → `/cook:hard` — Full feature development (`commands/cook-hard.md`)
3. 🔺 **Team** → `/cook:team` — Golden Triangle team collaboration (`commands/cook-team.md`)

⏳ Awaiting selection...
```
