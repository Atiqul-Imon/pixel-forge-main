# Marketing Email Production Flow

This document explains how the marketing email system works in production with nodemailer.

## 🔄 Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLIENT REQUEST                                │
│  (Admin Panel / API Call / CLI Script)                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              API Endpoint: /api/admin/crm/marketing/send        │
│  1. Authenticate user (verifyToken)                             │
│  2. Validate request                                            │
│  3. Query leads from database (if needed)                       │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│           Marketing Template Generator                           │
│  generateMarketingEmailHTML(variables)                          │
│  ├── Replace template variables ({{lead_name}}, etc.)           │
│  ├── Add conditional sections (offer section)                   │
│  └── Return final HTML string                                   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│         CRM Email Service: sendTrackedEmail()                   │
│  1. Generate tracking token                                     │
│  2. Inject tracking pixel into HTML                             │
│  3. Wrap links with click tracking                              │
│  4. Prepare nodemailer mail options                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              NODEMAILER TRANSPORTER                              │
│  transporter.sendMail(mailOptions)                              │
│  ├── SMTP Configuration:                                        │
│  │   • Host: mail.privateemail.com                             │
│  │   • Port: 465 (SSL)                                         │
│  │   • Auth: EMAIL_USER, EMAIL_PASS                            │
│  ├── Send email via SMTP                                        │
│  └── Return messageId                                           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              EMAIL DELIVERY                                      │
│  Email sent to recipient's inbox                                │
│  ├── HTML version (marketing template)                          │
│  ├── Plain text version (fallback)                              │
│  └── Tracking pixel loads (when opened)                         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              DATABASE STORAGE                                    │
│  EmailCommunication record saved                                │
│  ├── Email content                                              │
│  ├── Tracking token                                             │
│  ├── Recipient info                                             │
│  └── Metadata (type, campaign, etc.)                            │
└─────────────────────────────────────────────────────────────────┘
```

## 📧 Step-by-Step Production Flow

### Step 1: Client Initiates Request

**Option A: From Admin Panel (Recommended)**
```javascript
// In your admin panel UI
const response = await fetch('/api/admin/crm/marketing/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${adminToken}`,
  },
  body: JSON.stringify({
    status: 'new',
    subject: 'Welcome to Pixel Forge!',
    customVariables: {
      offer: 'Get 20% off your first project!',
    },
  }),
});
```

**Option B: From CLI Script**
```bash
node scripts/send-marketing-email.js --status="new" --subject="Welcome!"
```

**Option C: Direct API Call (from external service)**
```bash
curl -X POST https://pixelforgebd.com/api/admin/crm/marketing/send \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status":"new","subject":"Welcome!"}'
```

### Step 2: API Processes Request

**File:** `/src/app/api/admin/crm/marketing/send/route.ts`

```typescript
// 1. Authenticate
const decodedToken = verifyToken(token);

// 2. Query leads from database
const leads = await Lead.find({ status: 'new' });

// 3. For each lead, generate personalized email
for (const lead of leads) {
  // Generate HTML using template
  const htmlBody = generateMarketingEmailHTML({
    lead_name: lead.name,
    company_name: lead.company,
    service_interest: lead.service,
    // ... other variables
  });
  
  // Send via nodemailer
  await sendTrackedEmail({
    to: lead.email,
    subject: 'Welcome!',
    htmlBody: htmlBody,
    emailType: 'marketing',
  });
}
```

### Step 3: Template Generation

**File:** `/src/lib/emailTemplates/marketingTemplate.ts`

```typescript
// Template with variables like {{lead_name}}, {{company_name}}
const html = generateMarketingEmailHTML({
  lead_name: 'John Doe',
  company_name: 'Acme Corp',
  service_interest: 'Web Development',
  offer: 'Get 20% off!',
});

// Returns fully rendered HTML string with:
// - All variables replaced
// - Conditional sections handled
// - Professional styling (inline CSS)
```

**Output:** Complete HTML email ready to send

### Step 4: CRM Email Service Adds Tracking

**File:** `/src/lib/crmEmail.ts`

```typescript
// Inside sendTrackedEmail():

// 1. Generate unique tracking token
const trackingToken = generateTrackingToken();
// e.g., "a1b2c3d4e5f6..."

// 2. Inject tracking pixel
let htmlBody = `<img src="https://pixelforgebd.com/api/admin/crm/emails/track/${trackingToken}" />`;

// 3. Wrap all links with click tracking
htmlBody = trackLinks(htmlBody, trackingToken);
// e.g., <a href="https://example.com"> becomes
// <a href="https://pixelforgebd.com/api/admin/crm/emails/click/TOKEN?url=...">
```

### Step 5: Nodemailer Sends Email

**File:** `/src/lib/crmEmail.ts` (transporter configuration)

```typescript
// Nodemailer transporter (already configured)
const transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com',      // Namecheap SMTP
  port: 465,                           // SSL port
  secure: true,                        // Use SSL
  auth: {
    user: process.env.EMAIL_USER,      // hello@pixelforgebd.com
    pass: process.env.EMAIL_PASS,      // Your email password
  },
  tls: {
    rejectUnauthorized: true           // Verify SSL certificate
  }
});

// Send email
const mailOptions = {
  from: 'hello@pixelforgebd.com',
  to: 'customer@example.com',
  subject: 'Welcome to Pixel Forge!',
  html: htmlBody,                      // Your marketing template HTML
  text: textBody,                      // Plain text version
  headers: {
    'X-Tracking-Token': trackingToken  // Custom header for tracking
  }
};

const info = await transporter.sendMail(mailOptions);
// Returns: { messageId: '...', accepted: [...], rejected: [...] }
```

**What happens:**
1. Nodemailer connects to Namecheap SMTP server
2. Authenticates using EMAIL_USER and EMAIL_PASS
3. Sends email through SMTP
4. Returns delivery status

### Step 6: Email Delivery

The email is delivered to the recipient's inbox:
- **From:** hello@pixelforgebd.com
- **To:** customer@example.com
- **Subject:** Welcome to Pixel Forge!
- **Body:** Fully rendered HTML marketing template

### Step 7: Tracking Events

When recipient opens email:

```
1. Email client loads tracking pixel:
   GET /api/admin/crm/emails/track/TOKEN

2. Server marks email as opened:
   - Updates EmailCommunication record
   - Sets readStatus = true
   - Increments openCount
   - Records readAt timestamp
```

When recipient clicks link:

```
1. Click goes through tracking URL:
   GET /api/admin/crm/emails/click/TOKEN?url=https://example.com

2. Server records click:
   - Updates clickedLinks array
   - Increments clickCount
   - Records clickedAt timestamp

3. Redirects to original URL:
   Redirect → https://example.com
```

### Step 8: Database Storage

**Collection:** `EmailCommunication`

```javascript
{
  _id: ObjectId("..."),
  from: "hello@pixelforgebd.com",
  to: ["customer@example.com"],
  subject: "Welcome to Pixel Forge!",
  htmlBody: "<html>...",              // Full HTML template
  textBody: "Hello John...",          // Plain text version
  sentAt: ISODate("2024-01-15T10:30:00Z"),
  trackingToken: "a1b2c3d4e5f6...",
  emailType: "marketing",
  
  // Tracking data (updated when events occur)
  readStatus: true,
  readAt: ISODate("2024-01-15T11:00:00Z"),
  openCount: 3,
  clickedLinks: [
    {
      url: "https://pixelforgebd.com/contact",
      clickCount: 2,
      clickedAt: ISODate("2024-01-15T11:05:00Z")
    }
  ]
}
```

## 🚀 Production Configuration

### Environment Variables Required

**File:** `.env.local` (or production environment)

```env
# SMTP Configuration (Namecheap)
EMAIL_USER=hello@pixelforgebd.com
EMAIL_PASS=your_email_password

# Site URL (for tracking links)
NEXT_PUBLIC_SITE_URL=https://pixelforgebd.com

# Admin Token (for CLI scripts - optional)
ADMIN_TOKEN=your_admin_jwt_token
```

### SMTP Configuration Details

**Namecheap Private Email Settings:**
- **Host:** mail.privateemail.com
- **Port:** 465 (SSL) or 587 (TLS)
- **Security:** SSL/TLS enabled
- **Authentication:** Required
- **Username:** Your full email address
- **Password:** Your email account password

**Verification:**
```typescript
// Test SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.log('SMTP Error:', error);
  } else {
    console.log('SMTP Ready:', success);
  }
});
```

## 📊 Production Considerations

### 1. Rate Limiting

**Current Implementation:**
- 500ms delay between emails (in marketing/send route)
- Prevents SMTP server overload

**Recommendations:**
```typescript
// For large batches, consider:
- Increase delay: 1000ms (1 second)
- Batch processing: Send in groups of 50
- Queue system: Use job queue (Bull, BullMQ) for 1000+ emails
```

### 2. Error Handling

**Current Implementation:**
- Try-catch around each email
- Errors logged to console
- Failed emails returned in response

**Production Improvements:**
```typescript
// Add retry logic
const maxRetries = 3;
for (let i = 0; i < maxRetries; i++) {
  try {
    await transporter.sendMail(mailOptions);
    break; // Success
  } catch (error) {
    if (i === maxRetries - 1) throw error;
    await delay(1000 * (i + 1)); // Exponential backoff
  }
}

// Log errors to monitoring service (Sentry, etc.)
logger.error('Email send failed', { error, recipient });
```

### 3. Email Deliverability

**Best Practices:**
- ✅ Use authenticated SMTP (already configured)
- ✅ Include plain text version (already included)
- ✅ Unsubscribe link (already included)
- ✅ Sender verification (SPF, DKIM, DMARC)
- ✅ Warm up email domain for high volumes
- ✅ Monitor bounce rates

**SPF Record (DNS):**
```
TXT @ "v=spf1 include:privateemail.com ~all"
```

**DKIM/DMARC:** Configure in Namecheap email settings

### 4. Monitoring

**Track:**
- Send success rate
- Open rates
- Click rates
- Bounce rates
- Unsubscribe rate

**Example Dashboard Query:**
```typescript
const stats = await getEmailStats();
// Returns: { totalSent, totalOpened, openRate, replyRate, ... }
```

## 🧪 Testing in Production

### 1. Test Single Email

```bash
# Send to your own email
node scripts/send-marketing-email.js \
  --email="your@email.com" \
  --subject="Test Email"
```

### 2. Test Small Batch

```bash
# Send to 5 new leads
node scripts/send-marketing-email.js \
  --status="new" \
  --limit=5 \
  --subject="Welcome Test"
```

### 3. Monitor Logs

```bash
# Check server logs for errors
tail -f logs/app.log | grep -i email

# Check SMTP errors
tail -f logs/app.log | grep -i smtp
```

## 📈 Production Deployment Checklist

- [ ] Verify SMTP credentials in production environment
- [ ] Test email sending to your own email
- [ ] Configure SPF/DKIM/DMARC records
- [ ] Set up email monitoring/alerts
- [ ] Configure rate limiting for bulk sends
- [ ] Test tracking pixel functionality
- [ ] Verify unsubscribe link works
- [ ] Test on multiple email clients (Gmail, Outlook, etc.)
- [ ] Monitor initial sends for deliverability
- [ ] Set up error logging and alerts

## 🔍 Troubleshooting Production Issues

### Email Not Sending

**Check:**
1. SMTP credentials correct
2. Firewall allows outbound SMTP (port 465)
3. Email server not blacklisted
4. Rate limits not exceeded

**Debug:**
```typescript
transporter.verify()
  .then(() => console.log('SMTP Ready'))
  .catch(err => console.error('SMTP Error:', err));
```

### Low Deliverability

**Possible Causes:**
- Missing SPF/DKIM records
- Sending from new domain
- High bounce rate
- Recipients marking as spam

**Solutions:**
- Verify DNS records
- Warm up domain gradually
- Clean email list (remove invalid emails)
- Improve email content (avoid spam words)

### Tracking Not Working

**Check:**
- NEXT_PUBLIC_SITE_URL is correct
- Tracking routes are accessible
- Email clients allow images (for open tracking)
- Links are being wrapped correctly

## 📝 Example: Complete Production Flow

```typescript
// 1. Admin clicks "Send Marketing Email" in admin panel
//    → Calls: POST /api/admin/crm/marketing/send

// 2. API authenticates and queries leads
const leads = await Lead.find({ status: 'new' }); // Gets 100 leads

// 3. For each lead (100 iterations):
for (const lead of leads) {
  // 3a. Generate personalized HTML
  const html = generateMarketingEmailHTML({
    lead_name: lead.name,
    company_name: lead.company,
  });
  
  // 3b. Add tracking and send
  await sendTrackedEmail({
    to: lead.email,
    subject: 'Welcome!',
    htmlBody: html,
    emailType: 'marketing',
  });
  
  // 3c. Wait 500ms (rate limiting)
  await delay(500);
}

// 4. Nodemailer sends 100 emails via SMTP
//    → Each email goes through mail.privateemail.com
//    → Delivered to recipient inboxes

// 5. Tracking data collected as recipients open/click
//    → Stored in EmailCommunication collection
//    → Viewable in admin panel

// Result:
// ✅ 100 emails sent
// ✅ 100 database records created
// ✅ Tracking enabled for all
// ✅ Admin can view statistics
```

## 🎯 Summary

**The marketing email system works in production by:**

1. **Using existing nodemailer setup** - Already configured with Namecheap SMTP
2. **Template generation** - Creates personalized HTML emails
3. **Tracking integration** - Automatically adds tracking pixels and link wrapping
4. **SMTP delivery** - Sends via mail.privateemail.com
5. **Database logging** - Stores all emails for analytics
6. **Event tracking** - Records opens and clicks automatically

**No additional configuration needed** - It uses your existing email infrastructure!



