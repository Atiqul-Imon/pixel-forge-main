import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Receipt from '@/lib/models/Receipt';
import { verifyToken } from '@/lib/auth';

// GET - Fetch single receipt
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const resolvedParams = await params;

    const receipt = await Receipt.findById(resolvedParams.id)
      .populate('clientId')
      .populate('invoiceId')
      .lean();

    if (!receipt) {
      return NextResponse.json({ error: 'Receipt not found' }, { status: 404 });
    }

    return NextResponse.json({ receipt });
  } catch (error) {
    console.error('Error fetching receipt:', error);
    return NextResponse.json(
      { error: 'Failed to fetch receipt' },
      { status: 500 }
    );
  }
}

// PUT - Update receipt
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const resolvedParams = await params;

    const receipt = await Receipt.findById(resolvedParams.id);
    if (!receipt) {
      return NextResponse.json({ error: 'Receipt not found' }, { status: 404 });
    }

    const body = await request.json();
    const {
      receiptDate,
      paymentDate,
      paymentMethod,
      paymentReference,
      transactionId,
      bankDetails,
      amountReceived,
      currency,
      exchangeRate,
      notes,
    } = body;

    // Update fields
    if (receiptDate) receipt.receiptDate = new Date(receiptDate);
    if (paymentDate) receipt.paymentDate = new Date(paymentDate);
    if (paymentMethod) receipt.paymentMethod = paymentMethod;
    if (paymentReference !== undefined) receipt.paymentReference = paymentReference;
    if (transactionId !== undefined) receipt.transactionId = transactionId;
    if (bankDetails) receipt.bankDetails = bankDetails;
    if (amountReceived) receipt.amountReceived = amountReceived;
    if (currency) receipt.currency = currency;
    if (exchangeRate !== undefined) receipt.exchangeRate = exchangeRate;
    if (notes !== undefined) receipt.notes = notes;

    await receipt.save();
    await receipt.populate('clientId', 'companyName primaryEmail primaryContactName');
    if (receipt.invoiceId) {
      await receipt.populate('invoiceId', 'invoiceNumber totalAmount');
    }

    return NextResponse.json({
      message: 'Receipt updated successfully',
      receipt,
    });
  } catch (error) {
    console.error('Error updating receipt:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to update receipt';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE - Delete receipt
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const resolvedParams = await params;

    const receipt = await Receipt.findById(resolvedParams.id);
    if (!receipt) {
      return NextResponse.json({ error: 'Receipt not found' }, { status: 404 });
    }

    // If receipt is linked to invoice, update invoice status
    if (receipt.invoiceId) {
      const Invoice = await import('@/lib/models/Invoice').then(m => m.default);
      // @ts-expect-error - Mongoose overloaded method type issue
      const invoice = await Invoice.findById(receipt.invoiceId);
      if (invoice) {
        const ReceiptModel = await import('@/lib/models/Receipt').then(m => m.default);
        // @ts-expect-error - Mongoose overloaded method type issue
        const allReceipts = await ReceiptModel.find({ invoiceId: receipt.invoiceId, _id: { $ne: receipt._id } });
        const totalPaid = allReceipts.reduce((sum, r) => sum + r.amountReceived, 0);
        
        if (totalPaid === 0) {
          invoice.status = invoice.status === 'paid' ? 'sent' : invoice.status;
        } else if (totalPaid < invoice.totalAmount) {
          invoice.status = 'partially_paid';
        }
        await invoice.save();
      }
    }

    // @ts-expect-error - Mongoose overloaded method type issue
    await Receipt.findByIdAndDelete(resolvedParams.id);

    return NextResponse.json({ message: 'Receipt deleted successfully' });
  } catch (error) {
    console.error('Error deleting receipt:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete receipt';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

