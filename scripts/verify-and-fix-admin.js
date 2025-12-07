/**
 * Script to verify and fix admin password in production database
 * This ensures the password hash matches what we expect
 * 
 * Usage: node scripts/verify-and-fix-admin.js [email] [password]
 */

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI not found in .env.local');
  process.exit(1);
}

// User Schema (simplified for script)
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  isActive: Boolean,
  emailVerified: Boolean,
  loginAttempts: Number,
  lockUntil: Date,
  sessions: Array,
}, {
  timestamps: true,
});

async function verifyAndFixAdmin() {
  try {
    console.log('🔌 Connecting to MongoDB Atlas (Production)...');
    console.log(`📍 Using URI: ${MONGODB_URI.substring(0, 30)}...\n`);
    
    await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ Connected to MongoDB Atlas\n');

    // Get or create User model
    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    // Get email and password from command line
    const adminEmail = (process.argv[2] || 'admin@pixelforgebd.com').trim().toLowerCase();
    const newPassword = process.argv[3] || 'Admin123!@#';

    console.log(`👤 Looking for admin: ${adminEmail}`);

    // Find admin user
    const admin = await User.findOne({ email: adminEmail, role: 'admin' });
    
    if (!admin) {
      console.error(`❌ Error: Admin user with email "${adminEmail}" not found.\n`);
      await mongoose.disconnect();
      process.exit(1);
    }

    console.log(`✅ Found admin user: ${admin.email} (${admin.name})\n`);

    // Display current status
    console.log('📊 Current Account Status:');
    console.log(`   - isActive: ${admin.isActive}`);
    console.log(`   - emailVerified: ${admin.emailVerified}`);
    console.log(`   - loginAttempts: ${admin.loginAttempts}`);
    console.log(`   - lockUntil: ${admin.lockUntil || 'null'}`);
    console.log(`   - isLocked: ${admin.lockUntil && admin.lockUntil.getTime() > Date.now() ? 'YES' : 'NO'}`);
    console.log(`   - password hash: ${admin.password.substring(0, 20)}...\n`);

    // Test current password hash
    console.log('🔐 Testing current password hash...');
    const currentHashValid = await bcrypt.compare(newPassword, admin.password);
    console.log(`   Current hash valid: ${currentHashValid ? '✅ YES' : '❌ NO'}\n`);

    if (!currentHashValid) {
      console.log('⚠️  Password hash does not match! Regenerating...\n');
      
      // Hash new password
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12');
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password and reset everything
      console.log('🔄 Updating password and unlocking account...');
      admin.password = hashedPassword;
      admin.loginAttempts = 0;
      admin.lockUntil = undefined;
      admin.isActive = true;
      admin.emailVerified = true;
      await admin.save();

      console.log('✅ Password updated and account unlocked!\n');

      // Verify new password
      const newHashValid = await bcrypt.compare(newPassword, admin.password);
      console.log(`🔍 New password verification: ${newHashValid ? '✅ PASS' : '❌ FAIL'}\n`);

      if (!newHashValid) {
        console.error('❌ ERROR: Password verification failed after update!');
        await mongoose.disconnect();
        process.exit(1);
      }
    } else {
      console.log('✅ Password hash is correct. Just unlocking account...\n');
      
      // Just unlock if password is correct
      admin.loginAttempts = 0;
      admin.lockUntil = undefined;
      admin.isActive = true;
      admin.emailVerified = true;
      await admin.save();
      
      console.log('✅ Account unlocked!\n');
    }

    // Display credentials
    console.log('═══════════════════════════════════════════════════════════');
    console.log('🔑 ADMIN CREDENTIALS (VERIFIED)');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`📧 Email:    ${adminEmail}`);
    console.log(`🔒 Password: ${newPassword}`);
    console.log('═══════════════════════════════════════════════════════════\n');

    console.log('📍 Login URLs:');
    console.log('   - Production: https://pixelforgebd.com/admin/login');
    console.log('   - Local: http://localhost:3000/admin/login\n');

    console.log('⚠️  IMPORTANT:');
    console.log('   1. Wait 2-3 minutes for Vercel to redeploy (if auto-deploy is enabled)');
    console.log('   2. Or manually trigger a redeploy in Vercel dashboard');
    console.log('   3. The in-memory lock will be cleared on next deployment');
    console.log('   4. Try logging in after deployment completes\n');

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    console.log('✅ Script completed successfully!\n');

  } catch (error) {
    console.error('❌ Error:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run the script
verifyAndFixAdmin();

