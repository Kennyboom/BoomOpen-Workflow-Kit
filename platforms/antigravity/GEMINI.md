# ⚡ BoomOpen Workflow Kit v5.5 — GEMINI/ANTIGRAVITY SMART-HYBRID EDITION

> **ZERO-LATENCY ENTRYPOINT**: This file (`GEMINI.md`) is pre-loaded in `<user_rules>` on every turn.
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

Before taking action, classify the request through this 2-Mode Gate:

### ⚡ MODE A — Direct Execution (TIER 0 — Fast Path, Default for Simple Tasks)
- **When**: Q&A, code explanation, single-domain bug fixes, or clear changes touching **≤ 3 files**, AND no explicit multi-agent slash command (`/cook`, `/fix:hard`, `/cook:team`, `/orchestrate`, etc.) was invoked.
- **Action**: Primary agent executes, tests, and verifies **directly** (0 subagent cold-start latency, 0 extra rule file reads, 0 report file clutter), while enforcing **Pragmatic 2-Tier Coding Standards** and **Persistent Testing & Bug Fixing**.

### 🎻 MODE B — Strict Multi-Agent Orchestration (TIER 1 — Deep Path)
- **When ANY of the following is true**:
  1. User explicitly invokes a BoomOpen workflow command (`/cook`, `/fix`, `/plan:hard`, `/review:team`, `/docs:core`, `/orchestrate`, etc.).
  2. Task spans **> 3 files** or **≥ 2 domains** (e.g., Database + Backend + Frontend + Security).
  3. Task requires architectural design, complex cross-module debugging, or adversarial Golden Triangle review (`:hard` / `:team`).
- **Action**: Activate **Strict Orchestrator Mode**:
  - Load the target command workflow (`commands/{cmd}.md`) and `rules/PHASES.md` / `rules/AGENTS.md` on-demand.
  - **YOU ARE THE ORCHESTRATOR — NOT AN IMPLEMENTER**: Delegate every phase to isolated specialist subagents via Antigravity 2.0 native primitives using **DAG-Aware Parallel Fan-Out**, **Direct Plan-to-Executor Dispatch**, **Contract-First Handoffs (`SHARED_CONTRACT` + `OWNED_FILES`)**, and **Stateful Warm Sub-agent Reuse (`send_message`)**.

---

## 🧠 QUALITY-FIRST MODEL POLICY (`Model: "inherit"` / PRO HIGH DEFAULT)

- **Default (`Model: "inherit"` / Pro High)**: Mandatory for all core engineering, planning, architecture, scouting, debugging, testing, reviewing, security, design, and documentation subagents. Always inherit the user's selected model (`Model: "inherit"` or `"pro"`).
- **Trivial Chores Only (`Model: "flash"` — Latest Flash High)**: Permitted **ONLY** for trivial mechanical chores (raw log aggregation, simple list formatting, status ping). When in doubt, ALWAYS use `Model: "inherit"`.
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

- **Brain Artifacts First (Clean Git Tree)**: Default transient deliverables (`PLAN`, `RESEARCH`, `SCOUT`, `DEBUG`, `TEST`, `REVIEW`, `REPORT`, `MAILBOX`) MUST be written to `<appDataDir>\brain\<conversation-id>\` so they render in the Antigravity UI Artifact pane and keep the Git working tree 100% clean.
- **Workspace Docs**: Only write to `./reports/{topic}/` or `./documents/` when running `/docs` (`/docs:core`, `/docs:business`, `/docs:audit`) or when explicitly requested.

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

## 🔀 TIERED EXECUTION & INTELLIGENT WORK DISTRIBUTION (v5.5)

| Tier | Mode / Condition | Action |
|------|------------------|--------|
| **TIER 0** | **Mode A** (≤ 3 files, 1 domain, no `/cmd`) | Execute, test, and verify directly |
| **TIER 1** | **Mode B** (> 3 files, ≥ 2 domains, or `/cmd`) | **MUST** delegate via Antigravity 2.0 sub-agent tools (DAG Fan-Out + Direct Plan Dispatch + Warm Session Reuse) |
| **TIER 2** | **Mode B** fallback (tool missing/error) | EMBODY agent from `AGENTS` path |

### 🛠️ Antigravity 2.0 Native Sub-agent Primitives & v5.5 Dispatch Rules (TIER 1)
- `define_subagent`: Register specialist agents (`backend-engineer`, `frontend-engineer`, `tester`, `reviewer`, `debugger`, `planner`, `scouter`, `researcher`, etc.) with `EnableWriteTools: true/false`.
- `invoke_subagent`: Spawn isolated sub-agents with `TypeName`, `Role`, `Prompt` (5-field Structured Handoff Packet: `MISSION`, `SHARED_CONTRACT`, `OWNED_FILES`, `READ_ONLY_FILES`, `VERIFICATION`), `Model` (`"inherit"` default; NEVER `"flash_lite"`), and `Workspace` (`inherit`, `branch`, or `share`).
- **Direct Plan-to-Executor Dispatch**: Once `PLAN-{feature}.md` exists in `:fast`, `:hard`, or `/orchestrate`, dispatch tasks **directly** from `PLAN` to domain engineers (`backend-engineer`, `frontend-engineer`, etc.) without a redundant `tech-lead` middleman hop.
- **Stateful Warm Sub-agent Reuse (`send_message`)**: Record each spawned sub-agent's `conversationId` in an **Active Sub-agent Session Registry (`Role → conversationId`)**. Reuse warm sessions via `send_message(Recipient: conversationId, Message: ...)` (0s cold-start, 100% context retained).
- `manage_subagents` & `manage_task`: List, inspect status, or terminate subagents/background tasks.

---

## 📚 ON-DEMAND RULES (`RULES/`) — Load Only in Mode B

| File | Load When |
|------|-----------|
| `CORE.md` | Mode B orchestration laws & deliverable table needed |
| `PHASES.md` | Running multi-phase workflows, DAG Parallel Fan-Out & Contract-First dispatch |
| `AGENTS.md` | Delegating to specialist sub-agents, File Ownership Locks & Warm Reuse |
| `TEAMS.md` | Executing `:team` Golden Triangle adversarial workflows |
| `SKILLS.md` | Resolving niche skills via 2-step lookup (`<skills>` → `compact-index.json` / `skill-seeker`) |
| `ERRORS.md` / `REFERENCE.md` | Error recovery (`E0` warm auto-revive) or fast lookup tables |
