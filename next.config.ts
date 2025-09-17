import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000' || 'http://localhost:3001',
  },
  serverExternalPackages: ['mongoose'],
};

export default nextConfig;
