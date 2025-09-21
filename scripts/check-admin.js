require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User schema (simplified for script)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  isActive: Boolean,
  emailVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
});

const User = mongoose.model('User', userSchema);

async function checkAdmin() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pixel-forge';
    console.log('Connecting to MongoDB...');
    console.log('Using URI:', mongoUri.includes('mongodb+srv') ? 'MongoDB Atlas' : 'Local MongoDB');
    
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully!');

    // Find admin user
    const admin = await User.findOne({ email: 'admin@pixelforgebd.com' });
    if (admin) {
      console.log('\n=== ADMIN USER DETAILS ===');
      console.log('Email:', admin.email);
      console.log('Name:', admin.name);
      console.log('Role:', admin.role);
      console.log('IsActive:', admin.isActive);
      console.log('EmailVerified:', admin.emailVerified);
      console.log('Created:', admin.createdAt);
      console.log('Updated:', admin.updatedAt);
      
      // Test password verification
      const testPassword = 'admin123456';
      const isPasswordValid = await bcrypt.compare(testPassword, admin.password);
      console.log('\n=== PASSWORD TEST ===');
      console.log('Test Password:', testPassword);
      console.log('Password Valid:', isPasswordValid);
      
      if (!isPasswordValid) {
        console.log('❌ PASSWORD MISMATCH - This is the issue!');
        console.log('Let me create a new admin with correct password...');
        
        // Create new admin with correct password
        const hashedPassword = await bcrypt.hash('admin123456', 12);
        admin.password = hashedPassword;
        await admin.save();
        console.log('✅ Admin password updated successfully!');
      } else {
        console.log('✅ Password is correct');
      }
      
    } else {
      console.log('❌ Admin user NOT found!');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

checkAdmin();
