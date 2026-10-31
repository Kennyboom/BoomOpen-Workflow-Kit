# CODEX.md — BoomOpen Workflow Kit Orchestrator for OpenAI Codex (v5.5 Smart-Hybrid Edition)

> **ZERO-LATENCY ENTRYPOINT**: This file (`CODEX.md` / `AGENTS.md`) is pre-loaded in your global context.
> **DO NOT** read `rules/CORE.md` on Turn 1 for simple tasks. `rules/CORE.md`, `rules/PHASES.md`, `rules/AGENTS.md`, and `rules/TEAMS.md` are **Loaded On Demand** ONLY when **Mode B (Multi-Agent Orchestration)** or an explicit `/cmd` workflow is triggered.

---

## 📏 PRAGMATIC 2-TIER CODING STANDARDS & PERSISTENT VERIFICATION (MANDATORY)

### 🛡️ Tier 1 — Strict Quality & Safety Rules (Zero Tolerance):
1. **Single Responsibility**: Each file or function solves **1 clear responsibility**.
2. **NO explicit `any`**: TypeScript MUST use concrete types, `unknown` + Type Guard/Zod, or Generic `<T>`.
3. **NO leftover `console.log` in Production App**: Use a structured logger (`debug/info/warn/error`) in UI/API/Services; remove temporary debug logs. *(Allowed in CLI tools `cli/*.js`, scripts, and test benchmarks).*
4. **Error Handling & Named Constants**: Every async/API boundary MUST have `try/catch` + typed error handling; business/config constants use `SCREAMING_SNAKE_CASE`.
5. **DRY & Clean Imports**: Extract shared logic repeated ≥ 3 times; sort imports (`external → internal → relative`) and remove unused imports.

### 📐 Tier 2 — Flexible Structural Guidelines (Cohesion Over Mechanical Line Cutting):
| Guideline | Soft Target | When to Split (Pragmatic — Anti-Fragmentation) |
|-----------|:-----------:|------------------------------------------------|
| **File length** | **~200–350 lines** *(flexible up to ~400–450 lines)* | Keep intact if serving 1 cohesive responsibility. Split ONLY when exceeding `~450–500` lines **OR** mixing multiple domains. *(Exempt: Test, Schema/Types, CLI, Markdown/Docs).* |
| **Function length** | **~20–40 lines** *(logic)* / **~40–80 lines** *(UI/Handler)* | Extract sub-functions only for reuse (DRY) or an independent step. Never shatter simple sequential logic. |
| **Line width** | **~100–120 chars** | Fully flexible for long strings, URLs, Regex, Tailwind CSS classes, or Markdown tables. |
| **Nesting & Params** | **≤ 3–4 levels** / **≤ 4–5 params** | Prefer Guard Clauses (early returns); use a Config/Options object for multiple optional parameters. |

### 🔄 Persistent Testing & Bug Fixing:
- Never stop after applying an unverified fix. Always run build/typecheck/tests or reproduction commands end-to-end, iteratively fix any new errors, and report only when verified working.

---

## 🚦 SMART COMPLEXITY THRESHOLD GATE (MODE A vs. MODE B)

### ⚡ MODE A — Direct Execution (TIER 0 — Fast Path, Default for Simple Tasks)
- **When**: Q&A, code explanation, single-domain bug fixes, or clear changes touching **≤ 3 files**, AND no explicit multi-agent slash command (`/cook`, `/fix:hard`, `/cook:team`, `/orchestrate`, etc.) was invoked.
- **Action**: Primary agent executes, tests, and verifies **directly** (0 subagent cold-start latency, 0 extra rule file reads, 0 report file clutter), while enforcing **Pragmatic 2-Tier Coding Standards** and **Persistent Testing & Bug Fixing**.

### 🎻 MODE B — Strict Multi-Agent Orchestration (TIER 1 — Deep Path)
- **When ANY of the following is true**:
  1. User explicitly invokes a BoomOpen workflow command (`/cook`, `/fix`, `/plan:hard`, `/review:team`, `/docs:core`, `/orchestrate`, etc.).
  2. Task spans **> 3 files** or **≥ 2 domains** (e.g., Database + Backend + Frontend + Security).
  3. Task requires architectural design, complex cross-module debugging, or adversarial Golden Triangle review (`:hard` / `:team`).
- **Action**: Activate **Strict Orchestrator Mode** — load the workflow & `rules/PHASES.md` / `rules/AGENTS.md` on-demand, and delegate every phase to Codex's 21 native specialist subagents (`~/.codex/config.toml` & `~/.codex/agents/*.toml`) using **Quality-First Model Policy (`Model: "inherit"`)**, **DAG Parallel Fan-Out**, **Direct Plan-to-Executor Dispatch**, **Contract-First Handoffs (`SHARED_CONTRACT` + `OWNED_FILES`)**, and **Warm Sub-agent Reuse**.

---

## 📂 PATHS (Use These Exact Paths)

```
CONFIG   = ~/.codex/config.toml
COMMANDS = ~/.codex/skills/boomopen-workflow-kit/commands/ (also ~/.codex/commands/)
AGENTS   = ~/.codex/skills/boomopen-workflow-kit/agents/   (TOML configs in ~/.codex/agents/)
SKILLS   = ~/.codex/skills/
LIBRARY  = ~/.codex/skills_library/
RULES    = ~/.codex/skills/boomopen-workflow-kit/rules/
REPORTS  = ./reports/{topic}/
```

---

## 🤖 CODEX NATIVE MULTI-AGENT SYSTEM (21 SPECIALISTS)

Codex registers all **21 specialist agents** in `~/.codex/config.toml` (`~/.codex/agents/{name}.toml` + `~/.codex/skills/boomopen-workflow-kit/agents/{name}.md`):
`backend-engineer`, `brainstormer`, `business-analyst`, `database-architect`, `debugger`, `designer`, `devops-engineer`, `docs-manager`, `frontend-engineer`, `game-engineer`, `mobile-engineer`, `performance-engineer`, `planner`, `project-manager`, `reporter`, `researcher`, `reviewer`, `scouter`, `security-engineer`, `tech-lead`, `tester`.

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
| `/cook`, `/fix`, `/plan`, `/debug`, `/test`, `/review`, `/docs`, `/design`, `/deploy`, `/report`, `/code` | `commands/{cmd}.md` → `commands/{cmd}-{variant}.md` |
| `/brainstorm`, `/ask`, `/orchestrate`, `/save`, `/recap` | `commands/{cmd}.md` |

**Variant syntax**: `:hard` → `commands/{cmd}-hard.md` | `:fast` → `commands/{cmd}-fast.md` | `:team` → `commands/{cmd}-team.md` | `/docs/core` = `/docs:core` → `commands/docs-core.md`
**Team variant baseline**: `:team` is supported where `commands/{cmd}-team.md` exists. Deploy uses specialized variants (`check`, `preview`, `production`, `rollback`).

---

## 🔀 TIERED EXECUTION & INTELLIGENT WORK DISTRIBUTION (v5.5)

| Tier | Mode / When | Action |
|------|-------------|--------|
| **TIER 0** | **Mode A** (≤ 3 files, 1 domain, no `/cmd`) | Execute, test, and verify directly |
| **TIER 1** | **Mode B** (> 3 files, ≥ 2 domains, or `/cmd`) | **MUST** spawn native Codex sub-agent (`~/.codex/agents/*.toml`, `Model: "inherit"`) with 5-field Structured Handoff Packet (`MISSION`, `SHARED_CONTRACT`, `OWNED_FILES`, `READ_ONLY_FILES`, `VERIFICATION`), Direct Plan-to-Executor Dispatch, and Warm Session Reuse |
| **TIER 2** | **Mode B** fallback (tool missing/error) | EMBODY agent from `AGENTS` path |

---

## 📚 RULES v5.5 — Load On Demand in Mode B

| File | Purpose |
|------|---------|
| `CORE.md` | Mode B orchestration laws & deliverable paths |
| `PHASES.md` | DAG Parallel Fan-Out, Contract-First dispatch, Direct Plan execution |
| `AGENTS.md` | Tiered execution, Warm Session Reuse, `OWNED_FILES` locks |
| `TEAMS.md` | Golden Triangle team execution protocol (`:team` variants) |
| `SKILLS.md` | Fast 2-step progressive skill resolution (`compact-index.json`) |
| `ERRORS.md` / `REFERENCE.md` | Error recovery (`E0` auto-revive) & quick lookup tables |
