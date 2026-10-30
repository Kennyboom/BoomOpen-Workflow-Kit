# 🔺 TEAMS — Golden Triangle Architecture

> **VERSION**: 5.1 — Antigravity 2.0 Smart-Hybrid Edition | **LOAD**: When `:team` variant is invoked | **PURPOSE**: 3-agent adversarial collaboration protocol

---

## 🔒 C8 Foundation Enforcement Checkpoints

- `C8-TEAMS-01` (BLOCK): Mailbox is append-only and required for all inter-agent exchanges.
- `C8-TEAMS-02` (BLOCK): Debate is capped at 3 rounds; unresolved disputes must escalate to Tech Lead arbitration.
- `C8-TEAMS-03` (BLOCK): Phase output requires explicit consensus stamp before release.

---

## CORE PRINCIPLE

Every team phase spawns **3 agent roles** — no more, no less. Quality emerges from structured tension between an Executor who builds and a Reviewer who challenges, orchestrated by a Tech Lead who arbitrates.

```
┌──────────────────────────────────────────────────────────────┐
│  ORCHESTRATOR                                                │
│  └── invokes Golden Triangle for Phase N                     │
│                                                              │
│       ┌─────────────────────────────────┐                    │
│       │         🔺 TECH LEAD            │                    │
│       │   Decomposes · Arbitrates       │                    │
│       │   Synthesizes · FINAL AUTHORITY │                    │
│       └──────────┬──────────┬───────────┘                    │
│                  │          │                                 │
│          ┌───────▼──┐  ┌───▼────────┐                        │
│          │ EXECUTOR  │  │ REVIEWER   │                        │
│          │ Builds    │◄─┤ Challenges │                        │
│          │ Defends   │──►│ Validates  │                        │
│          └──────────┘  └───────────┘                         │
│                  ▲          ▲                                 │
│                  └──── 📬 ──┘                                │
│                    MAILBOX                                    │
└──────────────────────────────────────────────────────────────┘
```

---

## THE THREE ROLES (`agents/teams/{team-name}/`)

| Role | File | Function & Authority |
|------|------|----------------------|
| **Tech Lead** | `techlead.md` | Task decomposer, coordinator, arbitrator, synthesizer. **FINAL AUTHORITY** on all disputes. |
| **Executor** | `executor.md` | Direct implementer. Builds deliverables, posts `SUBMISSION`, and **DEFENDS** valid work with technical evidence when Reviewer is wrong. |
| **Reviewer** | `reviewer.md` | Devil's Advocate quality gatekeeper. Reviews submissions (`PASS`/`FAIL`), challenges assumptions, checks security/performance/edge cases. |

---

## THE DEBATE MECHANISM

```
Executor implements ──► Reviewer critiques (PASS / FAIL)
     │                       │
     ▼                       ▼
Executor DEFENDS (with evidence) OR FIXES ──► Reviewer re-checks (max 3 rounds) ──► Tech Lead ARBITRATES (binding)
```

**Defense rules**:
- Executor MUST defend with **technical evidence** (benchmarks, specs, code references). Disagreement without proof = automatic FAIL.
- Reviewer MUST consider valid evidence. Rejecting proven-correct work = escalation to Tech Lead.
- Max **3 debate rounds** per task. After round 3, Tech Lead issues a binding `DECISION`.

---

## COMMUNICATION LOOP & SHARED ARTIFACTS (BRAIN ARTIFACTS FIRST)

| Artifact | Owner | Default Location (Antigravity 2.0) |
|----------|-------|------------------------------------|
| **Shared Task List** | Tech Lead | Published in phase output & Mailbox (`⏳`/`🔄`/`✅`/`❌`/`🔁`, round `1`–`3`) |
| **Mailbox** | All agents (append-only) | `<appDataDir>\brain\<conversation-id>\MAILBOX-{date}.md` (keeps Git working tree clean; use `./reports/{topic}/MAILBOX-{date}.md` only when user explicitly requests repo export) |

```
1. Tech Lead decomposes task → Publishes Shared Task List → Posts TASK_ASSIGNMENT to Mailbox
2. Executor implements deliverable → Posts SUBMISSION to Mailbox
3. Reviewer inspects submission → Posts REVIEW (✅ PASS or ❌ FAIL) to Mailbox
4. IF FAIL (up to 3 rounds):
   - Executor either FIXES and resubmits OR DEFENDS with technical evidence via Mailbox
   - Reviewer re-checks → PASS or FAIL (or escalates to Tech Lead)
5. IF PASS (or round 3 reached):
   - Tech Lead reads all Mailbox exchanges, arbitrates if needed, posts DECISION with CONSENSUS stamp
```

---

## CONSENSUS PROTOCOL

Output is released **ONLY** when one of these conditions is met:
- **Clean pass**: Reviewer explicitly APPROVED Executor's submission.
- **Resolved pass**: Reviewer APPROVED after Executor fixed issues or defended with evidence.
- **Arbitrated pass**: Tech Lead overrode after 3 rounds and documented reasoning.

**Mandatory Consensus Stamp**:
```
✅ CONSENSUS: TechLead ✓ | Executor ✓ | Reviewer ✓
```

---

## TEAM ROSTER (Agent-to-Role Mapping per Domain)

| Team Domain | Tech Lead Agent | Executor Agent | Reviewer Focus |
|-------------|-----------------|----------------|----------------|
| `backend` | `tech-lead` | `backend-engineer` | `reviewer` — security + performance |
| `frontend` | `tech-lead` | `frontend-engineer` | `reviewer` — design + performance |
| `fullstack` | `tech-lead` | `backend-engineer` + `frontend-engineer` | `reviewer` — security + performance |
| `database` | `tech-lead` | `database-architect` | `reviewer` — security + performance |
| `research` | `researcher` | `scouter` | `brainstormer` — critical evaluator |
| `planning` | `planner` | `researcher` | `tech-lead` — feasibility critic |
| `qa` | `tester` | `tester` | `security-engineer` + `performance-engineer` |
| `design` | `designer` | `frontend-engineer` | `reviewer` — UX + accessibility |
| `debug` | `debugger` | `backend-engineer` | `reviewer` — root-cause validator |
| `devops` | `devops-engineer` | `backend-engineer` | `security-engineer` |
| `security` | `security-engineer` | `backend-engineer` | `reviewer` — pen-test mindset |
| `game` | `tech-lead` | `game-engineer` | `reviewer` — game architecture + 60fps |
| `mobile` | `tech-lead` | `mobile-engineer` | `reviewer` — UX + platform compliance |
| `performance` | `performance-engineer` | `backend-engineer` | `reviewer` — measurement + regression |
| `docs` | `docs-manager` | `researcher` | `reviewer` — accuracy + completeness |
| `project` | `project-manager` | `business-analyst` | `tech-lead` — technical feasibility |
| `report` | `reporter` | `scouter` | `reviewer` — data accuracy + insight |

---

## TIERED EXECUTION FOR GOLDEN TRIANGLE

### TIER 1 — Antigravity 2.0 Native Sub-agent Spawn (MANDATORY when available)

```yaml
1. Define Triangle Roles (if not already registered):
   - Use define_subagent for tech-lead, executor, and reviewer roles (with EnableWriteTools: true/false)
2. Invoke Sub-agents via invoke_subagent:
   - Spawn Tech Lead (Model: inherit/pro, Workspace: inherit/share)
   - Spawn Executor (Model: inherit/pro, Workspace: inherit/branch/share)
   - Spawn Reviewer (Model: inherit/pro, Workspace: inherit/share)
   - Cross-platform fallback alias: runSubagent(agent_name, context)
3. Multi-turn Debate via send_message + Brain Artifact Mailbox:
   - Coordinate rounds using send_message(Recipient: conversationId) and <appDataDir>\brain\<conversation-id>\MAILBOX-{date}.md
   - Rely on Reactive Async Wakeup (never poll in a loop)
   - Monitor/cleanup via manage_subagents and manage_task
4. Tech Lead synthesizes final output with CONSENSUS stamp and returns to Orchestrator
```

### TIER 2 — Sequential Embodiment (Fallback only on tool error)

```
1. EMBODY Tech Lead → produce Shared Task List → post TASK_ASSIGNMENT
2. EMBODY Executor → implement tasks → post SUBMISSION to Mailbox
3. EMBODY Reviewer → review submission → post REVIEW (PASS/FAIL)
4. IF FAIL: alternate Executor (FIX/DEFEND) and Reviewer (re-check) up to 3 rounds
5. EMBODY Tech Lead → arbitrate/synthesize → post DECISION with CONSENSUS stamp
```

---

## MAILBOX FILE FORMAT (`<appDataDir>\brain\<conversation-id>\MAILBOX-{date}.md`)

```markdown
# 📬 MAILBOX — {Phase Name} — {date}

## Exchange #1
| From | To | Type | Timestamp |
|------|----|------|-----------|
| `tech-lead` | `all` | TASK_ASSIGNMENT | {time} |

**Content:** [Shared Task List with assignments and context]

---

## Exchange #2
| From | To | Type | Timestamp |
|------|----|------|-----------|
| `executor` | `reviewer` | SUBMISSION | {time} |

**Content:** [Implemented files, approach, verification]

---

## Exchange #3
| From | To | Type | Timestamp |
|------|----|------|-----------|
| `reviewer` | `executor` | REVIEW | {time} |

**Status:** ✅ PASS / ❌ FAIL
**Findings:** [Specific findings or approval]

---

## Exchange #4
| From | To | Type | Timestamp |
|------|----|------|-----------|
| `tech-lead` | `all` | DECISION | {time} |

**Status:** ✅ CONSENSUS REACHED
**Signatures:** TechLead ✓ | Executor ✓ | Reviewer ✓
```

---

## ERROR HANDLING & SELF-CHECK

| Error | Recovery |
|-------|----------|
| Executor fails to submit | Tech Lead re-dispatches or produces minimal viable output |
| Reviewer rejects valid work 3x | Tech Lead arbitrates based on evidence and documents override |
| Reviewer rubber-stamps | Tech Lead rejects empty PASS and re-invokes Reviewer with checklist |
| TIER 1 spawn fails | Fallback to TIER 2 for the failed agent only and log reason |

```
□ Exactly 3 roles assigned (Tech Lead + Executor + Reviewer)?
□ Shared Task List published and Mailbox initialized at <appDataDir>\brain\<conversation-id>\MAILBOX-{date}.md?
□ TIER 1 (invoke_subagent / define_subagent / runSubagent) attempted first?
□ Debate capped at 3 rounds and consensus stamp present before release?
```
