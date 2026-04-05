---
description: Restore session context from .brain/ to resume previous work. Smart context loading with progress tracking.
---

# /recap â€” Context Restoration v2.0

$ARGUMENTS

---

## Phase 1: Load Brain State

```
READ in this order:
1. .brain/session.json â†’ current working state
2. .brain/brain.json â†’ project knowledge
3. .brain/handover.md â†’ if exists, last handover notes
4. docs/specs/ â†’ active specs
5. git log --oneline -5 â†’ recent activity
```

### If .brain/ exists:

```
Parse session.json for:
- working_on (feature, task, status)
- progress (completed, remaining, percentage)
- decisions_made
- blockers
- errors_encountered (unresolved ones)

Parse brain.json for:
- project type and tech stack
- database schema summary
- API endpoint count
- active features list
```

### If .brain/ NOT found:

```
"âŒ No saved context found.

Options:
1. /plan â€” Start planning a new feature
2. /init â€” Bootstrap a new project
3. Tell me what you're working on"
```

---

## Phase 2: Progress Detection

```
IF plan files exist (docs/specs/phase-*.md):
  Count total phases and completed phases
  Calculate progress percentage
  Identify current phase and next tasks

IF git has recent commits:
  Show last 3 commit messages
  Identify files changed recently
```

---

## Phase 3: Context Report

```
ðŸ§  SESSION RESTORED

ðŸ“ Project: [name] ([type])
ðŸ·ï¸ Stack: [framework] + [db] + [hosting]
ðŸ“Š Status: [planning|coding|testing]

â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”

ðŸ“Š PROGRESS:
â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘ [X]% ([N/M] features)

âœ… Completed:
  - [Feature A]
  - [Feature B]

ðŸ”„ In Progress:
  - [Feature C] â† YOU ARE HERE

ðŸ“‹ Remaining:
  - [Feature D]
  - [Feature E]

â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”

ðŸ“ Key Decisions:
  - [Decision 1]
  - [Decision 2]

ðŸš§ Blockers:
  - [Blocker if any]

âš ï¸ Unresolved Errors:
  - [Error if any]

ðŸ“‚ Recent Changes:
  - [commit 1]
  - [commit 2]

â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”

Ready to continue? Options:
1. Continue [current feature]
2. /next â€” See recommended next step
3. /create â€” Start coding
4. /plan â€” Plan something new
```

---

## Phase 4: Smart Suggestions

Based on restored context, provide targeted advice:

```
IF status == "debugging":
  â†’ "Last session had unresolved errors. Try /debug"

IF status == "coding" AND progress > 80%:
  â†’ "Almost done! Consider /test then /deploy"

IF blockers exist:
  â†’ "Blocker from last session: [X]. Resolved?"

IF handover.md exists:
  â†’ "Handover notes from last session: [summary]"

IF no activity for > 7 days:
  â†’ "It's been a while! Let me re-scan the project..."
  â†’ Run deeper analysis (git log, file scan)
```

---

## Resilience

```
IF session.json is corrupted:
  â†’ Fallback to git log analysis
  â†’ "Session file damaged. Rebuilding from git history..."

IF brain.json is missing but session.json exists:
  â†’ Load session only
  â†’ "Static knowledge missing. Session state loaded."

IF everything is missing:
  â†’ "Fresh start! Use /init or /plan to begin."
```
