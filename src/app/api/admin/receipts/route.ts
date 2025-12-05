import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Receipt from '@/lib/models/Receipt';
import Invoice from '@/lib/models/Invoice';
import AccountSettings from '@/lib/models/AccountSettings';
import { verifyToken } from '@/lib/auth';

// GET - Fetch all receipts with filters
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');
    const invoiceId = searchParams.get('invoiceId');
    const fromDate = searchParams.get('fromDate');
    const toDate = searchParams.get('toDate');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    const query: any = {};
    if (clientId) query.clientId = clientId;
    if (invoiceId) query.invoiceId = invoiceId;
    
    if (fromDate || toDate) {
      query.receiptDate = {};
      if (fromDate) query.receiptDate.$gte = new Date(fromDate);
      if (toDate) query.receiptDate.$lte = new Date(toDate);
    }

    const skip = (page - 1) * limit;
    const sort: any = { receiptDate: -1 };

    const [receipts, total] = await Promise.all([
      Receipt.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('clientId', 'companyName primaryEmail primaryContactName')
        .populate('invoiceId', 'invoiceNumber totalAmount')
        .lean(),
      Receipt.countDocuments(query),
    ]);

    return NextResponse.json({
      receipts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching receipts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch receipts' },
      { status: 500 }
    );
  }
}

// POST - Create new receipt
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    const decodedToken = verifyToken(token?.replace('Bearer ', '') || '');
    
    if (!token || !decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const {
      invoiceId,
      clientId,
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

    if (!clientId || !paymentDate || !paymentMethod || !amountReceived) {
      return NextResponse.json(
        { error: 'Client ID, payment date, payment method, and amount are required' },
        { status: 400 }
      );
    }

    // Get account settings for receipt numbering
    let accountSettings = await AccountSettings.findOne();
    
    // If no account settings exist, create default
    if (!accountSettings) {
      accountSettings = new AccountSettings({
        companyName: 'Pixel Forge',
        invoiceSettings: {
          prefix: 'PF-INV',
          nextNumber: 1,
          defaultPaymentTerms: 'Net 30',
          defaultCurrency: 'BDT',
        },
        receiptSettings: {
          prefix: 'PF-RCP',
          nextNumber: 1,
        },
      });
      await accountSettings.save();
    }

    // Generate receipt number
    const receiptNumber = `${accountSettings.receiptSettings.prefix}-${String(accountSettings.receiptSettings.nextNumber).padStart(4, '0')}`;

    // Create receipt
    const receipt = new Receipt({
      receiptNumber,
      invoiceId: invoiceId || undefined,
      clientId,
      receiptDate: receiptDate ? new Date(receiptDate) : new Date(),
      paymentDate: new Date(paymentDate),
      paymentMethod,
      paymentReference,
      transactionId,
      bankDetails,
      amountReceived,
      currency: currency || accountSettings.invoiceSettings.defaultCurrency,
      exchangeRate,
      notes,
      createdBy: (decodedToken as any)?.email || 'system',
    });

    await receipt.save();

    // If receipt is linked to an invoice, update invoice status
    if (invoiceId) {
      const invoice = await Invoice.findById(invoiceId);
      if (invoice) {
        // Check if this is full payment
        if (amountReceived >= invoice.totalAmount) {
          invoice.status = 'paid';
        } else {
          // Check if total payments exceed invoice amount
          const ReceiptModel = await import('@/lib/models/Receipt').then(m => m.default);
          const allReceipts = await ReceiptModel.find({ invoiceId });
          const totalPaid = allReceipts.reduce((sum, r) => sum + r.amountReceived, 0);
          
          if (totalPaid >= invoice.totalAmount) {
            invoice.status = 'paid';
          } else if (totalPaid > 0) {
            invoice.status = 'partially_paid';
          }
        }
        await invoice.save();
      }
    }

    // Increment receipt number
    accountSettings.receiptSettings.nextNumber += 1;
    await accountSettings.save();

    // Populate before returning
    await receipt.populate('clientId', 'companyName primaryEmail primaryContactName');
    if (invoiceId) {
      await receipt.populate('invoiceId', 'invoiceNumber totalAmount');
    }

    return NextResponse.json(
      { message: 'Receipt created successfully', receipt },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating receipt:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create receipt' },
      { status: 500 }
    );
  }
}

