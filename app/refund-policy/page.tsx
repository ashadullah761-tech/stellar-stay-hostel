'use client';

import React from 'react';

export default function RefundPolicyPage() {
  const hostelName = process.env.NEXT_PUBLIC_HOSTEL_NAME || 'Aura Luxury Hostel';

  return (
    <div className="pt-28 pb-20 bg-navy-900 min-h-screen text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-gold-400 mb-6">
          Refund & Cancellation Policy
        </h1>

        <div className="glass-card p-8 rounded-3xl border border-gold-500/30 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            At <strong>{hostelName}</strong>, we strive to maintain complete transparency in our reservation, cancellation, and security deposit refund processes.
          </p>

          <h3 className="font-serif text-lg font-bold text-slate-100">1. Cancellation Timelines</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>7+ Days Before Check-in:</strong> 100% refund of advance booking amount.
            </li>
            <li>
              <strong>3 to 7 Days Before Check-in:</strong> 50% refund of advance booking amount.
            </li>
            <li>
              <strong>Less than 72 Hours / No Show:</strong> Non-refundable advance booking fee.
            </li>
          </ul>

          <h3 className="font-serif text-lg font-bold text-slate-100">2. Security Deposit Refund</h3>
          <p>
            The ₹5,000 security deposit for monthly stays is refunded in full to your bank account / UPI within 48 hours of check-out completion.
          </p>

          <h3 className="font-serif text-lg font-bold text-slate-100">3. Processing Method</h3>
          <p>
            Refunds are credited back automatically to the original Razorpay payment source (UPI, Card, Net Banking).
          </p>
        </div>
      </div>
    </div>
  );
}
