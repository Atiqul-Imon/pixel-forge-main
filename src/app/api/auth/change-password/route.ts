import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { requireAuth, hashPassword, verifyPassword } from '@/lib/auth';
import { AuthResponse, AuthError } from '@/types/auth';

export async function PUT(request: NextRequest) {
  try {
    // Require authentication
    const tokenUser = await requireAuth(request);
    
    const body = await request.json();
    const { currentPassword, newPassword, confirmPassword } = body;

    // Validation
    const errors: Record<string, string> = {};

    if (!currentPassword) {
      errors.currentPassword = 'Current password is required';
    }

    if (!newPassword || newPassword.length < 6) {
      errors.newPassword = 'New password must be at least 6 characters';
    }

    if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      const response: AuthError = {
        success: false,
        message: 'Validation failed',
        errors
      };
      return NextResponse.json(response, { status: 400 });
    }

    await connectDB();

    // Get user from database
    const user = await User.findById(tokenUser.userId);
    if (!user) {
      const response: AuthError = {
        success: false,
        message: 'User not found'
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Verify current password
    const isCurrentPasswordValid = await verifyPassword(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      const response: AuthError = {
        success: false,
        message: 'Current password is incorrect'
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword);

    // Update password
    user.password = hashedNewPassword;
    await user.save();

    const response: AuthResponse = {
      success: true,
      message: 'Password changed successfully'
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('Change password error:', error);
    const response: AuthError = {
      success: false,
      message: 'Failed to change password'
    };
    return NextResponse.json(response, { status: 500 });
  }
}
