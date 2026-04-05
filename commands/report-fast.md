---
description: âš¡ Fast Report â€” Quick status updates and summaries
version: "1.0"
category: documentation
execution-mode: execute
---

# /report:fast â€” Quick Status Report

> **MISSION**: Generate concise, actionable status reports and summaries.
>
> Use for daily standups, progress checks, and high-level overviews.
> For **update existing files** or **generate from template**, use `/report:hard` or `/report:team`.

<task>$ARGUMENTS</task>

---

## ðŸ›‘ PRE-FLIGHT (DO FIRST â€” BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.gemini/antigravity/skills/agent-assistant/rules/`):

1. CORE.md â€” Identity, Laws, Routing
2. PHASES.md â€” Phase Execution
3. AGENTS.md â€” Tiered Execution

**â›” Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand. Fast variant uses matrix-only (no dynamic discovery for speed optimization).

---

## ðŸ”€ TIERED EXECUTION

| Tier       | When               | Action                       |
| ---------- | ------------------ | ---------------------------- |
| **TIER 1** | runSubagent EXISTS | Invoke sub-agent (MANDATORY) |
| **TIER 2** | Tool MISSING       | EMBODY agent file (FALLBACK) |

**âŒ Anti-Lazy**: Never use TIER 2 when TIER 1 tool available.

---

## â›” INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 â†’ then Phase 2 â†’ â€¦ in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what's happening (announce before doing). Format: rules/PHASES.md Â§ Phase output structure.

---

## ðŸŽ­ Phase 1: INFORMATION GATHERING

| Agent | `reporter`                               |
| ----- | ---------------------------------------- |
| Goal  | Scan current state and recent activities |
| Exit  | Progress summarized, key sources scanned |

---

## ðŸŽ­ Phase 2: REPORT GENERATION

| Agent | `reporter`                                                                 |
| ----- | -------------------------------------------------------------------------- |
| Goal  | Infer intent; if **create report** â†’ generate concise status report        |
| Exit  | Report with Summary, Key Changes, Next Steps â€” or recommend `/report:hard`/`/report:team` if user intent is update/template |

---

## COMPLETION

Present report:

1. âœ… **Report Ready** â€” Displayed in chat
2. ðŸ“„ **Save?** â†’ If user wants to save: `./reports/{topic}/general/REPORT-status-{YYYY-MM-DD}`

**âš ï¸ Paths above = base names.** Small (â‰¤ 150 lines) â†’ create as `{name}.md`. Large (> 150 lines or â‰¥ 4 sections) â†’ create as `{name}/` folder with `00-index.md` + `01-*.md`, `02-*.md` section files.
