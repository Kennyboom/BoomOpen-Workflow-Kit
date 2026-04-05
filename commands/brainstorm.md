---
description: ðŸ’¡ Brainstorm Router â€” Route to ideation workflows
version: "1.0"
category: planning
execution-mode: router
---

# /brainstorm â€” Ideation Router

> **ROUTER DIRECTIVE**: Analyze ideation need and route to appropriate brainstorming workflow.

<topic>$ARGUMENTS</topic>

---

## ðŸ›‘ PRE-FLIGHT (DO FIRST â€” BLOCKS EXECUTION)

**LOAD now** (in order; path `./rules/` or `~/.gemini/antigravity/skills/agent-assistant/rules/`):
1. CORE.md â€” Identity, Laws, Routing  
2. PHASES.md â€” Phase Execution  
3. AGENTS.md â€” Tiered Execution  

**â›” Do not run any workflow phase until all are loaded.** Follow **all** rules in those files. Then run this file's ROUTING LOGIC, LOAD the chosen variant workflow, and execute it.

---

## ROUTING LOGIC

```
IF topic is clear (quick ideas, simple exploration):
  â†’ Route to /brainstorm:fast

IF topic is complex (research needed, deep analysis):
  â†’ Route to /brainstorm:hard

IF topic is complex AND maximum quality with team collaboration needed:
  â†’ Route to /brainstorm:team

IF unsure:
  â†’ Default to /brainstorm:fast
```

---

## AVAILABLE ROUTES

| Route              | When to Use                            |
| ------------------ | -------------------------------------- |
| `/brainstorm:fast` | Quick ideation, simple exploration     |
| `/brainstorm:hard` | Research-backed ideation with analysis |
| `/brainstorm:team` | Maximum quality with parallel agent team collaboration |

---

## PRESENT OPTIONS

```markdown
## ðŸ’¡ Brainstorm Mode Selection

**Topic**: [parsed topic]

**Choose workflow:**

1. âš¡ **Fast** â†’ `/brainstorm:fast` â€” Quick ideation
2. âš¡âš¡âš¡ **Hard** â†’ `/brainstorm:hard` â€” Deep exploration
3. ðŸ‘¥ **Team** â†’ `/brainstorm:team` â€” Full team collaboration (parallel agents, maximum quality)

â³ Awaiting selection...
```
