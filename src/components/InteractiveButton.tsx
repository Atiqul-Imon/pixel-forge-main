'use client';

import Link from 'next/link';

interface InteractiveButtonProps {
  href: string;
  children: React.ReactNode;
  className: string;
  trackEvent?: string;
}

export default function InteractiveButton({ href, children, className, trackEvent }: InteractiveButtonProps) {
  const handleClick = () => {
    if (trackEvent && typeof window !== 'undefined') {
      if (trackEvent === 'serviceInterest' && (window as unknown as Record<string, unknown>).trackServiceInterest) {
        ((window as unknown as Record<string, unknown>).trackServiceInterest as (service: string) => void)('General Inquiry');
      }
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
    >
      {children}
    </Link>
  );
}
