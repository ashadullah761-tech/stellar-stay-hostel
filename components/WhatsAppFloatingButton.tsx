'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppFloatingButton() {
  const whatsappNum = process.env.NEXT_PUBLIC_HOSTEL_WHATSAPP || '919876543210';
  const hostelName = process.env.NEXT_PUBLIC_HOSTEL_NAME || 'Aura Luxury Hostel';

  const defaultMsg = encodeURIComponent(
    `Hello ${hostelName}, I am interested in booking a room. Please share availability & rates!`
  );

  return (
    <a
      href={`https://wa.me/${whatsappNum}?text=${defaultMsg}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 group transition-all duration-300 hover:scale-110 border border-white/20"
      title="Chat on WhatsApp"
      aria-label="Chat on WhatsApp"
    >
      <MessageSquare className="w-6 h-6 fill-white text-emerald-500" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pl-1">
        WhatsApp Desk
      </span>
    </a>
  );
}
