---
description: Emergency recovery when things break. Rollback code, deployments, or database changes with severity-based protocols.
---

# /rollback â€” Emergency Recovery Commander v1.0

$ARGUMENTS

---

## GOLDEN RULES

```
1. STAY CALM â€” Panic causes mistakes
2. ASSESS BEFORE ACT â€” Severity first, action second
3. BACKUP BEFORE ROLLBACK â€” Always
4. ROLLBACK BEFORE DEBUG (P0/P1) â€” Uptime first
5. NOTIFY TEAM â€” Transparency is key
6. POST-MORTEM â€” Every P0/P1 must have lessons learned
```

---

## Phase 1: Incident Assessment

```
"âª EMERGENCY RECOVERY â€” Assessing situation now.

1ï¸âƒ£ WHAT BROKE?
   A) App won't load (blank page / 500 error)
   B) Recent deploy broke something
   C) Database issue (data loss / query errors)
   D) Code changes broke local development
   E) Other â€” describe the issue

2ï¸âƒ£ WHO IS AFFECTED?
   A) Just me (development)
   B) Team (staging)
   C) Customers (production) â† HIGHEST PRIORITY"
```

### Severity Classification

| Level | Name | Target | Action |
|:-----:|------|--------|--------|
| ðŸ”´ P0 | CRITICAL | < 15 min | Rollback NOW, investigate LATER |
| ðŸŸ  P1 | HIGH | < 30 min | Quick assess, rollback if needed |
| ðŸŸ¡ P2 | MEDIUM | < 1 hour | Debug first, rollback if stuck |
| ðŸŸ¢ P3 | LOW | When free | Use /debug instead |

---

## Phase 2: Recovery Options

### 2.1 Local Development Rollback

```
A) Rollback SPECIFIC FILE
   â†’ git checkout -- [file]

B) Rollback ALL uncommitted changes
   â†’ git stash (keeps changes for later)

C) Rollback to SPECIFIC COMMIT
   â†’ git log --oneline -10
   â†’ git revert [commit-hash]

D) Don't rollback â€” fix instead
   â†’ Switch to /debug
```

### 2.2 Production Rollback

```
VERCEL:
  â–¡ vercel rollback [deployment-url]
  â–¡ Or: Dashboard â†’ Deployments â†’ Promote previous
  â–¡ Instant rollback (< 5 seconds)

RAILWAY:
  â–¡ railway environment rollback
  â–¡ Or: Dashboard â†’ Deployments â†’ Redeploy previous

DOCKER:
  â–¡ docker compose down
  â–¡ docker compose -f docker-compose.previous.yml up -d
  â–¡ Or: docker tag app:previous app:latest && docker compose up -d

KUBERNETES:
  â–¡ kubectl rollout undo deployment/[app-name]
  â–¡ kubectl rollout status deployment/[app-name]
  â–¡ Verify: kubectl get pods (all Running?)

PM2 (Node.js):
  â–¡ pm2 deploy production revert 1

GIT-BASED CI/CD:
  â–¡ git revert HEAD
  â–¡ git push (triggers new deploy with old code)
```

### 2.3 Database Rollback

```
âš ï¸ DANGEROUS â€” Backup current state FIRST!

A) Revert latest migration
   â†’ prisma migrate reset (careful!)
   â†’ npm run migrate:rollback
   â†’ Reverts ONLY the most recent migration

B) Restore from backup
   â†’ pg_restore -d [db_name] [backup_file]
   â†’ âš ï¸ Data since backup will be LOST

C) Point-in-time recovery (managed DBs)
   â†’ AWS RDS / Supabase / PlanetScale support this
   â†’ Restore to exact timestamp

âš ï¸ ALWAYS:
  â–¡ Backup before restore
  â–¡ Test on staging first
  â–¡ Notify team before touching production DB
```

---

## Phase 3: Execution Protocol

```
ROLLBACK STEPS (in order):
1. âœ… BACKUP current state (git stash / db dump)
2. âœ… Notify team (if production)
3. âœ… Execute rollback command
4. âœ… Verify: App loads?
5. âœ… Verify: Data integrity OK?
6. âœ… Verify: Core functions work?
7. âœ… Notify: "System restored"
```

---

## Phase 4: Post-Rollback Verification

```
HEALTH CHECK:
â–¡ App loads? (homepage, login page)
â–¡ Core actions work? (CRUD operations)
â–¡ API health: GET /api/health â†’ 200?
â–¡ Database queries executing?
â–¡ No data loss? (check row counts)
â–¡ Error monitoring: back to normal?
```

---

## Phase 5: Post-Mortem (MANDATORY for P0/P1)

```markdown
## Incident Report
Date: [date] | Severity: [P0/P1/P2]
Duration: [X] minutes downtime
Affected: [N] users

## Timeline
[HH:MM] Issue detected
[HH:MM] Investigation started
[HH:MM] Root cause identified
[HH:MM] Rollback executed
[HH:MM] System restored

## Root Cause
[What actually went wrong]

## What Went Well
- [Positive 1]

## What Went Wrong
- [Improvement 1]

## Action Items (prevent recurrence)
â–¡ [Prevention action 1]
â–¡ [Prevention action 2]
```

---

## Phase 6: Handover

```
âª RECOVERY COMPLETE!

ðŸ“Š Results:
  âœ… System: Online
  âœ… Severity: [P0-P3]
  âœ… Downtime: [X] minutes
  âœ… Data integrity: OK
  âœ… Post-mortem: [Done/Needed]

Next steps:
  1. /debug â€” Find root cause
  2. /test â€” Verify everything works
  3. /deploy â€” Redeploy (after fix)
  4. /save â€” Persist context
```
