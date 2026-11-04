---
name: claude-agent-sdk-patterns
description: Production agentic workflows with the Anthropic Claude Agent SDK, subagent delegation, tool sandboxing, prompt caching, and evaluator-optimizer verification loops.
domain: mcp
---

# Anthropic Claude Agent SDK & Subagent Orchestration Patterns

## 1. When to Use This Skill
Use this skill when building autonomous coding, research, or enterprise workflow agents using the **Anthropic Claude Agent SDK** (`@anthropic-ai/claude-code` / `@anthropic-ai/sdk`) or Claude tool-use loops, including:
- Designing **Orchestrator-Workers** and **Evaluator-Optimizer** workflows with isolated subagent contexts.
- Configuring **PreToolUse / PostToolUse hooks** and sandboxing file/bash execution boundaries.
- Maximizing **Prompt Cache Hit Rates (`cache_control: { type: "ephemeral" }`)** across multi-turn agent loops.
- Implementing context compaction and structured verification checkpoints.

---

## 2. Core Architecture Principles
1. **Subagent Context Isolation**:
   - Heavy exploration, grep scouting, or multi-file analysis MUST be delegated to subagents so the primary orchestrator's context window only receives distilled summaries (`< 1,500 tokens`), preventing context rot.
2. **Deterministic Tool Permission Gates (`canUseTool` / Hooks)**:
   - Enforce an explicit allowlist of read-only tools (`Read`, `Glob`, `Grep`) for scouting agents, and guard write/shell tools (`Edit`, `Write`, `Bash`) with path ownership locks (`OWNED_FILES`) and destructive command filters.
3. **Prompt Prefix Stability (99%+ Cache Efficiency)**:
   - Keep system instructions, tool definitions, and static project rules 100% deterministic at the top of the prompt hierarchy; append dynamic per-turn state at the tail.
4. **Evaluator-Optimizer Verification Loop**:
   - Never trust a single-shot code generation pass. Pair execution with deterministic verification (`typecheck`, `lint`, `test`) and feed concrete failure diagnostics back into the warm agent session.

---

## 3. TypeScript Pattern (Claude Tool-Use Loop with Prompt Caching & Guarded Execution)

```typescript
import Anthropic from '@anthropic-ai/sdk';
import path from 'node:path';

const MAX_LOOP_ITERATIONS = 10;
const BLOCKED_SHELL_PATTERNS = /(?:rm\s+-rf\s+\/|git\s+push\s+--force|DROP\s+TABLE)/i;

export interface AgentLoopConfig {
  workspaceRoot: string;
  ownedFiles: string[];
  model?: string;
}

const TOOLS: Anthropic.Tool[] = [
  {
    name: 'read_workspace_file',
    description: 'Read a UTF-8 file relative to the workspace root. Prefer line-bounded reads.',
    input_schema: {
      type: 'object',
      properties: {
        relativePath: { type: 'string', description: 'Workspace-relative file path' },
      },
      required: ['relativePath'],
    },
  },
  {
    name: 'run_verification_cmd',
    description: 'Execute a sandboxed verification command (typecheck, unit tests, or linter).',
    input_schema: {
      type: 'object',
      properties: {
        command: { type: 'string', description: 'Non-destructive shell command to run' },
      },
      required: ['command'],
    },
    cache_control: { type: 'ephemeral' },
  },
];

export function validateToolExecution(
  toolName: string,
  input: Record<string, unknown>,
  config: AgentLoopConfig
): { allowed: boolean; reason?: string } {
  if (toolName === 'run_verification_cmd') {
    const cmd = String(input.command ?? '');
    if (BLOCKED_SHELL_PATTERNS.test(cmd)) {
      return { allowed: false, reason: `Blocked destructive command pattern: ${cmd}` };
    }
  }
  if (toolName === 'read_workspace_file') {
    const rel = String(input.relativePath ?? '');
    const resolved = path.resolve(config.workspaceRoot, rel);
    if (!resolved.startsWith(path.resolve(config.workspaceRoot))) {
      return { allowed: false, reason: 'Path traversal outside workspaceRoot is forbidden' };
    }
  }
  return { allowed: true };
}

export async function runGuardedClaudeAgent(
  client: Anthropic,
  systemInstructions: string,
  userTask: string,
  config: AgentLoopConfig,
  dispatchTool: (name: string, input: Record<string, unknown>) => Promise<string>
): Promise<string> {
  const messages: Anthropic.MessageParam[] = [{ role: 'user', content: userTask }];

  for (let step = 0; step < MAX_LOOP_ITERATIONS; step++) {
    const response = await client.messages.create({
      model: config.model ?? 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: [
        {
          type: 'text',
          text: systemInstructions,
          cache_control: { type: 'ephemeral' },
        },
      ],
      tools: TOOLS,
      messages,
    });

    messages.push({ role: 'assistant', content: response.content });
    if (response.stop_reason !== 'tool_use') {
      const textBlock = response.content.find((b) => b.type === 'text');
      return textBlock && 'text' in textBlock ? textBlock.text : '';
    }

    const toolResults: Anthropic.ToolResultBlockParam[] = [];
    for (const block of response.content) {
      if (block.type !== 'tool_use') continue;
      const inputObj = (block.input ?? {}) as Record<string, unknown>;
      const gate = validateToolExecution(block.name, inputObj, config);

      if (!gate.allowed) {
        toolResults.push({
          type: 'tool_result',
          tool_use_id: block.id,
          is_error: true,
          content: `SECURITY_GATE_REJECTED: ${gate.reason}`,
        });
        continue;
      }

      try {
        const output = await dispatchTool(block.name, inputObj);
        toolResults.push({ type: 'tool_result', tool_use_id: block.id, content: output });
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : String(err);
        toolResults.push({
          type: 'tool_result',
          tool_use_id: block.id,
          is_error: true,
          content: `Tool execution failed: ${errMsg}`,
        });
      }
    }
    messages.push({ role: 'user', content: toolResults });
  }

  throw new Error(`Exceeded MAX_LOOP_ITERATIONS (${MAX_LOOP_ITERATIONS})`);
}
```

---

## 4. Subagent Handoff Packet Contract (5-Field Standard)
When spawning specialist subagents in parallel, always pass a self-contained 5-field prompt packet:
1. **`MISSION & ACCEPTANCE CRITERIA`**: Measurable Given/When/Then outcomes.
2. **`SHARED_CONTRACT`**: Locked TypeScript interfaces, API routes, or database schemas.
3. **`OWNED_FILES`**: Exclusive write lock (no two parallel subagents may share an owned file).
4. **`READ_ONLY_FILES`**: Context files that must not be mutated.
5. **`VERIFICATION & DELIVERABLE`**: Exact test/typecheck command to run before reporting back.

---

## 5. Anti-Patterns to Avoid
- ❌ **Mutating System Prompts Mid-Session**: Injecting timestamps or random IDs into the system prompt invalidates Anthropic's ephemeral prompt cache on every turn.
- ❌ **Unbounded Bash Execution**: Running shell commands without path boundary checks, timeout limits, and destructive command regex guards.
- ❌ **Sequential File Crawling in Main Context**: Reading 15+ files directly in the primary agent instead of fanning out a read-only `scouter` subagent.

---

## 6. Verification Checklist
- [ ] System prompt blocks and static tool lists include `cache_control: { type: 'ephemeral' }`.
- [ ] Every file/shell tool call passes through a path-traversal and destructive-command gate before execution.
- [ ] Parallel subagents have strictly disjoint `OWNED_FILES` lists.
- [ ] Agent loops enforce a hard `MAX_LOOP_ITERATIONS` cap.
