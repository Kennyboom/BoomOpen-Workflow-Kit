---
name: react-19-nextjs-15-rsc
description: "React 19 (useActionState, useOptimistic, use, React Compiler) and Next.js 15 App Router (async params/searchParams, Server Actions validation, Suspense streaming, and explicit caching)."
domain: frontend
version: "5.5.0"
---

# React 19 & Next.js 15 App Router (RSC + Server Actions) Architecture

> **PURPOSE**: Build fast, type-safe full-stack web applications with React 19 (`useActionState`, `useOptimistic`, `use()`, ref-as-prop) and Next.js 15 App Router (awaited `params`/`searchParams`, Zod-validated Server Actions, and granular cache invalidation).

---

## 1. Core Architectural Principles

1. **Server Components by Default, Leaf Client Components**:
   - Keep pages, layouts, and data-fetching containers as async React Server Components (RSC) with zero client bundle cost.
   - Add `'use client'` strictly at interactive leaf boundaries (forms, modals, realtime widgets).
2. **Next.js 15 Async Request APIs (Mandatory `await`)**:
   - In Next.js 15, `params`, `searchParams`, `cookies()`, and `headers()` are **asynchronous Promises** — always `await params` and `await searchParams` in pages, layouts, and route handlers.
3. **Validated Server Actions + `useActionState` & `useOptimistic`**:
   - Treat every `'use server'` function as a public HTTP endpoint: authenticate the session, validate `FormData` or payload with Zod, return structured `{ ok, errors, data }` state (never throw unhandled validation errors to the client), and pair with `useActionState` + `useOptimistic`.
4. **Parallel Data Fetching & Streaming `<Suspense>`**:
   - Avoid sequential `await` waterfalls in RSCs by kicking off independent queries via `Promise.all([...])` or passing unawaited Promises into `<Suspense>` children consumed via `React.use(promise)`.

---

## 2. Production Code Patterns

### Pattern A — Zod-Validated Server Action (`'use server'`)

```typescript
// app/projects/actions.ts
'use server';

import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const CreateTaskSchema = z.object({
  projectId: z.string().uuid(),
  title: z.string().trim().min(3, 'Title must be at least 3 characters').max(120),
});

export interface CreateTaskActionState {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
}

export async function createTaskAction(
  _prevState: CreateTaskActionState,
  formData: FormData
): Promise<CreateTaskActionState> {
  const parsed = CreateTaskSchema.safeParse({
    projectId: formData.get('projectId'),
    title: formData.get('title'),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: 'Validation failed',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // Persist to database and invalidate tagged cache
  await db.task.create({ data: parsed.data });
  revalidateTag(`project-tasks-${parsed.data.projectId}`);

  return { ok: true, message: 'Task created' };
}
```

### Pattern B — React 19 `useActionState` + `useOptimistic` Client Leaf

```tsx
// app/projects/[projectId]/task-creator.tsx
'use client';

import { useActionState, useOptimistic, useRef } from 'react';
import { createTaskAction, type CreateTaskActionState } from '../actions';

export interface TaskItem {
  id: string;
  title: string;
  pending?: boolean;
}

const initialState: CreateTaskActionState = { ok: false };

export function TaskCreator({ projectId, initialTasks }: { projectId: string; initialTasks: TaskItem[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    initialTasks,
    (current: TaskItem[], newTitle: string) => [
      ...current,
      { id: `temp-${Date.now()}`, title: newTitle, pending: true },
    ]
  );

  const [state, formAction, isPending] = useActionState(
    async (prev: CreateTaskActionState, formData: FormData) => {
      const title = String(formData.get('title') ?? '').trim();
      if (title) addOptimisticTask(title);
      const result = await createTaskAction(prev, formData);
      if (result.ok) formRef.current?.reset();
      return result;
    },
    initialState
  );

  return (
    <div className="space-y-4">
      <form ref={formRef} action={formAction} className="flex gap-2">
        <input type="hidden" name="projectId" value={projectId} />
        <input
          name="title"
          required
          placeholder="Add a task..."
          className="flex-1 rounded-md border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {isPending ? 'Saving...' : 'Add'}
        </button>
      </form>
      {state.fieldErrors?.title && (
        <p className="text-xs text-red-600" role="alert">
          {state.fieldErrors.title[0]}
        </p>
      )}
      <ul className="divide-y rounded-md border">
        {optimisticTasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between px-3 py-2 text-sm">
            <span>{task.title}</span>
            {task.pending && <span className="text-xs text-slate-400">Syncing...</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Pattern C — Next.js 15 Dynamic Route with Awaited `params` & `searchParams`

```tsx
// app/projects/[projectId]/page.tsx
interface PageProps {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ filter?: string }>;
}

export default async function ProjectDetailPage({ params, searchParams }: PageProps) {
  const [{ projectId }, { filter = 'all' }] = await Promise.all([params, searchParams]);
  const tasks = await fetchProjectTasks(projectId, filter);

  return <TaskCreator projectId={projectId} initialTasks={tasks} />;
}
```

---

## 3. Anti-Patterns to Avoid

- **❌ Accessing `params.id` Synchronously in Next.js 15**: `params` and `searchParams` are Promises in Next.js 15 and must be awaited (or unwrapped with `use(params)` in Client Components).
- **❌ Importing `react-dom` Legacy `useFormState`**: Replaced by `useActionState` from `'react'` in React 19.
- **❌ Passing Full Database Models with Sensitive Fields Across the RSC → Client Boundary**: Always map to explicit DTO props before rendering a `'use client'` component.

---

## 4. Verification Checklist

- [ ] All Next.js 15 pages/layouts type `params` and `searchParams` as `Promise<...>` and `await` them.
- [ ] Every `'use server'` action enforces authentication/authorization and Zod input validation before DB mutations.
- [ ] Forms use React 19 `useActionState` (and `useOptimistic` where immediate feedback improves perceived latency).
