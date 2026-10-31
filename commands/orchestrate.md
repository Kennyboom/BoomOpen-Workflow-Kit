---
description: Coordinate multiple agents for complex tasks. Use for multi-perspective analysis, comprehensive reviews, or tasks requiring different domain expertise.
category: orchestration
execution-mode: sequential
---

> **📂 Deliverable Routing (v5.1)**: On Antigravity 2.0, write transient deliverables (`BRAINSTORM`, `RESEARCH`, `SCOUT`, `DESIGN`, `PLAN`, `DEBUG`, `TEST`, `REVIEW`, `REPORT`, `MAILBOX`) to `<appDataDir>\brain\<conversation-id>\` to keep the Git tree clean (use `./reports/{topic}/` on non-Antigravity tools or when explicitly requested).

---

# Multi-Agent Orchestration

You are now in **ORCHESTRATION MODE**. Your task: coordinate specialized agents to solve this complex problem.

## Task to Orchestrate
$ARGUMENTS

---

## 🔴 CRITICAL: Minimum Agent Requirement

> ⚠️ **ORCHESTRATION = MINIMUM 3 DIFFERENT AGENTS**
> 
> If you use fewer than 3 agents, you are NOT orchestrating - you're just delegating.
> 
> **Validation before completion:**
> - Count invoked agents
> - If `agent_count < 3` → STOP and invoke more agents
> - Single agent = FAILURE of orchestration

### Agent Selection Matrix

| Task Type | REQUIRED Agents (minimum) |
|-----------|---------------------------|
| **Web App** | `frontend-engineer`, `backend-engineer`, `tester` |
| **API** | `backend-engineer`, `security-engineer`, `tester` |
| **UI/Design** | `designer`, `frontend-engineer`, `performance-engineer` |
| **Database** | `database-architect`, `backend-engineer`, `security-engineer` |
| **Full Stack** | `planner`, `frontend-engineer`, `backend-engineer`, `devops-engineer` |
| **Debug** | `debugger`, `scouter`, `tester` |
| **Security** | `security-engineer`, `reviewer`, `devops-engineer` |

---

## Pre-Flight: Mode Check

| Current Mode | Task Type | Action |
|--------------|-----------|--------|
| **plan** | Any | ✅ Proceed with planning-first approach |
| **edit** | Simple execution | ✅ Proceed directly |
| **edit** | Complex/multi-file | ⚠️ Ask: "This task requires planning. Switch to plan mode?" |
| **ask** | Any | ⚠️ Ask: "Ready to orchestrate. Switch to edit or plan mode?" |

---

## 🔴 STRICT 2-PHASE ORCHESTRATION

### PHASE 1: PLANNING (Sequential - NO parallel agents)

| Step | Agent | Action |
|------|-------|--------|
| 1 | `planner` | Create `<appDataDir>\\brain\\<conversation-id>\\PLAN-{feature}.md` (or `./reports/{topic}/plans/PLAN-{feature}.md`) or `docs/PLAN.md` |
| 2 | (optional) `scouter` | Codebase discovery if needed |

> 🔴 **NO OTHER AGENTS during planning!** Only `planner` and `scouter`.

### ⏸️ CHECKPOINT: User Approval

```
After PLAN.md is complete, ASK:

"✅ Plan created.

Do you approve? (Y/N)
- Y: Start implementation
- N: I'll revise the plan"
```

> 🔴 **DO NOT proceed to Phase 2 without explicit user approval!**

### PHASE 2: IMPLEMENTATION (Parallel agents after approval)

| Parallel Group | Agents |
|----------------|--------|
| Foundation | `database-architect`, `security-engineer` |
| Core | `backend-engineer`, `frontend-engineer` |
| Polish | `tester`, `reviewer`, `devops-engineer` |

> ✅ After user approval, invoke multiple agents in PARALLEL using `invoke_subagent` (or `runSubagent`).

## Available Canonical Agents (20 total)

| Agent | Category | Domain / Use When |
|-------|----------|-------------------|
| `tech-lead` | meta | Architecture, technical orchestration |
| `planner` | meta | Task breakdown, roadmap, PLAN.md |
| `backend-engineer` | execution | Server, APIs, Node.js, Python, Go |
| `frontend-engineer` | execution | UI/UX implementation, React, Vue, CSS |
| `database-architect` | execution | SQL, NoSQL, Schema, Migrations |
| `mobile-engineer` | execution | iOS, Android, React Native, Flutter |
| `game-engineer` | execution | Unity, Unreal, Godot, game systems |
| `tester` | validation | Unit, integration, E2E testing |
| `reviewer` | validation | Code review, quality gatekeeping |
| `security-engineer` | validation | Security audit, auth, vulnerability assessment |
| `performance-engineer` | validation | Profiling, optimization, load testing |
| `debugger` | validation | Root-cause bug investigation |
| `researcher` | research | External research, documentation lookup |
| `scouter` | research | Codebase mapping and discovery |
| `brainstormer` | research | Ideation, options exploration |
| `designer` | research | UI/UX design, wireframes, design systems |
| `docs-manager` | support | README, API docs, technical documentation |
| `devops-engineer` | support | CI/CD, Docker, infrastructure, deploy |
| `business-analyst` | support | Business requirements, PRD, user stories |
| `project-manager` | support | Project coordination, risk, delivery |
| `reporter` | support | Status reports, summaries, metrics |

---

## Orchestration Protocol

### Step 1: Analyze Task Domains
Identify ALL domains this task touches:
```
□ Security     → security-engineer
□ Backend/API  → backend-engineer
□ Frontend/UI  → frontend-engineer, designer
□ Database     → database-architect
□ Testing      → tester
□ Code Review  → reviewer
□ DevOps       → devops-engineer
□ Mobile       → mobile-engineer
□ Game         → game-engineer
□ Performance  → performance-engineer
□ Docs         → docs-manager
□ Requirements → business-analyst
□ Discovery    → scouter, researcher
□ Planning     → planner, tech-lead
```

### Step 2: Phase Detection

| If Plan Exists | Action |
|----------------|--------|
| NO Plan file | → Go to PHASE 1 (planning only via `planner` / `scouter`) |
| YES Plan file + user approved | → Go to PHASE 2 (implementation) |

### Step 3: Execute Based on Phase

**PHASE 1 (Planning):**
```
Delegate to `planner` (and optionally `scouter`) via TIER 1 (`invoke_subagent` / `runSubagent`)
→ STOP after plan is created
→ ASK user for approval
```

**PHASE 2 (Implementation - after approval):**
```
Invoke specialist agents via `invoke_subagent` (with Reactive Async Wakeup):
- `backend-engineer` for backend/API tasks
- `frontend-engineer` for UI tasks
- `tester` and `reviewer` for verification
```

**🔴 CRITICAL: Context Passing (MANDATORY)**

When invoking ANY subagent, you MUST include:
1. **Original User Request:** Full text of what user asked
2. **Decisions Made:** All user answers to Socratic questions
3. **Previous Agent Work:** Summary of what previous agents did
4. **Current Plan State:** Plan file path and constraints

### Step 4: Verification (MANDATORY)
Delegate to `tester` and `reviewer` (or `security-engineer`) to run project test suites, linters, type checks, and security checks appropriate for the project stack.

### Step 5: Synthesize Results
Combine all agent outputs into a unified report.

---

## Output Format

```markdown
## 🎼 Orchestration Report

### Task
[Original task summary]

### Agents Invoked (MINIMUM 3)
| # | Agent | Focus Area | Status |
|---|-------|------------|--------|
| 1 | `planner` | Task breakdown | ✅ |
| 2 | `frontend-engineer` | UI implementation | ✅ |
| 3 | `tester` | Verification & tests | ✅ |

### Verification Executed
- [x] Build / Lint / Type-check → Pass/Fail
- [x] Test Suite / Security Review → Pass/Fail

### Key Findings
1. **`planner`**: Finding
2. **`frontend-engineer`**: Finding
3. **`tester`**: Finding

### Deliverables
- [ ] Plan created
- [ ] Code implemented
- [ ] Tests passing
- [ ] Review verified

### Summary
[One paragraph synthesis of all agent work]
```

---

## 🔴 EXIT GATE

Before completing orchestration, verify:
1. ✅ **Agent Count:** `invoked_agents >= 3`
2. ✅ **Verification Executed:** `tester` / `reviewer` verified build and tests
3. ✅ **Report Generated:** Orchestration Report with all agents listed
