# ⚡ BoomOpen Workflow Kit v5.4 (Smart-Hybrid Edition)

> **ZERO-LATENCY ENTRYPOINT**: Load `~/.claude/skills/boomopen-workflow-kit/rules/CORE.md`, `PHASES.md`, and `AGENTS.md` on-demand when **Mode B** (`> 3 files`, `≥ 2 domains`, or explicit `/cmd`) is triggered.

## 🚦 2-MODE SMART COMPLEXITY THRESHOLD GATE

- **⚡ MODE A — Direct Execution (TIER 0)**: For Q&A, explanation, or simple changes touching **≤ 3 files** (no `/cmd`), execute, test, and verify directly using **Pragmatic 2-Tier Coding Standards**.
- **🎻 MODE B — Strict Multi-Agent Orchestration (TIER 1)**: For explicit `/cmd` workflows or tasks spanning **> 3 files** / **≥ 2 domains**, activate Strict Orchestrator Mode (delegate via sub-agents using `Model: "inherit"`, DAG Parallel Fan-Out, Direct Plan-to-Executor Dispatch, and `OWNED_FILES` locks).

## 📂 PATHS

```
COMMANDS = ~/.{TOOL}/skills/boomopen-workflow-kit/commands/
AGENTS   = ~/.{TOOL}/skills/boomopen-workflow-kit/agents/
SKILLS   = ~/.{TOOL}/skills/
RULES    = ~/.{TOOL}/skills/boomopen-workflow-kit/rules/
REPORTS  = ./reports/{topic}/
```

## 🌐 LANGUAGE

- Response → **Same as user's language**
- Code/comments → **Always English**
- Files in `./reports/{topic}/`, `./documents/` → **Same as user's language** (technical terms in English)

## 🎯 COMMAND ROUTING

| Input | Route |
|-------|-------|
| `/cook`, `/fix`, `/plan`, `/debug`, `/test`, `/review`, `/docs`, `/design`, `/deploy`, `/report` | `commands/{cmd}.md` → `commands/{cmd}-{variant}.md` |
| `/brainstorm`, `/ask`, `/code`, `/orchestrate`, `/save`, `/recap` | `commands/{cmd}.md` |

## 🔀 TIERED EXECUTION

| Tier | When | Action |
|------|------|--------|
| **TIER 0** | Mode A (≤ 3 files, no `/cmd`) | Execute and verify directly |
| **TIER 1** | Mode B (`runSubagent` / `invoke_subagent` exists) | **MUST** use sub-agent (`Model: "inherit"`) |
| **TIER 2** | Mode B fallback (tool missing/error) | EMBODY (fallback only) |

## 📚 LOAD ON DEMAND (Mode B Only)

| Situation | Load from `RULES/` |
|-----------|--------------------|
| Core protocol | `CORE.md` |
| Running phases & DAG Fan-Out | `PHASES.md` |
| Delegating & `OWNED_FILES` locks | `AGENTS.md` |
| Team execution (`:team`) | `TEAMS.md` |
| Skill resolution | `SKILLS.md` |
| Error occurred / Quick lookup | `ERRORS.md` / `REFERENCE.md` |
