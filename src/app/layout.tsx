import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import FacebookPixel from "@/components/FacebookPixel";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PixelInitializer from "@/components/PixelInitializer";
import ConditionalLayout from "@/components/ConditionalLayout";
import { AuthProvider } from "@/contexts/AuthContext";
import { ConsentProvider } from "@/contexts/ConsentContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pixelforgebd.com'),
  title: {
    default: "Pixel Forge - Engineering-Driven Technology Studio | Digital Platform Engineering & Infrastructure",
    template: "%s | Pixel Forge - Engineering-Driven Technology Studio"
  },
  description: "An engineering-driven technology studio focused on building reliable, scalable digital platforms and long-term technical partnerships. Digital systems are treated as infrastructure — designed to perform, evolve, and endure. Expert in React, Next.js, system architecture, and performance optimization. Serving Bangladesh and worldwide.",
  keywords: [
    "engineering technology studio",
    "digital platform engineering",
    "scalable web infrastructure",
    "technical partnership",
    "system architecture bangladesh",
    "performance optimization",
    "react server components",
    "next.js engineering",
    "web platform development",
    "digital infrastructure",
    "mvp engineering",
    "technical seo optimization",
    "engineering stewardship",
    "long-term technical partnership",
    "scalable system design",
    "production-grade web platforms",
    "engineering-driven development",
    "technical excellence",
    "system reliability",
    "operational stability"
  ],
  authors: [{ name: "Pixel Forge", url: "https://pixelforgebd.com" }],
  creator: "Pixel Forge",
  publisher: "Pixel Forge",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo/pixelforgefavicon.png", sizes: "32x32", type: "image/png" }
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: "https://pixelforgebd.com",
    siteName: "Pixel Forge",
    title: "Pixel Forge - Engineering-Driven Technology Studio | Digital Platform Engineering & Infrastructure",
    description: "An engineering-driven technology studio focused on building reliable, scalable digital platforms and long-term technical partnerships. Digital systems are treated as infrastructure — designed to perform, evolve, and endure.",
    images: [
      {
        url: "/logo/pixelforgelogo2.png",
        width: 1200,
        height: 630,
        alt: "Pixel Forge - Engineering-Driven Technology Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixel Forge - Engineering-Driven Technology Studio",
    description: "An engineering-driven technology studio focused on building reliable, scalable digital platforms and long-term technical partnerships.",
    images: ["/logo/pixelforgelogo2.png"],
    creator: "@pixelforge",
  },
  // Removed canonical from root layout - each page should define its own canonical URL
  // This prevents all pages from being treated as alternate pages of the homepage
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="en" className={inter.variable}>
          <head>
            <StructuredData />
          </head>
      <body className="font-sans antialiased">
        <ConsentProvider>
          <AuthProvider>
            <PixelInitializer />
            <FacebookPixel pixelId={process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || 'YOUR_PIXEL_ID'} />
            <GoogleAnalytics />
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </AuthProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
