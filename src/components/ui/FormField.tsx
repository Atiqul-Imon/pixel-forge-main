'use client';

import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  children: ReactNode;
  className?: string;
  htmlFor?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  helperText,
  children,
  className,
  htmlFor,
}) => {
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          {label}
          {required && <span className="text-error-600 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="mt-1.5 text-sm text-error-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default FormField;

