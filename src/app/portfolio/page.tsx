'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Filter, ArrowRight, Code, Palette, BarChart3, Headphones, CheckCircle, Target, Rocket, Layers, Smartphone, Monitor, Database, Cloud, Lock, Globe, Zap, Shield } from 'lucide-react';
import Link from 'next/link';
import { trackEvent } from '@/lib/gtag';

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'website', name: 'Websites' },
    { id: 'landing-page', name: 'Landing Pages' },
    { id: 'ecommerce', name: 'E-commerce' },
    { id: 'portfolio', name: 'Portfolios' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Arizaan - Premium Modest Fashion',
      description: 'A beautiful e-commerce website for premium modest fashion brand featuring elegant kurtis and modern design. Built with Next.js and integrated with payment systems.',
      image: 'https://www.arizaan.com/og-image.jpg',
      category: 'ecommerce',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'E-commerce', 'Payment Integration'],
      liveUrl: 'https://www.arizaan.com/',
      featured: true
    },
    {
      id: 2,
      title: 'Scarlet - Beauty & Skincare',
      description: 'Premium beauty and skincare e-commerce platform featuring K-beauty products, international brands, and comprehensive product catalog with modern design.',
      image: 'https://scarlet-frontend.vercel.app/og-image.jpg',
      category: 'ecommerce',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'E-commerce', 'Beauty Platform'],
      liveUrl: 'https://scarlet-frontend.vercel.app/',
      featured: true
    },
    {
      id: 3,
      title: 'Shahan Ahmed - Data Analyst Portfolio',
      description: 'Professional portfolio website for a data analyst showcasing expertise in research, data analysis, BI, and market research with modern design and interactive elements.',
      image: 'https://www.shahanahmed.com/og-image.jpg',
      category: 'portfolio',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Portfolio', 'Data Visualization'],
      liveUrl: 'https://www.shahanahmed.com/',
      featured: true
    },
    {
      id: 4,
      title: 'Shantibari - Women\'s Organization',
      description: 'Comprehensive organization website for Shantibari, a women\'s empowerment organization in Bangladesh, featuring services, team profiles, events, and community support programs.',
      image: 'https://www.shantibaribd.org/og-image.jpg',
      category: 'website',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Organization', 'Community Platform'],
      liveUrl: 'https://www.shantibaribd.org/',
      featured: true
    },
    {
      id: 5,
      title: 'News and Niche - Technology & News Blog',
      description: 'Comprehensive news and technology blog platform featuring trending topics, AI & automation, web development, and lifestyle content. Multi-category blog with featured posts, recent posts, and popular content sections.',
      image: 'https://www.newsandniche.com/og-image.jpg',
      category: 'website',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Blog Platform', 'Content Management', 'SEO'],
      liveUrl: 'https://www.newsandniche.com/en',
      featured: true
    },
    {
      id: 6,
      title: 'Pixel Forge Website',
      description: 'Professional agency website showcasing web development services with modern design, SEO optimization, and lead generation features.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      category: 'website',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'SEO'],
      liveUrl: 'https://pixelforgebd.com/',
      featured: false
    },
    {
      id: 7,
      title: 'MERN E-commerce Platform',
      description: 'Full-stack e-commerce solution with user authentication, product management, shopping cart, and payment integration.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      category: 'ecommerce',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
      liveUrl: '#',
      featured: false
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    // Track portfolio page view
    trackEvent.servicePageView('Portfolio');
  }, []);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-16 flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {/* Animated gradient orbs */}
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          
          {/* Geometric patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-20 w-3 h-3 bg-blue-400 rounded-full animate-pulse animation-delay-1000"></div>
            <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-2000"></div>
            <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-pink-400 rounded-full animate-pulse animation-delay-3000"></div>
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-yellow-400 rounded-full animate-pulse animation-delay-4000"></div>
          </div>

          {/* Floating portfolio elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 text-white/20 text-4xl font-mono animate-float"><Code className="w-12 h-12" /></div>
            <div className="absolute top-1/3 right-1/4 text-white/20 text-3xl font-mono animate-float animation-delay-2000"><Palette className="w-10 h-10" /></div>
            <div className="absolute bottom-1/3 left-1/3 text-white/20 text-3xl font-mono animate-float animation-delay-4000"><BarChart3 className="w-10 h-10" /></div>
            <div className="absolute bottom-1/4 right-1/3 text-white/20 text-2xl font-mono animate-float animation-delay-6000"><Headphones className="w-8 h-8" /></div>
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10">
          <div className="text-center">
            {/* Portfolio Visual */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white/10 backdrop-blur-md rounded-2xl mb-6 shadow-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="relative w-full h-full">
                  {/* Central Portfolio Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white/90 text-3xl sm:text-4xl font-bold group-hover:scale-110 transition-transform duration-300">
                      🎨
                    </div>
                  </div>
                  
                  {/* Floating Project Elements */}
                  <div className="absolute top-1 left-1 text-white/80 text-sm animate-bounce">💻</div>
                  <div className="absolute top-1 right-1 text-white/80 text-sm animate-bounce animation-delay-1000">🛒</div>
                  <div className="absolute bottom-1 left-1 text-white/80 text-sm animate-bounce animation-delay-2000">📱</div>
                  <div className="absolute bottom-1 right-1 text-white/80 text-sm animate-bounce animation-delay-3000">⚡</div>
                  
                  {/* Corner Success Indicators */}
                  <div className="absolute top-0 left-0 w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-0 right-0 w-1 h-1 bg-blue-400 rounded-full animate-pulse animation-delay-1000"></div>
                  <div className="absolute bottom-0 left-0 w-1 h-1 bg-purple-400 rounded-full animate-pulse animation-delay-2000"></div>
                  <div className="absolute bottom-0 right-0 w-1 h-1 bg-orange-400 rounded-full animate-pulse animation-delay-3000"></div>
                </div>
              </div>
            </div>

            {/* Main heading with enhanced styling */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent animate-gradient">
                Our Portfolio
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Explore our collection of successful projects and see how we&apos;ve helped businesses 
              achieve their digital goals through innovative web solutions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-blue-500/25"
                onClick={() => trackEvent.ctaClick('Get Started - Portfolio Hero')}
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/services"
                className="border-2 border-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* All Projects with Filter */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center ${
                    activeFilter === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200"
              >
                <div className="relative overflow-hidden">
                  <div className="w-full h-56 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
                    {project.image && project.image.startsWith('http') ? (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    <div className={`text-6xl font-bold text-gray-300 ${project.image && project.image.startsWith('http') ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
                      {project.title.charAt(0)}
                    </div>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
                    <div className="flex gap-2">
                      {project.liveUrl && project.liveUrl !== '#' && (
                        <a
                          href={project.liveUrl}
                          className="bg-white text-gray-900 px-3 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center gap-1 text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            trackEvent.portfolioProjectClick(project.title);
                            if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).trackPortfolioView) {
                              ((window as unknown as Record<string, unknown>).trackPortfolioView as (projectName: string) => void)(project.title);
                            }
                          }}
                        >
                          <ExternalLink className="w-3 h-3" />
                          Live
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-lg text-xs font-medium capitalize">
                      {project.category.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 rounded-lg text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Project Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      Completed
                    </div>
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                        onClick={() => trackEvent.portfolioProjectClick(project.title)}
                      >
                        Visit
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Create Something
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Amazing?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Let&apos;s work together to bring your vision to life. 
              We&apos;re excited to help you achieve your digital goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link
                href="/contact"
                className="group bg-white text-slate-900 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-white/25 hover:scale-105"
                onClick={() => trackEvent.ctaClick('Start Your Project - Portfolio CTA')}
              >
                Start Your Project
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/services"
                className="border-2 border-white/30 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm hover:scale-105"
              >
                View Our Services
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm">100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">Quality Assured</span>
              </div>
              <div className="flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                <span className="text-sm">Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

