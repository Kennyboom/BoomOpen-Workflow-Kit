---
description: âš¡ Quick Design â€” Rapid component/UI design
version: "1.0"
category: design
execution-mode: execute
---

# /design:fast â€” Rapid Design

> **MISSION**: Quickly create design for simple components or UI elements.

<request>$ARGUMENTS</request>

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

## âš ï¸ CRITICAL: DELIVERABLE FILE RULES

```yaml
deliverable_files:
  designer: "./reports/{topic}/designs/DESIGN-{request}" # For substantial designs

enforcement:
  - Simple component â†’ Chat output OK
  - Page/feature design â†’ MUST create design file
```

All files in `./reports/{topic}/` â†’ English only.
**âš ï¸ Paths above = base names.** Small (â‰¤ 150 lines) â†’ create as `{name}.md`. Large (> 150 lines or â‰¥ 4 sections) â†’ create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## â›” INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 â†’ then Phase 2 â†’ â€¦ in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees whatâ€™s happening (announce before doing).

---

## ðŸŽ­ Phase 1: CONTEXT ANALYSIS

| Attribute | Value                         |
| --------- | ----------------------------- |
| **Agent** | `scouter`                     |
| **Goal**  | Find existing design patterns |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `scouter`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/scouter.md`
> EMBODY [scouter] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Existing patterns found
- [ ] Design system understood
- [ ] **METHODOLOGY CHECK**: Output aligns with `scouter` Thinking Protocol

---

## ðŸŽ­ Phase 2: DESIGN CREATION

| Attribute | Value                  |
| --------- | ---------------------- |
| **Agent** | `designer`             |
| **Goal**  | Create design solution |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `designer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/designer.md`
> EMBODY [designer] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Design created
- [ ] Accessibility considered
- [ ] Specs provided
- [ ] **METHODOLOGY CHECK**: Output aligns with `designer` Thinking Protocol

---

## ESCALATION

| Condition                  | Route To       |
| -------------------------- | -------------- |
| More complex than expected | `/design:hard` |
| Implementation needed      | `/code:fast`   |

---

## COMPLETION

Present design with:

1. âœ… **Done** â€” Design complete
2. ðŸ’» **Implement** â†’ `/code:fast`
3. ðŸ”„ **Iterate** â€” Refine design
