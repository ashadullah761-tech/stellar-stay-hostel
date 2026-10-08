'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SAMPLE_ROOMS } from '@/lib/data';
import { RoomType } from '@/lib/types';
import { formatINR } from '@/lib/utils';
import {
  Users,
  Maximize,
  SlidersHorizontal,
  Flame,
  Star,
  Check,
  ArrowRight,
  Filter,
} from 'lucide-react';

export default function RoomsPage() {
  const [rooms, setRooms] = useState<RoomType[]>(SAMPLE_ROOMS);
  const [stayType, setStayType] = useState<'MONTHLY' | 'NIGHTLY'>('MONTHLY');
  const [roomCategory, setRoomCategory] = useState<string>('ALL');
  const [onlyAc, setOnlyAc] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(35000);
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'rating'>('price_asc');

  useEffect(() => {
    fetch('/api/rooms')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.rooms?.length > 0) {
          setRooms(data.rooms);
        }
      })
      .catch((err) => console.warn('API rooms fetch error:', err));
  }, []);

  const filteredRooms = rooms
    .filter((room) => {
      if (roomCategory === 'DORM' && !room.roomType.startsWith('DORM')) return false;
      if (roomCategory === 'SHARING' && room.roomType !== 'DOUBLE' && room.roomType !== 'TRIPLE') return false;
      if (roomCategory === 'PRIVATE' && room.roomType !== 'SINGLE' && room.roomType !== 'STUDIO') return false;
      if (onlyAc && !room.isAc) return false;
      const price = stayType === 'MONTHLY' ? room.pricePerMonth : room.pricePerNight;
      if (price > maxPrice) return false;
      return true;
    })
    .sort((a, b) => {
      const priceA = stayType === 'MONTHLY' ? a.pricePerMonth : a.pricePerNight;
      const priceB = stayType === 'MONTHLY' ? b.pricePerMonth : b.pricePerNight;
      if (sortBy === 'price_asc') return priceA - priceB;
      if (sortBy === 'price_desc') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="pt-28 pb-20 bg-navy-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-400 bg-gold-500/10 px-3.5 py-1 rounded-full border border-gold-500/20">
            Boutique Accommodations
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-100 mt-3 mb-3">
            Available <span className="text-gold-gradient">Rooms & Pricing</span>
          </h1>
          <p className="text-slate-400 text-sm">
            All room packages include 5G Wi-Fi, 3 gourmet meals daily, 24/7 security, daily housekeeping & silent study pod access.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="glass-card p-4 sm:p-6 rounded-3xl border border-gold-500/30 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
            {/* Stay Mode */}
            <div>
              <label className="block text-[11px] font-bold text-gold-400 uppercase tracking-wider mb-1">
                Stay Type
              </label>
              <div className="flex bg-navy-900 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setStayType('MONTHLY')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    stayType === 'MONTHLY' ? 'bg-gold-500 text-navy-900' : 'text-slate-300'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setStayType('NIGHTLY')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    stayType === 'NIGHTLY' ? 'bg-gold-500 text-navy-900' : 'text-slate-300'
                  }`}
                >
                  Nightly
                </button>
              </div>
            </div>

            {/* Room Category */}
            <div>
              <label className="block text-[11px] font-bold text-gold-400 uppercase tracking-wider mb-1">
                Sharing Category
              </label>
              <select
                value={roomCategory}
                onChange={(e) => setRoomCategory(e.target.value)}
                className="w-full bg-navy-900 border border-white/20 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-gold-400"
              >
                <option value="ALL">All Categories</option>
                <option value="DORM">Shared Bunk Dorms (4-6 Bed)</option>
                <option value="SHARING">Double / Triple Sharing</option>
                <option value="PRIVATE">Single Private & Studios</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-[11px] font-bold text-gold-400 uppercase tracking-wider mb-1">
                Max Price: {formatINR(maxPrice)}
              </label>
              <input
                type="range"
                min={stayType === 'MONTHLY' ? 5000 : 500}
                max={stayType === 'MONTHLY' ? 35000 : 5000}
                step={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-gold-500"
              />
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-[11px] font-bold text-gold-400 uppercase tracking-wider mb-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-navy-900 border border-white/20 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-gold-400"
              >
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Guest Rating</option>
              </select>
            </div>

            {/* AC Filter Toggle */}
            <div className="flex items-center gap-2 pt-4 sm:pt-0">
              <input
                type="checkbox"
                id="onlyAc"
                checked={onlyAc}
                onChange={(e) => setOnlyAc(e.target.checked)}
                className="w-4 h-4 rounded text-gold-500 bg-navy-900 border-white/20 focus:ring-gold-400"
              />
              <label htmlFor="onlyAc" className="text-xs text-slate-300 cursor-pointer font-medium">
                Air Conditioned Only
              </label>
            </div>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => {
            const isUrgent = room.availableQuantity <= 2;
            const price = stayType === 'MONTHLY' ? room.pricePerMonth : room.pricePerNight;
            const unit = stayType === 'MONTHLY' ? '/ month' : '/ night';

            return (
              <div
                key={room.id}
                className="glass-card rounded-3xl overflow-hidden border border-gold-500/20 hover:border-gold-500/60 transition-all hover:scale-[1.02] flex flex-col group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={room.images[0]}
                    alt={room.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-80" />

                  {isUrgent && (
                    <div className="absolute top-4 left-4 bg-red-500/90 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg backdrop-blur-md">
                      <Flame className="w-3.5 h-3.5 text-yellow-300 animate-bounce" />
                      <span>Only {room.availableQuantity} left!</span>
                    </div>
                  )}

                  <div className="absolute top-4 right-4 bg-navy-900/80 text-gold-400 text-xs font-bold px-2.5 py-1 rounded-full border border-gold-500/30 flex items-center gap-1 backdrop-blur-md">
                    <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                    <span>{room.rating}</span>
                  </div>

                  <div className="absolute bottom-4 left-4">
                    <span className="text-[11px] font-bold text-navy-900 bg-gold-400 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                      {room.floor}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-slate-100 group-hover:text-gold-400 transition-colors mb-2">
                      {room.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                      {room.description}
                    </p>

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

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {room.amenities.slice(0, 4).map((amenity, i) => (
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

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">Starting from</span>
                      <span className="font-serif text-2xl font-bold text-gold-400">
                        {formatINR(price)}
                      </span>
                      <span className="text-[11px] text-slate-400 font-normal"> {unit}</span>
                    </div>

                    <Link
                      href={`/rooms/${room.id}?stayType=${stayType}`}
                      className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
