'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useConsent } from '@/contexts/ConsentContext';

declare global {
  interface Window {
    fbq: (action: string, event: string, data?: Record<string, unknown>) => void;
  }
}

interface DoctorSolutionPixelProps {
  pixelId: string;
}

const DoctorSolutionPixel = ({ pixelId }: DoctorSolutionPixelProps) => {
  const { hasConsent } = useConsent();
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Check if marketing consent is granted
    const checkConsent = () => {
      setShouldLoad(hasConsent('marketing'));
    };

    checkConsent();

    // Listen for consent updates
    const handleConsentUpdate = (event: CustomEvent) => {
      setShouldLoad(event.detail.marketing === true);
      
      // If consent is granted and pixel is loaded, track page view
      if (event.detail.marketing && typeof window !== 'undefined' && window.fbq) {
        window.fbq('consent', 'grant');
        window.fbq('track', 'PageView', {
          content_name: 'Doctor Solution Page',
          content_category: 'Product Page'
        });
      }
    };

    window.addEventListener('consentUpdated', handleConsentUpdate as EventListener);

    return () => {
      window.removeEventListener('consentUpdated', handleConsentUpdate as EventListener);
    };
  }, [hasConsent]);

  useEffect(() => {
    if (shouldLoad && typeof window !== 'undefined' && window.fbq) {
      // Track page view for doctor solution page
      window.fbq('track', 'PageView', {
        content_name: 'Doctor Solution Page',
        content_category: 'Product Page',
        content_type: 'service'
      });
    }
  }, [shouldLoad]);

  if (!shouldLoad || !pixelId || pixelId === 'YOUR_PIXEL_ID') {
    return null;
  }

  return (
    <>
      <Script
        id="doctor-solution-facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('consent', 'revoke');
            fbq('init', '${pixelId}');
            fbq('consent', 'grant');
            fbq('track', 'PageView', {
              content_name: 'Doctor Solution Page',
              content_category: 'Product Page'
            });
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
};

export default DoctorSolutionPixel;

