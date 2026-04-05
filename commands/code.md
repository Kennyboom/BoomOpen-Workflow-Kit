---
description: ðŸ’» Code Router â€” Route to feature and implementation workflows
version: "1.0"
category: engineering
execution-mode: router
---

# /code â€” Feature & Implementation Router

> **ROUTER DIRECTIVE**: Analyze task/feature complexity and route to appropriate implementation workflow.

<task_or_feature>$ARGUMENTS</task_or_feature>

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
IF user references an existing plan (@plan, @PLAN-..., path to PLAN-*.md, or "according to plan" / "follow the plan"):
  â†’ Route to /code:hard (workflow will SKIP research, scout, brainstorm and go straight to implementation)

IF task/feature is simple (clear requirements, single file):
  â†’ Route to /code:fast

IF task/feature is complex (multi-file, new feature structure, research needed):
  â†’ Route to /code:hard

IF task/feature is complex AND maximum quality with team collaboration needed:
  â†’ Route to /code:team

IF unsure:
  â†’ Default to /code:fast (escalate if needed)
```

---

## AVAILABLE ROUTES

| Route         | When to Use                                             |
| ------------- | ------------------------------------------------------- |
| `/code:fast`  | Quick implementation, clear requirements                |
| `/code:hard`  | Complex features, multi-file changes                    |
| `/code:team`  | Maximum quality with parallel agent team collaboration |

---

## PRESENT OPTIONS

```markdown
## ðŸ’» Feature & Implementation Mode Selection

**Request**: [parsed task/feature]

**Choose workflow:**

1. âš¡ **Fast** â†’ `/code:fast` â€” Quick implementation
2. âš¡âš¡âš¡ **Hard** â†’ `/code:hard` â€” Full feature development cycle
3. ðŸ‘¥ **Team** â†’ `/code:team` â€” Full team collaboration (parallel agents, maximum quality)

â³ Awaiting selection...
```
