'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { useKeyboardShortcuts, KeyboardShortcut, formatShortcut } from '@/hooks/useKeyboardShortcuts';
import KeyboardShortcutsHelp from '@/components/ui/KeyboardShortcutsHelp';

interface KeyboardShortcutsContextType {
  shortcuts: KeyboardShortcut[];
  registerShortcut: (shortcut: KeyboardShortcut) => void;
  unregisterShortcut: (key: string) => void;
  openHelp: () => void;
  closeHelp: () => void;
}

const KeyboardShortcutsContext = createContext<KeyboardShortcutsContextType | undefined>(undefined);

export function KeyboardShortcutsProvider({ children }: { children: React.ReactNode }) {
  const [shortcuts, setShortcuts] = useState<KeyboardShortcut[]>([]);
  const [helpOpen, setHelpOpen] = useState(false);

  const registerShortcut = useCallback((shortcut: KeyboardShortcut) => {
    setShortcuts((prev) => {
      const exists = prev.some((s) => s.key === shortcut.key);
      if (exists) {
        return prev.map((s) => (s.key === shortcut.key ? shortcut : s));
      }
      return [...prev, shortcut];
    });
  }, []);

  const unregisterShortcut = useCallback((key: string) => {
    setShortcuts((prev) => prev.filter((s) => s.key !== key));
  }, []);

  // Default shortcuts
  const defaultShortcuts: KeyboardShortcut[] = [
    {
      key: 'k',
      meta: true,
      action: () => {}, // Will be handled by search component
      description: 'Open search',
      category: 'Navigation',
    },
    {
      key: '?',
      meta: true,
      action: () => setHelpOpen(true),
      description: 'Show keyboard shortcuts',
      category: 'General',
    },
    {
      key: 'Escape',
      action: () => setHelpOpen(false),
      description: 'Close dialogs',
      category: 'General',
    },
  ];

  // Register default shortcuts
  React.useEffect(() => {
    defaultShortcuts.forEach((shortcut) => {
      registerShortcut(shortcut);
    });
  }, []);

  // Register help shortcut
  const helpShortcut: KeyboardShortcut = {
    key: '?',
    meta: true,
    action: () => setHelpOpen(true),
    description: 'Show keyboard shortcuts',
    category: 'General',
  };

  useKeyboardShortcuts({
    shortcuts: [...shortcuts, helpShortcut],
    enabled: true,
  });

  return (
    <KeyboardShortcutsContext.Provider
      value={{
        shortcuts,
        registerShortcut,
        unregisterShortcut,
        openHelp: () => setHelpOpen(true),
        closeHelp: () => setHelpOpen(false),
      }}
    >
      {children}
      <KeyboardShortcutsHelp
        shortcuts={shortcuts}
        isOpen={helpOpen}
        onClose={() => setHelpOpen(false)}
      />
    </KeyboardShortcutsContext.Provider>
  );
}

export function useKeyboardShortcutsContext() {
  const context = useContext(KeyboardShortcutsContext);
  if (!context) {
    throw new Error('useKeyboardShortcutsContext must be used within KeyboardShortcutsProvider');
  }
  return context;
}

