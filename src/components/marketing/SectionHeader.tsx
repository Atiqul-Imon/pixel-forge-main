import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  /** Short primary accent bar under the eyebrow (enterprise pattern) */
  accentBar?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
  accentBar = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-14 md:mb-16 lg:mb-20 max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        align === 'left' && 'text-left',
        className
      )}
    >
      {eyebrow ? (
        <div className={cn('mb-4', align === 'center' && 'mx-auto flex max-w-3xl flex-col items-center')}>
          <p
            className={cn(
              'text-xs font-semibold uppercase tracking-[0.22em] text-primary-700',
              align === 'center' && 'text-center'
            )}
          >
            {eyebrow}
          </p>
          {accentBar ? (
            <div
              className={cn('mt-3 h-1 w-12 rounded-full bg-primary-600', align === 'center' && 'mx-auto')}
              aria-hidden
            />
          ) : null}
        </div>
      ) : null}
      <h2
        className={cn(
          'font-display text-3xl sm:text-4xl md:text-[2.75rem] font-semibold tracking-[-0.02em] text-slate-950 leading-[1.12]',
          description ? 'mb-5' : ''
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className="text-lg leading-[1.65] text-slate-700 md:text-xl">{description}</p>
      ) : null}
    </div>
  );
}
