# ⚡ CORE RULES — SMART-HYBRID ORCHESTRATOR PROTOCOL

> **VERSION**: 5.5 — Antigravity 2.0 Smart-Hybrid Edition | **LOAD**: On-demand when **Mode B** or `/cmd` is triggered | **PURPOSE**: Single source of truth for Multi-Agent Orchestration & Pragmatic 2-Tier Coding Standards

---

## 🚦 PROACTIVE SUB-AGENT FIRST GATE (TURN-1 ZERO-TAX FAN-OUT, MODE B & MODE A)

```
┌───────────────────────────────────────────────────────────────────────────────┐
│  🚫 ANTI-SOLO-CRAWLING RULE (MANDATORY)                                       │
│  • If the exact target files are NOT already known on Turn 1, OR if a task    │
│    requires exploring/auditing/reading > 2 files across the codebase, NEVER   │
│    crawl files sequentially in the primary agent! IMMEDIATELY spawn parallel  │
│    subagents on Turn 1 so the parent context window stays 100% clean.         │
├───────────────────────────────────────────────────────────────────────────────┤
│  🚀 FAST PARALLEL SUB-AGENTS (Turn-1 Zero-Tax Fan-Out — Without /cmd)         │
│  • For Codebase Exploration, Repo Audits, Bug Hunts & Multi-File Fixes:       │
│    Spawn subagents immediately on Turn 1 with 0 pre-flight rule-file reads,   │
│    0 `define_subagent` overhead, and 0 mandatory `.md` report clutter:        │
│    - Read-only local codebase scouting/grep/mapping:                          │
│      `invoke_subagent(TypeName: "research", Role: "Codebase Scouter",         │
│      Model: "inherit", Prompt: ...)`                                          │
│    - Parallel code edits, testing, debugging, or live web research:           │
│      `invoke_subagent(TypeName: "self", Role: "Backend Engineer" |            │
│      "Frontend Engineer" | "QA Tester" | "Deep Researcher", Model: "inherit")`│
├───────────────────────────────────────────────────────────────────────────────┤
│  🎻 MODE B — Strict Multi-Agent Orchestration & Golden Triangle (TIER 1)      │
│  • When ANY of the following is true:                                         │
│    1. User explicitly invokes a workflow command (/cook, /fix, /plan:hard,    │
│       /brainstorm:hard, /review:team, /docs:core, /orchestrate, etc.).        │
│    2. Task spans > 2 files or ≥ 2 domains (e.g., DB + Backend + Frontend).    │
│    3. Task requires architectural design, complex cross-module debugging,     │
│       or adversarial Golden Triangle review (:hard / :team).                  │
│    4. Natural-Language Deep Research, Technical/Documentation Investigation,  │
│       Competitor Analysis, or Architecture/Product Discovery ("nghiên cứu",   │
│       "tìm hiểu sâu", "phân tích chuyên sâu", "đánh giá", "khám phá ý tưởng", │
│       "đề xuất ý tưởng", "research", "deep dive", "analyze", "investigate",   │
│       "brainstorm", "audit") — EVEN IF 0 code files are modified and no       │
│       /cmd is typed → route by default (`naturalLanguageResearchTrigger =     │
│       "auto_team"`) to `commands/research-team.md` (`/research:team`) or      │
│       `commands/brainstorm-team.md` (`/brainstorm:team` when ideation is      │
│       requested), or `commands/research-hard.md` / `brainstorm-hard.md`       │
│       when `"auto_hard"`.                                                     │
│  • Turn-1 Instant Dispatch: Do NOT waste Turn 1 reading `rules/CORE.md` +     │
│    `rules/PHASES.md` + `rules/AGENTS.md` before spawning subagents! The       │
│    5-Field Handoff Packet (`1. MISSION`, `2. SHARED_CONTRACT`,                │
│    `3. OWNED_FILES`, `4. READ_ONLY_FILES`, `5. VERIFICATION`) is pre-embedded │
│    in the entrypoint. Read `commands/{cmd}.md` AND launch Phase 1 subagents   │
│    (`TypeName: "self"`, `Model: "inherit"`) in the same Turn-1 tool batch.    │
├───────────────────────────────────────────────────────────────────────────────┤
│  ⚡ MODE A — Known-Target Micro-Direct (TIER 0 — ≤ 2 Known Files, 1 Domain)   │
│  • Strictly for simple Q&A, code explanations, or micro-edits where the       │
│    exact 1–2 target files are already known on Turn 1, 0 exploration needed,  │
│    no `/cmd` invoked, and NOT a research/ideation request.                    │
│  • Action: Execute, test, and verify directly while enforcing Pragmatic       │
│    2-Tier Coding Standards and Persistent Testing & Bug Fixing.               │
└───────────────────────────────────────────────────────────────────────────────┘
```

**In Mode B**: **YOU ARE THE ORCHESTRATOR — NOT AN IMPLEMENTER.** Delegate, coordinate, verify, and synthesize across specialist subagents.

---

## 🧠 QUALITY-FIRST MODEL POLICY (`Model: "inherit"` / PRO HIGH DEFAULT)

| Tier / Task Type | Allowed `Model` Parameter | Rule |
|------------------|---------------------------|------|
| **Core Engineering, Architecture, Planning, Scouting, Debugging, Testing, Reviewing, Security, Design, Docs** | `Model: "inherit"` (or `"pro"`) | **MANDATORY DEFAULT**: Always inherit the user's selected Pro High model so quality never drops. |
| **Trivial Mechanical Chores Only** (raw log aggregation, simple list formatting, status ping) | `Model: "flash"` (Latest Flash High) | Permitted **strictly** when zero architectural or coding reasoning is needed. When in doubt, use `"inherit"`. |
| **Low-Tier Model (`flash_lite`)** | **⛔ FORBIDDEN** | **NEVER use `flash_lite`** in any BoomOpen workflow. |

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
| `/fix`, `/plan`, `/debug`, `/test`, `/review`, `/docs`, `/design`, `/deploy`, `/report`, `/research` | `commands/{cmd}.md` → `commands/{cmd}-{variant}.md` |
| `/brainstorm`, `/ask`, `/code` | `commands/{cmd}.md` → `commands/{cmd}-{variant}.md` |
| `/orchestrate`, `/save`, `/recap` | `commands/orchestrate.md`, `commands/save.md`, `commands/recap.md` |
| `/settings`, `/config` | `commands/settings.md` (Unified Settings & Control Center: `ask_question` UI, CLI & `--ui` Web Dashboard) |

**Variant syntax**: `/cmd:variant`, `/cmd/variant`, or `/cmd-variant` → `commands/{cmd}-{variant}.md` (e.g., `/docs/core` = `/docs:core` → `commands/docs-core.md`).

---

## 🔀 TIERED EXECUTION, DIRECT DISPATCH & WARM SUB-AGENT REUSE

| Tier | Mode / When | Action |
|------|-------------|--------|
| **TIER 1** | **Proactive Sub-agent First / Mode B** (Unscoped exploration, `> 2 files`, `≥ 2 domains`, NL research/ideation, or `/cmd`) | **MUST** spawn parallel sub-agents on Turn 1 (`TypeName: "self"` for 0-turn full tools + `search_web`; `TypeName: "research"` for read-only local codebase scouting; `Model: "inherit"`) + Warm Session Reuse (`send_message`) |
| **TIER 0** | **Mode A** (`≤ 2 known files`, 1 domain, 0 exploration needed, no `/cmd`) | Execute, test, and verify directly |
| **TIER 2** | **Mode B** fallback (tool missing/error) | EMBODY agent (shared context, fallback only) |

### 🛠️ Antigravity 2.0 Native Sub-agent Primitives & Turn-1 Zero-Tax Dispatch (TIER 1)
- **⚡ `TypeName: "self"` (0-Turn Fast-Track Default)**: Calling `invoke_subagent(TypeName: "self", Role: "<specialist>", Model: "inherit", Prompt: ...)` spawns an isolated sub-agent on Turn 1 that **immediately inherits full write tools + `run_command` + `search_web`** without needing a prior `define_subagent` turn!
- **⚠️ `TypeName: "research"` Limitation**: Antigravity's built-in `TypeName: "research"` has **NO network access (`search_web` disabled) and NO `write_file` tool**. **ALWAYS use `TypeName: "self"`** for `researcher`, `research-team`, any sub-agent needing `search_web`, or any `scouter` that writes `SCOUT-*.md`! Use `TypeName: "research"` strictly for ephemeral read-only local codebase grep when no file output is needed.
- `define_subagent`: Optional custom tool-scoped registration when strict read/write sandboxing is desired.
- `invoke_subagent`: Spawn isolated sub-agents with `TypeName`, `Role`, `Prompt` (5-field Structured Handoff Packet: `1. MISSION`, `2. SHARED_CONTRACT`, `3. OWNED_FILES`, `4. READ_ONLY_FILES`, `5. VERIFICATION`), `Model` (`"inherit"` default; NEVER `"flash_lite"`), and `Workspace` (`inherit`, `branch`, or `share`). Record `conversationId` in the **Active Sub-agent Session Registry**.
- `send_message`: **Warm Sub-agent Reuse** — multi-turn communication with running or completed sub-agents by `conversationId` (0s cold-start, 100% preserved file context), powered by **Reactive Async Wakeup** (never poll in a loop).
- **Direct Plan-to-Executor Dispatch**: Once `PLAN-{feature}.md` exists in `:fast`, `:hard`, or `/orchestrate`, the Orchestrator dispatches tasks directly to execution engineers without a middleman `tech-lead` hop.
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
| **L3** | Smart Threshold Gate | Mode A (≤ 2 files, 1 domain) executes directly; Mode B (> 2 files, ≥ 2 domains, `/cmd`) delegates |
| **L4** | Quality-First Model | Default `Model: "inherit"` (Pro High); `"flash"` only for trivial chores; NEVER `"flash_lite"` |
| **L5** | DAG & Contract-First | Run independent phases concurrently; lock `SHARED_CONTRACT` + disjoint `OWNED_FILES` before parallel coding |
| **L6** | Language Compliance | Respond in user's lang; code/comments in English; reports/docs/artifacts in user's input lang (technical terms in English) |
| **L7** | Direct Plan Dispatch | In Mode B, Orchestrator dispatches directly from `PLAN` to domain engineers (no middleman hop) |
| **L8** | Warm Session Reuse | Track `Role → conversationId`; reuse warm sub-agents via `send_message` for follow-ups & fixes |
| **L9** | Constraint Propagation | `scouter` → `planner` (`SHARED_CONTRACT`) → `engineer` (`OWNED_FILES`) chain locked |
| **L10** | Clean Git Tree | Default transient deliverables go to `<appDataDir>\brain\<conversation-id>\` |

---

## 📁 DELIVERABLES (BRAIN ARTIFACTS FIRST ON ANTIGRAVITY 2.0)

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
| reviewer | `<appDataDir>\brain\<conversation-id>\REVIEW-{scope}.md` | `./reports/{topic}/reviews/REVIEW-{scope}.md` |
| business-analyst | `<appDataDir>\brain\<conversation-id>\REQ-{feature}.md` | `./reports/{topic}/requirements/REQ-{feature}.md` |
| performance-engineer | `<appDataDir>\brain\<conversation-id>\PERF-{component}.md` | `./reports/{topic}/performance/PERF-{component}.md` |
