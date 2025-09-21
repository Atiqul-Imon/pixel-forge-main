import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isActive: boolean;
  emailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  lastLogin?: Date;
  loginAttempts: number;
  lockUntil?: Date;
  sessions: Array<{
    sessionId: string;
    createdAt: Date;
    lastUsed: Date;
    userAgent?: string;
    ipAddress?: string;
  }>;
  twoFactorSecret?: string;
  twoFactorEnabled: boolean;
  backupCodes?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters'],
    validate: {
      validator: function(v: string) {
        return /^[a-zA-Z\s'-]+$/.test(v); // Only letters, spaces, hyphens, apostrophes
      },
      message: 'Name can only contain letters, spaces, hyphens, and apostrophes'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    maxlength: [128, 'Password cannot exceed 128 characters']
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    sparse: true
  },
  emailVerificationExpires: {
    type: Date
  },
  passwordResetToken: {
    type: String,
    sparse: true
  },
  passwordResetExpires: {
    type: Date
  },
  lastLogin: {
    type: Date
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date
  },
  sessions: [{
    sessionId: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    lastUsed: {
      type: Date,
      default: Date.now
    },
    userAgent: String,
    ipAddress: String
  }],
  twoFactorSecret: {
    type: String,
    select: false // Don't include in queries by default
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  backupCodes: {
    type: [String],
    select: false // Don't include in queries by default
  }
}, {
  timestamps: true
});

// Indexes for performance and security (email index is already created by unique: true)
UserSchema.index({ 'sessions.sessionId': 1 });
UserSchema.index({ lockUntil: 1 });

// Virtual for checking if account is locked
UserSchema.virtual('isLocked').get(function(this: IUser) {
  return !!(this.lockUntil && this.lockUntil.getTime() > Date.now());
});

// Method to increment login attempts
UserSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates: any = { $inc: { loginAttempts: 1 } };
  
  // If we've reached max attempts and it's not locked yet, lock the account
  const maxAttempts = parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5');
  const lockTime = parseInt(process.env.LOCKOUT_TIME || '15') * 60 * 1000; // Convert to ms
  
  if (this.loginAttempts + 1 >= maxAttempts && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + lockTime };
  }
  
  return this.updateOne(updates);
};

// Method to reset login attempts
UserSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: {
      loginAttempts: 1,
      lockUntil: 1
    }
  });
};

// Method to add session
UserSchema.methods.addSession = function(sessionId: string, userAgent?: string, ipAddress?: string) {
  // Keep only last 5 sessions
  if (this.sessions.length >= 5) {
    this.sessions = this.sessions.slice(-4);
  }
  
  this.sessions.push({
    sessionId,
    createdAt: new Date(),
    lastUsed: new Date(),
    userAgent,
    ipAddress
  });
  
  return this.save();
};

// Method to remove session
UserSchema.methods.removeSession = function(sessionId: string) {
  this.sessions = this.sessions.filter(session => session.sessionId !== sessionId);
  return this.save();
};

// Method to update session last used
UserSchema.methods.updateSessionLastUsed = function(sessionId: string) {
  const session = this.sessions.find(s => s.sessionId === sessionId);
  if (session) {
    session.lastUsed = new Date();
    return this.save();
  }
  return Promise.resolve(this);
};

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
