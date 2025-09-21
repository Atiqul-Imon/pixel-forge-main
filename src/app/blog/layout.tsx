import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Development Blog | Pixel Forge BD - Expert Tips & Insights',
  description: 'Expert web development insights, tutorials, and industry trends from Pixel Forge BD. Learn about React, Next.js, e-commerce, and digital marketing strategies.',
  keywords: [
    'web development blog bangladesh',
    'react development tutorials',
    'next.js best practices',
    'e-commerce development guide',
    'digital marketing tips',
    'website design insights',
    'web development trends',
    'programming tutorials bangladesh',
    'tech blog dhaka',
    'web development company blog'
  ],
  openGraph: {
    title: 'Web Development Blog | Pixel Forge BD',
    description: 'Expert web development insights, tutorials, and industry trends from Pixel Forge BD.',
    type: 'website',
    url: 'https://pixelforgebd.com/blog',
  },
  alternates: {
    canonical: 'https://pixelforgebd.com/blog',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
