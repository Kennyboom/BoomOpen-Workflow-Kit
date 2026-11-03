# 📚 REFERENCE

> **VERSION**: 5.5 — Antigravity 2.0 Smart-Hybrid Edition | **PURPOSE**: Fast lookup tables

---

## 🚦 PROACTIVE SUB-AGENT FIRST GATE (TURN-1 ZERO-TAX FAN-OUT, MODE B & MODE A)

| Mode | Tier | Trigger Condition | Action |
|------|------|-------------------|--------|
| **🚀 Fast Parallel Sub-agents** | **TIER 1** | Unscoped codebase exploration, repo audit, bug hunt, or `> 2 files` without `/cmd` | Spawn subagents **immediately on Turn 1** (`TypeName: "research"` for read-only local scouting; `TypeName: "self"` for edits/tests/`search_web`; `Model: "inherit"`; 0 pre-flight reads, 0 report clutter) |
| **🎻 MODE B (Orchestrated)** | **TIER 1** | Explicit `/cmd`, **`> 2 files`**, **`≥ 2 domains`**, architectural design, `:hard`/`:team`, OR NL research/ideation (`auto_team` → `/brainstorm:team`) | **Turn-1 Instant Dispatch**: Read `commands/{cmd}.md` & spawn Phase 1 subagents (`TypeName: "self"`, `Model: "inherit"`) in the same Turn-1 batch using pre-embedded 5-Field Handoff Packet + Warm Reuse (`send_message`) |
| **⚡ MODE A (Micro-Direct)** | **TIER 0** | Simple Q&A, explanation, or micro-edit where **exact `≤ 2 files` are already known on Turn 1**, 0 exploration needed, no `/cmd` | Execute, test, and verify **directly** (Pragmatic 2-Tier Coding Standards) |

---

## 🧠 QUALITY-FIRST MODEL POLICY

| Model | Permitted Usage | Rule |
|-------|-----------------|------|
| `Model: "inherit"` (or `"pro"`) | All 21 specialist agents across engineering, architecture, planning, scouting, debugging, testing, reviewing, security, design, docs | **MANDATORY DEFAULT** (Pro High quality) |
| `Model: "flash"` | Trivial mechanical chores only (raw log aggregation, simple formatting) | Only when 0 reasoning needed |
| `Model: "flash_lite"` | **NONE** | **⛔ STRICTLY FORBIDDEN** |

---

## COMMAND TABLE (Triggers Mode B)

| Command | Router | Variants |
|---------|--------|----------|
| `/cook` | `cook.md` | `fast`, `hard`, `team` |
| `/fix` | `fix.md` | `fast`, `hard`, `team` |
| `/plan` | `plan.md` | `fast`, `hard`, `team` |
| `/debug` | `debug.md` | `fast`, `hard`, `team` |
| `/test` | `test.md` | `fast`, `hard`, `team` |
| `/review` | `review.md` | `fast`, `hard`, `team` |
| `/docs` | `docs.md` | `core`, `business`, `audit` |
| `/design` | `design.md` | `fast`, `hard`, `team` |
| `/deploy` | `deploy.md` | `check`, `preview`, `production`, `rollback` |
| `/report` | `report.md` | `fast`, `hard`, `team` |
| `/brainstorm` | `brainstorm.md` | `fast`, `hard`, `team` |
| `/ask` | `ask.md` | `fast`, `hard` |
| `/code` | `code.md` | `fast`, `hard`, `team` |
| `/orchestrate` | `orchestrate.md` | Multi-agent domain orchestration |
| `/save` | `save.md` | Save session state & knowledge to Brain Artifacts / `.brain/` |
| `/recap` | `recap.md` | Restore session context from Brain Artifacts / `.brain/` |
| `/settings` (`/config`) | `settings.md` | Unified Settings & Control Center (`preset`, `mode`, `set`, `get`, `reset`, `--ui`) |

---

## AGENT TABLE (21 Specialist Agents — Default `Model: "inherit"`)

| Agent | Category | Primary Tasks |
|-------|----------|---------------|
| `tech-lead` | meta | Architecture Design/Review (`/review:hard`) & `:team` Golden Triangle Arbitration |
| `planner` | meta | Task breakdown, `SHARED_CONTRACT`, `OWNED_FILES` allocation |
| `backend-engineer` | execution | APIs, services, server logic |
| `frontend-engineer` | execution | UI, components, client state |
| `database-architect` | execution | Schema, queries, migrations |
| `mobile-engineer` | execution | iOS, Android, React Native, Flutter |
| `game-engineer` | execution | Game logic, Unity, Unreal |
| `tester` | validation | Unit, integration, E2E tests |
| `reviewer` | validation | Code review, PR feedback |
| `security-engineer` | validation | Security audit, pentesting |
| `performance-engineer` | validation | Profiling, optimization |
| `debugger` | validation | Bug investigation |
| `researcher` | research | External research |
| `scouter` | research | Codebase analysis |
| `brainstormer` | research | Ideas, requirements |
| `designer` | research | UI/UX design |
| `docs-manager` | support | Documentation |
| `devops-engineer` | support | CI/CD, deployment |
| `business-analyst` | support | Business requirements |
| `project-manager` | support | Project coordination |
| `reporter` | support | Reports, summaries |

---

## DELIVERABLE PATHS (BRAIN ARTIFACTS FIRST ON ANTIGRAVITY 2.0)

```yaml
brain_artifact_default: <appDataDir>\brain\<conversation-id>\{TYPE}-{feature}.md
workspace_export_only:  ./reports/{topic}/{type_plural}/{TYPE}-{feature}.md
docs_suite_workspace:   ./documents/knowledge-*/00-index.md
```

---

## ORCHESTRATION LAWS (Quick Reference)

| # | Law | One-liner |
|---|-----|-----------|
| L1 | Zero-Latency Entry | `GEMINI.md` pre-loaded; load `CORE`/`PHASES`/`AGENTS` on-demand for Mode B |
| L2 | Requirement Integrity | 100% fidelity, zero loss |
| L3 | Smart Threshold Gate | Mode A (≤ 3 files) direct; Mode B (> 3 files / `/cmd`) orchestrated |
| L4 | Quality-First Model | Default `Model: "inherit"` (Pro High); `"flash"` only for trivial chores; NEVER `"flash_lite"` |
| L5 | DAG & Contract-First | Run independent phases concurrently; lock `SHARED_CONTRACT` + disjoint `OWNED_FILES` before parallel coding |
| L6 | Language Compliance | Respond in user's lang; code/comments in English; reports/docs/artifacts in user's input lang (technical terms in English) |
| L7 | Direct Plan Dispatch | In Mode B, Orchestrator dispatches directly from `PLAN` to domain engineers (no middleman hop) |
| L8 | Warm Session Reuse | Track `Role → conversationId`; reuse warm sub-agents via `send_message` for follow-ups & fixes |
| L9 | Constraint Propagation | `scouter` → `planner` (`SHARED_CONTRACT`) → `engineer` (`OWNED_FILES`) chain locked |
| L10 | Clean Git Tree | Transient deliverables default to `<appDataDir>\brain\<conversation-id>\` |
