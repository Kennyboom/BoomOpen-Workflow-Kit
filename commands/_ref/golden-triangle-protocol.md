---
description: "🔺 Golden Triangle Core Protocol — Shared reference for all *:team workflows"
version: "5.5"
type: reference
---

# 🔺 Golden Triangle Protocol

> **THIS FILE IS REFERENCED BY ALL `*-team.md` WORKFLOWS.**
> Every rule below is **MANDATORY** and **BINDING** when running any `:team` command.

---

## 🔀 TIERED EXECUTION (MANDATORY — NO LAZY FALLBACK)

| Tier | Condition | Action |
|------|-----------|--------|
| **TIER 1** | Antigravity 2.0 Native Sub-Agents (`invoke_subagent`, `send_message`, `manage_subagents`) or `runSubagent` EXISTS | **MUST** spawn each of the 3 triangle roles **once** on Turn 1 (`TypeName: "self"`, `Model: "inherit"`) and reuse their warm sessions across Round 2..3 via `send_message(Recipient: conversationId)` with **Reactive Async Wakeup** (never poll in a loop). |
| **TIER 2** | Sub-agent tool MISSING or throws system error | Load agent `.md` file → adopt persona in explicit `[ROLE: ...]` blocks (LAST RESORT) |

**❌ ANTI-LAZY & WARM SESSION REUSE RULE**: If native sub-agent tools (`invoke_subagent` / `send_message` / `runSubagent`) exist in your tool declarations, using TIER 2 is a **PROTOCOL VIOLATION**. Spawn the 3 triangle roles (`Tech Lead`, `Executor`, `Reviewer`) **once** per phase (`TypeName: "self"`, `Model: "inherit"`), store their `conversationId`s, and conduct all subsequent round-2/round-3 critiques, revisions, defenses, and consensus checks via **Warm Sub-agent Session Reuse (`send_message(Recipient: conversationId)`)** — NEVER cold re-spawn new subagents every round!

---

## 📬 MAILBOX FILE (INTER-AGENT COMMUNICATION LOG)

At workflow start, create:
- **Antigravity 2.0 Default (Clean Git Tree)**: `<appDataDir>\brain\<conversation-id>\MAILBOX-{date}.md`
- **Workspace Export Fallback**: `./reports/{topic}/MAILBOX-{date}.md` (only when explicitly requested or on non-Antigravity tools)

Every message between triangle members MUST be appended to this file:

```markdown
### [Round {N}] [{FROM_ROLE} ({agent})] → [{TO_ROLE} ({agent})] [{TYPE}]
**Phase**: {phase_name}
**Content**:
{actual findings, code paths, critiques — NEVER placeholders}
---
```

Message types: `TASK_BRIEF`, `REPORT`, `CRITIQUE`, `REVISION`, `APPROVAL`, `CONSENSUS`, `ESCALATION`

---

## ⚡ TURN-1 ZERO-TAX DISPATCH & ON-DEMAND RULES

> **NO BLOCKING PRE-FLIGHT READS**: Core orchestration laws and the 5-Field Handoff Packet (`1. MISSION`, `2. SHARED_CONTRACT`, `3. OWNED_FILES`, `4. READ_ONLY_FILES`, `5. VERIFICATION`) are pre-embedded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Do **NOT** waste Turn 1 reading `CORE.md`, `PHASES.md`, or `AGENTS.md` before spawning Phase 1 triangle sub-agents! Load `rules/TEAMS.md` or `rules/SKILLS.md` on-demand only when needed.

---

## 🔄 STANDARD TRIANGLE LOOP (WITH WARM SESSION REUSE `send_message`)

Each phase with a 🔺 Golden Triangle follows this loop (max 3 rounds):

```
Round 1 (Initial Spawn via invoke_subagent(TypeName: "self", Model: "inherit") or Warm Reuse):
  STEP A — TECH LEAD (`invoke_subagent` → save conversationId): {Tech Lead agent}
    → Decomposes phase into specific tasks + SHARED_CONTRACT + OWNED_FILES + acceptance criteria
    → Appends [TASK_BRIEF] to `<appDataDir>\brain\<conversation-id>\MAILBOX-{date}.md`

  STEP B — EXECUTOR (`invoke_subagent` → save conversationId): {Executor agent}
    → Reads TASK_BRIEF from MAILBOX
    → Executes work (reads code, analyzes, designs, writes deliverable)
    → Appends [REPORT] to MAILBOX file

  STEP C — REVIEWER (`invoke_subagent` → save conversationId): {Reviewer agent}
    → Reads TASK_BRIEF + REPORT from MAILBOX
    → Challenges EVERY claim with concrete evidence
    → Appends [CRITIQUE] with issues (🔴 CRITICAL / 🟠 HIGH / 🟡 MEDIUM) OR [APPROVAL]

Round 2..3 (WARM SESSION REUSE via `send_message(Recipient: conversationId)` — ONLY if 🔴 CRITICAL or 🟠 HIGH):
  STEP D — WARM CALL (`send_message` to Executor `conversationId`): {Executor agent} addresses each issue (or defends with evidence) → appends [REVISION]
  STEP E — WARM CALL (`send_message` to Reviewer `conversationId`): {Reviewer agent} re-evaluates → [APPROVAL] or [CRITIQUE]
  STEP F — WARM CALL (`send_message` to Tech Lead `conversationId`): {Tech Lead agent} mediates if deadlocked → [CONSENSUS]

Exit: "✅ CONSENSUS: {TL} ✓ | {Exec} ✓ | {Rev} ✓" appended to MAILBOX
```

---

## ⛔ EXECUTION RULES

1. **Incremental**: One phase at a time. Complete Phase N consensus BEFORE starting Phase N+1.
2. **Evidence-Based**: Every claim must reference actual file paths, line numbers, or command outputs.
3. **Language**: Deliverable files in `<appDataDir>\brain\<conversation-id>\` or `./reports/{topic}/` → same language as user's input (technical terms in English). Code comments → English.
4. **Blocking Dependencies**: If a required input deliverable (`PLAN`, `RESEARCH`, `SCOUT`, `DESIGN`) is missing → STOP → create it first.
