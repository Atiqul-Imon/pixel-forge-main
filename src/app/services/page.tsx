'use client';

import { Code, BarChart3, Settings, CheckCircle, ArrowRight, Zap, Shield, Globe, Star, Target, Rocket, Layers, Smartphone, Monitor, Database, Cloud, Lock, Building2, Search, Palette, FileText } from 'lucide-react';
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
      icon: <Building2 className="w-12 h-12" />,
      title: 'Web Platforms & Digital Infrastructure',
      description: 'Business-critical web platforms engineered to support operations, growth, and long-term evolution. Architecture decisions prioritize stability, performance, and maintainability.',
      features: [
        'Systems designed for growth and traffic variability',
        'Secure, scalable platform architecture',
        'Performance-optimized, SEO-ready foundations'
      ],
      color: 'blue'
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: 'Growth, Performance & Discoverability',
      description: 'Technical and structural optimization ensures platforms are discoverable, fast, and measurable — supporting sustainable organic and paid growth without compromising system integrity.',
      features: [
        'Technical SEO and system-level optimization',
        'Performance benchmarking and improvements',
        'Analytics and measurement readiness'
      ],
      color: 'green'
    },
    {
      icon: <Settings className="w-12 h-12" />,
      title: 'Ongoing Engineering Stewardship',
      description: 'Long-term technical responsibility for platform stability, security, and evolution. Systems remain reliable and adaptable as business requirements change.',
      features: [
        'Continuous monitoring and updates',
        'Performance and security reviews',
        'Structured support and improvement cycles'
      ],
      color: 'orange'
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: 'Data Conversion',
      description: 'Automate data processing work with professional data capture, storage, and searchable document management. Ideal for Government, Banks, NGOs, and Hospitals.',
      features: [
        'Data capture from paper-based documents',
        'Secure and organized data storage',
        'Make your data searchable and accessible',
        'Tailored solutions for Government, Banks, NGOs, Hospitals'
      ],
      color: 'purple'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'Business objectives, system requirements, and constraints are analyzed to define a clear technical direction.',
      icon: <Globe className="w-8 h-8" />
    },
    {
      step: '02',
      title: 'Design & Development',
      description: 'System architecture and interfaces are designed and implemented with scalability, performance, and maintainability in focus.',
      icon: <Code className="w-8 h-8" />
    },
    {
      step: '03',
      title: 'Testing & Optimization',
      description: 'Quality assurance, performance testing, and optimization are applied to ensure stability and usability.',
      icon: <Zap className="w-8 h-8" />
    },
    {
      step: '04',
      title: 'Launch & Ongoing Support',
      description: 'Systems are deployed, monitored, and supported to ensure long-term reliability and continuous improvement.',
      icon: <Shield className="w-8 h-8" />
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          
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
            <div className="absolute top-1/4 left-1/4 text-white/20 text-4xl font-mono animate-float"><Building2 className="w-12 h-12" /></div>
            <div className="absolute top-1/3 right-1/4 text-white/20 text-3xl font-mono animate-float animation-delay-2000"><BarChart3 className="w-10 h-10" /></div>
            <div className="absolute bottom-1/3 left-1/3 text-white/20 text-3xl font-mono animate-float animation-delay-4000"><Settings className="w-10 h-10" /></div>
            <div className="absolute bottom-1/4 right-1/3 text-white/20 text-2xl font-mono animate-float animation-delay-6000"><Code className="w-8 h-8" /></div>
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
                  <div className="absolute top-1 left-1 text-white/80 text-sm animate-bounce">🏗️</div>
                  <div className="absolute top-1 right-1 text-white/80 text-sm animate-bounce animation-delay-1000">📊</div>
                  <div className="absolute bottom-1 left-1 text-white/80 text-sm animate-bounce animation-delay-2000">⚙️</div>
                  <div className="absolute bottom-1 right-1 text-white/80 text-sm animate-bounce animation-delay-3000">💻</div>
                  
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
                Engineering Capabilities
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Digital systems are engineered, maintained, and evolved with long-term performance, scalability, and operational stability in mind.
            </p>

            {/* CTA Buttons */}
            <div className="flex justify-center">
              <Link
                href="/contact"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-blue-500/25"
                onClick={() => trackEvent.ctaClick('Discuss a Project - Services Hero')}
              >
                Discuss a Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid with Glassmorphism */}
      <section className="relative py-24 overflow-hidden glassmorphism-section">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-32 w-3 h-3 bg-blue-300/40 rounded-full animate-pulse animation-delay-1000"></div>
            <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-purple-300/40 rounded-full animate-pulse animation-delay-2000"></div>
            <div className="absolute bottom-20 right-1/4 w-3 h-3 bg-pink-300/40 rounded-full animate-pulse animation-delay-3000"></div>
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-300/40 rounded-full animate-pulse animation-delay-4000"></div>
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-card-float">
              Core Engineering <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">Capabilities</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto glassmorphism-text">
              Each capability represents a layer of a complete digital system — from foundational platform architecture to long-term technical stewardship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative animate-card-entrance"
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                {/* Glassmorphism Card */}
                <div className="glassmorphism-card relative bg-white/15 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/30 hover:border-white/40 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] shadow-2xl hover:shadow-blue-500/20 animate-card-float group-hover:animate-glassmorphism-glow h-full">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 rounded-3xl animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Gradient border effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${
                    service.color === 'blue' ? 'from-blue-500/20 via-cyan-500/20 to-blue-500/20' :
                    service.color === 'purple' ? 'from-purple-500/20 via-pink-500/20 to-purple-500/20' :
                    service.color === 'green' ? 'from-green-500/20 via-emerald-500/20 to-green-500/20' : 'from-orange-500/20 via-red-500/20 to-orange-500/20'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm`}></div>
                  
                  {/* Animated background glow */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${
                    service.color === 'blue' ? 'from-blue-400/10 to-cyan-400/10' :
                    service.color === 'purple' ? 'from-purple-400/10 to-pink-400/10' :
                    service.color === 'green' ? 'from-green-400/10 to-emerald-400/10' : 'from-orange-400/10 to-red-400/10'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Floating particles inside card */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <div className="absolute top-4 left-4 w-1 h-1 bg-white/40 rounded-full animate-pulse animation-delay-1000"></div>
                    <div className="absolute top-8 right-6 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-pulse animation-delay-2000"></div>
                    <div className="absolute bottom-6 left-6 w-1 h-1 bg-purple-300/40 rounded-full animate-pulse animation-delay-3000"></div>
                    <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-pink-300/40 rounded-full animate-pulse animation-delay-4000"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon with enhanced glassmorphism effect */}
                    <div className="relative mb-7">
                      <div className={`w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-white/30 group-hover:animate-icon-pulse`}>
                        <div className={`${
                          service.color === 'blue' ? 'text-blue-300 group-hover:text-blue-200' :
                          service.color === 'purple' ? 'text-purple-300 group-hover:text-purple-200' :
                          service.color === 'green' ? 'text-green-300 group-hover:text-green-200' : 'text-orange-300 group-hover:text-orange-200'
                        } transition-colors duration-300`}>
                          {service.icon}
                        </div>
                      </div>
                      {/* Icon glow effect */}
                      <div className={`absolute inset-0 w-16 h-16 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        service.color === 'blue' ? 'bg-blue-400/20' :
                        service.color === 'purple' ? 'bg-purple-400/20' :
                        service.color === 'green' ? 'bg-green-400/20' : 'bg-orange-400/20'
                      }`}></div>
                      {/* Icon border glow */}
                      <div className={`absolute inset-0 w-16 h-16 rounded-2xl border opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        service.color === 'blue' ? 'border-blue-400/30' :
                        service.color === 'purple' ? 'border-purple-400/30' :
                        service.color === 'green' ? 'border-green-400/30' : 'border-orange-400/30'
                      }`}></div>
                    </div>

                    {/* Title with glassmorphism text effect */}
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-5 leading-tight group-hover:text-blue-50 transition-colors duration-300 drop-shadow-sm">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-base md:text-lg text-gray-50 mb-8 leading-relaxed group-hover:text-white transition-colors duration-300 drop-shadow-sm">
                      {service.description}
                    </p>

                    {/* Features section */}
                    <div className="mb-8">
                      <ul className="space-y-4">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start text-gray-50 group-hover:text-white transition-colors duration-300 group/item">
                            <div className="w-6 h-6 bg-green-400/30 backdrop-blur-sm rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-green-400/40 group-hover/item:bg-green-400/40 group-hover/item:scale-110 transition-all duration-300 mt-0.5">
                              <CheckCircle className="w-4 h-4 text-green-300 group-hover/item:text-green-200 transition-colors duration-300" />
                            </div>
                            <span className="text-base leading-relaxed group-hover/item:translate-x-1 transition-transform duration-300 drop-shadow-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Hover effect overlay with gradient */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Corner accent */}
                  <div className={`absolute top-4 right-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    service.color === 'blue' ? 'bg-gradient-to-br from-blue-400 to-cyan-400' :
                    service.color === 'purple' ? 'bg-gradient-to-br from-purple-400 to-pink-400' :
                    service.color === 'green' ? 'bg-gradient-to-br from-green-400 to-emerald-400' : 'bg-gradient-to-br from-orange-400 to-red-400'
                  }`}></div>
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
              Engineering <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Approach</span>
            </h2>
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
              Looking for a Long-Term <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Technical Partner?</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Start a technical conversation about your platform or product.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link
                href="/contact"
                className="group bg-white text-slate-900 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-white/25 hover:scale-105"
                onClick={() => trackEvent.ctaClick('Discuss a Project - Services CTA')}
              >
                Discuss a Project
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white/30 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm hover:scale-105"
                onClick={() => trackEvent.ctaClick('Start a Conversation - Services CTA')}
              >
                Start a Conversation
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

