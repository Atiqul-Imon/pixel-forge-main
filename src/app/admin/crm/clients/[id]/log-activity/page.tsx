'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import useAdminAuth from '@/hooks/useAdminAuth';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';
import { getCurrentDateTimeLocal, formatDateTime } from '@/utils/date';
import {
  ArrowLeft,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  Mail,
  PhoneCall,
  Video,
  MessageCircle,
  FileCheck,
  Quote,
  FileText,
  MessageSquare,
  Activity,
  Calendar,
  Clock,
} from 'lucide-react';

export default function LogActivityPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [client, setClient] = useState<any>(null);
  const params = useParams();
  const router = useRouter();
  const { loading: authLoading } = useAdminAuth();

  const [formData, setFormData] = useState({
    type: 'note' as 'call' | 'email' | 'meeting' | 'note' | 'whatsapp' | 'proposal' | 'document' | 'quote' | 'invoice' | 'payment' | 'other',
    title: '',
    description: '',
    date: getCurrentDateTimeLocal(),
    duration: '',
    outcome: '',
    direction: 'outbound' as 'inbound' | 'outbound' | '',
    contactMethod: '',
  });

  useEffect(() => {
    if (!authLoading && params.id) {
      fetchClient();
    }
  }, [authLoading, params.id]);

  const fetchClient = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const clientId = Array.isArray(params.id) ? params.id[0] : params.id;
      const response = await fetch(`/api/admin/crm/clients/${clientId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setClient(data.client);
      }
    } catch (error) {
      console.error('Error fetching client:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      if (!formData.title || !formData.description) {
        setError('Title and description are required');
        setLoading(false);
        return;
      }

      const activityData = {
        clientId: Array.isArray(params.id) ? params.id[0] : params.id,
        type: formData.type,
        title: formData.title,
        description: formData.description,
        date: new Date(formData.date).toISOString(),
        duration: formData.duration ? parseInt(formData.duration) : undefined,
        outcome: formData.outcome || undefined,
        direction: formData.direction || undefined,
        contactMethod: formData.contactMethod || undefined,
      };

      const response = await fetch('/api/admin/crm/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(activityData),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push(`/admin/crm/clients/${params.id}?tab=activities`);
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to log activity');
      }
    } catch (error: any) {
      console.error('Error logging activity:', error);
      setError(error.message || 'Failed to log activity');
    } finally {
      setLoading(false);
    }
  };

  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <PhoneCall className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'meeting':
        return <Video className="w-4 h-4" />;
      case 'proposal':
        return <FileCheck className="w-4 h-4" />;
      case 'quote':
        return <Quote className="w-4 h-4" />;
      case 'document':
        return <FileText className="w-4 h-4" />;
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4" />;
      case 'note':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const activityTypes = [
    { value: 'proposal', label: 'Proposal', icon: FileCheck, description: 'Sent project proposal or pitch' },
    { value: 'quote', label: 'Quote', icon: Quote, description: 'Sent price quote or estimate' },
    { value: 'call', label: 'Call', icon: PhoneCall, description: 'Phone or video call' },
    { value: 'email', label: 'Email', icon: Mail, description: 'Email communication' },
    { value: 'meeting', label: 'Meeting', icon: Video, description: 'In-person or virtual meeting' },
    { value: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, description: 'WhatsApp message' },
    { value: 'document', label: 'Document', icon: FileText, description: 'Shared or received document' },
    { value: 'note', label: 'Note', icon: MessageSquare, description: 'General note or memo' },
    { value: 'other', label: 'Other', icon: Activity, description: 'Other activity type' },
  ];

  if (authLoading) {
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
          <p className="text-gray-500">Loading client...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href={`/admin/crm/clients/${params.id}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Client
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Log Activity</h1>
          <p className="text-gray-600 mt-2">Record an activity or interaction with {client.companyName}</p>
        </div>

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800">Activity logged successfully! Redirecting...</span>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow">
          <div className="p-6 space-y-6">
            {/* Client Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Client:</strong> {client.companyName}
                {client.primaryContactName && ` - ${client.primaryContactName}`}
              </p>
            </div>

            {/* Activity Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Activity Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {activityTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: type.value as any })}
                      className={`flex flex-col items-center gap-2 px-4 py-3 border-2 rounded-lg transition-colors text-left ${
                        formData.type === type.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400 text-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{type.label}</span>
                      <span className="text-xs text-gray-500 text-center">{type.description}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Sent project proposal, Had initial call, Shared quote"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe what you did or what happened. Be specific about details, outcomes, or next steps..."
                required
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Date & Time <span className="text-red-500">*</span>
                </label>
                {/* Prominent formatted date display in dd/mm/yyyy */}
                <div className="mb-3 p-4 bg-gradient-to-r from-blue-100 to-indigo-100 border-2 border-blue-400 rounded-lg shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-blue-900 mb-1 uppercase tracking-wide">Current Date & Time:</p>
                      <p className="text-2xl font-bold text-blue-800 mb-1">{formatDateTime(formData.date)}</p>
                      <p className="text-xs font-medium text-blue-700">Format: dd/mm/yyyy HH:MM</p>
                    </div>
                    <Calendar className="w-10 h-10 text-blue-500 flex-shrink-0 ml-4" />
                  </div>
                </div>
                {/* Native input for browser picker (may show browser's format) */}
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Select Date & Time (input below may show browser format):
                </label>
                <input
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <p className="text-xs text-gray-600 mt-2 bg-yellow-50 border border-yellow-200 rounded p-2">
                  <strong>Note:</strong> The input field above uses your browser's date format. The formatted date shown at the top displays in <strong className="text-blue-700">dd/mm/yyyy HH:MM</strong> format (e.g., 25/12/2024 14:30).
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 30"
                  min="0"
                />
              </div>
            </div>

            {/* Direction (for communication activities) */}
            {(formData.type === 'call' || formData.type === 'email' || formData.type === 'meeting' || formData.type === 'whatsapp') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Direction</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, direction: 'outbound' })}
                    className={`px-4 py-2 border-2 rounded-lg transition-colors ${
                      formData.direction === 'outbound'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    Outbound (I initiated)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, direction: 'inbound' })}
                    className={`px-4 py-2 border-2 rounded-lg transition-colors ${
                      formData.direction === 'inbound'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    Inbound (Client initiated)
                  </button>
                </div>
              </div>
            )}

            {/* Outcome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Outcome</label>
              <textarea
                value={formData.outcome}
                onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="What was the result? What are the next steps? (optional)"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
            <Link
              href={`/admin/crm/clients/${params.id}`}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Logging...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Log Activity
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

