/**
 * Export utilities for CSV and data export
 */

export interface ExportOptions {
  filename?: string;
  headers?: string[];
}

/**
 * Export data to CSV
 */
export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  options: ExportOptions = {}
): void {
  if (data.length === 0) {
    console.warn('No data to export');
    return;
  }

  const headers = options.headers || Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header];
        // Handle values that might contain commas or quotes
        if (value === null || value === undefined) return '';
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      }).join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', options.filename || `export-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

/**
 * Export data to JSON
 */
export function exportToJSON<T>(
  data: T[],
  options: ExportOptions = {}
): void {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', options.filename || `export-${new Date().toISOString().split('T')[0]}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

/**
 * Format data for table export
 */
export function formatDataForExport<T extends Record<string, any>>(
  data: T[],
  columnMapping?: Record<string, string>
): Array<Record<string, any>> {
  if (!columnMapping) return data;
  
  return data.map(row => {
    const formatted: Record<string, any> = {};
    Object.keys(columnMapping).forEach(key => {
      formatted[columnMapping[key]] = row[key];
    });
    return formatted;
  });
}

