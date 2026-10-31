# AGENT.md — Universal AI Assistant Entry Point (v5.4 Smart-Hybrid Edition)

> **ZERO-LATENCY ENTRYPOINT**: This file is pre-loaded in your system rules.
> **DO NOT** read `rules/CORE.md` on Turn 1 for simple tasks. `rules/CORE.md`, `rules/PHASES.md`, `rules/AGENTS.md`, and `rules/TEAMS.md` are **Loaded On Demand** ONLY when **Mode B (Multi-Agent Orchestration)** or an explicit `/cmd` workflow is triggered.
>
> **Platform Resolution**: cursor→`.cursor`, claude→`.claude`, copilot→`.copilot`, gemini→`.gemini/config`, codex→`.codex`

---

## 🚦 SMART COMPLEXITY THRESHOLD GATE (MODE A vs. MODE B)

### ⚡ MODE A — Direct Execution (TIER 0 — Fast Path, Default for Simple Tasks)
- **When**: Q&A, code explanation, single-domain bug fixes, or clear changes touching **≤ 3 files**, AND no explicit multi-agent slash command (`/cook`, `/fix:hard`, `/cook:team`, `/orchestrate`, etc.) was invoked.
- **Action**: Primary agent executes, tests, and verifies **directly** (0 subagent cold-start latency, 0 extra rule file reads, 0 report file clutter), while enforcing **Pragmatic 2-Tier Coding Standards** (Tier 1 strict type/error safety + Tier 2 cohesive structure) and **Persistent Testing & Bug Fixing**.

### 🎻 MODE B — Strict Multi-Agent Orchestration (TIER 1 — Deep Path)
- **When ANY of the following is true**:
  1. User explicitly invokes a BoomOpen workflow command (`/cook`, `/fix`, `/plan:hard`, `/review:team`, `/docs:core`, `/orchestrate`, etc.).
  2. Task spans **> 3 files** or **≥ 2 domains** (e.g., Database + Backend + Frontend + Security).
  3. Task requires architectural design, complex cross-module debugging, or adversarial Golden Triangle review (`:hard` / `:team`).
- **Action**: Activate **Strict Orchestrator Mode** — load the workflow & `rules/PHASES.md` / `rules/AGENTS.md` on-demand, and delegate every phase to isolated specialist subagents using **DAG Parallel Fan-Out**, **Direct Plan-to-Executor Dispatch**, **Contract-First Handoffs (`SHARED_CONTRACT` + `OWNED_FILES`)**, and **Warm Sub-agent Reuse (`send_message`)**.

---

## 📂 PATHS

```
COMMANDS  = ~/.{TOOL}/skills/boomopen-workflow-kit/commands/
AGENTS    = ~/.{TOOL}/skills/boomopen-workflow-kit/agents/
SKILLS    = ~/.{TOOL}/skills/
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
| `/cook ...`, `/fix ...`, `/plan ...`, `/debug ...`, `/test ...`, `/review ...`, `/docs ...`, `/design ...`, `/deploy ...`, `/report ...` | Domain workflow | `commands/{cmd}.md` → `commands/{cmd}-{variant}.md` |
| `/brainstorm ...`, `/ask ...`, `/code ...`, `/orchestrate ...`, `/save`, `/recap` | Explore/Query/Code/Multi-agent | `commands/{cmd}.md` |

**Variant syntax**: `/docs/core` = `/docs:core` → Load `commands/docs-core.md`
**Team variant baseline**: `:team` is supported where `commands/{cmd}-team.md` exists. Deploy uses specialized variants (`check`, `preview`, `production`, `rollback`).

---

## 🔀 TIERED EXECUTION

```yaml
TIER_0 (Mode A — ≤ 3 files, single domain, no /cmd):
  - Execute, test, and verify directly with zero sub-agent overhead

TIER_1 (Mode B — MANDATORY when sub-agent tool exists):
  - Antigravity 2.0 Native: define_subagent, invoke_subagent (Model: "inherit"), send_message (Warm Session Reuse + Reactive Async Wakeup)
  - Cross-platform alias: runSubagent
  - Context: ISOLATED with 5-field Structured Handoff Packet (OWNED_FILES, READ_ONLY_FILES, SHARED_CONTRACT)

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
| Skill Lookup | `rules/SKILLS.md` |
| Error Recovery / Lookup | `rules/ERRORS.md` / `rules/REFERENCE.md` |
