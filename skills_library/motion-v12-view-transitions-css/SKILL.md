---
name: motion-v12-view-transitions-css
description: "Modern web motion, spring physics, and scrollytelling 2026 — Native CSS View Transitions API, zero-JS CSS scroll-driven animations (scroll()/view()), @starting-style, Motion v12 (motion/react) spring physics, layoutId morphing, and prefers-reduced-motion."
version: "2.0.0"
category: "design"
tags: ["motion", "view-transitions", "scroll-driven-animations", "framer-motion", "spring-physics", "css", "accessibility"]
---

# Modern Web Motion, Spring Physics & Scrollytelling (2026)

> **PURPOSE**: Choreograph 60–120 FPS hardware-accelerated interfaces using the **3-Tier 2026 Motion Hierarchy**: (1) **Native CSS View Transitions API** for route/state morphs, (2) **Zero-JS CSS Scroll-Driven Animations & `@starting-style`** for entry/scroll choreography, and (3) **`motion/react` (Motion v12)** spring physics for interactive gestures and shared `layoutId` transitions.

---

## 1. The 3-Tier 2026 Motion Decision Matrix

| Motion Need | Recommended Primitive | JS Bundle Cost | Thread Execution |
|:------------|:----------------------|:--------------:|:-----------------|
| **Page/Route Transition or Filter/Tab DOM Reorder** | **Tier 1: Native View Transitions API** (`document.startViewTransition`, `@view-transition { navigation: auto }`) | `0 KB` | Compositor Thread |
| **Popover/Dialog Entry/Exit & Scroll-Linked Reveal/Parallax** | **Tier 2: Pure Modern CSS** (`@starting-style`, `transition-behavior: allow-discrete`, `animation-timeline: view()`) | `0 KB` | Compositor Thread |
| **Interruptible Drag/Swipe Gestures, Spring Physics & Complex Shared Layout (`layoutId`)** | **Tier 3: `motion/react` (Motion v12)** (`useSpring`, `layoutId`, `AnimatePresence`) | `~16 KB` (`LazyMotion`) | WAAPI / RAF Hybrid |

> **COMPOSITOR LAW**: Only animate `transform` (`translate3d`, `scale`, `rotate`), `opacity`, `filter`, or `clip-path`. **NEVER** animate `top`, `left`, `width`, `height`, `margin`, or `padding` on the main thread.

---

## 2. Production Code Patterns

### Pattern A — Tier 1: Native View Transitions API (`startViewTransition` + Fallback)

Wrap state changes that reorder grids, switch tabs, or toggle detail drawers in a safe `runWithViewTransition` helper that respects `prefers-reduced-motion`:

```tsx
// src/lib/view-transition.ts
import { flushSync } from 'react-dom';

export function runWithViewTransition(updateDomState: () => void): void {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (
    prefersReducedMotion ||
    typeof document === 'undefined' ||
    !('startViewTransition' in document)
  ) {
    updateDomState();
    return;
  }

  (document as Document & {
    startViewTransition: (cb: () => void) => void;
  }).startViewTransition(() => {
    flushSync(() => {
      updateDomState();
    });
  });
}
```

```css
/* Cross-document & same-document View Transition tuning */
@view-transition {
  navigation: auto;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 220ms;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
}
```

### Pattern B — Tier 2: Zero-JS CSS `@starting-style` & `animation-timeline: view()`

```css
/* src/styles/css-motion-2026.css */

/* 1. Native <dialog> / Popover entry & exit without JS mount delays */
dialog[open],
[popover]:popover-open {
  opacity: 1;
  transform: scale(1) translateY(0);
  transition:
    opacity 180ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 180ms cubic-bezier(0.16, 1, 0.3, 1),
    overlay 180ms allow-discrete,
    display 180ms allow-discrete;

  @starting-style {
    opacity: 0;
    transform: scale(0.96) translateY(6px);
  }
}

/* 2. Zero-JS Scroll-Driven Reveal (runs 100% off main thread when supported) */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .scroll-reveal-card {
      animation: reveal-up linear both;
      animation-timeline: view();
      animation-range: entry 10% cover 28%;
    }

    @keyframes reveal-up {
      from {
        opacity: 0;
        transform: translateY(24px) scale(0.98);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  }
}
```

### Pattern C — Tier 3: `motion/react` (v12) Spring Physics & Shared `layoutId` Tabs

Note: In Framer Motion v12+, import from **`motion/react`** (not legacy `framer-motion`). Use snappy, critically damped springs (`stiffness: 420, damping: 32, mass: 0.8`) so UI feels instantaneous and never bounces sluggishly:

```tsx
// src/components/ui/SpringSegmentedControl.tsx
import { motion, useReducedMotion } from 'motion/react';

export interface SegmentOption<T extends string> {
  id: T;
  label: string;
  badgeCount?: number;
}

export interface SpringSegmentedControlProps<T extends string> {
  layoutGroupId: string;
  options: readonly SegmentOption<T>[];
  activeId: T;
  onChange: (nextId: T) => void;
}

const SNAPPY_SPRING = {
  type: 'spring' as const,
  stiffness: 420,
  damping: 32,
  mass: 0.8,
};

export function SpringSegmentedControl<T extends string>({
  layoutGroupId,
  options,
  activeId,
  onChange,
}: SpringSegmentedControlProps<T>) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      role="tablist"
      className="inline-flex items-center gap-1 rounded-xl bg-[var(--surface-elevated)] p-1 border border-[var(--border-hairline)]"
    >
      {options.map((option) => {
        const isActive = option.id === activeId;
        return (
          <button
            key={option.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(option.id)}
            className="relative z-10 flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors"
          >
            {isActive && (
              <motion.span
                layoutId={`${layoutGroupId}-pill`}
                transition={shouldReduceMotion ? { duration: 0 } : SNAPPY_SPRING}
                className="absolute inset-0 -z-10 rounded-lg bg-[var(--surface-card)] shadow-sm border border-[var(--border-hairline)]"
              />
            )}
            <span>{option.label}</span>
            {option.badgeCount !== undefined && (
              <span className="font-mono text-xs tabular-nums opacity-70">
                {option.badgeCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
```

---

## 3. Spring Calibration Reference Table

| Interaction Type | Stiffness | Damping | Mass | Perceived Feel |
|:-----------------|:---------:|:-------:|:----:|:---------------|
| **Micro-UI (Tabs, Toggles, Tooltips)** | `420–500` | `30–36` | `0.8` | Crisp, zero overshoot (`~160ms` settle) |
| **Drawers, Modals & Command Palette** | `340–380` | `28–32` | `1.0` | Tactile, anchored deceleration (`~240ms` settle) |
| **Spatial Card Morph (`layoutId` Expand)** | `280–320` | `26–30` | `1.0` | Fluid spatial continuity without rubbery bounce |

---

## 4. Anti-Patterns & Verification Checklist

- [ ] **No Main-Thread Scroll Listeners for Simple Parallax**: Replaced `window.addEventListener('scroll', ...)` with CSS `animation-timeline: scroll()` / `view()`?
- [ ] **No Sluggish `duration > 400ms` on Productivity UI**: Are micro-interactions `<= 200ms` and modal transitions `<= 260ms`?
- [ ] **Unique `view-transition-name`**: Confirmed no two simultaneously visible DOM elements share the same `view-transition-name` (which aborts the transition)?
- [ ] **Mandatory Reduced Motion**: Are both `@media (prefers-reduced-motion: reduce)` and `useReducedMotion()` wired to disable spatial translation while preserving instant opacity crossfades?
