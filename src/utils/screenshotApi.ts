/**
 * ScreenshotAPI utility for generating website screenshots
 * Free tier: 100 screenshots/month
 * Documentation: https://screenshotapi.com/docs
 */

interface ScreenshotOptions {
  width?: number;
  height?: number;
  device?: 'desktop' | 'mobile' | 'tablet';
  format?: 'png' | 'jpg' | 'webp';
  quality?: number;
  fullPage?: boolean;
  delay?: number;
}

const SCREENSHOT_API_BASE = 'https://api.screenshotone.com/take';
const DEFAULT_OPTIONS: Required<ScreenshotOptions> = {
  width: 1200,
  height: 800,
  device: 'desktop',
  format: 'png',
  quality: 90,
  fullPage: true,
  delay: 2000
};

/**
 * Generate a screenshot URL for a given website
 * @param url - The website URL to screenshot
 * @param options - Screenshot configuration options
 * @returns Screenshot API URL
 */
export function generateScreenshotUrl(
  url: string, 
  options: ScreenshotOptions = {}
): string {
  const config = { ...DEFAULT_OPTIONS, ...options };
  const apiKey = process.env.NEXT_PUBLIC_SCREENSHOT_API_KEY;
  
  if (!apiKey) {
    console.warn('ScreenshotAPI key not found. Using fallback image.');
    return getFallbackImage(url);
  }

  const params = new URLSearchParams({
    access_key: apiKey,
    url: url,
    viewport_width: config.width.toString(),
    viewport_height: config.height.toString(),
    device_scale_factor: '1',
    format: config.format,
    quality: config.quality.toString(),
    full_page: config.fullPage.toString(),
    delay: config.delay.toString(),
    wait_for_selector: 'body',
    block_ads: 'true',
    block_cookie_banners: 'true',
    block_trackers: 'true'
  });

  return `${SCREENSHOT_API_BASE}?${params.toString()}`;
}

/**
 * Get fallback image for websites when API key is not available
 * @param url - The website URL
 * @returns Fallback image URL
 */
function getFallbackImage(url: string): string {
  // Use a placeholder service or return a default image
  const domain = new URL(url).hostname;
  return `https://via.placeholder.com/1200x800/4f46e5/ffffff?text=${encodeURIComponent(domain)}`;
}

/**
 * Generate multiple screenshot URLs for different devices
 * @param url - The website URL
 * @returns Object with different device screenshots
 */
export function generateMultiDeviceScreenshots(url: string) {
  return {
    desktop: generateScreenshotUrl(url, { 
      width: 1200, 
      height: 800, 
      device: 'desktop' 
    }),
    tablet: generateScreenshotUrl(url, { 
      width: 768, 
      height: 1024, 
      device: 'tablet' 
    }),
    mobile: generateScreenshotUrl(url, { 
      width: 375, 
      height: 667, 
      device: 'mobile' 
    })
  };
}

/**
 * Validate if a URL is valid for screenshot
 * @param url - The URL to validate
 * @returns Boolean indicating if URL is valid
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get optimized screenshot URL for portfolio display
 * @param url - The website URL
 * @returns Optimized screenshot URL for portfolio cards
 */
export function getPortfolioScreenshot(url: string): string {
  if (!isValidUrl(url)) {
    return getFallbackImage('Invalid URL');
  }

  return generateScreenshotUrl(url, {
    width: 1200,
    height: 800,
    device: 'desktop',
    format: 'webp',
    quality: 85,
    fullPage: true,
    delay: 3000 // Wait 3 seconds for page to fully load
  });
}
