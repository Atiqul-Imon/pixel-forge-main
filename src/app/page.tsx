import Link from 'next/link';
import { ArrowRight, Code, Palette, BarChart3, Headphones, Star, CheckCircle, Store, ShoppingCart, Building2, Zap } from 'lucide-react';
import InteractiveButton from '@/components/InteractiveButton';

export default function Home() {
  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies',
      features: ['React/Next.js', 'Node.js', 'MongoDB', 'Responsive Design']
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Landing Pages',
      description: 'High-converting landing pages that drive business growth',
      features: ['A/B Testing', 'SEO Optimized', 'Fast Loading', 'Mobile First']
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies to boost your online presence',
      features: ['SEO/SEM', 'Social Media', 'Content Marketing', 'Analytics']
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: 'Support & Maintenance',
      description: 'Ongoing support and maintenance to keep your website running smoothly',
      features: ['24/7 Support', 'Regular Updates', 'Security Monitoring', 'Performance Optimization']
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

          {/* Floating code elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 text-white/20 text-6xl font-mono animate-float">{"</>"}</div>
            <div className="absolute top-1/3 right-1/4 text-white/20 text-4xl font-mono animate-float animation-delay-2000">{"{}"}</div>
            <div className="absolute bottom-1/3 left-1/3 text-white/20 text-5xl font-mono animate-float animation-delay-4000">{"[]"}</div>
            <div className="absolute bottom-1/4 right-1/3 text-white/20 text-3xl font-mono animate-float animation-delay-6000">{"()"}</div>
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="text-center">
            {/* Success Growth Visual */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 bg-white/10 backdrop-blur-md rounded-3xl mb-6 shadow-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="relative w-full h-full">
                  {/* Central Growth Arrow */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white/90 text-4xl sm:text-5xl font-bold group-hover:scale-110 transition-transform duration-300">
                      📈
                    </div>
                  </div>
                  
                  {/* Floating Success Elements */}
                  <div className="absolute top-2 left-2 text-white/80 text-lg animate-bounce">💼</div>
                  <div className="absolute top-2 right-2 text-white/80 text-lg animate-bounce animation-delay-1000">🌐</div>
                  <div className="absolute bottom-2 left-2 text-white/80 text-lg animate-bounce animation-delay-2000">💰</div>
                  <div className="absolute bottom-2 right-2 text-white/80 text-lg animate-bounce animation-delay-3000">🚀</div>
                  
                  {/* Corner Success Indicators */}
                  <div className="absolute top-1 left-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-1 right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-1000"></div>
                  <div className="absolute bottom-1 left-1 w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-2000"></div>
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse animation-delay-3000"></div>
                </div>
              </div>
            </div>

            {/* Main heading with enhanced styling */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent animate-gradient">
                Pixel Forge
              </span>
            </h1>

            {/* Subtitle with better contrast */}
            <h2 className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
              We build exceptional websites and digital experiences that drive business growth. From custom web development to digital marketing, we help businesses thrive online.
            </h2>

            {/* CTA Button with enhanced styling */}
            <div className="flex justify-center mb-12">
              <InteractiveButton
                href="/contact"
                trackEvent="serviceInterest"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center group shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </InteractiveButton>
            </div>

            {/* Features with enhanced styling */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-300">
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                Free Consultation
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                24/7 Support
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                Modern Tech
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>


      {/* Services Section with Glassmorphism */}
      <section className="relative py-20 overflow-hidden glassmorphism-section">
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
              Professional <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">Web Development Services</span> in Bangladesh
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto glassmorphism-text">
              Expert web development, e-commerce solutions, and digital marketing services in Dhaka, Chittagong, and across Bangladesh. We help businesses establish a strong online presence with modern, responsive websites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative animate-card-entrance"
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                {/* Glassmorphism Card */}
                <div className="glassmorphism-card relative bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 hover:border-white/30 transition-all duration-500 hover:-translate-y-2 hover:scale-105 shadow-2xl hover:shadow-blue-500/20 animate-card-float group-hover:animate-glassmorphism-glow">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 rounded-3xl animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
                  
                  {/* Animated background glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
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
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-white/30 group-hover:animate-icon-pulse">
                        <div className="text-blue-300 group-hover:text-blue-200 transition-colors duration-300">
                          {service.icon}
                        </div>
                      </div>
                      {/* Icon glow effect */}
                      <div className="absolute inset-0 w-16 h-16 bg-blue-400/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {/* Icon border glow */}
                      <div className="absolute inset-0 w-16 h-16 rounded-2xl border border-blue-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Title with glassmorphism text effect */}
                    <h3 className="text-xl font-semibold glassmorphism-text mb-3 group-hover:text-blue-100 transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {service.description}
                    </p>

                    {/* Features list with enhanced styling */}
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300 group/item">
                          <div className="w-5 h-5 bg-green-400/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-3 flex-shrink-0 border border-green-400/30 group-hover/item:bg-green-400/30 group-hover/item:scale-110 transition-all duration-300">
                            <CheckCircle className="w-3 h-3 text-green-400 group-hover/item:text-green-300 transition-colors duration-300" />
                          </div>
                          <span className="group-hover/item:translate-x-1 transition-transform duration-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Hover effect overlay with gradient */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Corner accent */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POS System Advertisement Section */}
      <section className="relative py-20 overflow-hidden glassmorphism-section">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-32 w-3 h-3 bg-blue-300/50 rounded-full animate-pulse animation-delay-1000"></div>
            <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-purple-300/50 rounded-full animate-pulse animation-delay-2000"></div>
            <div className="absolute bottom-20 right-1/4 w-3 h-3 bg-pink-300/50 rounded-full animate-pulse animation-delay-3000"></div>
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-300/50 rounded-full animate-pulse animation-delay-4000"></div>
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:50px_50px] opacity-40"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="group relative animate-card-entrance">
            <div className="glassmorphism-card relative bg-gradient-to-br from-blue-600/40 via-purple-600/40 to-pink-600/40 backdrop-blur-xl p-8 md:p-12 rounded-3xl border-2 border-white/40 hover:border-white/60 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] shadow-2xl hover:shadow-blue-500/50 animate-card-float group-hover:animate-glassmorphism-glow">
              {/* Shimmer effect */}
              <div className="absolute inset-0 rounded-3xl animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
              
              {/* Animated background glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Floating particles inside card */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div className="absolute top-4 left-4 w-1 h-1 bg-white/40 rounded-full animate-pulse animation-delay-1000"></div>
                <div className="absolute top-8 right-6 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-pulse animation-delay-2000"></div>
                <div className="absolute bottom-6 left-6 w-1 h-1 bg-purple-300/40 rounded-full animate-pulse animation-delay-3000"></div>
                <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-pink-300/40 rounded-full animate-pulse animation-delay-4000"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                  {/* Left Side - Icon and Badge */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-24 h-24 bg-white/30 backdrop-blur-md rounded-3xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 border-2 border-white/50 group-hover:border-white/70 group-hover:animate-icon-pulse shadow-lg">
                        <Store className="w-12 h-12 text-white drop-shadow-lg group-hover:text-blue-100 transition-colors duration-300" />
                      </div>
                      {/* Icon glow effect */}
                      <div className="absolute inset-0 w-24 h-24 bg-blue-400/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="mt-4 text-center lg:text-left">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/60 backdrop-blur-md rounded-full text-xs font-bold text-white border-2 border-blue-300/50 shadow-md">
                        <Zap className="w-3.5 h-3.5" />
                        New Product
                      </div>
                    </div>
                  </div>

                  {/* Middle - Content */}
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg group-hover:text-blue-100 transition-colors duration-300">
                      Multi-Store POS & Inventory Management System
                    </h3>
                    <p className="text-lg text-gray-100 mb-6 leading-relaxed group-hover:text-white transition-colors duration-300 max-w-2xl mx-auto lg:mx-0 font-medium drop-shadow-md">
                      Perfect for brands with multiple stores or outlets. Manage all your locations, sales, and inventory from one centralized system. Fully customizable according to your brand and business needs.
                    </p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6">
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-white/25 backdrop-blur-md rounded-full text-sm font-semibold text-white border-2 border-white/40 shadow-md">
                        <Building2 className="w-4 h-4" />
                        <span>Multi-Store</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-white/25 backdrop-blur-md rounded-full text-sm font-semibold text-white border-2 border-white/40 shadow-md">
                        <ShoppingCart className="w-4 h-4" />
                        <span>POS System</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-white/25 backdrop-blur-md rounded-full text-sm font-semibold text-white border-2 border-white/40 shadow-md">
                        <CheckCircle className="w-4 h-4" />
                        <span>Fully Customizable</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - CTA */}
                  <div className="flex-shrink-0">
                    <Link
                      href="/pos"
                      className="group/btn bg-white/30 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold hover:bg-white/40 transition-all duration-300 inline-flex items-center shadow-xl hover:shadow-2xl border-2 border-white/50 hover:border-white/70 hover:scale-105"
                    >
                      View POS System
                      <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section with Glassmorphism */}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Why Choose Us */}
            <div className="space-y-8">
              <div className="animate-card-entrance">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-card-float">
                  Why Choose <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">Pixel Forge?</span>
                </h2>
                <p className="text-lg text-gray-300 mb-8 glassmorphism-text">
                  We&apos;re committed to delivering exceptional results that exceed your expectations.
                </p>
              </div>
              
              <div className="space-y-8">
                {/* Quality & Performance */}
                <div className="group relative animate-card-entrance" style={{ animationDelay: '200ms' }}>
                  <div className="glassmorphism-card relative bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/20 hover:border-white/30 transition-all duration-500 hover:-translate-y-1 hover:scale-105 shadow-2xl hover:shadow-blue-500/20 animate-card-float group-hover:animate-glassmorphism-glow">
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 rounded-3xl animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Gradient border effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
                    
                    {/* Animated background glow */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating particles inside card */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden">
                      <div className="absolute top-4 left-4 w-1 h-1 bg-white/40 rounded-full animate-pulse animation-delay-1000"></div>
                      <div className="absolute top-8 right-6 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-pulse animation-delay-2000"></div>
                      <div className="absolute bottom-6 left-6 w-1 h-1 bg-purple-300/40 rounded-full animate-pulse animation-delay-3000"></div>
                      <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-pink-300/40 rounded-full animate-pulse animation-delay-4000"></div>
                    </div>
                    
                    <div className="relative z-10 flex items-start group/item">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-400/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-blue-400/30 group-hover/item:bg-blue-400/30">
                          <Star className="w-6 h-6 text-blue-400 group-hover/item:text-blue-300 transition-colors duration-300" />
                        </div>
                      </div>
                      <div className="ml-6">
                        <h3 className="text-xl font-semibold glassmorphism-text mb-3 group-hover:text-blue-100 transition-colors duration-300">
                          Quality & Performance
                        </h3>
                        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                          We deliver high-quality, fast-loading websites that provide exceptional user experiences and drive business growth.
                        </p>
                      </div>
                    </div>
                    
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Corner accent */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>

                {/* Modern Technology */}
                <div className="group relative animate-card-entrance" style={{ animationDelay: '400ms' }}>
                  <div className="glassmorphism-card relative bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/20 hover:border-white/30 transition-all duration-500 hover:-translate-y-1 hover:scale-105 shadow-2xl hover:shadow-green-500/20 animate-card-float group-hover:animate-glassmorphism-glow">
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 rounded-3xl animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Gradient border effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-500/20 via-blue-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
                    
                    {/* Animated background glow */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating particles inside card */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden">
                      <div className="absolute top-4 left-4 w-1 h-1 bg-white/40 rounded-full animate-pulse animation-delay-1000"></div>
                      <div className="absolute top-8 right-6 w-1.5 h-1.5 bg-green-300/40 rounded-full animate-pulse animation-delay-2000"></div>
                      <div className="absolute bottom-6 left-6 w-1 h-1 bg-blue-300/40 rounded-full animate-pulse animation-delay-3000"></div>
                      <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-cyan-300/40 rounded-full animate-pulse animation-delay-4000"></div>
                    </div>
                    
                    <div className="relative z-10 flex items-start group/item">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-green-400/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-green-400/30 group-hover/item:bg-green-400/30">
                          <CheckCircle className="w-6 h-6 text-green-400 group-hover/item:text-green-300 transition-colors duration-300" />
                        </div>
                      </div>
                      <div className="ml-6">
                        <h3 className="text-xl font-semibold glassmorphism-text mb-3 group-hover:text-green-100 transition-colors duration-300">
                          Modern Technology
                        </h3>
                        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                          We use the latest technologies and best practices to build scalable, maintainable solutions that stand the test of time.
                        </p>
                      </div>
                    </div>
                    
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Corner accent */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>

                {/* Ongoing Support */}
                <div className="group relative animate-card-entrance" style={{ animationDelay: '600ms' }}>
                  <div className="glassmorphism-card relative bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/20 hover:border-white/30 transition-all duration-500 hover:-translate-y-1 hover:scale-105 shadow-2xl hover:shadow-purple-500/20 animate-card-float group-hover:animate-glassmorphism-glow">
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 rounded-3xl animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Gradient border effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
                    
                    {/* Animated background glow */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating particles inside card */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden">
                      <div className="absolute top-4 left-4 w-1 h-1 bg-white/40 rounded-full animate-pulse animation-delay-1000"></div>
                      <div className="absolute top-8 right-6 w-1.5 h-1.5 bg-purple-300/40 rounded-full animate-pulse animation-delay-2000"></div>
                      <div className="absolute bottom-6 left-6 w-1 h-1 bg-pink-300/40 rounded-full animate-pulse animation-delay-3000"></div>
                      <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-cyan-300/40 rounded-full animate-pulse animation-delay-4000"></div>
                    </div>
                    
                    <div className="relative z-10 flex items-start group/item">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-purple-400/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-purple-400/30 group-hover/item:bg-purple-400/30">
                          <Headphones className="w-6 h-6 text-purple-400 group-hover/item:text-purple-300 transition-colors duration-300" />
                        </div>
                      </div>
                      <div className="ml-6">
                        <h3 className="text-xl font-semibold glassmorphism-text mb-3 group-hover:text-purple-100 transition-colors duration-300">
                          Ongoing Support
                        </h3>
                        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                          We provide continuous support and maintenance to ensure your website stays updated, secure, and performing optimally.
                        </p>
                      </div>
                    </div>
                    
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Corner accent */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - CTA Card with Glassmorphism */}
            <div className="group relative animate-card-entrance" style={{ animationDelay: '800ms' }}>
              <div className="glassmorphism-card relative bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg p-10 rounded-3xl border border-white/20 hover:border-white/30 transition-all duration-500 hover:-translate-y-2 hover:scale-105 shadow-2xl hover:shadow-blue-500/20 animate-card-float group-hover:animate-glassmorphism-glow text-white">
                {/* Shimmer effect */}
                <div className="absolute inset-0 rounded-3xl animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Gradient border effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
                
                {/* Animated background glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating particles inside card */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <div className="absolute top-4 left-4 w-1 h-1 bg-white/40 rounded-full animate-pulse animation-delay-1000"></div>
                  <div className="absolute top-8 right-6 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-pulse animation-delay-2000"></div>
                  <div className="absolute bottom-6 left-6 w-1 h-1 bg-purple-300/40 rounded-full animate-pulse animation-delay-3000"></div>
                  <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-pink-300/40 rounded-full animate-pulse animation-delay-4000"></div>
                </div>
                
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 border border-white/30">
                    <Code className="w-8 h-8 text-white group-hover:text-blue-200 transition-colors duration-300" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-blue-100 transition-colors duration-300">Ready to Get Started?</h3>
                  <p className="text-blue-100 mb-8 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    Let&apos;s discuss your project and create something amazing together. 
                    We&apos;re here to help you achieve your digital goals.
                  </p>
                  <Link
                    href="/contact"
                    className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl border border-white/30 hover:scale-105"
                  >
                    Start Your Project
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}