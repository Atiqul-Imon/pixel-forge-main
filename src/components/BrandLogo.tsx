import { cn } from '@/lib/utils';

type BrandLogoProps = {
  className?: string;
  /** Icon + wordmark */
  variant?: 'full' | 'mark';
  /** Light mark on dark backgrounds */
  inverted?: boolean;
};

export function BrandLogo({ className, variant = 'full', inverted }: BrandLogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('h-9 w-9 shrink-0', inverted ? 'text-primary-400' : 'text-primary-600')}
        aria-hidden
      >
        <rect
          x="1"
          y="1"
          width="34"
          height="34"
          rx="9"
          strokeWidth="1"
          className={inverted ? 'stroke-zinc-600 fill-zinc-900' : 'stroke-zinc-200 fill-white'}
        />
        <path
          d="M10 25V11h6.2c3.1 0 5.3 1.7 5.3 4.4 0 2.4-1.6 4-4 4.4L22 25h-3.4l-4.2-4.7H13.2V25H10zm3.2-7.4h2.8c1.4 0 2.3-.8 2.3-2 0-1.2-.9-2-2.3-2h-2.8v4z"
          fill="currentColor"
        />
        <path d="M24 11h3v14h-3V11z" fill="currentColor" opacity="0.35" />
      </svg>
      {variant === 'full' ? (
        <span
          className={cn(
            'font-display text-lg font-semibold tracking-tight sm:text-xl',
            inverted ? 'text-white' : 'text-slate-950'
          )}
        >
          Pixel Forge
        </span>
      ) : null}
    </span>
  );
}
