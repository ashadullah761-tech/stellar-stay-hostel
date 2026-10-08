'use client';

import React from 'react';
import { TESTIMONIALS } from '@/lib/data';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-20 bg-navy-800/60 relative border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-400 bg-gold-500/10 px-3.5 py-1.5 rounded-full border border-gold-500/20">
            Resident Stories
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-100 mt-4 mb-4">
            Loved By <span className="text-gold-gradient">Students & Parents</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Read real feedback from students and working professionals living at Aura Luxury Hostel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-3xl border border-gold-500/20 flex flex-col justify-between relative group hover:border-gold-500/50 transition-all"
            >
              <Quote className="w-10 h-10 text-gold-500/10 absolute top-4 right-4" />
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                  "{item.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-gold-400"
                />
                <div>
                  <h4 className="font-serif text-sm font-bold text-slate-100">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-gold-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
