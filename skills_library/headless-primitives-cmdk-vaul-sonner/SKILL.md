---
name: headless-primitives-cmdk-vaul-sonner
description: "Modern headless UI primitives and overlay engineering — global Cmd+K command palette (cmdk), physics-driven mobile drawer vs desktop dialog (vaul + Radix), stacked toast choreography (sonner), and conflict-free focus traps."
version: "2.0.0"
category: "design"
tags: ["headless-ui", "cmdk", "vaul", "sonner", "radix-ui", "command-palette", "modals", "accessibility"]
---

# Modern Headless UI Primitives & Overlay Engineering (`cmdk` + `vaul` + `sonner`)

> **PURPOSE**: Engineer desktop-grade keyboard workflows and mobile-native touch overlays using **`cmdk`** (`⌘K` Command Palette), **`vaul` + Radix Dialog** (`<ResponsiveModal>` switching automatically between desktop modal and mobile bottom drawer), and **`sonner`** (stacked toast notifications with async promise states and undo actions).

---

## 1. Overlay & Feedback Selection Matrix

| User Intent / Surface | Canonical Primitive | Why Not a Generic Modal or Alert? |
|:----------------------|:--------------------|:----------------------------------|
| **Power-User Navigation, Search & Quick Actions** | **`cmdk` (`⌘K` / `Ctrl+K`)** | Single keyboard entry point for 50+ actions with fuzzy filtering, nested pages, and shortcut hints |
| **Contextual Form or Detail View (Cross-Device)** | **`<ResponsiveModal>`** (Radix `Dialog` on `>= 768px`, `vaul` `Drawer` on `< 768px`) | Center modals on mobile are hard to dismiss one-handed; `vaul` gives iOS-native drag-to-dismiss & snap points |
| **Background Mutation Feedback (`Save`, `Delete`, `Sync`)** | **`sonner` (`toast.promise` / `toast(..., { action })`)** | Non-blocking, stacks cleanly on hover, and supports optimistic **Undo** without confirmation modal fatigue |
| **Destructive Irreversible Action (`Delete Workspace`)** | **Radix `AlertDialog`** | Requires explicit keyboard-trapped confirmation (`role="alertdialog"`) |

---

## 2. Production Code Patterns

### Pattern A — Global `⌘K` Command Palette (`cmdk`) with Sub-Pages & Keyboard Shortcuts

```tsx
// src/components/overlays/GlobalCommandPalette.tsx
'use client';

import { useEffect, useState } from 'react';
import { Command } from 'cmdk';

export interface CommandItemSpec {
  id: string;
  group: 'Navigation' | 'Actions' | 'Theme';
  label: string;
  shortcut?: string[];
  keywords?: string[];
  onSelect: () => void;
}

export function GlobalCommandPalette({ items }: { items: CommandItemSpec[] }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const groups: CommandItemSpec['group'][] = ['Navigation', 'Actions', 'Theme'];

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed inset-x-4 top-[16vh] z-50 mx-auto max-w-xl overflow-hidden rounded-2xl bg-[var(--surface-overlay)] p-2 text-[var(--text-primary)] shadow-2xl backdrop-blur-xl border border-[var(--border-hairline)]"
    >
      <div className="flex items-center border-b border-[var(--border-hairline)] px-3 pb-2">
        <Command.Input
          value={search}
          onValueChange={setSearch}
          placeholder="Type a command or search..."
          className="w-full bg-transparent py-2.5 text-base outline-none placeholder:text-[var(--text-muted)]"
        />
        <kbd className="rounded border border-[var(--border-hairline)] px-1.5 py-0.5 font-mono text-xs text-[var(--text-muted)]">
          ESC
        </kbd>
      </div>

      <Command.List className="max-h-[340px] overflow-y-auto py-2">
        <Command.Empty className="py-8 text-center text-sm text-[var(--text-muted)]">
          No matching commands found.
        </Command.Empty>

        {groups.map((groupName) => {
          const groupItems = items.filter((item) => item.group === groupName);
          if (groupItems.length === 0) return null;
          return (
            <Command.Group key={groupName} heading={groupName} className="px-2 py-1.5 text-xs font-medium text-[var(--text-muted)]">
              {groupItems.map((item) => (
                <Command.Item
                  key={item.id}
                  value={[item.label, ...(item.keywords ?? [])].join(' ')}
                  onSelect={() => { item.onSelect(); setOpen(false); }}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] aria-selected:bg-[var(--primary-subtle)] aria-selected:text-[var(--primary)]"
                >
                  <span>{item.label}</span>
                  {item.shortcut && (
                    <span className="flex items-center gap-1">
                      {item.shortcut.map((key) => (
                        <kbd key={key} className="rounded bg-[var(--surface-elevated)] px-1.5 py-0.5 font-mono text-xs tabular-nums">
                          {key}
                        </kbd>
                      ))}
                    </span>
                  )}
                </Command.Item>
              ))}
            </Command.Group>
          );
        })}
      </Command.List>
    </Command.Dialog>
  );
}
```

### Pattern B — `<ResponsiveModal>` (Desktop Radix `Dialog` ↔ Mobile `vaul` `Drawer`)

```tsx
// src/components/overlays/ResponsiveModal.tsx
'use client';

import { useEffect, useState, type ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Drawer } from 'vaul';

export interface ResponsiveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: ReactNode;
}

export function ResponsiveModal({ open, onOpenChange, title, description, children }: ResponsiveModalProps) {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    setIsDesktop(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  if (isDesktop) {
    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[var(--surface-card)] p-6 shadow-2xl border border-[var(--border-hairline)]">
            <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
            <Dialog.Description className="mt-1 text-sm text-[var(--text-secondary)]">{description}</Dialog.Description>
            <div className="mt-5">{children}</div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} shouldScaleBackground>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/60" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mt-24 flex max-h-[88dvh] flex-col rounded-t-2xl bg-[var(--surface-card)] px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-3 border-t border-[var(--border-hairline)]">
          <div className="mx-auto mb-4 h-1.5 w-12 shrink-0 rounded-full bg-[var(--text-muted)]/30" />
          <Drawer.Title className="text-base font-semibold">{title}</Drawer.Title>
          <Drawer.Description className="mt-1 text-sm text-[var(--text-secondary)]">{description}</Drawer.Description>
          <div className="mt-4 overflow-y-auto">{children}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
```

### Pattern C — Optimistic Action + `sonner` Undo Choreography

```tsx
// src/lib/toast-choreography.ts
import { toast } from 'sonner';

export function executeWithUndoToast(options: {
  label: string;
  onOptimisticApply: () => void;
  onUndo: () => void;
  onCommit: () => Promise<void>;
}): void {
  let isUndone = false;
  options.onOptimisticApply();

  toast(options.label, {
    duration: 4500,
    action: {
      label: 'Undo',
      onClick: () => {
        isUndone = true;
        options.onUndo();
        toast.info('Action reverted');
      },
    },
    onAutoClose: async () => {
      if (!isUndone) {
        await options.onCommit();
      }
    },
  });
}
```

---

## 3. Overlay Z-Index & Focus-Trap Rules

1. **Strict Layering Token Scale**:
   - Sticky Header: `z-30` → Backdrop Overlay: `z-40` → Modal / Drawer / `cmdk`: `z-50` → Popover / Select inside Modal: `z-[60]` → `sonner` Toaster: `z-[70]`.
2. **Prevent Nested Focus-Trap Deadlocks**:
   - When opening a Dialog from a `DropdownMenu.Item` or `cmdk` item, always close the parent menu (`setOpen(false)`) or control the Dialog state **outside** the unmounting menu item so `document.body` never gets stuck with `pointer-events: none`.

---

## 4. Verification Checklist

- [ ] **Keyboard Accessibility**: Does `⌘K` / `Ctrl+K` toggle the Command Palette globally, with full arrow-key navigation and `ESC` dismissal?
- [ ] **Mobile Ergonomics**: Do modals automatically render as a drag-to-dismiss `vaul` bottom drawer below `768px` with `env(safe-area-inset-bottom)` padding?
- [ ] **Accessible Titles**: Do every Radix `Dialog.Content` and `Drawer.Content` include a `Title` and `Description` (or `VisuallyHidden` wrapper) for screen readers?
- [ ] **No Confirmation Fatigue**: Are reversible actions using `sonner` Undo toasts instead of blocking confirmation dialogs?
