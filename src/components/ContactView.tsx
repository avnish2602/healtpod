import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, Send, CheckCircle, 
  Map, Navigation, ArrowRight, CornerDownRight, Bus, Car
} from 'lucide-react';

export default function ContactView() {
  
  // Message Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'General Enquiry',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Directions Engine State
  const [startPoint, setStartPoint] = useState('');
  const [selectedPresetRoute, setSelectedPresetRoute] = useState<string | null>(null);

  const presetRoutes = [
    {
      id: 'chester',
      label: 'Chester',
      distance: '11.4 miles',
      duration: '18 mins',
      method: 'Car (via A56)',
      steps: [
        'Depart Chester city center eastward towards the A51.',
        'At Roundabout, take the exit onto the A56 East toward Helsby.',
        'Follow A56 through Helsby. Upon reaching Frodsham, cross the stone bridge.',
        'Healthpod Frodsham is located on your right on High Street, directly opposite the post office.'
      ]
    },
    {
      id: 'runcorn',
      label: 'Runcorn',
      distance: '6.2 miles',
      duration: '12 mins',
      method: 'Car (via A557)',
      steps: [
        'Head south out of Runcorn on the A557 expressway.',
        'Take the exit signposted Frodsham/Helsby.',
        'At Clifton roundabout, take the 3rd exit down Bridge Street toward Frodsham.',
        'Merge onto High Street. Healthpod Clinicians will be on your left, just past the library.'
      ]
    },
    {
      id: 'helsby',
      label: 'Helsby',
      distance: '2.8 miles',
      duration: '8 mins',
      method: 'Car (via A56)',
      steps: [
        'Depart Helsby on the A56 heading North East.',
        'Continue along Chester Road entering the Frodsham municipal boundary.',
        'Pass the Frodsham train station on your right.',
        'The clinic entrance is immediately on the right in 100 meters, parking behind.'
      ]
    },
    {
      id: 'weaverham',
      label: 'Weaverham',
      distance: '8.1 miles',
      duration: '15 mins',
      method: 'Car (via B5152)',
      steps: [
        'Depart Weaverham westward on High Street / B5152.',
        'Follow B5152 through Delamere forest outskirts.',
        'Descend into Frodsham on Fluin Lane.',
        'Turn right onto High Street. Healthpod is on your left.'
      ]
    }
  ];

  const handlePresetSelect = (routeId: string) => {
    setSelectedPresetRoute(routeId);
    const route = presetRoutes.find(r => r.id === routeId);
    if (route) {
      setStartPoint(route.label);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.email && formData.message) {
      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: 'General Enquiry',
          message: ''
        });
        setIsSubmitted(false);
      }, 5000);
    }
  };

  const activeRoute = presetRoutes.find(r => r.id === selectedPresetRoute);

  return (
    <div id="contact-view-container" className="flex flex-col bg-slate-50/50 min-h-screen">
      
      {/* 1. HERO HEADER */}
      <section id="contact-hero" className="relative py-20 bg-slate-900 text-white overflow-hidden text-center md:text-left">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(13,148,136,0.15),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-400">Get In Touch</span>
            <h1 className="text-4xl sm:text-5xl font-sans font-bold tracking-tight">Contact Our Frodsham Clinic</h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Have clinical inquiries, scheduling adjustments, or corporate screening proposals? Reach out to our dedicated care staff today.
            </p>
          </div>
        </div>
      </section>

      {/* 2. GRID INFO & SECURE ENQUIRY FORM */}
      <section id="contact-details-grid" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Interactive Enquiry Card */}
          <div id="enquiry-card-container" className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 shadow-3xs p-6 sm:p-10 space-y-8 text-left">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">Send Us a Direct Message</h2>
              <p className="text-xs text-slate-500">All submissions are monitored by our patient privacy managers under strict GDPR clinical standards.</p>
            </div>

            {isSubmitted ? (
              <div id="message-success-banner" className="p-8 bg-teal-50 border border-teal-150 rounded-2xl text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-teal-600 mx-auto" />
                <h3 className="text-lg font-bold text-teal-950">Message Sent Successfully</h3>
                <p className="text-sm text-teal-850 leading-relaxed max-w-sm mx-auto">
                  Thank you for contacting Healthpod Frodsham. A clinical coordinator will review your inquiry and connect via email or phone within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">First Name <span className="text-rose-500">*</span></label>
                    <input 
                      id="contact-first-name"
                      type="text" 
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      placeholder="Jane" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-205 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all focus:outline-hidden"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Last Name</label>
                    <input 
                      id="contact-last-name"
                      type="text" 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      placeholder="Doe" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-205 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Your Email Address <span className="text-rose-500">*</span></label>
                  <input 
                    id="contact-email"
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="jane.doe@example.com" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-205 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Subject Of Enquiry <span className="text-rose-500">*</span></label>
                  <select 
                    id="contact-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-205 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden rounded-xl text-sm transition-all"
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Booking Adjustment">Booking Adjustment / Cancellation</option>
                    <option value="Diagnostics/Pathology Records">Pathology Lab Records Enquiry</option>
                    <option value="Physiotherapy Consultation">Physiotherapy Services Info</option>
                    <option value="Corporate Partnerships">Corporate Health & Vaccination Programs</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Detailed Message <span className="text-rose-500">*</span></label>
                  <textarea 
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Describe your inquiry or request in detail..." 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-205 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all focus:outline-hidden resize-none"
                  />
                </div>

                <button 
                  id="contact-submit-btn"
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold rounded-xl text-sm transition-all shadow-xs cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Secure Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Direct Clinic Connection Cards */}
          <div id="connection-details-aside" className="lg:col-span-5 space-y-6">
            
            {/* Core Info Block */}
            <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-3xs space-y-6 text-left">
              <h3 className="text-lg font-bold font-sans text-slate-900 tracking-tight">Direct Connections</h3>
              
              <div className="space-y-5">
                
                {/* Phone */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Telephone</h4>
                    <a href="tel:01928123456" className="text-base font-bold text-slate-900 hover:text-teal-600 transition-colors font-mono">
                      01928 123 456
                    </a>
                    <p className="text-[11px] text-slate-400 mt-0.5">Care line open Mon-Sat from 8:00 AM.</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Email Address</h4>
                    <a href="mailto:care@healthpodfrodsham.co.uk" className="text-sm font-semibold text-slate-900 hover:text-teal-600 transition-colors">
                      care@healthpodfrodsham.co.uk
                    </a>
                    <p className="text-[11px] text-slate-400 mt-0.5">Average digital response window is 90 mins.</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Clinic Address</h4>
                    <p className="text-sm font-medium text-slate-900">
                      High Street, Frodsham, <br />
                      Cheshire, WA6 7HZ
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Complimentary parking located directly behind building.</p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Consultation Hours</h4>
                    <div className="text-xs text-slate-700 space-y-1 mt-1 font-medium">
                      <p className="flex justify-between gap-6">
                        <span>Mon - Fri</span>
                        <span className="font-mono text-slate-950 font-bold">8:00 AM - 6:30 PM</span>
                      </p>
                      <p className="flex justify-between gap-6">
                        <span>Saturday</span>
                        <span className="font-mono text-slate-955 font-bold">9:00 AM - 1:00 PM</span>
                      </p>
                      <p className="flex justify-between gap-6">
                        <span>Sunday & standard holidays</span>
                        <span className="text-rose-500">Closed</span>
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE DIRECTIONS ENGINE / ROUTE MAP WIDGET */}
      <section id="directions-widget-section" className="py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
            
            {/* Route controls */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">Routing Guide</span>
              <h2 className="text-3xl font-sans font-bold tracking-tight">Interactive Clinician Directions</h2>
              <p className="text-sm text-slate-350 leading-relaxed">
                Healthpod Frodsham has excellent road and rail links across Cheshire. Choose your departing town below to map out precise clinical driving guides.
              </p>

              {/* Selector Presets to simulate Map */}
              <div id="presetting-buttons" className="grid grid-cols-2 gap-3 pb-4">
                {presetRoutes.map((route) => (
                  <button
                    id={`route-preset-${route.id}`}
                    key={route.id}
                    onClick={() => handlePresetSelect(route.id)}
                    className={`p-3 text-xs font-semibold rounded-xl border text-left transition-all cursor-pointer ${
                      selectedPresetRoute === route.id
                        ? 'bg-teal-500 border-teal-500 text-slate-950 shadow-md'
                        : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <Navigation className="w-3.5 h-3.5 shrink-0" />
                      <span>{route.label}</span>
                    </div>
                    <div className={`text-[10px] ${selectedPresetRoute === route.id ? 'text-teal-950' : 'text-slate-400'}`}>
                      {route.duration} ({route.distance})
                    </div>
                  </button>
                ))}
              </div>

              {/* Free Text entry mock */}
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-widest text-slate-400 block">Custom Starting Point</label>
                <div className="relative">
                  <input 
                    id="contact-start-point"
                    type="text"
                    value={startPoint}
                    onChange={(e) => setStartPoint(e.target.value)}
                    placeholder="Enter post code or town (e.g. Kingsley)" 
                    className="w-full bg-white/5 border border-white/10 focus:bg-white/10 focus:ring-1 focus:ring-teal-500 rounded-xl px-4 py-3 text-sm focus:outline-hidden pr-20"
                  />
                  <button 
                    onClick={() => alert(`Directions calculated from "${startPoint}" successfully. Showing route to Frodsham WA6 7HZ.`)}
                    className="absolute right-2 top-2 px-3 py-1 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    Go
                  </button>
                </div>
              </div>

            </div>

            {/* Simulated Live Vector Map Canvas with dynamic routing rendering */}
            <div className="lg:col-span-7">
              <div className="bg-slate-950/80 rounded-3xl border border-white/10 p-6 sm:p-8 min-h-[400px] flex flex-col justify-between relative overflow-hidden text-left">
                
                {/* Simulated geographic canvas layout */}
                <div className="absolute inset-0 bg-slate-950 flex items-center justify-center opacity-30 pointer-events-none">
                  <div className="w-[120%] h-[120%] bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]" />
                </div>

                <div className="relative z-10 w-full">
                  <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
                    <span className="flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-widest font-mono">
                      <Map className="w-4.5 h-4.5 text-teal-400" />
                      Map Navigation Vector
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Destination: WA6 7HZ</span>
                  </div>

                  {activeRoute ? (
                    <div id="route-guidance-log animate-fade-in" className="space-y-4">
                      
                      {/* Route meta row */}
                      <div className="flex flex-wrap gap-4 bg-teal-500/5 border border-teal-500/10 p-4 rounded-xl">
                        <div className="text-xs">
                          <span className="text-slate-400 block font-mono text-[9px] uppercase tracking-wider">Method</span>
                          <span className="font-bold text-white flex items-center gap-1.5 mt-0.5">
                            <Car className="w-4 h-4 text-teal-400" /> {activeRoute.method}
                          </span>
                        </div>
                        <div className="text-xs">
                          <span className="text-slate-400 block font-mono text-[9px] uppercase tracking-wider">Distance</span>
                          <span className="font-bold text-white mt-0.5 block">{activeRoute.distance}</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-slate-400 block font-mono text-[9px] uppercase tracking-wider">Est. Duration</span>
                          <span className="font-bold text-teal-400 mt-0.5 block">{activeRoute.duration}</span>
                        </div>
                      </div>

                      {/* Direction Steps */}
                      <div className="space-y-3.5 pt-2">
                        <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-widest">Step-by-Step Clinical Routing</span>
                        <div className="space-y-3 max-h-56 overflow-y-auto pr-2 scrollbar-thin">
                          {activeRoute.steps.map((step, idx) => (
                            <div key={idx} className="flex gap-3 text-xs items-start leading-relaxed text-slate-300">
                              <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-[10px] shrink-0 font-mono mt-0.5">
                                {idx + 1}
                              </span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div id="route-placeholding" className="h-60 flex flex-col items-center justify-center text-center space-y-4">
                      <Navigation className="w-12 h-12 text-slate-600 animate-pulse" />
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-slate-300">No Departure Selected</p>
                        <p className="text-xs text-slate-500 max-w-sm">Please tap a nearby preset departing town on the left or enter a custom post code to render clinical GPS direction sequences.</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative z-10 flex items-center justify-between text-[11px] py-4 border-t border-white/5 mt-6 bg-slate-950/40 px-2 rounded-lg">
                  <span className="text-emerald-400 flex items-center gap-1.5 font-bold font-mono">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    CLINIC PARKING ACTIVE
                  </span>
                  <p className="text-slate-400">Complimentary parking vouchers provided on consultation arrival.</p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
