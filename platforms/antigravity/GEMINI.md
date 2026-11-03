# ⚡ BoomOpen Workflow Kit v5.5 — GEMINI/ANTIGRAVITY SMART-HYBRID EDITION

> **ZERO-LATENCY ENTRYPOINT**: This file (`GEMINI.md`) is pre-loaded in `<user_rules>` on every turn.
> **DO NOT** read `rules/CORE.md` on Turn 1 for simple tasks. `rules/CORE.md`, `rules/PHASES.md`, `rules/AGENTS.md`, and `rules/TEAMS.md` are **Loaded On Demand** ONLY when **Mode B (Multi-Agent Orchestration)** or an explicit `/cmd` workflow is triggered.

<!-- BOOMOPEN-SETTINGS-START -->
## 🎛️ ACTIVE USER SETTINGS OVERRIDE (Managed via `/settings` & `~/.boomopen/settings.json`)
> **PRECEDENCE**: `1. Explicit Turn Command (/cmd:variant, @fast/@deep/@team)` > `2. Workspace ./.boomopen.json` > `3. Active Settings Below` > `4. Default File Rules`.
- **Active Preset**: `smart-hybrid` | **Execution Mode (`execution.mode`)**: `auto` (`auto` = **Proactive Sub-agent First**: Spawn parallel subagents on Turn 1 via `invoke_subagent(TypeName: "self" | "research")` whenever scope is unknown, requires scouting/audit/research across > 2 files, or spans ≥ 2 domains; use Mode A Direct ONLY for known-target micro-edits ≤ 2 files or simple Q&A; `mode_a` = Force Direct Solo Mode unless `:hard`/`:team`/`/orchestrate`; `mode_b` = Force Multi-Agent Orchestrator; `team` = Force Golden Triangle 3-Agent `:team`)
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

## 🚦 PROACTIVE SUB-AGENT FIRST GATE (TURN-1 ZERO-TAX FAN-OUT, MODE B & MODE A)

### 🚫 Anti-Solo-Crawling Rule (MANDATORY)
- If the exact target files are **NOT already known on Turn 1**, OR if a task requires exploring/auditing/reading **`> 2 files`** across the codebase, **NEVER crawl files sequentially in the primary agent!** **IMMEDIATELY spawn parallel subagents on Turn 1** so the parent context window stays 100% clean.

### 🚀 Fast Parallel Sub-agents (Turn-1 Zero-Tax Fan-Out — Codebase Exploration, Repo Audits, Bug Hunts & Multi-File Fixes without `/cmd`)
- Spawn subagents **immediately on Turn 1** with **0 pre-flight rule-file reads**, **0 `define_subagent` overhead**, and **0 mandatory `.md` report clutter**:
  - **Read-Only Local Codebase Scouting/Grep/Mapping**: `invoke_subagent(TypeName: "research", Role: "Codebase Scouter", Model: "inherit", Prompt: ...)`
  - **Parallel Code Edits, Testing, Debugging, or Live Web Research (`search_web`)**: `invoke_subagent(TypeName: "self", Role: "Backend Engineer" | "Frontend Engineer" | "QA Tester" | "Deep Researcher", Model: "inherit", Prompt: ...)`

### 🎻 MODE B — Strict Multi-Agent Orchestration & Golden Triangle (TIER 1 — Deep Path)
- **When ANY of the following is true**:
  1. User explicitly invokes a BoomOpen workflow command (`/cook`, `/fix`, `/plan:hard`, `/brainstorm:hard`, `/review:team`, `/docs:core`, `/orchestrate`, etc.).
  2. Task spans **`> 2 files`** or **`≥ 2 domains`** (e.g., Database + Backend + Frontend + Security).
  3. Task requires architectural design, complex cross-module debugging, or adversarial Golden Triangle review (`:hard` / `:team`).
  4. **Natural-Language Deep Research, Product/Game/System Ideation, Competitor Analysis, or Architecture Discovery** — whenever the user asks in natural language to research, analyze, or propose an idea/product/architecture (e.g., *"nghiên cứu"*, *"phân tích chuyên sâu"*, *"đánh giá"*, *"khám phá ý tưởng"*, *"đề xuất ý tưởng/đề xuất thêm"*, *"research"*, *"deep dive"*, *"analyze"*, *"brainstorm"*, *"investigate"*, *"audit"*), **EVEN IF 0 code files are modified and no `/cmd` is typed** → MUST activate Mode B and route by default (`workflows.naturalLanguageResearchTrigger = "auto_team"`) to `commands/brainstorm-team.md` (`/brainstorm:team` Golden Triangle), or `commands/brainstorm-hard.md` when configured as `"auto_hard"`, launching parallel subagents (`researcher` + `brainstormer` + `scouter`/domain specialist).
- **Turn-1 Instant Dispatch**: Do **NOT** waste Turn 1 reading `rules/CORE.md` + `rules/PHASES.md` + `rules/AGENTS.md` before spawning subagents! The 5-Field Handoff Packet is pre-embedded below. When `/cmd` is invoked, read `commands/{cmd}.md` AND launch Phase 1 subagents (`TypeName: "self"`, `Model: "inherit"`) in the **same Turn-1 tool batch**, using **DAG-Aware Parallel Fan-Out**, **Direct Plan-to-Executor Dispatch**, **Contract-First Handoffs (`SHARED_CONTRACT` + `OWNED_FILES`)**, and **Warm Sub-agent Session Reuse (`send_message` by `conversationId`)**.

### ⚡ MODE A — Known-Target Micro-Direct (TIER 0 — `≤ 2 Known Files`, `1 Domain`, 0 Exploration Needed, No `/cmd`)
- **When**: Strictly for simple factual Q&A, code explanations, or micro-edits where the **exact 1–2 target files are already known on Turn 1**, 0 exploration is needed, no `/cmd` was invoked, and NOT an open-ended research or ideation request.
- **Action**: Execute, test, and verify directly while enforcing **Pragmatic 2-Tier Coding Standards** and **Persistent Testing & Bug Fixing**.

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
| `/docs`, `/deploy`, `/brainstorm`, `/ask`, `/orchestrate`, `/save`, `/recap`, `/settings` (`/config`) | Load `commands/{cmd}.md` (`commands/settings.md` for `/settings` & `/config`) |

**Variant syntax**: `/docs/core` = `/docs:core` → Load `commands/docs-core.md`
**Team variant baseline**: `:team` is supported where `commands/{cmd}-team.md` exists. Deploy uses specialized variants (`check`, `preview`, `production`, `rollback`).

---

## 🔀 TIERED EXECUTION & INTELLIGENT WORK DISTRIBUTION (v5.5)

| Tier | Mode / Condition | Action |
|------|------------------|--------|
| **TIER 1** | **Proactive Sub-agent First / Mode B** (Unscoped exploration, `> 2 files`, `≥ 2 domains`, NL research, or `/cmd`) | **MUST** spawn sub-agents on Turn 1 (`TypeName: "self"` 0-Turn Fast-Track or `TypeName: "research"` read-only; `Model: "inherit"`) + Direct Plan Dispatch + Warm Session Reuse (`send_message`) |
| **TIER 0** | **Mode A** (`≤ 2 known files`, 1 domain, 0 exploration, no `/cmd`) | Execute, test, and verify directly |
| **TIER 2** | **Mode B** fallback (tool missing/error) | EMBODY agent from `AGENTS` path |

### 🛠️ Antigravity 2.0 Native Sub-agent Primitives & Pre-Embedded 5-Field Handoff Packet (TIER 1)
- **⚡ `TypeName: "self"` (0-Turn Fast-Track Default)**: `invoke_subagent(TypeName: "self", Role: "<specialist>", Model: "inherit", Prompt: ...)` inherits full write tools + `run_command` + `search_web` immediately on Turn 1 without needing a prior `define_subagent` turn!
- **🔍 `TypeName: "research"` (Fast Read-Only Local Codebase Explorer)**: Use `invoke_subagent(TypeName: "research", Role: "Codebase Scouter", Model: "inherit", Prompt: ...)` for fast read-only local codebase scouting/grep (`no network access` — never use for `search_web`).
- **📦 Pre-Embedded 5-Field Handoff Packet (Include in `Prompt`)**: `1. MISSION & ACCEPTANCE CRITERIA` | `2. SHARED_CONTRACT` (API/schema/types when ≥2 domains) | `3. OWNED_FILES` (write lock) | `4. READ_ONLY_FILES` (do not edit) | `5. VERIFICATION & DELIVERABLE`.
- **Direct Plan-to-Executor Dispatch & Warm Session Reuse (`send_message`)**: Dispatch directly from `PLAN` to domain engineers (no `tech-lead` middleman hop) and record `Role → conversationId` to reuse warm sub-agents via `send_message(Recipient: conversationId, Message: ...)`.

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
