---
name: api-patterns
description: API design principles and decision-making for 2026. REST vs GraphQL vs tRPC/Hono RPC selection, OpenAPI 3.1 contract-first design, response formats, versioning, pagination, and auth.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# API Patterns (2026 Edition)

> API design principles and decision-making for 2026.
> **Learn to THINK, not copy fixed patterns.**

## 🎯 Selective Reading Rule

**Read ONLY files relevant to the request!** Check the content map, find what you need.

---

## 📑 Content Map

| File | Description | When to Read |
|------|-------------|--------------|
| `api-style.md` | REST vs GraphQL vs tRPC / Hono RPC decision tree | Choosing API type |
| `rest.md` | Resource naming, HTTP methods, status codes | Designing REST API |
| `response.md` | Envelope pattern, RFC 9457 Problem Details, pagination | Response structure |
| `graphql.md` | Schema design, DataLoader N+1 prevention, security | Considering GraphQL |
| `trpc.md` | TypeScript monorepo, end-to-end type safety | TS fullstack projects |
| `versioning.md` | URI/Header/Query versioning | API evolution planning |
| `auth.md` | Better Auth, OAuth 2.1, Passkeys/WebAuthn, JWT, API Keys | Auth pattern selection |
| `rate-limiting.md` | Token bucket, sliding window | API protection |
| `documentation.md` | OpenAPI 3.1 / Zod-OpenAPI best practices | Documentation |
| `security-testing.md` | OWASP API Top 10, BOLA/BFLA authz testing | Security audits |

---

## 🔗 Related Skills (2026 Stack)

| Need | Skill Path |
|------|------------|
| Edge/Node RPC & OpenAPI 3.1 (`Hono` + `@hono/zod-openapi`) | `../../skills_library/hono-rpc-zod-openapi/SKILL.md` (`skills_library/hono-rpc-zod-openapi/SKILL.md`) |
| Model Context Protocol (`MCP` / `FastMCP` Servers) | `../../skills_library/mcp-server-fastmcp-2025/SKILL.md` (`skills_library/mcp-server-fastmcp-2025/SKILL.md`) |
| TypeScript Auth, Passkeys, OAuth 2.1 & 2FA (`Better Auth`) | `../../skills_library/better-auth-typescript/SKILL.md` (`skills_library/better-auth-typescript/SKILL.md`) |
| Database Schema & Indexing | `../database-design/SKILL.md` (`skills/database-design/SKILL.md`) |
| Security Auditing & OWASP Top 10 | `../security-auditor/SKILL.md` (`skills/security-auditor/SKILL.md`) |

---

## ✅ Decision Checklist

Before designing an API:

- [ ] **Asked user about API consumers?**
- [ ] **Chosen API style for THIS context?** (REST / OpenAPI 3.1 / GraphQL / tRPC / Hono RPC / MCP)
- [ ] **Defined consistent response & RFC 9457 error format?**
- [ ] **Planned versioning strategy?**
- [ ] **Considered authentication & BOLA/BFLA authorization needs?**
- [ ] **Planned rate limiting & idempotency keys?**
- [ ] **Contract-first schema (`SHARED_CONTRACT`) defined?**

---

## ❌ Anti-Patterns

**DON'T:**
- Default to untyped REST when end-to-end typed RPC (`Hono RPC` / `tRPC`) or OpenAPI 3.1 fits better
- Use verbs in REST endpoints (`/getUsers`)
- Return inconsistent response formats
- Expose raw stack traces or internal errors to clients
- Skip rate limiting or object-level authorization checks

**DO:**
- Choose API style based on consumer context
- Validate all inputs at the boundary with Zod / TypeBox / Pydantic v2
- Document contracts thoroughly with OpenAPI 3.1
- Use appropriate HTTP status codes

---

## Script

| Script | Purpose | Command |
|--------|---------|---------|
| `scripts/api_validator.py` | API endpoint validation | `python skills/api-patterns/scripts/api_validator.py <project_path>` |
