---
description: Smart navigator â€” detect current state and recommend the next workflow. Use when stuck or unsure what to do next.
---

# /next â€” Smart Navigator v1.0

$ARGUMENTS

---

## Purpose

You're the compass. User is stuck or doesn't know what's next.
Analyze current state and recommend the EXACT next action.

**Rule:** Don't ask questions. Analyze and suggest.

---

## Phase 1: Auto-Detect Current State

```
READ (in priority order):
1. .brain/session.json â†’ working_on, status, pending
2. .brain/brain.json â†’ project type, features
3. docs/specs/ â†’ spec files exist?
4. docs/DESIGN*.md â†’ design docs exist?
5. git status â†’ uncommitted changes?
6. git log --oneline -3 â†’ recent commits
7. Scan for TODO/FIXME in source files
```

---

## Phase 2: Phase Detection

Based on what exists, determine current phase:

```
NO .brain/ AND NO docs/:
  â†’ Phase: EMPTY (nothing started)

.brain/ exists BUT NO docs/specs/:
  â†’ Phase: IDEATION (has context, no plan)

docs/specs/ exists BUT NO DESIGN:
  â†’ Phase: PLANNED (has spec, no design)

DESIGN exists BUT few source files:
  â†’ Phase: DESIGNED (has design, not coded)

Source files exist AND git has recent commits:
  â†’ Phase: CODING (actively developing)

session.json status == "debugging":
  â†’ Phase: DEBUGGING (has errors)

session.json status == "testing":
  â†’ Phase: TESTING (running tests)

All features done AND tests pass:
  â†’ Phase: READY TO DEPLOY
```

---

## Phase 3: Smart Recommendation

### If EMPTY:
```
ðŸ§­ Project is empty â€” nothing started yet.

âž¡ï¸ Next: /init to bootstrap your project
   Or: /brainstorm if you have a rough idea
   Or: /plan if you know exactly what to build
```

### If IDEATION:
```
ðŸ§­ You have context but no formal plan.

âž¡ï¸ Next: /plan to create detailed specs
   Tip: A good plan prevents 80% of bugs.
```

### If PLANNED:
```
ðŸ§­ Specs are ready! No technical design yet.

âž¡ï¸ Next: /architect to create technical design
   This covers: DB schema, API contracts, state management
```

### If DESIGNED:
```
ðŸ§­ Design complete. Time to build!

âž¡ï¸ Next: /create to start coding
   Your specs and design are ready as input.
```

### If CODING (with progress):
```
ðŸ§­ DEVELOPMENT IN PROGRESS

ðŸ“Š Progress:
â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘ [X]% ([N/M] features)

ðŸ“ Currently: [feature name] â€” [task]

âž¡ï¸ Next:
  1. Continue coding: /create [current feature]
  2. Hit a bug? /debug
  3. Need a break? /save to persist context
  4. Review quality? /review
```

### If DEBUGGING:
```
ðŸ§­ You have unresolved errors from last session.

ðŸ› Error: [description from session.json]

âž¡ï¸ Next: /debug to investigate
   Tip: Start with the hypothesis from last session.
```

### If READY TO DEPLOY:
```
ðŸ§­ All features done! Tests passing!

âž¡ï¸ Next:
  1. /deep-audit â€” Final quality check (recommended)
  2. /security-audit â€” Security review
  3. /deploy â€” Ship it!
```

---

## Phase 4: Bonus Tips

```
IF uncommitted changes > 5 files:
  â†’ "âš ï¸ You have [N] uncommitted files. Commit often!"

IF last commit > 2 hours ago:
  â†’ "âš ï¸ Last commit was [X] ago. Save your work!"

IF TODO count > 3:
  â†’ "ðŸ“Œ [N] TODOs found in code. Clean up before deploy."

IF session is long:
  â†’ "ðŸŒ™ Long session. Consider /save then fresh /recap."
```

---

## Workflow Chain Reference

```
/init â†’ /brainstorm â†’ /plan â†’ /architect â†’ /create
                                              â”‚
                                    â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                                    â–¼         â–¼          â–¼
                                 /debug    /test    /enhance
                                    â”‚         â”‚          â”‚
                                    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                                              â–¼
                              /deep-audit â†’ /security-audit
                                              â”‚
                                              â–¼
                                   /deploy â†’ /save
                                              â”‚
                                     (new session)
                                              â”‚
                                           /recap
```

**Emergency exit at any point:** `/rollback`

---

## Output Format

```
ðŸ§­ WHERE YOU ARE:
[Brief status description]

ðŸ“Š PROGRESS: [if applicable]
â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘ X%

âž¡ï¸ RECOMMENDED NEXT:
[Specific command with explanation]

ðŸ’¡ TIP:
[Context-specific advice]
```
