import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pixel Forge BD - Web Development Agency Bangladesh",
  description: "Professional web development, e-commerce solutions, and digital marketing services in Bangladesh. We build high-quality websites for businesses and personal portfolios.",
  keywords: "web development bangladesh, e-commerce development, digital marketing, website design dhaka, portfolio, business websites, MERN stack, Next.js",
  authors: [{ name: "Pixel Forge BD" }],
  icons: {
    icon: [
      { url: "/logo/pixelforgefavicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: { url: "/logo/pixelforgefavicon.png", sizes: "180x180", type: "image/png" },
  },
  openGraph: {
    title: "Pixel Forge BD - Web Development Agency Bangladesh",
    description: "Professional web development, e-commerce solutions, and digital marketing services in Bangladesh.",
    type: "website",
    images: [
      {
        url: "/logo/pixelforgelogo2.png",
        width: 1200,
        height: 630,
        alt: "Pixel Forge Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
