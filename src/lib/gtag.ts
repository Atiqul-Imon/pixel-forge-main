// Google Analytics 4 (GA4) configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Custom events for Pixel Forge
export const trackEvent = {
  // Contact form submissions
  contactFormSubmit: () => {
    event({
      action: 'contact_form_submit',
      category: 'engagement',
      label: 'contact_form',
    });
  },

  // Blog post views
  blogPostView: (postTitle: string) => {
    event({
      action: 'blog_post_view',
      category: 'content',
      label: postTitle,
    });
  },

  // Portfolio project clicks
  portfolioProjectClick: (projectName: string) => {
    event({
      action: 'portfolio_project_click',
      category: 'engagement',
      label: projectName,
    });
  },

  // Service page views
  servicePageView: (serviceName: string) => {
    event({
      action: 'service_page_view',
      category: 'content',
      label: serviceName,
    });
  },

  // CTA button clicks
  ctaClick: (ctaName: string) => {
    event({
      action: 'cta_click',
      category: 'conversion',
      label: ctaName,
    });
  },

  // Admin login
  adminLogin: () => {
    event({
      action: 'admin_login',
      category: 'admin',
      label: 'admin_panel',
    });
  },

  // Blog post creation
  blogPostCreate: () => {
    event({
      action: 'blog_post_create',
      category: 'admin',
      label: 'content_creation',
    });
  },
};

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: any
    ) => void;
  }
}
