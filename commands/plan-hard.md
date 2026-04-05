---
description: >-
  Master Planner v4 â€” Feature Discovery Engine, Given/When/Then specs,
  mandatory Edge Cases, Phase Splitting, and Plan Coverage Audit.
  NO code writing. Plan files only.
category: planning
execution-mode: sequential
---

# /plan:hard â€” Master Planner v4.0

$ARGUMENTS

---

## GOLDEN RULES

```
1. EVERY FEATURE HAS A SPEC â€” No code without spec
2. ACCEPTANCE CRITERIA = Given/When/Then+Verify TABLE
3. EDGE CASES MINIMUM 5 PER FEATURE â€” Happy path is NOT enough
4. EACH PHASE = SEPARATE FILE â€” No merging, no summarizing
5. EACH FEATURE MUST HAVE: User Story + AC + Edge Cases + Effort
6. UI FEATURES MUST HAVE: ASCII wireframe + States table
7. USER DECIDES SCOPE â€” AI suggests, user chooses
8. DEPENDENCY MATRIX AT END OF EACH PHASE â€” Clear build order
9. BUFFER x1.5 â€” Always add time buffer
10. NO CODE IN PLAN â€” No TypeScript/Rust/Python code blocks
11. SELF-CONTAINED â€” Plan executable with ZERO external context
```

---

## Phase 1: Context Load + Auto-Scope

```
1. Read CODEBASE.md â†’ OS, stack, existing structure
2. Read docs/BRIEF*.md OR user request
3. Read docs/specs/ â†’ check existing specs
4. Read .brain/ â†’ session context if available

AFTER SCAN: Proceed automatically.
  DO NOT ask "what do you want to plan?"
  If BRIEF exists â†’ plan everything.
  Only ask when genuinely ambiguous.
```

---

## Phase 2: Feature Discovery Engine (MANDATORY)

> â›” BEFORE writing User Stories, AI MUST list ALL features.

### Step 1 â€” Entity Decomposition

```
Every data entity â†’ 5 CRUD operations:

Profile â†’ Create, Read (list), Read (detail), Edit, Delete
Campaign â†’ Create, Read, Edit, Delete, List, Report
Content â†’ Create, Read, Edit, Delete, List, Preview
```

### Step 2 â€” Sub-feature Inference

```
Every feature â†’ infer sub-features:

Profile Manager has "Create Profile" button
  â†’ MUST plan: Create Profile Form (fields, validation)
  â†’ MUST plan: Niche Selector (dropdown, custom input)
  â†’ MUST plan: Avatar Upload (if applicable)
  â†’ MUST plan: Success/Error feedback
```

### Step 3 â€” Cross-cutting Concerns

```
If login exists    â†’ credentials management, password reset
If user data       â†’ settings/preferences page
If events          â†’ notification system
If errors          â†’ global error handling + recovery
If new app         â†’ onboarding/first-run experience
If multiple roles  â†’ permission system + role management
If file uploads    â†’ storage management + cleanup
If search          â†’ search index + suggestions + history
```

### Step 4 â€” Output: Feature Inventory Table

```markdown
| # | Feature | Type | Module | Priority | Spec Status |
|---|---------|------|--------|----------|-------------|
| 1 | Create Profile | Form | Profile | P0 | Not planned |
| 2 | Profile Health | Monitor | Profile | P0 | Not planned |
```

> â›” DO NOT write User Stories until Feature Inventory
> is approved by user OR user says "continue".

---

## Phase 3: Spec Generation (per feature)

> ðŸš¨ **MANDATORY:** `view_file` the feature templates reference
> BEFORE writing any spec:
> `.agent/workflows/references/plan/feature-templates.md`
>
> Choose the right template per feature type:
> UI â†’ Template 1 | API â†’ Template 2 | Full-stack â†’ Template 3
> AI/LLM â†’ Template 4 | IPC â†’ Template 5 | Security â†’ Template 6

### 3.1 User Story (MANDATORY)

```
Format: "As [ROLE], I want [ACTION], so that [BENEFIT]"

Group by role:
- User (end user)
- Developer (maintainer)
- System (automated)
```

### 3.1b Atomic Task Decomposition (MANDATORY)

```
EACH task in plan MUST be:
â˜ â‰¤ 2 hours effort (if bigger â†’ SPLIT)
â˜ 1 file or 1 component scope
â˜ Has: description + target file + acceptance criteria

âŒ BAD:  "Build Dashboard page"
âœ… GOOD: "1. Create DashboardLayout (grid 3-col)"
       "2. Create StatsCard component"
       "3. Create RecentTable component"
       "4. Wire API: GET /api/stats"
       "5. Add loading/error/empty states"

WHY: Tasks > 2h cause AI to skip details.
     Atomic tasks = zero feature loss.
```

### 3.2 Acceptance Criteria (MANDATORY â€” TABLE format)

```markdown
| # | Given | When | Then | Verify |
|:-:|-------|------|------|--------|
| 1 | [condition] | [action] | [result] | [how to verify] |

Verify column examples:
  "Unit test: auth.test.ts"
  "Integration: POST /api/login â†’ 200"
  "Visual: screenshot comparison"
  "Manual: check email received"

âš ï¸ NO vague AC allowed:
âŒ "Given user login, When click, Then success"
âœ… "Given user has valid account, When enters email+pass
    and clicks Login, Then redirect to /dashboard in < 2s
    | Verify: Integration test + visual check"
```

### 3.3 Edge Cases (MANDATORY â€” minimum 5 per feature)

```markdown
| Case | Behavior |
|------|----------|
| Empty state: no data | Show illustration + CTA |
| Error state: network/server | Toast "Connection error" + Retry btn |
| Loading state: fetching | Skeleton shimmer |
| Max limit: exceeds X items | Warning + block action |
| Permission: no access | 403 page + "Contact admin" |
| Concurrent: 2 users edit | Optimistic lock + conflict modal |
| Offline: lost connection | Queue offline, sync when online |
```

### 3.4 UI States (MANDATORY for UI features)

```markdown
| State | UI |
|-------|-----|
| Idle | [description] |
| Loading | Skeleton shimmer |
| Success | [description] |
| Error | Toast + Retry |
| Empty | Illustration + CTA |
```

### 3.5 API Contract (MANDATORY for API features)

```markdown
IF feature involves API â†’ contract MUST be defined in plan:

| Endpoint | Method | Request | Response 200 | Errors |
|----------|--------|---------|--------------|--------|
| /api/users | GET | ?page=1&limit=20 | { users[], meta } | 500 |
| /api/users | POST | { name, email } | { user } | 422, 409 |
| /api/users/:id | PUT | { name } | { user } | 404, 422 |

WHY: Frontend mocks from contract.
     Backend codes from contract.
     Both work in PARALLEL. Zero integration bugs.

IF feature has NO API â†’ skip this section.
```

### 3.6 Processing Contract (if non-API backend logic)

```markdown
| Input | Output | Side Effects |
|-------|--------|--------------|
| [name + simple type] | [name + simple type] | [text description] |

âš ï¸ NO function signatures or code blocks. Use TABLE only.
```

---

## Phase 4: Phase Splitting â€” SMART SPLIT (MANDATORY)

> Split based on complexity. Small tasks = 1 file. Large = many.

### Smart Splitting Rule

```
IF â‰¤ 3 features AND â‰¤ 3 days effort:
  â†’ SINGLE file: SPECS-{ID}-plan.md (all phases combined)

IF > 3 features OR > 3 days:
  â†’ SEPARATE files: master + phase-NN-{name}.md
```

### Directory Structure (multi-file)

```
docs/specs/{feature-name}/
â”œâ”€â”€ SPECS-{ID}-plan.md          â† Master overview
â”œâ”€â”€ phase-01-{name}.md          â† Phase detail
â”œâ”€â”€ phase-02-{name}.md
â””â”€â”€ phase-0N-{name}.md
```

### Master Spec File Template

```markdown
# SPECS-{ID}: {Feature Name}
Status: Draft

## 1. SUMMARY
## 2. OBJECTIVES
## 3. USER STORIES (table, grouped by role)
## 4. PHASES OVERVIEW (summary table)
## 5. DEPENDENCY GRAPH (ASCII diagram)
## 6. EFFORT ESTIMATION (table + buffer x1.5)
## 7. DATABASE (SQL CREATE TABLE â€” schema only)
## 8. MVP CUTOFF (which phases are MVP)
## 9. NEXT STEPS
```

### Phase File Template

```markdown
# Phase {XX}: {Icon} {PHASE NAME}

> **Parent:** [link to SPECS master]
> **Depends on:** [previous phase]
> **Status:** Draft | **Effort:** â­â­â­ | **Timeline:** X weeks

## ðŸ“Œ User Request (VERBATIM)
> {Copy user's original request EXACTLY as written}
> {Do NOT paraphrase or interpret}

## ðŸ“‹ Context Summary
**Architecture**: {relevant tech decisions}
**Patterns**: {coding patterns to follow}
**Constraints**: {technical/business constraints}

âš ï¸ This phase file MUST be self-contained.
Implementer should execute with ONLY this file â€” no chat history.

---

## Feature {X.1}: {Feature Name}

### Summary
[1-2 sentence description]

### User Story
As [role], I want [action], so that [benefit].

### Acceptance Criteria
| # | Given | When | Then | Verify |
|:-:|-------|------|------|--------|
| 1 | [specific] | [specific] | [specific] | [method] |

### UI Description (MANDATORY if has interface)
[ASCII wireframe â€” detailed layout]

### States (MANDATORY if has UI)
| State | UI |
|-------|-----|
| Idle | [desc] |
| Loading | Skeleton shimmer |
| Success | [desc] |
| Error | Toast + Retry |
| Empty | Illustration + CTA |

### Edge Cases (MANDATORY, minimum 5)
| Case | Behavior |
|------|----------|
| [case] | [behavior] |

### Dependencies
- Requires [feature X.Y] first

### Effort: â­â­ | Timeline: X days

---

## Dependency Matrix (end of each phase file)

| Feature | Depends On | Required By |
|---------|-----------|-------------|
| X.1 | [deps] | [dependents] |

Build order: X.1 â†’ X.2 + X.3 (parallel) â†’ X.4

## Total Effort Phase {XX}

| Feature | Effort | Timeline |
|---------|--------|----------|
| X.1 | â­â­ | X days |
| TOTAL | | ~X days |
| + Buffer x1.5 | | ~X days |
```

---

## Phase 5: Dependency Mapping

```
Each feature must specify (IN PHASE FILE):
â–¡ Prerequisite features
â–¡ Required libraries
â–¡ Required APIs (internal / external)
â–¡ Required data models (tables, schemas)
â–¡ Required services (auth, email, payment)

Cross-phase dependencies:
Phase 01 â†’ Phase 02 â†’ Phase 03
(Foundation)  (Core)     (Polish)

â–¡ No circular dependencies
â–¡ Each phase can demo independently
â–¡ Critical path highlighted
```

---

## Phase 6: Effort Estimation

```markdown
| Phase | Features | Raw Days | + Buffer | Priority |
|:-----:|:--------:|:--------:|:--------:|:--------:|
| 01 | X | X days | X days | ðŸ”´ MVP |
| 02 | X | X days | X days | ðŸ”´ MVP |
| 03 | X | X days | X days | ðŸŸ¡ P1 |
| 04 | X | X days | X days | ðŸŸ¢ P2 |
| TOTAL | X | X days | X days | |

MVP = Phase [01+02]: ~X days (~X months with buffer)

âš ï¸ Buffer x1.5 ALWAYS APPLIED
```

---

## Phase 6.5: Risk Matrix (MANDATORY)

> Every plan MUST assess what could go wrong.

```markdown
| Risk | Probability | Impact | Mitigation | Rollback |
|------|:-----------:|:------:|------------|----------|
| DB migration breaks | M | H | Run staging first | Backup + rollback script |
| API rate limit | L | M | Implement retry | Cache fallback |
| 3rd party downtime | L | H | Health check | Feature flag disable |

Rollback Strategy:
  IF Phase X fails â†’ revert to Phase X-1 state
  Specific steps: [git revert / DB rollback / config restore]
```

---

## Phase 7: Plan Coverage Audit (MANDATORY)

> â›” NO handover if coverage audit FAILS.

```markdown
| Check | Requirement | Status |
|-------|-------------|--------|
| Feature Coverage | Every feature from BRIEF is planned | â˜ |
| CRUD Check | Every entity has C/R/U/D specs | â˜ |
| Sub-feature Check | Every button/action has spec | â˜ |
| Cross-cut Check | Settings, Notifications, Onboarding | â˜ |

IF any FAIL â†’ add missing specs before handover.
```

### Completion Checklist

Master spec âœ“ | Phase files split âœ“ | Given/When/Then tables âœ“ | Edge cases â‰¥5 âœ“ | ASCII wireframes (UI) âœ“ | States table (UI) âœ“ | Dependency matrix âœ“ | Effort + buffer âœ“ | MVP cutoff âœ“ | No code blocks âœ“

---

## Output

| Deliverable | Location |
|-------------|----------|
| Master Spec | `docs/specs/{feature}/SPECS-{ID}-plan.md` |
| Phase Files | `docs/specs/{feature}/phase-{NN}-{name}.md` |

**Next**: `/architect` â†’ Technical design | `/code` â†’ Implement | `/brainstorm` â†’ Explore
