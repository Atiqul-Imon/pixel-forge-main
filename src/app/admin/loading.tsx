import Spinner from '@/components/ui/Spinner';
import Card from '@/components/ui/Card';

export default function AdminLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="p-8">
        <div className="flex flex-col items-center gap-4">
          <Spinner size="lg" color="primary" />
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Loading...</h3>
            <p className="text-sm text-gray-500">Please wait while we load the page</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

