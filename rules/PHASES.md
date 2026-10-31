# 🎭 PHASES

> **VERSION**: 5.4 — Antigravity 2.0 Smart-Hybrid Edition | **LOAD**: On-demand when running Mode B workflow phases | **PURPOSE**: DAG-Aware Parallel Fan-Out, Contract-First Dispatch, Direct Plan Execution & Warm Sub-agent Reuse

---

## REQUIREMENTS INTAKE (Before Phase 1 in Mode B)

### Parse ALL requirements into Registry

```markdown
### 📋 Requirements Registry
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| R1 | {extracted} | {H/M/L} | ⏳ |
| R2 | {extracted} | {H/M/L} | ⏳ |
```

**Rule**: 100% fidelity — extract EVERY requirement, no assumptions, no omissions.

---

## ⚡ DAG-AWARE PARALLEL FAN-OUT & CONTRACT-FIRST EXECUTION (v5.4)

Phase execution follows the workflow's **Directed Acyclic Graph (DAG)** of dependencies with **Direct Plan-to-Executor Dispatch** and **Warm Session Reuse**:

```
┌───────────────────────────────────────────────────────────────────────────────┐
│  🔀 1. PARALLEL FAN-OUT (When Phases Are Independent)                         │
│  • Launch independent phases concurrently in a SINGLE turn via multiple       │
│    invoke_subagent calls (Model: "inherit") and join via Reactive Wakeup:     │
│    - Discovery (/cook:hard, /plan:hard, /fix:hard, /ask:hard, /test:hard):    │
│      Launch `researcher` + `scouter` (or `debugger` + `researcher`, or        │
│      `tester` + `scouter`) together.                                          │
│    - 4-Way Review (/review:hard):                                             │
│      Launch `tech-lead` + `reviewer` + `security-engineer` +                  │
│      `performance-engineer` in parallel in a single turn.                     │
│    - Contract-First Parallel Implementation (≥ 2 Domains):                    │
│      Once `PLAN-{feature}.md` locks `SHARED_CONTRACT` and disjoint            │
│      `OWNED_FILES`, launch `backend-engineer` + `frontend-engineer` in        │
│      parallel in a single turn (`Workspace: "inherit"` for disjoint files,    │
│      or `Workspace: "branch"` if isolated worktrees are needed).              │
├───────────────────────────────────────────────────────────────────────────────┤
│  🎯 2. DIRECT PLAN-TO-EXECUTOR DISPATCH (No Middleman Hop)                    │
│  • Once `PLAN-{feature}.md` is approved in :fast, :hard, or /orchestrate:     │
│    Orchestrator dispatches tasks DIRECTLY from `PLAN` to `backend-engineer`,  │
│    `frontend-engineer`, `database-architect`, etc. using the 5-field          │
│    Structured Handoff Packet (`OWNED_FILES`, `READ_ONLY_FILES`,               │
│    `SHARED_CONTRACT`). Do NOT spawn `tech-lead` as a middleman router.        │
├───────────────────────────────────────────────────────────────────────────────┤
│  ♻️ 3. STATEFUL WARM SUB-AGENT REUSE (`send_message` by `conversationId`)     │
│  • Record each spawned sub-agent's `conversationId` in the Active Sub-agent   │
│    Session Registry. When `tester` or `reviewer` finds an issue, or when      │
│    Phase N+2 needs the same specialist again, call `send_message(Recipient:   │
│    conversationId)` to reuse the warm agent with 0s cold-start latency.       │
├───────────────────────────────────────────────────────────────────────────────┤
│  ⛓️ 4. SEQUENTIAL GATING (When Phase N+1 Depends on Phase N Output)           │
│  • Planning (`planner`) WAITS for `RESEARCH` + `SCOUT` (+ `DESIGN`).          │
│  • Parallel Implementation WAITS for `PLAN` (with locked `SHARED_CONTRACT`).  │
│  • Testing (`tester`) & Final Review (`reviewer`) WAIT for Implementation.    │
└───────────────────────────────────────────────────────────────────────────────┘
```

---

## PHASE OUTPUT FORMAT (SINGLE SOURCE OF TRUTH)

### Emit progressively as you go:

```markdown
## 🎭 Phase {N}: {name} (or Parallel Fan-Out: Phase {N} + Phase {M})

### Sub-agent: `{agent}` (`Model: inherit`, `Session: new | reused`) — {role}   ← TIER 1
### Embodying: `{agent}` — {role}                                               ← TIER 2 (fallback only)

{agent work / summary — Owned Files: {list}}

### Exit Criteria
- [x] {criterion_1}
- [x] {criterion_2}

### ✅ `{agent}` complete
**Deliverable**: {summary & Brain Artifact link}
```

**Rules**:
- TIER 1 → "Sub-agent" line | TIER 2 → "Embodying" line (never both)
- Always use `Model: "inherit"` (Pro High default) for specialist sub-agents (never `flash_lite`)
- Reuse existing `conversationId` via `send_message` whenever calling a previously spawned specialist role
- Rely on **Reactive Async Wakeup** (never poll in a loop)

---

## 🔺 GOLDEN TRIANGLE PHASE OUTPUT FORMAT (`:team` variant only)

> **LOAD**: `TEAMS.md` for full Golden Triangle protocol.
> Spawn the 3 roles (`Tech Lead` + `Executor` + `Reviewer`) once for the phase and conduct multi-turn rounds via `send_message(Recipient: conversationId)`.

```markdown
## 🎭 Phase {N}: {name} — 🔺 GOLDEN TRIANGLE

### 🔺 Triangle Assignment
| Role | Agent | Session ID | Mission |
|------|-------|------------|---------|
| Tech Lead | `{agent}` | `{convId}` | {coordination & arbitration} |
| Executor | `{agent}` | `{convId}` | {implementation & defense} |
| Reviewer | `{agent}` | `{convId}` | {adversarial review} |

### 📋 Shared Task List
| # | Task | Owner | Owned Files | Status | Round |
|---|------|-------|-------------|--------|-------|
| 1 | {task} | `{executor}` | `{paths}` | ✅/🔄/⏳ | 1/3 |

### 📬 Mailbox Exchanges (`<appDataDir>\brain\<conversation-id>\MAILBOX-{date}.md`)
| # | From → To | Type | Summary |
|---|-----------|------|---------|
| 1 | Tech Lead → Executor | TASK_ASSIGNMENT | {summary} |
| 2 | Executor → Reviewer | SUBMISSION | {summary} |
| 3 | Reviewer → Executor | REVIEW (PASS/FAIL) | {summary} |
| 4 | Executor → Reviewer | DEFENSE/RESUBMISSION | {summary} |
| 5 | Tech Lead → ALL | DECISION | {summary} |

### 🔄 Debate Summary
- **Rounds used**: {N}/3 | **Key disputes**: {brief} | **Resolution**: {PASS / Arbitration}

### ✅ CONSENSUS: {TechLead} ✓ | {Executor} ✓ | {Reviewer} ✓

### Exit Criteria
- [x] {criterion_1}
- [x] {criterion_2}

### ✅ Phase {N} complete — Golden Triangle released
**Deliverable**: {summary}
```

---

## BRAIN ARTIFACTS & DELIVERABLE SIZE MANAGEMENT

### Brain Artifacts First (Antigravity 2.0 Default)

```
DEFAULT TRANSIENT DELIVERABLES (PLAN, RESEARCH, SCOUT, DEBUG, TEST, REVIEW, REPORT, MAILBOX):
  → Write to <appDataDir>\brain\<conversation-id>\ so they render in the Antigravity UI
    Artifact pane and keep the user's Git working tree 100% clean.
  → ONLY write to ./reports/{topic}/ or ./documents/ in the project workspace when
    running /docs (/docs:core, /docs:business, /docs:audit) or when the user explicitly
    asks to commit reports into the repository.
```

### Deliverable Size Strategy

| Estimated Size | Strategy |
|----------------|----------|
| ≤ 150 lines | **Single file** — e.g. `<appDataDir>\brain\<conversation-id>\PLAN-{feature}.md` |
| > 150 lines OR ≥ 4 major sections | **Chunked** — split into folder with `00-index.md` + `01-*.md`, `02-*.md` section files |

---

## WORKFLOW COMPLETION & SKILLS ANALYSIS

```markdown
## ✅ Workflow Complete

### 📌 User Request Verification
> {Quote user's original request from plan header}

### 📋 Acceptance Criteria Verification
| ID | Criterion | Status | Evidence |
|----|-----------|--------|----------|
| AC1 | {criterion from plan} | ✅ | {file:line or test} |

### 📦 Deliverables
- {list of outputs with clickable file:/// paths}
```

1. **Step 1 — Check Pre-loaded `<skills>`**: Read matching `SKILL.md` directly from `<skills>`.
2. **Step 2 — Compact Index Lookup**: For niche domains not in `<skills>`, query `~/.{TOOL}/skills/boomopen-workflow-kit/matrix-skills/compact-index.json` (or `skill-seeker`).
