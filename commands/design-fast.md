---
description: ⚡ Quick Design — Rapid component/UI design
version: "5.5"
category: design
execution-mode: execute
---

> **📂 Deliverable Routing (v5.5)**: On Antigravity 2.0, write transient deliverables (`BRAINSTORM`, `RESEARCH`, `SCOUT`, `DESIGN`, `PLAN`, `DEBUG`, `TEST`, `REVIEW`, `REPORT`, `MAILBOX`) to `<appDataDir>\brain\<conversation-id>\` to keep the Git tree clean (use `./reports/{topic}/` on non-Antigravity tools or when explicitly requested).

---

# /design:fast — Rapid Design

> **MISSION**: Quickly create design for simple components or UI elements with 2026 visual craft and WCAG 2.2 AA compliance.

<request>$ARGUMENTS</request>

---

## ⚡ TURN-1 ZERO-TAX DISPATCH & ON-DEMAND RULES

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/boomopen-workflow-kit/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution

⚡ **TURN-1 ZERO-TAX DISPATCH**: Core orchestration laws and the 5-Field Handoff Packet are pre-loaded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Launch Phase 1 sub-agents **immediately on Turn 1** via `invoke_subagent(TypeName: "self", Model: "inherit")`; load `rules/TEAMS.md` or `rules/PHASES.md` in parallel only when needed.

**Mandatory Design Skills for Sub-agents**: Instruct `designer` to load `skills/design-spec/SKILL.md`, `skills/frontend-design/SKILL.md`, `skills_library/anti-ai-slop-visual-craft/SKILL.md`, and `skills_library/wcag-22-accessibility-ergonomics/SKILL.md`.

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
  designer: "<appDataDir>\\brain\\<conversation-id>\\DESIGN-{request}.md" # Fallback: ./reports/{topic}/designs/DESIGN-{request}.md

enforcement:
  - Simple component → Chat output OK
  - Page/feature design → MUST create DESIGN-{request}.md artifact in <appDataDir>\brain\<conversation-id>\
```

All deliverables in `<appDataDir>\brain\<conversation-id>\` (or `./reports/{topic}/`) → Write in the same language the user communicates with you. Code comments remain in English.
**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

Execute phases using **DAG Parallel Fan-Out** for independent tracks, **Direct Plan-to-Executor Dispatch** (`Model: "inherit"`), and **Stateful Warm Sub-agent Reuse** (`send_message`) per `rules/PHASES.md` (v5.5).

---

## 🎭 Phase 1: CONTEXT ANALYSIS

| Attribute | Value                         |
| --------- | ----------------------------- |
| **Agent** | `scouter`                     |
| **Goal**  | Find existing design patterns |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke native sub-agent (`invoke_subagent(TypeName: "research", Role: "Codebase Scouter", Model: "inherit")`) for `scouter`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/scouter.md`
> EMBODY [scouter] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Existing patterns and design tokens found
- [ ] Design system understood
- [ ] **METHODOLOGY CHECK**: Output aligns with `scouter` Thinking Protocol

---

## 🎭 Phase 2: DESIGN CREATION

| Attribute | Value                  |
| --------- | ---------------------- |
| **Agent** | `designer`             |
| **Goal**  | Create design solution |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke native sub-agent (`invoke_subagent(TypeName: "self", Role: "Principal Design Architect", Model: "inherit")`) for `designer`. Instruct `designer` to load `skills/design-spec/SKILL.md`, `skills/frontend-design/SKILL.md`, `skills_library/anti-ai-slop-visual-craft/SKILL.md`, and `skills_library/wcag-22-accessibility-ergonomics/SKILL.md`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/designer.md`
> EMBODY [designer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Design created with OKLCH tokens and all 5 UI states (`Idle`, `Loading`, `Empty`, `Error`, `Success`)
- [ ] **WCAG 2.2 AA** verified (`Target Size >= 24x24px web / 44x44pt mobile`, `Focus Not Obscured` via `scroll-padding-top/bottom`, `Dragging Alternatives`)
- [ ] Anti-AI-Slop visual craft verified (no generic `#6366f1` indigo-to-purple gradient clichés)
- [ ] **METHODOLOGY CHECK**: Output aligns with `designer` Thinking Protocol

---

## ESCALATION

| Condition                  | Route To       |
| -------------------------- | -------------- |
| More complex than expected | `/design:hard` |
| Implementation needed      | `/code:fast`   |

---

## COMPLETION

Present design with:

1. ✅ **Done** — Design complete
2. 💻 **Implement** → `/code:fast`
3. 🔄 **Iterate** — Refine design
