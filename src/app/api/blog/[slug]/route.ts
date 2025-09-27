import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import cache, { cacheKeys, CACHE_TTL } from '@/lib/cache';
import { withPerformanceMonitoring, logApiResponseTime } from '@/lib/performance';
import { checkRateLimit } from '@/lib/auth';

// GET - Fetch single blog post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const startTime = Date.now();
  
  try {
    // Get client IP for rate limiting
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    // Rate limiting check - 200 requests per 15 minutes
    if (!checkRateLimit(clientIP, 200, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    await connectDB();
    const resolvedParams = await params;

    // Check cache first
    const cacheKey = cacheKeys.blogPost(resolvedParams.slug);
    const cachedPost = cache.get(cacheKey);
    
    if (cachedPost) {
      return NextResponse.json(cachedPost);
    }

    const post = await withPerformanceMonitoring(
      'blog_post_query',
      () => BlogPost.findOne({ 
        slug: resolvedParams.slug,
        status: 'published' // Only published posts
      }).lean()
    );

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Cache the result
    cache.set(cacheKey, post, CACHE_TTL.BLOG_POST);

    const duration = Date.now() - startTime;
    logApiResponseTime(`/api/blog/${resolvedParams.slug}`, duration);

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}
