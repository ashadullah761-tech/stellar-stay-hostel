'use client';

import React from 'react';
import { Users, ShieldCheck, Star, Award } from 'lucide-react';

export default function StatsCounter() {
  const stats = [
    { icon: Users, value: '2,500+', label: 'Students & Pros Hosted', sub: 'Across Bengaluru' },
    { icon: ShieldCheck, value: '100%', label: 'Verified Safety & CCTV', sub: '24/7 Warden Protection' },
    { icon: Star, value: '4.95 / 5', label: 'Resident Rating', sub: 'Based on 450+ Reviews' },
    { icon: Award, value: '15+', label: 'Boutique Amenities', sub: 'Included in Stay' },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 border-t border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="text-center p-6 rounded-2xl glass-card border border-gold-500/20">
                <div className="w-12 h-12 mx-auto rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-gold-400" />
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-gold-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-slate-100">{stat.label}</div>
                <div className="text-xs text-slate-400 mt-1">{stat.sub}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
