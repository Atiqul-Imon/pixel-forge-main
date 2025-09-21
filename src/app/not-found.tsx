'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, ArrowLeft, Search, Mail, Phone } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* 404 Illustration */}
        <div className="relative">
          <div className="text-9xl font-bold text-blue-200 select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600">
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or doesn't exist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
            
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              <Home className="w-5 h-5" />
              Home Page
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Or try these popular pages:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/about"
              className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium text-gray-700"
            >
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              About Us
            </Link>
            <Link
              href="/services"
              className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium text-gray-700"
            >
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              Our Services
            </Link>
            <Link
              href="/portfolio"
              className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium text-gray-700"
            >
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              Portfolio
            </Link>
            <Link
              href="/blog"
              className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium text-gray-700"
            >
              <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
              Blog
            </Link>
          </div>
        </div>

        {/* Contact Section */}
        <div className="pt-6">
          <p className="text-sm text-gray-500 mb-3">
            Still can't find what you're looking for?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:info@pixelforgebd.com"
              className="flex items-center justify-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 text-sm font-medium"
            >
              <Mail className="w-4 h-4" />
              Email Us
            </a>
            <a
              href="tel:+8801234567890"
              className="flex items-center justify-center gap-2 px-4 py-2 text-green-600 hover:text-green-700 transition-colors duration-200 text-sm font-medium"
            >
              <Phone className="w-4 h-4" />
              Call Us
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 text-xs text-gray-400">
          <p>© 2024 Pixel Forge BD. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
