import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Calendar, Clock, User, Phone, Mail, AlertTriangle, 
  Trash2, ShieldAlert, Sparkles, CheckCircle2, ChevronRight, Bookmark
} from 'lucide-react';
import { Booking } from '../types';

interface AppointmentListProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
  onOpenBooking: () => void;
}

export default function AppointmentList({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  onOpenBooking
}: AppointmentListProps) {
  
  const [cancellingBookingId, setCancellingBookingId] = useState<string | null>(null);

  const activeBookings = bookings.filter(b => b.status === 'confirmed');
  const spentBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  const handleCancelConfirm = (id: string) => {
    onCancelBooking(id);
    setCancellingBookingId(null);
  };

  if (!isOpen) return null;

  return (
    <div id="appointments-tracking-modal" className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Dark backdrop */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs cursor-pointer" onClick={onClose} />

      {/* Elegant Drawer Panel on the right */}
      <div className="relative bg-white h-screen max-w-sm sm:max-w-md w-full shadow-2xl border-l border-slate-100 flex flex-col justify-between overflow-hidden z-20">
        
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-55/30">
          <div className="space-y-0.5 text-left">
            <h3 className="text-lg font-bold text-slate-900 font-sans tracking-tight flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-600" /> My Clinical Visits
            </h3>
            <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Personal Patient Schedule</p>
          </div>
          <button id="close-appointments-drawer" onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-900 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* DRAWERS LISTS BODY */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 text-left">
          {activeBookings.length > 0 ? (
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 font-bold block">
                Upcoming Consultations ({activeBookings.length})
              </span>
              
              <div className="space-y-4">
                {activeBookings.map((bk) => {
                  const isConfirmingCancel = cancellingBookingId === bk.id;
                  
                  return (
                    <div 
                      key={bk.id} 
                      className={`p-4 rounded-2xl border transition-all ${
                        isConfirmingCancel 
                          ? 'bg-rose-50 border-rose-200' 
                          : 'bg-white border-slate-150 shadow-3xs hover:border-slate-300'
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {isConfirmingCancel ? (
                          <motion.div 
                            key="cancel-state"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-3.5"
                          >
                            <div className="flex items-start gap-2.5 text-rose-800 text-xs leading-relaxed">
                              <AlertTriangle className="w-4.5 h-4.5 text-rose-600 shrink-0 mt-0.5 animate-pulse" />
                              <div>
                                <p className="font-bold">Cancel this appointment?</p>
                                <p className="text-rose-700 text-[11px] mt-0.5">This clinician slot will be immediately returned to our active community pool.</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button 
                                id={`cancel-confirm-btn-${bk.id}`}
                                onClick={() => handleCancelConfirm(bk.id)}
                                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                              >
                                Yes, Cancel
                              </button>
                              <button 
                                id={`cancel-abort-btn-${bk.id}`}
                                onClick={() => setCancellingBookingId(null)}
                                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                              >
                                Maintain
                              </button>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div 
                            key="normal-state"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-3"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-sm font-bold text-slate-900 leading-snug">{bk.service.name}</h4>
                                <p className="text-[11px] text-teal-600 font-medium mt-0.5">{bk.clinician.name}</p>
                              </div>
                              <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">Ref: {bk.reference}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-xs pt-2.5 border-t border-slate-100 font-sans text-slate-600 font-medium">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-slate-400" />
                                <span className="font-mono text-[11px]">
                                  {new Date(bk.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-slate-400" />
                                <span className="font-mono text-[11px]">{bk.time}</span>
                              </div>
                            </div>

                            {/* Actions line */}
                            <div className="flex items-center justify-between pt-3 border-t border-slate-100/60 mt-1">
                              <span className="text-xs font-bold text-teal-600 font-mono">£{bk.service.price}</span>
                              <button
                                id={`cancel-trigger-btn-${bk.id}`}
                                onClick={() => setCancellingBookingId(bk.id)}
                                className="flex items-center gap-1.5 text-[10px] font-bold text-rose-500 hover:text-rose-700 transition-colors uppercase tracking-widest bg-rose-500/5 px-2.5 py-1 rounded-md cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Cancel Visit</span>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div id="no-bookings-active" className="py-16 text-center space-y-4 max-w-xs mx-auto">
              <Calendar className="w-12 h-12 text-slate-355 mx-auto" />
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">No Scheduled Visits</h4>
                <p className="text-xs text-slate-505 leading-relaxed">
                  You have no outstanding or active healthcare appointments booked at our Frodsham clinic.
                </p>
              </div>
              <button 
                id="drawer-book-now-btn"
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Schedule First Visit
              </button>
            </div>
          )}

          {/* Past/Spent schedule list */}
          {spentBookings.length > 0 && (
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                Historical Activity ({spentBookings.length})
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {spentBookings.map((bk) => (
                  <div key={bk.id} className="p-3 bg-slate-50 border border-slate-200/50 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-slate-800 truncate max-w-[180px]">{bk.service.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{bk.date} &bull; {bk.time}</p>
                    </div>
                    <span className={`text-[9px] font-bold font-mono uppercase px-2 py-0.5 rounded-sm shrink-0 leading-none ${
                      bk.status === 'completed'
                        ? 'bg-teal-50 text-teal-700'
                        : 'bg-rose-50 text-rose-500'
                    }`}>
                      {bk.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Banner */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-401 flex items-center justify-center gap-1.5 max-w-xs mx-auto">
            <span>Need immediate medical help? Please dial 111 (NHS) or 999.</span>
          </p>
        </div>

      </div>
    </div>
  );
}
