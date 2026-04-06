---
description: "🔺 Team Review — Golden Triangle adversarial collaboration for maximum quality code review"
version: "2.0"
category: quality
execution-mode: execute
---

# /review:team — Golden Triangle Code Review

> **MISSION**: Maximum quality code review through adversarial collaboration.
> Each phase spawns a **Golden Triangle** of 3 agents: Tech Lead (coordinator),
> Executor (implementer), Reviewer (devil's advocate). Findings are released ONLY
> upon consensus after debate.

<scope>$ARGUMENTS</scope>

---


---

## ⛔ MANDATORY REFERENCE — READ BEFORE PROCEEDING

> **🔴 YOU MUST READ these reference files NOW. Do NOT skip.**
>
> 1. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/golden-triangle-protocol.md` — Tiered Execution, Mailbox, Pre-Flight, Triangle Loop
> 2. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/convergent-analysis-loop.md` — Convergent Analysis detailed protocol
> 3. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/implementation-loop.md` — Implementation step-by-step (for coding phases)
>
> **Failure to read = incorrect execution. These files contain BINDING protocols.**

---

## ðŸ“ DELIVERABLE FILES

| Phase | Output |
|-------|--------|
| P1: Scope & Context | `./reports/{topic}/scouts/SCOUT-{scope}` |
| P3: Improvement Plan | `./reports/{topic}/reviews/REVIEW-REPORT-{scope}` |
| P4: Final Review | `./reports/{topic}/reviews/REVIEW-{scope}` |
| ALL Phases | `./reports/{topic}/MAILBOX-{date}.md` |

**âš ï¸ Paths = base names.** ≤ 150 lines → `{name}.md`. > 150 lines → `{name}/` folder.

---

## 🔗 PHASE DEPENDENCIES

| Phase                             | Requires                        | Blocking    |
| --------------------------------- | ------------------------------- | ----------- |
| P1: Scope & Context               | User scope / PR / files         | No          |
| P2: Code Quality Review           | Scout findings from P1          | **YES**     |
| P3: Improvement Plan              | All review findings from P2     | **YES**     |
| P4: Summary & Recommendations     | Improvement plan from P3        | **YES**     |

**⛔ Blocking**: If input missing → STOP → Create it first → Resume

---

## 🎭 Phase 1: SCOPE & CONTEXT — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `reviewer`                           | Decompose: review scope, files to review, review dimensions |
| Executor  | `scouter`                            | Execute: map changed files, identify blast radius, trace dependencies |
| Reviewer  | `tech-lead` (Devil's Advocate)       | Challenge: scope complete? Missing files? Architecture impact assessed? |

**Triangle Loop**:
1. `reviewer` decomposes scope into areas: changed files, dependency graph, architecture impact, plan compliance baseline
2. `reviewer` posts TASK_ASSIGNMENT → dispatches to `scouter`
3. `scouter` surveys codebase → posts SUBMISSION with findings per area:
   - All changed files with line-level diff summary
   - Call chain trace: callers and callees of changed functions
   - Blast radius: downstream components affected by changes
   - Recent churn: files with high change frequency (risk indicator)
   - Architecture layer mapping: which layers are touched
4. `tech-lead` reviews each SUBMISSION → posts REVIEW:
   - Is the blast radius complete or are downstream effects missing?
   - Are there untouched files that SHOULD have changed (consistency gap)?
   - Is the architecture impact properly assessed?
   - Are there hidden coupling risks not surfaced?
5. If FAIL → `scouter` addresses gaps or defends → RESUBMISSION/DEFENSE
6. Max 3 rounds → ESCALATION to `reviewer` if unresolved
7. `reviewer` synthesizes approved findings into unified scope document

**Deliverable**: `./reports/{topic}/scouts/SCOUT-{scope}`
**Exit Criteria**: Review scope mapped, blast radius assessed, dependencies traced, focus areas flagged
**Consensus**: ✅ CONSENSUS: reviewer ✓ | scouter ✓ | tech-lead ✓

---

## 🎭 Phase 2: CODE QUALITY REVIEW — 🔺 GOLDEN TRIANGLE (CRITICAL)

> **THIS IS THE MOST CRITICAL PHASE.** Every step is detailed. No shortcuts.

| Role      | Agent                                                     | Mission                                                    |
| --------- | --------------------------------------------------------- | ---------------------------------------------------------- |
| Tech Lead | `reviewer`                                                | Coordinate: assign review dimensions, synthesize findings  |
| Executor  | `reviewer` (self-implements deep review)                  | Execute: line-by-line code review across ALL dimensions    |
| Reviewer  | `security-engineer` + `performance-engineer` (combined)   | Challenge: security vulnerabilities? Performance concerns? Code standards? |

**Prerequisite**: **READ** `./reports/{topic}/scouts/SCOUT-{scope}`

### 5 REVIEW DIMENSIONS (ALL MANDATORY)

| # | Dimension | Focus |
|---|-----------|-------|
| 1 | CORRECTNESS | Logic bugs, edge cases, error handling |
| 2 | SECURITY | Injection, auth bypass, input validation, secrets |
| 3 | PERFORMANCE | N+1 queries, unnecessary allocations, hot paths |
| 4 | CODE QUALITY | Naming, DRY, SOLID, readability, test coverage |
| 5 | PLAN COMPLIANCE | Does code match plan spec? (if PLAN exists) |

### GOLDEN TRIANGLE REVIEW LOOP (CRITICAL — Step by Step)


> **⛔ See `_ref/convergent-analysis-loop.md` or `_ref/implementation-loop.md` for detailed step-by-step protocol.**


**PLAN COMPLIANCE** (if PLAN exists):
```
FOR EACH phase in PLAN-{scope}.md:
  - Verify code implements plan spec → "Plan Phase X → Code Y → ✅/âš ï¸/âŒ"
```

**Exit Criteria**: All files reviewed across 5 dimensions, findings severity-ranked, security + performance validated
**Consensus**: ✅ CONSENSUS: reviewer ✓ | reviewer(exec) ✓ | security+perf ✓

---

## 🎭 Phase 3: IMPROVEMENT PLAN — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `tech-lead`                          | Synthesize: prioritize findings, create improvement plan   |
| Executor  | `planner`                            | Execute: write REVIEW-REPORT-{scope}.md with prioritized issues |
| Reviewer  | `reviewer`                           | Challenge: priorities correct? Severity accurate? Missing improvements? |

**Prerequisite**: All Phase 2 findings consolidated in Mailbox.

**Triangle Loop**:
1. `tech-lead` reads Phase 2 findings → decomposes into improvement areas:
   - Critical issues (must fix before merge)
   - Warnings (should fix, tech debt if deferred)
   - Suggestions (opportunistic improvements)
   - Plan deviations (if PLAN exists)
2. `tech-lead` posts TASK_ASSIGNMENT → dispatches to `planner`
3. `planner` writes structured improvement plan → posts SUBMISSION:
   - Prioritized issue table with effort estimates
   - Fix recommendations per issue (specific, actionable)
   - Dependency order: which fixes must come first
   - Risk of NOT fixing: business + technical impact per issue
4. `reviewer` reviews improvement plan → posts REVIEW:
   - Severity ratings accurate or inflated/deflated?
   - Fix recommendations correct and complete?
   - Phase 2 findings dropped or downgraded without justification?
   - Priority ordering sound (critical before cosmetic)?
5. Debate loop if FAIL → `planner` adjusts or defends → max 3 rounds
6. `tech-lead` synthesizes final improvement plan

**Deliverable**: `./reports/{topic}/reviews/REVIEW-REPORT-{scope}`
**Exit Criteria**: All findings prioritized, fix recommendations documented, effort estimated, nothing dropped
**Consensus**: ✅ CONSENSUS: tech-lead ✓ | planner ✓ | reviewer ✓

---

## 🎭 Phase 4: SUMMARY & RECOMMENDATIONS — 🔺 GOLDEN TRIANGLE

| Role      | Agent                                | Mission                                                    |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| Tech Lead | `tech-lead`                          | Final synthesis: orchestrate executive summary creation     |
| Executor  | `reporter`                           | Execute: executive summary, risk assessment, recommended actions |
| Reviewer  | `business-analyst`                   | Challenge: business impact? Stakeholder communication? Actionable? |

**Prerequisite**: **READ** `./reports/{topic}/reviews/REVIEW-REPORT-{scope}`

**Triangle Loop**:
1. `tech-lead` decomposes summary: verdict, risk matrix, actions, stakeholder brief
2. `tech-lead` posts TASK_ASSIGNMENT → dispatches to `reporter`
3. `reporter` writes final review report → posts SUBMISSION:
   ```markdown
   # Code Review: {scope}
   ## Verdict: ✅ APPROVED / âš ï¸ APPROVED WITH CONDITIONS / âŒ CHANGES REQUIRED
   ## Executive Summary
   {2-3 sentence overview of code quality, key risks, recommendation}
   ## Risk Assessment
   | Risk | Severity | Likelihood | Business Impact | Mitigation |
   ## Critical Issues ({count}) — MUST fix
   | # | Category | File:Line | Description | Fix | Effort |
   ## Warnings ({count}) — SHOULD fix
   | # | Category | File:Line | Description | Fix | Effort |
   ## Suggestions ({count}) — COULD improve
   | # | Category | File:Line | Description | Fix | Effort |
   ## Security Summary
   Vulnerabilities: {count by severity} | OWASP: {categories}
   ## Performance Summary
   Bottlenecks: {count} | Impact: {description}
   ## Plan Compliance (if applicable)
   Phases verified: {X}/{Y} | Deviations: {list or "None"}
   ## Recommended Actions
   1. {action} — Owner: {who} — Priority: {P0/P1/P2}
   ```
4. `business-analyst` reviews final report → posts REVIEW:
   - Business impact clearly communicated?
   - Non-technical stakeholder would understand verdict?
   - Recommended actions concrete and assignable?
   - Risk assessment calibrated (not alarmist or dismissive)?
5. Debate loop if FAIL → `reporter` adjusts or defends → max 3 rounds
6. `tech-lead` approves final report

**Deliverable**: `./reports/{topic}/reviews/REVIEW-{scope}`
**Exit Criteria**: Executive summary complete, verdict issued, all findings actionable, stakeholder-ready
**Consensus**: ✅ CONSENSUS: tech-lead ✓ | reporter ✓ | business-analyst ✓

---

## ✅ COMPLETION

Present final review report with consensus stamps from ALL phases:

```markdown
# 🔺 Golden Triangle Review Report: {scope}

## Phase Results
| Phase | Triangle | Consensus | Rounds |
|-------|----------|-----------|--------|
| P1: Scope & Context | reviewer / scouter / tech-lead | ✅ | {n} |
| P2: Code Quality Review | reviewer / reviewer / security+perf | ✅ | {n} |
| P3: Improvement Plan | tech-lead / planner / reviewer | ✅ | {n} |
| P4: Summary | tech-lead / reporter / business-analyst | ✅ | {n} |

## Debate Summary
- Total submissions: {count}
- First-pass approvals: {count}
- Debates triggered: {count}
- Arbitrations needed: {count}

## Mailbox Reference
Full debate history: `./reports/{topic}/MAILBOX-{date}.md`
```

**Verdict Routing**:

1. ✅ **Approved** — Code ready to merge
2. âš ï¸ **Approved with conditions** — Minor fixes needed → `/fix:fast`
3. âŒ **Changes required** — Critical issues → `/fix:hard` or `/fix:team`
4. 🔒 **Security block** — Security vulnerabilities must be resolved → `/fix:hard`
5. 🧪 **Test gaps** — Insufficient coverage → `/test:team`
