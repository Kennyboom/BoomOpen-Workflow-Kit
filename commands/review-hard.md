---
description: âš¡âš¡âš¡ Full Review â€” Deep code analysis with architecture review
version: "1.0"
category: validation
execution-mode: execute
---

# /review:hard â€” Deep Code Review

> **MISSION**: Comprehensive code and architecture review.

<scope>$ARGUMENTS</scope>

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

---

## ðŸ“ PLAN COMPLIANCE CHECK

```
IF ./reports/{topic}/plans/PLAN-{scope} exists (.md file or folder):
  - Verify code implements plan specification
  - Check for unauthorized deviations
  - Ensure all phases reflected in code
```

---

## â›” INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 â†’ then Phase 2 â†’ â€¦ in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees whatâ€™s happening (announce before doing).

---

## ðŸŽ­ Phase 1: ARCHITECTURE REVIEW

| Agent | `tech-lead` |
|-------|-------------|
| Goal | Review architecture decisions |
| Exit | Architecture assessed, patterns validated |

---

## ðŸŽ­ Phase 2: CODE REVIEW

| Agent | `reviewer` |
|-------|------------|
| Prerequisite | READ PLAN file if exists |
| Goal | Deep code analysis |
| Exit | Code quality assessed, issues documented |

---

## ðŸŽ­ Phase 3: SECURITY REVIEW

| Agent | `security-engineer` |
|-------|----------------------|
| Goal | Security assessment |
| Exit | Security reviewed, vulnerabilities documented |

---

## ðŸŽ­ Phase 4: PERFORMANCE REVIEW

| Agent | `performance-engineer` |
|-------|------------------------|
| Goal | Performance assessment |
| Exit | Performance issues identified |

---

## COMPLETION

Present review with:

1. âœ… **Approved** â€” Code ready
2. ðŸ”§ **Fix** â†’ `/fix`
3. ðŸ§ª **Test** â†’ `/test`
