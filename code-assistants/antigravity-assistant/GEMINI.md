# ⚡ BoomOpen Workflow Kit v5.2 — GEMINI/ANTIGRAVITY SMART-HYBRID EDITION

> **ZERO-LATENCY ENTRYPOINT**: This file (`GEMINI.md`) is pre-loaded in `<user_rules>` on every turn.
> **DO NOT** read `rules/CORE.md` on Turn 1 for simple tasks. `rules/CORE.md`, `rules/PHASES.md`, `rules/AGENTS.md`, and `rules/TEAMS.md` are **Loaded On Demand** ONLY when **Mode B (Multi-Agent Orchestration)** or an explicit `/cmd` workflow is triggered.

---

## 🚦 SMART COMPLEXITY THRESHOLD GATE (MODE A vs. MODE B)

Before taking action, classify the request through this 2-Mode Gate:

### ⚡ MODE A — Direct Execution (TIER 0 — Fast Path, Default for Simple Tasks)
- **When**: Q&A, code explanation, single-domain bug fixes, or clear changes touching **≤ 3 files**, AND no explicit multi-agent slash command (`/cook`, `/fix:hard`, `/cook:team`, `/orchestrate`, etc.) was invoked.
- **Action**: Primary agent executes, tests, and verifies **directly** (0 subagent cold-start latency, 0 extra rule file reads, 0 report file clutter), while strictly enforcing **Professional Coding Standards** (≤ 300 lines/file, ≤ 25 lines/fn) and **Persistent Testing & Bug Fixing**.

### 🎻 MODE B — Strict Multi-Agent Orchestration (TIER 1 — Deep Path)
- **When ANY of the following is true**:
  1. User explicitly invokes a BoomOpen workflow command (`/cook`, `/fix`, `/plan:hard`, `/review:team`, `/docs:core`, `/orchestrate`, etc.).
  2. Task spans **> 3 files** or **≥ 2 domains** (e.g., Database + Backend + Frontend + Security).
  3. Task requires architectural design, complex cross-module debugging, or adversarial Golden Triangle review (`:hard` / `:team`).
- **Action**: Activate **Strict Orchestrator Mode**:
  - Load the target command workflow (`commands/{cmd}.md`) and `rules/PHASES.md` / `rules/AGENTS.md` on-demand.
  - **YOU ARE THE ORCHESTRATOR — NOT AN IMPLEMENTER**: Delegate every phase to isolated specialist subagents via Antigravity 2.0 native primitives, using **DAG-Aware Parallel Fan-Out** for independent phases.

---

## 🧠 QUALITY-FIRST MODEL POLICY (`Model: "inherit"` / PRO HIGH DEFAULT)

- **Default (`Model: "inherit"` / Pro High)**: Mandatory for all core engineering, planning, architecture, scouting, debugging, testing, reviewing, security, design, and documentation subagents. Always inherit the user's selected model (`Model: "inherit"` or `"pro"`) to prevent any drop in reasoning or code quality.
- **Trivial Chores Only (`Model: "flash"` — Latest Flash High)**: Permitted **ONLY** for trivial mechanical chores (raw log aggregation, simple list formatting, status ping) that require zero architectural or coding judgment. When in doubt, ALWAYS use `Model: "inherit"`.
- **Forbidden (`flash_lite`)**: **NEVER use `flash_lite`** in any BoomOpen workflow.

---

## 📂 PATHS & ARTIFACT ROUTING (ANTIGRAVITY 2.0)

```
COMMANDS  = ~/.gemini/config/skills/boomopen-workflow-kit/commands/
AGENTS    = ~/.gemini/config/skills/boomopen-workflow-kit/agents/
SKILLS    = ~/.gemini/config/skills/
LIBRARY   = ~/.gemini/config/skills_library/
RULES     = ~/.gemini/config/skills/boomopen-workflow-kit/rules/
ARTIFACTS = <appDataDir>\brain\<conversation-id>\
```

- **Brain Artifacts First (Clean Git Tree)**: Default transient deliverables (`PLAN`, `RESEARCH`, `SCOUT`, `DEBUG`, `TEST`, `REVIEW`, `REPORT`, `MAILBOX`) MUST be written to the conversation's native **Brain Artifact Directory** (`<appDataDir>\brain\<conversation-id>\`) so they render in the Antigravity UI Artifact pane and keep the project's Git working tree 100% clean.
- **Workspace Docs**: Only write to `./reports/{topic}/` or `./documents/` in the project workspace when running `/docs` (`/docs:core`, `/docs:business`, `/docs:audit`) or when the user explicitly asks to commit reports into the repository.

---

## 🌐 LANGUAGE

| Context | Language |
|---------|----------|
| Response to user | **Same as user's language** |
| Code & comments | **Always English** |
| Artifacts, `./reports/{topic}/`, `./documents/` | **Same as user's input language (technical terms in English)** |

---

## 🎯 COMMAND ROUTING (Triggers Mode B)

| Input | Action |
|-------|--------|
| `/cook`, `/cook:hard`, `/cook:fast`, `/cook:team` | Load `commands/cook.md` → route to `commands/cook-{variant}.md` |
| `/fix`, `/fix:hard`, `/fix:fast`, `/fix:team` | Load `commands/fix.md` → route to `commands/fix-{variant}.md` |
| `/plan`, `/debug`, `/test`, `/review`, `/design`, `/report`, `/code` | Load `commands/{cmd}.md` → route to `commands/{cmd}-{variant}.md` |
| `/docs`, `/deploy`, `/brainstorm`, `/ask`, `/orchestrate`, `/save`, `/recap` | Load `commands/{cmd}.md` |

**Variant syntax**: `/docs/core` = `/docs:core` → Load `commands/docs-core.md`
**Team variant baseline**: `:team` is supported where `commands/{cmd}-team.md` exists. Deploy uses specialized variants (`check`, `preview`, `production`, `rollback`).

---

## 🔀 TIERED EXECUTION & NATIVE SUB-AGENT PRIMITIVES

| Tier | Mode / Condition | Action |
|------|------------------|--------|
| **TIER 0** | **Mode A** (≤ 3 files, 1 domain, no `/cmd`) | Execute, test, and verify directly |
| **TIER 1** | **Mode B** (> 3 files, ≥ 2 domains, or `/cmd`) | **MUST** delegate via Antigravity 2.0 sub-agent tools (with DAG Parallel Fan-Out) |
| **TIER 2** | **Mode B** fallback (tool missing/error) | EMBODY agent from `AGENTS` path |

### 🛠️ Antigravity 2.0 Native Sub-agent Primitives (TIER 1)
- `define_subagent`: Register specialist agents (`backend-engineer`, `frontend-engineer`, `tester`, `reviewer`, `debugger`, `planner`, `scouter`, `researcher`, etc.) with `EnableWriteTools: true/false`.
- `invoke_subagent`: Spawn isolated sub-agents with `TypeName`, `Role`, `Prompt`, `Model` (`"inherit"` / `"pro"` default; `"flash"` for trivial chores only; NEVER `"flash_lite"`), and `Workspace` (`inherit`, `branch` for git worktree isolation, or `share`). Launch independent phases concurrently in a single turn.
- `send_message`: Multi-turn communication with running sub-agents by `conversationId`, powered by **Reactive Async Wakeup** (never poll in a loop).
- `manage_subagents` & `manage_task`: List, inspect status, or terminate subagents/background tasks.
- Cross-platform alias: `runSubagent` (Cursor / Copilot / Claude Code compatibility).

---

## 📚 ON-DEMAND RULES (`RULES/`) — Load Only in Mode B

| File | Load When |
|------|-----------|
| `CORE.md` | Mode B orchestration laws & deliverable table needed |
| `PHASES.md` | Running multi-phase workflows, DAG Parallel Fan-Out & chunked deliverables |
| `AGENTS.md` | Delegating to specialist sub-agents & Quality-First Model Policy |
| `TEAMS.md` | Executing `:team` Golden Triangle adversarial workflows |
| `SKILLS.md` | Resolving niche skills via 2-step lookup (`<skills>` → `compact-index.json` / `skill-seeker`) |
| `ERRORS.md` / `REFERENCE.md` | Error recovery or fast lookup tables |
