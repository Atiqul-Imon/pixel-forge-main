import mongoose, { Schema, Document } from 'mongoose';

export interface IEmailCommunication extends Document {
  // Email Details
  from: string; // hello@pixelforgebd.com
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  htmlBody: string;
  textBody?: string;
  attachments?: {
    filename: string;
    path: string;
    size: number;
    mimeType: string;
  }[];
  
  // Email Tracking
  sentAt: Date;
  readStatus: boolean;
  readAt?: Date;
  openCount: number;
  lastOpenedAt?: Date;
  clickedLinks?: {
    url: string;
    clickedAt: Date;
    clickCount: number;
  }[];
  replyStatus: boolean;
  repliedAt?: Date;
  bounceStatus: 'none' | 'soft' | 'hard';
  bouncedAt?: Date;
  bounceReason?: string;
  
  // Email Metadata
  emailType: 'outreach' | 'proposal' | 'invoice' | 'follow-up' | 'greeting' | 'support' | 'marketing' | 'other';
  templateId?: mongoose.Types.ObjectId;
  campaignId?: mongoose.Types.ObjectId;
  
  // Tracking Token (for pixel tracking)
  trackingToken: string;
  
  // Linked Data
  clientId?: mongoose.Types.ObjectId;
  contactPersonId?: mongoose.Types.ObjectId;
  dealId?: mongoose.Types.ObjectId;
  projectId?: string;
  
  // Follow-up
  followUpScheduled?: Date;
  followUpCompleted?: boolean;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

const EmailCommunicationSchema: Schema = new Schema({
  from: {
    type: String,
    required: true,
    default: 'hello@pixelforgebd.com',
    trim: true,
  },
  to: [{
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  }],
  cc: [{
    type: String,
    trim: true,
    lowercase: true,
  }],
  bcc: [{
    type: String,
    trim: true,
    lowercase: true,
  }],
  subject: {
    type: String,
    required: [true, 'Email subject is required'],
    trim: true,
  },
  htmlBody: {
    type: String,
    required: [true, 'Email body is required'],
  },
  textBody: {
    type: String,
  },
  attachments: [{
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    mimeType: { type: String, required: true },
  }],
  sentAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  readStatus: {
    type: Boolean,
    default: false,
  },
  readAt: {
    type: Date,
  },
  openCount: {
    type: Number,
    default: 0,
  },
  lastOpenedAt: {
    type: Date,
  },
  clickedLinks: [{
    url: { type: String, required: true },
    clickedAt: { type: Date, required: true },
    clickCount: { type: Number, default: 1 },
  }],
  replyStatus: {
    type: Boolean,
    default: false,
  },
  repliedAt: {
    type: Date,
  },
  bounceStatus: {
    type: String,
    enum: ['none', 'soft', 'hard'],
    default: 'none',
  },
  bouncedAt: {
    type: Date,
  },
  bounceReason: {
    type: String,
    trim: true,
  },
  emailType: {
    type: String,
    enum: ['outreach', 'proposal', 'invoice', 'follow-up', 'greeting', 'support', 'marketing', 'other'],
    default: 'other',
  },
  templateId: {
    type: Schema.Types.ObjectId,
    ref: 'EmailTemplate',
  },
  campaignId: {
    type: Schema.Types.ObjectId,
    ref: 'EmailCampaign',
  },
  trackingToken: {
    type: String,
    required: true,
    unique: true,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
  },
  contactPersonId: {
    type: Schema.Types.ObjectId,
    ref: 'ContactPerson',
  },
  dealId: {
    type: Schema.Types.ObjectId,
    ref: 'Deal',
  },
  projectId: {
    type: String,
    trim: true,
  },
  followUpScheduled: {
    type: Date,
  },
  followUpCompleted: {
    type: Boolean,
    default: false,
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
EmailCommunicationSchema.index({ clientId: 1, sentAt: -1 });
EmailCommunicationSchema.index({ contactPersonId: 1, sentAt: -1 });
EmailCommunicationSchema.index({ clientId: 1, emailType: 1, sentAt: -1 });
EmailCommunicationSchema.index({ contactPersonId: 1, emailType: 1, sentAt: -1 });
EmailCommunicationSchema.index({ emailType: 1, sentAt: -1 });
EmailCommunicationSchema.index({ readStatus: 1 });
EmailCommunicationSchema.index({ replyStatus: 1 });
EmailCommunicationSchema.index({ followUpScheduled: 1 });
EmailCommunicationSchema.index({ subject: 'text', htmlBody: 'text' });

export default mongoose.models.EmailCommunication || mongoose.model<IEmailCommunication>('EmailCommunication', EmailCommunicationSchema);

