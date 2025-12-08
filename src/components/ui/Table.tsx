'use client';

import React from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TableColumn<T = any> {
  key: string;
  header: string;
  accessor?: (row: T) => React.ReactNode;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

export interface TableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (row: T) => void;
  sortable?: boolean;
  defaultSort?: { key: string; direction: 'asc' | 'desc' };
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  selectedRows?: string[];
  onRowSelect?: (id: string, selected: boolean) => void;
  selectable?: boolean;
  emptyMessage?: string;
  loading?: boolean;
  className?: string;
}

export function Table<T extends { _id?: string; id?: string }>({
  data,
  columns,
  onRowClick,
  sortable = false,
  defaultSort,
  onSort,
  selectedRows = [],
  onRowSelect,
  selectable = false,
  emptyMessage = 'No data available',
  loading = false,
  className,
}: TableProps<T>) {
  const [sortState, setSortState] = React.useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(defaultSort || null);

  const handleSort = (key: string) => {
    if (!sortable) return;

    const newDirection =
      sortState?.key === key && sortState.direction === 'asc' ? 'desc' : 'asc';
    const newSortState = { key, direction: newDirection };
    setSortState(newSortState);
    onSort?.(key, newDirection);
  };

  const getRowId = (row: T): string => {
    return (row as any)._id || (row as any).id || '';
  };

  const isRowSelected = (row: T): boolean => {
    const id = getRowId(row);
    return selectedRows.includes(id);
  };

  const handleRowSelect = (row: T, checked: boolean) => {
    const id = getRowId(row);
    onRowSelect?.(id, checked);
  };

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (!sortable) return null;
    if (sortState?.key !== columnKey) {
      return <ChevronsUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortState.direction === 'asc' ? (
      <ChevronUp className="w-4 h-4 text-primary-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-primary-600" />
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-8 text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-8 text-center text-gray-500">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className={cn('bg-white rounded-lg border border-gray-200 overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {selectable && (
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-12">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={selectedRows.length === data.length && data.length > 0}
                    onChange={(e) => {
                      data.forEach((row) => {
                        handleRowSelect(row, e.target.checked);
                      });
                    }}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    sortable && column.sortable !== false && 'cursor-pointer hover:bg-gray-100',
                    column.width && `w-[${column.width}]`
                  )}
                  style={column.width ? { width: column.width } : undefined}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.header}</span>
                    {sortable && column.sortable !== false && (
                      <SortIcon columnKey={column.key} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => {
              const rowId = getRowId(row);
              const isSelected = isRowSelected(row);
              return (
                <tr
                  key={rowId || rowIndex}
                  className={cn(
                    'transition-colors',
                    onRowClick && 'cursor-pointer hover:bg-gray-50',
                    isSelected && 'bg-primary-50'
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {selectable && (
                    <td className="px-4 py-3 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        checked={isSelected}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleRowSelect(row, e.target.checked);
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                  )}
                  {columns.map((column) => {
                    const content = column.accessor
                      ? column.accessor(row)
                      : (row as any)[column.key];
                    return (
                      <td
                        key={column.key}
                        className={cn(
                          'px-4 py-3 text-sm text-gray-900 whitespace-nowrap',
                          column.align === 'center' && 'text-center',
                          column.align === 'right' && 'text-right'
                        )}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;

