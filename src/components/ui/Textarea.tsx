'use client';

import React, { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  rows?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  required = false,
  rows = 4,
  resize = 'vertical',
  className,
  ...props
}) => {
  const resizeClasses = {
    none: 'resize-none',
    both: 'resize',
    horizontal: 'resize-x',
    vertical: 'resize-y',
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
          {required && <span className="text-error-600 ml-1">*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        className={cn(
          'w-full px-4 py-2.5 text-sm border rounded-lg',
          'focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors',
          error
            ? 'border-error-500 focus:ring-error-500'
            : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500',
          resizeClasses[resize],
          'placeholder:text-gray-400',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-error-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Textarea;

