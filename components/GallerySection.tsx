'use client';

import React, { useState } from 'react';
import { GALLERY_ITEMS } from '@/lib/data';
import { Maximize2, X } from 'lucide-react';

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const categories = ['ALL', 'Rooms', 'Dining', 'Study', 'Amenities'];

  const filteredItems = GALLERY_ITEMS.filter((item) =>
    activeTab === 'ALL' ? true : item.category === activeTab
  );

  return (
    <section className="py-20 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-400 bg-gold-500/10 px-3.5 py-1.5 rounded-full border border-gold-500/20">
            Visual Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-100 mt-4 mb-4">
            Take a Look <span className="text-gold-gradient">Inside Aura</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Explore our designer rooms, 24/7 study library, rooftop dining cafe, and recreation lounges.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === cat
                  ? 'bg-gold-500 text-navy-900 shadow-md'
                  : 'bg-navy-800 text-slate-300 hover:text-gold-400 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImage(item.image)}
              className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group border border-gold-500/20 shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-navy-900 bg-gold-400 px-2 py-0.5 rounded uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-base font-bold text-slate-100 mt-1">
                    {item.title}
                  </h4>
                </div>
                <div className="w-8 h-8 rounded-full bg-navy-900/80 text-gold-400 flex items-center justify-center border border-gold-500/30 group-hover:scale-110 transition-transform">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-navy-800 text-gold-400 hover:bg-navy-700 transition-colors border border-gold-500/30"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activeImage}
            alt="Full Preview"
            className="max-w-4xl max-h-[85vh] object-contain rounded-2xl border border-gold-500/30 shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
