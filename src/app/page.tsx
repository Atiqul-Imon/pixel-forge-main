import Link from 'next/link';
import { ArrowRight, Code, Palette, BarChart3, Headphones, Star, CheckCircle } from 'lucide-react';
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
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
              We build exceptional websites and digital experiences that drive business growth. From custom web development to digital marketing, we help businesses thrive online.
            </p>

            {/* CTA Buttons with enhanced styling */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <InteractiveButton
                href="/contact"
                trackEvent="serviceInterest"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center group shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </InteractiveButton>
              <Link
                href="/portfolio"
                className="border-2 border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 shadow-2xl hover:shadow-white/10 hover:scale-105 transform backdrop-blur-sm"
              >
                View Our Work
              </Link>
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


      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional <span className="gradient-text">Web Development Services</span> in Bangladesh
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert web development, e-commerce solutions, and digital marketing services in Dhaka, Chittagong, and across Bangladesh. We help businesses establish a strong online presence with modern, responsive websites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 group"
              >
                <div className="text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-200">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Why Choose Pixel Forge?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  We&apos;re committed to delivering exceptional results that exceed your expectations.
                </p>
              </div>
              <div className="space-y-8">
                <div className="flex items-start group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                      <Star className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Quality & Performance
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      We deliver high-quality, fast-loading websites that provide exceptional user experiences and drive business growth.
                    </p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Modern Technology
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      We use the latest technologies and best practices to build scalable, maintainable solutions that stand the test of time.
                    </p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                      <Headphones className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Ongoing Support
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      We provide continuous support and maintenance to ensure your website stays updated, secure, and performing optimally.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-10 text-white shadow-2xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-blue-100 mb-8 text-lg leading-relaxed">
                  Let&apos;s discuss your project and create something amazing together. 
                  We&apos;re here to help you achieve your digital goals.
                </p>
                <Link
                  href="/contact"
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}