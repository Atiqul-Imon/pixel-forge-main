import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn('MONGODB_URI not found. Database connection will not be available.');
}

let cached: typeof mongoose | null = null;

async function connectDB() {
  if (cached) {
    return cached;
  }

  if (!MONGODB_URI) {
    throw new Error('MongoDB URI not configured');
  }

  try {
    const opts = {
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferCommands: false, // Disable mongoose buffering
    };

    cached = await mongoose.connect(MONGODB_URI, opts);
    
    // Connection event listeners for monitoring
    cached.connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });
    
    cached.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    cached.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    
    return cached;
  } catch (e) {
    console.error('MongoDB connection error:', e);
    throw e;
  }
}

export default connectDB;

