---
description: ⚡⚡⚡ Deep Plan — Comprehensive feature discovery, Given/When/Then specs, edge cases, and multi-phase planning
version: "5.1"
category: planning
execution-mode: execute
---

# /plan:hard — Comprehensive Technical & Feature Planning

> **MISSION**: Produce a complete, self-contained implementation plan with Feature Discovery, Given/When/Then acceptance criteria, ≥5 edge cases per feature, dependency matrix, and risk mitigation. **NO code writing — plan deliverables only.**

<task>$ARGUMENTS</task>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/boomopen-workflow-kit/rules/`):
1. `CORE.md` — 2-Mode Gate, 10 Laws, Brain Artifact Routing
2. `PHASES.md` — Phase Execution
3. `AGENTS.md` — Tiered Execution (TIER 0 / TIER 1 / TIER 2)
4. `SKILLS.md` — Fast 2-Step Progressive Skill Lookup

---

## 🔀 TIERED EXECUTION & DELIVERABLES

| Tier | When | Action |
|------|------|--------|
| **TIER 1** | Antigravity 2.0 Sub-Agents (`define_subagent`, `invoke_subagent`, `send_message`) or `runSubagent` EXISTS | Invoke isolated sub-agent per phase (MANDATORY) |
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

| Agent | `brainstormer` |
|-------|----------------|
| Goal | Discover all explicit + implicit features, CRUD operations, and cross-cutting concerns |
| Output | `<appDataDir>\brain\<conversation-id>\BRAINSTORM-{task}.md` (or `./reports/{topic}/brainstorms/BRAINSTORM-{task}.md`) |

**Feature Discovery Engine Checklist**:
1. **Entity Decomposition**: Map every data entity to its required CRUD/List/Search operations.
2. **Sub-Feature Inference**: Forms, validation, loading/empty/error states, permissions, notifications.
3. **Interactive Scope Confirmation**: If scope is ambiguous, use `ask_question` to confirm MVP vs. P1/P2 features with the user.

---

## 🎭 Phase 2: CODEBASE & PATTERN ANALYSIS (`scouter` + `researcher`)

| Agent | `scouter` (codebase) + `researcher` (patterns/libraries) |
|-------|----------------------------------------------------------|
| Goal | Map existing architecture, reusable modules, DB schema, and best practices |
| Output | `<appDataDir>\brain\<conversation-id>\SCOUT-{task}.md` & `RESEARCH-{task}.md` |
| Exit | File locations, integration points, and architectural constraints locked |

---

## 🎭 Phase 3: DETAILED SPECIFICATION & PLAN (`planner`)

| Agent | `planner` |
|-------|-----------|
| Prerequisite | **READ** `BRAINSTORM-{task}`, `SCOUT-{task}`, and `RESEARCH-{task}` |
| Goal | Create self-contained implementation plan with atomic tasks (≤ 2h each) |
| Output | `<appDataDir>\brain\<conversation-id>\PLAN-{task}.md` (or `./reports/{topic}/plans/PLAN-{task}.md`) |

### Mandatory Plan Structure (Per Feature / Phase)

#### 1. Atomic Task Breakdown
Every task MUST be ≤ 2 hours effort, scoped to 1–3 files, with target file paths and verification steps.

#### 2. Acceptance Criteria Table (`Given / When / Then / Verify`)
```markdown
| # | Given | When | Then | Verify |
|:-:|-------|------|------|--------|
| 1 | Valid user session | Submits payload X | Returns 200 + updates state | Unit/Integration test |
```

#### 3. Edge Cases Table (Minimum 5 per feature)
Cover: Empty state, Network/Server error, Loading state, Boundary/Max limit, Unauthorized/Permission denied, Concurrent mutation.

#### 4. API & Data Contracts (If applicable)
```markdown
| Endpoint | Method | Request | Response 200 | Error Codes |
|----------|--------|---------|--------------|-------------|
| /api/v1/resource | POST | { field } | { id, createdAt } | 400, 401, 409 |
```

#### 5. Dependency Matrix & Effort Estimation (with 1.5x Buffer)
```markdown
| Phase | Features | Raw Effort | +1.5x Buffer | Priority | Depends On |
|:-----:|----------|:----------:|:------------:|:--------:|------------|
| P1 | Foundation & DB | Xh | 1.5Xh | 🔴 MVP | — |
| P2 | Core API & UI | Yh | 1.5Yh | 🔴 MVP | P1 |
```

#### 6. Risk Matrix & Rollback Strategy
```markdown
| Risk | Prob | Impact | Mitigation | Rollback Step |
|------|:----:|:------:|------------|---------------|
| Schema migration issue | M | H | Test on staging | Run down-migration + revert |
```

---

## 🎭 Phase 4: PLAN COVERAGE AUDIT (`reviewer`)

| Agent | `reviewer` |
|-------|------------|
| Goal | Verify 100% requirement coverage, constraint compliance, and zero vague acceptance criteria |
| Exit | All checks pass: Feature coverage ✓ | Atomic tasks ✓ | Given/When/Then ✓ | ≥5 Edge cases ✓ | Rollback defined ✓ |

---

## ⛔ HARD STOP — AWAIT USER DECISION

Present the `PLAN-{task}.md` artifact to the user and **STOP**. Offer next steps via `ask_question` or summary:
1. 🏗️ `/cook:hard` or `/cook:team` → Execute implementation plan
2. 🔍 `/plan:team` → Run Golden Triangle adversarial review on the plan
3. 🔄 Refine specific phases or scope
