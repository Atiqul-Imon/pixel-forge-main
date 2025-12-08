'use client';

import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';
import Card from './Card';

export interface ChartData {
  name: string;
  [key: string]: string | number;
}

export interface LineChartProps {
  data: ChartData[];
  dataKey: string;
  strokeColor?: string;
  title?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  className?: string;
}

export const LineChartComponent: React.FC<LineChartProps> = ({
  data,
  dataKey,
  strokeColor = '#8B5CF6',
  title,
  height = 300,
  showGrid = true,
  showLegend = false,
  className,
}) => {
  return (
    <Card className={cn('p-6', className)}>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
          <XAxis 
            dataKey="name" 
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          {showLegend && <Legend />}
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={strokeColor}
            strokeWidth={2}
            dot={{ fill: strokeColor, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export interface BarChartProps {
  data: ChartData[];
  dataKey: string;
  fillColor?: string;
  title?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  className?: string;
}

export const BarChartComponent: React.FC<BarChartProps> = ({
  data,
  dataKey,
  fillColor = '#8B5CF6',
  title,
  height = 300,
  showGrid = true,
  showLegend = false,
  className,
}) => {
  return (
    <Card className={cn('p-6', className)}>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
          <XAxis 
            dataKey="name" 
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          {showLegend && <Legend />}
          <Bar dataKey={dataKey} fill={fillColor} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export interface PieChartProps {
  data: Array<{ name: string; value: number }>;
  title?: string;
  height?: number;
  colors?: string[];
  className?: string;
}

const defaultColors = ['#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4', '#9333EA'];

export const PieChartComponent: React.FC<PieChartProps> = ({
  data,
  title,
  height = 300,
  colors = defaultColors,
  className,
}) => {
  return (
    <Card className={cn('p-6', className)}>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export interface DonutChartProps {
  data: Array<{ name: string; value: number }>;
  title?: string;
  height?: number;
  colors?: string[];
  className?: string;
}

export const DonutChartComponent: React.FC<DonutChartProps> = ({
  data,
  title,
  height = 300,
  colors = defaultColors,
  className,
}) => {
  return (
    <Card className={cn('p-6', className)}>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            innerRadius={50}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

