import Link from 'next/link';
import { cn } from '@/lib/utils';

const variants = {
  primary:
    'rounded-xl bg-primary-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-interactive hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
  secondary:
    'rounded-xl border border-zinc-300 bg-white px-8 py-3.5 text-base font-semibold text-zinc-900 shadow-sm transition-interactive hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400',
  ghost:
    'rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-700 transition-interactive hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400',
} as const;

type MarketingButtonVariant = keyof typeof variants;

type MarketingButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: MarketingButtonVariant;
  className?: string;
  fullWidth?: boolean;
  onClick?: () => void;
};

export function MarketingButton({
  href,
  children,
  variant = 'primary',
  className,
  fullWidth,
  onClick,
}: MarketingButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center',
        variants[variant],
        fullWidth && 'w-full sm:w-auto',
        className
      )}
    >
      {children}
    </Link>
  );
}
