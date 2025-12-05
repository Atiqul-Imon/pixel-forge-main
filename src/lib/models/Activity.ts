import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  leadId?: mongoose.Types.ObjectId;
  dealId?: mongoose.Types.ObjectId;
  clientId?: mongoose.Types.ObjectId;
  
  type: 'call' | 'email' | 'meeting' | 'note' | 'task' | 'whatsapp' | 'proposal' | 'document' | 'quote' | 'invoice' | 'payment' | 'other';
  title: string;
  description: string;
  
  // Activity Details
  date: Date;
  duration?: number; // in minutes
  outcome?: string;
  
  // Communication Details
  direction?: 'inbound' | 'outbound';
  contactMethod?: string;
  
  // File/Document References
  attachments?: string[]; // URLs or file paths
  relatedInvoiceId?: mongoose.Types.ObjectId;
  relatedReceiptId?: mongoose.Types.ObjectId;
  
  // Assignment
  assignedTo?: string;
  createdBy: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema: Schema = new Schema({
  leadId: {
    type: Schema.Types.ObjectId,
    ref: 'Lead',
    index: true,
  },
  dealId: {
    type: Schema.Types.ObjectId,
    ref: 'Deal',
    index: true,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    index: true,
  },
  type: {
    type: String,
    enum: ['call', 'email', 'meeting', 'note', 'task', 'whatsapp', 'proposal', 'document', 'quote', 'invoice', 'payment', 'other'],
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: [true, 'Activity title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
    index: true,
  },
  duration: {
    type: Number,
    min: 0,
  },
  outcome: {
    type: String,
    trim: true,
  },
  direction: {
    type: String,
    enum: ['inbound', 'outbound'],
  },
  contactMethod: {
    type: String,
    trim: true,
  },
  attachments: [{
    type: String,
    trim: true,
  }],
  relatedInvoiceId: {
    type: Schema.Types.ObjectId,
    ref: 'Invoice',
    index: true,
  },
  relatedReceiptId: {
    type: Schema.Types.ObjectId,
    ref: 'Receipt',
    index: true,
  },
  assignedTo: {
    type: String,
    trim: true,
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
ActivitySchema.index({ leadId: 1, date: -1 });
ActivitySchema.index({ dealId: 1, date: -1 });
ActivitySchema.index({ clientId: 1, date: -1 });
ActivitySchema.index({ type: 1, date: -1 });
ActivitySchema.index({ createdBy: 1, date: -1 });
ActivitySchema.index({ date: -1 });

export default mongoose.models.Activity || mongoose.model<IActivity>('Activity', ActivitySchema);

