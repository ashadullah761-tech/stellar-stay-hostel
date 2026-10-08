'use client';

import React from 'react';
import { NEARBY_PLACES } from '@/lib/data';
import { MapPin, Navigation, Sparkles, Shield, Heart, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const hostelName = process.env.NEXT_PUBLIC_HOSTEL_NAME || 'Aura Luxury Co-Living';
  const hostelCity = process.env.NEXT_PUBLIC_HOSTEL_CITY || 'Bengaluru';

  return (
    <div className="pt-28 pb-20 bg-navy-900 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-400 bg-gold-500/10 px-3.5 py-1.5 rounded-full border border-gold-500/20">
            About Our Brand
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-100 mt-4 mb-4">
            Redefining <span className="text-gold-gradient">Student Living</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {hostelName} was born out of a simple vision: to eliminate noisy, unhygienic PGs and replace them with luxury boutique hotel standards designed specifically for college students and ambitious young professionals in {hostelCity}.
          </p>
        </div>

        {/* 360 Degree Virtual Tour Placeholder Banner */}
        <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden mb-16 border border-gold-500/30 shadow-2xl group">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80"
            alt="Hostel Exterior"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/50 flex items-center justify-center mb-3 backdrop-blur-md animate-pulse">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-slate-100 mb-2">
              Interactive 360° Virtual Tour
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md">
              Walk through our study pods, rooftop dining lounge, and executive rooms online before booking.
            </p>
          </div>
        </div>

        {/* Nearby Places Section */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-accentTeal-500 bg-accentTeal-500/10 px-3 py-1 rounded-full border border-accentTeal-500/30">
              Prime Indiranagar Location
            </span>
            <h2 className="font-serif text-3xl font-bold text-slate-100 mt-3 mb-2">
              Nearby Colleges & Landmarks
            </h2>
            <p className="text-xs text-slate-400">
              Minutes away from premier colleges, metro stations, IT hubs, and hospital facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NEARBY_PLACES.map((place, idx) => (
              <div
                key={idx}
                className="glass-card p-5 rounded-2xl border border-gold-500/20 flex items-center justify-between hover:border-gold-500/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center shrink-0">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-accentTeal-500 uppercase">
                      {place.category}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-slate-100">
                      {place.name}
                    </h4>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-bold text-gold-400 text-xs block">{place.distance}</span>
                  <span className="text-[10px] text-slate-400">{place.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center glass-card p-10 rounded-3xl border border-gold-500/30">
          <h3 className="font-serif text-2xl font-bold text-slate-100 mb-3">Ready to Join the Aura Community?</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto mb-6">
            Schedule a physical site visit or reserve your room online with instant booking confirmation.
          </p>
          <Link href="/rooms" className="btn-gold px-6 py-3 rounded-xl text-xs font-bold inline-flex items-center gap-2">
            <span>Explore Rooms</span>
            <ArrowRight className="w-4 h-4 text-navy-900" />
          </Link>
        </div>
      </div>
    </div>
  );
}
