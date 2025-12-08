'use client';

import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import Badge from './Badge';

export interface ActivityItem {
  id: string;
  type: 'create' | 'update' | 'delete' | 'comment' | 'status_change' | 'other';
  action: string;
  description: string;
  user: {
    name: string;
    email?: string;
    avatar?: string;
  };
  timestamp: Date | string;
  metadata?: Record<string, any>;
  icon?: React.ReactNode;
}

export interface ActivityTimelineProps {
  activities: ActivityItem[];
  className?: string;
  showUser?: boolean;
  showTimestamp?: boolean;
  maxItems?: number;
}

const typeColors = {
  create: 'bg-green-100 text-green-800 border-green-200',
  update: 'bg-blue-100 text-blue-800 border-blue-200',
  delete: 'bg-red-100 text-red-800 border-red-200',
  comment: 'bg-purple-100 text-purple-800 border-purple-200',
  status_change: 'bg-amber-100 text-amber-800 border-amber-200',
  other: 'bg-gray-100 text-gray-800 border-gray-200',
};

const typeIcons = {
  create: '➕',
  update: '✏️',
  delete: '🗑️',
  comment: '💬',
  status_change: '🔄',
  other: '📝',
};

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  activities,
  className,
  showUser = true,
  showTimestamp = true,
  maxItems,
}) => {
  const displayActivities = maxItems
    ? activities.slice(0, maxItems)
    : activities;

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={cn('relative', className)}>
      <div className="space-y-4">
        {displayActivities.length > 0 ? (
          displayActivities.map((activity, index) => {
            const timestamp =
              activity.timestamp instanceof Date
                ? activity.timestamp
                : new Date(activity.timestamp);
            const isLast = index === displayActivities.length - 1;

            return (
              <div key={activity.id} className="relative flex gap-4">
                {/* Timeline Line */}
                {!isLast && (
                  <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-gray-200" />
                )}

                {/* Icon/Avatar */}
                <div className="relative z-10 flex-shrink-0">
                  {activity.icon ? (
                    <div className="w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-200 rounded-full">
                      {activity.icon}
                    </div>
                  ) : showUser && activity.user.avatar ? (
                    <img
                      src={activity.user.avatar}
                      alt={activity.user.name}
                      className="w-8 h-8 rounded-full border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center bg-primary-100 text-primary-700 rounded-full text-xs font-semibold border-2 border-white">
                      {showUser ? getInitials(activity.user.name) : typeIcons[activity.type]}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pb-4">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-600 mt-0.5">
                        {activity.description}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn('text-xs', typeColors[activity.type])}
                    >
                      {activity.type.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    {showUser && (
                      <span className="font-medium">{activity.user.name}</span>
                    )}
                    {showTimestamp && (
                      <>
                        {showUser && <span>•</span>}
                        <span title={format(timestamp, 'PPpp')}>
                          {formatDistanceToNow(timestamp, { addSuffix: true })}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No activity to display</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityTimeline;

