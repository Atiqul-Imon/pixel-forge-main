import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  sessionId: string;
  iat?: number;
  exp?: number;
}

export interface RefreshTokenPayload {
  userId: string;
  sessionId: string;
  tokenVersion: number;
  iat?: number;
  exp?: number;
}

// Security Configuration
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h'; // 24 hours for better UX
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12');
const MAX_LOGIN_ATTEMPTS = parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5');
const LOCKOUT_TIME = parseInt(process.env.LOCKOUT_TIME || '15'); // minutes

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters long');
}

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number; }>;
const loginAttemptStore = new Map<string, { attempts: number; lockedUntil?: number; }>();

// Password validation
export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (password.length > 128) {
    errors.push('Password must not exceed 128 characters');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return { isValid: errors.length === 0, errors };
};

// Password hashing with enhanced security
export const hashPassword = async (password: string): Promise<string> => {
  // Validate password strength
  const validation = validatePassword(password);
  if (!validation.isValid) {
    throw new Error(`Password validation failed: ${validation.errors.join(', ')}`);
  }
  
  return await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
};

// Password verification
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generate session ID
export const generateSessionId = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Generate JWT access token
export const generateToken = (payload: Omit<JWTPayload, 'iat' | 'exp' | 'sessionId'>): { accessToken: string; refreshToken: string; sessionId: string } => {
  const sessionId = generateSessionId();
  
  const accessToken = jwt.sign(
    { ...payload, sessionId },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN, issuer: 'pixel-forge', audience: 'pixel-forge-app' }
  );
  
  const refreshToken = jwt.sign(
    { userId: payload.userId, sessionId, tokenVersion: 1 },
    JWT_SECRET,
    { expiresIn: JWT_REFRESH_EXPIRES_IN, issuer: 'pixel-forge', audience: 'pixel-forge-app' }
  );
  
  return { accessToken, refreshToken, sessionId };
};

// Verify JWT token with enhanced security
export const verifyToken = (token: string, tokenType: 'access' | 'refresh' = 'access'): JWTPayload | RefreshTokenPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'pixel-forge',
      audience: 'pixel-forge-app'
    });
    
    return decoded as JWTPayload | RefreshTokenPayload;
  } catch (error) {
    console.error(`Token verification failed (${tokenType}):`, error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
};

// Rate limiting
export const checkRateLimit = (identifier: string, maxRequests: number = 100, windowMs: number = 15 * 60 * 1000): boolean => {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  // Clean old entries
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
  
  const current = rateLimitStore.get(identifier);
  
  if (!current) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (current.count >= maxRequests) {
    return false;
  }
  
  current.count++;
  return true;
};

// Login attempt tracking
export const checkLoginAttempts = (identifier: string): { allowed: boolean; remainingAttempts: number; lockedUntil?: number } => {
  const now = Date.now();
  const current = loginAttemptStore.get(identifier);
  
  if (!current) {
    return { allowed: true, remainingAttempts: MAX_LOGIN_ATTEMPTS };
  }
  
  // Check if lockout has expired
  if (current.lockedUntil && current.lockedUntil > now) {
    return { allowed: false, remainingAttempts: 0, lockedUntil: current.lockedUntil };
  }
  
  // Reset if lockout expired
  if (current.lockedUntil && current.lockedUntil <= now) {
    loginAttemptStore.delete(identifier);
    return { allowed: true, remainingAttempts: MAX_LOGIN_ATTEMPTS };
  }
  
  const remainingAttempts = MAX_LOGIN_ATTEMPTS - current.attempts;
  return { allowed: remainingAttempts > 0, remainingAttempts };
};

export const recordLoginAttempt = (identifier: string, success: boolean) => {
  if (success) {
    loginAttemptStore.delete(identifier);
    return;
  }
  
  const current = loginAttemptStore.get(identifier) || { attempts: 0 };
  current.attempts++;
  
  if (current.attempts >= MAX_LOGIN_ATTEMPTS) {
    current.lockedUntil = Date.now() + (LOCKOUT_TIME * 60 * 1000);
  }
  
  loginAttemptStore.set(identifier, current);
};

// Clear login lock for a specific email (useful when database shows account is unlocked)
export const clearLoginLock = (identifier: string): void => {
  loginAttemptStore.delete(identifier);
};

// Enhanced user extraction with multiple token sources
export const getUserFromRequest = async (request: NextRequest): Promise<JWTPayload | null> => {
  let token: string | undefined;
  
  // Only use Authorization header (Bearer token) - no cookies
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }
  
  if (!token) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Debug: No Bearer token found in Authorization header');
    }
    return null;
  }
  
  try {
    const decoded = verifyToken(token, 'access');
    return decoded as JWTPayload | null;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Token verification failed (access):', error instanceof Error ? error.message : 'Unknown error');
    }
    return null;
  }
};

// Set auth cookies with enhanced security
export const setAuthCookies = async (accessToken: string, refreshToken: string) => {
  const cookieStore = await cookies();
  
  // Access token cookie (reasonable expiry for user experience)
  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', // More permissive in dev
    maxAge: 60 * 60 * 24, // 24 hours for better UX
    path: '/',
  });
  
  // Refresh token cookie (longer expiry)
  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', // More permissive in dev
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
};

// Legacy support for old cookie name
export const setAuthCookie = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
};

// Clear auth cookies
export const clearAuthCookies = async () => {
  const cookieStore = await cookies();
  
  // Clear all auth-related cookies
  const cookiesToClear = ['accessToken', 'refreshToken', 'authToken'];
  
  cookiesToClear.forEach(cookieName => {
    cookieStore.set(cookieName, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });
  });
};

// Legacy support
export const clearAuthCookie = clearAuthCookies;

// Middleware to check if user is authenticated
export const requireAuth = async (request: NextRequest): Promise<JWTPayload> => {
  const user = await getUserFromRequest(request);
  
  if (!user) {
    throw new Error('Authentication required');
  }

  return user;
};

// Middleware to check if user is admin
export const requireAdmin = async (request: NextRequest): Promise<JWTPayload> => {
  const user = await requireAuth(request);
  
  if (user.role !== 'admin') {
    throw new Error('Admin access required');
  }

  return user;
};
