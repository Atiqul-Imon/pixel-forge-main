import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { hashPassword, generateToken, setAuthCookies, checkRateLimit } from '@/lib/auth';
import { RegisterData, AuthResponse, AuthError } from '@/types/auth';
import { 
  validateRequest, 
  sanitizeInput, 
  validateEmail, 
  createSecureResponse,
  logAuditEvent,
  getClientIP,
  getUserAgent,
  checkPasswordStrength
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
        action: 'register_invalid_request',
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
    if (!checkRateLimit(clientIP, 10, 15 * 60 * 1000)) { // 10 registrations per 15 minutes
      await logAuditEvent({
        action: 'register_rate_limit',
        resource: 'auth',
        details: { reason: 'rate_limit_exceeded' },
        ip: clientIP,
        userAgent,
        timestamp: new Date(),
        success: false
      });
      
      return createSecureResponse({
        success: false,
        message: 'Too many registration attempts. Please try again later.'
      }, 429);
    }
    
    const body: RegisterData = await request.json();
    const { name: rawName, email: rawEmail, password, confirmPassword } = body;
    
    // Sanitize inputs
    const name = sanitizeInput(rawName);
    const email = sanitizeInput(rawEmail).toLowerCase();
    userEmail = email;

    // Enhanced validation
    const errors: Record<string, string> = {};

    if (!name || name.trim().length < 2 || name.trim().length > 50) {
      errors.name = 'Name must be between 2 and 50 characters';
    }
    
    if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      errors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }

    if (!email || !validateEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else {
      const passwordCheck = checkPasswordStrength(password);
      if (!passwordCheck.isStrong) {
        errors.password = passwordCheck.feedback.join('; ');
      }
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      await logAuditEvent({
        userId: undefined,
        action: 'register_validation_failed',
        resource: 'auth',
        details: { errors, email },
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

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      await logAuditEvent({
        userId: undefined,
        action: 'register_email_exists',
        resource: 'auth',
        details: { email },
        ip: clientIP,
        userAgent,
        timestamp: new Date(),
        success: false
      });
      
      return createSecureResponse({
        success: false,
        message: 'User with this email already exists'
      }, 409);
    }

    // Hash password with enhanced security
    const hashedPassword = await hashPassword(password);

    // Create user with security defaults
    const user = new User({
      name: name.trim(),
      email,
      password: hashedPassword,
      role: 'user',
      isActive: true,
      emailVerified: false, // Require email verification in production
      loginAttempts: 0,
      sessions: []
    });

    await user.save();

    // Generate tokens with session tracking
    const { accessToken, refreshToken, sessionId } = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    });
    
    // Add session to user
    await user.addSession(sessionId, userAgent, clientIP);

    // Set auth cookies
    await setAuthCookies(accessToken, refreshToken);

    // Log successful registration
    await logAuditEvent({
      userId: user._id.toString(),
      action: 'register_success',
      resource: 'auth',
      details: { 
        email,
        name: user.name,
        sessionId
      },
      ip: clientIP,
      userAgent,
      timestamp: new Date(),
      success: true
    });

    const response: AuthResponse = {
      success: true,
      message: 'Registration successful',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        emailVerified: user.emailVerified,
        lastLogin: user.lastLogin?.toISOString(),
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      },
      token: accessToken
    };

    return createSecureResponse(response, 201);

  } catch (error) {
    console.error('Registration error:', error);
    
    await logAuditEvent({
      userId: undefined,
      action: 'register_error',
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
      message: 'Registration failed. Please try again.'
    }, 500);
  }
}
