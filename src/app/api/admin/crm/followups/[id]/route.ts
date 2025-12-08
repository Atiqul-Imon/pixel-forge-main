import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import FollowUpTask from '@/lib/models/FollowUpTask';
import Client from '@/lib/models/Client';
import { verifyToken } from '@/lib/auth';
import mongoose from 'mongoose';

// GET - Get single follow-up
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

    if (!mongoose.Types.ObjectId.isValid(resolvedParams.id)) {
      return NextResponse.json({ error: 'Invalid follow-up ID' }, { status: 400 });
    }

    const task = await FollowUpTask.findById(resolvedParams.id)
      .populate('clientId', 'companyName primaryEmail')
      .populate('contactPersonId', 'fullName email')
      .lean();
    
    if (!task) {
      return NextResponse.json({ error: 'Follow-up not found' }, { status: 404 });
    }

    return NextResponse.json({ task });
  } catch (error) {
    console.error('Error fetching follow-up:', error);
    return NextResponse.json(
      { error: 'Failed to fetch follow-up' },
      { status: 500 }
    );
  }
}

// PUT - Update follow-up with automatic client status updates
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    const decodedToken = verifyToken(token?.replace('Bearer ', '') || '');
    
    if (!token || !decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const resolvedParams = await params;

    if (!mongoose.Types.ObjectId.isValid(resolvedParams.id)) {
      return NextResponse.json({ error: 'Invalid follow-up ID' }, { status: 400 });
    }

    const body = await request.json();
    const { status, outcome, updateClientStatus, newClientStatus, ...updateData } = body;

    // Get current task to check clientId
    const currentTask = await FollowUpTask.findById(resolvedParams.id);
    if (!currentTask) {
      return NextResponse.json({ error: 'Follow-up not found' }, { status: 404 });
    }

    // Prepare update data
    const updateFields: any = {
      ...updateData,
      updatedAt: new Date(),
    };

    // Handle status change
    if (status) {
      updateFields.status = status;
      
      // Auto-detect overdue status
      if (status === 'pending' || status === 'in-progress') {
        const dueDate = updateData.dueDate ? new Date(updateData.dueDate) : new Date(currentTask.dueDate);
        if (dueDate < new Date() && status !== 'completed' && status !== 'cancelled') {
          updateFields.status = 'overdue';
        }
      }
      
      // Handle completion
      if (status === 'completed') {
        updateFields.completedAt = new Date();
        updateFields.completedBy = (decodedToken as any)?.email || 'system';
        if (outcome) {
          updateFields.outcome = outcome;
        }
      }
      
      // Clear completion data if status changes from completed
      if (status !== 'completed' && currentTask.status === 'completed') {
        updateFields.completedAt = undefined;
        updateFields.completedBy = undefined;
      }
    }

    // Auto-detect overdue for existing tasks
    if (!status && (currentTask.status === 'pending' || currentTask.status === 'in-progress')) {
      const dueDate = updateData.dueDate ? new Date(updateData.dueDate) : new Date(currentTask.dueDate);
      if (dueDate < new Date()) {
        updateFields.status = 'overdue';
      }
    }

    // Update the follow-up task
    const task = await FollowUpTask.findByIdAndUpdate(
      resolvedParams.id,
      updateFields,
      { new: true, runValidators: true }
    ).populate('clientId');

    if (!task) {
      return NextResponse.json({ error: 'Follow-up not found' }, { status: 404 });
    }

    // Update client status if requested and clientId exists
    if (task.clientId && (updateClientStatus === true || status === 'completed')) {
      const clientId = (task.clientId as any)._id || task.clientId;
      
      if (updateClientStatus === true && newClientStatus) {
        // Manual client status update
        await Client.findByIdAndUpdate(clientId, {
          relationshipStatus: newClientStatus,
          lastContactedAt: new Date(),
        });
      } else if (status === 'completed' && outcome) {
        // Automatic client status update based on outcome
        let newStatus: string | undefined;
        
        // Determine client status based on follow-up outcome
        const outcomeLower = outcome.toLowerCase();
        if (outcomeLower.includes('deal') || outcomeLower.includes('signed') || outcomeLower.includes('contract')) {
          newStatus = 'active';
        } else if (outcomeLower.includes('interested') || outcomeLower.includes('quote') || outcomeLower.includes('proposal')) {
          newStatus = 'prospect';
        } else if (outcomeLower.includes('not interested') || outcomeLower.includes('declined')) {
          newStatus = 'inactive';
        }
        
        if (newStatus) {
          await Client.findByIdAndUpdate(clientId, {
            relationshipStatus: newStatus,
            lastContactedAt: new Date(),
          });
        } else {
          // Update lastContactedAt even if status doesn't change
          await Client.findByIdAndUpdate(clientId, {
            lastContactedAt: new Date(),
          });
        }
      } else if (status === 'completed') {
        // Just update lastContactedAt when completed without outcome
        await Client.findByIdAndUpdate(clientId, {
          lastContactedAt: new Date(),
        });
      }
    }

    return NextResponse.json({
      message: 'Follow-up updated successfully',
      task,
    });
  } catch (error: any) {
    console.error('Error updating follow-up:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update follow-up' },
      { status: 500 }
    );
  }
}

// PATCH - Complete follow-up with automatic client status update
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    const decodedToken = verifyToken(token?.replace('Bearer ', '') || '');
    
    if (!token || !decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const resolvedParams = await params;

    if (!mongoose.Types.ObjectId.isValid(resolvedParams.id)) {
      return NextResponse.json({ error: 'Invalid follow-up ID' }, { status: 400 });
    }

    const body = await request.json();
    const { outcome, updateClientStatus, newClientStatus } = body;

    const currentTask = await FollowUpTask.findById(resolvedParams.id).populate('clientId');
    if (!currentTask) {
      return NextResponse.json({ error: 'Follow-up not found' }, { status: 404 });
    }

    const task = await FollowUpTask.findByIdAndUpdate(
      resolvedParams.id,
      {
        status: 'completed',
        completedAt: new Date(),
        completedBy: (decodedToken as any)?.email || 'system',
        outcome,
        updatedAt: new Date(),
      },
      { new: true }
    ).populate('clientId');

    if (!task) {
      return NextResponse.json({ error: 'Follow-up not found' }, { status: 404 });
    }

    // Update client status if clientId exists
    if (task.clientId) {
      const clientId = (task.clientId as any)._id || task.clientId;
      
      if (updateClientStatus === true && newClientStatus) {
        // Manual client status update
        await Client.findByIdAndUpdate(clientId, {
          relationshipStatus: newClientStatus,
          lastContactedAt: new Date(),
        });
      } else if (outcome) {
        // Automatic client status update based on outcome
        let newStatus: string | undefined;
        
        const outcomeLower = outcome.toLowerCase();
        if (outcomeLower.includes('deal') || outcomeLower.includes('signed') || outcomeLower.includes('contract')) {
          newStatus = 'active';
        } else if (outcomeLower.includes('interested') || outcomeLower.includes('quote') || outcomeLower.includes('proposal')) {
          newStatus = 'prospect';
        } else if (outcomeLower.includes('not interested') || outcomeLower.includes('declined')) {
          newStatus = 'inactive';
        }
        
        if (newStatus) {
          await Client.findByIdAndUpdate(clientId, {
            relationshipStatus: newStatus,
            lastContactedAt: new Date(),
          });
        } else {
          await Client.findByIdAndUpdate(clientId, {
            lastContactedAt: new Date(),
          });
        }
      } else {
        // Just update lastContactedAt
        await Client.findByIdAndUpdate(clientId, {
          lastContactedAt: new Date(),
        });
      }
    }

    return NextResponse.json({
      message: 'Follow-up marked as completed',
      task,
    });
  } catch (error: any) {
    console.error('Error completing follow-up:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to complete follow-up' },
      { status: 500 }
    );
  }
}

// DELETE - Delete follow-up
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

    const resolvedParams = await params;

    if (!mongoose.Types.ObjectId.isValid(resolvedParams.id)) {
      return NextResponse.json({ error: 'Invalid follow-up ID' }, { status: 400 });
    }

    // @ts-expect-error - Mongoose overloaded method type issue


    const task = await FollowUpTask.findByIdAndDelete(resolvedParams.id);
    if (!task) {
      return NextResponse.json({ error: 'Follow-up not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Follow-up deleted successfully' });
  } catch (error) {
    console.error('Error deleting follow-up:', error);
    return NextResponse.json(
      { error: 'Failed to delete follow-up' },
      { status: 500 }
    );
  }
}

