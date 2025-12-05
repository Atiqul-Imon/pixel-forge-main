# Invoice & Receipt Management System - Complete Plan

## Overview
A comprehensive invoice and receipt generation, tracking, and management system for Pixel Forge with client database integration, account management, and centralized tracking.

---

## Phase 1: Database Models & Schema

### 1.1 Invoice Model
```typescript
- Invoice Number (auto-generated, sequential)
- Invoice ID (unique identifier)
- Client ID (reference to Client)
- Invoice Date
- Due Date
- Status: draft | sent | paid | overdue | cancelled | partially_paid
- Payment Terms (e.g., "Net 30", "Due on Receipt")
- Tax Information:
  - Subtotal
  - Tax Rate (%)
  - Tax Amount
  - Discount Amount
  - Total Amount
- Currency (default: BDT)
- Exchange Rate (for foreign currency)
- Items Array:
  - Description
  - Quantity
  - Unit Price
  - Tax Rate
  - Amount
- Notes/Remarks
- Terms & Conditions
- Payment Methods Accepted
- Billing Address
- Shipping Address (if applicable)
- PDF Path/URL
- Email Sent Status
- Email Sent At
- Viewed Status
- Viewed At
- Created By
- Created At
- Updated At
```

### 1.2 Receipt Model
```typescript
- Receipt Number (auto-generated, sequential)
- Receipt ID (unique identifier)
- Invoice ID (reference to Invoice)
- Client ID (reference to Client)
- Receipt Date
- Payment Date
- Payment Method: cash | bank_transfer | cheque | online | card | other
- Payment Reference Number
- Bank Details (if applicable)
- Amount Received
- Currency
- Exchange Rate
- Notes
- PDF Path/URL
- Email Sent Status
- Created By
- Created At
- Updated At
```

### 1.3 Payment Model (for tracking payments)
```typescript
- Payment ID (unique identifier)
- Invoice ID (reference to Invoice)
- Receipt ID (reference to Receipt, if receipt generated)
- Client ID (reference to Client)
- Payment Date
- Amount Paid
- Payment Method
- Payment Reference
- Status: pending | completed | failed | refunded
- Transaction ID
- Bank Details
- Notes
- Created By
- Created At
```

### 1.4 Account/Company Settings Model
```typescript
- Company Name
- Logo Path
- Business Registration Number
- Tax ID/VAT Number
- Address
- Contact Information:
  - Phone
  - Email
  - Website
- Bank Account Details (array):
  - Bank Name
  - Account Number
  - Account Holder Name
  - Branch Name
  - Routing/SWIFT Code
- Tax Information:
  - Tax Registration Number
  - Tax Rate (%)
  - Tax Rules
- Invoice Settings:
  - Invoice Prefix (e.g., "PF")
  - Next Invoice Number
  - Default Payment Terms
  - Default Currency
  - Invoice Footer Text
  - Terms & Conditions Template
- Receipt Settings:
  - Receipt Prefix (e.g., "RCP")
  - Next Receipt Number
- Email Settings:
  - Email Signature
  - Email Templates (Invoice, Receipt)
- Created At
- Updated At
```

---

## Phase 2: Core Features

### 2.1 Invoice Management
- ✅ Create Invoice (with items, tax, discounts)
- ✅ Edit Invoice (before sending)
- ✅ Delete Invoice (only if draft)
- ✅ Send Invoice via Email
- ✅ Generate PDF
- ✅ Mark as Paid/Partially Paid
- ✅ Track Invoice Status
- ✅ View Invoice History
- ✅ Duplicate Invoice
- ✅ Invoice Templates (different designs)

### 2.2 Receipt Management
- ✅ Create Receipt (linked to invoice)
- ✅ Generate Receipt PDF
- ✅ Send Receipt via Email
- ✅ Standalone Receipt (without invoice)
- ✅ Multiple Receipts for One Invoice (partial payments)
- ✅ Receipt History

### 2.3 Payment Tracking
- ✅ Record Payments
- ✅ Link Payments to Invoices
- ✅ Partial Payment Support
- ✅ Payment Reminders
- ✅ Outstanding Balance Tracking
- ✅ Payment History Report

### 2.4 Client Integration
- ✅ Link Invoices/Receipts to Clients
- ✅ Client Invoice History
- ✅ Client Payment History
- ✅ Outstanding Invoices per Client
- ✅ Client Financial Summary
- ✅ Auto-populate Client Details

---

## Phase 3: Account/Company Management

### 3.1 Company Profile
- ✅ Company Information Setup
- ✅ Logo Upload
- ✅ Contact Details
- ✅ Business Registration Info
- ✅ Tax Information

### 3.2 Bank Account Management
- ✅ Add Multiple Bank Accounts
- ✅ Set Default Bank Account
- ✅ Bank Account Details on Invoices/Receipts

### 3.3 Invoice/Receipt Settings
- ✅ Numbering System (Prefix, Next Number)
- ✅ Default Payment Terms
- ✅ Default Currency
- ✅ Tax Settings
- ✅ Invoice/Receipt Templates
- ✅ Terms & Conditions Templates
- ✅ Email Templates

---

## Phase 4: Advanced Features

### 4.1 Reporting & Analytics
- ✅ Revenue Reports (Daily, Monthly, Yearly)
- ✅ Outstanding Invoices Report
- ✅ Payment Collection Report
- ✅ Client-wise Reports
- ✅ Tax Reports
- ✅ Invoice Aging Report
- ✅ Payment Trends
- ✅ Export Reports (PDF, Excel, CSV)

### 4.2 Notifications & Reminders
- ✅ Invoice Due Date Reminders
- ✅ Overdue Invoice Alerts
- ✅ Payment Received Notifications
- ✅ Auto-reminders (configurable)

### 4.3 PDF Generation
- ✅ Professional Invoice PDF Template
- ✅ Professional Receipt PDF Template
- ✅ Custom Branding (Logo, Colors)
- ✅ Multiple Template Designs
- ✅ Print-friendly Format

### 4.4 Email Integration
- ✅ Send Invoice via Email
- ✅ Send Receipt via Email
- ✅ Email Templates
- ✅ Email Tracking (Opened, Viewed)
- ✅ Auto-send on Creation (optional)

### 4.5 Multi-Currency Support
- ✅ Currency Selection
- ✅ Exchange Rate Management
- ✅ Currency Conversion Display

---

## Phase 5: User Interface

### 5.1 Invoice Management Pages
- `/admin/invoices` - Invoice List (with filters)
- `/admin/invoices/new` - Create Invoice
- `/admin/invoices/[id]` - View/Edit Invoice
- `/admin/invoices/[id]/pdf` - View PDF
- `/admin/invoices/[id]/send` - Send Invoice

### 5.2 Receipt Management Pages
- `/admin/receipts` - Receipt List
- `/admin/receipts/new` - Create Receipt
- `/admin/receipts/[id]` - View Receipt
- `/admin/receipts/[id]/pdf` - View PDF

### 5.3 Account/Company Pages
- `/admin/account` - Company Profile
- `/admin/account/banks` - Bank Accounts
- `/admin/account/settings` - Invoice/Receipt Settings

### 5.4 Reports Pages
- `/admin/reports/invoices` - Invoice Reports
- `/admin/reports/receipts` - Receipt Reports
- `/admin/reports/payments` - Payment Reports
- `/admin/reports/revenue` - Revenue Analytics

### 5.5 Client Integration
- Add "Invoices" tab in Client Detail Page
- Add "Payments" tab in Client Detail Page
- Quick Invoice Creation from Client Page

---

## Phase 6: API Endpoints

### 6.1 Invoice APIs
- `GET /api/admin/invoices` - List invoices (with filters)
- `GET /api/admin/invoices/[id]` - Get invoice details
- `POST /api/admin/invoices` - Create invoice
- `PUT /api/admin/invoices/[id]` - Update invoice
- `DELETE /api/admin/invoices/[id]` - Delete invoice
- `POST /api/admin/invoices/[id]/send` - Send invoice email
- `GET /api/admin/invoices/[id]/pdf` - Generate PDF
- `POST /api/admin/invoices/[id]/mark-paid` - Mark as paid

### 6.2 Receipt APIs
- `GET /api/admin/receipts` - List receipts
- `GET /api/admin/receipts/[id]` - Get receipt details
- `POST /api/admin/receipts` - Create receipt
- `PUT /api/admin/receipts/[id]` - Update receipt
- `GET /api/admin/receipts/[id]/pdf` - Generate PDF
- `POST /api/admin/receipts/[id]/send` - Send receipt email

### 6.3 Payment APIs
- `GET /api/admin/payments` - List payments
- `POST /api/admin/payments` - Record payment
- `PUT /api/admin/payments/[id]` - Update payment

### 6.4 Account APIs
- `GET /api/admin/account` - Get company profile
- `PUT /api/admin/account` - Update company profile
- `GET /api/admin/account/banks` - Get bank accounts
- `POST /api/admin/account/banks` - Add bank account
- `PUT /api/admin/account/banks/[id]` - Update bank account
- `DELETE /api/admin/account/banks/[id]` - Delete bank account
- `GET /api/admin/account/settings` - Get settings
- `PUT /api/admin/account/settings` - Update settings

### 6.5 Report APIs
- `GET /api/admin/reports/invoices` - Invoice reports
- `GET /api/admin/reports/receipts` - Receipt reports
- `GET /api/admin/reports/revenue` - Revenue analytics
- `GET /api/admin/reports/payments` - Payment reports

---

## Phase 7: Database Schema Details

### Invoice Schema
```javascript
{
  invoiceNumber: String (auto-generated, unique, indexed),
  invoiceId: ObjectId (unique),
  clientId: ObjectId (ref: Client, indexed),
  invoiceDate: Date (indexed),
  dueDate: Date (indexed),
  status: String (enum, indexed),
  paymentTerms: String,
  items: [{
    description: String,
    quantity: Number,
    unitPrice: Number,
    taxRate: Number,
    amount: Number
  }],
  subtotal: Number,
  taxRate: Number,
  taxAmount: Number,
  discountAmount: Number,
  totalAmount: Number,
  currency: String (default: 'BDT'),
  exchangeRate: Number,
  notes: String,
  termsAndConditions: String,
  billingAddress: Object,
  shippingAddress: Object,
  pdfPath: String,
  emailSent: Boolean,
  emailSentAt: Date,
  viewed: Boolean,
  viewedAt: Date,
  createdBy: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Receipt Schema
```javascript
{
  receiptNumber: String (auto-generated, unique, indexed),
  receiptId: ObjectId (unique),
  invoiceId: ObjectId (ref: Invoice, indexed),
  clientId: ObjectId (ref: Client, indexed),
  receiptDate: Date (indexed),
  paymentDate: Date,
  paymentMethod: String (enum),
  paymentReference: String,
  bankDetails: Object,
  amountReceived: Number,
  currency: String,
  exchangeRate: Number,
  notes: String,
  pdfPath: String,
  emailSent: Boolean,
  createdBy: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Payment Schema
```javascript
{
  paymentId: ObjectId (unique),
  invoiceId: ObjectId (ref: Invoice, indexed),
  receiptId: ObjectId (ref: Receipt),
  clientId: ObjectId (ref: Client, indexed),
  paymentDate: Date (indexed),
  amountPaid: Number,
  paymentMethod: String,
  paymentReference: String,
  transactionId: String,
  bankDetails: Object,
  status: String (enum, indexed),
  notes: String,
  createdBy: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Account Settings Schema
```javascript
{
  companyName: String,
  logoPath: String,
  businessRegistrationNumber: String,
  taxId: String,
  address: Object,
  contact: Object,
  bankAccounts: [{
    bankName: String,
    accountNumber: String,
    accountHolderName: String,
    branchName: String,
    routingCode: String,
    isDefault: Boolean
  }],
  taxInfo: Object,
  invoiceSettings: {
    prefix: String,
    nextNumber: Number,
    defaultPaymentTerms: String,
    defaultCurrency: String,
    footerText: String,
    termsTemplate: String
  },
  receiptSettings: {
    prefix: String,
    nextNumber: Number
  },
  emailSettings: Object,
  updatedAt: Date
}
```

---

## Phase 8: PDF Generation Strategy

### 8.1 PDF Library
- Use `@react-pdf/renderer` or `pdfkit` or `puppeteer`
- Recommendation: `@react-pdf/renderer` for React components
- Alternative: `puppeteer` for HTML to PDF conversion

### 8.2 PDF Templates
- Professional Invoice Template with:
  - Company Logo
  - Invoice Number & Date
  - Client Details
  - Itemized List
  - Tax Breakdown
  - Total Amount
  - Payment Instructions
  - Terms & Conditions
  
- Professional Receipt Template with:
  - Company Logo
  - Receipt Number & Date
  - Payment Details
  - Invoice Reference
  - Payment Method
  - Amount Received
  - Bank Details (if applicable)

### 8.3 PDF Storage
- Store PDFs in `/public/invoices/` and `/public/receipts/`
- Or use cloud storage (AWS S3, Cloudinary)
- Save file path in database

---

## Phase 9: Email Integration

### 9.1 Email Templates
- Invoice Email Template:
  - Subject: "Invoice #[NUMBER] from Pixel Forge"
  - Body: Professional email with invoice summary
  - Attachment: Invoice PDF
  
- Receipt Email Template:
  - Subject: "Payment Receipt #[NUMBER] from Pixel Forge"
  - Body: Thank you message with receipt summary
  - Attachment: Receipt PDF

### 9.2 Email Sending
- Use existing CRM email system
- Track email sends
- Include PDF attachments

---

## Phase 10: Invoice Numbering System

### 10.1 Format Options
- Sequential: INV-0001, INV-0002, ...
- Date-based: INV-2024-0001, INV-2024-0002, ...
- Year-Month: INV-2024-12-0001

### 10.2 Implementation
- Auto-increment based on company settings
- Prevent duplicates
- Handle year/month resets

---

## Phase 11: Security & Permissions

### 11.1 Access Control
- Admin-only access
- View, Create, Edit, Delete permissions
- Audit log for all actions

### 11.2 Data Protection
- Secure PDF storage
- Encrypted sensitive data
- Backup system

---

## Phase 12: Integration Points

### 12.1 Client CRM Integration
- Link invoices to clients
- Show invoice history in client profile
- Quick invoice creation from client page

### 12.2 Email System Integration
- Use existing email sending system
- Track email opens/clicks
- Email notifications

---

## Phase 13: Implementation Priority

### High Priority (Phase 1-3)
1. Database Models (Invoice, Receipt, Payment, Account)
2. Basic Invoice Creation & Management
3. Basic Receipt Creation & Management
4. Account/Company Setup
5. PDF Generation
6. Client Integration

### Medium Priority (Phase 4-6)
7. Payment Tracking
8. Reporting System
9. Email Integration
10. Invoice/Receipt Listings with Filters

### Low Priority (Phase 7-8)
11. Advanced Analytics
12. Multi-currency Support
13. Auto-reminders
14. Advanced Reports

---

## Phase 14: UI/UX Considerations

### 14.1 Design Principles
- Clean, professional interface
- Easy invoice creation (wizard-style)
- Quick access to common actions
- Responsive design
- Print-friendly layouts

### 14.2 Key Features
- Drag-and-drop item ordering
- Real-time total calculation
- Auto-save drafts
- Quick actions (Send, Print, Download)
- Status indicators (color-coded)
- Search and filter capabilities

---

## Phase 15: Testing & Quality Assurance

### 15.1 Testing Checklist
- Invoice creation with various scenarios
- PDF generation accuracy
- Email sending functionality
- Payment recording and tracking
- Number generation (no duplicates)
- Client integration
- Report accuracy

---

## Success Metrics

1. ✅ Complete invoice and receipt lifecycle management
2. ✅ Seamless client database integration
3. ✅ Professional PDF generation
4. ✅ Automated email delivery
5. ✅ Comprehensive payment tracking
6. ✅ Detailed reporting and analytics
7. ✅ Centralized account management
8. ✅ User-friendly interface

---

## Timeline Estimate

- Phase 1-3 (Core System): 2-3 weeks
- Phase 4-6 (Advanced Features): 2-3 weeks
- Phase 7-8 (Polish & Enhancements): 1-2 weeks

**Total Estimated Time: 5-8 weeks**

---

This plan provides a complete, professional invoice and receipt management system that integrates seamlessly with your existing CRM and maintains all tracking requirements for Pixel Forge's business operations.

