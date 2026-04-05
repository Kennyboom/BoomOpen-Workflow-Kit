---
description: âš¡ Quick Implementation â€” Direct coding without planning phase
version: "1.0"
category: engineering
execution-mode: execute
---

# /code:fast â€” Rapid Implementation

> **MISSION**: Implement quickly with minimal overhead for well-defined tasks.

<task>$ARGUMENTS</task>

---

## ðŸ›‘ PRE-FLIGHT (DO FIRST â€” BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.gemini/antigravity/skills/agent-assistant/rules/`):

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

## âš ï¸ CRITICAL: PHASE CONTINUITY RULES

```yaml
phase_continuity:
  rule: "If prior plan exists, MUST follow it"

  check_for_files:
    - "./reports/{topic}/plans/PLAN-{task}"

  enforcement:
    - If plan file exists â†’ READ and FOLLOW it
    - If no plan â†’ Proceed with inline approach
```

All files in `./reports/{topic}/` â†’ English only.
**âš ï¸ Paths above = base names.** Small (â‰¤ 150 lines) â†’ create as `{name}.md`. Large (> 150 lines or â‰¥ 4 sections) â†’ create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## â›” INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 â†’ then Phase 2 â†’ â€¦ in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees whatâ€™s happening (announce before doing).

---

## ðŸŽ­ Phase 1: CONTEXT SCAN

| Attribute | Value                                       |
| --------- | ------------------------------------------- |
| **Agent** | `scouter`                                   |
| **Goal**  | Find relevant code patterns and conventions |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `scouter`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/scouter.md`
> EMBODY [scouter] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Relevant files identified
- [ ] Patterns understood
- [ ] Conventions noted
- [ ] **METHODOLOGY CHECK**: Output aligns with `scouter` Thinking Protocol

---

## ðŸŽ­ Phase 2: IMPLEMENTATION

| Attribute | Value                                                      |
| --------- | ---------------------------------------------------------- |
| **Agent** | Route by domain: `frontend-engineer` \| `backend-engineer` |
| **Goal**  | Implement the feature/fix                                  |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for appropriate domain engineer. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/[domain]-engineer.md`
> EMBODY [domain-engineer] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Code implemented
- [ ] Follows existing patterns
- [ ] Compiles without errors
- [ ] **METHODOLOGY CHECK**: Output aligns with the engineer agent's Thinking Protocol

---

## ðŸŽ­ Phase 3: QUICK VALIDATION

| Attribute | Value                              |
| --------- | ---------------------------------- |
| **Agent** | `tester`                           |
| **Goal**  | Basic validation of implementation |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `tester`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/tester.md`
> EMBODY [tester] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Basic functionality verified
- [ ] No obvious errors
- [ ] Ready for review
- [ ] **METHODOLOGY CHECK**: Output aligns with `tester` Thinking Protocol

---

## ESCALATION

| Condition                       | Route To            |
| ------------------------------- | ------------------- |
| Task more complex than expected | `/code:hard`        |
| Architectural decision needed   | `/plan:hard`        |
| Security concern                | `security-engineer` |

---

## COMPLETION

Present implementation with:

1. âœ… **Done** â€” Implementation complete
2. ðŸ§ª **Test** â†’ `/test:fast`
3. ðŸ” **Review** â†’ `/review:fast`
