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
  Receipt,
  Building2,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle,
  Printer,
  Mail,
} from 'lucide-react';

interface ReceiptData {
  _id: string;
  receiptNumber: string;
  receiptDate: string;
  paymentDate: string;
  paymentMethod: string;
  paymentReference?: string;
  transactionId?: string;
  bankDetails?: any;
  amountReceived: number;
  currency: string;
  notes?: string;
  clientId?: {
    _id: string;
    companyName: string;
    primaryEmail?: string;
  };
  invoiceId?: {
    _id: string;
    invoiceNumber: string;
    totalAmount: number;
  };
}

export default function ReceiptDetailPage() {
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const { loading: authLoading } = useAdminAuth();

  useEffect(() => {
    if (!authLoading && params.id) {
      fetchReceipt();
    }
  }, [authLoading, params.id]);

  const fetchReceipt = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch(`/api/admin/receipts/${params.id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setReceipt(data.receipt);
      } else {
        const errorData = await response.json();
        if (errorData.error === 'Receipt not found') {
          router.push('/admin/receipts');
        }
      }
    } catch (error) {
      console.error('Error fetching receipt:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      cash: 'Cash',
      bank_transfer: 'Bank Transfer',
      cheque: 'Cheque',
      online: 'Online Payment',
      card: 'Card Payment',
      other: 'Other',
    };
    return labels[method] || method;
  };

  const handlePrint = () => {
    window.print();
  };

  if (authLoading || loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!receipt) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Receipt not found</p>
          <Link href="/admin/receipts" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to Receipts
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
        <div className="max-w-4xl mx-auto print:max-w-full">
          {/* Header - Hidden when printing */}
          <div className="mb-6 print:hidden">
            <Link
              href="/admin/receipts"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Receipts
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Receipt {receipt.receiptNumber}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    <CheckCircle className="w-5 h-5" />
                    Payment Received
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
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

          {/* Receipt Details - Print friendly */}
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6 receipt-content">
            {/* Receipt Header */}
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
                    <p className="font-semibold text-gray-900">{receipt.clientId?.companyName}</p>
                    {receipt.clientId?.primaryEmail && <p>{receipt.clientId.primaryEmail}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Receipt Information */}
            <div className="p-6 border-b border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Receipt Number</p>
                  <p className="text-sm font-medium text-gray-900">{receipt.receiptNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Receipt Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatDate(receipt.receiptDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatDate(receipt.paymentDate)}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Payment Method:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {getPaymentMethodLabel(receipt.paymentMethod)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Amount Received:</span>
                  <span className="text-lg font-bold text-gray-900">
                    {receipt.currency} {receipt.amountReceived.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                {receipt.invoiceId && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Invoice:</span>
                    <Link
                      href={`/admin/invoices/${receipt.invoiceId._id}`}
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      {receipt.invoiceId.invoiceNumber}
                    </Link>
                  </div>
                )}
                {receipt.paymentReference && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Payment Reference:</span>
                    <span className="text-sm font-medium text-gray-900">{receipt.paymentReference}</span>
                  </div>
                )}
                {receipt.transactionId && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Transaction ID:</span>
                    <span className="text-sm font-medium text-gray-900">{receipt.transactionId}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bank Details */}
            {receipt.bankDetails && (receipt.paymentMethod === 'bank_transfer' || receipt.paymentMethod === 'cheque') && (
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Bank Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {receipt.bankDetails.bankName && (
                    <div>
                      <p className="text-sm text-gray-500">Bank Name</p>
                      <p className="text-sm font-medium text-gray-900">{receipt.bankDetails.bankName}</p>
                    </div>
                  )}
                  {receipt.bankDetails.accountNumber && (
                    <div>
                      <p className="text-sm text-gray-500">Account Number</p>
                      <p className="text-sm font-medium text-gray-900">{receipt.bankDetails.accountNumber}</p>
                    </div>
                  )}
                  {receipt.bankDetails.accountHolderName && (
                    <div>
                      <p className="text-sm text-gray-500">Account Holder</p>
                      <p className="text-sm font-medium text-gray-900">{receipt.bankDetails.accountHolderName}</p>
                    </div>
                  )}
                  {receipt.bankDetails.branchName && (
                    <div>
                      <p className="text-sm text-gray-500">Branch</p>
                      <p className="text-sm font-medium text-gray-900">{receipt.bankDetails.branchName}</p>
                    </div>
                  )}
                  {receipt.bankDetails.chequeNumber && (
                    <div>
                      <p className="text-sm text-gray-500">Cheque Number</p>
                      <p className="text-sm font-medium text-gray-900">{receipt.bankDetails.chequeNumber}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Notes */}
            {receipt.notes && (
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Notes</h3>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{receipt.notes}</p>
              </div>
            )}
          </div>

          {/* Client Link - Hidden when printing */}
          {receipt.clientId && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 print:hidden">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">Client:</span>{' '}
                <Link
                  href={`/admin/crm/clients/${receipt.clientId._id}`}
                  className="text-blue-600 hover:underline"
                >
                  {receipt.clientId.companyName}
                </Link>
              </p>
            </div>
          )}
        </div>
      </AdminLayout>
  );
}
