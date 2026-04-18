'use client';

import { useId } from 'react';
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle,
  Code,
  Gauge,
  Layers,
  Settings,
  ShieldCheck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import InteractiveButton from '@/components/InteractiveButton';
import { HeroLeadForm } from '@/components/marketing/HeroLeadForm';
import { PageSection } from '@/components/marketing/PageSection';
import { RevealOnScroll } from '@/components/marketing/RevealOnScroll';
import { solutionTypes } from '@/data/solution-types';
import { cn } from '@/lib/utils';

/** Short titles + one line of context for scanability */
const serviceOfferings: { title: string; detail: string }[] = [
  { title: 'AI consulting & engineering', detail: 'When to use AI, how to plug it into your stack, and shipping it safely to users.' },
  { title: 'Design & UI/UX', detail: 'Brand systems, product UI, and research-backed flows.' },
  { title: 'Custom & full-stack engineering', detail: 'Web platforms, services, and data layers built to scale.' },
  { title: 'Mobile, APIs & integration', detail: 'Native and hybrid apps; REST/events; payments, auth, CMS.' },
  { title: 'Automation & DevOps', detail: 'Workflow automation, CI/CD, and predictable releases.' },
  { title: 'Performance & stewardship', detail: 'Observability, technical SEO, design systems, ongoing iteration.' },
];

const topCapabilities: Array<{
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  /** left gradient panel on home */
  panel: string;
}> = [
  {
    icon: <Building2 className="h-7 w-7" />,
    title: 'Web Platforms & Digital Infrastructure',
    description:
      'Custom web platforms built to support operations and growth—with performance and maintainability from day one.',
    features: [
      'Built for traffic growth and feature evolution',
      'Secure, scalable system design',
      'SEO-ready, performance-optimized foundations',
    ],
    panel: 'bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-800',
  },
  {
    icon: <Code className="h-7 w-7" />,
    title: 'Digital Products & MVP Engineering',
    description:
      'Products engineered from concept to production—foundations structured to grow without costly rewrites.',
    features: [
      'Modular, extensible architecture',
      'Clear separation of business logic',
      'Scalable foundations for product growth',
    ],
    panel: 'bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-700',
  },
  {
    icon: <BarChart3 className="h-7 w-7" />,
    title: 'Performance, Search & Optimization',
    description:
      'System-level optimization for speed, discoverability, and usability—aligned with modern standards.',
    features: [
      'Core Web Vitals–focused work',
      'Clean technical SEO foundations',
      'Performance monitoring and iteration',
    ],
    panel: 'bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-800',
  },
];

const reasons = [
  {
    icon: Layers,
    title: 'Architecture first',
    body: 'We design for the next phase of your product—not just the launch—so shortcuts do not box you in later.',
  },
  {
    icon: Gauge,
    title: 'Measured quality',
    body: 'Speed, accessibility, and clarity are engineered in. What ships is measurable and maintainable.',
  },
  {
    icon: ShieldCheck,
    title: 'Partnership mindset',
    body: 'Clear communication, predictable delivery, and honest tradeoffs—we work as an extension of your team.',
  },
];

/** Home preview: first six solution categories (see full list on /portfolio). */
const solutionPreview = solutionTypes.slice(0, 6);

/** Flowing service bands — full-bleed color fields (no card chrome) */
const serviceBandStyles = [
  { mesh: 'from-cyan-400/50 via-sky-200/40 to-indigo-300/45', glow: 'bg-cyan-400/30', ink: 'text-slate-900' },
  { mesh: 'from-violet-400/45 via-fuchsia-200/35 to-rose-200/40', glow: 'bg-violet-400/25', ink: 'text-slate-900' },
  { mesh: 'from-emerald-400/40 via-teal-200/35 to-cyan-200/35', glow: 'bg-emerald-400/25', ink: 'text-slate-900' },
  { mesh: 'from-amber-400/45 via-orange-200/40 to-yellow-100/50', glow: 'bg-amber-400/30', ink: 'text-slate-900' },
  { mesh: 'from-rose-400/40 via-pink-200/35 to-violet-200/40', glow: 'bg-rose-400/25', ink: 'text-slate-900' },
  { mesh: 'from-indigo-400/45 via-blue-200/40 to-slate-200/45', glow: 'bg-indigo-400/25', ink: 'text-slate-900' },
] as const;

/** Showcase tiles — saturated gradients; body copy uses shared high-contrast styles in JSX */
const showcaseTiles = [
  { mesh: 'from-sky-500 via-cyan-500 to-blue-700', glow: 'bg-cyan-300/40', iconWrap: 'bg-white/15 text-white ring-white/25' },
  { mesh: 'from-violet-600 via-purple-600 to-indigo-800', glow: 'bg-fuchsia-400/30', iconWrap: 'bg-white/15 text-white ring-white/25' },
  { mesh: 'from-emerald-500 via-teal-500 to-cyan-800', glow: 'bg-emerald-300/35', iconWrap: 'bg-white/15 text-white ring-white/25' },
  { mesh: 'from-amber-500 via-orange-500 to-rose-600', glow: 'bg-amber-300/35', iconWrap: 'bg-white/15 text-white ring-white/25' },
  { mesh: 'from-fuchsia-500 via-pink-600 to-rose-700', glow: 'bg-pink-300/35', iconWrap: 'bg-white/15 text-white ring-white/25' },
  { mesh: 'from-indigo-600 via-blue-700 to-slate-900', glow: 'bg-blue-400/25', iconWrap: 'bg-white/15 text-white ring-white/25' },
] as const;

const reasonStrips = [
  { bar: 'from-cyan-400 to-blue-500', wash: 'from-cyan-500/10 to-transparent', iconBg: 'bg-cyan-500/15 text-cyan-800' },
  { bar: 'from-violet-400 to-fuchsia-500', wash: 'from-violet-500/10 to-transparent', iconBg: 'bg-violet-500/15 text-violet-800' },
  { bar: 'from-amber-400 to-orange-500', wash: 'from-amber-500/10 to-transparent', iconBg: 'bg-amber-500/15 text-amber-900' },
] as const;

/** Large index — must stay dark enough for light section bg (avoid slate-200) */
const reasonIndexGradient = [
  'from-cyan-600 via-sky-600 to-blue-800',
  'from-violet-600 via-fuchsia-600 to-indigo-800',
  'from-amber-600 via-orange-500 to-rose-700',
] as const;

/** Grayscale city skyline — blends with blue hero (Unsplash). */
const HERO_SKYLINE =
  'https://images.unsplash.com/photo-1480714378408-7cf4763308fe?auto=format&fit=crop&w=1600&q=75';

/** Organic mesh + line work over hero (unique gradient IDs per mount) */
function HeroAbstractOverlay() {
  const uid = useId().replace(/:/g, '');
  const g1 = `hero-g1-${uid}`;
  const g2 = `hero-g2-${uid}`;
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full select-none opacity-90"
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={g1} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="45%" stopColor="#22d3ee" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.11" />
        </linearGradient>
        <linearGradient id={g2} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,40 C220,180 480,-20 780,90 S1080,220 1200,60 L1200,0 L0,0 Z"
        fill={`url(#${g1})`}
        opacity={0.55}
      />
      <path
        d="M0,520 C280,440 520,620 780,500 S1040,380 1200,480 L1200,800 L0,800 Z"
        fill={`url(#${g1})`}
        opacity={0.2}
      />
      <path
        d="M-20,380 Q300,260 620,400 T1220,320"
        fill="none"
        stroke={`url(#${g2})`}
        strokeWidth={1.2}
        opacity={0.35}
      />
      <path
        d="M80,640 Q420,560 760,680 T1180,600"
        fill="none"
        stroke="#ffffff"
        strokeWidth={0.6}
        opacity={0.14}
      />
      <path
        d="M900,-20 L1180,200 L900,420 L620,200 Z"
        fill="#ffffff"
        opacity={0.03}
      />
      <circle cx={980} cy={140} r={160} fill={`url(#${g1})`} opacity={0.12} />
    </svg>
  );
}

export default function HomeView() {
  return (
    <div className="min-h-screen bg-background">
      {/* Split hero: medium blue + skyline, lead form (Plego-style) */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-[#0f3468] to-[#0c4a6e]"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-tr from-cyan-600/25 via-transparent to-violet-600/20 mix-blend-soft-light"
            aria-hidden
          />
          <div
            className="absolute -left-24 top-1/4 h-[28rem] w-[28rem] rounded-full bg-cyan-400/25 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl"
            aria-hidden
          />
          <div className="absolute inset-y-0 right-0 hidden w-[56%] lg:block">
            <Image
              src={HERO_SKYLINE}
              alt=""
              fill
              className="object-cover object-center grayscale contrast-[0.92] brightness-[0.85]"
              sizes="56vw"
              priority
            />
          <div
            className="absolute inset-0 bg-gradient-to-r from-indigo-950/90 via-blue-900/70 to-cyan-900/35"
              aria-hidden
            />
          </div>
          <div className="absolute inset-0 lg:hidden" aria-hidden>
            <Image
              src={HERO_SKYLINE}
              alt=""
              fill
              className="object-cover object-center opacity-35 grayscale"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-blue-950/85 to-slate-950/95" />
          </div>
        </div>

        <HeroAbstractOverlay />

        <div className="relative z-10 mx-auto max-w-content-wide px-4 pb-14 pt-6 sm:px-6 md:pb-16 md:pt-8 lg:px-8 lg:pb-20 lg:pt-10">
          <RevealOnScroll>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="max-w-xl lg:max-w-none">
                <h1 className="font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-white sm:text-4xl md:text-[2.65rem] md:leading-[1.08] lg:text-[2.75rem]">
                  Web and product development agency—built for performance, clarity, and growth
                </h1>
                <p className="mt-5 max-w-xl text-base leading-[1.65] text-slate-100 md:text-lg">
                  Strategy, UX, and engineering in one team. We ship fast, search-friendly sites and platforms you can
                  evolve—without template limits or surprise technical debt.
                </p>
              </div>
              <div className="w-full lg:justify-self-end lg:max-w-md xl:max-w-lg">
                <HeroLeadForm />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* What we do — flowing color bands; tight rhythm, minimal gutter */}
      <PageSection variant="default" className="relative overflow-hidden !py-12 md:!py-16">
        <div
          className="pointer-events-none absolute -left-[20%] top-1/4 h-[min(100vw,36rem)] w-[min(100vw,36rem)] -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-400/25 via-cyan-400/10 to-transparent blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-[15%] bottom-0 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/20 blur-3xl"
          aria-hidden
        />
        <div className="pf-fine-grid pointer-events-none absolute inset-0 opacity-[0.25]" aria-hidden />
        <RevealOnScroll>
          <div className="relative z-[1] flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8 xl:gap-10">
            <div className="shrink-0 lg:max-w-[min(100%,20rem)] xl:max-w-[22rem]">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-slate-500">What we do</p>
              <h2 className="font-display mt-3 text-[1.65rem] font-semibold leading-[1.12] tracking-[-0.04em] text-slate-950 sm:text-3xl md:text-[2rem] md:leading-[1.1]">
                <span className="pf-text-gradient-vivid">End-to-end</span>
                <span className="text-slate-900"> software—design, UX, and full-stack delivery</span>
              </h2>
              <p className="mt-3 text-[15px] leading-snug text-slate-600 md:text-base md:leading-relaxed">
                We operate as a software engineering partner: disciplined architecture, automated delivery, and systems you can
                extend in-house. From greenfield products and mobile to integrations and legacy modernization, we ship
                production-grade software—not disposable vendor handoffs.
              </p>
            </div>
            <div className="min-w-0 flex-1">
              <ul className="space-y-2 sm:space-y-2.5">
                {serviceOfferings.map((item, bi) => {
                  const band = serviceBandStyles[bi % serviceBandStyles.length];
                  return (
                    <li key={item.title} className="group relative overflow-hidden rounded-xl sm:rounded-2xl">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${band.mesh} opacity-95`}
                        aria-hidden
                      />
                      <div
                        className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full ${band.glow} blur-2xl mix-blend-screen sm:h-40 sm:w-40`}
                        aria-hidden
                      />
                      <div className="relative flex items-start gap-3 px-4 py-3.5 sm:gap-4 sm:px-5 sm:py-4">
                        <span
                          className="w-10 shrink-0 font-display text-2xl font-light tabular-nums leading-none text-slate-900/35 sm:w-11 sm:text-3xl"
                          aria-hidden
                        >
                          {String(bi + 1).padStart(2, '0')}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className={`text-[15px] font-semibold leading-snug tracking-tight sm:text-[16px] ${band.ink}`}>
                            {item.title}
                          </p>
                          <p className="mt-1 text-sm leading-snug text-slate-800/85 sm:text-[15px] sm:leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-5 flex flex-col gap-2.5 sm:mt-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                <InteractiveButton
                  href="/contact"
                  trackEvent="serviceInterest"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/25 transition-interactive hover:from-indigo-500 hover:to-violet-500 sm:px-7 sm:text-base"
                >
                  Get in touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </InteractiveButton>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full border-2 border-dashed border-slate-300/90 bg-white/60 px-5 py-2.5 text-sm font-semibold text-slate-800 backdrop-blur-sm transition-interactive hover:border-indigo-400 hover:bg-white"
                >
                  Browse all services
                </Link>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </PageSection>

      {/* What we build — saturated gradient tiles (template / editorial) */}
      <PageSection
        variant="default"
        className="relative overflow-hidden border-y border-white/20 pf-mesh-vivid !py-24 md:!py-32"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(255,255,255,0.12),transparent_50%)]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 pf-fine-grid opacity-[0.12]" aria-hidden />

        <div className="relative z-[1]">
          <RevealOnScroll>
            <div className="flex flex-col gap-10 border-b border-white/10 pb-12 md:flex-row md:items-end md:justify-between md:gap-14 md:pb-14">
              <div className="max-w-2xl">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-200/90">What we build</p>
                <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.04em] text-white md:text-[2.35rem] md:leading-[1.1]">
                  Types of websites <span className="text-cyan-300">&amp;</span> software
                </h2>
                <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-slate-200/90 md:text-lg">
                  E‑commerce, internal tools, SaaS, marketing sites, and integrations—scoped to outcomes and roadmaps, not a
                  generic project grid.
                </p>
              </div>
              <Link
                href="/portfolio"
                className="group inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 ring-1 ring-white/25 backdrop-blur-md transition-interactive hover:bg-white/20 md:self-end"
              >
                All categories
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </RevealOnScroll>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {solutionPreview.map((item, i) => {
              const tile = showcaseTiles[i % showcaseTiles.length];
              return (
                <RevealOnScroll key={item.id} delayMs={i * 55}>
                  <Link
                    href="/portfolio"
                    className={cn(
                      'group relative flex min-h-[220px] flex-col overflow-hidden rounded-[2rem] p-7 shadow-2xl shadow-black/25 ring-1 ring-white/10 transition-all duration-500 motion-safe:hover:scale-[1.02] motion-safe:hover:shadow-cyan-500/20 sm:min-h-[240px] sm:p-8',
                      `bg-gradient-to-br ${tile.mesh}`
                    )}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent"
                      aria-hidden
                    />
                    <div
                      className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full ${tile.glow} blur-3xl mix-blend-screen`}
                      aria-hidden
                    />
                    <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
                      <div
                        className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 backdrop-blur-sm ${tile.iconWrap}`}
                      >
                        <item.Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                      </div>
                      <h3 className="font-display mt-6 text-[1.125rem] font-semibold leading-snug tracking-tight text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.55)] sm:text-xl md:text-[1.3rem] md:leading-[1.25]">
                        {item.title}
                      </h3>
                      <p className="mt-3 line-clamp-5 flex-1 font-sans text-[15px] font-normal leading-[1.75] text-white/95 antialiased [text-shadow:0_1px_12px_rgba(0,0,0,0.55)] sm:text-base sm:leading-[1.7]">
                        {item.summary}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.45)] transition group-hover:gap-3">
                        Explore
                        <ArrowRight className="h-4 w-4 shrink-0 opacity-95" />
                      </span>
                    </div>
                  </Link>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </PageSection>

      {/* Three reasons — oversized index + gradient rails (no cards) */}
      <PageSection variant="muted" className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/80 to-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-300/50 to-transparent" aria-hidden />
        <div className="pointer-events-none absolute left-0 top-1/4 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-200/35 blur-3xl" aria-hidden />

        <div className="relative z-[1]">
          <RevealOnScroll>
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-slate-500">Why Pixel Forge</p>
              <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.03em] text-slate-950 md:text-4xl">
                How we work with your team
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Principles we apply on every engagement—from first sketch to post-launch care.
              </p>
            </div>
          </RevealOnScroll>

          <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
            {reasons.map(({ icon: Icon, title, body }, ri) => {
              const strip = reasonStrips[ri % reasonStrips.length];
              return (
                <RevealOnScroll key={title}>
                  <div className="relative overflow-visible pt-2">
                    <div
                      className={`absolute left-0 top-0 h-1.5 w-full rounded-full bg-gradient-to-r ${strip.bar}`}
                      aria-hidden
                    />
                    <div className={`pointer-events-none absolute -inset-x-3 -inset-y-2 -z-10 rounded-[1.75rem] bg-gradient-to-b ${strip.wash} opacity-80 blur-lg`} aria-hidden />
                    <span
                      className={`relative z-[1] block bg-gradient-to-br bg-clip-text pb-1 font-display text-6xl font-bold tabular-nums leading-none text-transparent sm:text-7xl md:text-8xl ${reasonIndexGradient[ri]}`}
                      aria-hidden
                    >
                      {String(ri + 1).padStart(2, '0')}
                    </span>
                    <div className={`mt-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${strip.iconBg}`}>
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display mt-5 text-xl font-semibold tracking-tight text-slate-950">{title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{body}</p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </PageSection>

      {/* Core capabilities — split strips (no uniform cards) */}
      <PageSection variant="default" container="wide" className="relative overflow-hidden bg-slate-950">
        <div className="pointer-events-none absolute inset-0 pf-fine-grid opacity-[0.07]" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-500/40 via-fuchsia-500/40 to-amber-500/40" aria-hidden />

        <div className="relative z-[1]">
          <RevealOnScroll>
            <div className="text-center">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-cyan-400/90">Capabilities</p>
              <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
                Where we go deep
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
                Focus areas for larger builds—each engagement is scoped to what you need.
              </p>
            </div>
          </RevealOnScroll>

          <div className="mt-16 flex flex-col gap-6">
            {topCapabilities.map((capability, i) => (
              <RevealOnScroll key={capability.title} delayMs={i * 70}>
                <article
                  className={cn(
                    'overflow-hidden rounded-[2rem] shadow-2xl shadow-black/40 ring-1 ring-white/10 md:flex md:divide-x md:divide-white/10',
                    i % 2 === 1 && 'md:flex-row-reverse'
                  )}
                >
                  <div
                    className={cn(
                      'relative flex flex-1 flex-col justify-center px-8 py-10 md:w-[min(44%,28rem)] md:flex-none md:px-10 md:py-12 lg:px-12',
                      capability.panel
                    )}
                  >
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden />
                    <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 [&>svg]:h-8 [&>svg]:w-8">
                      {capability.icon}
                    </div>
                    <h3 className="font-display relative mt-8 text-2xl font-semibold leading-tight tracking-tight text-white md:text-[1.65rem]">
                      {capability.title}
                    </h3>
                  </div>
                  <div className="flex flex-1 flex-col justify-center bg-slate-900/95 px-8 py-10 md:px-10 md:py-12 lg:px-12">
                    <p className="text-[15px] leading-relaxed text-slate-300 md:text-base">{capability.description}</p>
                    <ul className="mt-8 space-y-4 border-t border-white/10 pt-8">
                      {capability.features.map((feature) => (
                        <li key={feature} className="flex gap-3 text-[15px] leading-relaxed text-slate-200">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                            <CheckCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </PageSection>

      {/* Stewardship — full-bleed ribbon */}
      <PageSection variant="default" className="relative overflow-hidden border-t border-white/10 bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 !py-16 md:!py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(255,255,255,0.2),transparent_55%)]" aria-hidden />
        <RevealOnScroll>
          <div className="relative mx-auto flex max-w-reading-wide flex-col items-start gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
            <div className="flex gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-white shadow-lg ring-1 ring-white/30 backdrop-blur-sm">
                <Settings className="h-7 w-7" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-white md:text-[1.65rem]">Ongoing engineering stewardship</h3>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/90 md:text-base">
                  After launch, we help with monitoring, dependency updates, performance checks, and small feature work—so your
                  platform stays secure and fast as requirements change.
                </p>
              </div>
            </div>
            <InteractiveButton
              href="/contact"
              trackEvent="serviceInterest"
              className="inline-flex w-full shrink-0 items-center justify-center rounded-2xl bg-white px-8 py-3.5 text-sm font-semibold text-indigo-700 shadow-xl shadow-black/20 transition-interactive hover:bg-slate-50 md:w-auto"
            >
              Discuss support
            </InteractiveButton>
          </div>
        </RevealOnScroll>
      </PageSection>

      {/* Closing CTA — navy */}
      <PageSection variant="line" className="!bg-gradient-to-b !from-slate-950 !via-indigo-950/90 !to-slate-950 !py-16 md:!py-20">
        <div className="relative mx-auto max-w-content overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 px-8 py-14 shadow-2xl shadow-indigo-950/50 md:px-14 md:py-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/25 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-violet-600/25 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" aria-hidden />
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Ready for a technical conversation?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Tell us about your platform, timeline, and constraints—we&apos;ll reply with a clear, practical next step.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <InteractiveButton
                href="/contact"
                trackEvent="serviceInterest"
                className="inline-flex w-full items-center justify-center rounded-xl bg-primary-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-black/30 transition-interactive hover:bg-primary-400 sm:w-auto"
              >
                Get in touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </InteractiveButton>
              <Link
                href="/services"
                className="inline-flex w-full items-center justify-center rounded-xl border border-slate-600 bg-transparent px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-interactive hover:border-slate-500 hover:bg-white/5 sm:w-auto"
              >
                Explore services
              </Link>
            </div>
          </div>
        </div>
      </PageSection>
    </div>
  );
}

