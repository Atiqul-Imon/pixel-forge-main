'use client';

import React, { ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  className?: string;
  showRetry?: boolean;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'An error occurred while loading this content. Please try again.',
  icon,
  action,
  className,
  showRetry = false,
  onRetry,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      <div className="mb-4 text-error-600">
        {icon || <AlertCircle className="w-12 h-12" />}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {message && (
        <p className="text-sm text-gray-500 max-w-sm mb-6">{message}</p>
      )}
      <div className="flex items-center gap-3">
        {showRetry && onRetry && (
          <Button
            variant="outline"
            onClick={onRetry}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Retry
          </Button>
        )}
        {action && (
          <Button
            variant={action.variant || 'primary'}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;

