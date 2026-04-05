---
description: âª Deploy Rollback â€” Revert to previous deployment
version: "1.0"
category: operations
execution-mode: execute
---

# /deploy:rollback â€” Deployment Rollback

> **MISSION**: Safely rollback to previous stable deployment.

---

## ðŸ›‘ PRE-FLIGHT (DO FIRST â€” BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.gemini/antigravity/skills/agent-assistant/rules/`):
1. CORE.md â€” Identity, Laws, Routing  
2. PHASES.md â€” Phase Execution  
3. AGENTS.md â€” Tiered Execution  

**â›” Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

---

## ðŸ”€ TIERED EXECUTION PROTOCOL (MANDATORY)

> **Reference: AGENTS.md (Tiered Execution)`

```yaml
tiered_execution:
  principle: "Sub-agent FIRST (Tier 1). EMBODY ONLY on system failure (Tier 2)."
  for_each_phase:
    TIER_1_MANDATORY: "IF tool exists â†’ MUST use SUB_AGENT_DELEGATION"
    TIER_2_FALLBACK: "ONLY on system errorâ€”NOT complexity/preference/speed"
  anti_lazy_fallback:
    - âŒ NEVER use Tier 2 when Tier 1 tool is available
    - âœ… ALWAYS attempt Tier 1 first when tool exists
```

---

## â›” INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 â†’ then Phase 2 â†’ â€¦ in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees whatâ€™s happening (announce before doing).

---

## ðŸŽ­ Phase 1: ASSESS SITUATION

| Attribute | Value |
|-----------|-------|
| **Agent** | `devops-engineer` |
| **Goal** | Identify rollback target |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `devops-engineer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/devops-engineer.md`
> EMBODY [devops-engineer] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Current state documented
- [ ] Rollback target identified
- [ ] Impact assessed

---

## ðŸŽ­ Phase 2: EXECUTE ROLLBACK

| Attribute | Value |
|-----------|-------|
| **Agent** | `devops-engineer` |
| **Goal** | Execute rollback procedure |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `devops-engineer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/devops-engineer.md`
> EMBODY [devops-engineer] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Rollback complete
- [ ] Previous version deployed

---

## ðŸŽ­ Phase 3: VERIFICATION

| Attribute | Value |
|-----------|-------|
| **Agent** | `devops-engineer` |
| **Goal** | Verify rollback success |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `devops-engineer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/devops-engineer.md`
> EMBODY [devops-engineer] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Health checks pass
- [ ] Previous functionality restored
- [ ] Issue resolved

---

## ðŸŽ­ Phase 4: ROOT CAUSE ANALYSIS

| Attribute | Value |
|-----------|-------|
| **Agent** | `debugger` |
| **Goal** | Document what went wrong |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `debugger`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/debugger.md`
> EMBODY [debugger] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Failure documented
- [ ] Root cause identified
- [ ] Prevention plan noted

---

## COMPLETION

Present rollback result with:

1. âœ… **Rolled Back** â€” System stable
2. ðŸ› **Debug** â†’ `/debug:hard` for root cause
3. ðŸ“ **Document** â€” Post-mortem documentation
