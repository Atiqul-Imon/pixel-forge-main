# ScreenshotAPI Integration Setup

This project uses ScreenshotAPI to automatically generate website screenshots for portfolio projects.

## 🚀 Quick Setup

### 1. Get Your Free API Key
1. Visit [ScreenshotAPI.com](https://screenshotapi.com/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Free tier includes: **100 screenshots/month**

### 2. Add Environment Variable
Create a `.env.local` file in the project root and add:

```bash
NEXT_PUBLIC_SCREENSHOT_API_KEY=your_actual_api_key_here
```

### 3. Restart Development Server
```bash
npm run dev
```

## 📸 How It Works

- **Automatic Screenshots**: Portfolio images are automatically generated from live website URLs
- **High Quality**: 1200x800px WebP format with 85% quality
- **Full Page**: Captures complete website pages
- **Optimized**: 3-second delay ensures pages load completely
- **Fallback**: Shows placeholder if API key is missing

## 🛠️ Configuration Options

The `getPortfolioScreenshot()` function can be customized:

```typescript
// Default settings
{
  width: 1200,
  height: 800,
  device: 'desktop',
  format: 'webp',
  quality: 85,
  fullPage: true,
  delay: 3000
}
```

## 📊 Usage Examples

```typescript
import { getPortfolioScreenshot, generateScreenshotUrl } from '@/utils/screenshotApi';

// For portfolio cards
const imageUrl = getPortfolioScreenshot('https://example.com');

// Custom configuration
const customScreenshot = generateScreenshotUrl('https://example.com', {
  width: 1920,
  height: 1080,
  device: 'desktop',
  format: 'png'
});
```

## 🔧 Advanced Features

### Multi-Device Screenshots
```typescript
import { generateMultiDeviceScreenshots } from '@/utils/screenshotApi';

const screenshots = generateMultiDeviceScreenshots('https://example.com');
// Returns: { desktop, tablet, mobile }
```

### URL Validation
```typescript
import { isValidUrl } from '@/utils/screenshotApi';

if (isValidUrl('https://example.com')) {
  // Generate screenshot
}
```

## 💡 Tips

1. **API Limits**: Free tier has 100 screenshots/month
2. **Caching**: Screenshots are cached by ScreenshotAPI
3. **Performance**: Images load asynchronously
4. **Fallback**: Always has a fallback image if API fails

## 🚨 Troubleshooting

### Images Not Loading
- Check if API key is correctly set in `.env.local`
- Verify the API key is valid at ScreenshotAPI dashboard
- Check browser console for errors

### Poor Image Quality
- Adjust `quality` parameter (1-100)
- Increase `delay` for slow-loading sites
- Use `fullPage: false` for faster loading

### API Rate Limits
- Monitor usage in ScreenshotAPI dashboard
- Consider upgrading to paid plan for more screenshots
- Implement local caching for frequently accessed images

## 📈 Benefits

- ✅ **Professional**: Real website screenshots instead of placeholders
- ✅ **Automatic**: No manual screenshot taking required
- ✅ **Consistent**: Uniform image sizes and quality
- ✅ **Updated**: Screenshots reflect current website state
- ✅ **Fast**: Optimized for portfolio display
