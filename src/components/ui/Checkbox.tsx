'use client';

import React, { InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  indeterminate?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  indeterminate = false,
  className,
  checked,
  disabled,
  ...props
}) => {
  return (
    <div className="flex items-start">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <div
          className={cn(
            'w-5 h-5 border-2 rounded flex items-center justify-center transition-all',
            checked
              ? 'bg-primary-600 border-primary-600'
              : 'bg-white border-gray-300',
            indeterminate && 'bg-primary-600 border-primary-600',
            error && 'border-error-500',
            disabled && 'opacity-50 cursor-not-allowed',
            !disabled && 'cursor-pointer hover:border-primary-500'
          )}
        >
          {checked && !indeterminate && (
            <Check className="w-3.5 h-3.5 text-white" />
          )}
          {indeterminate && (
            <div className="w-2.5 h-0.5 bg-white" />
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
          onClick={() => !disabled && props.onClick}
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

export default Checkbox;

