---
description: "⚡ Quick code review enforcing Pragmatic 2-Tier Coding Standards and security checks"
version: "5.5"
---

# /review:fast — Quick Code Review

> **Mode Gate**:
> - **Mode A (Direct Execution)**: For small diffs (`≤ 2 files`), review directly against the Pragmatic 2-Tier Coding Standards.
> - **Mode B (Tier 1 Delegation)**: For larger diffs (`> 2 files`), delegate to `reviewer` (`EnableWriteTools: false`, `Model: "inherit"`) or reuse the warm `reviewer` session via `send_message`.

---

## Review Checklist

1. **Tier 1 Strict Quality & Safety (Zero Tolerance)**:
   - No explicit `any` types (`TypeScript`)
   - No magic numbers or hardcoded secrets
   - No leftover debug `console.log` in production code
   - Proper `try/catch` and typed error handling on all async/API calls
   - Security: Input validation at boundaries, parameterized queries, authz checks
2. **Tier 2 Cohesive Structure (Pragmatic Judgment)**:
   - File cohesion (`~200–350` lines target, `≤ 400–450` cohesive soft ceiling, `>500` lines split)
   - Function clarity (`~25–40` lines target, guard clauses, `≤ 3` nesting depth, `≤ 4` params)
   - Zero anti-fragmentation (no artificial splitting of cohesive state machines or UI components)
3. **Deliverable**:
   - Write findings to `<appDataDir>\brain\<conversation-id>\REVIEW-{topic}.md` (or inline for small Mode A reviews) with severity (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`) and clickable `[file:line]` links.
