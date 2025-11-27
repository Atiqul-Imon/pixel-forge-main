'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Star, Clock, Users, Zap, Shield, Globe, Smartphone, Monitor, ExternalLink, MessageCircle, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { trackEvent } from '@/lib/gtag';

export default function LandingPagesPage() {
  const [selectedPackage, setSelectedPackage] = useState('professional');

  useEffect(() => {
    // Track landing pages page view
    trackEvent.servicePageView('Landing Pages');
  }, []);

  const landingPageDemos = [
    {
      id: 7,
      title: 'FitLife Pro - Premium Fitness Center',
      description: 'Modern fitness center landing page featuring premium gym services, membership plans, personal training, and wellness programs.',
      image: 'https://res.cloudinary.com/db5yniogx/image/upload/v1759493107/doctorwebsitefullpage_n8bx3k.webp',
      price: '৳3,000',
      originalPrice: '৳6,000',
      features: ['Modern Design', 'Mobile Responsive', 'Fast Loading', 'SEO Optimized', 'Contact Forms', 'Social Integration'],
      category: 'Fitness',
      deliveryTime: '2 days',
      demoUrl: 'https://fitnesspro-two.vercel.app/',
      popular: true
    }
  ];

  const packages = [
    {
      id: 'basic',
      name: 'Basic Package',
      price: '৳2,000',
      originalPrice: '৳4,000',
      description: 'Perfect for small businesses and startups',
      features: [
        '1 Simple Landing Page',
        'Mobile Responsive',
        'Basic Contact Form',
        'Basic SEO Setup',
        'Meta Pixel Setup',
        '2 Revisions',
        '2-3 Days Delivery',
        '1 Month Support'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional Package',
      price: '৳3,000',
      originalPrice: '৳6,000',
      description: 'Most popular choice - Best Value!',
      features: [
        '1 Premium Landing Page Design',
        'Fully Mobile Responsive',
        'Contact Forms & WhatsApp Integration',
        'Advanced SEO Optimization',
        'Meta Pixel & CAPI Setup',
        '5 Revisions Included',
        '2-3 Days Delivery',
        '3 Months Free Support',
        'Google Analytics Integration',
        'Speed Optimization',
        'Social Media Integration',
        'Free Content Updates (1 Month)'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium Package',
      price: '৳8,000',
      originalPrice: '৳12,000',
      description: 'Complete solution for established businesses',
      features: [
        '2 Premium Landing Pages',
        'Fully Mobile Responsive',
        'Advanced Contact Forms & CRM',
        'Complete SEO Setup & Optimization',
        'Meta Pixel & CAPI Setup',
        'Unlimited Revisions',
        '2-3 Days Delivery',
        '6 Months Free Support',
        'Advanced Analytics & Tracking',
        'Speed Optimization',
        'Content Management Training',
        'Free Domain & Hosting (1 Year)',
        'Priority Support',
        'Custom Features Development'
      ],
      popular: false
    }
  ];



  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Professional <span className="gradient-text">Landing Pages</span>
            <br />
            <span className="text-2xl md:text-4xl text-blue-300">Starting from ৳2,000</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
            Get your business online fast with our high-converting landing pages. 
            Perfect for restaurants, e-commerce, services, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center group shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform"
            >
              View Packages & Pricing
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <a
              href="https://wa.me/8801714918360?text=Hello! I'm interested in your landing page services. Can you help me?"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 shadow-2xl hover:shadow-white/10 hover:scale-105 transform backdrop-blur-sm flex items-center justify-center"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

        </div>
      </section>

      {/* Landing Page Demos */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              See Our <span className="gradient-text">Landing Page Demos</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our collection of professionally designed landing pages. 
              Each template is optimized for conversions and mobile responsiveness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {landingPageDemos.map((demo) => (
              <div key={demo.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative">
                  <Image
                    src={demo.image}
                    alt={`${demo.title} - High converting landing page design for ${demo.category} businesses`}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {demo.popular && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-gray-900">{demo.category}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{demo.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{demo.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-600">{demo.price}</span>
                      <span className="text-lg text-gray-400 line-through">{demo.originalPrice}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {demo.deliveryTime}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {demo.features.map((feature, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={demo.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                    >
                      View Demo
                    </a>
                    <a
                      href={`https://wa.me/8801714918360?text=Hello! I'm interested in the ${demo.title} landing page. Can you help me?`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors text-center"
                    >
                      Order Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Packages Section */}
      <section id="packages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your <span className="gradient-text">Perfect Package</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the package that best fits your business needs. 
              All packages include mobile responsiveness and basic SEO.
            </p>
          </div>

          {/* Marketing Call-to-Action */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8 mb-12 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Ready to Get Your Custom Landing Page Built?
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                Choose one of our packages and get your business landing page exactly how you want it. 
                From concept to launch, we'll bring your vision to life with professional design and functionality.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Custom Design
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Mobile Responsive
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Fast Delivery
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  SEO Optimized
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 ${
                  pkg.popular ? 'ring-4 ring-blue-500 scale-110 border-4 border-blue-200' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-md">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${pkg.popular ? 'text-blue-600' : 'text-gray-900'}`}>
                    {pkg.name}
                  </h3>
                  <p className={`text-sm font-semibold mb-4 ${pkg.popular ? 'text-blue-500' : 'text-gray-600'}`}>
                    {pkg.description}
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className={`text-5xl font-bold ${pkg.popular ? 'text-blue-600' : 'text-gray-700'}`}>
                      {pkg.price}
                    </span>
                    <span className="text-xl text-red-500 line-through font-semibold">{pkg.originalPrice}</span>
                  </div>
                  {pkg.popular && (
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-semibold mb-4">
                      💰 Save ৳3,000 - Limited Time Offer!
                    </div>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/8801714918360?text=Hello! I'm interested in the ${pkg.name} for ${pkg.price}. Can you help me?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full block text-center px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {pkg.popular ? 'Get Started Now' : 'Get Started Now'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Gateway Integration Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Payment Gateway Integration</h3>
            </div>
            <p className="text-gray-700 text-center mb-4">
              Need payment processing for your landing page? We can integrate popular payment gateways used in Bangladesh.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white px-3 py-1 rounded-full border border-green-200 text-gray-700">bKash</span>
              <span className="bg-white px-3 py-1 rounded-full border border-green-200 text-gray-700">Rocket</span>
              <span className="bg-white px-3 py-1 rounded-full border border-green-200 text-gray-700">Stripe</span>
              <span className="bg-white px-3 py-1 rounded-full border border-green-200 text-gray-700">PayPal</span>
              <span className="bg-white px-3 py-1 rounded-full border border-green-200 text-gray-700">SSL Commerz</span>
            </div>
            <p className="text-xs text-gray-600 text-center mt-3">
              Contact us for pricing based on your specific requirements
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Your Landing Page?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join 150+ satisfied clients who have transformed their business with our professional landing pages. 
            Get started today and see results in just 3-7 days!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/8801714918360?text=Hello! I'm ready to order a landing page. Can you help me choose the right package?"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center group"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Start Your Project Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="tel:+8801714918360"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors duration-200 inline-flex items-center justify-center"
            >
              <Phone className="mr-2 w-5 h-5" />
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
