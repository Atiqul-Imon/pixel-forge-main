import { getResponsivePortfolioImage } from '@/utils/cloudinary';

export type PortfolioCategory = 'website' | 'landing-page' | 'ecommerce' | 'portfolio';

export type PortfolioProject = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: PortfolioCategory;
  technologies: string[];
  liveUrl: string;
  featured: boolean;
  /** Long-form case study route when present */
  caseSlug?: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: 'Prokrishi Hub - Organic Food E-commerce',
    description:
      'Premium organic food e-commerce platform featuring fresh organic produce, natural products, and healthy food options. Modern e-commerce design with seamless shopping experience, product catalog, and secure payment integration.',
    image: getResponsivePortfolioImage('prokrishihub', 'card'),
    category: 'ecommerce',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'E-commerce', 'Payment Integration', 'Organic Products'],
    liveUrl: 'https://prokrishihub.com/',
    featured: true,
    caseSlug: 'prokrishi-hub',
  },
  {
    id: 2,
    title: 'Scarlet - Beauty & Skincare',
    description:
      'Premium beauty and skincare e-commerce platform featuring K-beauty products, international brands, and comprehensive product catalog with modern design.',
    image: getResponsivePortfolioImage('scarlet', 'card'),
    category: 'ecommerce',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'E-commerce', 'Beauty Platform'],
    liveUrl: 'https://www.scarletunlimited.net/',
    featured: true,
    caseSlug: 'scarlet-beauty',
  },
  {
    id: 3,
    title: 'Shahan Ahmed - Data Analyst Portfolio',
    description:
      'Professional portfolio website for a data analyst showcasing expertise in research, data analysis, BI, and market research with modern design and interactive elements.',
    image: getResponsivePortfolioImage('shahan', 'card'),
    category: 'portfolio',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Portfolio', 'Data Visualization'],
    liveUrl: 'https://www.shahanahmed.com/',
    featured: true,
  },
  {
    id: 4,
    title: "Shantibari - Women's Organization",
    description:
      "Comprehensive organization website for Shantibari, a women's empowerment organization in Bangladesh, featuring services, team profiles, events, and community support programs.",
    image: getResponsivePortfolioImage('shantibari', 'card'),
    category: 'website',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Organization', 'Community Platform'],
    liveUrl: 'https://www.shantibaribd.org/',
    featured: true,
  },
  {
    id: 5,
    title: 'Pixel Forge Website',
    description:
      'Professional agency website showcasing web development services with modern design, SEO optimization, and lead generation features.',
    image: getResponsivePortfolioImage('pixelforge', 'card'),
    category: 'website',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'SEO'],
    liveUrl: 'https://pixelforgebd.com/',
    featured: false,
  },
  {
    id: 6,
    title: 'Maisha Printing - Professional Printing Services',
    description:
      'Professional printing services website featuring comprehensive printing solutions including t-shirt printing, glass printing, calendar printing, ID cards, and more.',
    image: getResponsivePortfolioImage('maishaprinting', 'card'),
    category: 'website',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Printing Services', 'Business Website', 'Service Platform'],
    liveUrl: 'https://maisha-printing.vercel.app/',
    featured: true,
  },
  {
    id: 7,
    title: 'Dr. Sarah Johnson - Medical Practice',
    description:
      'Professional medical practice website for Dr. Sarah Johnson, an Internal Medicine specialist. Features appointment booking, office hours, and patient-centered healthcare services.',
    image: getResponsivePortfolioImage('drsarah', 'card'),
    category: 'website',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Medical Website', 'Healthcare', 'Professional Design'],
    liveUrl: 'https://doctor-website-template.netlify.app/',
    featured: true,
  },
  {
    id: 8,
    title: 'FitLife Pro - Premium Fitness Center',
    description:
      'Modern fitness center landing page featuring premium gym services, membership plans, personal training, group classes, and wellness programs.',
    image: getResponsivePortfolioImage('fitnesspro', 'card'),
    category: 'landing-page',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Fitness Website', 'Landing Page', 'Membership System'],
    liveUrl: 'https://fitnesspro-two.vercel.app/',
    featured: true,
  },
  {
    id: 9,
    title: "Doctor's Tech Solutions - Complete Healthcare Platform",
    description:
      "Comprehensive doctor's tech solutions platform built with Next.js, featuring healthcare management tools, patient management systems, and appointment scheduling.",
    image: getResponsivePortfolioImage('doctorstech', 'card'),
    category: 'website',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Healthcare Technology', 'Medical Platform', 'Patient Management'],
    liveUrl: 'https://doctors-solutions.vercel.app/',
    featured: true,
  },
];

export type CaseStudy = {
  slug: string;
  headline: string;
  subhead: string;
  role: string;
  timeline: string;
  metrics: { label: string; value: string }[];
  highlights: string[];
  liveUrl: string;
  image: string;
  stack: string[];
};

export const caseStudies: Record<string, CaseStudy> = {
  'prokrishi-hub': {
    slug: 'prokrishi-hub',
    headline: 'Prokrishi Hub',
    subhead: 'Organic commerce with a catalog built for growth and trust.',
    role: 'Product engineering & storefront',
    timeline: 'Multi-phase delivery',
    metrics: [
      { label: 'Focus', value: 'Checkout clarity' },
      { label: 'Stack', value: 'Next.js + TS' },
      { label: 'Scope', value: 'Catalog + payments' },
    ],
    highlights: [
      'Structured catalog and navigation for a wide SKU mix',
      'Performance-minded UI for mobile-first shoppers',
      'Integration-ready foundation for payments and fulfillment',
    ],
    liveUrl: 'https://prokrishihub.com/',
    image: getResponsivePortfolioImage('prokrishihub', 'card'),
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'E-commerce'],
  },
  'scarlet-beauty': {
    slug: 'scarlet-beauty',
    headline: 'Scarlet',
    subhead: 'Premium skincare e-commerce with brand-forward presentation.',
    role: 'Platform build & UX',
    timeline: 'Shipped for scale',
    metrics: [
      { label: 'Focus', value: 'Brand + conversion' },
      { label: 'Stack', value: 'Next.js + TS' },
      { label: 'Scope', value: 'Multi-brand catalog' },
    ],
    highlights: [
      'Product storytelling templates reused across categories',
      'Fast, accessible product discovery patterns',
      'Maintainable component structure for seasonal campaigns',
    ],
    liveUrl: 'https://www.scarletunlimited.net/',
    image: getResponsivePortfolioImage('scarlet', 'card'),
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'E-commerce'],
  },
};

export function getFeaturedCaseStudies(): CaseStudy[] {
  return portfolioProjects
    .filter((p) => p.featured && p.caseSlug && caseStudies[p.caseSlug])
    .map((p) => caseStudies[p.caseSlug as string])
    .slice(0, 2);
}
