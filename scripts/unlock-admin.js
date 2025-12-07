/**
 * Script to unlock admin account and set a simple password for testing
 * 
 * Usage: node scripts/unlock-admin.js [email] [password]
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

async function unlockAdmin() {
  try {
    console.log('🔌 Connecting to MongoDB Atlas...');
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
    console.log(`   - isLocked: ${admin.lockUntil && admin.lockUntil.getTime() > Date.now() ? 'YES' : 'NO'}\n`);

    // Hash password
    console.log('🔐 Hashing new password...');
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12');
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Unlock account and reset everything
    console.log('🔄 Unlocking account and resetting password...');
    admin.password = hashedPassword;
    admin.loginAttempts = 0;
    admin.lockUntil = undefined;
    admin.isActive = true;
    admin.emailVerified = true;
    await admin.save();

    console.log('✅ Account unlocked and password reset!\n');

    // Verify password
    const isValid = await bcrypt.compare(newPassword, admin.password);
    console.log(`🔍 Password verification: ${isValid ? '✅ PASS' : '❌ FAIL'}\n`);

    // Display credentials
    console.log('═══════════════════════════════════════════════════════════');
    console.log('🔑 ADMIN CREDENTIALS');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`📧 Email:    ${adminEmail}`);
    console.log(`🔒 Password: ${newPassword}`);
    console.log('═══════════════════════════════════════════════════════════\n');

    console.log('📍 Login URLs:');
    console.log('   - Local: http://localhost:3000/admin/login');
    console.log('   - Production: https://pixelforgebd.com/admin/login\n');

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
unlockAdmin();

