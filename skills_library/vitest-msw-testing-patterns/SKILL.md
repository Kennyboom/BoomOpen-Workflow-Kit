---
name: vitest-msw-testing-patterns
description: "Fast unit & integration testing with Vitest workspace mode, Mock Service Worker (MSW v2) network-level API mocking, and deterministic time/state assertions."
domain: quality
version: "5.5.0"
---

# Vitest & Mock Service Worker (MSW v2) Testing Architecture

> **PURPOSE**: Build fast, deterministic, zero-flakiness unit and integration test suites using Vitest (`vi.useFakeTimers`, `expect.poll`) and Mock Service Worker v2 (`msw/node`, `http`, `HttpResponse`) to intercept network traffic at the `fetch` boundary rather than mocking internal implementation details.

---

## 1. Core Architectural Principles

1. **Mock the Network Boundary (MSW v2), Not `global.fetch` or Internal Modules**:
   - Never replace `window.fetch` or `axios` with brittle `vi.fn()` stubs that skip URL serialization, headers, and status codes.
   - Use MSW v2 (`setupServer` from `msw/node` + `http.get` / `http.post` + `HttpResponse.json`) so your production fetch/TanStack Query/tRPC client executes its real request/response pipeline.
2. **Fail Fast on Unhandled Network Requests**:
   - Configure `server.listen({ onUnhandledRequest: 'error' })` in `beforeAll` and `server.resetHandlers()` in `afterEach` so accidental live network calls or leaked per-test error overrides fail immediately.
3. **Deterministic Time & Async Assertions**:
   - Use `vi.useFakeTimers()` + `vi.setSystemTime(new Date('2026-11-04T00:00:00Z'))` for retry backoffs, debounce timers, and JWT expirations; never use real `setTimeout` delays in unit tests.
4. **Per-Test Handler Overrides (`server.use(...)`)**:
   - Keep happy-path handlers in `tests/mocks/handlers.ts` and inject 401/429/500 failure states locally inside individual tests via `server.use(http.post(..., () => HttpResponse.json(..., { status: 500 })))`.

---

## 2. Production Code Patterns

### Pattern A — MSW v2 Server Setup (`vitest.setup.ts`) & Typed Handlers

```typescript
// tests/mocks/server.ts
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

export interface CheckoutReqBody {
  cartId: string;
  couponCode?: string;
}

export const defaultHandlers = [
  http.post<never, CheckoutReqBody>('/api/checkout', async ({ request }) => {
    const body = await request.json();
    if (!body.cartId) {
      return HttpResponse.json(
        { code: 'INVALID_CART', message: 'cartId is required' },
        { status: 400 }
      );
    }
    return HttpResponse.json(
      {
        orderId: 'ord_9001',
        chargedCents: body.couponCode === 'VIP20' ? 8000 : 10000,
        status: 'PAID',
      },
      { status: 201 }
    );
  }),
];

export const mswServer = setupServer(...defaultHandlers);
```

```typescript
// tests/vitest.setup.ts
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { mswServer } from './mocks/server';

beforeAll(() => {
  mswServer.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  mswServer.resetHandlers();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

afterAll(() => {
  mswServer.close();
});
```

### Pattern B — Testing Happy Path, Payload Inspection & Retry Backoff with MSW v2 + Fake Timers

```typescript
// src/services/__tests__/checkout-client.test.ts
import { describe, expect, it, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { mswServer } from '../../../tests/mocks/server';
import { submitCheckoutWithRetry } from '../checkout-client';

describe('submitCheckoutWithRetry', () => {
  it('applies discount coupon and returns order confirmation on 201', async () => {
    let capturedAuthHeader: string | null = null;

    mswServer.use(
      http.post('/api/checkout', async ({ request }) => {
        capturedAuthHeader = request.headers.get('authorization');
        const body = (await request.json()) as { cartId: string; couponCode?: string };
        return HttpResponse.json(
          { orderId: 'ord_vip', chargedCents: body.couponCode === 'VIP20' ? 8000 : 10000 },
          { status: 201 }
        );
      })
    );

    const res = await submitCheckoutWithRetry({
      cartId: 'cart_123',
      couponCode: 'VIP20',
      token: 'jwt_abc',
    });

    expect(capturedAuthHeader).toBe('Bearer jwt_abc');
    expect(res).toEqual({ orderId: 'ord_vip', chargedCents: 8000 });
  });

  it('retries transient 503 responses using deterministic fake timers', async () => {
    vi.useFakeTimers();
    let attempts = 0;

    mswServer.use(
      http.post('/api/checkout', () => {
        attempts += 1;
        if (attempts < 3) {
          return HttpResponse.json({ message: 'Service Unavailable' }, { status: 503 });
        }
        return HttpResponse.json({ orderId: 'ord_recovered', chargedCents: 10000 }, { status: 201 });
      })
    );

    const pendingPromise = submitCheckoutWithRetry({ cartId: 'cart_retry', token: 'jwt_abc' });
    await vi.runAllTimersAsync();
    const result = await pendingPromise;

    expect(attempts).toBe(3);
    expect(result.orderId).toBe('ord_recovered');
  });
});
```

---

## 3. Anti-Patterns to Avoid

- **❌ Using Legacy MSW v1 `rest.get(url, (req, res, ctx) => res(ctx.status(200), ctx.json(...)))`**: MSW v2 uses standard Fetch primitives (`http.get(url, ({ request, params }) => HttpResponse.json(data, { status: 200 }))`).
- **❌ Forgetting `mswServer.resetHandlers()` in `afterEach`**: Causes runtime `mswServer.use(...)` error overrides in one test to pollute subsequent tests.
- **❌ Sleeping with `await new Promise(r => setTimeout(r, 1000))`**: Slows down CI and causes flaky race conditions; use `vi.useFakeTimers()` + `await vi.advanceTimersByTimeAsync(1000)`.

---

## 4. Verification Checklist

- [ ] `mswServer.listen({ onUnhandledRequest: 'error' })` and `mswServer.resetHandlers()` are active in `vitest.setup.ts`.
- [ ] All MSW handlers use v2 `http.*` and `HttpResponse.json(...)` APIs.
- [ ] Time-dependent tests use `vi.useFakeTimers()` and restore `vi.useRealTimers()` in `afterEach`.
