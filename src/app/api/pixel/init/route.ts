import { NextRequest, NextResponse } from 'next/server';

/**
 * API endpoint to initialize pixel tracking
 * Can be called from client-side to ensure pixel data is captured
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pixelId, utmParams } = body;

    // Return success - actual tracking happens client-side
    // This endpoint is mainly for validation and logging
    return NextResponse.json({
      success: true,
      message: 'Pixel tracking initialized',
      pixelId,
      utmParams,
    });
  } catch (error) {
    console.error('Error initializing pixel:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

