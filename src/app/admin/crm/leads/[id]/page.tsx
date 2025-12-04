'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import useAdminAuth from '@/hooks/useAdminAuth';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';
import {
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  Building2,
  Tag,
  Star,
  Calendar,
  Edit,
  Save,
  X,
  Plus,
  Facebook,
  MessageSquare,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  status: string;
  source: string;
  leadScore: number;
  estimatedValue: number;
  currency: string;
  tags: string[];
  pixelId?: string;
  pixelEventId?: string;
  pixelEventType?: string;
  pixelSource?: string;
  pixelCampaign?: string;
  website?: string;
  location?: string;
  industry?: string;
  budget?: string;
  timeline?: string;
  notes?: string;
  lastContactedAt?: string;
  nextFollowUp?: string;
  createdAt: string;
  updatedAt: string;
}

interface Activity {
  _id: string;
  type: string;
  title: string;
  description: string;
  date: string;
  duration?: number;
  outcome?: string;
  createdBy: string;
}

export default function LeadDetailPage() {
  const [lead, setLead] = useState<Lead | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Lead>>({});
  const [newNote, setNewNote] = useState('');
  const { loading: authLoading } = useAdminAuth();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (!authLoading && params.id) {
      fetchLead();
    }
  }, [authLoading, params.id]);

  const fetchLead = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch(`/api/admin/crm/leads/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLead(data.lead);
        setActivities(data.activities || []);
        setEditData(data.lead);
      }
    } catch (error) {
      console.error('Error fetching lead:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLead = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch(`/api/admin/crm/leads/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        const data = await response.json();
        setLead(data.lead);
        setEditing(false);
      }
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const addActivity = async (type: string, title: string) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch('/api/admin/crm/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          leadId: params.id,
          type,
          title,
          description: newNote || title,
          date: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setNewNote('');
        fetchLead();
      }
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      qualified: 'bg-purple-100 text-purple-800',
      proposal: 'bg-indigo-100 text-indigo-800',
      negotiation: 'bg-orange-100 text-orange-800',
      won: 'bg-green-100 text-green-800',
      lost: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (authLoading || loading || !lead) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/crm"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to CRM
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{lead.name}</h1>
            <p className="text-gray-600 mt-1">{lead.email}</p>
          </div>
          <div className="flex gap-3">
            {editing ? (
              <>
                <button
                  onClick={updateLead}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setEditData(lead);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lead Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Lead Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Status</label>
                {editing ? (
                  <select
                    value={editData.status || lead.status}
                    onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="proposal">Proposal</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                  </select>
                ) : (
                  <div className="mt-1">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Lead Score</label>
                <div className="mt-1 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-lg font-semibold text-gray-900">{lead.leadScore}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Service</label>
                <p className="mt-1 text-gray-900">{lead.service}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Source</label>
                <div className="mt-1 flex items-center gap-2">
                  {lead.source === 'facebook' ? (
                    <Facebook className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Globe className="w-4 h-4 text-gray-600" />
                  )}
                  <span className="text-gray-900 capitalize">{lead.source}</span>
                  {lead.pixelId && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Pixel Tracked
                    </span>
                  )}
                </div>
              </div>
              {lead.company && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Company</label>
                  <p className="mt-1 text-gray-900">{lead.company}</p>
                </div>
              )}
              {lead.phone && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="mt-1 text-gray-900">{lead.phone}</p>
                </div>
              )}
            </div>

            {/* Facebook Pixel Info */}
            {lead.pixelId && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Facebook className="w-4 h-4" />
                  Facebook Pixel Tracking
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {lead.pixelCampaign && (
                    <div>
                      <span className="text-blue-700 font-medium">Campaign:</span>
                      <span className="text-blue-900 ml-2">{lead.pixelCampaign}</span>
                    </div>
                  )}
                  {lead.pixelEventType && (
                    <div>
                      <span className="text-blue-700 font-medium">Event:</span>
                      <span className="text-blue-900 ml-2">{lead.pixelEventType}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Message */}
            <div className="mt-6">
              <label className="text-sm font-medium text-gray-600">Message</label>
              <p className="mt-1 text-gray-900 whitespace-pre-wrap">{lead.message}</p>
            </div>

            {/* Notes */}
            <div className="mt-6">
              <label className="text-sm font-medium text-gray-600">Notes</label>
              {editing ? (
                <textarea
                  value={editData.notes || lead.notes || ''}
                  onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                  rows={4}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 text-gray-900 whitespace-pre-wrap">{lead.notes || 'No notes'}</p>
              )}
            </div>
          </div>

          {/* Activities Timeline */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h2>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity._id} className="flex gap-4 border-l-2 border-gray-200 pl-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      {activity.type === 'call' && <Phone className="w-4 h-4 text-blue-600" />}
                      {activity.type === 'email' && <Mail className="w-4 h-4 text-blue-600" />}
                      {activity.type === 'whatsapp' && <MessageSquare className="w-4 h-4 text-blue-600" />}
                      {activity.type === 'note' && <FileText className="w-4 h-4 text-blue-600" />}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-gray-900">{activity.title}</h4>
                      <span className="text-xs text-gray-500">
                        {new Date(activity.date).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">By {activity.createdBy}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Activity */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note or activity..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => addActivity('note', 'Note added')}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  Add Note
                </button>
                <a
                  href={`mailto:${lead.email}`}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
                {lead.phone && (
                  <a
                    href={`tel:${lead.phone}`}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </a>
                )}
                <a
                  href={`https://wa.me/8801714918360?text=Hello ${lead.name}!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <a
                href={`mailto:${lead.email}`}
                className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </a>
              {lead.phone && (
                <a
                  href={`tel:${lead.phone}`}
                  className="block w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </a>
              )}
              <a
                href={`https://wa.me/8801714918360?text=Hello ${lead.name}!`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-center flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Lead Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Details</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-600">Created:</span>
                <span className="text-gray-900 ml-2">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </span>
              </div>
              {lead.lastContactedAt && (
                <div>
                  <span className="text-gray-600">Last Contacted:</span>
                  <span className="text-gray-900 ml-2">
                    {new Date(lead.lastContactedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
              <div>
                <span className="text-gray-600">Estimated Value:</span>
                <span className="text-gray-900 ml-2">
                  {lead.currency} {lead.estimatedValue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

