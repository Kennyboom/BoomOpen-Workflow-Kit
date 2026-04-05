---
description: âš¡ Quick Ideation â€” Rapid idea generation
version: "1.0"
category: planning
execution-mode: execute
---

# /brainstorm:fast â€” Rapid Ideation

> **MISSION**: Generate ideas quickly through focused exploration without external research.

<topic>$ARGUMENTS</topic>

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

## âš ï¸ CRITICAL: DELIVERABLE FILE RULES

```yaml
deliverable_files:
  brainstormer: "./reports/{topic}/brainstorms/BRAINSTORM-{topic}" # MANDATORY for substantial synthesis

enforcement:
  - Clarification questions â†’ Chat OK
  - Idea synthesis/analysis â†’ MUST create file
```

All files in `./reports/{topic}/` â†’ English only.
**âš ï¸ Paths above = base names.** Small (â‰¤ 150 lines) â†’ create as `{name}.md`. Large (> 150 lines or â‰¥ 4 sections) â†’ create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## â›” INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 â†’ then Phase 2 â†’ â€¦ in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees whatâ€™s happening (announce before doing).

---

## ðŸŽ­ Phase 1: TOPIC CLARIFICATION

| Attribute | Value                                |
| --------- | ------------------------------------ |
| **Agent** | `brainstormer`                       |
| **Goal**  | Clarify requirements and constraints |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `brainstormer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/brainstormer.md`
> EMBODY [brainstormer] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Topic understood
- [ ] Constraints identified
- [ ] Success criteria defined
- [ ] **METHODOLOGY CHECK**: Output aligns with `brainstormer` Thinking Protocol

---

## ðŸŽ­ Phase 2: IDEA GENERATION

| Attribute | Value                  |
| --------- | ---------------------- |
| **Agent** | `brainstormer`         |
| **Goal**  | Generate diverse ideas |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `brainstormer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/brainstormer.md`
> EMBODY [brainstormer] â€” Requires logged system error justification.

**MANDATORY**: CREATE `./reports/{topic}/brainstorms/BRAINSTORM-{topic}` for synthesis

**Exit Criteria:**

- [ ] Brainstorm file created at `./reports/{topic}/brainstorms/BRAINSTORM-{topic}`
- [ ] Multiple ideas generated
- [ ] Ideas categorized
- [ ] Trade-offs noted
- [ ] **METHODOLOGY CHECK**: Output aligns with `brainstormer` Thinking Protocol

---

## ðŸŽ­ Phase 3: CODEBASE CONTEXT (CONDITIONAL)

| Attribute   | Value                                |
| ----------- | ------------------------------------ |
| **Agent**   | `scouter`                            |
| **Goal**    | Find relevant existing patterns      |
| **Trigger** | If ideas relate to existing codebase |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `scouter`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/scouter.md`
> EMBODY [scouter] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Existing patterns found
- [ ] Integration points identified
- [ ] **METHODOLOGY CHECK**: Output aligns with `scouter` Thinking Protocol

---

## ESCALATION

| Condition          | Route To           |
| ------------------ | ------------------ |
| Research needed    | `/brainstorm:hard` |
| Ready to plan      | `/plan:fast`       |
| Ready to implement | `/code:fast`       |

---

## COMPLETION

Present ideas with:

1. âœ… **Ideas Ready** â€” Select preferred approach
2. ðŸ”¬ **Research** â†’ `/brainstorm:hard` for deeper analysis
3. ðŸ“‹ **Plan** â†’ `/plan:fast` to formalize
