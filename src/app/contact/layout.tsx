import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Pixel Forge | Web Development Agency Bangladesh',
  description: 'Get in touch with Pixel Forge for web development services in Bangladesh. WhatsApp: +8801714918360. Professional websites, e-commerce, and digital marketing solutions.',
  keywords: [
    'contact web development bangladesh',
    'web development agency dhaka',
    'website design contact',
    'pixel forge bd contact',
    'web development services bangladesh',
    'custom website development contact'
  ],
  openGraph: {
    title: 'Contact Pixel Forge | Web Development Agency Bangladesh',
    description: 'Get in touch with Pixel Forge for web development services in Bangladesh.',
    type: 'website',
    url: 'https://pixelforgebd.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
