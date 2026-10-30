# 🤖 AGENTS

> **VERSION**: 5.1 — Antigravity 2.0 Smart-Hybrid Edition | **LOAD**: When delegating to agents in Mode B | **PURPOSE**: Agent handling protocol

---

## TIERED EXECUTION (SMART COMPLEXITY THRESHOLD GATE)

### TIER 0: Mode A Direct Execution (Fast Path — Default for Simple Tasks)

```yaml
when:
  - Q&A, code explanation, single-domain bug fixes, or clear changes touching ≤ 3 files
  - AND no explicit multi-agent slash command (/cook, /fix:hard, /cook:team, /orchestrate, etc.) was invoked
action:
  - Primary agent executes, tests, and verifies directly (0 subagent cold-start latency, 0 extra rule reads)
  - Strictly enforce Professional Coding Standards (≤ 300 lines/file, ≤ 25 lines/fn) and Persistent Testing & Bug Fixing
```

### TIER 1: Mode B Native Sub-agent Delegation (MANDATORY for Complex Tasks & `/cmd`)

```yaml
when_any_true:
  - User explicitly invokes a BoomOpen workflow command (/cook, /fix, /plan:hard, /review:team, /docs:core, /orchestrate, etc.)
  - Task spans > 3 files or ≥ 2 domains (e.g., Database + Backend + Frontend + Security)
  - Task requires architectural design, complex cross-module debugging, or adversarial Golden Triangle review (:hard / :team)

execution:
  1. Prepare handoff:
     include: requirements, task, acceptance criteria, constraints, deliverable path (<appDataDir>\brain\<conversation-id>\ default)
     exclude: internal reasoning, failed attempts

  2. Fast 2-Step Skills Analysis: (output required)
     "🎯 Skills Analysis: {simple|complex} → {using X | skipping}"

  3. Invoke Sub-agent (Antigravity 2.0 Native or Cross-Platform Alias):
     - Antigravity 2.0:
       a. define_subagent: Define specialist agent (backend-engineer, frontend-engineer,
          tester, reviewer, debugger, planner, scouter, researcher, etc.) with EnableWriteTools: true/false
       b. invoke_subagent: Launch isolated sub-agent with:
          - TypeName: "research", "self", or custom defined agent name
          - Role: Specialist persona and mission
          - Prompt: Clean handoff context + task + exit criteria
          - Model: "inherit", "flash_lite", "flash", or "pro"
          - Workspace: "inherit", "branch" (git worktree isolation), or "share"
       c. send_message: Multi-turn follow-up by conversationId using Reactive Async Wakeup
          (system automatically wakes Orchestrator when sub-agent replies — NEVER poll in a loop)
       d. manage_subagents / manage_task: List, inspect status, or terminate sub-agents/tasks
     - Cursor / Copilot / Claude Code fallback alias:
       runSubagent(agent_name, context)

  4. Verify: format matches, exit criteria met

  5. On system error: fallback to TIER 2, log reason
```

### TIER 2: EMBODY (Mode B Fallback only)

```yaml
permitted_when:
  - Mode B triggered AND Tool Discovery found NO sub-agent tools (neither invoke_subagent nor runSubagent)
  - Sub-agent tool returned unrecoverable system error

execution:
  1. Log: "⚠️ TIER 2: {reason}"
  2. READ agent file COMPLETELY from ~/.{TOOL}/skills/boomopen-workflow-kit/agents/{agent}.md
  3. EXTRACT: Directive, Protocol, Constraints, Format
  4. ANNOUNCE embodiment:
     📋 EMBODIED: `{agent}` | **Directive**: {directive} | **Protocol**: {protocol}
  5. EXECUTE as agent, then EXIT embodiment and continue as orchestrator
```

---

## CONTEXT MODEL COMPARISON

| Aspect | TIER 0: Mode A Direct | TIER 1: Mode B Sub-agent | TIER 2: Mode B EMBODY |
|--------|-----------------------|--------------------------|-----------------------|
| Trigger | ≤ 3 files, 1 domain, no `/cmd` | > 3 files, ≥ 2 domains, or `/cmd` | TIER 1 tool error |
| Context | Primary session (zero latency) | Fresh, isolated (`Workspace: inherit/branch/share`) | Shared with parent |
| Parallel | N/A | Yes (Reactive Async Wakeup) | No (sequential) |

---

## AGENT CATEGORIES (20 Canonical Agents)

| Category | Agents | Write Tools | Purpose |
|----------|--------|:-----------:|---------|
| **meta** | `tech-lead`, `planner` | `true` (plans/mailboxes only) | Coordinate, never implement code |
| **execution** | `backend-engineer`, `frontend-engineer`, `mobile-engineer`, `game-engineer`, `database-architect` | `true` | Implementation |
| **validation** | `tester`, `reviewer`, `security-engineer`, `performance-engineer`, `debugger` | `true`/`false` | QA, auditing, debugging |
| **research** | `researcher`, `scouter`, `brainstormer`, `designer` | `true` (reports/artifacts) | Investigation & design specs |
| **support** | `docs-manager`, `devops-engineer`, `business-analyst`, `project-manager`, `reporter` | `true` | Documentation, infra, reporting |

---

## 🔺 AGENT TEAMS — GOLDEN TRIANGLE (`:team` variant only)

> **LOAD**: `TEAMS.md` for full Golden Triangle protocol and debate mechanism.
> Teams spawn **3 agents per phase**: Tech Lead + Executor + Reviewer.

### Golden Triangle Roster

| Domain | Tech Lead | Executor | Reviewer | Use When |
|--------|-----------|----------|----------|----------|
| `backend-team` | `tech-lead` | `backend-engineer` | `reviewer` | APIs, server logic, backend features |
| `frontend-team` | `tech-lead` | `frontend-engineer` | `reviewer` | UI components, client-side features |
| `fullstack-team` | `tech-lead` | `backend-engineer` + `frontend-engineer` | `reviewer` | End-to-end features |
| `database-team` | `tech-lead` | `database-architect` | `reviewer` + security lens | Schema design, migrations, queries |
| `research-team` | `researcher` | `scouter` | `brainstormer` (Devil's Advocate) | Discovery, codebase analysis, patterns |
| `planning-team` | `planner` | `researcher` | `tech-lead` (feasibility critic) | Architecture planning, task decomposition |
| `qa-team` | `tester` | `tester` (self-implements) | `security-engineer` + `performance-engineer` | Test strategy, coverage, quality |
| `design-team` | `designer` | `frontend-engineer` | `reviewer` + UX/a11y lens | UI/UX design, component specs |
| `debug-team` | `debugger` | `backend-engineer` | `reviewer` (root-cause validator) | Root cause analysis, issue resolution |
| `devops-team` | `devops-engineer` | `backend-engineer` | `security-engineer` | CI/CD, infrastructure, deployment |
| `security-team` | `security-engineer` | `backend-engineer` | `reviewer` (pen-test mindset) | Security assessment, vulnerability audit |
| `game-team` | `tech-lead` | `game-engineer` | `reviewer` (game arch + 60fps) | Game development, engines, physics, ECS |
| `mobile-team` | `tech-lead` | `mobile-engineer` | `reviewer` (UX + platform) | iOS, Android, React Native, Flutter |
| `performance-team` | `performance-engineer` | `backend-engineer` | `reviewer` (measurement + regression) | Profiling, optimization, load testing |
| `docs-team` | `docs-manager` | `researcher` | `reviewer` (accuracy + completeness) | Technical writing, API docs, architecture docs |
| `project-team` | `project-manager` | `business-analyst` | `tech-lead` (feasibility critic) | Project planning, risk, delivery |
| `report-team` | `reporter` | `scouter` | `reviewer` (data accuracy + insight) | Status reports, metrics, analytics |

### Golden Triangle Definitions Location

```
agents/teams/{team-name}/
├── techlead.md    # Coordinator, decomposer, arbitrator
├── executor.md    # Builder, implementer, defender
└── reviewer.md    # Devil's advocate, quality gatekeeper
```

---

## TASK → AGENT MAPPING

| Task | Agent |
|------|-------|
| API, backend logic | `backend-engineer` |
| UI, components | `frontend-engineer` |
| Database schema | `database-architect` |
| Security | `security-engineer` |
| Testing | `tester` |
| Code review | `reviewer` |
| Debugging | `debugger` |
| Planning | `planner` |
| Research | `researcher` |
| Codebase analysis | `scouter` |
| Documentation | `docs-manager` |
| Deployment | `devops-engineer` |
| Reports | `reporter` |
| Project management | `project-manager` |
| Business analysis | `business-analyst` |
| Design | `designer` |
| Brainstorming | `brainstormer` |
| Game development | `game-engineer` |
| Mobile development | `mobile-engineer` |
| Technical leadership | `tech-lead` |

---

## CONTEXT ISOLATION & ARTIFACT DIRECTIVE

```
INCLUDE in Mode B handoff:
  - Original requirements (verbatim) & decisions from prior phases
  - Deliverable location: Write transient reports (PLAN, RESEARCH, SCOUT, DEBUG, TEST, MAILBOX)
    to <appDataDir>\brain\<conversation-id>\ on Antigravity 2.0 (keep Git tree clean).
    Only write to ./reports/{topic}/ or ./documents/ for /docs or explicit repo export.
  - Deliverable size directive: If > 150 lines or ≥ 4 sections, use chunked folder with 00-index.md.
```
