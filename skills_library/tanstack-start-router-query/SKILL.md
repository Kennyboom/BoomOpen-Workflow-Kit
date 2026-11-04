---
name: tanstack-start-router-query
description: "TanStack Router type-safe file routing, search param Zod validation, loader pre-fetching, and TanStack Query v5 optimistic cache invalidation."
domain: frontend
version: "5.5.0"
---

# TanStack Router, TanStack Start & TanStack Query v5 Architecture

> **PURPOSE**: Build 100% end-to-end type-safe SPAs and full-stack SSR apps using `@tanstack/react-router` (or `@tanstack/react-start`), Zod-validated URL search state, route loader pre-fetching (`ensureQueryData`), and `@tanstack/react-query` v5 `queryOptions` + optimistic mutations.

---

## 1. Core Architectural Principles

1. **Centralized `queryOptions` Factory Pattern**:
   - Define every query key + `queryFn` + `staleTime` inside a shared `queryOptions({...})` helper so route `loader` functions, `useSuspenseQuery`, `useQuery`, and `queryClient.invalidateQueries` share identical types and keys.
2. **Render-As-You-Fetch via Route Loaders (`ensureQueryData`)**:
   - Trigger data fetching inside the TanStack Router `loader` (`context.queryClient.ensureQueryData(...)`) before component mount, eliminating component-level fetch waterfalls.
3. **URL Search Params as First-Class Validated State**:
   - Validate all route search parameters with `validateSearch: zodValidator(SearchSchema)` and register `loaderDeps` so changing pagination/filter URL params automatically invalidates and prefetches the route loader.
4. **Optimistic Mutations with Rollback Safety**:
   - In `useMutation`, cancel outgoing refetches (`cancelQueries`), snapshot previous cache data in `onMutate`, roll back in `onError`, and always `invalidateQueries` in `onSettled`.

---

## 2. Production Code Patterns

### Pattern A — Type-Safe `queryOptions` Factory & TanStack Router Route with `loaderDeps`

```tsx
import { createFileRoute } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

export const IssuesSearchSchema = z.object({
  page: z.number().int().min(1).catch(1),
  status: z.enum(['open', 'closed', 'all']).catch('open'),
  q: z.string().optional(),
});

export type IssuesSearch = z.infer<typeof IssuesSearchSchema>;

export interface IssueDto {
  id: string;
  title: string;
  status: 'open' | 'closed';
}

export const issuesQueryOptions = (deps: IssuesSearch) =>
  queryOptions({
    queryKey: ['issues', deps] as const,
    queryFn: async ({ signal }): Promise<IssueDto[]> => {
      const params = new URLSearchParams({
        page: String(deps.page),
        status: deps.status,
        ...(deps.q ? { q: deps.q } : {}),
      });
      const res = await fetch(`/api/issues?${params.toString()}`, { signal });
      if (!res.ok) throw new Error(`Failed to fetch issues: ${res.status}`);
      return res.json();
    },
    staleTime: 30_000,
  });

export const Route = createFileRoute('/issues/')({
  validateSearch: (search): IssuesSearch => IssuesSearchSchema.parse(search),
  loaderDeps: ({ search }) => ({
    page: search.page,
    status: search.status,
    q: search.q,
  }),
  loader: ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(issuesQueryOptions(deps)),
  component: IssuesRouteComponent,
});

function IssuesRouteComponent() {
  const deps = Route.useLoaderDeps();
  const navigate = Route.useNavigate();
  const { data: issues } = useSuspenseQuery(issuesQueryOptions(deps));
  const toggleMutation = useToggleIssueStatusMutation(deps);

  return (
    <section className="space-y-4">
      <div className="flex gap-2">
        {(['open', 'closed', 'all'] as const).map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => navigate({ search: (prev) => ({ ...prev, status, page: 1 }) })}
            className="rounded border px-3 py-1 text-sm"
          >
            {status}
          </button>
        ))}
      </div>
      <ul className="divide-y rounded border">
        {issues.map((issue) => (
          <li key={issue.id} className="flex items-center justify-between p-3">
            <span>{issue.title}</span>
            <button
              type="button"
              onClick={() =>
                toggleMutation.mutate({
                  id: issue.id,
                  nextStatus: issue.status === 'open' ? 'closed' : 'open',
                })
              }
              className="text-xs font-medium underline"
            >
              {issue.status}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

### Pattern B — TanStack Query v5 Optimistic Mutation with Rollback

```tsx
export function useToggleIssueStatusMutation(currentDeps: IssuesSearch) {
  const queryClient = useQueryClient();
  const targetOptions = issuesQueryOptions(currentDeps);

  return useMutation({
    mutationFn: async ({ id, nextStatus }: { id: string; nextStatus: 'open' | 'closed' }) => {
      const res = await fetch(`/api/issues/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (!res.ok) throw new Error(`Failed to update issue ${id}`);
      return (await res.json()) as IssueDto;
    },
    onMutate: async ({ id, nextStatus }) => {
      await queryClient.cancelQueries({ queryKey: targetOptions.queryKey });
      const previousIssues = queryClient.getQueryData<IssueDto[]>(targetOptions.queryKey);

      queryClient.setQueryData<IssueDto[]>(targetOptions.queryKey, (old) =>
        old ? old.map((item) => (item.id === id ? { ...item, status: nextStatus } : item)) : []
      );

      return { previousIssues };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousIssues) {
        queryClient.setQueryData(targetOptions.queryKey, context.previousIssues);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
  });
}
```

---

## 3. Anti-Patterns to Avoid

- **❌ Duplicating Raw String Query Keys (`['issues', page]`) Across Files**: Always reuse a `queryOptions()` factory.
- **❌ Storing Filter/Pagination State in `useState` Instead of `validateSearch`**: Breaks shareable URLs, browser back/forward navigation, and route preloading.
- **❌ Fetching Inside `useEffect`**: Always use TanStack Router `loader` (`ensureQueryData`) + `useSuspenseQuery` or `useQuery`.

---

## 4. Verification Checklist

- [ ] Every query is defined via `queryOptions({ queryKey, queryFn, staleTime })` with `signal` forwarded to `fetch`.
- [ ] Route search parameters are validated with Zod (`validateSearch`) and wired to `loaderDeps`.
- [ ] Optimistic mutations implement `cancelQueries`, snapshot rollback in `onError`, and `invalidateQueries` in `onSettled`.
