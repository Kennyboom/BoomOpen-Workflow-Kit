---
description: âš¡ Quick Answer â€” Direct response from codebase context
version: "1.0"
category: knowledge
execution-mode: execute
---

# /ask:fast â€” Quick Question Answering

> **MISSION**: Provide fast, accurate answers using codebase context and existing knowledge.

<question>$ARGUMENTS</question>

---

## ðŸ›‘ PRE-FLIGHT (DO FIRST â€” BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.gemini/antigravity/skills/boomopen-workflow-kit/rules/`):

1. CORE.md â€” Identity, Laws, Routing
2. PHASES.md â€” Phase Execution
3. AGENTS.md â€” Tiered Execution

**â›” Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand. Fast variant uses matrix-only (no dynamic discovery for speed optimization).

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

## ðŸŽ­ Phase 1: CONTEXT GATHERING

| Attribute | Value                                |
| --------- | ------------------------------------ |
| **Agent** | `scouter`                            |
| **Goal**  | Find relevant code and documentation |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `scouter`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/scouter.md`
> EMBODY [scouter] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Relevant files identified
- [ ] Context gathered
- [ ] Information sufficient (if not â†’ escalate to `/ask:hard`)

---

## ðŸŽ­ Phase 2: ANSWER FORMULATION

| Attribute | Value                            |
| --------- | -------------------------------- |
| **Agent** | `researcher`                     |
| **Goal**  | Formulate clear, accurate answer |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `researcher`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/researcher.md`
> EMBODY [researcher] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Answer formulated
- [ ] Sources cited
- [ ] Confidence level noted

---

## ESCALATION

| Condition                  | Route To     |
| -------------------------- | ------------ |
| Insufficient context       | `/ask:hard`  |
| Requires external research | `/ask:hard`  |
| Implementation needed      | `/code:fast` |

---

## COMPLETION

Present answer with:

1. âœ… **Answered** â€” Question resolved
2. ðŸ”¬ **Deep Dive** â†’ `/ask:hard` for more detail
3. ðŸ’» **Implement** â†’ Route to implementation workflow
