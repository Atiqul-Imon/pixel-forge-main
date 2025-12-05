import mongoose, { Schema, Document } from 'mongoose';

export interface IContactPerson extends Document {
  clientId: mongoose.Types.ObjectId;
  
  // Personal Details
  firstName: string;
  lastName: string;
  fullName: string;
  title?: string; // Job title
  role: 'decision-maker' | 'technical-contact' | 'billing-contact' | 'primary-contact' | 'other';
  
  // Contact Information
  email: string;
  secondaryEmail?: string;
  phone?: string;
  mobile?: string;
  whatsapp?: string;
  
  // Social Profiles
  linkedin?: string;
  twitter?: string;
  
  // Important Dates
  birthday?: Date;
  workAnniversary?: Date;
  
  // Preferences
  preferredContactMethod?: 'email' | 'phone' | 'whatsapp' | 'linkedin';
  preferredContactTime?: string;
  timezone?: string;
  
  // Additional Info
  notes?: string;
  isPrimary: boolean;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
}

const ContactPersonSchema: Schema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
    index: true,
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ['decision-maker', 'technical-contact', 'billing-contact', 'primary-contact', 'other'],
    default: 'primary-contact',
    index: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    index: true,
  },
  secondaryEmail: {
    type: String,
    trim: true,
    lowercase: true,
  },
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
  linkedin: {
    type: String,
    trim: true,
  },
  twitter: {
    type: String,
    trim: true,
  },
  birthday: {
    type: Date,
    index: true,
  },
  workAnniversary: {
    type: Date,
  },
  preferredContactMethod: {
    type: String,
    enum: ['email', 'phone', 'whatsapp', 'linkedin'],
  },
  preferredContactTime: {
    type: String,
    trim: true,
  },
  timezone: {
    type: String,
    default: 'Asia/Dhaka',
  },
  notes: {
    type: String,
    trim: true,
  },
  isPrimary: {
    type: Boolean,
    default: false,
    index: true,
  },
  createdBy: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// Auto-generate fullName before saving
ContactPersonSchema.pre('save', function(next) {
  if (this.isModified('firstName') || this.isModified('lastName')) {
    this.fullName = `${this.firstName} ${this.lastName}`.trim();
  }
  next();
});

// Indexes
ContactPersonSchema.index({ clientId: 1, isPrimary: 1 });
ContactPersonSchema.index({ email: 1 });
ContactPersonSchema.index({ role: 1 });
ContactPersonSchema.index({ birthday: 1 });
ContactPersonSchema.index({ fullName: 'text', email: 'text' });

export default mongoose.models.ContactPerson || mongoose.model<IContactPerson>('ContactPerson', ContactPersonSchema);

