/**
 * Cloudinary utility for managing portfolio images
 * Centralized configuration for easy management
 */

// Cloudinary configuration
const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/db5yniogx/image/upload';
const CLOUDINARY_VERSION = 'v1759491239';

/**
 * Generate Cloudinary URL for portfolio images
 * @param filename - The filename without extension
 * @param format - Image format (default: 'webp')
 * @param transformations - Optional Cloudinary transformations
 * @returns Complete Cloudinary URL
 */
export function getCloudinaryUrl(
  filename: string, 
  format: string = 'webp',
  transformations?: string
): string {
  const baseUrl = `${CLOUDINARY_BASE_URL}/${CLOUDINARY_VERSION}`;
  const transformString = transformations ? `${transformations}/` : '';
  return `${baseUrl}/${transformString}${filename}.${format}`;
}

/**
 * Portfolio image configurations
 * Add new projects here with their Cloudinary filenames
 */
export const PORTFOLIO_IMAGES = {
  // Existing projects
  arizaan: 'arizannscreenshot_fzh4jv',
  scarlet: 'scarletfullpage_msrylb',
  shahan: 'shahanahmedfullpage_rdchwj',
  shantibari: 'shantibarifullpage_amzrsi',
  newsandniche: 'newsandnichefullpage_r7z4mr',
  pixelforge: 'pixelforgefullpage_pyd8g2',
  jhatikasafar: 'jhatikasafarfullpage_u2klnc',
  maishaprinting: 'maishaprintingfullpage_w6eo2u',
  drsarah: 'doctorwebsitefullpage_n8bx3k',
  fitnesspro: 'fitnesspro_landing_page', // Placeholder - upload actual image to Cloudinary
  
  // Add new projects here as you upload them to Cloudinary
  // mern_ecommerce: 'mern_ecommerce_platform_screenshot',
} as const;

/**
 * Get portfolio image URL by project key
 * @param projectKey - Key from PORTFOLIO_IMAGES
 * @param transformations - Optional Cloudinary transformations
 * @returns Complete Cloudinary URL
 */
export function getPortfolioImage(
  projectKey: keyof typeof PORTFOLIO_IMAGES,
  transformations?: string
): string {
  const filename = PORTFOLIO_IMAGES[projectKey];
  return getCloudinaryUrl(filename, 'webp', transformations);
}

/**
 * Common Cloudinary transformations for portfolio images
 */
export const TRANSFORMATIONS = {
  // Standard portfolio card size - no transformations for now
  card: '',
  
  // Thumbnail size
  thumbnail: 'w_400,h_300,c_fill,f_auto,q_auto',
  
  // High quality for modal
  modal: 'w_1920,h_1080,c_fill,f_auto,q_auto',
  
  // Responsive images
  responsive: 'w_auto,h_auto,c_fill,f_auto,q_auto',
} as const;

/**
 * Get responsive portfolio image with automatic format selection
 * @param projectKey - Key from PORTFOLIO_IMAGES
 * @param size - Size transformation key
 * @returns Optimized Cloudinary URL
 */
export function getResponsivePortfolioImage(
  projectKey: keyof typeof PORTFOLIO_IMAGES,
  size: keyof typeof TRANSFORMATIONS = 'card'
): string {
  return getPortfolioImage(projectKey, TRANSFORMATIONS[size]);
}

/**
 * Check if an image URL is from Cloudinary
 * @param url - Image URL to check
 * @returns True if URL is from Cloudinary
 */
export function isCloudinaryUrl(url: string): boolean {
  return url.includes('res.cloudinary.com');
}

/**
 * Extract Cloudinary public ID from URL
 * @param url - Cloudinary URL
 * @returns Public ID or null if not a Cloudinary URL
 */
export function extractCloudinaryPublicId(url: string): string | null {
  if (!isCloudinaryUrl(url)) return null;
  
  const match = url.match(/\/upload\/[^\/]+\/(.+?)\./);
  return match ? match[1] : null;
}
