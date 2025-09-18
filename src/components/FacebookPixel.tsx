'use client';

import { useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    fbq: (action: string, event: string, data?: Record<string, unknown>) => void;
  }
}

interface FacebookPixelProps {
  pixelId: string;
}

const FacebookPixel = ({ pixelId }: FacebookPixelProps) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      // Track page view
      window.fbq('track', 'PageView');
    }
  }, []);

  const trackLead = (email: string, service: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: service,
        content_category: 'Web Development',
        value: 0,
        currency: 'USD',
        email: email
      });
    }
  };

  const trackContactFormSubmit = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'CompleteRegistration', {
        content_name: 'Contact Form',
        content_category: 'Lead Generation'
      });
    }
  };

  const trackWhatsAppClick = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Contact', {
        content_name: 'WhatsApp Contact',
        content_category: 'Direct Contact'
      });
    }
  };

  const trackServiceInterest = (service: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: service,
        content_category: 'Service Interest'
      });
    }
  };

  // Expose tracking functions globally for use in other components
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as unknown as Record<string, unknown>).trackLead = trackLead;
      (window as unknown as Record<string, unknown>).trackContactFormSubmit = trackContactFormSubmit;
      (window as unknown as Record<string, unknown>).trackWhatsAppClick = trackWhatsAppClick;
      (window as unknown as Record<string, unknown>).trackServiceInterest = trackServiceInterest;
    }
  }, []);

  return (
    <>
      <Script
        id="facebook-pixel"
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
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
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

export default FacebookPixel;
