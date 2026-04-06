---
description: "🔺 Team Report — Golden Triangle adversarial collaboration for maximum quality reporting"
version: "3.0"
category: reporting
execution-mode: execute
---

# /report:team — Golden Triangle Report Generation

> **MISSION**: Maximum quality reporting through adversarial collaboration.
> Each phase spawns a **Golden Triangle** of 3 agents. Output is released ONLY
> upon consensus after debate.

<task>$ARGUMENTS</task>

---

## ⛔ MANDATORY REFERENCE — READ BEFORE PROCEEDING

> **🔴 YOU MUST READ these reference files NOW. Do NOT skip.**
>
> 1. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/golden-triangle-protocol.md` — Tiered Execution, Mailbox, Pre-Flight, Triangle Loop
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

**âš ï¸ Paths = base names.** ≤ 150 lines → `{name}.md`. > 150 lines → `{name}/` folder.

---

## 🔗 PHASE DEPENDENCIES

| Phase | Requires | Blocking |
|-------|----------|----------|
| P1: Data Collection & Analysis | User request | No |
| P2: Report Drafting | P1 findings | **YES** |
| P3: Review & Delivery | P2 draft report | **YES** |

---

## 🎭 Phase 1: DATA COLLECTION & ANALYSIS — 🔺 GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `reporter` | Report scope, data sources, analysis dimensions |
| Executor | `scouter` + `researcher` | Codebase scan, metrics, industry benchmarks |
| Reviewer | `business-analyst` (Devil's Advocate) | Data completeness? Metrics meaningful? Selection bias? |

**Deliverable**: `SCOUT-{topic}` + `RESEARCH-{topic}`
**Consensus**: ✅ CONSENSUS: reporter ✓ | scouter/researcher ✓ | business-analyst ✓

---

## 🎭 Phase 2: REPORT DRAFTING — 🔺 GOLDEN TRIANGLE (CRITICAL)

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

**STRICT EVIDENCE ADHERENCE**: Every claim MUST trace to Phase 1 data. Unsupported claims → automatic FAIL.

**Deliverable**: `REPORT-{topic}-{date}`
**Consensus**: ✅ CONSENSUS: reporter ✓ | reporter(exec) ✓ | reviewer ✓

---

## 🎭 Phase 3: REVIEW & DELIVERY — 🔺 GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `tech-lead` | Final quality gate, release authorization |
| Executor | `docs-manager` | Format, polish, executive summary refinement |
| Reviewer | `business-analyst` | Stakeholder-ready? Actionable next steps? |

**DELIVERY CHECKLIST**: Executive summary standalone ✓ | Claims evidence-backed ✓ | Recommendations prioritized ✓ | Audience-appropriate ✓ | Formatting professional ✓ | No contradictions ✓

**Deliverable**: `REPORT-{topic}-{date}` (final polished)
**Consensus**: ✅ CONSENSUS: tech-lead ✓ | docs-manager ✓ | business-analyst ✓

---

## ✅ COMPLETION TEMPLATE

```markdown
# 🔺 Golden Triangle Report: {topic}

## Phase Results
| Phase | Triangle | Consensus | Rounds |
|-------|----------|-----------|--------|
| P1: Data Collection | reporter / scouter+researcher / business-analyst | ✅ | {n} |
| P2: Report Drafting | reporter / reporter / reviewer | ✅ | {n} |
| P3: Review & Delivery | tech-lead / docs-manager / business-analyst | ✅ | {n} |

## Next Actions
1. ✅ **Done** — Report complete (triangle-validated)
2. ðŸ“ `/docs:core` → Update related documentation
3. 📢 Share with stakeholders
```
