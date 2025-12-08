import { NextRequest, NextResponse } from 'next/server';
import { trackLinkClick } from '@/lib/crmEmail';

// Email link click tracking endpoint - no auth required (public endpoint)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const resolvedParams = await params;
    const { token } = resolvedParams;
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    
    if (!url) {
      return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
    }
    
    const decodedUrl = decodeURIComponent(url);
    
    // Track the click
    await trackLinkClick(token, decodedUrl);
    
    // Redirect to the actual URL
    return NextResponse.redirect(decodedUrl);
  } catch (error) {
    console.error('Error tracking link click:', error);
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    if (url) {
      return NextResponse.redirect(decodeURIComponent(url));
    }
    return NextResponse.json({ error: 'Failed to track click' }, { status: 500 });
  }
}

