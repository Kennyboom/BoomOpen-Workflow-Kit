---
name: figma-mcp-dtcg-design-tokens
description: Figma MCP design-to-code inspection, Code Connect component mapping, W3C Design Tokens Community Group (DTCG 2025/2026) 3-tier JSON architecture, and Style Dictionary compilation to Tailwind CSS v4 @theme OKLCH variables.
version: "2.0.0"
category: "design"
domain: "design"
tags: ["figma-mcp", "design-tokens", "dtcg", "code-connect", "tailwind-v4", "style-dictionary", "oklch"]
---

# Figma MCP, Code Connect & W3C DTCG Design Tokens Engineering

## 1. When to Use This Skill
Use this skill when bridging **Figma design systems and production frontend repositories**, authoring `DESIGN.md` token specifications, or automating multi-theme token pipelines, including:
- Inspecting frames, auto-layout trees, and bound variables via the **Figma MCP Server** (`get_design_context`, `get_variable_defs`, `get_code_connect_map`).
- Mapping Figma components to real production React/Vue primitives using **Figma Code Connect (`@figma/code-connect`)**.
- Structuring **3-Tier W3C Design Tokens (`DTCG` 2025.10 Format)** (`$value`, `$type`, `$description`) across **Primitive → Semantic → Component** layers.
- Compiling tokens into **Tailwind CSS v4 `@theme inline`** OKLCH custom properties with zero-JS dark/light mode switching.

---

## 2. 3-Tier W3C DTCG Token Architecture

Never reference raw hex/OKLCH values directly inside UI components. Enforce a strict 3-tier alias hierarchy:

| Tier | Responsibility | Naming Convention | Example Token |
|:-----|:---------------|:------------------|:--------------|
| **Tier 1: Primitive (Palette)** | Raw perceptual OKLCH color ramps, spacing scales, font families | `primitive.{category}.{scale}` | `primitive.color.indigo.600 = "oklch(0.55 0.22 268)"` |
| **Tier 2: Semantic (Intent)** | Theme-aware surface, text, border, and status roles | `semantic.{role}.{prominence}` | `semantic.surface.canvas = "{primitive.color.slate.950}"` |
| **Tier 3: Component (Scoped)** | Optional component-specific overrides | `component.{widget}.{part}.{state}` | `component.button.primary.bg = "{semantic.accent.primary}"` |

---

## 3. W3C DTCG JSON Token Schema (`tokens/design-tokens.dtcg.json`)

```json
{
  "$schema": "https://tr.designtokens.org/format/",
  "primitive": {
    "color": {
      "$type": "color",
      "slate": {
        "50":  { "$value": "oklch(0.985 0.003 255)" },
        "900": { "$value": "oklch(0.205 0.018 255)" },
        "950": { "$value": "oklch(0.135 0.015 255)" }
      },
      "indigo": {
        "500": { "$value": "oklch(0.615 0.210 268)" },
        "600": { "$value": "oklch(0.545 0.225 268)" }
      },
      "emerald": {
        "500": { "$value": "oklch(0.695 0.170 162)" }
      }
    },
    "dimension": {
      "$type": "dimension",
      "space": {
        "2": { "$value": "0.5rem" },
        "4": { "$value": "1rem" },
        "6": { "$value": "1.5rem" }
      },
      "radius": {
        "md": { "$value": "0.5rem" },
        "xl": { "$value": "0.75rem" }
      }
    }
  },
  "semantic": {
    "surface": {
      "$type": "color",
      "canvas": {
        "$value": "{primitive.color.slate.950}",
        "$description": "Primary application background canvas"
      },
      "elevated": {
        "$value": "{primitive.color.slate.900}",
        "$description": "Card, popover, and modal surface"
      }
    },
    "accent": {
      "$type": "color",
      "primary": {
        "$value": "{primitive.color.indigo.500}",
        "$description": "Primary interactive brand accent"
      },
      "primaryHover": {
        "$value": "{primitive.color.indigo.600}",
        "$description": "Hover state for primary interactive elements"
      }
    }
  }
}
```

---

## 4. Tailwind CSS v4 `@theme inline` Compilation (`src/styles/tokens.css`)

In Tailwind CSS v4, bind semantic CSS custom properties inside `@theme inline` so utility classes (`bg-surface-canvas`, `bg-accent-primary`, `rounded-card`) automatically resolve to multi-theme variables without `tailwind.config.js` bloat:

```css
@import "tailwindcss";

:root,
[data-theme="light"] {
  --surface-canvas: oklch(0.985 0.003 255);
  --surface-elevated: oklch(1.000 0.000 0);
  --text-primary: oklch(0.180 0.015 255);
  --text-muted: oklch(0.480 0.020 255);
  --border-subtle: oklch(0.890 0.010 255);
  --accent-primary: oklch(0.545 0.225 268);
  --accent-primary-hover: oklch(0.485 0.225 268);
}

[data-theme="dark"] {
  --surface-canvas: oklch(0.135 0.015 255);
  --surface-elevated: oklch(0.205 0.018 255);
  --text-primary: oklch(0.975 0.005 255);
  --text-muted: oklch(0.685 0.015 255);
  --border-subtle: oklch(0.285 0.015 255);
  --accent-primary: oklch(0.615 0.210 268);
  --accent-primary-hover: oklch(0.675 0.195 268);
}

@theme inline {
  --color-surface-canvas: var(--surface-canvas);
  --color-surface-elevated: var(--surface-elevated);
  --color-text-primary: var(--text-primary);
  --color-text-muted: var(--text-muted);
  --color-border-subtle: var(--border-subtle);
  --color-accent-primary: var(--accent-primary);
  --color-accent-primary-hover: var(--accent-primary-hover);
  --radius-card: 0.75rem;
}
```

---

## 5. Figma Code Connect Mapping (`src/components/Button.figma.tsx`)

When Figma Code Connect is configured, AI agents inspecting a Figma frame via the Figma MCP server receive the **exact production React component import and prop mapping** instead of raw absolute-positioned `<div>` nodes:

```tsx
import React from 'react';
import figma from '@figma/code-connect';
import { Button } from './Button';

figma.connect(
  Button,
  'https://www.figma.com/design/ABC123XYZ/BoomOpen-Design-System?node-id=42-108',
  {
    props: {
      variant: figma.enum('Variant', {
        Primary: 'primary',
        Secondary: 'secondary',
        Destructive: 'destructive',
        Ghost: 'ghost',
      }),
      size: figma.enum('Size', {
        Small: 'sm',
        Medium: 'md',
        Large: 'lg',
      }),
      disabled: figma.boolean('Disabled'),
      label: figma.string('Label'),
    },
    example: ({ variant, size, disabled, label }) => (
      <Button variant={variant} size={size} disabled={disabled}>
        {label}
      </Button>
    ),
  }
);
```

---

## 6. Figma MCP Inspection Workflow (5-Step Protocol)
1. **Extract Variables First**: Call Figma MCP `get_variable_defs` on the target node to map every Figma variable collection to existing `--color-*` and `--spacing-*` tokens in `src/styles/tokens.css`.
2. **Check Code Connect**: Call `get_code_connect_map` so existing design system components (`Button`, `Dialog`, `Badge`, `DataTable`) are reused rather than re-created.
3. **Translate Auto-Layout to CSS Grid / Flexbox**: Convert Figma `layoutMode: "HORIZONTAL" | "VERTICAL"`, `itemSpacing`, and `padding*` into semantic `flex` / `grid` + `gap-*` utilities — never emit Figma's raw `position: absolute` coordinates.

---

## 7. Anti-Patterns to Avoid
- ❌ **Hardcoded Hex Values (`bg-[#4f46e5]`) in Component Files**: Breaks dark/light mode and multi-brand theming. Always reference semantic tokens (`bg-accent-primary`).
- ❌ **Copy-Pasting Absolute Coordinates from Figma Inspect**: Produces brittle, non-responsive layouts that break on mobile viewports.
- ❌ **Mixing W3C `$value` with Legacy `value` Keys in the Same Token Tree**: Standardize strictly on W3C DTCG `$value`, `$type`, and `$description`.

---

## 8. Verification Checklist
- [ ] All token JSON files conform to W3C DTCG (`$value`, `$type`, `$description`) across Primitive and Semantic tiers.
- [ ] Semantic tokens map cleanly to CSS variables inside `@theme inline` for both `[data-theme="light"]` and `[data-theme="dark"]`.
- [ ] Core UI primitives have `.figma.tsx` Code Connect definitions.
- [ ] Zero hardcoded hex/RGB values exist inside feature component JSX/TSX files.
