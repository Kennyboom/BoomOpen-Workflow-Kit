---
description: ðŸ§ª Test Router â€” Route to testing workflows
version: "1.0"
category: validation
execution-mode: router
---

# /test â€” Testing Router

> **ROUTER DIRECTIVE**: Analyze testing need and route to appropriate workflow.

<scope>$ARGUMENTS</scope>

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
IF scope is limited (unit tests, quick check):
  â†’ Route to /test:fast

IF scope is comprehensive (full suite, E2E):
  â†’ Route to /test:hard

IF scope is comprehensive AND maximum quality with team collaboration needed:
  â†’ Route to /test:team

IF unsure:
  â†’ Default to /test:fast
```

---

## AVAILABLE ROUTES

| Route          | When to Use                                        |
| -------------- | -------------------------------------------------- |
| `/test:fast`   | Quick tests, unit tests                            |
| `/test:hard`   | Full test suite, E2E                               |
| `/test:team`  | Maximum quality with parallel agent team collaboration |

---

## PRESENT OPTIONS

```markdown
## ðŸ§ª Test Mode Selection

**Scope**: [parsed scope]

**Choose workflow:**

1. âš¡ **Fast** â†’ `/test:fast` â€” Quick tests
2. âš¡âš¡âš¡ **Hard** â†’ `/test:hard` â€” Comprehensive testing
3. ðŸ‘¥ **Team** â†’ `/test:team` â€” Full team collaboration (parallel agents, maximum quality)

â³ Awaiting selection...
```
