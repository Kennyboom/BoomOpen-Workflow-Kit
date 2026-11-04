---
name: better-auth-typescript
description: Production authentication and authorization in TypeScript with Better-Auth (OAuth, Passkeys/WebAuthn, 2FA/TOTP, Multi-Tenant Organizations & RBAC, session hardening, and Drizzle/Prisma adapters).
domain: security
---

# Better-Auth TypeScript Authentication, Passkeys & Multi-Tenant RBAC

## 1. When to Use This Skill
Use this skill when implementing, migrating, or auditing authentication and multi-tenant authorization in TypeScript applications (Next.js App Router, Hono, Astro, Remix, Express) using **Better-Auth (`better-auth`)**, including:
- Configuring database adapters (`drizzleAdapter`, `prismaAdapter`) and stateless encrypted cookie caching (`cookieCache`).
- Enabling **Passkeys (`@better-auth/passkey`)**, **Two-Factor Authentication (`twoFactor` TOTP + backup codes)**, and OAuth social providers.
- Enforcing **Multi-Tenant Organizations & Custom RBAC (`organization` + `createAccessControl`)**.

---

## 2. Core Architecture Principles
1. **Verify Sessions in the Data Access Layer (Never Rely on Middleware Cookie Checks Alone)**:
   - Edge/Next.js middleware cookie existence checks (`getSessionCookie`) are strictly for optimistic UI redirects. Every mutating server action, RPC procedure, or API route MUST call **`await auth.api.getSession({ headers })`** to verify session validity and revocation state.
2. **Short-Lived Signed `cookieCache` (`maxAge: 300`)**:
   - Enable `session.cookieCache` with a 5-minute TTL (`maxAge: 5 * 60`) and `strategy: 'jwe'` or `'compact'` to eliminate redundant database reads on every page navigation while bounding revocation latency.
3. **Explicit `trustedOrigins` & Secret Entropy**:
   - Always configure `BETTER_AUTH_SECRET` (`>= 32 bytes` high-entropy random secret) and an explicit `trustedOrigins` allowlist so CSRF and origin-reflection checks remain airtight.
4. **Least-Privilege Multi-Tenant RBAC (`createAccessControl`)**:
   - Scope every resource mutation to `session.session.activeOrganizationId` and verify fine-grained permissions via `auth.api.hasPermission(...)`.

---

## 3. Server Configuration (`src/lib/auth-permissions.ts` & `src/lib/auth.ts`)

```typescript
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { twoFactor, organization } from 'better-auth/plugins';
import { passkey } from '@better-auth/passkey';
import { createAccessControl } from 'better-auth/plugins/access';
import { defaultStatements, adminAc, ownerAc, memberAc } from 'better-auth/plugins/organization/access';

const SESSION_EXPIRES_SECONDS = 60 * 60 * 24 * 7; // 7 days
const SESSION_UPDATE_AGE_SECONDS = 60 * 60 * 24;  // Rotate every 24h
const COOKIE_CACHE_MAX_AGE_SECONDS = 60 * 5;      // 5 minutes

// 1. Fine-Grained Multi-Tenant RBAC Statements
export const permissionStatements = {
  ...defaultStatements,
  deployment: ['create', 'promote', 'rollback'],
  auditLog: ['read', 'export'],
} as const;

export const ac = createAccessControl(permissionStatements);

export const roles = {
  owner: ac.newRole({
    ...ownerAc.statements,
    deployment: ['create', 'promote', 'rollback'],
    auditLog: ['read', 'export'],
  }),
  admin: ac.newRole({
    ...adminAc.statements,
    deployment: ['create', 'promote'],
    auditLog: ['read'],
  }),
  member: ac.newRole({
    ...memberAc.statements,
    deployment: ['create'],
  }),
};

// 2. Production Better-Auth Factory
export function createProductionAuth(db: unknown, env: {
  BETTER_AUTH_URL: string;
  BETTER_AUTH_SECRET: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
}) {
  return betterAuth({
    appName: 'BoomOpen Control Plane',
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    trustedOrigins: [env.BETTER_AUTH_URL],
    database: drizzleAdapter(db as Record<string, unknown>, {
      provider: 'pg',
    }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      minPasswordLength: 12,
    },
    socialProviders: {
      github: {
        clientId: env.GITHUB_CLIENT_ID,
        clientSecret: env.GITHUB_CLIENT_SECRET,
      },
    },
    session: {
      expiresIn: SESSION_EXPIRES_SECONDS,
      updateAge: SESSION_UPDATE_AGE_SECONDS,
      cookieCache: {
        enabled: true,
        maxAge: COOKIE_CACHE_MAX_AGE_SECONDS,
      },
    },
    advanced: {
      useSecureCookies: true,
    },
    plugins: [
      passkey({
        rpID: new URL(env.BETTER_AUTH_URL).hostname,
        rpName: 'BoomOpen Control Plane',
      }),
      twoFactor({
        issuer: 'BoomOpen',
      }),
      organization({
        ac,
        roles,
        allowUserToCreateOrganization: true,
      }),
    ],
  });
}
```

---

## 4. Server-Side Session & Tenant Permission Guard

```typescript
export interface AuthSessionGuardResult {
  userId: string;
  organizationId: string;
}

export async function requireOrgPermission(
  auth: ReturnType<typeof createProductionAuth>,
  requestHeaders: Headers,
  permission: { deployment?: Array<'create' | 'promote' | 'rollback'>; auditLog?: Array<'read' | 'export'> }
): Promise<AuthSessionGuardResult> {
  const sessionData = await auth.api.getSession({ headers: requestHeaders });
  if (!sessionData?.user || !sessionData.session) {
    throw new Error('UNAUTHENTICATED: Valid session required');
  }

  const activeOrgId = (sessionData.session as { activeOrganizationId?: string | null }).activeOrganizationId;
  if (!activeOrgId) {
    throw new Error('FORBIDDEN: No active organization selected in session');
  }

  const permCheck = await auth.api.hasPermission({
    headers: requestHeaders,
    body: { permissions: permission },
  });

  if (!permCheck?.success) {
    throw new Error('FORBIDDEN: Insufficient organization role permissions');
  }

  return {
    userId: sessionData.user.id,
    organizationId: activeOrgId,
  };
}
```

---

## 5. Anti-Patterns to Avoid
- ❌ **Using `getCookieCache` or `getSessionCookie` to Authorize Mutations**: Cookie presence checks do not verify database revocation or organization RBAC. Always call `auth.api.getSession({ headers })` + `auth.api.hasPermission(...)` before writes.
- ❌ **Accepting `organizationId` from Untrusted Request Body Without Membership Check**: Always derive the tenant scope from `session.activeOrganizationId` or verify membership against the authenticated `userId`.
- ❌ **Disabling `requireEmailVerification` When `organization` Auto-Join by Domain Is Enabled**: Allows account pre-hijacking and unauthorized tenant entry.

---

## 6. Verification Checklist
- [ ] `BETTER_AUTH_SECRET` is `>= 32` characters and `trustedOrigins` is explicitly configured.
- [ ] `requireEmailVerification: true` is enabled on `emailAndPassword`.
- [ ] Every mutating endpoint verifies both `auth.api.getSession` and `auth.api.hasPermission`.
- [ ] Database schema migrations are synced via `npx @better-auth/cli generate`.
