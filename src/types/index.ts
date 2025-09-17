export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
}

export interface PortfolioItem {
  _id?: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: 'website' | 'landing-page' | 'ecommerce' | 'portfolio';
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt?: Date;
}

export interface Service {
  _id?: string;
  title: string;
  description: string;
  features: string[];
  price?: string;
  icon: string;
  category: 'development' | 'marketing' | 'design' | 'support';
}

