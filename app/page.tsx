import Hero from '@/components/Hero';
import WhyUs from '@/components/WhyUs';
import FeaturedRooms from '@/components/FeaturedRooms';
import AmenitiesGrid from '@/components/AmenitiesGrid';
import StatsCounter from '@/components/StatsCounter';
import GallerySection from '@/components/GallerySection';
import Testimonials from '@/components/Testimonials';
import FaqAccordion from '@/components/FaqAccordion';
import Link from 'next/link';
import { ArrowRight, Sparkles, PhoneCall, ShieldCheck } from 'lucide-react';

export default function Home() {
  const hostelName = process.env.NEXT_PUBLIC_HOSTEL_NAME || 'Aura Luxury Co-Living & Boutique Hostel';

  return (
    <div>
      {/* 1. Hero with Video & Availability Search Widget */}
      <Hero />

      {/* 2. Stats & Counter */}
      <StatsCounter />

      {/* 3. Why Choose Us */}
      <WhyUs />

      {/* 4. Featured Rooms & Suites */}
      <FeaturedRooms />

      {/* 5. Amenities Grid */}
      <AmenitiesGrid />

      {/* 6. Photo & Video Gallery */}
      <GallerySection />

      {/* 7. Student & Parent Testimonials */}
      <Testimonials />

      {/* 8. FAQs */}
      <FaqAccordion />

      {/* 9. Final CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 border-t border-gold-500/20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent opacity-60" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Limited Rooms Available for Academic Season 2026</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-100 mb-6">
            Reserve Your <span className="text-gold-gradient">Boutique Stay Today</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 font-light leading-relaxed">
            Zero brokerage, transparent pricing, 100% verified security, and luxury hotel-grade living in Indiranagar, Bengaluru.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/rooms"
              className="btn-gold px-8 py-4 rounded-xl text-base font-bold flex items-center gap-2 shadow-2xl"
            >
              <span>Explore Rooms & Book</span>
              <ArrowRight className="w-5 h-5 text-navy-900" />
            </Link>

            <a
              href={`tel:${process.env.NEXT_PUBLIC_HOSTEL_PHONE || '+919876543210'}`}
              className="px-6 py-4 rounded-xl text-sm font-bold text-slate-200 bg-navy-800 border border-white/10 hover:border-gold-500/40 transition-colors flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-gold-400" />
              <span>Call Front Desk Concierge</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
