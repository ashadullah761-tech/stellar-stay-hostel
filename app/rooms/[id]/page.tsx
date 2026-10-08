'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SAMPLE_ROOMS } from '@/lib/data';
import { RoomType } from '@/lib/types';
import { formatINR, calculatePriceBreakdown } from '@/lib/utils';
import {
  Users,
  Maximize,
  Bed,
  CheckCircle2,
  Star,
  Shield,
  Calendar,
  Sparkles,
  ArrowRight,
  Maximize2,
  X,
  Flame,
  Check,
  Building,
} from 'lucide-react';

export default function RoomDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const roomId = params?.id as string;
  const initialStayType = (searchParams.get('stayType') as 'MONTHLY' | 'NIGHTLY') || 'MONTHLY';

  const [room, setRoom] = useState<RoomType | null>(null);
  const [stayType, setStayType] = useState<'MONTHLY' | 'NIGHTLY'>(initialStayType);
  const [durationCount, setDurationCount] = useState<number>(1);
  const [checkInDate, setCheckInDate] = useState<string>('2026-11-01');
  const [checkOutDate, setCheckOutDate] = useState<string>('2026-12-01');
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/rooms/${roomId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.room) {
          setRoom(data.room);
        } else {
          const match = SAMPLE_ROOMS.find((r) => r.id === roomId || r.slug === roomId);
          if (match) setRoom(match);
        }
      })
      .catch(() => {
        const match = SAMPLE_ROOMS.find((r) => r.id === roomId || r.slug === roomId);
        if (match) setRoom(match);
      });
  }, [roomId]);

  if (!room) {
    return (
      <div className="pt-32 pb-20 text-center bg-navy-900 min-h-screen flex items-center justify-center">
        <div className="glass-card p-8 rounded-3xl border border-gold-500/30">
          <p className="text-gold-400 font-serif text-xl font-bold mb-4">Loading Boutique Room Specs...</p>
          <div className="w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  const breakdown = calculatePriceBreakdown({
    stayType,
    pricePerNight: room.pricePerNight,
    pricePerMonth: room.pricePerMonth,
    durationCount,
  });

  const handleProceedBooking = () => {
    router.push(
      `/booking?roomId=${room.id}&stayType=${stayType}&checkIn=${checkInDate}&checkOut=${checkOutDate}&duration=${durationCount}`
    );
  };

  return (
    <div className="pt-28 pb-20 bg-navy-900 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:text-gold-400">Home</Link>
          <span>/</span>
          <Link href="/rooms" className="hover:text-gold-400">Rooms</Link>
          <span>/</span>
          <span className="text-gold-400 font-bold">{room.title}</span>
        </div>

        {/* Room Header Title */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-navy-900 bg-gold-400 px-3 py-1 rounded-md uppercase tracking-wider">
              {room.floor} Suite
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-100 mt-2">
              {room.title}
            </h1>
            <div className="flex items-center gap-4 mt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1 text-gold-400 font-bold">
                <Star className="w-4 h-4 fill-gold-400" />
                {room.rating} ({room.reviewCount} Guest Reviews)
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">
                {room.availableQuantity > 0 ? `${room.availableQuantity} Units Available` : 'Fully Booked'}
              </span>
              <span>•</span>
              <span>Indiranagar, Bengaluru</span>
            </div>
          </div>

          {/* Stay Type Selector */}
          <div className="flex items-center gap-2 bg-navy-800 p-1.5 rounded-2xl border border-gold-500/30">
            <button
              onClick={() => setStayType('MONTHLY')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                stayType === 'MONTHLY' ? 'bg-gold-500 text-navy-900 shadow-md' : 'text-slate-300'
              }`}
            >
              Monthly Package
            </button>
            <button
              onClick={() => setStayType('NIGHTLY')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                stayType === 'NIGHTLY' ? 'bg-gold-500 text-navy-900 shadow-md' : 'text-slate-300'
              }`}
            >
              Nightly Stay
            </button>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div
            onClick={() => setActivePhoto(room.images[0])}
            className="md:col-span-2 h-[350px] sm:h-[450px] rounded-3xl overflow-hidden relative cursor-pointer group border border-gold-500/30 shadow-2xl"
          >
            <img
              src={room.images[0]}
              alt={room.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 bg-navy-900/90 text-gold-400 text-xs px-3 py-1.5 rounded-xl border border-gold-500/30 flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5" /> Tap for Full Screen Lightbox
            </div>
          </div>

          <div className="grid grid-rows-2 gap-4 h-[350px] sm:h-[450px]">
            {room.images.slice(1, 3).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActivePhoto(img)}
                className="h-full rounded-2xl overflow-hidden relative cursor-pointer group border border-gold-500/20"
              >
                <img
                  src={img}
                  alt={`Room Angle ${idx + 2}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main Specs & Sticky Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Specs, Amenities, House Rules, Reviews */}
          <div className="lg:col-span-2 space-y-10">
            {/* Quick Specs Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl glass-card border border-gold-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center">
                  <Maximize className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Room Size</span>
                  <span className="font-serif text-sm font-bold text-slate-100">{room.sizeSqFt} sq ft</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center">
                  <Bed className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Bed Setup</span>
                  <span className="font-serif text-sm font-bold text-slate-100">{room.bedType}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Max Guests</span>
                  <span className="font-serif text-sm font-bold text-slate-100">{room.capacity} Resident(s)</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Bath Access</span>
                  <span className="font-serif text-sm font-bold text-slate-100">
                    {room.hasPrivateBathroom ? 'Ensuite Bath' : 'Shared Luxury'}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-gold-400 mb-3">Room Overview</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {room.description}
              </p>
            </div>

            {/* Full Amenities List */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-gold-400 mb-4">Included Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-navy-800/60 border border-white/5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules & Security */}
            <div className="p-6 rounded-3xl glass-card border border-gold-500/20">
              <h3 className="font-serif text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-gold-400" />
                Hostel Policies & Visitor Rules
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accentTeal-500" />
                  <span>Visiting hours for guests: 9:00 AM to 8:00 PM in rooftop cafe.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accentTeal-500" />
                  <span>Silent hours inside study library: 10:00 PM to 7:00 AM.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accentTeal-500" />
                  <span>100% Non-Smoking & Drug-Free premises enforced by biometric security.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accentTeal-500" />
                  <span>3 Nutritious Meals served daily at the rooftop cafe.</span>
                </li>
              </ul>
            </div>

            {/* Guest Reviews */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-gold-400 mb-4">Verified Resident Reviews</h3>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-navy-800/80 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-slate-100">Aarav Mehta (IIT Resident)</span>
                    <span className="flex items-center gap-1 text-gold-400 text-xs">
                      <Star className="w-3.5 h-3.5 fill-gold-400" /> 5.0
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 italic">
                    "Super clean room, hyper fast 5G Wi-Fi for work, and awesome warden support."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Pricing & Booking Panel */}
          <div>
            <div className="sticky top-28 glass-card p-6 rounded-3xl border border-gold-500/40 shadow-2xl">
              <div className="flex items-baseline justify-between mb-4 pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs text-slate-400 block">Rate</span>
                  <span className="font-serif text-3xl font-bold text-gold-400">
                    {formatINR(breakdown.unitPrice)}
                  </span>
                  <span className="text-xs text-slate-400 font-normal">
                    {stayType === 'MONTHLY' ? ' / month' : ' / night'}
                  </span>
                </div>
                {room.availableQuantity <= 2 && (
                  <span className="text-[11px] font-bold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/30 flex items-center gap-1">
                    <Flame className="w-3 h-3 animate-bounce" /> Only {room.availableQuantity} Left!
                  </span>
                )}
              </div>

              {/* Date & Duration Selection */}
              <div className="space-y-3 mb-6">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full bg-navy-900 border border-white/20 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {stayType === 'MONTHLY' ? 'Duration (Months)' : 'Duration (Nights)'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={durationCount}
                    onChange={(e) => setDurationCount(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-navy-900 border border-white/20 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              {/* Price Breakdown Preview */}
              <div className="p-4 rounded-2xl bg-navy-900/80 border border-white/10 space-y-2 text-xs mb-6">
                <div className="flex justify-between text-slate-300">
                  <span>Base Accommodation</span>
                  <span>{formatINR(breakdown.baseTotal)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>GST (12%)</span>
                  <span>{formatINR(breakdown.taxAmount)}</span>
                </div>
                {breakdown.depositAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Refundable Deposit</span>
                    <span>{formatINR(breakdown.depositAmount)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-white/10 flex justify-between font-serif text-base font-bold text-gold-400">
                  <span>Grand Total</span>
                  <span>{formatINR(breakdown.grandTotal)}</span>
                </div>
              </div>

              <button
                onClick={handleProceedBooking}
                className="btn-gold w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
              >
                <span>Reserve Room Now</span>
                <ArrowRight className="w-4 h-4 text-navy-900" />
              </button>

              <p className="text-[11px] text-slate-400 text-center mt-3">
                🔒 10-Minute Hold Granted | Instant Webhook Verification
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-navy-800 text-gold-400 border border-gold-500/30"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activePhoto}
            alt="Room Angle"
            className="max-w-4xl max-h-[85vh] object-contain rounded-2xl border border-gold-500/30"
          />
        </div>
      )}
    </div>
  );
}
