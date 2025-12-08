'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Calendar, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, subDays, subMonths, startOfDay, endOfDay } from 'date-fns';

export interface DateRange {
  from: Date;
  to: Date;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange: (range: DateRange) => void;
  presets?: Array<{
    label: string;
    range: DateRange;
  }>;
  className?: string;
}

const defaultPresets = [
  { label: 'Today', range: { from: startOfDay(new Date()), to: endOfDay(new Date()) } },
  { label: 'Last 7 days', range: { from: startOfDay(subDays(new Date(), 7)), to: endOfDay(new Date()) } },
  { label: 'Last 30 days', range: { from: startOfDay(subDays(new Date(), 30)), to: endOfDay(new Date()) } },
  { label: 'This month', range: { from: startOfDay(new Date(new Date().getFullYear(), new Date().getMonth(), 1)), to: endOfDay(new Date()) } },
  { label: 'Last month', range: { from: startOfDay(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)), to: endOfDay(new Date(new Date().getFullYear(), new Date().getMonth(), 0)) } },
];

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  presets = defaultPresets,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fromDate, setFromDate] = useState(value?.from ? format(value.from, 'yyyy-MM-dd') : '');
  const [toDate, setToDate] = useState(value?.to ? format(value.to, 'yyyy-MM-dd') : '');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setFromDate(format(value.from, 'yyyy-MM-dd'));
      setToDate(format(value.to, 'yyyy-MM-dd'));
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleApply = () => {
    if (fromDate && toDate) {
      onChange({
        from: startOfDay(new Date(fromDate)),
        to: endOfDay(new Date(toDate)),
      });
      setIsOpen(false);
    }
  };

  const handlePreset = (preset: DateRange) => {
    onChange(preset);
    setIsOpen(false);
  };

  const handleClear = () => {
    setFromDate('');
    setToDate('');
    setIsOpen(false);
  };

  const displayText = value
    ? `${format(value.from, 'MMM d, yyyy')} - ${format(value.to, 'MMM d, yyyy')}`
    : 'Select date range';

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg',
          'bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500',
          'transition-colors'
        )}
      >
        <Calendar className="w-4 h-4 text-gray-400" />
        <span className="text-sm font-medium">{displayText}</span>
        {value && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className="p-0.5 hover:bg-gray-200 rounded"
          >
            <X className="w-3 h-3 text-gray-400" />
          </button>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-[slideUp_0.2s_ease-out]">
          <div className="p-4">
            {/* Presets */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Quick Select</p>
              <div className="grid grid-cols-2 gap-2">
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handlePreset(preset.range)}
                    className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200 text-left transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Inputs */}
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">From</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">To</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  min={fromDate}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200">
              <button
                onClick={handleClear}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleApply}
                disabled={!fromDate || !toDate}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;

