---
name: anti-ai-slop-visual-craft
description: "Anti-AI-Slop visual craft and art direction — Pre-Coding Aesthetic Gate (Swiss Editorial, Linear Technical Dark, Luxury Minimal, Tactile Neo-Brutalist), explicit AI-slop ban list, paired display/UI/tabular-mono typography, 1px hairline specular borders, and optical alignment."
version: "2.0.0"
category: "design"
tags: ["ui-design", "art-direction", "anti-ai-slop", "typography", "visual-craft", "css", "design-system"]
---

# Anti-AI-Slop Visual Craft & Art Direction (2026 Standard)

> **PURPOSE**: Eliminate generic, recognizable "AI-generated template" aesthetics ("AI Slop") by enforcing a mandatory **Pre-Coding Aesthetic Gate**, an explicit **Visual Ban List**, purposeful **3-Axis Typography Pairing**, **1px Specular Hairline Borders**, and **Optical Alignment Engineering**.

---

## 1. The Pre-Coding Aesthetic Gate (Mandatory Before Writing UI)

Never default to an unstyled Tailwind SaaS template. Before writing a single JSX tag or CSS rule, lock one of the **4 Canonical Aesthetic Archetypes** (or define a custom `DESIGN.md` contract):

| Archetype | Surface Palette (OKLCH) | Typography Pairing (`Display` + `UI` + `Mono`) | Border & Depth Signature | Best Fit |
|:----------|:------------------------|:-----------------------------------------------|:-------------------------|:---------|
| **1. Swiss Editorial Grid** | Warm paper `oklch(0.98 0.008 85)` + Ink `oklch(0.14 0.01 260)` + Vermilion accent `oklch(0.58 0.21 28)` | *Instrument Serif* / *Newsreader* + *Plus Jakarta Sans* + *JetBrains Mono* | Exposed `1px solid oklch(0.14 0.01 260 / 0.14)` structural hairlines, `0px`–`4px` sharp radii, zero drop shadows | Research platforms, publishing, AI knowledge tools, strategy portals |
| **2. Linear / Raycast Technical Dark** | Obsidian `oklch(0.12 0.01 265)` → Elevated `oklch(0.16 0.012 265)` + Crisp alabaster `oklch(0.96 0.005 265)` | *Geist* / *Inter Display* (`-0.03em` tracking) + *Inter* + *Geist Mono* (`tabular-nums`) | `1px` translucent border + top inner specular highlight `inset 0 1px 0 0 oklch(1 0 0 / 0.07)` | Developer tools, observability, IDE plugins, fintech terminals |
| **3. Quiet Luxury / Architectural Minimal** | Limestone `oklch(0.965 0.006 75)` + Espresso `oklch(0.20 0.015 55)` + Botanical bronze `oklch(0.48 0.09 65)` | *Cormorant Garamond* / *Playfair* + *Satoshi* / *General Sans* + *IBM Plex Mono* | Tonal surface layering without borders; generous `clamp(3rem, 7vw, 7rem)` whitespace rhythm | High-end commerce, architecture studios, executive portfolios, hospitality |
| **4. Tactile Neo-Brutalist Studio** | Bone `oklch(0.97 0.015 95)` + Carbon `#09090B` + Acid Citron `oklch(0.88 0.21 115)` or Cobalt `oklch(0.55 0.23 260)` | *Space Grotesk* / *Syne* (`700`) + *DM Sans* + *Space Mono* | Crisp `2px solid #09090B` borders + hard offset shadow `4px 4px 0px #09090B` (`translate(2px, 2px)` on active press) | Creative tooling, indie games, Web3 consumer apps, youth brands |

---

## 2. Explicit Anti-AI-Slop Ban List (Zero Tolerance)

| Banned AI-Slop Pattern | Why It Fails | Mandatory Craft Replacement |
|:-----------------------|:-------------|:----------------------------|
| **Indigo-to-Purple Gradient (`#6366f1` → `#a855f7`)** | Universal LLM default; instantly signals uncurated AI output | Use a single high-conviction OKLCH accent (`oklch(0.62 0.19 25)` ember, `oklch(0.55 0.16 165)` emerald, or monochrome ink) |
| **3 Equal Rounded Cards in a Row (`grid-cols-3 gap-6`)** | Monotonous visual rhythm; zero hierarchy across features | Use an **Asymmetric Bento Grid** (`7:5` or `8:4` split) where the primary capability spans 2 columns with an interactive preview |
| **Floating Neon Background Blobs (`blur-3xl opacity-30`)** | Muddy contrast, GPU overdraw, and dated 2021 aesthetic | Use subtle SVG noise grain (`2.5%` opacity), crisp radial grid hairlines (`background-size: 24px 24px`), or clean tonal elevation |
| **Centered Everything (`text-center` on every section)** | Destroys reading anchor and scannability for technical copy | Left-align body copy and section headers; pair a left-anchored thesis headline (`max-w-[58ch]`) with right-aligned metadata or actions |
| **Naked Lucide Icons in Colored Circles** | Every AI landing page renders `w-10 h-10 rounded-full bg-primary/10` | Replace generic icons with live micro-UI artifacts (mini sparklines, keyboard shortcut badges `<kbd>⌘K</kbd>`, or numbered `01 / 02` indices) |
| **Raw `100vh` & Untamed Line Widths** | Clips on mobile browser toolbars; stretches paragraphs to `140ch` | Always use `min-h-dvh` for full-height viewports and constrain prose strictly to `45ch–68ch` (`max-w-prose`) |
| **AI Copywriting Clichés (*"Unleash"*, *"Elevate"*, *"Next-Gen"*)** | Zero information density; erodes technical credibility | Write concrete, metric-backed engineering headlines (*"Sub-10ms hot-sync across 5 IDEs"*, *"Zero-GC 120 FPS particle pipeline"*) |

---

## 3. Production CSS & TypeScript Patterns

### Pattern A — 3-Axis Typography Scale & Mandatory `tabular-nums`

```css
/* app/styles/typography-craft.css */
@layer base {
  :root {
    --font-display: 'Instrument Serif', 'Playfair Display', Georgia, serif;
    --font-sans: 'Plus Jakarta Sans', 'Geist', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: 'JetBrains Mono', 'Geist Mono', monospace;

    /* Fluid clamp() typographic scale — smooth across 360px to 1600px viewports */
    --text-hero: clamp(2.5rem, 4.5vw + 1rem, 4.75rem);
    --text-h1: clamp(1.875rem, 2.8vw + 0.75rem, 3.25rem);
    --text-h2: clamp(1.375rem, 1.8vw + 0.6rem, 2.125rem);
    --text-body: clamp(0.975rem, 0.25vw + 0.9rem, 1.0625rem);
  }

  body {
    font-family: var(--font-sans);
    font-size: var(--text-body);
    line-height: 1.6;
    font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  h1, h2, .font-display {
    font-family: var(--font-display);
    letter-spacing: -0.028em;
    line-height: 1.08;
    text-wrap: balance;
  }

  p, li {
    text-wrap: pretty;
    max-width: 65ch;
  }

  /* MANDATORY for all metrics, prices, timers, table cells, and badges */
  .numeric-metric,
  table td,
  [data-metric="true"] {
    font-variant-numeric: tabular-nums slashed-zero;
    font-feature-settings: 'tnum' 1, 'zero' 1;
  }
}
```

### Pattern B — 1px Specular Hairline Surface & Optical Button Alignment

```tsx
// src/components/ui/CraftSurfaceCard.tsx
import type { ReactNode } from 'react';

export interface CraftSurfaceCardProps {
  indexLabel: string;
  title: string;
  metricValue: string;
  metricDelta: string;
  children: ReactNode;
}

export function CraftSurfaceCard({
  indexLabel,
  title,
  metricValue,
  metricDelta,
  children,
}: CraftSurfaceCardProps) {
  return (
    <article
      className={[
        'group relative overflow-hidden rounded-xl p-6 transition-colors duration-200',
        'bg-[oklch(0.155_0.012_265)] text-[oklch(0.96_0.005_265)]',
        /* 1px hairline border + top specular light catch (never heavy drop-shadow) */
        'border border-[oklch(1_0_0/0.08)]',
        'shadow-[inset_0_1px_0_0_oklch(1_0_0/0.07),0_1px_2px_0_oklch(0_0_0/0.45)]',
        'hover:border-[oklch(1_0_0/0.16)]',
      ].join(' ')}
    >
      <header className="flex items-baseline justify-between border-b border-[oklch(1_0_0/0.06)] pb-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs tracking-widest text-[oklch(0.65_0.015_265)]">
            {indexLabel}
          </span>
          <h3 className="text-base font-medium tracking-tight">{title}</h3>
        </div>
        <div className="flex items-baseline gap-2 font-mono tabular-nums">
          <span className="text-xl font-semibold">{metricValue}</span>
          <span className="rounded bg-[oklch(0.65_0.17_155/0.14)] px-1.5 py-0.5 text-xs text-[oklch(0.78_0.15_155)]">
            {metricDelta}
          </span>
        </div>
      </header>

      <div className="mt-4 text-sm leading-relaxed text-[oklch(0.74_0.012_265)]">
        {children}
      </div>
    </article>
  );
}
```

### Pattern C — Optical Alignment Rules (Human-Eye Calibration)

1. **Nested Border Radius Math (`R_outer = R_inner + Padding`)**:
   - Never use the same `rounded-xl` (`12px`) on both an outer card and its inner image/container with `p-2` (`8px`). Set outer radius to `rounded-2xl` (`20px`) and inner radius to `rounded-xl` (`12px`) so concentric curves remain parallel (`20px - 8px = 12px`).
2. **Asymmetric Icon-Button Padding**:
   - When a button has a leadingor trailing icon, reduce padding on the icon side by `2px–4px` (`pl-3.5 pr-4`) so optical weight centers cleanly.
3. **Play Triangle & Chevron Optical Offset**:
   - A geometric triangle inside a circle looks left-heavy; nudge play icons `translate-x-[1.5px]` toward the apex.

---

## 4. Verification & Anti-Slop Audit Checklist

- [ ] **Archetype Locked**: Is one of the 4 canonical archetypes (or project `DESIGN.md`) explicitly chosen before component coding?
- [ ] **Zero Banned Gradients**: Confirmed `0` instances of `#6366f1 -> #a855f7` or floating blurred neon blobs?
- [ ] **Tabular Numerals**: Do all counters, prices, latencies, and table columns enforce `font-variant-numeric: tabular-nums`?
- [ ] **Concentric Radii**: Do all nested cards satisfy `R_outer = R_inner + Padding`?
- [ ] **Prose & Viewport Hygiene**: Are paragraphs constrained to `45ch–68ch` (`text-wrap: pretty`) and full-screen sections using `min-h-dvh`?
