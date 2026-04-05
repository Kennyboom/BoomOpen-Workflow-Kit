---
description: âš¡ Quick Plan â€” Fast planning without deep research
version: "1.0"
category: planning
execution-mode: execute
---

# /plan:fast â€” Quick Planning

> **MISSION**: Create quick implementation plan for clear tasks.

<task>$ARGUMENTS</task>

---

## ðŸ›‘ PRE-FLIGHT (DO FIRST â€” BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.gemini/antigravity/skills/agent-assistant/rules/`):

1. CORE.md â€” Identity, Laws, Routing
2. PHASES.md â€” Phase Execution
3. AGENTS.md â€” Tiered Execution

**â›” Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand. Fast variant uses matrix-only (no dynamic discovery for speed optimization).

---

## ðŸ”€ TIERED EXECUTION

| Tier       | When               | Action                       |
| ---------- | ------------------ | ---------------------------- |
| **TIER 1** | runSubagent EXISTS | Invoke sub-agent (MANDATORY) |
| **TIER 2** | Tool MISSING       | EMBODY agent file (FALLBACK) |

**Deliverables:** All files in `./reports/{topic}/` â†’ English only.
**âš ï¸ Paths above = base names.** Small (â‰¤ 150 lines) â†’ create as `{name}.md`. Large (> 150 lines or â‰¥ 4 sections) â†’ create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## â›” INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 â†’ then Phase 2 â†’ â€¦ in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees whatâ€™s happening (announce before doing). Format: rules/PHASES.md Â§ Phase output structure.

---

## ðŸŽ­ Phase 1: CONTEXT SCAN

| Agent | `scouter`                                              |
| ----- | ------------------------------------------------------ |
| Goal  | Quick context gathering                                |
| Exit  | Relevant patterns found, integration points identified |

---

## ðŸŽ­ Phase 2: PLAN CREATION

| Agent  | `planner`                          |
| ------ | ---------------------------------- |
| Goal   | Create focused implementation plan |
| Output | `./reports/{topic}/plans/PLAN-{task}`   |
| Exit   | Steps defined, approach clear      |

---

## ESCALATION

| If                   | Route To     |
| -------------------- | ------------ |
| Complex architecture | `/plan:hard` |
| Research needed      | `/plan:hard` |

---

## COMPLETION

Present plan with:

1. âœ… **Plan Ready** â€” `./reports/{topic}/plans/PLAN-{task}`
2. ðŸ³ **Implement** â†’ `/cook:fast`
