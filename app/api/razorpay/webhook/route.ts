import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const event = body.event;

    if (event === 'payment.captured') {
      const payment = body.payload.payment.entity;
      const orderId = payment.order_id;
      const paymentId = payment.id;

      try {
        await prisma.booking.updateMany({
          where: { razorpayOrderId: orderId },
          data: {
            paymentStatus: 'PAID',
            paymentId: paymentId,
          },
        });
        console.log(`[Razorpay Webhook] Payment captured for order ${orderId}`);
      } catch (err) {
        console.warn('Razorpay webhook DB update warning:', err);
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
