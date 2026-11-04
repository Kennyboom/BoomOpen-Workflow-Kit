---
description: 🔍 Review Router — Route to code review workflows
version: "5.5"
category: validation
execution-mode: router
---

# /review — Code Review Router

> **ROUTER DIRECTIVE**: Analyze review scope and route to appropriate workflow.

<scope>$ARGUMENTS</scope>

---

## ⚡ TURN-1 ZERO-TAX DISPATCH & ON-DEMAND RULES

⚡ **TURN-1 ZERO-TAX DISPATCH**: Core orchestration laws and the 5-Field Handoff Packet (`1. MISSION`, `2. SHARED_CONTRACT`, `3. OWNED_FILES`, `4. READ_ONLY_FILES`, `5. VERIFICATION`) are pre-loaded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Do **NOT** block Turn 1 reading `CORE.md`, `PHASES.md`, or `AGENTS.md` — route and launch Phase 1 sub-agents **immediately on Turn 1** via `invoke_subagent(TypeName: "self", Model: "inherit")`; load `./rules/*.md` on-demand in parallel only when needed.

---

## 🎯 INTENT DETECTION (BEFORE ROUTING — MANDATORY)

> ⛔ **ALL review workflows produce REVIEW REPORTS ONLY. NO CODE.**
>
> - ❌ NEVER write fixes or implementation code
> - ❌ NEVER auto-transition to `/fix`, `/code`, `/cook` after review
> - ✅ Output review report files and STOP. Wait for user's explicit next command.
> - ✅ Reports MUST be written in the same language the user communicates with you.

---

## ROUTING LOGIC

```
IF scope is small (PR, few files):
  → Route to /review:fast

IF scope is large (codebase, architecture):
  → Route to /review:hard

IF scope is large AND maximum quality with team collaboration needed:
  → Route to /review:team

IF unsure:
  → Default to /review:fast
```

---

## AVAILABLE ROUTES

| Route          | When to Use            |
| -------------- | ---------------------- |
| `/review:fast` | Quick PR/file review   |
| `/review:hard` | Deep codebase analysis |
| `/review:team` | Maximum quality with parallel agent team collaboration |

---

## PRESENT OPTIONS

```markdown
## 🔍 Review Mode Selection

**Scope**: [parsed scope]

**Choose workflow:**

1. ⚡ **Fast** → `/review:fast` — Quick review
2. ⚡⚡⚡ **Hard** → `/review:hard` — Deep analysis
3. 👥 **Team** → `/review:team` — Full team collaboration (parallel agents, maximum quality)

⏳ Awaiting selection...
```
