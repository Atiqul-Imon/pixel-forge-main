'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import useAdminAuth from '@/hooks/useAdminAuth';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/utils/date';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Receipt,
  Mail,
  Printer,
  CheckCircle,
  Clock,
  XCircle,
  Building2,
  Calendar,
  DollarSign,
  FileText,
  Loader2,
} from 'lucide-react';

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  amount: number;
}

interface Invoice {
  _id: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  status: string;
  paymentTerms: string;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  currency: string;
  billingAddress?: any;
  notes?: string;
  termsAndConditions?: string;
  clientId?: {
    _id: string;
    companyName: string;
    primaryEmail: string;
    primaryContactName?: string;
  };
}

export default function InvoiceDetailPage() {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const params = useParams();
  const router = useRouter();
  const { loading: authLoading } = useAdminAuth();

  useEffect(() => {
    if (!authLoading && params.id) {
      fetchInvoice();
    }
  }, [authLoading, params.id]);

  const fetchInvoice = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch(`/api/admin/invoices/${params.id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setInvoice(data.invoice);
      } else {
        const errorData = await response.json();
        if (errorData.error === 'Invoice not found') {
          router.push('/admin/invoices');
        }
      }
    } catch (error) {
      console.error('Error fetching invoice:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this invoice? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const response = await fetch(`/api/admin/invoices/${params.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        router.push('/admin/invoices');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to delete invoice');
      }
    } catch (error) {
      console.error('Error deleting invoice:', error);
      alert('Failed to delete invoice');
    } finally {
      setDeleting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      paid: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800',
      partially_paid: 'bg-yellow-100 text-yellow-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-5 h-5" />;
      case 'overdue':
        return <XCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const isOverdue = invoice && new Date(invoice.dueDate) < new Date() && invoice.status !== 'paid';

  if (authLoading || loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!invoice) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Invoice not found</p>
          <Link href="/admin/invoices" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to Invoices
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
        <div className="max-w-5xl mx-auto print:max-w-full">
          {/* Header - Hidden when printing */}
          <div className="mb-6 print:hidden">
            <Link
              href="/admin/invoices"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Invoices
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Invoice {invoice.invoiceNumber}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                    {getStatusIcon(invoice.status)}
                    {invoice.status.replace('_', ' ')}
                  </span>
                  {isOverdue && (
                    <span className="text-sm text-red-600 font-medium">Overdue</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {invoice.status === 'draft' && (
                  <>
                    <Link
                      href={`/admin/invoices/${invoice._id}/edit`}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>
                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      {deleting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                      Delete
                    </button>
                  </>
                )}
                {invoice.status !== 'paid' && (
                  <Link
                    href={`/admin/receipts/new?invoiceId=${invoice._id}&clientId=${invoice.clientId?._id}`}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <Receipt className="w-4 h-4" />
                    Create Receipt
                  </Link>
                )}
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
              </div>
            </div>
          </div>

          {/* Invoice Details - Print friendly */}
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6 invoice-content">
            {/* Invoice Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <Image
                      src="/logo/pixelforgenobglogo.png"
                      alt="Pixel Forge Logo"
                      width={150}
                      height={60}
                      className="h-auto object-contain"
                      priority
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">From</h2>
                  <div className="text-sm text-gray-600">
                    <p className="font-semibold text-gray-900">Pixel Forge</p>
                    <p>Web Development Agency</p>
                    <p>Bangladesh</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">To</h2>
                  <div className="text-sm text-gray-600">
                    {invoice.billingAddress ? (
                      <>
                        <p className="font-semibold text-gray-900">{invoice.billingAddress.companyName || invoice.clientId?.companyName}</p>
                        {invoice.billingAddress.contactName && <p>{invoice.billingAddress.contactName}</p>}
                        {invoice.billingAddress.street && <p>{invoice.billingAddress.street}</p>}
                        {invoice.billingAddress.city && (
                          <p>
                            {invoice.billingAddress.city}
                            {invoice.billingAddress.state && `, ${invoice.billingAddress.state}`}
                            {invoice.billingAddress.zipCode && ` ${invoice.billingAddress.zipCode}`}
                          </p>
                        )}
                        {invoice.billingAddress.country && <p>{invoice.billingAddress.country}</p>}
                      </>
                    ) : (
                      <>
                        <p className="font-semibold text-gray-900">{invoice.clientId?.companyName}</p>
                        {invoice.clientId?.primaryContactName && <p>{invoice.clientId.primaryContactName}</p>}
                        {invoice.clientId?.primaryEmail && <p>{invoice.clientId.primaryEmail}</p>}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Information */}
            <div className="p-6 border-b border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Invoice Number</p>
                  <p className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Invoice Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatDate(invoice.invoiceDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Due Date</p>
                  <p className={`text-sm font-medium ${isOverdue ? 'text-red-600' : 'text-gray-900'}`}>
                    {formatDate(invoice.dueDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Terms</p>
                  <p className="text-sm font-medium text-gray-900">{invoice.paymentTerms}</p>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Items</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {invoice.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.quantity}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">
                          {invoice.currency} {item.unitPrice.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                          {invoice.currency} {item.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-6">
              <div className="flex justify-end">
                <div className="w-full md:w-1/3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-900 font-medium">
                      {invoice.currency} {invoice.subtotal.toFixed(2)}
                    </span>
                  </div>
                  {invoice.taxRate > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax ({invoice.taxRate}%):</span>
                      <span className="text-gray-900 font-medium">
                        {invoice.currency} {invoice.taxAmount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  {invoice.discountAmount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount:</span>
                      <span className="text-gray-900 font-medium">
                        -{invoice.currency} {invoice.discountAmount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold border-t pt-2">
                    <span className="text-gray-900">Total:</span>
                    <span className="text-gray-900">
                      {invoice.currency} {invoice.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes and Terms */}
            {(invoice.notes || invoice.termsAndConditions) && (
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                {invoice.notes && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Notes</h3>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{invoice.notes}</p>
                  </div>
                )}
                {invoice.termsAndConditions && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Terms & Conditions</h3>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{invoice.termsAndConditions}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Client Link - Hidden when printing */}
          {invoice.clientId && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 print:hidden">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">Client:</span>{' '}
                <Link
                  href={`/admin/crm/clients/${invoice.clientId._id}`}
                  className="text-blue-600 hover:underline"
                >
                  {invoice.clientId.companyName}
                </Link>
              </p>
            </div>
          )}
        </div>
      </AdminLayout>
  );
}
