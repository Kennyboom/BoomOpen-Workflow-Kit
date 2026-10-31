# CLAUDE.md — Claude Code Orchestrator Instructions (v5.3 Smart-Hybrid Edition)

> **ZERO-LATENCY ENTRYPOINT**: This file (`CLAUDE.md`) is pre-loaded in your global context.
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
- **Action**: Activate **Strict Orchestrator Mode** — load the workflow & `rules/PHASES.md` / `rules/AGENTS.md` on-demand, and delegate every phase to isolated specialist subagents using **DAG Parallel Fan-Out**, **Direct Plan-to-Executor Dispatch**, and **Contract-First Handoffs (`SHARED_CONTRACT` + `OWNED_FILES`)**.

---

## 📂 PATHS (Use These Exact Paths)

```
COMMANDS = ~/.claude/skills/boomopen-workflow-kit/commands/
AGENTS   = ~/.claude/skills/boomopen-workflow-kit/agents/
SKILLS   = ~/.claude/skills/
RULES    = ~/.claude/skills/boomopen-workflow-kit/rules/
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
| `/brainstorm`, `/ask`, `/code`, `/orchestrate`, `/save`, `/recap` | `commands/{cmd}.md` |

**Variant syntax**: `/docs/core` = `/docs:core` → Load `commands/docs-core.md`
**Team variant baseline**: `:team` is supported where `commands/{cmd}-team.md` exists. Deploy uses specialized variants (`check`, `preview`, `production`, `rollback`).

---

## 🔀 TIERED EXECUTION

| Tier | Mode / When | Action |
|------|-------------|--------|
| **TIER 0** | **Mode A** (≤ 3 files, 1 domain, no `/cmd`) | Execute, test, and verify directly |
| **TIER 1** | **Mode B** (> 3 files, ≥ 2 domains, or `/cmd`) | **MUST** use sub-agent (`invoke_subagent` / `runSubagent`) with 5-field Structured Handoff Packet |
| **TIER 2** | **Mode B** fallback (tool missing/error) | EMBODY agent from `AGENTS` path |

---

## 📚 RULES v5.3 — Load On Demand in Mode B

| File | Purpose |
|------|---------|
| `CORE.md` | Mode B orchestration laws & deliverable paths |
| `PHASES.md` | DAG Parallel Fan-Out, Contract-First dispatch, Direct Plan execution |
| `AGENTS.md` | Tiered execution, Warm Session Reuse, `OWNED_FILES` locks |
| `TEAMS.md` | Golden Triangle team execution protocol (`:team` variants) |
| `SKILLS.md` | Fast 2-step progressive skill resolution |
| `ERRORS.md` / `REFERENCE.md` | Error recovery & quick lookup tables |
