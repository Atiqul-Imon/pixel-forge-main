import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import FollowUpTask from '@/lib/models/FollowUpTask';
import { verifyToken } from '@/lib/auth';

// GET - Fetch all follow-up tasks
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const taskType = searchParams.get('taskType');
    const assignedTo = searchParams.get('assignedTo');
    const dueDateFrom = searchParams.get('dueDateFrom');
    const dueDateTo = searchParams.get('dueDateTo');
    const overdue = searchParams.get('overdue') === 'true';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    const query: any = {};
    if (clientId) query.clientId = clientId;
    if (status && status !== 'all') query.status = status;
    if (priority && priority !== 'all') query.priority = priority;
    if (taskType && taskType !== 'all') query.taskType = taskType;
    if (assignedTo && assignedTo !== 'all') query.assignedTo = assignedTo;
    
    if (dueDateFrom || dueDateTo) {
      query.dueDate = {};
      if (dueDateFrom) query.dueDate.$gte = new Date(dueDateFrom);
      if (dueDateTo) query.dueDate.$lte = new Date(dueDateTo);
    }
    
    if (overdue) {
      query.dueDate = { ...query.dueDate, $lt: new Date() };
      query.status = { $in: ['pending', 'in-progress'] };
    }

    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
      FollowUpTask.find(query)
        .sort({ dueDate: 1, priority: -1 })
        .skip(skip)
        .limit(limit)
        .populate('clientId', 'companyName primaryEmail')
        .populate('contactPersonId', 'fullName email')
        .lean(),
      FollowUpTask.countDocuments(query),
    ]);

    return NextResponse.json({
      tasks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching follow-ups:', error);
    return NextResponse.json(
      { error: 'Failed to fetch follow-ups' },
      { status: 500 }
    );
  }
}

// POST - Create follow-up task
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
      clientId,
      contactPersonId,
      dealId,
      emailId,
      taskType,
      title,
      description,
      priority = 'medium',
      dueDate,
      reminderDaysBefore = [],
      notes,
      assignedTo,
      isAutoCreated = false,
    } = body;

    if (!title || !dueDate) {
      return NextResponse.json(
        { error: 'Title and due date are required' },
        { status: 400 }
      );
    }

    const task = new FollowUpTask({
      clientId,
      contactPersonId,
      dealId,
      emailId,
      taskType,
      title,
      description,
      priority,
      dueDate: new Date(dueDate),
      reminderDaysBefore,
      reminderSent: reminderDaysBefore.map(() => false),
      notes,
      assignedTo,
      isAutoCreated,
      createdBy: decodedToken.email || 'system',
    });

    await task.save();

    return NextResponse.json(
      { message: 'Follow-up task created successfully', task },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating follow-up:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create follow-up' },
      { status: 500 }
    );
  }
}

