'use client';

import React from 'react';

export default function PrivacyPolicyPage() {
  const hostelName = process.env.NEXT_PUBLIC_HOSTEL_NAME || 'Aura Luxury Hostel';

  return (
    <div className="pt-28 pb-20 bg-navy-900 min-h-screen text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-gold-400 mb-6">
          Privacy Policy
        </h1>

        <div className="glass-card p-8 rounded-3xl border border-gold-500/30 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            At <strong>{hostelName}</strong>, accessible from our website and mobile application, protecting the privacy and security of our residents, students, and guests is our paramount priority.
          </p>

          <h3 className="font-serif text-lg font-bold text-slate-100">1. Information We Collect</h3>
          <p>
            We collect personal identification details (name, email address, phone number, government ID proofs such as Aadhaar/Passport) required for statutory student registration, room reservations, and biometric access.
          </p>

          <h3 className="font-serif text-lg font-bold text-slate-100">2. Payment & Razorpay Security</h3>
          <p>
            All online transactions are securely encrypted and processed by Razorpay. We do not store credit card CVVs or bank passwords on our servers.
          </p>

          <h3 className="font-serif text-lg font-bold text-slate-100">3. CCTV & Biometric Safety</h3>
          <p>
            CCTV footage in common corridors, entrance lobbies, and rooftop cafe areas is stored for 30 days exclusively for safety monitoring by authorized hostel wardens.
          </p>
        </div>
      </div>
    </div>
  );
}
