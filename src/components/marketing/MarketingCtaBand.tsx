import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type MarketingCtaBandProps = {
  id?: string;
  title: string;
  description: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  className?: string;
};

/**
 * Navy closing band — same philosophy as the home page bottom CTA.
 */
export function MarketingCtaBand({ id, title, description, primary, secondary, className }: MarketingCtaBandProps) {
  return (
    <section id={id} className={cn('border-t border-slate-800/80 bg-slate-950 py-14 md:py-20', className)}>
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 px-8 py-12 shadow-2xl md:px-12 md:py-14 lg:rounded-3xl">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-600/20 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-slate-700/25 blur-3xl" aria-hidden />
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">{title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">{description}</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={primary.href}
                className="inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-8 py-3.5 text-base font-bold uppercase tracking-wide text-white shadow-lg shadow-black/25 transition-interactive hover:bg-orange-400 sm:w-auto"
              >
                {primary.label}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              {secondary ? (
                <Link
                  href={secondary.href}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-slate-600 bg-transparent px-8 py-3.5 text-base font-semibold text-white transition-interactive hover:border-slate-500 hover:bg-white/5 sm:w-auto"
                >
                  {secondary.label}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
