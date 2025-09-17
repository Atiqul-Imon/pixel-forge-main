export const config = {
  // Database
  mongodbUri: process.env.MONGODB_URI || '',
  
  // Site URLs
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  
  // Environment
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // API URLs
  apiUrl: process.env.NODE_ENV === 'production' 
    ? process.env.NEXT_PUBLIC_SITE_URL 
    : 'http://localhost:3000',
    
  // Contact form settings
  contact: {
    email: 'hello@pixelforge.com',
    phone: '+1 (234) 567-890',
    address: 'Remote Worldwide',
  },
  
  // Social media
  social: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
  
  // Analytics (for production)
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '',
  },
};

export default config;
