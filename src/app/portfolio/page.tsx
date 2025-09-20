'use client';

import { useState } from 'react';
import { ExternalLink, Filter, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
      title: 'FitnessHub Landing Page',
      description: 'High-converting landing page for a fitness app with optimized conversion rates and mobile-first design.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      category: 'landing-page',
      technologies: ['React', 'Tailwind CSS', 'A/B Testing'],
      liveUrl: '#',
      featured: false
    },
    {
      id: 4,
      title: 'Pixel Forge Website',
      description: 'Professional agency website showcasing web development services with modern design, SEO optimization, and lead generation features.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      category: 'website',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'SEO'],
      liveUrl: 'https://pixelforgebd.com/',
      featured: true
    },
    {
      id: 5,
      title: 'MERN E-commerce Platform',
      description: 'Full-stack e-commerce solution with user authentication, product management, shopping cart, and payment integration.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      category: 'ecommerce',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
      liveUrl: '#',
      featured: false
    },
    {
      id: 6,
      title: 'Next.js Organization Site',
      description: 'Modern corporate website with dynamic content management, team profiles, and event scheduling features.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
      category: 'website',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'CMS'],
      liveUrl: '#',
      featured: false
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore our collection of successful projects and see how we&apos;ve helped businesses 
              achieve their digital goals through innovative web solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Some of our most successful and innovative projects
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {featuredProjects.slice(0, 2).map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    {project.image && project.image.startsWith('http') ? (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
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
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors duration-200"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {project.liveUrl && project.liveUrl !== '#' ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors duration-200"
                      >
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects with Filter */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Browse through all our projects by category
            </p>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center ${
                    activeFilter === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
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
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    {project.image && project.image.startsWith('http') ? (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    <div className={`text-4xl font-bold text-gray-400 ${project.image && project.image.startsWith('http') ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
                      {project.title.charAt(0)}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {project.liveUrl && project.liveUrl !== '#' ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors duration-200"
                      >
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let&apos;s work together to bring your vision to life. 
              We&apos;re excited to help you achieve your digital goals.
            </p>
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center group"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

