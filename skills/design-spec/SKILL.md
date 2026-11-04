---
name: design-spec
description: How to author a DESIGN.md file — the machine-readable design-token + human-rationale format that must exist before any UI is built. Supports OKLCH perceptual color tokens + sRGB hex, surface_elevation ladders, motion spring tokens, typography, spacing, rounded, components, and WCAG 2.2 AA guardrails.
when_to_use: "BEFORE writing any UI code (web or mobile). Read when creating or updating a project's DESIGN.md, defining design tokens, or when a UI task needs a design source-of-truth. Pair with frontend-design, anti-ai-slop-visual-craft, and oklch-bento-grid-architecture."
allowed-tools: Read, Write, Edit, Glob, Grep
version: 2.0.0
---

# DESIGN.md Specification (v2.0 — OKLCH, Surface Elevation & WCAG 2.2 AA)

> A `DESIGN.md` is the **single source of truth** for a project's visual language. Create it BEFORE building UI.
> Two layers: machine-readable **design tokens** (YAML front matter) + human-readable **rationale** (markdown body).
> Tokens are normative; prose gives context. Prose may use descriptive names ("Midnight Forest Green") that map to systematic token names (`primary`).
>
> _Format adapted from the [DESIGN.md spec](https://github.com/google-labs-code/design.md) (Google Labs, Apache-2.0) and W3C Design Tokens Community Group (DTCG) 2025/2026 standards._
>
> 📚 **Reference library:** [collection.md](collection.md) — 70+ real-world `DESIGN.md` files (Airbnb, Stripe, Linear, Vercel, Apple…) to study or adapt as a starting point.

---

## When to produce a DESIGN.md

This is a **hard gate** for UI work: before writing components, pages, or styles, a `DESIGN.md` must exist at the project root (or in `<appDataDir>\brain\<conversation-id>\DESIGN-{feature}.md` during Mode B orchestration). If absent, create it first from the brief; if present, read it and conform.

The token block converts cleanly to/from W3C DTCG `tokens.json`, Figma variables, and Tailwind CSS v4 `@theme` config — bridging design intent and code.

---

## 1. File structure

```markdown
---
<YAML token front matter>
---

# Project Name (optional title)

## Overview
## Colors & Surface Elevation
## Typography
## Layout & Bento Architecture
## Elevation, Borders & Specular Depth
## Motion & Interaction Physics
## Shapes
## Components
## Accessibility (WCAG 2.2 AA) & Do's and Don'ts
```

Front matter MUST begin and end with a line containing exactly `---`. Sections use `##` headings, appear in the order above, and may be omitted if irrelevant. Domain-specific sections may be added.

---

## 2. Token schema (YAML front matter — 2026 OKLCH + Hex Dual Support)

```yaml
version: "2.0"
name: Linear Technical Dark
archetype: linear-technical-dark   # swiss-editorial | linear-technical-dark | luxury-minimal | tactile-neo-brutalist
colors:
  primary: "oklch(0.68 0.18 255)"  # OKLCH preferred (or "#RRGGBB" sRGB hex)
  primary-hover: "oklch(from var(--primary) calc(l + 0.06) c h)"
  accent: "oklch(0.74 0.17 162)"
  error: "oklch(0.64 0.21 25)"
surface_elevation:
  canvas: "oklch(0.12 0.012 260)"
  card: "oklch(0.155 0.014 260)"
  elevated: "oklch(0.19 0.016 260)"
  overlay: "oklch(0.225 0.018 260 / 0.88)"
  border-hairline: "oklch(1 0 0 / 0.08)"
  specular-top: "inset 0 1px 0 0 oklch(1 0 0 / 0.07)"
typography:
  display-xl:
    fontFamily: Instrument Serif
    fontSize: "clamp(2.5rem, 4.5vw + 1rem, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: -0.028em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  metric-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: 500
    fontFeature: "'tnum' 1, 'zero' 1"
motion:
  spring-snappy: "{ stiffness: 420, damping: 32, mass: 0.8 }"
  spring-spatial: "{ stiffness: 300, damping: 28, mass: 1.0 }"
  ease-out-expo: "cubic-bezier(0.16, 1, 0.3, 1)"
  duration-fast: 160ms
  duration-normal: 220ms
rounded:
  sm: 6px
  md: 10px
  lg: 16px
  xl: 24px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
    minTargetSize: 44px
```

---

## 3. Type system

| Type | Accepted Formats | Example |
|------|------------------|---------|
| **Color** | `oklch(L C H [/ alpha])`, CSS Relative Color `oklch(from ...)`, or `#RRGGBB` sRGB hex | `"oklch(0.68 0.18 255)"`, `"#1A1C1E"` |
| **Surface Elevation** | Stepped OKLCH lightness ladder (`canvas` → `card` → `elevated` → `overlay`) | `"oklch(0.155 0.014 260)"` |
| **Dimension** | Number + unit (`px`/`em`/`rem`/`ch`/`dvh`) or fluid `clamp(...)` | `48px`, `clamp(2rem, 4vw, 3.5rem)` |
| **Motion** | Spring config (`stiffness`, `damping`, `mass`) or cubic-bezier + duration | `"{ stiffness: 420, damping: 32, mass: 0.8 }"` |
| **Token Reference** | `{path.to.token}` | `{colors.primary}`, `{surface_elevation.card}` |
| **Typography** | Composite object (`fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`, `fontFeature`) | See §2 |

**Tabular Numerals Mandate:** Any token used for metrics, prices, latencies, timers, or table columns MUST set `fontFeature: "'tnum' 1"` (`font-variant-numeric: tabular-nums`).

---

## 4. Sections (canonical order)

| # | Section | Purpose |
|---|---------|---------|
| 1 | **Overview** | Aesthetic archetype (`Swiss Editorial`, `Linear Technical Dark`, `Luxury Minimal`, `Tactile Neo-Brutalist`), brand personality, audience, and emotional tone. |
| 2 | **Colors & Surface Elevation** | OKLCH or Hex palette + 4-tier surface elevation ladder (`canvas`, `card`, `elevated`, `overlay`). |
| 3 | **Typography** | 3-Axis font pairing (`Display` + `UI Sans` + `Tabular Mono`), fluid `clamp()` scale, and `45ch–68ch` reading width constraints. |
| 4 | **Layout & Bento Architecture** | 12-column asymmetric Bento grid rules, `@container` query breakpoints, and `min-h-dvh` viewport rules. |
| 5 | **Elevation, Borders & Specular Depth** | `1px` hairline borders, top inner specular highlight (`inset 0 1px 0 0 oklch(1 0 0 / 0.07)`), or tonal layering. |
| 6 | **Motion & Interaction Physics** | View Transitions API, CSS `@starting-style` / `scroll()`, `motion/react` spring parameters, and `prefers-reduced-motion` behavior. |
| 7 | **Shapes** | Concentric border radius math (`R_outer = R_inner + Padding`) and corner treatment. |
| 8 | **Components** | Per-atom guidance: Buttons, Inputs (`>= 16px` mobile font floor), Command Palette (`cmdk`), `<ResponsiveModal>` (`vaul` + Radix), Toasts (`sonner`). |
| 9 | **Accessibility (WCAG 2.2 AA) & Do's and Don'ts** | Contrast (`4.5:1` text, `3:1` UI), target size (`>= 24×24px` WCAG 2.2 AA floor, `>= 44×44pt` mobile), Focus Not Obscured (`2.4.11`), and explicit Anti-AI-Slop guardrails. |

---

## 5. Consumer behavior for unknown content

| Scenario | Behavior |
|----------|----------|
| Unknown section heading (`## Iconography`) | Preserve; do not error |
| Unknown color token (`oklch(...)` or `#RRGGBB`) | Accept if valid CSS color |
| Unknown typography / motion / surface token | Accept and map to CSS custom property |
| **Duplicate section heading** (two `## Colors`) | **Error; reject the file** |

---

## 6. Minimal 2026 example

```markdown
---
version: "2.0"
name: Calm Clinical Scheduler
archetype: swiss-editorial
colors:
  primary: "oklch(0.22 0.02 255)"
  accent: "oklch(0.56 0.18 32)"
  neutral: "oklch(0.975 0.006 85)"
surface_elevation:
  canvas: "oklch(0.975 0.006 85)"
  card: "oklch(1 0 0)"
  elevated: "oklch(0.95 0.008 85)"
  border-hairline: "oklch(0.22 0.02 255 / 0.1)"
typography:
  h1: { fontFamily: Instrument Serif, fontSize: "clamp(2.25rem, 3.5vw, 3.5rem)", fontWeight: 600, lineHeight: 1.08 }
  body-md: { fontFamily: Plus Jakarta Sans, fontSize: 16px, fontWeight: 400, lineHeight: 1.6 }
  metric: { fontFamily: JetBrains Mono, fontSize: 14px, fontWeight: 500, fontFeature: "'tnum' 1" }
motion:
  spring-snappy: "{ stiffness: 420, damping: 32, mass: 0.8 }"
rounded: { sm: 6px, md: 12px, lg: 20px }
spacing: { sm: 8px, md: 16px, lg: 32px }
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    rounded: "{rounded.md}"
    padding: "10px 18px"
---

# Calm Clinical Scheduler

## Overview
A calm, high-craft Swiss Editorial interface for a healthcare scheduling platform.
Accessibility-first (WCAG 2.2 AA): crisp contrast, zero neon gradients, generous 44px touch targets.

## Colors & Surface Elevation
- **Primary (`oklch(0.22 0.02 255)`):** Deep slate ink for headlines and primary text.
- **Accent (`oklch(0.56 0.18 32)`):** Warm terracotta used strictly for the single primary CTA per view.
- **Canvas (`oklch(0.975 0.006 85)`):** Warm limestone paper foundation that eliminates clinical eye strain.

## Accessibility (WCAG 2.2 AA) & Do's and Don'ts
- **Do** use `font-variant-numeric: tabular-nums` on all appointment times and patient queues.
- **Do** maintain WCAG 2.2 AA contrast (`>= 4.5:1` for body text, `>= 3:1` for borders/icons) and `>= 44×44px` mobile hit targets.
- **Don't** use generic `#6366f1 -> #a855f7` purple gradients, 3 equal cards in a row, or `< 16px` form inputs on mobile.
```

---

## Workflow

1. Read the brief and select a visual archetype (see `anti-ai-slop-visual-craft` and `frontend-design`).
2. **ALWAYS read [collection.md](collection.md) first** — 70+ real-world `DESIGN.md` files. Find the 1–2 closest in vibe/industry to the brief and study how they structure tokens. Adapt, never blindly copy.
3. **Write `DESIGN.md`** — YAML tokens first, then rationale prose.
4. Build UI strictly against the tokens using Tailwind CSS v4 `@theme` and OKLCH custom properties (`oklch-bento-grid-architecture`).
5. Audit implementation against WCAG 2.2 AA (`wcag-22-accessibility-ergonomics`) and keep `DESIGN.md` in sync.
