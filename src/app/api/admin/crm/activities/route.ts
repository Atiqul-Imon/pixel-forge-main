import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Activity from '@/lib/models/Activity';
import Lead from '@/lib/models/Lead';
import Client from '@/lib/models/Client';
import { verifyToken } from '@/lib/auth';

// GET - Fetch activities
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get('leadId');
    const dealId = searchParams.get('dealId');
    const clientId = searchParams.get('clientId');
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    const query: any = {};
    if (leadId) query.leadId = leadId;
    if (dealId) query.dealId = dealId;
    if (clientId) query.clientId = clientId;
    if (type && type !== 'all') query.type = type;

    const skip = (page - 1) * limit;

    const activities = await Activity.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .populate('clientId', 'companyName primaryEmail')
      .populate('leadId', 'name email company')
      .lean();

    const total = await Activity.countDocuments(query);

    return NextResponse.json({
      activities,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create activity
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token, 'access');
    if (!decoded || !('email' in decoded)) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const {
      leadId,
      dealId,
      clientId,
      type,
      title,
      description,
      date,
      duration,
      outcome,
      direction,
      contactMethod,
      attachments,
      relatedInvoiceId,
      relatedReceiptId,
      assignedTo,
    } = body;

    if (!type || !title || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const activity = new Activity({
      leadId,
      dealId,
      clientId,
      type,
      title,
      description,
      date: date ? new Date(date) : new Date(),
      duration,
      outcome,
      direction,
      contactMethod,
      attachments,
      relatedInvoiceId,
      relatedReceiptId,
      assignedTo,
      createdBy: decoded.email || 'admin',
    });

    await activity.save();

    // Update lead's lastContactedAt if it's a contact activity
    if (leadId && (type === 'call' || type === 'email' || type === 'meeting' || type === 'whatsapp')) {
      await Lead.findByIdAndUpdate(leadId, {
        lastContactedAt: new Date(),
      });
    }

    // Update client's lastContactedAt if it's a contact activity
    if (clientId && (type === 'call' || type === 'email' || type === 'meeting' || type === 'whatsapp' || type === 'proposal' || type === 'quote')) {
      await Client.findByIdAndUpdate(clientId, {
        lastContactedAt: new Date(),
      });
    }

    return NextResponse.json(
      { message: 'Activity created successfully', activity },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating activity:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

