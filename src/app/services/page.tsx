'use client';

import { Code, Palette, BarChart3, Headphones, CheckCircle, ArrowRight, Zap, Shield, Globe, Star, Target, Rocket, Layers, Smartphone, Monitor, Database, Cloud, Lock } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { trackEvent } from '@/lib/gtag';


export default function ServicesPage() {
  useEffect(() => {
    // Track services page view
    trackEvent.servicePageView('Services');
  }, []);

  const services = [
    {
      icon: <Code className="w-12 h-12" />,
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies and best practices.',
      features: [
        'Custom Website Development',
        'E-commerce Solutions',
        'Web Applications',
        'API Development',
        'Database Design',
        'Third-party Integrations'
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'PostgreSQL', 'TypeScript'],
      color: 'blue'
    },
    {
      icon: <Palette className="w-12 h-12" />,
      title: 'Landing Pages',
      description: 'High-converting landing pages designed to maximize your business growth and lead generation.',
      features: [
        'Conversion-Optimized Design',
        'A/B Testing Setup',
        'Mobile-First Approach',
        'Fast Loading Times',
        'SEO Optimization',
        'Analytics Integration'
      ],
      technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Google Analytics', 'Hotjar'],
      color: 'purple'
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies to boost your online presence and drive growth.',
      features: [
        'SEO & SEM Campaigns',
        'Social Media Management',
        'Content Marketing',
        'Email Marketing',
        'PPC Advertising',
        'Analytics & Reporting'
      ],
      technologies: ['Google Ads', 'Facebook Ads', 'Google Analytics', 'SEMrush', 'Mailchimp'],
      color: 'green'
    },
    {
      icon: <Headphones className="w-12 h-12" />,
      title: 'Support & Maintenance',
      description: 'Ongoing support and maintenance to keep your website running smoothly and securely.',
      features: [
        '24/7 Technical Support',
        'Regular Security Updates',
        'Performance Monitoring',
        'Backup & Recovery',
        'Content Updates',
        'Bug Fixes & Improvements'
      ],
      technologies: ['Monitoring Tools', 'Security Scanners', 'CDN Management', 'SSL Certificates'],
      color: 'orange'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We start by understanding your business goals, target audience, and project requirements.',
      icon: <Globe className="w-8 h-8" />
    },
    {
      step: '02',
      title: 'Design & Development',
      description: 'Our team creates stunning designs and develops your project using modern technologies.',
      icon: <Code className="w-8 h-8" />
    },
    {
      step: '03',
      title: 'Testing & Optimization',
      description: 'We thoroughly test your project and optimize it for performance and user experience.',
      icon: <Zap className="w-8 h-8" />
    },
    {
      step: '04',
      title: 'Launch & Support',
      description: 'We launch your project and provide ongoing support to ensure continued success.',
      icon: <Shield className="w-8 h-8" />
    }
  ];

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

          {/* Floating service elements */}
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
            {/* Services Visual */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white/10 backdrop-blur-md rounded-2xl mb-6 shadow-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="relative w-full h-full">
                  {/* Central Services Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white/90 text-3xl sm:text-4xl font-bold group-hover:scale-110 transition-transform duration-300">
                      ⚙️
                    </div>
                  </div>
                  
                  {/* Floating Service Elements */}
                  <div className="absolute top-1 left-1 text-white/80 text-sm animate-bounce">💻</div>
                  <div className="absolute top-1 right-1 text-white/80 text-sm animate-bounce animation-delay-1000">🎨</div>
                  <div className="absolute bottom-1 left-1 text-white/80 text-sm animate-bounce animation-delay-2000">📊</div>
                  <div className="absolute bottom-1 right-1 text-white/80 text-sm animate-bounce animation-delay-3000">🔧</div>
                  
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
                Our Services
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Comprehensive digital solutions designed to accelerate your business growth and success. 
              From cutting-edge web development to strategic digital marketing, we&apos;re your partners in digital transformation.
            </p>


            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-blue-500/25"
                onClick={() => trackEvent.ctaClick('Get Started - Services Hero')}
              >
                Get Free Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/portfolio"
                className="border-2 border-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Offer</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  service.color === 'blue' ? 'from-blue-50 to-cyan-50' :
                  service.color === 'purple' ? 'from-purple-50 to-pink-50' :
                  service.color === 'green' ? 'from-green-50 to-emerald-50' : 'from-orange-50 to-red-50'
                } opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}></div>
                
                {/* Icon */}
                <div className={`relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${
                  service.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                  service.color === 'purple' ? 'from-purple-500 to-pink-500' :
                  service.color === 'green' ? 'from-green-500 to-emerald-500' : 'from-orange-500 to-red-500'
                } text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">What&apos;s Included:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center">
                  <Link
                    href="/contact"
                    className={`group bg-gradient-to-r ${
                      service.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                      service.color === 'purple' ? 'from-purple-500 to-pink-500' :
                      service.color === 'green' ? 'from-green-500 to-emerald-500' : 'from-orange-500 to-red-500'
                    } text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center hover:shadow-lg hover:scale-105 relative z-10`}
                    onClick={(e) => {
                      console.log('Get Started button clicked for:', service.title);
                      trackEvent.ctaClick(`Get Quote - ${service.title}`);
                    }}
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that ensures your project is delivered on time, within budget, and exceeds expectations
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <div key={index} className="relative text-center group">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 rounded-full flex items-center justify-center text-lg font-bold shadow-md">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Digital Presence?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join successful businesses who trust us with their digital transformation. 
              Let&apos;s create something extraordinary together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link
                href="/contact"
                className="group bg-white text-slate-900 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-white/25 hover:scale-105"
                onClick={() => trackEvent.ctaClick('Get Free Quote - Services CTA')}
              >
                Get Free Consultation
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/portfolio"
                className="border-2 border-white/30 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm hover:scale-105"
              >
                View Our Portfolio
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

