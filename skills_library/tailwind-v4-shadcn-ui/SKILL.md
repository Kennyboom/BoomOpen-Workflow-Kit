---
name: tailwind-v4-shadcn-ui
description: "Tailwind CSS v4 CSS-first @theme configuration, OKLCH design tokens, container queries, and accessible shadcn/ui Radix primitive composition."
domain: frontend
version: "5.5.0"
---

# Tailwind CSS v4 (`@theme` + OKLCH) & Accessible `shadcn/ui` Architecture

> **PURPOSE**: Build accessible, themeable design systems using Tailwind CSS v4's CSS-first `@import "tailwindcss"` + `@theme` engine, perceptually uniform OKLCH color tokens, native `@container` queries, and composable Radix UI / `shadcn/ui` primitives.

---

## 1. Core Architectural Principles

1. **CSS-First Configuration (`@theme` Over Legacy `tailwind.config.js`)**:
   - In Tailwind CSS v4, replace `tailwind.config.js` with `@import "tailwindcss";` and `@theme { ... }` directly in `app/globals.css`.
   - Map semantic CSS variables (`--background`, `--foreground`, `--primary`, `--ring`) into `@theme inline` using perceptual `oklch(L C H)` values for consistent contrast across light and dark modes.
2. **Type-Safe Variant Composition (`cva` + `cn`)**:
   - Combine `class-variance-authority` (`cva`) with `clsx` + `tailwind-merge` (`cn()`) so consumer overrides never suffer CSS specificity conflicts.
3. **Radix Primitive Accessibility & `asChild` Slot Pattern**:
   - Preserve keyboard navigation, focus trapping, and ARIA attributes by composing `@radix-ui/react-slot` (`asChild`) and forwarding `data-slot` attributes (shadcn/ui v4 convention).
4. **Component-Level `@container` Queries**:
   - Use `@container` on card/panel wrappers and `@sm:...`, `@md:...`, `@lg:...` utilities so reusable components adapt to their parent slot width rather than only the global viewport.

---

## 2. Production Code Patterns

### Pattern A — Tailwind CSS v4 `globals.css` with OKLCH Tokens & `@theme inline`

```css
@import "tailwindcss";
@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(0.99 0.004 250);
  --foreground: oklch(0.16 0.02 255);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.16 0.02 255);
  --primary: oklch(0.56 0.22 264);
  --primary-foreground: oklch(0.98 0.005 264);
  --muted: oklch(0.95 0.01 250);
  --muted-foreground: oklch(0.48 0.02 255);
  --destructive: oklch(0.58 0.22 27);
  --border: oklch(0.90 0.01 250);
  --ring: oklch(0.56 0.22 264);
  --radius: 0.625rem;
}

.dark {
  --background: oklch(0.13 0.02 255);
  --foreground: oklch(0.96 0.008 250);
  --card: oklch(0.17 0.022 255);
  --card-foreground: oklch(0.96 0.008 250);
  --primary: oklch(0.68 0.19 260);
  --primary-foreground: oklch(0.13 0.02 255);
  --muted: oklch(0.22 0.02 255);
  --muted-foreground: oklch(0.68 0.015 250);
  --destructive: oklch(0.64 0.21 25);
  --border: oklch(0.26 0.02 255);
  --ring: oklch(0.68 0.19 260);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
}
```

### Pattern B — React 19 `shadcn/ui` v4 Button Component (`data-slot` + No `forwardRef` Boilerplate)

```tsx
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive: 'bg-destructive text-white shadow-xs hover:bg-destructive/90',
        outline: 'border border-border bg-background hover:bg-muted hover:text-foreground',
        ghost: 'hover:bg-muted hover:text-foreground',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-sm px-3 text-xs',
        lg: 'h-10 rounded-md px-6',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

---

## 3. Anti-Patterns to Avoid

- **❌ Dynamic String Interpolation of Tailwind Classes (`bg-${color}-500`)**: Tailwind's Oxide scanner only extracts static complete class tokens; always map variants via `cva` or a lookup object.
- **❌ Hardcoding Hex/RGB Colors (`bg-[#1e293b]`) Across Components**: Breaks dark mode and theme overrides; always bind semantic tokens (`bg-card`, `text-muted-foreground`, `border-border`).
- **❌ Using Legacy `@tailwind base; @tailwind components; @tailwind utilities;`**: Tailwind v4 uses `@import "tailwindcss";`.

---

## 4. Verification Checklist

- [ ] `globals.css` uses `@import "tailwindcss";` and `@theme inline` with OKLCH tokens for both `:root` and `.dark`.
- [ ] All interactive primitives expose visible keyboard focus rings (`focus-visible:ring-2 focus-visible:ring-ring`) and `aria-*` states.
- [ ] Zero dynamically concatenated Tailwind class strings exist in the codebase.
