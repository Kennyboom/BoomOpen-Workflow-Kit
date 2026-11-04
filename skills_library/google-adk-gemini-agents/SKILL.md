---
name: google-adk-gemini-agents
description: Multi-agent system engineering with Google Agent Development Kit (ADK) and Gemini 2.5 Pro, including LlmAgent, SequentialAgent, ParallelAgent, LoopAgent, Session state, and Vertex AI Agent Engine deployment.
domain: mcp
---

# Google Agent Development Kit (ADK) & Gemini 2.5 Multi-Agent Patterns

## 1. When to Use This Skill
Use this skill when designing, implementing, or deploying multi-agent workflows using **Google Agent Development Kit (`google-adk`)** and **Google GenAI SDK (`google-genai`)**, including:
- Composing deterministic workflow orchestrators (**`SequentialAgent`**, **`ParallelAgent`**, **`LoopAgent`**) alongside dynamic **`LlmAgent`** routers.
- Sharing structured intermediate state across agents via `output_key` and `session.state`.
- Attaching **ToolContext** callbacks (`before_tool_callback`, `before_model_callback`) for policy enforcement and telemetry.
- Deploying stateful multi-agent hierarchies to **Vertex AI Agent Engine** or Cloud Run.

---

## 2. Core Architecture Principles
1. **Deterministic Workflow Agents Over Pure LLM Routing**:
   - When the execution topology is known ahead of time (e.g., `Parallel Scout + Research` → `Plan` → `Iterative Code + Verify Loop`), use ADK's **`ParallelAgent`**, **`SequentialAgent`**, and **`LoopAgent`** rather than relying on an LLM to decide the next step at every turn.
2. **State Passing via `output_key` & `session.state`**:
   - Each specialist `LlmAgent` writes its structured deliverable to a dedicated `output_key` (e.g., `output_key="research_findings"`), which downstream agents reference cleanly via `{research_findings}` template interpolation or `tool_context.state`.
3. **Docstring-Driven Tool Schemas**:
   - In Python ADK, function tools derive their JSON Schema directly from type annotations and docstrings. Every tool function MUST have explicit type hints, a descriptive docstring, and a structured dictionary return value (`{"status": "success" | "error", ...}`).
4. **Loop Termination Escalation**:
   - Every `LoopAgent` MUST pair `max_iterations` with an explicit exit tool (`tool_context.actions.escalate = True`) so the loop stops immediately once verification passes.

---

## 3. Python Pattern (`google-adk` Parallel Fan-Out + Iterative Verification Loop)

```python
from typing import Any
from google.adk.agents import LlmAgent, ParallelAgent, SequentialAgent, LoopAgent
from google.adk.tools import ToolContext
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types

MODEL_PRO = "gemini-2.5-pro"
MAX_REFINE_ITERATIONS = 3

# 1. Deterministic Tools with ToolContext State & Escalation
def verify_implementation_patch(
    test_suite_passed: bool,
    coverage_percent: float,
    tool_context: ToolContext,
) -> dict[str, Any]:
    """Verify whether the current implementation passes all tests and coverage gates.

    Args:
        test_suite_passed: True if all unit and integration tests passed with exit code 0.
        coverage_percent: Measured line coverage percentage (0.0 to 100.0).
    """
    tool_context.state["last_coverage"] = coverage_percent
    if test_suite_passed and coverage_percent >= 80.0:
        # Signal LoopAgent to terminate early on success
        tool_context.actions.escalate = True
        return {"status": "approved", "coverage": coverage_percent}
    return {
        "status": "needs_refinement",
        "reason": f"Tests passed={test_suite_passed}, coverage={coverage_percent}% (requires >= 80%)",
    }

# 2. Phase 1: Parallel Discovery Sub-Agents (Disjoint output_keys)
architecture_scouter = LlmAgent(
    name="ArchitectureScouter",
    model=MODEL_PRO,
    instruction="Map target module boundaries, exports, and dependency graph concisely.",
    output_key="scout_report",
)

security_researcher = LlmAgent(
    name="SecurityResearcher",
    model=MODEL_PRO,
    instruction="Identify OWASP Top 10 and authentication edge cases for the requested feature.",
    output_key="security_constraints",
)

parallel_discovery_phase = ParallelAgent(
    name="ParallelDiscoveryPhase",
    sub_agents=[architecture_scouter, security_researcher],
)

# 3. Phase 2: Contract-First Planner Consuming State Keys
contract_planner = LlmAgent(
    name="ContractPlanner",
    model=MODEL_PRO,
    instruction=(
        "Synthesize an implementation blueprint using:\n"
        "- Codebase Scout: {scout_report}\n"
        "- Security Constraints: {security_constraints}\n"
        "Lock SHARED_CONTRACT and OWNED_FILES before coding."
    ),
    output_key="implementation_plan",
)

# 4. Phase 3: Iterative Executor + Verifier LoopAgent
code_implementer = LlmAgent(
    name="CodeImplementer",
    model=MODEL_PRO,
    instruction="Implement the feature strictly following {implementation_plan}.",
    output_key="latest_patch",
)

qa_verifier = LlmAgent(
    name="QaVerifier",
    model=MODEL_PRO,
    instruction=(
        "Evaluate {latest_patch} against acceptance criteria and invoke "
        "verify_implementation_patch to approve or request refinement."
    ),
    tools=[verify_implementation_patch],
)

refinement_loop = LoopAgent(
    name="IterativeVerificationLoop",
    sub_agents=[code_implementer, qa_verifier],
    max_iterations=MAX_REFINE_ITERATIONS,
)

# 5. Root Sequential Pipeline
root_engineering_pipeline = SequentialAgent(
    name="BoomOpenAdkPipeline",
    sub_agents=[parallel_discovery_phase, contract_planner, refinement_loop],
)

async def run_adk_workflow(user_prompt: str, user_id: str, session_id: str) -> str:
    session_service = InMemorySessionService()
    await session_service.create_session(
        app_name="boomopen_adk", user_id=user_id, session_id=session_id
    )
    runner = Runner(
        agent=root_engineering_pipeline,
        app_name="boomopen_adk",
        session_service=session_service,
    )
    content = types.Content(role="user", parts=[types.Part.from_text(text=user_prompt)])
    final_text = ""
    async for event in runner.run_async(
        user_id=user_id, session_id=session_id, new_message=content
    ):
        if event.is_final_response() and event.content and event.content.parts:
            final_text = event.content.parts[0].text or ""
    return final_text
```

---

## 4. Safety & Policy Callbacks (`before_tool_callback`)

```python
from typing import Optional
from google.adk.tools.base_tool import BaseTool
from google.adk.tools.tool_context import ToolContext

FORBIDDEN_ARGS = {"drop_database", "force_push"}

def enforce_tool_policy(
    tool: BaseTool, args: dict[str, Any], tool_context: ToolContext
) -> Optional[dict[str, Any]]:
    """Return a dict to short-circuit execution, or None to allow the tool call."""
    if any(k in FORBIDDEN_ARGS for k in args):
        return {"status": "blocked", "error": f"Tool {tool.name} blocked by policy gate."}
    return None
```

---

## 5. Anti-Patterns to Avoid
- ❌ **Using Legacy `google-generativeai` Package**: Always import from the unified `google-genai` SDK (`from google import genai`) and `google.adk`.
- ❌ **Shared Mutable `output_key` in `ParallelAgent`**: Two parallel sub-agents writing to the same `output_key` cause race-condition overwrites. Assign distinct keys per branch.
- ❌ **`LoopAgent` Without `escalate = True`**: Forgetting an escalation tool forces the loop to burn all `max_iterations` even when the first pass succeeds.

---

## 6. Verification Checklist
- [ ] Every `ParallelAgent` branch writes to a unique `output_key`.
- [ ] Every `LoopAgent` sets `max_iterations` and includes a tool that sets `tool_context.actions.escalate = True`.
- [ ] Python tool functions include complete type annotations and docstrings for automatic schema generation.
- [ ] Policy gates are attached via `before_tool_callback` on agents with mutation tools.
