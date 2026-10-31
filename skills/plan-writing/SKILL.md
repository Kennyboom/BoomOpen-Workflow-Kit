---
name: plan-writing
description: Structured task planning with clear breakdowns, dependencies, Shared Interface Contracts (SHARED_CONTRACT), file ownership locks (OWNED_FILES), and verification criteria. Use when implementing features, refactoring, or any multi-step work.
allowed-tools: Read, Glob, Grep, Write
version: "5.5"
---

# 📋 Plan Writing (v5.5 — Contract-First & Clean Git Tree Edition)

## Overview
This skill provides the structured methodology for decomposing multi-step features, refactors, or fixes into self-contained, verifiable execution plans that isolated sub-agents can execute in parallel without collisions.

---

## 1. Core Task Breakdown Principles

### 1. Atomic, Independently Verifiable Tasks
- Break work into focused tasks (typically 1–3 cohesive files per task).
- Assign the canonical specialist agent (`backend-engineer`, `frontend-engineer`, `database-architect`, `tester`, etc.) with `Model: "inherit"`.
- Every task must specify a concrete verification command.

### 2. Contract-First Planning for Parallel Execution (`SHARED_CONTRACT`)
Whenever a plan spans **≥ 2 domains** (e.g., Database + Backend + Frontend):
- Define a locked **`## 🤝 Shared Interface Contracts (SHARED_CONTRACT)`** section **before** the task list.
- Include exact API endpoints, HTTP methods, request/response DTO schemas, shared TypeScript interfaces, and error envelopes so `backend-engineer` and `frontend-engineer` can implement in parallel with zero mismatch.

### 3. Explicit File Ownership Locks (`OWNED_FILES` vs. `READ_ONLY_FILES`)
Every task in a multi-agent plan MUST declare:
- **`OWNED_FILES (Write Permitted)`**: Exact files/directories this task is authorized to create or modify.
- **`READ_ONLY_FILES (Do Not Edit)`**: Context files the agent may read but must not modify.
- Tasks marked `Parallelizable: Yes` **MUST** have 100% disjoint `OWNED_FILES`.

### 4. Brain Artifact Routing (Keep Git Working Tree 100% Clean)
- **Antigravity 2.0 Default**: Always save plan files to the conversation's native Brain Artifact Directory:
  `<appDataDir>\brain\<conversation-id>\PLAN-{task-slug}.md`
- **Workspace Fallback**: On non-Antigravity tools or when the user explicitly requests committing plans to the repo, save to `./reports/{topic}/plans/PLAN-{task-slug}.md`.
- **⛔ NEVER** dump transient `{task-slug}.md` plan files into the project root directory.

---

## 2. Planning Principles

### Principle 1: Specific & Actionable (No Vague Placeholders)

| ❌ Vague (Wrong) | ✅ Specific & Verifiable (Right) |
|------------------|----------------------------------|
| "Set up authentication" | "Create `src/auth/jwtService.ts` with `signAccessToken` and `verifyAccessToken`" |
| "Update UI components" | "Edit `src/components/LoginForm.tsx` to call `POST /api/v1/auth/login`" |
| "Verify the API works" | "Run `npm test -- src/auth/jwtService.test.ts` and `node cli/install.js check src/auth`" |

### Principle 2: Project-Specific Verification Scripts
Only include verification commands and scripts that actually exist in the project or BoomOpen skill library:

| Domain | Verification Command / Script |
|--------|-------------------------------|
| **All Source Code** | `node cli/install.js check <dir>` + project build/lint (`npm run build`, `npm run lint`) |
| **Frontend / UI** | `python ~/.gemini/config/skills/frontend-design/scripts/ux_audit.py <project_path>` |
| **Backend / API** | `python ~/.gemini/config/skills/api-patterns/scripts/api_validator.py <project_path>` |
| **Database** | `python ~/.gemini/config/skills/database-design/scripts/schema_validator.py <project_path>` |
| **Unit / Integration Tests** | `npm test` or `python ~/.gemini/config/skills/testing-patterns/scripts/test_runner.py <project_path>` |
| **E2E Web Tests** | `python ~/.gemini/config/skills/webapp-testing/scripts/playwright_runner.py <url>` |

---

## 3. Standard Plan Structure (`<appDataDir>\brain\<conversation-id>\PLAN-{task}.md`)

```markdown
# Implementation Plan: {Task Name}

## 📌 User Request (VERBATIM)
> {Exact user request}

## 🎯 Acceptance Criteria & Edge Cases
| ID | Given | When | Then | Verify |
|----|-------|------|------|--------|
| AC1 | {context} | {action} | {expected outcome} | {test/check command} |

## 🤝 Shared Interface Contracts (`SHARED_CONTRACT`)
- **Endpoints / Signatures**: `{exact routes or function signatures}`
- **DTO / TypeScript Interfaces**: `{shared request/response types}`
- **Error Format**: `{status codes and error structure}`

## 📋 Tasks (`Parallelizable: Yes | No`)
- [ ] **Task 1**: {Specific action}
  - **Agent**: `{canonical-agent}` (`Model: "inherit"`)
  - **OWNED_FILES (Write Permitted)**: `{exact paths}`
  - **READ_ONLY_FILES (Do Not Edit)**: `{context paths}`
  - **Verify**: `{exact test/build/check command}`

## 🛡️ Risks & Rollback Strategy
| Risk | Impact | Mitigation | Rollback |
|------|--------|------------|----------|
| {risk} | H/M/L | {mitigation} | {undo steps} |
```
