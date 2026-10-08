'use client';

import React, { useState } from 'react';
import {
  Fan,
  SunMedium,
  Wifi,
  Wind,
  Droplet,
  Wrench,
  Zap,
  Sparkles,
  Armchair,
  HelpCircle,
  AlertTriangle,
  Clock,
  Send,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { ComplaintType } from '@/lib/types';
import { generateTicketId } from '@/lib/utils';

interface Props {
  onSuccess?: (ticket: ComplaintType) => void;
}

export default function ComplaintFormModal({ onSuccess }: Props) {
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [category, setCategory] = useState<string>('WIFI');
  const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'URGENT'>('MEDIUM');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [preferredTime, setPreferredTime] = useState('Evening (5 PM - 8 PM)');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [createdTicket, setCreatedTicket] = useState<ComplaintType | null>(null);

  const quickTiles = [
    { icon: Wifi, label: 'Wi-Fi Issue', cat: 'WIFI', defaultTitle: 'Wi-Fi Speed Drop / Connection Issue' },
    { icon: Fan, label: 'Fan Issue', cat: 'FAN', defaultTitle: 'Ceiling Fan Not Working / Regulator Fault' },
    { icon: Wind, label: 'AC Cooling Low', cat: 'AC', defaultTitle: 'AC Unit Filter Cleaning / Low Cooling' },
    { icon: SunMedium, label: 'Light Not Working', cat: 'LIGHT', defaultTitle: 'Room Light / Tube Light Fuse' },
    { icon: Droplet, label: 'Plumbing / Tap Leak', cat: 'PLUMBING', defaultTitle: 'Washroom Tap Leakage / Low Flow' },
    { icon: Zap, label: 'Power Socket', cat: 'ELECTRICITY', defaultTitle: 'Power Socket Not Charging' },
    { icon: Sparkles, label: 'Room Cleaning', cat: 'CLEANLINESS', defaultTitle: 'Special Room Cleaning Request' },
    { icon: Armchair, label: 'Furniture Maintenance', cat: 'FURNITURE', defaultTitle: 'Chair / Study Desk Lock Repair' },
  ];

  const handleTileSelect = (tile: typeof quickTiles[0]) => {
    setCategory(tile.cat);
    setTitle(tile.defaultTitle);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const ticketId = generateTicketId();
    const newComplaint: Partial<ComplaintType> = {
      ticketId,
      studentName: isAnonymous ? 'Anonymous Student' : studentName || 'Resident',
      studentPhone: isAnonymous ? 'Hidden' : studentPhone,
      roomNumber,
      category: category as any,
      priority,
      title: title || `${category} Issue in ${roomNumber}`,
      description,
      preferredTime,
      status: 'SUBMITTED',
      isAnonymous,
    };

    try {
      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComplaint),
      });

      const data = await res.json();
      if (data.success) {
        setCreatedTicket(data.complaint);
        if (onSuccess) onSuccess(data.complaint);
      } else {
        // Fallback local creation
        const fallbackTicket: ComplaintType = {
          id: `ticket-${Date.now()}`,
          ticketId,
          studentName: isAnonymous ? 'Anonymous Student' : studentName || 'Resident',
          studentPhone: isAnonymous ? 'Hidden' : studentPhone,
          roomNumber,
          category: category as any,
          priority,
          title: title || `${category} Issue in ${roomNumber}`,
          description,
          preferredTime,
          status: 'SUBMITTED',
          assignedStaff: 'Unassigned (Dispatched to Warden)',
          estimatedFixTime: 'Within 4 Hours',
          isAnonymous,
          createdAt: new Date().toISOString(),
        };
        setCreatedTicket(fallbackTicket);
        if (onSuccess) onSuccess(fallbackTicket);
      }
    } catch (err) {
      console.error('Complaint submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (createdTicket) {
    return (
      <div className="glass-card p-8 rounded-3xl border border-emerald-500/40 text-center animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/40">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-slate-100 mb-2">
          Maintenance Ticket Dispatched!
        </h3>
        <p className="text-sm text-slate-300 mb-4">
          Your unique ticket ID is: <span className="font-mono font-bold text-gold-400 text-lg px-2 py-0.5 bg-navy-900 rounded border border-gold-500/30">{createdTicket.ticketId}</span>
        </p>
        <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
          Hostel Warden and On-Duty Technician have been notified. You will receive real-time updates as status changes.
        </p>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setCreatedTicket(null)}
            className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold"
          >
            Report Another Issue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gold-500/30">
      <div className="mb-6">
        <span className="text-[11px] font-bold uppercase text-accentTeal-500 tracking-wider bg-accentTeal-500/10 px-3 py-1 rounded-full border border-accentTeal-500/30">
          Instant 1-Tap Student Support
        </span>
        <h3 className="font-serif text-2xl font-bold text-slate-100 mt-2">
          Report a Room Maintenance Issue
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Tap a quick issue icon below or fill in custom details for fast warden dispatch.
        </p>
      </div>

      {/* Quick Select Icon Tiles */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-gold-400 uppercase tracking-wider mb-2">
          Quick One-Tap Problem Select
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {quickTiles.map((tile, idx) => {
            const Icon = tile.icon;
            const isSelected = category === tile.cat;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleTileSelect(tile)}
                className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                  isSelected
                    ? 'bg-gold-500 text-navy-900 border-gold-400 font-bold shadow-lg scale-105'
                    : 'bg-navy-900/80 text-slate-300 border-white/10 hover:border-gold-500/40'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-navy-900' : 'text-gold-400'}`} />
                <span className="text-xs">{tile.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Room & Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Room Number *
            </label>
            <input
              type="text"
              placeholder="e.g. Room 204"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className="w-full bg-navy-900 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-gold-400"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Student Name {!isAnonymous && '*'}
            </label>
            <input
              type="text"
              placeholder={isAnonymous ? 'Hidden (Anonymous)' : 'Your Full Name'}
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              disabled={isAnonymous}
              className="w-full bg-navy-900 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-gold-400 disabled:opacity-50"
              required={!isAnonymous}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Phone Number {!isAnonymous && '*'}
            </label>
            <input
              type="tel"
              placeholder={isAnonymous ? 'Hidden' : '+91 98765 43210'}
              value={studentPhone}
              onChange={(e) => setStudentPhone(e.target.value)}
              disabled={isAnonymous}
              className="w-full bg-navy-900 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-gold-400 disabled:opacity-50"
              required={!isAnonymous}
            />
          </div>
        </div>

        {/* Priority & Preferred Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Issue Urgency / Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="w-full bg-navy-900 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-gold-400"
            >
              <option value="LOW">Low (Minor cosmetic / non-urgent)</option>
              <option value="MEDIUM">Medium (Standard resolution within 6h)</option>
              <option value="URGENT">Urgent (Immediate attention - AC/Water/Power)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gold-400" /> Preferred Fix Time
            </label>
            <input
              type="text"
              placeholder="e.g. Evening 6 PM - 8 PM"
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="w-full bg-navy-900 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-gold-400"
            />
          </div>
        </div>

        {/* Issue Title */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Short Summary / Title *
          </label>
          <input
            type="text"
            placeholder="Describe the issue briefly"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-navy-900 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-gold-400"
            required
          />
        </div>

        {/* Detailed Description */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Detailed Explanation
          </label>
          <textarea
            rows={3}
            placeholder="Provide any extra details that will help the technician fix it faster..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-navy-900 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-gold-400"
          />
        </div>

        {/* Anonymous Mode Checkbox */}
        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="anonymousCheck"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="w-4 h-4 rounded text-gold-500 bg-navy-900 border-white/20 focus:ring-gold-400"
          />
          <label htmlFor="anonymousCheck" className="text-xs text-slate-300 flex items-center gap-1 cursor-pointer">
            <Lock className="w-3.5 h-3.5 text-gold-400" /> Submit anonymously (for sensitive feedback)
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn-gold w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4 text-navy-900" />
          <span>{submitting ? 'Dispatching Ticket...' : 'Submit Complaint Ticket'}</span>
        </button>
      </form>
    </div>
  );
}
