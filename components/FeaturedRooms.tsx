'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SAMPLE_ROOMS } from '@/lib/data';
import { formatINR } from '@/lib/utils';
import {
  Users,
  Maximize,
  Sparkles,
  Check,
  Star,
  Flame,
  ArrowRight,
} from 'lucide-react';

export default function FeaturedRooms() {
  const [pricingMode, setPricingMode] = useState<'MONTHLY' | 'NIGHTLY'>('MONTHLY');
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const filteredRooms = SAMPLE_ROOMS.filter((room) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'DORM') return room.roomType.startsWith('DORM');
    if (selectedFilter === 'PRIVATE') return room.roomType === 'SINGLE' || room.roomType === 'STUDIO';
    if (selectedFilter === 'SHARING') return room.roomType === 'DOUBLE' || room.roomType === 'TRIPLE';
    return true;
  });

  return (
    <section className="py-20 bg-navy-800/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-gold-400 bg-gold-500/10 px-3.5 py-1.5 rounded-full border border-gold-500/20">
              Luxury Boutique Residences
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-100 mt-4">
              Featured <span className="text-gold-gradient">Rooms & Suites</span>
            </h2>
          </div>

          {/* Pricing Toggle Switch */}
          <div className="mt-6 md:mt-0 flex items-center gap-3 bg-navy-900 p-1.5 rounded-2xl border border-gold-500/30">
            <button
              onClick={() => setPricingMode('MONTHLY')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                pricingMode === 'MONTHLY'
                  ? 'bg-gold-500 text-navy-900 shadow-md'
                  : 'text-slate-300 hover:text-gold-400'
              }`}
            >
              Monthly Package (Best Value)
            </button>
            <button
              onClick={() => setPricingMode('NIGHTLY')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                pricingMode === 'NIGHTLY'
                  ? 'bg-gold-500 text-navy-900 shadow-md'
                  : 'text-slate-300 hover:text-gold-400'
              }`}
            >
              Nightly Rate
            </button>
          </div>
        </div>

        {/* Filter Categories Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {[
            { id: 'ALL', label: 'All Room Types' },
            { id: 'DORM', label: 'Boutique Dorms (4-6 Bed)' },
            { id: 'SHARING', label: 'Double & Triple Sharing' },
            { id: 'PRIVATE', label: 'Single & Penthouse Studios' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedFilter === tab.id
                  ? 'bg-gold-500/20 text-gold-400 border border-gold-500/50 font-bold'
                  : 'bg-navy-900/60 text-slate-300 hover:bg-navy-800 border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.slice(0, 6).map((room) => {
            const isUrgent = room.availableQuantity <= 2;
            const price = pricingMode === 'MONTHLY' ? room.pricePerMonth : room.pricePerNight;
            const unit = pricingMode === 'MONTHLY' ? '/ month' : '/ night';

            return (
              <div
                key={room.id}
                className="glass-card rounded-3xl overflow-hidden border border-gold-500/20 hover:border-gold-500/60 transition-all hover:scale-[1.02] flex flex-col group"
              >
                {/* Image Container with Badge */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={room.images[0]}
                    alt={room.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-80" />

                  {/* Urgency Badge */}
                  {isUrgent && (
                    <div className="absolute top-4 left-4 bg-red-500/90 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg backdrop-blur-md">
                      <Flame className="w-3.5 h-3.5 text-yellow-300 animate-bounce" />
                      <span>Only {room.availableQuantity} left!</span>
                    </div>
                  )}

                  {/* Rating Tag */}
                  <div className="absolute top-4 right-4 bg-navy-900/80 text-gold-400 text-xs font-bold px-2.5 py-1 rounded-full border border-gold-500/30 flex items-center gap-1 backdrop-blur-md">
                    <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                    <span>{room.rating}</span>
                  </div>

                  {/* Room Type Tag */}
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[11px] font-bold text-navy-900 bg-gold-400 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                      {room.floor}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-slate-100 group-hover:text-gold-400 transition-colors mb-2">
                      {room.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Room Specs */}
                    <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-slate-300 bg-navy-900/60 p-3 rounded-xl border border-white/5">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-gold-400" />
                        <span>Capacity: {room.capacity}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize className="w-3.5 h-3.5 text-gold-400" />
                        <span>{room.sizeSqFt} sq ft</span>
                      </div>
                    </div>

                    {/* Top Amenities Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {room.amenities.slice(0, 3).map((amenity, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-gold-500/10 text-gold-300 border border-gold-500/20 px-2 py-0.5 rounded-md flex items-center gap-1"
                        >
                          <Check className="w-2.5 h-2.5 text-gold-400" />
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Book CTA */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">Starting from</span>
                      <span className="font-serif text-2xl font-bold text-gold-400">
                        {formatINR(price)}
                      </span>
                      <span className="text-[11px] text-slate-400 font-normal"> {unit}</span>
                    </div>

                    <Link
                      href={`/rooms/${room.id}`}
                      className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
                    >
                      <span>Details & Book</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-sm font-bold text-gold-400 hover:text-gold-300 underline underline-offset-8"
          >
            <span>View All Available Rooms & Suites</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
