import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import { requireAdmin, checkRateLimit } from '@/lib/auth';

// GET - Fetch all blog posts with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    // Rate limiting check - 150 requests per 15 minutes for admin
    if (!checkRateLimit(clientIP, 150, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    // Require admin authentication
    await requireAdmin(request);
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || 'all';
    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};
    if (status !== 'all') filter.status = status;
    if (category !== 'all') filter.category = category;
    // Remove regex search - will use text search instead

    // Use text search if search query exists, otherwise use regex
    let posts;
    if (search) {
      // @ts-expect-error - Mongoose overloaded method type issue
      posts = await BlogPost.find(
        { ...filter, $text: { $search: search } },
        { score: { $meta: 'textScore' } }
      ).sort({ score: { $meta: 'textScore' }, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
    } else {
      // @ts-expect-error - Mongoose overloaded method type issue
      posts = await BlogPost.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
    }

    const total = await BlogPost.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  try {
    // Require admin authentication
    await requireAdmin(request);
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();

    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      author,
      category,
      tags,
      image,
      featured,
      status,
      seoTitle,
      seoDescription,
      seoKeywords,
    } = body;

    // Validate required fields
    if (!title || !excerpt || !content || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate slug if not provided
    let finalSlug = slug;
    if (!finalSlug && title) {
      finalSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
    }

    // Check if slug already exists
    if (finalSlug) {
      // @ts-expect-error - Mongoose overloaded method type issue
      const existingPost = await BlogPost.findOne({ slug: finalSlug }).lean();
      if (existingPost) {
        return NextResponse.json(
          { error: 'Slug already exists' },
          { status: 400 }
        );
      }
    }

    const blogPost = new BlogPost({
      title,
      slug: finalSlug,
      excerpt,
      content,
      author: author || 'Pixel Forge Team',
      category,
      tags: tags || [],
      image,
      featured: featured || false,
      status: status || 'draft',
      seoTitle,
      seoDescription,
      seoKeywords: seoKeywords || [],
    });

    await blogPost.save();

    return NextResponse.json(
      { message: 'Blog post created successfully', post: blogPost },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog post:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });
    return NextResponse.json(
      { error: 'Failed to create blog post', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
