---
description: âš¡âš¡âš¡ Full Fix â€” Complete issue resolution with research
version: "1.0"
category: debugging
execution-mode: execute
---

# /fix:hard â€” Complete Issue Resolution

> **MISSION**: Full resolution workflow with research, planning, and validation.

<issue>$ARGUMENTS</issue>

---

## ðŸ›‘ PRE-FLIGHT (DO FIRST â€” BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.gemini/antigravity/skills/agent-assistant/rules/`):
1. CORE.md â€” Identity, Laws, Routing  
2. PHASES.md â€” Phase Execution  
3. AGENTS.md â€” Tiered Execution  

**â›” Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand for fitness calculation and dynamic discovery (hard/team variants enable find-skills).

---

## ðŸ”€ TIERED EXECUTION

| Tier | When | Action |
|------|------|--------|
| **TIER 1** | runSubagent EXISTS | Invoke sub-agent (MANDATORY) |
| **TIER 2** | Tool MISSING | EMBODY agent file (FALLBACK) |

**âŒ Anti-Lazy**: Never use TIER 2 when TIER 1 tool available.

---

## ðŸ“ DELIVERABLE FILES

| Agent | Output |
|-------|--------|
| debugger | `./reports/{topic}/debugs/DEBUG-{issue}` |
| researcher | `./reports/{topic}/researchers/RESEARCH-{issue}` |

All files in `./reports/{topic}/` â†’ English only.
**âš ï¸ Paths above = base names.** Small (â‰¤ 150 lines) â†’ create as `{name}.md`. Large (> 150 lines or â‰¥ 4 sections) â†’ create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## â›” INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 â†’ then Phase 2 â†’ â€¦ in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees whatâ€™s happening (announce before doing). Format: rules/PHASES.md Â§ Phase output structure.

---

## ðŸŽ­ Phase 1: DEEP ANALYSIS

| Agent | `debugger` |
|-------|------------|
| Goal | Full root cause analysis |
| Exit | Root cause identified, impact assessed, failure chain documented |

---

## ðŸŽ­ Phase 2: RESEARCH

| Agent | `researcher` |
|-------|--------------|
| Goal | Research solution patterns |
| Exit | Solutions researched, best approach identified |

---

## ðŸŽ­ Phase 3: FIX PLANNING

| Agent | `planner` |
|-------|-----------|
| Goal | Create fix strategy with rollback |
| Exit | Plan created, rollback included |

---

---

## ðŸŽ­ Phase 4: IMPLEMENTATION

| Agent | `tech-lead` â†’ specialists |
|-------|---------------------------|
| Goal | Execute fix plan |
| Exit | Fix implemented, changes documented |

---

## ðŸŽ­ Phase 5: VALIDATION

| Agent | `tester` |
|-------|----------|
| Goal | Comprehensive validation |
| Exit | Issue resolved, tests pass, no regression |

---

## ðŸŽ­ Phase 5.5: ROLLBACK VERIFICATION (IF CRITICAL)

| Agent | `devops-engineer` |
|-------|-------------------|
| Trigger | Fix affects production or is critical |
| Goal | Verify rollback plan |
| Exit | Rollback documented, tested, recovery time estimated |

---

## COMPLETION

Present fix report with:

1. âœ… **Fixed** â€” Issue resolved
2. ðŸ§ª **Test** â†’ `/test`
3. ðŸ“ **Docs** â†’ `/docs:core`
