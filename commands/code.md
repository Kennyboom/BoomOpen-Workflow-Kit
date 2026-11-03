---
description: 💻 Code Router — Route to feature and implementation workflows
version: "5.5"
category: engineering
execution-mode: router
---

# /code — Feature & Implementation Router

> **ROUTER DIRECTIVE**: Analyze task/feature complexity and route to appropriate implementation workflow.

<task_or_feature>$ARGUMENTS</task_or_feature>

---

## ⚡ TURN-1 ZERO-TAX DISPATCH & ON-DEMAND RULES

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/boomopen-workflow-kit/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution

⚡ **TURN-1 ZERO-TAX DISPATCH**: Core orchestration laws and the 5-Field Handoff Packet are pre-loaded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Route and launch Phase 1 sub-agents **immediately on Turn 1** via `invoke_subagent(TypeName: "self", Model: "inherit")`; load `rules/TEAMS.md` or `rules/PHASES.md` in parallel only when needed.

---

## ROUTING LOGIC

```
IF user references an existing plan (@plan, @PLAN-..., path to PLAN-*.md, or "according to plan" / "follow the plan"):
  → Route to /code:hard (workflow will SKIP research, scout, brainstorm and go straight to implementation)

IF task/feature is simple (clear requirements, single file):
  → Route to /code:fast

IF task/feature is complex (multi-file, new feature structure, research needed):
  → Route to /code:hard

IF task/feature is complex AND maximum quality with team collaboration needed:
  → Route to /code:team

IF unsure:
  → Default to /code:fast (escalate if needed)
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
## 💻 Feature & Implementation Mode Selection

**Request**: [parsed task/feature]

**Choose workflow:**

1. ⚡ **Fast** → `/code:fast` — Quick implementation
2. ⚡⚡⚡ **Hard** → `/code:hard` — Full feature development cycle
3. 👥 **Team** → `/code:team` — Full team collaboration (parallel agents, maximum quality)

⏳ Awaiting selection...
```
