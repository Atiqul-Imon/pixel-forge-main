'use client';

import type { ReactNode } from 'react';
import {
  Code,
  BarChart3,
  Settings,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Building2,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { trackEvent } from '@/lib/gtag';
import { PageSection } from '@/components/marketing/PageSection';
import { MarketingPageHero } from '@/components/marketing/MarketingPageHero';
import { MarketingCtaBand } from '@/components/marketing/MarketingCtaBand';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { FeatureCard } from '@/components/marketing/FeatureCard';
import { RevealOnScroll } from '@/components/marketing/RevealOnScroll';
import type { FeatureAccent } from '@/components/marketing/FeatureCard';
import { cn } from '@/lib/utils';

export default function ServicesPage() {
  useEffect(() => {
    trackEvent.servicePageView('Services');
  }, []);

  const services: Array<{
    icon: ReactNode;
    title: string;
    description: string;
    features: string[];
    accent: FeatureAccent;
  }> = [
    {
      icon: <Building2 className="h-7 w-7" />,
      title: 'Web Platforms & Digital Infrastructure',
      description:
        'Business-critical web platforms engineered to support operations, growth, and long-term evolution. Architecture decisions prioritize stability, performance, and maintainability.',
      features: [
        'Systems designed for growth and traffic variability',
        'Secure, scalable platform architecture',
        'Performance-optimized, SEO-ready foundations',
      ],
      accent: 'blue',
    },
    {
      icon: <BarChart3 className="h-7 w-7" />,
      title: 'Growth, Performance & Discoverability',
      description:
        'Technical and structural optimization ensures platforms are discoverable, fast, and measurable—supporting sustainable organic and paid growth without compromising system integrity.',
      features: [
        'Technical SEO and system-level optimization',
        'Performance benchmarking and improvements',
        'Analytics and measurement readiness',
      ],
      accent: 'emerald',
    },
    {
      icon: <Settings className="h-7 w-7" />,
      title: 'Ongoing Engineering Stewardship',
      description:
        'Long-term technical responsibility for platform stability, security, and evolution. Systems remain reliable and adaptable as business requirements change.',
      features: [
        'Continuous monitoring and updates',
        'Performance and security reviews',
        'Structured support and improvement cycles',
      ],
      accent: 'orange',
    },
    {
      icon: <FileText className="h-7 w-7" />,
      title: 'Data Conversion',
      description:
        'Automate data processing with professional capture, storage, and searchable document management. Ideal for government, finance, NGOs, and healthcare contexts.',
      features: [
        'Data capture from paper-based documents',
        'Secure and organized data storage',
        'Searchable, accessible archives',
        'Tailored workflows for regulated environments',
      ],
      accent: 'violet',
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description:
        'Business objectives, system requirements, and constraints are analyzed to define a clear technical direction.',
      Icon: Globe,
    },
    {
      step: '02',
      title: 'Design & Development',
      description:
        'Architecture and interfaces are implemented with scalability, performance, and maintainability in focus.',
      Icon: Code,
    },
    {
      step: '03',
      title: 'Testing & Optimization',
      description:
        'Quality assurance, performance testing, and optimization ensure stability and usability.',
      Icon: Zap,
    },
    {
      step: '04',
      title: 'Launch & Ongoing Support',
      description:
        'Deployment, monitoring, and support for long-term reliability and continuous improvement.',
      Icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <MarketingPageHero
        eyebrow="Services"
        title="Engineering capabilities"
        description="Digital systems engineered, maintained, and evolved with long-term performance, scalability, and operational stability in mind."
      >
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-3.5 text-base font-bold uppercase tracking-wide text-white shadow-lg shadow-black/20 transition-interactive hover:bg-orange-400"
          onClick={() => trackEvent.ctaClick('Discuss a Project - Services Hero')}
        >
          Discuss a project
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
        <Link
          href="/portfolio"
          className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-interactive hover:bg-white/15"
        >
          What we build
        </Link>
      </MarketingPageHero>

      <div className="sticky top-16 z-30 hidden border-b border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-md lg:block">
        <div className="mx-auto flex max-w-content gap-8 px-4 py-3 text-sm font-semibold text-slate-600 sm:px-6 lg:px-8">
          <a href="#capabilities" className="transition-interactive hover:text-primary-700">
            Capabilities
          </a>
          <a href="#process" className="transition-interactive hover:text-primary-700">
            Process
          </a>
          <a href="#cta" className="transition-interactive hover:text-primary-700">
            Start a project
          </a>
        </div>
      </div>

      <PageSection id="capabilities" variant="muted">
        <RevealOnScroll>
          <SectionHeader
            eyebrow="Scope"
            accentBar
            title={
              <>
                Core engineering <span className="text-zinc-500">capabilities</span>
              </>
            }
            description="Each layer supports a complete digital system—from foundational architecture to long-term stewardship."
          />
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {services.map((service, i) => (
            <RevealOnScroll key={service.title} delayMs={i * 50}>
              <FeatureCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                accent={service.accent}
              />
            </RevealOnScroll>
          ))}
        </div>
      </PageSection>

      <PageSection id="process" variant="line">
        <RevealOnScroll>
          <SectionHeader
            eyebrow="Process"
            accentBar
            title="How we deliver"
            description="A structured path that keeps technical risk visible and delivery predictable—without slowing momentum."
          />
        </RevealOnScroll>

        <div className="relative grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
          <div
            className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent lg:block"
            aria-hidden
          />
          {process.map(({ step, title, description, Icon }) => (
            <div
              key={step}
              className={cn(
                'relative flex flex-col rounded-2xl border border-zinc-200/90 bg-white p-6 md:p-7',
                'shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[box-shadow,border-color] duration-300',
                'hover:border-zinc-300 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.1)]'
              )}
            >
              <div className="mb-5 flex items-start justify-between gap-3">
                <span className="text-3xl font-semibold tabular-nums leading-none text-zinc-200">
                  {step}
                </span>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-800 ring-1 ring-primary-100/90">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-zinc-900 mb-2">{title}</h3>
              <p className="text-[15px] leading-relaxed text-zinc-600">{description}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <MarketingCtaBand
        id="cta"
        title="Looking for a long-term technical partner?"
        description="Start a conversation about your platform or product—we will align on scope, risks, and the right next step."
        primary={{ href: '/contact', label: 'Discuss a project' }}
        secondary={{ href: '/portfolio', label: 'Solution categories' }}
      />
    </div>
  );
}
