# 📚 REFERENCE

> **VERSION**: 5.1 — Antigravity 2.0 Smart-Hybrid Edition | **PURPOSE**: Fast lookup tables

---

## 🚦 SMART COMPLEXITY THRESHOLD GATE

| Mode | Tier | Trigger Condition | Action |
|------|------|-------------------|--------|
| **⚡ MODE A (Direct)** | **TIER 0** | Q&A, explanation, single-domain fix, or clear change touching **≤ 3 files**, AND no `/cmd` invoked | Execute, test, and verify **directly** (0 subagent overhead) |
| **🎻 MODE B (Orchestrated)** | **TIER 1** | Explicit `/cmd`, **> 3 files**, **≥ 2 domains**, architectural design, or `:hard`/`:team` | Activate **Strict Orchestrator Mode** & delegate via subagents |

---

## COMMAND TABLE (Triggers Mode B)

| Command | Router | Variants |
|---------|--------|----------|
| `/cook` | `cook.md` | `fast`, `hard`, `team` |
| `/fix` | `fix.md` | `fast`, `hard`, `team` |
| `/plan` | `plan.md` | `fast`, `hard`, `team` |
| `/debug` | `debug.md` | `fast`, `hard`, `team` |
| `/test` | `test.md` | `fast`, `hard`, `team` |
| `/review` | `review.md` | `fast`, `hard` |
| `/docs` | `docs.md` | `core`, `business`, `audit` |
| `/design` | `design.md` | `fast`, `hard`, `team` |
| `/deploy` | `deploy.md` | `check`, `preview`, `production`, `rollback` |
| `/report` | `report.md` | `fast`, `hard`, `team` |
| `/brainstorm` | `brainstorm.md` | `fast`, `hard` |
| `/ask` | `ask.md` | `fast`, `hard` |
| `/code` | `code.md` | `fast`, `hard`, `team` |
| `/orchestrate` | `orchestrate.md` | Multi-agent domain orchestration |

---

## AGENT TABLE (20 Canonical Agents)

| Agent | Category | Primary Tasks |
|-------|----------|---------------|
| `tech-lead` | meta | Architecture, orchestration |
| `planner` | meta | Task breakdown, roadmap |
| `backend-engineer` | execution | APIs, services, logic |
| `frontend-engineer` | execution | UI, components, styling |
| `database-architect` | execution | Schema, queries, migrations |
| `mobile-engineer` | execution | iOS, Android, React Native |
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

> **Default (Antigravity 2.0)**: Write transient deliverables (`PLAN`, `RESEARCH`, `SCOUT`, `DEBUG`, `TEST`, `MAILBOX`) to `<appDataDir>\brain\<conversation-id>\` to keep the Git working tree 100% clean.
> **Workspace Export**: Only write to `./reports/{topic}/` or `./documents/` when running `/docs` or when explicitly requested by the user.

```yaml
brain_artifact_default: <appDataDir>\brain\<conversation-id>\{TYPE}-{feature}.md
workspace_export_only:  ./reports/{topic}/{type_plural}/{TYPE}-{feature}.md
docs_suite_workspace:   ./documents/knowledge-*/00-index.md
```

---

## RULES FILES (Load On Demand in Mode B)

| File | Purpose | Load When |
|------|---------|-----------|
| `CORE.md` | 2-Mode Gate, 10 Laws, deliverable routing | Mode B triggered |
| `PHASES.md` | Phase execution, chunking, 2-step skill analysis | Running Mode B phases |
| `AGENTS.md` | Tiered execution (TIER 0 / TIER 1 / TIER 2), roster | Delegating in Mode B |
| `TEAMS.md` | Golden Triangle 3-agent team protocol | `:team` variants |
| `SKILLS.md` | Fast 2-Step Progressive Skill Lookup | Complex skill lookups |
| `ERRORS.md` | Error recovery | Errors occur |
| `REFERENCE.md` | Lookup tables | Quick lookups |

---

## ORCHESTRATION LAWS (Quick Reference)

| # | Law | One-liner |
|---|-----|-----------|
| L1 | Zero-Latency Entry | `GEMINI.md` pre-loaded; load `CORE`/`PHASES`/`AGENTS` on-demand for Mode B |
| L2 | Requirement Integrity | 100% fidelity, zero loss |
| L3 | Smart Threshold Gate | Mode A (≤ 3 files) direct; Mode B (> 3 files / `/cmd`) orchestrated |
| L4 | Deep Embodiment | Follow agent's full protocol |
| L5 | Sequential Execution | Phase N before N+1 in Mode B |
| L6 | Language Compliance | Respond in user's lang; code/comments in English; reports/docs/artifacts in user's input lang (technical terms in English) |
| L7 | Recursive Delegation | In Mode B, Orchestrator & Meta agents never implement |
| L8 | Stateful Handoff | Prior deliverables = locked |
| L9 | Constraint Propagation | Scout→Planner→Impl chain |
| L10 | Clean Git Tree | Transient deliverables default to `<appDataDir>\brain\<conversation-id>\` |
