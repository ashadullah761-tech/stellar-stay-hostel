import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateBookingNumber, calculatePriceBreakdown } from '@/lib/utils';
import { notifications } from '@/lib/notifications';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      guestName,
      guestEmail,
      guestPhone,
      roomId,
      stayType = 'MONTHLY',
      checkIn,
      checkOut,
      durationCount = 1,
      totalGuests = 1,
      couponCode,
      paymentId = 'pay_MockRazorpay' + Math.floor(10000 + Math.random() * 90000),
      razorpayOrderId = 'order_MockRazorpay' + Math.floor(10000 + Math.random() * 90000),
    } = body;

    // Fetch target room details
    let room = null;
    try {
      room = await prisma.room.findUnique({ where: { id: roomId } });
    } catch (e) {
      console.warn('Prisma lookup failed, creating demo booking');
    }

    const pricePerNight = room?.pricePerNight || 1999;
    const pricePerMonth = room?.pricePerMonth || 18000;
    const roomTitle = room?.title || 'Double Sharing Twin Suite (AC)';

    // Coupon discount logic
    let couponDiscountPercentage = 0;
    let couponDiscountFixed = 0;

    if (couponCode) {
      if (couponCode.toUpperCase() === 'WELCOME10') couponDiscountPercentage = 10;
      if (couponCode.toUpperCase() === 'STUDENT500') couponDiscountFixed = 500;
      if (couponCode.toUpperCase() === 'AURAEXCLUSIV') couponDiscountPercentage = 15;
    }

    const priceBreakdown = calculatePriceBreakdown({
      stayType,
      pricePerNight,
      pricePerMonth,
      durationCount,
      couponDiscountPercentage,
      couponDiscountFixed,
    });

    const bookingNumber = generateBookingNumber();

    // Create DB Booking Record
    let bookingRecord = null;
    try {
      bookingRecord = await prisma.booking.create({
        data: {
          bookingNumber,
          guestName,
          guestEmail,
          guestPhone,
          roomId,
          stayType,
          checkIn: new Date(checkIn),
          checkOut: new Date(checkOut),
          durationCount,
          totalGuests,
          roomPrice: priceBreakdown.baseTotal,
          taxAmount: priceBreakdown.taxAmount,
          depositAmount: priceBreakdown.depositAmount,
          discountAmount: priceBreakdown.discountAmount,
          grandTotal: priceBreakdown.grandTotal,
          paymentStatus: 'PAID',
          paymentId,
          razorpayOrderId,
          couponCode,
        },
      });

      // Update room availability
      if (room && room.availableQuantity > 0) {
        await prisma.room.update({
          where: { id: roomId },
          data: { availableQuantity: room.availableQuantity - 1 },
        });
      }
    } catch (dbErr) {
      console.warn('DB Booking creation warning:', dbErr);
    }

    // Trigger Multi-Channel Notifications (Email, SMS, WhatsApp)
    const emailHtml = notifications.generateBookingConfirmationEmail({
      guestName,
      bookingNumber,
      roomTitle,
      checkIn,
      checkOut,
      amountPaid: priceBreakdown.grandTotal,
      paymentId,
    });

    await notifications.sendEmail({
      to: guestEmail,
      subject: `Booking Confirmed - ${bookingNumber} | ${roomTitle}`,
      html: emailHtml,
      recipientName: guestName,
    });

    await notifications.sendSMS({
      to: guestPhone,
      message: `Aura Hostel: Booking ${bookingNumber} for ${roomTitle} is CONFIRMED! Check-in: ${checkIn}. Paid: ₹${priceBreakdown.grandTotal}.`,
    });

    await notifications.sendWhatsApp({
      to: guestPhone,
      message: `🎉 Booking Confirmed! Ref: ${bookingNumber}. We look forward to hosting you at Aura Luxury Hostel! Address: Indiranagar 100ft Road, Bengaluru.`,
    });

    return NextResponse.json({
      success: true,
      bookingNumber,
      booking: bookingRecord || {
        bookingNumber,
        guestName,
        guestEmail,
        guestPhone,
        roomTitle,
        checkIn,
        checkOut,
        grandTotal: priceBreakdown.grandTotal,
        paymentStatus: 'PAID',
        paymentId,
      },
      priceBreakdown,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: { room: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, bookings });
  } catch (err) {
    return NextResponse.json({ success: true, bookings: [] });
  }
}
