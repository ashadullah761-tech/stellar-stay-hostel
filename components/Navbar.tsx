'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeContext';
import {
  Sparkles,
  Menu,
  X,
  Sun,
  Moon,
  PhoneCall,
  Wrench,
  User,
  ShieldCheck,
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Rooms & Pricing', href: '/rooms' },
    { name: 'Report an Issue', href: '/complaints', highlight: true },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'My Bookings', href: '/my-bookings' },
  ];

  const hostelName = process.env.NEXT_PUBLIC_HOSTEL_NAME || 'Aura Luxury Hostel';
  const phone = process.env.NEXT_PUBLIC_HOSTEL_PHONE || '+91 98765 43210';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav shadow-2xl py-3'
          : 'bg-gradient-to-b from-navy-900/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-navy-900" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-gold-400 group-hover:text-gold-300 transition-colors">
                AURA
              </span>
              <span className="block text-[10px] tracking-widest text-slate-300 uppercase font-sans">
                Luxury Boutique Hostel
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    link.highlight
                      ? 'text-accentTeal-500 hover:text-accentTeal-600 font-semibold flex items-center gap-1.5 bg-accentTeal-500/10 px-3 py-1.5 rounded-full border border-accentTeal-500/30'
                      : isActive
                      ? 'text-gold-400 font-semibold'
                      : 'text-slate-200 hover:text-gold-400'
                  }`}
                >
                  {link.highlight && <Wrench className="w-3.5 h-3.5" />}
                  {link.name}
                  {isActive && !link.highlight && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-navy-800/80 text-gold-400 hover:bg-navy-700 transition-colors border border-gold-500/20"
              title="Toggle Theme"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-navy-900" />}
            </button>

            {/* Quick Call */}
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 text-xs text-slate-300 hover:text-gold-400 transition-colors bg-navy-800/60 px-3 py-2 rounded-xl border border-white/10"
            >
              <PhoneCall className="w-3.5 h-3.5 text-gold-400" />
              <span>{phone}</span>
            </a>

            {/* Admin Portal Link */}
            <Link
              href="/admin"
              className="p-2 rounded-xl bg-navy-800/80 text-slate-300 hover:text-gold-400 transition-colors border border-white/10"
              title="Admin / Warden Dashboard"
            >
              <ShieldCheck className="w-4 h-4" />
            </Link>

            {/* Book Now Button */}
            <Link
              href="/rooms"
              className="btn-gold px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
            >
              <span>Book Now</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-navy-800 text-gold-400 border border-gold-500/20"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-navy-900" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-navy-800 text-gold-400 border border-gold-500/20"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-card mt-3 mx-4 p-5 rounded-2xl border border-gold-500/30 max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200 shadow-2xl">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                  pathname === link.href
                    ? 'bg-gold-500/20 text-gold-400 font-bold'
                    : 'text-slate-200 hover:bg-navy-800'
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.highlight && <Wrench className="w-4 h-4 text-accentTeal-500" />}
                  {link.name}
                </span>
                {link.highlight && (
                  <span className="text-[10px] bg-accentTeal-500/20 text-accentTeal-500 px-2 py-0.5 rounded-full uppercase font-bold">
                    Quick Fix
                  </span>
                )}
              </Link>
            ))}

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-navy-800 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>Admin / Warden Portal</span>
            </Link>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
              <a
                href={`tel:${phone}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-navy-800 text-slate-200 text-sm font-medium border border-white/10"
              >
                <PhoneCall className="w-4 h-4 text-gold-400" />
                <span>Call Concierge: {phone}</span>
              </a>

              <Link
                href="/rooms"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-gold py-3 rounded-xl text-center text-sm font-bold block"
              >
                Check Availability & Book
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
