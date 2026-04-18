'use client';

import { useState, useEffect, use, useRef } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft,
  ArrowRight,
  Tag,
  Share2, 
  BookOpen, 
  Heart, 
  Bookmark, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Copy,
  Check,
  ChevronUp,
  MessageCircle,
  ThumbsUp
} from 'lucide-react';
import Image from 'next/image';
import Script from 'next/script';
import RelatedPosts from '@/components/RelatedPosts';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
  updatedAt?: string;
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Note: Metadata generation moved to layout.tsx since this is a client component

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 10);
  const [comments, setComments] = useState(Math.floor(Math.random() * 20) + 5);
  
  const articleRef = useRef<HTMLElement>(null);
  const scrollTopRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    fetchPost();
  }, [resolvedParams.slug]);

  useEffect(() => {
    const handleScroll = () => {
      if (articleRef.current) {
        const articleHeight = articleRef.current.offsetHeight;
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const progress = Math.min((scrollTop / (articleHeight - windowHeight)) * 100, 100);
        setReadingProgress(progress);
        setShowScrollTop(scrollTop > 300);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  const fetchPost = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/blog/${resolvedParams.slug}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      } else if (response.status === 404) {
        setError('Post not found');
      } else {
        setError('Failed to load post');
      }
    } catch (err) {
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post?.title || '');
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 pt-16">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-zinc-200 border-t-primary-600" />
          <h2 className="mb-2 font-display text-lg font-semibold text-zinc-900">Loading article</h2>
          <p className="text-sm text-zinc-600">Fetching content…</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 pt-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-red-700">
            <BookOpen className="h-10 w-10" />
          </div>
          <h1 className="mb-4 font-display text-3xl font-semibold text-zinc-900">
            {error === 'Post not found' ? 'Article not found' : 'Could not load article'}
          </h1>
          <p className="mb-8 text-zinc-600">
            {error === 'Post not found'
              ? "The article you're looking for doesn't exist or may have been moved."
              : 'There was an error loading the article. Please try again later.'}
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center rounded-xl bg-primary-600 px-8 py-3.5 font-semibold text-white shadow-sm transition-interactive hover:bg-primary-700"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  // Generate structured data for the article
  const articleSchema = post ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt ?? post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pixel Forge",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pixelforgebd.com/logo/pixelforgelogo2.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://pixelforgebd.com/blog/${post.slug}`
    },
    "articleSection": post.category,
    "keywords": post.tags.join(", "),
    "wordCount": post.content.split(' ').length,
    "timeRequired": post.readTime
  } : null;

  const breadcrumbSchema = post ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://pixelforgebd.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://pixelforgebd.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://pixelforgebd.com/blog/${post.slug}`
      }
    ]
  } : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data */}
      {articleSchema && (
        <Script
          id="article-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}

      {/* Reading Progress Bar */}
      <div className="fixed left-0 top-0 z-50 h-1 w-full bg-zinc-200">
        <div
          className="h-full bg-primary-600 transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>


      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          ref={scrollTopRef}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 rounded-full bg-primary-600 p-3 text-white shadow-lg transition-interactive hover:bg-primary-700"
          title="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#153a72] to-[#2563eb]" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12] bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:48px_48px]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-content px-4 pb-12 pt-20 text-white sm:px-6 lg:px-8">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="transition-interactive hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/blog" className="transition-interactive hover:text-white">
                  Blog
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="max-w-xs truncate font-medium text-slate-200">{post.title}</li>
            </ol>
          </nav>

          <div className="mb-6 flex flex-wrap items-center gap-4 text-slate-300">
            <div className="flex items-center text-sm">
              <User className="mr-2 h-4 w-4" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4" />
              <span>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center text-sm">
              <BookOpen className="mr-2 h-4 w-4" />
              <span>{likes} likes</span>
            </div>
          </div>

          <div className="mb-6">
            <span className="inline-flex items-center rounded-sm border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              {post.category}
            </span>
          </div>

          <h1 className="font-display max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-slate-200 md:text-2xl">{post.excerpt}</p>
        </div>
      </section>

      <section className="border-b border-slate-200/90 bg-white">
        <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
          <div className="relative mx-auto w-full max-w-[1230px] shadow-2xl">
            <div className="relative w-full overflow-hidden rounded-lg bg-slate-100" style={{ aspectRatio: '1230/660' }}>
              <Image
                src={post.image}
                alt={`${post.title} - ${post.excerpt}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1230px"
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article ref={articleRef} className="py-16">
        <div className="mx-auto max-w-reading-wide px-4 sm:px-6 lg:px-8">
          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-zinc-900 prose-p:text-zinc-700 prose-p:leading-relaxed prose-p:text-[17px] prose-li:text-zinc-700 prose-strong:text-zinc-900 prose-a:font-medium prose-a:text-primary-700 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-primary-50/50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:text-zinc-700 prose-code:rounded prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-pre:bg-zinc-950 prose-pre:text-zinc-100"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Article Actions */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-6">
              {/* Tags */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 cursor-pointer hover:scale-105"
                    >
                      <Tag className="w-3 h-3 mr-2" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Share */}
              <div className="flex flex-col items-end">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-200 hover:scale-110 shadow-lg"
                    title="Share on Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 hover:scale-110 shadow-lg"
                    title="Share on Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="p-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-all duration-200 hover:scale-110 shadow-lg"
                    title="Share on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="p-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-all duration-200 hover:scale-110 shadow-lg"
                    title="Copy link"
                  >
                    {isCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Article Stats */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-8 text-gray-600">
              <div className="flex items-center">
                <ThumbsUp className="w-5 h-5 mr-2" />
                <span className="font-medium">{likes} likes</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                <span className="font-medium">{comments} comments</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                <span className="font-medium">{post.readTime} read</span>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          <RelatedPosts 
            currentPostId={post._id}
            category={post.category}
            tags={post.tags}
          />
        </div>
      </article>

      {/* CTA Section */}
      <section className="border-t border-zinc-800 bg-zinc-950 py-20">
        <div className="mx-auto max-w-content px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Ready to ship your next platform?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Turn these ideas into production—we build and maintain web platforms end to end.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-primary-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-interactive hover:bg-primary-500"
            >
              Start your project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-600 px-8 py-3.5 text-base font-semibold text-white transition-interactive hover:border-zinc-500 hover:bg-zinc-900"
            >
              What we build
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
