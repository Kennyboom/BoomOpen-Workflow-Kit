---
name: wcag-22-accessibility-ergonomics
description: Complete WCAG 2.2 AA/AAA engineering guide covering all 9 new WCAG 2.2 criteria (2.4.11 Focus Not Obscured, 2.5.7 Dragging Movements, 2.5.8 Target Size Minimum 24x24px, 3.3.8 Accessible Authentication), WAI-ARIA APG keyboard matrices, and focus management.
version: "2.0.0"
category: "design"
domain: "design"
tags: ["wcag-22", "accessibility", "a11y", "aria", "focus-management", "target-size", "keyboard-navigation"]
---

# WCAG 2.2 AA/AAA Accessibility & Interaction Ergonomics Engineering

## 1. When to Use This Skill
Use this skill whenever designing, implementing, or reviewing **web and mobile UI components, forms, modals, drag-and-drop boards, sticky headers, or authentication flows** to guarantee full **WCAG 2.2 Level AA** compliance (now mandatory under the European Accessibility Act [EAA] and ADA Title II).

---

## 2. The 9 New WCAG 2.2 Criteria — Engineering Implementation Matrix

| Criterion | Level | Requirement Summary | Mandatory Engineering Fix |
|:----------|:-----:|:--------------------|:--------------------------|
| **2.4.11 Focus Not Obscured (Minimum)** | **AA** | Focused element must not be completely hidden by sticky headers, footers, or cookie banners when tabbed to | Set `scroll-padding-top` and `scroll-padding-bottom` on `html` equal to sticky header/footer heights |
| **2.4.12 Focus Not Obscured (Enhanced)** | AAA | No part of the focused element is hidden by author-created sticky overlays | Avoid floating toolbars over scrollable form inputs |
| **2.4.13 Focus Appearance** | AAA | Focus indicator is at least `2px` thick with `>= 3:1` contrast change between focused and unfocused states | Use `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400` |
| **2.5.7 Dragging Movements** | **AA** | Any action that uses drag-and-drop (Kanban cards, sliders, sortable lists) MUST have a single-pointer (click/tap) alternative | Add `Move Up / Move Down / Move to Column` action menu buttons or stepper buttons alongside drag handles |
| **2.5.8 Target Size (Minimum)** | **AA** | Interactive pointer targets must be at least **`24x24 CSS pixels`** (or have a `24px` spacing circle around their center); **`44x44pt`** on mobile touch | Enforce `min-h-6 min-w-6` (`>= 24px`) on web compact icon buttons (`min-h-11 min-w-11` on touch) or expand hit-area via `::after` |
| **3.2.6 Consistent Help** | **A** | Help mechanisms (chat widget, support link, FAQ) appear in the same relative DOM order across pages | Mount help trigger in the shared root application shell |
| **3.3.7 Redundant Entry** | **A** | Never ask users to re-type information already entered in the same multi-step session | Auto-populate shipping/billing fields and persist wizard state |
| **3.3.8 Accessible Authentication (Min)** | **AA** | Never block paste in password/OTP fields; support password managers (`autocomplete="current-password"`, `one-time-code`) and Passkeys | Never attach `onPaste={(e) => e.preventDefault()}` on auth inputs; avoid cognitive puzzle CAPTCHAs |
| **3.3.9 Accessible Authentication (Enh)** | AAA | No object-recognition CAPTCHAs ("click all traffic lights") | Use WebAuthn/Passkeys, magic links, or non-interactive turnstiles |

---

## 3. CSS Engineering for `2.4.11 Focus Not Obscured` & `2.5.8 Target Size`

```css
:root {
  --sticky-header-height: 4rem;   /* 64px */
  --sticky-footer-height: 3.5rem; /* 56px */
}

/* WCAG 2.4.11: Prevent sticky headers/footers from covering tabbed elements */
html {
  scroll-padding-top: calc(var(--sticky-header-height) + 1rem);
  scroll-padding-bottom: calc(var(--sticky-footer-height) + 1rem);
}

/* WCAG 2.4.7 & 2.4.13: High-visibility dual-ring keyboard focus indicator */
:focus-visible {
  outline: 2px solid oklch(0.75 0.16 220);
  outline-offset: 2px;
}

/* WCAG 2.5.8: Invisible Hit-Area Expansion for compact 16px visual icons -> 28x28px hit target */
.hit-target-24 {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5rem;  /* 24px */
  min-height: 1.5rem; /* 24px */
}

.hit-target-24::after {
  content: "";
  position: absolute;
  inset: -4px;
}
```

---

## 4. WCAG 2.5.7 Single-Pointer Alternative for Sortable / Kanban Items

Every draggable item MUST expose both keyboard reordering (`Space` / `ArrowUp` / `ArrowDown`) AND a single-pointer click alternative (`Move Up` / `Move Down`) so users with motor impairments never have to hold-and-drag:

```tsx
import React from 'react';

export interface AccessibleSortableCardProps {
  id: string;
  title: string;
  index: number;
  totalCount: number;
  onMove: (fromIndex: number, toIndex: number) => void;
}

export function AccessibleSortableCard({
  title,
  index,
  totalCount,
  onMove,
}: AccessibleSortableCardProps) {
  const canMoveUp = index > 0;
  const canMoveDown = index < totalCount - 1;

  return (
    <div
      role="listitem"
      className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-900 p-3"
    >
      <span className="text-sm font-medium text-slate-100">{title}</span>
      {/* WCAG 2.5.7 Single-Pointer Alternative + WCAG 2.5.8 >= 24x24px targets */}
      <div className="flex items-center gap-1" role="group" aria-label={`Reorder ${title}`}>
        <button
          type="button"
          disabled={!canMoveUp}
          onClick={() => onMove(index, index - 1)}
          aria-label={`Move ${title} up`}
          className="hit-target-24 rounded border border-slate-700 px-2 py-1 text-xs text-slate-200 disabled:opacity-40"
        >
          ↑
        </button>
        <button
          type="button"
          disabled={!canMoveDown}
          onClick={() => onMove(index, index + 1)}
          aria-label={`Move ${title} down`}
          className="hit-target-24 rounded border border-slate-700 px-2 py-1 text-xs text-slate-200 disabled:opacity-40"
        >
          ↓
        </button>
      </div>
    </div>
  );
}
```

---

## 5. WCAG 3.3.8 Accessible Authentication & OTP Input Pattern

Never split a 6-digit OTP into 6 unlinked `<input>` boxes that break password manager paste, or ensure `onPaste` distributes digits automatically while supporting `autocomplete="one-time-code"`:

```tsx
import React from 'react';

export function AccessibleAuthForm({ onSubmit }: { onSubmit: (email: string, code: string) => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        onSubmit(String(formData.get('email') ?? ''), String(formData.get('otp') ?? ''));
      }}
      className="space-y-4"
    >
      <div>
        <label htmlFor="auth-email" className="block text-sm font-medium text-slate-200">
          Work Email
        </label>
        <input
          id="auth-email"
          name="email"
          type="email"
          autoComplete="username webauthn"
          required
          className="mt-1 w-full min-h-10 rounded-lg border border-slate-700 bg-slate-900 px-3 text-sm text-white"
        />
      </div>
      <div>
        <label htmlFor="auth-otp" className="block text-sm font-medium text-slate-200">
          6-Digit Verification Code (Paste supported)
        </label>
        <input
          id="auth-otp"
          name="otp"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9]{6}"
          maxLength={6}
          required
          className="mt-1 w-full min-h-10 rounded-lg border border-slate-700 bg-slate-900 px-3 font-mono text-base tracking-widest text-white"
        />
      </div>
      <button
        type="submit"
        className="w-full min-h-10 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        Sign In Securely
      </button>
    </form>
  );
}
```

---

## 6. Anti-Patterns to Avoid
- ❌ **`outline: none` Without a High-Contrast `:focus-visible` Replacement**: Immediately fails WCAG 2.4.7 and 2.4.13.
- ❌ **`16x16px` Tightly-Packed Icon Buttons (`gap-0.5`)**: Fails WCAG 2.5.8 (`< 24x24px` target size and spacing).
- ❌ **Blocking Paste (`onPaste={e => e.preventDefault()}`) on Password / Confirm Email Fields**: Directly violates WCAG 3.3.8.

---

## 7. Verification Checklist
- [ ] `html` sets `scroll-padding-top` / `scroll-padding-bottom` matching any sticky bars (WCAG 2.4.11).
- [ ] All drag-and-drop interactions provide single-click/tap reorder buttons (WCAG 2.5.7).
- [ ] Every interactive control measures `>= 24x24px` on web (`>= 44x44pt` on mobile touch) (WCAG 2.5.8).
- [ ] Auth forms allow paste and declare `autoComplete="username"`, `"current-password"`, or `"one-time-code"` (WCAG 3.3.8).
