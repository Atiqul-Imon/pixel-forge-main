import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/lib/models/Contact';
import Lead from '@/lib/models/Lead';
import { ContactFormData } from '@/types';
import { sendLeadNotification, sendAutoReply } from '@/lib/email';
import { checkRateLimit } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    // Rate limiting check - 10 submissions per 15 minutes
    if (!checkRateLimit(clientIP, 10, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many contact form submissions. Please try again later.' },
        { status: 429 }
      );
    }
    
    const body: ContactFormData & {
      phone?: string;
      pixelId?: string;
      pixelEventId?: string;
      pixelEventType?: string;
      pixelSource?: string;
      pixelCampaign?: string;
    } = await request.json();
    const { name, email, company, service, message, phone, pixelId, pixelEventId, pixelEventType, pixelSource, pixelCampaign } = body;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    await connectDB();

    const contact = new Contact({
      name,
      email,
      company,
      service,
      message,
    });

    await contact.save();

    // Also create a Lead in CRM with Facebook Pixel tracking
    try {
      // Calculate lead score
      let leadScore = 0;
      if (company) leadScore += 10;
      if (phone) leadScore += 10;
      if (pixelId) leadScore += 15; // Facebook Pixel leads are higher quality
      if (pixelSource === 'facebook' || pixelSource === 'google') leadScore += 15;

      const lead = new Lead({
        name,
        email,
        phone,
        company,
        service,
        message,
        source: pixelSource === 'facebook' ? 'facebook' : pixelSource === 'google' ? 'google' : 'website',
        pixelId,
        pixelEventId,
        pixelEventType,
        pixelSource,
        pixelCampaign,
        status: 'new',
        leadScore,
        estimatedValue: 0,
        currency: 'BDT',
        tags: [],
      });

      await lead.save();
    } catch (leadError) {
      console.error('Error creating lead in CRM:', leadError);
      // Don't fail the request if lead creation fails
    }

    // Send email notifications
    try {
      // Send notification to admin (you)
      await sendLeadNotification({
        name,
        email,
        company,
        service,
        message,
      });

      // Send auto-reply to customer
      await sendAutoReply({
        name,
        email,
        company,
        service,
        message,
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

