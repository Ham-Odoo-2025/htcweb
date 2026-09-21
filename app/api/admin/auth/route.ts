import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  verifyAdminPassword,
  getExpectedToken,
  SESSION_COOKIE_NAME,
  isAdminAuthenticated,
} from '@/lib/admin-auth';

export async function GET() {
  const authenticated = isAdminAuthenticated();
  return NextResponse.json({ authenticated });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, action } = body;

    // Handle logout
    if (action === 'logout') {
      const cookieStore = cookies();
      cookieStore.delete(SESSION_COOKIE_NAME);
      return NextResponse.json({ success: true, message: 'Logged out successfully' });
    }

    // Handle login
    if (!password || !verifyAdminPassword(password)) {
      return NextResponse.json(
        { error: 'Invalid admin password. Please try again.' },
        { status: 401 }
      );
    }

    const token = getExpectedToken();
    const cookieStore = cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    return NextResponse.json({ success: true, message: 'Authentication successful' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
