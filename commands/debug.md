---
description: 🐛 Debug Router — Route to debugging workflows
version: "5.5"
category: debugging
execution-mode: router
---

# /debug — Debug Router

> **ROUTER DIRECTIVE**: Analyze issue complexity and route to appropriate debugging workflow.

<issue>$ARGUMENTS</issue>

---

## ⚡ TURN-1 ZERO-TAX DISPATCH & ON-DEMAND RULES

⚡ **TURN-1 ZERO-TAX DISPATCH**: Core orchestration laws and the 5-Field Handoff Packet (`1. MISSION`, `2. SHARED_CONTRACT`, `3. OWNED_FILES`, `4. READ_ONLY_FILES`, `5. VERIFICATION`) are pre-loaded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Do **NOT** block Turn 1 reading `CORE.md`, `PHASES.md`, or `AGENTS.md` — route and launch Phase 1 sub-agents **immediately on Turn 1** via `invoke_subagent(TypeName: "self", Model: "inherit")`; load `./rules/*.md` on-demand in parallel only when needed.

---

## ROUTING LOGIC

```
IF issue is simple (clear error, reproducible):
  → Route to /debug:fast

IF issue is complex (intermittent, unclear cause):
  → Route to /debug:hard

IF issue is complex AND maximum quality with team collaboration needed:
  → Route to /debug:team

IF unsure:
  → Default to /debug:fast (escalate if needed)
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
## 🐛 Debug Mode Selection

**Issue**: [parsed issue]

**Choose workflow:**

1. ⚡ **Fast** → `/debug:fast` — Quick diagnosis
2. ⚡⚡⚡ **Hard** → `/debug:hard` — Deep investigation
3. 👥 **Team** → `/debug:team` — Full team collaboration (parallel agents, maximum quality)

⏳ Awaiting selection...
```
