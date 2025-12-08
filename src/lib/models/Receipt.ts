import mongoose, { Schema, Document } from 'mongoose';

export interface IReceipt extends Document {
  // Receipt Identification
  receiptNumber: string; // Auto-generated, unique, sequential
  receiptId: mongoose.Types.ObjectId;
  
  // Related Documents
  invoiceId?: mongoose.Types.ObjectId;
  clientId: mongoose.Types.ObjectId;
  
  // Dates
  receiptDate: Date;
  paymentDate: Date;
  
  // Payment Information
  paymentMethod: 'cash' | 'bank_transfer' | 'cheque' | 'online' | 'card' | 'other';
  paymentReference?: string;
  transactionId?: string;
  
  // Bank Details (if applicable)
  bankDetails?: {
    bankName?: string;
    accountNumber?: string;
    accountHolderName?: string;
    branchName?: string;
    routingCode?: string;
    chequeNumber?: string;
  };
  
  // Amount
  amountReceived: number;
  currency: string;
  exchangeRate?: number;
  
  // Additional Information
  notes?: string;
  
  // PDF and Email Tracking
  pdfPath?: string;
  emailSent: boolean;
  emailSentAt?: Date;
  
  // Metadata
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReceiptSchema: Schema = new Schema({
  receiptNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  invoiceId: {
    type: Schema.Types.ObjectId,
    ref: 'Invoice',
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  receiptDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  paymentDate: {
    type: Date,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'bank_transfer', 'cheque', 'online', 'card', 'other'],
    required: true,
  },
  paymentReference: {
    type: String,
    trim: true,
  },
  transactionId: {
    type: String,
    trim: true,
  },
  bankDetails: {
    bankName: { type: String, trim: true },
    accountNumber: { type: String, trim: true },
    accountHolderName: { type: String, trim: true },
    branchName: { type: String, trim: true },
    routingCode: { type: String, trim: true },
    chequeNumber: { type: String, trim: true },
  },
  amountReceived: {
    type: Number,
    required: true,
    min: 0,
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
  notes: {
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
  },
  emailSentAt: {
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
ReceiptSchema.index({ clientId: 1, receiptDate: -1 });
ReceiptSchema.index({ invoiceId: 1 });
ReceiptSchema.index({ clientId: 1, paymentDate: -1 });
ReceiptSchema.index({ receiptDate: -1 });
ReceiptSchema.index({ paymentDate: -1 });
ReceiptSchema.index({ receiptNumber: 'text' });

export default mongoose.models.Receipt || mongoose.model<IReceipt>('Receipt', ReceiptSchema);

