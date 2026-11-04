# AGENT.md — BoomOpen Workflow Kit Universal Entry Point (v5.5 Smart-Hybrid Edition)

> **ZERO-LATENCY ENTRYPOINT**: This file is pre-loaded in your system rules across all 5 supported platforms.
> **DO NOT** read `rules/CORE.md` on Turn 1 for simple tasks. `rules/CORE.md`, `rules/PHASES.md`, `rules/AGENTS.md`, and `rules/TEAMS.md` are **Loaded On Demand** ONLY when **Mode B (Multi-Agent Orchestration)** or an explicit `/cmd` workflow is triggered.
>
> **Platform Resolution**: antigravity→`.gemini/config`, claude→`.claude`, codex→`.codex`, cursor→`.cursor`, copilot→`.copilot`

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
  1. User explicitly invokes a BoomOpen workflow command (`/cook`, `/fix`, `/plan:hard`, `/review:team`, `/docs:core`, `/orchestrate`, etc.).
  2. Task spans **`> 2 files`** or **`≥ 2 domains`** (e.g., Database + Backend + Frontend + Security).
  3. Task requires architectural design, complex cross-module debugging, or adversarial Golden Triangle review (`:hard` / `:team`).
  4. **Natural-Language Deep Research, Technical/Documentation Investigation, Competitor Analysis, or Architecture/Product Discovery** (*"nghiên cứu"*, *"tìm hiểu sâu"*, *"phân tích chuyên sâu"*, *"đánh giá"*, *"khám phá ý tưởng"*, *"đề xuất ý tưởng"*, *"research"*, *"deep dive"*, *"analyze"*, *"investigate"*, *"brainstorm"*, *"audit"*) — EVEN IF 0 code files are modified and no `/cmd` is typed → route by default (`naturalLanguageResearchTrigger = "auto_team"`) to `commands/research-team.md` (`/research:team`) or `commands/brainstorm-team.md` (`/brainstorm:team` when ideation/brainstorming is requested), or `commands/research-hard.md` / `commands/brainstorm-hard.md` when `"auto_hard"`. (⚠️ Always use `TypeName: "self"` for `researcher`/`research-team` and `scouter` writing `SCOUT-*.md`; `TypeName: "research"` has NO `search_web` and NO `write_file`).
- **Turn-1 Instant Dispatch**: Do **NOT** waste Turn 1 reading `rules/CORE.md` + `rules/PHASES.md` + `rules/AGENTS.md` before spawning subagents! The 5-Field Handoff Packet (`1. MISSION`, `2. SHARED_CONTRACT`, `3. OWNED_FILES`, `4. READ_ONLY_FILES`, `5. VERIFICATION`) is pre-embedded below. Read `commands/{cmd}.md` AND launch Phase 1 subagents (`TypeName: "self"`, `Model: "inherit"`) in the **same Turn-1 tool batch**, using **DAG Parallel Fan-Out**, **Direct Plan-to-Executor Dispatch**, and **Warm Sub-agent Reuse (`send_message`)**.

### ⚡ MODE A — Known-Target Micro-Direct (TIER 0 — `≤ 2 Known Files`, `1 Domain`, 0 Exploration Needed, No `/cmd`)
- **When**: Strictly for simple Q&A, code explanations, or micro-edits where the **exact 1–2 target files are already known on Turn 1**, 0 exploration is needed, and no `/cmd` was invoked.
- **Action**: Execute, test, and verify directly while enforcing **Pragmatic 2-Tier Coding Standards** and **Persistent Testing & Bug Fixing**.

---

## 🧠 QUALITY-FIRST MODEL POLICY (`Model: "inherit"` / PRO HIGH DEFAULT)

- **Default (`Model: "inherit"` / Pro High)**: Mandatory for all core engineering, planning, architecture, scouting, debugging, testing, reviewing, security, design, and documentation subagents.
- **Trivial Chores Only (`Model: "flash"`)**: Permitted **ONLY** for trivial mechanical chores. **NEVER use `flash_lite`**.

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
| `/cook ...`, `/fix ...`, `/plan ...`, `/debug ...`, `/test ...`, `/review ...`, `/docs ...`, `/design ...`, `/deploy ...`, `/report ...`, `/research ...`, `/code ...` | Domain workflow | `commands/{cmd}.md` → `commands/{cmd}-{variant}.md` |
| `/brainstorm ...`, `/ask ...`, `/orchestrate ...`, `/save`, `/recap`, `/settings` (`/config`) | Explore/Query/Multi-agent/Settings | `commands/{cmd}.md` (`commands/settings.md` for `/settings` & `/config`) |

**Variant syntax**: `/docs/core` = `/docs:core` → Load `commands/docs-core.md`
**Team variant baseline**: `:team` is supported where `commands/{cmd}-team.md` exists. Deploy uses specialized variants (`check`, `preview`, `production`, `rollback`).

---

## 🔀 TIERED EXECUTION

```yaml
TIER_1 (Proactive Sub-agent First / Mode B — MANDATORY for exploration, > 2 files, ≥ 2 domains, NL research, or /cmd):
  - Antigravity 2.0 0-Turn Fast-Track: invoke_subagent(TypeName: "self", Role: "<specialist>", Model: "inherit") inherits full write + run_command + search_web immediately; TypeName: "research" for read-only local codebase scouting (no network access); send_message for Warm Session Reuse
  - Cross-platform aliases: Task (Claude Code), spawn_agent (Codex), runSubagent (Copilot / Cursor)
  - Pre-Embedded 5-Field Handoff Packet: 1. MISSION & ACCEPTANCE CRITERIA | 2. SHARED_CONTRACT | 3. OWNED_FILES | 4. READ_ONLY_FILES | 5. VERIFICATION & DELIVERABLE

TIER_0 (Mode A — ≤ 2 known files, single domain, 0 exploration needed, no /cmd):
  - Execute, test, and verify directly

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
| Skill Lookup (`1,460+` library / `1,470` indexed in `compact-index.json`) | `rules/SKILLS.md` |
| Error Recovery (`E0`) / Lookup | `rules/ERRORS.md` / `rules/REFERENCE.md` |
