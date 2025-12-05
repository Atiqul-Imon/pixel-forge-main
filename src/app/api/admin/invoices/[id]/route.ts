import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Invoice from '@/lib/models/Invoice';
import { verifyToken } from '@/lib/auth';

// GET - Fetch single invoice
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const invoice = await Invoice.findById(params.id).populate('clientId');
    const invoiceData = invoice ? invoice.toObject() : null;

    if (!invoiceData) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    return NextResponse.json({ invoice: invoiceData });
  } catch (error) {
    console.error('Error fetching invoice:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invoice' },
      { status: 500 }
    );
  }
}

// PUT - Update invoice
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const invoice = await Invoice.findById(params.id);
    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    // Don't allow editing if invoice is paid or cancelled
    if (invoice.status === 'paid' || invoice.status === 'cancelled') {
      return NextResponse.json(
        { error: 'Cannot edit paid or cancelled invoice' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      invoiceDate,
      dueDate,
      paymentTerms,
      items,
      taxRate,
      discountAmount,
      currency,
      exchangeRate,
      billingAddress,
      shippingAddress,
      notes,
      termsAndConditions,
      paymentMethodsAccepted,
      status,
    } = body;

    // If items are updated, recalculate totals
    if (items && items.length > 0) {
      let subtotal = 0;
      items.forEach((item: any) => {
        const itemTotal = item.quantity * item.unitPrice;
        subtotal += itemTotal;
        item.amount = itemTotal;
      });

      const taxAmount = subtotal * ((taxRate !== undefined ? taxRate : invoice.taxRate) / 100);
      const finalDiscountAmount = discountAmount !== undefined ? discountAmount : invoice.discountAmount;
      const totalAmount = subtotal + taxAmount - finalDiscountAmount;

      invoice.items = items;
      invoice.subtotal = subtotal;
      invoice.taxRate = taxRate !== undefined ? taxRate : invoice.taxRate;
      invoice.taxAmount = taxAmount;
      invoice.discountAmount = finalDiscountAmount;
      invoice.totalAmount = totalAmount;
    }

    // Update other fields
    if (invoiceDate) invoice.invoiceDate = new Date(invoiceDate);
    if (dueDate) invoice.dueDate = new Date(dueDate);
    if (paymentTerms) invoice.paymentTerms = paymentTerms;
    if (currency) invoice.currency = currency;
    if (exchangeRate !== undefined) invoice.exchangeRate = exchangeRate;
    if (billingAddress) invoice.billingAddress = billingAddress;
    if (shippingAddress) invoice.shippingAddress = shippingAddress;
    if (notes !== undefined) invoice.notes = notes;
    if (termsAndConditions !== undefined) invoice.termsAndConditions = termsAndConditions;
    if (paymentMethodsAccepted) invoice.paymentMethodsAccepted = paymentMethodsAccepted;
    if (status && ['draft', 'sent', 'paid', 'overdue', 'cancelled', 'partially_paid'].includes(status)) {
      invoice.status = status;
    }

    await invoice.save();
    await invoice.populate('clientId', 'companyName primaryEmail primaryContactName');

    return NextResponse.json({
      message: 'Invoice updated successfully',
      invoice,
    });
  } catch (error: any) {
    console.error('Error updating invoice:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update invoice' },
      { status: 500 }
    );
  }
}

// DELETE - Delete invoice
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const invoice = await Invoice.findById(params.id);
    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    // Only allow deletion of draft invoices
    if (invoice.status !== 'draft') {
      return NextResponse.json(
        { error: 'Can only delete draft invoices' },
        { status: 400 }
      );
    }

    await invoice.deleteOne();

    return NextResponse.json({ message: 'Invoice deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting invoice:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete invoice' },
      { status: 500 }
    );
  }
}

