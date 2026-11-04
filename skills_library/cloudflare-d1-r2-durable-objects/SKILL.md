---
name: cloudflare-d1-r2-durable-objects
description: Edge-native backend engineering on Cloudflare Workers with D1 serverless SQLite, R2 object storage, stateful Durable Objects (SQLite storage + WebSockets), and Queues.
domain: cloud
---

# Cloudflare Workers, D1, R2 & Durable Objects Engineering

## 1. When to Use This Skill
Use this skill when architecting or implementing serverless edge applications on **Cloudflare's Developer Platform**, including:
- **Cloudflare D1**: Serverless SQLite queries, prepared statements, batch transactions (`env.DB.batch([...])`), and Wrangler migrations.
- **Cloudflare R2**: Zero-egress S3-compatible object storage, streaming uploads/downloads, custom metadata, and presigned URLs.
- **Durable Objects (DO)**: Strongly-consistent coordination, per-room/per-tenant state, Hibernatable WebSockets, and SQLite-backed DO storage (`ctx.storage.sql`).
- **Cloudflare Queues & Workers AI**: Asynchronous background batching with `ctx.waitUntil()`.

---

## 2. Core Architecture Principles
1. **Never Store Mutable Request State in Global Variables**:
   - Workers isolates are reused across requests and evicted at any time. Pass all bindings via `env: Env` and coordinate stateful workloads in **Durable Objects** or **D1**.
2. **Prepared Statements & `env.DB.batch()` in D1**:
   - Always use `.prepare('SELECT ... WHERE id = ?1').bind(id)` to prevent SQL injection. Group multi-statement writes into `await env.DB.batch([...])` so they execute in a single atomic SQLite transaction with 1 network round-trip.
3. **Hibernatable WebSockets in Durable Objects**:
   - Use `this.ctx.acceptWebSocket(server)` and `webSocketMessage()` / `webSocketClose()` handlers instead of standard `addEventListener('message')` so idle WebSocket connections hibernate at zero compute cost.
4. **Stream R2 Objects Without Buffering in Memory**:
   - Workers have a strict **128 MB memory limit**. Stream `object.body` (`ReadableStream`) directly into `new Response(object.body)` instead of calling `await object.arrayBuffer()` on large files.

---

## 3. TypeScript Pattern (Worker + D1 Batch + R2 Streaming + Durable Object)

```typescript
import { DurableObject } from 'cloudflare:workers';

export interface Env {
  DB: D1Database;
  ASSETS_BUCKET: R2Bucket;
  RATE_LIMITER: DurableObjectNamespace<TenantRateLimiterDO>;
}

const MAX_REQUESTS_PER_MINUTE = 120;
const WINDOW_MS = 60_000;

// 1. SQLite-Backed Durable Object for Strongly-Consistent Per-Tenant Rate Limiting & WebSockets
export class TenantRateLimiterDO extends DurableObject<Env> {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.ctx.blockConcurrencyWhile(async () => {
      this.ctx.storage.sql.exec(`
        CREATE TABLE IF NOT EXISTS counters (
          window_key INTEGER PRIMARY KEY,
          count INTEGER NOT NULL
        );
      `);
    });
  }

  async checkAndIncrement(limit = MAX_REQUESTS_PER_MINUTE): Promise<{ allowed: boolean; remaining: number }> {
    const windowKey = Math.floor(Date.now() / WINDOW_MS);
    this.ctx.storage.sql.exec(
      `INSERT INTO counters (window_key, count) VALUES (?1, 1)
       ON CONFLICT(window_key) DO UPDATE SET count = count + 1`,
      windowKey
    );
    const row = this.ctx.storage.sql
      .exec<{ count: number }>('SELECT count FROM counters WHERE window_key = ?1', windowKey)
      .one();
    const current = row?.count ?? 1;
    return {
      allowed: current <= limit,
      remaining: Math.max(0, limit - current),
    };
  }
}

// 2. Main Cloudflare Worker Fetch Handler (D1 + R2 + DO RPC)
export default {
  async fetch( request: Request, env: Env, ctx: ExecutionContext ): Promise<Response> {
    try {
      const url = new URL(request.url);
      const tenantId = request.headers.get('x-tenant-id') ?? 'anonymous';

      // Coordinate rate limit via Durable Object RPC
      const doId = env.RATE_LIMITER.idFromName(tenantId);
      const stub = env.RATE_LIMITER.get(doId);
      const rate = await stub.checkAndIncrement(MAX_REQUESTS_PER_MINUTE);
      if (!rate.allowed) {
        return Response.json({ error: 'Rate limit exceeded' }, { status: 429 });
      }

      // Route A: Atomic D1 Batch Transaction
      if (request.method === 'POST' && url.pathname === '/api/documents') {
        const body = (await request.json()) as { id: string; title: string; r2Key: string };
        const nowIso = new Date().toISOString();

        await env.DB.batch([
          env.DB.prepare(
            'INSERT INTO documents (id, tenant_id, title, r2_key, created_at) VALUES (?1, ?2, ?3, ?4, ?5)'
          ).bind(body.id, tenantId, body.title, body.r2Key, nowIso),
          env.DB.prepare(
            'INSERT INTO audit_logs (tenant_id, action, target_id, created_at) VALUES (?1, ?2, ?3, ?4)'
          ).bind(tenantId, 'DOCUMENT_CREATED', body.id, nowIso),
        ]);

        return Response.json({ ok: true, id: body.id, remainingQuota: rate.remaining }, { status: 201 });
      }

      // Route B: Zero-Copy R2 Object Streaming with ETag Caching
      if (request.method === 'GET' && url.pathname.startsWith('/files/')) {
        const key = url.pathname.slice('/files/'.length);
        const object = await env.ASSETS_BUCKET.get(key);
        if (!object) {
          return Response.json({ error: 'File not found' }, { status: 404 });
        }
        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);
        headers.set('cache-control', 'public, max-age=3600');
        return new Response(object.body, { headers });
      }

      return Response.json({ error: 'Route not found' }, { status: 404 });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Edge worker error';
      ctx.waitUntil(Promise.resolve()); // Hook async error telemetry here
      return Response.json({ error: message }, { status: 500 });
    }
  },
} satisfies ExportedHandler<Env>;
```

---

## 4. Wrangler Configuration (`wrangler.jsonc`)

```jsonc
{
  "name": "boomopen-edge-api",
  "main": "src/index.ts",
  "compatibility_date": "2025-03-01",
  "compatibility_flags": ["nodejs_compat"],
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "boomopen-prod-db",
      "database_id": "00000000-0000-0000-0000-000000000000"
    }
  ],
  "r2_buckets": [
    { "binding": "ASSETS_BUCKET", "bucket_name": "boomopen-assets" }
  ],
  "durable_objects": {
    "bindings": [
      { "name": "RATE_LIMITER", "class_name": "TenantRateLimiterDO" }
    ]
  },
  "migrations": [
    { "tag": "v1", "new_sqlite_classes": ["TenantRateLimiterDO"] }
  ]
}
```

---

## 5. Anti-Patterns to Avoid
- ❌ **String Interpolation in D1 SQL**: Never write ``env.DB.prepare(`SELECT * FROM users WHERE email = '${email}'`)``. Always use `.bind(...)`.
- ❌ **Single Global Durable Object Singleton**: Routing 100% of global traffic through `idFromName('global')` creates a single-thread bottleneck. Shard by `tenantId`, `roomId`, or `region`.
- ❌ **Buffering Large R2 Files with `.arrayBuffer()`**: Causes Worker OOM crashes (`> 128 MB`). Always stream `object.body`.

---

## 6. Verification Checklist
- [ ] All D1 queries use parameterized `.prepare(...).bind(...)` statements.
- [ ] Multi-statement D1 writes use `env.DB.batch([...])`.
- [ ] Durable Objects use `new_sqlite_classes` in `wrangler.jsonc` migrations and shard IDs per tenant/resource.
- [ ] Background tasks after response return are wrapped in `ctx.waitUntil(...)`.
