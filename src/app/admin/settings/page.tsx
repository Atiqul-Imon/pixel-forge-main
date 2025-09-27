'use client';

import useAdminAuth from '@/hooks/useAdminAuth';
import AdminLayout from '@/components/AdminLayout';
import { Settings, User, Shield, Database, Mail, Globe } from 'lucide-react';

export default function SettingsPage() {
  const { loading: authLoading } = useAdminAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your admin panel settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-6">
            <Settings className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">General Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Name
              </label>
              <input
                type="text"
                defaultValue="Pixel Forge"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Description
              </label>
              <textarea
                rows={3}
                defaultValue="Professional web development and digital solutions"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                defaultValue="admin@pixelforge.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-6">
            <Shield className="w-6 h-6 text-green-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Security</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-500">Add an extra layer of security</p>
              </div>
              <button className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm">
                Disabled
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Session Timeout</h3>
                <p className="text-sm text-gray-500">Auto-logout after inactivity</p>
              </div>
              <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                <option>24 hours</option>
                <option>12 hours</option>
                <option>6 hours</option>
                <option>1 hour</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Login Notifications</h3>
                <p className="text-sm text-gray-500">Email alerts for new logins</p>
              </div>
              <button className="bg-green-200 text-green-600 px-3 py-1 rounded-full text-sm">
                Enabled
              </button>
            </div>
          </div>
        </div>

        {/* Database Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-6">
            <Database className="w-6 h-6 text-purple-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Database</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Connection Status</h3>
                <p className="text-sm text-gray-500">MongoDB Atlas</p>
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                Connected
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Last Backup</h3>
                <p className="text-sm text-gray-500">Automated daily backups</p>
              </div>
              <span className="text-sm text-gray-500">Today</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Storage Used</h3>
                <p className="text-sm text-gray-500">Database size</p>
              </div>
              <span className="text-sm text-gray-500">2.3 MB</span>
            </div>
          </div>
          
          <div className="mt-6 space-y-2">
            <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
              Create Backup
            </button>
            <button className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
              View Logs
            </button>
          </div>
        </div>

        {/* Email Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-6">
            <Mail className="w-6 h-6 text-orange-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Email</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SMTP Host
              </label>
              <input
                type="text"
                defaultValue="smtp.gmail.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SMTP Port
              </label>
              <input
                type="number"
                defaultValue="587"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                <p className="text-sm text-gray-500">Send admin notifications</p>
              </div>
              <button className="bg-green-200 text-green-600 px-3 py-1 rounded-full text-sm">
                Enabled
              </button>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
              Test Email
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
