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
      bufferCommands: false,
    };

    cached = await mongoose.connect(MONGODB_URI, opts);
    return cached;
  } catch (e) {
    console.error('MongoDB connection error:', e);
    throw e;
  }
}

export default connectDB;

