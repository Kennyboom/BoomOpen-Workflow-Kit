---
name: oklch-bento-grid-architecture
description: "OKLCH perceptual color systems and responsive Bento Grid architecture — OKLCH surface elevation hierarchy, CSS Relative Color Syntax dynamic tokens, asymmetric CSS Grid Bento layouts, and component-level @container queries."
version: "2.0.0"
category: "design"
tags: ["oklch", "color-system", "bento-grid", "css-grid", "container-queries", "dark-mode", "design-tokens"]
---

# OKLCH Perceptual Color Systems & Responsive Bento Grid Architecture

> **PURPOSE**: Build mathematically harmonious light/dark color systems using **OKLCH (`oklch(L C H / alpha)`)** with **CSS Relative Color Syntax**, and structure complex feature showcases and dashboards with **Asymmetric CSS Grid Bento Layouts** and **Component-Level `@container` Queries**.

---

## 1. Why OKLCH Replaces Hex & HSL in 2026

In legacy `hsl()`, changing the hue from Blue (`250`) to Yellow (`90`) at `50%` lightness causes a massive jump in perceived brightness, breaking contrast ratios across theme variants. **OKLCH (`L` = Perceptual Lightness `0..1`, `C` = Chroma `0..0.37`, `H` = Hue `0..360`)** guarantees uniform perceived luminance:
- Any two colors with `L = 0.65` and `L = 0.15` have the **exact same WCAG 2.2 contrast ratio** regardless of Hue (`H`).
- Dark mode surface elevation is achieved by stepping **Lightness (`L`)** in controlled increments (`0.12 → 0.155 → 0.19 → 0.23`) rather than stacking muddy black drop shadows.

### Dark & Light Surface Elevation Ladder

| Surface Tier | Role | Dark Mode Token (`oklch`) | Light Mode Token (`oklch`) | Border Treatment |
|:-------------|:-----|:--------------------------|:---------------------------|:-----------------|
| **Tier 0: `--surface-canvas`** | Page background behind all content | `oklch(0.12 0.01 260)` | `oklch(0.975 0.005 85)` | None |
| **Tier 1: `--surface-card`** | Primary Bento cells, panels, tables | `oklch(0.155 0.012 260)` | `oklch(1.00 0 0)` | `1px solid oklch(1 0 0 / 0.07)` (Dark) / `oklch(0 0 0 / 0.08)` (Light) |
| **Tier 2: `--surface-elevated`** | Interactive sub-cards, code blocks, hover states | `oklch(0.19 0.014 260)` | `oklch(0.955 0.007 85)` | `1px solid oklch(1 0 0 / 0.11)` |
| **Tier 3: `--surface-overlay`** | Command palettes (`cmdk`), popovers, modals | `oklch(0.225 0.016 260 / 0.88)` + `backdrop-filter: blur(16px)` | `oklch(1.00 0 0 / 0.92)` + `backdrop-filter: blur(16px)` | `1px solid oklch(1 0 0 / 0.16)` |

---

## 2. Production CSS & React Patterns

### Pattern A — OKLCH Token Engine + CSS Relative Color Syntax

```css
/* src/styles/oklch-tokens.css */
:root {
  --brand-hue: 255;
  --accent-hue: 162;

  /* Light Mode Surface Ladder */
  --surface-canvas: oklch(0.975 0.005 var(--brand-hue));
  --surface-card: oklch(1 0 0);
  --surface-elevated: oklch(0.952 0.008 var(--brand-hue));
  --surface-overlay: oklch(1 0 0 / 0.9);

  --text-primary: oklch(0.16 0.015 var(--brand-hue));
  --text-secondary: oklch(0.44 0.015 var(--brand-hue));
  --text-muted: oklch(0.58 0.012 var(--brand-hue));

  --primary: oklch(0.52 0.19 var(--brand-hue));
  /* CSS Relative Color Syntax: auto-compute hover, subtle badge bg, and focus ring! */
  --primary-hover: oklch(from var(--primary) calc(l - 0.06) c h);
  --primary-subtle: oklch(from var(--primary) l c h / 0.12);
  --primary-border: oklch(from var(--primary) calc(l + 0.1) c h / 0.28);

  --border-hairline: oklch(0.16 0.015 var(--brand-hue) / 0.09);
}

.dark {
  /* Dark Mode Surface Ladder — stepped L (0.12 -> 0.155 -> 0.19 -> 0.225) */
  --surface-canvas: oklch(0.12 0.012 var(--brand-hue));
  --surface-card: oklch(0.155 0.014 var(--brand-hue));
  --surface-elevated: oklch(0.19 0.016 var(--brand-hue));
  --surface-overlay: oklch(0.225 0.018 var(--brand-hue) / 0.88);

  --text-primary: oklch(0.96 0.006 var(--brand-hue));
  --text-secondary: oklch(0.73 0.012 var(--brand-hue));
  --text-muted: oklch(0.56 0.012 var(--brand-hue));

  --primary: oklch(0.68 0.18 var(--brand-hue));
  --primary-hover: oklch(from var(--primary) calc(l + 0.06) c h);
  --primary-subtle: oklch(from var(--primary) l c h / 0.15);
  --primary-border: oklch(from var(--primary) calc(l + 0.12) c h / 0.32);

  --border-hairline: oklch(1 0 0 / 0.08);
}
```

### Pattern B — Asymmetric 12-Column Bento Grid with `@container` Queries

Never use equal `1fr 1fr 1fr` cells for a Bento Grid. Combine a **12-column desktop grid** (`grid-auto-rows: minmax(220px, auto)`, `grid-auto-flow: dense`) with `@container` queries inside each cell so internal layouts adapt to the cell's own width (`col-span-8` vs `col-span-4`):

```tsx
// src/components/bento/BentoShowcaseGrid.tsx
import type { ReactNode } from 'react';

export interface BentoCellSpec {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  /** Desktop span preset: hero (8x2), wide (7x1),companion (5x1), standard (4x1) */
  spanVariant: 'hero' | 'wide' | 'companion' | 'standard';
  visualSlot: ReactNode;
}

const SPAN_CLASSES: Record<BentoCellSpec['spanVariant'], string> = {
  hero: 'md:col-span-6 lg:col-span-8 lg:row-span-2',
  wide: 'md:col-span-6 lg:col-span-7',
  companion: 'md:col-span-6 lg:col-span-5',
  standard: 'md:col-span-3 lg:col-span-4',
};

export function BentoShowcaseGrid({ cells }: { cells: BentoCellSpec[] }) {
  return (
    <section
      aria-label="Architecture Capabilities"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12 lg:grid-flow-dense lg:auto-rows-[minmax(240px,auto)]">
        {cells.map((cell) => (
          <article
            key={cell.id}
            className={[
              '@container group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6',
              'bg-[var(--surface-card)] text-[var(--text-primary)]',
              'border border-[var(--border-hairline)]',
              'shadow-[inset_0_1px_0_0_oklch(1_0_0/0.06)]',
              SPAN_CLASSES[cell.spanVariant],
            ].join(' ')}
          >
            {/* Container query: switches from stacked vertical to 2-column split when cell >= 520px wide */}
            <div className="flex h-full flex-col justify-between gap-6 @min-[520px]:flex-row @min-[520px]:items-center">
              <div className="max-w-md space-y-2">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--primary)]">
                  {cell.eyebrow}
                </span>
                <h3 className="text-xl font-semibold tracking-tight @min-[520px]:text-2xl">
                  {cell.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {cell.description}
                </p>
              </div>

              <div className="relative flex-1 rounded-xl bg-[var(--surface-elevated)] p-4 border border-[var(--border-hairline)]">
                {cell.visualSlot}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
```

---

## 3. Bento Grid & Color Anti-Patterns

| Anti-Pattern | Symptom | Fix |
|:-------------|:--------|:----|
| **Orphan Bento Cells at `md` Breakpoint** | 5 cards in a `md:grid-cols-2` leave a half-empty bottom row | Assign explicit `md:col-span-6` (full width on tablet) to the 5th cell or use `grid-flow-dense` |
| **Pure `#000000` Canvas with Pure `#FFFFFF` Text** | Causes halation (visual vibration/astigmatism blur) on OLED screens | Use `oklch(0.12 0.012 260)` canvas and `oklch(0.96 0.006 260)` text (`~15.8:1` contrast without halation) |
| **Desaturating Colors via `opacity: 0.4` on Text** | Background bleed destroys WCAG contrast over textured cards | Compute explicit OKLCH lightness tokens (`--text-secondary`, `--text-muted`) with verified contrast |
| **Viewport Media Queries Inside Reusable Cards** | Card breaks when placed inside a narrow sidebar vs main canvas | Always add `@container` to the card wrapper and use `@sm:` / `@min-[520px]:` container queries |

---

## 4. Verification Checklist

- [ ] **Surface Ladder**: Does Dark Mode step `L` (`0.12 → 0.155 → 0.19 → 0.225`) instead of relying on black drop shadows?
- [ ] **Relative Color Tokens**: Are hover/subtle states derived cleanly via `oklch(from var(--primary) ...)`?
- [ ] **Zero Orphan Cells**: Do all Bento rows sum to `12` columns on `lg` and `6` columns on `md` without ragged gaps?
- [ ] **Container Queries**: Do wide Bento cells (`hero` / `wide`) adapt their internal layout via `@container`?
