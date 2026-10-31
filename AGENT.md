# AGENT.md — BoomOpen Workflow Kit Universal Entry Point (v5.5 Smart-Hybrid Edition)

> **ZERO-LATENCY ENTRYPOINT**: This file is pre-loaded in your system rules across all 5 supported platforms.
> **DO NOT** read `rules/CORE.md` on Turn 1 for simple tasks. `rules/CORE.md`, `rules/PHASES.md`, `rules/AGENTS.md`, and `rules/TEAMS.md` are **Loaded On Demand** ONLY when **Mode B (Multi-Agent Orchestration)** or an explicit `/cmd` workflow is triggered.
>
> **Platform Resolution**: antigravity→`.gemini/config`, claude→`.claude`, codex→`.codex`, cursor→`.cursor`, copilot→`.copilot`

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
- **Action**: Activate **Strict Orchestrator Mode** — load the workflow & `rules/PHASES.md` / `rules/AGENTS.md` on-demand, and delegate every phase to isolated specialist subagents using **Quality-First Model Policy (`Model: "inherit"`)**, **DAG Parallel Fan-Out**, **Direct Plan-to-Executor Dispatch**, **Contract-First Handoffs (`SHARED_CONTRACT` + `OWNED_FILES`)**, and **Warm Sub-agent Reuse (`send_message`)**.

---

## 📂 PATHS

```
COMMANDS  = ~/.{TOOL}/skills/boomopen-workflow-kit/commands/
AGENTS    = ~/.{TOOL}/skills/boomopen-workflow-kit/agents/
SKILLS    = ~/.{TOOL}/skills/
LIBRARY   = ~/.{TOOL}/skills_library/
RULES     = ~/.{TOOL}/skills/boomopen-workflow-kit/rules/
ARTIFACTS = <appDataDir>\brain\<conversation-id>\ (Antigravity 2.0 default) | ./reports/{topic}/
```

---

## 🌐 LANGUAGE

| Context | Language |
|---------|----------|
| Response to user | **Same as user's language** |
| Code & comments | **Always English** |
| Artifacts, `./reports/{topic}/`, `./documents/` | **Same as user's input language (technical terms in English)** |

---

## 🎯 COMMAND ROUTING (Triggers Mode B)

| User Input | Route | Workflow File |
|------------|-------|---------------|
| `/cook ...`, `/fix ...`, `/plan ...`, `/debug ...`, `/test ...`, `/review ...`, `/docs ...`, `/design ...`, `/deploy ...`, `/report ...`, `/code ...` | Domain workflow | `commands/{cmd}.md` → `commands/{cmd}-{variant}.md` |
| `/brainstorm ...`, `/ask ...`, `/orchestrate ...`, `/save`, `/recap` | Explore/Query/Multi-agent | `commands/{cmd}.md` |

**Variant syntax**: `/docs/core` = `/docs:core` → Load `commands/docs-core.md`
**Team variant baseline**: `:team` is supported where `commands/{cmd}-team.md` exists. Deploy uses specialized variants (`check`, `preview`, `production`, `rollback`).

---

## 🔀 TIERED EXECUTION

```yaml
TIER_0 (Mode A — ≤ 3 files, single domain, no /cmd):
  - Execute, test, and verify directly with zero sub-agent overhead

TIER_1 (Mode B — MANDATORY when sub-agent tool exists):
  - Antigravity 2.0 Native: define_subagent, invoke_subagent (Model: "inherit"), send_message (Warm Session Reuse + Reactive Async Wakeup)
  - Cross-platform aliases: Task (Claude Code), spawn_agent (Codex), runSubagent (Copilot / Cursor)
  - Context: ISOLATED with 5-field Structured Handoff Packet (MISSION, SHARED_CONTRACT, OWNED_FILES, READ_ONLY_FILES, VERIFICATION)

TIER_2 (Mode B FALLBACK on system error only):
  - Read agent file from AGENTS_PATH and EMBODY agent's thinking protocol
```

---

## 📚 ON-DEMAND LOADING (Mode B Only)

| Situation | Load |
|-----------|------|
| Mode B Core Protocol | `rules/CORE.md` |
| Phase Rules & DAG Fan-Out | `rules/PHASES.md` |
| Agent Delegation & File Ownership Locks | `rules/AGENTS.md` |
| Team Protocol (`:team`) | `rules/TEAMS.md` |
| Skill Lookup (`compact-index.json`) | `rules/SKILLS.md` |
| Error Recovery (`E0`) / Lookup | `rules/ERRORS.md` / `rules/REFERENCE.md` |
