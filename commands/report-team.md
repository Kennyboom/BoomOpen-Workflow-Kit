---
description: "ðŸ”º Team Report â€” Golden Triangle adversarial collaboration for maximum quality reporting"
version: "3.0"
category: reporting
execution-mode: execute
---

# /report:team â€” Golden Triangle Report Generation

> **MISSION**: Maximum quality reporting through adversarial collaboration.
> Each phase spawns a **Golden Triangle** of 3 agents. Output is released ONLY
> upon consensus after debate.

<task>$ARGUMENTS</task>

---

## â›” MANDATORY REFERENCE â€” READ BEFORE PROCEEDING

> **ðŸ”´ YOU MUST READ these reference files NOW. Do NOT skip.**
>
> 1. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/golden-triangle-protocol.md` â€” Tiered Execution, Mailbox, Pre-Flight, Triangle Loop
>
> **Failure to read = incorrect execution. These files contain BINDING protocols.**

---

## ðŸ“ DELIVERABLE FILES

| Phase | Output |
|-------|--------|
| P1: Data | `./reports/{topic}/scouts/SCOUT-{topic}` + `./reports/{topic}/researchers/RESEARCH-{topic}` |
| P2: Draft | `./reports/{topic}/general/REPORT-{topic}-{date}` |
| P3: Final | `./reports/{topic}/general/REPORT-{topic}-{date}` (polished) |
| ALL | `./reports/{topic}/MAILBOX-{date}.md` |

**âš ï¸ Paths = base names.** â‰¤ 150 lines â†’ `{name}.md`. > 150 lines â†’ `{name}/` folder.

---

## ðŸ”— PHASE DEPENDENCIES

| Phase | Requires | Blocking |
|-------|----------|----------|
| P1: Data Collection & Analysis | User request | No |
| P2: Report Drafting | P1 findings | **YES** |
| P3: Review & Delivery | P2 draft report | **YES** |

---

## ðŸŽ­ Phase 1: DATA COLLECTION & ANALYSIS â€” ðŸ”º GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `reporter` | Report scope, data sources, analysis dimensions |
| Executor | `scouter` + `researcher` | Codebase scan, metrics, industry benchmarks |
| Reviewer | `business-analyst` (Devil's Advocate) | Data completeness? Metrics meaningful? Selection bias? |

**Deliverable**: `SCOUT-{topic}` + `RESEARCH-{topic}`
**Consensus**: âœ… CONSENSUS: reporter âœ“ | scouter/researcher âœ“ | business-analyst âœ“

---

## ðŸŽ­ Phase 2: REPORT DRAFTING â€” ðŸ”º GOLDEN TRIANGLE (CRITICAL)

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `reporter` | Report structure, key findings, recommendations |
| Executor | `reporter` (self-implements) | Write REPORT with findings, analysis, recommendations |
| Reviewer | `tech-lead` + `reviewer` | Conclusions data-backed? Recommendations actionable? |

**Prerequisite**: READ SCOUT + RESEARCH from Phase 1

### REPORT STRUCTURE

```markdown
# Report: {topic}
**Date**: {date} | **Type**: {status|analysis|audit|assessment}
**Audience**: {target}

## Executive Summary
- Overall assessment, critical findings (top 3-5), key recommendations, risk level

## Scope & Methodology
- What was analyzed, data sources, methods, known limitations

## Findings
### Finding N: {title}
- **Evidence**: {code refs, metrics} | **Impact**: {assessment} | **Confidence**: H/M/L

## Recommendations
| # | Recommendation | Priority | Effort | Impact | Owner |
|---|---------------|----------|--------|--------|-------|

## Risk Assessment
| Risk | Probability | Impact | Mitigation |
```

**STRICT EVIDENCE ADHERENCE**: Every claim MUST trace to Phase 1 data. Unsupported claims â†’ automatic FAIL.

**Deliverable**: `REPORT-{topic}-{date}`
**Consensus**: âœ… CONSENSUS: reporter âœ“ | reporter(exec) âœ“ | reviewer âœ“

---

## ðŸŽ­ Phase 3: REVIEW & DELIVERY â€” ðŸ”º GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `tech-lead` | Final quality gate, release authorization |
| Executor | `docs-manager` | Format, polish, executive summary refinement |
| Reviewer | `business-analyst` | Stakeholder-ready? Actionable next steps? |

**DELIVERY CHECKLIST**: Executive summary standalone âœ“ | Claims evidence-backed âœ“ | Recommendations prioritized âœ“ | Audience-appropriate âœ“ | Formatting professional âœ“ | No contradictions âœ“

**Deliverable**: `REPORT-{topic}-{date}` (final polished)
**Consensus**: âœ… CONSENSUS: tech-lead âœ“ | docs-manager âœ“ | business-analyst âœ“

---

## âœ… COMPLETION TEMPLATE

```markdown
# ðŸ”º Golden Triangle Report: {topic}

## Phase Results
| Phase | Triangle | Consensus | Rounds |
|-------|----------|-----------|--------|
| P1: Data Collection | reporter / scouter+researcher / business-analyst | âœ… | {n} |
| P2: Report Drafting | reporter / reporter / reviewer | âœ… | {n} |
| P3: Review & Delivery | tech-lead / docs-manager / business-analyst | âœ… | {n} |

## Next Actions
1. âœ… **Done** â€” Report complete (triangle-validated)
2. ðŸ“ `/docs:core` â†’ Update related documentation
3. ðŸ“¢ Share with stakeholders
```
