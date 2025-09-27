import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/lib/models/Contact';
import { requireAdmin, checkRateLimit } from '@/lib/auth';
import cache, { cacheKeys, CACHE_TTL } from '@/lib/cache';

// GET - Fetch all messages
export async function GET(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    // Rate limiting check - 150 requests per 15 minutes for admin
    if (!checkRateLimit(clientIP, 150, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    // Require admin authentication
    await requireAdmin(request);
    
    await connectDB();
    
    // Check cache first
    const cacheKey = cacheKeys.messages();
    const cachedMessages = cache.get(cacheKey);
    
    if (cachedMessages) {
      return NextResponse.json(cachedMessages);
    }
    
    const messages = await Contact.find({})
      .sort({ createdAt: -1 })
      .select('name email company service message status createdAt')
      .lean();
    
    // Cache the result
    cache.set(cacheKey, messages, CACHE_TTL.MESSAGES);
    
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    if (error instanceof Error && error.message === 'Admin access required') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// PATCH - Update message status
export async function PATCH(request: NextRequest) {
  try {
    // Require admin authentication
    await requireAdmin(request);
    
    const { id, status } = await request.json();
    
    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();
    
    const updatedMessage = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, select: 'name email company service message status createdAt' }
    ).lean();

    if (!updatedMessage) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    // Clear messages cache since data has changed
    cache.delete(cacheKeys.messages());

    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.error('Error updating message:', error);
    
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    if (error instanceof Error && error.message === 'Admin access required') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    );
  }
}

