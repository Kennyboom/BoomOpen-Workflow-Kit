---
description: ✅ Deploy Check — Pre-deployment readiness verification
version: "5.5"
category: operations
execution-mode: execute
---

# /deploy:check — Deployment Readiness Check

> **MISSION**: Verify all deployment prerequisites are met before proceeding.

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

## 🎭 Phase 1: CODE QUALITY CHECK

| Attribute | Value |
|-----------|-------|
| **Agent** | `reviewer` |
| **Goal** | Verify code quality standards |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke native sub-agent (`invoke_subagent` / `runSubagent`) for `reviewer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/reviewer.md`
> EMBODY [reviewer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] No critical issues
- [ ] Standards met
- [ ] Approved for deploy

---

## 🎭 Phase 2: TEST VERIFICATION

| Attribute | Value |
|-----------|-------|
| **Agent** | `tester` |
| **Goal** | Verify all tests passing |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke native sub-agent (`invoke_subagent` / `runSubagent`) for `tester`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/tester.md`
> EMBODY [tester] — Requires logged system error justification.

**Exit Criteria:**

- [ ] All tests pass
- [ ] Coverage adequate
- [ ] No flaky tests

---

## 🎭 Phase 3: SECURITY SCAN

| Attribute | Value |
|-----------|-------|
| **Agent** | `security-engineer` |
| **Goal** | Security vulnerability check |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke native sub-agent (`invoke_subagent` / `runSubagent`) for `security-engineer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/security-engineer.md`
> EMBODY [security-engineer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] No critical vulnerabilities
- [ ] Dependencies secure
- [ ] Secrets not exposed

---

## 🎭 Phase 4: INFRASTRUCTURE CHECK

| Attribute | Value |
|-----------|-------|
| **Agent** | `devops-engineer` |
| **Goal** | Verify infrastructure readiness |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke native sub-agent (`invoke_subagent` / `runSubagent`) for `devops-engineer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/devops-engineer.md`
> EMBODY [devops-engineer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Build succeeds
- [ ] Environment configured
- [ ] Rollback plan ready

---

## COMPLETION

Present readiness report with:

1. ✅ **Ready** → `/deploy:preview` or `/deploy:production`
2. ❌ **Not Ready** — Issues to address
3. 🔧 **Fix Issues** → Route to appropriate fix workflow
