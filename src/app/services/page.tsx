import { Code, Palette, BarChart3, Headphones, CheckCircle, ArrowRight, Zap, Shield, Globe, Smartphone } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
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
      price: 'Starting from $2,500',
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
      price: 'Starting from $1,500',
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
      price: 'Starting from $1,000/month',
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
      price: 'Starting from $200/month',
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
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We offer comprehensive digital solutions to help your business succeed online. 
              From custom web development to digital marketing, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border-l-4 ${
                  service.color === 'blue' ? 'border-blue-500' :
                  service.color === 'purple' ? 'border-purple-500' :
                  service.color === 'green' ? 'border-green-500' : 'border-orange-500'
                }`}
              >
                <div className={`${
                  service.color === 'blue' ? 'text-blue-600' :
                  service.color === 'purple' ? 'text-purple-600' :
                  service.color === 'green' ? 'text-green-600' : 'text-orange-600'
                } mb-6`}>
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    {service.price}
                  </span>
                  <Link
                    href="/contact"
                    className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-200 flex items-center ${
                      service.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                      service.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                      service.color === 'green' ? 'bg-green-600 hover:bg-green-700' : 'bg-orange-600 hover:bg-orange-700'
                    }`}
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We follow a proven process to ensure your project is delivered on time and exceeds expectations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
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
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your requirements and create something amazing together. 
              We're here to help you achieve your digital goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center group"
              >
                Get Free Quote
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/portfolio"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

