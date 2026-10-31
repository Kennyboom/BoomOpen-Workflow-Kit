---
name: clean-code
description: Pragmatic 2-Tier coding standards — strict type/error safety with cohesive, maintainable file and function structure
allowed-tools: Read, Write, Edit, Bash
version: "5.4"
priority: CRITICAL
---

# Clean Code — Pragmatic 2-Tier AI Coding Standards (v5.4)

> **CRITICAL SKILL**: Write **clean, type-safe, cohesive, and verified** code. Favor genuine clarity and single responsibility over mechanical file/function fragmentation.

---

## 1. Core Principles

| Principle | Rule |
|-----------|------|
| **SRP (Single Responsibility)** | Each file, class, or function addresses ONE cohesive responsibility or domain concept |
| **DRY (Don't Repeat Yourself)** | Extract logic repeated ≥ 3 times into a shared helper; do not over-abstract 2-line snippets |
| **KISS (Keep It Simple)** | Prefer the simplest, most direct implementation that solves the problem |
| **YAGNI** | Do not build speculative abstractions or unused configuration layers |
| **Boy Scout Rule** | Leave every touched file cleaner and better-typed than you found it |

---

## 2. Pragmatic 2-Tier Coding Standards

### 🛡️ Tier 1 — Strict Quality & Safety Rules (MANDATORY — Zero Exceptions)

1. **NO Explicit `any` in TypeScript**:
   - Always define concrete interfaces/types, use `unknown` with Type Guards / Zod schemas, or use Generics `<T>`.
2. **NO Leftover `console.log` in Production Application Code**:
   - Use a structured logger (`debug`/`info`/`warn`/`error`) in UI, API, and service modules.
   - Delete temporary debug `console.log` calls before completing your task. *(CLI scripts `cli/*.js` and test benchmarks are exempt).*
3. **Comprehensive Error Handling & Named Constants**:
   - Wrap all async/API/database calls in `try/catch` blocks with typed errors and meaningful context.
   - Extract business/configuration magic numbers into `SCREAMING_SNAKE_CASE` constants.
4. **Clean Imports & Dependent File Integrity**:
   - Group imports (`external` → `internal` → `relative`) and remove unused imports.
   - When changing a function signature or exported type, update all callers in the same turn.

### 📐 Tier 2 — Flexible Structural Guidelines (Cohesion Over Mechanical Splitting)

| Dimension | Recommended Target (Soft) | Pragmatic Ceiling & When to Split |
|-----------|:-------------------------:|-----------------------------------|
| **File length** | **~200–350 lines** | Up to **~400–450 lines** is completely acceptable if the file serves a single cohesive responsibility (`cli/checker.js` warns at `>400` and errors at `>500`). Only split when a file exceeds ~450–500 lines **or** mixes unrelated domains. *(Tests, `.d.ts`/schemas, CLI installers, and Markdown docs are exempt).* |
| **Function length** | **~20–40 lines** (logic)<br>**~40–80 lines** (UI / Route Handler) | Extract sub-functions when reusing logic (DRY) or isolating a distinct conceptual phase. Do **not** chop a readable sequential flow into tiny 10-line fragments. |
| **Line width** | **~100–120 chars** | Wrap long expressions naturally; do not force-wrap URLs, Regex patterns, Tailwind CSS class strings, or Markdown tables. |
| **Nesting & Params** | **≤ 3–4 levels** / **≤ 4–5 params** | Use **Guard Clauses** (early returns) at the top of functions; group `> 4–5` parameters into a typed options/config object. |

---

## 3. Naming Conventions

| Element | Convention | Examples |
|---------|------------|----------|
| **Variables** | Descriptive noun | `userCount`, `activeSession`, `maxRetries` |
| **Functions** | Verb + noun | `fetchUserById()`, `calculateOrderTotal()`, `validateToken()` |
| **Booleans** | `is` / `has` / `can` / `should` prefix | `isReady`, `hasPermission`, `canEdit` |
| **Constants** | `SCREAMING_SNAKE_CASE` | `MAX_RETRY_COUNT`, `API_TIMEOUT_MS` |

> **Rule**: Avoid vague placeholders (`temp`, `thing`, `val1`) in domain logic. Standard short identifiers (`i`, `err`, `req`, `res`, `ctx`) are fine in their idiomatic scope.

---

## 4. Before Editing Any File (Impact Check)

1. **Respect File Ownership (`OWNED_FILES` vs. `READ_ONLY_FILES`)**: In Mode B multi-agent workflows, only modify files assigned in your `OWNED_FILES` lock.
2. **Trace Callers & Imports**: Check what modules import the file you are editing so no broken signatures or type mismatches are introduced.
3. **Preserve Existing Comments & Contracts**: Maintain valid JSDoc/docstrings and adhere strictly to `SHARED_CONTRACT`.

---

## 5. Persistent Self-Verification & Auto-Fix Loop (MANDATORY)

> **NEVER stop at a failing check and ask the user whether to fix your own errors.** Take full ownership of verification and fix issues iteratively until everything passes.

### Canonical Verification Commands

| Role / Domain | Verification Command |
|---------------|----------------------|
| **All Code Changes (`backend-engineer`, `frontend-engineer`, etc.)** | `node cli/install.js check <target_dir>` + project typecheck/lint/build (`npm run lint`, `tsc --noEmit`) |
| **Frontend (`frontend-engineer`, `designer`)** | `python ~/.gemini/config/skills/frontend-design/scripts/ux_audit.py <project_path>` |
| **Backend (`backend-engineer`)** | `python ~/.gemini/config/skills/api-patterns/scripts/api_validator.py <project_path>` |
| **Database (`database-architect`)** | `python ~/.gemini/config/skills/database-design/scripts/schema_validator.py <project_path>` |
| **Testing (`tester`)** | Project test suite (`npm test`) or `python ~/.gemini/config/skills/testing-patterns/scripts/test_runner.py <project_path>` |

### Auto-Fix Loop
1. **Run Verification**: Execute the relevant check/build/test commands after editing.
2. **Inspect Output**: If any Tier 1 error, type error, build error, or test failure appears, **immediately diagnose and fix it**.
3. **Re-Verify**: Re-run the verification command until **0 errors** remain.
4. **Report**: Only mark the task complete once you have tangible proof (command output) that all checks pass.
