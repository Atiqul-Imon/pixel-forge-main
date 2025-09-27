import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/lib/models/Contact';
import { ContactFormData } from '@/types';
import { sendLeadNotification } from '@/lib/email';
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
    
    const body: ContactFormData = await request.json();
    const { name, email, company, service, message } = body;

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

    // Send email notification
    try {
      await sendLeadNotification({
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

