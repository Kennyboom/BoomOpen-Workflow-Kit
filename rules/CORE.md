# ⚡ CORE RULES — SMART-HYBRID ORCHESTRATOR PROTOCOL

> **VERSION**: 5.1 — Antigravity 2.0 Smart-Hybrid Edition | **LOAD**: On-demand when **Mode B** or `/cmd` is triggered | **PURPOSE**: Single source of truth for Multi-Agent Orchestration

---

## 🚦 SMART COMPLEXITY THRESHOLD GATE (MODE A vs. MODE B)

```
┌───────────────────────────────────────────────────────────────────────────────┐
│  ⚡ MODE A — Direct Execution (TIER 0 — Fast Path, Default for Simple Tasks)  │
│  • When: Q&A, code explanation, single-domain bug fixes, or clear changes     │
│    touching ≤ 3 files, AND no explicit /cmd workflow was invoked.             │
│  • Action: Primary agent executes, tests, and verifies DIRECTLY (0 subagent   │
│    cold-start latency, 0 extra rule reads, 0 report file clutter), while      │
│    enforcing Professional Coding Standards (≤ 300 lines/file, ≤ 25 lines/fn)  │
│    and Persistent Testing & Bug Fixing.                                       │
├───────────────────────────────────────────────────────────────────────────────┤
│  🎻 MODE B — Strict Multi-Agent Orchestration (TIER 1 — Deep Path)            │
│  • When ANY of the following is true:                                         │
│    1. User explicitly invokes a workflow command (/cook, /fix, /plan:hard,    │
│       /review:team, /docs:core, /orchestrate, etc.).                          │
│    2. Task spans > 3 files or ≥ 2 domains (e.g., DB + Backend + Frontend).    │
│    3. Task requires architectural design, complex cross-module debugging,     │
│       or adversarial Golden Triangle review (:hard / :team).                  │
│  • Action: Activate Strict Orchestrator Mode — load workflow & PHASES/AGENTS  │
│    on-demand, and delegate every phase to isolated specialist subagents.      │
└───────────────────────────────────────────────────────────────────────────────┘
```

**In Mode B**: **YOU ARE THE ORCHESTRATOR — NOT AN IMPLEMENTER.** Delegate, coordinate, verify, and synthesize across specialist subagents.

---

## 📂 PATHS & BRAIN ARTIFACT ROUTING

```bash
COMMANDS  = ~/.{TOOL}/skills/boomopen-workflow-kit/commands/
AGENTS    = ~/.{TOOL}/skills/boomopen-workflow-kit/agents/
SKILLS    = ~/.{TOOL}/skills/
LIBRARY   = ~/.{TOOL}/skills_library/
RULES     = ~/.{TOOL}/skills/boomopen-workflow-kit/rules/
ARTIFACTS = <appDataDir>\brain\<conversation-id>\ (Antigravity 2.0 default)
REPORTS   = ./reports/{topic}/ (only for /docs or explicit repo export)
```

**Platform Resolution** (replace `{TOOL}` with):
| Platform | `{TOOL}` | Example Path |
|----------|----------|--------------|
| Cursor | `cursor` | `~/.cursor/skills/boomopen-workflow-kit/` |
| GitHub Copilot | `copilot` | `~/.copilot/skills/boomopen-workflow-kit/` |
| Claude Code | `claude` | `~/.claude/skills/boomopen-workflow-kit/` |
| Gemini/Antigravity | `gemini/config` | `~/.gemini/config/skills/boomopen-workflow-kit/` |
| Codex | `codex` | `~/.codex/skills/boomopen-workflow-kit/` |

---

## 🎯 COMMAND ROUTING (Triggers Mode B)

| Input | File |
|-------|------|
| `/cook`, `/cook:hard`, `/cook:team` | `commands/cook.md` → `commands/cook-{variant}.md` |
| `/cook:fast` | `commands/cook-fast.md` (direct) |
| `/fix`, `/plan`, `/debug`, `/test`, `/review`, `/docs`, `/design`, `/deploy`, `/report` | `commands/{cmd}.md` → `commands/{cmd}-{variant}.md` |
| `/brainstorm`, `/ask`, `/code` | `commands/{cmd}.md` → `commands/{cmd}-{variant}.md` |
| `/orchestrate`, `/save`, `/recap` | `commands/orchestrate.md`, `commands/save.md`, `commands/recap.md` |

**Variant syntax**: `/cmd:variant`, `/cmd/variant`, or `/cmd-variant` → `commands/{cmd}-{variant}.md` (e.g., `/docs/core` = `/docs:core` → `commands/docs-core.md`).
**Team variant baseline**: `:team` is supported where `commands/{cmd}-team.md` exists. Deploy uses specialized variants (`check`, `preview`, `production`, `rollback`).

---

## 🔀 TIERED EXECUTION

| Tier | Mode / When | Action |
|------|-------------|--------|
| **TIER 0** | **Mode A** (≤ 3 files, 1 domain, no `/cmd`) | Execute, test, and verify directly |
| **TIER 1** | **Mode B** (> 3 files, ≥ 2 domains, or `/cmd`) | **MUST** use isolated sub-agent delegation |
| **TIER 2** | **Mode B** fallback (tool missing/error) | EMBODY agent (shared context, fallback only) |

### 🛠️ Antigravity 2.0 Native Sub-agent Primitives (TIER 1)
- `define_subagent`: Define specialist agents (`backend-engineer`, `frontend-engineer`, `tester`, `reviewer`, `debugger`, `planner`, `scouter`, `researcher`, etc.) with `EnableWriteTools: true/false`.
- `invoke_subagent`: Launch isolated sub-agents with `TypeName`, `Role`, `Prompt`, `Model` (`inherit`, `flash_lite`, `flash`, `pro`), and `Workspace` (`inherit`, `branch` for git worktree isolation, or `share`).
- `send_message`: Multi-turn communication with running sub-agents by `conversationId`, powered by **Reactive Async Wakeup** (never poll in a loop).
- `manage_subagents` & `manage_task`: List, check status, or terminate subagents/background tasks.
- Cross-platform alias: `runSubagent` (Cursor / Copilot / Claude Code compatibility).

---

## 🌐 LANGUAGE

- Response to user → **Same as user's language**
- Code & comments → **Always English**
- Artifacts (`<appDataDir>\brain\<conversation-id>\`), `./reports/{topic}/`, and `./documents/` → **Same as user's input language (technical terms in English)**

---

## 📜 ORCHESTRATION LAWS

| Law | Rule | Enforcement |
|-----|------|-------------|
| **L1** | Zero-Latency Entry | Platform entrypoint (`GEMINI.md`) is pre-loaded; load `CORE`/`PHASES`/`AGENTS` on-demand for Mode B |
| **L2** | Requirement Integrity | 100% fidelity, zero loss, parse EVERY requirement |
| **L3** | Smart Threshold Gate | Mode A (≤ 3 files, 1 domain) executes directly; Mode B (> 3 files, ≥ 2 domains, `/cmd`) delegates |
| **L4** | Deep Embodiment | When in TIER 1/2, follow agent's Directive + Protocol + Constraints |
| **L5** | Sequential Execution | In Mode B workflows, Phase N completes before Phase N+1 starts |
| **L6** | Language Compliance | Respond in user's lang; code/comments in English; reports/docs/artifacts in user's input lang (technical terms in English) |
| **L7** | Recursive Delegation | In Mode B, Orchestrator & Meta agents coordinate, NEVER implement directly |
| **L8** | Stateful Handoff | Prior deliverables = IMMUTABLE constraints |
| **L9** | Constraint Propagation | scouter→planner→implementer chain locked |
| **L10** | Clean Git Tree | Default transient deliverables go to `<appDataDir>\brain\<conversation-id>\` |

---

## 📁 DELIVERABLES (BRAIN ARTIFACTS FIRST ON ANTIGRAVITY 2.0)

> **Default Rule (Antigravity 2.0)**: Write transient deliverables (`PLAN`, `RESEARCH`, `SCOUT`, `DEBUG`, `TEST`, `MAILBOX`) to `<appDataDir>\brain\<conversation-id>\` so they render in the UI Artifact pane and keep the Git working tree 100% clean.
> **Workspace Rule**: Only write to `./reports/{topic}/` or `./documents/` when running `/docs` (`/docs:core`) or when the user explicitly requests committing reports into the repository.

| Agent | Antigravity 2.0 Brain Artifact Default | Workspace Path (Only on `/docs` or Explicit Export) |
|-------|----------------------------------------|-----------------------------------------------------|
| brainstormer | `<appDataDir>\brain\<conversation-id>\BRAINSTORM-{feature}.md` | `./reports/{topic}/brainstorms/BRAINSTORM-{feature}.md` |
| researcher | `<appDataDir>\brain\<conversation-id>\RESEARCH-{feature}.md` | `./reports/{topic}/researchers/RESEARCH-{feature}.md` |
| scouter | `<appDataDir>\brain\<conversation-id>\SCOUT-{feature}.md` | `./reports/{topic}/scouts/SCOUT-{feature}.md` |
| designer | `<appDataDir>\brain\<conversation-id>\DESIGN-{feature}.md` | `./reports/{topic}/designs/DESIGN-{feature}.md` |
| planner | `<appDataDir>\brain\<conversation-id>\PLAN-{feature}.md` | `./reports/{topic}/plans/PLAN-{feature}.md` |
| reporter | `<appDataDir>\brain\<conversation-id>\REPORT-{type}-{date}.md` | `./reports/{topic}/general/REPORT-{type}-{date}.md` |
| debugger | `<appDataDir>\brain\<conversation-id>\DEBUG-{issue}.md` | `./reports/{topic}/debugs/DEBUG-{issue}.md` |
| tester | `<appDataDir>\brain\<conversation-id>\TEST-{feature}.md` | `./reports/{topic}/tests/TEST-{feature}.md` |
| business-analyst | `<appDataDir>\brain\<conversation-id>\REQ-{feature}.md` | `./reports/{topic}/requirements/REQ-{feature}.md` |
| performance-engineer | `<appDataDir>\brain\<conversation-id>\PERF-{component}.md` | `./reports/{topic}/performance/PERF-{component}.md` |

---

## 📚 LOAD ON DEMAND (Mode B Only)

| Situation | Load |
|-----------|------|
| Running phases | `PHASES.md` |
| Delegating to agent | `AGENTS.md` |
| Team collaboration (`:team`) | `TEAMS.md` |
| Skill resolution | `SKILLS.md` |
| Error occurred / Quick lookup | `ERRORS.md` / `REFERENCE.md` |
