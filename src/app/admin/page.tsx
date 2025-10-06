'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import useAdminAuth from '@/hooks/useAdminAuth';
import AdminLayout from '@/components/AdminLayout';
import { 
  Eye, 
  Mail, 
  Phone, 
  Calendar, 
  Search, 
  CheckCircle, 
  XCircle, 
  ShoppingCart, 
  DollarSign, 
  Users, 
  TrendingUp, 
  FileText, 
  Download,
  Star,
  Globe,
  BarChart3
} from 'lucide-react';

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
  createdAt: string;
  status?: 'new' | 'read' | 'contacted' | 'closed';
}

interface TemplateInquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  template: string;
  customization: string;
  budget: string;
  message: string;
  status: 'new' | 'quoted' | 'negotiating' | 'sold' | 'closed';
  createdAt: string;
  updatedAt: string;
}

interface TemplateStats {
  totalInquiries: number;
  newInquiries: number;
  quotedInquiries: number;
  soldInquiries: number;
  totalRevenue: number;
  conversionRate: number;
  avgDealSize: number;
}

export default function AdminPanel() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [templateInquiries, setTemplateInquiries] = useState<TemplateInquiry[]>([]);
  const [templateStats, setTemplateStats] = useState<TemplateStats>({
    totalInquiries: 0,
    newInquiries: 0,
    quotedInquiries: 0,
    soldInquiries: 0,
    totalRevenue: 0,
    conversionRate: 0,
    avgDealSize: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<TemplateInquiry | null>(null);
  const [activeTab, setActiveTab] = useState<'leads' | 'templates'>('leads');
  const { logout } = useAuth();
  const { user, loading: authLoading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    // Authentication is handled by useAdminAuth hook
    if (!authLoading) {
      fetchMessages();
      fetchTemplateInquiries();
    }
  }, [authLoading]);

  const fetchMessages = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch('/api/admin/messages', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else if (response.status === 401) {
        // Token expired, redirect to login
        router.push('/admin/login');
        return;
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTemplateInquiries = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      if (!token) {
        router.push('/admin/login');
        return;
      }

      // For now, we'll create mock data. In a real app, this would fetch from an API
      const mockInquiries: TemplateInquiry[] = [
        {
          _id: '1',
          name: 'Dr. Ahmed Rahman',
          email: 'ahmed@clinic.com',
          phone: '+8801712345678',
          template: 'Medical Practice Pro',
          customization: 'Basic Customization',
          budget: '৳10,000',
          message: 'I need the Medical Practice Pro template customized for my clinic. Please quote for basic customization.',
          status: 'new',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: '2',
          name: 'Sarah Khan',
          email: 'sarah@dental.com',
          phone: '+8801712345679',
          template: 'Medical Practice Pro',
          customization: 'Advanced Customization',
          budget: '৳15,000',
          message: 'Interested in the medical template for my dental practice. Need advanced customization.',
          status: 'quoted',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: '3',
          name: 'Dr. Fatima Ali',
          email: 'fatima@hospital.com',
          phone: '+8801712345680',
          template: 'Medical Practice Pro',
          customization: 'Premium Customization',
          budget: '৳25,000',
          message: 'Need premium customization for our hospital website. Please provide detailed quote.',
          status: 'sold',
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];

      setTemplateInquiries(mockInquiries);
      
      // Calculate stats
      const stats: TemplateStats = {
        totalInquiries: mockInquiries.length,
        newInquiries: mockInquiries.filter(i => i.status === 'new').length,
        quotedInquiries: mockInquiries.filter(i => i.status === 'quoted').length,
        soldInquiries: mockInquiries.filter(i => i.status === 'sold').length,
        totalRevenue: 25000, // Mock revenue
        conversionRate: 33.3, // Mock conversion rate
        avgDealSize: 16667 // Mock average deal size
      };
      
      setTemplateStats(stats);
    } catch (error) {
      console.error('Error fetching template inquiries:', error);
    }
  };

  const updateMessageStatus = async (id: string, status: string) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status }),
      });
      
      if (response.ok) {
        setMessages(messages.map(msg => 
          msg._id === id ? { ...msg, status: status as 'new' | 'read' | 'contacted' | 'closed' } : msg
        ));
        if (selectedMessage?._id === id) {
          setSelectedMessage({ ...selectedMessage, status: status as 'new' | 'read' | 'contacted' | 'closed' });
        }
      } else if (response.status === 401) {
        // Token expired, redirect to login
        router.push('/admin/login');
        return;
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Eye className="w-4 h-4" />;
      case 'read': return <CheckCircle className="w-4 h-4" />;
      case 'contacted': return <Phone className="w-4 h-4" />;
      case 'closed': return <XCircle className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  if (authLoading || loading || !user) {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Manage leads and track template sales</p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('leads')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'leads'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Mail className="w-4 h-4 inline mr-2" />
              Lead Management
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'templates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Template Sales
            </button>
          </nav>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'leads' ? (
        <>
          {/* Lead Management Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">New Leads</p>
                <p className="text-2xl font-bold text-gray-900">
                  {messages.filter(m => !m.status || m.status === 'new').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Phone className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Contacted</p>
                <p className="text-2xl font-bold text-gray-900">
                  {messages.filter(m => m.status === 'contacted').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {messages.filter(m => {
                    const messageDate = new Date(m.createdAt);
                    const now = new Date();
                    return messageDate.getMonth() === now.getMonth() && 
                           messageDate.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Messages List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              {/* Filters */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {filteredMessages.map((message) => (
                  <div
                    key={message._id}
                    onClick={() => setSelectedMessage(message)}
                    className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedMessage?._id === message._id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{message.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(message.status || 'new')}`}>
                            {getStatusIcon(message.status || 'new')}
                            {message.status || 'new'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{message.email}</p>
                        <p className="text-sm text-gray-500 mb-2">{message.service}</p>
                        <p className="text-sm text-gray-700 line-clamp-2">{message.message}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(message.createdAt).toLocaleDateString()} at {new Date(message.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Message Details */}
          <div className="lg:col-span-1">
            {selectedMessage ? (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Message Details</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(selectedMessage.status || 'new')}`}>
                    {getStatusIcon(selectedMessage.status || 'new')}
                    {selectedMessage.status || 'new'}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Name</label>
                    <p className="text-gray-900">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-900">{selectedMessage.email}</p>
                  </div>
                  {selectedMessage.company && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Company</label>
                      <p className="text-gray-900">{selectedMessage.company}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-gray-600">Service</label>
                    <p className="text-gray-900">{selectedMessage.service}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Message</label>
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Submitted</label>
                    <p className="text-gray-900">
                      {new Date(selectedMessage.createdAt).toLocaleDateString()} at {new Date(selectedMessage.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateMessageStatus(selectedMessage._id, 'read')}
                      className="flex-1 bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors"
                    >
                      Mark as Read
                    </button>
                    <button
                      onClick={() => updateMessageStatus(selectedMessage._id, 'contacted')}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Mark as Contacted
                    </button>
                  </div>
                  <button
                    onClick={() => updateMessageStatus(selectedMessage._id, 'closed')}
                    className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                  >
                    Close Lead
                  </button>
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: Your inquiry about ${selectedMessage.service}`}
                    className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
        </>
      ) : (
        <>
          {/* Template Sales Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                  <p className="text-2xl font-bold text-gray-900">{templateStats.totalInquiries}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">New Inquiries</p>
                  <p className="text-2xl font-bold text-gray-900">{templateStats.newInquiries}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Quoted</p>
                  <p className="text-2xl font-bold text-gray-900">{templateStats.quotedInquiries}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Sold</p>
                  <p className="text-2xl font-bold text-gray-900">{templateStats.soldInquiries}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">৳{templateStats.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{templateStats.conversionRate}%</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Deal Size</p>
                  <p className="text-2xl font-bold text-gray-900">৳{templateStats.avgDealSize.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Template Inquiries List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Template Inquiries</h3>
                </div>
                <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                  {templateInquiries.map((inquiry) => (
                    <div
                      key={inquiry._id}
                      onClick={() => setSelectedInquiry(inquiry)}
                      className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedInquiry?._id === inquiry._id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{inquiry.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              inquiry.status === 'new' ? 'bg-blue-100 text-blue-800' :
                              inquiry.status === 'quoted' ? 'bg-yellow-100 text-yellow-800' :
                              inquiry.status === 'sold' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {inquiry.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{inquiry.email}</p>
                          <p className="text-sm text-gray-500 mb-2">{inquiry.template} - {inquiry.customization}</p>
                          <p className="text-sm text-gray-700 line-clamp-2">{inquiry.message}</p>
                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(inquiry.createdAt).toLocaleDateString()} at {new Date(inquiry.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inquiry Details */}
            <div className="lg:col-span-1">
              {selectedInquiry ? (
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Inquiry Details</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedInquiry.status === 'new' ? 'bg-blue-100 text-blue-800' :
                      selectedInquiry.status === 'quoted' ? 'bg-yellow-100 text-yellow-800' :
                      selectedInquiry.status === 'sold' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedInquiry.status}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Name</label>
                      <p className="text-gray-900">{selectedInquiry.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-gray-900">{selectedInquiry.email}</p>
                    </div>
                    {selectedInquiry.phone && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Phone</label>
                        <p className="text-gray-900">{selectedInquiry.phone}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-gray-600">Template</label>
                      <p className="text-gray-900">{selectedInquiry.template}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Customization</label>
                      <p className="text-gray-900">{selectedInquiry.customization}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Budget</label>
                      <p className="text-gray-900">{selectedInquiry.budget}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Message</label>
                      <p className="text-gray-900 whitespace-pre-wrap">{selectedInquiry.message}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Submitted</label>
                      <p className="text-gray-900">
                        {new Date(selectedInquiry.createdAt).toLocaleDateString()} at {new Date(selectedInquiry.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 space-y-3">
                    <a
                      href={`https://wa.me/8801714918360?text=Hello ${selectedInquiry.name}! Thank you for your interest in the ${selectedInquiry.template} template. I'm following up on your inquiry about ${selectedInquiry.customization}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors text-center"
                    >
                      Contact via WhatsApp
                    </a>
                    <a
                      href={`mailto:${selectedInquiry.email}?subject=Re: Your ${selectedInquiry.template} Template Inquiry`}
                      className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                    >
                      Reply via Email
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Select an inquiry to view details</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
