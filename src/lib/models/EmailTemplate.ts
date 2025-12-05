import mongoose, { Schema, Document } from 'mongoose';

export interface IEmailTemplate extends Document {
  name: string;
  subject: string;
  htmlBody: string;
  textBody?: string;
  
  // Template Metadata
  templateType: 'outreach' | 'proposal' | 'invoice' | 'follow-up' | 'greeting' | 'support' | 'marketing' | 'other';
  category: string; // e.g., 'greetings', 'proposals', 'invoices'
  
  // Variables available in template
  // e.g., {{client_name}}, {{project_name}}, {{date}}, etc.
  availableVariables?: string[];
  
  // Usage Stats
  usageCount: number;
  lastUsedAt?: Date;
  
  // Status
  isActive: boolean;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
}

const EmailTemplateSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Template name is required'],
    trim: true,
    index: true,
  },
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
  templateType: {
    type: String,
    enum: ['outreach', 'proposal', 'invoice', 'follow-up', 'greeting', 'support', 'marketing', 'other'],
    default: 'other',
    index: true,
  },
  category: {
    type: String,
    trim: true,
    index: true,
  },
  availableVariables: [{
    type: String,
    trim: true,
  }],
  usageCount: {
    type: Number,
    default: 0,
  },
  lastUsedAt: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true,
  },
  createdBy: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// Indexes
EmailTemplateSchema.index({ templateType: 1, isActive: 1 });
EmailTemplateSchema.index({ category: 1, isActive: 1 });
EmailTemplateSchema.index({ name: 'text', subject: 'text' });

export default mongoose.models.EmailTemplate || mongoose.model<IEmailTemplate>('EmailTemplate', EmailTemplateSchema);

