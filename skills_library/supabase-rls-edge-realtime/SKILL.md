---
name: supabase-rls-edge-realtime
description: Production Supabase engineering with high-performance Postgres Row-Level Security (RLS), @supabase/ssr cookie authentication, Edge Functions, Realtime Broadcast/Presence, and pgvector hybrid search.
domain: data
---

# Supabase Postgres RLS, `@supabase/ssr`, Realtime & `pgvector` Engineering

## 1. When to Use This Skill
Use this skill when designing, optimizing, or auditing **Supabase / PostgreSQL** backends, including:
- Authoring high-performance **Row-Level Security (RLS)** policies (`(select auth.uid())`, `security definer` helper functions, and composite B-tree indexes).
- Implementing server-side cookie authentication with **`@supabase/ssr`** (using `auth.getUser()` rather than unverified `getSession()`).
- Building **pgvector HNSW + Full-Text Search (RRF)** hybrid retrieval functions and private **Realtime Broadcast / Presence** channels.

---

## 2. Core Architecture Principles
1. **Wrap `auth.uid()` and `auth.jwt()` in Scalar Subqueries `(select ...)`**:
   - In Postgres RLS policies, `auth.uid() = user_id` re-evaluates `auth.uid()` on every scanned row. Wrapping it as **`(select auth.uid()) = user_id`** forces Postgres to evaluate it once as an `initPlan` constant, delivering up to **100x faster** query execution on large tables.
2. **Index Every Column Referenced in RLS Policies**:
   - Every `tenant_id`, `organization_id`, or `user_id` column used inside a `USING` or `WITH CHECK` clause MUST have a dedicated B-tree index (`CREATE INDEX CONCURRENTLY`).
3. **Never Trust `supabase.auth.getSession()` on the Server**:
   - In server actions, middleware, and API routes (`@supabase/ssr`), always call **`await supabase.auth.getUser()`** to cryptographically validate the JWT with Supabase Auth rather than reading an unverified cookie payload.
4. **Always Target Explicit Roles (`TO authenticated`)**:
   - Specify `TO authenticated` on tenant RLS policies so anonymous (`anon`) traffic short-circuits immediately without executing policy subqueries.

---

## 3. High-Performance SQL & RLS Pattern (`migrations/20250301_multi_tenant_rls.sql`)

```sql
-- 1. Enable RLS and pgvector extension
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;

CREATE TABLE public.organization_members (
  organization_id uuid NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
  PRIMARY KEY (organization_id, user_id)
);

CREATE INDEX idx_org_members_user_org ON public.organization_members (user_id, organization_id);
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.knowledge_chunks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  fts tsvector GENERATED ALWAYS AS (to_tsvector('english', title || ' ' || content)) STORED,
  embedding extensions.vector(1536),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Index RLS tenant key + GIN FTS + HNSW vector index
CREATE INDEX idx_knowledge_org_id ON public.knowledge_chunks (organization_id);
CREATE INDEX idx_knowledge_fts ON public.knowledge_chunks USING gin (fts);
CREATE INDEX idx_knowledge_embedding_hnsw ON public.knowledge_chunks
  USING hnsw (embedding extensions.vector_ip_ops) WITH (m = 16, ef_construction = 64);

ALTER TABLE public.knowledge_chunks ENABLE ROW LEVEL SECURITY;

-- 2. SECURITY DEFINER helper with locked search_path to avoid recursive RLS scans
CREATE OR REPLACE FUNCTION private.user_organization_ids()
RETURNS SETOF uuid
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = ''
AS $$
  SELECT organization_id
  FROM public.organization_members
  WHERE user_id = (SELECT auth.uid());
$$;

-- 3. Optimized RLS Policies using (SELECT auth.uid()) initPlan caching
CREATE POLICY "org_members_select_own_orgs"
  ON public.knowledge_chunks
  FOR SELECT
  TO authenticated
  USING (
    organization_id IN (SELECT private.user_organization_ids())
  );

CREATE POLICY "org_members_insert_own_orgs"
  ON public.knowledge_chunks
  FOR INSERT
  TO authenticated
  WITH CHECK (
    organization_id IN (SELECT private.user_organization_ids())
  );
```

---

## 4. Hybrid Search (`pgvector` + Full-Text Reciprocal Rank Fusion)

```sql
CREATE OR REPLACE FUNCTION public.hybrid_search_knowledge(
  p_org_id uuid,
  p_query_text text,
  p_query_embedding extensions.vector(1536),
  p_match_count int DEFAULT 10,
  p_rrf_k int DEFAULT 60
)
RETURNS SETOF public.knowledge_chunks
LANGUAGE sql
STABLE
AS $$
  WITH full_text AS (
    SELECT id, row_number() OVER (ORDER BY ts_rank_cd(fts, websearch_to_tsquery(p_query_text)) DESC) AS rank_ix
    FROM public.knowledge_chunks
    WHERE organization_id = p_org_id AND fts @@ websearch_to_tsquery(p_query_text)
    LIMIT p_match_count * 2
  ),
  semantic AS (
    SELECT id, row_number() OVER (ORDER BY embedding <#> p_query_embedding) AS rank_ix
    FROM public.knowledge_chunks
    WHERE organization_id = p_org_id
    ORDER BY embedding <#> p_query_embedding
    LIMIT p_match_count * 2
  )
  SELECT k.*
  FROM full_text
  FULL OUTER JOIN semantic ON full_text.id = semantic.id
  JOIN public.knowledge_chunks k ON k.id = COALESCE(full_text.id, semantic.id)
  ORDER BY
    COALESCE(1.0 / (p_rrf_k + full_text.rank_ix), 0.0) +
    COALESCE(1.0 / (p_rrf_k + semantic.rank_ix), 0.0) DESC
  LIMIT p_match_count;
$$;
```

---

## 5. TypeScript Server Auth Guard (`@supabase/ssr`)

```typescript
import { createServerClient } from '@supabase/ssr';

export interface CookieStoreAdapter {
  getAll: () => Array<{ name: string; value: string }>;
  setAll: (cookies: Array<{ name: string; value: string; options?: Record<string, unknown> }>) => void;
}

export async function requireAuthenticatedSupabaseUser(
  supabaseUrl: string,
  supabaseAnonKey: string,
  cookieAdapter: CookieStoreAdapter
) {
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: cookieAdapter,
  });
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    throw new Error('UNAUTHENTICATED_SESSION');
  }
  return { supabase, user: data.user };
}
```

---

## 6. Anti-Patterns to Avoid
- ❌ **Bare `auth.uid()` in RLS Policies**: Always write `(SELECT auth.uid())` so Postgres caches the UUID per query instead of invoking the function per row.
- ❌ **Exposing `SUPABASE_SERVICE_ROLE_KEY` to Browser / Client Bundles**: `service_role` bypasses all RLS policies. Restrict it strictly to trusted server/edge environments.
- ❌ **`SECURITY DEFINER` Functions Without `SET search_path = ''`**: Leaves functions vulnerable to schema-shadowing privilege escalation.

---

## 7. Verification Checklist
- [ ] Every table in `public` has `ENABLE ROW LEVEL SECURITY` enabled.
- [ ] All RLS policies wrap `auth.uid()` / `auth.jwt()` in `(SELECT ...)` and specify `TO authenticated`.
- [ ] All `SECURITY DEFINER` functions set `SET search_path = ''` and schema-qualify tables.
- [ ] Server-side auth verification calls `supabase.auth.getUser()`, never `getSession()`.
