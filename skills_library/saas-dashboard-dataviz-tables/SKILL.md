---
name: saas-dashboard-dataviz-tables
description: High-density SaaS dashboard, data visualization, and enterprise data grid UX engineering with 3-second KPI cards, Okabe-Ito OKLCH color-blind-safe charts, TanStack Table v8 + Virtualization, and URL-synced nuqs filters.
version: "2.0.0"
category: "design"
domain: "design"
tags: ["dashboard", "dataviz", "tanstack-table", "virtualization", "kpi", "oklch", "saas"]
---

# High-Density SaaS Dashboard, Data Visualization & Table UX Engineering

## 1. When to Use This Skill
Use this skill when designing or building **B2B SaaS analytics dashboards, observability consoles, financial ledgers, admin portals, or high-density data tables**, including:
- Structuring **3-Second KPI Summary Cards** with tabular numerals, semantic delta pills, and inline sparklines.
- Selecting chart primitives (Recharts, Tremor, Visx) using an **Okabe-Ito / OKLCH color-blind-safe palette**.
- Engineering **Virtualized Data Grids (`@tanstack/react-table` v8 + `@tanstack/react-virtual`)** capable of rendering `100,000+` rows at `60fps` with sticky headers, column pinning, and keyboard navigation.
- Synchronizing filter bars, sort state, and pagination with the URL query string (`nuqs` / `URLSearchParams`).

---

## 2. Core Principles & Chart Selection Matrix

| Analytical Question | Recommended Chart Type | Encoding Rules & Guardrails |
|:--------------------|:-----------------------|:----------------------------|
| **Trend over continuous time** | Area / Line Chart (with subtle gradient fill `opacity: 0.12`) | Max `4` series per chart; direct end-of-line labels instead of distant legends |
| **Part-to-whole comparison** | Stacked Horizontal Bar or Marimekko | **Avoid Pie/Donut charts** when categories `> 4`; human perception judges length far more accurately than angles |
| **Ranking & categorical distribution** | Horizontal Bar Chart (sorted descending) | Left-align category labels; right-align `tabular-nums` values |
| **Correlation & outlier detection** | Scatter Plot with quadrant reference lines | Encode 3rd dimension via point area (`sqrt` scale, never radius) |
| **High-frequency SLA / latency distribution** | Heatmap or Percentile Band (`p50`, `p95`, `p99`) | Always pair color intensity with accessible tooltip readout |

### Color-Blind-Safe OKLCH Data Visualization Palette (Okabe-Ito Adapted)
Never rely on red vs. green alone (`8%` of male users have deuteranopia/protanopia). Always pair color with **directional icons (`↑`, `↓`)** or **stroke dash patterns**:
```css
:root {
  --chart-1-cyan:    oklch(0.72 0.15 220); /* Primary series */
  --chart-2-indigo:  oklch(0.62 0.19 275); /* Comparison series */
  --chart-3-amber:   oklch(0.78 0.16 75);  /* Warning / threshold */
  --chart-4-emerald: oklch(0.70 0.16 165); /* Positive / healthy */
  --chart-5-rose:    oklch(0.65 0.20 15);  /* Critical / anomaly */
}
```

---

## 3. Anatomy of a 3-Second KPI Card

Every KPI card MUST answer three questions in `< 3 seconds`: *(1) What is the metric right now? (2) How did it change vs. the baseline? (3) Is that change good or bad?*

```tsx
import React from 'react';

export interface KpiCardProps {
  label: string;
  formattedValue: string;
  deltaPercent: number;
  deltaComparisonLabel: string;
  invertSentiment?: boolean; // True for metrics like "Error Rate" or "Latency" where lower is better
}

export function KpiMetricCard({
  label,
  formattedValue,
  deltaPercent,
  deltaComparisonLabel,
  invertSentiment = false,
}: KpiCardProps) {
  const isPositiveChange = deltaPercent >= 0;
  const isFavorable = invertSentiment ? !isPositiveChange : isPositiveChange;
  const arrow = isPositiveChange ? '↑' : '↓';

  return (
    <article className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-sm">
      <header className="flex items-center justify-between text-xs font-medium text-slate-400">
        <span>{label}</span>
      </header>
      <div className="mt-2 flex items-baseline justify-between gap-3">
        <span className="font-mono text-2xl font-bold tracking-tight text-slate-50 [font-variant-numeric:tabular-nums]">
          {formattedValue}
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-xs font-semibold [font-variant-numeric:tabular-nums] ${
            isFavorable
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
              : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
          }`}
        >
          <span aria-hidden="true">{arrow}</span>
          {Math.abs(deltaPercent).toFixed(1)}%
        </span>
      </div>
      <p className="mt-1.5 text-xs text-slate-500">{deltaComparisonLabel}</p>
    </article>
  );
}
```

---

## 4. High-Density Virtualized Data Grid (`@tanstack/react-table` + `@tanstack/react-virtual`)

```tsx
import React, { useRef } from 'react';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

const ROW_HEIGHT_PX = 40;

export interface VirtualDataGridProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  sorting: SortingState;
  onSortingChange: React.Dispatch<React.SetStateAction<SortingState>>;
}

export function VirtualizedDataGrid<TData>({
  data,
  columns,
  sorting,
  onSortingChange,
}: VirtualDataGridProps<TData>) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => ROW_HEIGHT_PX,
    overscan: 12,
  });

  return (
    <div
      ref={scrollContainerRef}
      className="h-[520px] overflow-auto rounded-xl border border-slate-800 bg-slate-950"
    >
      <table className="w-full border-collapse text-left text-xs text-slate-200">
        <thead className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-slate-800">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className="h-10 px-3 font-semibold text-slate-300 select-none"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index];
            return (
              <tr
                key={row.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="flex items-center border-b border-slate-900 hover:bg-slate-900/60"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="flex-1 truncate px-3 py-2 [font-variant-numeric:tabular-nums]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
```

---

## 5. Table Typography & Alignment Ergonomics
1. **Right-Align All Numeric, Currency, and Percentage Columns**:
   - Text, UUIDs, and badges align **left**; timestamps align **left** with monospace formatting; quantities, latencies, and currency values align **right** with `font-variant-numeric: tabular-nums` so decimal points line up vertically.
2. **URL-Synced Filter State (`nuqs`)**:
   - Store search queries (`?q=`), date ranges (`?from=&to=`), status facets (`?status=active`), and sort columns (`?sort=created_at.desc`) in URL search params so every filtered view is bookmarkable and shareable.

---

## 6. Anti-Patterns to Avoid
- ❌ **Proportional Numerals in Tables/KPIs**: Causes digits (`1` vs `8`) to shift column widths on live updates. Always apply `tabular-nums`.
- ❌ **Unvirtualized DOM Tables `> 200 Rows`**: Rendering 5,000 `<tr>` nodes freezes main-thread interaction (`INP > 500ms`).
- ❌ **Truncating Critical IDs Without Copy-on-Click**: Any truncated UUID/hash cell MUST provide a 1-click copy button and full-value tooltip.

---

## 7. Verification Checklist
- [ ] All numeric KPI and table cells enforce `font-variant-numeric: tabular-nums` and right alignment.
- [ ] Delta pills include both directional arrows (`↑`/`↓`) and sentiment-aware coloring (`invertSentiment` for error/latency metrics).
- [ ] Tables with `> 100` rows use row virtualization (`@tanstack/react-virtual`) and sticky `<thead>`.
- [ ] Filter, sort, and date-range controls persist state in URL query parameters.
