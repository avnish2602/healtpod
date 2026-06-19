import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, Heart, Target, Star, Calendar, 
  MapPin, Shield, Users, ArrowRight, UserCheck 
} from 'lucide-react';
import { CLINICIANS } from '../data';

interface AboutViewProps {
  onOpenBooking: () => void;
  setCurrentTab: (tab: string) => void;
}

export default function AboutView({ onOpenBooking, setCurrentTab }: AboutViewProps) {
  
  const values = [
    {
      title: 'Integrity First',
      description: 'Our clinicians operate with full transparency. Your recommendations are driven exclusively by clinical precision, unburdened by commercial targets.',
      icon: Shield
    },
    {
      title: 'Active Empathy',
      description: 'Creating a safe, completely comfortable, and validating clinical environment where children and adults alike receive uncompromised listening and care.',
      icon: Heart
    },
    {
      title: 'Medical Precision',
      description: 'Leveraging state-of-the-art diagnostic equipment and high-accuracy laboratory screens to detect biological changes years before symptoms manifest.',
      icon: Target
    }
  ];

  return (
    <div id="about-view-container" className="flex flex-col bg-slate-50/50 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section id="about-hero" className="relative py-24 bg-slate-900 text-white overflow-hidden text-center md:text-left">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(13,148,136,0.15),transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-400">Our Clinical Story</span>
            <h1 className="text-4xl sm:text-5xl font-sans font-bold tracking-tight leading-tight">
              Redefining Excellence in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">Local Healthcare</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Healthpod Frodsham was founded to bridge the gap between prompt modern diagnostic access and the warm, unhurried attention of a trusted family clinician.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CLINIC INTENSE DESCRIPTION / STORY */}
      <section id="about-story" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-6 text-left space-y-6">
            <h2 className="text-3xl font-sans font-bold text-slate-950 tracking-tight leading-tight">
              A New Standard for Frodsham
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Our clinical founders realized that the current healthcare framework frequently forces patients to choose between massive waiting windows or superficial, hasty medical consults. Healthpod was established here in Frodsham to design a comprehensive alternative.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              We took great care in creating an atmosphere that does not feel cold or clinical. From our spacious private consulting pods to our state-of-the-art laboratory systems and professional biomechanical spaces, every corner of our clinic is tailored to support a feelings of confidence, safety, and thorough reassurance.
            </p>
            
            <div className="p-6 bg-teal-50 border border-teal-150 rounded-2xl flex items-start gap-4">
              <UserCheck className="w-6 h-6 text-teal-600 shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-teal-950 text-sm">Direct Clinical Integration</p>
                <p className="text-xs text-teal-800 leading-relaxed mt-0.5">
                  Because our pathologists, general practitioners, and physical therapists sit in consecutive pods, we discuss complex cases in real-time, leading to rapid diagnostic solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Side imagery layout */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-2 bg-gradient-to-tr from-teal-500/10 to-emerald-500/5 rounded-3xl blur-2xl" />
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=350&h=450" 
                  alt="Clinical equipment" 
                  className="rounded-2xl object-cover h-64 w-full shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=350&h=300" 
                  alt="Laboratory screening" 
                  className="rounded-2xl object-cover h-40 w-full shadow-xs"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img 
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=350&h=300" 
                  alt="Cozy clinical room" 
                  className="rounded-2xl object-cover h-40 w-full shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1504813184591-015556c5c56f?auto=format&fit=crop&q=80&w=350&h=450" 
                  alt="Therapy space" 
                  className="rounded-2xl object-cover h-64 w-full shadow-xs"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. GUIDED CORES & VALUES */}
      <section id="about-values" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-teal-400">Driven by Purpose</span>
            <h2 className="text-3xl font-sans font-bold tracking-tight">Our Unwavering Promises to Patients</h2>
            <p className="text-sm text-slate-400">We align our clinical goals, technologies, and pricing matrices directly with your long-term wellness.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="p-8 bg-white/5 border border-white/10 rounded-2xl text-left space-y-4 hover:border-teal-500/30 transition-colors">
                <div className="w-12 h-12 bg-teal-400/10 rounded-xl flex items-center justify-center text-teal-400 mb-2">
                  <val.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white">{val.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CLINICAL EXPERTS / TEAM SECTION */}
      <section id="about-team" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-20">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-600">The Clinical Experts</span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-slate-900">Dedicated Practice Leadership</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">Experienced regional medical experts and specialists directing your personalized wellness mapping.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {CLINICIANS.map((clinician) => (
            <div 
              key={clinician.id} 
              className="flex flex-col h-full bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="aspect-[4/5] w-full overflow-hidden relative bg-slate-100">
                <img 
                  src={clinician.imageUrl} 
                  alt={clinician.name} 
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow text-left">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-sm uppercase tracking-wide inline-block">
                    {clinician.role}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{clinician.name}</h3>
                  <p className="text-xs font-medium text-slate-500 mb-2">{clinician.specialty}</p>
                  <p className="text-xs text-slate-400 leading-relaxed italic line-clamp-3">
                    "{clinician.bio}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. AESTHETIC CALL-TO-ACTION */}
      <section id="about-cta" className="py-24 bg-slate-100/50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-slate-950">
            Start Your Wellness Journey With Us
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            Schedule an introductory consultation with Dr. Sarah Jenkins or any of our clinical specialists online in just two minutes. We look forward to meeting you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              id="about-cta-booking-btn"
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Book an Appointment
            </button>
            <button 
              id="about-cta-contact-btn"
              onClick={() => setCurrentTab('contact')}
              className="w-full sm:w-auto px-8 py-3.5 border-2 border-slate-200 hover:border-teal-600 hover:text-teal-700 text-slate-700 font-medium rounded-xl hover:bg-white transition-all cursor-pointer"
            >
              Contact Our Clinic
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
