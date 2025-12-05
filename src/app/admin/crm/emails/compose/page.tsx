'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useAdminAuth from '@/hooks/useAdminAuth';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';
import {
  ArrowLeft,
  Send,
  Mail,
  FileText,
  X,
  CheckCircle,
  Loader2,
} from 'lucide-react';

interface EmailTemplate {
  _id: string;
  name: string;
  subject: string;
  htmlBody: string;
  templateType: string;
  availableVariables?: string[];
}

interface Client {
  _id: string;
  companyName: string;
  primaryEmail: string;
  primaryContactName?: string;
}

export default function ComposeEmailPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [template, setTemplate] = useState<EmailTemplate | null>(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    htmlBody: '',
    emailType: 'other' as 'outreach' | 'proposal' | 'invoice' | 'follow-up' | 'greeting' | 'support' | 'marketing' | 'other',
    clientId: '',
  });

  const [variables, setVariables] = useState<Record<string, string>>({});
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loading: authLoading } = useAdminAuth();

  useEffect(() => {
    if (!authLoading) {
      fetchTemplates();
      const clientId = searchParams.get('clientId');
      if (clientId) {
        setFormData(prev => ({ ...prev, clientId }));
        fetchClient(clientId);
      }
    }
  }, [authLoading, searchParams]);

  const fetchTemplates = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const response = await fetch('/api/admin/crm/email-templates?isActive=true', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setTemplates(data.templates || []);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const fetchClient = async (clientId: string) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const response = await fetch(`/api/admin/crm/clients/${clientId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        const client: Client = data.client;
        setFormData(prev => ({
          ...prev,
          to: client.primaryEmail,
        }));
        
        // Set default variables
        setVariables({
          client_name: client.companyName,
          contact_name: client.primaryContactName || client.companyName,
          date: new Date().toLocaleDateString(),
        });
      }
    } catch (error) {
      console.error('Error fetching client:', error);
    }
  };

  const handleTemplateSelect = async (templateId: string) => {
    setSelectedTemplate(templateId);
    setLoading(true);
    
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const response = await fetch(`/api/admin/crm/email-templates/${templateId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        const selectedTemplate: EmailTemplate = data.template;
        setTemplate(selectedTemplate);
        
        // Replace variables in template
        let subject = selectedTemplate.subject;
        let htmlBody = selectedTemplate.htmlBody;
        
        Object.keys(variables).forEach(key => {
          const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
          subject = subject.replace(regex, variables[key]);
          htmlBody = htmlBody.replace(regex, variables[key]);
        });
        
        setFormData(prev => ({
          ...prev,
          subject,
          htmlBody,
        }));
      }
    } catch (error) {
      console.error('Error loading template:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVariableChange = (key: string, value: string) => {
    const newVariables = { ...variables, [key]: value };
    setVariables(newVariables);
    
    // Reapply template if selected
    if (template) {
      let subject = template.subject;
      let htmlBody = template.htmlBody;
      
      Object.keys(newVariables).forEach(varKey => {
        const regex = new RegExp(`{{\\s*${varKey}\\s*}}`, 'g');
        subject = subject.replace(regex, newVariables[varKey]);
        htmlBody = htmlBody.replace(regex, newVariables[varKey]);
      });
      
      setFormData(prev => ({
        ...prev,
        subject,
        htmlBody,
      }));
    }
  };

  const handleSend = async () => {
    if (!formData.to || !formData.subject || !formData.htmlBody) {
      alert('Please fill in all required fields');
      return;
    }

    setSending(true);
    setSuccess(false);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const emailData: any = {
        to: formData.to.split(',').map((email: string) => email.trim()),
        subject: formData.subject,
        htmlBody: formData.htmlBody,
        emailType: formData.emailType,
        enableTracking: true,
      };

      if (formData.cc) {
        emailData.cc = formData.cc.split(',').map((email: string) => email.trim());
      }
      if (formData.bcc) {
        emailData.bcc = formData.bcc.split(',').map((email: string) => email.trim());
      }
      if (formData.clientId) {
        emailData.clientId = formData.clientId;
      }
      if (selectedTemplate) {
        emailData.templateId = selectedTemplate;
        emailData.variables = variables;
      }

      const response = await fetch('/api/admin/crm/emails/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          if (formData.clientId) {
            router.push(`/admin/crm/clients/${formData.clientId}`);
          } else {
            router.push('/admin/crm/clients');
          }
        }, 2000);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    } finally {
      setSending(false);
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

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href={formData.clientId ? `/admin/crm/clients/${formData.clientId}` : '/admin/crm/clients'}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Compose Email</h1>
        </div>

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800">Email sent successfully! Redirecting...</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Template Selector */}
            <div className="bg-white p-6 rounded-lg shadow">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Template (Optional)
              </label>
              <select
                value={selectedTemplate}
                onChange={(e) => handleTemplateSelect(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">No template</option>
                {templates.map((template) => (
                  <option key={template._id} value={template._id}>
                    {template.name}
                  </option>
                ))}
              </select>
              {loading && (
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading template...
                </div>
              )}
            </div>

            {/* Variables Editor (if template selected) */}
            {template && template.availableVariables && template.availableVariables.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Template Variables</h3>
                <div className="space-y-3">
                  {template.availableVariables.map((varKey) => (
                    <div key={varKey}>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        {varKey.replace(/_/g, ' ')}
                      </label>
                      <input
                        type="text"
                        value={variables[varKey] || ''}
                        onChange={(e) => handleVariableChange(varKey, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder={`Enter ${varKey}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Email Form */}
            <div className="bg-white p-6 rounded-lg shadow space-y-6">
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
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.htmlBody}
                  onChange={(e) => setFormData({ ...formData, htmlBody: e.target.value })}
                  rows={15}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  required
                />
                <p className="mt-2 text-xs text-gray-500">HTML is supported</p>
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

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Email Preview</h3>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="text-xs text-gray-500 mb-2">
                  <strong>To:</strong> {formData.to || 'Not set'}
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  <strong>Subject:</strong> {formData.subject || 'Not set'}
                </div>
                <div className="text-xs text-gray-500">
                  <strong>Type:</strong> {formData.emailType}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Email Tracking</h3>
              <p className="text-xs text-blue-700">
                This email will be tracked automatically. You'll be able to see when it's opened and which links are clicked.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <Link
            href={formData.clientId ? `/admin/crm/clients/${formData.clientId}` : '/admin/crm/clients'}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            onClick={handleSend}
            disabled={sending || !formData.to || !formData.subject || !formData.htmlBody}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Email
              </>
            )}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

