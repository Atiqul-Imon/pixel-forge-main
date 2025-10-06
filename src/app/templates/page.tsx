'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Eye, 
  ShoppingCart, 
  Star, 
  Download, 
  Palette, 
  Code, 
  Smartphone, 
  Globe,
  CheckCircle,
  ArrowRight,
  Filter,
  X,
  ExternalLink,
  Zap,
  Shield,
  Headphones
} from 'lucide-react';

// Template data
const templateCategories = [
  { id: 'all', name: 'All Templates', count: 1 },
  { id: 'business', name: 'Business', count: 1 },
  { id: 'ecommerce', name: 'E-commerce', count: 0 },
  { id: 'portfolio', name: 'Portfolio', count: 0 },
  { id: 'landing', name: 'Landing Pages', count: 0 }
];

const templates = [
  {
    id: 'medical-practice-pro',
    name: 'Medical Practice Pro',
    category: 'business',
    price: 5000,
    originalPrice: 5000,
    rating: 0,
    sales: 0,
    image: 'https://res.cloudinary.com/db5yniogx/image/upload/v1759493107/doctorwebsitefullpage_n8bx3k.webp',
    demo: 'https://doctor-website-cp9k.vercel.app/',
    features: [
      'Appointment Booking System',
      'Doctor Profile & Credentials',
      'Service Information Pages',
      'Patient Testimonials',
      'Contact Forms & Location',
      'Professional Medical Design',
      'Mobile Responsive Layout',
      'SEO Optimized Structure',
      'Trust & Security Elements',
      'Emergency Contact Info'
    ],
    tags: ['Medical', 'Healthcare', 'Doctor', 'Clinic', 'Professional'],
    description: 'Professional medical practice website template perfect for doctors, clinics, and healthcare providers. Features patient testimonials, service information, appointment booking, and comprehensive healthcare information with modern, trustworthy design.'
  }
];

const customizationServices = [
  {
    name: 'Basic Customization',
    price: '৳5,000',
    features: [
      'Logo Integration',
      'Color Scheme Change',
      'Content Updates',
      'Basic SEO Setup',
      'Contact Form Setup',
      '2 Revisions Included'
    ]
  },
  {
    name: 'Advanced Customization',
    price: '৳10,000',
    features: [
      'Complete Design Overhaul',
      'Custom Features Development',
      'Advanced SEO Optimization',
      'Performance Optimization',
      'Mobile App Integration',
      '5 Revisions Included'
    ]
  },
  {
    name: 'Premium Customization',
    price: '৳20,000',
    features: [
      'Fully Custom Design',
      'Advanced Functionality',
      'Database Integration',
      'API Development',
      'Third-party Integrations',
      'Unlimited Revisions'
    ]
  }
];

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const openPreview = (template) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
    setSelectedTemplate(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium mb-4">
              🎨 Professional Website Templates
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Premium Website Templates
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Ready to Launch
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Choose from our collection of professionally designed, fully responsive website templates. 
              Perfect for businesses, portfolios, e-commerce, and more. Customize and launch in days!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="#templates"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform"
            >
              Browse Templates
            </Link>
            <Link
              href="#customization"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 shadow-2xl hover:shadow-white/10 hover:scale-105 transform backdrop-blur-sm"
            >
              Customization Services
            </Link>
          </div>

        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {templateCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section id="templates" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Template Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={template.image}
                    alt={`${template.name} - Professional website template for ${template.category} businesses`}
                    width={400}
                    height={256}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-3">
                      <button
                        onClick={() => openPreview(template)}
                        className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                      <a
                        href={template.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white">{template.name}</h3>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {template.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-2">Key Features:</div>
                    <div className="flex flex-wrap gap-1">
                      {template.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs text-gray-300 bg-white/5 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                      {template.features.length > 3 && (
                        <span className="text-xs text-gray-400">
                          +{template.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-white">৳{template.price.toLocaleString()}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openPreview(template)}
                        className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <a
                        href="https://wa.me/8801714918360?text=Hello! I'm interested in purchasing the Medical Practice Pro template for ৳5,000. Can you help me with the purchase?"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Buy Now
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customization Services */}
      <section id="customization" className="py-16 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Template Customization Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Need your template customized? We offer professional customization services 
              to make your template unique and perfectly suited to your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {customizationServices.map((service, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Palette className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                  <div className="text-3xl font-bold text-blue-400">{service.price}</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Templates */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose Our Templates?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our templates are designed with modern web standards, performance, and user experience in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Fast Loading</h3>
              <p className="text-gray-300">Optimized for speed and performance</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Mobile Responsive</h3>
              <p className="text-gray-300">Perfect on all devices and screen sizes</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Clean Code</h3>
              <p className="text-gray-300">Well-structured and documented code</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">SEO Ready</h3>
              <p className="text-gray-300">Optimized for search engines</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Launch Your Website?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Choose a template, customize it to your needs, and launch your professional website in days!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#templates"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform"
            >
              Browse All Templates
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 shadow-2xl hover:shadow-white/10 hover:scale-105 transform backdrop-blur-sm"
            >
              Need Custom Design?
            </Link>
          </div>
        </div>
      </section>

      {/* Template Preview Modal */}
      {showPreview && selectedTemplate && (
        <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-2">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 max-w-7xl w-full max-h-[95vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <h3 className="text-xl font-bold text-white">{selectedTemplate.name} - Preview</h3>
              <button
                onClick={closePreview}
                className="text-white/70 hover:text-white transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6 max-h-[500px] overflow-auto border border-white/20 rounded-lg">
                <Image
                  src={selectedTemplate.image}
                  alt={`${selectedTemplate.name} - Full preview of professional website template`}
                  width={1200}
                  height={800}
                  className="w-full object-contain rounded-lg"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Template Details</h4>
                  <p className="text-gray-300 mb-4">{selectedTemplate.description}</p>
                  
                  <div className="mb-4">
                    <h5 className="text-white font-medium mb-2">Features:</h5>
                    <ul className="space-y-1">
                      {selectedTemplate.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-300 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Pricing & Info</h4>
                  <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <div className="text-2xl font-bold text-white mb-1">৳{selectedTemplate.price.toLocaleString()}</div>
                  </div>
                  
                  <div className="space-y-3">
                    <a
                      href={selectedTemplate.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live Demo
                    </a>
                    <a
                      href="https://wa.me/8801714918360?text=Hello! I'm interested in purchasing the Medical Practice Pro template for ৳5,000. Can you help me with the purchase?"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Buy Now - ৳{selectedTemplate.price.toLocaleString()}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
