'use client';

import React, { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TagsInputProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  maxTags?: number;
  className?: string;
  disabled?: boolean;
  separator?: string | RegExp;
}

const TagsInput: React.FC<TagsInputProps> = ({
  value = [],
  onChange,
  placeholder = 'Type and press Enter...',
  label,
  error,
  required = false,
  maxTags,
  className,
  disabled = false,
  separator = /[,\n]/,
}) => {
  const [inputValue, setInputValue] = useState('');

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag || value.includes(trimmedTag)) return;
    if (maxTags && value.length >= maxTags) return;

    const newTags = [...value, trimmedTag];
    onChange?.(newTags);
    setInputValue('');
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = value.filter(tag => tag !== tagToRemove);
    onChange?.(newTags);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue);
      }
    } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const tags = pastedText.split(separator).map(tag => tag.trim()).filter(Boolean);
    
    tags.forEach(tag => {
      if (maxTags && value.length >= maxTags) return;
      if (!value.includes(tag)) {
        addTag(tag);
      }
    });
  };

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
          {required && <span className="text-error-600 ml-1">*</span>}
        </label>
      )}

      <div
        className={cn(
          'flex flex-wrap gap-2 px-3 py-2 border rounded-lg',
          'focus-within:ring-2 focus-within:ring-offset-0 transition-colors',
          error
            ? 'border-error-500 focus-within:ring-error-500'
            : 'border-gray-300 focus-within:ring-primary-500 focus-within:border-primary-500',
          disabled && 'bg-gray-50 cursor-not-allowed opacity-60'
        )}
      >
        {value.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary-100 text-primary-800 rounded-md text-sm font-medium"
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-primary-900 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={value.length === 0 ? placeholder : ''}
          disabled={disabled || (maxTags !== undefined && value.length >= maxTags)}
          className="flex-1 min-w-[120px] outline-none bg-transparent text-sm"
        />
      </div>

      {error && (
        <p className="mt-1.5 text-sm text-error-600">{error}</p>
      )}
      {maxTags && (
        <p className="mt-1.5 text-xs text-gray-500">
          {value.length} / {maxTags} tags
        </p>
      )}
    </div>
  );
};

export default TagsInput;

