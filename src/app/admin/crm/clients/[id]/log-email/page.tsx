'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import useAdminAuth from '@/hooks/useAdminAuth';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';
import { formatDate, getCurrentDateTimeLocal } from '@/utils/date';
import {
  ArrowLeft,
  Save,
  Mail,
  Calendar,
  Loader2,
  CheckCircle,
  Clock,
} from 'lucide-react';

export default function LogEmailPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [client, setClient] = useState<any>(null);
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { loading: authLoading } = useAdminAuth();

  const [formData, setFormData] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    htmlBody: '',
    emailType: 'outreach' as 'outreach' | 'proposal' | 'invoice' | 'follow-up' | 'greeting' | 'support' | 'marketing' | 'other',
    sentAt: getCurrentDateTimeLocal(), // Current date/time in local format
    readStatus: false,
    replyStatus: false,
    notes: '',
    followUpScheduled: '',
  });

  useEffect(() => {
    if (!authLoading && params.id) {
      fetchClient();
      // Pre-fill from query params if provided
      const to = searchParams.get('to');
      const subject = searchParams.get('subject');
      if (to) setFormData(prev => ({ ...prev, to }));
      if (subject) setFormData(prev => ({ ...prev, subject }));
    }
  }, [authLoading, params.id, searchParams]);

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
        setFormData(prev => ({
          ...prev,
          to: data.client.primaryEmail,
        }));
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

      if (!formData.to || !formData.subject) {
        setError('Email recipient and subject are required');
        setLoading(false);
        return;
      }

      // Create email record (without actually sending)
      const emailData = {
        to: formData.to.split(',').map((email: string) => email.trim()),
        cc: formData.cc ? formData.cc.split(',').map((email: string) => email.trim()) : undefined,
        bcc: formData.bcc ? formData.bcc.split(',').map((email: string) => email.trim()) : undefined,
        subject: formData.subject,
        htmlBody: formData.htmlBody || '<p>Email logged manually</p>',
        emailType: formData.emailType,
        clientId: params.id,
        sentAt: new Date(formData.sentAt).toISOString(),
        readStatus: formData.readStatus,
        replyStatus: formData.replyStatus,
        enableTracking: false, // Manual entry, no tracking
        isManualEntry: true,
        notes: formData.notes,
        followUpScheduled: formData.followUpScheduled ? new Date(formData.followUpScheduled).toISOString() : undefined,
      };

      const response = await fetch('/api/admin/crm/emails/manual-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(true);
        
        // Create follow-up if scheduled
        if (formData.followUpScheduled) {
          await createFollowUp(data.emailId);
        }
        
        setTimeout(() => {
          router.push(`/admin/crm/clients/${params.id}?tab=emails`);
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to log email');
      }
    } catch (error: any) {
      console.error('Error logging email:', error);
      setError(error.message || 'Failed to log email');
    } finally {
      setLoading(false);
    }
  };

  const createFollowUp = async (emailId: string) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const followUpData = {
        clientId: params.id,
        emailId: emailId,
        taskType: 'email',
        title: `Follow up: ${formData.subject}`,
        description: `Follow up for email sent on ${formatDate(formData.sentAt)}`,
        priority: 'medium',
        dueDate: formData.followUpScheduled,
        reminderDaysBefore: [3, 1],
      };

      await fetch('/api/admin/crm/followups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(followUpData),
      });
    } catch (error) {
      console.error('Error creating follow-up:', error);
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
          <h1 className="text-3xl font-bold text-gray-900">Log Email Communication</h1>
          <p className="text-gray-600 mt-2">Record an email sent outside the system (e.g., via Gmail)</p>
        </div>

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800">Email logged successfully! Redirecting...</span>
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
              </p>
            </div>

            {/* Email Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Email Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="email@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CC</label>
                  <input
                    type="text"
                    value={formData.cc}
                    onChange={(e) => setFormData({ ...formData, cc: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">BCC</label>
                  <input
                    type="text"
                    value={formData.bcc}
                    onChange={(e) => setFormData({ ...formData, bcc: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sent Date & Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.sentAt}
                    onChange={(e) => setFormData({ ...formData, sentAt: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Body/Content</label>
                  <textarea
                    value={formData.htmlBody}
                    onChange={(e) => setFormData({ ...formData, htmlBody: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Email content or summary..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Type</label>
                  <select
                    value={formData.emailType}
                    onChange={(e) => setFormData({ ...formData, emailType: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="outreach">Outreach</option>
                    <option value="proposal">Proposal</option>
                    <option value="invoice">Invoice</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="greeting">Greeting</option>
                    <option value="support">Support</option>
                    <option value="marketing">Marketing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Status */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Status</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.readStatus}
                    onChange={(e) => setFormData({ ...formData, readStatus: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Email was opened/read</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.replyStatus}
                    onChange={(e) => setFormData({ ...formData, replyStatus: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Client replied to this email</span>
                </label>
              </div>
            </div>

            {/* Follow-up */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Follow-up</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schedule Follow-up (Optional)
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.followUpScheduled}
                    onChange={(e) => setFormData({ ...formData, followUpScheduled: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={getCurrentDateTimeLocal()}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Create a follow-up task for this email
                  </p>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any additional notes about this email communication..."
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
                  Log Email
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

