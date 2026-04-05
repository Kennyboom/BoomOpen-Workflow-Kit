---
description: âš¡ Quick Feature â€” Rapid feature implementation
version: "1.0"
category: engineering
execution-mode: execute
---

# /cook:fast â€” Rapid Feature Implementation

> **MISSION**: Quickly implement well-defined features with minimal ceremony.

<feature>$ARGUMENTS</feature>

---

## ðŸ›‘ PRE-FLIGHT (DO FIRST â€” BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.gemini/antigravity/skills/boomopen-workflow-kit/rules/`):

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

**âŒ Anti-Lazy**: Never use TIER 2 when TIER 1 tool available.

---

## ðŸ“ PRIOR PLAN CHECK

```
IF ./reports/{topic}/plans/PLAN-{feature} exists (.md file or folder):
  â†’ READ and FOLLOW it
ELSE:
  â†’ Create micro-plan inline
```

Any files in `./reports/{topic}/` or `./documents/` â†’ English only.
**âš ï¸ Paths above = base names.** Small (â‰¤ 150 lines) â†’ create as `{name}.md`. Large (> 150 lines or â‰¥ 4 sections) â†’ create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## â›” INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 â†’ then Phase 2 â†’ â€¦ in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees whatâ€™s happening (announce before doing).

---

## ðŸŽ­ Phase 1: CONTEXT SCAN

| Agent | `scouter`                                     |
| ----- | --------------------------------------------- |
| Goal  | Quick context gathering                       |
| Exit  | Patterns found, integration points identified |

---

## ðŸŽ­ Phase 2: MICRO-PLANNING

| Agent | `planner`                          |
| ----- | ---------------------------------- |
| Goal  | Quick implementation checklist     |
| Exit  | Steps identified, approach defined |

---

## ðŸŽ­ Phase 3: IMPLEMENTATION

| Agent        | Route by domain                                                               |
| ------------ | ----------------------------------------------------------------------------- |
| Route        | UI â†’ `frontend-engineer`, API â†’ `backend-engineer`, DB â†’ `database-architect` |
| Prerequisite | READ `./reports/{topic}/plans/PLAN-{feature}` if exists                            |
| Goal         | Implement feature                                                             |
| Exit         | Feature implemented, code compiles, basic testing done                        |

---

## ESCALATION

| Condition                  | Route To            |
| -------------------------- | ------------------- |
| More complex than expected | `/cook:hard`        |
| Design needed              | `designer`          |
| Security concern           | `security-engineer` |

---

## COMPLETION

Present feature with:

1. âœ… **Done** â€” Feature complete
2. ðŸ§ª **Test** â†’ `/test`
3. ðŸ“ **Docs** â†’ `/docs:core`
