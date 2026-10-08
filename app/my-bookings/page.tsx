'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatINR } from '@/lib/utils';
import {
  Calendar,
  Download,
  Wrench,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bookings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.bookings?.length > 0) {
          setBookings(data.bookings);
        } else {
          // Demo Booking
          setBookings([
            {
              id: 'b-demo-1',
              bookingNumber: 'BK-2026-8921',
              guestName: 'Rohan Sharma',
              guestEmail: 'rohan.sharma@example.com',
              guestPhone: '+91 98123 45678',
              roomTitle: 'Double Sharing Twin Suite (AC)',
              stayType: 'MONTHLY',
              checkIn: '2026-11-01',
              checkOut: '2026-12-01',
              grandTotal: 24660,
              paymentStatus: 'PAID',
              paymentId: 'pay_MockRazorpay98765',
              createdAt: '2026-10-06T12:00:00Z',
            },
          ]);
        }
      })
      .catch(() => {
        setBookings([
          {
            id: 'b-demo-1',
            bookingNumber: 'BK-2026-8921',
            guestName: 'Rohan Sharma',
            guestEmail: 'rohan.sharma@example.com',
            guestPhone: '+91 98123 45678',
            roomTitle: 'Double Sharing Twin Suite (AC)',
            stayType: 'MONTHLY',
            checkIn: '2026-11-01',
            checkOut: '2026-12-01',
            grandTotal: 24660,
            paymentStatus: 'PAID',
            paymentId: 'pay_MockRazorpay98765',
            createdAt: '2026-10-06T12:00:00Z',
          },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-28 pb-20 bg-navy-900 min-h-screen text-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-gold-400 bg-gold-500/10 px-3.5 py-1 rounded-full border border-gold-500/20">
              Resident Dashboard
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-100 mt-2">
              My <span className="text-gold-gradient">Bookings & Stay</span>
            </h1>
          </div>

          <Link
            href="/complaints"
            className="btn-gold px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
          >
            <Wrench className="w-4 h-4 text-navy-900" />
            <span>Report Room Maintenance</span>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-slate-400">Loading your stay records...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="glass-card p-12 rounded-3xl border border-gold-500/30 text-center">
            <Calendar className="w-12 h-12 text-gold-400 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-slate-100 mb-2">No Bookings Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
              You don't have any active room reservations yet. Explore our luxury rooms to reserve.
            </p>
            <Link href="/rooms" className="btn-gold px-6 py-3 rounded-xl text-xs font-bold inline-flex items-center gap-2">
              <span>Book A Room</span>
              <ArrowRight className="w-4 h-4 text-navy-900" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="glass-card p-6 rounded-3xl border border-gold-500/30 space-y-4 hover:border-gold-500/60 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-gold-400 block">
                      BOOKING REF: {booking.bookingNumber}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-slate-100">
                      {booking.roomTitle || booking.room?.title || 'Boutique Room'}
                    </h3>
                  </div>

                  <div className="sm:text-right">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {booking.paymentStatus}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1">Stay Mode: {booking.stayType}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Resident Name</span>
                    <span className="font-bold text-slate-100">{booking.guestName}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">Check-in / Check-out</span>
                    <span className="font-bold text-slate-100">
                      {new Date(booking.checkIn).toLocaleDateString()} to {new Date(booking.checkOut).toLocaleDateString()}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">Total Paid Amount</span>
                    <span className="font-serif text-base font-bold text-gold-400">
                      {formatINR(booking.grandTotal)}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-400" /> Verified Indiranagar Stay
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href="/complaints"
                      className="px-4 py-2 rounded-xl bg-navy-800 text-slate-200 border border-white/10 text-xs font-bold hover:text-gold-400"
                    >
                      Report Room Maintenance
                    </Link>

                    <button
                      onClick={handlePrint}
                      className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-navy-900" />
                      <span>Download Receipt PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
