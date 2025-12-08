'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    label?: string;
    isPositive?: boolean;
  };
  icon?: React.ReactNode;
  iconColor?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  trend?: number[]; // Array of values for mini sparkline
  onClick?: () => void;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  iconColor = 'primary',
  trend,
  onClick,
  className,
}) => {
  const iconColors = {
    primary: 'bg-purple-100 text-purple-600',
    success: 'bg-green-100 text-green-600',
    warning: 'bg-amber-100 text-amber-600',
    error: 'bg-red-100 text-red-600',
    info: 'bg-cyan-100 text-cyan-600',
  };

  const formatValue = (val: string | number): string => {
    if (typeof val === 'number') {
      return val.toLocaleString();
    }
    return val;
  };

  const renderTrend = () => {
    if (!trend || trend.length < 2) return null;

    const max = Math.max(...trend);
    const min = Math.min(...trend);
    const range = max - min || 1;
    const width = 60;
    const height = 20;
    const points = trend.map((val, index) => {
      const x = (index / (trend.length - 1)) * width;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    const isPositiveTrend = trend[trend.length - 1] > trend[0];

    return (
      <div className="mt-2">
        <svg width={width} height={height} className="overflow-visible">
          <polyline
            points={points}
            fill="none"
            stroke={isPositiveTrend ? '#10B981' : '#EF4444'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-lg border border-gray-200 p-6 transition-all duration-200',
        'hover:shadow-md hover:-translate-y-0.5',
        onClick && 'cursor-pointer',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-gray-900">{formatValue(value)}</p>
            {change && (
              <div className={cn(
                'flex items-center gap-1 text-sm font-medium',
                change.isPositive !== false ? 'text-green-600' : 'text-red-600'
              )}>
                {change.isPositive !== false ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{Math.abs(change.value)}%</span>
                {change.label && (
                  <span className="text-gray-500 text-xs ml-1">{change.label}</span>
                )}
              </div>
            )}
          </div>
          {renderTrend()}
        </div>
        {icon && (
          <div className={cn(
            'p-3 rounded-lg flex-shrink-0',
            iconColors[iconColor]
          )}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;

