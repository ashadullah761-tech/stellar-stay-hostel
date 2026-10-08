'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const hostelName = process.env.NEXT_PUBLIC_HOSTEL_NAME || 'Aura Luxury Hostel';
  const address = process.env.NEXT_PUBLIC_HOSTEL_ADDRESS || 'No. 402, 100 Feet Road, Indiranagar, Bengaluru, KA 560038';
  const phoneNum = process.env.NEXT_PUBLIC_HOSTEL_PHONE || '+91 98765 43210';
  const emailAddr = process.env.NEXT_PUBLIC_HOSTEL_EMAIL || 'stay@auraluxuryhostel.com';
  const whatsappNum = process.env.NEXT_PUBLIC_HOSTEL_WHATSAPP || '919876543210';
  const mapsEmbed = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 bg-navy-900 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-400 bg-gold-500/10 px-3.5 py-1.5 rounded-full border border-gold-500/20">
            Get In Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-100 mt-4 mb-3">
            Contact <span className="text-gold-gradient">Front Desk Concierge</span>
          </h1>
          <p className="text-slate-400 text-sm">
            Have questions about room availability, parental visits, or site tours? Reach out to us anytime!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column: Direct Contact Info & Map */}
          <div className="space-y-8">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gold-500/30 space-y-6">
              <h3 className="font-serif text-2xl font-bold text-gold-400">Hostel Address & Reception</h3>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-100 block">Location Address</span>
                    <span>{address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gold-400 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-100 block">Click-to-Call Desk</span>
                    <a href={`tel:${phoneNum}`} className="text-gold-400 hover:underline">
                      {phoneNum}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gold-400 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-100 block">Official Email</span>
                    <a href={`mailto:${emailAddr}`} className="hover:text-gold-400">
                      {emailAddr}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gold-400 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-100 block">Reception & Visiting Hours</span>
                    <span>9:00 AM – 8:00 PM (Everyday)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <a
                  href={`https://wa.me/${whatsappNum}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Instant WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-3xl overflow-hidden border border-gold-500/30 h-72 shadow-2xl relative">
              <iframe
                src={mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="Hostel Google Map Location"
              />
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gold-500/30">
            <h3 className="font-serif text-2xl font-bold text-slate-100 mb-2">Send Us a Direct Message</h3>
            <p className="text-xs text-slate-400 mb-6">
              Our warden team will respond back via call or email within 2 hours.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-slate-100">Message Received!</h4>
                <p className="text-xs text-slate-300">
                  Thank you, {name}. Our Indiranagar front desk concierge will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-gold px-4 py-2 rounded-xl text-xs font-bold mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rohan Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-navy-900 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-gold-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-navy-900 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-gold-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="student@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-navy-900 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Inquiry Message *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Ask about room availability, food menu, site visit timing..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-navy-900 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-gold-400"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-navy-900" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
