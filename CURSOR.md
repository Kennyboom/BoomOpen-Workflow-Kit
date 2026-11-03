# CURSOR.md — Cursor Orchestrator Instructions (v5.5 Smart-Hybrid Edition)

> **ZERO-LATENCY ENTRYPOINT**: This file (`CURSOR.md`) is pre-loaded in your global context.
> **DO NOT** read `rules/CORE.md` on Turn 1 for simple tasks. `rules/CORE.md`, `rules/PHASES.md`, `rules/AGENTS.md`, and `rules/TEAMS.md` are **Loaded On Demand** ONLY when **Mode B (Multi-Agent Orchestration)** or an explicit `/cmd` workflow is triggered.

<!-- BOOMOPEN-SETTINGS-START -->
## 🎛️ ACTIVE USER SETTINGS OVERRIDE (Managed via `/settings` & `~/.boomopen/settings.json`)
> **PRECEDENCE**: `1. Explicit Turn Command (/cmd:variant, @fast/@deep/@team)` > `2. Workspace ./.boomopen.json` > `3. Active Settings Below` > `4. Default File Rules`.
- **Active Preset**: `smart-hybrid` | **Execution Mode (`execution.mode`)**: `auto` (`auto` = Mode A when `≤ 3 files` & `1 domain`, else Mode B; `mode_a` = Force Direct Solo Mode unless `:hard`/`:team`/`/orchestrate`; `mode_b` = Force Multi-Agent Orchestrator; `team` = Force Golden Triangle 3-Agent `:team`)
- **Workflows**: `defaultVariant = auto` (`auto`|`fast`|`hard`|`team`|`ask`) | `naturalLanguageResearchTrigger = auto_team` (`auto_team` routes NL research/ideation to `/brainstorm:team` Golden Triangle | `auto_hard` → `/brainstorm:hard` | `ask_first` | `off`)
- **Intelligence & Research**: `models.subagentPolicy = quality_first` (`inherit` Pro High default; never `flash_lite`) | `research.depth = 5_lens_deep` | `clarification.style = autonomous_first` | `teams.maxDebateRounds = 3`
- **Standards & Verification**: `codingStandards.preset = pragmatic` (Soft `400` / Hard `500` lines, `forbidExplicitAny = true`, `warnConsoleLog = true`) | `verification.level = strict_e2e`
- **Deliverables & Language**: `deliverables.routing = brain_artifacts` (`<appDataDir>\brain\<conversation-id>\` default) | `language.response = auto`
<!-- BOOMOPEN-SETTINGS-END -->

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
  4. **Natural-Language Deep Research, Product/Game/System Ideation, Competitor Analysis, or Architecture Discovery** (*"nghiên cứu"*, *"phân tích"*, *"khám phá ý tưởng"*, *"đề xuất ý tưởng"*, *"research"*, *"deep dive"*, *"brainstorm"*, *"audit"*) — EVEN IF 0 code files are modified and no `/cmd` is typed → route by default (`naturalLanguageResearchTrigger = "auto_team"`) to `commands/brainstorm-team.md` (`/brainstorm:team` Golden Triangle), or `commands/brainstorm-hard.md` when `"auto_hard"`.
- **Action**: Activate **Strict Orchestrator Mode** — load the workflow & `rules/PHASES.md` / `rules/AGENTS.md` on-demand, and delegate every phase to isolated specialist subagents (`~/.cursor/agents/*.md`) using **Quality-First Model Policy (`Model: "inherit"`)**, **DAG Parallel Fan-Out**, **Direct Plan-to-Executor Dispatch**, **Contract-First Handoffs (`SHARED_CONTRACT` + `OWNED_FILES`)**, and **Warm Sub-agent Reuse**.

---

## 📂 PATHS (Use These Exact Paths)

```
COMMANDS = ~/.cursor/skills/boomopen-workflow-kit/commands/ (also ~/.cursor/commands/)
AGENTS   = ~/.cursor/skills/boomopen-workflow-kit/agents/   (also ~/.cursor/agents/)
SKILLS   = ~/.cursor/skills/
LIBRARY  = ~/.cursor/skills_library/
RULES    = ~/.cursor/skills/boomopen-workflow-kit/rules/
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
| `/cook`, `/fix`, `/plan`, `/debug`, `/test`, `/review`, `/docs`, `/design`, `/deploy`, `/report`, `/code` | `commands/{cmd}.md` → `commands/{cmd}-{variant}.md` |
| `/brainstorm`, `/ask`, `/orchestrate`, `/save`, `/recap`, `/settings` (`/config`) | `commands/{cmd}.md` (`commands/settings.md` for `/settings` & `/config`) |

**Variant syntax**: `/docs/core` = `/docs:core` → Load `commands/docs-core.md`
**Team variant baseline**: `:team` is supported where `commands/{cmd}-team.md` exists. Deploy uses specialized variants (`check`, `preview`, `production`, `rollback`).

---

## 🔀 TIERED EXECUTION & INTELLIGENT WORK DISTRIBUTION (v5.5)

| Tier | Mode / When | Action |
|------|-------------|--------|
| **TIER 0** | **Mode A** (≤ 3 files, 1 domain, no `/cmd`) | Execute, test, and verify directly |
| **TIER 1** | **Mode B** (> 3 files, ≥ 2 domains, or `/cmd`) | **MUST** use sub-agent (`runSubagent` / `invoke_subagent`, `Model: "inherit"`) with 5-field Structured Handoff Packet (`MISSION`, `SHARED_CONTRACT`, `OWNED_FILES`, `READ_ONLY_FILES`, `VERIFICATION`), Direct Plan-to-Executor Dispatch, and Warm Session Reuse |
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
