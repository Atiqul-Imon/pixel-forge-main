# Facebook Pixel Setup Guide

## 🎯 Facebook Pixel Integration Complete!

Your website is now ready to track leads and boost your Facebook page. Here's what's been implemented:

### ✅ **Features Implemented:**

1. **Admin Panel** (`/admin`)
   - View all contact form submissions
   - Track lead status (New, Read, Contacted, Closed)
   - Search and filter messages
   - Reply directly via email
   - Lead analytics dashboard

2. **Facebook Pixel Tracking**
   - Page views
   - Lead generation (contact form submissions)
   - WhatsApp clicks
   - Service interest tracking
   - Complete registration events

3. **Lead Management**
   - Automatic lead status tracking
   - Email notifications ready
   - Lead analytics and insights

## 🚀 **Setup Instructions:**

### 1. **Get Your Facebook Pixel ID:**
1. Go to [Facebook Business Manager](https://business.facebook.com)
2. Navigate to Events Manager
3. Create a new Pixel or use existing one
4. Copy your Pixel ID (looks like: 123456789012345)

### 2. **Add Environment Variables:**
Create a `.env.local` file in your project root:
```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Facebook Pixel
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_facebook_pixel_id

# Site URL
NEXT_PUBLIC_SITE_URL=https://pixelforgebd.com
```

### 3. **Deploy to Vercel:**
1. Add the environment variables in Vercel dashboard
2. Deploy your website
3. Test the contact form to verify tracking

## 📊 **Facebook Ads Setup:**

### **For Lead Generation Campaigns:**
1. **Create Custom Audience:**
   - Go to Facebook Ads Manager
   - Create Custom Audience → Website Traffic
   - Select "People who visited specific web pages"
   - Add: `pixelforgebd.com/contact`

2. **Create Lookalike Audience:**
   - Based on your contact form leads
   - 1-3% lookalike for best results

3. **Campaign Objectives:**
   - **Lead Generation** - Use contact form as conversion
   - **Traffic** - Drive visitors to contact page
   - **Engagement** - Boost Facebook page posts

### **Recommended Ad Strategies:**

1. **Service-Specific Ads:**
   - Target: "web development Bangladesh"
   - Target: "website design Dhaka"
   - Target: "e-commerce development"

2. **Lookalike Audiences:**
   - Create from your contact form leads
   - Target similar businesses

3. **Retargeting:**
   - Visitors who didn't submit contact form
   - Visitors who clicked WhatsApp but didn't contact

## 🎯 **Tracking Events:**

Your website now tracks these events:
- **PageView** - Every page visit
- **Lead** - Contact form submission
- **CompleteRegistration** - Form completion
- **Contact** - WhatsApp clicks
- **ViewContent** - Service interest

## 📈 **Admin Panel Features:**

Access `/admin` to:
- View all leads in real-time
- Track lead status and progress
- Search and filter leads
- Export lead data
- Reply to leads directly

## 🔧 **Next Steps:**

1. **Set up Facebook Pixel** (get your ID)
2. **Add environment variables**
3. **Deploy to Vercel**
4. **Test contact form**
5. **Create Facebook ad campaigns**
6. **Monitor admin panel for leads**

## 📞 **Support:**

If you need help with Facebook Ads setup or pixel configuration, I can assist you with:
- Creating effective ad campaigns
- Setting up custom audiences
- Optimizing for lead generation
- Analyzing conversion data

Your website is now a lead generation machine! 🚀

