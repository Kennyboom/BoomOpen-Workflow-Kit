---
description: "🔄 Restore Session Context — Quickly recover project state from Brain Artifacts (<appDataDir>\\brain\\<conversation-id>\\) or .brain/."
version: "5.5"
category: session
execution-mode: execute
---

# /recap — Smart Context Recovery v5.1

<context>$ARGUMENTS</context>

---

## 🎯 PURPOSE

Restore full project and task context in < 5 seconds without re-reading the entire codebase from scratch.

---

## 🔍 Phase 1: Context Discovery (Priority Order)

Check the following sources in order:

```
PRIORITY 1 — Antigravity 2.0 Brain Artifacts (<appDataDir>\brain\<conversation-id>\):
  ├── SESSION-HANDOVER.md
  ├── PLAN-*.md / DESIGN-*.md / SCOUT-*.md / DEBUG-*.md
  └── task.md

PRIORITY 2 — Workspace Memory (.brain/):
  ├── .brain/session.json   ← Dynamic progress & current task
  ├── .brain/brain.json     ← Static architecture & stack
  └── .brain/handover.md    ← Cross-session handover notes

PRIORITY 3 — Git & Docs Auto-Detection (Fallback if no saved state):
  ├── git status -s & git log --oneline -10
  ├── README.md / package.json
  └── ./documents/ or ./reports/
```

---

## 📊 Phase 2: Synthesize & Present Context Summary

Output a structured, scannable briefing in the user's language:

```markdown
# 📍 Context Restored: {Project Name}

- **Tech Stack**: {Frontend + Backend + DB}
- **Last Active**: {timestamp or last commit}
- **Overall Progress**: {X}% ({completed count} done, {remaining count} remaining)

## 🔥 Currently Working On
- **Feature**: {feature}
- **Task**: {task} ({status})
- **Active Files**: {file links}

## 🔧 Recent Decisions & Gotchas
- {key decision or constraint to keep in mind}

## ⚠️ Blockers / Uncommitted Changes
- {list any blockers or uncommitted git changes}
```

---

## 🚀 Phase 3: Offer Next Actions (`ask_question`)

If Antigravity 2.0's `ask_question` tool is available, present an interactive choice (otherwise list options):
1. **Continue**: Resume `{current task}` immediately
2. **Next Task**: Start `{next remaining task}`
3. **Status / Diff**: Inspect current uncommitted changes (`git diff`)
4. **New Task**: Specify a different goal
