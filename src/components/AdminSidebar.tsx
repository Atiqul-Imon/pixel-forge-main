'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  FileText, 
  Plus, 
  Settings, 
  Users, 
  Mail,
  LogOut,
  Menu,
  X,
  Building2,
  Send,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  List,
  Receipt,
  Search,
  ChevronLeft,
  User,
  Bell,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import Tooltip from './ui/Tooltip';

interface AdminSidebarProps {
  onLogout: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface NavigationItem {
  name: string;
  href?: string;
  icon: any;
  children?: NavigationItem[];
  badge?: number;
}

const navigationItems: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    name: 'CRM Dashboard',
    href: '/admin/crm',
    icon: Users,
  },
  {
    name: 'Clients',
    icon: Building2,
    children: [
      {
        name: 'All Clients',
        href: '/admin/crm/clients',
        icon: List,
      },
      {
        name: 'Add New Client',
        href: '/admin/crm/clients/new',
        icon: Plus,
      },
      {
        name: 'Follow-ups',
        href: '/admin/crm/followups',
        icon: CheckSquare,
      },
      {
        name: 'Compose Email',
        href: '/admin/crm/emails/compose',
        icon: Send,
      },
    ],
  },
  {
    name: 'Invoices',
    icon: Receipt,
    children: [
      {
        name: 'All Invoices',
        href: '/admin/invoices',
        icon: List,
      },
      {
        name: 'Create Invoice',
        href: '/admin/invoices/new',
        icon: Plus,
      },
      {
        name: 'All Receipts',
        href: '/admin/receipts',
        icon: Receipt,
      },
      {
        name: 'Create Receipt',
        href: '/admin/receipts/new',
        icon: Plus,
      },
    ],
  },
  {
    name: 'Blog Posts',
    href: '/admin/blog',
    icon: FileText,
  },
  {
    name: 'Create Post',
    href: '/admin/blog/new',
    icon: Plus,
  },
  {
    name: 'Messages',
    href: '/admin/messages',
    icon: Mail,
    badge: 3, // Example badge count
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

export default function AdminSidebar({ onLogout, isCollapsed = false, onToggleCollapse }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Check if item or any child is active
  const isItemActive = (item: NavigationItem): boolean => {
    if (item.href && pathname === item.href) return true;
    if (item.children) {
      return item.children.some(child => isItemActive(child));
    }
    return false;
  };

  // Check if any child is active
  const hasActiveChild = (item: NavigationItem): boolean => {
    if (!item.children) return false;
    return item.children.some(child => isItemActive(child));
  };

  // Auto-expand items with active children on mount
  useEffect(() => {
    const newExpanded = new Set<string>();
    navigationItems.forEach(item => {
      if (item.children && hasActiveChild(item)) {
        newExpanded.add(item.name);
      }
    });
    setExpandedItems(newExpanded);
  }, [pathname]);

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!isCollapsed) {
          searchInputRef.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCollapsed]);

  const toggleExpand = (itemName: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemName)) {
        newSet.delete(itemName);
      } else {
        newSet.add(itemName);
      }
      return newSet;
    });
  };

  const isExpanded = (itemName: string) => expandedItems.has(itemName);

  // Filter navigation items based on search
  const filteredItems = navigationItems.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const matchesName = item.name.toLowerCase().includes(query);
    const matchesChildren = item.children?.some(child => 
      child.name.toLowerCase().includes(query)
    );
    return matchesName || matchesChildren;
  });

  const renderNavItem = (item: NavigationItem, isChild: boolean = false) => {
    const Icon = item.icon;
    const isActive = isItemActive(item);
    const hasChildren = item.children && item.children.length > 0;
    const expanded = isExpanded(item.name);

    if (hasChildren) {
      const buttonContent = (
        <button
          onClick={() => toggleExpand(item.name)}
          className={cn(
            'group w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg mb-1 transition-all duration-200',
            isActive
              ? 'bg-primary-600 text-white shadow-md'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white',
            isCollapsed && 'justify-center px-2'
          )}
        >
          <div className="flex items-center gap-3 min-w-0">
            <Icon className={cn('h-5 w-5 flex-shrink-0', isCollapsed && 'mx-auto')} />
            {!isCollapsed && (
              <>
                <span className="truncate">{item.name}</span>
                {item.badge && (
                  <span className="ml-auto px-2 py-0.5 text-xs font-semibold bg-primary-500 text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </div>
          {!isCollapsed && (
            expanded ? (
              <ChevronDown className="h-4 w-4 flex-shrink-0" />
            ) : (
              <ChevronRight className="h-4 w-4 flex-shrink-0" />
            )
          )}
        </button>
      );

      if (isCollapsed) {
        return (
          <Tooltip key={item.name} content={item.name} position="right">
            <div>{buttonContent}</div>
          </Tooltip>
        );
      }

      return (
        <div key={item.name} className={isChild ? 'ml-4' : ''}>
          {buttonContent}
          {expanded && !isCollapsed && (
            <div className="ml-4 mt-1 space-y-1 animate-[slideUp_0.2s_ease-out]">
              {item.children!.map((child) => renderNavItem(child, true))}
            </div>
          )}
        </div>
      );
    }

    const linkContent = (
      <Link
        href={item.href!}
        className={cn(
          'group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg mb-1 transition-all duration-200',
          isChild && !isCollapsed && 'ml-4',
          isActive
            ? 'bg-primary-600 text-white shadow-md'
            : 'text-gray-300 hover:bg-gray-800 hover:text-white',
          isCollapsed && 'justify-center px-2'
        )}
        onClick={() => sidebarOpen && setSidebarOpen(false)}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        {!isCollapsed && (
          <>
            <span className="truncate flex-1">{item.name}</span>
            {item.badge && (
              <span className="px-2 py-0.5 text-xs font-semibold bg-primary-500 text-white rounded-full">
                {item.badge}
              </span>
            )}
          </>
        )}
      </Link>
    );

    if (isCollapsed) {
      return (
        <Tooltip key={item.name} content={item.name} position="right">
          {linkContent}
        </Tooltip>
      );
    }

    return linkContent;
  };

  const sidebarContent = (
    <div className={cn(
      'flex flex-col h-full bg-gradient-to-b from-gray-900 to-gray-800',
      'transition-all duration-300 ease-in-out',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo/Branding Area */}
      <div className={cn(
        'flex items-center justify-between h-16 px-4 border-b border-gray-700',
        isCollapsed && 'justify-center px-2'
      )}>
        {!isCollapsed ? (
          <>
            <Link href="/admin" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PF</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm">Pixel Forge</span>
                <span className="text-gray-400 text-xs">Admin Panel</span>
              </div>
            </Link>
            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </>
        ) : (
          <>
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PF</span>
            </div>
            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Expand sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </>
        )}
      </div>

      {/* Search Bar */}
      {!isCollapsed && (
        <div className="px-3 py-3 border-b border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search... (⌘K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <div className="space-y-1">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => renderNavItem(item))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-400 text-center">
              No results found
            </div>
          )}
        </div>
      </nav>

      {/* User Profile Section */}
      <div className={cn(
        'px-3 py-4 border-t border-gray-700',
        isCollapsed && 'px-2'
      )}>
        {!isCollapsed ? (
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.name || 'Admin User'}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user?.email || 'admin@pixelforgebd.com'}
              </p>
            </div>
          </div>
        ) : (
          <Tooltip content={user?.name || 'Admin User'} position="right">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold mx-auto">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
          </Tooltip>
        )}
        <button
          onClick={onLogout}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors',
            isCollapsed && 'justify-center px-2'
          )}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:hidden',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {sidebarContent}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg lg:hidden"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        {sidebarContent}
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-30 inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-900 shadow-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}
