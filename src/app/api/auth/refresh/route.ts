import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { verifyToken, generateToken, setAuthCookies } from '@/lib/auth';
import { AuthResponse } from '@/types/auth';
import { createSecureResponse, logAuditEvent, getClientIP, getUserAgent } from '@/lib/security';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const clientIP = await getClientIP(request);
  const userAgent = getUserAgent(request);
  
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    
    if (!refreshToken) {
      return createSecureResponse({
        success: false,
        message: 'Refresh token not found'
      }, 401);
    }
    
    // Verify refresh token
    const decoded = verifyToken(refreshToken, 'refresh');
    if (!decoded || !('userId' in decoded)) {
      await logAuditEvent({
        userId: undefined,
        action: 'refresh_invalid_token',
        resource: 'auth',
        details: { reason: 'invalid_token' },
        ip: clientIP,
        userAgent,
        timestamp: new Date(),
        success: false
      });
      
      return createSecureResponse({
        success: false,
        message: 'Invalid refresh token'
      }, 401);
    }
    
    await connectDB();
    
    // Get user and validate session
    const user = await User.findById(decoded.userId);
    if (!user) {
      await logAuditEvent({
        userId: decoded.userId,
        action: 'refresh_user_not_found',
        resource: 'auth',
        details: { userId: decoded.userId },
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
    
    // Check if user is active
    if (!user.isActive) {
      await logAuditEvent({
        userId: user._id.toString(),
        action: 'refresh_inactive_account',
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
    
    // Validate session exists
    if (decoded.sessionId) {
      const sessionExists = user.sessions.some(session => 
        session.sessionId === decoded.sessionId
      );
      
      if (!sessionExists) {
        await logAuditEvent({
          userId: user._id.toString(),
          action: 'refresh_invalid_session',
          resource: 'auth',
          details: { sessionId: decoded.sessionId },
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
      await user.updateSessionLastUsed(decoded.sessionId);
    }
    
    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    });
    
    // Set new auth cookies
    await setAuthCookies(accessToken, newRefreshToken);
    
    await logAuditEvent({
      userId: user._id.toString(),
      action: 'token_refresh_success',
      resource: 'auth',
      details: { 
        email: user.email,
        sessionId: decoded.sessionId
      },
      ip: clientIP,
      userAgent,
      timestamp: new Date(),
      success: true
    });
    
    const response: AuthResponse = {
      success: true,
      message: 'Token refreshed successfully',
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
    
    return createSecureResponse(response, 200);
    
  } catch (error) {
    console.error('Token refresh error:', error);
    
    await logAuditEvent({
      userId: undefined,
      action: 'refresh_error',
      resource: 'auth',
      details: { error: error instanceof Error ? error.message : 'Unknown error' },
      ip: clientIP,
      userAgent,
      timestamp: new Date(),
      success: false
    });
    
    return createSecureResponse({
      success: false,
      message: 'Token refresh failed'
    }, 500);
  }
}

