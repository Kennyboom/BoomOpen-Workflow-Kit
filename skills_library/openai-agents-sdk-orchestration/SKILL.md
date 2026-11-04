---
name: openai-agents-sdk-orchestration
description: Multi-agent workflow engineering with the OpenAI Agents SDK (Agents, Handoffs, Input/Output Guardrails, Structured Outputs, RunContextWrapper, and Tracing).
domain: mcp
---

# OpenAI Agents SDK Orchestration Patterns

## 1. When to Use This Skill
Use this skill when building or refactoring multi-agent systems using the **OpenAI Agents SDK** (`@openai/agents` in TypeScript or `openai-agents` in Python), including:
- Designing **Coordinator / Triage** agents with deterministic **Handoffs** to domain specialists.
- Implementing **Agent-as-a-Tool** compositions where a manager retains conversation control.
- Enforcing **Input & Output Guardrails** (tripwires) that run in parallel with model execution.
- Binding strongly-typed dependency injection (`RunContextWrapper<TContext>`) and Zod/Pydantic `outputType` schemas.

---

## 2. Core Architecture Principles
1. **Handoffs vs. Agent-as-a-Tool**:
   - **Handoff (`handoffs: [ billingAgent, technicalAgent ]`)**: Transfers full conversation ownership and history to the specialist agent. Best for customer triage and multi-stage routing.
   - **Agent-as-a-Tool (`specialist.asTool(...)`)**: Runs the specialist in a sub-call and returns a synthesized answer to the orchestrator agent. Best for parallel fan-out synthesis.
2. **Parallel Tripwire Guardrails**:
   - Attach fast, low-cost guardrail checks (`inputGuardrails`, `outputGuardrails`) to catch prompt injection, PII leaks, or off-topic requests before expensive downstream tool calls execute.
3. **Loop & Cost Bounding**:
   - Always pass an explicit `maxTurns` ceiling (e.g., `MAX_AGENT_TURNS = 12`) to `Runner.run()` so cyclic handoffs or repeated tool retries cannot spin indefinitely.
4. **Context Separation**:
   - Store secrets, database clients, and tenant metadata in the local `RunContext<AppContext>` object — never inject raw credentials into system prompt strings.

---

## 3. TypeScript Pattern (`@openai/agents` with Handoffs & Guardrails)

```typescript
import { z } from 'zod';
import {
  Agent,
  run,
  tool,
  InputGuardrail,
  GuardrailFunctionOutput,
  RunContext,
} from '@openai/agents';

const MAX_AGENT_TURNS = 10;

export interface SupportContext {
  tenantId: string;
  userId: string;
  auditLogger: (event: string, meta: Record<string, unknown>) => void;
}

const TicketResolutionSchema = z.object({
  category: z.enum(['billing', 'infrastructure', 'security']),
  summary: z.string(),
  actionTaken: z.string(),
  requiresHumanEscalation: z.boolean(),
});

// 1. Strongly-Typed Tool Consuming Local RunContext
const lookupSubscriptionTool = tool({
  name: 'lookup_subscription',
  description: 'Fetch active subscription tier and invoice status for the current tenant.',
  parameters: z.object({
    includeInvoices: z.boolean().default(false).describe('Whether to include last 3 invoices'),
  }),
  async execute({ includeInvoices }, runContext?: RunContext<SupportContext>) {
    const tenantId = runContext?.context.tenantId ?? 'unknown';
    runContext?.context.auditLogger('lookup_subscription', { tenantId, includeInvoices });
    return JSON.stringify({
      tenantId,
      plan: 'enterprise',
      status: 'active',
      invoices: includeInvoices ? [{ id: 'INV-901', amountUsd: 499 }] : [],
    });
  },
});

// 2. Specialist Agents
const billingSpecialist = new Agent<SupportContext, typeof TicketResolutionSchema>({
  name: 'BillingSpecialist',
  instructions:
    'You resolve billing, invoice, and subscription inquiries. Always verify status via lookup_subscription first.',
  tools: [lookupSubscriptionTool],
  outputType: TicketResolutionSchema,
});

const infraSpecialist = new Agent<SupportContext, typeof TicketResolutionSchema>({
  name: 'InfraSpecialist',
  instructions:
    'You diagnose deployment, latency, and webhook delivery issues. Escalate SEV1 outages immediately.',
  outputType: TicketResolutionSchema,
});

// 3. Input Guardrail (Parallel Tripwire)
const promptInjectionGuardrail: InputGuardrail = {
  name: 'PromptInjectionTripwire',
  async execute({ input }): Promise<GuardrailFunctionOutput> {
    const raw = typeof input === 'string' ? input : JSON.stringify(input);
    const suspicious = /ignore\s+all\s+previous\s+instructions|system\s+prompt\s+dump/i.test(raw);
    return {
      tripwireTriggered: suspicious,
      outputInfo: { matchedPattern: suspicious ? 'instruction_override' : null },
    };
  },
};

// 4. Triage Coordinator with Handoffs
export const triageCoordinator = new Agent<SupportContext, typeof TicketResolutionSchema>({
  name: 'TriageCoordinator',
  instructions:
    'Classify the user request and hand off to BillingSpecialist for invoice/plan issues or InfraSpecialist for technical issues.',
  handoffs: [billingSpecialist, infraSpecialist],
  inputGuardrails: [promptInjectionGuardrail],
  outputType: TicketResolutionSchema,
});

export async function executeSupportWorkflow(userMessage: string, context: SupportContext) {
  try {
    const result = await run(triageCoordinator, userMessage, {
      context,
      maxTurns: MAX_AGENT_TURNS,
    });
    return result.finalOutput;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Agent execution error';
    throw new Error(`Support workflow failed: ${message}`);
  }
}
```

---

## 4. Python Pattern (`openai-agents` with Agent-as-Tool & Tracing)

```python
from pydantic import BaseModel, Field
from agents import Agent, Runner, RunContextWrapper, function_tool, trace

MAX_TURNS = 8

class TenantContext(BaseModel):
    org_id: str
    environment: str = "production"

class SecurityAuditReport(BaseModel):
    risk_score: int = Field(..., ge=0, le=100)
    findings: list[str]
    remediation_steps: list[str]

@function_tool
async def scan_iam_policies(ctx: RunContextWrapper[TenantContext], service_name: str) -> str:
    """Scan IAM role bindings for wildcard permissions in the current tenant."""
    return f'{{"org_id": "{ctx.context.org_id}", "service": "{service_name}", "wildcard_roles": ["roles/editor"]}}'

iam_auditor = Agent[TenantContext](
    name="IamAuditor",
    instructions="Analyze IAM bindings and identify least-privilege violations.",
    tools=[scan_iam_policies],
)

lead_security_orchestrator = Agent[TenantContext](
    name="LeadSecurityOrchestrator",
    instructions="Coordinate security sub-auditors and synthesize a structured SecurityAuditReport.",
    tools=[
        iam_auditor.as_tool(
            tool_name="run_iam_audit",
            tool_description="Run a focused least-privilege IAM audit for a target service.",
        )
    ],
    output_type=SecurityAuditReport,
)

async def run_security_review(service_name: str, context: TenantContext) -> SecurityAuditReport:
    with trace(workflow_name="security_audit_workflow", group_id=context.org_id):
        result = await Runner.run(
            lead_security_orchestrator,
            input=f"Audit IAM posture for service: {service_name}",
            context=context,
            max_turns=MAX_TURNS,
        )
        return result.final_output_as(SecurityAuditReport)
```

---

## 5. Anti-Patterns to Avoid
- ❌ **Bidirectional Infinite Handoff Loops**: Agent A handing off to Agent B which immediately hands back to Agent A without state progression. Always set `maxTurns` and clear handoff preconditions.
- ❌ **Overlapping Tool / Handoff Descriptions**: Vague descriptions cause non-deterministic routing. Make handoff boundaries mutually exclusive.
- ❌ **Passing Auth Tokens in Prompt Text**: Always pass tokens via `RunContext` so they are never logged in prompt traces.

---

## 6. Verification Checklist
- [ ] Every `Runner.run()` / `run()` call specifies an explicit `maxTurns` limit.
- [ ] Entrypoint agents enforce `inputGuardrails` for untrusted user inputs.
- [ ] Final structured responses validate against a strict Zod/Pydantic `outputType`.
- [ ] Workflows are wrapped in `trace(...)` blocks with tenant/request correlation IDs.
