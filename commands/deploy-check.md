---
description: âœ… Deploy Check â€” Pre-deployment readiness verification
version: "1.0"
category: operations
execution-mode: execute
---

# /deploy:check â€” Deployment Readiness Check

> **MISSION**: Verify all deployment prerequisites are met before proceeding.

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

## ðŸŽ­ Phase 1: CODE QUALITY CHECK

| Attribute | Value |
|-----------|-------|
| **Agent** | `reviewer` |
| **Goal** | Verify code quality standards |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `reviewer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/reviewer.md`
> EMBODY [reviewer] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] No critical issues
- [ ] Standards met
- [ ] Approved for deploy

---

## ðŸŽ­ Phase 2: TEST VERIFICATION

| Attribute | Value |
|-----------|-------|
| **Agent** | `tester` |
| **Goal** | Verify all tests passing |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `tester`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/tester.md`
> EMBODY [tester] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] All tests pass
- [ ] Coverage adequate
- [ ] No flaky tests

---

## ðŸŽ­ Phase 3: SECURITY SCAN

| Attribute | Value |
|-----------|-------|
| **Agent** | `security-engineer` |
| **Goal** | Security vulnerability check |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `security-engineer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/security-engineer.md`
> EMBODY [security-engineer] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] No critical vulnerabilities
- [ ] Dependencies secure
- [ ] Secrets not exposed

---

## ðŸŽ­ Phase 4: INFRASTRUCTURE CHECK

| Attribute | Value |
|-----------|-------|
| **Agent** | `devops-engineer` |
| **Goal** | Verify infrastructure readiness |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `devops-engineer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/devops-engineer.md`
> EMBODY [devops-engineer] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Build succeeds
- [ ] Environment configured
- [ ] Rollback plan ready

---

## COMPLETION

Present readiness report with:

1. âœ… **Ready** â†’ `/deploy:preview` or `/deploy:production`
2. âŒ **Not Ready** â€” Issues to address
3. ðŸ”§ **Fix Issues** â†’ Route to appropriate fix workflow
