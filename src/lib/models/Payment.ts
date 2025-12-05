import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  // Payment Identification
  paymentId: mongoose.Types.ObjectId;
  
  // Related Documents
  invoiceId?: mongoose.Types.ObjectId;
  receiptId?: mongoose.Types.ObjectId;
  clientId: mongoose.Types.ObjectId;
  
  // Payment Information
  paymentDate: Date;
  amountPaid: number;
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
  
  // Status
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  
  // Additional Information
  notes?: string;
  
  // Metadata
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema: Schema = new Schema({
  invoiceId: {
    type: Schema.Types.ObjectId,
    ref: 'Invoice',
    index: true,
  },
  receiptId: {
    type: Schema.Types.ObjectId,
    ref: 'Receipt',
    index: true,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
    index: true,
  },
  paymentDate: {
    type: Date,
    required: true,
    default: Date.now,
    index: true,
  },
  amountPaid: {
    type: Number,
    required: true,
    min: 0,
    index: true,
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'bank_transfer', 'cheque', 'online', 'card', 'other'],
    required: true,
    index: true,
  },
  paymentReference: {
    type: String,
    trim: true,
  },
  transactionId: {
    type: String,
    trim: true,
    index: true,
  },
  bankDetails: {
    bankName: { type: String, trim: true },
    accountNumber: { type: String, trim: true },
    accountHolderName: { type: String, trim: true },
    branchName: { type: String, trim: true },
    routingCode: { type: String, trim: true },
    chequeNumber: { type: String, trim: true },
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'completed',
    index: true,
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

// Indexes for better query performance
PaymentSchema.index({ clientId: 1, paymentDate: -1 });
PaymentSchema.index({ invoiceId: 1 });
PaymentSchema.index({ receiptId: 1 });
PaymentSchema.index({ paymentDate: -1 });
PaymentSchema.index({ status: 1 });

export default mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);

