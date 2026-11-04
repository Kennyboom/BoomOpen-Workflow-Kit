---
name: mcp-server-fastmcp-2025
description: Production Model Context Protocol (MCP 2025-03-26) server engineering with Streamable HTTP, stdio transport, FastMCP TypeScript/Python, Zod/Pydantic tool schemas, Resource/Prompt templates, and OAuth 2.1 authorization.
domain: mcp
---

# MCP Server & FastMCP Engineering (2025-03-26 Spec)

## 1. When to Use This Skill
Use this skill whenever designing, building, auditing, or debugging **Model Context Protocol (MCP)** servers or clients in TypeScript/Node.js (`@modelcontextprotocol/sdk`, `fastmcp`) or Python (`mcp.server.fastmcp`), including:
- Migrating legacy HTTP+SSE dual-endpoint servers to the **MCP 2025-03-26 Streamable HTTP** single-endpoint (`/mcp`) transport.
- Authoring deterministic **Tools**, **Resources** (`uri` templates), and **Prompts** with strict schema validation.
- Implementing **OAuth 2.1 Resource Server** token verification, session lifecycle management, and tool-level permission scopes.

---

## 2. Core Architecture Principles
1. **Transport Selection**:
   - **Local / CLI Subprocess (`stdio`)**: Never write debug logs to `stdout` (`console.log` / `print`); route all structured logs to `stderr` (`console.error` / `sys.stderr`) so JSON-RPC 2.0 frames are never corrupted.
   - **Remote / Multi-Tenant (`Streamable HTTP`)**: Expose a single `/mcp` endpoint supporting `POST` (JSON-RPC requests/notifications returning `application/json` or `text/event-stream`), `GET` (optional SSE stream for server-initiated notifications), and `DELETE` (explicit session termination via `Mcp-Session-Id`).
2. **LLM-Ergonomic Tool Design**:
   - Tools represent **coarse-grained intent actions** (e.g., `search_tickets`, `create_incident`), not raw 1:1 database row mutations.
   - Every tool parameter MUST have a `.describe(...)` / `Field(description=...)` constraint detailing format, allowed enums, and bounds.
3. **Structured Actionable Tool Errors**:
   - Return domain/validation failures with `isError: true` inside the tool result content so the LLM can self-correct arguments without crashing the transport connection.
4. **Tool Annotations (2025 Spec)**:
   - Declare `annotations: { readOnlyHint, destructiveHint, idempotentHint, openWorldHint }` on every tool so host safety gates know when to require human confirmation.

---

## 3. TypeScript Pattern (`@modelcontextprotocol/sdk` + Streamable HTTP)

```typescript
import express, { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';

const MAX_QUERY_LIMIT = 50;

export function createKnowledgeMcpServer(): McpServer {
  const server = new McpServer({
    name: 'boomopen-knowledge-mcp',
    version: '1.0.0',
  });

  // 1. Dynamic Resource Template (Read-Only Context)
  server.resource(
    'runbook-by-service',
    new ResourceTemplate('runbook://{service}/latest', { list: undefined }),
    async (uri, { service }) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: 'text/markdown',
          text: `# Runbook for ${String(service)}\n1. Verify healthcheck\n2. Inspect error budget`,
        },
      ],
    })
  );

  // 2. Validated Tool with 2025 Safety Annotations
  server.tool(
    'query_service_incidents',
    'Query recent production incidents for a specific microservice.',
    {
      serviceName: z.string().min(2).max(64).describe('Canonical kebab-case service name'),
      severity: z.enum(['SEV1', 'SEV2', 'SEV3']).optional().describe('Optional severity filter'),
      limit: z.number().int().min(1).max(MAX_QUERY_LIMIT).default(10).describe('Max records (1-50)'),
    },
    {
      title: 'Query Service Incidents',
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
    async ({ serviceName, severity, limit }) => {
      try {
        const rows = [{ id: 'INC-204', serviceName, severity: severity ?? 'SEV2', status: 'mitigated' }];
        return {
          content: [{ type: 'text', text: JSON.stringify({ count: rows.length, items: rows.slice(0, limit) }) }],
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown query failure';
        return {
          isError: true,
          content: [{ type: 'text', text: `Failed to query incidents for "${serviceName}": ${message}` }],
        };
      }
    }
  );

  return server;
}

// Streamable HTTP Single-Endpoint Mounting (/mcp)
const app = express();
app.use(express.json());
const transports = new Map<string, StreamableHTTPServerTransport>();

app.post('/mcp', async (req: Request, res: Response) => {
  try {
    const sessionId = req.headers['mcp-session-id'] as string | undefined;
    let transport = sessionId ? transports.get(sessionId) : undefined;
    if (!transport) {
      transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
      });
      const mcp = createKnowledgeMcpServer();
      await mcp.connect(transport);
      if (transport.sessionId) transports.set(transport.sessionId, transport);
    }
    await transport.handleRequest(req, res, req.body);
  } catch (err) {
    res.status(500).json({ jsonrpc: '2.0', error: { code: -32603, message: 'Internal MCP error' }, id: null });
  }
});
```

---

## 4. Python Pattern (`FastMCP` with Lifespan & Context)

```python
import sys
import logging
from contextlib import asynccontextmanager
from collections.abc import AsyncIterator
from dataclasses import dataclass
from pydantic import BaseModel, Field
from mcp.server.fastmcp import FastMCP, Context

# CRITICAL: Route all logs to stderr so stdio JSON-RPC frames remain uncorrupted
logging.basicConfig(stream=sys.stderr, level=logging.INFO)
logger = logging.getLogger("mcp_server")

@dataclass
class AppDependencies:
    db_dsn: str

@asynccontextmanager
async def app_lifespan(server: FastMCP) -> AsyncIterator[AppDependencies]:
    logger.info("Initializing MCP server dependencies")
    yield AppDependencies(db_dsn="postgresql://readonly@localhost:5432/metrics")
    logger.info("Shutting down MCP server dependencies")

mcp = FastMCP("MetricsInspector", lifespan=app_lifespan)

class MetricQueryInput(BaseModel):
    metric_name: str = Field(..., description="Prometheus metric identifier, e.g. http_requests_total")
    window_minutes: int = Field(default=15, ge=1, le=1440, description="Lookback window in minutes")

@mcp.tool()
async def inspect_metric_window(params: MetricQueryInput, ctx: Context) -> str:
    """Fetch aggregated p95/p99 latency or counter rates for a given metric."""
    deps: AppDependencies = ctx.request_context.lifespan_context
    await ctx.info(f"Querying {params.metric_name} over {params.window_minutes}m")
    return f'{{"metric": "{params.metric_name}", "window_m": {params.window_minutes}, "dsn": "{deps.db_dsn}", "p95_ms": 42.7}}'
```

---

## 5. Anti-Patterns to Avoid
- ❌ **`console.log()` in `stdio` servers**: Any non-JSON-RPC bytes on `stdout` immediately break the host MCP client parser.
- ❌ **Unbounded Tool Payloads**: Returning 5 MB JSON blobs exhausts the model context window. Enforce pagination (`cursor` / `limit <= 50`) and field projection.
- ❌ **Leaking Internal Stack Traces or Credentials**: Sanitize all upstream database/API errors before returning `isError: true` messages.

---

## 6. Verification Checklist
- [ ] All `stdio` logging writes exclusively to `stderr`.
- [ ] Every tool defines explicit Zod/Pydantic descriptions and numeric/length bounds.
- [ ] Destructive or external-mutation tools set `destructiveHint: true` in tool annotations.
- [ ] Tool handlers wrap I/O in `try/catch` and return `{ isError: true, content: [...] }` on recoverable errors.
