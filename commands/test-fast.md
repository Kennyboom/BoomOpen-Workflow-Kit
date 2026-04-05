---
description: âš¡ Quick Test â€” Fast testing for specific scope
version: "1.0"
category: validation
execution-mode: execute
---

# /test:fast â€” Quick Testing

> **MISSION**: Run targeted tests for specific scope.

<scope>$ARGUMENTS</scope>

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

| Tier | When | Action |
|------|------|--------|
| **TIER 1** | runSubagent EXISTS | Invoke sub-agent (MANDATORY) |
| **TIER 2** | Tool MISSING | EMBODY agent file (FALLBACK) |

---

## â›” INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 â†’ then Phase 2 â†’ â€¦ in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees whatâ€™s happening (announce before doing).

---

## ðŸŽ­ Phase 1: TEST EXECUTION

| Agent | `tester` |
|-------|----------|
| Goal | Run focused tests |
| Exit | Tests run, results recorded |

---

## ðŸŽ­ Phase 2: QUICK ANALYSIS (IF FAILURES)

| Agent | `debugger` |
|-------|------------|
| Trigger | If failures exist |
| Goal | Quick failure analysis |
| Exit | Root causes identified |

---

## ESCALATION

| If | Route To |
|----|----------|
| More coverage needed | `/test:hard` |
| Complex failures | `/debug:hard` |

---

## COMPLETION

Present results with:

1. âœ… **Pass** â€” Tests green
2. ðŸ”§ **Fix** â†’ `/fix:fast`
