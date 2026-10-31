---
name: BoomOpen Workflow Kit
description: Smart-Hybrid Multi-Agent Orchestrator (v5.5) — Pragmatic 2-Tier Coding Standards, 2-Mode Gate, DAG Parallel Fan-Out, Direct Plan Dispatch & Warm Sub-agent Reuse.
argument-hint: Type command + task, e.g. /cook:hard implement login
---

# ⚡ BoomOpen Workflow Kit v5.5 — GitHub Copilot Orchestrator Protocol

> **ZERO-LATENCY ENTRYPOINT**: `rules/CORE.md`, `rules/PHASES.md`, `rules/AGENTS.md`, and `rules/TEAMS.md` are **Loaded On Demand** ONLY when **Mode B (Multi-Agent Orchestration)** or an explicit `/cmd` workflow is triggered.

---

## 📏 PRAGMATIC 2-TIER CODING STANDARDS & PERSISTENT VERIFICATION

1. **Tier 1 — Strict Quality & Safety (Zero Tolerance)**: Single Responsibility, NO explicit `any`, NO leftover debug `console.log` in production code, `try/catch` + typed errors on async/API boundaries, `SCREAMING_SNAKE_CASE` constants, DRY (`≥ 3`), clean sorted imports.
2. **Tier 2 — Flexible Structural Guidelines (Anti-Fragmentation)**: Cohesive files target `~200–350` lines (flexible up to `~400–450` lines; hard split `>500` lines or multi-domain; tests/types/CLI/docs exempt); functions `~20–40` lines (logic) / `~40–80` lines (UI/Handler); nesting `≤ 3–4`; params `≤ 4–5`.
3. **Persistent Testing & Bug Fixing**: Always verify fixes end-to-end (build, typecheck, tests) and iterate until zero errors remain.

---

## 🚦 2-MODE SMART COMPLEXITY THRESHOLD GATE

- **⚡ MODE A — Direct Execution (TIER 0)**: Q&A, code explanation, single-domain bug fixes, or clear changes touching **≤ 3 files** with no `/cmd` → execute, test, and verify **directly**.
- **🎻 MODE B — Strict Multi-Agent Orchestration (TIER 1)**: Explicit `/cmd` workflow OR task spanning **> 3 files** / **≥ 2 domains** → activate **Strict Orchestrator Mode** (`Model: "inherit"`, DAG Parallel Fan-Out, Direct Plan-to-Executor Dispatch, `SHARED_CONTRACT` + `OWNED_FILES`, Warm Sub-agent Reuse).

---

## 📂 PATHS (CRITICAL — Memorize These)

```
COMMANDS = ~/.{TOOL}/skills/boomopen-workflow-kit/commands/
AGENTS   = ~/.{TOOL}/skills/boomopen-workflow-kit/agents/
SKILLS   = ~/.{TOOL}/skills/
LIBRARY  = ~/.{TOOL}/skills_library/
RULES    = ~/.{TOOL}/skills/boomopen-workflow-kit/rules/
REPORTS  = ./reports/{topic}/
```

**Platform Resolution**:
- GitHub Copilot → `{TOOL}` = `copilot` → `~/.copilot/skills/boomopen-workflow-kit/`

---

## 🌐 LANGUAGE COMPLIANCE

| Context | Language |
|---------|----------|
| Response to user | **Same as user's language** |
| Code & comments | **Always English** |
| Files in `./reports/{topic}/`, `./documents/`, and Artifacts | **Same as user's input language (technical terms in English)** |

---

## 🎯 COMMAND ROUTING (Triggers Mode B)

### Explicit Commands (Priority 1)
| Input | Action |
|-------|--------|
| `/cook`, `/cook:hard`, `/cook:fast`, `/cook:team` | Load `commands/cook.md` → route to `commands/cook-{variant}.md` |
| `/fix`, `/fix:hard`, `/fix:fast`, `/fix:team` | Load `commands/fix.md` → route to `commands/fix-{variant}.md` |
| `/plan`, `/debug`, `/test`, `/review`, `/design`, `/report`, `/code` | Load `commands/{cmd}.md` → route to `commands/{cmd}-{variant}.md` |
| `/docs`, `/deploy`, `/brainstorm`, `/ask`, `/orchestrate`, `/save`, `/recap` | Load `commands/{cmd}.md` |

**Variant syntax**: `/docs/core` = `/docs:core` → Load `commands/docs-core.md`
**Team variant baseline**: `:team` is supported where `commands/{cmd}-team.md` exists. Deploy uses specialized variants (`check`, `preview`, `production`, `rollback`).

---

## 🔀 TIERED EXECUTION & INTELLIGENT WORK DISTRIBUTION

| Tier | Condition | Action |
|------|-----------|--------|
| **TIER 0** | Mode A (`≤ 3 files`, 1 domain, no `/cmd`) | Execute, test, and verify directly |
| **TIER 1** | Mode B (`runSubagent` / `invoke_subagent` exists) | **MUST** use sub-agent (`Model: "inherit"`) with 5-field Structured Handoff Packet (`MISSION`, `SHARED_CONTRACT`, `OWNED_FILES`, `READ_ONLY_FILES`, `VERIFICATION`), Direct Plan-to-Executor Dispatch, and Warm Session Reuse |
| **TIER 2** | Mode B fallback (tool missing/error) | EMBODY agent from `AGENTS` path |

---

## 📚 LOAD ON DEMAND (Mode B Only)

| Situation | Load from `RULES/` |
|-----------|--------------------|
| Core protocol & deliverable paths | `CORE.md` |
| Running phases & DAG Fan-Out | `PHASES.md` |
| Delegating, `OWNED_FILES` & Warm Reuse | `AGENTS.md` |
| Golden Triangle (`:team`) | `TEAMS.md` |
| Skill resolution (`compact-index.json`) | `SKILLS.md` |
| Error recovery (`E0`) / Quick lookup | `ERRORS.md` / `REFERENCE.md` |
