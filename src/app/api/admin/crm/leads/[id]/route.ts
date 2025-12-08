import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';
import Activity from '@/lib/models/Activity';
import { verifyToken } from '@/lib/auth';

// GET - Get single lead with activities
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const resolvedParams = await params;

    // @ts-expect-error - Mongoose overloaded method type issue


    const lead = await Lead.findById(resolvedParams.id).lean();
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Fetch activities for this lead
    const activities = await Activity.find({ leadId: resolvedParams.id })
      .sort({ date: -1 })
      .lean();

    return NextResponse.json({
      lead,
      activities,
    });
  } catch (error) {
    console.error('Error fetching lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH - Update lead
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const updateData: any = {};

    // Allowed fields to update
    const allowedFields = [
      'name', 'email', 'phone', 'company', 'service', 'message',
      'status', 'source', 'leadScore', 'estimatedValue', 'currency',
      'tags', 'assignedTo', 'website', 'location', 'industry',
      'budget', 'timeline', 'notes', 'lastContactedAt', 'nextFollowUp',
    ];

    allowedFields.forEach((field) => {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    });

    // If status changes to contacted, update lastContactedAt
    if (body.status && body.status !== 'new') {
      updateData.lastContactedAt = new Date();
    }

    // @ts-expect-error - Mongoose overloaded method type issue


    const lead = await Lead.findByIdAndUpdate(
      resolvedParams.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Lead updated successfully',
      lead,
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete lead
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // @ts-expect-error - Mongoose overloaded method type issue


    const lead = await Lead.findByIdAndDelete(resolvedParams.id);
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Delete associated activities
    await Activity.deleteMany({ leadId: resolvedParams.id });

    return NextResponse.json({
      message: 'Lead deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

