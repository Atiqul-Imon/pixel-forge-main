import Link from 'next/link';
import { ArrowRight, Code, Palette, BarChart3, Headphones, Star, CheckCircle, Store, ShoppingCart, Building2, Zap, Settings, Search } from 'lucide-react';
import InteractiveButton from '@/components/InteractiveButton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'High-Performance Websites Built to Grow Your Business | Pixel Forge',
  description: 'Pixel Forge is a modern web development studio that helps businesses build fast, scalable, and conversion-focused digital platforms. We combine strategy, design, and engineering to turn online presence into real business results. Engineering-driven technology studio focused on long-term technical partnerships.',
  keywords: [
    'high-performance websites',
    'scalable digital platforms',
    'engineering-driven web development',
    'conversion-focused websites',
    'technical partnership',
    'web platform engineering',
    'business growth websites',
    'performance-optimized platforms',
    'scalable system architecture',
    'long-term technical partnership'
  ],
  openGraph: {
    title: 'High-Performance Websites Built to Grow Your Business | Pixel Forge',
    description: 'Pixel Forge is a modern web development studio that helps businesses build fast, scalable, and conversion-focused digital platforms. We combine strategy, design, and engineering to turn online presence into real business results.',
    images: ['/logo/pixelforgelogo2.png'],
    url: 'https://pixelforgebd.com',
  },
  alternates: {
    canonical: 'https://pixelforgebd.com',
  },
};

export default function Home() {
  const capabilities = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: 'Web Platforms & Digital Infrastructure',
      description: 'Custom web platforms built to support business operations, user growth, and future expansion. Architecture decisions prioritize performance, stability, and maintainability from day one.',
      features: [
        'Built for high traffic and future feature growth',
        'Secure, scalable system design',
        'SEO-ready and performance-optimized foundations',
        'Production-grade, responsive interfaces'
      ]
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Digital Products & MVP Engineering',
      description: 'Digital products engineered from concept to production with a focus on technical soundness and scalability. Foundations are structured to evolve beyond MVP phase without costly rewrites.',
      features: [
        'Modular, extensible system architecture',
        'Clear separation of business logic',
        'Scalable foundations for long-term product growth',
        'Engineering decisions aligned with real-world usage'
      ]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Performance, Search & Optimization',
      description: 'Technical optimization applied at the system level to ensure speed, discoverability, and usability. Platforms are tuned to meet modern performance benchmarks and search engine standards.',
      features: [
        'Core Web Vitals–focused optimization',
        'Clean technical SEO foundations',
        'Performance monitoring and improvements',
        'Analytics-ready system setup'
      ]
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: 'Ongoing Engineering Stewardship',
      description: 'Long-term technical responsibility for stability, updates, and system health. Platforms remain secure, reliable, and adaptable as business requirements change.',
      features: [
        'Continuous system monitoring',
        'Regular updates and audits',
        'Performance and security reviews',
        'Scalable support structures'
      ]
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
                High-Performance Websites Built to Grow Your Business
              </span>
            </h1>

            {/* Subtitle with better contrast */}
            <h2 className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
              Pixel Forge is a modern web development studio that helps businesses build fast, scalable, and conversion-focused digital platforms. We combine strategy, design, and engineering to turn online presence into real business results.
            </h2>

            {/* CTA Button with enhanced styling */}
            <div className="flex justify-center mb-12">
              <InteractiveButton
                href="/contact"
                trackEvent="serviceInterest"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center group shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform"
              >
                Book a Strategy Call
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </InteractiveButton>
            </div>

            {/* Trust indicators with subtle styling */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                Business-focused approach
              </div>
              <div className="flex items-center bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                Performance & SEO ready
              </div>
              <div className="flex items-center bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                Long-term support mindset
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


      {/* What Is Engineered Section with Glassmorphism */}
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-card-float">
              What Is <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">Engineered</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto glassmorphism-text leading-relaxed">
              Pixel Forge operates as an engineering-driven technology studio. Digital systems are designed with performance, scalability, and operational continuity in mind — treating technology as long-term infrastructure, not a one-off deliverable.
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-semibold text-white text-center mb-8">
              Core Capabilities
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
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
                    <div className="relative mb-7">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-white/30 group-hover:animate-icon-pulse">
                        <div className="text-blue-300 group-hover:text-blue-200 transition-colors duration-300">
                          {capability.icon}
                        </div>
                      </div>
                      {/* Icon glow effect */}
                      <div className="absolute inset-0 w-16 h-16 bg-blue-400/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {/* Icon border glow */}
                      <div className="absolute inset-0 w-16 h-16 rounded-2xl border border-blue-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Title with glassmorphism text effect */}
                    <h3 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-white mb-5 leading-tight group-hover:text-blue-50 transition-colors duration-300 drop-shadow-sm">
                      {capability.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base md:text-lg text-gray-50 mb-8 leading-relaxed group-hover:text-white transition-colors duration-300 drop-shadow-sm">
                      {capability.description}
                    </p>

                    {/* Features list with enhanced styling */}
                    <ul className="space-y-4">
                      {capability.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-base md:text-[15px] text-gray-50 group-hover:text-white transition-colors duration-300 group/item">
                          <div className="w-6 h-6 bg-green-400/30 backdrop-blur-sm rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-green-400/40 group-hover/item:bg-green-400/40 group-hover/item:scale-110 transition-all duration-300 mt-0.5">
                            <CheckCircle className="w-4 h-4 text-green-300 group-hover/item:text-green-200 transition-colors duration-300" />
                          </div>
                          <span className="leading-relaxed group-hover/item:translate-x-1 transition-transform duration-300 drop-shadow-sm">{feature}</span>
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

    </div>
  );
}