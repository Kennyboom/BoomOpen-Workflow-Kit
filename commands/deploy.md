---
description: ðŸš€ Deploy Router â€” Route to deployment workflows
version: "1.0"
category: operations
execution-mode: router
---

# /deploy â€” Deployment Router

> **ROUTER DIRECTIVE**: Analyze deployment target and route to appropriate workflow.

<target>$ARGUMENTS</target>

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
IF target is "check" or "status":
  â†’ Route to /deploy:check

IF target is "preview" or "staging":
  â†’ Route to /deploy:preview

IF target is "production" or "prod":
  â†’ Route to /deploy:production

IF target is "rollback":
  â†’ Route to /deploy:rollback
```

---

## AVAILABLE ROUTES

| Route                | When to Use                    |
| -------------------- | ------------------------------ |
| `/deploy:check`      | Pre-deployment readiness check |
| `/deploy:preview`    | Deploy to preview/staging      |
| `/deploy:production` | Deploy to production           |
| `/deploy:rollback`   | Rollback deployment            |

---

## PRESENT OPTIONS

```markdown
## ðŸš€ Deployment Mode Selection

**Target**: [parsed target]

**Choose workflow:**

1. âœ… **Check** â†’ `/deploy:check` â€” Readiness verification
2. ðŸ” **Preview** â†’ `/deploy:preview` â€” Staging deployment
3. ðŸš€ **Production** â†’ `/deploy:production` â€” Production release
4. âª **Rollback** â†’ `/deploy:rollback` â€” Revert deployment

â³ Awaiting selection...
```
