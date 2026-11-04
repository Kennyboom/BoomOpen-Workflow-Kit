---
name: ui-design-system
description: 2026 UI Component Architecture and Design System Governance guide covering Class Variance Authority (CVA), Tailwind Variants, polymorphic Slot/asChild composition, compound components, token enforcement, and Storybook visual regression testing.
version: "2.0.0"
category: "design"
domain: "design"
tags: ["design-system", "component-architecture", "cva", "radix-ui", "compound-components", "storybook", "tokens"]
---

# UI Design System Architecture & Component Governance (2026)

## 1. When to Use This Skill
Use this skill when architecting, scaling, or auditing a **reusable UI component library or multi-app Design System**, including:
- Authoring type-safe variant APIs using **`class-variance-authority` (CVA)** or **`tailwind-variants`** with `tailwind-merge` (`cn()`).
- Building polymorphic primitives with the **Radix `@radix-ui/react-slot` (`asChild`)** delegation pattern.
- Structuring **Compound Components** (`Card.Root`, `Card.Header`, `Card.Body`, `Card.Footer`) instead of 25-prop monolithic components.
- Enforcing token-only styling gates and automated **Storybook Interaction + Chromatic/Playwright Visual Regression** tests.

---

## 2. Core Component API Design Principles

| Principle | Architectural Rule | Why It Matters |
|:----------|:-------------------|:---------------|
| **1. Variant Union Matrix Over Boolean Soup** | Use `variant: 'primary' \| 'secondary' \| 'destructive' \| 'ghost'` instead of `isPrimary`, `isSecondary`, `isDanger` booleans | Eliminates impossible state combinations (`<Button isPrimary isDanger />`) |
| **2. Polymorphic `asChild` Composition** | Delegate rendering via Radix `<Slot>` when `asChild={true}` so a `<Button asChild><a href="...">` renders a single semantic `<a>` with button styling | Prevents invalid nested DOM (`<button><a></a></button>`) and preserves accessibility |
| **3. Always Spread Native HTML Attributes & Forward Refs** | Extend `React.ComponentPropsWithRef<'button'>` and merge `className` last via `cn(buttonVariants({ variant, size }), className)` | Guarantees consumers can attach `aria-*`, `data-*`, event handlers, and focus refs |
| **4. Compound Sub-Components for Complex Surfaces** | Split Modals, Dropdowns, Tabs, and Cards into composable sub-parts (`Dialog.Root`, `Dialog.Trigger`, `Dialog.Content`) | Gives product engineers layout flexibility without adding conditional render props |

---

## 3. Canonical Primitive Pattern (`Slot` + `CVA` + `cn` Utility)

```tsx
import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400',
    'disabled:pointer-events-none disabled:opacity-45 select-none',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-accent-primary text-white hover:bg-accent-primary-hover shadow-xs',
        secondary: 'border border-border-subtle bg-surface-elevated text-text-primary hover:bg-slate-800/70',
        destructive: 'bg-rose-600 text-white hover:bg-rose-500',
        ghost: 'text-text-muted hover:bg-slate-800/50 hover:text-text-primary',
      },
      size: {
        sm: 'min-h-8 px-3 text-xs',
        md: 'min-h-10 px-4 text-sm',
        lg: 'min-h-11 px-5 text-base',
        icon: 'min-h-9 min-w-9 p-0', // WCAG 2.5.8 >= 24x24px minimum
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ComponentPropsWithRef<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      data-slot="button"
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Comp>
  );
}
```

---

## 4. Compound Component Pattern (`Card.*` with `data-slot` Styling Hooks)

```tsx
import React from 'react';
import { cn } from './Button';

export function CardRoot({ className, ...props }: React.ComponentPropsWithRef<'section'>) {
  return (
    <section
      data-slot="card"
      className={cn(
        'rounded-xl border border-border-subtle bg-surface-elevated text-text-primary shadow-sm',
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.ComponentPropsWithRef<'header'>) {
  return (
    <header
      data-slot="card-header"
      className={cn('flex flex-col gap-1.5 border-b border-border-subtle px-5 py-4', className)}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: React.ComponentPropsWithRef<'div'>) {
  return <div data-slot="card-body" className={cn('p-5', className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.ComponentPropsWithRef<'footer'>) {
  return (
    <footer
      data-slot="card-footer"
      className={cn('flex items-center justify-end gap-2 border-t border-border-subtle px-5 py-3', className)}
      {...props}
    />
  );
}

export const Card = {
  Root: CardRoot,
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
};
```

---

## 5. Design System Governance & Visual Regression Matrix

1. **Strict 3-Layer Directory Structure**:
   - `src/components/ui/` — Stateless, domain-agnostic design system primitives (`Button`, `Dialog`, `Input`, `Badge`, `Table`). Zero business API calls allowed here.
   - `src/components/patterns/` — Composed multi-primitive UI patterns (`CommandPalette`, `DataTableToolbar`, `ConfirmDeleteModal`).
   - `src/features/<domain>/components/` — Product-specific components wired to domain queries.
2. **Storybook Play Functions & Visual Snapshots**:
   - Every primitive in `src/components/ui/` MUST declare stories covering: (a) all `variant × size` matrix permutations, (b) `disabled` & `loading` states, (c) keyboard focus (`play` function tabbing to trigger), and (d) dark + light theme modes.

---

## 6. Anti-Patterns to Avoid
- ❌ **Prop-Drilling 15+ Visual Overrides (`titleColor`, `headerPadding`, `footerBorder`)**: Replace with Compound Components (`Card.Header`, `Card.Footer`) and `cn(defaultClasses, className)`.
- ❌ **Hardcoding Z-Index Magic Numbers (`z-[99999]`)**: Define a strict semantic elevation scale (`--z-dropdown: 40`, `--z-sticky: 50`, `--z-modal-backdrop: 60`, `--z-modal: 70`, `--z-toast: 80`, `--z-tooltip: 90`).
- ❌ **Importing Domain Services Inside `src/components/ui/`**: Keeps UI primitives impossible to reuse or test in isolation.

---

## 7. Verification Checklist
- [ ] All primitives use `cva` / `tailwind-variants` + `twMerge` (`cn`) and accept `className` overrides.
- [ ] Interactive primitives support polymorphic composition (`asChild` via `@radix-ui/react-slot`) and forward `ref`.
- [ ] Complex multi-part widgets use the Compound Component pattern with `data-slot` attributes.
- [ ] Zero raw hex colors or magic `z-[9999]` values exist in `src/components/ui/`.
