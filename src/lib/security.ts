import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Security headers configuration
export const SECURITY_HEADERS = {
  'X-DNS-Prefetch-Control': 'off',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://upload.imagekit.io; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://upload.imagekit.io https://ik.imagekit.io; frame-ancestors 'none';",
};

// Input sanitization
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove potential XSS tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .substring(0, 1000); // Limit length
};

// Email validation with enhanced security
export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  return emailRegex.test(email) && 
         email.length <= 254 && 
         !email.includes('..') && // No consecutive dots
         !email.startsWith('.') && 
         !email.endsWith('.');
};

// Generate secure random token
export const generateSecureToken = (length: number = 32): string => {
  return crypto.randomBytes(length).toString('hex');
};

// Hash sensitive data (for tokens, not passwords)
export const hashToken = (token: string): string => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

// Get client IP address
export const getClientIP = async (request: NextRequest): Promise<string> => {
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');
  const clientIP = request.headers.get('x-client-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (real) {
    return real.trim();
  }
  
  if (clientIP) {
    return clientIP.trim();
  }
  
  return request.ip || 'unknown';
};

// Get user agent
export const getUserAgent = (request: NextRequest): string => {
  return request.headers.get('user-agent') || 'unknown';
};

// CSRF token generation and validation
export const generateCSRFToken = (): string => {
  return generateSecureToken(32);
};

export const validateCSRFToken = (token: string, expectedToken: string): boolean => {
  if (!token || !expectedToken) return false;
  return crypto.timingSafeEqual(
    Buffer.from(token, 'hex'),
    Buffer.from(expectedToken, 'hex')
  );
};

// Secure response wrapper
export const createSecureResponse = (data: unknown, status: number = 200): NextResponse => {
  const response = NextResponse.json(data, { status });
  
  // Add security headers
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  return response;
};

// Request validation middleware
export const validateRequest = async (request: NextRequest): Promise<{
  isValid: boolean;
  errors: string[];
  clientIP: string;
  userAgent: string;
}> => {
  const errors: string[] = [];
  const clientIP = await getClientIP(request);
  const userAgent = getUserAgent(request);
  
  // Check content type for POST requests
  if (request.method === 'POST') {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      errors.push('Invalid content type');
    }
  }
  
  // Check for suspicious patterns in headers
  const suspiciousPatterns = [
    /script/i,
    /javascript/i,
    /vbscript/i,
    /onload/i,
    /onerror/i,
  ];
  
  const checkHeaders = ['user-agent', 'referer', 'origin'];
  checkHeaders.forEach(headerName => {
    const headerValue = request.headers.get(headerName);
    if (headerValue) {
      suspiciousPatterns.forEach(pattern => {
        if (pattern.test(headerValue)) {
          errors.push(`Suspicious pattern detected in ${headerName}`);
        }
      });
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors,
    clientIP,
    userAgent
  };
};

// Password strength checker
export const checkPasswordStrength = (password: string): {
  score: number;
  feedback: string[];
  isStrong: boolean;
} => {
  const feedback: string[] = [];
  let score = 0;
  
  if (password.length >= 8) score += 1;
  else feedback.push('Use at least 8 characters');
  
  if (password.length >= 12) score += 1;
  else feedback.push('Consider using 12+ characters for better security');
  
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Include lowercase letters');
  
  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Include uppercase letters');
  
  if (/[0-9]/.test(password)) score += 1;
  else feedback.push('Include numbers');
  
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  else feedback.push('Include special characters');
  
  // Check for common patterns
  const commonPatterns = [
    /123456/,
    /password/i,
    /qwerty/i,
    /abc123/i,
    /(.)\1{2,}/, // Repeated characters
  ];
  
  commonPatterns.forEach(pattern => {
    if (pattern.test(password)) {
      score -= 1;
      feedback.push('Avoid common patterns and repeated characters');
    }
  });
  
  return {
    score: Math.max(0, score),
    feedback,
    isStrong: score >= 5 && feedback.length === 0
  };
};

// Audit logging
export interface AuditLog {
  userId?: string;
  action: string;
  resource: string;
  details: Record<string, unknown>;
  ip: string;
  userAgent: string;
  timestamp: Date;
  success: boolean;
}

export const logAuditEvent = async (log: AuditLog): Promise<void> => {
  // In production, send to logging service (e.g., Winston, DataDog, etc.)
  console.log('AUDIT:', JSON.stringify(log, null, 2));
};

