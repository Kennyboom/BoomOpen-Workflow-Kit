---
description: 🧪 Test Router — Route to testing workflows
version: "5.5"
category: validation
execution-mode: router
---

# /test — Testing Router

> **ROUTER DIRECTIVE**: Analyze testing need and route to appropriate workflow.

<scope>$ARGUMENTS</scope>

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
IF scope is limited (unit tests, quick check):
  → Route to /test:fast

IF scope is comprehensive (full suite, E2E):
  → Route to /test:hard

IF scope is comprehensive AND maximum quality with team collaboration needed:
  → Route to /test:team

IF unsure:
  → Default to /test:fast
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
## 🧪 Test Mode Selection

**Scope**: [parsed scope]

**Choose workflow:**

1. ⚡ **Fast** → `/test:fast` — Quick tests
2. ⚡⚡⚡ **Hard** → `/test:hard` — Comprehensive testing
3. 👥 **Team** → `/test:team` — Full team collaboration (parallel agents, maximum quality)

⏳ Awaiting selection...
```
