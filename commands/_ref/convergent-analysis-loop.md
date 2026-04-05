---
description: "🔺 Convergent Analysis Loop — Step-by-step protocol for Phase 2 of :team workflows"
version: "1.0"
type: reference
---

# 🔺 Phase 2: Convergent Analysis — Detailed Loop

> **THIS IS THE MOST CRITICAL PHASE.** Every step is detailed. No shortcuts.
> Raw ideas become ranked, evidence-backed candidates here.

## Step-by-Step Protocol

### STEP 1: Tech Lead reads input from Phase 1
- Load full idea/finding catalog from previous phase output
- Group by theme, define evaluation criteria + weights

### STEP 2: Tech Lead creates Shared Task List
- Task per idea cluster: deep-dive analysis
- Task: cross-cutting trade-off comparison
- Task: feasibility scoring matrix
- Post to Mailbox as `TASK_ASSIGNMENT`

### STEP 3: Dispatch
Each assignment includes:
- Idea cluster to analyze + evaluation criteria + weights
- Required evidence depth + comparison requirements

### STEP 4: Executor analyzes each task
1. Read `TASK_ASSIGNMENT` from Mailbox
2. Deep analysis: pros/cons, feasibility, impact, dependencies
3. Post `SUBMISSION` with:

| Field | Format |
|-------|--------|
| Idea cluster | Description |
| Feasibility | Score 1-10 |
| Impact | Score 1-10 |
| Effort | S / M / L / XL |
| Pros + Cons | With evidence |
| Dependencies | List |
| Risks | List |
| Open questions | List |

### STEP 5: Reviewer checks 5 dimensions per SUBMISSION

| # | Dimension | Question |
|---|-----------|----------|
| 1 | FAIRNESS | Criteria applied consistently? |
| 2 | EVIDENCE | Claims backed by data/research? |
| 3 | BIAS | Anchoring? Confirmation? Sunk cost? |
| 4 | TRADE-OFFS | Hidden costs? Missed downsides? |
| 5 | RISKS | Tail risks? Second-order effects? |

Posts `REVIEW`: PASS or FAIL with findings table + required actions.

### STEP 6: IF FAIL — Debate Loop (max 3 rounds)
1. Executor reads findings
2. For each: Revise (if valid) or post `DEFENSE` with evidence
3. Post `RESUBMISSION` / `DEFENSE` → Reviewer re-reviews
4. Round 3 without resolution → `ESCALATION` → Tech Lead `ARBITRATES`

### STEP 7: IF PASS
`APPROVAL` → mark ✅ → next task

### STEP 8: ALL tasks complete
Tech Lead verifies cross-cluster coherence:
- No grading drift, consistent comparisons, defensible rankings
- Posts `DECISION` with consensus stamp → Phase output released
