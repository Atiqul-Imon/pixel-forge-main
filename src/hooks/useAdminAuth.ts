import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Custom hook for admin authentication
 * Handles authentication checks and redirects for admin pages
 */
export const useAdminAuth = () => {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Don't redirect while authentication is still loading
    if (loading) {
      return;
    }

    // Redirect to login if not authenticated
    if (!user) {
      router.push('/admin/login');
      return;
    }

    // Redirect to home if not admin
    if (!isAdmin) {
      router.push('/');
      return;
    }
  }, [user, isAdmin, loading, router]);

  return {
    user,
    isAdmin,
    loading,
    isAuthenticated: !!user && isAdmin,
  };
};

export default useAdminAuth;
