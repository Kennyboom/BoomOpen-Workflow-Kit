---
description: "🔺 Golden Triangle Core Protocol — Shared reference for all *:team workflows"
version: "5.4"
type: reference
---

# 🔺 Golden Triangle Protocol

> **THIS FILE IS REFERENCED BY ALL `*-team.md` WORKFLOWS.**
> Every rule below is **MANDATORY** and **BINDING** when running any `:team` command.

---

## 🔀 TIERED EXECUTION (MANDATORY — NO LAZY FALLBACK)

| Tier | Condition | Action |
|------|-----------|--------|
| **TIER 1** | Antigravity 2.0 Native Sub-Agents (`define_subagent`, `invoke_subagent`, `send_message`, `manage_subagents`) or `runSubagent` EXISTS | **MUST** invoke EACH triangle member as a SEPARATE isolated sub-agent call. Use `send_message` with **Reactive Async Wakeup** (never poll in a loop). |
| **TIER 2** | Sub-agent tool MISSING or throws system error | Load agent `.md` file → adopt persona in explicit `[ROLE: ...]` blocks (LAST RESORT) |

**❌ ANTI-LAZY RULE**: If native sub-agent tools (`invoke_subagent` / `runSubagent`) exist in your tool declarations, using TIER 2 is a **PROTOCOL VIOLATION**. Each of the 3 triangle roles MUST be a separate `invoke_subagent` (or `runSubagent`) invocation per round.

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

## 🛑 PRE-FLIGHT (LOAD BEFORE PHASE 1)

Load in order from `./rules/` or `~/.{TOOL}/skills/boomopen-workflow-kit/rules/`:
1. `CORE.md` — 2-Mode Gate, 10 Laws, Brain Artifact Routing
2. `PHASES.md` — Phase Execution
3. `AGENTS.md` — Tiered Execution (TIER 0 / TIER 1 / TIER 2)
4. `TEAMS.md` — Golden Triangle Protocol
5. `SKILLS.md` — Fast 2-Step Progressive Skill Lookup

---

## 🔄 STANDARD TRIANGLE LOOP (FOR NON-CODE PHASES)

Each phase with a 🔺 Golden Triangle follows this loop (max 3 rounds):

```
Round 1:
  STEP A — SUB-AGENT CALL #1: {Tech Lead agent}
    → Decomposes phase into specific tasks + acceptance criteria
    → Appends [TASK_BRIEF] to MAILBOX file

  STEP B — SUB-AGENT CALL #2: {Executor agent}
    → Reads TASK_BRIEF from MAILBOX
    → Executes work (reads code, analyzes, designs, writes deliverable)
    → Appends [REPORT] to MAILBOX file

  STEP C — SUB-AGENT CALL #3: {Reviewer agent}
    → Reads TASK_BRIEF + REPORT from MAILBOX
    → Challenges EVERY claim with concrete evidence
    → Appends [CRITIQUE] with issues (🔴 CRITICAL / 🟠 HIGH / 🟡 MEDIUM) OR [APPROVAL]

Round 2..3 (ONLY if Reviewer found 🔴 CRITICAL or 🟠 HIGH issues):
  STEP D — SUB-AGENT CALL: {Executor agent} addresses each issue → appends [REVISION]
  STEP E — SUB-AGENT CALL: {Reviewer agent} re-evaluates → [APPROVAL] or [CRITIQUE]
  STEP F — SUB-AGENT CALL: {Tech Lead agent} mediates if deadlocked → [CONSENSUS]

Exit: "✅ CONSENSUS: {TL} ✓ | {Exec} ✓ | {Rev} ✓" appended to MAILBOX
```

---

## ⛔ EXECUTION RULES

1. **Incremental**: One phase at a time. Complete Phase N consensus BEFORE starting Phase N+1.
2. **Evidence-Based**: Every claim must reference actual file paths, line numbers, or command outputs.
3. **Language**: Deliverable files in `<appDataDir>\brain\<conversation-id>\` or `./reports/{topic}/` → same language as user's input (technical terms in English). Code comments → English.
4. **Blocking Dependencies**: If a required input deliverable (`PLAN`, `RESEARCH`, `SCOUT`, `DESIGN`) is missing → STOP → create it first.
