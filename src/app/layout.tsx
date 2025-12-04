import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import FacebookPixel from "@/components/FacebookPixel";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsent from "@/components/CookieConsent";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import PixelInitializer from "@/components/PixelInitializer";
import { AuthProvider } from "@/contexts/AuthContext";
import { ConsentProvider } from "@/contexts/ConsentContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pixelforgebd.com'),
  title: {
    default: "Pixel Forge - Web Development Agency Bangladesh | Website Design & Digital Marketing",
    template: "%s | Pixel Forge - Web Development Agency Bangladesh"
  },
  description: "We build exceptional websites and digital experiences that drive business growth. From custom web development to digital marketing, we help businesses thrive online. Expert in React, Next.js, MERN stack. Serving Bangladesh and worldwide.",
  keywords: [
    "web development bangladesh",
    "website design dhaka",
    "e-commerce development bangladesh", 
    "digital marketing bangladesh",
    "web design agency dhaka",
    "react development bangladesh",
    "next.js development",
    "mern stack development",
    "landing page design",
    "portfolio website bangladesh",
    "business website design",
    "responsive web design",
    "seo services bangladesh",
    "web development company",
    "custom website development",
    "mobile app development bangladesh",
    "web development services",
    "professional web design",
    "modern website development",
    "affordable web development"
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
    title: "Pixel Forge - Web Development Agency Bangladesh | Website Design & Digital Marketing",
    description: "We build exceptional websites and digital experiences that drive business growth. From custom web development to digital marketing, we help businesses thrive online.",
    images: [
      {
        url: "/logo/pixelforgelogo2.png",
        width: 1200,
        height: 630,
        alt: "Pixel Forge - Web Development Agency Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixel Forge - Web Development Agency Bangladesh",
    description: "We build exceptional websites and digital experiences that drive business growth. From custom web development to digital marketing, we help businesses thrive online.",
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
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <CookieConsent />
            <WhatsAppWidget 
              phoneNumber="+8801714918360"
              message="Hello! I'm interested in your web development services. Can you help me with my project?"
              position="bottom-right"
              showOnMobile={true}
              showOnDesktop={true}
            />
          </AuthProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
