import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import EmailCommunication from '@/lib/models/EmailCommunication';
import { verifyToken } from '@/lib/auth';
import { randomBytes } from 'crypto';

// POST - Manually log an email that was sent outside the system
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
      to,
      cc,
      bcc,
      subject,
      htmlBody,
      emailType = 'other',
      clientId,
      contactPersonId,
      dealId,
      sentAt,
      readStatus = false,
      replyStatus = false,
      readAt,
      repliedAt,
      notes,
      followUpScheduled,
    } = body;

    if (!to || !subject) {
      return NextResponse.json(
        { error: 'Recipient email and subject are required' },
        { status: 400 }
      );
    }

    // Generate a tracking token (even though tracking won't be used for manual entries)
    const trackingToken = randomBytes(32).toString('hex');

    // Prepare recipient arrays
    const toArray = Array.isArray(to) ? to : [to];
    const ccArray = cc ? (Array.isArray(cc) ? cc : [cc]) : undefined;
    const bccArray = bcc ? (Array.isArray(bcc) ? bcc : [bcc]) : undefined;

    // Create email record (manual entry, no actual sending)
    const emailRecord = new EmailCommunication({
      from: process.env.EMAIL_USER || 'hello@pixelforgebd.com',
      to: toArray,
      cc: ccArray,
      bcc: bccArray,
      subject,
      htmlBody: htmlBody || '<p>Email logged manually</p>',
      sentAt: sentAt ? new Date(sentAt) : new Date(),
      readStatus,
      readAt: readAt ? new Date(readAt) : (readStatus ? new Date() : undefined),
      replyStatus,
      repliedAt: repliedAt ? new Date(repliedAt) : (replyStatus ? new Date() : undefined),
      trackingToken,
      emailType,
      clientId: clientId ? (clientId as any) : undefined,
      contactPersonId: contactPersonId ? (contactPersonId as any) : undefined,
      dealId: dealId ? (dealId as any) : undefined,
      followUpScheduled: followUpScheduled ? new Date(followUpScheduled) : undefined,
      createdBy: (decodedToken as any)?.email || 'system',
    });

    const savedEmail = await emailRecord.save();

    return NextResponse.json({
      message: 'Email logged successfully',
      emailId: savedEmail._id.toString(),
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error logging email:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to log email' },
      { status: 500 }
    );
  }
}

