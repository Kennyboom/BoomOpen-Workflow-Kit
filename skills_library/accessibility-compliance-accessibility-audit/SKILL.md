---
name: accessibility-compliance-accessibility-audit
description: End-to-end automated and manual accessibility audit playbook combining @axe-core/playwright CI gates, keyboard-only focus-trap verification, VoiceOver/NVDA screen reader matrices, and forced-colors/zoom resilience checks.
version: "2.0.0"
category: "design"
domain: "design"
tags: ["accessibility-audit", "axe-core", "playwright", "wcag-22", "screen-reader", "keyboard-testing", "eaa"]
---

# Automated & Manual Accessibility Audit Playbook (WCAG 2.2 AA & EAA)

## 1. When to Use This Skill
Use this skill when executing **accessibility audits (`/review`, `/test`, `/design:team`)**, setting up **automated CI/CD accessibility gates**, or remediating **WCAG 2.2 AA / Section 508 / European Accessibility Act (EAA)** compliance findings across web and mobile applications.

---

## 2. The 3-Layer Accessibility Audit Strategy

Automated scanners (`axe-core`, Lighthouse) catch **~40–50%** of WCAG issues (missing labels, contrast ratios, invalid ARIA attributes). The remaining **50–60%** (keyboard focus traps, illogical tab order, silent screen-reader state updates, obscured focus under sticky headers) **require deterministic interaction & manual verification**:

| Audit Layer | Tooling / Method | What It Catches |
|:------------|:-----------------|:----------------|
| **Layer 1: Automated DOM & Computed Style Gate** | `@axe-core/playwright` (`wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`) | Contrast failures, missing `<label>` / `alt` / button names, duplicate IDs, invalid ARIA roles |
| **Layer 2: Interactive Keyboard & Focus Choreography** | Playwright `page.keyboard.press('Tab')` + Manual 5-Minute Tab Audit | Broken focus traps in modals, `outline: none`, `2.4.11 Focus Obscured` behind sticky headers, `2.5.7` drag-only controls |
| **Layer 3: Assistive Technology & Visual Resilience** | VoiceOver (macOS/iOS) / NVDA (Windows), `200%–400%` Reflow Zoom, `prefers-reduced-motion`, `forced-colors: active` | Silent toast/error updates (`aria-live`), broken layout at `320px` CSS width (`1.4.10 Reflow`), motion sickness triggers |

---

## 3. Automated Playwright + `@axe-core/playwright` CI Gate (`tests/a11y.spec.ts`)

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const WCAG_22_AA_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('WCAG 2.2 AA Accessibility Gate', () => {
  test('Dashboard view has zero axe-core WCAG 2.2 AA violations in both dark and light themes', async ({
    page,
  }) => {
    await page.goto('/dashboard');

    // 1. Audit default theme
    const darkResults = await new AxeBuilder({ page })
      .withTags(WCAG_22_AA_TAGS)
      .analyze();
    expect(darkResults.violations).toEqual([]);

    // 2. Audit interactive modal open state (critical: most axe scans miss closed dialogs!)
    const createBtn = page.getByRole('button', { name: /new project/i });
    if (await createBtn.isVisible()) {
      await createBtn.click();
      const modalResults = await new AxeBuilder({ page })
        .include('[role="dialog"]')
        .withTags(WCAG_22_AA_TAGS)
        .analyze();
      expect(modalResults.violations).toEqual([]);

      // Verify Escape key closes dialog and restores focus to trigger
      await page.keyboard.press('Escape');
      await expect(createBtn).toBeFocused();
    }
  });

  test('Interactive controls meet WCAG 2.5.8 minimum 24x24px target size', async ({ page }) => {
    await page.goto('/dashboard');
    const buttons = page.locator('button:visible, a[href]:visible, input:visible');
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const box = await buttons.nth(i).boundingBox();
      if (!box) continue;
      expect(
        box.width >= 24 && box.height >= 24,
        `Control #${i} (${await buttons.nth(i).innerText()}) is ${box.width}x${box.height}px (< 24x24px)`
      ).toBe(true);
    }
  });

  test('Focused elements are not obscured by sticky headers (WCAG 2.4.11)', async ({ page }) => {
    await page.goto('/dashboard');
    const stickyHeader = page.locator('header').first();
    const headerBox = await stickyHeader.boundingBox();

    for (let step = 0; step < 15; step++) {
      await page.keyboard.press('Tab');
      const activeBox = await page.locator(':focus').boundingBox();
      if (headerBox && activeBox) {
        const isCompletelyHiddenBehindHeader =
          activeBox.y + activeBox.height <= headerBox.y + headerBox.height && activeBox.y >= headerBox.y;
        expect(isCompletelyHiddenBehindHeader).toBe(false);
      }
    }
  });
});
```

---

## 4. Accessible Skip-Link & Focus-Trap Reference Pattern (`SkipToContent.tsx`)

```tsx
import React from 'react';

export function SkipToContentLink({ targetId = 'main-content' }: { targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-indigo-600 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-indigo-400"
    >
      Skip to main content
    </a>
  );
}

export function LiveStatusRegion({
  politeMessage,
  assertiveError,
}: {
  politeMessage?: string;
  assertiveError?: string;
}) {
  return (
    <>
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {politeMessage}
      </div>
      <div role="alert" aria-live="assertive" aria-atomic="true" className="sr-only">
        {assertiveError}
      </div>
    </>
  );
}
```

---

## 5. The 5-Minute Keyboard-Only & Screen Reader Audit Protocol

Every UI view MUST pass this 7-step manual/E2E sequence without touching a mouse or trackpad:

1. **Skip-to-Main-Content Link (`WCAG 2.4.1`)**:
   - Press `Tab` once on page load. A visible **`Skip to main content`** pill must appear and pressing `Enter` must move focus directly to `<main id="main-content" tabIndex={-1}>`.
2. **Logical Focus Order & Zero Obscuration (`WCAG 2.4.3 & 2.4.11`)**:
   - Press `Tab` through the entire page top-to-bottom, left-to-right. Every interactive element must show a clear `:focus-visible` ring (`>= 3:1` contrast) and never be hidden behind a sticky header or bottom bar (`scroll-padding-top` / `scroll-padding-bottom`).
3. **Modal / Drawer Focus Lifecycle (`WAI-ARIA Dialog APG`)**:
   - Opening a dialog moves focus inside the dialog; `Tab` and `Shift+Tab` wrap cyclically inside the dialog; pressing `Escape` closes the dialog and returns focus to the exact trigger button.
4. **Roving Tabindex in Composite Widgets (`Tabs`, `Menu`, `RadioGroup`)**:
   - `Tab` enters the tablist once; `ArrowLeft` / `ArrowRight` moves between tabs; `Tab` again moves into the active `tabpanel`.
5. **Live Region Announcements (`WCAG 4.1.3 Status Messages`)**:
   - Dynamic form errors use `role="alert"` (`aria-live="assertive"`) and `aria-describedby` linked to the invalid input; background toast notifications and streaming status updates use `role="status"` (`aria-live="polite"`).
6. **400% Zoom Reflow (`WCAG 1.4.10`)**:
   - At `1280px` viewport width zoomed to `400%` (`320px` effective CSS width), content reflows into a single vertical column without requiring horizontal scrolling (except data tables/maps).
7. **Reduced Motion & Forced Colors (`WCAG 2.3.3`)**:
   - Enabling `prefers-reduced-motion: reduce` disables parallax/spring translations; enabling Windows High Contrast (`forced-colors: active`) preserves button and focus borders via `border: 1px solid transparent`.

---

## 6. Remediation Reference for Common Audit Failures

| Audit Finding | Root Cause | Canonical Fix |
|:--------------|:-----------|:--------------|
| `button-name` / `link-name` | Icon-only `<button><TrashIcon /></button>` has no accessible name | Add `aria-label="Delete project"` on `<button>` and `aria-hidden="true"` on `<svg>` |
| `color-contrast` on muted text | `text-slate-600` on `bg-slate-900` (`~2.8:1` ratio) | Upgrade to `text-slate-400` (`>= 4.8:1` on `slate-950/900`) |
| `aria-input-field-name` | `<input placeholder="Search...">` without `<label>` | Add `<label htmlFor="search" className="sr-only">Search projects</label>` |
| `heading-order` | Jumping from `<h1>` directly to `<h4>` for visual sizing | Use semantic `<h2>` with Tailwind text size classes (`text-sm font-semibold`) |
| `target-size` (`WCAG 2.5.8`) | Dense `16x16px` table action icons or pagination links | Add `min-w-6 min-h-6` (`24x24px` web) or `min-w-11 min-h-11` (`44x44px` mobile) |

---

## 7. Verification Checklist
- [ ] `@axe-core/playwright` passes with `0` violations across default, modal-open, error, and dark/light states.
- [ ] Every interactive target measures `>= 24x24px` (`>= 44x44pt` on mobile touch).
- [ ] All dialogs trap focus while open and restore focus to the trigger element on `Escape`.
- [ ] Form validation errors set `aria-invalid="true"` and link error text via `aria-describedby`.
