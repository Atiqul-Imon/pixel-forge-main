import { useEffect, useRef, useCallback } from 'react';

export interface UseAutoSaveOptions {
  data: Record<string, any>;
  onSave: (data: Record<string, any>) => void | Promise<void>;
  delay?: number;
  storageKey?: string;
  enabled?: boolean;
}

/**
 * Hook for auto-saving form data
 * Saves to localStorage and calls onSave callback
 */
export function useAutoSave({
  data,
  onSave,
  delay = 1000,
  storageKey,
  enabled = true,
}: UseAutoSaveOptions) {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastSavedRef = useRef<string>('');

  const saveData = useCallback(async () => {
    const dataString = JSON.stringify(data);
    
    // Only save if data has changed
    if (dataString === lastSavedRef.current) {
      return;
    }

    lastSavedRef.current = dataString;

    // Save to localStorage if key provided
    if (storageKey && typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, dataString);
      } catch (error) {
        console.warn('Failed to save to localStorage:', error);
      }
    }

    // Call onSave callback
    try {
      await onSave(data);
    } catch (error) {
      console.error('Auto-save error:', error);
    }
  }, [data, onSave, storageKey]);

  useEffect(() => {
    if (!enabled) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      saveData();
    }, delay);

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, delay, enabled, saveData]);

  // Load from localStorage on mount if key provided
  useEffect(() => {
    if (storageKey && typeof window !== 'undefined' && enabled) {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          lastSavedRef.current = JSON.stringify(parsed);
          // Merge saved data with current data
          Object.assign(data, parsed);
        }
      } catch (error) {
        console.warn('Failed to load from localStorage:', error);
      }
    }
  }, [storageKey, enabled]); // Only run on mount

  return {
    saveNow: saveData,
    clearSaved: () => {
      if (storageKey && typeof window !== 'undefined') {
        localStorage.removeItem(storageKey);
      }
      lastSavedRef.current = '';
    },
  };
}

