import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AdminNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <h1 className="mb-4 text-9xl font-bold text-primary-600">404</h1>
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Page not found</h2>
          <p className="text-gray-600">This admin page does not exist or was moved.</p>
        </div>

        <div className="space-y-3">
          <Link href="/admin">
            <Button variant="primary" size="lg" fullWidth leftIcon={<Home className="h-5 w-5" />}>
              Go to dashboard
            </Button>
          </Link>
          <Link href="/admin">
            <Button variant="outline" size="lg" fullWidth leftIcon={<ArrowLeft className="h-5 w-5" />}>
              Back to admin home
            </Button>
          </Link>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="mb-4 text-sm text-gray-500">Quick links</p>
          <div className="flex flex-wrap justify-center gap-2">
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
