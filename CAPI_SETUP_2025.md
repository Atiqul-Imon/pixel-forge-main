# Facebook Conversions API (CAPI) Setup Guide 2025

## 🚀 **2025 Meta Pixel + CAPI Implementation Complete!**

Your Pixel Forge website now has **dual tracking** - both Meta Pixel (client-side) and Conversions API (server-side) for maximum accuracy and compliance with 2025 Facebook advertising requirements.

## ✅ **What's Been Implemented**

### **1. Dual Tracking System**
- **Meta Pixel**: Client-side tracking for immediate user interactions
- **Conversions API**: Server-side tracking for reliable data transmission
- **Event Deduplication**: Same events sent to both systems with matching IDs
- **Enhanced Matching**: Better user identification and attribution

### **2. Server-Side Events**
- **Lead Generation**: Contact form submissions with user data
- **Page Views**: Automatic tracking on all pages
- **Service Interest**: When users view specific services
- **Portfolio Views**: Project clicks and engagement
- **Contact Actions**: WhatsApp clicks and form submissions

### **3. Privacy Compliance**
- **PII Hashing**: All personal data is SHA-256 hashed
- **GDPR Ready**: Server-side tracking respects privacy settings
- **iOS 14.5+ Compatible**: Works with App Tracking Transparency
- **Cookie-Less Tracking**: Server-side events don't rely on cookies

## 🔧 **Environment Variables Setup**

Add these to your `.env.local` file:

```env
# Facebook Pixel (Client-side)
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_facebook_pixel_id

# Facebook Conversions API (Server-side)
FACEBOOK_ACCESS_TOKEN=your_facebook_access_token

# Optional: Test Event Code for debugging
FACEBOOK_TEST_EVENT_CODE=your_test_event_code
```

## 📋 **Step-by-Step Setup Instructions**

### **Step 1: Get Facebook Pixel ID**
1. Go to [Facebook Business Manager](https://business.facebook.com)
2. Navigate to **Events Manager**
3. Select your Pixel or create a new one
4. Copy your Pixel ID (format: `123456789012345`)

### **Step 2: Get Facebook Access Token**
1. In Facebook Business Manager, go to **Business Settings**
2. Navigate to **System Users** → **Add System User**
3. Create a system user with **Advertiser** permissions
4. Generate a **System User Access Token**
5. Grant access to your Ad Account and Pixel

### **Step 3: Test Event Code (Optional)**
1. In Events Manager, go to **Test Events**
2. Create a new test event code
3. Use this for debugging during development

### **Step 4: Update Environment Variables**
```env
# Replace with your actual values
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=123456789012345
FACEBOOK_ACCESS_TOKEN=EAABwzLixnjYBO...
FACEBOOK_TEST_EVENT_CODE=TEST12345
```

### **Step 5: Deploy to Production**
1. Add environment variables to Vercel dashboard
2. Deploy your website
3. Test the implementation

## 🧪 **Testing Your CAPI Implementation**

### **1. Health Check**
Visit: `https://yourdomain.com/api/facebook/capi`
Should return:
```json
{
  "status": "ok",
  "capiConfigured": true,
  "pixelId": "configured",
  "accessToken": "configured"
}
```

### **2. Test Contact Form**
1. Go to `/contact`
2. Fill out and submit the form
3. Check Facebook Events Manager for:
   - **Lead** event (client-side)
   - **Lead** event (server-side CAPI)
   - Both should have matching event IDs

### **3. Test Portfolio Clicks**
1. Go to `/portfolio`
2. Click on any project
3. Check Events Manager for **ViewContent** events

### **4. Test WhatsApp Clicks**
1. Go to `/contact`
2. Click WhatsApp link
3. Check Events Manager for **Contact** events

## 📊 **Event Types Tracked**

### **Client-Side (Meta Pixel)**
- `PageView` - Every page visit
- `Lead` - Contact form submissions
- `ViewContent` - Service/portfolio views
- `Contact` - WhatsApp clicks
- `CompleteRegistration` - Form completions

### **Server-Side (CAPI)**
- `PageView` - Server-side page tracking
- `Lead` - Contact form with user data
- `ViewContent` - Service interest tracking
- `Contact` - Contact method tracking
- `PortfolioView` - Project engagement

## 🎯 **Benefits of Dual Tracking**

### **1. Improved Accuracy**
- **Redundancy**: If one method fails, the other works
- **Better Attribution**: More accurate conversion tracking
- **Enhanced Matching**: Better user identification

### **2. Privacy Compliance**
- **iOS 14.5+**: Works with App Tracking Transparency
- **Cookie Deprecation**: Server-side events don't rely on cookies
- **GDPR Compliance**: Better privacy controls

### **3. Better Campaign Performance**
- **More Data**: Facebook gets more conversion data
- **Better Optimization**: Improved algorithm learning
- **Lower Costs**: Better audience targeting

## 🔍 **Monitoring & Debugging**

### **Facebook Events Manager**
1. Go to **Events Manager** → **Test Events**
2. Use your test event code to see real-time events
3. Check both **Browser** and **Server** events

### **Browser Console**
- CAPI events are logged to console
- Look for "CAPI event failed" warnings
- Check network tab for `/api/facebook/capi` requests

### **Server Logs**
- Check Vercel function logs
- Look for CAPI API responses
- Monitor error rates

## 🚀 **Campaign Optimization**

### **1. Custom Audiences**
Create audiences based on:
- **Contact Form Submissions** (Lead events)
- **Portfolio Viewers** (ViewContent events)
- **Service Interest** (ViewContent events)
- **WhatsApp Clicks** (Contact events)

### **2. Lookalike Audiences**
- **1% Lookalike**: Based on contact form leads
- **3% Lookalike**: Based on portfolio viewers
- **5% Lookalike**: Based on service page visitors

### **3. Campaign Objectives**
- **Lead Generation**: Use Lead events as conversion
- **Traffic**: Use PageView events
- **Engagement**: Use ViewContent events
- **Messages**: Use Contact events

## 📈 **Expected Results**

### **Immediate Benefits**
- **Better Attribution**: More accurate conversion tracking
- **Improved Matching**: Better user identification
- **Enhanced Data**: More conversion data for Facebook

### **Long-term Benefits**
- **Lower CPA**: Better optimization leads to lower costs
- **Higher ROAS**: Improved targeting and attribution
- **Better Insights**: More detailed conversion data

## ⚠️ **Common Issues & Solutions**

### **Issue: "CAPI not configured"**
**Solution**: Check environment variables are set correctly

### **Issue: "Access token invalid"**
**Solution**: Regenerate system user access token

### **Issue: "Events not appearing"**
**Solution**: 
- Check test event code
- Verify pixel ID is correct
- Check server logs for errors

### **Issue: "Duplicate events"**
**Solution**: This is normal - events are sent to both Pixel and CAPI with matching IDs

## 🎯 **Next Steps**

1. **Set up environment variables** with your Facebook credentials
2. **Deploy to production** with CAPI enabled
3. **Test all tracking events** using test event code
4. **Create custom audiences** based on tracked events
5. **Launch campaigns** with improved tracking
6. **Monitor performance** in Events Manager

## 📞 **Support**

Your website now has **enterprise-level tracking** that meets 2025 Facebook advertising standards. The dual tracking system ensures maximum accuracy and compliance while providing better campaign performance.

**Ready for Facebook & Instagram campaigns with 2025 best practices!** 🚀

---

## 🔗 **Useful Links**

- [Facebook Business Manager](https://business.facebook.com)
- [Events Manager](https://business.facebook.com/events_manager)
- [Conversions API Documentation](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [Test Events Tool](https://business.facebook.com/events_manager/test_events)
