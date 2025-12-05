import mongoose, { Schema, Document } from 'mongoose';

export interface IInvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate?: number;
  amount: number;
}

export interface IInvoice extends Document {
  // Invoice Identification
  invoiceNumber: string; // Auto-generated, unique, sequential
  invoiceId: mongoose.Types.ObjectId;
  
  // Client Information
  clientId: mongoose.Types.ObjectId;
  
  // Dates
  invoiceDate: Date;
  dueDate: Date;
  
  // Status
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled' | 'partially_paid';
  
  // Payment Information
  paymentTerms: string; // e.g., "Net 30", "Due on Receipt"
  paymentMethodsAccepted?: string[];
  
  // Items
  items: IInvoiceItem[];
  
  // Financial Details
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  
  // Currency
  currency: string; // Default: BDT
  exchangeRate?: number;
  
  // Addresses
  billingAddress?: {
    companyName?: string;
    contactName?: string;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    email?: string;
    phone?: string;
  };
  
  shippingAddress?: {
    companyName?: string;
    contactName?: string;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  
  // Additional Information
  notes?: string;
  termsAndConditions?: string;
  
  // PDF and Email Tracking
  pdfPath?: string;
  emailSent: boolean;
  emailSentAt?: Date;
  viewed: boolean;
  viewedAt?: Date;
  
  // Metadata
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const InvoiceItemSchema: Schema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  taxRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
}, { _id: false });

const InvoiceSchema: Schema = new Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
    index: true,
  },
  invoiceDate: {
    type: Date,
    required: true,
    default: Date.now,
    index: true,
  },
  dueDate: {
    type: Date,
    required: true,
    index: true,
  },
  status: {
    type: String,
    enum: ['draft', 'sent', 'paid', 'overdue', 'cancelled', 'partially_paid'],
    default: 'draft',
    index: true,
  },
  paymentTerms: {
    type: String,
    default: 'Net 30',
    trim: true,
  },
  paymentMethodsAccepted: [{
    type: String,
    trim: true,
  }],
  items: {
    type: [InvoiceItemSchema],
    required: true,
    validate: {
      validator: (items: IInvoiceItem[]) => items.length > 0,
      message: 'Invoice must have at least one item',
    },
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0,
  },
  taxRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  taxAmount: {
    type: Number,
    default: 0,
    min: 0,
  },
  discountAmount: {
    type: Number,
    default: 0,
    min: 0,
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
    index: true,
  },
  currency: {
    type: String,
    default: 'BDT',
    trim: true,
    uppercase: true,
  },
  exchangeRate: {
    type: Number,
    min: 0,
  },
  billingAddress: {
    companyName: { type: String, trim: true },
    contactName: { type: String, trim: true },
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zipCode: { type: String, trim: true },
    country: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
  },
  shippingAddress: {
    companyName: { type: String, trim: true },
    contactName: { type: String, trim: true },
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zipCode: { type: String, trim: true },
    country: { type: String, trim: true },
  },
  notes: {
    type: String,
    trim: true,
  },
  termsAndConditions: {
    type: String,
    trim: true,
  },
  pdfPath: {
    type: String,
    trim: true,
  },
  emailSent: {
    type: Boolean,
    default: false,
    index: true,
  },
  emailSentAt: {
    type: Date,
  },
  viewed: {
    type: Boolean,
    default: false,
    index: true,
  },
  viewedAt: {
    type: Date,
  },
  createdBy: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
InvoiceSchema.index({ clientId: 1, invoiceDate: -1 });
InvoiceSchema.index({ status: 1, dueDate: 1 });
InvoiceSchema.index({ invoiceDate: -1 });
InvoiceSchema.index({ dueDate: 1 });
InvoiceSchema.index({ totalAmount: -1 });
InvoiceSchema.index({ invoiceNumber: 'text' });

export default mongoose.models.Invoice || mongoose.model<IInvoice>('Invoice', InvoiceSchema);

