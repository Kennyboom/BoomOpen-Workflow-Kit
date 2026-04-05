---
description: >-
  Systematic Problem Investigation Engine v3.
  5 Whys root cause, hypothesis-driven debugging,
  regression prevention, log analysis.
category: debugging
execution-mode: sequential
---

# /debug:hard â€” Systematic Problem Investigation v3.0

$ARGUMENTS

---

## GOLDEN RULES

```
1. REPRODUCE BEFORE FIXING â€” No fix without repro steps
2. HYPOTHESIZE â†’ TEST â†’ ELIMINATE â€” Not random guessing
3. ONE CHANGE AT A TIME â€” Isolate variables
4. ROOT CAUSE, NOT SYMPTOMS â€” 5 Whys until real cause
5. PREVENT RECURRENCE â€” Add test/guard after every fix
```

---

## Phase 1: Information Gathering (MANDATORY)

```
Before ANY investigation:

1. EXACT error message (copy-paste, not paraphrase)
2. WHERE it happens (file, line, component, route)
3. WHEN it started (after which deploy/change/update?)
4. FREQUENCY (always? intermittent? specific conditions?)
5. ENVIRONMENT (dev/staging/prod? OS? Node version?)
6. RECENT CHANGES (git log -5, dependency updates?)

Report:
  "ðŸ” DEBUG SESSION: [Issue Title]
   ðŸ“ Location: [file:line]
   â° Started: [when]
   ðŸ”„ Frequency: [always/intermittent]
   ðŸ“ Error: [exact message]"
```

---

## Phase 2: Reproduce the Issue

```
MANDATORY before fixing:

1. Create MINIMAL reproduction steps:
   Step 1: [action]
   Step 2: [action]
   â†’ Expected: [what should happen]
   â†’ Actual: [what happens instead]

2. Confirm reproduction:
   âœ… Reproduced on attempt 1
   âŒ Cannot reproduce â†’ need more info

IF cannot reproduce â†’ ask user questions, DO NOT guess fix
```

---

## Phase 3: Root Cause Analysis (5 Whys)

```
For EVERY bug, trace to root cause:

WHY 1: Why did [error] happen?
  â†’ Because [direct cause]

WHY 2: Why did [direct cause] happen?
  â†’ Because [deeper cause]

WHY 3: Why did [deeper cause] happen?
  â†’ Because [systemic issue]

WHY 4: Why did [systemic issue] exist?
  â†’ Because [missing guard/test/validation]

WHY 5: Why was [guard] missing?
  â†’ Because [process gap]
  â†’ ROOT CAUSE: [final answer]
```

---

## Phase 4: Hypothesis-Driven Investigation

```
List hypotheses by likelihood:

| # | Hypothesis | Likelihood | Test Method |
|---|-----------|:----------:|------------|
| 1 | [most likely] | HIGH | [how to test] |
| 2 | [second guess] | MEDIUM | [how to test] |
| 3 | [less likely] | LOW | [how to test] |

Test each ONE AT A TIME:

ðŸ§ª Testing H1: [hypothesis]
   Action: [what I checked]
   Result: âœ… CONFIRMED / âŒ ELIMINATED
   Evidence: [proof]

â†’ If CONFIRMED: proceed to Phase 5
â†’ If ELIMINATED: test next hypothesis
â†’ If ALL eliminated: re-gather info (Phase 1)
```

---

## Phase 5: Fix Implementation

```
BEFORE FIXING:
â–¡ Root cause identified (Phase 3/4)
â–¡ Impact scope understood (what else might break?)

FIX RULES:
1. Minimal change â€” fix root cause only
2. No side-effect changes while fixing
3. Preserve existing behavior where correct

FORMAT:
### Root Cause
ðŸŽ¯ [Why it happened â€” from 5 Whys]

### Fix Applied
// Before (broken)
[exact broken code]

// After (fixed)
[exact fixed code]

### Verification
â–¡ Build passes (0 errors)
â–¡ Original bug no longer reproduces
â–¡ Related features still work
```

---

## Phase 6: Regression Prevention (MANDATORY)

```
After EVERY fix, add prevention:

1. ADD TEST for the specific bug:
   test('[Issue]: should not [reproduce bug]', () => {
     // Exact reproduction steps as test
   });

2. ADD GUARD if applicable:
   - Input validation
   - Type narrowing
   - Null check
   - Error boundary

3. DOCUMENT:
   - What caused it
   - How to avoid in future
   - Related areas to watch

4. SAVE to .brain/session.json â†’ errors_encountered:
   { error, root_cause, fix, prevention }
   WHY: Same bug pattern won't be hit again in new session.

Report:
  "ðŸ›¡ï¸ REGRESSION PREVENTION:
   âœ… Test added: [test name]
   âœ… Guard added: [description]
   âœ… Error saved to .brain/
   âœ… Build: clean | Lint: clean"
```

---

## Next Steps

```
After /debug:hard, consider:
  â†’ /test [file] â€” Add regression test for the fix
  â†’ /save â€” Persist debug findings to .brain/
  â†’ /review health â€” Check overall code quality
```

---

## Debug Output Template

```markdown
## ðŸ” Debug: [Issue Title]

### 1. Symptom
[What's happening + exact error]

### 2. Reproduction
Step 1: [action]
Step 2: [action]
â†’ Expected: [X] | Actual: [Y]

### 3. Root Cause (5 Whys)
ðŸŽ¯ [Root cause explanation]

### 4. Hypotheses Tested
| # | Hypothesis | Result |
|---|-----------|--------|
| 1 | [hypothesis] | âœ… CONFIRMED |

### 5. Fix
[Before/After code diff]

### 6. Verification
âœ… Build: clean
âœ… Bug no longer reproduces
âœ… Regression test added

### 7. Prevention
ðŸ›¡ï¸ [What was added to prevent recurrence]
```
