import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import { requireAdmin } from '@/lib/auth';

// GET - Fetch all blog posts with pagination and filtering
export async function GET(request: NextRequest) {
  try {
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
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const posts = await BlogPost.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

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

    // Check if slug already exists
    if (slug) {
      const existingPost = await BlogPost.findOne({ slug });
      if (existingPost) {
        return NextResponse.json(
          { error: 'Slug already exists' },
          { status: 400 }
        );
      }
    }

    const blogPost = new BlogPost({
      title,
      slug,
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
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
