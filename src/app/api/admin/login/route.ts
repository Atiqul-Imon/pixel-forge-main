import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { verifyPassword, generateToken, setAuthCookie } from '@/lib/auth';
import { LoginData, AuthResponse, AuthError } from '@/types/auth';

export async function POST(request: NextRequest) {
  try {
    const body: LoginData = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      const response: AuthError = {
        success: false,
        message: 'Email and password are required'
      };
      return NextResponse.json(response, { status: 400 });
    }

    await connectDB();

    // Find user with admin role
    const user = await User.findOne({ 
      email: email.toLowerCase(),
      role: 'admin'
    });
    
    if (!user) {
      const response: AuthError = {
        success: false,
        message: 'Invalid credentials'
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Check if user is active
    if (!user.isActive) {
      const response: AuthError = {
        success: false,
        message: 'Account is deactivated'
      };
      return NextResponse.json(response, { status: 403 });
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      const response: AuthError = {
        success: false,
        message: 'Invalid credentials'
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    });

    // Set auth cookie
    await setAuthCookie(token);

    const response: AuthResponse = {
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
      token
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('Admin login error:', error);
    const response: AuthError = {
      success: false,
      message: 'Login failed. Please try again.'
    };
    return NextResponse.json(response, { status: 500 });
  }
}
