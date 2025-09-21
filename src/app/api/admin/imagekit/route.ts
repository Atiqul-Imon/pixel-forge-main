import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Helper to check if user is authenticated
const isAuthenticated = () => {
  const authCookie = cookies().get('adminAuth');
  return authCookie?.value === process.env.ADMIN_PASSWORD;
};

// GET - Get ImageKit authentication parameters
export async function GET(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const expire = searchParams.get('expire');

    if (!token || !expire) {
      return NextResponse.json(
        { error: 'Missing token or expire parameters' },
        { status: 400 }
      );
    }

    // Verify the token hasn't expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (parseInt(expire) < currentTime) {
      return NextResponse.json(
        { error: 'Token has expired' },
        { status: 400 }
      );
    }

    // Return ImageKit configuration
    return NextResponse.json({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      authenticationEndpoint: process.env.IMAGEKIT_AUTH_ENDPOINT || '/api/admin/imagekit/auth',
    });
  } catch (error) {
    console.error('Error getting ImageKit config:', error);
    return NextResponse.json(
      { error: 'Failed to get ImageKit configuration' },
      { status: 500 }
    );
  }
}

// POST - Generate ImageKit authentication token
export async function POST(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const expire = searchParams.get('expire');

    if (!token || !expire) {
      return NextResponse.json(
        { error: 'Missing token or expire parameters' },
        { status: 400 }
      );
    }

    // Verify the token hasn't expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (parseInt(expire) < currentTime) {
      return NextResponse.json(
        { error: 'Token has expired' },
        { status: 400 }
      );
    }

    // Generate signature for ImageKit
    const crypto = require('crypto');
    const signature = crypto
      .createHmac('sha1', process.env.IMAGEKIT_PRIVATE_KEY || '')
      .update(token + expire)
      .digest('hex');

    return NextResponse.json({
      signature,
      expire: parseInt(expire),
      token,
    });
  } catch (error) {
    console.error('Error generating ImageKit signature:', error);
    return NextResponse.json(
      { error: 'Failed to generate ImageKit signature' },
      { status: 500 }
    );
  }
}
