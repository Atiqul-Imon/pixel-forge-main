import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import EmailCommunication from '@/lib/models/EmailCommunication';
import { verifyToken } from '@/lib/auth';

// GET - Fetch all emails with filters
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');
    const contactPersonId = searchParams.get('contactPersonId');
    const emailType = searchParams.get('emailType');
    const readStatus = searchParams.get('readStatus');
    const replyStatus = searchParams.get('replyStatus');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const sortBy = searchParams.get('sortBy') || 'sentAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build query
    const query: any = {};
    if (clientId) query.clientId = clientId;
    if (contactPersonId) query.contactPersonId = contactPersonId;
    if (emailType && emailType !== 'all') query.emailType = emailType;
    if (readStatus === 'true') query.readStatus = true;
    if (readStatus === 'false') query.readStatus = false;
    if (replyStatus === 'true') query.replyStatus = true;
    if (replyStatus === 'false') query.replyStatus = false;
    
    if (search) {
      query.$or = [
        { subject: { $regex: search, $options: 'i' } },
        { to: { $regex: search, $options: 'i' } },
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [emails, total] = await Promise.all([
      EmailCommunication.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('clientId', 'companyName primaryEmail')
        .populate('contactPersonId', 'fullName email')
        .populate('templateId', 'name')
        .lean(),
      EmailCommunication.countDocuments(query),
    ]);

    return NextResponse.json({
      emails,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching emails:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emails' },
      { status: 500 }
    );
  }
}

