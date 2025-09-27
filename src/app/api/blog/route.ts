import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import cache, { cacheKeys, CACHE_TTL } from '@/lib/cache';
import { withPerformanceMonitoring, logApiResponseTime } from '@/lib/performance';
import { checkRateLimit } from '@/lib/auth';

// GET - Fetch published blog posts for public consumption
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';
    const featured = searchParams.get('featured') === 'true';

    const skip = (page - 1) * limit;

    // Build filter object - only published posts
    const filter: any = { status: 'published' };
    
    if (category !== 'all') filter.category = category;
    if (featured) filter.featured = true;
    // Remove regex search - will use text search instead

    // Check cache first
    const cacheKey = cacheKeys.blogPosts(filter, page, limit);
    const cachedResult = cache.get(cacheKey);
    
    if (cachedResult) {
      return NextResponse.json(cachedResult);
    }

    // Use text search if search query exists, otherwise use regex
    let query;
    if (search) {
      query = BlogPost.find(
        { ...filter, $text: { $search: search } },
        { score: { $meta: 'textScore' } }
      ).sort({ score: { $meta: 'textScore' }, publishedAt: -1 });
    } else {
      query = BlogPost.find(filter).sort({ publishedAt: -1 });
    }

    const posts = await withPerformanceMonitoring(
      'blog_posts_query',
      () => query
        .skip(skip)
        .limit(limit)
        .select('title slug excerpt author publishedAt readTime category tags image featured seoTitle seoDescription')
        .lean()
    );

    const total = await withPerformanceMonitoring(
      'blog_posts_count',
      () => BlogPost.countDocuments(filter)
    );
    const totalPages = Math.ceil(total / limit);

    const result = {
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };

    // Cache the result
    cache.set(cacheKey, result, CACHE_TTL.BLOG_POSTS);

    const duration = Date.now() - startTime;
    logApiResponseTime('/api/blog', duration);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
