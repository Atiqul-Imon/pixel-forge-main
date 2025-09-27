import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import { requireAdmin } from '@/lib/auth';

// GET - Fetch single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Require admin authentication
    await requireAdmin(request);
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const resolvedParams = await params;

    const post = await BlogPost.findById(resolvedParams.id).lean();
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      post: post
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PUT - Update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Require admin authentication
    await requireAdmin(request);
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const resolvedParams = await params;

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
      publishedAt,
      seoTitle,
      seoDescription,
      seoKeywords,
    } = body;

    // Check if slug already exists (excluding current post)
    if (slug) {
      const existingPost = await BlogPost.findOne({ 
        slug, 
        _id: { $ne: resolvedParams.id } 
      }).lean();
      if (existingPost) {
        return NextResponse.json(
          { error: 'Slug already exists' },
          { status: 400 }
        );
      }
    }

    const updateData: any = {
      title,
      slug,
      excerpt,
      content,
      author,
      category,
      tags: tags || [],
      image,
      featured: featured || false,
      status: status || 'draft',
      seoTitle,
      seoDescription,
      seoKeywords: seoKeywords || [],
      updatedAt: new Date(),
    };

    // Set publishedAt when publishing
    if (status === 'published' && publishedAt) {
      updateData.publishedAt = new Date(publishedAt);
    }

    const post = await BlogPost.findByIdAndUpdate(
      resolvedParams.id,
      updateData,
      { new: true, runValidators: true }
    ).lean();

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Blog post updated successfully',
      post,
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Require admin authentication
    await requireAdmin(request);
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const resolvedParams = await params;

    const post = await BlogPost.findByIdAndDelete(resolvedParams.id).lean();
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
