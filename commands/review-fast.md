---
description: âš¡ Quick Review â€” Fast PR/file review
version: "1.0"
category: validation
execution-mode: execute
---

# /review:fast â€” Quick Code Review

> **MISSION**: Fast review for PRs or specific files.

<scope>$ARGUMENTS</scope>

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

## ðŸŽ­ Phase 1: CODE REVIEW

| Agent | `reviewer` |
|-------|------------|
| Goal | Review code quality |
| Exit | Issues documented, recommendations provided |

---

## ESCALATION

| If | Route To |
|----|----------|
| Architecture concerns | `/review:hard` |
| Security concerns | `security-engineer` |

---

## COMPLETION

Present review with:

1. âœ… **Approved** â€” Code ready
2. ðŸ”§ **Fix needed** â†’ `/fix:fast`
