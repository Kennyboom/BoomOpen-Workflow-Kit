---
description: ðŸ” Review Router â€” Route to code review workflows
version: "1.0"
category: validation
execution-mode: router
---

# /review â€” Code Review Router

> **ROUTER DIRECTIVE**: Analyze review scope and route to appropriate workflow.

<scope>$ARGUMENTS</scope>

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
IF scope is small (PR, few files):
  â†’ Route to /review:fast

IF scope is large (codebase, architecture):
  â†’ Route to /review:hard

IF scope is large AND maximum quality with team collaboration needed:
  â†’ Route to /review:team

IF unsure:
  â†’ Default to /review:fast
```

---

## AVAILABLE ROUTES

| Route          | When to Use            |
| -------------- | ---------------------- |
| `/review:fast` | Quick PR/file review   |
| `/review:hard` | Deep codebase analysis |
| `/review:team` | Maximum quality with parallel agent team collaboration |

---

## PRESENT OPTIONS

```markdown
## ðŸ” Review Mode Selection

**Scope**: [parsed scope]

**Choose workflow:**

1. âš¡ **Fast** â†’ `/review:fast` â€” Quick review
2. âš¡âš¡âš¡ **Hard** â†’ `/review:hard` â€” Deep analysis
3. ðŸ‘¥ **Team** â†’ `/review:team` â€” Full team collaboration (parallel agents, maximum quality)

â³ Awaiting selection...
```
