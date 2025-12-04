import mongoose, { Schema, Document } from 'mongoose';

export interface IDeal extends Document {
  leadId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  
  // Deal Information
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  value: number;
  currency: string;
  probability: number; // 0-100
  
  // Service Details
  service: string;
  serviceDetails?: string;
  
  // Timeline
  expectedCloseDate?: Date;
  actualCloseDate?: Date;
  
  // Additional Info
  notes?: string;
  competitor?: string;
  decisionMaker?: string;
  
  // Assignment
  assignedTo?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
}

const DealSchema: Schema = new Schema({
  leadId: {
    type: Schema.Types.ObjectId,
    ref: 'Lead',
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: [true, 'Deal title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  stage: {
    type: String,
    enum: ['prospecting', 'qualification', 'proposal', 'negotiation', 'closed-won', 'closed-lost'],
    default: 'prospecting',
    index: true,
  },
  value: {
    type: Number,
    required: [true, 'Deal value is required'],
    min: 0,
    index: true,
  },
  currency: {
    type: String,
    default: 'BDT',
  },
  probability: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  service: {
    type: String,
    required: true,
    trim: true,
  },
  serviceDetails: {
    type: String,
    trim: true,
  },
  expectedCloseDate: {
    type: Date,
  },
  actualCloseDate: {
    type: Date,
  },
  notes: {
    type: String,
    trim: true,
  },
  competitor: {
    type: String,
    trim: true,
  },
  decisionMaker: {
    type: String,
    trim: true,
  },
  assignedTo: {
    type: String,
    trim: true,
  },
  createdBy: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// Indexes
DealSchema.index({ stage: 1, createdAt: -1 });
DealSchema.index({ assignedTo: 1, stage: 1 });
DealSchema.index({ expectedCloseDate: 1 });
DealSchema.index({ value: -1 });

export default mongoose.models.Deal || mongoose.model<IDeal>('Deal', DealSchema);

