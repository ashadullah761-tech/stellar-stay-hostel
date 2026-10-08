'use client';

import React, { useState, useEffect } from 'react';
import { SAMPLE_ROOMS, INITIAL_COMPLAINTS } from '@/lib/data';
import { RoomType, ComplaintType, ComplaintStatusEnum } from '@/lib/types';
import { formatINR } from '@/lib/utils';
import {
  ShieldCheck,
  Building,
  Wrench,
  Users,
  TrendingUp,
  Download,
  Plus,
  Edit,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  RefreshCw,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [role, setRole] = useState<'ADMIN' | 'WARDEN' | 'TECHNICIAN'>('ADMIN');
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'COMPLAINTS' | 'ROOMS'>('OVERVIEW');

  const [rooms, setRooms] = useState<RoomType[]>(SAMPLE_ROOMS);
  const [complaints, setComplaints] = useState<ComplaintType[]>(INITIAL_COMPLAINTS);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // New Room Form State
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newRoomType, setNewRoomType] = useState('DOUBLE');
  const [newPriceNight, setNewPriceNight] = useState(1999);
  const [newPriceMonth, setNewPriceMonth] = useState(18000);
  const [newCapacity, setNewCapacity] = useState(2);

  useEffect(() => {
    fetch('/api/complaints')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.complaints?.length > 0) {
          setComplaints(data.complaints);
        }
      })
      .catch(() => {});

    fetch('/api/rooms')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.rooms?.length > 0) {
          setRooms(data.rooms);
        }
      })
      .catch(() => {});
  }, []);

  // Status transition handler for technician/warden
  const handleUpdateComplaintStatus = async (
    ticketId: string,
    newStatus: ComplaintStatusEnum,
    staffName?: string
  ) => {
    try {
      await fetch(`/api/complaints/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          assignedStaff: staffName || 'Vikram (Staff)',
          estimatedFixTime: newStatus === 'RESOLVED' ? 'Completed' : 'Within 2 hours',
        }),
      });

      setComplaints((prev) =>
        prev.map((c) =>
          c.ticketId === ticketId
            ? {
                ...c,
                status: newStatus,
                assignedStaff: staffName || c.assignedStaff || 'Vikram (Staff)',
                estimatedFixTime: newStatus === 'RESOLVED' ? 'Completed' : 'Within 2 hours',
              }
            : c
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    const createdRoom: RoomType = {
      id: `room-${Date.now()}`,
      title: newTitle || 'Executive Room',
      slug: (newTitle || 'executive-room').toLowerCase().replace(/ /g, '-'),
      roomType: newRoomType as any,
      pricePerNight: Number(newPriceNight),
      pricePerMonth: Number(newPriceMonth),
      sizeSqFt: 300,
      bedType: 'Orthopedic Bed',
      capacity: Number(newCapacity),
      floor: '2nd Floor',
      isAc: true,
      hasPrivateBathroom: true,
      amenities: ['5G Wi-Fi', 'Air Conditioning', 'Personal Desk', 'Daily Cleaning'],
      description: 'Luxury executive suite with premium fittings.',
      images: [
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      ],
      totalQuantity: 5,
      availableQuantity: 4,
      rating: 5.0,
      reviewCount: 1,
    };

    setRooms([createdRoom, ...rooms]);
    setShowAddRoomModal(false);
    setNewTitle('');
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = 'Ticket ID,Student Name,Room Number,Category,Priority,Status,Assigned Staff,Created At\n';
    const rows = complaints
      .map(
        (c) =>
          `"${c.ticketId}","${c.studentName}","${c.roomNumber}","${c.category}","${c.priority}","${c.status}","${c.assignedStaff || 'Unassigned'}","${c.createdAt}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Aura_Hostel_Complaints_Report_${Date.now()}.csv`;
    a.click();
  };

  const pendingComplaintsCount = complaints.filter((c) => c.status !== 'RESOLVED').length;
  const filteredComplaints = complaints.filter((c) =>
    filterStatus === 'ALL' ? true : c.status === filterStatus
  );

  return (
    <div className="pt-28 pb-20 bg-navy-900 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-widest text-gold-400 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
                Warden & Admin Command Center
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-100 mt-2">
              Aura Hostel <span className="text-gold-gradient">Management Dashboard</span>
            </h1>
          </div>

          {/* Role Switcher & Export */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-navy-800 p-1 rounded-xl border border-white/10 flex text-xs">
              {(['ADMIN', 'WARDEN', 'TECHNICIAN'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    role === r ? 'bg-gold-500 text-navy-900 shadow-md' : 'text-slate-300'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-navy-800 text-gold-400 border border-gold-500/30 text-xs font-bold flex items-center gap-1.5 hover:bg-navy-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'OVERVIEW'
                ? 'bg-gold-500/20 text-gold-400 border border-gold-500/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            KPI Overview & Stats
          </button>
          <button
            onClick={() => setActiveTab('COMPLAINTS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all relative ${
              activeTab === 'COMPLAINTS'
                ? 'bg-gold-500/20 text-gold-400 border border-gold-500/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Complaints Dispatch Board ({pendingComplaintsCount} Pending)
          </button>
          <button
            onClick={() => setActiveTab('ROOMS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'ROOMS'
                ? 'bg-gold-500/20 text-gold-400 border border-gold-500/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Room & Pricing CRUD ({rooms.length} Types)
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-8">
            {/* KPI Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6 rounded-3xl border border-gold-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400 font-bold uppercase">Occupancy Rate</span>
                  <Building className="w-5 h-5 text-gold-400" />
                </div>
                <div className="font-serif text-3xl font-bold text-gold-gradient">92%</div>
                <div className="text-[11px] text-emerald-400 mt-1 font-semibold">24 / 26 Units Occupied</div>
              </div>

              <div className="glass-card p-6 rounded-3xl border border-gold-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400 font-bold uppercase">Monthly Revenue</span>
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="font-serif text-3xl font-bold text-emerald-400">₹4,85,000</div>
                <div className="text-[11px] text-slate-400 mt-1">This Month Collected</div>
              </div>

              <div className="glass-card p-6 rounded-3xl border border-gold-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400 font-bold uppercase">Pending Complaints</span>
                  <Wrench className="w-5 h-5 text-amber-400" />
                </div>
                <div className="font-serif text-3xl font-bold text-amber-400">{pendingComplaintsCount}</div>
                <div className="text-[11px] text-slate-400 mt-1">Technicians Dispatched</div>
              </div>

              <div className="glass-card p-6 rounded-3xl border border-gold-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400 font-bold uppercase">Today Check-Ins</span>
                  <Users className="w-5 h-5 text-gold-400" />
                </div>
                <div className="font-serif text-3xl font-bold text-slate-100">4 Residents</div>
                <div className="text-[11px] text-gold-400 mt-1 font-semibold">Keycards Prepared</div>
              </div>
            </div>

            {/* Quick Activity Table */}
            <div className="glass-card p-6 rounded-3xl border border-gold-500/30">
              <h3 className="font-serif text-xl font-bold text-slate-100 mb-4">
                Recent Maintenance Logs & Warden Activity
              </h3>
              <div className="space-y-3 text-xs">
                {complaints.slice(0, 3).map((c) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-2xl bg-navy-900/80 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <span className="font-mono text-gold-400 font-bold">{c.ticketId}</span>
                      <p className="font-bold text-slate-100 text-sm">{c.title}</p>
                      <p className="text-slate-400 text-[11px]">
                        Room: {c.roomNumber} | Reported by: {c.studentName}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        {c.status}
                      </span>
                      <span className="text-slate-400 text-[11px]">Staff: {c.assignedStaff || 'Unassigned'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COMPLAINTS MANAGEMENT */}
        {activeTab === 'COMPLAINTS' && (
          <div className="glass-card p-6 rounded-3xl border border-gold-500/30 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="font-serif text-xl font-bold text-gold-400">
                Student Complaint Dispatch Board
              </h3>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Filter Status:</span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-navy-900 border border-white/20 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-gold-400"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="SUBMITTED">Submitted</option>
                  <option value="ACKNOWLEDGED">Acknowledged</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-gold-400 font-bold">
                    <th className="py-3 px-2">Ticket Ref</th>
                    <th className="py-3 px-2">Room & Resident</th>
                    <th className="py-3 px-2">Category</th>
                    <th className="py-3 px-2">Priority</th>
                    <th className="py-3 px-2">Status</th>
                    <th className="py-3 px-2">Assigned Staff</th>
                    <th className="py-3 px-2 text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredComplaints.map((c) => (
                    <tr key={c.id} className="hover:bg-navy-800/40">
                      <td className="py-3 px-2 font-mono text-gold-400 font-bold">{c.ticketId}</td>
                      <td className="py-3 px-2">
                        <div className="font-bold text-slate-100">{c.roomNumber}</div>
                        <div className="text-[11px] text-slate-400">{c.studentName}</div>
                      </td>
                      <td className="py-3 px-2">
                        <span className="text-accentTeal-500 font-semibold">{c.category}</span>
                      </td>
                      <td className="py-3 px-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            c.priority === 'URGENT'
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                              : 'bg-navy-800 text-slate-300'
                          }`}
                        >
                          {c.priority}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            c.status === 'RESOLVED'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-amber-500/20 text-amber-400'
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-slate-300">{c.assignedStaff || 'Unassigned'}</td>
                      <td className="py-3 px-2 text-right space-x-1">
                        {c.status !== 'IN_PROGRESS' && c.status !== 'RESOLVED' && (
                          <button
                            onClick={() =>
                              handleUpdateComplaintStatus(c.ticketId, 'IN_PROGRESS', 'Suresh (Tech)')
                            }
                            className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold hover:bg-amber-500/40"
                          >
                            Set In Progress
                          </button>
                        )}
                        {c.status !== 'RESOLVED' && (
                          <button
                            onClick={() =>
                              handleUpdateComplaintStatus(c.ticketId, 'RESOLVED', 'Vikram (Lead Tech)')
                            }
                            className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold hover:bg-emerald-500/40"
                          >
                            Mark Resolved
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ROOM CRUD */}
        {activeTab === 'ROOMS' && (
          <div className="glass-card p-6 rounded-3xl border border-gold-500/30 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-gold-400">
                Hostel Room Types & Rate Manager
              </h3>

              <button
                onClick={() => setShowAddRoomModal(!showAddRoomModal)}
                className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-navy-900" />
                <span>Add New Room Type</span>
              </button>
            </div>

            {/* Add Room Modal Form */}
            {showAddRoomModal && (
              <form onSubmit={handleAddRoom} className="p-5 rounded-2xl bg-navy-900 border border-gold-500/40 space-y-4 text-xs">
                <h4 className="font-serif text-base font-bold text-slate-100">Create Room Category</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-slate-300">Room Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Deluxe Single AC Pod"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-navy-800 border border-white/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-gold-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-slate-300">Category</label>
                    <select
                      value={newRoomType}
                      onChange={(e) => setNewRoomType(e.target.value)}
                      className="w-full bg-navy-800 border border-white/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-gold-400"
                    >
                      <option value="DORM_6">6-Bed Dorm</option>
                      <option value="DORM_4">4-Bed Dorm</option>
                      <option value="TRIPLE">Triple Sharing</option>
                      <option value="DOUBLE">Double Sharing</option>
                      <option value="SINGLE">Single Deluxe</option>
                      <option value="STUDIO">Penthouse Studio</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-1 text-slate-300">Nightly Rate (₹)</label>
                    <input
                      type="number"
                      value={newPriceNight}
                      onChange={(e) => setNewPriceNight(Number(e.target.value))}
                      className="w-full bg-navy-800 border border-white/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-slate-300">Monthly Rate (₹)</label>
                    <input
                      type="number"
                      value={newPriceMonth}
                      onChange={(e) => setNewPriceMonth(Number(e.target.value))}
                      className="w-full bg-navy-800 border border-white/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-slate-300">Capacity</label>
                    <input
                      type="number"
                      value={newCapacity}
                      onChange={(e) => setNewCapacity(Number(e.target.value))}
                      className="w-full bg-navy-800 border border-white/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <button type="submit" className="btn-gold px-5 py-2.5 rounded-xl font-bold">
                  Save Room Category
                </button>
              </form>
            )}

            {/* Room List Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rooms.map((room) => (
                <div key={room.id} className="p-4 rounded-2xl bg-navy-900/80 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-serif text-base font-bold text-slate-100">{room.title}</span>
                    <p className="text-xs text-gold-400 font-semibold mt-1">
                      {formatINR(room.pricePerNight)} / night | {formatINR(room.pricePerMonth)} / mo
                    </p>
                    <p className="text-[11px] text-slate-400">Available Units: {room.availableQuantity} of {room.totalQuantity}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-xl bg-navy-800 text-gold-400 border border-white/10 hover:bg-navy-700">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
