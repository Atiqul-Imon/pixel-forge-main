import { NextRequest, NextResponse } from 'next/server';
import { sendCAPIEvents, capiEvents, generateEventId } from '@/lib/capi';

// Facebook Conversions API endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventType, userInfo, customData, eventId } = body;

    // Get environment variables
    const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    const testEventCode = process.env.FACEBOOK_TEST_EVENT_CODE;

    if (!pixelId || !accessToken) {
      console.error('Missing Facebook CAPI credentials');
      return NextResponse.json(
        { error: 'Facebook CAPI not configured' },
        { status: 500 }
      );
    }

    let event;

    // Create appropriate event based on type
    switch (eventType) {
      case 'lead':
        if (!userInfo?.email || !userInfo?.name || !userInfo?.service) {
          return NextResponse.json(
            { error: 'Missing required lead data' },
            { status: 400 }
          );
        }
        event = capiEvents.lead(request, userInfo, eventId);
        break;

      case 'pageView':
        event = capiEvents.pageView(request, customData?.pageName || 'Unknown Page', eventId);
        break;

      case 'viewContent':
        if (!customData?.serviceName) {
          return NextResponse.json(
            { error: 'Missing service name for viewContent' },
            { status: 400 }
          );
        }
        event = capiEvents.viewContent(request, customData.serviceName, eventId);
        break;

      case 'contact':
        event = capiEvents.contact(request, customData?.contactMethod || 'WhatsApp', eventId);
        break;

      case 'portfolioView':
        if (!customData?.projectName) {
          return NextResponse.json(
            { error: 'Missing project name for portfolioView' },
            { status: 400 }
          );
        }
        event = capiEvents.portfolioView(request, customData.projectName, eventId);
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid event type' },
          { status: 400 }
        );
    }

    // Send event to Facebook
    const result = await sendCAPIEvents(
      pixelId,
      accessToken,
      [event],
      testEventCode
    );

    if (!result.success) {
      console.error('CAPI send failed:', result.error);
      return NextResponse.json(
        { error: 'Failed to send event to Facebook', details: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      eventId: event.event_id,
      response: result.response,
    });

  } catch (error) {
    console.error('CAPI endpoint error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  return NextResponse.json({
    status: 'ok',
    capiConfigured: !!(pixelId && accessToken),
    pixelId: pixelId ? 'configured' : 'missing',
    accessToken: accessToken ? 'configured' : 'missing',
  });
}
