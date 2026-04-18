'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AlertTriangle, Home, RefreshCw, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  if (isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="relative">
            <div className="select-none text-9xl font-bold text-red-200">500</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-600">
                <AlertTriangle className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">Something went wrong</h1>
            <p className="text-lg text-gray-600">
              An unexpected error occurred. You can try again or return to the dashboard.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-100 p-4">
                <p className="font-mono text-sm text-red-800">{error.message}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button onClick={reset} variant="danger" size="lg" leftIcon={<RefreshCw className="h-5 w-5" />}>
              Try again
            </Button>
            <Button onClick={() => window.history.back()} variant="secondary" size="lg" leftIcon={<ArrowLeft className="h-5 w-5" />}>
              Go back
            </Button>
            <Link href="/admin">
              <Button variant="primary" size="lg" leftIcon={<Home className="h-5 w-5" />}>
                Dashboard
              </Button>
            </Link>
          </div>
          <div className="border-t border-gray-200 pt-8">
            <a
              href="mailto:hello@pixelforgebd.com"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              hello@pixelforgebd.com
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 pb-24 pt-28">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-700">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-zinc-900">Something went wrong</h1>
        <p className="mt-3 text-zinc-600">
          We could not load this page. Please try again, or reach us by email if it keeps happening.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <p className="mt-4 rounded-lg bg-zinc-100 p-3 font-mono text-left text-xs text-zinc-800">{error.message}</p>
        )}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-interactive hover:bg-primary-700"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-interactive hover:bg-zinc-50"
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>
        </div>
        <a
          href="mailto:hello@pixelforgebd.com"
          className="mt-8 inline-block text-sm font-semibold text-primary-700 hover:underline"
        >
          hello@pixelforgebd.com
        </a>
      </div>
    </div>
  );
}
