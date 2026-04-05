---
description: >-
  Fortress Builder v3 â€” OWASP Top 10 scan, STRIDE Threat Modeling,
  Auth/Authorization audit, Data Protection, API Security,
  Frontend/Infrastructure hardening, Supply Chain, and Zero Trust.
  Creates Security Report with severity scoring.
---

# /security-audit â€” The Fortress Builder v3.0

$ARGUMENTS

---

## GOLDEN RULES

```
1. THINK LIKE A HACKER â€” "If I wanted to hack this, I would..."
2. DEFENSE IN DEPTH â€” Multiple protection layers
3. LEAST PRIVILEGE â€” Grant minimum permissions
4. VALIDATE EVERYTHING â€” Server-side, always
5. ENCRYPT EVERYTHING â€” At rest + in transit
6. LOG EVERYTHING â€” But never log sensitive data
```

---

## Phase 1: Context + Codebase Scanner

### 1.1 Auto-Scope (MANDATORY)

```
1. Read source code â†’ count files, endpoints, routes
2. Read package.json â†’ dependencies
3. Read .env.example â†’ environment variables
4. Read DESIGN.md â†’ architecture

Report:
  "ðŸ” Found:
   [X] API endpoints | [Y] source files
   [Z] dependencies | [W] env variables

   Starting Full Audit."
```

### 1.2 Audit Tracker (MANDATORY)

```markdown
| # | File/Endpoint | Category | Findings | Severity |
|---|--------------|----------|----------|----------|
| 1 | /api/auth | Auth | [finding] | ðŸ”´ |
| 2 | ProfileForm | XSS | None | ðŸŸ¢ |

ðŸ“Š AUDIT: 5/15 files scanned (33%)
```

---

## Phase 2: OWASP Top 10 Scan

> ðŸš¨ MUST `view_file` this reference BEFORE Phase 2:
> `.agent/workflows/references/security/owasp-stride.md`

```
A01: Broken Access Control
  â–¡ IDOR: Change user_id in URL â†’ see other's data?
  â–¡ Horizontal: User A sees User B data?
  â–¡ Vertical: Regular user does Admin actions?

A02: Cryptographic Failures
  â–¡ Passwords: bcrypt/argon2 (NOT MD5/SHA1)?
  â–¡ Data at rest encrypted (AES-256)?
  â–¡ HTTPS everywhere?
  â–¡ Secrets hardcoded in code?

A03: Injection
  â–¡ SQL: Parameterized queries / ORM?
  â–¡ XSS: Output encoding?
  â–¡ OS Command: No user input in shell?

A05: Security Misconfiguration
  â–¡ Default credentials removed?
  â–¡ Debug mode OFF in production?
  â–¡ Error messages don't leak internals?

A06: Vulnerable Components
  â–¡ npm audit â†’ 0 critical, 0 high?

A07: Auth Failures
  â–¡ Brute force protection?
  â–¡ Weak password allowed?

A09: Logging Failures
  â–¡ Failed login logged?
  â–¡ No sensitive data in logs?

A10: SSRF
  â–¡ User-supplied URLs validated?
```

---

## Phase 3: STRIDE Threat Modeling

```markdown
Per component, analyze 6 threats:

| Threat | Description | Example | Mitigation |
|--------|------------|---------|------------|
| Spoofing | Impersonation | Fake login | MFA, JWT |
| Tampering | Data modification | Edit price | Server validation |
| Repudiation | Deny action | "I didn't buy" | Audit logs |
| Info Disclosure | Leak data | Error shows DB | Error filtering |
| DoS | Crash service | 10K req/sec | Rate limiting |
| Escalation | Gain privilege | User â†’ Admin | RBAC strict |
```

---

## Phase 4: Authentication Audit

> ðŸš¨ MUST `view_file` this reference BEFORE Phase 4:
> `.agent/workflows/references/security/auth-data-api.md`

```
â–¡ Password: bcrypt rounds â‰¥ 10 or argon2
â–¡ JWT: httpOnly, secure, sameSite=strict
â–¡ Token expiry: Access 15min + Refresh 7 days
â–¡ Refresh token rotation (single use)
â–¡ Rate limit login: 5 attempts â†’ lockout 15min
â–¡ Password requirements: â‰¥ 8 chars, mixed case + number
â–¡ Session invalidation on password change
```

---

## Phase 5: Authorization Audit

```
â–¡ RBAC: Admin > Manager > User roles defined
â–¡ EVERY API checks permissions (middleware)
â–¡ No object-level access bypass (IDOR protection)
â–¡ Admin routes separated + double-checked
â–¡ Cannot escalate own role
â–¡ API keys scoped with minimal permissions
```

---

## Phase 6: Data Protection

```
â–¡ HTTPS everywhere (no mixed content)
â–¡ No secrets in code/git (truffleHog/gitleaks)
â–¡ Input validation on SERVER (never trust client)
â–¡ Output encoding (XSS prevention)
â–¡ File upload: type + size check + no execution
â–¡ Database: parameterized queries ONLY
â–¡ Sensitive data: encrypt at rest (AES-256)
â–¡ .env.example without real values committed
```

---

## Phase 7: API Security

```
â–¡ Auth on every non-public endpoint
â–¡ Rate limiting: per endpoint + per user + per IP
â–¡ Input validation: zod/joi schema
â–¡ Output filtering: no internal data leaking
â–¡ CORS: explicit origin whitelist (no wildcard *)
â–¡ No verbose errors in production
â–¡ Request size limit (body + file upload)
â–¡ Pagination enforced (no unbounded queries)
â–¡ HTTPS only (redirect HTTP â†’ HTTPS)
```

---

## Phase 8: Frontend + Infrastructure

```
FRONTEND:
â–¡ XSS: No dangerouslySetInnerHTML
â–¡ CSP headers configured
â–¡ No secrets in client-side code
â–¡ Secure cookie flags (httpOnly, secure, sameSite)

INFRASTRUCTURE:
â–¡ Security headers: HSTS, X-Frame-Options
â–¡ Database not publicly accessible
â–¡ Firewall: only needed ports open
â–¡ Logging: no sensitive data in logs
```

---

## Phase 9: Supply Chain + Zero Trust

```
DEPENDENCIES:
â–¡ npm audit â†’ 0 critical, 0 high
â–¡ Lock file committed (package-lock.json)
â–¡ No wildcard versions
â–¡ Automated: Dependabot/Renovate

ZERO TRUST:
â–¡ Verify explicitly: every request authenticated
â–¡ Least privilege: minimal permissions
â–¡ Assume breach: defense in depth
```

---

## Phase 10: Security Coverage Audit (MANDATORY)

> â›” NO report if audit FAILS.

```markdown
| Check | Requirement | Status |
|-------|-------------|--------|
| OWASP Coverage | 10/10 categories checked | â˜ |
| STRIDE Coverage | All components modeled | â˜ |
| File Coverage | 100% files audited | â˜ |
| Dependencies | npm audit 0 critical | â˜ |
| Secrets | No hardcoded secrets | â˜ |

IF any FAIL â†’ fix before writing report.
```

---

## Phase 11: Security Report + Handover

```
ðŸ” SECURITY REPORT
ðŸ”´ Critical: [X] | ðŸŸ¡ High: [Y] | ðŸŸ  Medium: [Z]
ðŸ“Š Security Score: [N]/100

OWASP: 10/10 | STRIDE: [Y] components
File Coverage: 100% | Audit: ALL PASS

TOP ISSUES:
1. [Issue] â€” CRITICAL â€” Fix: [solution]
2. [Issue] â€” HIGH â€” Fix: [solution]

Next:
1. Fix security issues? /create
2. Performance? /performance
3. Deploy? /deploy
```
