import mongoose, { Schema, Document } from 'mongoose';

export interface IImportantDate extends Document {
  // Event Details
  eventName: string;
  eventType: 'holiday' | 'birthday' | 'anniversary' | 'business-milestone' | 'contract-renewal' | 'custom';
  
  // Date Information
  eventDate: Date;
  isRecurring: boolean;
  recurrencePattern?: 'yearly' | 'monthly' | 'quarterly' | 'custom';
  
  // Associated Entities
  clientId?: mongoose.Types.ObjectId;
  contactPersonId?: mongoose.Types.ObjectId;
  
  // Notification Settings
  notificationDaysBefore: number[]; // e.g., [7, 3, 1] means notify 7 days, 3 days, and 1 day before
  notificationsSent: {
    daysBefore: number;
    sentAt: Date;
    sentTo: string[];
  }[];
  
  // Greeting Email
  sendGreetingEmail: boolean;
  greetingTemplateId?: mongoose.Types.ObjectId;
  customGreetingMessage?: string;
  lastGreetingSent?: Date;
  
  // Additional Info
  description?: string;
  isActive: boolean;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
}

const ImportantDateSchema: Schema = new Schema({
  eventName: {
    type: String,
    required: [true, 'Event name is required'],
    trim: true,
    index: true,
  },
  eventType: {
    type: String,
    enum: ['holiday', 'birthday', 'anniversary', 'business-milestone', 'contract-renewal', 'custom'],
    required: true,
    index: true,
  },
  eventDate: {
    type: Date,
    required: true,
    index: true,
  },
  isRecurring: {
    type: Boolean,
    default: false,
  },
  recurrencePattern: {
    type: String,
    enum: ['yearly', 'monthly', 'quarterly', 'custom'],
  },
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
  notificationDaysBefore: [{
    type: Number,
    min: 0,
  }],
  notificationsSent: [{
    daysBefore: { type: Number, required: true },
    sentAt: { type: Date, required: true },
    sentTo: [{ type: String, trim: true }],
  }],
  sendGreetingEmail: {
    type: Boolean,
    default: true,
  },
  greetingTemplateId: {
    type: Schema.Types.ObjectId,
    ref: 'EmailTemplate',
  },
  customGreetingMessage: {
    type: String,
    trim: true,
  },
  lastGreetingSent: {
    type: Date,
  },
  description: {
    type: String,
    trim: true,
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
ImportantDateSchema.index({ eventDate: 1, isActive: 1 });
ImportantDateSchema.index({ eventType: 1, eventDate: 1 });
ImportantDateSchema.index({ clientId: 1, eventDate: 1 });
ImportantDateSchema.index({ contactPersonId: 1, eventDate: 1 });
ImportantDateSchema.index({ isRecurring: 1 });
ImportantDateSchema.index({ sendGreetingEmail: 1, eventDate: 1 });

export default mongoose.models.ImportantDate || mongoose.model<IImportantDate>('ImportantDate', ImportantDateSchema);

