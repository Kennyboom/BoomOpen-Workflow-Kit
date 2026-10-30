# 🎭 PHASES

> **VERSION**: 5.1 — Antigravity 2.0 Smart-Hybrid Edition | **LOAD**: On-demand when running Mode B workflow phases | **PURPOSE**: Phase execution protocol

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

## PHASE OUTPUT FORMAT (SINGLE SOURCE OF TRUTH)

### Emit progressively as you go:

```markdown
## 🎭 Phase {N}: {name}

### Sub-agent: `{agent}` — {role}     ← TIER 1 (`invoke_subagent` / `runSubagent`)
### Embodying: `{agent}` — {role}     ← TIER 2 (fallback only)

{agent work / summary}

### Exit Criteria
- [x] {criterion_1}
- [x] {criterion_2}

### ✅ `{agent}` complete
**Deliverable**: {summary & Brain Artifact link}
```

**Rules**:
- TIER 1 → "Sub-agent" line | TIER 2 → "Embodying" line (never both)
- Emit phase start **before** work, exit criteria **after**
- When using `invoke_subagent` / `send_message`, rely on **Reactive Async Wakeup** (never poll in a loop)
- Continue to next phase immediately upon phase completion

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

**Rules**:
- ALWAYS 3 agents per phase (Tech Lead + Executor + Reviewer)
- Mailbox (`<appDataDir>\brain\<conversation-id>\MAILBOX-{date}.md` on Antigravity 2.0) captures ALL inter-agent exchanges
- Max 3 debate rounds per task — then Tech Lead arbitrates
- Output released ONLY with explicit consensus stamp: `✅ CONSENSUS: X ✓ | Y ✓ | Z ✓`

---

## PHASE EXECUTION & ARTIFACT ROUTING RULES

### Brain Artifacts First (Antigravity 2.0 Default)

```
DEFAULT TRANSIENT DELIVERABLES (PLAN, RESEARCH, SCOUT, DEBUG, TEST, MAILBOX):
  → Write to <appDataDir>\brain\<conversation-id>\ so they render in the Antigravity UI
    Artifact pane and keep the user's Git working tree 100% clean.
  → ONLY write to ./reports/{topic}/ or ./documents/ in the project workspace when
    running /docs (/docs:core, /docs:business, /docs:audit) or when the user explicitly
    asks to commit reports into the repository.
```

### One Phase at a Time (No Batching)

```
FOR Phase N:
  1. EMIT "## 🎭 Phase N: {name}"
  2. LOAD only what Phase N needs (agent file, prior deliverables)
  3. DELEGATE via TIERED EXECUTION (define_subagent + invoke_subagent / runSubagent)
  4. EMIT exit criteria + completion
  5. Write deliverable to Brain Artifact Directory (<appDataDir>\brain\<conversation-id>\)
  6. CONTINUE to Phase N+1
```

---

## DELIVERABLE SIZE MANAGEMENT (Chunked Strategy)

| Estimated Size | Strategy |
|----------------|----------|
| ≤ 150 lines | **Single file** — e.g. `<appDataDir>\brain\<conversation-id>\PLAN-{feature}.md` |
| > 150 lines OR ≥ 4 major sections | **Chunked** — split into folder with `00-index.md` + section files |

### Chunked Deliverable Structure

```
{ARTIFACT_OR_REPORT_DIR}/{type}/{feature}/
├── 00-index.md              # Overview + table of contents + links
├── 01-{section-name}.md     # Section 1 (80-150 lines)
├── 02-{section-name}.md     # Section 2 (80-150 lines)
└── 03-{section-name}.md     # Section 3 (80-150 lines)
```

### Creation Rules (MANDATORY)

```
WHEN creating chunked deliverable:
  1. CREATE 00-index.md FIRST (with planned sections, status ⏳)
  2. CREATE each section file ONE BY ONE, SEQUENTIALLY
  3. After EACH file: update 00-index.md section status → ✅
  4. NEVER create a single file > 200 lines or create multiple files in parallel
```

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

### 📋 Requirements Verification  
| ID | Requirement | Status | Evidence |
|----|-------------|--------|----------|
| R1 | {req} | ✅ | {file:line or deliverable} |

### 📦 Deliverables
- {list of outputs with paths}
```

---

## SKILLS ANALYSIS (FAST 2-STEP PROGRESSIVE LOOKUP)

**⛔ Output skills decision for every Mode B phase delegation using the fast 2-step lookup (never scan all 19 `matrix-skills/*.yaml` files manually):**

1. **Step 1 — Check Pre-loaded `<skills>` (Progressive Disclosure)**: Check the `<skills>` list already injected in your system prompt and read the matching `SKILL.md` directly.
2. **Step 2 — Targeted `skill-seeker` Lookup (Niche Domains Only)**: If a niche framework/domain is not in `<skills>`, use `skill-seeker` (targeted `grep_search` in `~/.gemini/config/skills_library/` or the single relevant `matrix-skills/{domain}.yaml`) to load only the needed `SKILL.md`.

- **Simple task**: `🎯 Skills Analysis: Simple → Skipping (base knowledge sufficient)`
- **Complex task**: `🎯 Skills Analysis: Complex → Using skill1, skill2 (via <skills> / skill-seeker)`
