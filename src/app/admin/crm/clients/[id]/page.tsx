'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import useAdminAuth from '@/hooks/useAdminAuth';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';
import { formatDate, formatDateTime } from '@/utils/date';
import {
  Building2,
  Mail,
  Phone,
  Globe,
  Calendar,
  DollarSign,
  TrendingUp,
  Edit,
  ArrowLeft,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Bell,
  FileText,
  Receipt,
  Plus,
  Eye,
  ExternalLink,
  Filter,
  MoreVertical,
  Loader2,
  CheckSquare,
  AlertCircle,
  X,
  Activity,
  FileCheck,
  MessageCircle,
  Video,
  PhoneCall,
  Paperclip,
  Quote,
  History,
} from 'lucide-react';

interface Client {
  _id: string;
  companyName: string;
  primaryEmail: string;
  primaryContactName?: string;
  industry?: string;
  relationshipStatus: string;
  clientTier: string;
  phone?: string;
  mobile?: string;
  website?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  clientSince?: string;
  monthlyRecurringRevenue: number;
  totalProjectsCompleted: number;
  activeProjectsCount: number;
  notes?: string;
  tags: string[];
  createdAt: string;
}

interface Email {
  _id: string;
  subject: string;
  to: string[];
  sentAt: string;
  readStatus: boolean;
  readAt?: string;
  replyStatus: boolean;
  emailType: string;
}

interface FollowUp {
  _id: string;
  title: string;
  description?: string;
  taskType: string;
  dueDate: string;
  status: string;
  priority: string;
  completedAt?: string;
  completedBy?: string;
  outcome?: string;
  notes?: string;
  createdAt: string;
}

interface Invoice {
  _id: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  status: string;
  totalAmount: number;
  currency: string;
}

interface Receipt {
  _id: string;
  receiptNumber: string;
  receiptDate: string;
  paymentDate: string;
  paymentMethod: string;
  amountReceived: number;
  currency: string;
  invoiceId?: {
    _id: string;
    invoiceNumber: string;
  };
}

export default function ClientDetailPage() {
  const [client, setClient] = useState<Client | null>(null);
  const [emails, setEmails] = useState<Email[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'emails' | 'followups' | 'contacts' | 'invoices' | 'activities'>('overview');
  const [followUpStatusFilter, setFollowUpStatusFilter] = useState<string>('all');
  const [activities, setActivities] = useState<any[]>([]);
  const [updatingFollowUp, setUpdatingFollowUp] = useState<string | null>(null);
  const [completingFollowUp, setCompletingFollowUp] = useState<string | null>(null);
  const [showCompleteModal, setShowCompleteModal] = useState<string | null>(null);
  const [completeOutcome, setCompleteOutcome] = useState('');
  const [completeUpdateClientStatus, setCompleteUpdateClientStatus] = useState(false);
  const [completeNewClientStatus, setCompleteNewClientStatus] = useState('');
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loading: authLoading } = useAdminAuth();

  useEffect(() => {
    if (!authLoading && params.id) {
      const clientId = Array.isArray(params.id) ? params.id[0] : params.id;
      
      // Redirect "new" or "newpage" to the new client page
      if (clientId === 'new' || clientId === 'newpage') {
        router.replace('/admin/crm/clients/new');
        return;
      }
      
      // Check if it's a valid MongoDB ObjectId format
      if (!/^[0-9a-fA-F]{24}$/.test(clientId)) {
        router.push('/admin/crm/clients');
        return;
      }
      
      // Set active tab from URL query parameter
      const tab = searchParams.get('tab');
      if (tab && ['overview', 'activities', 'emails', 'followups', 'invoices', 'contacts'].includes(tab)) {
        setActiveTab(tab as any);
      }
      
      fetchClientData();
    }
  }, [authLoading, params.id, router, searchParams]);

  const fetchClientData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const clientId = Array.isArray(params.id) ? params.id[0] : params.id;
      const [clientRes, emailsRes, followUpsRes, invoicesRes, receiptsRes, activitiesRes] = await Promise.all([
        fetch(`/api/admin/crm/clients/${clientId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch(`/api/admin/crm/emails?clientId=${clientId}&limit=10`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch(`/api/admin/crm/followups?clientId=${clientId}&limit=50`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch(`/api/admin/invoices?clientId=${clientId}&limit=50`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch(`/api/admin/receipts?clientId=${clientId}&limit=50`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch(`/api/admin/crm/activities?clientId=${clientId}&limit=100`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ]);

      if (clientRes.ok) {
        const clientData = await clientRes.json();
        setClient(clientData.client);
      }

      if (emailsRes.ok) {
        const emailsData = await emailsRes.json();
        setEmails(emailsData.emails || []);
      }

      if (followUpsRes.ok) {
        const followUpsData = await followUpsRes.json();
        setFollowUps(followUpsData.tasks || []);
      }

      if (invoicesRes.ok) {
        const invoicesData = await invoicesRes.json();
        setInvoices(invoicesData.invoices || []);
      }

      if (receiptsRes.ok) {
        const receiptsData = await receiptsRes.json();
        setReceipts(receiptsData.receipts || []);
      }

      if (activitiesRes.ok) {
        const activitiesData = await activitiesRes.json();
        setActivities(activitiesData.activities || []);
      }
    } catch (error) {
      console.error('Error fetching client data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      prospect: 'bg-blue-100 text-blue-800',
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      former: 'bg-yellow-100 text-yellow-800',
      blacklisted: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800',
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getFollowUpStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const handleFollowUpStatusUpdate = async (followUpId: string, newStatus: string) => {
    setUpdatingFollowUp(followUpId);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const response = await fetch(`/api/admin/crm/followups/${followUpId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Refresh follow-ups
        await fetchClientData();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to update follow-up status');
      }
    } catch (error) {
      console.error('Error updating follow-up status:', error);
      alert('Failed to update follow-up status');
    } finally {
      setUpdatingFollowUp(null);
    }
  };

  const handleCompleteFollowUp = async (followUpId: string, outcome: string, updateClientStatus: boolean, newClientStatus?: string) => {
    setCompletingFollowUp(followUpId);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const response = await fetch(`/api/admin/crm/followups/${followUpId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          outcome,
          updateClientStatus,
          newClientStatus,
        }),
      });

      if (response.ok) {
        setShowCompleteModal(null);
        setCompleteOutcome('');
        setCompleteUpdateClientStatus(false);
        setCompleteNewClientStatus('');
        // Refresh all client data
        await fetchClientData();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to complete follow-up');
      }
    } catch (error) {
      console.error('Error completing follow-up:', error);
      alert('Failed to complete follow-up');
    } finally {
      setCompletingFollowUp(null);
    }
  };

  const filteredFollowUps = followUps.filter(followUp => {
    if (followUpStatusFilter === 'all') return true;
    return followUp.status === followUpStatusFilter;
  });


  if (authLoading || loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!client) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Client not found</p>
          <Link href="/admin/crm/clients" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to Clients
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/crm/clients"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Clients
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{client.companyName}</h1>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(client.relationshipStatus)}`}>
                {client.relationshipStatus}
              </span>
              {client.industry && (
                <span className="text-sm text-gray-600">{client.industry}</span>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/admin/crm/emails/compose?clientId=${client._id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Email
            </Link>
            <Link
              href={`/admin/crm/clients/${client._id}/log-email`}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Log Email
            </Link>
            <Link
              href={`/admin/crm/clients/${client._id}/log-activity`}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Activity className="w-4 h-4" />
              Log Activity
            </Link>
            <Link
              href={`/admin/crm/clients/${client._id}/add-followup`}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              Add Follow-up
            </Link>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'activities', label: `Activity Timeline (${activities.length})` },
              { id: 'emails', label: `Emails (${emails.length})` },
              { id: 'followups', label: `Follow-ups (${followUps.length})` },
              { id: 'invoices', label: `Invoices & Receipts (${invoices.length + receipts.length})` },
              { id: 'contacts', label: 'Contacts' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Primary Contact</label>
                    <div className="mt-1">
                      {client.primaryContactName ? (
                        <p className="text-sm text-gray-900">{client.primaryContactName}</p>
                      ) : (
                        <p className="text-sm text-gray-400">Not specified</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href={`mailto:${client.primaryEmail}`} className="text-sm text-blue-600 hover:underline">
                      {client.primaryEmail}
                    </a>
                  </div>
                  {client.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <a href={`tel:${client.phone}`} className="text-sm text-gray-900">
                        {client.phone}
                      </a>
                    </div>
                  )}
                  {client.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                        {client.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {client.notes && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes</h2>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{client.notes}</p>
                </div>
              )}
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Monthly Recurring Revenue</label>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                      ৳{client.monthlyRecurringRevenue.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Active Projects</label>
                    <p className="text-xl font-bold text-green-600 mt-1">{client.activeProjectsCount}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Completed Projects</label>
                    <p className="text-xl font-bold text-gray-900 mt-1">{client.totalProjectsCompleted}</p>
                  </div>
                  {client.clientSince && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Client Since</label>
                      <p className="text-sm text-gray-900 mt-1">
                        {formatDate(client.clientSince)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Financial Summary */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Financial Summary</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Total Invoices</label>
                    <p className="text-xl font-bold text-gray-900 mt-1">{invoices.length}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Total Receipts</label>
                    <p className="text-xl font-bold text-gray-900 mt-1">{receipts.length}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Total Invoiced</label>
                    <p className="text-xl font-bold text-purple-600 mt-1">
                      ৳{invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Total Received</label>
                    <p className="text-xl font-bold text-green-600 mt-1">
                      ৳{receipts.reduce((sum, rec) => sum + (rec.amountReceived || 0), 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <label className="text-sm font-medium text-gray-500">Outstanding Balance</label>
                    <p className={`text-xl font-bold mt-1 ${
                      (invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0) - receipts.reduce((sum, rec) => sum + (rec.amountReceived || 0), 0)) > 0
                        ? 'text-red-600' : 'text-green-600'
                    }`}>
                      ৳{Math.max(0, invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0) - receipts.reduce((sum, rec) => sum + (rec.amountReceived || 0), 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>

              {client.tags && client.tags.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {client.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Activity Timeline Tab */}
        {activeTab === 'activities' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="text-lg font-semibold text-gray-900">Activity Timeline</h2>
                <Link
                  href={`/admin/crm/clients/${client._id}/log-activity`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Log Activity
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {activities.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No activities logged yet.{' '}
                  <Link href={`/admin/crm/clients/${client._id}/log-activity`} className="text-blue-600 hover:underline">
                    Log your first activity
                  </Link>
                </div>
              ) : (
                <div className="relative">
                  {/* Timeline */}
                  <div className="p-6 space-y-6">
                    {activities.map((activity, index) => {
                      const getActivityIcon = (type: string) => {
                        switch (type) {
                          case 'call':
                            return <PhoneCall className="w-5 h-5" />;
                          case 'email':
                            return <Mail className="w-5 h-5" />;
                          case 'meeting':
                            return <Video className="w-5 h-5" />;
                          case 'proposal':
                            return <FileCheck className="w-5 h-5" />;
                          case 'quote':
                            return <Quote className="w-5 h-5" />;
                          case 'document':
                            return <FileText className="w-5 h-5" />;
                          case 'whatsapp':
                            return <MessageCircle className="w-5 h-5" />;
                          case 'note':
                            return <MessageSquare className="w-5 h-5" />;
                          default:
                            return <Activity className="w-5 h-5" />;
                        }
                      };

                      const getActivityColor = (type: string) => {
                        switch (type) {
                          case 'call':
                            return 'bg-green-100 text-green-800 border-green-300';
                          case 'email':
                            return 'bg-blue-100 text-blue-800 border-blue-300';
                          case 'meeting':
                            return 'bg-purple-100 text-purple-800 border-purple-300';
                          case 'proposal':
                            return 'bg-orange-100 text-orange-800 border-orange-300';
                          case 'quote':
                            return 'bg-yellow-100 text-yellow-800 border-yellow-300';
                          case 'document':
                            return 'bg-gray-100 text-gray-800 border-gray-300';
                          case 'whatsapp':
                            return 'bg-emerald-100 text-emerald-800 border-emerald-300';
                          case 'note':
                            return 'bg-indigo-100 text-indigo-800 border-indigo-300';
                          default:
                            return 'bg-gray-100 text-gray-800 border-gray-300';
                        }
                      };

                      return (
                        <div key={activity._id} className="flex gap-4 relative">
                          {/* Timeline Line */}
                          {index < activities.length - 1 && (
                            <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200"></div>
                          )}
                          
                          {/* Icon */}
                          <div className={`flex-shrink-0 w-12 h-12 rounded-full ${getActivityColor(activity.type)} border-2 flex items-center justify-center`}>
                            {getActivityIcon(activity.type)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 pb-6">
                            <div className="flex items-start justify-between mb-1">
                              <div>
                                <h3 className="text-sm font-semibold text-gray-900">{activity.title}</h3>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {formatDateTime(activity.date)}
                                </p>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getActivityColor(activity.type)}`}>
                                {activity.type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">{activity.description}</p>
                            {activity.outcome && (
                              <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                                <p className="text-xs font-medium text-gray-700 mb-1">Outcome:</p>
                                <p className="text-sm text-gray-600">{activity.outcome}</p>
                              </div>
                            )}
                            {activity.duration && (
                              <p className="text-xs text-gray-500 mt-2">Duration: {activity.duration} minutes</p>
                            )}
                            {activity.attachments && activity.attachments.length > 0 && (
                              <div className="mt-2 flex items-center gap-2">
                                <Paperclip className="w-4 h-4 text-gray-400" />
                                <span className="text-xs text-gray-500">{activity.attachments.length} attachment(s)</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Emails Tab */}
        {activeTab === 'emails' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="text-lg font-semibold text-gray-900">Email History</h2>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/crm/emails/compose?clientId=${client._id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Send className="w-4 h-4" />
                    Send Email
                  </Link>
                  <Link
                    href={`/admin/crm/clients/${client._id}/log-email`}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    Log External Email
                  </Link>
                </div>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {emails.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No emails sent yet. <Link href={`/admin/crm/emails/compose?clientId=${client._id}`} className="text-blue-600 hover:underline">Send your first email</Link>
                </div>
              ) : (
                emails.map((email) => (
                  <div key={email._id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{email.subject}</h3>
                        <p className="text-sm text-gray-500 mt-1">To: {email.to.join(', ')}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDateTime(email.sentAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {email.readStatus && (
                          <span className="text-green-600" title="Read">
                            <CheckCircle className="w-4 h-4" />
                          </span>
                        )}
                        {email.replyStatus && (
                          <span className="text-blue-600" title="Replied">
                            <MessageSquare className="w-4 h-4" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Follow-ups Tab - Enhanced Management */}
        {activeTab === 'followups' && (
          <div className="space-y-6">
            {/* Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Follow-ups</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{followUps.length}</p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600 mt-1">
                      {followUps.filter(f => f.status === 'pending').length}
                    </p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Overdue</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">
                      {followUps.filter(f => f.status === 'overdue').length}
                    </p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Completed</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                      {followUps.filter(f => f.status === 'completed').length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </div>

            {/* Actions and Filters */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter by Status:
                  </label>
                  <select
                    value={followUpStatusFilter}
                    onChange={(e) => setFollowUpStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All ({followUps.length})</option>
                    <option value="pending">Pending ({followUps.filter(f => f.status === 'pending').length})</option>
                    <option value="in-progress">In Progress ({followUps.filter(f => f.status === 'in-progress').length})</option>
                    <option value="overdue">Overdue ({followUps.filter(f => f.status === 'overdue').length})</option>
                    <option value="completed">Completed ({followUps.filter(f => f.status === 'completed').length})</option>
                    <option value="cancelled">Cancelled ({followUps.filter(f => f.status === 'cancelled').length})</option>
                  </select>
                </div>
                <Link
                  href={`/admin/crm/clients/${client._id}/add-followup`}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Follow-up
                </Link>
              </div>
            </div>

            {/* Follow-ups List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Follow-up Tasks ({filteredFollowUps.length})</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredFollowUps.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    {followUpStatusFilter === 'all' 
                      ? 'No follow-up tasks yet. '
                      : `No ${followUpStatusFilter} follow-up tasks. `}
                    <Link href={`/admin/crm/clients/${client._id}/add-followup`} className="text-blue-600 hover:underline">
                      Create your first follow-up
                    </Link>
                  </div>
                ) : (
                  filteredFollowUps.map((followUp) => {
                    const isOverdue = new Date(followUp.dueDate) < new Date() && followUp.status !== 'completed' && followUp.status !== 'cancelled';
                    return (
                      <div key={followUp._id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-base font-semibold text-gray-900">{followUp.title}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getFollowUpStatusColor(followUp.status)}`}>
                                {followUp.status === 'in-progress' ? 'In Progress' : followUp.status}
                              </span>
                            </div>
                            {followUp.description && (
                              <p className="text-sm text-gray-600 mb-3">{followUp.description}</p>
                            )}
                            <div className="flex items-center gap-4 flex-wrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(followUp.priority)}`}>
                                {followUp.priority}
                              </span>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Due: {formatDateTime(followUp.dueDate)}
                              </span>
                              {followUp.completedAt && (
                                <span className="text-xs text-green-600 flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3" />
                                  Completed: {formatDateTime(followUp.completedAt)}
                                </span>
                              )}
                              {isOverdue && followUp.status !== 'overdue' && (
                                <span className="text-xs text-red-600 flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  Overdue
                                </span>
                              )}
                            </div>
                            {followUp.outcome && (
                              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs font-medium text-gray-700 mb-1">Outcome:</p>
                                <p className="text-sm text-gray-600">{followUp.outcome}</p>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {/* Status Update Dropdown */}
                            <select
                              value={followUp.status}
                              onChange={(e) => handleFollowUpStatusUpdate(followUp._id, e.target.value)}
                              disabled={updatingFollowUp === followUp._id}
                              className={`px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                updatingFollowUp === followUp._id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="in-progress">In Progress</option>
                              <option value="overdue">Overdue</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            {/* Complete Button */}
                            {followUp.status !== 'completed' && (
                              <button
                                onClick={() => setShowCompleteModal(followUp._id)}
                                disabled={completingFollowUp === followUp._id}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
                              >
                                {completingFollowUp === followUp._id ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Completing...
                                  </>
                                ) : (
                                  <>
                                    <CheckSquare className="w-4 h-4" />
                                    Complete
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Complete Follow-up Modal */}
            {showCompleteModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Complete Follow-up</h3>
                    <button
                      onClick={() => {
                        setShowCompleteModal(null);
                        setCompleteOutcome('');
                        setCompleteUpdateClientStatus(false);
                        setCompleteNewClientStatus('');
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Outcome/Notes <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={completeOutcome}
                        onChange={(e) => setCompleteOutcome(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe the outcome of this follow-up (e.g., 'Deal signed', 'Client interested in proposal', 'Not interested', etc.)"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        The outcome will be used to automatically update client status if applicable.
                      </p>
                    </div>
                    <div>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={completeUpdateClientStatus}
                          onChange={(e) => setCompleteUpdateClientStatus(e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Manually update client status</span>
                      </label>
                      {completeUpdateClientStatus && (
                        <select
                          value={completeNewClientStatus}
                          onChange={(e) => setCompleteNewClientStatus(e.target.value)}
                          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select new status</option>
                          <option value="prospect">Prospect</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="former">Former</option>
                        </select>
                      )}
                    </div>
                    <div className="flex items-center justify-end gap-3 pt-4 border-t">
                      <button
                        onClick={() => {
                          setShowCompleteModal(null);
                          setCompleteOutcome('');
                          setCompleteUpdateClientStatus(false);
                          setCompleteNewClientStatus('');
                        }}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (!completeOutcome.trim()) {
                            alert('Please enter an outcome/note');
                            return;
                          }
                          handleCompleteFollowUp(
                            showCompleteModal,
                            completeOutcome,
                            completeUpdateClientStatus,
                            completeNewClientStatus || undefined
                          );
                        }}
                        disabled={completingFollowUp === showCompleteModal || !completeOutcome.trim()}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                      >
                        {completingFollowUp === showCompleteModal ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Completing...
                          </>
                        ) : (
                          <>
                            <CheckSquare className="w-4 h-4" />
                            Mark Complete
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Invoices & Receipts Tab */}
        {activeTab === 'invoices' && (
          <div className="space-y-6">
            {/* Financial Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Invoices</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{invoices.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Receipts</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{receipts.length}</p>
                  </div>
                  <Receipt className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Invoiced</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      ৳{invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0).toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Received</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                      ৳{receipts.reduce((sum, rec) => sum + (rec.amountReceived || 0), 0).toLocaleString()}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="text-lg font-semibold text-gray-900">Invoices & Receipts</h2>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/invoices/new?clientId=${client._id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Create Invoice
                  </Link>
                  <Link
                    href={`/admin/receipts/new?clientId=${client._id}`}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Create Receipt
                  </Link>
                </div>
              </div>
            </div>

            {/* Invoices Section */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Invoices ({invoices.length})
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {invoices.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    No invoices yet.{' '}
                    <Link href={`/admin/invoices/new?clientId=${client._id}`} className="text-blue-600 hover:underline">
                      Create your first invoice
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Invoice Number
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Due Date
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {invoices.map((invoice) => (
                          <tr key={invoice._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {invoice.invoiceNumber}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(invoice.invoiceDate)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(invoice.dueDate)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                              {invoice.currency} {invoice.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                                invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                                invoice.status === 'partially_paid' ? 'bg-yellow-100 text-yellow-800' :
                                invoice.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {invoice.status.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link
                                href={`/admin/invoices/${invoice._id}`}
                                className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Receipts Section */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Receipt className="w-5 h-5" />
                  Receipts ({receipts.length})
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {receipts.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    No receipts yet.{' '}
                    <Link href={`/admin/receipts/new?clientId=${client._id}`} className="text-blue-600 hover:underline">
                      Create your first receipt
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Receipt Number
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Receipt Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Payment Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Payment Method
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Invoice
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {receipts.map((receipt) => (
                          <tr key={receipt._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {receipt.receiptNumber}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(receipt.receiptDate)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(receipt.paymentDate)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                              {receipt.paymentMethod.replace('_', ' ')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {receipt.invoiceId ? (
                                <Link
                                  href={`/admin/invoices/${receipt.invoiceId._id}`}
                                  className="text-blue-600 hover:underline"
                                >
                                  {receipt.invoiceId.invoiceNumber}
                                </Link>
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                              {receipt.currency} {receipt.amountReceived.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link
                                href={`/admin/receipts/${receipt._id}`}
                                className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500">Contact management will be available soon.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

