'use client';

import React from 'react';
import { Trash2, Archive, Download, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from './Button';
import Badge from './Badge';

export interface BulkAction {
  label: string;
  icon?: React.ReactNode;
  onClick: (selectedIds: string[]) => void | Promise<void>;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  confirm?: {
    title: string;
    message: string;
  };
}

export interface BulkActionsProps {
  selectedCount: number;
  totalCount?: number;
  selectedIds: string[];
  actions: BulkAction[];
  onClearSelection: () => void;
  onSelectAll?: () => void;
  className?: string;
}

const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCount,
  totalCount,
  selectedIds,
  actions,
  onClearSelection,
  onSelectAll,
  className,
}) => {
  if (selectedCount === 0) return null;

  const handleAction = async (action: BulkAction) => {
    if (action.confirm) {
      const confirmed = window.confirm(
        `${action.confirm.title}\n\n${action.confirm.message}`
      );
      if (!confirmed) return;
    }
    await action.onClick(selectedIds);
  };

  return (
    <div
      className={cn(
        'sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm',
        'px-4 py-3 flex items-center justify-between',
        className
      )}
    >
      <div className="flex items-center gap-4">
        <Badge variant="primary" className="text-sm font-medium">
          {selectedCount} {selectedCount === 1 ? 'item' : 'items'} selected
        </Badge>
        {totalCount && totalCount > selectedCount && onSelectAll && (
          <button
            onClick={onSelectAll}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Select all {totalCount}
          </button>
        )}
        <button
          onClick={onClearSelection}
          className="text-sm text-gray-600 hover:text-gray-700"
        >
          Clear selection
        </button>
      </div>

      <div className="flex items-center gap-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant || 'outline'}
            size="sm"
            onClick={() => handleAction(action)}
            leftIcon={action.icon}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BulkActions;

