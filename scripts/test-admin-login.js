/**
 * Script to test admin login
 * 
 * Usage: node scripts/test-admin-login.js
 */

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI not found in .env.local');
  process.exit(1);
}

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  isActive: Boolean,
  emailVerified: Boolean,
  loginAttempts: Number,
  sessions: Array,
  twoFactorEnabled: Boolean,
}, {
  timestamps: true,
});

async function testAdminLogin() {
  try {
    console.log('🔌 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ Connected to MongoDB Atlas\n');

    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    // Test credentials
    // ⚠️ SECURITY: Never hardcode passwords in scripts
    // Get credentials from environment variables or secure storage
    const testEmail = process.env.ADMIN_EMAIL || 'admin@pixelforgebd.com';
    const testPassword = process.env.ADMIN_PASSWORD;
    
    if (!testPassword) {
      console.error('❌ Error: ADMIN_PASSWORD environment variable not set');
      console.error('   Set ADMIN_PASSWORD in .env.local for testing');
      await mongoose.disconnect();
      process.exit(1);
    }

    console.log('🔍 Looking for admin user...');
    const admin = await User.findOne({ email: testEmail });

    if (!admin) {
      console.log('❌ Admin user not found!');
      console.log('   Run: npm run create-admin\n');
      await mongoose.disconnect();
      return;
    }

    console.log('✅ Admin user found!');
    console.log(`   Name: ${admin.name}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Role: ${admin.role}`);
    console.log(`   IsActive: ${admin.isActive}`);
    console.log(`   EmailVerified: ${admin.emailVerified}`);
    console.log(`   LoginAttempts: ${admin.loginAttempts}`);
    console.log(`   IsLocked: ${admin.lockUntil && admin.lockUntil > new Date()}\n`);

    console.log('🔐 Testing password verification...');
    const isPasswordValid = await bcrypt.compare(testPassword, admin.password);

    if (isPasswordValid) {
      console.log('✅ Password verification SUCCESSFUL!');
      console.log('   The password is correct.\n');
    } else {
      console.log('❌ Password verification FAILED!');
      console.log('   The password does not match.\n');
    }

    // Test login API endpoint
    console.log('🌐 Testing login API endpoint...');
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: testEmail,
          password: testPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log('✅ Login API test SUCCESSFUL!');
        console.log(`   Status: ${response.status}`);
        console.log(`   User ID: ${data.user?.id}`);
        console.log(`   User Name: ${data.user?.name}`);
        console.log(`   User Role: ${data.user?.role}`);
        console.log(`   Token: ${data.token ? 'Received' : 'Missing'}\n`);
      } else {
        console.log('❌ Login API test FAILED!');
        console.log(`   Status: ${response.status}`);
        console.log(`   Message: ${data.message || 'Unknown error'}`);
        if (data.errors) {
          console.log(`   Errors:`, data.errors);
        }
        console.log();
      }
    } catch (apiError) {
      console.log('⚠️  Could not test API endpoint (server may not be running)');
      console.log(`   Error: ${apiError.message}\n`);
    }

    console.log('═══════════════════════════════════════════════════════════');
    console.log('📋 LOGIN TEST SUMMARY');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`✅ Admin user exists: YES`);
    console.log(`✅ Password verification: ${isPasswordValid ? 'PASS' : 'FAIL'}`);
    console.log(`✅ Account status: ${admin.isActive ? 'ACTIVE' : 'INACTIVE'}`);
    console.log(`✅ Email verified: ${admin.emailVerified ? 'YES' : 'NO'}`);
    console.log(`✅ Role: ${admin.role}`);
    console.log('═══════════════════════════════════════════════════════════\n');

    if (isPasswordValid && admin.isActive) {
      console.log('🎉 Admin login should work!');
      console.log(`   Login URL: ${baseUrl}/admin/login`);
      console.log(`   Email: ${testEmail}`);
      console.log(`   Password: ${testPassword}\n`);
    } else {
      console.log('⚠️  There may be issues with login:');
      if (!isPasswordValid) {
        console.log('   - Password does not match');
      }
      if (!admin.isActive) {
        console.log('   - Account is not active');
      }
      console.log();
    }

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    console.log('✅ Test completed!\n');

  } catch (error) {
    console.error('❌ Error testing admin login:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run the test
testAdminLogin();

