import Link from 'next/link';
import Image from 'next/image';
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-purple-100/30"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 bg-white rounded-3xl mb-6 shadow-xl p-3">
                <Image
                  src="/logo/pixelforgelogo2.png"
                  alt="Pixel Forge Logo"
                  width={160}
                  height={160}
                  className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-contain"
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Pixel Forge</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              We build exceptional websites and digital experiences that drive business growth. From custom web development to digital marketing, we help businesses thrive online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                     <InteractiveButton
                       href="/contact"
                       trackEvent="serviceInterest"
                       className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center justify-center group shadow-lg hover:shadow-xl"
                     >
                       Get Started Today
                       <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                     </InteractiveButton>
              <Link
                href="/portfolio"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                View Our Work
              </Link>
            </div>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Free Consultation
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                24/7 Support
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Modern Tech
              </div>
            </div>
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