'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 text-center">
            {/* Error Illustration */}
            <div className="relative">
              <div className="text-9xl font-bold text-red-200 select-none">!</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">
                Application Error
              </h1>
              <p className="text-lg text-gray-600">
                A critical error occurred in the application. Please refresh the page or contact support if the problem persists.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={reset}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                >
                  <RefreshCw className="w-5 h-5" />
                  Try Again
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

            {/* Help Section */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">
                If the problem persists, please contact our support team:
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:support@pixelforgebd.com"
                  className="text-blue-600 hover:text-blue-700 transition-colors duration-200 text-sm font-medium"
                >
                  support@pixelforgebd.com
                </a>
                <a
                  href="tel:+8801234567890"
                  className="text-green-600 hover:text-green-700 transition-colors duration-200 text-sm font-medium"
                >
                  +880 1234 567890
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 text-xs text-gray-400">
              <p>© 2024 Pixel Forge BD. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
