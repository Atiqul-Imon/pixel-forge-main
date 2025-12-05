import mongoose, { Schema, Document } from 'mongoose';

export interface IBankAccount {
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  branchName?: string;
  routingCode?: string;
  swiftCode?: string;
  isDefault: boolean;
}

export interface IAccountSettings extends Document {
  // Company Information
  companyName: string;
  logoPath?: string;
  businessRegistrationNumber?: string;
  taxId?: string;
  vatNumber?: string;
  
  // Contact Information
  address: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  
  // Bank Accounts
  bankAccounts: IBankAccount[];
  
  // Tax Information
  taxInfo: {
    taxRegistrationNumber?: string;
    defaultTaxRate?: number;
    taxRules?: string;
  };
  
  // Invoice Settings
  invoiceSettings: {
    prefix: string; // e.g., "PF-INV"
    nextNumber: number;
    defaultPaymentTerms: string;
    defaultCurrency: string;
    footerText?: string;
    termsTemplate?: string;
    emailSubject?: string;
    emailTemplate?: string;
  };
  
  // Receipt Settings
  receiptSettings: {
    prefix: string; // e.g., "PF-RCP"
    nextNumber: number;
    emailSubject?: string;
    emailTemplate?: string;
  };
  
  // Email Settings
  emailSettings: {
    emailSignature?: string;
    fromEmail?: string;
    fromName?: string;
  };
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

const BankAccountSchema: Schema = new Schema({
  bankName: {
    type: String,
    required: true,
    trim: true,
  },
  accountNumber: {
    type: String,
    required: true,
    trim: true,
  },
  accountHolderName: {
    type: String,
    required: true,
    trim: true,
  },
  branchName: {
    type: String,
    trim: true,
  },
  routingCode: {
    type: String,
    trim: true,
  },
  swiftCode: {
    type: String,
    trim: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
}, { _id: true });

const AccountSettingsSchema: Schema = new Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  logoPath: {
    type: String,
    trim: true,
  },
  businessRegistrationNumber: {
    type: String,
    trim: true,
  },
  taxId: {
    type: String,
    trim: true,
  },
  vatNumber: {
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
  contact: {
    phone: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    website: { type: String, trim: true },
  },
  bankAccounts: {
    type: [BankAccountSchema],
    default: [],
  },
  taxInfo: {
    taxRegistrationNumber: { type: String, trim: true },
    defaultTaxRate: { type: Number, default: 0, min: 0, max: 100 },
    taxRules: { type: String, trim: true },
  },
  invoiceSettings: {
    prefix: {
      type: String,
      default: 'PF-INV',
      trim: true,
      uppercase: true,
    },
    nextNumber: {
      type: Number,
      default: 1,
      min: 1,
    },
    defaultPaymentTerms: {
      type: String,
      default: 'Net 30',
      trim: true,
    },
    defaultCurrency: {
      type: String,
      default: 'BDT',
      trim: true,
      uppercase: true,
    },
    footerText: {
      type: String,
      trim: true,
    },
    termsTemplate: {
      type: String,
      trim: true,
    },
    emailSubject: {
      type: String,
      trim: true,
    },
    emailTemplate: {
      type: String,
      trim: true,
    },
  },
  receiptSettings: {
    prefix: {
      type: String,
      default: 'PF-RCP',
      trim: true,
      uppercase: true,
    },
    nextNumber: {
      type: Number,
      default: 1,
      min: 1,
    },
    emailSubject: {
      type: String,
      trim: true,
    },
    emailTemplate: {
      type: String,
      trim: true,
    },
  },
  emailSettings: {
    emailSignature: {
      type: String,
      trim: true,
    },
    fromEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    fromName: {
      type: String,
      trim: true,
    },
  },
}, {
  timestamps: true,
});

// Ensure only one account settings document exists
AccountSettingsSchema.index({ companyName: 1 }, { unique: false });

export default mongoose.models.AccountSettings || mongoose.model<IAccountSettings>('AccountSettings', AccountSettingsSchema);

