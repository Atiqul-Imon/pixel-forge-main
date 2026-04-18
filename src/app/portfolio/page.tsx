'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { trackEvent } from '@/lib/gtag';
import { PageSection } from '@/components/marketing/PageSection';
import { MarketingPageHero } from '@/components/marketing/MarketingPageHero';
import { MarketingCtaBand } from '@/components/marketing/MarketingCtaBand';
import { RevealOnScroll } from '@/components/marketing/RevealOnScroll';
import { solutionTypes } from '@/data/solution-types';

export default function SolutionsPage() {
  useEffect(() => {
    trackEvent.servicePageView('Solutions');
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <MarketingPageHero
        eyebrow="Solutions"
        title="What we build"
        description="Categories of websites and software we design and ship—aligned to your operations, customers, and growth plans. Engagements are scoped to what you need; this is not a client list."
      >
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-3.5 text-base font-bold uppercase tracking-wide text-white shadow-lg shadow-black/20 transition-interactive hover:bg-orange-400"
          onClick={() => trackEvent.ctaClick('Talk to us - Solutions Hero')}
        >
          Talk to us
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
        <Link
          href="/services"
          className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-interactive hover:bg-white/15"
        >
          How we work
        </Link>
      </MarketingPageHero>

      <PageSection variant="muted" className="!py-16 md:!py-24">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary-700">Categories</p>
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-primary-600" aria-hidden />
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Software and web by use case
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Pick what is closest to your need—we combine these patterns with discovery, architecture, and delivery.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {solutionTypes.map((item, i) => (
            <RevealOnScroll key={item.id} delayMs={i * 45}>
              <article className="flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-8 shadow-sm transition-interactive hover:border-primary-200/80 hover:shadow-elevated-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700 ring-1 ring-primary-100/90">
                  <item.Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="font-display mt-5 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-600">{item.summary}</p>
                <ul className="mt-6 space-y-2 border-t border-slate-100 pt-6">
                  {item.examples.map((ex) => (
                    <li key={ex} className="flex gap-2 text-sm text-slate-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" aria-hidden />
                      {ex}
                    </li>
                  ))}
                </ul>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delayMs={120}>
          <p className="mx-auto mt-14 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
            Need something that spans several categories? We typically align on outcomes first, then propose a technical
            approach—tell us your constraints on the contact page.
          </p>
        </RevealOnScroll>
      </PageSection>

      <MarketingCtaBand
        title="Tell us what you are building"
        description="We will respond with a practical next step—scope, risks, and how we can help."
        primary={{ href: '/contact', label: 'Get in touch' }}
        secondary={{ href: '/services', label: 'Our process' }}
      />
    </div>
  );
}
