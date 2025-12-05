import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Client from '@/lib/models/Client';
import { verifyToken } from '@/lib/auth';

// GET - Fetch all clients with filters
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const tier = searchParams.get('tier');
    const industry = searchParams.get('industry');
    const assignedTo = searchParams.get('assignedTo');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build query
    const query: any = {};
    if (status && status !== 'all') query.relationshipStatus = status;
    if (tier && tier !== 'all') query.clientTier = tier;
    if (industry && industry !== 'all') query.industry = industry;
    if (assignedTo && assignedTo !== 'all') query.assignedTo = assignedTo;
    
    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { primaryEmail: { $regex: search, $options: 'i' } },
        { primaryContactName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [clients, total] = await Promise.all([
      Client.find(query).sort(sort).skip(skip).limit(limit).lean(),
      Client.countDocuments(query),
    ]);

    return NextResponse.json({
      clients,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}

// POST - Create new client
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const {
      companyName,
      primaryEmail,
      primaryContactName,
      industry,
      relationshipStatus = 'prospect',
      clientTier = 'bronze',
      ...rest
    } = body;

    if (!companyName || !primaryEmail) {
      return NextResponse.json(
        { error: 'Company name and primary email are required' },
        { status: 400 }
      );
    }

    const client = new Client({
      companyName,
      primaryEmail,
      primaryContactName,
      industry,
      relationshipStatus,
      clientTier,
      ...rest,
      createdBy: verifyToken(token)?.email || 'system',
    });

    await client.save();

    return NextResponse.json(
      { message: 'Client created successfully', client },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating client:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Client with this email already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Failed to create client' },
      { status: 500 }
    );
  }
}

