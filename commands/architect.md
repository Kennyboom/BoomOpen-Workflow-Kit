---
description: >-
  Bulletproof Design System v2 â€” C4 Architecture, ADR, Database Schema,
  API Contracts, Screen Specs, State Management, Error Handling,
  Caching Strategy, and mandatory Design Coverage Audit.
  NO code writing. Design docs only.
category: architecture
execution-mode: sequential
---

# /architect â€” Bulletproof Design System v2.0

$ARGUMENTS

---

## GOLDEN RULES

```
1. NO architecture without C4 Model (Level 1+2 minimum)
2. NO database without Indexing Strategy
3. NO API without Error Response Schema
4. NO state design without specifying tool + sync strategy
5. NO design without global Error Handling (8 types)
6. NO design without Caching Strategy ("cache what, how long")
7. NO architecture decision without ADR record
```

---

## Purpose

```
Plan = Know WHAT to build.
Architect = Know HOW to build it.

This command creates bulletproof technical design including
architecture, database schema, API contracts, state management,
caching, error handling â€” all verified by mandatory audit.
```

---

## Phase 1: Context + Component Discovery (MANDATORY)

### 1.1 Auto-Scope Detection

```
1. Read docs/specs/ â†’ ALL features needing technical design
2. Read docs/BRIEF.md â†’ project context
3. Read existing docs/design/ â†’ designs already done

Report to user:
  "Found [X] features needing technical design.
   Already designed: [Y]
   Not yet designed: [Z]

   Options:
   1. Design ALL
   2. Choose specific modules
   3. Edit existing designs"
```

### 1.2 Component Discovery Engine (MANDATORY)

> â›” BEFORE drawing architecture, MUST list ALL components.

**Entities â†’ DB Tables:**

```
Profile â†’ profiles table (columns, indexes, relations)
Campaign â†’ campaigns + campaign_profiles tables
Content â†’ content_posts + content_scores tables
```

**Actions â†’ API Endpoints:**

```
Create Profile â†’ POST /api/v1/profiles
Get Profiles â†’ GET /api/v1/profiles
Update Profile â†’ PUT /api/v1/profiles/:id
Delete Profile â†’ DELETE /api/v1/profiles/:id
```

**Screens â†’ Screen Specs:**

```
Dashboard â†’ route, components, API calls, states
Profile List â†’ route, components, API calls, states
Create Profile â†’ form fields, validation, submit API
```

**Output â€” Component Inventory Table:**

```markdown
| # | Component | Type | Feature | Status |
|---|-----------|------|---------|--------|
| 1 | profiles | DB Table | Profile | Not designed |
| 2 | POST /profiles | API | Profile | Not designed |
| 3 | Dashboard | Screen | Core | Not designed |
```

> â›” DO NOT proceed until user approves Component Inventory.

---

## Phase 2: C4 Architecture (Level 1-3)

```
LEVEL 1 â€” System Context (bird's eye view):
ðŸ‘¤ User â”€â”€â–º [ðŸ“± App] â”€â”€â–º [ðŸ’³ Stripe] / [ðŸ“§ Email] / [ðŸ¤– AI]

LEVEL 2 â€” Container (inside app):
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ [App] â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Frontend] â—„â”€â”€â–º [Backend API] â—„â”€â”€â–º [Database] â”‚
â”‚                 [Redis Cache]                   â”‚
â”‚                 [Job Queue]                     â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

LEVEL 3 â€” Component (inside backend):
Routes â†’ Controllers â†’ Services â†’ Models
Middleware: auth, cors, rateLimit, validation
Validators: zod schemas
```

---

## Phase 3: ADR (Architecture Decision Records)

```markdown
## ADR-001: Choose [Technology/Pattern]
Date: [Date] | Status: âœ… Accepted

Context: [Problem to solve]
Decision: [What was chosen]
Rationale: [Why â€” 3 specific reasons]
Alternatives: [What was considered and rejected]
Consequences: [Good / Trade-offs / Risks]
```

> MANDATORY ADR for: Frontend, Backend, Database,
> Auth, Hosting, State Management, CSS Framework.

---

## Phase 4: Database Design

```
For each table:
- Name + columns + types + constraints + relationships
- Indexes (especially on FK, WHERE, ORDER BY columns)

Example:
â”‚ users â”‚ id UUID PK â”‚ email UNIQUE â”‚ name â”‚ role ENUM â”‚
â”‚       â”‚ password_hash â”‚ created_at â”‚ updated_at â”‚
â”‚ INDEX: idx_users_email, idx_users_role â”‚
â”‚ RELATION: users.id â†’ orders.user_id â”‚

Optimization Checklist:
â–¡ FK columns indexed
â–¡ WHERE columns indexed
â–¡ Soft delete: deleted_at + partial index
â–¡ Timestamps: created_at, updated_at
â–¡ UUID primary keys (not auto-increment)
â–¡ ENUM for fixed values (role, status)
â–¡ JSON/JSONB for flexible data
â–¡ Migration strategy defined
```

---

## Phase 5: API Contract Design

```
ðŸ“¡ POST /api/v1/auth/login
Auth: âŒ Public | Rate Limit: 5/min/IP
Request: { email: string, password: string }
200: { success: true, data: { token, user } }
401: { success: false, error: { code: "AUTH_FAILED", msg } }
422: { success: false, error: { code: "VALIDATION", details } }

API Checklist:
â–¡ Versioning (/api/v1/)
â–¡ Consistent envelope: { success, data, error }
â–¡ Error codes: machine-readable (AUTH_FAILED)
â–¡ Pagination: { data, meta: { page, total, limit } }
â–¡ Filtering: ?status=active&sort=-created_at
â–¡ CORS: explicit origin whitelist
```

---

## Phase 6: Screen Specs (ALL screens)

```markdown
For EACH screen:

| Attribute | Value |
|-----------|-------|
| Route | /dashboard |
| Auth | Required (User role) |
| Components | StatsCard, Chart, Table |
| API calls | GET /api/stats, GET /api/orders |
| Loading | Skeleton cards + table |
| Empty | "No data" + CTA to create |
| Error | Toast "Failed to load" + Retry |
| Responsive | Mobile: stack, Desktop: grid |
```

---

## Phase 7: User Journey (5 flows)

```
1. ONBOARDING: Landing â†’ Sign up â†’ Verify â†’ First action â†’ Dashboard
2. CORE ACTION: Dashboard â†’ Create â†’ Edit â†’ Confirm â†’ Success
3. ERROR RECOVERY: Action â†’ Error â†’ Message â†’ Retry â†’ Success
4. OFFLINE: Action â†’ Lost connection â†’ Queue â†’ Reconnect â†’ Sync
5. ACCOUNT: Profile â†’ Settings â†’ Billing â†’ Delete account â†’ Confirm
```

---

## Phase 8: State Management

```markdown
4 state types:

| Type | Tool | Examples |
|------|------|----------|
| ðŸŒ Server | TanStack Query | users, orders, products |
| ðŸ’» Client | Zustand | UI state, theme, sidebar |
| ðŸ’¾ Persistent | localStorage | auth token, preferences |
| ðŸ”— URL | searchParams | filters, pagination, tabs |

Store Slicing:
| Store | State | Actions |
|-------|-------|---------|
| authStore | user, token | login, logout, refresh |
| uiStore | theme, sidebar | toggle, setTheme |
| settingsStore | language, tz | update |
```

---

## Phase 9: Error Handling (8 types â€” ALL MANDATORY)

```markdown
| Error Type | Response | UI Behavior |
|------------|----------|-------------|
| Validation | 422 + details | Inline at field |
| Auth | 401 | Redirect to login |
| Permission | 403 | "No permission" page |
| Not Found | 404 | Beautiful 404 page |
| Network | No response | Toast + auto-retry |
| Server | 500 | Retry 3x with backoff |
| Rate Limit | 429 | Countdown timer |
| Business | 409/422 | Specific message |
```

---

## Phase 10: Caching + Integration Matrix

```markdown
5 cache layers:
Browser â†’ CDN â†’ API (TanStack) â†’ Server (Redis) â†’ DB

ðŸš« NEVER cache: auth tokens, real-time data, sensitive data

Integration Matrix:
| Source A | Source B | Protocol | Error Strategy |
|----------|---------|----------|----------------|
| Frontend | API | REST+JWT | Retry + toast |
| API | DB | ORM | Transaction rollback |
| API | Stripe | Webhook | Queue retry |
| API | AI | REST | Timeout + fallback |
```

---

## Phase 11: Design Coverage Audit (MANDATORY)

> â›” NO handover if audit FAILS.

```markdown
| Check | Requirement | Status |
|-------|-------------|--------|
| Entity Coverage | Every entity has DB schema + indexes | â˜ |
| API Coverage | Every action has endpoint + error codes | â˜ |
| Screen Coverage | Every screen has spec (route, auth, states) | â˜ |
| Error Coverage | All 8 error types have handling defined | â˜ |
| ADR Coverage | Every tech decision has ADR | â˜ |

IF any FAIL â†’ complete design before handover.
```

---

## Output

| Deliverable | Location |
|-------------|----------|
| Technical Design | `docs/DESIGN-{feature}.md` |

---

## After Architecture

```
ðŸ—ï¸ TECHNICAL DESIGN COMPLETE!
ðŸ“ File: docs/DESIGN-{feature}.md

âœ… C4 Architecture (Level 1-3)
âœ… ADR Records (7+ decisions documented)
âœ… Database Schema + Indexes
âœ… API Contracts + Error Responses
âœ… Screen Specs (all screens)
âœ… User Journey (5 flows)
âœ… State Management (4 types)
âœ… Error Handling (8 types)
âœ… Caching Strategy (5 layers)
âœ… Integration Matrix
âœ… Design Coverage Audit: ALL PASS

Next:
1. /code â€” Start implementation
2. /deep-audit â€” Verify design logic
3. /plan â€” Refine plan
```
