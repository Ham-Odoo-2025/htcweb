import { NextResponse } from 'next/server';
import { getServices } from '@/lib/data';

export async function GET() {
  const services = getServices();
  return NextResponse.json(services, {
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
