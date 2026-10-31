---
description: "🔄 Convergent Analysis Loop — Shared protocol for deep code/bug/perf/security analysis in *:team workflows"
version: "5.5"
type: reference
---

# 🔄 Convergent Analysis Loop (Phase 2 Protocol)

> **REFERENCED BY**: `review-team.md`, `debug-team.md`, `test-team.md`, `fix-team.md`
> This replaces generic single-pass analysis with a multi-round convergent loop.

---

## 🔄 HOW THE LOOP WORKS (UP TO 3 ROUNDS)

### Round 1: INITIAL DEEP SCAN

**STEP 2.1 — SUB-AGENT CALL #1: `{Tech Lead agent}` (Task Decomposition)**
- Reads Phase 1 scope & context from MAILBOX (`<appDataDir>\brain\<conversation-id>\MAILBOX-{date}.md` or `./reports/{topic}/MAILBOX-{date}.md`)
- Breaks analysis into specific focus areas:
  1. Logic & correctness (happy path, edge cases, error handling, state mutations)
  2. Security & data safety (injection, auth bypass, secrets, PII exposure)
  3. Performance & scalability (N+1 queries, memory leaks, unnecessary re-renders, blocking I/O)
  4. Architecture & maintainability (SOLID, DRY, coupling, naming, type safety)
- Appends `[TASK_BRIEF]` to MAILBOX

**STEP 2.2 — SUB-AGENT CALL #2: `{Executor agent}` (Deep Execution)**
- Reads EVERY file in scope line-by-line (using `view_file` / `run_command`)
- Traces data flow from entry point → business logic → persistence → response
- For each finding, records:
  - `File:Line` (exact location)
  - `Severity` (🔴 CRITICAL / 🟠 HIGH / 🟡 MEDIUM / 🟢 LOW)
  - `Category` (Logic / Security / Performance / Architecture / Test)
  - `Evidence` (exact code snippet + failure scenario)
  - `Fix` (concrete code change recommendation)
- Appends `[REPORT]` to MAILBOX

**STEP 2.3 — SUB-AGENT CALL #3: `{Reviewer/Challenger agent}` (Adversarial Challenge)**
- Reads Executor's `[REPORT]` AND independently inspects the code
- Executes 2 mandatory checks:
  1. **False Positive Filter**: Challenge any finding that is theoretical, Nitpicky, or already handled upstream/downstream. Downgrade or remove unproven claims.
  2. **Blind Spot Hunt**: Actively search the code for issues the Executor MISSED (especially cross-file side effects, race conditions, error boundary gaps, security flaws).
- Appends `[CRITIQUE]` to MAILBOX with:
  - Disputed findings (with counter-evidence)
  - Newly discovered issues (with `File:Line` + proof)

---

### Round 2: CONVERGENCE & VERIFICATION (If disputes or new issues exist)

**STEP 2.4 — SUB-AGENT CALL: `{Executor agent}`**
- Verifies Challenger's newly discovered issues against the codebase
- Defends or withdraws disputed findings with concrete code trace proof
- Updates the master findings list → appends `[REVISION]` to MAILBOX

**STEP 2.5 — SUB-AGENT CALL: `{Reviewer/Challenger agent}`**
- Verifies updated findings list
- Confirms all real issues are captured and false positives removed → appends `[APPROVAL]`

---

### Round 3: TECH LEAD ARBITRATION & FINAL SYNTHESIS

**STEP 2.6 — SUB-AGENT CALL: `{Tech Lead agent}`**
- Resolves any remaining disagreement between Executor and Challenger
- Prioritizes final validated findings by severity (🔴 → 🟠 → 🟡 → 🟢)
- Appends `[CONSENSUS]` (`✅ CONSENSUS: {TL} ✓ | {Exec} ✓ | {Rev} ✓`) to MAILBOX
