import { NextRequest, NextResponse } from 'next/server';
import { 
  checkRateLimit, 
  requireAuth, 
  requireAdmin 
} from '@/lib/auth';
import { 
  validateRequest, 
  createSecureResponse, 
  logAuditEvent, 
  getClientIP, 
  getUserAgent 
} from '@/lib/security';

// Rate limiting configuration for different endpoints
const RATE_LIMITS = {
  // Authentication (security-focused)
  login: { maxRequests: 15, windowMs: 15 * 60 * 1000 }, // 15 attempts per 15 min
  register: { maxRequests: 10, windowMs: 15 * 60 * 1000 }, // 10 registrations per 15 min
  
  // Content management
  contact: { maxRequests: 10, windowMs: 15 * 60 * 1000 }, // 10 submissions per 15 min
  upload: { maxRequests: 50, windowMs: 60 * 60 * 1000 }, // 50 uploads per hour
  
  // API endpoints
  blog: { maxRequests: 200, windowMs: 15 * 60 * 1000 }, // 200 requests per 15 min
  admin: { maxRequests: 150, windowMs: 15 * 60 * 1000 }, // 150 requests per 15 min
  public: { maxRequests: 500, windowMs: 15 * 60 * 1000 }, // 500 requests per 15 min
  
  // Legacy support
  auth: { maxRequests: 15, windowMs: 15 * 60 * 1000 }, // 15 requests per 15 min
  api: { maxRequests: 500, windowMs: 15 * 60 * 1000 }, // 500 requests per 15 min
};

export interface MiddlewareOptions {
  requireAuth?: boolean;
  requireAdmin?: boolean;
  rateLimit?: keyof typeof RATE_LIMITS;
  customRateLimit?: { maxRequests: number; windowMs: number };
  validateRequest?: boolean;
  logRequests?: boolean;
}

// Comprehensive middleware wrapper
export const withMiddleware = (
  handler: (request: NextRequest, context?: { params?: Record<string, string> }) => Promise<NextResponse>,
  options: MiddlewareOptions = {}
) => {
  return async (request: NextRequest, context?: { params?: Record<string, string> }): Promise<NextResponse> => {
    const clientIP = await getClientIP(request);
    const userAgent = getUserAgent(request);
    const startTime = Date.now();
    
    try {
      // Request validation
      if (options.validateRequest !== false) {
        const validation = await validateRequest(request);
        if (!validation.isValid) {
          if (options.logRequests !== false) {
            await logAuditEvent({
              userId: undefined,
              action: 'middleware_validation_failed',
              resource: 'api',
              details: { 
                path: request.nextUrl.pathname,
                errors: validation.errors 
              },
              ip: clientIP,
              userAgent,
              timestamp: new Date(),
              success: false
            });
          }
          
          return createSecureResponse({
            success: false,
            message: 'Invalid request format'
          }, 400);
        }
      }
      
      // Rate limiting
      let rateLimitConfig = options.customRateLimit;
      if (options.rateLimit && RATE_LIMITS[options.rateLimit]) {
        rateLimitConfig = RATE_LIMITS[options.rateLimit];
      }
      
      if (rateLimitConfig) {
        if (!checkRateLimit(clientIP, rateLimitConfig.maxRequests, rateLimitConfig.windowMs)) {
          if (options.logRequests !== false) {
            await logAuditEvent({
              userId: undefined,
              action: 'middleware_rate_limit_exceeded',
              resource: 'api',
              details: { 
                path: request.nextUrl.pathname,
                limit: rateLimitConfig 
              },
              ip: clientIP,
              userAgent,
              timestamp: new Date(),
              success: false
            });
          }
          
          return createSecureResponse({
            success: false,
            message: 'Too many requests. Please try again later.'
          }, 429);
        }
      }
      
      // Authentication check
      let user = null;
      if (options.requireAuth || options.requireAdmin) {
        try {
          if (options.requireAdmin) {
            user = await requireAdmin(request);
          } else {
            user = await requireAuth(request);
          }
        } catch (error) {
          if (options.logRequests !== false) {
            await logAuditEvent({
              userId: undefined,
              action: options.requireAdmin ? 'middleware_admin_required' : 'middleware_auth_required',
              resource: 'api',
              details: { 
                path: request.nextUrl.pathname,
                error: error instanceof Error ? error.message : 'Unknown error'
              },
              ip: clientIP,
              userAgent,
              timestamp: new Date(),
              success: false
            });
          }
          
          const statusCode = error instanceof Error && error.message.includes('Admin') ? 403 : 401;
          const message = error instanceof Error ? error.message : 'Authentication required';
          
          return createSecureResponse({
            success: false,
            message
          }, statusCode);
        }
      }
      
      // Add user to context if available
      const enhancedContext = {
        ...context,
        user,
        clientIP,
        userAgent,
        startTime
      };
      
      // Call the actual handler
      const response = await handler(request, enhancedContext);
      
      // Log successful requests
      if (options.logRequests !== false && user) {
        const duration = Date.now() - startTime;
        await logAuditEvent({
          userId: user.userId,
          action: 'api_request_success',
          resource: 'api',
          details: { 
            path: request.nextUrl.pathname,
            method: request.method,
            duration,
            status: response.status
          },
          ip: clientIP,
          userAgent,
          timestamp: new Date(),
          success: true
        });
      }
      
      return response;
      
    } catch (error) {
      console.error('Middleware error:', error);
      
      if (options.logRequests !== false) {
        await logAuditEvent({
          userId: undefined,
          action: 'middleware_error',
          resource: 'api',
          details: { 
            path: request.nextUrl.pathname,
            error: error instanceof Error ? error.message : 'Unknown error'
          },
          ip: clientIP,
          userAgent,
          timestamp: new Date(),
          success: false
        });
      }
      
      return createSecureResponse({
        success: false,
        message: 'Internal server error'
      }, 500);
    }
  };
};

// Convenience functions for common middleware patterns
export const withAuth = (handler: (request: NextRequest, context?: { params?: Record<string, string> }) => Promise<NextResponse>) =>
  withMiddleware(handler, { requireAuth: true, rateLimit: 'api' });

export const withAdmin = (handler: (request: NextRequest, context?: { params?: Record<string, string> }) => Promise<NextResponse>) =>
  withMiddleware(handler, { requireAdmin: true, rateLimit: 'admin' });

export const withRateLimit = (
  handler: (request: NextRequest, context?: { params?: Record<string, string> }) => Promise<NextResponse>,
  rateLimit: keyof typeof RATE_LIMITS
) =>
  withMiddleware(handler, { rateLimit });

export const withCustomRateLimit = (
  handler: (request: NextRequest, context?: { params?: Record<string, string> }) => Promise<NextResponse>,
  maxRequests: number,
  windowMs: number
) =>
  withMiddleware(handler, { customRateLimit: { maxRequests, windowMs } });

// CORS middleware
export const withCORS = (
  handler: (request: NextRequest, context?: { params?: Record<string, string> }) => Promise<NextResponse>,
  options: {
    origin?: string | string[];
    methods?: string[];
    credentials?: boolean;
  } = {}
) => {
  return async (request: NextRequest, context?: { params?: Record<string, string> }): Promise<NextResponse> => {
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      const response = new NextResponse(null, { status: 200 });
      
      const origin = request.headers.get('origin');
      if (options.origin) {
        if (Array.isArray(options.origin)) {
          if (options.origin.includes(origin || '')) {
            response.headers.set('Access-Control-Allow-Origin', origin || '');
          }
        } else if (options.origin === '*' || options.origin === origin) {
          response.headers.set('Access-Control-Allow-Origin', options.origin);
        }
      }
      
      response.headers.set('Access-Control-Allow-Methods', (options.methods || ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']).join(', '));
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
      if (options.credentials) {
        response.headers.set('Access-Control-Allow-Credentials', 'true');
      }
      
      return response;
    }
    
    // Handle actual requests
    const response = await handler(request, context);
    
    const origin = request.headers.get('origin');
    if (options.origin) {
      if (Array.isArray(options.origin)) {
        if (options.origin.includes(origin || '')) {
          response.headers.set('Access-Control-Allow-Origin', origin || '');
        }
      } else if (options.origin === '*' || options.origin === origin) {
        response.headers.set('Access-Control-Allow-Origin', options.origin);
      }
    }
    
    if (options.credentials) {
      response.headers.set('Access-Control-Allow-Credentials', 'true');
    }
    
    return response;
  };
};

