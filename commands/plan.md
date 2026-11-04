---
description: 📋 Plan Router — Route to planning workflows
version: "5.5"
category: planning
execution-mode: router
---

# /plan — Planning Router

> **ROUTER DIRECTIVE**: Analyze planning need and route to appropriate workflow.

<task>$ARGUMENTS</task>

---

## ⚡ TURN-1 ZERO-TAX DISPATCH & ON-DEMAND RULES

⚡ **TURN-1 ZERO-TAX DISPATCH**: Core orchestration laws and the 5-Field Handoff Packet (`1. MISSION`, `2. SHARED_CONTRACT`, `3. OWNED_FILES`, `4. READ_ONLY_FILES`, `5. VERIFICATION`) are pre-loaded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Do **NOT** block Turn 1 reading `CORE.md`, `PHASES.md`, or `AGENTS.md` — route and launch Phase 1 sub-agents **immediately on Turn 1** via `invoke_subagent(TypeName: "self", Model: "inherit")`; load `./rules/*.md` on-demand in parallel only when needed.

---

## 🎯 INTENT DETECTION (BEFORE ROUTING — MANDATORY)

> ⛔ **ALL plan workflows produce PLAN FILES ONLY. NO CODE.**
>
> - ❌ NEVER write implementation code
> - ❌ NEVER auto-transition to `/code`, `/cook`, `/fix` after planning
> - ✅ Output plan files and STOP. Wait for user's explicit next command.
> - ✅ Plan files MUST be written in the same language the user communicates with you.

---

## ROUTING LOGIC

```
IF task is clear (known approach, codebase-only):
  → Route to /plan:fast

IF task is complex (research needed, architectural):
  → Route to /plan:hard

IF task is complex AND maximum quality with team collaboration needed:
  → Route to /plan:team

IF unsure:
  → Default to /plan:fast
```

---

## AVAILABLE ROUTES

| Route         | When to Use                                          |
| ------------- | ---------------------------------------------------- |
| `/plan:fast`  | Quick planning without research                      |
| `/plan:hard`  | Full planning with research                          |
| `/plan:team`  | Maximum quality with parallel agent team collaboration |

---

## PRESENT OPTIONS

```markdown
## 📋 Planning Mode Selection

**Task**: [parsed task]

**Choose workflow:**

1. ⚡ **Fast** → `/plan:fast` — Quick plan
2. ⚡⚡⚡ **Hard** → `/plan:hard` — Full research-backed plan
3. 👥 **Team** → `/plan:team` — Full team collaboration (parallel agents, maximum quality)

⏳ Awaiting selection...
```
