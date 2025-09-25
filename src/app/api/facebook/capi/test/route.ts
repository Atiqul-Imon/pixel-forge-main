import { NextRequest, NextResponse } from 'next/server';
import { sendCAPIEvents, capiEvents } from '@/lib/capi';

// Test endpoint for CAPI implementation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { testType = 'lead' } = body;

    // Get environment variables
    const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    const testEventCode = process.env.FACEBOOK_TEST_EVENT_CODE;

    if (!pixelId || !accessToken) {
      return NextResponse.json({
        success: false,
        error: 'CAPI not configured. Please set NEXT_PUBLIC_FACEBOOK_PIXEL_ID and FACEBOOK_ACCESS_TOKEN environment variables.',
        config: {
          pixelId: !!pixelId,
          accessToken: !!accessToken,
          testEventCode: !!testEventCode
        }
      }, { status: 500 });
    }

    let event;

    // Create test event based on type
    switch (testType) {
      case 'lead':
        event = capiEvents.lead(request, {
          email: 'test@pixelforgebd.com',
          name: 'Test User',
          service: 'Web Development'
        });
        break;

      case 'pageView':
        event = capiEvents.pageView(request, 'Test Page');
        break;

      case 'viewContent':
        event = capiEvents.viewContent(request, 'Test Service');
        break;

      case 'contact':
        event = capiEvents.contact(request, 'Test Contact');
        break;

      case 'portfolioView':
        event = capiEvents.portfolioView(request, 'Test Project');
        break;

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid test type. Use: lead, pageView, viewContent, contact, or portfolioView'
        }, { status: 400 });
    }

    // Send test event to Facebook
    const result = await sendCAPIEvents(
      pixelId,
      accessToken,
      [event],
      testEventCode
    );

    return NextResponse.json({
      success: result.success,
      testType,
      eventId: event.event_id,
      eventName: event.event_name,
      pixelId,
      hasTestEventCode: !!testEventCode,
      response: result.response,
      error: result.error
    });

  } catch (error) {
    console.error('CAPI test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// GET endpoint to show available test types
export async function GET() {
  const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
  const testEventCode = process.env.FACEBOOK_TEST_EVENT_CODE;

  return NextResponse.json({
    status: 'CAPI Test Endpoint',
    config: {
      pixelId: !!pixelId,
      accessToken: !!accessToken,
      testEventCode: !!testEventCode
    },
    availableTests: [
      {
        type: 'lead',
        description: 'Test lead generation event',
        example: { testType: 'lead' }
      },
      {
        type: 'pageView',
        description: 'Test page view event',
        example: { testType: 'pageView' }
      },
      {
        type: 'viewContent',
        description: 'Test service interest event',
        example: { testType: 'viewContent' }
      },
      {
        type: 'contact',
        description: 'Test contact event',
        example: { testType: 'contact' }
      },
      {
        type: 'portfolioView',
        description: 'Test portfolio view event',
        example: { testType: 'portfolioView' }
      }
    ],
    usage: {
      method: 'POST',
      endpoint: '/api/facebook/capi/test',
      body: { testType: 'lead' }
    }
  });
}
