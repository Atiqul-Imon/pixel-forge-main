/**
 * Example Usage: How Marketing Emails Work in Production
 * 
 * This file demonstrates the complete flow from template generation
 * to email delivery using nodemailer.
 */

import { sendTrackedEmail } from '../crmEmail';
import { generateMarketingEmailHTML, generateMarketingEmailText, MarketingEmailVariables } from './marketingTemplate';

/**
 * Example 1: Send Marketing Email to Single Recipient
 */
export async function sendSingleMarketingEmailExample() {
  // Step 1: Prepare personalized variables
  const variables: MarketingEmailVariables = {
    lead_name: 'John Doe',
    company_name: 'Acme Corporation',
    service_interest: 'Web Development',
    offer: 'Get 20% off your first web development project!',
    cta_url: 'https://pixelforgebd.com/contact',
    cta_text: 'Schedule a Free Consultation',
  };

  // Step 2: Generate email content
  const htmlBody = generateMarketingEmailHTML(variables);
  const textBody = generateMarketingEmailText(variables);

  // Step 3: Send via nodemailer (using existing CRM email service)
  const result = await sendTrackedEmail({
    to: 'john.doe@acme.com',
    subject: 'Transform Your Digital Presence with Pixel Forge',
    htmlBody: htmlBody,
    textBody: textBody,
    emailType: 'marketing',
    createdBy: 'admin@example.com',
    enableTracking: true, // Enables open/click tracking
  });

  console.log('Email sent:', result.emailId);
  console.log('Tracking token:', result.trackingToken);
  // Email is now sent via nodemailer SMTP and stored in database
}

/**
 * Example 2: Send Marketing Email to Multiple Leads
 */
export async function sendBulkMarketingEmailExample() {
  // Simulate leads from database
  const leads = [
    { email: 'lead1@example.com', name: 'Alice Smith', company: 'Tech Corp', service: 'Mobile App Development' },
    { email: 'lead2@example.com', name: 'Bob Johnson', company: 'Retail Inc', service: 'E-Commerce Website' },
    { email: 'lead3@example.com', name: 'Carol Williams', company: null, service: 'UI/UX Design' },
  ];

  const results = [];
  const errors = [];

  // Send personalized email to each lead
  for (const lead of leads) {
    try {
      // Generate personalized content
      const variables: MarketingEmailVariables = {
        lead_name: lead.name,
        company_name: lead.company || undefined,
        service_interest: lead.service,
        offer: 'Limited time: 15% discount!',
      };

      const htmlBody = generateMarketingEmailHTML(variables);
      const textBody = generateMarketingEmailText(variables);

      // Send via nodemailer
      const result = await sendTrackedEmail({
        to: lead.email,
        subject: `Hello ${lead.name}, Let's Build Your ${lead.service} Project`,
        htmlBody,
        textBody,
        emailType: 'marketing',
        createdBy: 'admin@example.com',
        enableTracking: true,
      });

      results.push({ email: lead.email, emailId: result.emailId });

      // Rate limiting: wait 500ms between emails
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error: any) {
      errors.push({ email: lead.email, error: error.message });
    }
  }

  console.log(`Sent: ${results.length}, Failed: ${errors.length}`);
  return { results, errors };
}

/**
 * Example 3: Send with Custom Variables
 */
export async function sendCustomMarketingEmailExample() {
  const variables: MarketingEmailVariables = {
    lead_name: 'Sarah Connor',
    company_name: 'Future Tech',
    service_interest: 'Enterprise Software Development',
    
    // Custom offer
    offer: 'Special Q4 Promotion: 25% off on enterprise projects over $10,000!',
    
    // Custom CTA
    cta_url: 'https://pixelforgebd.com/contact?utm_source=email&utm_campaign=q4_2024',
    cta_text: 'Claim Your Discount Now',
    
    // Custom sender
    sender_name: 'Ahmed Rahman',
    sender_title: 'Lead Developer & Business Consultant',
    
    // Custom contact info
    company_phone: '+880 1712 345 678',
    
    // Social links
    social_facebook: 'https://facebook.com/pixelforgebd',
    social_linkedin: 'https://linkedin.com/company/pixelforgebd',
  };

  const htmlBody = generateMarketingEmailHTML(variables);
  const textBody = generateMarketingEmailText(variables);

  await sendTrackedEmail({
    to: 'sarah@futuretech.com',
    subject: 'Q4 Special: 25% Off Enterprise Projects',
    htmlBody,
    textBody,
    emailType: 'marketing',
    createdBy: 'admin@example.com',
  });
}

/**
 * Example 4: How Nodemailer Actually Sends (Behind the Scenes)
 * 
 * This is what happens inside sendTrackedEmail():
 */
export function nodemailerFlowExample() {
  // This is what happens in src/lib/crmEmail.ts:
  
  // 1. Nodemailer transporter is already configured:
  // const transporter = nodemailer.createTransport({
  //   host: 'mail.privateemail.com',
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     user: process.env.EMAIL_USER,  // hello@pixelforgebd.com
  //     pass: process.env.EMAIL_PASS,  // Your password
  //   },
  // });

  // 2. Email options prepared:
  // const mailOptions = {
  //   from: 'hello@pixelforgebd.com',
  //   to: 'customer@example.com',
  //   subject: 'Welcome to Pixel Forge!',
  //   html: htmlBody,  // Your marketing template HTML
  //   text: textBody,  // Plain text version
  // };

  // 3. Nodemailer sends via SMTP:
  // const info = await transporter.sendMail(mailOptions);
  // 
  // This connects to mail.privateemail.com:465
  // Authenticates using EMAIL_USER and EMAIL_PASS
  // Sends email through SMTP protocol
  // Returns: { messageId, accepted, rejected }

  // 4. Email is delivered to recipient's inbox
  // 5. Tracking pixel loads when email is opened
  // 6. Click tracking works when links are clicked
}

/**
 * Example 5: Production Deployment Checklist
 */
export function productionChecklist() {
  // ✅ Environment variables set:
  // EMAIL_USER=hello@pixelforgebd.com
  // EMAIL_PASS=your_secure_password
  // NEXT_PUBLIC_SITE_URL=https://pixelforgebd.com

  // ✅ SMTP server accessible (mail.privateemail.com:465)
  // ✅ DNS records configured (SPF, DKIM, DMARC)
  // ✅ Email domain warmed up
  // ✅ Rate limiting configured
  // ✅ Error monitoring set up
  // ✅ Unsubscribe functionality working
  // ✅ Tracking routes accessible

  console.log('Production ready!');
}

/**
 * How to Use in Production:
 * 
 * 1. Call API endpoint:
 *    POST /api/admin/crm/marketing/send
 *    Body: { status: 'new', subject: 'Welcome!' }
 * 
 * 2. Or use from code:
 *    await sendSingleMarketingEmailExample();
 * 
 * 3. Or use CLI script:
 *    node scripts/send-marketing-email.js --status="new"
 * 
 * The system will:
 * - Generate personalized HTML from template
 * - Add tracking pixels and link wrapping
 * - Send via nodemailer SMTP
 * - Store in database
 * - Track opens and clicks automatically
 */



