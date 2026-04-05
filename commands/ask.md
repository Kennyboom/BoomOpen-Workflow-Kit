---
description: â“ Ask Router â€” Route questions to appropriate answer workflow
version: "1.0"
category: knowledge
execution-mode: router
---

# /ask â€” Question Answering Router

> **ROUTER DIRECTIVE**: Analyze question complexity and route to appropriate workflow.

<question>$ARGUMENTS</question>

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
IF question is factual (single answer, codebase lookup):
  â†’ Route to /ask:fast

IF question requires research (multiple sources, analysis):
  â†’ Route to /ask:hard

IF unsure:
  â†’ Default to /ask:fast (escalate if insufficient)
```

---

## AVAILABLE ROUTES

| Route       | When to Use                                 |
| ----------- | ------------------------------------------- |
| `/ask:fast` | Quick factual answers, codebase lookups     |
| `/ask:hard` | Research-backed analysis, complex questions |

---

## PRESENT OPTIONS

```markdown
## â“ Question Mode Selection

**Question**: [parsed question]

**Choose workflow:**

1. âš¡ **Fast** â†’ `/ask:fast` â€” Quick answer
2. âš¡âš¡âš¡ **Hard** â†’ `/ask:hard` â€” Research-backed answer

â³ Awaiting selection...
```
