import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { 
  verifyPassword, 
  generateToken, 
  setAuthCookies,
  checkRateLimit,
  checkLoginAttempts,
  recordLoginAttempt
} from '@/lib/auth';
import { LoginData, AuthResponse, AuthError } from '@/types/auth';
import { 
  validateRequest, 
  sanitizeInput, 
  validateEmail, 
  createSecureResponse,
  logAuditEvent,
  getClientIP,
  getUserAgent
} from '@/lib/security';

export async function POST(request: NextRequest) {
  const clientIP = await getClientIP(request);
  const userAgent = getUserAgent(request);
  let userEmail = '';
  
  try {
    // Security validation
    const validation = await validateRequest(request);
    if (!validation.isValid) {
      await logAuditEvent({
        action: 'login_attempt',
        resource: 'auth',
        details: { errors: validation.errors },
        ip: clientIP,
        userAgent,
        timestamp: new Date(),
        success: false
      });
      
      return createSecureResponse({
        success: false,
        message: 'Invalid request format'
      }, 400);
    }
    
    // Rate limiting check
    if (!checkRateLimit(clientIP, 10, 15 * 60 * 1000)) { // 10 attempts per 15 minutes
      await logAuditEvent({
        action: 'login_rate_limit',
        resource: 'auth',
        details: { reason: 'rate_limit_exceeded' },
        ip: clientIP,
        userAgent,
        timestamp: new Date(),
        success: false
      });
      
      return createSecureResponse({
        success: false,
        message: 'Too many login attempts. Please try again later.'
      }, 429);
    }
    
    const body: LoginData = await request.json();
    const { email: rawEmail, password: rawPassword, rememberMe = false } = body;
    
    // Sanitize inputs
    const email = sanitizeInput(rawEmail).toLowerCase();
    const password = rawPassword; // Don't sanitize password, just validate length
    userEmail = email;

    // Enhanced validation
    const errors: Record<string, string> = {};

    if (!email || !validateEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password || password.length < 8 || password.length > 128) {
      errors.password = 'Password must be between 8 and 128 characters';
    }

    if (Object.keys(errors).length > 0) {
      await logAuditEvent({
        userId: undefined,
        action: 'login_validation_failed',
        resource: 'auth',
        details: { errors, email: email },
        ip: clientIP,
        userAgent,
        timestamp: new Date(),
        success: false
      });
      
      return createSecureResponse({
        success: false,
        message: 'Validation failed',
        errors
      }, 400);
    }
    
    // Check login attempts before database query
    const attemptCheck = checkLoginAttempts(email);
    if (!attemptCheck.allowed) {
      const lockedUntil = attemptCheck.lockedUntil ? new Date(attemptCheck.lockedUntil) : undefined;
      
      await logAuditEvent({
        userId: undefined,
        action: 'login_account_locked',
        resource: 'auth',
        details: { email, lockedUntil },
        ip: clientIP,
        userAgent,
        timestamp: new Date(),
        success: false
      });
      
      return createSecureResponse({
        success: false,
        message: `Account temporarily locked due to multiple failed attempts. Try again later.`
      }, 423);
    }

    await connectDB();

    // Find user with security fields
    const user = await User.findOne({ email });
    if (!user) {
      // Record failed attempt even for non-existent users to prevent enumeration
      recordLoginAttempt(email, false);
      
      await logAuditEvent({
        userId: undefined,
        action: 'login_user_not_found',
        resource: 'auth',
        details: { email },
        ip: clientIP,
        userAgent,
        timestamp: new Date(),
        success: false
      });
      
      // Use generic message to prevent user enumeration
      return createSecureResponse({
        success: false,
        message: 'Invalid email or password'
      }, 401);
    }

    // Check if user is active
    if (!user.isActive) {
      await logAuditEvent({
        userId: user._id.toString(),
        action: 'login_inactive_account',
        resource: 'auth',
        details: { email },
        ip: clientIP,
        userAgent,
        timestamp: new Date(),
        success: false
      });
      
      return createSecureResponse({
        success: false,
        message: 'Account is deactivated. Please contact support.'
      }, 403);
    }
    
    // Check if account is locked at database level
    if (user.isLocked) {
      await logAuditEvent({
        userId: user._id.toString(),
        action: 'login_account_locked_db',
        resource: 'auth',
        details: { email, lockUntil: user.lockUntil },
        ip: clientIP,
        userAgent,
        timestamp: new Date(),
        success: false
      });
      
      return createSecureResponse({
        success: false,
        message: 'Account is temporarily locked. Please try again later.'
      }, 423);
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      // Increment login attempts
      await user.incLoginAttempts();
      recordLoginAttempt(email, false);
      
      await logAuditEvent({
        userId: user._id.toString(),
        action: 'login_invalid_password',
        resource: 'auth',
        details: { email, attempts: user.loginAttempts + 1 },
        ip: clientIP,
        userAgent,
        timestamp: new Date(),
        success: false
      });
      
      return createSecureResponse({
        success: false,
        message: 'Invalid email or password'
      }, 401);
    }
    
    // Reset login attempts on successful password verification
    if (user.loginAttempts > 0) {
      await user.resetLoginAttempts();
    }
    recordLoginAttempt(email, true);

    // Generate tokens with session tracking
    const { accessToken, refreshToken, sessionId } = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    });

    // Add session to user and update last login
    await user.addSession(sessionId, userAgent, clientIP);
    user.lastLogin = new Date();
    await user.save();

    // Log successful login
    await logAuditEvent({
      userId: user._id.toString(),
      action: 'login_success',
      resource: 'auth',
      details: { 
        email,
        sessionId,
        rememberMe 
      },
      ip: clientIP,
      userAgent,
      timestamp: new Date(),
      success: true
    });

    const responseData: AuthResponse = {
      success: true,
      message: 'Login successful',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        emailVerified: user.emailVerified,
        lastLogin: user.lastLogin?.toISOString(),
        createdAt: user.createdAt?.toISOString() || new Date().toISOString(),
        updatedAt: user.updatedAt?.toISOString() || new Date().toISOString()
      },
      token: accessToken // Return access token for client
    };

    // Return response with tokens for localStorage storage
    return createSecureResponse(responseData, 200);

  } catch (error) {
    console.error('Login error:', error);
    
    await logAuditEvent({
      userId: undefined,
      action: 'login_error',
      resource: 'auth',
      details: { 
        email: userEmail,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      ip: clientIP,
      userAgent,
      timestamp: new Date(),
      success: false
    });
    
    return createSecureResponse({
      success: false,
      message: 'Login failed. Please try again.'
    }, 500);
  }
}
