---
description: "ðŸ”º Team Debug â€” Golden Triangle adversarial collaboration for maximum quality investigation"
version: "2.0"
category: debugging
execution-mode: execute
---

# /debug:team â€” Golden Triangle Bug Investigation

> **MISSION**: Maximum quality debugging through adversarial collaboration.
> Each phase spawns a **Golden Triangle** of 3 agents: Tech Lead (coordinator),
> Executor (investigator), Reviewer (devil's advocate). Findings are released ONLY
> upon consensus after debate. Investigation only â€” no fixing.

<issue>$ARGUMENTS</issue>

---


---

## â›” MANDATORY REFERENCE â€” READ BEFORE PROCEEDING

> **ðŸ”´ YOU MUST READ these reference files NOW. Do NOT skip.**
>
> 1. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/golden-triangle-protocol.md` â€” Tiered Execution, Mailbox, Pre-Flight, Triangle Loop
> 2. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/convergent-analysis-loop.md` â€” Convergent Analysis detailed protocol
> 3. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/implementation-loop.md` â€” Implementation step-by-step (for coding phases)
>
> **Failure to read = incorrect execution. These files contain BINDING protocols.**

---

## ðŸ“ DELIVERABLE FILES

| Phase | Output |
|-------|--------|
| P1: Symptom Collection | `./reports/{topic}/debugs/SYMPTOMS-{issue}` |
| P2: Hypothesis Generation | `./reports/{topic}/debugs/HYPOTHESES-{issue}` |
| P3: Hypothesis Testing | `./reports/{topic}/debugs/EVIDENCE-{issue}` |
| P4: Root Cause Report | `./reports/{topic}/debugs/DEBUG-REPORT-{issue}` |
| ALL Phases | `./reports/{topic}/MAILBOX-{date}.md` |

**âš ï¸ Paths = base names.** â‰¤ 150 lines â†’ `{name}.md`. > 150 lines â†’ `{name}/` folder.

---

## ðŸ”— PHASE DEPENDENCIES

| Phase                          | Requires                          | Blocking    |
| ------------------------------ | --------------------------------- | ----------- |
| P1: Symptom Collection         | User issue description            | No          |
| P2: Hypothesis Generation      | Symptoms from P1                  | **YES**     |
| P3: Hypothesis Testing         | Hypotheses from P2                | **YES**     |
| P4: Root Cause Report          | Evidence from P3                  | **YES**     |

**â›” Blocking**: If input missing â†’ STOP â†’ Create it first â†’ Resume

---

## ðŸŽ­ Phase 1: SYMPTOM COLLECTION â€” ðŸ”º GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                           |
| --------- | ------------------------------------ | ----------------------------------------------------------------- |
| Tech Lead | `debugger`                           | Decompose: categorize symptoms, define investigation areas        |
| Executor  | `scouter`                            | Execute: collect error logs, stack traces, reproduction steps, environment data |
| Reviewer  | `researcher` (Devil's Advocate)      | Challenge: are symptoms complete? Are we looking at the right system? Missing data? |

**Triangle Loop**:
1. `debugger` decomposes into areas: error logs, stack traces, reproduction steps, environment data, user-reported behavior, recent changes
2. `debugger` posts TASK_ASSIGNMENT â†’ dispatches to `scouter`
3. `scouter` collects evidence â†’ posts SUBMISSION per area:
   - Exact error messages and stack traces
   - Steps to reproduce (confirmed or attempted)
   - Environment details (OS, runtime versions, config)
   - Recent code changes in affected area (git log)
   - Related log entries and monitoring data
4. `researcher` reviews each SUBMISSION â†’ posts REVIEW:
   - Are we looking at the right system/component?
   - Are symptoms complete or are we missing data sources?
   - Could these symptoms indicate a different system entirely?
   - Are reproduction steps reliable and deterministic?
5. If FAIL â†’ `scouter` collects additional data or defends â†’ RESUBMISSION/DEFENSE â†’ max 3 rounds
6. `debugger` synthesizes approved symptom data into unified symptom catalog

**Deliverable**: `./reports/{topic}/debugs/SYMPTOMS-{issue}`
**Exit Criteria**: All symptoms documented, reproduction confirmed, environment captured, data sources exhausted
**Consensus**: âœ… CONSENSUS: debugger âœ“ | scouter âœ“ | researcher âœ“

---

## ðŸŽ­ Phase 2: HYPOTHESIS GENERATION â€” ðŸ”º GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                           |
| --------- | ------------------------------------ | ----------------------------------------------------------------- |
| Tech Lead | `debugger`                           | Coordinate: generate hypothesis tree, prioritize investigation paths |
| Executor  | `researcher`                         | Execute: research similar issues, known bugs, pattern matching    |
| Reviewer  | `brainstormer` (Devil's Advocate)    | Challenge: are hypotheses sufficient? What if root cause is elsewhere? Propose alternatives |

**Prerequisite**: **READ** `./reports/{topic}/debugs/SYMPTOMS-{issue}`

**Triangle Loop**:
1. `debugger` reads symptoms â†’ decomposes into areas: primary suspects, secondary suspects, environmental causes, interaction effects, known bug patterns
2. `debugger` posts TASK_ASSIGNMENT â†’ dispatches to `researcher`
3. `researcher` researches each area â†’ posts SUBMISSION:
   - Similar issues in issue trackers, forums, CVE databases
   - Known bugs in dependencies matching symptom pattern
   - Historical incidents with similar symptoms in this codebase
   - Ranked hypothesis list with confidence levels and reasoning
4. `brainstormer` reviews each SUBMISSION â†’ posts REVIEW:
   - Are we anchored on the obvious? What if root cause is completely elsewhere?
   - Are there hypotheses that explain ALL symptoms, not just some?
   - What about timing-related causes (race conditions, timeouts)?
   - Could this be a combination of multiple smaller issues?
   - Are confidence levels justified or wishful thinking?
   - **MUST propose at least 2 alternative hypotheses not yet considered**
5. If FAIL â†’ `researcher` expands research or defends â†’ RESUBMISSION/DEFENSE â†’ max 3 rounds
6. `debugger` synthesizes approved hypotheses into prioritized hypothesis tree

**Deliverable**: `./reports/{topic}/debugs/HYPOTHESES-{issue}`
**Exit Criteria**: Hypothesis tree complete, alternatives explored, priorities assigned, investigation paths defined
**Consensus**: âœ… CONSENSUS: debugger âœ“ | researcher âœ“ | brainstormer âœ“

---

## ðŸŽ­ Phase 3: HYPOTHESIS TESTING â€” ðŸ”º GOLDEN TRIANGLE (CRITICAL)

> **THIS IS THE MOST CRITICAL PHASE.** Every piece of evidence is debated. No conclusions without proof.

| Role      | Agent                                           | Mission                                                      |
| --------- | ----------------------------------------------- | ------------------------------------------------------------ |
| Tech Lead | `debugger`                                      | Decompose: assign hypothesis validation tasks, track progress|
| Executor  | `scouter` + `backend-engineer`                  | Execute: trace code paths, add logging, test hypotheses with evidence |
| Reviewer  | `reviewer`                                      | Challenge: is evidence conclusive? Correlation vs causation? Solving the right problem? |

**Prerequisite**: **READ** `./reports/{topic}/debugs/HYPOTHESES-{issue}`

### GOLDEN TRIANGLE EVIDENCE LOOP (CRITICAL â€” Step by Step)


> **â›” See `_ref/convergent-analysis-loop.md` or `_ref/implementation-loop.md` for detailed step-by-step protocol.**


### STRICT EVIDENCE STANDARDS (ENFORCED BY REVIEWER)

```
1. NO CONCLUSIONS WITHOUT EVIDENCE â€” every verdict MUST cite specific evidence
2. CORRELATION â‰  CAUSATION â€” Reviewer explicitly challenges:
   "Does this evidence PROVE causation or just show correlation?"
3. REPRODUCTION REQUIRED â€” CONFIRMED hypotheses must be reproducible
4. ALTERNATIVE EXPLANATIONS â€” Reviewer must propose at least one alternative
   for each CONFIRMED hypothesis. Executor must address it.
5. Unsupported claims â†’ automatic FAIL:
   Severity: CRITICAL | Action: "Provide evidence or downgrade to INCONCLUSIVE"
```

**Deliverable**: `./reports/{topic}/debugs/EVIDENCE-{issue}`
**Exit Criteria**: All hypotheses tested with evidence, verdicts debated and consensus-approved, root cause identified or narrowed
**Consensus**: âœ… CONSENSUS: debugger âœ“ | scouter/backend-engineer âœ“ | reviewer âœ“

---

## ðŸŽ­ Phase 4: ROOT CAUSE REPORT â€” ðŸ”º GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                           |
| --------- | ------------------------------------ | ----------------------------------------------------------------- |
| Tech Lead | `debugger`                           | Synthesize: compile root cause analysis, recommend fix approaches |
| Executor  | `reporter`                           | Execute: write formal DEBUG-REPORT-{issue}.md                     |
| Reviewer  | `tech-lead`                          | Challenge: is analysis complete? Is fix recommendation sensible? Impact assessment? |

**Prerequisite**: **READ** SYMPTOMS + HYPOTHESES + EVIDENCE files

**Triangle Loop**:
1. `debugger` reads all prior deliverables â†’ decomposes into: executive summary, symptom timeline, hypothesis tree results, root cause chain, impact analysis, fix recommendations, prevention recommendations
2. `debugger` posts TASK_ASSIGNMENT â†’ dispatches to `reporter`
3. `reporter` writes formal report â†’ posts SUBMISSION per section:
   - Executive summary (2-3 sentences, non-technical)
   - Symptom timeline (chronological, with evidence links)
   - Hypothesis tree (tested, confirmed/refuted, with evidence)
   - Root cause chain (trigger â†’ system propagation â†’ visible symptom)
   - Impact analysis (affected users, data integrity, stability)
   - Recommended fix approaches (ranked by risk/effort/impact)
   - Prevention recommendations (how to avoid recurrence)
4. `tech-lead` reviews each section â†’ posts REVIEW:
   - Is root cause analysis technically sound?
   - Does causal chain account for all observed symptoms?
   - Are fix recommendations feasible within existing architecture?
   - Is impact assessment accurate â€” not understated or overstated?
   - Would a new engineer understand this without prior context?
5. Debate loop if FAIL â†’ `reporter` revises or defends â†’ max 3 rounds
6. `debugger` synthesizes approved sections into final report

**Deliverable**: `./reports/{topic}/debugs/DEBUG-REPORT-{issue}`
**Exit Criteria**: Root cause documented, evidence chain complete, fix approaches recommended, impact assessed, report validated
**Consensus**: âœ… CONSENSUS: debugger âœ“ | reporter âœ“ | tech-lead âœ“

---

## âœ… COMPLETION

Present final investigation report with consensus stamps from ALL phases:

```markdown
# ðŸ”º Golden Triangle Debug Report: {issue}

## Phase Results
| Phase | Triangle | Consensus | Rounds |
|-------|----------|-----------|--------|
| P1: Symptom Collection | debugger / scouter / researcher | âœ… | {n} |
| P2: Hypothesis Generation | debugger / researcher / brainstormer | âœ… | {n} |
| P3: Hypothesis Testing | debugger / scouter+backend-engineer / reviewer | âœ… | {n} |
| P4: Root Cause Report | debugger / reporter / tech-lead | âœ… | {n} |

## Debate Summary
- Total submissions: {count}
- First-pass approvals: {count}
- Debates triggered: {count}
- Arbitrations needed: {count}

## Mailbox Reference
Full debate history: `./reports/{topic}/MAILBOX-{date}.md`

## Next Actions
1. âœ… **Root Cause** â€” Identified (triangle-validated across all phases)
2. ðŸ“Š **Report** â€” `./reports/{topic}/debugs/DEBUG-REPORT-{issue}`
3. ðŸ”§ **Fix** â†’ `/fix:team` or `/fix:hard`
4. ðŸ“ **Document** â†’ `/docs:core`
```
