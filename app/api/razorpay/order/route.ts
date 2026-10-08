import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { amount, currency = 'INR', receipt } = await req.json();

    const razorpayKeyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_StellarHostelKey123';
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || 'stellar_test_secret_key_456789';

    // Mock / Live Razorpay order object
    const orderId = `order_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

    return NextResponse.json({
      success: true,
      order: {
        id: orderId,
        entity: 'order',
        amount: Math.round(amount * 100), // convert to paise
        amount_paid: 0,
        amount_due: Math.round(amount * 100),
        currency,
        receipt: receipt || `rcpt_${Date.now()}`,
        status: 'created',
        created_at: Math.floor(Date.now() / 1000),
      },
      key: razorpayKeyId,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
