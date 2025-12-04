/**
 * Script to create an admin user in MongoDB Atlas
 * 
 * Usage: node scripts/create-admin.js
 * 
 * This script will:
 * 1. Connect to MongoDB Atlas
 * 2. Create an admin user with secure credentials
 * 3. Display the credentials for you to save
 */

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI not found in .env.local');
  process.exit(1);
}

// User Schema (simplified for script)
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  loginAttempts: {
    type: Number,
    default: 0,
  },
  sessions: {
    type: Array,
    default: [],
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Generate secure random password
function generateSecurePassword(length = 16) {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const allChars = uppercase + lowercase + numbers + symbols;
  
  let password = '';
  // Ensure at least one of each type
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];
  
  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

async function createAdmin() {
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

    // Admin credentials
    const adminEmail = 'admin@pixelforgebd.com';
    const adminName = 'Pixel Forge Admin';
    const adminPassword = generateSecurePassword(16);

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log(`   Email: ${adminEmail}`);
      console.log('\n   To reset the password, delete the user first or use the password reset feature.\n');
      await mongoose.disconnect();
      return;
    }

    // Hash password
    console.log('🔐 Hashing password...');
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12');
    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

    // Create admin user
    console.log('👤 Creating admin user...');
    const admin = new User({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      emailVerified: true, // Set to true so admin can login immediately
      loginAttempts: 0,
      sessions: [],
      twoFactorEnabled: false,
    });

    await admin.save();
    console.log('✅ Admin user created successfully!\n');

    // Display credentials
    console.log('═══════════════════════════════════════════════════════════');
    console.log('🔑 ADMIN CREDENTIALS - SAVE THESE SECURELY!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`📧 Email:    ${adminEmail}`);
    console.log(`🔒 Password: ${adminPassword}`);
    console.log('═══════════════════════════════════════════════════════════\n');

    console.log('📍 Login URL: http://localhost:3000/admin/login');
    console.log('📍 Production: https://pixelforgebd.com/admin/login\n');

    console.log('⚠️  IMPORTANT:');
    console.log('   1. Save these credentials in a secure password manager');
    console.log('   2. Change the password after first login');
    console.log('   3. Enable two-factor authentication for extra security');
    console.log('   4. Do not share these credentials\n');

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    console.log('✅ Script completed successfully!\n');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    
    if (error.code === 11000) {
      console.error('\n⚠️  User with this email already exists.');
      console.error('   Delete the existing user first or use a different email.\n');
    }
    
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run the script
createAdmin();
