/**
 * Facebook Pixel Data Tracker
 * Captures and stores pixel data for CRM integration
 */

interface PixelData {
  pixelId?: string;
  pixelEventId?: string;
  pixelEventType?: string;
  pixelSource?: string;
  pixelCampaign?: string;
  pixelAdId?: string;
  pixelAdSetId?: string;
  pixelAdName?: string;
  pixelAdSetName?: string;
  pixelCampaignId?: string;
  pixelCampaignName?: string;
  fbclid?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  timestamp?: string;
}

const PIXEL_DATA_KEY = 'fb_pixel_data';
const PIXEL_DATA_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 days

/**
 * Get pixel data from localStorage
 */
export const getPixelData = (): PixelData | null => {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(PIXEL_DATA_KEY);
    if (!stored) return null;

    const data: PixelData = JSON.parse(stored);
    
    // Check if data is expired
    if (data.timestamp) {
      const expiryTime = parseInt(data.timestamp) + PIXEL_DATA_EXPIRY;
      if (Date.now() > expiryTime) {
        localStorage.removeItem(PIXEL_DATA_KEY);
        return null;
      }
    }

    return data;
  } catch (error) {
    console.error('Error reading pixel data:', error);
    return null;
  }
};

/**
 * Save pixel data to localStorage
 */
export const savePixelData = (data: Partial<PixelData>): void => {
  if (typeof window === 'undefined') return;

  try {
    const existing = getPixelData() || {};
    const updated: PixelData = {
      ...existing,
      ...data,
      timestamp: Date.now().toString(),
    };

    localStorage.setItem(PIXEL_DATA_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving pixel data:', error);
  }
};

/**
 * Extract UTM parameters from URL
 */
export const extractUTMParams = (): Partial<PixelData> => {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const data: Partial<PixelData> = {};

  if (params.get('utm_source')) data.utmSource = params.get('utm_source') || undefined;
  if (params.get('utm_medium')) data.utmMedium = params.get('utm_medium') || undefined;
  if (params.get('utm_campaign')) data.utmCampaign = params.get('utm_campaign') || undefined;
  if (params.get('utm_term')) data.utmTerm = params.get('utm_term') || undefined;
  if (params.get('utm_content')) data.utmContent = params.get('utm_content') || undefined;
  if (params.get('fbclid')) data.fbclid = params.get('fbclid') || undefined;
  if (params.get('gclid')) data.gclid = params.get('gclid') || undefined;

  return data;
};

/**
 * Determine pixel source from URL parameters
 */
export const determinePixelSource = (): string => {
  if (typeof window === 'undefined') return 'website';

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get('utm_source')?.toLowerCase();
  const fbclid = params.get('fbclid');
  const gclid = params.get('gclid');

  if (fbclid) return 'facebook';
  if (gclid) return 'google';
  if (utmSource === 'facebook' || utmSource === 'fb') return 'facebook';
  if (utmSource === 'google' || utmSource === 'gclid') return 'google';
  if (utmSource) return utmSource;
  
  return 'website';
};

/**
 * Initialize pixel data tracking
 * Should be called on page load
 */
export const initializePixelTracking = (pixelId?: string): void => {
  if (typeof window === 'undefined') return;

  // Extract UTM parameters
  const utmData = extractUTMParams();
  const source = determinePixelSource();

  // Get existing pixel data
  const existing = getPixelData() || {};

  // Build pixel data
  const pixelData: PixelData = {
    ...existing,
    ...utmData,
    pixelSource: source,
    pixelCampaign: utmData.utmCampaign || existing.pixelCampaign,
  };

  // Set pixel ID if provided
  if (pixelId) {
    pixelData.pixelId = pixelId;
  }

  // Save pixel data
  savePixelData(pixelData);
};

/**
 * Track pixel event and store event ID
 */
export const trackPixelEvent = (
  eventType: string,
  eventId?: string,
  additionalData?: Record<string, unknown>
): void => {
  if (typeof window === 'undefined') return;

  const pixelData = getPixelData() || {};
  
  savePixelData({
    ...pixelData,
    pixelEventType: eventType,
    pixelEventId: eventId || `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ...additionalData,
  });
};

/**
 * Get pixel data formatted for API submission
 */
export const getPixelDataForAPI = (): Partial<PixelData> => {
  const data = getPixelData();
  if (!data) return {};

  return {
    pixelId: data.pixelId,
    pixelEventId: data.pixelEventId,
    pixelEventType: data.pixelEventType,
    pixelSource: data.pixelSource,
    pixelCampaign: data.pixelCampaign || data.utmCampaign,
    fbclid: data.fbclid,
    utmSource: data.utmSource,
    utmMedium: data.utmMedium,
    utmCampaign: data.utmCampaign,
    utmTerm: data.utmTerm,
    utmContent: data.utmContent,
  };
};

/**
 * Clear pixel data
 */
export const clearPixelData = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PIXEL_DATA_KEY);
};

