'use client';

import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import AdminTopHeader from './AdminTopHeader';
import NavigationLoader from './NavigationLoader';
import { useAuth } from '@/contexts/AuthContext';
import { ToastProvider } from './ui';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { logout } = useAuth();
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <ToastProvider>
      <NavigationLoader />
      <style jsx global>{`
        @media print {
          /* Hide sidebar when printing */
          aside,
          nav,
          [class*="sidebar"],
          [class*="Sidebar"],
          header,
          [class*="Header"] {
            display: none !important;
          }
          
          /* Full width for print */
          main {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          
          /* Hide action buttons when printing */
          .print\\:hidden,
          button.print\\:hidden,
          a.print\\:hidden {
            display: none !important;
          }
          
          body {
            background: white !important;
          }
        }
      `}</style>
      <div className="h-screen flex overflow-hidden bg-gray-50">
        {/* Sidebar */}
        <div className="hidden print:hidden lg:flex lg:flex-shrink-0">
          <AdminSidebar 
            onLogout={handleLogout} 
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={toggleSidebar}
          />
        </div>
        
        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden min-w-0">
          {/* Top Header */}
          <AdminTopHeader onLogout={handleLogout} />
          
          {/* Page Content */}
          <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-50">
            <div className="py-6 print:py-0">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 print:max-w-full print:px-4">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
