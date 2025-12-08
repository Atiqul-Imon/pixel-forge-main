// This route now delegates to /api/auth/login for a single auth path
import { NextRequest } from 'next/server';
import { POST as unifiedLogin } from '@/app/api/auth/login/route';

export async function POST(request: NextRequest) {
  // Mark the request as admin so unified handler enforces admin role
  const body = await request.json().catch(() => ({}));
  const enriched = JSON.stringify({ ...body, isAdmin: true });
  const adminReq = new Request(request.url, {
    method: 'POST',
    headers: request.headers,
    body: enriched,
  });
  return unifiedLogin(adminReq as NextRequest);
}
