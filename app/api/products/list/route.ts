import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '24', 10);
  const category = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;

  const result = getProducts({
    page,
    limit,
    category,
    search,
  });

  return NextResponse.json(result, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
