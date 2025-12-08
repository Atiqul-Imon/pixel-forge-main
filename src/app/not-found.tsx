import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h2>
          <p className="text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-3">
          <Link href="/admin">
            <Button variant="primary" size="lg" fullWidth leftIcon={<Home className="w-5 h-5" />}>
              Go to Dashboard
            </Button>
          </Link>
          <Link href="/admin">
            <Button variant="outline" size="lg" fullWidth leftIcon={<ArrowLeft className="w-5 h-5" />}>
              Go Back
            </Button>
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Quick Links:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/admin" className="text-sm text-primary-600 hover:text-primary-700">
              Dashboard
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/admin/crm/clients" className="text-sm text-primary-600 hover:text-primary-700">
              Clients
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/admin/invoices" className="text-sm text-primary-600 hover:text-primary-700">
              Invoices
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/admin/blog" className="text-sm text-primary-600 hover:text-primary-700">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
