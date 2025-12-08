// Facebook Conversions API (CAPI) Implementation
// This provides server-side tracking for better accuracy and privacy compliance

import crypto from 'crypto';

export interface CAPIEvent {
  event_name: string;
  event_time: number;
  action_source: 'website' | 'app' | 'phone_call' | 'chat' | 'physical_store' | 'system_generated' | 'other';
  event_source_url: string;
  user_data: {
    em?: string[]; // email (hashed)
    ph?: string[]; // phone (hashed)
    fn?: string[]; // first name (hashed)
    ln?: string[]; // last name (hashed)
    ct?: string[]; // city (hashed)
    st?: string[]; // state (hashed)
    zp?: string[]; // zip code (hashed)
    country?: string[]; // country (hashed)
    client_ip_address?: string;
    client_user_agent?: string;
    fbc?: string; // Facebook click ID
    fbp?: string; // Facebook browser ID
  };
  custom_data?: {
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    content_type?: string;
    value?: number;
    currency?: string;
    num_items?: number;
    search_string?: string;
    status?: string;
  };
  event_id?: string;
}

export interface CAPIBatch {
  data: CAPIEvent[];
  test_event_code?: string;
}

// Hash function for PII data (required by Facebook)
export function hashData(data: string): string {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
}

// Generate event ID for deduplication
export function generateEventId(): string {
  return crypto.randomUUID();
}

// Send events to Facebook Conversions API
export async function sendCAPIEvents(
  pixelId: string,
  accessToken: string,
  events: CAPIEvent[],
  testEventCode?: string
): Promise<{ success: boolean; response?: Record<string, unknown>; error?: string }> {
  try {
    const batch: CAPIBatch = {
      data: events,
      ...(testEventCode && { test_event_code: testEventCode })
    };

    const response = await fetch(`https://graph.facebook.com/v18.0/${pixelId}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: batch.data, // Send array directly, not stringified
        access_token: accessToken,
        ...(testEventCode && { test_event_code: testEventCode }),
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('CAPI Error:', result);
      return {
        success: false,
        error: result.error?.message || 'Unknown CAPI error'
      };
    }

    return {
      success: true,
      response: result
    };
  } catch (error) {
    console.error('CAPI Request Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Helper function to create user data from request
export function createUserData(
  request: Request,
  userInfo?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  }
) {
  const userAgent = request.headers.get('user-agent') || '';
  const clientIP = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   '127.0.0.1';

  const userData: CAPIEvent['user_data'] = {
    client_ip_address: clientIP,
    client_user_agent: userAgent,
  };

  // Hash PII data if provided
  if (userInfo?.email) {
    userData.em = [hashData(userInfo.email)];
  }
  if (userInfo?.phone) {
    userData.ph = [hashData(userInfo.phone)];
  }
  if (userInfo?.firstName) {
    userData.fn = [hashData(userInfo.firstName)];
  }
  if (userInfo?.lastName) {
    userData.ln = [hashData(userInfo.lastName)];
  }
  if (userInfo?.city) {
    userData.ct = [hashData(userInfo.city)];
  }
  if (userInfo?.state) {
    userData.st = [hashData(userInfo.state)];
  }
  if (userInfo?.zipCode) {
    userData.zp = [hashData(userInfo.zipCode)];
  }
  if (userInfo?.country) {
    userData.country = [hashData(userInfo.country)];
  }

  return userData;
}

// Pre-built event creators for common Pixel Forge events
export const capiEvents = {
  // Contact form submission
  lead: (
    request: Request,
    userInfo: { email: string; name: string; service: string },
    eventId?: string
  ): CAPIEvent => ({
    event_name: 'Lead',
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: request.url,
    event_id: eventId || generateEventId(),
    user_data: createUserData(request, {
      email: userInfo.email,
      firstName: userInfo.name.split(' ')[0],
      lastName: userInfo.name.split(' ').slice(1).join(' '),
    }),
    custom_data: {
      content_name: userInfo.service,
      content_category: 'Web Development',
      value: 0,
      currency: 'USD',
      status: 'new_lead',
    },
  }),

  // Page view
  pageView: (
    request: Request,
    pageName: string,
    eventId?: string
  ): CAPIEvent => ({
    event_name: 'PageView',
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: request.url,
    event_id: eventId || generateEventId(),
    user_data: createUserData(request),
    custom_data: {
      content_name: pageName,
      content_category: 'Website',
    },
  }),

  // Service interest
  viewContent: (
    request: Request,
    serviceName: string,
    eventId?: string
  ): CAPIEvent => ({
    event_name: 'ViewContent',
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: request.url,
    event_id: eventId || generateEventId(),
    user_data: createUserData(request),
    custom_data: {
      content_name: serviceName,
      content_category: 'Service Interest',
      content_type: 'service',
    },
  }),

  // WhatsApp contact
  contact: (
    request: Request,
    contactMethod: string = 'WhatsApp',
    eventId?: string
  ): CAPIEvent => ({
    event_name: 'Contact',
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: request.url,
    event_id: eventId || generateEventId(),
    user_data: createUserData(request),
    custom_data: {
      content_name: contactMethod,
      content_category: 'Direct Contact',
    },
  }),

  // Portfolio project view
  portfolioView: (
    request: Request,
    projectName: string,
    eventId?: string
  ): CAPIEvent => ({
    event_name: 'ViewContent',
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: request.url,
    event_id: eventId || generateEventId(),
    user_data: createUserData(request),
    custom_data: {
      content_name: projectName,
      content_category: 'Portfolio',
      content_type: 'project',
    },
  }),
};

export default {
  sendCAPIEvents,
  createUserData,
  hashData,
  generateEventId,
  capiEvents,
};
