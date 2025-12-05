import mongoose, { Schema, Document } from 'mongoose';

export interface IEmailCampaign extends Document {
  // Campaign Details
  campaignName: string;
  purpose: string;
  
  // Target Audience
  targetCriteria: {
    clientStatus?: string[];
    clientTier?: string[];
    tags?: string[];
    industries?: string[];
    dateRange?: {
      clientSinceFrom?: Date;
      clientSinceTo?: Date;
    };
  };
  
  // Email Details
  templateId: mongoose.Types.ObjectId;
  subject?: string; // Override template subject if provided
  
  // Scheduling
  scheduledSendDate?: Date;
  sendTime?: string; // Time of day to send (HH:MM format)
  
  // Status
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused' | 'cancelled';
  
  // Results
  totalRecipients: number;
  emailsSent: number;
  emailsDelivered: number;
  emailsOpened: number;
  emailsReplied: number;
  emailsBounced: number;
  startedAt?: Date;
  completedAt?: Date;
  
  // Additional Info
  notes?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

const EmailCampaignSchema: Schema = new Schema({
  campaignName: {
    type: String,
    required: [true, 'Campaign name is required'],
    trim: true,
    index: true,
  },
  purpose: {
    type: String,
    required: [true, 'Campaign purpose is required'],
    trim: true,
  },
  targetCriteria: {
    clientStatus: [{ type: String }],
    clientTier: [{ type: String }],
    tags: [{ type: String }],
    industries: [{ type: String }],
    dateRange: {
      clientSinceFrom: { type: Date },
      clientSinceTo: { type: Date },
    },
  },
  templateId: {
    type: Schema.Types.ObjectId,
    ref: 'EmailTemplate',
    required: true,
    index: true,
  },
  subject: {
    type: String,
    trim: true,
  },
  scheduledSendDate: {
    type: Date,
    index: true,
  },
  sendTime: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'sending', 'sent', 'paused', 'cancelled'],
    default: 'draft',
    index: true,
  },
  totalRecipients: {
    type: Number,
    default: 0,
    min: 0,
  },
  emailsSent: {
    type: Number,
    default: 0,
    min: 0,
  },
  emailsDelivered: {
    type: Number,
    default: 0,
    min: 0,
  },
  emailsOpened: {
    type: Number,
    default: 0,
    min: 0,
  },
  emailsReplied: {
    type: Number,
    default: 0,
    min: 0,
  },
  emailsBounced: {
    type: Number,
    default: 0,
    min: 0,
  },
  startedAt: {
    type: Date,
  },
  completedAt: {
    type: Date,
  },
  notes: {
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
EmailCampaignSchema.index({ status: 1, scheduledSendDate: 1 });
EmailCampaignSchema.index({ createdAt: -1 });
EmailCampaignSchema.index({ campaignName: 'text', purpose: 'text' });

export default mongoose.models.EmailCampaign || mongoose.model<IEmailCampaign>('EmailCampaign', EmailCampaignSchema);

