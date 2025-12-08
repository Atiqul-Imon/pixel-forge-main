'use client';

import React, { useState } from 'react';
import { GripVertical, X, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Card from './Card';

export interface WidgetProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  onRemove?: (id: string) => void;
  onResize?: (id: string, size: 'sm' | 'md' | 'lg') => void;
  defaultSize?: 'sm' | 'md' | 'lg';
  collapsible?: boolean;
}

const sizeClasses = {
  sm: 'col-span-1',
  md: 'col-span-2',
  lg: 'col-span-3',
};

const Widget: React.FC<WidgetProps> = ({
  id,
  title,
  children,
  className,
  onRemove,
  onResize,
  defaultSize = 'md',
  collapsible = true,
}) => {
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>(defaultSize);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleResize = (newSize: 'sm' | 'md' | 'lg') => {
    setSize(newSize);
    onResize?.(id, newSize);
  };

  return (
    <Card
      className={cn(
        'relative group',
        sizeClasses[size],
        className
      )}
      variant="elevated"
    >
      {/* Widget Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="cursor-move text-gray-400 hover:text-gray-600">
            <GripVertical className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="flex items-center gap-1">
          {onResize && (
            <>
              <button
                onClick={() => handleResize(size === 'sm' ? 'md' : size === 'md' ? 'lg' : 'sm')}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                aria-label="Resize widget"
              >
                {size === 'lg' ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
            </>
          )}
          {collapsible && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
              aria-label={isCollapsed ? 'Expand' : 'Collapse'}
            >
              {isCollapsed ? (
                <Maximize2 className="w-4 h-4" />
              ) : (
                <Minimize2 className="w-4 h-4" />
              )}
            </button>
          )}
          {onRemove && (
            <button
              onClick={() => onRemove(id)}
              className="p-1.5 text-gray-400 hover:text-error-600 hover:bg-error-50 rounded transition-colors"
              aria-label="Remove widget"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Widget Content */}
      {!isCollapsed && (
        <div className="p-4">
          {children}
        </div>
      )}
    </Card>
  );
};

export default Widget;

