---
description: ⚡⚡⚡ Deep Plan — Parallel codebase + pattern discovery, Given/When/Then specs, edge cases, and multi-phase planning
version: "5.2"
category: planning
execution-mode: execute
---

# /plan:hard — Comprehensive Technical & Feature Planning (DAG Parallel Fan-Out)

> **MISSION**: Produce a complete, self-contained implementation plan with Feature Discovery, parallel Codebase + Pattern Analysis, Given/When/Then acceptance criteria, ≥5 edge cases per feature, dependency matrix, and risk mitigation. **NO code writing — plan deliverables only.**

<task>$ARGUMENTS</task>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/boomopen-workflow-kit/rules/`):
1. `CORE.md` — 2-Mode Gate, Quality-First Model Policy, Brain Artifact Routing
2. `PHASES.md` — DAG-Aware Parallel Fan-Out & Phase Execution
3. `AGENTS.md` — Tiered Execution (`Model: "inherit"` Pro High Default)
4. `SKILLS.md` — Fast 2-Step Progressive Skill Lookup (`<skills>` → `compact-index.json`)

---

## 🔀 TIERED EXECUTION, MODEL POLICY & DELIVERABLES

| Tier | When | Action |
|------|------|--------|
| **TIER 1** | Antigravity 2.0 Sub-Agents (`define_subagent`, `invoke_subagent`, `send_message`) or `runSubagent` EXISTS | Invoke isolated sub-agent with `Model: "inherit"` (Pro High default; NEVER `flash_lite`) |
| **TIER 2** | Tool MISSING or system error | EMBODY agent `.md` file (FALLBACK) |

**Deliverable Routing (Antigravity 2.0 Clean Git Tree)**:
- **Default**: `<appDataDir>\brain\<conversation-id>\{TYPE}-{task}.md` (`BRAINSTORM-{task}.md`, `RESEARCH-{task}.md`, `SCOUT-{task}.md`, `PLAN-{task}.md`)
- **Workspace Export Fallback**: `./reports/{topic}/{type_plural}/{TYPE}-{task}.md` (only when explicitly requested or on non-Antigravity tools)
- **Language**: Write all deliverables in the user's input language (technical terms in English).

---

## ⛔ ABSOLUTE PROHIBITION — NO CODE

- ❌ NEVER write implementation code (TypeScript, Python, Rust, etc.) or modify source files.
- ❌ NEVER auto-transition to `/code`, `/cook`, or `/fix`.
- ✅ Use `ask_question` (interactive UI multiple-choice widget) when scope or architectural choices require user confirmation.

---

## 🎭 Phase 1: REQUIREMENTS & FEATURE DISCOVERY (`brainstormer`)

| Agent | `brainstormer` (`Model: "inherit"`) |
|-------|-------------------------------------|
| Goal | Discover all explicit + implicit features, CRUD operations, and cross-cutting concerns |
| Output | `<appDataDir>\brain\<conversation-id>\BRAINSTORM-{task}.md` (or `./reports/{topic}/brainstorms/BRAINSTORM-{task}.md`) |

**Feature Discovery Engine Checklist**:
1. **Entity Decomposition**: Map every data entity to its required CRUD/List/Search operations.
2. **Sub-Feature Inference**: Forms, validation, loading/empty/error states, permissions, notifications.
3. **Interactive Scope Confirmation**: If scope is ambiguous, use `ask_question` to confirm MVP vs. P1/P2 features with the user.

---

## ⚡ PARALLEL FAN-OUT: Phase 2A (`scouter`) + Phase 2B (`researcher`)

> **🚀 DAG FAN-OUT DIRECTIVE**: Launch `scouter` (codebase architecture & integration points) AND `researcher` (best practices, patterns, & libraries) **concurrently in a single turn** via two `invoke_subagent` calls (`Model: "inherit"`). Join via Reactive Async Wakeup before Phase 3.

| Agent | Output Deliverable | Goal |
|-------|--------------------|------|
| `scouter` (`Model: "inherit"`) | `<appDataDir>\brain\<conversation-id>\SCOUT-{task}.md` | Map existing architecture, reusable modules, DB schema, and file locations |
| `researcher` (`Model: "inherit"`) | `<appDataDir>\brain\<conversation-id>\RESEARCH-{task}.md` | Evaluate patterns, libraries, security/perf considerations, and trade-offs |

---

## 🎭 Phase 3: DETAILED SPECIFICATION & PLAN (`planner` — Sequential Gate)

| Agent | `planner` (`Model: "inherit"`) |
|-------|--------------------------------|
| Prerequisite | **READ** `BRAINSTORM-{task}.md`, `SCOUT-{task}.md`, and `RESEARCH-{task}.md` |
| Goal | Create self-contained implementation plan with atomic tasks (≤ 2h each) |
| Output | `<appDataDir>\brain\<conversation-id>\PLAN-{task}.md` (or `./reports/{topic}/plans/PLAN-{task}.md`) |

### Mandatory Plan Structure (Per Feature / Phase)

1. **Atomic Task Breakdown**: Every task MUST be ≤ 2 hours effort, scoped to 1–3 files, with target file paths and verification steps.
2. **Acceptance Criteria Table (`Given / When / Then / Verify`)**:
   ```markdown
   | # | Given | When | Then | Verify |
   |:-:|-------|------|------|--------|
   | 1 | Valid user session | Submits payload X | Returns 200 + updates state | Unit/Integration test |
   ```
3. **Edge Cases Table (Minimum 5 per feature)**: Cover Empty state, Network/Server error, Loading state, Boundary/Max limit, Unauthorized/Permission denied, Concurrent mutation.
4. **API & Data Contracts (If applicable)**: Endpoint, Method, Request payload, Response 200, and Error codes.
5. **Dependency Matrix & Effort Estimation (with 1.5x Buffer)**: Highlight parallelizable tasks (e.g., Backend + Frontend).
6. **Risk Matrix & Rollback Strategy**: Probability, Impact, Mitigation, and exact Rollback command/steps.

---

## 🎭 Phase 4: PLAN COVERAGE AUDIT (`reviewer`)

| Agent | `reviewer` (`Model: "inherit"`) |
|-------|---------------------------------|
| Goal | Verify 100% requirement coverage, constraint compliance, and zero vague acceptance criteria |
| Exit | All checks pass: Feature coverage ✓ | Atomic tasks ✓ | Given/When/Then ✓ | ≥5 Edge cases ✓ | Rollback defined ✓ |

---

## ⛔ HARD STOP — AWAIT USER DECISION

Present the `<appDataDir>\brain\<conversation-id>\PLAN-{task}.md` artifact to the user and **STOP**. Offer next steps via `ask_question` or summary:
1. 🏗️ `/cook:hard` or `/cook:team` → Execute implementation plan
2. 🔍 `/plan:team` → Run Golden Triangle adversarial review on the plan
3. 🔄 Refine specific phases or scope
