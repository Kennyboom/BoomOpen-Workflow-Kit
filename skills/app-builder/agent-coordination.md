# Agent Coordination

> How App Builder orchestrates canonical specialist agents (`agents/*.md`).

## Agent Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                   APP BUILDER (Orchestrator)                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     PLANNER (`planner`)                     │
│  • Task breakdown                                           │
│  • Dependency graph                                         │
│  • File structure planning                                  │
│  • Create PLAN-{feature}.md (MANDATORY)                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              CHECKPOINT: PLAN VERIFICATION                  │
│  🔴 VERIFY: Does the plan file exist?                       │
│  🔴 If NO → STOP → Create plan file first                   │
│  🔴 If YES → Proceed to specialist agents                   │
└─────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ DATABASE        │ │ BACKEND         │ │ FRONTEND        │
│ ARCHITECT       │ │ ENGINEER        │ │ ENGINEER        │
│ `database-      │ │ `backend-       │ │ `frontend-      │
│  architect`     │ │  engineer`      │ │  engineer`      │
│ • Schema design │ │ • API routes    │ │ • Components    │
│ • Migrations    │ │ • Controllers   │ │ • Pages         │
│ • Seed data     │ │ • Middleware    │ │ • Styling       │
└─────────────────┘ └─────────────────┘ └─────────────────┘
          │                   │                   │
          └───────────────────┼───────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 VALIDATION PHASE                            │
│  • `security-engineer` → Vulnerability & auth check         │
│  • `tester` → Unit / E2E tests                              │
│  • `performance-engineer` → Bundle & perf analysis          │
│  • `reviewer` → Code quality review                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 DEVOPS ENGINEER (`devops-engineer`)         │
│  • Environment setup                                        │
│  • Preview deployment                                       │
│  • Health check                                             │
└─────────────────────────────────────────────────────────────┘
```

## Execution Order

| Phase | Canonical Agent(s) | Parallel? | Prerequisite | CHECKPOINT |
|-------|--------------------|-----------|--------------|------------|
| 0 | Socratic Gate (`brainstormer` / `business-analyst`) | ❌ | - | ✅ Clarify requirements |
| 1 | `planner` | ❌ | Questions answered | ✅ **Plan file created** |
| 1.5 | **PLAN VERIFICATION** | ❌ | Plan file exists | ✅ **Verified** |
| 2 | `database-architect` | ❌ | Plan ready | Schema defined |
| 3 | `backend-engineer` | ❌ | Schema ready | API routes created |
| 4 | `frontend-engineer` | ✅ | API ready (partial) | UI components ready |
| 5 | `security-engineer`, `tester`, `reviewer` | ✅ | Code ready | Tests & audit pass |
| 6 | `devops-engineer` | ❌ | All code ready | Deployment ready |

> 🔴 **CRITICAL:** Phase 1.5 is MANDATORY. No specialist agents proceed without plan verification.
