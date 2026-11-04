---
description: 🔧 Fix Router — Route to issue resolution workflows
version: "5.5"
category: debugging
execution-mode: router
---

# /fix — Issue Resolution Router

> **ROUTER DIRECTIVE**: Analyze issue complexity and route to appropriate fix workflow.

<issue>$ARGUMENTS</issue>

---

## ⚡ TURN-1 ZERO-TAX DISPATCH & ON-DEMAND RULES

⚡ **TURN-1 ZERO-TAX DISPATCH**: Core orchestration laws and the 5-Field Handoff Packet (`1. MISSION`, `2. SHARED_CONTRACT`, `3. OWNED_FILES`, `4. READ_ONLY_FILES`, `5. VERIFICATION`) are pre-loaded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Do **NOT** block Turn 1 reading `CORE.md`, `PHASES.md`, or `AGENTS.md` — route and launch Phase 1 sub-agents **immediately on Turn 1** via `invoke_subagent(TypeName: "self", Model: "inherit")`; load `./rules/*.md` on-demand in parallel only when needed.

---

## ROUTING LOGIC

```
IF issue is simple (clear cause, quick fix):
  → Route to /fix:fast

IF issue is complex (research needed, multi-file):
  → Route to /fix:hard

IF issue is complex AND maximum quality with team collaboration needed:
  → Route to /fix:team

IF unsure:
  → Default to /fix:fast (escalate if needed)
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
## 🔧 Fix Mode Selection

**Issue**: [parsed issue]

**Choose workflow:**

1. ⚡ **Fast** → `/fix:fast` — Quick fix
2. ⚡⚡⚡ **Hard** → `/fix:hard` — Full resolution
3. 👥 **Team** → `/fix:team` — Full team collaboration (parallel agents, maximum quality)

⏳ Awaiting selection...
```
