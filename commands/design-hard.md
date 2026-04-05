---
description: âš¡âš¡âš¡ Full Design â€” Complete design process with research
version: "1.0"
category: design
execution-mode: execute
---

# /design:hard â€” Full Design Process

> **MISSION**: Execute complete design process with research, exploration, and iteration.

<request>$ARGUMENTS</request>

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

## âš ï¸ CRITICAL: DELIVERABLE FILE RULES

```yaml
deliverable_files:
  researcher: "./reports/{topic}/researchers/RESEARCH-{request}"
  scouter: "./reports/{topic}/scouts/SCOUT-{request}"
  designer: "./reports/{topic}/designs/DESIGN-{request}" # MANDATORY OUTPUT

enforcement:
  - Design phase MUST create design file
  - Design file is the deliverable for implementation phases
```

All files in `./reports/{topic}/` â†’ English only.
**âš ï¸ Paths above = base names.** Small (â‰¤ 150 lines) â†’ create as `{name}.md`. Large (> 150 lines or â‰¥ 4 sections) â†’ create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## â›” INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 â†’ then Phase 2 â†’ â€¦ in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees whatâ€™s happening (announce before doing).

---

## ðŸŽ­ Phase 1: REQUIREMENTS DISCOVERY

| Attribute | Value                       |
| --------- | --------------------------- |
| **Agent** | `brainstormer`              |
| **Goal**  | Clarify design requirements |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `brainstormer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/brainstormer.md`
> EMBODY [brainstormer] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Requirements clear
- [ ] User needs identified
- [ ] Constraints documented
- [ ] **METHODOLOGY CHECK**: Output aligns with `brainstormer` Thinking Protocol (Socratic questioning, assumption surfacing)

---

## ðŸŽ­ Phase 2: RESEARCH

| Attribute | Value                           |
| --------- | ------------------------------- |
| **Agent** | `researcher`                    |
| **Goal**  | Research design patterns and UX |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `researcher`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/researcher.md`
> EMBODY [researcher] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Patterns researched
- [ ] Best practices identified
- [ ] **METHODOLOGY CHECK**: Output aligns with `researcher` Thinking Protocol (sources cited, evidence-based)

---

## ðŸŽ­ Phase 3: CODEBASE ANALYSIS

| Attribute | Value                      |
| --------- | -------------------------- |
| **Agent** | `scouter`                  |
| **Goal**  | Map existing design system |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `scouter`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/scouter.md`
> EMBODY [scouter] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Design system documented
- [ ] Component inventory
- [ ] Integration points
- [ ] **METHODOLOGY CHECK**: Output aligns with `scouter` Thinking Protocol (file locations, patterns documented)

---

## ðŸŽ­ Phase 4: DESIGN CREATION

| Attribute | Value                  |
| --------- | ---------------------- |
| **Agent** | `designer`             |
| **Goal**  | Full design with specs |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `designer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/designer.md`
> EMBODY [designer] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Design complete
- [ ] All states covered
- [ ] Accessibility verified
- [ ] Specs documented
- [ ] **METHODOLOGY CHECK**: Output aligns with `designer` Thinking Protocol (user empathy, accessibility-first, visual hierarchy)

---

---

## ðŸŽ­ Phase 5: DESIGN REVIEW

| Attribute | Value                 |
| --------- | --------------------- |
| **Agent** | `reviewer`            |
| **Goal**  | Review design quality |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `reviewer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/reviewer.md`
> EMBODY [reviewer] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Design reviewed
- [ ] Standards met
- [ ] Approved
- [ ] **METHODOLOGY CHECK**: Output aligns with `reviewer` Thinking Protocol (specific feedback, priority matrix)

---

## COMPLETION

Present design with:

1. âœ… **Done** â€” Design complete
2. ðŸ’» **Implement** â†’ `/code:hard`
3. ðŸ”„ **Iterate** â€” Further refinement
