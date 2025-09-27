'use client';

import { useState } from 'react';
import { Phone, Send, CheckCircle, AlertCircle, Facebook, Linkedin, Mail, MapPin, Clock, ArrowRight, Code, Palette, BarChart3, Headphones } from 'lucide-react';
import { trackEvent } from '@/lib/gtag';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const services = [
    'Web Development',
    'Landing Page',
    'E-commerce Website',
    'Digital Marketing',
    'Support & Maintenance',
    'Other'
  ];


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        
        // Track Google Analytics event
        trackEvent.contactFormSubmit();
        
        // Track Facebook Pixel events (both client-side and server-side CAPI)
        if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).trackLead) {
          ((window as unknown as Record<string, unknown>).trackLead as (email: string, service: string, name?: string) => void)(formData.email, formData.service, formData.name);
        }
        if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).trackContactFormSubmit) {
          ((window as unknown as Record<string, unknown>).trackContactFormSubmit as () => void)();
        }
        
        setFormData({
          name: '',
          email: '',
          company: '',
          service: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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

          {/* Floating contact elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 text-white/20 text-4xl font-mono animate-float"><Mail className="w-12 h-12" /></div>
            <div className="absolute top-1/3 right-1/4 text-white/20 text-3xl font-mono animate-float animation-delay-2000"><Phone className="w-10 h-10" /></div>
            <div className="absolute bottom-1/3 left-1/3 text-white/20 text-3xl font-mono animate-float animation-delay-4000"><MapPin className="w-10 h-10" /></div>
            <div className="absolute bottom-1/4 right-1/3 text-white/20 text-2xl font-mono animate-float animation-delay-6000"><Clock className="w-8 h-8" /></div>
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10">
          <div className="text-center">
            {/* Contact Visual */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white/10 backdrop-blur-md rounded-2xl mb-6 shadow-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="relative w-full h-full">
                  {/* Central Contact Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white/90 text-3xl sm:text-4xl font-bold group-hover:scale-110 transition-transform duration-300">
                      📞
                    </div>
                  </div>
                  
                  {/* Floating Contact Elements */}
                  <div className="absolute top-1 left-1 text-white/80 text-sm animate-bounce">📧</div>
                  <div className="absolute top-1 right-1 text-white/80 text-sm animate-bounce animation-delay-1000">💬</div>
                  <div className="absolute bottom-1 left-1 text-white/80 text-sm animate-bounce animation-delay-2000">📍</div>
                  <div className="absolute bottom-1 right-1 text-white/80 text-sm animate-bounce animation-delay-3000">⏰</div>
                  
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
                Get In Touch
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Ready to start your next project? We&apos;d love to hear from you. 
              Send us a message and we&apos;ll respond within 24 hours.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+8801714918360"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-blue-500/25"
                onClick={() => trackEvent.ctaClick('Call Now - Contact Hero')}
              >
                Call Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a
                href="mailto:info@pixelforge.com"
                className="border-2 border-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 relative overflow-hidden">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-5"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Send us a <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">message</span>
                </h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-green-800">Thank you! Your message has been sent successfully.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-red-800">Sorry, there was an error sending your message. Please try again.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Service Needed *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 relative overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-5"></div>
                
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Contact <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Information</span>
                  </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Phone className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        WhatsApp
                      </h3>
                      <p className="text-gray-600 mb-2">
                        Chat with us on WhatsApp
                      </p>
                      <a
                        href="https://wa.me/8801714918360"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).trackWhatsAppClick) {
                            ((window as unknown as Record<string, unknown>).trackWhatsAppClick as () => void)();
                          }
                        }}
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        +880 1714 918360
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Facebook className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Facebook
                      </h3>
                      <p className="text-gray-600 mb-2">
                        Follow us on Facebook
                      </p>
                      <a
                        href="https://www.facebook.com/pixelforge.official"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        @pixelforge.official
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Linkedin className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        LinkedIn
                      </h3>
                      <p className="text-gray-600 mb-2">
                        Connect with us on LinkedIn
                      </p>
                      <a
                        href="https://www.linkedin.com/company/109025907/admin/dashboard/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Pixel Forge
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Why Choose Us?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                    <span>Free consultation and project planning</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                    <span>Transparent pricing with no hidden fees</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                    <span>24/7 support and maintenance</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                    <span>Modern technologies and best practices</span>
                  </li>
                </ul>
              </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}