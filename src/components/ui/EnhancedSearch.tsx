'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, Clock, X, ArrowUp, ArrowDown, Command } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { formatDistanceToNow } from 'date-fns';

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  category: string;
  url: string;
  icon?: React.ReactNode;
}

export interface SearchSuggestion {
  query: string;
  category?: string;
}

export interface EnhancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  suggestions?: SearchSuggestion[];
  recentSearches?: boolean;
  quickActions?: Array<{
    label: string;
    action: () => void;
    icon?: React.ReactNode;
  }>;
  className?: string;
}

const EnhancedSearch: React.FC<EnhancedSearchProps> = ({
  isOpen,
  onClose,
  onSearch,
  suggestions = [],
  recentSearches = true,
  quickActions = [],
  className,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const { history, addToHistory, removeFromHistory } = useSearchHistory();

  const filteredHistory = useMemo(() => {
    if (!query) return history.slice(0, 5);
    return history
      .filter((item) =>
        item.query.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5);
  }, [history, query]);

  const filteredSuggestions = useMemo(() => {
    if (!query) return suggestions.slice(0, 5);
    return suggestions
      .filter((suggestion) =>
        suggestion.query.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5);
  }, [suggestions, query]);

  const allItems = [
    ...filteredSuggestions.map((s) => ({ type: 'suggestion' as const, data: s })),
    ...filteredHistory.map((h) => ({ type: 'history' as const, data: h })),
    ...quickActions.map((a, i) => ({ type: 'action' as const, data: a, index: i })),
  ];

  const maxIndex = allItems.length - 1;

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        const item = allItems[selectedIndex];
        if (item.type === 'suggestion' || item.type === 'history') {
          handleSelect(item.data.query);
        } else if (item.type === 'action') {
          item.data.action();
          onClose();
        }
      } else if (e.key === 'Enter' && query.trim()) {
        e.preventDefault();
        handleSearch(query);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, maxIndex, allItems, query, onClose]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      addToHistory(searchQuery);
      onSearch(searchQuery);
      setQuery('');
      setSelectedIndex(-1);
    }
  };

  const handleSelect = (selectedQuery: string) => {
    setQuery(selectedQuery);
    handleSearch(selectedQuery);
  };

  if (!isOpen) return null;

  return (
    <div className={cn('fixed inset-0 z-50 flex items-start justify-center pt-20 px-4', className)}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(-1);
            }}
            placeholder="Search anything... (⌘K)"
            className="flex-1 outline-none text-gray-900 placeholder-gray-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {allItems.length > 0 ? (
            <div className="py-2">
              {/* Quick Actions */}
              {quickActions.length > 0 && !query && (
                <div className="px-4 py-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                    Quick Actions
                  </p>
                  {quickActions.map((action, index) => {
                    const itemIndex = filteredSuggestions.length + filteredHistory.length + index;
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          action.action();
                          onClose();
                        }}
                        className={cn(
                          'w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors',
                          selectedIndex === itemIndex && 'bg-gray-50'
                        )}
                      >
                        {action.icon || <Command className="w-4 h-4 text-gray-400" />}
                        <span className="text-sm text-gray-700">{action.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Suggestions */}
              {filteredSuggestions.length > 0 && (
                <div className="px-4 py-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                    Suggestions
                  </p>
                  {filteredSuggestions.map((suggestion, index) => {
                    const itemIndex = index;
                    return (
                      <button
                        key={index}
                        onClick={() => handleSelect(suggestion.query)}
                        className={cn(
                          'w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors',
                          selectedIndex === itemIndex && 'bg-gray-50'
                        )}
                      >
                        <Search className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{suggestion.query}</span>
                        {suggestion.category && (
                          <span className="ml-auto text-xs text-gray-500">
                            {suggestion.category}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Recent Searches */}
              {recentSearches && filteredHistory.length > 0 && (
                <div className="px-4 py-2 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      Recent Searches
                    </p>
                  </div>
                  {filteredHistory.map((item, index) => {
                    const itemIndex = filteredSuggestions.length + index;
                    return (
                      <div
                        key={index}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors group',
                          selectedIndex === itemIndex && 'bg-gray-50'
                        )}
                      >
                        <button
                          onClick={() => handleSelect(item.query)}
                          className="flex-1 flex items-center gap-3 text-left"
                        >
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{item.query}</span>
                          <span className="ml-auto text-xs text-gray-400">
                            {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                          </span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromHistory(item.query);
                          }}
                          className="p-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-gray-500">
              <p className="text-sm">No results found</p>
              <p className="text-xs mt-1">Try a different search term</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ArrowUp className="w-3 h-3" />
              <ArrowDown className="w-3 h-3" />
              Navigate
            </span>
            <span>Enter to select</span>
          </div>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSearch;

