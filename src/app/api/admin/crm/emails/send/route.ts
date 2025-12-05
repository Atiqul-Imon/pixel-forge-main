import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { sendTrackedEmail, sendEmailWithTemplate } from '@/lib/crmEmail';

// POST - Send email
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    const decodedToken = verifyToken(token?.replace('Bearer ', '') || '');
    
    if (!token || !decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      to,
      cc,
      bcc,
      subject,
      htmlBody,
      textBody,
      templateId,
      variables,
      emailType = 'other',
      campaignId,
      clientId,
      contactPersonId,
      dealId,
      projectId,
      followUpScheduled,
      attachments,
      enableTracking = true,
    } = body;

    if (!to) {
      return NextResponse.json(
        { error: 'Recipient email is required' },
        { status: 400 }
      );
    }

    // Use template if provided
    let result;
    if (templateId && variables) {
      result = await sendEmailWithTemplate(
        templateId,
        to,
        variables || {},
        {
          cc,
          bcc,
          emailType,
          campaignId,
          clientId,
          contactPersonId,
          dealId,
          projectId,
          followUpScheduled,
          attachments,
          createdBy: decodedToken.email || 'system',
          enableTracking,
        }
      );
    } else {
      if (!subject || !htmlBody) {
        return NextResponse.json(
          { error: 'Subject and HTML body are required when not using template' },
          { status: 400 }
        );
      }
      
      result = await sendTrackedEmail({
        to,
        cc,
        bcc,
        subject,
        htmlBody,
        textBody,
        emailType,
        templateId,
        campaignId,
        clientId,
        contactPersonId,
        dealId,
        projectId,
        followUpScheduled,
        attachments,
        createdBy: decodedToken.email || 'system',
        enableTracking,
      });
    }

    return NextResponse.json({
      message: 'Email sent successfully',
      emailId: result.emailId,
      trackingToken: result.trackingToken,
    });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}

