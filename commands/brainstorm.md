---
description: 💡 Brainstorm Router — Route to ideation & deep research workflows
version: "5.5"
category: planning
execution-mode: router
---

# /brainstorm — Ideation & Deep Research Router

> **ROUTER DIRECTIVE**: Analyze ideation/research need and route to the appropriate brainstorming workflow.

<topic>$ARGUMENTS</topic>

---

## ⚡ TURN-1 ZERO-TAX DISPATCH & ON-DEMAND RULES

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/boomopen-workflow-kit/rules/`):
1. `CORE.md` — Identity, Laws, Routing
2. `PHASES.md` — Phase Execution & DAG Parallel Fan-Out
3. `AGENTS.md` — Tiered Execution & Antigravity Web-Search Subagent Rule

⚡ **TURN-1 ZERO-TAX DISPATCH**: Core orchestration laws and the 5-Field Handoff Packet are pre-loaded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Route and launch Phase 1 sub-agents **immediately on Turn 1** via `invoke_subagent(TypeName: "self", Model: "inherit")`; load `rules/TEAMS.md` or `rules/PHASES.md` in parallel only when needed.

---

## 🎯 INTENT DETECTION (BEFORE ROUTING — MANDATORY)

> ⛔ **ALL brainstorm workflows produce REPORTS/BLUEPRINTS ONLY. NO APPLICATION CODE.**
>
> If the user's request contains ANY of these keywords, the workflow is RESEARCH/IDEATION-ONLY:
> - "nghiên cứu", "phân tích", "kiểm tra", "đánh giá", "khám phá ý tưởng", "đề xuất ý tưởng", "đề xuất thêm", "audit", "review"
> - "research", "analyze", "study", "investigate", "explore", "deep dive", "brainstorm"
>
> ❌ NEVER auto-transition to `/code`, `/cook`, `/fix` after completing brainstorm.
> ✅ Output deliverable files (`RESEARCH-{topic}.md`, `SCOUT-{topic}.md`, `BRAINSTORM-{topic}.md`) and STOP. Wait for user's explicit next command.

---

## ROUTING LOGIC

```
IF topic is a product/game/system idea, competitor/market analysis, or deep research request ("nghiên cứu", "phân tích", "khám phá ý tưởng", "đề xuất ý tưởng", "đề xuất thêm", "research", "deep dive", "brainstorm"):
  → Check active `workflows.naturalLanguageResearchTrigger` setting (default: `auto_team`):
    - IF `auto_team` (DEFAULT): Route IMMEDIATELY to `/brainstorm:team` (`commands/brainstorm-team.md` — Golden Triangle 3-Agent Adversarial Collaboration)
    - IF `auto_hard`: Route to `/brainstorm:hard` (`commands/brainstorm-hard.md` — 5-Lens Research + Deep Blueprint)
    - IF `ask_first`: Ask user to choose between `/brainstorm:team`, `/brainstorm:hard`, or `/brainstorm:fast`

IF user explicitly specifies `/brainstorm:hard`:
  → Route to `/brainstorm:hard` (`commands/brainstorm-hard.md`)

IF topic is a quick, narrow single-feature question (or `/brainstorm:fast`):
  → Route to `/brainstorm:fast` (`commands/brainstorm-fast.md`)

IF unsure:
  → Default to `/brainstorm:team` (`commands/brainstorm-team.md`) when `naturalLanguageResearchTrigger = auto_team` (or `/brainstorm:hard` when `auto_hard`)
```

---

## AVAILABLE ROUTES

| Route              | When to Use                                                                 |
| ------------------ | --------------------------------------------------------------------------- |
| `/brainstorm:fast` | Quick single-feature ideation                                               |
| `/brainstorm:hard` | 5-Lens Deep Research + Product Blueprint (`naturalLanguageResearchTrigger = auto_hard`) |
| `/brainstorm:team` | **Default (`auto_team`)**: Golden Triangle 3-Agent Adversarial Research & Ideation |
