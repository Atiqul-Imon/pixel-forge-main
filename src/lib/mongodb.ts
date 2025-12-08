import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn('MONGODB_URI not found. Database connection will not be available.');
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached = globalThis.mongooseCache || { conn: null, promise: null };
globalThis.mongooseCache = cached;

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error('MongoDB URI not configured');
  }

  if (!cached.promise) {
    const opts = {
      maxPoolSize: 20, // Allow more pooled sockets for concurrent API hits
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
      autoIndex: false, // Avoid index build on prod hot paths
      maxIdleTimeMS: 30000,
      family: 4, // IPv4 to reduce DNS latency on some hosts
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      // Connection event listeners for monitoring (quiet in production)
      m.connection.on('connected', () => {
        if (process.env.NODE_ENV === 'development') {
          console.log('MongoDB connected successfully');
        }
      });
      
      m.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
      });
      
      m.connection.on('disconnected', () => {
        if (process.env.NODE_ENV === 'development') {
          console.log('MongoDB disconnected');
        }
      });

      return m;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;

