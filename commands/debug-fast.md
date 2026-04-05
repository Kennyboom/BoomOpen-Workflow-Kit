---
description: âš¡ Quick Debug â€” Fast diagnosis for simple bugs
version: "1.0"
category: debugging
execution-mode: execute
---

# /debug:fast â€” Quick Diagnosis

> **MISSION**: Fast diagnosis for clear, reproducible issues.

<issue>$ARGUMENTS</issue>

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

| Tier | When | Action |
|------|------|--------|
| **TIER 1** | runSubagent EXISTS | Invoke sub-agent (MANDATORY) |
| **TIER 2** | Tool MISSING | EMBODY agent file (FALLBACK) |

---

## â›” INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 â†’ then Phase 2 â†’ â€¦ in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees whatâ€™s happening (announce before doing).

---

## ðŸŽ­ Phase 1: QUICK DIAGNOSIS

| Agent | `debugger` |
|-------|------------|
| Goal | Fast root cause identification |
| Exit | Root cause identified |

---

## ESCALATION

| If | Route To |
|----|----------|
| Complex/intermittent | `/debug:hard` |
| Multiple causes | `/debug:hard` |

---

## COMPLETION

Present findings with:

1. âœ… **Root Cause** â€” Identified
2. ðŸ”§ **Fix** â†’ `/fix:fast`
