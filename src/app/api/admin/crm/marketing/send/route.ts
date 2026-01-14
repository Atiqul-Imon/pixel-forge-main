import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { sendTrackedEmail } from '@/lib/crmEmail';
import { generateMarketingEmailHTML, generateMarketingEmailText, MarketingEmailVariables } from '@/lib/emailTemplates/marketingTemplate';
import Lead from '@/lib/models/Lead';
import connectDB from '@/lib/mongodb';

interface SendMarketingEmailRequest {
  leadIds?: string[]; // Send to specific leads
  status?: string; // Filter by status (new, contacted, etc.)
  source?: string; // Filter by source
  service?: string; // Filter by service
  email?: string; // Send to specific email
  customVariables?: MarketingEmailVariables; // Override default variables
  subject?: string; // Custom subject line
  enableTracking?: boolean;
}

/**
 * POST - Send marketing email to leads
 * 
 * Can send to:
 * - Specific lead IDs
 * - Specific email address
 * - Filtered leads (by status, source, service)
 */
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    const decodedToken = verifyToken(token?.replace('Bearer ', '') || '');
    
    if (!token || !decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body: SendMarketingEmailRequest = await request.json();
    const {
      leadIds,
      status,
      source,
      service,
      email,
      customVariables = {},
      subject,
      enableTracking = true,
    } = body;

    // Build query to find leads
    const query: Record<string, unknown> = {};
    
    if (leadIds && leadIds.length > 0) {
      query._id = { $in: leadIds };
    } else if (status && status !== 'all') {
      query.status = status;
    }
    
    if (source && source !== 'all') {
      query.source = source;
    }
    
    if (service && service !== 'all') {
      query.service = service;
    }

    // Get leads or use single email
    let recipients: Array<{ email: string; name: string; company?: string; service?: string }> = [];
    
    if (email) {
      // Send to single email
      recipients = [{ email, name: customVariables.lead_name || 'Valued Customer' }];
    } else if (Object.keys(query).length > 0 || leadIds) {
      // Fetch leads from database
      // @ts-expect-error - Mongoose overloaded method type issue
      const leads = await Lead.find(query).select('email name company service').lean();
      
      if (leads.length === 0) {
        return NextResponse.json(
          { error: 'No leads found matching the criteria' },
          { status: 404 }
        );
      }
      
      recipients = leads.map((lead: { email: string; name: string; company?: string; service?: string }) => ({
        email: lead.email,
        name: lead.name,
        company: lead.company,
        service: lead.service,
      }));
    } else {
      return NextResponse.json(
        { error: 'Please provide leadIds, filters (status/source/service), or email address' },
        { status: 400 }
      );
    }

    // Send emails to each recipient
    const results = [];
    const errors = [];
    
    const defaultSubject = subject || 'Transform Your Digital Presence with Pixel Forge';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pixelforgebd.com';

    for (const recipient of recipients) {
      try {
        // Prepare variables for this recipient
        const variables: MarketingEmailVariables = {
          lead_name: recipient.name,
          company_name: recipient.company,
          service_interest: recipient.service || 'our services',
          cta_url: `${siteUrl}/contact`,
          cta_text: 'Get Started Today',
          unsubscribe_url: `${siteUrl}/unsubscribe?email=${encodeURIComponent(recipient.email)}`,
          sender_name: 'Pixel Forge Team',
          sender_title: 'Your Digital Solutions Partner',
          company_website: siteUrl,
          company_phone: '+880 1234 567890',
          company_email: 'hello@pixelforgebd.com',
          social_facebook: 'https://facebook.com/pixelforgebd',
          social_linkedin: 'https://linkedin.com/company/pixelforgebd',
          social_twitter: 'https://twitter.com/pixelforgebd',
          ...customVariables, // Allow overriding defaults
        };

        // Generate email content
        const htmlBody = generateMarketingEmailHTML(variables);
        const textBody = generateMarketingEmailText(variables);

        // Send email
        const result = await sendTrackedEmail({
          to: recipient.email,
          subject: defaultSubject,
          htmlBody,
          textBody,
          emailType: 'marketing',
          createdBy: decodedToken.email || 'system',
          enableTracking,
        });

        results.push({
          email: recipient.email,
          name: recipient.name,
          emailId: result.emailId,
          trackingToken: result.trackingToken,
        });

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error: any) {
        console.error(`Error sending email to ${recipient.email}:`, error);
        errors.push({
          email: recipient.email,
          name: recipient.name,
          error: error.message || 'Failed to send email',
        });
      }
    }

    return NextResponse.json({
      message: `Marketing emails sent. Success: ${results.length}, Failed: ${errors.length}`,
      sent: results,
      failed: errors,
      total: recipients.length,
    });
  } catch (error: any) {
    console.error('Error sending marketing emails:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send marketing emails' },
      { status: 500 }
    );
  }
}



