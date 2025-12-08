'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant = 'rectangular',
      width,
      height,
      animation = 'pulse',
      style,
      ...props
    },
    ref
  ) => {
    const variants = {
      text: 'h-4 rounded',
      circular: 'rounded-full',
      rectangular: '',
      rounded: 'rounded-lg',
    };

    const animations = {
      pulse: 'animate-pulse',
      wave: 'animate-[wave_1.6s_ease-in-out_0.5s_infinite]',
      none: '',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'bg-gray-200',
          variants[variant],
          animations[animation],
          className
        )}
        style={{
          width: width || (variant === 'text' ? '100%' : undefined),
          height: height || (variant === 'text' ? undefined : '1rem'),
          ...style,
        }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

// Pre-built skeleton components
export const SkeletonText = ({ lines = 3, className }: { lines?: number; className?: string }) => (
  <div className={cn('space-y-2', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        variant="text"
        width={i === lines - 1 ? '75%' : '100%'}
      />
    ))}
  </div>
);

export const SkeletonCard = ({ className }: { className?: string }) => (
  <div className={cn('p-6 space-y-4', className)}>
    <Skeleton variant="rounded" height={24} width="60%" />
    <SkeletonText lines={3} />
    <div className="flex gap-2">
      <Skeleton variant="rounded" height={36} width={100} />
      <Skeleton variant="rounded" height={36} width={100} />
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) => (
  <div className="space-y-3">
    {/* Header */}
    <div className="flex gap-4">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} variant="text" width="25%" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIdx) => (
      <div key={rowIdx} className="flex gap-4">
        {Array.from({ length: cols }).map((_, colIdx) => (
          <Skeleton key={colIdx} variant="text" width="25%" />
        ))}
      </div>
    ))}
  </div>
);

export default Skeleton;

