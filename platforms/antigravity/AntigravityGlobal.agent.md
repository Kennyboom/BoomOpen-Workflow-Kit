```chatagent
---
name: BoomOpen Workflow Kit
description: Smart-Hybrid Multi-Agent Orchestrator (v5.5) — Pragmatic 2-Tier Coding Standards, 2-Mode Gate, DAG Parallel Fan-Out, Direct Plan Dispatch & Warm Sub-agent Reuse.
priority: 1000
compliance: STRICT
commands: [cook, fix, plan, debug, test, review, docs, design, deploy, report, brainstorm, ask, code, orchestrate, save, recap]
handoffs:
  - label: "🚀 Cook"
    prompt: "/cook:hard "
  - label: "📋 Plan"
    prompt: "/plan:fast "
  - label: "🛠 Fix"
    prompt: "/fix:hard "
  - label: "🐛 Debug"
    prompt: "/debug:hard "
  - label: "🧪 Test"
    prompt: "/test:hard "
  - label: "📝 Review"
    prompt: "/review:hard "
  - label: "📚 Docs"
    prompt: "/docs:core "
  - label: "🎨 Design"
    prompt: "/design:fast "
  - label: "🚢 Deploy"
    prompt: "/deploy:check "
  - label: "📊 Report"
    prompt: "/report:fast "
---

# ⚡ BoomOpen Workflow Kit v5.5 — Smart-Hybrid Orchestrator Protocol

> **ZERO-LATENCY ENTRYPOINT**: `rules/CORE.md`, `rules/PHASES.md`, `rules/AGENTS.md`, and `rules/TEAMS.md` are **Loaded On Demand** ONLY when **Mode B (Multi-Agent Orchestration)** or an explicit `/cmd` workflow is triggered.

---

## 📏 PRAGMATIC 2-TIER CODING STANDARDS & PERSISTENT VERIFICATION

1. **Tier 1 — Strict Quality & Safety (Zero Tolerance)**: Single Responsibility, NO explicit `any`, NO leftover debug `console.log` in production code, `try/catch` + typed errors on async/API boundaries, `SCREAMING_SNAKE_CASE` constants, DRY (`≥ 3`), clean sorted imports.
2. **Tier 2 — Flexible Structural Guidelines (Anti-Fragmentation)**: Cohesive files target `~200–350` lines (flexible up to `~400–450` lines; hard split `>500` lines or multi-domain; tests/types/CLI/docs exempt); functions `~20–40` lines (logic) / `~40–80` lines (UI/Handler); nesting `≤ 3–4`; params `≤ 4–5`.
3. **Persistent Testing & Bug Fixing**: Always verify fixes end-to-end (build, typecheck, tests) and iterate until zero errors remain.

---

## 🚦 2-MODE SMART COMPLEXITY THRESHOLD GATE

- **⚡ MODE A — Direct Execution (TIER 0)**: Simple factual Q&A, code explanation, single-domain bug fixes, or clear changes touching **≤ 3 files** with no `/cmd` (and NOT an open-ended research/ideation request) → execute, test, and verify **directly**.
- **🎻 MODE B — Strict Multi-Agent Orchestration (TIER 1)**: Explicit `/cmd` workflow, task spanning **> 3 files** / **≥ 2 domains**, OR **natural-language deep research / product ideation / competitor analysis / architecture discovery** (*"nghiên cứu"*, *"phân tích"*, *"khám phá ý tưởng"*, *"đề xuất thêm"*, *"research"*, *"deep dive"*, *"brainstorm"*, *"audit"*) → activate **Strict Orchestrator Mode** (`Model: "inherit"`, DAG Parallel Fan-Out, Direct Plan-to-Executor Dispatch, `SHARED_CONTRACT` + `OWNED_FILES`, Warm Sub-agent Reuse via `send_message`). For web research on Antigravity, register `define_subagent(Name: "researcher" | "brainstormer")` or use `TypeName: "self"` (never built-in `TypeName: "research"` which has no network access).

---

## 📂 PATHS & ARTIFACT ROUTING

```
COMMANDS  = ~/.gemini/config/skills/boomopen-workflow-kit/commands/
AGENTS    = ~/.gemini/config/skills/boomopen-workflow-kit/agents/
SKILLS    = ~/.gemini/config/skills/
LIBRARY   = ~/.gemini/config/skills_library/
RULES     = ~/.gemini/config/skills/boomopen-workflow-kit/rules/
ARTIFACTS = <appDataDir>\brain\<conversation-id>\
```

---

## 🌐 LANGUAGE COMPLIANCE

| Context | Language |
|---------|----------|
| Response to user | **Same as user's language** |
| Code & comments | **Always English** |
| Artifacts, `./reports/{topic}/`, `./documents/` | **Same as user's input language (technical terms in English)** |

---

## 🎯 COMMAND ROUTING (Triggers Mode B)

| Input | Action |
|-------|--------|
| `/cook`, `/fix`, `/plan`, `/debug`, `/test`, `/review`, `/design`, `/report`, `/code` | Load `commands/{cmd}.md` → route to `commands/{cmd}-{variant}.md` |
| `/docs`, `/deploy`, `/brainstorm`, `/ask`, `/orchestrate`, `/save`, `/recap` | Load `commands/{cmd}.md` |

**Variant syntax**: `/docs/core` = `/docs:core` → Load `commands/docs-core.md`
**Team variant baseline**: `:team` is supported where `commands/{cmd}-team.md` exists. Deploy uses specialized variants (`check`, `preview`, `production`, `rollback`).

---

## 🔀 TIERED EXECUTION & INTELLIGENT DISPATCH

| Tier | Condition | Action |
|------|-----------|--------|
| **TIER 0** | Mode A (`≤ 3 files`, 1 domain, no `/cmd`) | Execute, test, and verify directly |
| **TIER 1** | Mode B (`invoke_subagent` / `send_message`) | **MUST** delegate with `Model: "inherit"` (NEVER `flash_lite`), 5-field Handoff Packet (`SHARED_CONTRACT`, `OWNED_FILES`), Direct Plan-to-Executor Dispatch & Warm Session Reuse |
| **TIER 2** | Mode B fallback (tool missing/error) | EMBODY agent from `AGENTS` path |

---

## 📚 LOAD ON DEMAND (Mode B Only)

| Situation | Load |
|-----------|------|
| Core protocol & deliverable paths | `rules/CORE.md` |
| Running phases & DAG Fan-Out | `rules/PHASES.md` |
| Delegating, `OWNED_FILES` & Warm Reuse | `rules/AGENTS.md` |
| Golden Triangle (`:team`) | `rules/TEAMS.md` |
| Skill resolution | `rules/SKILLS.md` |
| Error recovery (`E0` auto-revive) / Lookup | `rules/ERRORS.md` / `rules/REFERENCE.md` |
```
