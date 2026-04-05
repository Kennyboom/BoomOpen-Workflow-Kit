---
description: âš¡âš¡âš¡ Full Development Cycle â€” Plan â†’ Implement â†’ Test â†’ Review
version: "1.0"
category: engineering
execution-mode: execute
---

# /code:hard â€” Full Development Cycle

> **MISSION**: Execute complete development workflow with planning, implementation, testing, and review.

<task>$ARGUMENTS</task>

---

## ðŸ›‘ PRE-FLIGHT (DO FIRST â€” BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.gemini/antigravity/skills/boomopen-workflow-kit/rules/`):

1. CORE.md â€” Identity, Laws, Routing
2. PHASES.md â€” Phase Execution
3. AGENTS.md â€” Tiered Execution

**â›” Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand for fitness calculation and dynamic discovery (hard/team variants enable find-skills).

---

## ðŸ“Œ PLAN-ALREADY-PROVIDED: SKIP REDUNDANT PHASES

**Before starting Phase 1**, resolve whether the user is **coding from an existing plan**. If yes, **do not** run research, scout, or brainstorm.

### Detection

- User message references a plan: e.g. `@plan`, `@PLAN-...`, path like `./reports/{topic}/plans/PLAN-{name}`, or phrases like "according to plan", "follow the plan", "code from plan", "implement per plan".
- Or a plan file already exists for this task at `./reports/{topic}/plans/PLAN-{task}` (derive `{task}` from `$ARGUMENTS` or from the referenced file name).

### Resolution

1. **CHECK**: Does a valid plan file exist (user-provided path or `./reports/{topic}/plans/PLAN-{task}`)?
2. **IF YES**:
   - **SKIP** Phase 1 (Requirements/Brainstorm), Phase 2 (Scout), Phase 3 (Planning).
   - **ANNOUNCE**: "âœ… Plan provided/found â€” skipping research, scout, and planning. Proceeding to implementation."
   - **GO TO**: Verification Checkpoint (Context Optimization) â†’ then Phase 4 (Implementation) â†’ Phase 5 (Testing) â†’ Phase 6 (Review).
3. **IF NO**: Run phases in order: Phase 1 â†’ 2 â†’ 3 â†’ Checkpoint â†’ 4 â†’ 5 â†’ 6.

---

## ðŸ”€ TIERED EXECUTION PROTOCOL (MANDATORY)

> **Reference: AGENTS.md (Tiered Execution)`

```yaml
tiered_execution:
  principle: "Sub-agent FIRST (Tier 1). EMBODY ONLY on system failure (Tier 2)."

  tool_discovery: "Check runSubagent availability BEFORE first delegation"

  for_each_phase:
    TIER_1_MANDATORY: "IF tool exists â†’ MUST use SUB_AGENT_DELEGATION"
    TIER_2_FALLBACK: "ONLY on system errorâ€”NOT complexity/preference/speed"

  anti_lazy_fallback:
    - âŒ NEVER use Tier 2 when Tier 1 tool is available
    - âœ… ALWAYS attempt Tier 1 first when tool exists
    - âœ… ALWAYS log justification for Tier 2 fallback
```

---

## âš ï¸ CRITICAL: PHASE CONTINUITY RULES

```yaml
phase_continuity:
  rule: "Each phase MUST reference and follow outputs from prior phases"

  check_for_files:
    - "./reports/{topic}/brainstorms/BRAINSTORM-{task}"
    - "./reports/{topic}/scouts/SCOUT-{task}"
    - "./reports/{topic}/plans/PLAN-{task}"

  enforcement:
    - Phase 3 (Planning) MUST incorporate Scout findings
    - Phase 4 (Implementation) MUST follow the Plan file exactly
    - Phase 5 (Testing) MUST verify all plan checkpoints
    - If prior phase file missing â†’ Agent MUST create it
```

All files in `./reports/{topic}/` â†’ English only.
**âš ï¸ Paths above = base names.** Small (â‰¤ 150 lines) â†’ create as `{name}.md`. Large (> 150 lines or â‰¥ 4 sections) â†’ create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

## ðŸ”— INPUT REQUIREMENTS & VERIFICATION MATRIX

```yaml
phase_dependencies:
  phase_1_requirements:
    input_required: "User Request"
    blocking: false

  phase_2_scout:
    input_required: "User Request"
    blocking: false
    output: "./reports/{topic}/scouts/SCOUT-{task}"

  phase_3_planning:
    input_required:
      - "./reports/{topic}/scouts/SCOUT-{task}"
    blocking: true
    verification: "Plan MUST cite Scout findings"
    output: "./reports/{topic}/plans/PLAN-{task}"

  phase_4_implementation:
    input_required:
      - "./reports/{topic}/plans/PLAN-{task}" # MANDATORY
    blocking: true
    verification: "Implementation MUST follow plan step-by-step"
    deviation_protocol: "STOP â†’ Document â†’ Request Re-Planning"

  phase_5_testing:
    input_required:
      - "./reports/{topic}/plans/PLAN-{task}"
      - "Code changes from Phase 4"
    blocking: true
    verification: "Tests MUST cover all plan checkpoints"

  phase_6_review:
    input_required:
      - "./reports/{topic}/plans/PLAN-{task}"
      - "Code + Tests"
    blocking: true
    verification: "Code MUST match plan intent"
```

## ðŸ›‘ BLOCKING ENFORCEMENT

```
BEFORE entering any BLOCKING phase:
  1. CHECK: Does required input file exist?
  2. IF missing:
     a. OUTPUT: "â›” BLOCKED: Missing [{file}]"
     b. ROUTE to creating agent
     c. WAIT for creation
  3. IF exists:
     a. READ and LOCK as constraint
     b. PROCEED
```

---

## â›” INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 â†’ then Phase 2 â†’ â€¦ in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees whatâ€™s happening (announce before doing).

---

## ðŸŽ­ Phase 1: REQUIREMENTS ANALYSIS

| Attribute   | Value                             |
| ----------- | --------------------------------- |
| **Agent**   | `brainstormer`                    |
| **Goal**    | Clarify requirements if ambiguous |
| **Trigger** | If requirements unclear           |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `brainstormer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/brainstormer.md`
> EMBODY [brainstormer] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Requirements clear
- [ ] Scope defined
- [ ] Acceptance criteria established
- [ ] **METHODOLOGY CHECK**: Output aligns with `brainstormer` Thinking Protocol (Socratic questioning, assumption surfacing)

---

## ðŸŽ­ Phase 2: CODEBASE ANALYSIS

| Attribute | Value                         |
| --------- | ----------------------------- |
| **Agent** | `scouter`                     |
| **Goal**  | Full codebase context mapping |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `scouter`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/scouter.md`
> EMBODY [scouter] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Architecture understood
- [ ] Patterns documented
- [ ] Integration points identified
- [ ] **METHODOLOGY CHECK**: Output aligns with `scouter` Thinking Protocol (file locations, patterns as constraints)

---

## ðŸŽ­ Phase 3: IMPLEMENTATION PLANNING

| Attribute | Value                      |
| --------- | -------------------------- |
| **Agent** | `planner`                  |
| **Goal**  | Create implementation plan |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `planner`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/planner.md`
> EMBODY [planner] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Plan created
- [ ] Steps defined
- [ ] Risks identified
- [ ] **METHODOLOGY CHECK**: Output aligns with `planner` Thinking Protocol (constraint consumption, complexity scoring)

---

---

## ðŸŽ­ Phase 4: IMPLEMENTATION

| Attribute | Value                               |
| --------- | ----------------------------------- |
| **Agent** | `tech-lead` â†’ routes to specialists |
| **Goal**  | Execute plan with specialist agents |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `tech-lead`. Context: ISOLATED.
> Tech-lead will spawn specialist subagents as needed.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/tech-lead.md`
> EMBODY [tech-lead] â€” Requires logged system error justification.
> Then recursively EMBODY specialists as needed.

### ðŸ”— INPUT REQUIREMENTS (BLOCKING)

```yaml
required_inputs:
  mandatory:
    - file: "./reports/{topic}/plans/PLAN-{task}"
      action: "READ first, FOLLOW exactly"
      if_missing: "STOP â†’ Route to planner"
```

### âš¡ STRICT ADHERENCE DIRECTIVE

```
1. READ plan completely BEFORE any implementation
2. FOR EACH plan step:
   a. Implement EXACTLY as specified
   b. Mark complete: `- [ ]` â†’ `- [x]`
3. IF deviation needed:
   a. STOP
   b. REQUEST Re-Planning
   c. DO NOT proceed with own interpretation
```

**Exit Criteria:**

- [ ] All plan steps executed
- [ ] Code complete
- [ ] Documentation updated
- [ ] **Each plan step has corresponding implementation**
- [ ] **No unauthorized deviations**
- [ ] **METHODOLOGY CHECK**: Output aligns with `tech-lead` Thinking Protocol (proper delegation, drift detection)

---

## ðŸŽ­ Phase 5: TESTING

| Attribute | Value                 |
| --------- | --------------------- |
| **Agent** | `tester`              |
| **Goal**  | Comprehensive testing |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `tester`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/tester.md`
> EMBODY [tester] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Tests written
- [ ] All tests pass
- [ ] Coverage adequate
- [ ] **METHODOLOGY CHECK**: Output aligns with `tester` Thinking Protocol (test pyramid, determinism verification)

---

## ðŸŽ­ Phase 6: REVIEW

| Attribute | Value               |
| --------- | ------------------- |
| **Agent** | `reviewer`          |
| **Goal**  | Code quality review |

### âš¡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `reviewer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/reviewer.md`
> EMBODY [reviewer] â€” Requires logged system error justification.

**Exit Criteria:**

- [ ] Code reviewed
- [ ] Standards met
- [ ] No blocking issues
- [ ] **METHODOLOGY CHECK**: Output aligns with `reviewer` Thinking Protocol (plan compliance check, priority matrix)

---

## COMPLETION

Present implementation report with:

1. âœ… **Done** â€” Feature complete
2. ðŸš€ **Deploy** â†’ `/deploy:preview`
3. ðŸ“ **Docs** â†’ `/docs:core`
