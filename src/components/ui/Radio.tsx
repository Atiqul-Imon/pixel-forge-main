'use client';

import React, { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

const Radio: React.FC<RadioProps> = ({
  label,
  error,
  className,
  checked,
  disabled,
  ...props
}) => {
  return (
    <div className="flex items-center">
      <div className="relative flex items-center">
        <input
          type="radio"
          checked={checked}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <div
          className={cn(
            'w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all',
            checked
              ? 'border-primary-600'
              : 'border-gray-300 bg-white',
            error && 'border-error-500',
            disabled && 'opacity-50 cursor-not-allowed',
            !disabled && 'cursor-pointer hover:border-primary-500'
          )}
        >
          {checked && (
            <div className="w-2.5 h-2.5 bg-primary-600 rounded-full" />
          )}
        </div>
      </div>
      {label && (
        <label
          className={cn(
            'ml-2.5 text-sm text-gray-700 cursor-pointer',
            disabled && 'cursor-not-allowed opacity-50',
            error && 'text-error-600'
          )}
        >
          {label}
        </label>
      )}
      {error && (
        <p className="mt-1 text-sm text-error-600">{error}</p>
      )}
    </div>
  );
};

export default Radio;

