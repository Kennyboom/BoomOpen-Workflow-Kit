---
description: âš¡âš¡âš¡ Research Answer â€” External research with comprehensive analysis
version: "1.0"
category: knowledge
execution-mode: execute
---

# /ask:hard â€” Research-Backed Answering

> **MISSION**: Provide comprehensive, research-backed answers through multi-source analysis.

<question>$ARGUMENTS</question>

---

## ðŸ›‘ PRE-FLIGHT (DO FIRST â€” BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.gemini/antigravity/skills/agent-assistant/rules/`):

1. CORE.md â€” Identity, Laws, Routing
2. PHASES.md â€” Phase Execution
3. AGENTS.md â€” Tiered Execution

**â›” Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand for fitness calculation and dynamic discovery (hard/team variants enable find-skills).

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

## ðŸŽ­ Phase 1: QUESTION ANALYSIS

| Attribute | Value                                       |
| --------- | ------------------------------------------- |
| **Agent** | `brainstormer`                              |
| **Goal**  | Decompose question into research components |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `brainstormer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/brainstormer.md`
> EMBODY [brainstormer] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Question scope defined
- [ ] Research areas identified
- [ ] Success criteria established

---

## ðŸŽ­ Phase 2: CODEBASE ANALYSIS

| Attribute | Value                         |
| --------- | ----------------------------- |
| **Agent** | `scouter`                     |
| **Goal**  | Map relevant codebase context |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `scouter`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/scouter.md`
> EMBODY [scouter] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Relevant code found
- [ ] Patterns documented
- [ ] Internal context complete

---

## ðŸŽ­ Phase 3: EXTERNAL RESEARCH

| Attribute | Value                                        |
| --------- | -------------------------------------------- |
| **Agent** | `researcher`                                 |
| **Goal**  | Research external sources and best practices |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `researcher`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/researcher.md`
> EMBODY [researcher] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] External sources consulted
- [ ] Best practices identified
- [ ] Sources documented

---

## ðŸŽ­ Phase 4: SYNTHESIS

| Attribute | Value                           |
| --------- | ------------------------------- |
| **Agent** | `researcher`                    |
| **Goal**  | Synthesize comprehensive answer |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `researcher`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/researcher.md`
> EMBODY [researcher] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] All sources synthesized
- [ ] Answer comprehensive
- [ ] Actionable recommendations included

---

## COMPLETION

Present research report with:

1. âœ… **Answered** â€” Question resolved
2. ðŸ“‹ **Plan** â†’ `/plan:hard` if implementation needed
3. ðŸ’» **Implement** â†’ `/code:hard` for complex implementation
