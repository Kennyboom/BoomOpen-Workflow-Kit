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

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS EXECUTION)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/boomopen-workflow-kit/rules/`):
1. `CORE.md` — Identity, Laws, Routing
2. `PHASES.md` — Phase Execution & DAG Parallel Fan-Out
3. `AGENTS.md` — Tiered Execution & Antigravity Web-Search Subagent Rule

**⛔ Do not run any workflow phase until all are loaded.** Follow **all** rules in those files. Then run this file's ROUTING LOGIC, LOAD the chosen variant workflow, and execute it.

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
IF topic is a product/game/system idea, competitor/market analysis, or deep research request ("nghiên cứu", "phân tích", "đề xuất ý tưởng", "đề xuất thêm", "research", "deep dive"):
  → Route IMMEDIATELY to /brainstorm:hard (load commands/brainstorm-hard.md and execute Phase 1A + Phase 1B in parallel)

IF topic is complex AND maximum adversarial quality with Golden Triangle team collaboration is explicitly requested:
  → Route to /brainstorm:team

IF topic is a quick, narrow single-feature question:
  → Route to /brainstorm:fast

IF unsure:
  → Default to /brainstorm:hard for thorough research-backed ideation
```

---

## AVAILABLE ROUTES

| Route              | When to Use                                                                 |
| ------------------ | --------------------------------------------------------------------------- |
| `/brainstorm:fast` | Quick single-feature ideation                                               |
| `/brainstorm:hard` | **Default for product/idea/market research**: 5-Lens Research + Deep Blueprint |
| `/brainstorm:team` | Maximum quality with Golden Triangle adversarial agent team collaboration   |
