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

// Generate unique event ID for deduplication between Pixel and CAPI
const generateEventId = () => {
  return 'pixel_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Send event to CAPI (server-side)
const sendCAPIEvent = async (eventType: string, userInfo?: any, customData?: any) => {
  try {
    const eventId = generateEventId();
    
    const response = await fetch('/api/facebook/capi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventType,
        userInfo,
        customData,
        eventId,
      }),
    });

    if (!response.ok) {
      console.warn('CAPI event failed:', await response.text());
    }
  } catch (error) {
    console.warn('CAPI event error:', error);
  }
};

const FacebookPixel = ({ pixelId }: FacebookPixelProps) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      // Track page view on both Pixel and CAPI
      window.fbq('track', 'PageView');
      sendCAPIEvent('pageView', null, { pageName: window.location.pathname });
    }
  }, []);

  const trackLead = (email: string, service: string, name?: string) => {
    const eventId = generateEventId();
    
    // Client-side Pixel tracking
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: service,
        content_category: 'Web Development',
        value: 0,
        currency: 'USD',
        email: email,
        eventID: eventId
      });
    }

    // Server-side CAPI tracking
    sendCAPIEvent('lead', { email, service, name }, null);
  };

  const trackContactFormSubmit = () => {
    const eventId = generateEventId();
    
    // Client-side Pixel tracking
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'CompleteRegistration', {
        content_name: 'Contact Form',
        content_category: 'Lead Generation',
        eventID: eventId
      });
    }

    // Server-side CAPI tracking
    sendCAPIEvent('contact', null, { contactMethod: 'Contact Form' });
  };

  const trackWhatsAppClick = () => {
    const eventId = generateEventId();
    
    // Client-side Pixel tracking
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Contact', {
        content_name: 'WhatsApp Contact',
        content_category: 'Direct Contact',
        eventID: eventId
      });
    }

    // Server-side CAPI tracking
    sendCAPIEvent('contact', null, { contactMethod: 'WhatsApp' });
  };

  const trackServiceInterest = (service: string) => {
    const eventId = generateEventId();
    
    // Client-side Pixel tracking
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: service,
        content_category: 'Service Interest',
        eventID: eventId
      });
    }

    // Server-side CAPI tracking
    sendCAPIEvent('viewContent', null, { serviceName: service });
  };

  const trackPortfolioView = (projectName: string) => {
    const eventId = generateEventId();
    
    // Client-side Pixel tracking
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: projectName,
        content_category: 'Portfolio',
        content_type: 'project',
        eventID: eventId
      });
    }

    // Server-side CAPI tracking
    sendCAPIEvent('portfolioView', null, { projectName });
  };

  // Expose tracking functions globally for use in other components
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as unknown as Record<string, unknown>).trackLead = trackLead;
      (window as unknown as Record<string, unknown>).trackContactFormSubmit = trackContactFormSubmit;
      (window as unknown as Record<string, unknown>).trackWhatsAppClick = trackWhatsAppClick;
      (window as unknown as Record<string, unknown>).trackServiceInterest = trackServiceInterest;
      (window as unknown as Record<string, unknown>).trackPortfolioView = trackPortfolioView;
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
