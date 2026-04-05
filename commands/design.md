---
description: ðŸŽ¨ Design Router â€” Route to design workflows
version: "1.0"
category: design
execution-mode: router
---

# /design â€” Design Router

> **ROUTER DIRECTIVE**: Analyze design need and route to appropriate workflow.

<request>$ARGUMENTS</request>

---

## ðŸ›‘ PRE-FLIGHT (DO FIRST â€” BLOCKS EXECUTION)

**LOAD now** (in order; path `./rules/` or `~/.gemini/antigravity/skills/boomopen-workflow-kit/rules/`):

1. CORE.md â€” Identity, Laws, Routing
2. PHASES.md â€” Phase Execution
3. AGENTS.md â€” Tiered Execution

**â›” Do not run any workflow phase until all are loaded.** Follow **all** rules in those files. Then run this file's ROUTING LOGIC, LOAD the chosen variant workflow, and execute it.

---

## ROUTING LOGIC

```
IF design is simple (component, quick mockup):
  â†’ Route to /design:fast

IF design is complex (full feature, system):
  â†’ Route to /design:hard

IF design is complex AND maximum quality with team collaboration needed:
  â†’ Route to /design:team

IF unsure:
  â†’ Default to /design:fast
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
## ðŸŽ¨ Design Mode Selection

**Request**: [parsed request]

**Choose workflow:**

1. âš¡ **Fast** â†’ `/design:fast` â€” Quick design
2. âš¡âš¡âš¡ **Hard** â†’ `/design:hard` â€” Full design process
3. ðŸ‘¥ **Team** â†’ `/design:team` â€” Full team collaboration (parallel agents, maximum quality)

â³ Awaiting selection...
```
