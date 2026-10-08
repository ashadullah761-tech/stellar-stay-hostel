'use client';

import React, { useState } from 'react';
import ComplaintFormModal from '@/components/ComplaintFormModal';
import ComplaintTrackerModal from '@/components/ComplaintTrackerModal';
import { ComplaintType } from '@/lib/types';
import { Wrench, Search, PlusCircle, ShieldCheck } from 'lucide-react';

export default function ComplaintsPage() {
  const [activeTab, setActiveTab] = useState<'NEW' | 'TRACK'>('NEW');
  const [latestTicket, setLatestTicket] = useState<ComplaintType | null>(null);

  const handleTicketSuccess = (ticket: ComplaintType) => {
    setLatestTicket(ticket);
    setActiveTab('TRACK');
  };

  return (
    <div className="pt-28 pb-20 bg-navy-900 min-h-screen text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-accentTeal-500 bg-accentTeal-500/10 px-3.5 py-1.5 rounded-full border border-accentTeal-500/30">
            Student Help Desk & Maintenance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-100 mt-3 mb-3">
            Room <span className="text-gold-gradient">Maintenance Portal</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Report any room issue with 1-tap quick tiles. Get immediate warden dispatch and live technician timeline tracking.
          </p>

          {/* Mode Switcher */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveTab('NEW')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'NEW'
                  ? 'bg-gold-500 text-navy-900 shadow-lg'
                  : 'bg-navy-800 text-slate-300 border border-white/10 hover:text-gold-400'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report New Issue</span>
            </button>

            <button
              onClick={() => setActiveTab('TRACK')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'TRACK'
                  ? 'bg-gold-500 text-navy-900 shadow-lg'
                  : 'bg-navy-800 text-slate-300 border border-white/10 hover:text-gold-400'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Track Ticket Status</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'NEW' ? (
          <ComplaintFormModal onSuccess={handleTicketSuccess} />
        ) : (
          <ComplaintTrackerModal initialTicket={latestTicket || undefined} />
        )}
      </div>
    </div>
  );
}
