'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initializePixelTracking } from '@/lib/pixelTracker';

/**
 * Component to initialize pixel tracking on every page
 * Captures UTM parameters and Facebook Pixel data
 */
export default function PixelInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    // Get pixel ID from environment
    const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || 
                    process.env.NEXT_PUBLIC_DOCTOR_SOLUTION_PIXEL_ID;

    // Initialize pixel tracking on page load/change
    if (pixelId && pixelId !== 'YOUR_PIXEL_ID') {
      initializePixelTracking(pixelId);
    }
  }, [pathname]); // Re-initialize when route changes

  return null; // This component doesn't render anything
}

