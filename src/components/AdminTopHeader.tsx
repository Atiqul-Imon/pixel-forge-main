'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Search, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  X,
  HelpCircle,
  Command,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import Breadcrumb, { type BreadcrumbItem } from './ui/Breadcrumb';
import Button from './ui/Button';
import { useToast, toastHelpers } from './ui';

interface AdminTopHeaderProps {
  onLogout: () => void;
  title?: string;
  actions?: React.ReactNode;
}

export default function AdminTopHeader({ onLogout, title, actions }: AdminTopHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];
    
    paths.forEach((path, index) => {
      const href = '/' + paths.slice(0, index + 1).join('/');
      const label = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      breadcrumbs.push({ label, href: index < paths.length - 1 ? href : undefined });
    });
    
    return breadcrumbs;
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setUserMenuOpen(false);
        setNotificationsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      // Implement search logic here
      showToast(toastHelpers.info('Search', `Searching for: ${query}`));
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const notifications = [
    { id: '1', title: 'New client added', message: 'ABC Company was added', time: '2m ago', read: false },
    { id: '2', title: 'Invoice paid', message: 'Invoice #INV-001 has been paid', time: '1h ago', read: false },
    { id: '3', title: 'New message', message: 'You have a new contact form submission', time: '3h ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Breadcrumb & Title */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {!title && (
              <Breadcrumb items={generateBreadcrumbs()} className="hidden md:flex" />
            )}
            {title && (
              <h1 className="text-xl font-semibold text-gray-900 truncate">{title}</h1>
            )}
          </div>

          {/* Right: Actions, Search, Notifications, User Menu */}
          <div className="flex items-center gap-2">
            {/* Page Actions */}
            {actions && (
              <div className="hidden sm:flex items-center gap-2">
                {actions}
              </div>
            )}

            {/* Global Search */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-[slideUp_0.2s_ease-out]">
                  <div className="p-4 border-b border-gray-200">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search... (⌘K)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSearch(searchQuery);
                          }
                        }}
                        autoFocus
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => setSearchOpen(false)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                      <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300">
                        <Command className="w-3 h-3 inline" /> K
                      </kbd>
                      <span>to search</span>
                    </div>
                  </div>
                  {searchQuery && (
                    <div className="p-4 text-sm text-gray-500">
                      Search results for "{searchQuery}" will appear here
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setUserMenuOpen(false);
                }}
                className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary-600 rounded-full border-2 border-white" />
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-[slideUp_0.2s_ease-out]">
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      <div className="divide-y divide-gray-200">
                        {notifications.map((notification) => (
                          <button
                            key={notification.id}
                            onClick={() => {
                              setNotificationsOpen(false);
                              showToast(toastHelpers.info(notification.title, notification.message));
                            }}
                            className={cn(
                              'w-full p-4 text-left hover:bg-gray-50 transition-colors',
                              !notification.read && 'bg-primary-50/50'
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <div className={cn(
                                'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                                !notification.read ? 'bg-primary-600' : 'bg-transparent'
                              )} />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">No notifications</p>
                      </div>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <div className="p-3 border-t border-gray-200">
                      <button className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium">
                        View all notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                  setNotificationsOpen(false);
                }}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
                </div>
                <ChevronDown className={cn(
                  'w-4 h-4 text-gray-400 transition-transform',
                  userMenuOpen && 'transform rotate-180'
                )} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-[slideUp_0.2s_ease-out]">
                  <div className="p-4 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email || 'admin@pixelforgebd.com'}</p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => {
                        router.push('/admin/settings');
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        router.push('/admin/settings');
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        showToast(toastHelpers.info('Help', 'Documentation coming soon'));
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <HelpCircle className="w-4 h-4" />
                      Help & Support
                    </button>
                    <div className="border-t border-gray-200 my-2" />
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-error-600 hover:bg-error-50 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

