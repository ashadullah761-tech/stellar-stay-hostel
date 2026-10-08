'use client';

import React from 'react';

export default function TermsPage() {
  const hostelName = process.env.NEXT_PUBLIC_HOSTEL_NAME || 'Aura Luxury Hostel';

  return (
    <div className="pt-28 pb-20 bg-navy-900 min-h-screen text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-gold-400 mb-6">
          Terms & Conditions of Stay
        </h1>

        <div className="glass-card p-8 rounded-3xl border border-gold-500/30 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            Welcome to <strong>{hostelName}</strong>. By reserving accommodation or logging into our student portal, you agree to comply with our hostel conduct guidelines.
          </p>

          <h3 className="font-serif text-lg font-bold text-slate-100">1. Resident Conduct & Silent Hours</h3>
          <p>
            Silent study hours inside the study pods are strictly observed from 10:00 PM to 7:00 AM to ensure zero disturbance during exams and work.
          </p>

          <h3 className="font-serif text-lg font-bold text-slate-100">2. Visitor Regulations</h3>
          <p>
            Visitors are permitted in the main ground reception lobby and rooftop cafe between 9:00 AM and 8:00 PM. No non-resident visitors are permitted in private bedrooms.
          </p>

          <h3 className="font-serif text-lg font-bold text-slate-100">3. Monthly Rent & Security Deposit</h3>
          <p>
            Monthly stay packages require a standard refundable security deposit of ₹5,000, which is refunded within 48 hours of check-out after room clearance.
          </p>
        </div>
      </div>
    </div>
  );
}
