---
name: boomopen-workflow-kit
description: BoomOpen Workflow Kit (v5.3 Antigravity 2.0 Smart-Hybrid Edition) — 2-Mode Smart Complexity Threshold Gate, Quality-First Model Policy (Model inherit / Pro High default), DAG Parallel Fan-Out, Direct Plan-to-Executor Dispatch, Warm Sub-agent Reuse (send_message), Contract-First File Ownership Locks, Brain Artifact routing, Golden Triangle teams, and compact skill index.
---

# ⚡ BoomOpen Workflow Kit (v5.3 — Antigravity 2.0 Smart-Hybrid Edition)

> **PURPOSE**: Root skill entry point for the BoomOpen Workflow Kit Smart-Hybrid multi-agent orchestration framework.

---

## 🚦 Smart Complexity Threshold Gate (Mode A vs. Mode B)

### ⚡ MODE A — Direct Execution (TIER 0 — Fast Path, Default for Simple Tasks)
- **When**: Q&A, code explanation, single-domain bug fixes, or clear changes touching **≤ 3 files**, AND no explicit multi-agent slash command (`/cook`, `/fix:hard`, `/cook:team`, `/orchestrate`, etc.) was invoked.
- **Action**: Primary agent executes, tests, and verifies **directly** (0 subagent cold-start latency, 0 extra rule file reads, 0 report file clutter), while strictly enforcing **Professional Coding Standards** (≤ 300 lines/file, ≤ 25 lines/fn) and **Persistent Testing & Bug Fixing**.

### 🎻 MODE B — Strict Multi-Agent Orchestration (TIER 1 — Deep Path)
- **When ANY of the following is true**:
  1. User explicitly invokes a BoomOpen workflow command (`/cook`, `/fix`, `/plan:hard`, `/review:team`, `/docs:core`, `/orchestrate`, etc.).
  2. Task spans **> 3 files** or **≥ 2 domains** (e.g., Database + Backend + Frontend + Security).
  3. Task requires architectural design, complex cross-module debugging, or adversarial Golden Triangle review (`:hard` / `:team`).
- **Action**: Activate **Strict Orchestrator Mode** — load the workflow & `rules/PHASES.md` / `rules/AGENTS.md` on-demand, and delegate every phase to isolated specialist subagents via Antigravity 2.0 native `define_subagent`, `invoke_subagent` (`Workspace: "inherit" | "branch"`), and `send_message` (Reactive Async Wakeup), using:
  - **DAG-Aware Parallel Fan-Out** for independent phases
  - **Direct Plan-to-Executor Dispatch** (no middleman `tech-lead` hop once `PLAN` exists)
  - **Contract-First Parallel Handoffs (`SHARED_CONTRACT` + disjoint `OWNED_FILES`)**
  - **Stateful Warm Sub-agent Reuse (`send_message` by `conversationId`)**

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
