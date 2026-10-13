'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, ArrowRight } from 'lucide-react';

export default function MobileStickyBookBar() {
  const pathname = usePathname();

  // Hide on booking wizard and admin dashboard to give full screen to forms
  if (pathname === '/booking' || pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-900/95 backdrop-blur-md border-t border-gold-500/30 px-4 py-3 flex items-center justify-between shadow-2xl safe-area-pb">
      <div>
        <span className="text-[10px] uppercase text-slate-400 font-bold block">Boutique Stay</span>
        <span className="font-serif text-sm font-bold text-gold-400">
          From ₹8,500 <span className="text-[10px] font-normal text-slate-300">/mo</span>
        </span>
      </div>

      <Link
        href="/rooms"
        className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-transform"
      >
        <Calendar className="w-3.5 h-3.5 text-navy-900" />
        <span>Check Availability</span>
        <ArrowRight className="w-3.5 h-3.5 text-navy-900" />
      </Link>
    </div>
  );
}
