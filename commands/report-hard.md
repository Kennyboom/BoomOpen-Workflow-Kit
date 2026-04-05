---
description: âš¡ Detailed Report â€” Comprehensive project analysis and documentation
version: "1.0"
category: documentation
execution-mode: execute
---

# /report:hard â€” Comprehensive Project Report

> **MISSION**: Generate detailed output for **any topic** â€” reports, doc updates, or template-based files.
>
> Use for: sprint reviews, technical docs, any-topic reports, updating existing files, or generating from user format/template.

<task>$ARGUMENTS</task>

---

## ðŸ›‘ PRE-FLIGHT (DO FIRST â€” BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.gemini/antigravity/skills/boomopen-workflow-kit/rules/`):

1. CORE.md â€” Identity, Laws, Routing
2. PHASES.md â€” Phase Execution
3. AGENTS.md â€” Tiered Execution

**â›” Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand for fitness calculation and dynamic discovery (hard/team variants enable find-skills).

---

## ðŸ”€ TIERED EXECUTION

| Tier       | When               | Action                       |
| ---------- | ------------------ | ---------------------------- |
| **TIER 1** | runSubagent EXISTS | Invoke sub-agent (MANDATORY) |
| **TIER 2** | Tool MISSING       | EMBODY agent file (FALLBACK) |

**âŒ Anti-Lazy**: Never use TIER 2 when TIER 1 tool available.

---

## ðŸ“ DELIVERABLES (Reporter chooses from user intent)

| User intent | Reporter output |
| ----------- | ---------------- |
| **Create report** | New file: `./reports/{topic}/general/REPORT-{type}-{date}` (or path user asks) |
| **Update existing** | **Edit** related files (docs, README, etc.); do **not** create new report unless also asked |
| **From template** | New file(s) matching user format/template (e.g. after scouting source) |

| Agent      | Output (when creating)                          |
| ---------- | ------------------------------------------------ |
| researcher | `./reports/{topic}/researchers/RESEARCH-{task}` (optional) |
| scouter    | `./reports/{topic}/scouts/SCOUT-{task}` (optional)    |
| reporter   | Per table above â€” create report **or** update existing **or** generate from template |

All files in `./reports/{topic}/` â†’ English only.
**âš ï¸ Paths above = base names.** Small (â‰¤ 150 lines) â†’ create as `{name}.md`. Large (> 150 lines or â‰¥ 4 sections) â†’ create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.

---

## â›” INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 â†’ then Phase 2 â†’ â€¦ in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what's happening (announce before doing). Format: rules/PHASES.md Â§ Phase output structure.

---

## ðŸŽ­ Phase 1: RESEARCH

| Agent  | `researcher`                                                |
| ------ | ---------------------------------------------------------- |
| Goal   | Research report scope, audience, and best practices for project/technical reports |
| Output | `./reports/{topic}/researchers/RESEARCH-{task}` (optional)       |
| Exit   | Report scope and criteria defined, templates identified   |

---

## ðŸŽ­ Phase 2: DEEP SCAN

| Agent  | `scouter`                         |
| ------ | --------------------------------- |
| Goal   | Full codebase structural analysis |
| Output | `./reports/{topic}/scouts/SCOUT-{task}` |
| Exit   | Architecture and recent changes documented                 |

---

## ðŸŽ­ Phase 3: DATA SYNTHESIS

| Agent       | `reporter`                                      |
| ----------- | ------------------------------------------------ |
| Prerequisite| **READ** RESEARCH + SCOUT outputs if present     |
| Goal        | Aggregate data from Scouter, Plans, and History; identify discrepancies and milestones |
| Exit        | Data synthesized, gaps and milestones identified |

---

## ðŸŽ­ Phase 4: OUTPUT (create / update / from template)

| Agent | `reporter`                                                                 |
| ----- | --------------------------------------------------------------------------- |
| Goal  | From **user intent**: (1) create new report, (2) **update** existing files, or (3) generate from template/format |
| Output| **Create**: `./reports/{topic}/general/REPORT-{type}-{date}` or path user asked. **Update**: edit related files. **Template**: file(s) matching user format. |
| Exit  | Deliverable matches intent â€” report file, updated docs, or template-based file(s). |

---

## COMPLETION

Deliverable per **user intent**:

1. âœ… **Create report** â†’ `./reports/{topic}/general/REPORT-{type}-{date}` (or path user asked)
2. âœ… **Update existing** â†’ Related files edited; list what was updated
3. âœ… **From template** â†’ File(s) matching user format; list path(s)
4. ðŸ“¢ **Share** â†’ `/internal-comms` (optional)
