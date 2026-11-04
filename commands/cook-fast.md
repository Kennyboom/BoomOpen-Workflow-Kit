---
description: ⚡ Quick Feature — Rapid feature implementation
version: "5.5"
category: engineering
execution-mode: execute
---

> **📂 Deliverable Routing (v5.5)**: On Antigravity 2.0, write transient deliverables (`BRAINSTORM`, `RESEARCH`, `SCOUT`, `DESIGN`, `PLAN`, `DEBUG`, `TEST`, `REVIEW`, `REPORT`, `MAILBOX`) to `<appDataDir>\brain\<conversation-id>\` to keep the Git tree clean (use `./reports/{topic}/` on non-Antigravity tools or when explicitly requested).

---

# /cook:fast — Rapid Feature Implementation

> **MISSION**: Quickly implement well-defined features with minimal ceremony.

<feature>$ARGUMENTS</feature>

---

## ⚡ TURN-1 ZERO-TAX DISPATCH & ON-DEMAND RULES

⚡ **TURN-1 ZERO-TAX DISPATCH**: Core orchestration laws and the **5-Field Handoff Packet** (`1. MISSION & ACCEPTANCE CRITERIA`, `2. SHARED_CONTRACT`, `3. OWNED_FILES`, `4. READ_ONLY_FILES`, `5. VERIFICATION & DELIVERABLE`) are pre-loaded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Do **NOT** block Turn 1 reading `CORE.md`, `PHASES.md`, or `AGENTS.md` — launch Phase 1 sub-agents **immediately on Turn 1** via `invoke_subagent(TypeName: "self", Model: "inherit")` (0-turn fast-track) or `TypeName: "research"` for read-only local scouting, and load `./rules/*.md` on-demand only when needed.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand. Fast variant uses matrix-only (no dynamic discovery for speed optimization).

---

## 🔀 TIERED EXECUTION

| Tier       | When               | Action                       |
| ---------- | ------------------ | ---------------------------- |
| **TIER 1** | Antigravity 2.0 Native Sub-Agents (`invoke_subagent`, `send_message`) or `runSubagent` EXISTS | Spawn via `invoke_subagent(TypeName: "self", Model: "inherit")` with 5-Field Handoff Packet (`SHARED_CONTRACT` + `OWNED_FILES`) & reuse warm sessions via `send_message` (MANDATORY) |
| **TIER 2** | Tool MISSING       | EMBODY agent file (FALLBACK) |

**❌ Anti-Lazy**: Never use TIER 2 when TIER 1 tool available.

---

## 📁 PRIOR PLAN CHECK

```
IF `<appDataDir>\\brain\\<conversation-id>\\PLAN-{feature}.md` (or `./reports/{topic}/plans/PLAN-{feature}`) exists (.md file or folder):
  → READ and FOLLOW it
ELSE:
  → Create micro-plan inline
```

All deliverables in `<appDataDir>\\brain\\<conversation-id>\\` (or `./reports/{topic}/`) → Write in the same language the user communicates with you. Code comments remain in English.
**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

Execute phases using **DAG Parallel Fan-Out** for independent tracks, **Direct Plan-to-Executor Dispatch** (`Model: "inherit"`), and **Stateful Warm Sub-agent Reuse** (`send_message`) per `rules/PHASES.md` (v5.5).

---

## 🎭 Phase 1: CONTEXT SCAN

| Agent | `scouter`                                     |
| ----- | --------------------------------------------- |
| Goal  | Quick context gathering                       |
| Exit  | Patterns found, integration points identified |

---

## 🎭 Phase 2: MICRO-PLANNING

| Agent | `planner`                          |
| ----- | ---------------------------------- |
| Goal  | Quick implementation checklist     |
| Exit  | Steps identified, approach defined |

---

## 🎭 Phase 3: IMPLEMENTATION

| Agent        | Route by domain                                                               |
| ------------ | ----------------------------------------------------------------------------- |
| Route        | UI → `frontend-engineer`, API → `backend-engineer`, DB → `database-architect` (`TypeName: "self"`, `Model: "inherit"`) |
| Prerequisite | READ `<appDataDir>\\brain\\<conversation-id>\\PLAN-{feature}` (or `./reports/{topic}/plans/PLAN-{feature}`) if exists and lock `SHARED_CONTRACT` + disjoint `OWNED_FILES` |
| Goal         | Implement feature adhering strictly to **Pragmatic 2-Tier Coding Standards** (Tier 1 zero `any`/no debug `console.log`/`try-catch` boundaries + Tier 2 cohesive `~200–350` lines target, `≤ 400–450` soft ceiling) |
| Exit         | Feature implemented, `node cli/install.js check <dir>` + build/typecheck/tests pass |

---

## ESCALATION

| Condition                  | Route To            |
| -------------------------- | ------------------- |
| More complex than expected | `/cook:hard`        |
| Design needed              | `designer`          |
| Security concern           | `security-engineer` |

---

## COMPLETION

Present feature with:

1. ✅ **Done** — Feature complete
2. 🧪 **Test** → `/test`
3. 📝 **Docs** → `/docs:core`
