# BoomOpen Workflow Kit — Code Style & Pragmatic 2-Tier Coding Standards

> **Purpose**: Formatting rules, naming conventions, and the Pragmatic 2-Tier Coding Standards for BoomOpen Workflow Kit v5.4
> **Parent**: [00-index.md](./00-index.md)
> **Last Updated**: 2026-10-31
> **Version**: 5.4.0

---

## 📏 Pragmatic 2-Tier Coding Standards (v5.4)

BoomOpen Workflow Kit separates **non-negotiable safety/quality rules (Tier 1)** from **flexible structural guidelines (Tier 2)** so engineers write cohesive, maintainable code without artificially fragmenting files or functions.

### 🛡️ Tier 1 — Strict Quality & Safety Rules (Mandatory)

1. **Single Responsibility (SRP)**: Every file and function addresses one clear responsibility or domain concept.
2. **NO Explicit `any` in TypeScript**: Always use concrete interfaces/types, `unknown` + Type Guard/Zod validation, or Generics `<T>`.
3. **NO Leftover `console.log` in Production App Code**: Use a structured logger (`debug`/`info`/`warn`/`error`) in application code (UI/API/Services) and remove temporary `console.log` statements before completing a task. *(CLI tools `cli/*.js`, build scripts, and test benchmarks may use `console.log`).*
4. **Error Handling & Named Constants**: Wrap async/API/I/O operations in `try/catch` with typed error handling; define business/configuration literals as `SCREAMING_SNAKE_CASE` constants.
5. **DRY & Clean Imports**: Extract logic repeated ≥ 3 times into a shared helper; order imports (`external` → `internal` → `relative`) and remove unused imports.

### 📐 Tier 2 — Flexible Structural Guidelines (Cohesion Over Mechanical Splitting)

| Guideline | Recommended Target (Soft) | Pragmatic Ceiling & Exemption Rule |
|-----------|:-------------------------:|------------------------------------|
| **File length** | **~200–350 lines** | Up to **~400–450 lines** is completely fine if the file represents a single cohesive module (`cli/checker.js` warns at `>400` and errors only at `>500`). **Exempt**: Test files (`*.test.*`, `*.spec.*`), `.d.ts` / schema definitions, CLI installers, and Markdown docs. |
| **Function length** | **~20–40 lines** (logic) / **~40–80 lines** (UI/Handler) | Only extract sub-functions when reusing logic (DRY) or isolating a distinct conceptual step. Never chop a sequential flow into tiny 10-line fragments that hurt readability. |
| **Line width** | **~100–120 chars** | Fully flexible for long URLs, Regex patterns, Tailwind CSS class strings, and Markdown tables. |
| **Nesting & Params** | **≤ 3–4 levels** / **≤ 4–5 params** | Use Guard Clauses (early returns) at the top of functions; use an options/config object when parameters exceed 4–5. |

---

## 🩺 Built-In CLI Verification Tools (`doctor` & `check`)

| Command | Script | What It Verifies |
|---------|--------|------------------|
| `npm run doctor` (`node cli/install.js doctor`) | [`cli/doctor.js`](../../cli/doctor.js) | Verifies `~/.gemini/GEMINI.md` (`≤ 350` lines), `skills.json`, `SKILL.md`, `rules/*.md`, `commands/*.md`, `agents/*.md`, `agents/teams/**/*.md` (`≤ 450` lines, 0 mojibake, 0 legacy refs), and `matrix-skills/compact-index.json` (`1,430+` skills). |
| `npm run check` (`node cli/install.js check [dir]`) | [`cli/checker.js`](../../cli/checker.js) | Audits source files against Pragmatic 2-Tier Coding Standards: soft warning at `401–500` lines, hard violation at `> 500` lines (test/d.ts/CLI exempt), hard violation on explicit TypeScript `any`, and warning on leftover `console.log` in non-CLI/non-test code. |
| `npm run lint` | `node --check` | Validates JavaScript syntax across `cli/install.js`, `cli/doctor.js`, and `cli/checker.js`. |

---

## Naming Conventions by Content Type

### Markdown — Agent Files (`agents/*.md` & `agents/teams/*/*.md`)

| Element | Convention | Example |
|---------|-----------|---------|
| File name | kebab-case | `backend-engineer.md`, `docs-manager.md` |
| YAML `name` field | kebab-case | `name: backend-engineer` |
| YAML `profile` | `domain:category` format | `"backend:execution"`, `"research:exploration"` |
| YAML `handoffs` | Array of canonical agent names | `[tester, database-architect, performance-engineer]` |
| YAML `version` | Quoted semver string | `"5.4"` |
| Agent ID format | `agent:kebab-case-name` | `agent:backend-engineer` |

### Markdown — Command Files (`commands/*.md`)

| Element | Convention | Example |
|---------|-----------|---------|
| File name | Flat kebab-case in `commands/` | `cook.md`, `cook-fast.md`, `cook-hard.md`, `cook-team.md` |
| Reference files | `commands/_ref/*.md` | `commands/_ref/implementation-loop.md` |
| YAML `execution-mode` | `router` or `execute` | `execution-mode: execute` |

### Markdown — Rule Files (`rules/*.md`)

| Element | Convention | Example |
|---------|-----------|---------|
| File name | UPPER_CASE | `CORE.md`, `PHASES.md`, `AGENTS.md`, `TEAMS.md`, `SKILLS.md`, `ERRORS.md`, `REFERENCE.md` |

### JavaScript — CLI (`cli/*.js`)

| Element | Convention | Example |
|---------|-----------|---------|
| File name | camelCase | `install.js`, `doctor.js`, `checker.js` |
| Module system | CommonJS (`require`/`module.exports`) with `node:` prefix | `const fs = require('node:fs')` |
| Functions | camelCase verb phrases | `buildCompactSkillIndex()`, `runDoctor()`, `runCheck()` |
| Constants | `SCREAMING_SNAKE_CASE` | `SOFT_FILE_LINES = 400`, `HARD_FILE_LINES = 500` |
