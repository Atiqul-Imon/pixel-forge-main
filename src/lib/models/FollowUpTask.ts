import mongoose, { Schema, Document } from 'mongoose';

export interface IFollowUpTask extends Document {
  // Related Entities
  clientId?: mongoose.Types.ObjectId;
  contactPersonId?: mongoose.Types.ObjectId;
  dealId?: mongoose.Types.ObjectId;
  emailId?: mongoose.Types.ObjectId;
  
  // Task Details
  taskType: 'email' | 'call' | 'meeting' | 'proposal' | 'invoice' | 'other';
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  // Scheduling
  dueDate: Date;
  reminderDaysBefore: number[];
  reminderSent: boolean[];
  
  // Status
  status: 'pending' | 'in-progress' | 'completed' | 'overdue' | 'cancelled';
  completedAt?: Date;
  completedBy?: string;
  
  // Follow-up Rules
  isAutoCreated: boolean;
  autoCreatedFrom?: string; // 'email', 'template', 'rule', etc.
  parentTaskId?: mongoose.Types.ObjectId;
  
  // Notes
  notes?: string;
  outcome?: string;
  
  // Assignment
  assignedTo?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

const FollowUpTaskSchema: Schema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    index: true,
  },
  contactPersonId: {
    type: Schema.Types.ObjectId,
    ref: 'ContactPerson',
    index: true,
  },
  dealId: {
    type: Schema.Types.ObjectId,
    ref: 'Deal',
    index: true,
  },
  emailId: {
    type: Schema.Types.ObjectId,
    ref: 'EmailCommunication',
    index: true,
  },
  taskType: {
    type: String,
    enum: ['email', 'call', 'meeting', 'proposal', 'invoice', 'other'],
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
    index: true,
  },
  dueDate: {
    type: Date,
    required: true,
    index: true,
  },
  reminderDaysBefore: [{
    type: Number,
    min: 0,
  }],
  reminderSent: [{
    type: Boolean,
    default: false,
  }],
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'overdue', 'cancelled'],
    default: 'pending',
    index: true,
  },
  completedAt: {
    type: Date,
  },
  completedBy: {
    type: String,
    trim: true,
  },
  isAutoCreated: {
    type: Boolean,
    default: false,
  },
  autoCreatedFrom: {
    type: String,
    trim: true,
  },
  parentTaskId: {
    type: Schema.Types.ObjectId,
    ref: 'FollowUpTask',
  },
  notes: {
    type: String,
    trim: true,
  },
  outcome: {
    type: String,
    trim: true,
  },
  assignedTo: {
    type: String,
    trim: true,
    index: true,
  },
  createdBy: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
});

// Indexes
FollowUpTaskSchema.index({ clientId: 1, dueDate: 1 });
FollowUpTaskSchema.index({ status: 1, dueDate: 1 });
FollowUpTaskSchema.index({ assignedTo: 1, status: 1, dueDate: 1 });
FollowUpTaskSchema.index({ priority: 1, dueDate: 1 });
FollowUpTaskSchema.index({ isAutoCreated: 1 });

export default mongoose.models.FollowUpTask || mongoose.model<IFollowUpTask>('FollowUpTask', FollowUpTaskSchema);

