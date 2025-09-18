# 🚀 Pixel Forge Admin Panel & Lead Generation Setup

## ✅ **What's Been Implemented:**

### 1. **Admin Panel** (`/admin`)
- **Lead Management Dashboard** - View all contact form submissions
- **Lead Status Tracking** - New, Read, Contacted, Closed
- **Search & Filter** - Find leads by name, email, service
- **Direct Actions** - Reply via email, update status
- **Analytics** - Lead counts, monthly stats
- **Authentication** - Password-protected access

### 2. **Facebook Pixel Integration**
- **Lead Tracking** - Contact form submissions
- **Event Tracking** - Page views, WhatsApp clicks, service interest
- **Conversion Optimization** - Ready for Facebook ads
- **Custom Audiences** - Build lookalike audiences

### 3. **Email Notifications**
- **Instant Alerts** - Get notified of new leads
- **Professional Templates** - Branded email notifications
- **Admin Panel Access** - Direct links to manage leads

## 🔧 **Setup Instructions:**

### **Step 1: Environment Variables**
Create `.env.local` file:
```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Facebook Pixel
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_facebook_pixel_id

# Admin Authentication
ADMIN_PASSWORD=your_secure_password

# Email Notifications (Optional)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=admin@pixelforgebd.com

# Site URL
NEXT_PUBLIC_SITE_URL=https://pixelforgebd.com
```

### **Step 2: Facebook Pixel Setup**
1. Go to [Facebook Business Manager](https://business.facebook.com)
2. Navigate to Events Manager
3. Create a new Pixel or use existing one
4. Copy your Pixel ID (e.g., 123456789012345)
5. Add to environment variables

### **Step 3: Email Setup (Optional)**
1. Use Gmail with App Password:
   - Enable 2FA on Gmail
   - Generate App Password
   - Use App Password in EMAIL_PASS

### **Step 4: Deploy to Vercel**
1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## 📊 **Admin Panel Features:**

### **Access:**
- URL: `https://pixelforgebd.com/admin`
- Login: `https://pixelforgebd.com/admin/login`
- Default Password: `pixelforge2024` (change in env)

### **Dashboard:**
- **Total Leads** - All contact form submissions
- **New Leads** - Unread submissions
- **Contacted** - Leads you've reached out to
- **This Month** - Current month's leads

### **Lead Management:**
- **View Details** - Click any lead to see full details
- **Status Updates** - Mark as Read, Contacted, Closed
- **Email Reply** - Direct email links
- **Search & Filter** - Find specific leads

## 🎯 **Facebook Ads Strategy:**

### **Campaign Types:**
1. **Lead Generation**
   - Objective: Lead Generation
   - Conversion: Contact form submissions
   - Target: Bangladesh, web development keywords

2. **Traffic Campaigns**
   - Objective: Traffic
   - Target: Contact page
   - Retargeting: Website visitors

3. **Engagement Campaigns**
   - Objective: Engagement
   - Target: Facebook page posts
   - Boost: High-performing content

### **Targeting Keywords:**
- "web development Bangladesh"
- "website design Dhaka"
- "e-commerce development"
- "digital marketing Bangladesh"
- "custom website development"

### **Custom Audiences:**
1. **Website Visitors** - All site visitors
2. **Contact Page Visitors** - High-intent users
3. **Lead Lookalikes** - Similar to your leads

## 📈 **Lead Tracking Events:**

Your website tracks these Facebook events:
- **PageView** - Every page visit
- **Lead** - Contact form submission
- **CompleteRegistration** - Form completion
- **Contact** - WhatsApp clicks
- **ViewContent** - Service interest

## 🔐 **Security Features:**

- **Password Protection** - Admin panel requires authentication
- **Session Management** - 24-hour sessions
- **Secure Cookies** - HTTP-only, secure cookies
- **Environment Variables** - Sensitive data protected

## 📱 **Mobile Responsive:**

- **Admin Panel** - Works on all devices
- **Contact Form** - Mobile-optimized
- **Lead Management** - Touch-friendly interface

## 🚀 **Next Steps:**

1. **Set up Facebook Pixel** (get your ID)
2. **Configure environment variables**
3. **Deploy to Vercel**
4. **Test contact form**
5. **Create Facebook ad campaigns**
6. **Monitor admin panel for leads**

## 📞 **Support:**

The admin panel is now ready to:
- ✅ Collect leads automatically
- ✅ Track Facebook Pixel events
- ✅ Send email notifications
- ✅ Manage lead pipeline
- ✅ Boost Facebook page with targeted ads

Your website is now a complete lead generation system! 🎉

