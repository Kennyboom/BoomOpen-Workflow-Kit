---
name: drizzle-neon-turso-edge
description: Type-safe serverless database engineering with Drizzle ORM, Neon Serverless Postgres (HTTP + WebSocket Pool), Turso LibSQL edge replicas, and zero-downtime drizzle-kit migrations.
domain: data
---

# Drizzle ORM with Neon Serverless Postgres & Turso LibSQL Edge Engineering

## 1. When to Use This Skill
Use this skill when designing schemas, writing type-safe relational/SQL queries, or managing zero-downtime migrations with **Drizzle ORM (`drizzle-orm`, `drizzle-kit`)** on **Neon Serverless Postgres (`@neondatabase/serverless`)** or **Turso LibSQL (`@libsql/client`)**, including:
- Selecting between **Neon HTTP (`drizzle-orm/neon-http`)** for lowest-latency single queries and **Neon WebSocket Pool (`drizzle-orm/neon-serverless`)** for interactive `db.transaction(...)` workflows.
- Designing multi-tenant schemas with `$inferSelect` / `$inferInsert`, `drizzle-zod`, and composite indexes.
- Running Expand-and-Contract zero-downtime schema migrations (`drizzle-kit generate` + `drizzle-kit migrate`).

---

## 2. Core Architecture Principles
1. **Choose the Right Serverless Driver per Workload**:
   - **Single Stateless Read/Write (`neon-http` + `db.batch([...])`)**: Fastest cold-start on Cloudflare Workers / Vercel Edge because it avoids WebSocket handshake overhead.
   - **Interactive Multi-Step Transactions (`neon-serverless` `Pool`)**: Required when business logic depends on intermediate query results inside `await db.transaction(async (tx) => { ... })`. Always call `ctx.waitUntil(pool.end())` on edge isolates.
2. **Never Run `drizzle-kit push` in Production**:
   - `drizzle-kit push` is strictly for local rapid prototyping. Production pipelines MUST commit SQL files generated via `npx drizzle-kit generate`, review them for table locks, and apply them via `npx drizzle-kit migrate`.
3. **Avoid `SELECT *` via Explicit Column Projection**:
   - Always pass an explicit column map to `db.select({ id: users.id, email: users.email })` or `columns: { passwordHash: false }` in relational queries (`db.query.users.findMany(...)`) to minimize serialization and bandwidth overhead.
4. **Prepared Statements on Hot Paths**:
   - Use `.prepare('statement_name')` with `sql.placeholder('param')` so Drizzle skips SQL AST compilation on repeated invocations.

---

## 3. Schema & Type Inference Pattern (`src/db/schema.ts`)

```typescript
import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const organizations = pgTable(
  'organizations',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    slug: text('slug').notNull(),
    name: text('name').notNull(),
    plan: text('plan', { enum: ['free', 'pro', 'enterprise'] }).notNull().default('free'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex('idx_organizations_slug').on(table.slug)]
);

export const apiKeys = pgTable(
  'api_keys',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    organizationId: uuid('organization_id')
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),
    keyPrefix: text('key_prefix').notNull(),
    keyHash: text('key_hash').notNull(),
    quotaRemaining: integer('quota_remaining').notNull().default(10000),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('idx_api_keys_org_id').on(table.organizationId),
    uniqueIndex('idx_api_keys_hash').on(table.keyHash),
  ]
);

export const organizationsRelations = relations(organizations, ({ many }) => ({
  apiKeys: many(apiKeys),
}));

export const apiKeysRelations = relations(apiKeys, ({ one }) => ({
  organization: one(organizations, {
    fields: [apiKeys.organizationId],
    references: [organizations.id],
  }),
}));

export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;
export type ApiKeyRecord = typeof apiKeys.$inferSelect;
```

---

## 4. Dual-Driver Neon & Turso Query Pattern (`src/db/client.ts`)

```typescript
import { neon, Pool } from '@neondatabase/serverless';
import { drizzle as drizzleNeonHttp } from 'drizzle-orm/neon-http';
import { drizzle as drizzleNeonWs } from 'drizzle-orm/neon-serverless';
import { createClient as createLibSqlClient } from '@libsql/client/web';
import { drizzle as drizzleLibSql } from 'drizzle-orm/libsql';
import { eq, sql } from 'drizzle-orm';
import * as schema from './schema';

// 1. Fast Stateless HTTP Client + Prepared Query
export function createNeonHttpClient(databaseUrl: string) {
  const sqlClient = neon(databaseUrl);
  const db = drizzleNeonHttp(sqlClient, { schema });

  const findKeyByHashPrepared = db.query.apiKeys
    .findFirst({
      where: eq(schema.apiKeys.keyHash, sql.placeholder('keyHash')),
      columns: { id: true, organizationId: true, quotaRemaining: true },
      with: {
        organization: { columns: { id: true, slug: true, plan: true } },
      },
    })
    .prepare('find_key_by_hash');

  return { db, findKeyByHashPrepared };
}

// 2. Interactive Transaction with Neon WebSocket Pool
export async function provisionOrganizationWithInitialKey(
  databaseUrl: string,
  input: { slug: string; name: string; keyPrefix: string; keyHash: string }
) {
  const pool = new Pool({ connectionString: databaseUrl });
  const db = drizzleNeonWs(pool, { schema });

  try {
    return await db.transaction(async (tx) => {
      const [org] = await tx
        .insert(schema.organizations)
        .values({ slug: input.slug, name: input.name, plan: 'pro' })
        .returning();

      const [key] = await tx
        .insert(schema.apiKeys)
        .values({
          organizationId: org.id,
          keyPrefix: input.keyPrefix,
          keyHash: input.keyHash,
        })
        .returning({ id: schema.apiKeys.id, keyPrefix: schema.apiKeys.keyPrefix });

      return { organization: org, apiKey: key };
    });
  } finally {
    await pool.end();
  }
}

// 3. Turso LibSQL Edge Client (HTTP/Web Compatible)
export function createTursoEdgeClient(url: string, authToken: string) {
  const client = createLibSqlClient({ url, authToken });
  return drizzleLibSql(client);
}
```

---

## 5. Zero-Downtime Expand-and-Contract Migration Checklist
1. **Expand**: Add nullable columns or new tables first; create indexes with `CREATE INDEX CONCURRENTLY`.
2. **Backfill**: Dual-write in application code and batch-backfill historical rows.
3. **Contract**: Add `NOT NULL` constraints (`NOT VALID` → `VALIDATE CONSTRAINT`) and drop legacy columns only after all running app instances stop referencing them.

---

## 6. Anti-Patterns to Avoid
- ❌ **Calling `db.transaction()` on `drizzle-orm/neon-http`**: The Neon HTTP driver only supports non-interactive `db.batch([...])`. Use `drizzle-orm/neon-serverless` `Pool` for interactive transactions.
- ❌ **Forgetting `await pool.end()` in Serverless/Edge Functions**: Leaks WebSocket connections across isolate invocations.
- ❌ **Unindexed Foreign Keys**: Postgres does NOT automatically index foreign key columns (`organization_id`). Always declare explicit indexes in the table callback.

---

## 7. Verification Checklist
- [ ] Every foreign key column has an explicit `index(...)` in `pgTable` / `sqliteTable`.
- [ ] Schema exports `$inferSelect` and `$inferInsert` types for every table.
- [ ] Neon WebSocket `Pool` instances are closed in a `finally` block or `ctx.waitUntil(pool.end())`.
- [ ] Migrations are generated via `drizzle-kit generate` and committed to source control.
