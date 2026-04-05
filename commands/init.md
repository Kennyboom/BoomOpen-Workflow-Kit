---
description: Bootstrap a new project. Set up folder structure, git, .brain/, and initial configuration.
category: setup
execution-mode: sequential
---

# /init â€” Project Bootstrap v1.0

$ARGUMENTS

---

## Phase 1: Project Discovery

```
ASK (only what's needed):

1. "What are you building?"
   â†’ Web app | Mobile app | Desktop app | API | CLI tool

2. "Tech preferences?"
   â†’ Or let me recommend based on project type

3. "Project name?"
   â†’ Will be used for folder and package.json
```

### Auto-Recommendations by Type

| Type | Framework | DB | Styling | Hosting |
|------|-----------|-----|---------|---------|
| Web App | Next.js | PostgreSQL | Tailwind | Vercel |
| Mobile | React Native/Expo | SQLite | NativeWind | EAS |
| Desktop | Tauri + React | SQLite | Tailwind | â€” |
| API | Fastify/Express | PostgreSQL | â€” | Railway |
| CLI | Node.js | â€” | â€” | npm |

---

## Phase 2: Project Scaffolding

```
CREATE project structure:

project-name/
â”œâ”€â”€ .agent/              â† BOOM-Open (copy from template)
â”‚   â””â”€â”€ ARCHITECTURE.md
â”œâ”€â”€ .brain/              â† Session persistence
â”‚   â”œâ”€â”€ brain.json       â† Static knowledge (populated)
â”‚   â””â”€â”€ session.json     â† Dynamic state (initialized)
â”œâ”€â”€ docs/                â† Documentation home
â”‚   â”œâ”€â”€ specs/           â† Feature specifications
â”‚   â””â”€â”€ BRIEF.md         â† Project brief (from user input)
â”œâ”€â”€ src/                 â† Source code
â”‚   â”œâ”€â”€ components/      â† UI components
â”‚   â”œâ”€â”€ services/        â† Business logic
â”‚   â”œâ”€â”€ hooks/           â† Custom hooks
â”‚   â”œâ”€â”€ types/           â† TypeScript types
â”‚   â”œâ”€â”€ utils/           â† Utility functions
â”‚   â””â”€â”€ constants/       â† Named constants
â”œâ”€â”€ .env.example         â† Environment template
â”œâ”€â”€ .gitignore           â† Standard ignores
â”œâ”€â”€ package.json         â† Dependencies
â”œâ”€â”€ tsconfig.json        â† TypeScript config
â””â”€â”€ README.md            â† Project overview
```

---

## Phase 3: Initialize Tooling

```
SETUP (based on project type):

â–¡ Git: git init + initial commit
â–¡ TypeScript: strict mode enabled
â–¡ ESLint: consistent code style
â–¡ Prettier: format on save
â–¡ .env.example: with placeholder values

INSTALL core dependencies:
â–¡ Framework (Next.js / Express / etc.)
â–¡ TypeScript + @types
â–¡ ESLint + Prettier configs
â–¡ Testing framework (Vitest / Jest)
```

---

## Phase 4: Initialize .brain/

Create `.brain/brain.json`:
```json
{
  "meta": { "schema_version": "1.0.0" },
  "project": {
    "name": "[project-name]",
    "type": "[web|mobile|desktop|api|cli]",
    "status": "development"
  },
  "tech_stack": {
    "frontend": { "framework": "[chosen]" },
    "backend": { "runtime": "Node.js" },
    "database": { "type": "[chosen]" }
  },
  "features": [],
  "knowledge_items": { "patterns": [], "gotchas": [] }
}
```

Create `.brain/session.json`:
```json
{
  "timestamp": "[now]",
  "working_on": { "feature": "Project Setup", "status": "coding" },
  "progress": { "completed": [], "remaining": ["Plan features"] }
}
```

---

## Phase 5: Create BRIEF.md

```markdown
# Project Brief: [Name]

## What
[One-line description]

## Why
[Problem being solved]

## Who
[Target users]

## Tech Stack
- Frontend: [framework]
- Backend: [runtime + framework]
- Database: [type + provider]
- Hosting: [platform]

## MVP Scope
- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3

## Non-Goals (explicitly out of scope)
- [Thing we're NOT building]
```

---

## Phase 6: Verification + Handover

```
VERIFY:
â–¡ npm install â†’ no errors?
â–¡ npm run dev â†’ server starts?
â–¡ TypeScript compiles (tsc --noEmit)?
â–¡ Git initialized with first commit?
â–¡ .brain/ populated?

OUTPUT:
"âœ… PROJECT INITIALIZED!

ðŸ“ [project-name]/ is ready
ðŸ·ï¸ Stack: [framework] + [db] + [hosting]
ðŸ“ Brief: docs/BRIEF.md

Next steps:
1. /plan â€” Define features and specs
2. /brainstorm â€” Explore ideas first
3. Start coding directly"
```
