import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/data';

export async function GET() {
  const categories = getCategories();
  return NextResponse.json(categories, {
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
