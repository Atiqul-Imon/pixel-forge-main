import { Metadata } from 'next';

// Generate metadata for individual blog posts
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/blog/${resolvedParams.slug}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      return {
        title: 'Blog Post | Pixel Forge BD',
        description: 'Read our latest web development insights and tutorials.',
      };
    }
    
    const post = await response.json();
    
    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      keywords: post.seoKeywords || post.tags,
      authors: [{ name: post.author }],
      openGraph: {
        title: post.seoTitle || post.title,
        description: post.seoDescription || post.excerpt,
        type: 'article',
        url: `https://pixelforgebd.com/blog/${post.slug}`,
        images: [{
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        }],
        publishedTime: post.publishedAt,
        authors: [post.author],
        section: post.category,
        tags: post.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.seoTitle || post.title,
        description: post.seoDescription || post.excerpt,
        images: [post.image],
        creator: '@pixelforgebd',
      },
      alternates: {
        canonical: `https://pixelforgebd.com/blog/${post.slug}`,
      },
      other: {
        'article:published_time': post.publishedAt,
        'article:modified_time': post.updatedAt || post.publishedAt,
        'article:author': post.author,
        'article:section': post.category,
        'article:tag': post.tags.join(', '),
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post | Pixel Forge BD',
      description: 'Read our latest web development insights and tutorials.',
    };
  }
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
