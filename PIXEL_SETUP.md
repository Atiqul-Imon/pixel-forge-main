# Facebook Pixel Setup Guide

## ✅ Complete Pixel Tracking System

Your website now has a comprehensive Facebook Pixel tracking system that automatically captures and stores pixel data for CRM integration.

## 🎯 Features

### 1. **Automatic Pixel Data Capture**
- Captures UTM parameters from URLs (`utm_source`, `utm_medium`, `utm_campaign`, etc.)
- Detects Facebook Click ID (`fbclid`) for Facebook ad tracking
- Detects Google Click ID (`gclid`) for Google ad tracking
- Stores pixel event IDs for all tracked events
- Automatically determines traffic source (Facebook, Google, Website, etc.)

### 2. **Data Storage**
- Pixel data is stored in `localStorage` for 30 days
- Automatically expires old data
- Persists across page navigation
- Available for CRM integration

### 3. **Event Tracking**
- **PageView**: Automatically tracked on every page
- **Lead**: Tracked when contact form is submitted
- **CompleteRegistration**: Tracked on form submissions
- **Contact**: Tracked on WhatsApp/Email clicks
- **ViewContent**: Tracked for service/portfolio views

### 4. **CRM Integration**
- All pixel data is automatically included when leads are created
- Tracks pixel ID, event ID, source, campaign
- Visible in CRM dashboard
- Used for lead scoring and attribution

## 📋 Components

### 1. **Pixel Tracker Utility** (`src/lib/pixelTracker.ts`)
- `initializePixelTracking()` - Initializes tracking on page load
- `getPixelData()` - Retrieves stored pixel data
- `savePixelData()` - Saves pixel data to localStorage
- `trackPixelEvent()` - Tracks events and stores event IDs
- `getPixelDataForAPI()` - Formats data for API submission
- `extractUTMParams()` - Extracts UTM parameters from URL
- `determinePixelSource()` - Determines traffic source

### 2. **Pixel Initializer** (`src/components/PixelInitializer.tsx`)
- Runs on every page load
- Captures UTM parameters
- Initializes pixel tracking
- Updates on route changes

### 3. **Enhanced Facebook Pixel** (`src/components/FacebookPixel.tsx`)
- Automatically stores pixel event data
- Tracks all events with event IDs
- Integrates with pixel tracker utility

## 🔧 Configuration

### Environment Variables

Add these to your `.env.local`:

```bash
# Main Facebook Pixel ID
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=682771494258551

# Doctor Solution Pixel ID (optional)
NEXT_PUBLIC_DOCTOR_SOLUTION_PIXEL_ID=874258995040277
```

### How It Works

1. **Page Load**:
   - `PixelInitializer` component runs
   - Extracts UTM parameters from URL
   - Determines traffic source
   - Stores pixel data in localStorage

2. **Pixel Events**:
   - Facebook Pixel fires events
   - Event IDs are generated and stored
   - Pixel data is updated with event information

3. **Contact Form Submission**:
   - Pixel data is retrieved from localStorage
   - Included in form submission
   - Saved to Lead in CRM with pixel tracking info

4. **CRM Display**:
   - Pixel data visible in lead details
   - Shows pixel ID, source, campaign
   - Used for lead attribution

## 📊 Tracked Data

The system captures:

- **Pixel ID**: Facebook Pixel identifier
- **Event ID**: Unique event identifier
- **Event Type**: Type of event (PageView, Lead, etc.)
- **Source**: Traffic source (facebook, google, website, etc.)
- **Campaign**: Campaign name from UTM parameters
- **UTM Parameters**: utm_source, utm_medium, utm_campaign, utm_term, utm_content
- **Click IDs**: fbclid (Facebook), gclid (Google)
- **Timestamp**: When data was captured

## 🎨 Usage Examples

### Check Pixel Data in Browser Console

```javascript
// Get stored pixel data
import { getPixelData } from '@/lib/pixelTracker';
const data = getPixelData();
console.log(data);
```

### Manual Event Tracking

```javascript
import { trackPixelEvent } from '@/lib/pixelTracker';
trackPixelEvent('CustomEvent', 'event_123', { customData: 'value' });
```

## 🔍 Testing

### Test UTM Parameters

Visit your website with UTM parameters:
```
https://pixelforgebd.com/?utm_source=facebook&utm_medium=cpc&utm_campaign=test_campaign
```

The pixel tracker will automatically capture these parameters.

### Test Facebook Click ID

Visit with Facebook click ID:
```
https://pixelforgebd.com/?fbclid=test_fbclid_123
```

The system will detect this as a Facebook source.

### Verify in CRM

1. Submit a contact form
2. Go to `/admin/crm`
3. View the lead details
4. Check the "Facebook Pixel Tracking" section

## 🚀 Benefits

1. **Complete Attribution**: Know exactly where leads come from
2. **Campaign Tracking**: Track which campaigns generate leads
3. **ROI Measurement**: Measure Facebook ad performance
4. **Lead Scoring**: Facebook leads get higher scores
5. **CRM Integration**: All data flows to CRM automatically

## 📝 Notes

- Pixel data expires after 30 days
- Data is stored client-side in localStorage
- Works with cookie consent (only tracks with marketing consent)
- Automatically handles multiple pixel IDs
- No manual configuration needed after setup

## 🔐 Privacy

- Respects cookie consent settings
- Only tracks with marketing consent
- Data stored locally (not sent to third parties)
- GDPR compliant

---

**Setup Complete!** Your pixel tracking system is now active and will automatically capture all necessary data for CRM integration.

