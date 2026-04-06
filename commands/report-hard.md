---
description: ⚡ Detailed Report — Comprehensive project analysis and documentation
version: "1.0"
category: documentation
execution-mode: execute
---

# /report:hard — Comprehensive Project Report

> **MISSION**: Generate detailed output for **any topic** — reports, doc updates, or template-based files.
>
> Use for: sprint reviews, technical docs, any-topic reports, updating existing files, or generating from user format/template.

<task>$ARGUMENTS</task>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.gemini/antigravity/skills/boomopen-workflow-kit/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand for fitness calculation and dynamic discovery (hard/team variants enable find-skills).

---

## 🔀 TIERED EXECUTION

| Tier       | When               | Action                       |
| ---------- | ------------------ | ---------------------------- |
| **TIER 1** | runSubagent EXISTS | Invoke sub-agent (MANDATORY) |
| **TIER 2** | Tool MISSING       | EMBODY agent file (FALLBACK) |

**❌ Anti-Lazy**: Never use TIER 2 when TIER 1 tool available.

---

## 📁 DELIVERABLES (Reporter chooses from user intent)

| User intent | Reporter output |
| ----------- | ---------------- |
| **Create report** | New file: `./reports/{topic}/general/REPORT-{type}-{date}` (or path user asks) |
| **Update existing** | **Edit** related files (docs, README, etc.); do **not** create new report unless also asked |
| **From template** | New file(s) matching user format/template (e.g. after scouting source) |

| Agent      | Output (when creating)                          |
| ---------- | ------------------------------------------------ |
| researcher | `./reports/{topic}/researchers/RESEARCH-{task}` (optional) |
| scouter    | `./reports/{topic}/scouts/SCOUT-{task}` (optional)    |
| reporter   | Per table above — create report **or** update existing **or** generate from template |

All files in `./reports/{topic}/` → Write in the same language the user communicates with you. Code comments remain in English.
**⚠️ Paths above = base names.** Small (≤ 150 lines) → create as `{name}.md`. Large (> 150 lines or ≥ 4 sections) → create as `{name}/` folder with `00-index.md` + section files.

---

## ⛔ ABSOLUTE PROHIBITION — NO CODE

> **🔴 THIS WORKFLOW PRODUCES REPORTS ONLY. NO CODE.**
>
> - ❌ NEVER write implementation code (TypeScript, Python, Rust, etc.)
> - ❌ NEVER modify source files
> - ❌ NEVER auto-implement findings or auto-transition to `/code`, `/cook`, `/fix`
> - ✅ ONLY produce report/analysis files
>
> If user wants implementation, they must EXPLICITLY invoke another workflow.

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what's happening (announce before doing). Format: rules/PHASES.md § Phase output structure.

---

## 🎭 Phase 1: RESEARCH

| Agent  | `researcher`                                                |
| ------ | ---------------------------------------------------------- |
| Goal   | Research report scope, audience, and best practices for project/technical reports |
| Output | `./reports/{topic}/researchers/RESEARCH-{task}` (optional)       |
| Exit   | Report scope and criteria defined, templates identified   |

---

## 🎭 Phase 2: DEEP SCAN

| Agent  | `scouter`                         |
| ------ | --------------------------------- |
| Goal   | Full codebase structural analysis |
| Output | `./reports/{topic}/scouts/SCOUT-{task}` |
| Exit   | Architecture and recent changes documented                 |

---

## 🎭 Phase 3: DATA SYNTHESIS

| Agent       | `reporter`                                      |
| ----------- | ------------------------------------------------ |
| Prerequisite| **READ** RESEARCH + SCOUT outputs if present     |
| Goal        | Aggregate data from Scouter, Plans, and History; identify discrepancies and milestones |
| Exit        | Data synthesized, gaps and milestones identified |

---

## 🎭 Phase 4: OUTPUT (create / update / from template)

| Agent | `reporter`                                                                 |
| ----- | --------------------------------------------------------------------------- |
| Goal  | From **user intent**: (1) create new report, (2) **update** existing files, or (3) generate from template/format |
| Output| **Create**: `./reports/{topic}/general/REPORT-{type}-{date}` or path user asked. **Update**: edit related files. **Template**: file(s) matching user format. |
| Exit  | Deliverable matches intent — report file, updated docs, or template-based file(s). |

---

## ⛔ HARD STOP — AWAIT USER DECISION

> **WORKFLOW COMPLETE. DO NOT PROCEED FURTHER.**
>
> Present deliverable file links to user and STOP. Wait for explicit user command.
>
> Deliverable per **user intent**:
> 1. ✅ **Create report** → `./reports/{topic}/general/REPORT-{type}-{date}`
> 2. ✅ **Update existing** → Related files edited; list what was updated
> 3. ✅ **From template** → File(s) matching user format
>
> **⛔ DO NOT auto-transition to any workflow. YIELD control to user.**
