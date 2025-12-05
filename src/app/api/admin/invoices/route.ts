import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Invoice from '@/lib/models/Invoice';
import AccountSettings from '@/lib/models/AccountSettings';
import { verifyToken } from '@/lib/auth';

// GET - Fetch all invoices with filters
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');
    const status = searchParams.get('status');
    const fromDate = searchParams.get('fromDate');
    const toDate = searchParams.get('toDate');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    const query: any = {};
    if (clientId) query.clientId = clientId;
    if (status && status !== 'all') query.status = status;
    
    if (fromDate || toDate) {
      query.invoiceDate = {};
      if (fromDate) query.invoiceDate.$gte = new Date(fromDate);
      if (toDate) query.invoiceDate.$lte = new Date(toDate);
    }
    
    if (search) {
      query.$or = [
        { invoiceNumber: { $regex: search, $options: 'i' } },
        { 'billingAddress.companyName': { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;
    const sort: any = { invoiceDate: -1 };

    const [invoices, total] = await Promise.all([
      Invoice.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('clientId', 'companyName primaryEmail primaryContactName')
        .lean(),
      Invoice.countDocuments(query),
    ]);

    return NextResponse.json({
      invoices,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    );
  }
}

// POST - Create new invoice
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
      clientId,
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
    } = body;

    if (!clientId || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Client ID and at least one item are required' },
        { status: 400 }
      );
    }

    // Get account settings for invoice numbering
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

    // Generate invoice number
    const invoiceNumber = `${accountSettings.invoiceSettings.prefix}-${String(accountSettings.invoiceSettings.nextNumber).padStart(4, '0')}`;
    
    // Calculate totals
    let subtotal = 0;
    items.forEach((item: any) => {
      const itemTotal = item.quantity * item.unitPrice;
      subtotal += itemTotal;
      item.amount = itemTotal;
    });

    const taxAmount = subtotal * ((taxRate || 0) / 100);
    const totalAmount = subtotal + taxAmount - (discountAmount || 0);

    // Determine status based on due date
    const dueDateObj = dueDate ? new Date(dueDate) : new Date();
    const status = 'draft';

    // Create invoice
    const invoice = new Invoice({
      invoiceNumber,
      clientId,
      invoiceDate: invoiceDate ? new Date(invoiceDate) : new Date(),
      dueDate: dueDateObj,
      status,
      paymentTerms: paymentTerms || accountSettings.invoiceSettings.defaultPaymentTerms,
      items,
      subtotal,
      taxRate: taxRate || 0,
      taxAmount,
      discountAmount: discountAmount || 0,
      totalAmount,
      currency: currency || accountSettings.invoiceSettings.defaultCurrency,
      exchangeRate,
      billingAddress,
      shippingAddress,
      notes,
      termsAndConditions: termsAndConditions || accountSettings.invoiceSettings.termsTemplate,
      paymentMethodsAccepted,
      createdBy: (decodedToken as any)?.email || 'system',
    });

    await invoice.save();

    // Increment invoice number
    accountSettings.invoiceSettings.nextNumber += 1;
    await accountSettings.save();

    // Populate client info before returning
    await invoice.populate('clientId', 'companyName primaryEmail primaryContactName');

    return NextResponse.json(
      { message: 'Invoice created successfully', invoice },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating invoice:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create invoice' },
      { status: 500 }
    );
  }
}

