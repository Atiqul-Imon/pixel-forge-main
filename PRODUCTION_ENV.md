# Production Environment Variables for Facebook Pixel

## 🎯 Required Facebook Pixel Environment Variables

### For Vercel Production Deployment

Add these environment variables in your **Vercel Dashboard** → **Settings** → **Environment Variables**:

### 1. **Main Facebook Pixel ID** (Required)
```
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=682771494258551
```
- **Purpose**: Main pixel for tracking all website visitors
- **Used in**: Root layout, all pages except doctor-solution
- **Environment**: Production, Preview, Development

### 2. **Doctor Solution Pixel ID** (Required)
```
NEXT_PUBLIC_DOCTOR_SOLUTION_PIXEL_ID=874258995040277
```
- **Purpose**: Dedicated pixel for doctor solution page tracking
- **Used in**: `/doctor-solution` page only
- **Environment**: Production, Preview, Development

---

## 📋 Complete Production Environment Variables List

### Required Variables

```bash
# Database
MONGODB_URI=mongodb+srv://atiqulimondev_db_user:A35TFXREqNvwvs82@cluster0.xawbviz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# Site URL
NEXT_PUBLIC_SITE_URL=https://pixelforgebd.com

# Facebook Pixels
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=682771494258551
NEXT_PUBLIC_DOCTOR_SOLUTION_PIXEL_ID=874258995040277

# Node Environment
NODE_ENV=production
```

### Optional Variables

```bash
# Google Analytics (if using)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# JWT Secret (for admin authentication)
JWT_SECRET=your-secure-jwt-secret-min-32-characters

# Email Configuration (if using email service)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## 🚀 How to Set in Vercel

### Method 1: Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Select your project: **pixel-forge-website**
3. Click **Settings** tab
4. Click **Environment Variables** in sidebar
5. Add each variable:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` | `682771494258551` | ✅ Production<br>✅ Preview<br>✅ Development |
| `NEXT_PUBLIC_DOCTOR_SOLUTION_PIXEL_ID` | `874258995040277` | ✅ Production<br>✅ Preview<br>✅ Development |
| `MONGODB_URI` | `mongodb+srv://...` | ✅ Production<br>✅ Preview<br>✅ Development |
| `NEXT_PUBLIC_SITE_URL` | `https://pixelforgebd.com` | ✅ Production<br>✅ Preview<br>✅ Development |
| `NODE_ENV` | `production` | ✅ Production only |

6. Click **Save** after each variable
7. **Redeploy** your application for changes to take effect

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Set environment variables
vercel env add NEXT_PUBLIC_FACEBOOK_PIXEL_ID production
# Enter: 682771494258551

vercel env add NEXT_PUBLIC_DOCTOR_SOLUTION_PIXEL_ID production
# Enter: 874258995040277

vercel env add NEXT_PUBLIC_SITE_URL production
# Enter: https://pixelforgebd.com

# Pull environment variables to verify
vercel env pull .env.production
```

---

## ✅ Verification Checklist

After setting environment variables:

- [ ] `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` is set to `682771494258551`
- [ ] `NEXT_PUBLIC_DOCTOR_SOLUTION_PIXEL_ID` is set to `874258995040277`
- [ ] `NEXT_PUBLIC_SITE_URL` is set to `https://pixelforgebd.com`
- [ ] All variables are set for **Production**, **Preview**, and **Development** environments
- [ ] Application has been **redeployed** after adding variables

---

## 🧪 Testing in Production

### 1. Test Main Pixel

Visit your production site:
```
https://pixelforgebd.com
```

Open browser console and check:
```javascript
// Should show pixel ID
console.log(window.fbq);
```

### 2. Test Doctor Solution Pixel

Visit:
```
https://pixelforgebd.com/doctor-solution
```

Check that the dedicated pixel is loaded.

### 3. Test Pixel Tracking

1. Visit site with UTM parameters:
   ```
   https://pixelforgebd.com/?utm_source=facebook&utm_campaign=test
   ```

2. Submit contact form

3. Check CRM at `/admin/crm`

4. Verify lead shows:
   - ✅ Pixel ID: `682771494258551`
   - ✅ Source: `facebook`
   - ✅ Campaign: `test`

### 4. Verify in Facebook Events Manager

1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager2)
2. Select your pixel: **Pixel Forge Pixel** (`682771494258551`)
3. Check **Test Events** tab
4. Visit your site and perform actions
5. Events should appear in real-time

---

## 🔍 Troubleshooting

### Pixel Not Loading

**Issue**: Pixel not tracking events

**Solutions**:
1. Check environment variables are set correctly
2. Verify variable names start with `NEXT_PUBLIC_`
3. Redeploy application after adding variables
4. Check browser console for errors
5. Verify cookie consent is granted

### Wrong Pixel ID

**Issue**: Wrong pixel tracking on pages

**Check**:
- Main pages should use: `682771494258551`
- Doctor solution page should use: `874258995040277`
- Verify in browser DevTools → Network → Filter: `fbevents.js`

### Events Not Showing in CRM

**Issue**: Leads created but no pixel data

**Solutions**:
1. Check localStorage has pixel data:
   ```javascript
   localStorage.getItem('fb_pixel_data')
   ```
2. Verify contact form includes pixel data in submission
3. Check API logs for pixel data in request
4. Verify Lead model saves pixel fields

---

## 📝 Notes

- **`NEXT_PUBLIC_` prefix**: Required for client-side access in Next.js
- **Environment scope**: Set for all environments (Production, Preview, Development) for consistency
- **Redeploy required**: Changes to environment variables require a new deployment
- **No quotes needed**: Don't wrap values in quotes in Vercel dashboard
- **Case sensitive**: Variable names are case-sensitive

---

## 🎯 Quick Reference

### Your Pixel IDs:
- **Main Pixel**: `682771494258551` (Pixel Forge Pixel)
- **Doctor Solution Pixel**: `874258995040277` (Doctor Solution Pixel)

### Production URL:
- **Site**: `https://pixelforgebd.com`

### Where to Set:
- **Vercel Dashboard**: Settings → Environment Variables

---

**✅ Once these are set, your Facebook Pixel tracking will work perfectly in production!**

