import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 pb-24 pt-28">
      <div className="w-full max-w-lg text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-primary-600">404</p>
        <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight text-zinc-900 md:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-600">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-primary-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-interactive hover:bg-primary-700"
          >
            <Home className="mr-2 h-5 w-5" />
            Back to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-8 py-3.5 text-base font-semibold text-zinc-900 transition-interactive hover:bg-white"
          >
            Contact
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
        <div className="mt-12 border-t border-zinc-200 pt-10">
          <p className="text-sm font-medium text-zinc-500">Popular pages</p>
          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/services" className="text-primary-700 transition-interactive hover:underline">
              Services
            </Link>
            <Link href="/portfolio" className="text-primary-700 transition-interactive hover:underline">
              Solutions
            </Link>
            <Link href="/blog" className="text-primary-700 transition-interactive hover:underline">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
