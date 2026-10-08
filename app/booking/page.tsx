'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { SAMPLE_ROOMS } from '@/lib/data';
import { RoomType, StayTypeEnum } from '@/lib/types';
import { formatINR, calculatePriceBreakdown } from '@/lib/utils';
import {
  CheckCircle2,
  Calendar,
  Users,
  CreditCard,
  Download,
  Check,
  Tag,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  QrCode,
  MapPin,
  Clock,
  Phone,
} from 'lucide-react';

function BookingWizardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryRoomId = searchParams.get('roomId') || SAMPLE_ROOMS[0].id;
  const initialStayType = (searchParams.get('stayType') as StayTypeEnum) || 'MONTHLY';
  const initialCheckIn = searchParams.get('checkIn') || '2026-11-01';
  const initialCheckOut = searchParams.get('checkOut') || '2026-12-01';
  const initialDuration = Number(searchParams.get('duration') || 1);

  const [step, setStep] = useState<number>(1);
  const [selectedRoom, setSelectedRoom] = useState<RoomType>(
    SAMPLE_ROOMS.find((r) => r.id === queryRoomId || r.slug === queryRoomId) || SAMPLE_ROOMS[0]
  );
  const [stayType, setStayType] = useState<StayTypeEnum>(initialStayType);
  const [checkIn, setCheckIn] = useState<string>(initialCheckIn);
  const [checkOut, setCheckOut] = useState<string>(initialCheckOut);
  const [durationCount, setDurationCount] = useState<number>(initialDuration);

  // Guest Details
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestIdProof, setGuestIdProof] = useState('Aadhaar Card');

  // Coupon
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMsg, setCouponMsg] = useState('');
  const [couponDiscountPercent, setCouponDiscountPercent] = useState(0);
  const [couponDiscountFixed, setCouponDiscountFixed] = useState(0);

  // Payment & Confirmation State
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/rooms/${queryRoomId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.room) setSelectedRoom(data.room);
      })
      .catch(() => {});
  }, [queryRoomId]);

  const priceBreakdown = calculatePriceBreakdown({
    stayType,
    pricePerNight: selectedRoom.pricePerNight,
    pricePerMonth: selectedRoom.pricePerMonth,
    durationCount,
    couponDiscountPercentage: couponDiscountPercent,
    couponDiscountFixed: couponDiscountFixed,
  });

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, totalAmount: priceBreakdown.baseTotal }),
      });
      const data = await res.json();
      if (data.success) {
        setCouponApplied(true);
        setCouponMsg(data.message);
        if (data.discountType === 'PERCENTAGE') setCouponDiscountPercent(data.value);
        if (data.discountType === 'FIXED') setCouponDiscountFixed(data.value);
      } else {
        setCouponMsg(data.error || 'Invalid Coupon');
      }
    } catch (err) {
      setCouponMsg('Coupon check error');
    }
  };

  const handleExecutePayment = async () => {
    setIsProcessing(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName,
          guestEmail,
          guestPhone,
          roomId: selectedRoom.id,
          stayType,
          checkIn,
          checkOut,
          durationCount,
          totalGuests: 1,
          couponCode: couponApplied ? couponCode : undefined,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setConfirmedBooking(data.booking);
        setStep(5); // Confirmation step

        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
          });
        } catch (e) {}
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const stepsList = [
    { num: 1, label: 'Dates & Stay' },
    { num: 2, label: 'Guest Details' },
    { num: 3, label: 'Review & Coupon' },
    { num: 4, label: 'Payment' },
    { num: 5, label: 'Confirmation' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Wizard Progress Bar Header */}
      <div className="mb-10 text-center">
        <span className="text-xs uppercase font-bold tracking-widest text-gold-400 bg-gold-500/10 px-3.5 py-1 rounded-full border border-gold-500/20">
          Secure Booking Wizard
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-100 mt-2 mb-6">
          Reserve <span className="text-gold-gradient">{selectedRoom.title}</span>
        </h1>

        {/* Steps Indicator */}
        <div className="flex items-center justify-between relative max-w-2xl mx-auto px-4">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-navy-800 -translate-y-1/2 z-0" />
          {stepsList.map((s) => {
            const isDone = s.num < step;
            const isCurrent = s.num === step;
            return (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-gold-500 text-navy-900 shadow-lg scale-110'
                      : isDone
                      ? 'bg-emerald-500 text-navy-900'
                      : 'bg-navy-800 text-slate-400 border border-white/10'
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-[10px] mt-1 font-bold hidden sm:block ${
                  isCurrent ? 'text-gold-400' : 'text-slate-400'
                }`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1: Dates & Stay Type */}
      {step === 1 && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gold-500/30 space-y-6">
          <h3 className="font-serif text-xl font-bold text-gold-400">
            Step 1: Choose Dates & Stay Mode
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Stay Package
              </label>
              <div className="flex bg-navy-900 p-1 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setStayType('MONTHLY')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    stayType === 'MONTHLY' ? 'bg-gold-500 text-navy-900' : 'text-slate-300'
                  }`}
                >
                  Monthly Stay
                </button>
                <button
                  type="button"
                  onClick={() => setStayType('NIGHTLY')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    stayType === 'NIGHTLY' ? 'bg-gold-500 text-navy-900' : 'text-slate-300'
                  }`}
                >
                  Nightly Stay
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {stayType === 'MONTHLY' ? 'Duration (Months)' : 'Duration (Nights)'}
              </label>
              <input
                type="number"
                min={1}
                value={durationCount}
                onChange={(e) => setDurationCount(Math.max(1, Number(e.target.value)))}
                className="w-full bg-navy-900 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Check-in Date *
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-navy-900 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-gold-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Check-out Date *
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-navy-900 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-gold-400"
                required
              />
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            className="btn-gold w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
          >
            <span>Continue to Guest Details</span>
            <ArrowRight className="w-4 h-4 text-navy-900" />
          </button>
        </div>
      )}

      {/* STEP 2: Guest Details */}
      {step === 2 && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gold-500/30 space-y-6">
          <h3 className="font-serif text-xl font-bold text-gold-400">
            Step 2: Resident Guest Information
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Full Name (As per Govt ID) *
              </label>
              <input
                type="text"
                placeholder="e.g. Rohan Sharma"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full bg-navy-900 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-gold-400"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Email Address (For Booking Voucher) *
                </label>
                <input
                  type="email"
                  placeholder="student@example.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full bg-navy-900 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-gold-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Mobile Number (SMS / WhatsApp) *
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full bg-navy-900 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-gold-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Government ID Proof Type
              </label>
              <select
                value={guestIdProof}
                onChange={(e) => setGuestIdProof(e.target.value)}
                className="w-full bg-navy-900 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-gold-400"
              >
                <option value="Aadhaar Card">Aadhaar Card</option>
                <option value="Passport">Passport</option>
                <option value="College Student ID">College Student ID</option>
                <option value="Driving License">Driving License</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-3 rounded-xl bg-navy-800 text-slate-300 border border-white/10 text-xs font-bold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <button
              onClick={() => {
                if (guestName && guestEmail && guestPhone) setStep(3);
              }}
              disabled={!guestName || !guestEmail || !guestPhone}
              className="btn-gold flex-1 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>Review Price & Coupon</span>
              <ArrowRight className="w-4 h-4 text-navy-900" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Review Price & Coupon */}
      {step === 3 && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gold-500/30 space-y-6">
          <h3 className="font-serif text-xl font-bold text-gold-400">
            Step 3: Review Breakdown & Apply Coupon
          </h3>

          <div className="p-4 rounded-2xl bg-navy-900/80 border border-gold-500/20">
            <label className="block text-xs font-bold text-gold-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" /> Have a Promo Code? (Try: WELCOME10 or STUDENT500)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 bg-navy-900 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-slate-100 uppercase focus:outline-none focus:border-gold-400"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="btn-gold px-4 py-2 rounded-xl text-xs font-bold"
              >
                Apply
              </button>
            </div>
            {couponMsg && (
              <p className={`text-xs mt-2 font-bold ${couponApplied ? 'text-emerald-400' : 'text-red-400'}`}>
                {couponMsg}
              </p>
            )}
          </div>

          <div className="p-5 rounded-2xl bg-navy-900 border border-white/10 space-y-3 text-sm">
            <div className="flex justify-between text-slate-300">
              <span>Room Type:</span>
              <span className="font-bold text-slate-100">{selectedRoom.title}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Duration & Mode:</span>
              <span>{durationCount} {stayType === 'MONTHLY' ? 'Month(s)' : 'Night(s)'}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Base Accommodation Fee:</span>
              <span>{formatINR(priceBreakdown.baseTotal)}</span>
            </div>
            {priceBreakdown.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Coupon Discount:</span>
                <span>- {formatINR(priceBreakdown.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-300">
              <span>GST (12%):</span>
              <span>{formatINR(priceBreakdown.taxAmount)}</span>
            </div>
            {priceBreakdown.depositAmount > 0 && (
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Refundable Security Deposit:</span>
                <span>{formatINR(priceBreakdown.depositAmount)}</span>
              </div>
            )}
            <div className="pt-3 border-t border-white/10 flex justify-between font-serif text-xl font-bold text-gold-400">
              <span>Grand Total Payable:</span>
              <span>{formatINR(priceBreakdown.grandTotal)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep(2)}
              className="px-5 py-3 rounded-xl bg-navy-800 text-slate-300 border border-white/10 text-xs font-bold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <button
              onClick={() => setStep(4)}
              className="btn-gold flex-1 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
            >
              <span>Proceed to Razorpay Checkout</span>
              <ArrowRight className="w-4 h-4 text-navy-900" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Razorpay Payment Simulation */}
      {step === 4 && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gold-500/30 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/40 flex items-center justify-center mx-auto">
            <CreditCard className="w-8 h-8" />
          </div>

          <div>
            <h3 className="font-serif text-2xl font-bold text-slate-100">
              Razorpay Payment Gateway Integration
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Supports UPI (GPay, PhonePe, Paytm, QR), Cards, Net Banking, and Wallets.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-navy-900 border border-gold-500/20 max-w-md mx-auto text-left text-xs space-y-2">
            <p><strong>Resident:</strong> {guestName}</p>
            <p><strong>Total Amount:</strong> <span className="text-gold-400 font-bold text-sm">{formatINR(priceBreakdown.grandTotal)}</span></p>
            <p><strong>Mode:</strong> Test / Live Environment</p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setStep(3)}
              className="px-5 py-3 rounded-xl bg-navy-800 text-slate-300 border border-white/10 text-xs font-bold"
            >
              Cancel
            </button>

            <button
              onClick={handleExecutePayment}
              disabled={isProcessing}
              className="btn-gold px-8 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-2xl"
            >
              <ShieldCheck className="w-4 h-4 text-navy-900" />
              <span>{isProcessing ? 'Verifying Signature & Booking...' : `Pay ${formatINR(priceBreakdown.grandTotal)} Now`}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Booking Confirmation & Printable PDF Receipt */}
      {step === 5 && confirmedBooking && (
        <div className="glass-card p-8 rounded-3xl border border-emerald-500/40 space-y-8 animate-in zoom-in-95 duration-300 print:bg-white print:text-black">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">
              Booking Confirmed & Verified
            </span>
            <h2 className="font-serif text-3xl font-bold text-slate-100 mt-2">
              Thank You, {confirmedBooking.guestName}!
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              A confirmation HTML email, SMS, and WhatsApp message have been sent to your contacts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900/90 border border-gold-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-serif text-xl font-bold text-gold-400">
                  AURA LUXURY HOSTEL
                </span>
                <p className="text-[11px] text-slate-400">Official Stay Voucher & Invoice</p>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs font-bold text-gold-400 block">
                  {confirmedBooking.bookingNumber}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">STATUS: PAID</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-slate-400">Guest Name:</p>
                <p className="font-bold text-slate-100">{confirmedBooking.guestName}</p>
              </div>
              <div>
                <p className="text-slate-400">Contact Email & Phone:</p>
                <p className="font-bold text-slate-100">{confirmedBooking.guestEmail} | {confirmedBooking.guestPhone}</p>
              </div>
              <div>
                <p className="text-slate-400">Room Reserved:</p>
                <p className="font-bold text-gold-400">{selectedRoom.title}</p>
              </div>
              <div>
                <p className="text-slate-400">Check-in / Check-out:</p>
                <p className="font-bold text-slate-100">{checkIn} to {checkOut}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span>Total Amount Paid (Incl. Taxes):</span>
              <span className="font-serif text-xl font-bold text-emerald-400">
                {formatINR(confirmedBooking.grandTotal || priceBreakdown.grandTotal)}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handlePrintInvoice}
              className="btn-gold w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-navy-900" />
              <span>Download / Print PDF Invoice</span>
            </button>

            <button
              onClick={() => router.push('/my-bookings')}
              className="px-6 py-3 rounded-xl bg-navy-800 text-slate-200 border border-white/10 text-xs font-bold w-full sm:w-auto"
            >
              Go to My Bookings Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingWizardPage() {
  return (
    <div className="pt-28 pb-20 bg-navy-900 min-h-screen text-slate-100">
      <Suspense
        fallback={
          <div className="text-center py-20">
            <div className="w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-slate-400">Initializing Booking Wizard...</p>
          </div>
        }
      >
        <BookingWizardContent />
      </Suspense>
    </div>
  );
}
