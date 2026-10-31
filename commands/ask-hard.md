---
description: ⚡⚡⚡ Research Answer — Parallel codebase + external research with comprehensive synthesis
version: "5.2"
category: knowledge
execution-mode: execute
---

# /ask:hard — Research-Backed Answering (DAG Parallel Fan-Out)

> **MISSION**: Provide comprehensive, evidence-backed answers through parallel internal codebase scouting and external research.

<question>$ARGUMENTS</question>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/boomopen-workflow-kit/rules/`):
1. `CORE.md` — 2-Mode Gate, Quality-First Model Policy, Brain Artifact Routing
2. `PHASES.md` — DAG-Aware Parallel Fan-Out & Phase Execution
3. `AGENTS.md` — Tiered Execution (`Model: "inherit"` Pro High Default)

---

## 🔀 TIERED EXECUTION & QUALITY-FIRST MODEL POLICY

| Tier | When | Action |
|------|------|--------|
| **TIER 1** | Antigravity 2.0 Native Sub-Agents (`define_subagent`, `invoke_subagent`, `send_message`) or `runSubagent` EXISTS | Invoke isolated sub-agent with `Model: "inherit"` (Pro High default; NEVER `flash_lite`) |
| **TIER 2** | Tool MISSING or system error | EMBODY agent file (FALLBACK) |

---

## 🎭 Phase 1: QUESTION DECOMPOSITION (`brainstormer`)

| Attribute | Value |
|-----------|-------|
| **Agent** | `brainstormer` (`Model: "inherit"`) |
| **Goal** | Decompose the question into internal codebase queries and external research dimensions (use `ask_question` if ambiguous) |
| **Exit** | Scope defined, sub-questions listed |

---

## ⚡ PARALLEL FAN-OUT: Phase 2 (`scouter`) + Phase 3 (`researcher`)

> **🚀 DAG FAN-OUT DIRECTIVE**: Launch `scouter` (internal codebase analysis) AND `researcher` (external documentation / best practices) **concurrently in a single turn** (`Model: "inherit"`), and join via Reactive Async Wakeup before Phase 4.

### 🎭 Phase 2: CODEBASE ANALYSIS (`scouter`)
- **Agent**: `scouter` (`Model: "inherit"`, `EnableWriteTools: false`)
- **Goal**: Locate relevant files, symbols, and existing architectural patterns in the workspace.
- **Exit**: Internal codebase evidence gathered with `file:line` references.

### 🎭 Phase 3: EXTERNAL RESEARCH (`researcher`)
- **Agent**: `researcher` (`Model: "inherit"`)
- **Goal**: Consult official docs, benchmarks, and industry best practices.
- **Exit**: External sources and trade-offs documented.

---

## 🎭 Phase 4: SYNTHESIS (`researcher` / Orchestrator)

| Attribute | Value |
|-----------|-------|
| **Agent** | `researcher` (`Model: "inherit"`) |
| **Prerequisite** | Combine Phase 2 (`scouter`) internal findings + Phase 3 (`researcher`) external findings |
| **Deliverable** | `<appDataDir>\brain\<conversation-id>\RESEARCH-{topic}.md` (if report requested) + direct structured response |
| **Exit** | Comprehensive answer with clickable `file:///` links, Mermaid diagrams, and actionable recommendations |

---

## ✅ COMPLETION

Present the synthesized answer with:
1. ✅ **Answered** — Question resolved with internal + external evidence
2. 📋 **Plan** → `/plan:hard` if architectural planning is needed next
3. 💻 **Implement** → `/cook:hard` or `/code:hard` if implementation is needed
