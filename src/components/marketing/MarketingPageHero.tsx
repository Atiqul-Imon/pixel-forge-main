import { cn } from '@/lib/utils';

export type MarketingPageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  /** Extra row: CTAs, back links, etc. */
  children?: React.ReactNode;
  align?: 'center' | 'left';
  className?: string;
  /** Shorter vertical padding (policy pages, case study headers) */
  compact?: boolean;
};

/**
 * Navy → blue gradient hero for inner marketing pages (matches home / Plego-style bar).
 */
export function MarketingPageHero({
  eyebrow,
  title,
  description,
  children,
  align = 'center',
  className,
  compact = false,
}: MarketingPageHeroProps) {
  const isCenter = align === 'center';

  return (
    <section className={cn('relative overflow-hidden border-b border-white/10', className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#153a72] to-[#2563eb]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:48px_48px]"
        aria-hidden
      />

      <div
        className={cn(
          'relative z-10 mx-auto max-w-content-wide px-4 text-white sm:px-6 lg:px-8',
          compact ? 'py-12 md:py-14' : 'py-14 md:py-20 lg:py-24',
          isCenter && 'text-center'
        )}
      >
        <p
          className={cn(
            'text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 sm:text-sm',
            isCenter && 'mx-auto max-w-3xl'
          )}
        >
          {eyebrow}
        </p>
        <div
          className={cn('mt-4 h-1 w-12 rounded-full bg-primary-400/95', isCenter && 'mx-auto')}
          aria-hidden
        />

        <h1
          className={cn(
            'font-display mt-5 text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-4xl md:text-[2.65rem] md:leading-[1.08]',
            isCenter && 'mx-auto max-w-4xl'
          )}
        >
          {title}
        </h1>

        {description ? (
          <p
            className={cn(
              'mt-5 max-w-2xl text-base leading-[1.65] text-slate-100 md:text-lg',
              isCenter && 'mx-auto'
            )}
          >
            {description}
          </p>
        ) : null}

        {children ? (
          <div
            className={cn(
              'mt-10',
              isCenter &&
                'flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4'
            )}
          >
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
