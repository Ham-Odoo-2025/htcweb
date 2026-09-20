import { NextResponse } from 'next/server';
import { getNews } from '@/lib/data';

export async function GET() {
  const news = getNews();
  return NextResponse.json(news, {
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
