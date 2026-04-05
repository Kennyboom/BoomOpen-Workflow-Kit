---
description: >-
  Speed Alchemist v3 â€” Performance budgets, frontend/backend
  profiling, 6-layer caching, bundle optimization, database
  tuning, Core Web Vitals, and CI/CD performance gates.
---

# /performance â€” The Speed Alchemist v3.0

$ARGUMENTS

---

## GOLDEN RULES

```
1. MEASURE FIRST, OPTIMIZE SECOND â€” No blind optimization
2. BUDGET IS LAW â€” Exceeding budget = no deploy
3. REAL DATA > LAB DATA â€” RUM over Lighthouse
4. OPTIMIZE BOTTLENECK â€” Slowest part, not easiest
5. CACHE SMART â€” Right data, right TTL, right invalidation
```

---

## Phase 1: Performance Audit + Baseline

```
MANDATORY â€” scan and measure BEFORE optimizing:

1. Bundle size (JS + CSS)
2. Image count + total size
3. API endpoint count
4. Dependencies count

Baseline Report:
  "âš¡ BASELINE:
   ðŸ“¦ Bundle: [X]KB | Images: [Y]KB | Fonts: [Z]KB
   ðŸ”Œ API endpoints: [N] | Dependencies: [M]"
```

### Optimization Tracker (MANDATORY)

```markdown
| # | Optimization | Before | After | Savings | Status |
|---|-------------|:------:|:-----:|:-------:|:------:|
| 1 | [fix] | [X]KB | [Y]KB | [Z]% | â˜ |

ðŸ“Š TOTAL SAVINGS: [X]KB / [Y]ms
```

---

## Phase 2: Performance Budget

```
FRONTEND:
| Metric | Budget | Tool |
|--------|:------:|------|
| LCP | < 2.5s | Lighthouse |
| INP | < 200ms | Web Vitals |
| CLS | < 0.1 | Lighthouse |
| Bundle (JS) | < 300KB gz | Analyzer |
| Bundle (CSS) | < 50KB gz | Analyzer |
| Images | < 200KB/img | ImageOptim |

BACKEND:
| API (p95) | < 500ms | Custom |
| DB query | < 100ms | EXPLAIN |
| Auth | < 200ms | Custom |

NETWORK:
| TTFB | < 600ms | DevTools |
| Total size | < 1MB | Network |
| Requests | < 30 | Network |
```

---

## Phase 3: Frontend Optimization

### Rendering
```
â–¡ Lazy load images (loading="lazy")
â–¡ Lazy load components (React.lazy + Suspense)
â–¡ Virtualize long lists (react-window)
â–¡ Skeleton loading instead of spinners
â–¡ CSS containment where appropriate
```

### Bundle
```
â–¡ Tree shaking enabled (ESM imports)
â–¡ Code splitting per route
â–¡ Dynamic imports for heavy libs
â–¡ Analyze: npx webpack-bundle-analyzer
â–¡ Target: < 300KB gzipped total JS
```

### Images + Media
```
â–¡ WebP/AVIF format (80%+ savings)
â–¡ Responsive srcset + sizes
â–¡ Blur placeholder while loading
â–¡ CDN for static assets
â–¡ Font subsetting: only used characters
â–¡ Font display: swap
```

### CSS + Animations
```
â–¡ Critical CSS inline in <head>
â–¡ No unused CSS (PurgeCSS)
â–¡ GPU-accelerated animations (transform/opacity)
â–¡ prefers-reduced-motion respect
```

### React Specific
```
â–¡ React.memo for expensive components
â–¡ useMemo/useCallback where MEASURED beneficial
â–¡ Stable key props (NEVER array index)
â–¡ No inline object/function props
```

---

## Phase 4: Backend + Database

### Database
```
â–¡ Index ALL columns in WHERE/ORDER BY/JOIN
â–¡ EXPLAIN ANALYZE on every query > 50ms
â–¡ N+1 detection: log query count per request
â–¡ Connection pooling
â–¡ Pagination ALWAYS (no unbounded queries)
â–¡ Avoid SELECT * â€” only needed columns
â–¡ Batch operations for bulk writes
```

### API
```
â–¡ Response compression (gzip/brotli)
â–¡ Async for heavy tasks (queue)
â–¡ Streaming for large responses
â–¡ ETag/If-None-Match for conditional requests
â–¡ Pagination + filtering + sorting
```

---

## Phase 5: 6-Layer Caching Strategy

```
| Layer | Tool | TTL | Hit Target |
|-------|------|:---:|:----------:|
| Browser | Service Worker | Variable | 80%+ |
| CDN | CloudFlare | 1 hour | 90%+ |
| API Response | TanStack Query | 5 min | 70%+ |
| Server | Redis/Memcache | 15 min | 85%+ |
| DB Query | Query cache | Auto | 60%+ |
| Computed | Memoization | Per-request | 95%+ |

Cache Headers:
  Static: max-age=31536000, immutable
  HTML: no-cache (always revalidate)
  API: max-age=0, stale-while-revalidate=60

ðŸš« NEVER CACHE: Auth tokens, user-specific, real-time
```

---

## Phase 6: Network Optimization

```
â–¡ HTTP/2 or HTTP/3 enabled
â–¡ Gzip/Brotli compression
â–¡ DNS prefetch for external domains
â–¡ Preconnect to critical origins
â–¡ Preload critical assets
â–¡ CDN for all static assets
```

---

## Phase 7: Performance Coverage Audit

> â›” NO report if audit FAILS.

```markdown
| Check | Requirement | Status |
|-------|-------------|:------:|
| Budget Met | All metrics within budget | â˜ |
| Frontend | Render+Bundle+Images done | â˜ |
| Backend | DB+API optimized | â˜ |
| Caching | 6 layers configured | â˜ |
```

---

## Phase 8: Performance Report

```
"âš¡ PERFORMANCE REPORT
ðŸ“Š Lighthouse: [N]/100
ðŸ–¥ï¸ LCP: [X]s | INP: [Y]ms | CLS: [Z]
ðŸ“¦ Bundle: [A]KB | Images: [B]KB
ðŸ’¾ API p95: [D]ms | DB avg: [E]ms
âœ… Coverage Audit: ALL PASS

ðŸ† VERDICT: [FAST / OK / NEEDS WORK / CRITICAL]

TOP OPTIMIZATIONS:
1. [Fix] â€” Impact: HIGH â€” Savings: [X]ms
2. [Fix] â€” Impact: MED â€” Savings: [Y]KB

Next:
1. Fix issues? /create
2. Security? /security-audit
3. Deploy? /deploy"
```
