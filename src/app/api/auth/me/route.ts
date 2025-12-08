import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { getUserFromRequest } from '@/lib/auth';
import { AuthResponse } from '@/types/auth';
import { createSecureResponse, logAuditEvent, getClientIP, getUserAgent } from '@/lib/security';

export async function GET(request: NextRequest) {
  const clientIP = await getClientIP(request);
  const userAgent = getUserAgent(request);
  
  try {
    // Get user from request with enhanced validation
    const tokenUser = await getUserFromRequest(request);
    if (!tokenUser) {
      await logAuditEvent({
        userId: undefined,
        action: 'me_unauthorized',
        resource: 'auth',
        details: { reason: 'no_token' },
        ip: clientIP,
        userAgent,
        timestamp: new Date(),
        success: false
      });
      
      return createSecureResponse({
        success: false,
        message: 'Authentication required'
      }, 401);
    }

    await connectDB();

    // Get user from database with session validation
    const user = await User.findById(tokenUser.userId);
    if (!user) {
      await logAuditEvent({
        userId: tokenUser.userId,
        action: 'me_user_not_found',
        resource: 'auth',
        details: { tokenUserId: tokenUser.userId },
        ip: clientIP,
        userAgent,
        timestamp: new Date(),
        success: false
      });
      
      return createSecureResponse({
        success: false,
        message: 'User not found'
      }, 404);
    }
    
    // Validate session exists (if sessionId is present in token)
    if (tokenUser.sessionId) {
      const sessionExists = user.sessions.some(session => 
        session.sessionId === tokenUser.sessionId
      );
      
      if (!sessionExists) {
        await logAuditEvent({
          userId: user._id.toString(),
          action: 'me_invalid_session',
          resource: 'auth',
          details: { sessionId: tokenUser.sessionId },
          ip: clientIP,
          userAgent,
          timestamp: new Date(),
          success: false
        });
        
        return createSecureResponse({
          success: false,
          message: 'Session expired. Please login again.'
        }, 401);
      }
      
      // Update session last used
      await user.updateSessionLastUsed(tokenUser.sessionId);
    }

    // Check if user is active
    if (!user.isActive) {
      await logAuditEvent({
        userId: user._id.toString(),
        action: 'me_inactive_account',
        resource: 'auth',
        details: { email: user.email },
        ip: clientIP,
        userAgent,
        timestamp: new Date(),
        success: false
      });
      
      return createSecureResponse({
        success: false,
        message: 'Account is deactivated'
      }, 403);
    }

    const response: AuthResponse = {
      success: true,
      message: 'User data retrieved successfully',
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
      }
    };

    return createSecureResponse(response, 200);

  } catch (error) {
    console.error('Get user error:', error);
    
    await logAuditEvent({
      userId: undefined,
      action: 'me_error',
      resource: 'auth',
      details: { error: error instanceof Error ? error.message : 'Unknown error' },
      ip: clientIP,
      userAgent,
      timestamp: new Date(),
      success: false
    });
    
    return createSecureResponse({
      success: false,
      message: 'Failed to retrieve user data'
    }, 500);
  }
}
