import mongoose, { Schema, Document } from 'mongoose';

export interface IClient extends Document {
  // Basic Information
  companyName: string;
  primaryContactName?: string;
  industry?: string;
  companySize?: string;
  website?: string;
  taxId?: string;
  businessRegistrationNumber?: string;
  
  // Contact Information
  primaryEmail: string;
  secondaryEmails?: string[];
  phone?: string;
  mobile?: string;
  whatsapp?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  timezone?: string;
  
  // Business Relationship
  clientSince?: Date;
  relationshipStatus: 'prospect' | 'active' | 'inactive' | 'former' | 'blacklisted';
  clientTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  customerLifetimeValue: number;
  annualContractValue: number;
  monthlyRecurringRevenue: number;
  
  // Service History
  servicesAvailed: string[];
  totalProjectsCompleted: number;
  activeProjectsCount: number;
  
  // Social Media
  socialMedia?: {
    linkedin?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  
  // Important Dates
  businessAnniversary?: Date;
  contractRenewalDate?: Date;
  lastContactedAt?: Date;
  
  // Additional Info
  notes?: string;
  tags: string[];
  assignedTo?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
}

const ClientSchema: Schema = new Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    index: true,
  },
  primaryContactName: {
    type: String,
    trim: true,
  },
  industry: {
    type: String,
    trim: true,
    index: true,
  },
  companySize: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  taxId: {
    type: String,
    trim: true,
  },
  businessRegistrationNumber: {
    type: String,
    trim: true,
  },
  primaryEmail: {
    type: String,
    required: [true, 'Primary email is required'],
    trim: true,
    lowercase: true,
    index: true,
  },
  secondaryEmails: [{
    type: String,
    trim: true,
    lowercase: true,
  }],
  phone: {
    type: String,
    trim: true,
  },
  mobile: {
    type: String,
    trim: true,
  },
  whatsapp: {
    type: String,
    trim: true,
  },
  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zipCode: { type: String, trim: true },
    country: { type: String, trim: true },
  },
  timezone: {
    type: String,
    default: 'Asia/Dhaka',
  },
  clientSince: {
    type: Date,
  },
  relationshipStatus: {
    type: String,
    enum: ['prospect', 'active', 'inactive', 'former', 'blacklisted'],
    default: 'prospect',
    index: true,
  },
  clientTier: {
    type: String,
    enum: ['bronze', 'silver', 'gold', 'platinum'],
    default: 'bronze',
    index: true,
  },
  customerLifetimeValue: {
    type: Number,
    default: 0,
    min: 0,
  },
  annualContractValue: {
    type: Number,
    default: 0,
    min: 0,
  },
  monthlyRecurringRevenue: {
    type: Number,
    default: 0,
    min: 0,
  },
  servicesAvailed: [{
    type: String,
    trim: true,
  }],
  totalProjectsCompleted: {
    type: Number,
    default: 0,
    min: 0,
  },
  activeProjectsCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  socialMedia: {
    linkedin: { type: String, trim: true },
    facebook: { type: String, trim: true },
    twitter: { type: String, trim: true },
    instagram: { type: String, trim: true },
  },
  businessAnniversary: {
    type: Date,
  },
  contractRenewalDate: {
    type: Date,
    index: true,
  },
  lastContactedAt: {
    type: Date,
    index: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  assignedTo: {
    type: String,
    trim: true,
    index: true,
  },
  createdBy: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
ClientSchema.index({ relationshipStatus: 1, createdAt: -1 });
ClientSchema.index({ clientTier: 1, relationshipStatus: 1 });
ClientSchema.index({ companyName: 'text', primaryEmail: 'text', primaryContactName: 'text' });
ClientSchema.index({ tags: 1 });
ClientSchema.index({ contractRenewalDate: 1 });
ClientSchema.index({ clientSince: 1 });
ClientSchema.index({ monthlyRecurringRevenue: -1 });
ClientSchema.index({ customerLifetimeValue: -1 });

export default mongoose.models.Client || mongoose.model<IClient>('Client', ClientSchema);

