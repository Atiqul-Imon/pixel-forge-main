import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Payment from '@/lib/models/Payment';
import { verifyToken } from '@/lib/auth';

// GET - Fetch all payments with filters
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
    const status = searchParams.get('status');
    const fromDate = searchParams.get('fromDate');
    const toDate = searchParams.get('toDate');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    const query: Record<string, unknown> = {};
    if (clientId) query.clientId = clientId;
    if (invoiceId) query.invoiceId = invoiceId;
    if (status && status !== 'all') query.status = status;
    
    if (fromDate || toDate) {
      query.paymentDate = {};
      if (fromDate) (query.paymentDate as Record<string, Date>).$gte = new Date(fromDate);
      if (toDate) (query.paymentDate as Record<string, Date>).$lte = new Date(toDate);
    }

    const skip = (page - 1) * limit;
    const sort: Record<string, 1 | -1> = { paymentDate: -1 };

    const [payments, total] = await Promise.all([
      Payment.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('clientId', 'companyName primaryEmail')
        .populate('invoiceId', 'invoiceNumber totalAmount')
        .populate('receiptId', 'receiptNumber')
        .lean(),
      Payment.countDocuments(query),
    ]);

    return NextResponse.json({
      payments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}

// POST - Record payment
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
      paymentDate,
      amountPaid,
      paymentMethod,
      paymentReference,
      transactionId,
      bankDetails,
      status,
      notes,
    } = body;

    if (!clientId || !paymentDate || !amountPaid || !paymentMethod) {
      return NextResponse.json(
        { error: 'Client ID, payment date, amount, and payment method are required' },
        { status: 400 }
      );
    }

    const payment = new Payment({
      invoiceId: invoiceId || undefined,
      clientId,
      paymentDate: new Date(paymentDate),
      amountPaid,
      paymentMethod,
      paymentReference,
      transactionId,
      bankDetails,
      status: status || 'completed',
      notes,
      createdBy: (decodedToken as any)?.email || 'system',
    });

    await payment.save();

    await payment.populate('clientId', 'companyName primaryEmail');
    if (invoiceId) {
      await payment.populate('invoiceId', 'invoiceNumber totalAmount');
    }

    return NextResponse.json(
      { message: 'Payment recorded successfully', payment },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error recording payment:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to record payment' },
      { status: 500 }
    );
  }
}

