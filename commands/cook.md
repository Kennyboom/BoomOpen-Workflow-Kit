---
description: 🍳 Cook Router — Route to feature implementation workflows
version: "5.5"
category: engineering
execution-mode: router
---

# /cook — Feature Implementation Router

> **ROUTER DIRECTIVE**: Analyze feature complexity and route to the appropriate implementation workflow.

<feature>$ARGUMENTS</feature>

---

## ⚡ TURN-1 ZERO-TAX DISPATCH & ON-DEMAND RULES

⚡ **TURN-1 ZERO-TAX DISPATCH**: Core orchestration laws and the 5-Field Handoff Packet (`1. MISSION`, `2. SHARED_CONTRACT`, `3. OWNED_FILES`, `4. READ_ONLY_FILES`, `5. VERIFICATION`) are pre-loaded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Do **NOT** block Turn 1 reading `CORE.md`, `PHASES.md`, or `AGENTS.md` — route and launch Phase 1 sub-agents **immediately on Turn 1** via `invoke_subagent(TypeName: "self", Model: "inherit")`; load `./rules/*.md` on-demand in parallel only when needed.

---

## ROUTING LOGIC

```
IF feature is simple (clear spec, low complexity):
  → Route to /cook:fast (commands/cook-fast.md)

IF feature is complex (multi-component, research needed):
  → Route to /cook:hard (commands/cook-hard.md)

IF feature is complex AND maximum quality with adversarial team collaboration needed:
  → Route to /cook:team (commands/cook-team.md)

IF unsure:
  → Default to /cook:fast (commands/cook-fast.md)
```

---

## AVAILABLE ROUTES

| Route        | Workflow File            | When to Use                                                        |
| ------------ | ------------------------ | ------------------------------------------------------------------ |
| `/cook:fast` | `commands/cook-fast.md`  | Quick features, clear specifications                               |
| `/cook:hard` | `commands/cook-hard.md`  | Complex features, full research → scout → plan → implement → test  |
| `/cook:team` | `commands/cook-team.md`  | Maximum quality with Golden Triangle adversarial team collaboration |

---

## PRESENT OPTIONS

```markdown
## 🍳 Feature Mode Selection

**Feature**: [parsed feature]

**Choose workflow:**

1. ⚡ **Fast** → `/cook:fast` — Quick implementation (`commands/cook-fast.md`)
2. ⚡⚡⚡ **Hard** → `/cook:hard` — Full feature development (`commands/cook-hard.md`)
3. 🔺 **Team** → `/cook:team` — Golden Triangle team collaboration (`commands/cook-team.md`)

⏳ Awaiting selection...
```
