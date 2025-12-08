'use client';

import React, { useState, useEffect } from 'react';
import { X, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { KeyboardShortcut, formatShortcut } from '@/hooks/useKeyboardShortcuts';
import Button from './Button';

export interface KeyboardShortcutsHelpProps {
  shortcuts: KeyboardShortcut[];
  isOpen: boolean;
  onClose: () => void;
}

const KeyboardShortcutsHelp: React.FC<KeyboardShortcutsHelpProps> = ({
  shortcuts,
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '?' && isOpen) {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const filteredShortcuts = shortcuts.filter((shortcut) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      shortcut.description.toLowerCase().includes(query) ||
      shortcut.key.toLowerCase().includes(query) ||
      shortcut.category?.toLowerCase().includes(query)
    );
  });

  const groupedShortcuts = filteredShortcuts.reduce((acc, shortcut) => {
    const category = shortcut.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(shortcut);
    return acc;
  }, {} as Record<string, KeyboardShortcut[]>);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Command className="w-5 h-5 text-gray-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Keyboard Shortcuts
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Search shortcuts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {Object.keys(groupedShortcuts).length > 0 ? (
                  <div className="space-y-6">
                    {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
                      <div key={category}>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                          {category}
                        </h3>
                        <div className="space-y-2">
                          {categoryShortcuts.map((shortcut, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg"
                            >
                              <span className="text-sm text-gray-700">
                                {shortcut.description}
                              </span>
                              <kbd className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded border border-gray-300">
                                {formatShortcut(shortcut)}
                              </kbd>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No shortcuts found
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">Esc</kbd> or{' '}
                  <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">Cmd/Ctrl + ?</kbd> to close
                </p>
                <Button variant="outline" size="sm" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default KeyboardShortcutsHelp;

