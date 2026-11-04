---
name: frontend-design
description: Design thinking, 2026 visual craft, OKLCH color architecture, 3-axis typography, spring motion, and WCAG 2.2 AA decision-making for web UI. Pair with anti-ai-slop-visual-craft and design-spec.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
version: 2.0.0
---

# Frontend Design System (v2.0 — 2026 Anti-AI-Slop & WCAG 2.2 AA Edition)

> **Philosophy:** Every pixel has purpose. Restraint is luxury. User psychology drives decisions.
> **Core Principle:** THINK, don't memorize. ASK, don't assume. Lock an Aesthetic Archetype BEFORE coding.

---

## 🎯 Selective Reading & Companion Skills Rule (MANDATORY)

| Resource / Companion Skill | Status | When to Read |
|----------------------------|--------|--------------|
| [ux-psychology.md](ux-psychology.md) | 🔴 **REQUIRED** | Always read first! |
| `anti-ai-slop-visual-craft` (`skills_library/`) | 🔴 **REQUIRED** | Pre-Coding Aesthetic Gate, Anti-Slop Ban List, 1px specular borders, optical alignment |
| `design-spec` (`skills/design-spec/SKILL.md`) | 🔴 **REQUIRED** | Authoring `DESIGN.md` with OKLCH, surface elevation & motion tokens |
| [color-system.md](color-system.md) / `oklch-bento-grid-architecture` | ⚪ Optional | OKLCH palettes, dark mode surface ladders & asymmetric Bento grids |
| [typography-system.md](typography-system.md) | ⚪ Optional | 3-axis font pairing (`Display` + `UI Sans` + `Tabular Mono`) & fluid `clamp()` scales |
| [animation-guide.md](animation-guide.md) / `motion-v12-view-transitions-css` | ⚪ Optional | View Transitions API, CSS `@starting-style`/`scroll()`, `motion/react` v12 springs |
| [visual-effects.md](visual-effects.md) / [decision-trees.md](decision-trees.md) | ⚪ Optional | Specular depth, tactile textures, context templates |

## 🔧 Runtime Audit Script

| Script | Purpose | Usage |
|--------|---------|-------|
| `scripts/ux_audit.py` | UX Psychology & WCAG 2.2 AA Audit | `python ~/.gemini/config/skills/frontend-design/scripts/ux_audit.py <project_path>` |

---

## ⚠️ CRITICAL: PRE-CODING AESTHETIC GATE & ASK BEFORE ASSUMING

> **STOP! If the user's request is open-ended, DO NOT default to generic Tailwind SaaS templates.**

### 1. When User Prompt is Vague, Ask or Propose an Archetype:
- **Aesthetic Archetype**: *Swiss Editorial Grid* (warm paper + serif + exposed `1px` hairlines), *Linear Technical Dark* (obsidian OKLCH surface ladder + top specular border), *Quiet Luxury Minimal* (tonal limestone + generous whitespace), or *Tactile Neo-Brutalist* (`2px` ink border + hard offset shadow)?
- **Color & Theme**: Light-first, Dark-first, or Adaptive OKLCH dual theme?
- **Layout Architecture**: Editorial narrative, Asymmetric 12-column Bento Grid (`7:5` / `8:4`), or Dense Workspace Workbench?

### 2. ⛔ Explicit Anti-AI-Slop Ban List (Zero Tolerance)

| AI Default Tendency | Why It Fails | 2026 Craft Replacement |
|---------------------|--------------|------------------------|
| **Purple/Indigo Gradient (`#6366f1 → #a855f7`)** | Universal LLM cliché; screams uncurated AI output | Single high-conviction OKLCH accent (`oklch(0.62 0.19 28)` ember, emerald, or monochrome ink) |
| **3 Equal Cards in a Row (`grid-cols-3 gap-6`)** | Zero visual hierarchy; boring template rhythm | Asymmetric Bento Grid (`8:4` or `7:5` split) or numbered editorial index (`01 / 02 / 03`) |
| **Floating Blurred Neon Blobs (`blur-3xl`)** | Muddy contrast, GPU overdraw, dated 2021 look | Stepped OKLCH surface elevation + `1px` hairline border with top inner specular highlight |
| **Centered Everything (`text-center` on all sections)** | Destroys scannability and reading anchor | Left-align thesis headlines (`max-w-[58ch]`) and body copy; right-align metadata/actions |
| **Naked Icons in Colored Circles** | Overused boilerplate filler | Interactive micro-UI previews, live sparklines, or `<kbd>⌘K</kbd>` shortcut badges |
| **AI Copywriting (*"Unleash"*, *"Empower"*, *"Next-Gen"*)** | Zero information density | Concrete, metric-backed copy (*"Sub-10ms hot-sync across 5 IDEs"*) |

---

## 1. Constraint & Audience Analysis (Always First)

| Constraint | Question | Design Impact |
|------------|----------|---------------|
| **Audience** | Developers, Enterprise B2B, Consumer Gen-Z, or Luxury? | Drives density, typography, and motion tempo |
| **Brand / `DESIGN.md`** | Does `DESIGN.md` or Figma variables exist? | Conform strictly to existing tokens |
| **Device Mix** | Desktop keyboard-first (`⌘K`) or Mobile thumb-zone? | Dictates `<ResponsiveModal>` (`vaul` drawer vs Radix dialog) and `44pt`/`48dp` targets |

---

## 2. UX Psychology Principles

| Law | Principle | UI Engineering Application |
|-----|-----------|----------------------------|
| **Hick's Law** | More choices = slower decisions | Progressive disclosure; move secondary actions into `⌘K` (`cmdk`) or overflow menus |
| **Fitts' Law** | Bigger + closer = faster acquisition | Keep primary CTAs in the thumb zone on mobile (`>= 44×44pt` iOS / `>= 48×48dp` Android) |
| **Miller's Law** | `5 ± 2` items in working memory | Group navigation and dashboard KPIs into chunks of `3–5` cards |
| **Von Restorff Effect** | The distinct item is remembered | Limit primary accent color (`10%` budget) to **one primary CTA per viewport** |
| **Doherty Threshold** | `< 400ms` response feels instantaneous | Use optimistic UI updates (`useOptimistic` + `sonner` Undo toast) and skeleton shimmer |

---

## 3. Layout, Viewport & Bento Grid Architecture

1. **8-Point Spatial System & Concentric Radii**:
   - Spacing uses `4px` micro-steps and `8px` structural multiples (`8, 16, 24, 32, 48, 64, 96px`).
   - **Concentric Border Radius Formula**: `R_outer = R_inner + Padding` (e.g., outer card `rounded-2xl` `20px` with `p-2` `8px` padding requires inner container `rounded-xl` `12px`).
2. **Modern CSS Viewport & Container Queries**:
   - Always use **`min-h-dvh`** (dynamic viewport height) instead of `100vh` so mobile browser chrome never clips bottom CTAs.
   - Mark reusable cards and Bento cells with **`@container`** so internal layouts switch from stacked to horizontal based on component width (`@min-[520px]:flex-row`), not global screen width.
3. **Reading Measure & Text Wrapping**:
   - Constrain body prose strictly to **`45ch–68ch`** (`max-w-prose`) with `text-wrap: pretty`, and apply `text-wrap: balance` to all headings.

---

## 4. Perceptual Color Architecture (OKLCH First)

### 60-30-10 Allocation & Dark Mode Surface Elevation

```text
60% → Canvas & Primary Surfaces (calm neutral OKLCH base)
30% → Elevated Cards, Hairline Borders & Secondary Typography
10% → High-Conviction Accent (Primary CTA, active indicators, focus rings)
```

- **Why OKLCH (`oklch(L C H / alpha)`)**: Guarantees uniform perceived lightness across hues.
- **Dark Mode by Lightness Stepping (Never Black Drop Shadows)**:
  - Canvas: `oklch(0.12 0.012 H)` → Card: `oklch(0.155 0.014 H)` → Elevated: `oklch(0.19 0.016 H)` → Overlay: `oklch(0.225 0.018 H / 0.88)`.
  - Avoid pure `#000000` backgrounds with `#FFFFFF` text (prevents OLED halation/astigmatism blur).
- **CSS Relative Color Syntax**: Derive hover and subtle states dynamically via `oklch(from var(--primary) calc(l + 0.06) c h)`.

For deep color theory: [color-system.md](color-system.md) & `oklch-bento-grid-architecture`.

---

## 5. 3-Axis Typography System & `tabular-nums`

1. **3-Axis Font Pairing**:
   - **`--font-display`**: High-character editorial serif (*Instrument Serif*, *Newsreader*) or geometric display (*Geist*, *Space Grotesk*) with tight tracking (`-0.025em` to `-0.035em`) and tight leading (`1.06–1.15`).
   - **`--font-sans`**: Neutral, high-x-height UI sans (*Plus Jakarta Sans*, *Inter*, *Satoshi*) with `1.5–1.65` line height and `>= 16px` mobile input font size (prevents iOS Safari auto-zoom).
   - **`--font-mono`**: Technical monospace (*JetBrains Mono*, *Geist Mono*) for IDs, code, keyboard shortcuts, and metrics.
2. **Mandatory Tabular Numerals**:
   - Every number in a dashboard, price tag, timer, counter, or table cell MUST apply `font-variant-numeric: tabular-nums` (`tabular-nums` in Tailwind) so digits align vertically and never jitter during live updates.

For detailed typography: [typography-system.md](typography-system.md).

---

## 6. Specular Depth, Borders & Tactile Surfaces

- **1px Hairline + Top Specular Highlight**:
  Instead of heavy diffuse drop shadows, frame dark-mode cards with `border: 1px solid oklch(1 0 0 / 0.08)` and `box-shadow: inset 0 1px 0 0 oklch(1 0 0 / 0.07), 0 1px 2px 0 oklch(0 0 0 / 0.4)`.
- **Restrained Translucent Chrome**:
  Reserve `backdrop-filter: blur(16px) saturate(180%)` strictly for sticky headers, floating bottom bars, and `cmdk` command palettes — never make every card on a page translucent glass.

---

## 7. 3-Tier Motion & Choreography (60–120 FPS)

| Tier | Technology | Use Case |
|------|------------|----------|
| **Tier 1** | **Native CSS View Transitions API** (`document.startViewTransition`) | Route changes, tab content switches, and Bento grid filter sorting |
| **Tier 2** | **Pure CSS `@starting-style` & `animation-timeline: view()`** | Zero-JS dialog/popover entry/exit and off-main-thread scroll reveals |
| **Tier 3** | **`motion/react` (Motion v12 Springs)** (`stiffness: 420, damping: 32, mass: 0.8`) | Shared `layoutId` active pills, swipeable `vaul` drawers, and physics gestures |

- **Compositor-Only Rule**: Animate only `transform` and `opacity`.
- **Mandatory Accessibility**: Always honor `@media (prefers-reduced-motion: reduce)` and `useReducedMotion()` by collapsing spatial movement into instant opacity crossfades.

---

## 8. WCAG 2.2 AA Accessibility & Ergonomics Gate (Mandatory)

Every UI component must pass **WCAG 2.2 Level AA** before completion:
- [ ] **Contrast Ratios (`1.4.3` & `1.4.11`)**: `>= 4.5:1` for normal text, `>= 3.0:1` for large text (`>= 18pt` or `14pt bold`) and functional UI borders/icons.
- [ ] **Target Size (`2.5.8` — New in WCAG 2.2 AA)**: Interactive targets are **at least `24×24 CSS px`** on desktop and **`>= 44×44pt` (`48×48dp`)** on mobile touchscreens.
- [ ] **Focus Not Obscured (`2.4.11` — New in WCAG 2.2 AA)** & **Focus Appearance**: Sticky headers/footers never cover the focused element (`scroll-padding-top`), and `:focus-visible` renders a crisp `2px` ring with `2px` offset.
- [ ] **Accessible Authentication (`3.3.8`) & Drag Alternatives (`2.5.7`)**: Never block paste (`onPaste`) on password/OTP fields; provide single-click buttons alongside any drag-and-drop or slider gesture.

---

## 9. Next.js 15/16+ Modern `<Form>` & Server Action UX

For Next.js 15/16+ App Router projects:
- **Use `next/form` (`<Form action="/search">`)** for GET-based search, filtering, sorting, and pagination (automatic client navigation, URL sync, and progressive enhancement).
- **Use `<form action={formAction}>` with React 19 `useActionState` + `useOptimistic`** for POST mutations, rendering inline field errors (`aria-invalid`, `aria-describedby`) and non-blocking `sonner` feedback.

```tsx
import Form from 'next/form';

export function ProductSearchBar() {
  return (
    <Form action="/search" className="flex items-center gap-2">
      <input
        name="q"
        type="search"
        placeholder="Search components..."
        className="min-h-11 rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-card)] px-3.5 text-base md:text-sm"
      />
      <button
        type="submit"
        className="min-h-11 rounded-xl bg-[var(--primary)] px-4 text-sm font-medium text-white"
      >
        Search
      </button>
    </Form>
  );
}
```

---

## 10. Post-Design Verification Workflow

```text
1. ARCHETYPE & TOKENS → Lock archetype in DESIGN.md (design-spec + anti-ai-slop-visual-craft)
2. ARCHITECTURE       → Structure state & components (frontend-architecture)
3. IMPLEMENTATION     → Build with OKLCH, Bento @container, cmdk/vaul/sonner & motion/react
4. WCAG 2.2 AA AUDIT  → Verify contrast, 24px/44px targets, focus-visible, tabular-nums & reduced-motion
```
