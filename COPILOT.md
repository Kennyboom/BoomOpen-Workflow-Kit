# COPILOT.md — GitHub Copilot Orchestrator Instructions (v5.2 Smart-Hybrid Edition)

> **ZERO-LATENCY ENTRYPOINT**: This file (`COPILOT.md`) is pre-loaded in your global context.
> **DO NOT** read `rules/CORE.md` on Turn 1 for simple tasks. `rules/CORE.md`, `rules/PHASES.md`, `rules/AGENTS.md`, and `rules/TEAMS.md` are **Loaded On Demand** ONLY when **Mode B (Multi-Agent Orchestration)** or an explicit `/cmd` workflow is triggered.

---

## 🚦 SMART COMPLEXITY THRESHOLD GATE (MODE A vs. MODE B)

### ⚡ MODE A — Direct Execution (TIER 0 — Fast Path, Default for Simple Tasks)
- **When**: Q&A, code explanation, single-domain bug fixes, or clear changes touching **≤ 3 files**, AND no explicit multi-agent slash command (`/cook`, `/fix:hard`, `/cook:team`, `/orchestrate`, etc.) was invoked.
- **Action**: Primary agent executes, tests, and verifies **directly** (0 subagent cold-start latency, 0 extra rule file reads, 0 report file clutter), while strictly enforcing **Professional Coding Standards** (≤ 300 lines/file, ≤ 25 lines/fn) and **Persistent Testing & Bug Fixing**.

### 🎻 MODE B — Strict Multi-Agent Orchestration (TIER 1 — Deep Path)
- **When ANY of the following is true**:
  1. User explicitly invokes a BoomOpen workflow command (`/cook`, `/fix`, `/plan:hard`, `/review:team`, `/docs:core`, `/orchestrate`, etc.).
  2. Task spans **> 3 files** or **≥ 2 domains** (e.g., Database + Backend + Frontend + Security).
  3. Task requires architectural design, complex cross-module debugging, or adversarial Golden Triangle review (`:hard` / `:team`).
- **Action**: Activate **Strict Orchestrator Mode** — load the workflow & `rules/PHASES.md` / `rules/AGENTS.md` on-demand, and delegate every phase to isolated specialist subagents.

---

## 📂 PATHS (Use These Exact Paths)

```
COMMANDS = ~/.copilot/skills/boomopen-workflow-kit/commands/
AGENTS   = ~/.copilot/skills/boomopen-workflow-kit/agents/
SKILLS   = ~/.copilot/skills/
RULES    = ~/.copilot/skills/boomopen-workflow-kit/rules/
REPORTS  = ./reports/{topic}/
```

---

## 🌐 LANGUAGE COMPLIANCE

| Context | Language |
|---------|----------|
| Response to user | **Same as user's language** |
| Code & comments | **Always English** |
| Files in `./reports/{topic}/`, `./documents/`, and Artifacts | **Same as user's input language (technical terms in English)** |

---

## 🎯 COMMAND ROUTING (Triggers Mode B)

| Input | Route |
|-------|-------|
| `/cook`, `/fix`, `/plan`, `/debug`, `/test`, `/review`, `/docs`, `/design`, `/deploy`, `/report` | `commands/{cmd}.md` → `commands/{cmd}-{variant}.md` |
| `/brainstorm`, `/ask`, `/code`, `/orchestrate` | `commands/{cmd}.md` |

**Team variant baseline**: `:team` is supported where `commands/{cmd}-team.md` exists. Deploy uses specialized variants (`check`, `preview`, `production`, `rollback`).

---

## 🔀 TIERED EXECUTION

| Tier | Mode / When | Action |
|------|-------------|--------|
| **TIER 0** | **Mode A** (≤ 3 files, 1 domain, no `/cmd`) | Execute, test, and verify directly |
| **TIER 1** | **Mode B** (> 3 files, ≥ 2 domains, or `/cmd`) | **MUST** use sub-agent (`runSubagent` / `invoke_subagent`) |
| **TIER 2** | **Mode B** fallback (tool missing/error) | EMBODY agent from `AGENTS` path |

---

## 📚 LOAD ON DEMAND (Mode B Only)

| Situation | Load from `RULES/` |
|-----------|--------------------|
| Mode B Core Rules | `CORE.md` |
| Running phases | `PHASES.md` |
| Delegating | `AGENTS.md` |
| Team execution | `TEAMS.md` |
| Skill resolution | `SKILLS.md` |
| Error / Quick lookup | `ERRORS.md` / `REFERENCE.md` |
