import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 50; // 50 uploads per hour

  const key = ip;
  const current = rateLimitStore.get(key);

  if (!current || now > current.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count >= maxRequests) {
    return false;
  }

  current.count++;
  return true;
}

// Validate environment variables
function validateEnvironment() {
  const requiredVars = [
    'IMAGEKIT_PRIVATE_KEY',
    'NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY',
    'NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT'
  ];

  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

// Validate file
function validateFile(file: File): { valid: boolean; error?: string } {
  // Check if file exists
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Only JPEG, PNG, GIF, WebP, and SVG images are allowed.' };
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 10MB' };
  }

  // Check file size (min 1KB)
  const minSize = 1024; // 1KB
  if (file.size < minSize) {
    return { valid: false, error: 'File size must be at least 1KB' };
  }

  return { valid: true };
}

// Generate ImageKit authentication parameters
function generateImageKitAuth() {
  const token = crypto.randomBytes(16).toString('hex');
  const expire = Math.floor(Date.now() / 1000) + 3000; // 50 minutes from now (less than 1 hour)
  
  const signature = crypto
    .createHmac('sha1', process.env.IMAGEKIT_PRIVATE_KEY!)
    .update(token + expire)
    .digest('hex');

  return { token, expire, signature };
}

// Sanitize filename
function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_') // Replace special characters with underscore
    .replace(/_+/g, '_') // Replace multiple underscores with single
    .replace(/^_|_$/g, '') // Remove leading/trailing underscores
    .substring(0, 100); // Limit length
}

// POST - Public ImageKit upload endpoint
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown';

  try {
    // Validate environment
    validateEnvironment();

    // Rate limiting
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;

    // Validate file
    const fileValidation = validateFile(file);
    if (!fileValidation.valid) {
      return NextResponse.json(
        { error: fileValidation.error },
        { status: 400 }
      );
    }

    // Generate authentication parameters
    const auth = generateImageKitAuth();

    // Sanitize filename
    const sanitizedFilename = sanitizeFilename(file.name);
    const timestamp = Date.now();
    const finalFilename = `${timestamp}_${sanitizedFilename}`;

    // Create FormData for ImageKit upload
    const imagekitFormData = new FormData();
    imagekitFormData.append('file', file);
    imagekitFormData.append('publicKey', process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!);
    imagekitFormData.append('fileName', finalFilename);
    imagekitFormData.append('folder', '/pixel-forge-blog/');
    imagekitFormData.append('signature', auth.signature);
    imagekitFormData.append('expire', auth.expire.toString());
    imagekitFormData.append('token', auth.token);

    // Add tags for better organization
    imagekitFormData.append('tags', 'pixel-forge,blog,upload');

    // Log upload parameters for debugging
    console.log('ImageKit upload parameters:', {
      fileName: finalFilename,
      folder: '/pixel-forge-blog/',
      fileSize: file.size,
      fileType: file.type,
      expire: auth.expire,
      token: auth.token.substring(0, 8) + '...',
      signature: auth.signature.substring(0, 8) + '...',
    });

    // Upload to ImageKit with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const uploadResponse = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
        method: 'POST',
        body: imagekitFormData,
        signal: controller.signal,
        headers: {
          'User-Agent': 'PixelForge-Blog/1.0',
        },
      });

      clearTimeout(timeoutId);

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json().catch(() => ({}));
        console.error('ImageKit upload failed:', {
          status: uploadResponse.status,
          statusText: uploadResponse.statusText,
          error: errorData,
          filename: finalFilename,
          fileSize: file.size,
          fileType: file.type,
        });

        return NextResponse.json(
          { 
            error: errorData.message || `Upload failed with status ${uploadResponse.status}`,
            details: errorData
          },
          { status: 400 }
        );
      }

      const uploadData = await uploadResponse.json();

      // Validate response
      if (!uploadData.url) {
        throw new Error('Invalid response from ImageKit');
      }

      // Log successful upload
      console.log('ImageKit upload successful:', {
        fileId: uploadData.fileId,
        url: uploadData.url,
        filename: finalFilename,
        fileSize: file.size,
        fileType: file.type,
        processingTime: Date.now() - startTime,
        clientIP,
      });

      return NextResponse.json({
        url: uploadData.url,
        fileId: uploadData.fileId,
        name: uploadData.name,
        size: uploadData.size,
        width: uploadData.width,
        height: uploadData.height,
        format: uploadData.format,
        thumbnailUrl: uploadData.thumbnailUrl,
      });

    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Upload timeout. Please try again.' },
          { status: 408 }
        );
      }
      
      throw fetchError;
    }

  } catch (error) {
    console.error('ImageKit upload error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      clientIP,
      processingTime: Date.now() - startTime,
    });

    return NextResponse.json(
      { 
        error: 'Upload failed. Please try again.',
        ...(process.env.NODE_ENV === 'development' && {
          details: error instanceof Error ? error.message : 'Unknown error'
        })
      },
      { status: 500 }
    );
  }
}
