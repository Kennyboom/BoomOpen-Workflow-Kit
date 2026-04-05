---
description: >-
  Ruthless Inspector v2 â€” Deep logic audit of documentation BEFORE code.
  10 Audit Dimensions, Crash Testing, Data Flow Tracing,
  Cross-module Dependency Verification, and Scoring Matrix.
  Finds LOGIC holes, not just TEXT holes.
category: audit
execution-mode: sequential
---

# /deep-audit â€” The Ruthless Inspector v2.0

$ARGUMENTS

---

## Purpose

```
"Complete" documentation â‰  "Correct" documentation.
Text reads fine but logic is broken = TICKING TIME BOMB.

/review checks CODE.
/deep-audit checks DOCUMENTATION before code.
```

---

## IRON RULES (12)

```
1.  CHECK LOGIC, NOT TEXT
2.  TRACE DATA END-TO-END (format at EVERY boundary must match)
3.  CHALLENGE EVERY "WORKS FINE" (prove with logic)
4.  TIMING IS THE ENEMY (2 parallel processes = ALWAYS HAVE DELTA)
5.  CRASH TEST EVERYTHING ("kill -9 then what?")
6.  FORMAT MUST MATCH EXACTLY (float32 mono â‰  int16 stereo)
7.  CALCULATE RESOURCES SPECIFICALLY (numbers, not estimates)
8.  DEPENDENCIES MUST HAVE SPECIFIC VERSIONS (compatible?)
9.  NAMES MUST BE CONSISTENT (cross-file naming check)
10. ERROR HANDLING MUST HAVE A WAY BACK (detect â†’ recover â†’ user sees)
11. COUNT FIRST â€” CHECK SECOND (scope census MANDATORY)
12. REPORT PROGRESS â€” AUTO-SPLIT SESSIONS (50KB/session)
```

---

## Phase 0: Scope Census (MANDATORY BEFORE ANYTHING)

> â›” Census not done = audit NOT started.

### 0.1 Count Scope

```
STEP 1: list_dir â†’ scan ALL directories with .md files
  â†’ root/, docs/, plans/, docs/specs/, docs/design/
STEP 2: Count: doc_count + plan_count + spec_count
             + design_count = TOTAL
STEP 3: Count modules, phases, features
STEP 4: Report scope to user
```

### 0.2 Session Calculator

```
SESSION_BUDGET = 50KB (byte-level trace per session)
Group files by LOGIC GROUP (same module = same session)
Files that reference each other = same session
```

### 0.3 Progress Persistence

```
Save: {project_root}/.audit/audit-progress.json

{
  "totalFiles": N,
  "checkedFiles": [...],
  "remainingFiles": [...],
  "currentSession": X,
  "totalSessions": Y,
  "findings": [...]
}

ON START: Check .audit file exists?
  YES and remaining > 0 â†’ ask continue or restart
  NO â†’ run Census from scratch
```

---

## Phase 1: Project Scan (EACH session)

### 1.1 Session Scope Declaration

```
"ðŸ”¬ SESSION [X/N] â€” SCOPE:
 ðŸ“ Files: [list]
 ðŸŽ¯ Modules: [list]
 ðŸ“Š Progress: [checked]/[total] files"
```

### 1.2 File-by-File Reading (MANDATORY)

```
MUST view_file EACH FILE. DO NOT:
  âŒ "I already know this file" â†’ MUST re-read
  âŒ Skim 800 lines â†’ only read 50 lines

AFTER EACH FILE: âœ… file_name.md â€” read [X lines]
```

### 1.3 Cross-Reference Map

```markdown
| Concept | Defined In | Referenced By | Consistent? |
|---------|-----------|---------------|:-----------:|
```

### 1.4 Module Dependency Graph

```
Draw REAL dependency graph â€” data format at EVERY boundary.
DO NOT accept "Phase 01 â†’ Phase 02".
MUST have: format, protocol, size at each connection.
```

---

## Phase 2: 10 Audit Dimensions

> EACH dimension = 1 results table. DO NOT skip any.

| DIM | Name | What to Check |
|:---:|------|---------------|
| 1 | ðŸ“¡ Data Flow | Trace inputâ†’output, format match at boundaries |
| 2 | â±ï¸ Timing | Parallel processes, delta > 16ms needs sync |
| 3 | ðŸ’¥ Crash Recovery | Kill -9 â†’ detect â†’ recover â†’ user sees what |
| 4 | ðŸ”— Cross-Module | Module A needs data from B, format match? |
| 5 | ðŸ§® Resources | VRAM/RAM/CPU/Disk â€” SPECIFIC NUMBERS |
| 6 | ðŸ“ Naming | Cross-file naming consistency |
| 7 | ðŸ”’ Security | Auth, port binding, encryption, isolation |
| 8 | ðŸ“Š Test Coverage | Happy + error + perf + security + integration |
| 9 | ðŸ“ Spec Complete | User story + AC + edge cases + error handling |
| 10 | ðŸ§© Architecture | C4 match IPC? Schema match API? ADR match impl? |

### DIM-7 Security Checklist

```
â–¡ IPC channels have auth?
â–¡ SHM names random (UUID) or hardcoded?
â–¡ Port binding random or fixed?
â–¡ Sensitive data encrypted?
â–¡ Process isolation (not elevated)?
â–¡ Input validation (size limit, format check)?
```

### DIM-8 Test Coverage Ratios

```
features_without_tests / total_features â†’ MUST = 0
edge_case_tests / happy_path_tests â†’ MUST â‰¥ 1.0
```

### DIM-10 Architecture Consistency

```
â–¡ C4 diagrams MATCH IPC schema?
â–¡ Data schema MATCH API contracts?
â–¡ Phase dependencies MATCH data flow?
â–¡ ADR decisions MATCH implementation?
```

---

## Phase 3: Scoring + Report

### Severity Classification

```
ðŸ”´ CRITICAL â€” Logic breaks, data loss, security hole
ðŸŸ¡ WARNING â€” Inconsistency, missing edge case, unclear spec
ðŸŸ¢ SUGGESTION â€” Optimization, naming improvement, clarification
```

### Scoring Matrix (per dimension)

```markdown
| DIM | Name | Score (0-10) | Findings | Severity |
|:---:|------|:----------:|:--------:|----------|
| 1 | Data Flow | â€” | â€” | â€” |
| 2 | Timing | â€” | â€” | â€” |
...
| TOTAL | | â€”/100 | â€” | â€” |
```

---

## Phase 4: Fix Execution

```
1. List findings by severity (ðŸ”´ first)
2. Ask user: Fix all / selective / review report first
3. Fix each finding â†’ verify
4. Re-audit failed dimensions
```

---

## Phase 5: Final Report

```
BEFORE writing: files_checked == total_files?
  âŒ Not yet â†’ "Remaining: [X] files. Run /deep-audit again."
  âœ… Done â†’ write docs/AUDIT-REPORT-{date}.md

Content:
- Executive Summary
- Scope Coverage
- Scoring Matrix (10 dimensions)
- Findings Table (severity-sorted)
- Data Flow Verification
- Timing Analysis
- Resource Budget
- Risk Assessment
- Recommendations
```

---

## Phase 6: Handover

```
ðŸ”¬ DEEP AUDIT COMPLETE!
ðŸ“ Report: docs/AUDIT-REPORT-{date}.md
ðŸ“ Scope: [X/X] files (100% coverage)
ðŸ“Š Score: [XX]/100
ðŸ”´ Critical: [N] found, [N] fixed
ðŸŸ¡ Warning: [N] found, [N] fixed

Next:
1. Fix remaining issues?
2. Start code? /code
3. Save context? /save
4. Re-audit? /deep-audit
```

---

## GOLDEN RULES

```
1.  NEVER SAY "100%" â€” Always more to check
2.  CHECK LOGIC, NOT TEXT
3.  TRACE EVERY BYTE â€” Input â†’ Process â†’ Output
4.  TIMING IS EVERYTHING â€” Parallel = ALWAYS DELTA
5.  CRASH TEST MANDATORY â€” "If kill -9 then what?"
6.  FORMAT MATCH = BYTE-EXACT
7.  CROSS-MODULE > SINGLE MODULE â€” Errors at BOUNDARIES
8.  RESOURCES = SPECIFIC NUMBERS â€” "VRAM enough" = MEANINGLESS
9.  DO NOT TRUST SOURCE DOCS â€” Challenge every assumption
10. RE-AUDIT AFTER FIX â€” Fix done must be verified
```
