'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Error Illustration */}
        <div className="relative">
          <div className="text-9xl font-bold text-red-200 select-none">500</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Something went wrong!
          </h1>
          <p className="text-lg text-gray-600">
            We're sorry, but something unexpected happened. Our team has been notified and is working to fix the issue.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-4 bg-red-100 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800 font-mono">
                {error.message}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={reset}
              variant="danger"
              size="lg"
              leftIcon={<RefreshCw className="w-5 h-5" />}
            >
              Try Again
            </Button>
            
            <Button
              onClick={() => window.history.back()}
              variant="secondary"
              size="lg"
              leftIcon={<ArrowLeft className="w-5 h-5" />}
            >
              Go Back
            </Button>
            
            <Link href="/admin">
              <Button
                variant="primary"
                size="lg"
                leftIcon={<Home className="w-5 h-5" />}
              >
                Go to Dashboard
              </Button>
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
              href="mailto:hello@pixelforgebd.com"
              className="flex items-center justify-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 text-sm font-medium"
            >
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              hello@pixelforgebd.com
            </a>
            <a
              href="tel:+8801234567890"
              className="flex items-center justify-center gap-2 px-4 py-2 text-green-600 hover:text-green-700 transition-colors duration-200 text-sm font-medium"
            >
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              +880 1234 567890
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 text-xs text-gray-400">
          <p>© 2024 Pixel Forge. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
