---
description: "💾 Save Session & Project Memory — Persist context to Brain Artifacts (<appDataDir>\\brain\\<conversation-id>\\) and/or .brain/ for cross-session continuity."
version: "5.1"
category: session
execution-mode: execute
---

# /save — Infinite Memory & Session Keeper v5.1

<context>$ARGUMENTS</context>

---

## 🎯 PURPOSE

Combat AI context drift across sessions. Capture architectural decisions, completed tasks, active blockers, and gotchas so any future session can resume with 100% context fidelity via `/recap`.

**Storage Routing (v5.1 Smart-Hybrid)**:
1. **Antigravity 2.0 Brain Artifact (Clean Git Tree Default)**:
   - Write `<appDataDir>\brain\<conversation-id>\SESSION-HANDOVER.md` (renders in Antigravity UI Artifact pane, zero Git working tree pollution).
2. **Workspace `.brain/` Persistence (Cross-Conversation / Team Shared)**:
   - Update `.brain/session.json`, `.brain/brain.json`, and `.brain/handover.md` when `.brain/` already exists in the repo OR when user wants workspace-persisted memory across new conversations.

---

## 🔍 Phase 1: Change & Decision Analysis (Auto-Detect)

1. Run `git status -s` and `git diff --stat` (modified/added files).
2. Run `git log --oneline -5` (recent commits).
3. Check existing `<appDataDir>\brain\<conversation-id>\` artifacts and `.brain/session.json` (if present).
4. Classify changes:
   - **MAJOR** (update static architecture knowledge): New module/service, DB schema change, new API endpoint, new dependency, architectural ADR.
   - **MINOR** (update dynamic session state): Bug fix, refactor, test addition, UI polish.

---

## 🧠 Phase 2: Update Static Knowledge (`.brain/brain.json` if workspace memory active)

File: `.brain/brain.json`

```json
{
  "meta": {
    "schema_version": "5.1.0",
    "last_updated": "ISO-date",
    "project_version": "5.1.0"
  },
  "project": {
    "name": "project-name",
    "type": "web|mobile|desktop|api|cli",
    "status": "planning|development|testing|production"
  },
  "tech_stack": {
    "frontend": { "framework": "", "styling": "", "state": "" },
    "backend": { "runtime": "", "framework": "", "orm": "" },
    "database": { "type": "", "provider": "" }
  },
  "features": [
    { "name": "", "status": "planned|in-progress|done", "phase": "" }
  ],
  "knowledge_items": {
    "patterns": ["Pattern used and why"],
    "gotchas": ["Known issues and workarounds"],
    "conventions": ["Naming/structure conventions"]
  }
}
```

---

## 📋 Phase 3: Save Dynamic Session State & Handover Artifact

### 1. Brain Artifact (`<appDataDir>\brain\<conversation-id>\SESSION-HANDOVER.md`)
Write or update `SESSION-HANDOVER.md` in the conversation's Brain Artifact directory (and `.brain/handover.md` if workspace `.brain/` is used):

```markdown
# 📋 Session Handover — {Project / Feature}

> **Saved At**: {ISO-timestamp}
> **Status**: {planning | coding | testing | debugging | completed}

## 📍 Current Focus
- **Feature / Task**: {name}
- **Active Files**: {list of files}

## ✅ Completed This Session
- {item 1}
- {item 2}

## ⏳ Remaining / Next Tasks
1. {next priority task}
2. {follow-up task}

## 🔧 Key Architectural Decisions & Gotchas
- **Decision**: {what was chosen & why}
- **Gotcha**: {tricky bug or constraint discovered}
```

### 2. Dynamic State JSON (`.brain/session.json` if workspace memory active)
```json
{
  "timestamp": "ISO-date",
  "working_on": {
    "feature": "Feature name",
    "task": "Current specific task",
    "status": "planning|coding|testing|debugging",
    "files": ["files edited"],
    "notes": "Important context"
  },
  "progress": {
    "completed": ["Feature A"],
    "in_progress": ["Feature B"],
    "remaining": ["Feature C"],
    "percentage": "75%"
  },
  "decisions_made": ["Key decision"],
  "blockers": []
}
```

---

## ✅ Phase 4: Confirmation

Output a concise summary of saved artifacts:
- `SESSION-HANDOVER.md` (Brain Artifact) and/or `.brain/session.json` + `.brain/brain.json`
- Tip: Run `/recap` in your next session to restore full context immediately.
