'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Users,
  Search,
  Sparkles,
  Shield,
  Wifi,
  Coffee,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export default function Hero() {
  const router = useRouter();
  const [stayType, setStayType] = useState<'MONTHLY' | 'NIGHTLY'>('MONTHLY');
  const [checkIn, setCheckIn] = useState('2026-11-01');
  const [checkOut, setCheckOut] = useState('2026-12-01');
  const [guests, setGuests] = useState('1');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/rooms?stayType=${stayType}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
    );
  };

  const hostelCity = process.env.NEXT_PUBLIC_HOSTEL_CITY || 'Bengaluru';
  const hostelState = process.env.NEXT_PUBLIC_HOSTEL_STATE || 'Karnataka';

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Fast Loading Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=75"
          alt="Boutique Luxury Hostel"
          decoding="async"
          loading="eager"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/80 to-navy-900/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Luxury Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-800/80 border border-gold-500/30 text-gold-400 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span>Indiranagar, {hostelCity}, {hostelState}’s #1 Boutique Co-Living</span>
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-100 mb-6 leading-tight">
          Where <span className="text-gold-gradient">Luxury Hotel Comfort</span> <br className="hidden sm:inline" />
          Meets Student Co-Living
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-light mb-10 leading-relaxed">
          Premium air-conditioned rooms, 5G Wi-Fi, 3-tier biometric security, 3 gourmet meals daily, and vibrant student community spaces.
        </p>

        {/* Floating Glass Search Bar Bar */}
        <div className="glass-card max-w-4xl mx-auto p-4 sm:p-6 rounded-3xl border border-gold-500/40 shadow-2xl text-left">
          <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStayType('MONTHLY')}
                className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  stayType === 'MONTHLY'
                    ? 'bg-gold-500 text-navy-900 shadow-lg'
                    : 'text-slate-300 hover:text-gold-400'
                }`}
              >
                Monthly Stay (Students & Pros)
              </button>

              <button
                type="button"
                onClick={() => setStayType('NIGHTLY')}
                className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  stayType === 'NIGHTLY'
                    ? 'bg-gold-500 text-navy-900 shadow-lg'
                    : 'text-slate-300 hover:text-gold-400'
                }`}
              >
                Nightly Stay (Short Term)
              </button>
            </div>

            <span className="hidden sm:flex items-center gap-1 text-xs text-accentTeal-500 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Zero Brokerage
            </span>
          </div>

          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-medium text-gold-400 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Check-in Date
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-navy-900/90 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-gold-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gold-400 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Check-out Date
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-navy-900/90 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-gold-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gold-400 mb-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Occupants
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-navy-900/90 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-gold-400"
              >
                <option value="1">1 Person (Single/Sharing)</option>
                <option value="2">2 Persons (Double Room)</option>
                <option value="3">3 Persons (Triple Room)</option>
                <option value="4">4+ Persons (Group / Dorm)</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="btn-gold w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 group"
              >
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Check Availability</span>
              </button>
            </div>
          </form>
        </div>

        {/* Highlight Quick Badges */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2.5 p-3 rounded-2xl bg-navy-800/60 border border-white/10 text-xs text-slate-200">
            <Shield className="w-4 h-4 text-gold-400" />
            <span>24/7 Biometric & Warden</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 p-3 rounded-2xl bg-navy-800/60 border border-white/10 text-xs text-slate-200">
            <Wifi className="w-4 h-4 text-gold-400" />
            <span>5G Ultra-Fast Wi-Fi</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 p-3 rounded-2xl bg-navy-800/60 border border-white/10 text-xs text-slate-200">
            <Coffee className="w-4 h-4 text-gold-400" />
            <span>3 Gourmet Meals + Cafe</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 p-3 rounded-2xl bg-navy-800/60 border border-white/10 text-xs text-slate-200">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>Daily Housekeeping</span>
          </div>
        </div>
      </div>
    </div>
  );
}
