'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
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
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface AdminSidebarProps {
  onLogout: () => void;
}

interface NavigationItem {
  name: string;
  href?: string;
  icon: any;
  children?: NavigationItem[];
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
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

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

  const renderNavItem = (item: NavigationItem, isChild: boolean = false) => {
    const Icon = item.icon;
    const isActive = isItemActive(item);
    const hasChildren = item.children && item.children.length > 0;
    const expanded = isExpanded(item.name);

    if (hasChildren) {
      return (
        <div key={item.name} className={isChild ? 'ml-4' : ''}>
          <button
            onClick={() => toggleExpand(item.name)}
            className={`group w-full flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md mb-1 ${
              isActive
                ? 'bg-gray-800 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <div className="flex items-center">
              <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </div>
            {expanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          {expanded && (
            <div className="ml-4 mt-1 space-y-1">
              {item.children!.map((child) => renderNavItem(child, true))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.name}
        href={item.href!}
        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md mb-1 ${
          isChild ? 'ml-4' : ''
        } ${
          isActive
            ? 'bg-gray-800 text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
        onClick={() => sidebarOpen && setSidebarOpen(false)}
      >
        <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
        {item.name}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out lg:hidden ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-4 bg-gray-800">
          <h2 className="text-xl font-bold text-white">Admin Panel</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-5 px-2 overflow-y-auto max-h-[calc(100vh-8rem)]">
          {navigationItems.map((item) => renderNavItem(item))}
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <button
            onClick={onLogout}
            className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow bg-gray-900 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h2 className="text-xl font-bold text-white">Admin Panel</h2>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigationItems.map((item) => renderNavItem(item))}
            </nav>
            <div className="flex-shrink-0 px-2 py-4 border-t border-gray-700">
              <button
                onClick={onLogout}
                className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-30 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}
