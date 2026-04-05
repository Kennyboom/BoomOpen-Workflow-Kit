---
description: âš¡ Quick Fix â€” Rapid issue resolution
version: "1.0"
category: debugging
execution-mode: execute
---

# /fix:fast â€” Rapid Issue Fix

> **MISSION**: Quickly diagnose and fix simple issues with minimal overhead.

<issue>$ARGUMENTS</issue>

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

## âš ï¸ ESCALATION

| If | Route To |
|----|----------|
| Complex issue | `/fix:hard` |
| Research needed | `/fix:hard` |

---

## â›” INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 â†’ then Phase 2 â†’ â€¦ in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees whatâ€™s happening (announce before doing).

---

## ðŸŽ­ Phase 1: DIAGNOSIS

| Agent | `debugger` |
|-------|------------|
| Goal | Identify root cause |
| Exit | Root cause identified, complexity assessed |

---

## ðŸŽ­ Phase 2: FIX IMPLEMENTATION

| Agent | Route by domain |
|-------|-----------------|
| Route | UI â†’ `frontend-engineer`, API â†’ `backend-engineer` |
| Goal | Implement fix |
| Exit | Fix implemented, minimal changes, code compiles |

---

## ðŸŽ­ Phase 3: VALIDATION

| Agent | `tester` |
|-------|----------|
| Goal | Verify fix |
| Exit | Issue resolved, no regression |

---

## COMPLETION

Present fix with:

1. âœ… **Fixed** â€” Issue resolved
2. ðŸ§ª **Test more** â†’ `/test`
