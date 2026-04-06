---
description: ⚡ Quick Ideation — Rapid idea generation
version: "1.0"
category: planning
execution-mode: execute
---

# /brainstorm:fast — Rapid Ideation

> **MISSION**: Generate ideas quickly through focused exploration without external research.

<topic>$ARGUMENTS</topic>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.gemini/antigravity/skills/boomopen-workflow-kit/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand. Fast variant uses matrix-only (no dynamic discovery for speed optimization).

---

## 🔀 TIERED EXECUTION PROTOCOL (MANDATORY)

> **Reference: AGENTS.md (Tiered Execution)`

```yaml
tiered_execution:
  principle: "Sub-agent FIRST (Tier 1). EMBODY ONLY on system failure (Tier 2)."
  for_each_phase:
    TIER_1_MANDATORY: "IF tool exists → MUST use SUB_AGENT_DELEGATION"
    TIER_2_FALLBACK: "ONLY on system error—NOT complexity/preference/speed"
  anti_lazy_fallback:
    - ❌ NEVER use Tier 2 when Tier 1 tool is available
    - ✅ ALWAYS attempt Tier 1 first when tool exists
```

---

## ⚠️ CRITICAL: DELIVERABLE FILE RULES

```yaml
deliverable_files:
  brainstormer: "./reports/{topic}/brainstorms/BRAINSTORM-{topic}" # MANDATORY for substantial synthesis

enforcement:
  - Clarification questions → Chat OK
  - Idea synthesis/analysis → MUST create file
```

All files in `./reports/{topic}/` → Write in the same language the user communicates with you. Code comments remain in English.
**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## ⛔ ABSOLUTE PROHIBITION — NO CODE

> **🔴 THIS WORKFLOW PRODUCES REPORTS ONLY. NO CODE.**
>
> - ❌ NEVER write implementation code (TypeScript, Python, Rust, etc.)
> - ❌ NEVER modify source files
> - ❌ NEVER run build/test commands
> - ❌ NEVER auto-implement findings or auto-transition to `/code`, `/cook`, `/fix`
> - ✅ ONLY produce report/analysis files in `./reports/{topic}/`
> - ✅ ONLY create ideation/research documents
>
> If user wants implementation after research, they must EXPLICITLY invoke another workflow.

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what’s happening (announce before doing).

---

## 🎭 Phase 1: TOPIC CLARIFICATION

| Attribute | Value                                |
| --------- | ------------------------------------ |
| **Agent** | `brainstormer`                       |
| **Goal**  | Clarify requirements and constraints |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `brainstormer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/brainstormer.md`
> EMBODY [brainstormer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Topic understood
- [ ] Constraints identified
- [ ] Success criteria defined
- [ ] **METHODOLOGY CHECK**: Output aligns with `brainstormer` Thinking Protocol

---

## 🎭 Phase 2: IDEA GENERATION

| Attribute | Value                  |
| --------- | ---------------------- |
| **Agent** | `brainstormer`         |
| **Goal**  | Generate diverse ideas |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `brainstormer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/brainstormer.md`
> EMBODY [brainstormer] — Requires logged system error justification.

**MANDATORY**: CREATE `./reports/{topic}/brainstorms/BRAINSTORM-{topic}` for synthesis

**Exit Criteria:**

- [ ] Brainstorm file created at `./reports/{topic}/brainstorms/BRAINSTORM-{topic}`
- [ ] Multiple ideas generated
- [ ] Ideas categorized
- [ ] Trade-offs noted
- [ ] **METHODOLOGY CHECK**: Output aligns with `brainstormer` Thinking Protocol

---

## 🎭 Phase 3: CODEBASE CONTEXT (CONDITIONAL)

| Attribute   | Value                                |
| ----------- | ------------------------------------ |
| **Agent**   | `scouter`                            |
| **Goal**    | Find relevant existing patterns      |
| **Trigger** | If ideas relate to existing codebase |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `scouter`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/scouter.md`
> EMBODY [scouter] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Existing patterns found
- [ ] Integration points identified
- [ ] **METHODOLOGY CHECK**: Output aligns with `scouter` Thinking Protocol

---

## ⛔ HARD STOP — AWAIT USER DECISION

> **WORKFLOW COMPLETE. DO NOT PROCEED FURTHER.**
>
> Present deliverable files to user and STOP. Wait for explicit user command.
>
> Suggested next steps (USER must explicitly choose):
> 1. 🔬 `/brainstorm:hard` → Deeper research
> 2. 📋 `/plan` → Plan implementation
> 3. 🏗️ `/code` or `/cook` → Build
> 4. 🔄 Ask for changes → Iterate on research
>
> **⛔ DO NOT auto-transition to any workflow. YIELD control to user.**
