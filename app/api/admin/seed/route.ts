import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { seedDatabase, isSupabaseConfigured } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        success: false,
        error:
          'Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL & SUPABASE_SERVICE_ROLE_KEY) are not set. Please add them in Vercel or .env.local first.',
      },
      { status: 400 }
    );
  }

  const result = await seedDatabase();
  return NextResponse.json(result);
}
