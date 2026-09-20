import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, service, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required fields.' },
        { status: 400 }
      );
    }

    console.log('[HTC Contact Inquiry Received]:', {
      name,
      phone,
      email,
      service,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been received. Our team will contact you shortly.',
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Internal server error.' },
      { status: 500 }
    );
  }
}
