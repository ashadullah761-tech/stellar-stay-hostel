'use client';

import React from 'react';
import {
  ShieldCheck,
  Wifi,
  Wind,
  Sparkles,
  Fingerprint,
  BookOpen,
  Coffee,
  Shirt,
  Flame,
  Gamepad2,
  Zap,
  Droplets,
} from 'lucide-react';

export default function AmenitiesGrid() {
  const amenitiesList = [
    { icon: ShieldCheck, title: '24/7 CCTV & Warden', desc: 'Round-the-clock monitoring and dedicated hostel wardens.' },
    { icon: Wifi, title: '5G High-Speed Wi-Fi', desc: 'Fiber optic internet connection across every room and desk.' },
    { icon: Wind, title: 'Split Air Conditioning', desc: 'Climate controlled individual AC units for comfortable rest.' },
    { icon: Sparkles, title: 'Daily Room Cleaning', desc: 'Professional housekeeping for bedrooms, bathrooms & lounges.' },
    { icon: Fingerprint, title: 'Biometric Smart Access', desc: 'Secure keycard and fingerprint door lock security systems.' },
    { icon: BookOpen, title: 'Silent Study Pods', desc: 'Acoustically treated study rooms with charging docks.' },
    { icon: Coffee, title: 'Rooftop Lounge & Cafe', desc: 'Community cafe serving fresh meals, snacks & espresso.' },
    { icon: Shirt, title: 'Self-Serve Laundry', desc: 'Washing machines, dryers, and dry-cleaning services.' },
    { icon: Flame, title: '24/7 Geyser Hot Water', desc: 'Instant solar and electric water heating systems.' },
    { icon: Gamepad2, title: 'Gaming & Recreation Zone', desc: 'PlayStation 5, Foosball, Table Tennis, and board games.' },
    { icon: Zap, title: 'Full Generator Power Backup', desc: 'Continuous power backup so your work never halts.' },
    { icon: Droplets, title: 'RO UV Drinking Water', desc: 'Multi-stage purified drinking water dispensers on each floor.' },
  ];

  return (
    <section className="py-20 bg-navy-900 border-t border-b border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-400 bg-gold-500/10 px-3.5 py-1.5 rounded-full border border-gold-500/20">
            World-Class Facilities
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-100 mt-4 mb-4">
            Everything You Need For a <span className="text-gold-gradient">Premium Stay</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Carefully curated features so you can study, relax, socialize, and thrive without worrying about daily chores.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {amenitiesList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-navy-800/60 border border-gold-500/15 hover:border-gold-500/40 hover:bg-navy-800 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center mb-3 group-hover:bg-gold-500 transition-colors">
                  <Icon className="w-5 h-5 text-gold-400 group-hover:text-navy-900 transition-colors" />
                </div>
                <h4 className="font-serif text-base font-bold text-slate-100 mb-1 group-hover:text-gold-400 transition-colors">
                  {item.title}
                </h4>
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
