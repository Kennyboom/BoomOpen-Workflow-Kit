---
name: boomopen-workflow-kit
description: BoomOpen Workflow Kit (v5.5 Antigravity 2.0 Smart-Hybrid Edition) — Pragmatic 2-Tier Coding Standards, 2-Mode Smart Complexity Threshold Gate, Quality-First Model Policy (Model inherit / Pro High default), DAG Parallel Fan-Out, Direct Plan-to-Executor Dispatch, Warm Sub-agent Reuse (send_message), Contract-First File Ownership Locks, Brain Artifact routing, Golden Triangle teams, and compact skill index.
---

# ⚡ BoomOpen Workflow Kit (v5.5 — Antigravity 2.0 Smart-Hybrid Edition)

> **PURPOSE**: Root skill entry point for the BoomOpen Workflow Kit Smart-Hybrid multi-agent orchestration framework.

---

## 🚦 Proactive Sub-agent First Gate (Turn-1 Zero-Tax Fan-Out, Mode B & Mode A)

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
  4. **Natural-Language Deep Research, Product/Game/System Ideation, Competitor Analysis, or Architecture Discovery** — whenever the user asks in natural language to research, analyze, or propose an idea/product/architecture (*"nghiên cứu"*, *"phân tích chuyên sâu"*, *"đánh giá"*, *"khám phá ý tưởng"*, *"đề xuất ý tưởng"*, *"đề xuất thêm"*, *"research"*, *"deep dive"*, *"analyze"*, *"brainstorm"*, *"investigate"*, *"audit"*), **EVEN IF 0 code files are modified and no `/cmd` is typed** → route by default (`workflows.naturalLanguageResearchTrigger = "auto_team"`) to `commands/brainstorm-team.md` (`/brainstorm:team` Golden Triangle), or `commands/brainstorm-hard.md` when configured as `"auto_hard"`, launching parallel subagents (`researcher` + `brainstormer` + `scouter`/domain specialist).
- **Turn-1 Instant Dispatch Action**: Do **NOT** waste Turn 1 reading `rules/CORE.md` + `rules/PHASES.md` + `rules/AGENTS.md` before spawning subagents! The 5-Field Handoff Packet (`1. MISSION`, `2. SHARED_CONTRACT`, `3. OWNED_FILES`, `4. READ_ONLY_FILES`, `5. VERIFICATION`) is pre-embedded in the entrypoint. When `/cmd` is invoked, read `commands/{cmd}.md` AND launch Phase 1 subagents (`TypeName: "self"`, `Model: "inherit"`) in the **same Turn-1 tool batch**, using **DAG-Aware Parallel Fan-Out**, **Direct Plan-to-Executor Dispatch**, **Contract-First Parallel Handoffs (`SHARED_CONTRACT` + disjoint `OWNED_FILES`)**, and **Stateful Warm Sub-agent Reuse (`send_message` by `conversationId`)**.

### ⚡ MODE A — Known-Target Micro-Direct (TIER 0 — `≤ 2 Known Files`, `1 Domain`, 0 Exploration Needed, No `/cmd`)
- **When**: Strictly for simple factual Q&A, code explanations, or micro-edits where the **exact 1–2 target files are already known on Turn 1**, AND no `/cmd` workflow was invoked, AND NOT an open-ended research or ideation request.
- **Action**: Primary agent executes, tests, and verifies directly while enforcing **Pragmatic 2-Tier Coding Standards** (Tier 1 strict type/error safety + Tier 2 cohesive structure) and **Persistent Testing & Bug Fixing**.

---

## 🧠 Quality-First Model Policy (`Model: "inherit"` / Pro High Default)

- **Default (`Model: "inherit"` / Pro High)**: Mandatory for all core engineering, planning, architecture, scouting, debugging, testing, reviewing, security, design, and documentation tasks. Always follow the user's selected model (`Model: "inherit"` or `"pro"`) to guarantee maximum reasoning and code quality.
- **Trivial Chores Only (`Model: "flash"` — Latest Flash High)**: Permitted **ONLY** for trivial mechanical chores (raw log aggregation, simple list formatting, status ping) where zero architectural or coding judgment is needed. When in doubt, ALWAYS use `Model: "inherit"`.
- **Forbidden (`flash_lite`)**: **NEVER use `flash_lite`**.

---

## 📂 Brain Artifacts First (Antigravity 2.0)

- Default transient deliverables (`PLAN`, `RESEARCH`, `SCOUT`, `DEBUG`, `TEST`, `REVIEW`, `REPORT`, `MAILBOX`, `SESSION-HANDOVER`) are written to the conversation's native **Brain Artifact Directory** (`<appDataDir>\brain\<conversation-id>\`) so they render in the Antigravity UI Artifact pane and keep the project's Git working tree 100% clean.
- Only write to `./reports/{topic}/` or `./documents/` in the project workspace when running `/docs` (`/docs:core`) or when the user explicitly asks to commit reports into the repository.

---

## 📚 Core Architecture & Rules (`rules/` — Load On Demand in Mode B)

| Rule File | Purpose | When to Load |
|-----------|---------|--------------|
| [`rules/CORE.md`](./rules/CORE.md) | 2-Mode Gate, 10 Orchestration Laws, Model Policy, Brain Artifact Routing | On-demand in Mode B |
| [`rules/AGENTS.md`](./rules/AGENTS.md) | Tiered Execution (TIER 0/1/2), Warm Sub-agent Reuse, Structured Handoff Packet (`OWNED_FILES`) | Before delegating to specialist subagents |
| [`rules/PHASES.md`](./rules/PHASES.md) | DAG-Aware Parallel Fan-Out, Contract-First Dispatch, Direct Plan Execution | When running multi-phase workflows |
| [`rules/TEAMS.md`](./rules/TEAMS.md) | Golden Triangle 3-Agent Adversarial Collaboration (`Tech Lead` + `Executor` + `Reviewer`) | When executing `:team` workflow variants |
| [`rules/SKILLS.md`](./rules/SKILLS.md) | Fast 2-Step Progressive Skill Lookup (`<skills>` → `compact-index.json` / `skill-seeker`) | When resolving domain skills for complex tasks |
| [`rules/ERRORS.md`](./rules/ERRORS.md) | Self-healing, Error Classification (`E0` warm auto-revive – `E4`), Anti-Patterns (`A1`–`A12`) | When errors or protocol violations occur |
| [`rules/REFERENCE.md`](./rules/REFERENCE.md) | Quick lookup tables for Commands, Agents, and Deliverable paths | Fast reference |

---

## 🎯 Workflow Commands (`commands/`)

| Command | Router File | Variants |
|---------|-------------|----------|
| `/cook` | [`commands/cook.md`](./commands/cook.md) | `fast`, `hard`, `team` |
| `/fix` | [`commands/fix.md`](./commands/fix.md) | `fast`, `hard`, `team` |
| `/plan` | [`commands/plan.md`](./commands/plan.md) | `fast`, `hard`, `team` |
| `/debug` | [`commands/debug.md`](./commands/debug.md) | `fast`, `hard`, `team` |
| `/test` | [`commands/test.md`](./commands/test.md) | `fast`, `hard`, `team` |
| `/review` | [`commands/review.md`](./commands/review.md) | `fast`, `hard`, `team` |
| `/docs` | [`commands/docs.md`](./commands/docs.md) | `core`, `business`, `audit` |
| `/design` | [`commands/design.md`](./commands/design.md) | `fast`, `hard`, `team` |
| `/deploy` | [`commands/deploy.md`](./commands/deploy.md) | `check`, `preview`, `production`, `rollback` |
| `/report` | [`commands/report.md`](./commands/report.md) | `fast`, `hard`, `team` |
| `/brainstorm` | [`commands/brainstorm.md`](./commands/brainstorm.md) | `fast`, `hard`, `team` |
| `/ask` | [`commands/ask.md`](./commands/ask.md) | `fast`, `hard` |
| `/code` | [`commands/code.md`](./commands/code.md) | `fast`, `hard`, `team` |
| `/orchestrate` | [`commands/orchestrate.md`](./commands/orchestrate.md) | Multi-agent domain orchestration |
| `/save` / `/recap` | [`commands/save.md`](./commands/save.md) / [`commands/recap.md`](./commands/recap.md) | Infinite session memory & context recovery |
| `/settings` (`/config`) | [`commands/settings.md`](./commands/settings.md) | Unified Settings & Control Center (`ask_question` UI, CLI & `--ui` Web Dashboard) |
