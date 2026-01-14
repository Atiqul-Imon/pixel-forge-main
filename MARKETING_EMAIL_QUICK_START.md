# Marketing Email Quick Start - Production Guide

## 🚀 How It Works in Production (Simple Explanation)

Your marketing email system uses **nodemailer** (already configured) to send emails via SMTP. Here's the simple flow:

```
You Call API → Generate Template → Send via Nodemailer → Email Delivered!
```

## 📋 Quick Start (3 Steps)

### Step 1: Ensure Environment Variables are Set

**File:** `.env.local` (production: `.env` or environment settings)

```env
EMAIL_USER=hello@pixelforgebd.com
EMAIL_PASS=your_email_password
NEXT_PUBLIC_SITE_URL=https://pixelforgebd.com
```

✅ **Already configured?** Your existing email system uses these same variables!

### Step 2: Send Marketing Email

**Option A: Via API (Recommended)**
```javascript
// From your admin panel or any client
const response = await fetch('/api/admin/crm/marketing/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${yourAdminToken}`,
  },
  body: JSON.stringify({
    status: 'new',  // Send to all new leads
    subject: 'Welcome to Pixel Forge!',
  }),
});
```

**Option B: Via CLI Script**
```bash
node scripts/send-marketing-email.js --status="new"
```

### Step 3: Email is Sent!

The system automatically:
1. ✅ Generates personalized HTML template
2. ✅ Adds tracking (open/click tracking)
3. ✅ Sends via nodemailer SMTP (mail.privateemail.com)
4. ✅ Stores in database
5. ✅ Tracks opens and clicks

**That's it!** The email is delivered to your leads.

## 🔍 What Happens Behind the Scenes

### 1. Template Generation
```typescript
// Marketing template with variables
const html = generateMarketingEmailHTML({
  lead_name: 'John Doe',
  company_name: 'Acme Corp',
  offer: '20% off!',
});
// Returns: Complete HTML email with inline styles
```

### 2. Nodemailer Sends Email
```typescript
// Inside sendTrackedEmail() - uses your existing nodemailer setup
const transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com',  // Namecheap SMTP
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,  // hello@pixelforgebd.com
    pass: process.env.EMAIL_PASS,  // Your password
  },
});

await transporter.sendMail({
  from: 'hello@pixelforgebd.com',
  to: 'customer@example.com',
  subject: 'Welcome!',
  html: htmlBody,  // Your marketing template
  text: textBody,  // Plain text version
});
```

### 3. Email Delivered
- Recipient receives email in inbox
- HTML renders with your branding
- Tracking pixel loads (when opened)
- Links track clicks (when clicked)

### 4. Database Tracking
- Email record saved to `EmailCommunication` collection
- Opens tracked automatically
- Clicks tracked automatically
- View statistics in admin panel

## 🎯 Key Points

1. **Uses Existing Infrastructure**
   - Same nodemailer setup as your other emails
   - Same SMTP server (mail.privateemail.com)
   - Same authentication (EMAIL_USER, EMAIL_PASS)
   - ✅ **No additional setup needed!**

2. **Automatic Tracking**
   - Open tracking (pixel-based)
   - Click tracking (link wrapping)
   - Database logging
   - Statistics available

3. **Production Ready**
   - Error handling
   - Rate limiting (500ms between emails)
   - Plain text fallback
   - Unsubscribe links

## 📊 Example: Send to All New Leads

```javascript
// Simple example - sends to all new leads
const response = await fetch('/api/admin/crm/marketing/send', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    status: 'new',
    subject: 'Welcome! Let\'s Build Your Digital Solution',
    customVariables: {
      offer: 'Get 20% off your first project!',
    },
  }),
});

const result = await response.json();
// Returns: { sent: [...], failed: [...], total: 50 }
```

## 🧪 Test Before Production

1. **Send test email to yourself:**
   ```bash
   node scripts/send-marketing-email.js --email="your@email.com"
   ```

2. **Check inbox** - Should receive formatted marketing email

3. **Click links** - Should track clicks in database

4. **Check admin panel** - Email should appear in `/admin/crm/emails`

## ⚙️ Production Configuration

**No additional configuration needed!** Your existing email setup works:

- ✅ SMTP already configured (nodemailer)
- ✅ Email credentials already set (EMAIL_USER, EMAIL_PASS)
- ✅ Database already connected
- ✅ Tracking routes already created

**Just ensure:**
- Environment variables are set in production
- SMTP server is accessible from production server
- Database is accessible from production server

## 📈 Monitoring in Production

**Check email statistics:**
```javascript
// View in admin panel: /admin/crm/emails
// Or via API:
const stats = await getEmailStats();
// Returns: { totalSent, totalOpened, openRate, replyRate, ... }
```

**Monitor logs:**
- Email send errors logged to console
- Failed emails returned in API response
- Database records all attempts

## 🎉 Summary

**The marketing email system works in production by:**

1. **Using your existing nodemailer setup** - No new configuration
2. **Generating professional HTML templates** - Personalized content
3. **Sending via SMTP** - Same server as your other emails
4. **Tracking automatically** - Opens, clicks, statistics
5. **Storing in database** - Full audit trail

**It's production-ready right now!** Just ensure your environment variables are set and you're good to go.

## 🆘 Need Help?

- **SMTP issues?** Check EMAIL_USER and EMAIL_PASS
- **Not sending?** Verify SMTP server is accessible
- **Tracking not working?** Check NEXT_PUBLIC_SITE_URL
- **See detailed docs:** `EMAIL_MARKETING_PRODUCTION_FLOW.md`



