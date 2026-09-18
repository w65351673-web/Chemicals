import { NextResponse } from 'next/server';
import { sendOrderEmail, isEmailConfigured } from '@/lib/email';

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      orderRef,
      buyer,
      shipping,
      paymentMethod,
      items,
      totals,
      notes,
    } = body;

    if (!orderRef || !buyer || !shipping || !paymentMethod || !items || !totals) {
      return NextResponse.json(
        { message: 'Missing required order information' },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: 'Order must contain at least one item' },
        { status: 400 }
      );
    }

    if (!isEmailConfigured()) {
      return NextResponse.json(
        { message: 'Gmail is not configured on the server' },
        { status: 503 }
      );
    }

    await sendOrderEmail({
      orderRef,
      buyer,
      shipping,
      paymentMethod,
      items,
      totals,
      notes,
    });

    return NextResponse.json({ success: true, orderRef });
  } catch (error) {
    console.error('Error sending order email:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to send order email' },
      { status: 500 }
    );
  }
}
