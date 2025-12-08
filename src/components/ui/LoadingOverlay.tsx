'use client';

import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import Spinner from './Spinner';

export interface LoadingOverlayProps {
  isLoading: boolean;
  children: ReactNode;
  message?: string;
  className?: string;
  spinnerSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  children,
  message,
  className,
  spinnerSize = 'lg',
}) => {
  return (
    <div className={cn('relative', className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
          <div className="flex flex-col items-center gap-3">
            <Spinner size={spinnerSize} color="primary" />
            {message && (
              <p className="text-sm font-medium text-gray-700">{message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingOverlay;

