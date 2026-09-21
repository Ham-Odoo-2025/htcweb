import { NextResponse } from 'next/server';
import { getAllCategories } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const categories = await getAllCategories();
  return NextResponse.json(categories, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

