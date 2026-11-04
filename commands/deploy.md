---
description: 🚀 Deploy Router — Route to deployment workflows
version: "5.5"
category: operations
execution-mode: router
---

# /deploy — Deployment Router

> **ROUTER DIRECTIVE**: Analyze deployment target and route to appropriate workflow.

<target>$ARGUMENTS</target>

---

## ⚡ TURN-1 ZERO-TAX DISPATCH & ON-DEMAND RULES

⚡ **TURN-1 ZERO-TAX DISPATCH**: Core orchestration laws and the 5-Field Handoff Packet (`1. MISSION`, `2. SHARED_CONTRACT`, `3. OWNED_FILES`, `4. READ_ONLY_FILES`, `5. VERIFICATION`) are pre-loaded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Do **NOT** block Turn 1 reading `CORE.md`, `PHASES.md`, or `AGENTS.md` — route and launch Phase 1 sub-agents **immediately on Turn 1** via `invoke_subagent(TypeName: "self", Model: "inherit")`; load `./rules/*.md` on-demand in parallel only when needed.

---

## ROUTING LOGIC

```
IF target is "check" or "status":
  → Route to /deploy:check

IF target is "preview" or "staging":
  → Route to /deploy:preview

IF target is "production" or "prod":
  → Route to /deploy:production

IF target is "rollback":
  → Route to /deploy:rollback
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
## 🚀 Deployment Mode Selection

**Target**: [parsed target]

**Choose workflow:**

1. ✅ **Check** → `/deploy:check` — Readiness verification
2. 🔍 **Preview** → `/deploy:preview` — Staging deployment
3. 🚀 **Production** → `/deploy:production` — Production release
4. ⏪ **Rollback** → `/deploy:rollback` — Revert deployment

⏳ Awaiting selection...
```
