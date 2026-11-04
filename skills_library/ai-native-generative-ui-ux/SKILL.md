---
name: ai-native-generative-ui-ux
description: AI-Native product UX and Generative UI engineering patterns including anti-flicker streaming choreography, collapsible reasoning accordions, inline tool-call result widgets, split-pane artifact canvases, grounding citations, and human-in-the-loop (HITL) approval cards.
version: "2.0.0"
category: "design"
domain: "design"
tags: ["ai-ux", "generative-ui", "streaming", "artifacts", "hitl", "citations", "multi-modal"]
---

# AI-Native Product UX & Generative UI Engineering Patterns (2026)

## 1. When to Use This Skill
Use this skill whenever designing or building **AI-native interfaces, copilot workspaces, agentic dashboards, streaming chat + canvas applications, or generative UI tool widgets**, including:
- Orchestrating **anti-flicker token streaming**, skeleton choreography, and auto-scroll anchor locking.
- Rendering **Streaming Reasoning / Thinking Accordions** (`<details>` / animated disclosure with live elapsed timer).
- Embedding **Inline Generative Tool-Call Progress & Interactive Result Widgets** inside assistant turns.
- Building **Split-Pane Artifact / Canvas Workspaces**, **Inline Grounding Citation Popovers**, and **Human-in-the-Loop (HITL) Confirmation & Diff Cards**.

---

## 2. Core AI-Native UX Principles & Decision Matrix

| UX Surface | User Intent | Canonical Pattern | Anti-Pattern to Avoid |
|:-----------|:------------|:------------------|:----------------------|
| **Latency & Skeleton Choreography** | Perceived zero-latency responsiveness | `150ms` show-delay before skeleton; `400ms` min-display duration once shown; transition smoothly into token stream | Flashing a spinner for `40ms` before fast responses arrive (causes visual jitter) |
| **Reasoning / Chain-of-Thought** | Inspect agent thought process without visual clutter | Collapsible header (`Thinking for 3.2s...`) auto-collapsing once final answer begins streaming | Dumping 2,000 words of raw internal monologue inline above the answer |
| **Generative Tool Calls** | Understand what tools the agent is invoking | Compact status pill (`🔍 Querying production metrics...`) morphing into an interactive chart/table card | Raw JSON tool arguments/outputs pasted as unformatted code blocks |
| **Split-Pane Artifacts / Canvas** | Co-edit documents, code, or UI previews alongside chat | Persistent right-hand workspace (`55%–65%` width on desktop) with version switcher (`v1`, `v2`, `Diff`) | Forcing users to scroll up 15 chat turns to copy a 300-line code block |
| **Human-in-the-Loop (HITL) Gates** | Approve destructive or external mutations safely | High-contrast inline **Diff & Confirmation Card** with explicit `Approve`, `Edit Args`, and `Reject` actions | Executing `DELETE` / billing / email mutations silently without confirmation |

---

## 3. Anti-Flicker Streaming & Auto-Scroll Anchor Choreography

1. **150ms Delay / 400ms Minimum Hold**:
   - Do not render a loading skeleton during the first `150ms` after prompt submission (if the first token arrives in `< 150ms`, stream immediately).
   - Once the skeleton appears, hold it for at least `400ms` before swapping to prevent sub-frame layout thrashing.
2. **Smart Scroll-Lock Disengagement**:
   - Pin scroll to the bottom while streaming **only** if the user is within `80px` of the bottom (`isAtBottom`).
   - The moment a wheel-up or touch-drag-up gesture occurs, disengage auto-scroll and display a floating **`↓ Jump to live stream`** pill.

```tsx
import React, { useEffect, useRef, useState } from 'react';

const SKELETON_DELAY_MS = 150;
const SKELETON_MIN_HOLD_MS = 400;

export function useAntiFlickerLoading(isPending: boolean): boolean {
  const [visible, setVisible] = useState(false);
  const shownAtRef = useRef<number | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPending) {
      timer = setTimeout(() => {
        shownAtRef.current = Date.now();
        setVisible(true);
      }, SKELETON_DELAY_MS);
    } else if (visible && shownAtRef.current) {
      const elapsed = Date.now() - shownAtRef.current;
      const remaining = Math.max(0, SKELETON_MIN_HOLD_MS - elapsed);
      timer = setTimeout(() => {
        setVisible(false);
        shownAtRef.current = null;
      }, remaining);
    }
    return () => clearTimeout(timer);
  }, [isPending, visible]);

  return visible;
}
```

---

## 4. Streaming Reasoning Accordion & Inline HITL Approval Card

```tsx
import React, { useState } from 'react';

export interface ReasoningAccordionProps {
  reasoningText: string;
  isStreamingReasoning: boolean;
  durationSeconds?: number;
}

export function StreamingReasoningAccordion({
  reasoningText,
  isStreamingReasoning,
  durationSeconds = 0,
}: ReasoningAccordionProps) {
  const [isOpen, setIsOpen] = useState(isStreamingReasoning);

  return (
    <section
      aria-label="Agent reasoning trace"
      className="my-2 rounded-lg border border-slate-800/80 bg-slate-900/50 text-xs text-slate-400"
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full min-h-9 items-center justify-between px-3 py-2 font-medium text-slate-300 hover:text-white"
      >
        <span className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              isStreamingReasoning ? 'animate-pulse bg-cyan-400' : 'bg-emerald-400'
            }`}
          />
          {isStreamingReasoning
            ? 'Reasoning through constraints...'
            : `Thought for ${durationSeconds.toFixed(1)}s`}
        </span>
        <span aria-hidden="true">{isOpen ? '▾' : '▸'}</span>
      </button>
      {isOpen && (
        <div className="border-t border-slate-800/60 px-3 py-2.5 font-mono leading-relaxed text-slate-400">
          {reasoningText}
        </div>
      )}
    </section>
  );
}

export interface HitlToolApprovalProps {
  toolName: string;
  summary: string;
  diffPreview: string;
  onApprove: () => void;
  onReject: () => void;
}

export function HitlToolApprovalCard({
  toolName,
  summary,
  diffPreview,
  onApprove,
  onReject,
}: HitlToolApprovalProps) {
  return (
    <div
      role="region"
      aria-label={`Confirmation required for ${toolName}`}
      className="my-3 rounded-xl border border-amber-500/40 bg-slate-950/90 p-4 shadow-lg"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="rounded bg-amber-500/15 px-2 py-0.5 font-mono text-xs font-semibold text-amber-300">
          ⚠️ ACTION APPROVAL REQUIRED · {toolName}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-200">{summary}</p>
      <pre className="mt-3 max-h-48 overflow-auto rounded-lg border border-slate-800 bg-black/60 p-3 font-mono text-xs text-emerald-300">
        {diffPreview}
      </pre>
      <div className="mt-4 flex items-center justify-end gap-2.5">
        <button
          type="button"
          onClick={onReject}
          className="min-h-9 rounded-lg border border-slate-700 px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800"
        >
          Cancel Action
        </button>
        <button
          type="button"
          onClick={onApprove}
          className="min-h-9 rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500"
        >
          Approve & Execute
        </button>
      </div>
    </div>
  );
}
```

---

## 5. Grounding Citations & Multi-Modal Composer Ergonomics
1. **Inline Grounding Badge (`[1]`, `[2]`)**:
   - Render compact superscript citation pills (`min-w-6 min-h-6`) that open a hover/focus popover displaying source domain favicon, document title, verbatim snippet, and confidence score.
2. **Multi-Modal Prompt Composer**:
   - Support `Enter` to send, `Shift + Enter` for newline, `/` for slash command autocomplete, `@` for file/context mention chips, and drag-and-drop attachment previews with removable thumbnails and token budget indicators.
   - Always provide a prominent **`⏹ Stop Generating`** button (`aria-label="Stop generating response"`) while streaming is active.

---

## 6. Anti-Patterns to Avoid
- ❌ **Layout Shift During Markdown Table / Code Streaming**: Reserve stable container widths and use `font-variant-numeric: tabular-nums` so streaming numbers and tables do not horizontally jitter.
- ❌ **Hijacking User Scroll Position**: Forcing `element.scrollTo()` on every token when the user has scrolled up to read earlier context.
- ❌ **Opaque Hallucination Surfaces**: Presenting RAG-synthesized facts without clickable source citations or confidence indicators.

---

## 7. Verification Checklist
- [ ] Loading states use the `150ms` show-delay / `400ms` minimum-hold anti-flicker hook.
- [ ] Auto-scroll disengages immediately on user upward scroll and shows a jump-to-bottom pill.
- [ ] Reasoning traces render inside collapsible accordions with `aria-expanded`.
- [ ] Destructive or external tool calls pause behind an accessible HITL confirmation card (`>= 24x24px` targets).
