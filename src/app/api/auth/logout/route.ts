import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { getUserFromRequest } from '@/lib/auth';
import { AuthResponse } from '@/types/auth';
import { createSecureResponse, logAuditEvent, getClientIP, getUserAgent } from '@/lib/security';

export async function POST(request: NextRequest) {
  const clientIP = await getClientIP(request);
  const userAgent = getUserAgent(request);
  let userId: string | undefined;
  
  try {
    // Get user from request to log the logout
    const tokenUser = await getUserFromRequest(request);
    
    if (tokenUser) {
      userId = tokenUser.userId;
      
      try {
        await connectDB();
        
        // Remove session from user if sessionId exists
        if (tokenUser.sessionId) {
          const user = await User.findById(tokenUser.userId) as any;
          if (user && user.removeSession) {
            await user.removeSession(tokenUser.sessionId);
          }
        }
        
        await logAuditEvent({
          userId: tokenUser.userId,
          action: 'logout_success',
          resource: 'auth',
          details: { 
            sessionId: tokenUser.sessionId,
            email: tokenUser.email
          },
          ip: clientIP,
          userAgent,
          timestamp: new Date(),
          success: true
        });
      } catch (dbError) {
        console.error('Database error during logout:', dbError);
        // Continue with logout even if DB operations fail
      }
    }

    // No cookie clearing needed for localStorage-based auth

    const response: AuthResponse = {
      success: true,
      message: 'Logged out successfully'
    };

    return createSecureResponse(response, 200);
  } catch (error) {
    console.error('Logout error:', error);
    
    await logAuditEvent({
      userId,
      action: 'logout_error',
      resource: 'auth',
      details: { error: error instanceof Error ? error.message : 'Unknown error' },
      ip: clientIP,
      userAgent,
      timestamp: new Date(),
      success: false
    });
    
    // No cookie clearing needed for localStorage-based auth
    
    return createSecureResponse({
      success: false,
      message: 'Logout failed'
    }, 500);
  }
}
