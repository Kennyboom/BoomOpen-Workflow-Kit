---
description: ⚡ Quick Answer — Direct response from codebase context
version: "5.5"
category: knowledge
execution-mode: execute
---

# /ask:fast — Quick Question Answering

> **MISSION**: Provide fast, accurate answers using codebase context and existing knowledge.

<question>$ARGUMENTS</question>

---

## ⚡ TURN-1 ZERO-TAX DISPATCH & ON-DEMAND RULES

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/boomopen-workflow-kit/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution

⚡ **TURN-1 ZERO-TAX DISPATCH**: Core orchestration laws and the 5-Field Handoff Packet are pre-loaded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Launch Phase 1 sub-agents **immediately on Turn 1** via `invoke_subagent(TypeName: "self", Model: "inherit")`; load `rules/TEAMS.md` or `rules/PHASES.md` in parallel only when needed.

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

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

Execute phases using **DAG Parallel Fan-Out** for independent tracks, **Direct Plan-to-Executor Dispatch** (`Model: "inherit"`), and **Stateful Warm Sub-agent Reuse** (`send_message`) per `rules/PHASES.md` (v5.5).

---

## 🎭 Phase 1: CONTEXT GATHERING

| Attribute | Value                                |
| --------- | ------------------------------------ |
| **Agent** | `scouter`                            |
| **Goal**  | Find relevant code and documentation |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke native sub-agent (`invoke_subagent` / `runSubagent`) for `scouter`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/scouter.md`
> EMBODY [scouter] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Relevant files identified
- [ ] Context gathered
- [ ] Information sufficient (if not → escalate to `/ask:hard`)

---

## 🎭 Phase 2: ANSWER FORMULATION

| Attribute | Value                            |
| --------- | -------------------------------- |
| **Agent** | `researcher`                     |
| **Goal**  | Formulate clear, accurate answer |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke native sub-agent (`invoke_subagent` / `runSubagent`) for `researcher`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/researcher.md`
> EMBODY [researcher] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Answer formulated
- [ ] Sources cited
- [ ] Confidence level noted

---

## ESCALATION

| Condition                  | Route To     |
| -------------------------- | ------------ |
| Insufficient context       | `/ask:hard`  |
| Requires external research | `/ask:hard`  |
| Implementation needed      | `/code:fast` |

---

## COMPLETION

Present answer with:

1. ✅ **Answered** — Question resolved
2. 🔬 **Deep Dive** → `/ask:hard` for more detail
3. 💻 **Implement** → Route to implementation workflow
