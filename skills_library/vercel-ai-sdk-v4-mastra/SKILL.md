---
name: vercel-ai-sdk-v4-mastra
description: TypeScript AI application engineering with Vercel AI SDK v4/v5 (streamText, generateObject, multi-step maxSteps tool loops, provider fallbacks) and Mastra workflows/RAG.
domain: ai-ml
---

# Vercel AI SDK v4/v5 & Mastra TypeScript Agent Engineering

## 1. When to Use This Skill
Use this skill when building full-stack TypeScript AI applications, streaming chat APIs, structured extraction pipelines, or stateful agent graphs using the **Vercel AI SDK (`ai`, `@ai-sdk/openai`, `@ai-sdk/anthropic`, `@ai-sdk/google`)** and **Mastra (`@mastra/core`)**, including:
- Implementing **`streamText`** with multi-step autonomous tool calling (`maxSteps`) and `toDataStreamResponse()`.
- Extracting guaranteed schema-compliant JSON via **`generateObject`** / **`streamObject`** with Zod schemas.
- Building deterministic multi-step **Mastra Workflows** (`.step()`, `.then()`, `.parallel()`, suspend/resume human-in-the-loop).

---

## 2. Core Architecture Principles
1. **Multi-Step Tool Bounding (`maxSteps`)**:
   - When enabling autonomous tool loops in `streamText` or `generateText`, always set an explicit `maxSteps` bound (`2 <= maxSteps <= 10`) and log every step in `onStepFinish` for token/cost observability.
2. **Schema-First Structured Outputs**:
   - Never use `JSON.parse()` on raw free-form LLM text. Use `generateObject` or `streamObject` with a strict Zod schema and `.describe()` annotations on every field.
3. **Graceful Cancellation & AbortSignals**:
   - Forward the HTTP request's `req.signal` (`abortSignal`) into `streamText` / `generateObject` so client disconnects immediately cancel upstream LLM token generation.
4. **Provider-Agnostic Model Registry**:
   - Centralize model selection behind a provider registry so switching or falling back between `anthropic('claude-sonnet-4-20250514')`, `openai('gpt-4.1')`, and `google('gemini-2.5-pro')` requires zero business-logic edits.

---

## 3. Vercel AI SDK Pattern (`streamText` + Multi-Step Tools + `generateObject`)

```typescript
import { streamText, generateObject, tool } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';

const MAX_TOOL_STEPS = 5;
const REQUEST_TIMEOUT_MS = 30_000;

export const ReleaseRiskSchema = z.object({
  riskLevel: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  breakingChanges: z.array(z.string()).describe('List of detected breaking API or schema changes'),
  requiredMigrations: z.array(z.string()).describe('Database or config migrations required before deploy'),
  rollbackPlan: z.string().describe('Step-by-step rollback procedure'),
});

export type ReleaseRiskAssessment = z.infer<typeof ReleaseRiskSchema>;

// 1. Deterministic Schema Extraction with generateObject
export async function analyzePullRequestRisk(diffSummary: string): Promise<ReleaseRiskAssessment> {
  try {
    const { object } = await generateObject({
      model: anthropic('claude-sonnet-4-20250514'),
      schema: ReleaseRiskSchema,
      system: 'You are a Principal Release Engineer auditing pull request diffs for production risk.',
      prompt: `Analyze the following diff summary and produce a structured risk assessment:\n\n${diffSummary}`,
      abortSignal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    return object;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown extraction error';
    throw new Error(`Failed to analyze PR risk: ${message}`);
  }
}

// 2. Streaming Multi-Step Agent Endpoint (Next.js / Hono / Fetch Handler)
export async function handleAgentChatPost(req: Request): Promise<Response> {
  try {
    const { messages, projectId } = (await req.json()) as {
      messages: Array<{ role: 'user' | 'assistant'; content: string }>;
      projectId: string;
    };

    const result = streamText({
      model: anthropic('claude-sonnet-4-20250514'),
      system: `You are an operations assistant for project "${projectId}". Verify metrics via tools before answering.`,
      messages,
      maxSteps: MAX_TOOL_STEPS,
      abortSignal: req.signal,
      tools: {
        fetchErrorRate: tool({
          description: 'Fetch 5xx HTTP error rate percentage over the last N minutes.',
          parameters: z.object({
            service: z.string().describe('Service name, e.g. checkout-api'),
            windowMinutes: z.number().int().min(1).max(120).default(15),
          }),
          execute: async ({ service, windowMinutes }) => ({
            service,
            windowMinutes,
            errorRatePercent: 0.14,
            status: 'healthy',
          }),
        }),
      },
      onStepFinish({ stepType, toolCalls, usage }) {
        // Structured telemetry hook (replace with your logger)
        if (toolCalls.length > 0) {
          void { stepType, tools: toolCalls.map((t) => t.toolName), totalTokens: usage.totalTokens };
        }
      },
    });

    return result.toDataStreamResponse();
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Streaming chat failed';
    return Response.json({ error: message }, { status: 500 });
  }
}
```

---

## 4. Mastra Typed Workflow Pattern (`@mastra/core`)

```typescript
import { Agent } from '@mastra/core/agent';
import { createStep, createWorkflow } from '@mastra/core/workflows';
import { anthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';

export const codeReviewerAgent = new Agent({
  name: 'code-reviewer',
  instructions: 'Audit TypeScript diffs for type safety, error handling, and security.',
  model: anthropic('claude-sonnet-4-20250514'),
});

const gatherMetricsStep = createStep({
  id: 'gather-metrics',
  inputSchema: z.object({ prNumber: z.number().int().positive() }),
  outputSchema: z.object({ prNumber: z.number(), changedFiles: z.number(), diffText: z.string() }),
  execute: async ({ inputData }) => ({
    prNumber: inputData.prNumber,
    changedFiles: 3,
    diffText: '--- a/src/api.ts\n+++ b/src/api.ts\n@@ -1,3 +1,5 @@',
  }),
});

const synthesizeReviewStep = createStep({
  id: 'synthesize-review',
  inputSchema: z.object({ prNumber: z.number(), changedFiles: z.number(), diffText: z.string() }),
  outputSchema: z.object({ approved: z.boolean(), summary: z.string() }),
  execute: async ({ inputData }) => {
    const res = await codeReviewerAgent.generate(`Review PR #${inputData.prNumber}:\n${inputData.diffText}`);
    return { approved: !res.text.includes('BLOCKER'), summary: res.text };
  },
});

export const prReviewWorkflow = createWorkflow({
  id: 'pr-review-workflow',
  inputSchema: z.object({ prNumber: z.number().int().positive() }),
  outputSchema: z.object({ approved: z.boolean(), summary: z.string() }),
})
  .then(gatherMetricsStep)
  .then(synthesizeReviewStep)
  .commit();
```

---

## 5. Anti-Patterns to Avoid
- ❌ **Unbounded Tool Loops**: Enabling tools without `maxSteps` or setting `maxSteps > 15` on synchronous HTTP routes causes gateway timeouts.
- ❌ **Ignoring `req.signal`**: Continuing expensive multi-step LLM calls after the user closes their browser tab.
- ❌ **Regex-Parsing JSON from `generateText`**: Always use `generateObject` / `streamObject` for structured data.

---

## 6. Verification Checklist
- [ ] Every `streamText` / `generateText` call with tools defines `maxSteps` (`<= 10`).
- [ ] All structured extraction calls use `generateObject` or `streamObject` with Zod schemas.
- [ ] HTTP handlers pass `abortSignal: req.signal` or `AbortSignal.timeout(...)`.
- [ ] Mastra workflow steps define both `inputSchema` and `outputSchema` with Zod.
