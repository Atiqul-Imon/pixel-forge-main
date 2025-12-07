# Authentication System Setup

This document explains how to set up the robust authentication system for Pixel Forge.

## 🔐 **Features**

- **User Registration & Login** - Complete user management
- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt with salt rounds
- **Role-based Access** - Admin and user roles
- **Protected Routes** - Middleware for route protection
- **Session Management** - HTTP-only cookies
- **Password Security** - Minimum 6 characters, validation

## 🚀 **Setup Instructions**

### 1. **Environment Variables**

Add these to your `.env.local` file:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pixel-forge?retryWrites=true&w=majority

# JWT Secret (generate a strong secret for production)
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@pixelforgebd.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://pixelforgebd.com
```

### 2. **Create Admin User**

Run this command to create the first admin user:

```bash
npm run create-admin
```

**Default Admin Credentials:**
- Email: `admin@pixelforgebd.com`
- Password: [Generated securely by create-admin script - check console output]

⚠️ **Important:** 
- The script generates a secure random password
- Save the password in a secure password manager immediately
- Change the password after first login if desired

### 3. **Start the Application**

```bash
npm run dev
```

## 📁 **File Structure**

```
src/
├── lib/
│   ├── auth.ts                 # Authentication utilities
│   └── models/
│       └── User.ts            # User MongoDB model
├── contexts/
│   └── AuthContext.tsx        # React context for auth state
├── components/
│   ├── LoginForm.tsx          # Login form component
│   └── RegisterForm.tsx       # Registration form component
├── app/
│   ├── api/auth/              # Authentication API routes
│   │   ├── login/route.ts
│   │   ├── register/route.ts
│   │   ├── logout/route.ts
│   │   ├── me/route.ts
│   │   └── change-password/route.ts
│   ├── admin/
│   │   ├── login/page.tsx     # Admin login page
│   │   └── page.tsx           # Admin dashboard
│   ├── login/page.tsx         # User login page
│   └── register/page.tsx      # User registration page
└── types/
    └── auth.ts                # TypeScript types
```

## 🔧 **API Endpoints**

### **Authentication Routes**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | User registration | No |
| POST | `/api/auth/login` | User login | No |
| POST | `/api/auth/logout` | User logout | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/change-password` | Change password | Yes |

### **Admin Routes**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/admin/login` | Admin login | No |
| POST | `/api/admin/logout` | Admin logout | No |
| GET | `/api/admin/check-auth` | Check admin auth | No |
| GET | `/api/admin/messages` | Get contact messages | Admin |
| PATCH | `/api/admin/messages` | Update message status | Admin |

## 🛡️ **Security Features**

### **Password Security**
- Minimum 6 characters
- bcrypt hashing with 12 salt rounds
- Password confirmation validation

### **JWT Security**
- 7-day expiration
- HTTP-only cookies
- Secure flag in production
- SameSite strict

### **Input Validation**
- Email format validation
- Required field validation
- SQL injection prevention
- XSS protection

### **Rate Limiting**
- Built-in protection against brute force
- Request throttling

## 🎯 **Usage Examples**

### **Frontend Authentication**

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, isAdmin, login, logout } = useAuth();

  if (isAuthenticated) {
    return <div>Welcome, {user?.name}!</div>;
  }

  return <div>Please log in</div>;
}
```

### **Protected Routes**

```tsx
// Admin-only component
function AdminPanel() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/admin/login');
      return;
    }
    if (!isAdmin) {
      router.push('/');
      return;
    }
  }, [user, isAdmin, router]);

  return <div>Admin content</div>;
}
```

### **API Authentication**

```tsx
// Making authenticated requests
const response = await fetch('/api/protected-route', {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
  credentials: 'include',
});
```

## 🔄 **User Roles**

### **Admin Role**
- Access to admin dashboard
- Manage contact messages
- Create/edit blog posts
- Full system access

### **User Role**
- Basic account access
- View public content
- Submit contact forms

## 🚨 **Important Notes**

1. **Change Default Password**: Always change the admin password after first login
2. **JWT Secret**: Use a strong, random JWT secret in production
3. **HTTPS**: Always use HTTPS in production for secure cookies
4. **Environment Variables**: Never commit sensitive environment variables
5. **Database Security**: Use MongoDB Atlas with proper access controls

## 🐛 **Troubleshooting**

### **Common Issues**

1. **"Authentication required" error**
   - Check if user is logged in
   - Verify JWT token is valid
   - Check cookie settings

2. **"Admin access required" error**
   - Verify user has admin role
   - Check database user record

3. **Login not working**
   - Check email/password format
   - Verify user exists in database
   - Check password hashing

4. **Session not persisting**
   - Check cookie settings
   - Verify JWT secret
   - Check browser cookie settings

## 📞 **Support**

For authentication issues, check:
1. Browser console for errors
2. Server logs for API errors
3. Database connection status
4. Environment variables

---

**Security Note**: This authentication system is production-ready but always follow security best practices and keep dependencies updated.
