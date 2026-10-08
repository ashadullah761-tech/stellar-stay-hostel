'use client';

import React from 'react';
import {
  ShieldCheck,
  Wifi,
  Utensils,
  Sparkles,
  Zap,
  Shirt,
  Wrench,
  BookOpen,
} from 'lucide-react';

export default function WhyUs() {
  const features = [
    {
      icon: ShieldCheck,
      title: '3-Tier Security & Biometric Access',
      desc: '24/7 CCTV surveillance, female/male resident warden supervision, and keycard biometric door entry.',
    },
    {
      icon: Wifi,
      title: 'Hyper-Fast 5G Wi-Fi Network',
      desc: 'Dedicated high-speed routers per floor with zero latency for online lectures, coding, and gaming.',
    },
    {
      icon: Utensils,
      title: '3 Gourmet Chef Meals & Rooftop Cafe',
      desc: 'Hygienic, home-style multi-cuisine meals planned by nutritionists, plus tea/coffee brewing counter.',
    },
    {
      icon: Sparkles,
      title: 'Daily Housekeeping & Sanitization',
      desc: 'Professional cleaning staff ensures your room, washroom, and common study lounge stay immaculate.',
    },
    {
      icon: Zap,
      title: '100% DG Power Backup & AC',
      desc: 'Never face a blackout during exam preparation or work hours. Fully air-conditioned living spaces.',
    },
    {
      icon: Shirt,
      title: 'Fully Automated Laundry Station',
      desc: 'Top-load washing machines, steam irons, and dry-cleaning services on-demand.',
    },
    {
      icon: Wrench,
      title: '1-Tap Mobile Maintenance Portal',
      desc: 'Report any room issue (AC, Fan, Wi-Fi) on your phone with live ticket tracking & guaranteed quick fix.',
    },
    {
      icon: BookOpen,
      title: '24/7 Silent Study & Coworking Lounge',
      desc: 'Acoustically insulated study pods with ergonomic chairs, charging docks, and ambient reading lights.',
    },
  ];

  return (
    <section className="py-20 bg-navy-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-400 bg-gold-500/10 px-3.5 py-1.5 rounded-full border border-gold-500/20">
            Unmatched Living Standards
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-100 mt-4 mb-4">
            Why Students & Parents Choose <span className="text-gold-gradient">Aura Hostel</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            We combine luxury hotel amenities with the warmth, security, and academic environment that students need to excel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-gold-500/20 hover:border-gold-500/50 hover:scale-[1.02] transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-600/20 flex items-center justify-center mb-5 border border-gold-500/30 group-hover:bg-gold-500 group-hover:text-navy-900 transition-colors">
                  <IconComponent className="w-6 h-6 text-gold-400 group-hover:text-navy-900 transition-colors" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-100 mb-2 group-hover:text-gold-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
