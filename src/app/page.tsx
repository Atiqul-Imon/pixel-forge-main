import type { Metadata } from 'next';
import HomeView from './HomeView';

export const metadata: Metadata = {
  title: 'High-Performance Websites Built to Grow Your Business | Pixel Forge',
  description:
    'Pixel Forge is a modern web development studio that helps businesses build fast, scalable, and conversion-focused digital platforms. We combine strategy, design, and engineering to turn online presence into real business results.',
  keywords: [
    'high-performance websites',
    'scalable digital platforms',
    'engineering-driven web development',
    'technical partnership',
    'next.js development',
  ],
  openGraph: {
    title: 'High-Performance Websites Built to Grow Your Business | Pixel Forge',
    description:
      'Fast, scalable, conversion-focused platforms—strategy, design, and engineering in one partnership.',
    images: ['/logo/pixelforgelogo2.png'],
    url: 'https://pixelforgebd.com',
  },
  alternates: {
    canonical: 'https://pixelforgebd.com',
  },
};

export default function Home() {
  return <HomeView />;
}
