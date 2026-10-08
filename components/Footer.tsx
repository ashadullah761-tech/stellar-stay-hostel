'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  QrCode,
  Heart,
} from 'lucide-react';

export default function Footer() {
  const hostelName = process.env.NEXT_PUBLIC_HOSTEL_NAME || 'Aura Luxury Co-Living & Boutique Hostel';
  const address = process.env.NEXT_PUBLIC_HOSTEL_ADDRESS || 'No. 402, 100 Feet Road, Indiranagar, Bengaluru, KA 560038';
  const phone = process.env.NEXT_PUBLIC_HOSTEL_PHONE || '+91 98765 43210';
  const email = process.env.NEXT_PUBLIC_HOSTEL_EMAIL || 'stay@auraluxuryhostel.com';
  const mapsUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL;

  return (
    <footer className="bg-navy-900 border-t border-gold-500/20 text-slate-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-navy-900" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-wider text-gold-400">
                  AURA
                </span>
                <span className="block text-[10px] tracking-widest text-slate-400 uppercase font-sans">
                  Luxury Co-Living
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Redefining student and young professional living in Bengaluru. High-end boutique rooms, 5G Wi-Fi, 3-tier security, and vibrant community spaces.
            </p>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors bg-gold-500/10 px-3 py-2 rounded-xl border border-gold-500/30"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Get Directions on Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold text-gold-400 mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/rooms" className="hover:text-gold-400 transition-colors">
                  Rooms & Rates
                </Link>
              </li>
              <li>
                <Link href="/complaints" className="hover:text-accentTeal-500 text-accentTeal-500 transition-colors flex items-center gap-1.5 font-medium">
                  Report Room Maintenance
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold-400 transition-colors">
                  Photo & Video Tour
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-400 transition-colors">
                  About Aura Co-Living
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-400 transition-colors">
                  Contact Front Desk
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className="hover:text-gold-400 transition-colors">
                  Student My Bookings
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-gold-400 transition-colors flex items-center gap-1 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                  Warden / Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-lg font-bold text-gold-400 mb-4">Contact & Location</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-gold-400 transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-gold-400 transition-colors">
                  {email}
                </a>
              </li>
            </ul>
          </div>

          {/* Payment & Security Badges */}
          <div>
            <h4 className="font-serif text-lg font-bold text-gold-400 mb-4">Accepted Payments</h4>
            <p className="text-xs text-slate-400 mb-4">
              Secure payments powered by Razorpay with Instant Webhook verification.
            </p>

            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="bg-navy-800 text-xs px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1 text-slate-200">
                <QrCode className="w-3.5 h-3.5 text-green-400" /> UPI / QR
              </span>
              <span className="bg-navy-800 text-xs px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1 text-slate-200">
                <CreditCard className="w-3.5 h-3.5 text-blue-400" /> Cards
              </span>
              <span className="bg-navy-800 text-xs px-3 py-1.5 rounded-lg border border-white/10 text-slate-200">
                Net Banking
              </span>
              <span className="bg-navy-800 text-xs px-3 py-1.5 rounded-lg border border-white/10 text-slate-200">
                Wallets
              </span>
            </div>

            <div className="p-3 rounded-xl bg-navy-800/80 border border-gold-500/20 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-gold-400 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-slate-200">24/7 CCTV & Biometric Security</p>
                <p className="text-slate-400 text-[11px]">Safe, verified student environment.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 {hostelName}. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gold-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/refund-policy" className="hover:text-gold-400 transition-colors">
              Refund & Cancellation Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
