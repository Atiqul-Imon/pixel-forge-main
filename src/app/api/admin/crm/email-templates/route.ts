import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import EmailTemplate from '@/lib/models/EmailTemplate';
import { verifyToken } from '@/lib/auth';

// GET - Fetch all email templates
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const templateType = searchParams.get('templateType');
    const category = searchParams.get('category');
    const isActive = searchParams.get('isActive');
    const search = searchParams.get('search');

    const query: any = {};
    if (templateType && templateType !== 'all') query.templateType = templateType;
    if (category && category !== 'all') query.category = category;
    if (isActive === 'true') query.isActive = true;
    if (isActive === 'false') query.isActive = false;
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
      ];
    }

    const templates = await EmailTemplate.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ templates });
  } catch (error) {
    console.error('Error fetching email templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch email templates' },
      { status: 500 }
    );
  }
}

// POST - Create email template
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
      name,
      subject,
      htmlBody,
      textBody,
      templateType = 'other',
      category,
      availableVariables,
      isActive = true,
    } = body;

    if (!name || !subject || !htmlBody) {
      return NextResponse.json(
        { error: 'Name, subject, and HTML body are required' },
        { status: 400 }
      );
    }

    const template = new EmailTemplate({
      name,
      subject,
      htmlBody,
      textBody,
      templateType,
      category,
      availableVariables,
      isActive,
      createdBy: decodedToken.email || 'system',
    });

    await template.save();

    return NextResponse.json(
      { message: 'Email template created successfully', template },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating email template:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create email template' },
      { status: 500 }
    );
  }
}

