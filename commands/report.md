---
description: ðŸ“ Report Router â€” Multi-purpose reporting (create report, update docs, or generate from template)
version: "1.0"
category: documentation
execution-mode: router
---

# /report â€” Reporting Router

> **ROUTER DIRECTIVE**: Analyze reporting needs and route to appropriate reporting workflow.
>
> **MULTI-PURPOSE**: Report supports any topic and three output modes â€” create new report, update existing files, or generate from user template/format.

<task>$ARGUMENTS</task>

---

## ðŸ›‘ PRE-FLIGHT (DO FIRST â€” BLOCKS EXECUTION)

**LOAD now** (in order; path `./rules/` or `~/.gemini/antigravity/skills/boomopen-workflow-kit/rules/`):

1. CORE.md â€” Identity, Laws, Routing
2. PHASES.md â€” Phase Execution
3. AGENTS.md â€” Tiered Execution

**â›” Do not run any workflow phase until all are loaded.** Follow **all** rules in those files. Then run this file's ROUTING LOGIC, LOAD the chosen variant workflow, and execute it.

---

## OUTPUT MODES (infer from user request)

Reporter **infers** the mode from what the user asks for â€” no fixed phrase list. Choose by **intent**:

| Mode | User intent | Reporter action |
|------|-------------|-----------------|
| **Create report** | User wants a **new** deliverable (report, summary, analysis, documentation). | Scout/synthesize â†’ write **new** file under `./reports/{topic}/` or path user specifies. |
| **Update existing** | User wants **changes reflected in existing** files (docs, README, specs, etc.). | Scout â†’ identify related files â†’ **edit** those files. Do not create a new report unless also asked. |
| **From template** | User provides a **format, template, or structure** to follow. | Use that format/structure â†’ generate file(s) matching it (e.g. after scouting source). |

**Topic-agnostic**: Subject is whatever the user asks for â€” infer from the request; not limited to status or technical only.

---

## ROUTING LOGIC

```
IF task is simple status update OR summary:
  â†’ Route to /report:fast

IF task is comprehensive analysis OR deep dive OR any non-trivial topic (infer from request):
  â†’ Route to /report:hard

IF user explicitly asks to UPDATE existing files (not create report):
  â†’ Use /report:hard or /report:team; reporter OUTPUT MODE = update existing files

IF task is complex AND maximum quality with team collaboration needed:
  â†’ Route to /report:team

IF unsure:
  â†’ Default to /report:fast (escalate if needed)
```

---

## AVAILABLE ROUTES

| Route           | When to Use                                                                 |
| --------------- | --------------------------------------------------------------------------- |
| `/report:fast`  | Quick status updates, daily summaries                                       |
| `/report:hard`  | Detailed analysis, any topic (algorithms, docs, changes), template-based  |
| `/report:team`  | Maximum quality with parallel agent team collaboration |

---

## PRESENT OPTIONS

```markdown
## ðŸ“ Reporting Mode Selection

**Task**: [parsed task]

**Choose workflow:**

1. âš¡ **Fast** â†’ `/report:fast` â€” Quick summary
2. âš¡âš¡âš¡ **Hard** â†’ `/report:hard` â€” Full analysis, any topic; create report **or** update existing files / use template
3. ðŸ‘¥ **Team** â†’ `/report:team` â€” Full team collaboration (parallel agents, maximum quality)

â³ Awaiting selection...
```
