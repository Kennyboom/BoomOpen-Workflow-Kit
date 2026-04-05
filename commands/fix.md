---
description: ðŸ”§ Fix Router â€” Route to issue resolution workflows
version: "1.0"
category: debugging
execution-mode: router
---

# /fix â€” Issue Resolution Router

> **ROUTER DIRECTIVE**: Analyze issue complexity and route to appropriate fix workflow.

<issue>$ARGUMENTS</issue>

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
IF issue is simple (clear cause, quick fix):
  â†’ Route to /fix:fast

IF issue is complex (research needed, multi-file):
  â†’ Route to /fix:hard

IF issue is complex AND maximum quality with team collaboration needed:
  â†’ Route to /fix:team

IF unsure:
  â†’ Default to /fix:fast (escalate if needed)
```

---

## AVAILABLE ROUTES

| Route        | When to Use                                           |
| ------------ | ----------------------------------------------------- |
| `/fix:fast`  | Quick fixes, clear issues                             |
| `/fix:hard`  | Complex issues, research needed                       |
| `/fix:team`  | Maximum quality with parallel agent team collaboration |

---

## PRESENT OPTIONS

```markdown
## ðŸ”§ Fix Mode Selection

**Issue**: [parsed issue]

**Choose workflow:**

1. âš¡ **Fast** â†’ `/fix:fast` â€” Quick fix
2. âš¡âš¡âš¡ **Hard** â†’ `/fix:hard` â€” Full resolution
3. ðŸ‘¥ **Team** â†’ `/fix:team` â€” Full team collaboration (parallel agents, maximum quality)

â³ Awaiting selection...
```
