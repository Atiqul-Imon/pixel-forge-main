'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  /** Vertical offset when hidden (px) */
  y?: number;
  delayMs?: number;
};

export function RevealOnScroll({ children, className, y = 16, delayMs = 0 }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const onChange = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (delayMs > 0) {
          timeoutId = window.setTimeout(() => setVisible(true), delayMs);
        } else {
          setVisible(true);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [prefersReducedMotion, delayMs]);

  return (
    <div
      ref={ref}
      className={cn(
        !prefersReducedMotion && 'transition-[opacity,transform] duration-700 ease-out',
        visible ? 'translate-y-0 opacity-100' : 'opacity-0',
        className
      )}
      style={
        !visible && !prefersReducedMotion
          ? ({ transform: `translateY(${y}px)` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
