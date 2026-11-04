---
description: "🔺 Team Brainstorm — Golden Triangle 3-Wave Deep Research, Codebase Scouting & Adversarial Ideation"
version: "5.5"
category: ideation
execution-mode: execute
---

# /brainstorm:team — Golden Triangle Research-First Creative Brainstorming

> **MISSION**: Maximum quality product, game, system, and architecture ideation grounded in **real empirical research**.
> Every `/brainstorm:team` workflow **MUST** start with **Phase 1: Parallel 3-Wave Deep Research & Codebase Scouting (`RESEARCH-{topic}.md` + `SCOUT-{topic}.md` via `TypeName: "self"`)** using **4-Source Triangulation + 3-Wave `search_web`** BEFORE Phase 2 Divergent/Killer-Feature Ideation and Phase 3 Adversarial Feasibility Debate & Synthesis (`BRAINSTORM-{topic}.md`).

<topic>$ARGUMENTS</topic>

---

## ⛔ MANDATORY REFERENCE & SUB-AGENT RULE

> 1. `~/.{TOOL}/skills/boomopen-workflow-kit/commands/_ref/golden-triangle-protocol.md` — Tiered Execution, Turn-1 Zero-Tax Dispatch, Warm Session Reuse (`send_message`), and Mailbox Protocol.
> 2. ⚠️ **CRITICAL (`TypeName: "self"` MANDATORY)**: Antigravity's built-in `TypeName: "research"` has **NO network access (`search_web` disabled) and NO `write_file` tool**. **ALWAYS use `invoke_subagent(TypeName: "self", Role: ..., Model: "inherit", Prompt: ...)`** for `researcher`, `scouter`, `brainstormer`, and `tech-lead`!

---

## 📁 DELIVERABLE FILES (BRAIN ARTIFACTS FIRST ON ANTIGRAVITY 2.0)

> **Antigravity 2.0 Default**: Write transient deliverables (`RESEARCH`, `SCOUT`, `IDEAS`, `BRAINSTORM`, `MAILBOX`) to `<appDataDir>\brain\<conversation-id>\` to keep the Git tree clean. Use `./reports/{topic}/` only on non-Antigravity tools or when explicitly requested.

| Phase | Output Artifact |
|-------|-----------------|
| **P1: Parallel 3-Wave Deep Research & Scouting** | `<appDataDir>\brain\<conversation-id>\RESEARCH-{topic}.md` + `<appDataDir>\brain\<conversation-id>\SCOUT-{topic}.md` |
| **P2: Divergent Ideation & Killer Features** | `<appDataDir>\brain\<conversation-id>\IDEAS-{topic}.md` |
| **P3: Adversarial Feasibility Debate & Synthesis** | `<appDataDir>\brain\<conversation-id>\BRAINSTORM-{topic}.md` |
| **ALL Phases (Inter-Agent Log)** | `<appDataDir>\brain\<conversation-id>\MAILBOX-{date}.md` (or `./reports/{topic}/MAILBOX-{date}.md`) |

**⚠️ Paths = base names.** ≤ 150 lines → `{name}.md`. > 150 lines → `{name}/` folder.

---

## ⛔ ABSOLUTE PROHIBITION — NO APPLICATION CODE

> **🔴 THIS WORKFLOW PRODUCES RESEARCH & IDEATION BLUEPRINTS ONLY. NO APPLICATION CODE.**
>
> - ❌ NEVER write application implementation code or modify project source files
> - ❌ NEVER auto-transition to `/code`, `/cook`, `/fix` without explicit user command
> - ✅ ONLY produce `RESEARCH-{topic}.md`, `SCOUT-{topic}.md`, `IDEAS-{topic}.md`, `BRAINSTORM-{topic}.md`, and `MAILBOX-{date}.md` in the user's input language (technical terms in English)

---

## 🔗 PHASE DEPENDENCIES

| Phase | Requires | Blocking |
|-------|----------|:--------:|
| **P1: Parallel 3-Wave Deep Research & Codebase Scouting** | User request / topic | No (Turn-1 Instant Fan-Out) |
| **P2: Divergent Thinking & Killer-Feature Generation** | `RESEARCH-{topic}.md` + `SCOUT-{topic}.md` from P1 | **YES** |
| **P3: Adversarial Feasibility Debate & Master Blueprint** | `IDEAS-{topic}.md` + P1 evidence | **YES** |

---

## 🎭 Phase 1 (Turn-1 Parallel Fan-Out): 3-WAVE DEEP RESEARCH & CODEBASE SCOUTING — 🔺 GOLDEN TRIANGLE

> **🚫 NO BLIND IDEATION**: Never brainstorm in a vacuum! Immediately on Turn 1, spawn the Phase 1 Golden Triangle in parallel (`TypeName: "self"`, `Model: "inherit"`) to execute **4-Source Triangulation** (`Workspace Manifests/Docs` + `1,471 Skills Vault compact-index.json` + `Official Docs via search_web` + `Competitor/Production Benchmarks`) and the **3-Wave Multi-Hop `search_web` Loop (`8–12+` queries)**:

| Role | Agent (`TypeName: "self"`, `Model: "inherit"`) | Mission |
|------|------------------------------------------------|---------|
| **Tech Lead** | `researcher` | Execute **3-Wave Multi-Hop `search_web` (`8–12+` queries)** across **Dual-Track 5-Lens** (Track A: Phenomenon/Psychology, `≥ 5` Competitor Teardowns, System Architecture, Unit Economics at 1k CCU/10k DAU, D7/D30 Pre-Mortem; OR Track B: Official Specs/Versions, API Schemas, Trade-off Matrix, Perf/Cost Envelope, Failure Modes) → write **`RESEARCH-{topic}.md`** with mandatory `Research Execution Audit Log` & clickable URLs. |
| **Executor** | `scouter` (or domain specialist `game-engineer` / `tech-lead` for greenfield) | Map local codebase manifests (`package.json`/`pyproject.toml`/`Cargo.toml`), `./documents/`, and matching `SKILL.md` files from `matrix-skills/compact-index.json` (`1,471` skills), OR audit greenfield rendering/state/data constraints → write **`SCOUT-{topic}.md`**. |
| **Reviewer** | `brainstormer` (Devil's Advocate) | Audit `RESEARCH-{topic}.md` + `SCOUT-{topic}.md` via `send_message`: verify `≥ 5` real benchmarks, concrete unit economics/latency math, and zero unverified claims before unlocking Phase 2. |

**Exit Criteria (Phase 1)**:
- [ ] `RESEARCH-{topic}.md` created with `Research Execution Audit Log` (`8–12+` queries across Wave 1 → Gap Reflection → Wave 2 → Wave 3) and clickable citations
- [ ] `SCOUT-{topic}.md` created with workspace/skills constraints and technical guardrails
- [ ] **Consensus**: `✅ CONSENSUS: researcher ✓ | scouter ✓ | brainstormer ✓` logged in `MAILBOX-{date}.md`

---

## 🎭 Phase 2: DIVERGENT THINKING & COUNTER-POSITIONING — 🔺 GOLDEN TRIANGLE

> **Prerequisite**: **READ** `RESEARCH-{topic}.md` and `SCOUT-{topic}.md`. Reuse warm sub-agent sessions via `send_message(Recipient: conversationId)`.

| Role | Agent | Mission |
|------|-------|---------|
| **Tech Lead** | `brainstormer` | Decompose exploration dimensions grounded in Phase 1 competitor weaknesses and architecture constraints |
| **Executor** | `researcher` + `scouter` | Generate `8–12+` distinct ideas & counter-positioning mechanics tagged (`Core MVP` / `Differentiator` / `Moonshot`) |
| **Reviewer** | `tech-lead` (Generative Devil's Advocate) | Challenge: push for bolder differentiation, viral K-factor hooks, and missing categories; reject generic "AI-slop" ideas |

**Deliverable**: `<appDataDir>\brain\<conversation-id>\IDEAS-{topic}.md`
**Consensus**: `✅ CONSENSUS: brainstormer ✓ | researcher+scouter ✓ | tech-lead ✓`

---

## 🎭 Phase 3: ADVERSARIAL FEASIBILITY DEBATE & MASTER SYNTHESIS — 🔺 GOLDEN TRIANGLE

> **Prerequisite**: **READ** `IDEAS-{topic}.md` + `RESEARCH-{topic}.md` + `SCOUT-{topic}.md`. Conduct multi-turn debate via `send_message` (max 3 rounds) and log all exchanges to `MAILBOX-{date}.md`.

| Role | Agent | Mission |
|------|-------|---------|
| **Tech Lead** | `brainstormer` | Lead synthesis of the top 5–7 Killer Features, Core Loop (D1/D7/D30), and Phased Roadmap |
| **Executor** | `reporter` / `brainstormer` | Write `<appDataDir>\brain\<conversation-id>\BRAINSTORM-{topic}.md` with quantitative trade-off matrix, Mermaid diagrams, and entity/state models |
| **Reviewer** | `tech-lead` + `business-analyst` lens | Challenge feasibility, unit economics at scale, scope realism, and risk mitigation |

**Mandatory Sections in `BRAINSTORM-{topic}.md`**:
1. **Executive Summary, Unfair Positioning & Evidence Traceability** (citing `RESEARCH-{topic}.md`)
2. **Core Loop & Retention / Workflow Engine** (with Mermaid state/flow diagrams)
3. **5–7 Killer Features & Counter-Positioning Matrix** (UX mechanics, technical architecture, cost/latency envelope)
4. **Domain Entities, State Machines & Quantitative Comparison Matrix** (feasibility, impact, effort, risk)
5. **Pre-Mortem Failure Modes & Phased Delivery Roadmap (MVP → V1 → V2)**

**Exit Criteria**:
- [ ] `BRAINSTORM-{topic}.md` created and decision-ready
- [ ] **Consensus**: `✅ CONSENSUS: brainstormer ✓ | reporter ✓ | tech-lead ✓`

---

## ⛔ HARD STOP — AWAIT USER DECISION

> **WORKFLOW COMPLETE. DO NOT PROCEED FURTHER.**
>
> Present clickable links to `RESEARCH-{topic}.md`, `SCOUT-{topic}.md`, `IDEAS-{topic}.md`, `BRAINSTORM-{topic}.md`, and `MAILBOX-{date}.md`, then offer next steps:
> 1. 📋 `/plan:team` → Plan implementation of the approved recommendation
> 2. 🎨 `/design:team` or `/design:hard` → Design UI/UX and architecture specs
> 3. 🏗️ `/cook:team` → Build the chosen approach with Golden Triangle verification
> 4. 🔄 Iterate → Refine based on feedback
