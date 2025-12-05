/**
 * Script to reset admin password in MongoDB Atlas
 * 
 * Usage: node scripts/reset-admin-password.js [email]
 * 
 * This script will:
 * 1. Connect to MongoDB Atlas
 * 2. Find the admin user
 * 3. Generate a new secure password
 * 4. Update the password
 * 5. Display the new credentials
 */

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline');

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
  lockUntil: {
    type: Date,
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

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function resetAdminPassword() {
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

    // Get email from command line argument or ask for it
    let adminEmail = process.argv[2];
    
    if (!adminEmail) {
      // List all admin users
      const adminUsers = await User.find({ role: 'admin' }).select('email name').lean();
      
      if (adminUsers.length === 0) {
        console.log('⚠️  No admin users found in database.\n');
        await mongoose.disconnect();
        rl.close();
        process.exit(1);
      }
      
      console.log('📋 Found the following admin user(s):\n');
      adminUsers.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.email} (${user.name})`);
      });
      console.log('');
      
      if (adminUsers.length === 1) {
        adminEmail = adminUsers[0].email;
        console.log(`✅ Using: ${adminEmail}\n`);
      } else {
        adminEmail = await question('Enter the email of the admin user to reset password: ');
        adminEmail = adminEmail.trim().toLowerCase();
      }
    } else {
      adminEmail = adminEmail.trim().toLowerCase();
    }

    // Find admin user
    const admin = await User.findOne({ email: adminEmail, role: 'admin' });
    
    if (!admin) {
      console.error(`❌ Error: Admin user with email "${adminEmail}" not found.\n`);
      await mongoose.disconnect();
      rl.close();
      process.exit(1);
    }

    console.log(`👤 Found admin user: ${admin.email} (${admin.name})\n`);

    // Generate new password
    const newPassword = generateSecurePassword(16);

    // Hash password
    console.log('🔐 Hashing new password...');
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12');
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password and reset login attempts/lock
    console.log('🔄 Updating password...');
    admin.password = hashedPassword;
    admin.loginAttempts = 0;
    admin.lockUntil = undefined;
    admin.lastLogin = undefined;
    await admin.save();

    console.log('✅ Password reset successfully!\n');

    // Display credentials
    console.log('═══════════════════════════════════════════════════════════');
    console.log('🔑 NEW ADMIN PASSWORD - SAVE THIS SECURELY!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`📧 Email:    ${adminEmail}`);
    console.log(`🔒 Password: ${newPassword}`);
    console.log('═══════════════════════════════════════════════════════════\n');

    console.log('📍 Login URL: http://localhost:3000/admin/login');
    console.log('📍 Production: https://pixelforgebd.com/admin/login\n');

    console.log('⚠️  IMPORTANT:');
    console.log('   1. Save these credentials in a secure password manager');
    console.log('   2. Change the password after first login if desired');
    console.log('   3. Enable two-factor authentication for extra security');
    console.log('   4. Do not share these credentials\n');

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    console.log('✅ Script completed successfully!\n');

    rl.close();

  } catch (error) {
    console.error('❌ Error resetting admin password:', error);
    await mongoose.disconnect();
    rl.close();
    process.exit(1);
  }
}

// Run the script
resetAdminPassword();

