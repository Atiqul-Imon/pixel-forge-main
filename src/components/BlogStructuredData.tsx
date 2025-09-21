import Script from 'next/script';

interface BlogStructuredDataProps {
  posts?: Array<{
    title: string;
    slug: string;
    excerpt: string;
    publishedAt: string;
    author: string;
    image: string;
    category: string;
  }>;
}

const BlogStructuredData = ({ posts = [] }: BlogStructuredDataProps) => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pixel Forge BD",
    "url": "https://pixelforgebd.com",
    "logo": "https://pixelforgebd.com/logo/pixelforgelogo2.png",
    "description": "We build exceptional websites and digital experiences that drive business growth. From custom web development to digital marketing, we help businesses thrive online.",
    "sameAs": [
      "https://www.facebook.com/pixelforge.official"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Pixel Forge BD Blog",
    "url": "https://pixelforgebd.com/blog",
    "description": "Expert web development insights, tutorials, and industry trends from Pixel Forge BD. Learn about React, Next.js, e-commerce, and digital marketing strategies.",
    "publisher": {
      "@type": "Organization",
      "name": "Pixel Forge BD"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://pixelforgebd.com/blog?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Pixel Forge BD Blog",
    "url": "https://pixelforgebd.com/blog",
    "description": "Expert web development insights, tutorials, and industry trends from Pixel Forge BD.",
    "publisher": {
      "@type": "Organization",
      "name": "Pixel Forge BD",
      "url": "https://pixelforgebd.com"
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "url": `https://pixelforgebd.com/blog/${post.slug}`,
      "description": post.excerpt,
      "datePublished": post.publishedAt,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Pixel Forge BD"
      },
      "image": post.image,
      "articleSection": post.category
    }))
  };

  const breadcrumbSchema = {
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
      }
    ]
  };

  return (
    <>
      <Script
        id="organization-schema-blog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="website-schema-blog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <Script
        id="breadcrumb-schema-blog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
};

export default BlogStructuredData;
