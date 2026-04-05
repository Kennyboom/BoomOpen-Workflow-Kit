---
description: ðŸ” Deploy Preview â€” Staging/Preview deployment
version: "1.0"
category: operations
execution-mode: execute
---

# /deploy:preview â€” Preview Deployment

> **MISSION**: Deploy to preview/staging environment for validation.

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

## ðŸŽ­ Phase 1: READINESS CHECK

| Attribute | Value |
|-----------|-------|
| **Agent** | `devops-engineer` |
| **Goal** | Quick deployment readiness |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `devops-engineer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/devops-engineer.md`
> EMBODY [devops-engineer] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Build passes
- [ ] Tests pass
- [ ] No blockers

---

## ðŸŽ­ Phase 2: DEPLOY

| Attribute | Value |
|-----------|-------|
| **Agent** | `devops-engineer` |
| **Goal** | Deploy to preview environment |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `devops-engineer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/devops-engineer.md`
> EMBODY [devops-engineer] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Deployment successful
- [ ] Environment accessible

---

## ðŸŽ­ Phase 3: VERIFICATION

| Attribute | Value |
|-----------|-------|
| **Agent** | `devops-engineer` |
| **Goal** | Verify deployment health |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `devops-engineer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/devops-engineer.md`
> EMBODY [devops-engineer] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Health checks pass
- [ ] Core functionality verified
- [ ] Preview URL accessible

---

## COMPLETION

Present deployment result with:

1. âœ… **Success** â€” Preview ready for testing
2. ðŸš€ **Promote** â†’ `/deploy:production`
3. âª **Rollback** â†’ `/deploy:rollback`
