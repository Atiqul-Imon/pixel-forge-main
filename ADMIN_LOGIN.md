# Admin Login Guide

## 🔑 Admin Credentials

**⚠️ SECURITY NOTICE:** Admin credentials are stored securely and should never be committed to version control.

To retrieve admin credentials:
1. Check your secure password manager
2. Or run: `npm run reset-admin-password` to generate new credentials
3. Or contact your system administrator

```
📧 Email:    admin@pixelforgebd.com
🔒 Password: [Stored securely - not in repository]
```

---

## 🌐 Login URLs

### Local Development:
```
http://localhost:3000/admin/login
```

### Production:
```
https://pixelforgebd.com/admin/login
```

---

## 📝 Step-by-Step Login Instructions

1. **Navigate to Login Page**
   - Go to: `https://pixelforgebd.com/admin/login`
   - Or: `http://localhost:3000/admin/login` (for local)

2. **Enter Credentials**
   - **Email**: `admin@pixelforgebd.com`
   - **Password**: [Use credentials from your secure password manager]

3. **Click "Sign in"**

4. **After Login**
   - You'll be redirected to `/admin` (Dashboard)
   - You'll have access to:
     - CRM Dashboard (`/admin/crm`)
     - Blog Management (`/admin/blog`)
     - Messages (`/admin/messages`)
     - Settings (`/admin/settings`)

---

## ⚠️ Troubleshooting

### If you get "Invalid email or password" error:

1. **Check the password carefully** - Ensure you're using the correct password:
   - Verify you're copying the entire password from your secure storage
   - Check for any hidden spaces before/after
   - If password contains special characters, ensure they're copied correctly

2. **Verify admin user exists** (if on production):
   - The admin was created in your local MongoDB
   - If you're trying to login on production, you need to create the admin there too
   - Run the script on production server or create admin via MongoDB Atlas

3. **Check MongoDB connection**:
   - Ensure `MONGODB_URI` is set correctly in production
   - Verify the database connection is working

4. **Check for account lock**:
   - Too many failed attempts can lock the account
   - Wait 15 minutes or reset the account in database

---

## 🔐 Creating Admin on Production

If you need to create the admin user on production:

### Option 1: Run Script on Production Server
```bash
# SSH into your production server
# Navigate to project directory
npm run create-admin
```

### Option 2: Create via MongoDB Atlas
1. Go to MongoDB Atlas Dashboard
2. Connect to your cluster
3. Navigate to your database
4. Find the `users` collection
5. Insert a new document with:
   ```json
   {
     "name": "Pixel Forge Admin",
     "email": "admin@pixelforgebd.com",
     "password": "<hashed_password>",
     "role": "admin",
     "isActive": true,
     "emailVerified": true,
     "loginAttempts": 0,
     "sessions": [],
     "twoFactorEnabled": false
   }
   ```
   **Note**: You'll need to hash the password using bcrypt with 12 salt rounds.

### Option 3: Use MongoDB Compass
1. Connect to your MongoDB Atlas cluster
2. Navigate to `users` collection
3. Use the script to generate a hashed password
4. Insert the admin user document

---

## 🔄 Reset Password (If Needed)

If you need to reset the admin password:

1. **Run the create-admin script again** (it will detect existing user)
2. **Or manually update in MongoDB**:
   ```javascript
   // In MongoDB shell or Compass
   db.users.updateOne(
     { email: "admin@pixelforgebd.com" },
     { $set: { password: "<new_hashed_password>" } }
   )
   ```

---

## ✅ Verification

After successful login, you should:
- See the admin dashboard
- Have access to CRM at `/admin/crm`
- Be able to manage leads, blog posts, and settings
- See your name in the top right (if implemented)

---

## 🛡️ Security Recommendations

1. **Change Password After First Login**
   - Use a strong, unique password
   - Store it in a password manager

2. **Enable Two-Factor Authentication** (if available)
   - Adds extra security layer

3. **Use Strong Password**
   - At least 16 characters
   - Mix of uppercase, lowercase, numbers, symbols

4. **Don't Share Credentials**
   - Keep admin credentials private
   - Use separate accounts for team members

---

**Current Admin Status:**
- ✅ User exists in database
- ✅ Email: `admin@pixelforgebd.com`
- ✅ Role: `admin`
- ✅ Status: `active`
- ✅ Email Verified: `true`

