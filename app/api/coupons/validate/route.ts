import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { code, totalAmount = 0 } = await req.json();
    const cleanCode = (code || '').toUpperCase().trim();

    if (cleanCode === 'WELCOME10') {
      return NextResponse.json({
        success: true,
        discountType: 'PERCENTAGE',
        value: 10,
        discountAmount: Math.round(totalAmount * 0.1),
        message: 'WELCOME10 applied! 10% discount added.',
      });
    }

    if (cleanCode === 'STUDENT500') {
      return NextResponse.json({
        success: true,
        discountType: 'FIXED',
        value: 500,
        discountAmount: 500,
        message: 'STUDENT500 applied! ₹500 flat discount added.',
      });
    }

    if (cleanCode === 'AURAEXCLUSIV') {
      return NextResponse.json({
        success: true,
        discountType: 'PERCENTAGE',
        value: 15,
        discountAmount: Math.round(totalAmount * 0.15),
        message: 'AURAEXCLUSIV applied! 15% VIP discount added.',
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid or expired coupon code.' },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
