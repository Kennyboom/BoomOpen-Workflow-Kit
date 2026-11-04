---
name: hono-rpc-zod-openapi
description: Ultra-fast edge and Node.js API engineering with Hono, @hono/zod-openapi contract-first routing, end-to-end type-safe RPC (hc<AppType>), and typed middleware chains.
domain: backend
---

# Hono, `@hono/zod-openapi` & End-to-End Type-Safe RPC Engineering

## 1. When to Use This Skill
Use this skill when building high-performance REST/RPC APIs running on Cloudflare Workers, Bun, Deno, AWS Lambda, or Node.js using **Hono (`hono`)** and **`@hono/zod-openapi`**, including:
- Authoring **contract-first OpenAPI 3.1 specifications** directly from Zod request/response schemas (`createRoute` + `OpenAPIHono`).
- Exporting **`AppType`** for zero-codegen, end-to-end type-safe client consumption via `hc<AppType>()`.
- Building strongly-typed middleware chains (`createMiddleware<{ Bindings; Variables }>()`) with centralized error handling (`app.onError`).

---

## 2. Core Architecture Principles
1. **Chain Routes onto a Single Expression for RPC Type Inference**:
   - TypeScript's type inference for `hc<AppType>` requires chaining `.openapi(...)` or `.get(...)` / `.post(...)` calls (`const routes = app.openapi(routeA, handlerA).openapi(routeB, handlerB)`). Registering routes as disconnected statements loses route types in `typeof app`.
2. **Explicit Status Codes in `c.json(payload, status)`**:
   - Always pass the exact literal HTTP status code (`200`, `201`, `400`, `401`, `404`) as the second argument to `c.json(...)` so `@hono/zod-openapi` verifies that every return branch matches the declared OpenAPI response contract at compile time.
3. **Typed Context Variables (`Variables` & `Bindings`)**:
   - Define an explicit `AppEnv = { Bindings: Env; Variables: { userId: string; requestId: string } }` interface and pass it to `new OpenAPIHono<AppEnv>()` — never attach untyped fields to `c`.
4. **Centralized Validation Hook (`defaultHook`)**:
   - Configure a unified `defaultHook` in `new OpenAPIHono({ defaultHook })` so Zod validation failures across `param`, `query`, `header`, and `json` return a consistent RFC 7807 / structured error envelope.

---

## 3. Server Pattern (`OpenAPIHono` + Typed Middleware + Chained Routes)

```typescript
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { createMiddleware } from 'hono/factory';
import { hc, InferResponseType } from 'hono/client';

export interface AppEnv {
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    tenantId: string;
    actorId: string;
  };
}

// 1. Shared Zod DTO Schemas with OpenAPI Metadata
export const ErrorResponseSchema = z
  .object({
    code: z.string().openapi({ example: 'VALIDATION_ERROR' }),
    message: z.string().openapi({ example: 'Invalid request payload' }),
  })
  .openapi('ErrorResponse');

export const CreateProjectInputSchema = z
  .object({
    name: z.string().min(3).max(80).openapi({ example: 'BoomOpen Edge Gateway' }),
    tier: z.enum(['free', 'pro', 'enterprise']).default('pro'),
  })
  .openapi('CreateProjectInput');

export const ProjectDtoSchema = z
  .object({
    id: z.string().uuid().openapi({ example: 'b3b8c7d2-8a4a-4e29-901a-123456789abc' }),
    tenantId: z.string(),
    name: z.string(),
    tier: z.enum(['free', 'pro', 'enterprise']),
    createdAt: z.string().datetime(),
  })
  .openapi('ProjectDto');

// 2. Strongly-Typed Auth Middleware
export const tenantAuthMiddleware = createMiddleware<AppEnv>(async (c, next) => {
  const tenantHeader = c.req.header('x-tenant-id');
  if (!tenantHeader) {
    return c.json({ code: 'UNAUTHORIZED', message: 'Missing x-tenant-id header' }, 401);
  }
  c.set('tenantId', tenantHeader);
  c.set('actorId', c.req.header('x-actor-id') ?? 'system');
  await next();
});

// 3. Declarative OpenAPI Route Contract
const createProjectRoute = createRoute({
  method: 'post',
  path: '/v1/projects',
  tags: ['Projects'],
  middleware: [tenantAuthMiddleware] as const,
  request: {
    body: {
      required: true,
      content: { 'application/json': { schema: CreateProjectInputSchema } },
    },
  },
  responses: {
    201: {
      description: 'Project created',
      content: { 'application/json': { schema: ProjectDtoSchema } },
    },
    400: {
      description: 'Validation error',
      content: { 'application/json': { schema: ErrorResponseSchema } },
    },
    401: {
      description: 'Unauthorized',
      content: { 'application/json': { schema: ErrorResponseSchema } },
    },
  },
});

const getProjectRoute = createRoute({
  method: 'get',
  path: '/v1/projects/{id}',
  tags: ['Projects'],
  middleware: [tenantAuthMiddleware] as const,
  request: {
    params: z.object({
      id: z.string().uuid().openapi({ param: { name: 'id', in: 'path' } }),
    }),
  },
  responses: {
    200: {
      description: 'Project details',
      content: { 'application/json': { schema: ProjectDtoSchema } },
    },
    404: {
      description: 'Project not found',
      content: { 'application/json': { schema: ErrorResponseSchema } },
    },
  },
});

// 4. Create App with Unified Validation Hook & Chained Route Registration
export const app = new OpenAPIHono<AppEnv>({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json(
        { code: 'VALIDATION_ERROR', message: result.error.issues.map((i) => i.message).join('; ') },
        400
      );
    }
  },
});

export const apiRoutes = app
  .openapi(createProjectRoute, async (c) => {
    const body = c.req.valid('json');
    const tenantId = c.get('tenantId');
    return c.json(
      {
        id: crypto.randomUUID(),
        tenantId,
        name: body.name,
        tier: body.tier,
        createdAt: new Date().toISOString(),
      },
      201
    );
  })
  .openapi(getProjectRoute, async (c) => {
    const { id } = c.req.valid('param');
    const tenantId = c.get('tenantId');
    return c.json(
      {
        id,
        tenantId,
        name: 'BoomOpen Edge Gateway',
        tier: 'pro',
        createdAt: new Date().toISOString(),
      },
      200
    );
  });

app.doc('/openapi.json', {
  openapi: '3.1.0',
  info: { title: 'BoomOpen Edge API', version: '1.0.0' },
});

export type AppType = typeof apiRoutes;
```

---

## 4. End-to-End Type-Safe RPC Client (`hc<AppType>`)

```typescript
export function createProjectsRpcClient(baseUrl: string, tenantId: string) {
  return hc<AppType>(baseUrl, {
    headers: { 'x-tenant-id': tenantId },
  });
}

export type CreatedProjectResponse = InferResponseType<
  ReturnType<typeof createProjectsRpcClient>['v1']['projects']['$post'],
  201
>;
```

---

## 5. Anti-Patterns to Avoid
- ❌ **Mutating `app` Without Assignment Chaining**: Writing `app.openapi(r1, h1); app.openapi(r2, h2);` causes `typeof app` to have an empty route map `{}` in `hc<AppType>`.
- ❌ **Using `await c.req.json()` Directly**: Bypasses Zod schema validation. Always read `c.req.valid('json')`, `c.req.valid('query')`, and `c.req.valid('param')`.
- ❌ **Omitting Explicit Status Codes in `c.json(data, 201)`**: Breaks compile-time response union checking in `@hono/zod-openapi`.

---

## 6. Verification Checklist
- [ ] All routes are chained into an exported `apiRoutes` value and `export type AppType = typeof apiRoutes`.
- [ ] Every handler reads validated inputs via `c.req.valid(...)` and returns explicit status literals in `c.json(payload, status)`.
- [ ] `OpenAPIHono` defines a `defaultHook` for deterministic 400 validation errors.
- [ ] `/openapi.json` spec endpoint is registered via `app.doc(...)`.
