---
description: ⚡⚡⚡ Full Review — Deep parallel multi-dimension code & architecture review
version: "5.2"
category: validation
execution-mode: execute
---

# /review:hard — Deep Multi-Dimension Code Review (DAG Parallel Fan-Out)

> **MISSION**: Comprehensive architecture, code quality, security, and performance review using concurrent specialist sub-agents.

<scope>$ARGUMENTS</scope>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/boomopen-workflow-kit/rules/`):
1. `CORE.md` — 2-Mode Gate, Quality-First Model Policy, Brain Artifact Routing
2. `PHASES.md` — DAG-Aware Parallel Fan-Out & Phase Execution
3. `AGENTS.md` — Tiered Execution (`Model: "inherit"` Pro High Default)

---

## 🔀 TIERED EXECUTION & QUALITY-FIRST MODEL POLICY

| Tier | When | Action |
|------|------|--------|
| **TIER 1** | Antigravity 2.0 Native Sub-Agents (`define_subagent`, `invoke_subagent`, `send_message`) or `runSubagent` EXISTS | Invoke isolated sub-agents with `Model: "inherit"` (Pro High default; NEVER `flash_lite`) |
| **TIER 2** | Tool MISSING or system error | EMBODY agent file (FALLBACK) |

---

## 📁 PLAN COMPLIANCE CHECK

```
IF <appDataDir>\brain\<conversation-id>\PLAN-{scope}.md (or ./reports/{topic}/plans/PLAN-{scope}.md) exists:
  - Verify code implements plan specification 100%
  - Check for unauthorized deviations
  - Ensure all plan phases are reflected in code
```

Also run `node cli/install.js check <target-dir>` to deterministically audit file length (≤ 300 lines) and type safety.

---

## ⚡ DAG PARALLEL FAN-OUT: Phases 1–4 (Launch Concurrently in One Turn)

> **🚀 PARALLEL REVIEW FAN-OUT**: Because Architecture, Code Quality, Security, and Performance reviews are read-only and independent, launch **ALL 4 specialist sub-agents in parallel in a single turn** (`Model: "inherit"`), wait for all 4 via Reactive Async Wakeup, and synthesize their findings into the unified review deliverable.

### 🎭 Phase 1: ARCHITECTURE REVIEW (`tech-lead`)
- **Agent**: `tech-lead` (`Model: "inherit"`, `EnableWriteTools: false`)
- **Goal**: Evaluate module boundaries, coupling, SOLID principles, and ADR compliance.

### 🎭 Phase 2: CODE QUALITY & PLAN COMPLIANCE REVIEW (`reviewer`)
- **Agent**: `reviewer` (`Model: "inherit"`, `EnableWriteTools: false`)
- **Goal**: Line-by-line review of logic, error handling, edge cases, naming, and `PLAN-{scope}` compliance.

### 🎭 Phase 3: SECURITY REVIEW (`security-engineer`)
- **Agent**: `security-engineer` (`Model: "inherit"`, `EnableWriteTools: false`)
- **Goal**: Audit input validation, authZ/authN, injection vectors, secrets, and OWASP Top 10 risks.

### 🎭 Phase 4: PERFORMANCE REVIEW (`performance-engineer`)
- **Agent**: `performance-engineer` (`Model: "inherit"`, `EnableWriteTools: false`)
- **Goal**: Identify N+1 queries, memory leaks, blocking I/O, algorithmic bottlenecks, and missing indexes.

---

## 🎭 Phase 5: SYNTHESIS & REPORT GENERATION

Combine all findings from Phases 1–4 into a single prioritized review artifact:
- **Antigravity 2.0 Default (Clean Git Tree)**: `<appDataDir>\brain\<conversation-id>\REVIEW-{scope}-{YYYY-MM-DD}.md`
- **Workspace Fallback**: `./reports/{topic}/reviews/REVIEW-{scope}-{YYYY-MM-DD}.md` (only on non-Antigravity tools or when explicitly requested)
- **Language**: Write in the user's input language (technical terms in English).

---

## ⛔ ABSOLUTE PROHIBITION — NO CODE MODIFICATION

- ❌ NEVER modify source code files during `/review:hard`.
- ❌ NEVER auto-transition to `/fix`, `/code`, or `/cook`.
- ✅ Every completed review MUST be saved to `<appDataDir>\brain\<conversation-id>\REVIEW-{scope}-{YYYY-MM-DD}.md` (or `./reports/{topic}/reviews/`).

---

## ⛔ HARD STOP — AWAIT USER DECISION

Present the review artifact to the user and **STOP**. Offer next steps:
1. ✅ **Approved** — Code ready to merge
2. 🔧 `/fix:hard` or `/fix:fast` → Fix identified issues
3. 🧪 `/test:hard` → Expand test coverage
