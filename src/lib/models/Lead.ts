import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  
  // CRM Fields
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  source: 'website' | 'facebook' | 'google' | 'referral' | 'direct' | 'other';
  leadScore: number;
  estimatedValue: number;
  currency: string;
  tags: string[];
  assignedTo?: string;
  
  // Facebook Pixel Tracking
  pixelId?: string;
  pixelEventId?: string;
  pixelEventType?: string;
  pixelSource?: string;
  pixelCampaign?: string;
  
  // Additional Info
  website?: string;
  location?: string;
  industry?: string;
  budget?: string;
  timeline?: string;
  
  // Notes and Activities
  notes?: string;
  lastContactedAt?: Date;
  nextFollowUp?: Date;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
}

const LeadSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    // Index defined separately below to avoid duplicate
  },
  phone: {
    type: String,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },
  service: {
    type: String,
    required: [true, 'Service is required'],
    trim: true,
    index: true,
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'],
    default: 'new',
    index: true,
  },
  source: {
    type: String,
    enum: ['website', 'facebook', 'google', 'referral', 'direct', 'other'],
    default: 'website',
    index: true,
  },
  leadScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  estimatedValue: {
    type: Number,
    default: 0,
    min: 0,
  },
  currency: {
    type: String,
    default: 'BDT',
  },
  tags: [{
    type: String,
    trim: true,
  }],
  assignedTo: {
    type: String,
    trim: true,
  },
  pixelId: {
    type: String,
    trim: true,
  },
  pixelEventId: {
    type: String,
    trim: true,
  },
  pixelEventType: {
    type: String,
    trim: true,
  },
  pixelSource: {
    type: String,
    trim: true,
  },
  pixelCampaign: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  industry: {
    type: String,
    trim: true,
  },
  budget: {
    type: String,
    trim: true,
  },
  timeline: {
    type: String,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  lastContactedAt: {
    type: Date,
  },
  nextFollowUp: {
    type: Date,
  },
  createdBy: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
LeadSchema.index({ status: 1, createdAt: -1 });
LeadSchema.index({ source: 1, status: 1 });
LeadSchema.index({ email: 1 }); // Email index (removed duplicate from field definition)
LeadSchema.index({ assignedTo: 1, status: 1 });
LeadSchema.index({ tags: 1 });
LeadSchema.index({ leadScore: -1 });
LeadSchema.index({ createdAt: -1 });
LeadSchema.index({ pixelId: 1, pixelEventId: 1 });
// Individual field indexes for search queries (regex searches)
LeadSchema.index({ name: 1 });
LeadSchema.index({ company: 1 });
LeadSchema.index({ phone: 1 });
// Text index for full-text search (optional, for $text queries)
LeadSchema.index({ name: 'text', email: 'text', company: 'text', phone: 'text', message: 'text' });

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);

