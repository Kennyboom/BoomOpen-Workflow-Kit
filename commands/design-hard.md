---
description: ⚡⚡⚡ Full Design — Complete design process with research
version: "5.5"
category: design
execution-mode: execute
---

> **📂 Deliverable Routing (v5.1)**: On Antigravity 2.0, write transient deliverables (`BRAINSTORM`, `RESEARCH`, `SCOUT`, `DESIGN`, `PLAN`, `DEBUG`, `TEST`, `REVIEW`, `REPORT`, `MAILBOX`) to `<appDataDir>\brain\<conversation-id>\` to keep the Git tree clean (use `./reports/{topic}/` on non-Antigravity tools or when explicitly requested).

---

# /design:hard — Full Design Process

> **MISSION**: Execute complete design process with research, exploration, and iteration.

<request>$ARGUMENTS</request>

---

## ⚡ TURN-1 ZERO-TAX DISPATCH & ON-DEMAND RULES

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/boomopen-workflow-kit/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution

⚡ **TURN-1 ZERO-TAX DISPATCH**: Core orchestration laws and the 5-Field Handoff Packet are pre-loaded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Launch Phase 1 sub-agents **immediately on Turn 1** via `invoke_subagent(TypeName: "self", Model: "inherit")`; load `rules/TEAMS.md` or `rules/PHASES.md` in parallel only when needed.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand for fitness calculation and dynamic discovery (hard/team variants enable find-skills).

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
  researcher: "./reports/{topic}/researchers/RESEARCH-{request}"
  scouter: "./reports/{topic}/scouts/SCOUT-{request}"
  designer: "./reports/{topic}/designs/DESIGN-{request}" # MANDATORY OUTPUT

enforcement:
  - Design phase MUST create design file
  - Design file is the deliverable for implementation phases
```

All deliverables in `<appDataDir>\\brain\\<conversation-id>\\` (or `./reports/{topic}/`) → Write in the same language the user communicates with you. Code comments remain in English.
**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

Execute phases using **DAG Parallel Fan-Out** for independent tracks, **Direct Plan-to-Executor Dispatch** (`Model: "inherit"`), and **Stateful Warm Sub-agent Reuse** (`send_message`) per `rules/PHASES.md` (v5.5).

---

## 🎭 Phase 1: REQUIREMENTS DISCOVERY

| Attribute | Value                       |
| --------- | --------------------------- |
| **Agent** | `brainstormer`              |
| **Goal**  | Clarify design requirements |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke native sub-agent (`invoke_subagent` / `runSubagent`) for `brainstormer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/brainstormer.md`
> EMBODY [brainstormer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Requirements clear
- [ ] User needs identified
- [ ] Constraints documented
- [ ] **METHODOLOGY CHECK**: Output aligns with `brainstormer` Thinking Protocol (Socratic questioning, assumption surfacing)

---

## 🎭 Phase 2: RESEARCH

| Attribute | Value                           |
| --------- | ------------------------------- |
| **Agent** | `researcher`                    |
| **Goal**  | Research design patterns and UX |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke native sub-agent (`invoke_subagent` / `runSubagent`) for `researcher`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/researcher.md`
> EMBODY [researcher] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Patterns researched
- [ ] Best practices identified
- [ ] **METHODOLOGY CHECK**: Output aligns with `researcher` Thinking Protocol (sources cited, evidence-based)

---

## 🎭 Phase 3: CODEBASE ANALYSIS

| Attribute | Value                      |
| --------- | -------------------------- |
| **Agent** | `scouter`                  |
| **Goal**  | Map existing design system |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke native sub-agent (`invoke_subagent` / `runSubagent`) for `scouter`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/scouter.md`
> EMBODY [scouter] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Design system documented
- [ ] Component inventory
- [ ] Integration points
- [ ] **METHODOLOGY CHECK**: Output aligns with `scouter` Thinking Protocol (file locations, patterns documented)

---

## 🎭 Phase 4: DESIGN CREATION

| Attribute | Value                  |
| --------- | ---------------------- |
| **Agent** | `designer`             |
| **Goal**  | Full design with specs |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke native sub-agent (`invoke_subagent` / `runSubagent`) for `designer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/designer.md`
> EMBODY [designer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Design complete
- [ ] All states covered
- [ ] Accessibility verified
- [ ] Specs documented
- [ ] **METHODOLOGY CHECK**: Output aligns with `designer` Thinking Protocol (user empathy, accessibility-first, visual hierarchy)

---

---

## 🎭 Phase 5: DESIGN REVIEW

| Attribute | Value                 |
| --------- | --------------------- |
| **Agent** | `reviewer`            |
| **Goal**  | Review design quality |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke native sub-agent (`invoke_subagent` / `runSubagent`) for `reviewer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/reviewer.md`
> EMBODY [reviewer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Design reviewed
- [ ] Standards met
- [ ] Approved
- [ ] **METHODOLOGY CHECK**: Output aligns with `reviewer` Thinking Protocol (specific feedback, priority matrix)

---

## COMPLETION

Present design with:

1. ✅ **Done** — Design complete
2. 💻 **Implement** → `/code:hard`
3. 🔄 **Iterate** — Further refinement
