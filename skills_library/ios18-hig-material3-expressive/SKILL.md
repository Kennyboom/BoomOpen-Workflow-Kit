---
name: ios18-hig-material3-expressive
description: "Mobile UI/UX 2026 (iOS 18 HIG & Material 3 Expressive) — 44pt/48dp touch ergonomics, thumb-zone bottom navigation, safe-area-inset & Dynamic Island rules, iOS Safari >=16px input zoom prevention, Material 3 Expressive spring tokens, and haptic choreography."
version: "2.0.0"
category: "design"
tags: ["mobile-design", "ios-18-hig", "material-3-expressive", "touch-targets", "safe-area", "haptics", "pwa"]
---

# Mobile UI/UX 2026 — iOS 18 HIG & Material 3 Expressive

> **PURPOSE**: Build native-grade iOS, Android, React Native / Expo, Flutter, Tauri v2 Mobile, and mobile-web interfaces adhering to **Apple iOS 18 Human Interface Guidelines (HIG)** and **Google Material 3 Expressive (2025–2026)** standards for touch ergonomics, safe areas, translucent materials, and haptic feedback.

---

## 1. Cross-Platform Mobile Ergonomics Matrix (iOS 18 HIG vs Material 3 Expressive)

| Ergonomic Dimension | Apple iOS 18 HIG Standard | Android Material 3 Expressive | Mobile Web / PWA CSS Equivalent |
|:--------------------|:--------------------------|:------------------------------|:--------------------------------|
| **Minimum Touch Target** | **`44 × 44 pt`** minimum hit area | **`48 × 48 dp`** minimum hit area (`8dp` gap) | `min-h-11 min-w-11` (`44px`) or `min-h-12` (`48px`) |
| **Primary Navigation Zone** | Bottom Tab Bar (`49pt` + bottom safe area, max 5 tabs) | Navigation Bar (`80dp` height) or Floating Pill Bar | Fixed bottom bar with `pb-[env(safe-area-inset-bottom)]` |
| **Surface Materiality** | **UltraThinMaterial / Chrome Blur** (`backdrop-filter: blur(24px) saturate(180%)`) | **Tonal Surface Containers** (`SurfaceContainerLowest` → `Highest`) + Dynamic Color | OKLCH tonal surfaces + `backdrop-blur-xl backdrop-saturate-150` |
| **Motion & Shape Language** | Continuous squircle corners (`cornerCurve = .continuous`) + fluid spring sheets | **M3 Expressive Spatial & Effects Springs** + shape morphing (`16dp → 28dp` on press) | `rounded-2xl` + spring physics (`stiffness: 380, damping: 30`) |
| **Input Font Size Floor** | `>= 17pt` (`Body` dynamic type) | `>= 16sp` (`Body Large`) | **MANDATORY `font-size: 16px` (`text-base`)** to prevent iOS Safari auto-zoom! |

---

## 2. Production Mobile Web, PWA & Hybrid Code Patterns

### Pattern A — Viewport, Safe-Area Insets & iOS Auto-Zoom Prevention

1. **Viewport Meta Tag**: Always include `viewport-fit=cover` so backgrounds extend cleanly behind the iOS Dynamic Island and Home Indicator:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
   ```
2. **Never Use `user-scalable=no` or `maximum-scale=1`**: Blocking pinch-to-zoom violates WCAG 2.2 AA (`1.4.4 Resize Text`). Instead, prevent iOS Safari's jarring input focus zoom by enforcing `font-size >= 16px` (`1rem`) on all `<input>`, `<select>`, and `<textarea>` elements:

```css
/* src/styles/mobile-ergonomics.css */
@layer base {
  html {
    -webkit-tap-highlight-color: transparent;
    -webkit-text-size-adjust: 100%;
  }

  /* Prevent iOS Safari auto-zoom on input focus without breaking pinch-to-zoom */
  input,
  select,
  textarea {
    font-size: max(16px, 1rem);
  }

  /* Safe-area utility classes for Dynamic Island & Home Indicator */
  .pt-safe {
    padding-top: max(1rem, env(safe-area-inset-top));
  }
  .pb-safe {
    padding-bottom: max(1rem, env(safe-area-inset-bottom));
  }
  .px-safe {
    padding-left: max(1rem, env(safe-area-inset-left));
    padding-right: max(1rem, env(safe-area-inset-right));
  }
}
```

### Pattern B — Thumb-Zone Bottom Navigation Bar with Haptic Choreography

75% of mobile interactions are one-handed thumb gestures. Place primary navigation and primary floating actions in the **Natural Thumb Zone (bottom 35% of the viewport)**, never in a top-left hamburger menu:

```tsx
// src/components/mobile/MobileBottomTabBar.tsx
'use client';

import type { ReactNode } from 'react';

export interface MobileTabSpec {
  id: string;
  label: string;
  icon: ReactNode;
  badgeCount?: number;
}

/** Cross-platform subtle haptic pulse (Capacitor / React Native WebView / Web Vibration fallback) */
export function triggerTactileHaptic(intensity: 'light' | 'medium' | 'success' = 'light'): void {
  if (typeof window === 'undefined' || !('navigator' in window)) return;
  if ('vibrate' in navigator) {
    const duration = intensity === 'light' ? 8 : intensity === 'medium' ? 15 : [10, 30, 12];
    navigator.vibrate(duration);
  }
}

export function MobileBottomTabBar({
  tabs,
  activeTabId,
  onSelectTab,
}: {
  tabs: readonly MobileTabSpec[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
}) {
  return (
    <nav
      aria-label="Primary Mobile Navigation"
      className={[
        'fixed inset-x-0 bottom-0 z-40 md:hidden',
        'border-t border-[var(--border-hairline)]',
        /* iOS 18 HIG translucent chrome material */
        'bg-[var(--surface-overlay)] backdrop-blur-xl backdrop-saturate-180',
        'pb-[env(safe-area-inset-bottom)]',
      ].join(' ')}
    >
      <ul className="mx-auto grid max-w-md grid-cols-4 items-center px-2 pt-1.5">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <li key={tab.id} className="flex justify-center">
              <button
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => {
                  triggerTactileHaptic('light');
                  onSelectTab(tab.id);
                }}
                /* Enforces >= 48x48px touch target & touch-manipulation (0ms tap delay) */
                className={[
                  'relative flex min-h-12 min-w-14 flex-col items-center justify-center gap-1 rounded-xl px-3 py-1',
                  'touch-manipulation select-none transition-transform active:scale-95',
                  isActive ? 'text-[var(--primary)] font-semibold' : 'text-[var(--text-muted)]',
                ].join(' ')}
              >
                {/* Material 3 Expressive active pill indicator */}
                <span
                  className={[
                    'flex h-7 w-12 items-center justify-center rounded-full transition-colors duration-200',
                    isActive ? 'bg-[var(--primary-subtle)]' : 'bg-transparent',
                  ].join(' ')}
                >
                  {tab.icon}
                </span>
                <span className="text-[11px] leading-none tracking-tight">{tab.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
```

---

## 3. Haptic Choreography Guidelines (Do Not Over-Vibrate)

| User Event | iOS UIFeedbackGenerator / Expo Haptics | Android `HapticFeedbackConstants` | Rule |
|:-----------|:---------------------------------------|:----------------------------------|:-----|
| **Tab Switch / Toggle / Picker Tick** | `UIImpactFeedbackGenerator(.light)` / `selectionAsync()` | `CLOCK_TICK` / `SEGMENT_TICK` | Crisp micro-tick; never use heavy vibration |
| **Primary CTA Commit / Pull-to-Refresh Threshold** | `UIImpactFeedbackGenerator(.medium)` | `CONFIRM` / `CONTEXT_CLICK` | Fire exactly at threshold crossing |
| **Payment Success / Task Completed** | `UINotificationFeedbackGenerator(.success)` | `CONFIRM` | Pair with visual checkmark morph |
| **Form Validation Error / Destructive Reject** | `UINotificationFeedbackGenerator(.error)` | `REJECT` | Pair with `6px` horizontal shake animation |

---

## 4. Mobile Anti-Patterns & Verification Checklist

- [ ] **Touch Target Floor**: Does every interactive icon button, chip, and close button have a `>= 44×44px` (`48×48dp` preferred) hit box (using invisible `after:absolute after:-inset-2` hit expansion when the visual icon is `20px`)?
- [ ] **No iOS Input Zoom**: Are all `<input>`, `<textarea>`, and `<select>` fields styled with `font-size >= 16px` (`text-base` on mobile, `md:text-sm` on desktop)?
- [ ] **Dynamic Viewport & Safe Areas**: Are full-screen views using `min-h-dvh` (never `100vh`) and respecting `env(safe-area-inset-top)` / `env(safe-area-inset-bottom)`?
- [ ] **Hover-Gate Protection**: Are hover styles gated behind `@media (hover: hover) and (pointer: fine)` so touch taps never get stuck in a sticky `:hover` state?
