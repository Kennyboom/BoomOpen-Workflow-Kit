---
description: ⚡⚡⚡ Full Design — Complete design process with research
version: "5.5"
category: design
execution-mode: execute
---

> **📂 Deliverable Routing (v5.5)**: On Antigravity 2.0, write transient deliverables (`BRAINSTORM`, `RESEARCH`, `SCOUT`, `DESIGN`, `PLAN`, `DEBUG`, `TEST`, `REVIEW`, `REPORT`, `MAILBOX`) to `<appDataDir>\brain\<conversation-id>\` to keep the Git tree clean (use `./reports/{topic}/` on non-Antigravity tools or when explicitly requested).

---

# /design:hard — Full Design Process

> **MISSION**: Execute complete design process with parallel research + codebase scouting, 2026 visual craft, and WCAG 2.2 AA verification.

<request>$ARGUMENTS</request>

---

## ⚡ TURN-1 ZERO-TAX DISPATCH & ON-DEMAND RULES

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/boomopen-workflow-kit/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution

⚡ **TURN-1 ZERO-TAX DISPATCH**: Core orchestration laws and the 5-Field Handoff Packet are pre-loaded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Launch Phase 1 sub-agents **immediately on Turn 1** via `invoke_subagent(TypeName: "self", Model: "inherit")`; load `rules/TEAMS.md` or `rules/PHASES.md` in parallel only when needed.

**Mandatory Design Skills for Sub-agents**: Instruct `designer` and `reviewer` to load:
- `skills/design-spec/SKILL.md` & `skills/frontend-design/SKILL.md`
- `skills_library/anti-ai-slop-visual-craft/SKILL.md` & `skills_library/oklch-bento-grid-architecture/SKILL.md`
- `skills_library/motion-v12-view-transitions-css/SKILL.md` & `skills_library/ai-native-generative-ui-ux/SKILL.md`
- `skills_library/wcag-22-accessibility-ergonomics/SKILL.md`

---

## 🔀 TIERED EXECUTION PROTOCOL (MANDATORY)

> **Reference: AGENTS.md (Tiered Execution)**

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
  researcher: "<appDataDir>\\brain\\<conversation-id>\\RESEARCH-{request}.md" # Fallback: ./reports/{topic}/researchers/RESEARCH-{request}.md
  scouter: "<appDataDir>\\brain\\<conversation-id>\\SCOUT-{request}.md"       # Fallback: ./reports/{topic}/scouts/SCOUT-{request}.md
  designer: "<appDataDir>\\brain\\<conversation-id>\\DESIGN-{request}.md"     # MANDATORY OUTPUT (Fallback: ./reports/{topic}/designs/DESIGN-{request}.md)

enforcement:
  - Design phase MUST create DESIGN-{request}.md in <appDataDir>\brain\<conversation-id>\
  - Design file is the canonical contract for downstream implementation phases
```

All deliverables in `<appDataDir>\brain\<conversation-id>\` (or `./reports/{topic}/`) → Write in the same language the user communicates with you. Code comments remain in English.
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

> Invoke native sub-agent (`invoke_subagent(TypeName: "self", Role: "UX Discovery Brainstormer", Model: "inherit")`) for `brainstormer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/brainstormer.md`
> EMBODY [brainstormer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Requirements and JTBD Job Stories clear
- [ ] User needs and constraints documented
- [ ] **METHODOLOGY CHECK**: Output aligns with `brainstormer` Thinking Protocol

---

## 🎭 Phase 2: PARALLEL RESEARCH & CODEBASE SCOUTING (DAG FAN-OUT)

| Attribute | Value                                                                 |
| --------- | --------------------------------------------------------------------- |
| **Agents**| `researcher` + `scouter` (**PARALLEL DAG FAN-OUT** in single turn)    |
| **Goal**  | Research 2026 UX/design patterns AND map existing codebase tokens/UI  |

### ⚡ TIERED EXECUTION (PARALLEL FAN-OUT)

**TIER 1 (MANDATORY when tool exists):**

> Spawn **BOTH** sub-agents in parallel in the same tool call batch:
> 1. `invoke_subagent(TypeName: "self", Role: "UX Researcher", Model: "inherit")` → writes `<appDataDir>\brain\<conversation-id>\RESEARCH-{request}.md` (loads `skills_library/ux-researcher-designer/SKILL.md`).
> 2. `invoke_subagent(TypeName: "research", Role: "Codebase Design Scouter", Model: "inherit")` → writes `<appDataDir>\brain\<conversation-id>\SCOUT-{request}.md` (audits existing CSS/Tailwind tokens, components, and layouts).

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/researcher.md` and `{AGENTS_PATH}/scouter.md`
> EMBODY [researcher] + [scouter] — Requires logged system error justification.

**Exit Criteria:**

- [ ] `RESEARCH-{request}.md` created with evidence-based UX patterns
- [ ] `SCOUT-{request}.md` created with existing design token and component inventory
- [ ] **METHODOLOGY CHECK**: Outputs align with `researcher` and `scouter` Thinking Protocols

---

## 🎭 Phase 3: DESIGN CREATION

| Attribute | Value                  |
| --------- | ---------------------- |
| **Agent** | `designer`             |
| **Goal**  | Full design with specs |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke native sub-agent (`invoke_subagent(TypeName: "self", Role: "Principal Design Architect", Model: "inherit")`) for `designer`.
> **Mandatory Skills**: Load `skills/design-spec/SKILL.md`, `skills/frontend-design/SKILL.md`, `skills_library/anti-ai-slop-visual-craft/SKILL.md`, `skills_library/oklch-bento-grid-architecture/SKILL.md`, `skills_library/motion-v12-view-transitions-css/SKILL.md`, `skills_library/ai-native-generative-ui-ux/SKILL.md`, and `skills_library/wcag-22-accessibility-ergonomics/SKILL.md`.
> Write output to `<appDataDir>\brain\<conversation-id>\DESIGN-{request}.md`.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/designer.md`
> EMBODY [designer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] `DESIGN-{request}.md` complete with YAML token frontmatter and OKLCH color system
- [ ] All 5 UI states (`Idle`, `Loading`, `Empty`, `Error`, `Success`) specified
- [ ] **WCAG 2.2 AA** verified (`Target Size >= 24x24px web / 44x44pt mobile`, `Focus Not Obscured` with `scroll-padding-top/bottom`, `Dragging Alternatives`, `Accessible Auth`)
- [ ] **METHODOLOGY CHECK**: Output aligns with `designer` Thinking Protocol

---

## 🎭 Phase 4: DESIGN & ACCESSIBILITY REVIEW

| Attribute | Value                                           |
| --------- | ----------------------------------------------- |
| **Agent** | `reviewer`                                      |
| **Goal**  | Audit visual craft, token fidelity & WCAG 2.2 AA|

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke native sub-agent (`invoke_subagent(TypeName: "self", Role: "Design & WCAG 2.2 AA Reviewer", Model: "inherit")`) for `reviewer`. Instruct `reviewer` to audit `DESIGN-{request}.md` against `skills_library/anti-ai-slop-visual-craft/SKILL.md` and `skills_library/wcag-22-accessibility-ergonomics/SKILL.md`.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/reviewer.md`
> EMBODY [reviewer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Design reviewed against Anti-AI-Slop rubric and WCAG 2.2 AA criteria
- [ ] Standards met and approved
- [ ] **METHODOLOGY CHECK**: Output aligns with `reviewer` Thinking Protocol

---

## COMPLETION

Present design with:

1. ✅ **Done** — Design complete (`<appDataDir>\brain\<conversation-id>\DESIGN-{request}.md`)
2. 💻 **Implement** → `/code:hard`
3. 🔄 **Iterate** — Further refinement
