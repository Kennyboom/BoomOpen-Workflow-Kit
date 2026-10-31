# 🎭 PHASES

> **VERSION**: 5.2 — Antigravity 2.0 Smart-Hybrid Edition | **LOAD**: On-demand when running Mode B workflow phases | **PURPOSE**: DAG-Aware Parallel Fan-Out & Phase Execution Protocol

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

## ⚡ DAG-AWARE PARALLEL FAN-OUT vs. SEQUENTIAL DEPENDENCY

In v5.2, phase execution follows the workflow's **Directed Acyclic Graph (DAG)** of dependencies rather than forcing independent read-only phases into a slow single-file queue:

```
┌───────────────────────────────────────────────────────────────────────────────┐
│  🔀 PARALLEL FAN-OUT (When Phases Are Independent)                            │
│  • Independent read-only or branch-isolated phases MUST be launched           │
│    concurrently in a SINGLE turn via multiple invoke_subagent calls           │
│    (using Model: "inherit") and joined via Reactive Async Wakeup:             │
│    1. Discovery & Analysis (/cook:hard, /plan:hard, /fix:hard, /ask:hard):    │
│       Launch `researcher` + `scouter` (or `debugger` + `researcher`)          │
│       in parallel in the same turn.                                           │
│    2. Multi-Dimension Review (/review:hard):                                  │
│       Launch `tech-lead` (Architecture) + `reviewer` (Code Quality) +         │
│       `security-engineer` (Security) + `performance-engineer` (Performance)   │
│       in parallel in the same turn, then synthesize into REVIEW-{scope}.md.   │
│    3. Decoupled Module Implementation:                                        │
│       After PLAN is approved, launch `backend-engineer` + `frontend-engineer` │
│       in parallel using `Workspace: "branch"` (or `"inherit"` when touching   │
│       disjoint directories).                                                  │
├───────────────────────────────────────────────────────────────────────────────┤
│  ⛓️ SEQUENTIAL GATING (When Phase N+1 Depends on Phase N Output)              │
│  • Blocking phases MUST wait until all prerequisite deliverables exist:       │
│    - Planning (`planner`) WAITS for `RESEARCH` + `SCOUT` (+ `DESIGN`)         │
│    - Implementation (`tech-lead` / engineers) WAITS for `PLAN`                │
│    - Testing (`tester`) & Final Review (`reviewer`) WAIT for `Implementation` │
└───────────────────────────────────────────────────────────────────────────────┘
```

---

## PHASE OUTPUT FORMAT (SINGLE SOURCE OF TRUTH)

### Emit progressively as you go:

```markdown
## 🎭 Phase {N}: {name} (or Parallel Fan-Out: Phase {N} + Phase {M})

### Sub-agent: `{agent}` (`Model: inherit`) — {role}   ← TIER 1 (`invoke_subagent` / `runSubagent`)
### Embodying: `{agent}` — {role}                      ← TIER 2 (fallback only)

{agent work / summary}

### Exit Criteria
- [x] {criterion_1}
- [x] {criterion_2}

### ✅ `{agent}` complete
**Deliverable**: {summary & Brain Artifact link}
```

**Rules**:
- TIER 1 → "Sub-agent" line | TIER 2 → "Embodying" line (never both)
- Always use `Model: "inherit"` (Pro High default) for specialist sub-agents (never `flash_lite`)
- When using `invoke_subagent` / `send_message`, rely on **Reactive Async Wakeup** (never poll in a loop)
- Advance to the next DAG stage immediately once prerequisite phases complete

---

## 🔺 GOLDEN TRIANGLE PHASE OUTPUT FORMAT (`:team` variant only)

> **LOAD**: `TEAMS.md` for full Golden Triangle protocol.
> Each `:team` phase spawns **3 agents**: Tech Lead + Executor + Reviewer.

```markdown
## 🎭 Phase {N}: {name} — 🔺 GOLDEN TRIANGLE

### 🔺 Triangle Assignment
| Role | Agent | Mission |
|------|-------|---------|
| Tech Lead | `{agent}` | {coordination mission} |
| Executor | `{agent}` | {implementation mission} |
| Reviewer | `{agent}` | {review mission} |

### 📋 Shared Task List
| # | Task | Owner | Status | Round |
|---|------|-------|--------|-------|
| 1 | {task} | `{executor}` | ✅/🔄/⏳ | 1/3 |

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

## WORKFLOW COMPLETION

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

---

## SKILLS ANALYSIS (FAST 2-STEP PROGRESSIVE LOOKUP)

1. **Step 1 — Check Pre-loaded `<skills>` (Progressive Disclosure)**: Check the `<skills>` list already injected in your system prompt and read the matching `SKILL.md` directly.
2. **Step 2 — Compact Index / `skill-seeker` Lookup (Niche Domains Only)**: If a niche framework/domain is not in `<skills>`, query `~/.{TOOL}/skills/boomopen-workflow-kit/matrix-skills/compact-index.json` (or `skill-seeker` against `~/.gemini/config/skills_library/`) to locate and read only the needed `SKILL.md`.
