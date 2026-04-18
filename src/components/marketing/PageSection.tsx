import { cn } from '@/lib/utils';

export type PageSectionContainer = 'default' | 'wide' | 'narrow';

type PageSectionProps = {
  children: React.ReactNode;
  id?: string;
  /** default: white; muted: zinc-50; line: white with top border */
  variant?: 'default' | 'muted' | 'line';
  /** Layout width: default (72rem), wide (80rem), narrow (reading column) */
  container?: PageSectionContainer;
  className?: string;
  containerClassName?: string;
};

const variantStyles = {
  default: 'bg-background',
  muted: 'bg-muted/80 mesh-light',
  line: 'bg-background border-t border-slate-200/70',
} as const;

const containerMax: Record<PageSectionContainer, string> = {
  default: 'max-w-content',
  wide: 'max-w-content-wide',
  narrow: 'max-w-reading-wide mx-auto',
};

export function PageSection({
  children,
  id,
  variant = 'default',
  container = 'default',
  className,
  containerClassName,
}: PageSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative py-section-y-sm md:py-section-y-md lg:py-section-y-lg',
        variantStyles[variant],
        className
      )}
    >
      <div
        className={cn(
          'mx-auto w-full px-4 sm:px-6 lg:px-8',
          containerMax[container],
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
