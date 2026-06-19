import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ChevronLeft, ChevronRight, Calendar, User, Clock, Info, Lock, 
  CheckCircle, ShieldAlert, Sparkles, AlertTriangle, Check, BookOpen
} from 'lucide-react';
import { SERVICES, CLINICIANS } from '../data';
import { Service, Clinician, Booking } from '../types';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  initialSelectedService: Service | null;
  onBookingSuccess: (newBooking: Booking) => void;
}

export default function BookingWizard({
  isOpen,
  onClose,
  initialSelectedService,
  onBookingSuccess
}: BookingWizardProps) {
  
  // Steps:
  // 1 = Select Service
  // 2 = Select Clinician
  // 3 = Select Date & Time
  // 4 = Patient Details
  // 5 = Confirmation Success
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(initialSelectedService || null);
  const [selectedClinician, setSelectedClinician] = useState<Clinician | null>(null);
  
  // Date and Time State
  const [selectedDate, setSelectedDate] = useState<string>(''); // YYYY-MM-DD
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

  // Patient Info State
  const [patientInfo, setPatientInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    notes: ''
  });

  // Generated Booking Data state on success
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);

  // If initial selected service changes, make sure to update local state
  React.useEffect(() => {
    if (initialSelectedService) {
      setSelectedService(initialSelectedService);
      // Skip step 1 if service is already pre-selected
      setStep(2);
    } else {
      setSelectedService(null);
      setStep(1);
    }
  }, [initialSelectedService, isOpen]);

  // Generate date options for the next 14 days
  const dateOptions = useMemo(() => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + i);
      
      const dayOfWeek = futureDate.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
      
      // Skip Sundays (clinic is closed!)
      if (dayOfWeek === 0) continue;

      // Format date YYYY-MM-DD
      const year = futureDate.getFullYear();
      const month = String(futureDate.getMonth() + 1).padStart(2, '0');
      const dateVal = String(futureDate.getDate()).padStart(2, '0');
      const formattedValue = `${year}-${month}-${dateVal}`;

      // Nice readable label
      const weekdayLabel = futureDate.toLocaleDateString('en-GB', { weekday: 'short' });
      const dayLabel = futureDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

      dates.push({
        value: formattedValue,
        dayOfWeek,
        weekdayLabel,
        dayLabel,
        rawDate: futureDate
      });
    }
    return dates;
  }, []);

  // Filter dates availability based on chosen clinician
  const filteredDateOptions = useMemo(() => {
    if (!selectedClinician) return dateOptions;
    return dateOptions.filter(date => selectedClinician.availableDays.includes(date.dayOfWeek));
  }, [selectedClinician, dateOptions]);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleClinicianSelect = (clinician: Clinician) => {
    setSelectedClinician(clinician);
    // Reset date/time selection when swapping doctor
    setSelectedDate('');
    setSelectedTimeSlot('');
    setStep(3);
  };

  const handleDateSelect = (dateString: string) => {
    setSelectedDate(dateString);
    setSelectedTimeSlot('');
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedClinician || !selectedDate || !selectedTimeSlot) return;

    const randomRef = 'HP-' + Math.random().toString(36).substring(2, 7).toUpperCase();

    const booking: Booking = {
      id: Math.random().toString(36).substring(2, 11),
      reference: randomRef,
      service: selectedService,
      clinician: selectedClinician,
      date: selectedDate,
      time: selectedTimeSlot,
      patient: { ...patientInfo },
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    setSuccessBooking(booking);
    onBookingSuccess(booking);
    setStep(5);
  };

  const handleBack = () => {
    // Navigate backwards
    if (step === 2 && initialSelectedService) {
      // If service was preselected, closing wizard or going back to home/services
      onClose();
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div id="booking-wizard-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark blur backdrop */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs cursor-pointer" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-2xl w-full max-h-[90vh] flex flex-col justify-between overflow-hidden z-20">
        
        {/* Modern wizard header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-pulse" />
            <span className="text-sm font-bold text-slate-800 font-sans tracking-tight">
              {step === 5 ? 'Appointment Confirmed' : `Online Booking System (Step ${step} of 4)`}
            </span>
          </div>
          <button id="close-booking-wizard" onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-900 cursor-pointer transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Wizard Progress Indicator bar */}
        {step < 5 && (
          <div className="w-full h-1 bg-slate-100 flex">
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s} 
                className={`h-full flex-grow transition-all duration-300 ${
                  s <= step ? 'bg-teal-600' : 'bg-slate-100'
                }`} 
              />
            ))}
          </div>
        )}

        {/* SCROLLABLE STEPS AREA */}
        <div className="flex-grow overflow-y-auto p-6 sm:p-8">
          
          {/* STEP 1: SELECT SERVICE CATEGORY */}
          {step === 1 && (
            <div id="booking-step-service" className="space-y-6 text-left">
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-slate-900 leading-tight"> Healthcare Assessment Directory</h3>
                <p className="text-xs text-slate-500">Pick the primary medical service or diagnostic test you require below.</p>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {SERVICES.map((s) => (
                  <div
                    id={`booking-svc-card-${s.id}`}
                    key={s.id}
                    onClick={() => handleServiceSelect(s)}
                    className="p-4 bg-slate-50 hover:bg-teal-50/50 border border-slate-200/60 hover:border-teal-400 rounded-2xl flex items-center justify-between cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-teal-600 border border-slate-150 shrink-0">
                        <span className="font-bold text-xs">£</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{s.name}</h4>
                        <p className="text-xs text-slate-450 line-clamp-1 mt-0.5">{s.description}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-bold text-slate-900">£{s.price}</span>
                      <p className="text-[10px] text-slate-400 font-mono">{s.duration} min</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: SELECT CLINICIAN */}
          {step === 2 && (
            <div id="booking-step-clinician" className="space-y-6 text-left">
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-slate-900 leading-tight">Choose Your Clinical Officer</h3>
                <p className="text-xs text-slate-500">Select any of our seasoned practitioners, or select "First Available Guide" to expedite treatment.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CLINICIANS.map((clin) => {
                  const isSvcMatch = selectedService && selectedService.category === clin.specialty;
                  return (
                    <div
                      id={`booking-clin-card-${clin.id}`}
                      key={clin.id}
                      onClick={() => handleClinicianSelect(clin)}
                      className={`p-4 bg-slate-50 border rounded-2xl flex flex-col justify-between cursor-pointer transition-all text-left gap-4 hover:border-teal-500 hover:bg-teal-50/20 ${
                        selectedClinician?.id === clin.id ? 'border-teal-600 ring-1 ring-teal-600/10' : 'border-slate-200/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={clin.imageUrl} 
                          alt={clin.name} 
                          className="w-12 h-12 rounded-xl object-cover shrink-0 bg-slate-100"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 leading-tight">{clin.name}</h4>
                          <p className="text-[11px] text-teal-600 font-semibold">{clin.role}</p>
                          <p className="text-[10px] text-slate-400 line-clamp-1">{clin.specialty}</p>
                        </div>
                      </div>
                      
                      <div className="pt-2.5 border-t border-slate-200/30 text-[10px] text-slate-450 uppercase tracking-wider font-mono flex justify-between items-center">
                        <span>Availability</span>
                        <span className="font-semibold text-slate-800">Mon - Fri Matches</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: SELECT DATE & TIME SLOT */}
          {step === 3 && (
            <div id="booking-step-datetime" className="space-y-6 text-left">
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-slate-900 leading-tight">Select Diagnostic Window</h3>
                <p className="text-xs text-slate-500">Browse available slots. Sundays and inactive clinic days are disabled by primary doctor matrices.</p>
              </div>

              <div className="space-y-4">
                {/* 14 Days Calendar Roll slider */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Available Practice Days (Next 2 Weeks)</label>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                    {filteredDateOptions.length > 0 ? (
                      filteredDateOptions.map((date) => {
                        const isChosen = selectedDate === date.value;
                        return (
                          <button
                            id={`date-select-${date.value}`}
                            key={date.value}
                            type="button"
                            onClick={() => handleDateSelect(date.value)}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border min-w-[76px] transition-all cursor-pointer ${
                              isChosen
                                ? 'bg-teal-600 border-teal-600 text-white shadow-xs'
                                : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                            }`}
                          >
                            <span className="text-[10px] font-mono tracking-wider uppercase opacity-80">{date.weekdayLabel}</span>
                            <span className="text-sm font-bold font-mono mt-0.5">{date.dayLabel.split(' ')[0]}</span>
                            <span className="text-[9px] mt-0.5 opacity-90">{date.dayLabel.split(' ')[1]}</span>
                          </button>
                        );
                      })
                    ) : (
                      <p className="text-xs text-rose-500 py-2">Clinician has no active hours scheduled inside next Fortnight.</p>
                    )}
                  </div>
                </div>

                {/* Simulated dynamic time slot selector */}
                {selectedDate ? (
                  <div className="space-y-2.5 pt-2">
                    <label className="text-xs font-semibold text-slate-700">Available Time Windows on {new Date(selectedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {selectedClinician?.timeSlots.map((slot) => {
                        const isHourChosen = selectedTimeSlot === slot;
                        return (
                          <button
                            id={`time-select-${slot.replace(/\s+/g, '-')}`}
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`py-2 px-3 text-xs font-mono font-medium rounded-lg border text-center transition-all cursor-pointer ${
                              isHourChosen
                                ? 'bg-teal-600 border-teal-600 text-white shadow-xs'
                                : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="p-8 bg-slate-50 rounded-2xl text-center text-xs text-slate-450 border border-dashed border-slate-200">
                    Please select your preferred clinic day from the scroll widget above to view hourly time slots.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: PATIENT DETAILS */}
          {step === 4 && (
            <div id="booking-step-particulars" className="space-y-6 text-left">
              <div className="space-y-1.5 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">Patient Demographics</h3>
                  <p className="text-xs text-slate-500">Provide medical details to secure dynamic health records securely.</p>
                </div>
                {selectedService && (
                  <div className="text-right px-3 py-1.5 bg-slate-100 rounded-lg shrink-0">
                    <span className="text-xs font-bold text-slate-900 font-mono">£{selectedService.price}</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Given Names <span className="text-rose-500">*</span></label>
                    <input 
                      id="patient-first-name"
                      type="text" 
                      required
                      value={patientInfo.firstName}
                      onChange={(e) => setPatientInfo({ ...patientInfo, firstName: e.target.value })}
                      placeholder="Alexander" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all focus:outline-hidden"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Family Name <span className="text-rose-500">*</span></label>
                    <input 
                      id="patient-last-name"
                      type="text" 
                      required
                      value={patientInfo.lastName}
                      onChange={(e) => setPatientInfo({ ...patientInfo, lastName: e.target.value })}
                      placeholder="Hamilton" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Primary Email Address <span className="text-rose-500">*</span></label>
                    <input 
                      id="patient-email"
                      type="email" 
                      required
                      value={patientInfo.email}
                      onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })}
                      placeholder="alex.h@gmail.com" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all focus:outline-hidden"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Mobile Phone <span className="text-rose-500">*</span></label>
                    <input 
                      id="patient-phone"
                      type="tel" 
                      required
                      value={patientInfo.phone}
                      onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })}
                      placeholder="07700 900077" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Date Of Birth <span className="text-rose-500">*</span></label>
                    <input 
                      id="patient-dob"
                      type="date" 
                      required
                      value={patientInfo.dateOfBirth}
                      onChange={(e) => setPatientInfo({ ...patientInfo, dateOfBirth: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all focus:outline-hidden"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Pre-Consultation Notes / History</label>
                    <input 
                      id="patient-notes"
                      type="text"
                      value={patientInfo.notes}
                      onChange={(e) => setPatientInfo({ ...patientInfo, notes: e.target.value })}
                      placeholder="E.g. Recurrent fatigue, previous treatment logs" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="p-4 bg-teal-50 border border-teal-150 rounded-2xl flex items-start gap-3 mt-4 text-xs text-teal-850 leading-relaxed">
                  <Lock className="w-4.5 h-4.5 text-teal-600 shrink-0 mt-0.5" />
                  <p>
                    By proceeding, you consent to our secure Clinical Records policy. Your diagnostics, biological readings, and symptoms are fully encrypted and visible exclusively to supervising medical experts under HIPAA/UK medical standards.
                  </p>
                </div>

                {/* Form submit button hidden because wizard uses footer next controls */}
                <input id="hidden-booking-submit" type="submit" className="hidden" />
              </form>
            </div>
          )}

          {/* STEP 5: BOOKING SUCCESS DETAILED BANNER */}
          {step === 5 && successBooking && (
            <div id="booking-step-success" className="text-center space-y-6 text-slate-900 py-6">
              
              <div className="inline-flex p-4 bg-teal-50 text-teal-600 rounded-full">
                <CheckCircle className="w-12 h-12" />
              </div>

              <div className="space-y-1 max-w-sm mx-auto text-center">
                <h3 className="text-2xl font-bold font-sans text-slate-950">Appointment Secured</h3>
                <p className="text-xs text-slate-400">
                  Your clinical slot at Healthpod Frodsham has been registered in our central records system successfully.
                </p>
              </div>

              {/* PDF style Receipt Details Card */}
              <div className="max-w-md mx-auto bg-slate-50 rounded-2xl border border-slate-150 p-6 space-y-4 text-left">
                
                {/* Reference line */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs">
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">Reference Number</span>
                  <span className="font-mono font-bold text-slate-900">{successBooking.reference}</span>
                </div>

                {/* Details slots */}
                <div className="space-y-2 text-xs">
                  <p className="flex justify-between">
                    <span className="text-slate-500 font-medium font-sans">Service:</span>
                    <span className="font-bold text-slate-905">{successBooking.service.name}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-500 font-medium font-sans">Clinician Officer:</span>
                    <span className="font-bold text-slate-905">{successBooking.clinician.name}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-500 font-medium font-sans">Appointment Date:</span>
                    <span className="font-bold text-slate-905 font-mono">
                      {new Date(successBooking.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-500 font-medium font-sans">Time Slot:</span>
                    <span className="font-bold text-slate-950 font-mono">{successBooking.time}</span>
                  </p>
                  <p className="flex justify-between font-bold text-sm pt-2.5 border-t border-slate-200/50">
                    <span className="text-slate-700 font-sans">Booking Fee:</span>
                    <span className="text-teal-700 font-mono">£{successBooking.service.price}</span>
                  </p>
                </div>

                {/* Prep guideline brief */}
                {successBooking.service.preparation && (
                  <div className="pt-3 border-t border-slate-200/50 space-y-1">
                    <span className="text-[9px] font-mono font-bold text-slate-405 uppercase tracking-wider block">Clinical Prep Instructions</span>
                    <p className="text-[10px] text-slate-500 leading-relaxed italic">
                      "{successBooking.service.preparation}"
                    </p>
                  </div>
                )}

              </div>

              {/* Final info trust line */}
              <p className="text-[10px] text-slate-400 max-w-sm mx-auto">
                A verification PDF statement, calendar invite, and secure health check link have been dispatched to <span className="font-bold text-slate-800">{successBooking.patient.email}</span>. Thank you for placing your trust in us.
              </p>

            </div>
          )}

        </div>

        {/* WIZARD ACTIONS FOOTER */}
        <div className="px-6 py-4.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          
          {/* Back button */}
          {step > 1 && step < 5 ? (
            <button
              id="booking-back-btn"
              onClick={handleBack}
              className="px-4.5 py-2.5 border border-slate-200 hover:border-slate-350 bg-white text-xs font-semibold text-slate-700 hover:text-slate-900 rounded-xl cursor-pointer transition-colors"
            >
              Back
            </button>
          ) : (
            <button 
              id="booking-cancel-btn"
              onClick={onClose}
              className={`px-4.5 py-2.5 text-xs font-semibold rounded-xl text-slate-500 hover:text-slate-900 cursor-pointer ${step === 5 ? 'invisible' : ''}`}
            >
              Cancel
            </button>
          )}

          {/* Secure Trust logo */}
          {step < 4 && (
            <p className="text-[10px] font-mono text-slate-400 hidden sm:flex items-center gap-1.5 uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5 text-slate-400" /> SECURED CHESHIRE INgress
            </p>
          )}

          {/* Next Button / Trigger Form */}
          {step === 3 && (
            <button
              id="booking-step3-next-btn"
              onClick={() => setStep(4)}
              disabled={!selectedDate || !selectedTimeSlot}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer inline-flex items-center gap-1"
            >
              <span>Continue Patient Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}

          {step === 4 && (
            <button
              id="booking-step4-submit-btn"
              onClick={() => {
                // Trigger formal HTML validation by fetching native hidden submit
                document.getElementById('hidden-booking-submit')?.click();
              }}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer inline-flex items-center gap-1"
            >
              <span>Confirm & Secure Appoint</span>
              <Check className="w-3.5 h-3.5" />
            </button>
          )}

          {step === 5 && (
            <button
              id="booking-success-done-btn"
              onClick={onClose}
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-2xl shadow-xs cursor-pointer transition-colors"
            >
              Return to Clinical Directory
            </button>
          )}

        </div>

      </div>
    </div>
  );
}
