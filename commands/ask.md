---
description: ❓ Ask Router — Route questions to appropriate answer workflow
version: "5.5"
category: knowledge
execution-mode: router
---

# /ask — Question Answering Router

> **ROUTER DIRECTIVE**: Analyze question complexity and route to appropriate workflow.

<question>$ARGUMENTS</question>

---

## ⚡ TURN-1 ZERO-TAX DISPATCH & ON-DEMAND RULES

⚡ **TURN-1 ZERO-TAX DISPATCH**: Core orchestration laws and the 5-Field Handoff Packet (`1. MISSION`, `2. SHARED_CONTRACT`, `3. OWNED_FILES`, `4. READ_ONLY_FILES`, `5. VERIFICATION`) are pre-loaded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Do **NOT** block Turn 1 reading `CORE.md`, `PHASES.md`, or `AGENTS.md` — route and launch Phase 1 sub-agents **immediately on Turn 1** via `invoke_subagent(TypeName: "self", Model: "inherit")`; load `./rules/*.md` on-demand in parallel only when needed.

---

## ROUTING LOGIC

```
IF question is factual (single answer, codebase lookup):
  → Route to /ask:fast

IF question requires research (multiple sources, analysis):
  → Route to /ask:hard

IF unsure:
  → Default to /ask:fast (escalate if insufficient)
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
## ❓ Question Mode Selection

**Question**: [parsed question]

**Choose workflow:**

1. ⚡ **Fast** → `/ask:fast` — Quick answer
2. ⚡⚡⚡ **Hard** → `/ask:hard` — Research-backed answer

⏳ Awaiting selection...
```
