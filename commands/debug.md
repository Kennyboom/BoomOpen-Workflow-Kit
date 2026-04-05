---
description: ðŸ› Debug Router â€” Route to debugging workflows
version: "1.0"
category: debugging
execution-mode: router
---

# /debug â€” Debug Router

> **ROUTER DIRECTIVE**: Analyze issue complexity and route to appropriate debugging workflow.

<issue>$ARGUMENTS</issue>

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
IF issue is simple (clear error, reproducible):
  â†’ Route to /debug:fast

IF issue is complex (intermittent, unclear cause):
  â†’ Route to /debug:hard

IF issue is complex AND maximum quality with team collaboration needed:
  â†’ Route to /debug:team

IF unsure:
  â†’ Default to /debug:fast (escalate if needed)
```

---

## AVAILABLE ROUTES

| Route           | When to Use                                          |
| --------------- | ---------------------------------------------------- |
| `/debug:fast`   | Quick diagnosis for simple bugs                      |
| `/debug:hard`   | Deep investigation for complex issues                |
| `/debug:team`  | Maximum quality with parallel agent team collaboration |

---

## PRESENT OPTIONS

```markdown
## ðŸ› Debug Mode Selection

**Issue**: [parsed issue]

**Choose workflow:**

1. âš¡ **Fast** â†’ `/debug:fast` â€” Quick diagnosis
2. âš¡âš¡âš¡ **Hard** â†’ `/debug:hard` â€” Deep investigation
3. ðŸ‘¥ **Team** â†’ `/debug:team` â€” Full team collaboration (parallel agents, maximum quality)

â³ Awaiting selection...
```
