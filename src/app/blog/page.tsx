'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import Image from 'next/image';
import BlogStructuredData from '@/components/BlogStructuredData';
import { trackEvent } from '@/lib/gtag';
import { PageSection } from '@/components/marketing/PageSection';
import { MarketingPageHero } from '@/components/marketing/MarketingPageHero';
import { MarketingCtaBand } from '@/components/marketing/MarketingCtaBand';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPosts();
    trackEvent.servicePageView('Blog');
  }, [currentPage]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
      });
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`/api/blog?${params}`, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
        setTotalPages(data.pagination?.totalPages || 1);
      } else {
        setPosts([]);
      }
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white pt-16">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />
        <p className="mt-4 text-sm font-medium text-zinc-600">Loading articles…</p>
      </div>
    );
  }

  if (!loading && posts.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <BlogStructuredData posts={posts} />
        <MarketingPageHero
          eyebrow="Blog"
          title="Insights & tutorials"
          description="New posts are on the way. In the meantime, start a conversation about your project."
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-3.5 text-base font-bold uppercase tracking-wide text-white shadow-lg shadow-black/20 transition-interactive hover:bg-orange-400"
            onClick={() => trackEvent.ctaClick('Get in Touch - Empty State')}
          >
            Get in touch
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </MarketingPageHero>
      </div>
    );
  }

  const featuredPost = posts.find((p) => p.featured) ?? posts[0];
  const gridPosts = featuredPost ? posts.filter((p) => p._id !== featuredPost._id) : posts;

  return (
    <div className="min-h-screen bg-white">
      <BlogStructuredData posts={posts} />
      <MarketingPageHero
        eyebrow="Blog"
        title={<>Ideas for builders &amp; operators</>}
        description="Practical notes on engineering, performance, and shipping reliable web products."
      />

      <PageSection variant="muted" className="!py-12 md:!py-16" container="wide">
        {featuredPost ? (
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group mb-10 flex flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-elevated-sm transition-interactive hover:border-zinc-300 hover:shadow-elevated md:mb-12 lg:flex-row"
            onClick={() => trackEvent.blogPostView(featuredPost.title)}
          >
            <div className="relative aspect-[16/10] w-full shrink-0 bg-zinc-100 lg:aspect-auto lg:w-3/5 lg:max-w-none lg:min-h-[300px]">
              <Image
                src={featuredPost.image}
                alt={`${featuredPost.title} - ${featuredPost.excerpt}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-6 md:p-10">
              <span className="w-fit rounded-sm bg-primary-700 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
                Featured
              </span>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  {featuredPost.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(featuredPost.publishedAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {featuredPost.readTime}
                </span>
              </div>
              <h2 className="font-display mt-4 text-2xl font-semibold tracking-tight text-zinc-900 transition-interactive group-hover:text-primary-700 md:text-3xl">
                {featuredPost.title}
              </h2>
              <p className="mt-3 line-clamp-4 text-base leading-relaxed text-zinc-600">{featuredPost.excerpt}</p>
              <span className="mt-6 inline-flex items-center text-sm font-semibold text-primary-700">
                Read article
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ) : null}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {gridPosts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm transition-interactive hover:border-zinc-300 hover:shadow-elevated-sm"
              onClick={() => trackEvent.blogPostView(post.title)}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100">
                <Image
                  src={post.image}
                  alt={`${post.title} - ${post.excerpt}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="font-display mt-3 text-lg font-semibold text-zinc-900 transition-interactive group-hover:text-primary-700">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-600">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4">
                  <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-800">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-zinc-500">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 ? (
          <div className="mt-12 flex justify-center gap-3">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 shadow-sm transition-interactive hover:bg-zinc-50 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 shadow-sm transition-interactive hover:bg-zinc-50 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        ) : null}
      </PageSection>

      <MarketingCtaBand
        title="Need hands-on help?"
        description="Turn these ideas into a shipped product—we build and maintain platforms end-to-end."
        primary={{ href: '/contact', label: 'Start your project' }}
        secondary={{ href: '/services', label: 'View services' }}
      />
    </div>
  );
}
