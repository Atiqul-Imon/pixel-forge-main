# Environment Variables Setup for Pixel Forge

## 🔧 **Required Environment Variables**

Create a `.env.local` file in your project root with these variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://atiqulimondev_db_user:A35TFXREqNvwvs82@cluster0.xawbviz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# Admin Panel
ADMIN_PASSWORD=your_secure_admin_password

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY=your_public_key_here
IMAGEKIT_PRIVATE_KEY=your_private_key_here
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/yhlwdvbf5/PixelForge/
IMAGEKIT_AUTH_ENDPOINT=/api/admin/imagekit/auth

# Email Configuration (Optional)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=admin@pixelforgebd.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_facebook_pixel_id
```

## 🚀 **ImageKit Setup Steps**

### **1. Get Your ImageKit Credentials**

1. Go to [ImageKit Dashboard](https://imagekit.io/dashboard)
2. Navigate to **Developer Options** → **API Keys**
3. Copy your **Public Key** and **Private Key**

### **2. Update Your .env.local File**

Replace the ImageKit placeholders with your actual credentials:

```env
# ImageKit Configuration (Replace with your actual keys)
IMAGEKIT_PUBLIC_KEY=public_xxxxxxxxxxxxxxxx
IMAGEKIT_PRIVATE_KEY=private_xxxxxxxxxxxxxxxx
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/yhlwdvbf5/PixelForge/
IMAGEKIT_AUTH_ENDPOINT=/api/admin/imagekit/auth
```

### **3. Test ImageKit Connection**

After setting up, test the connection:

1. Start your development server: `npm run dev`
2. Go to `/admin/login`
3. Login with your admin password
4. Go to `/admin/blog/new`
5. Try uploading an image in the "Featured Image" section

## 🔍 **How to Find Your ImageKit Keys**

### **Public Key:**
- Format: `public_xxxxxxxxxxxxxxxx`
- Found in: Dashboard → Developer Options → API Keys
- Safe to use in frontend code

### **Private Key:**
- Format: `private_xxxxxxxxxxxxxxxx`
- Found in: Dashboard → Developer Options → API Keys
- **NEVER expose in frontend code**
- Only use in server-side API routes

## 📁 **ImageKit Folder Structure**

Your images will be organized as:
```
https://ik.imagekit.io/yhlwdvbf5/PixelForge/
├── pixel-forge-blog/
│   ├── featured-images/
│   ├── blog-content/
│   └── thumbnails/
```

## 🧪 **Testing the Setup**

### **1. Test Image Upload:**
1. Go to `/admin/blog/new`
2. Scroll to "Featured Image" section
3. Click "Choose File" or drag & drop an image
4. You should see upload progress
5. Image should appear after upload

### **2. Test Blog Creation:**
1. Fill in the blog post form
2. Upload a featured image
3. Add content using the rich text editor
4. Set category and tags
5. Click "Create Post"
6. Check if post appears in `/admin/blog`

### **3. Test Public Blog:**
1. Go to `/blog`
2. Check if your new post appears
3. Click on the post to view full content
4. Verify images load correctly

## ⚠️ **Common Issues & Solutions**

### **Issue: "ImageKit configuration not found"**
**Solution:** Check that all ImageKit environment variables are set correctly

### **Issue: "Upload failed"**
**Solution:** 
- Verify private key is correct
- Check ImageKit account is active
- Ensure you have upload permissions

### **Issue: "Images not loading"**
**Solution:**
- Verify URL endpoint is correct
- Check public key is set
- Ensure image URLs are properly formatted

### **Issue: "Authentication failed"**
**Solution:**
- Double-check private key
- Verify environment variables are loaded
- Restart development server

## 🚀 **Production Setup (Vercel)**

When deploying to Vercel, add these same environment variables in:
1. Vercel Dashboard → Your Project → Settings
2. Environment Variables section
3. Add each variable with production values

## 📊 **Expected Results**

After setup, you should have:
- ✅ **Image uploads** working in admin panel
- ✅ **Optimized images** served via ImageKit CDN
- ✅ **Rich text editor** functioning properly
- ✅ **Blog posts** creating and displaying correctly
- ✅ **SEO optimization** working automatically

## 🎯 **Next Steps**

1. **Set up ImageKit account** and get credentials
2. **Create .env.local** file with your variables
3. **Test image upload** in admin panel
4. **Create your first blog post**
5. **Deploy to Vercel** with production environment variables

Your dynamic blog system will be fully functional! 🚀
