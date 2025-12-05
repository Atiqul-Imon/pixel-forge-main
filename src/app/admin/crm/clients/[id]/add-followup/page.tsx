'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import useAdminAuth from '@/hooks/useAdminAuth';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';
import { getCurrentDateTimeLocal, getCurrentDateLocal } from '@/utils/date';
import {
  ArrowLeft,
  Save,
  Clock,
  Calendar,
  Loader2,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  MessageSquare,
} from 'lucide-react';

export default function AddFollowUpPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [client, setClient] = useState<any>(null);
  const params = useParams();
  const router = useRouter();
  const { loading: authLoading } = useAdminAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    taskType: 'email' as 'email' | 'call' | 'meeting' | 'proposal' | 'invoice' | 'other',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    dueDate: (() => {
      const date = new Date();
      date.setDate(date.getDate() + 7);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    })(), // Default: 7 days from now
    dueTime: '09:00',
    reminderDaysBefore: [] as number[],
    notes: '',
    outcome: '',
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

      const response = await fetch(`/api/admin/crm/clients/${params.id}`, {
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

      if (!formData.title || !formData.dueDate) {
        setError('Title and due date are required');
        setLoading(false);
        return;
      }

      // Combine date and time
      const dueDateTime = new Date(`${formData.dueDate}T${formData.dueTime}`);
      
      const followUpData = {
        clientId: params.id,
        taskType: formData.taskType,
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        dueDate: dueDateTime.toISOString(),
        reminderDaysBefore: formData.reminderDaysBefore.length > 0 
          ? formData.reminderDaysBefore 
          : [3, 1], // Default reminders: 3 days and 1 day before
        notes: formData.notes,
      };

      const response = await fetch('/api/admin/crm/followups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(followUpData),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push(`/admin/crm/clients/${params.id}?tab=followups`);
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create follow-up');
      }
    } catch (error: any) {
      console.error('Error creating follow-up:', error);
      setError(error.message || 'Failed to create follow-up');
    } finally {
      setLoading(false);
    }
  };

  const toggleReminder = (days: number) => {
    setFormData(prev => {
      const reminders = [...prev.reminderDaysBefore];
      const index = reminders.indexOf(days);
      if (index > -1) {
        reminders.splice(index, 1);
      } else {
        reminders.push(days);
        reminders.sort((a, b) => b - a); // Sort descending
      }
      return { ...prev, reminderDaysBefore: reminders };
    });
  };

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'call':
        return <Phone className="w-4 h-4" />;
      case 'meeting':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Create Follow-up Task</h1>
          <p className="text-gray-600 mt-2">Schedule a follow-up task for {client.companyName}</p>
        </div>

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800">Follow-up created successfully! Redirecting...</span>
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

            {/* Task Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Task Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Task Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Follow up on proposal, Call to discuss project"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Task Type
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { value: 'email', label: 'Email', icon: Mail },
                      { value: 'call', label: 'Call', icon: Phone },
                      { value: 'meeting', label: 'Meeting', icon: MessageSquare },
                      { value: 'proposal', label: 'Proposal', icon: Clock },
                      { value: 'invoice', label: 'Invoice', icon: Clock },
                      { value: 'other', label: 'Other', icon: Clock },
                    ].map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, taskType: type.value as any })}
                          className={`flex items-center gap-2 px-4 py-3 border-2 rounded-lg transition-colors ${
                            formData.taskType === type.value
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400 text-gray-700'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{type.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add details about this follow-up task..."
                  />
                </div>
              </div>
            </div>

            {/* Scheduling */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Schedule</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={getCurrentDateLocal()}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Time
                  </label>
                  <input
                    type="time"
                    value={formData.dueTime}
                    onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Priority */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Priority</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'low', label: 'Low', color: 'gray' },
                  { value: 'medium', label: 'Medium', color: 'blue' },
                  { value: 'high', label: 'High', color: 'orange' },
                  { value: 'urgent', label: 'Urgent', color: 'red' },
                ].map((priority) => (
                  <button
                    key={priority.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, priority: priority.value as any })}
                    className={`px-4 py-3 border-2 rounded-lg transition-colors ${
                      formData.priority === priority.value
                        ? `border-${priority.color}-500 bg-${priority.color}-50 text-${priority.color}-700`
                        : 'border-gray-300 hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    <span className="text-sm font-medium">{priority.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Reminders */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Reminders</h2>
              <p className="text-sm text-gray-600 mb-3">Get notified before the due date</p>
              <div className="flex flex-wrap gap-3">
                {[7, 3, 2, 1].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => toggleReminder(days)}
                    className={`px-4 py-2 border-2 rounded-lg transition-colors ${
                      formData.reminderDaysBefore.includes(days)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    {days} {days === 1 ? 'day' : 'days'} before
                  </button>
                ))}
              </div>
              {formData.reminderDaysBefore.length > 0 && (
                <p className="text-xs text-gray-500 mt-2">
                  Reminders set for: {formData.reminderDaysBefore.sort((a, b) => b - a).join(', ')} day(s) before
                </p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any additional notes or context for this follow-up..."
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
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Create Follow-up
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

