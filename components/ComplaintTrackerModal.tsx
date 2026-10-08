'use client';

import React, { useState } from 'react';
import { ComplaintType, ComplaintStatusEnum } from '@/lib/types';
import {
  CheckCircle2,
  Clock,
  Wrench,
  User,
  Star,
  Send,
  Search,
  AlertCircle,
} from 'lucide-react';

interface Props {
  initialTicket?: ComplaintType;
}

export default function ComplaintTrackerModal({ initialTicket }: Props) {
  const [searchTicketId, setSearchTicketId] = useState('');
  const [ticket, setTicket] = useState<ComplaintType | null>(initialTicket || null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // Rating state
  const [rating, setRating] = useState<number>(5);
  const [feedback, setFeedback] = useState('');
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTicketId.trim()) return;
    setLoading(true);
    setNotFound(false);

    try {
      const res = await fetch(`/api/complaints/${searchTicketId.trim().toUpperCase()}`);
      const data = await res.json();
      if (data.success && data.complaint) {
        setTicket(data.complaint);
      } else {
        setNotFound(true);
      }
    } catch (err) {
      console.error(err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRatingSubmit = async () => {
    if (!ticket) return;
    try {
      await fetch(`/api/complaints/${ticket.ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, feedback }),
      });
      setRatingSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  const statusSteps: { status: ComplaintStatusEnum; label: string; desc: string }[] = [
    { status: 'SUBMITTED', label: '1. Ticket Logged', desc: 'Dispatched to Hostel Warden' },
    { status: 'ACKNOWLEDGED', label: '2. Acknowledged', desc: 'Assigned to On-Duty Tech' },
    { status: 'IN_PROGRESS', label: '3. In Progress', desc: 'Technician on site fixing issue' },
    { status: 'RESOLVED', label: '4. Resolved', desc: 'Work completed & verified' },
  ];

  const getStepIndex = (st?: ComplaintStatusEnum) => {
    if (st === 'SUBMITTED') return 0;
    if (st === 'ACKNOWLEDGED') return 1;
    if (st === 'IN_PROGRESS') return 2;
    if (st === 'RESOLVED') return 3;
    return 0;
  };

  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gold-500/30">
      <div className="mb-6">
        <span className="text-[11px] font-bold uppercase text-gold-400 tracking-wider bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
          Live Ticket Tracker
        </span>
        <h3 className="font-serif text-2xl font-bold text-slate-100 mt-2">
          Track Your Maintenance Status
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Enter your unique ticket ID (e.g. HST-2026-0001) to view technician assignment and timeline.
        </p>
      </div>

      {/* Ticket Search Form */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Enter Ticket ID (e.g. HST-2026-0001)"
            value={searchTicketId}
            onChange={(e) => setSearchTicketId(e.target.value)}
            className="w-full bg-navy-900 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 uppercase tracking-wider font-mono focus:outline-none focus:border-gold-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
        </div>
        <button
          type="submit"
          className="btn-gold px-5 py-2.5 rounded-xl text-xs font-bold"
        >
          {loading ? 'Searching...' : 'Track Ticket'}
        </button>
      </form>

      {notFound && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2 mb-6">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>No ticket found with ID "{searchTicketId}". Please double-check your code.</span>
        </div>
      )}

      {/* Ticket Details Timeline View */}
      {ticket && (
        <div className="space-y-6 pt-4 border-t border-white/10">
          {/* Header Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-navy-900/80 border border-gold-500/30 gap-4">
            <div>
              <span className="font-mono text-xs font-bold text-gold-400 block mb-1">
                TICKET REF: {ticket.ticketId}
              </span>
              <h4 className="font-serif text-lg font-bold text-slate-100">
                {ticket.title}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Room: <strong className="text-slate-200">{ticket.roomNumber}</strong> | Category: <span className="text-accentTeal-500 font-bold">{ticket.category}</span>
              </p>
            </div>

            <div className="text-right">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                ticket.status === 'RESOLVED'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse'
              }`}>
                {ticket.status}
              </span>
              <p className="text-[11px] text-slate-400 mt-1">Priority: {ticket.priority}</p>
            </div>
          </div>

          {/* Technician & ETA Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-navy-900/60 border border-white/5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Assigned Staff / Tech</span>
                <span className="font-bold text-slate-100">{ticket.assignedStaff || 'Dispatching Tech...'}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-navy-900/60 border border-white/5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-accentTeal-500/10 flex items-center justify-center text-accentTeal-500">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Estimated Fix Time</span>
                <span className="font-bold text-slate-100">{ticket.estimatedFixTime || 'Today'}</span>
              </div>
            </div>
          </div>

          {/* Visual Timeline Steps */}
          <div>
            <h5 className="font-serif text-sm font-bold text-gold-400 mb-4">
              Resolution Progress Timeline
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 relative">
              {statusSteps.map((step, idx) => {
                const currentIndex = getStepIndex(ticket.status);
                const isPassed = idx <= currentIndex;
                const isCurrent = idx === currentIndex;

                return (
                  <div
                    key={step.status}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isCurrent
                        ? 'bg-gold-500/20 border-gold-400 text-gold-300 font-bold shadow-md'
                        : isPassed
                        ? 'bg-navy-900/90 border-emerald-500/40 text-emerald-400'
                        : 'bg-navy-900/40 border-white/5 text-slate-500'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full mx-auto mb-2 flex items-center justify-center text-xs font-bold bg-navy-900 border border-current">
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    <p className="text-xs font-bold mb-0.5">{step.label}</p>
                    <p className="text-[10px] opacity-80">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Student Rating Box (After Resolution) */}
          {ticket.status === 'RESOLVED' && (
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
              <h5 className="font-serif text-base font-bold text-emerald-400 mb-2">
                Issue Resolved! Please Rate Our Technician
              </h5>

              {ratingSubmitted ? (
                <p className="text-xs text-slate-300 font-semibold">
                  Thank you for your feedback! ⭐ {rating} Stars recorded.
                </p>
              ) : (
                <div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 text-gold-400 hover:scale-125 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating ? 'fill-gold-400' : 'text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    placeholder="Optional feedback comment..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full max-w-md bg-navy-900 border border-white/20 rounded-xl px-3 py-2 text-xs text-slate-100 mb-3 focus:outline-none focus:border-gold-400"
                  />

                  <button
                    onClick={handleRatingSubmit}
                    className="btn-gold px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5 text-navy-900" />
                    <span>Submit Rating</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
