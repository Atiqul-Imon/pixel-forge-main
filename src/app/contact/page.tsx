'use client';

import { useState } from 'react';
import {
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
  Facebook,
  Linkedin,
  Mail,
  Clock,
  ArrowRight,
  MessageSquare,
  Calendar,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import { trackEvent } from '@/lib/gtag';
import { getPixelDataForAPI } from '@/lib/pixelTracker';
import { PageSection } from '@/components/marketing/PageSection';
import { MarketingPageHero } from '@/components/marketing/MarketingPageHero';
import { MarketingCtaBand } from '@/components/marketing/MarketingCtaBand';
import { cn } from '@/lib/utils';

const inputClass =
  'w-full rounded-sm border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition-interactive placeholder:text-slate-400 focus:border-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/25';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const services = [
    'Web Development',
    'Landing Page',
    'E-commerce Website',
    'Digital Marketing',
    'Support & Maintenance',
    'Other',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    let pixelData: Record<string, unknown> = {};
    if (typeof window !== 'undefined') {
      try {
        pixelData = { ...getPixelDataForAPI() };
      } catch {
        const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
        if (pixelId) pixelData.pixelId = pixelId;
      }
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ...pixelData,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        trackEvent.contactFormSubmit();
        if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).trackLead) {
          (
            (window as unknown as Record<string, unknown>).trackLead as (
              email: string,
              service: string,
              name?: string
            ) => void
          )(formData.email, formData.service, formData.name);
        }
        if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).trackContactFormSubmit) {
          ((window as unknown as Record<string, unknown>).trackContactFormSubmit as () => void)();
        }
        setFormData({ name: '', email: '', company: '', service: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <MarketingPageHero
        eyebrow="Contact"
        title="Let's build something solid"
        description="Share your goals and constraints—we typically respond within one business day with next steps."
      >
        <a
          href="tel:+8801714918360"
          className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-black/20 transition-interactive hover:bg-orange-400"
          onClick={() => trackEvent.ctaClick('Call Now - Contact Hero')}
        >
          <Phone className="mr-2 h-4 w-4" />
          Call now
        </a>
        <a
          href="mailto:hello@pixelforgebd.com"
          className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-interactive hover:bg-white/15"
        >
          <Mail className="mr-2 h-4 w-4" />
          Email us
        </a>
      </MarketingPageHero>

      <div className="border-b border-slate-200/90 bg-slate-50/90">
        <p className="mx-auto max-w-content px-4 py-4 text-center text-sm leading-relaxed text-slate-600 sm:px-6 lg:px-8">
          <Globe className="mr-1.5 inline-block h-4 w-4 shrink-0 text-primary-600" aria-hidden />
          <span className="font-medium text-slate-800">Global clients:</span> async-first collaboration, written
          discovery, and invoicing in USD available on request—tell us your timezone in the form.
        </p>
      </div>

      <PageSection variant="muted" className="!py-16 md:!py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div
              className={cn(
                'rounded-sm border bg-white p-8 shadow-xl shadow-slate-900/5 md:p-10',
                submitStatus === 'error' ? 'border-red-200 ring-1 ring-red-100' : 'border-slate-200/90'
              )}
            >
              <div className="mb-8 flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-700 text-white shadow-md">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold text-slate-900">Send a message</h2>
                  <div className="mt-2 h-1 w-12 rounded-full bg-primary-600" aria-hidden />
                  <p className="mt-3 text-sm text-slate-600">
                    Fields marked with <span className="text-red-600">*</span> are required.
                  </p>
                </div>
              </div>

              {submitStatus === 'success' && (
                <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  <CheckCircle className="h-5 w-5 shrink-0" />
                  <span className="text-sm font-medium">Thank you—your message was sent successfully.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-900">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span className="text-sm font-medium">
                    Something went wrong. Please try again or email us directly.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-700">
                      Full name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-700">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="mb-2 block text-sm font-medium text-zinc-700">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Organization name"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="mb-2 block text-sm font-medium text-zinc-700">
                    Service <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className={cn(inputClass, 'cursor-pointer')}
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-zinc-700">
                    Project details <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={cn(inputClass, 'resize-none')}
                    placeholder="Goals, timeline, links, and anything else we should know."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center rounded-sm bg-orange-500 px-8 py-3.5 text-base font-bold uppercase tracking-wide text-white shadow-md transition-interactive hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2 inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-8">
              <div className="rounded-2xl border border-zinc-200/90 bg-white p-8 shadow-sm">
                <h3 className="font-display text-lg font-semibold text-zinc-900">What happens next</h3>
                <ul className="mt-5 space-y-4 text-[15px] leading-relaxed text-zinc-600">
                  <li className="flex gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" aria-hidden />
                    We review your note and respond within one business day (UTC+6; we align to your timezone).
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" aria-hidden />
                    If there&apos;s a fit, we propose a short discovery call or a written scope outline.
                  </li>
                  <li className="flex gap-3">
                    <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" aria-hidden />
                    From there: milestones, communication cadence, and a clear path to launch or handoff.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-zinc-200/90 bg-white p-8 shadow-sm">
                <h3 className="font-display text-lg font-semibold text-zinc-900">Direct channels</h3>
                <div className="mt-6 space-y-5 text-sm">
                  <a
                    href="https://wa.me/8801714918360"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-zinc-700 transition-interactive hover:text-primary-700"
                    onClick={() => {
                      if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).trackWhatsAppClick) {
                        ((window as unknown as Record<string, unknown>).trackWhatsAppClick as () => void)();
                      }
                    }}
                  >
                    <Phone className="mt-0.5 h-5 w-5 text-emerald-600" />
                    <span>
                      <span className="font-semibold text-zinc-900">WhatsApp</span>
                      <br />
                      +880 1714 918360
                    </span>
                  </a>
                  <a
                    href="https://www.facebook.com/pixelforge.official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-zinc-700 transition-interactive hover:text-primary-700"
                  >
                    <Facebook className="h-5 w-5 text-primary-600" />
                    @pixelforge.official
                  </a>
                  <a
                    href="https://www.linkedin.com/company/109025907/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-zinc-700 transition-interactive hover:text-primary-700"
                  >
                    <Linkedin className="h-5 w-5 text-primary-600" />
                    Pixel Forge on LinkedIn
                  </a>
                </div>
              </div>

              <Link
                href="/services"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-900 transition-interactive hover:bg-slate-100"
              >
                Explore services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </PageSection>

      <MarketingCtaBand
        title="Prefer a quick call first?"
        description="Use WhatsApp or phone—we will help you scope the right engagement."
        primary={{ href: 'tel:+8801714918360', label: 'Call Pixel Forge' }}
        secondary={{ href: '/portfolio', label: 'What we build' }}
      />
    </div>
  );
}
