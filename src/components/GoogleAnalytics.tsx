'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { GA_TRACKING_ID } from '@/lib/gtag';
import { useConsent } from '@/contexts/ConsentContext';

const GoogleAnalytics = () => {
  const { hasConsent } = useConsent();
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Check if analytics consent is granted
    const checkConsent = () => {
      setShouldLoad(hasConsent('analytics'));
    };

    checkConsent();

    // Listen for consent updates
    const handleConsentUpdate = (event: CustomEvent) => {
      setShouldLoad(event.detail.analytics === true);
      
      // If consent is granted, initialize GA
      if (event.detail.analytics && typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('consent', 'update', {
          'analytics_storage': 'granted'
        });
      }
    };

    window.addEventListener('consentUpdated', handleConsentUpdate as EventListener);

    return () => {
      window.removeEventListener('consentUpdated', handleConsentUpdate as EventListener);
    };
  }, [hasConsent]);

  if (!GA_TRACKING_ID) {
    console.warn('Google Analytics Measurement ID not found');
    return null;
  }

  if (!shouldLoad) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('consent', 'default', {
              'analytics_storage': 'granted',
              'ad_storage': 'denied'
            });
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
