import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Client from '@/lib/models/Client';
import { verifyToken } from '@/lib/auth';

// GET - Fetch all clients with filters
export async function GET(request: NextRequest) {
  const started = Date.now();
  let statusForLog = 200;
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      statusForLog = 401;
      return NextResponse.json({ error: 'Unauthorized' }, { status: statusForLog });
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
    const query: Record<string, unknown> = {};
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
    const sort: Record<string, 1 | -1> = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [clients, total] = await Promise.all([
      // @ts-expect-error - Mongoose overloaded method type issue
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
    statusForLog = 500;
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  } finally {
    const duration = Date.now() - started;
    console.log(`[perf] admin.clients.list status=${statusForLog} duration_ms=${duration} sort=${request.nextUrl.searchParams.get('sortBy') || 'createdAt'} page=${request.nextUrl.searchParams.get('page') || '1'} limit=${request.nextUrl.searchParams.get('limit') || '50'}`);
  }
}

// POST - Create new client
export async function POST(request: NextRequest) {
  const started = Date.now();
  let statusForLog = 201;
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      statusForLog = 401;
      return NextResponse.json({ error: 'Unauthorized' }, { status: statusForLog });
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
      statusForLog = 400;
      return NextResponse.json(
        { error: 'Company name and primary email are required' },
        { status: statusForLog }
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
      createdBy: (verifyToken(token) as { email?: string } | null)?.email || 'system',
    });

    await client.save();

    return NextResponse.json(
      { message: 'Client created successfully', client },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating client:', error);
    
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      statusForLog = 400;
      return NextResponse.json(
        { error: 'Client with this email already exists' },
        { status: statusForLog }
      );
    }
    
    statusForLog = 500;
    const errorMessage = error instanceof Error ? error.message : 'Failed to create client';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  } finally {
    const duration = Date.now() - started;
    console.log(`[perf] admin.clients.create status=${statusForLog} duration_ms=${duration}`);
  }
}

