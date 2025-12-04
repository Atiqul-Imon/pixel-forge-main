import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';
import { verifyToken } from '@/lib/auth';

// GET - Fetch all leads with filters
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const source = searchParams.get('source');
    const service = searchParams.get('service');
    const assignedTo = searchParams.get('assignedTo');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build query
    const query: any = {};
    if (status && status !== 'all') query.status = status;
    if (source && source !== 'all') query.source = source;
    if (service && service !== 'all') query.service = service;
    if (assignedTo && assignedTo !== 'all') query.assignedTo = assignedTo;
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Fetch leads
    const leads = await Lead.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count
    const total = await Lead.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new lead
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const {
      name,
      email,
      phone,
      company,
      service,
      message,
      source = 'website',
      pixelId,
      pixelEventId,
      pixelEventType,
      pixelSource,
      pixelCampaign,
      status = 'new',
      estimatedValue = 0,
      tags = [],
    } = body;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate lead score (basic algorithm)
    let leadScore = 0;
    if (company) leadScore += 10;
    if (phone) leadScore += 10;
    if (source === 'facebook' || source === 'google') leadScore += 15;
    if (estimatedValue > 0) leadScore += 20;
    if (tags.length > 0) leadScore += 5;

    const lead = new Lead({
      name,
      email,
      phone,
      company,
      service,
      message,
      source,
      pixelId,
      pixelEventId,
      pixelEventType,
      pixelSource,
      pixelCampaign,
      status,
      estimatedValue,
      tags,
      leadScore,
      currency: 'BDT',
    });

    await lead.save();

    return NextResponse.json(
      { message: 'Lead created successfully', lead },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

