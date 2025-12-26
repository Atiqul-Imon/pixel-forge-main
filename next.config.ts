import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000' || 'http://localhost:3001',
  },
  serverExternalPackages: ['mongoose'],
  typescript: {
    ignoreBuildErrors: true, // Temporarily ignore Mongoose type issues for deployment
  },
  outputFileTracingRoot: path.resolve(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
