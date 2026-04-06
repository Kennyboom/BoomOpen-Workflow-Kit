---
description: "🔺 Team Brainstorm — Golden Triangle adversarial collaboration for maximum quality ideation"
version: "3.0"
category: ideation
execution-mode: execute
---

# /brainstorm:team — Golden Triangle Creative Brainstorming

> **MISSION**: Maximum quality ideation through adversarial collaboration.
> Each phase spawns a **Golden Triangle** of 3 agents: Tech Lead (coordinator),
> Executor (generator/analyst), Reviewer (devil's advocate). Ideas are released
> ONLY upon consensus after debate.
>
> **KEY DIFFERENCE**: In brainstorming, the adversarial loop EXPANDS thinking
> before CONVERGING. Phase 1 Reviewer pushes for MORE ideas. Phase 2 Reviewer
> challenges evaluation fairness. Debate is generative here.

<topic>$ARGUMENTS</topic>

---

## ⛔ MANDATORY REFERENCE — READ BEFORE PROCEEDING

> **🔴 YOU MUST READ these reference files NOW. Do NOT skip. Do NOT proceed without reading them.**
>
> 1. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/golden-triangle-protocol.md` — Tiered Execution, Mailbox, Pre-Flight, Triangle Loop
> 2. `~/.gemini/antigravity/skills/boomopen-workflow-kit/commands/_ref/convergent-analysis-loop.md` — Phase 2 detailed step-by-step (CRITICAL)
>
> **Failure to read = incorrect execution. These files contain BINDING protocols.**

---

## ðŸ“ DELIVERABLE FILES

| Phase | Output |
|-------|--------|
| P1: Diverge | `./reports/{topic}/brainstorms/IDEAS-{topic}` |
| P2: Converge | `./reports/{topic}/brainstorms/ANALYSIS-{topic}` |
| P3: Synthesize | `./reports/{topic}/brainstorms/BRAINSTORM-{topic}` |
| ALL Phases | `./reports/{topic}/MAILBOX-{date}.md` |

**âš ï¸ Paths = base names.** ≤ 150 lines → `{name}.md`. > 150 lines → `{name}/` folder.

---

## 🔗 PHASE DEPENDENCIES

| Phase | Requires | Blocking |
|-------|----------|----------|
| P1: Divergent Thinking | User request / topic | No |
| P2: Convergent Analysis | IDEAS-{topic}.md from P1 | **YES** |
| P3: Synthesis & Recommendation | ANALYSIS-{topic}.md from P2 | **YES** |

---

## 🎭 Phase 1: DIVERGENT THINKING — 🔺 GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `brainstormer` | Decompose: dimensions, seed ideas, exploration space |
| Executor | `researcher` + `scouter` | Generate ideas, research prior art, explore possibilities |
| Reviewer | `tech-lead` (Devil's Advocate) | Challenge: feasible? Missing categories? Too narrow? |

> **⚡ REVIEWER MINDSET**: GENERATIVE, not reductive. FAIL = "you stopped too soon"
> or "you missed an entire category." Push for MORE ideas, not fewer.

**Triangle Loop**:
1. `brainstormer` defines exploration dimensions → Shared Task List
2. `brainstormer` posts TASK_ASSIGNMENT → dispatches to `researcher` + `scouter`
3. `researcher` + `scouter` execute per dimension → post SUBMISSION
4. `tech-lead` reviews → posts REVIEW (missing categories? hidden assumptions?)
5. If FAIL → expand or defend → max 3 rounds → ESCALATION if unresolved
6. `brainstormer` synthesizes approved explorations into unified idea catalog

**Deliverable**: `./reports/{topic}/brainstorms/IDEAS-{topic}`
- Raw idea catalog (minimum 8-12 distinct ideas across dimensions)
- Prior art references, codebase context, assumptions stated
- Each idea tagged: possible / stretch / moonshot

**Exit Criteria**:
- [ ] No dimension gaps (Reviewer confirmed)
- [ ] Prior art researched with sources
- [ ] Minimum 8 distinct ideas across multiple dimensions
- [ ] `IDEAS-{topic}.md` created

**Consensus**: ✅ CONSENSUS: brainstormer ✓ | researcher+scouter ✓ | tech-lead ✓

---

## 🎭 Phase 2: CONVERGENT ANALYSIS — 🔺 GOLDEN TRIANGLE (CRITICAL)

> **⛔ MANDATORY: READ `_ref/convergent-analysis-loop.md` for the full step-by-step protocol.**

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `brainstormer` | Define evaluation criteria, filter/group ideas, manage ranking |
| Executor | `researcher` | Deep analysis, pros/cons, feasibility scoring |
| Reviewer | `reviewer` + `business-analyst` lens | Challenge fairness, bias, hidden risks |

**Prerequisite**: **READ** `./reports/{topic}/brainstorms/IDEAS-{topic}`

**Deliverable**: `./reports/{topic}/brainstorms/ANALYSIS-{topic}`
- Evaluation criteria and weights
- Per-idea deep analysis (feasibility, impact, effort, risks)
- Cross-idea comparison matrix
- Ranked shortlist of top 3-5 candidates

**Exit Criteria**:
- [ ] All ideas evaluated against defined criteria
- [ ] Evaluation fairness validated (no bias)
- [ ] Each top candidate has evidence-backed pros/cons
- [ ] Trade-offs documented — no hidden costs
- [ ] `ANALYSIS-{topic}.md` created

**Consensus**: ✅ CONSENSUS: brainstormer ✓ | researcher ✓ | reviewer ✓

---

## 🎭 Phase 3: SYNTHESIS & RECOMMENDATION — 🔺 GOLDEN TRIANGLE

| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `brainstormer` | Compile final recommendation from analysis |
| Executor | `reporter` | Write BRAINSTORM-{topic}.md with recommendations |
| Reviewer | `tech-lead` | Challenge: recommendation sound? Options fair? Decision-ready? |

**Prerequisite**: **READ** `./reports/{topic}/brainstorms/ANALYSIS-{topic}`

**Triangle Loop**:
1. `brainstormer` decomposes synthesis → Shared Task List
2. `reporter` writes each section → posts SUBMISSION
3. `tech-lead` reviews → posts REVIEW
4. If FAIL → revise or defend → max 3 rounds
5. `brainstormer` synthesizes approved sections into final document

**Deliverable**: `./reports/{topic}/brainstorms/BRAINSTORM-{topic}`
- Executive summary and top recommendation
- Complete idea catalog (explored / shortlisted / recommended)
- Evidence-backed analysis with comparison matrix
- Risk assessment and concrete next steps per option

**Exit Criteria**:
- [ ] Recommendation clearly stated with rationale
- [ ] All options fairly presented (Reviewer confirmed)
- [ ] Document is decision-ready — no ambiguity
- [ ] `BRAINSTORM-{topic}.md` created

**Consensus**: ✅ CONSENSUS: brainstormer ✓ | reporter ✓ | tech-lead ✓

---

## ✅ COMPLETION TEMPLATE

```markdown
# 🔺 Golden Triangle Brainstorm Report: {topic}

## Phase Results
| Phase | Triangle | Consensus | Rounds |
|-------|----------|-----------|--------|
| P1: Divergent Thinking | brainstormer / researcher+scouter / tech-lead | ✅ | {n} |
| P2: Convergent Analysis | brainstormer / researcher / reviewer | ✅ | {n} |
| P3: Synthesis | brainstormer / reporter / tech-lead | ✅ | {n} |

## Next Actions
1. ✅ **Done** — Brainstorm complete (triangle-validated)
2. 📋 `/plan:team` → Plan implementation of top recommendation
3. ðŸ—ï¸ `/cook:team` → Build chosen approach
```
