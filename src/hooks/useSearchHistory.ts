import { useState, useEffect, useCallback } from 'react';

export interface SearchHistoryItem {
  query: string;
  timestamp: Date;
  category?: string;
}

const STORAGE_KEY = 'admin-search-history';
const MAX_HISTORY_ITEMS = 10;

/**
 * Hook for managing search history
 */
export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }));
        setHistory(parsed);
      }
    } catch (error) {
      console.warn('Failed to load search history:', error);
    }
  }, []);

  const addToHistory = useCallback((query: string, category?: string) => {
    if (!query.trim()) return;

    setHistory((prev) => {
      const newItem: SearchHistoryItem = {
        query: query.trim(),
        timestamp: new Date(),
        category,
      };

      // Remove duplicates and keep only recent items
      const filtered = prev.filter(
        (item) => item.query.toLowerCase() !== newItem.query.toLowerCase()
      );
      const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);

      // Save to localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (error) {
          console.warn('Failed to save search history:', error);
        }
      }

      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.warn('Failed to clear search history:', error);
      }
    }
  }, []);

  const removeFromHistory = useCallback((query: string) => {
    setHistory((prev) => {
      const filtered = prev.filter(
        (item) => item.query.toLowerCase() !== query.toLowerCase()
      );

      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        } catch (error) {
          console.warn('Failed to update search history:', error);
        }
      }

      return filtered;
    });
  }, []);

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory,
  };
}

