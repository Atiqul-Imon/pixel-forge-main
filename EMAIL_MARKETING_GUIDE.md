# Email Marketing Guide

This guide explains how to send marketing emails to your leads using the professional email template system.

## Overview

The email marketing system includes:
- **Professional HTML Email Template**: Responsive, email-client compatible template with Pixel Forge branding
- **API Endpoint**: `/api/admin/crm/marketing/send` - Send marketing emails programmatically
- **CLI Script**: `scripts/send-marketing-email.js` - Command-line tool for bulk sending

## Email Template Features

The marketing email template includes:
- ✅ Responsive design (works on mobile and desktop)
- ✅ Email-client compatible (inline styles, table-based layout)
- ✅ Professional Pixel Forge branding with purple gradient
- ✅ Personalized content with template variables
- ✅ Call-to-action button
- ✅ Services showcase (Web Dev, Mobile Apps, UI/UX, E-Commerce)
- ✅ Contact information
- ✅ Social media links
- ✅ Unsubscribe link
- ✅ Optional special offer section
- ✅ Email tracking (opens, clicks)

## Template Variables

You can personalize emails using these variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `lead_name` | Lead's name | "Valued Customer" |
| `company_name` | Lead's company name | Empty |
| `service_interest` | Service they're interested in | "our services" |
| `offer` | Special offer text | Empty (hides offer section) |
| `cta_url` | Call-to-action link | "/contact" |
| `cta_text` | Call-to-action button text | "Get Started Today" |
| `unsubscribe_url` | Unsubscribe link | "/unsubscribe" |
| `sender_name` | Sender's name | "Pixel Forge Team" |
| `sender_title` | Sender's title | "Your Digital Solutions Partner" |
| `company_website` | Your website URL | "https://pixelforgebd.com" |
| `company_phone` | Your phone number | "+880 1234 567890" |
| `company_email` | Your email | "hello@pixelforgebd.com" |
| `social_facebook` | Facebook page URL | Default URL |
| `social_linkedin` | LinkedIn page URL | Default URL |
| `social_twitter` | Twitter page URL | Default URL |

## Usage Methods

### Method 1: Using the API Endpoint

Send a POST request to `/api/admin/crm/marketing/send` with your admin token:

```javascript
// Example: Send to specific email
const response = await fetch('/api/admin/crm/marketing/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${yourAdminToken}`,
  },
  body: JSON.stringify({
    email: 'customer@example.com',
    subject: 'Welcome to Pixel Forge!',
    customVariables: {
      offer: 'Get 20% off your first project!',
      cta_text: 'Claim Your Discount',
    },
  }),
});

const result = await response.json();
console.log('Sent:', result.sent);
console.log('Failed:', result.failed);
```

#### API Request Options

**Send to specific email:**
```json
{
  "email": "customer@example.com",
  "subject": "Welcome to Pixel Forge!"
}
```

**Send to specific leads:**
```json
{
  "leadIds": ["lead_id_1", "lead_id_2", "lead_id_3"],
  "subject": "Special Offer Just For You!"
}
```

**Send to filtered leads:**
```json
{
  "status": "new",
  "source": "website",
  "service": "Web Development",
  "subject": "Let's Build Your Website!"
}
```

**With custom variables:**
```json
{
  "status": "contacted",
  "subject": "Follow-up: Your Project Proposal",
  "customVariables": {
    "offer": "Limited time: 15% discount on web development projects!",
    "cta_url": "https://pixelforgebd.com/contact",
    "cta_text": "Schedule a Call"
  }
}
```

### Method 2: Using the CLI Script

The script provides a command-line interface for sending marketing emails.

#### Setup

1. Make sure you have a valid admin token. Get it from:
   - Log into admin panel: `/admin/login`
   - Open browser console (F12)
   - Run: `localStorage.getItem('authToken')`
   - Copy the token

2. Add to `.env.local`:
   ```
   ADMIN_TOKEN=your_token_here
   ```

3. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

#### Examples

**Send to specific email:**
```bash
node scripts/send-marketing-email.js --email="customer@example.com"
```

**Send to all "new" leads:**
```bash
node scripts/send-marketing-email.js --status="new"
```

**Send to leads from website source:**
```bash
node scripts/send-marketing-email.js --source="website" --service="Web Development"
```

**Send with custom subject and offer:**
```bash
node scripts/send-marketing-email.js --status="new" --subject="Special Offer!" --offer="Get 20% off your first project"
```

**Send to specific lead IDs:**
```bash
node scripts/send-marketing-email.js --leadIds="507f1f77bcf86cd799439011,507f191e810c19729de860ea"
```

**See all options:**
```bash
node scripts/send-marketing-email.js
```

### Method 3: Using from Admin Panel

You can integrate the marketing email sender into your admin panel UI:

1. Create a new page: `/admin/crm/marketing`
2. Add a form with filters (status, source, service)
3. Add option to select specific leads
4. Call the API endpoint when submitting

## Email Preview

The template includes:

1. **Header**: Purple gradient with Pixel Forge logo
2. **Greeting**: Personalized with lead's name
3. **Main Content**: Why Choose Pixel Forge (benefits)
4. **Offer Section**: Optional special offer (if provided)
5. **CTA Button**: Prominent call-to-action
6. **Services Grid**: 4 service cards (Web, Mobile, UI/UX, E-Commerce)
7. **Contact Info**: Email, phone, website
8. **Social Links**: Facebook, LinkedIn, Twitter
9. **Footer**: Signature, unsubscribe, privacy policy links

## Email Tracking

All sent emails are automatically tracked:
- ✅ **Open Tracking**: When the email is opened
- ✅ **Click Tracking**: When links in the email are clicked
- ✅ **Database Logging**: All emails are saved to the database
- ✅ **Statistics**: Track open rates, click rates, replies

View email statistics in the admin panel under:
- `/admin/crm/emails` - Email history
- Email communication records include tracking data

## Best Practices

1. **Personalization**: Always use `lead_name` and `company_name` for better engagement
2. **Clear CTA**: Make your call-to-action clear and prominent
3. **Mobile-Friendly**: The template is responsive, but test on mobile devices
4. **Subject Lines**: Keep subject lines clear and compelling
5. **Unsubscribe**: Always include unsubscribe link (already included)
6. **Timing**: Consider sending times for better open rates
7. **Segmentation**: Send targeted emails based on lead status/source/service
8. **A/B Testing**: Test different subject lines and offers

## Troubleshooting

**Email not sending:**
- Check SMTP credentials in `.env.local` (`EMAIL_USER`, `EMAIL_PASS`)
- Verify admin token is valid
- Check server logs for errors

**Email not displaying correctly:**
- The template uses inline styles for maximum compatibility
- Test in multiple email clients (Gmail, Outlook, Apple Mail)
- Some email clients strip certain CSS properties

**Tracking not working:**
- Ensure `NEXT_PUBLIC_SITE_URL` is set correctly
- Check that tracking pixel URL is accessible
- Verify email client allows images (required for open tracking)

## Example Use Cases

1. **Welcome Email for New Leads:**
   ```json
   {
     "status": "new",
     "subject": "Welcome! Let's Transform Your Digital Presence",
     "customVariables": {
       "offer": "Free consultation for all new leads!"
     }
   }
   ```

2. **Follow-up for Contacted Leads:**
   ```json
   {
     "status": "contacted",
     "subject": "Following up on your interest in our services",
     "customVariables": {
       "cta_text": "Schedule a Call"
     }
   }
   ```

3. **Service-Specific Campaign:**
   ```json
   {
     "service": "Web Development",
     "subject": "Custom Web Development Solutions for Your Business",
     "customVariables": {
       "offer": "20% off web development projects this month!"
     }
   }
   ```

## Support

For issues or questions:
- Check the API logs: `/api/admin/crm/marketing/send`
- Review email tracking data in admin panel
- Check SMTP configuration in `.env.local`



