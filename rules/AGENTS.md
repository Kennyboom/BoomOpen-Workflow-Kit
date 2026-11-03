# 🤖 AGENTS

> **VERSION**: 5.5 — Antigravity 2.0 Smart-Hybrid Edition | **LOAD**: When delegating to agents in Mode B | **PURPOSE**: Intelligent Work Distribution, Quality-First Model Policy, Warm Sub-agent Reuse & File Ownership Locks

---

## 🧠 QUALITY-FIRST MODEL POLICY (PRO HIGH DEFAULT — MANDATORY)

> **CRITICAL USER CONSTRAINT**: The vast majority of work **MUST follow the user's selected model (`Model: "inherit"` / Pro High)** to prevent any drop in quality.

| Model Setting | Permitted Scope | Enforcement |
|---------------|-----------------|-------------|
| **`Model: "inherit"`** (or `"pro"` — User's Pro High model) | **ALL 21 specialist agents** on engineering, architecture, planning, codebase scouting, debugging, testing, reviewing, security, performance, design, and documentation tasks | **MANDATORY DEFAULT**: Always use `Model: "inherit"` whenever reasoning, code generation, analysis, or review is involved. |
| **`Model: "flash"`** (Latest Flash High) | **Trivial mechanical chores ONLY** (raw log aggregation, simple list formatting, status ping) | Permitted *strictly* when zero architectural or coding judgment is involved. When in doubt, ALWAYS use `Model: "inherit"`. |
| **`Model: "flash_lite"`** | **NONE** | **⛔ STRICTLY FORBIDDEN**: Never use `flash_lite` in BoomOpen workflows. |

---

## ⚡ INTELLIGENT WORK DISTRIBUTION (v5.5)

### 1. Direct Plan-to-Executor Dispatch (No Middleman Double-Hop)
- **Once `PLAN-{feature}.md` exists** in `:fast`, `:hard`, or `/orchestrate` workflows, the **Orchestrator dispatches tasks directly from `PLAN` to the execution specialists** (`backend-engineer`, `frontend-engineer`, `database-architect`, `mobile-engineer`, `game-engineer`, `devops-engineer`).
- **DO NOT** spawn a middleman `tech-lead` sub-agent just to re-read `PLAN` and re-delegate to an engineer.
- **When to Invoke `tech-lead`**:
  1. **Architecture Design & Review**: Complex system architecture decisions (ADR) or `/review:hard` 4-way parallel review.
  2. **Golden Triangle (`:team`)**: Coordinating 3-agent adversarial loops and acting as binding **Arbitrator** on disputes.

### 2. Active Sub-agent Session Registry (`Role → conversationId`) & Warm Reuse
- Every time the Orchestrator spawns a specialist via `invoke_subagent`, record its `conversationId` in the **Active Sub-agent Session Registry**:
  ```yaml
  active_subagents:
    backend-engineer: "<conversation-id-1>"
    frontend-engineer: "<conversation-id-2>"
    tester: "<conversation-id-3>"
    reviewer: "<conversation-id-4>"
  ```
- **Warm Session Reuse Rule (0s Cold-Start, 100% Context Retained)**:
  - For follow-up tasks in the same domain, fix-after-review/test iterations, Golden Triangle debate rounds, or reviving an interrupted sub-agent, **MUST call `send_message(Recipient: conversationId, Message: ...)`** to reuse the warm sub-agent.
  - **NEVER** cold-spawn a duplicate sub-agent with `invoke_subagent` when a warm session for that role already exists (unless intentionally launching a distinct parallel worker).

---

## 📦 STRUCTURED HANDOFF PACKET & FILE OWNERSHIP LOCK

Every `invoke_subagent` prompt or `send_message` task brief in Mode B **MUST** include these 5 structured fields:

```yaml
1. MISSION & ACCEPTANCE CRITERIA:
   - Exact task ID(s) and Given/When/Then criteria from PLAN-{feature}.md (plus original user request).
2. SHARED_CONTRACT (Required when ≥ 2 domains run in parallel):
   - Locked API endpoints, request/response schemas, shared TypeScript interfaces/DTOs, and error formats from PLAN.
3. OWNED_FILES (Write Permitted):
   - Explicit list of files/directories this sub-agent is authorized to create or modify (e.g., src/server/**).
4. READ_ONLY_FILES (Do Not Edit):
   - Files the sub-agent may read for context but MUST NOT modify (prevents parallel write collisions).
5. VERIFICATION & DELIVERABLE:
   - Exact build/test/check commands (`node cli/install.js check <dir>`) and Brain Artifact path (`<appDataDir>\brain\<conversation-id>\`).
```

### 🔒 Parallel Write-Safety Rule
- **Disjoint `OWNED_FILES`** (e.g., `backend-engineer` owns `src/api/**` and `frontend-engineer` owns `src/ui/**`): Launch **in parallel** in a single turn with `Workspace: "inherit"`.
- **Overlapping files**: Execute the prerequisite task sequentially first (e.g., shared types/schema) OR isolate with `Workspace: "branch"`.

---

## TIERED EXECUTION (PROACTIVE SUB-AGENT FIRST GATE)

### 🚫 Anti-Solo-Crawling Rule (MANDATORY)
- If the exact target files are **NOT already known on Turn 1**, OR if a task requires exploring/auditing/reading **`> 2 files`** across the codebase, **NEVER crawl files sequentially in the primary agent!** **IMMEDIATELY spawn parallel subagents on Turn 1** so the parent context window stays 100% clean.

### TIER 1: Proactive Sub-agent First & Mode B Native Delegation (DEFAULT for Exploration, `> 2 files`, `≥ 2 domains`, NL Research/Ideation & `/cmd`)
1. **🚀 Fast Parallel Sub-agents (Turn-1 Zero-Tax Fan-Out — Without `/cmd`)**:
   - Spawn subagents **immediately on Turn 1** with **0 pre-flight rule-file reads**, **0 `define_subagent` overhead**, and **0 mandatory `.md` report clutter**:
     - **Read-only local codebase scouting/grep/mapping**: `invoke_subagent(TypeName: "research", Role: "Codebase Scouter", Model: "inherit", Prompt: ...)`
     - **Parallel code edits, testing, debugging, or live web research (`search_web`)**: `invoke_subagent(TypeName: "self", Role: "Backend Engineer" | "Frontend Engineer" | "QA Tester" | "Deep Researcher", Model: "inherit", Prompt: ...)`
2. **🎻 Mode B Turn-1 Instant Dispatch (Explicit `/cmd`, `:hard`, `:team`, `> 2 files` / `≥ 2 domains`, or NL Research `auto_team`)**:
   - Do **NOT** waste Turn 1 reading `rules/CORE.md` + `rules/PHASES.md` + `rules/AGENTS.md` before spawning subagents! The 5-Field Handoff Packet (`1. MISSION`, `2. SHARED_CONTRACT`, `3. OWNED_FILES`, `4. READ_ONLY_FILES`, `5. VERIFICATION`) is pre-embedded in the entrypoint.
   - Read `commands/{cmd}.md` AND launch Phase 1 sub-agents (`TypeName: "self"`, `Model: "inherit"`) in the **same Turn-1 tool batch**.
   - **⚡ `TypeName: "self"` (0-Turn Fast-Track Default)**: Inherits full write tools + `run_command` + `search_web` immediately without a prior `define_subagent` turn. Never use `TypeName: "research"` when `search_web` or file writing is needed (`TypeName: "research"` is read-only local codebase exploration with `no network access`).
   - If role is already in `active_subagents` registry → `send_message(Recipient: conversationId, Message: packet)` (Warm Session Reuse).
   - Launch independent DAG phases concurrently in a **single turn** and join via **Reactive Async Wakeup** (never poll in a loop).
   - Cross-platform fallback alias: `runSubagent(agent_name, packet)`.
3. **Verify**: Check exit criteria and run `node cli/install.js check <dir>` for code changes.

### TIER 0: Mode A Known-Target Micro-Direct (`≤ 2 Known Files`, `1 Domain`, 0 Exploration Needed, No `/cmd`)
- **When**: Strictly for simple factual Q&A, code explanations, or micro-edits where the **exact 1–2 target files are already known on Turn 1**, AND no `/cmd` workflow was invoked, AND NOT an open-ended research or ideation request.
- **Action**: Primary agent executes, tests, and verifies directly while enforcing **Pragmatic 2-Tier Coding Standards** (Tier 1 strict type/error safety + Tier 2 cohesive structure `~200–350 lines` target, `≤ 400–450` cohesive soft ceiling) and **Persistent Testing & Bug Fixing**.

### TIER 2: EMBODY (Mode B Fallback only on tool error)
1. Log `"⚠️ TIER 2: {reason}"`, read `~/.{TOOL}/skills/boomopen-workflow-kit/agents/{agent}.md` completely, announce `📋 EMBODIED: {agent}`, execute, then exit embodiment.

---

## AGENT CATEGORIES (21 Specialist Agents — Default `Model: "inherit"`)

| Category | Agents | Write Tools | Default Model | Purpose |
|----------|--------|:-----------:|:-------------:|---------|
| **meta** | `tech-lead`, `planner` | `true` (plans/mailboxes) | `inherit` | Architecture, planning, `:team` arbitration (never implement code) |
| **execution** | `backend-engineer`, `frontend-engineer`, `mobile-engineer`, `game-engineer`, `database-architect` | `true` | `inherit` | Direct code & schema implementation from `PLAN` |
| **validation** | `tester`, `reviewer`, `security-engineer`, `performance-engineer`, `debugger` | `true`/`false` | `inherit` | QA, auditing, root-cause debugging |
| **research** | `researcher`, `scouter`, `brainstormer`, `designer` | `true` (artifacts) | `inherit` | Investigation, codebase mapping, UI/UX design specs |
| **support** | `docs-manager`, `devops-engineer`, `business-analyst`, `project-manager`, `reporter` | `true` | `inherit` | Documentation, CI/CD, requirements, reporting |

---

## 🔺 AGENT TEAMS — GOLDEN TRIANGLE (`:team` variant only)

> **LOAD**: `TEAMS.md` for full Golden Triangle protocol. Spawn 3 roles once per phase (`Tech Lead` + `Executor` + `Reviewer`, `Model: "inherit"`) and reuse their warm sessions across debate rounds via `send_message(Recipient: conversationId)`.

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
