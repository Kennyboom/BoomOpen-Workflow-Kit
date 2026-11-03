---
description: 🔍 Deploy Preview — Staging/Preview deployment
version: "5.5"
category: operations
execution-mode: execute
---

# /deploy:preview — Preview Deployment

> **MISSION**: Deploy to preview/staging environment for validation.

---

## ⚡ TURN-1 ZERO-TAX DISPATCH & ON-DEMAND RULES

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/boomopen-workflow-kit/rules/`):
1. CORE.md — Identity, Laws, Routing  
2. PHASES.md — Phase Execution  
3. AGENTS.md — Tiered Execution  

⚡ **TURN-1 ZERO-TAX DISPATCH**: Core orchestration laws and the 5-Field Handoff Packet are pre-loaded in your global entrypoint (`GEMINI.md` / `CLAUDE.md` / `CODEX.md`). Launch Phase 1 sub-agents **immediately on Turn 1** via `invoke_subagent(TypeName: "self", Model: "inherit")`; load `rules/TEAMS.md` or `rules/PHASES.md` in parallel only when needed.

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

## 🎭 Phase 1: READINESS CHECK

| Attribute | Value |
|-----------|-------|
| **Agent** | `devops-engineer` |
| **Goal** | Quick deployment readiness |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke native sub-agent (`invoke_subagent` / `runSubagent`) for `devops-engineer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/devops-engineer.md`
> EMBODY [devops-engineer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Build passes
- [ ] Tests pass
- [ ] No blockers

---

## 🎭 Phase 2: DEPLOY

| Attribute | Value |
|-----------|-------|
| **Agent** | `devops-engineer` |
| **Goal** | Deploy to preview environment |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke native sub-agent (`invoke_subagent` / `runSubagent`) for `devops-engineer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/devops-engineer.md`
> EMBODY [devops-engineer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Deployment successful
- [ ] Environment accessible

---

## 🎭 Phase 3: VERIFICATION

| Attribute | Value |
|-----------|-------|
| **Agent** | `devops-engineer` |
| **Goal** | Verify deployment health |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke native sub-agent (`invoke_subagent` / `runSubagent`) for `devops-engineer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/devops-engineer.md`
> EMBODY [devops-engineer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Health checks pass
- [ ] Core functionality verified
- [ ] Preview URL accessible

---

## COMPLETION

Present deployment result with:

1. ✅ **Success** — Preview ready for testing
2. 🚀 **Promote** → `/deploy:production`
3. ⏪ **Rollback** → `/deploy:rollback`
