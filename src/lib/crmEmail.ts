import nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';
import EmailCommunication from './models/EmailCommunication';
import EmailTemplate from './models/EmailTemplate';
import dbConnect from './mongodb';

// Namecheap Private Email SMTP Configuration
const transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // hello@pixelforgebd.com
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: true
  }
});

/**
 * Replace template variables in string
 * Supports: {{variable_name}} format
 */
export function replaceTemplateVariables(
  text: string,
  variables: Record<string, string | number | undefined>
): string {
  let result = text;
  Object.keys(variables).forEach((key) => {
    const value = variables[key]?.toString() || '';
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    result = result.replace(regex, value);
  });
  return result;
}

/**
 * Generate a unique tracking token for email
 */
export function generateTrackingToken(): string {
  return randomBytes(32).toString('hex');
}

/**
 * Inject tracking pixel into HTML email
 */
export function injectTrackingPixel(htmlBody: string, trackingToken: string): string {
  const trackingUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://pixelforgebd.com'}/api/admin/crm/emails/track/${trackingToken}`;
  const trackingPixel = `<img src="${trackingUrl}" width="1" height="1" style="display:none;" alt="" />`;
  
  // Insert before closing </body> tag, or append if no body tag
  if (htmlBody.includes('</body>')) {
    return htmlBody.replace('</body>', `${trackingPixel}</body>`);
  }
  return htmlBody + trackingPixel;
}

/**
 * Track clicked links by rewriting URLs
 */
export function trackLinks(htmlBody: string, trackingToken: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pixelforgebd.com';
  const linkRegex = /<a\s+([^>]*href=["'])([^"']+)(["'][^>]*)>/gi;
  
  return htmlBody.replace(linkRegex, (match, before, url, after) => {
    // Skip if already a tracking URL or mailto/tel links
    if (url.startsWith(baseUrl + '/api/admin/crm/emails/click/') || 
        url.startsWith('mailto:') || 
        url.startsWith('tel:')) {
      return match;
    }
    
    const encodedUrl = encodeURIComponent(url);
    const trackingUrl = `${baseUrl}/api/admin/crm/emails/click/${trackingToken}?url=${encodedUrl}`;
    return `<a ${before}${trackingUrl}${after}>`;
  });
}

/**
 * Process email template with variables
 */
export async function processEmailTemplate(
  templateId: string,
  variables: Record<string, string | number | undefined>
): Promise<{ subject: string; htmlBody: string; textBody?: string }> {
  await dbConnect();
  
  const template = await EmailTemplate.findById(templateId);
  if (!template || !template.isActive) {
    throw new Error('Email template not found or inactive');
  }
  
  const subject = replaceTemplateVariables(template.subject, variables);
  const htmlBody = replaceTemplateVariables(template.htmlBody, variables);
  const textBody = template.textBody ? replaceTemplateVariables(template.textBody, variables) : undefined;
  
  // Update usage stats
  template.usageCount += 1;
  template.lastUsedAt = new Date();
  await template.save();
  
  return { subject, htmlBody, textBody };
}

/**
 * Send email with full tracking and database logging
 */
export interface SendEmailOptions {
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  htmlBody: string;
  textBody?: string;
  emailType?: 'outreach' | 'proposal' | 'invoice' | 'follow-up' | 'greeting' | 'support' | 'marketing' | 'other';
  templateId?: string;
  campaignId?: string;
  clientId?: string;
  contactPersonId?: string;
  dealId?: string;
  projectId?: string;
  followUpScheduled?: Date;
  attachments?: {
    filename: string;
    path: string;
  }[];
  createdBy: string;
  enableTracking?: boolean;
}

export async function sendTrackedEmail(options: SendEmailOptions): Promise<{
  emailId: string;
  trackingToken: string;
  messageId: string;
}> {
  await dbConnect();
  
  const {
    to,
    cc,
    bcc,
    subject,
    htmlBody,
    textBody,
    emailType = 'other',
    templateId,
    campaignId,
    clientId,
    contactPersonId,
    dealId,
    projectId,
    followUpScheduled,
    attachments = [],
    createdBy,
    enableTracking = true,
  } = options;
  
  // Generate tracking token
  const trackingToken = generateTrackingToken();
  
  // Process HTML body with tracking
  let processedHtmlBody = htmlBody;
  if (enableTracking) {
    processedHtmlBody = injectTrackingPixel(processedHtmlBody, trackingToken);
    processedHtmlBody = trackLinks(processedHtmlBody, trackingToken);
  }
  
  // Prepare recipient arrays
  const toArray = Array.isArray(to) ? to : [to];
  const ccArray = cc ? (Array.isArray(cc) ? cc : [cc]) : undefined;
  const bccArray = bcc ? (Array.isArray(bcc) ? bcc : [bcc]) : undefined;
  
  // Send email
  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.EMAIL_USER || 'hello@pixelforgebd.com',
    to: toArray.join(', '),
    cc: ccArray?.join(', '),
    bcc: bccArray?.join(', '),
    subject,
    html: processedHtmlBody,
    text: textBody,
    attachments: attachments.map(att => ({
      filename: att.filename,
      path: att.path,
    })),
    headers: {
      'X-Tracking-Token': trackingToken,
    },
  };
  
  const info = await transporter.sendMail(mailOptions);
  
  // Save to database
  const emailRecord = new EmailCommunication({
    from: process.env.EMAIL_USER || 'hello@pixelforgebd.com',
    to: toArray,
    cc: ccArray,
    bcc: bccArray,
    subject,
    htmlBody: processedHtmlBody,
    textBody,
    attachments: attachments.map(att => ({
      filename: att.filename,
      path: att.path,
      size: 0, // Will be calculated if needed
      mimeType: 'application/octet-stream', // Default, can be detected
    })),
    sentAt: new Date(),
    trackingToken,
    emailType,
    templateId: templateId ? (templateId as any) : undefined,
    campaignId: campaignId ? (campaignId as any) : undefined,
    clientId: clientId ? (clientId as any) : undefined,
    contactPersonId: contactPersonId ? (contactPersonId as any) : undefined,
    dealId: dealId ? (dealId as any) : undefined,
    projectId,
    followUpScheduled,
    createdBy,
  });
  
  const savedEmail = await emailRecord.save();
  
  return {
    emailId: savedEmail._id.toString(),
    trackingToken,
    messageId: info.messageId || '',
  };
}

/**
 * Send email using template
 */
export async function sendEmailWithTemplate(
  templateId: string,
  to: string | string[],
  variables: Record<string, string | number | undefined>,
  options: Omit<SendEmailOptions, 'subject' | 'htmlBody' | 'textBody' | 'templateId'>
): Promise<{
  emailId: string;
  trackingToken: string;
  messageId: string;
}> {
  const { subject, htmlBody, textBody } = await processEmailTemplate(templateId, variables);
  
  return sendTrackedEmail({
    ...options,
    to,
    subject,
    htmlBody,
    textBody,
    templateId,
  });
}

/**
 * Mark email as read
 */
export async function markEmailAsRead(trackingToken: string): Promise<void> {
  await dbConnect();
  
  const email = await EmailCommunication.findOne({ trackingToken });
  if (email && !email.readStatus) {
    email.readStatus = true;
    email.readAt = new Date();
    email.openCount = (email.openCount || 0) + 1;
    email.lastOpenedAt = new Date();
    await email.save();
  } else if (email) {
    // Already read, just increment open count
    email.openCount = (email.openCount || 0) + 1;
    email.lastOpenedAt = new Date();
    await email.save();
  }
}

/**
 * Track link click
 */
export async function trackLinkClick(
  trackingToken: string,
  clickedUrl: string
): Promise<string> {
  await dbConnect();
  
  const email = await EmailCommunication.findOne({ trackingToken });
  if (email) {
    const existingLink = email.clickedLinks?.find(link => link.url === clickedUrl);
    if (existingLink) {
      existingLink.clickCount += 1;
      existingLink.clickedAt = new Date();
    } else {
      if (!email.clickedLinks) {
        email.clickedLinks = [];
      }
      email.clickedLinks.push({
        url: clickedUrl,
        clickedAt: new Date(),
        clickCount: 1,
      });
    }
    await email.save();
  }
  
  return clickedUrl;
}

/**
 * Get email statistics
 */
export async function getEmailStats(
  clientId?: string,
  dateRange?: { from: Date; to: Date }
): Promise<{
  totalSent: number;
  totalOpened: number;
  totalReplied: number;
  totalBounced: number;
  openRate: number;
  replyRate: number;
}> {
  await dbConnect();
  
  const query: any = {};
  if (clientId) {
    query.clientId = clientId;
  }
  if (dateRange) {
    query.sentAt = {
      $gte: dateRange.from,
      $lte: dateRange.to,
    };
  }
  
  const emails = await EmailCommunication.find(query);
  
  const totalSent = emails.length;
  const totalOpened = emails.filter(e => e.readStatus).length;
  const totalReplied = emails.filter(e => e.replyStatus).length;
  const totalBounced = emails.filter(e => e.bounceStatus !== 'none').length;
  
  const openRate = totalSent > 0 ? (totalOpened / totalSent) * 100 : 0;
  const replyRate = totalSent > 0 ? (totalReplied / totalSent) * 100 : 0;
  
  return {
    totalSent,
    totalOpened,
    totalReplied,
    totalBounced,
    openRate: Math.round(openRate * 100) / 100,
    replyRate: Math.round(replyRate * 100) / 100,
  };
}

// Export transporter for custom use
export { transporter };

