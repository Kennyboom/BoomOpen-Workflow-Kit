---
description: ðŸ“‹ Plan Router â€” Route to planning workflows
version: "1.0"
category: planning
execution-mode: router
---

# /plan â€” Planning Router

> **ROUTER DIRECTIVE**: Analyze planning need and route to appropriate workflow.

<task>$ARGUMENTS</task>

---

## ðŸ›‘ PRE-FLIGHT (DO FIRST â€” BLOCKS EXECUTION)

**LOAD now** (in order; path `./rules/` or `~/.gemini/antigravity/skills/boomopen-workflow-kit/rules/`):

1. CORE.md â€” Identity, Laws, Routing
2. PHASES.md â€” Phase Execution
3. AGENTS.md â€” Tiered Execution

**â›” Do not run any workflow phase until all are loaded.** Follow **all** rules in those files. Then run this file's ROUTING LOGIC, LOAD the chosen variant (e.g. plan-hard.md), and execute it.

---

## ROUTING LOGIC

```
IF task is clear (known approach, codebase-only):
  â†’ Route to /plan:fast

IF task is complex (research needed, architectural):
  â†’ Route to /plan:hard

IF task is complex AND maximum quality with team collaboration needed:
  â†’ Route to /plan:team

IF unsure:
  â†’ Default to /plan:fast
```

---

## AVAILABLE ROUTES

| Route         | When to Use                                          |
| ------------- | ---------------------------------------------------- |
| `/plan:fast`  | Quick planning without research                      |
| `/plan:hard`  | Full planning with research                          |
| `/plan:team`  | Maximum quality with parallel agent team collaboration |

---

## PRESENT OPTIONS

```markdown
## ðŸ“‹ Planning Mode Selection

**Task**: [parsed task]

**Choose workflow:**

1. âš¡ **Fast** â†’ `/plan:fast` â€” Quick plan
2. âš¡âš¡âš¡ **Hard** â†’ `/plan:hard` â€” Full research-backed plan
3. ðŸ‘¥ **Team** â†’ `/plan:team` â€” Full team collaboration (parallel agents, maximum quality)

â³ Awaiting selection...
```
