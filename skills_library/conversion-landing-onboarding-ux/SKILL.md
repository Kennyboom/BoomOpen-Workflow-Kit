---
name: conversion-landing-onboarding-ux
description: High-converting SaaS landing page, pricing table psychology, interactive product tour, and progressive user onboarding UX patterns for B2B and AI-native web applications.
version: "2.0.0"
category: "design"
domain: "design"
tags: ["conversion", "landing-page", "pricing-ux", "onboarding", "empty-states", "cta", "plg"]
---

# High-Converting SaaS Landing Page, Pricing & Progressive Onboarding UX

## 1. When to Use This Skill
Use this skill when designing or building **SaaS marketing landing pages, pricing & packaging comparisons, product-led growth (PLG) signup flows, interactive onboarding checklists, or first-run empty states**, including:
- Structuring **Above-the-Fold Hero Sections** that communicate value within `5 seconds`.
- Designing **3-Tier Pricing Tables** with annual/monthly billing toggles, anchored recommended tiers, and transparent usage calculators.
- Building **Progressive Onboarding Checklists** and actionable **Empty-State Activation Triggers** that minimize Time-to-First-Value (`TTFV < 90 seconds`).

---

## 2. Above-the-Fold Hero Anatomy (The 5-Second Clarity Test)

Within `5 seconds` of landing, a visitor must know: *(1) What is this product? (2) Who is it for? (3) Why is it 10x better than the status quo? (4) What happens when I click the primary CTA?*

| Element | Copy & Visual Specification | Conversion Impact |
|:--------|:----------------------------|:------------------|
| **1. Eyebrow Badge** | Concrete proof or release milestone (`⚡ v5.5 · 5-Platform AI Orchestration`) — never vague hype (`Revolutionizing the Future`) | Establishes immediate technical credibility |
| **2. Outcome-Driven Headline (`H1`)** | `40px–64px` (`clamp(2.25rem, 4.5vw, 4rem)`), tight tracking (`-0.03em`), max `10–12 words` stating the concrete outcome | Reduces bounce rate by `25–40%` vs abstract taglines |
| **3. Specific Subheadline** | `18px–20px`, `max-w-[62ch]`, naming the target persona, mechanism, and measurable benefit | Answers "How does it actually work?" |
| **4. Dual CTA Hierarchy + Micro-Reassurance** | Primary high-contrast action (`Start Free Workspace →`) + Secondary low-friction action (`Try Interactive Demo`) + micro-copy (`No credit card required · 2-min setup`) | Captures both high-intent buyers and evaluators |
| **5. Interactive Product Artifact** | Live interactive sandbox, tabbed workflow preview, or annotated command-center frame (never generic stock photos or 3D blobs) | Lets technical buyers validate product craft before signing up |

---

## 3. Pricing Table Psychology & Transparent Packaging Pattern

1. **3-Tier Anchoring (`Starter` / `Pro [Recommended]` / `Enterprise`)**:
   - Visually elevate the middle target tier (`border-indigo-500`, subtle top badge `MOST POPULAR`, primary filled CTA button) while keeping `Starter` and `Enterprise` buttons in secondary outline style.
2. **Annual Billing Savings Toggle (`Save 20%`)**:
   - Default to Annual or clearly highlight the exact monthly equivalent (`$39/mo billed annually` vs `$49/mo billed monthly`) using `tabular-nums` so numbers never jump when toggling.
3. **Diff-Only Feature Bullets (`Everything in Starter, plus:`)**:
   - List only the `5–7` differentiating capabilities per card so users can scan differences in `< 10 seconds`.

```tsx
import React, { useState } from 'react';

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPriceUsd: number;
  annualMonthlyEquivalentUsd: number;
  highlighted?: boolean;
  badgeText?: string;
  ctaLabel: string;
  inheritsFrom?: string;
  features: string[];
}

export function PricingComparisonSection({ tiers }: { tiers: PricingTier[] }) {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');

  return (
    <section aria-labelledby="pricing-heading" className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center">
        <h2 id="pricing-heading" className="text-3xl font-bold tracking-tight text-slate-50">
          Predictable Pricing That Scales With Your Engineering Team
        </h2>
        <div
          role="group"
          aria-label="Billing frequency"
          className="mt-6 inline-flex items-center rounded-full border border-slate-800 bg-slate-900 p-1"
        >
          <button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            className={`min-h-9 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              billingCycle === 'monthly' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            Monthly Billing
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle('annual')}
            className={`min-h-9 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              billingCycle === 'annual' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Annual Billing <span className="ml-1 text-emerald-300">(Save 20%)</span>
          </button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {tiers.map((tier) => {
          const price =
            billingCycle === 'annual' ? tier.annualMonthlyEquivalentUsd : tier.monthlyPriceUsd;
          return (
            <article
              key={tier.id}
              className={`relative flex flex-col justify-between rounded-2xl border p-6 ${
                tier.highlighted
                  ? 'border-indigo-500 bg-slate-900/90 shadow-xl shadow-indigo-500/10'
                  : 'border-slate-800 bg-slate-950/70'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                  {tier.badgeText && (
                    <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-semibold text-indigo-300">
                      {tier.badgeText}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs text-slate-400">{tier.description}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-mono text-4xl font-extrabold text-white [font-variant-numeric:tabular-nums]">
                    ${price}
                  </span>
                  <span className="text-xs text-slate-400">/ seat / month</span>
                </div>
                {tier.inheritsFrom && (
                  <p className="mt-6 text-xs font-semibold text-slate-300">
                    Everything in {tier.inheritsFrom}, plus:
                  </p>
                )}
                <ul className="mt-4 space-y-2.5 text-xs text-slate-300">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <span className="text-emerald-400" aria-hidden="true">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className={`mt-8 min-h-10 w-full rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
                  tier.highlighted
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                    : 'border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800'
                }`}
              >
                {tier.ctaLabel}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
```

---

## 4. Progressive Onboarding & Actionable First-Run Empty States

1. **Endowed Progress Effect (Start Checklists at `1 / 4 Complete`)**:
   - Mark *"1. Create your workspace"* as already checked (`25% complete`) the moment the user lands in the dashboard. Users are significantly more likely to finish a 4-step checklist that is already underway.
2. **Never Render Dead-End Empty States (`"No data found"`)**:
   - Every empty state MUST include: (a) a preview skeleton or sample dataset toggle (`Load Sample Telemetry`), (b) a 1-click primary setup action (`Connect GitHub Repository`), and (c) a `< 60s` CLI quickstart snippet with a 1-click copy button.

---

## 5. Anti-Patterns to Avoid
- ❌ **Multi-Page 12-Field Registration Forms Before Product Value**: Ask only for Email / OAuth / Passkey at signup; collect role/company metadata progressively or enrich asynchronously.
- ❌ **Forced 10-Step Tooltip Modals Blocking the UI on First Login**: Users immediately click *"Skip Tour"*. Use a non-blocking, collapsible **Onboarding Checklist Card** in the sidebar instead.
- ❌ **Vague CTA Labels (`Submit`, `Learn More`, `Click Here`)**: Always use verb + concrete object (`Deploy First Agent`, `Start 14-Day Pro Trial`).

---

## 6. Verification Checklist
- [ ] Hero section states who the product is for, the concrete outcome, and includes an interactive product preview above the fold.
- [ ] Primary CTA includes friction-reducing micro-copy (`No credit card required` / `1-command CLI install`).
- [ ] Pricing cards use `tabular-nums`, highlight 1 recommended tier, and list diff-only features.
- [ ] First-run empty states include a 1-click sample data loader or primary creation trigger.
