import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, ShieldCheck, Clock, Users, HeartHandshake, CheckCircle2,
  Calendar, Award, Star, Mail, Check, Sparkles, BookOpen, Facebook, Instagram,
  Activity
} from 'lucide-react';
import { SERVICES, ARTICLES } from '../data';
import { Service, Article } from '../types';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  onOpenBooking: () => void;
  setSelectedArticle: (article: Article | null) => void;
}

export default function HomeView({ setCurrentTab, onOpenBooking, setSelectedArticle }: HomeViewProps) {
  // Newsletter state
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 5000);
    }
  };

  // Static stats about the clinic
  const stats = [
    { value: '15+', label: 'Years Clinical Excellence', icon: Award, desc: 'Rooted directly in our local community.' },
    { value: '98%', label: 'Patient Satisfaction', icon: Star, desc: 'Unbiased verified patient review scores.' },
    { value: '24/7', label: 'Booking Portal Access', icon: Clock, desc: 'Schedule, edit, or adjust from any device.' }
  ];

  return (
    <div id="home-view-container" className="flex flex-col gap-0 overflow-x-hidden min-h-screen bg-slate-50/50">
      
      {/* 1. HERO SECTION */}
      <section id="hero-section" className="relative bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white min-h-[85vh] flex items-center py-20 px-4 md:px-0">
        {/* Abstract background decorative radial gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(13,148,136,0.12),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Core */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>A New Era of Clinical Excellence</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-white leading-[1.12]"
            >
              Advanced Healthcare <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Rooted in Compassion</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl"
            >
              Experience medical care built completely around your lifestyle. We pair unhurried primary medical consultations, high-precision laboratory testing, and bespoke wellness plans close to home.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
            >
              <button 
                id="hero-booking-btn"
                onClick={onOpenBooking}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-slate-950 font-bold rounded-2xl shadow-xl hover:shadow-teal-500/10 transition-all cursor-pointer text-base"
              >
                <Calendar className="w-5 h-5 text-slate-950" />
                <span>Book Your Appointment</span>
              </button>
              
              <button 
                id="hero-services-btn"
                onClick={() => setCurrentTab('services')}
                className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-700 hover:border-teal-500 text-white font-medium rounded-2xl hover:bg-white/5 transition-all cursor-pointer text-base"
              >
                <span>View Our Services</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white" />
              </button>
            </motion.div>

            {/* Micro trusts */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-6 text-xs text-slate-400"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                No registration required
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                CQC Compliant Standards
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                Same-Day Referrals
              </span>
            </motion.div>
          </div>

          {/* Right Hero Frame: Aesthetic Clinical Tech Portrait / Mockup */}
          <div className="lg:col-span-5 hidden lg:block relative justify-self-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-[380px] h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
            >
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600&h=800" 
                alt="Modern health clinic" 
                className="w-full h-full object-cover grayscale-15 brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              {/* Floating review card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white">
                <div className="flex items-center gap-1.5 mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-xs italic text-slate-100 font-sans">
                  "The most efficient medical screening I've ever experienced. Unhurried, rigorous, and completely professional."
                </p>
                <div className="mt-2 text-[10px] font-mono uppercase tracking-widest text-teal-300">
                  Elizabeth H. &bull; Frodsham Patient
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 2. CLINIC EXPERIENCE & STATS */}
      <section id="experience-section" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Tablet mockup illustration */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-teal-500/5 rounded-3xl blur-2xl" />
            <div className="relative rounded-3xl overflow-hidden border border-slate-100 shadow-xl bg-white p-2">
              <div className="bg-slate-50 rounded-2xl p-4 overflow-hidden border border-slate-150 relative">
                <img 
                  src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800&h=550" 
                  alt="Doctor with patient diagnostic tablet" 
                  className="rounded-xl w-full h-auto object-cover aspect-video mb-4 shadow-xs"
                />
                <div className="space-y-2">
                  <div className="h-3 w-1/3 bg-teal-100 rounded-full" />
                  <div className="h-4 w-3/4 bg-slate-200 rounded-full" />
                  <div className="h-3.5 w-1/2 bg-slate-200 rounded-full" />
                </div>
              </div>
            </div>
            {/* Overlay trust widget */}
            <div className="absolute -bottom-6 -right-6 p-5 bg-teal-600 text-white rounded-2xl shadow-xl max-w-[200px] hidden sm:block">
              <p className="text-3xl font-bold font-sans">12hr</p>
              <p className="text-xs font-medium text-teal-100 mt-1">Average turnaround for complete biochemical panels</p>
            </div>
          </div>

          {/* Clinical philosophy copy */}
          <div className="lg:col-span-7 text-left space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-600">Redefining the Clinical Experience</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-slate-900 leading-tight">
              An Elite Medical Standard Built For Life
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              At Healthpod Frodsham, we provide a modern medical environment that restores the dignity of personal physician care. Our service is designed to completely eliminate waiting rooms, brief, transactional consults, and protracted diagnostic lead times. 
            </p>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              Our patients obtain prompt, unhindered access to registered General Practitioners, extensive laboratory screenings, and physical practitioners. By housing primary diagnostic imaging alongside consulting clinicians, we craft an integrated, collaborative care map that starts in minutes—not weeks.
            </p>

            <div className="pt-4">
              <button 
                onClick={() => setCurrentTab('about')}
                className="inline-flex items-center gap-2 font-semibold text-teal-600 hover:text-teal-700 transition-colors group cursor-pointer"
              >
                <span>Read our clinical story and values</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-16 border-t border-slate-200/60">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-8 bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all flex items-start gap-4 text-left">
              <div className="p-3.5 bg-teal-50 rounded-xl text-teal-600 shrink-0">
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-3xl font-sans font-bold text-slate-950 font-mono">{stat.value}</p>
                <p className="text-sm font-semibold text-slate-900 mt-1">{stat.label}</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SPECIALIZED SERVICES PREVIEW GRID */}
      <section id="services-preview-section" className="py-24 bg-teal-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="text-left space-y-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-teal-400">Core Capabilities</span>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight">Specialized Clinical Services</h2>
            </div>
            <button 
              onClick={() => setCurrentTab('services')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300 border-b border-teal-400/30 pb-1 hover:border-teal-300 transition-colors cursor-pointer text-left"
            >
              <span>Explore all premium services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.slice(0, 4).map((service) => (
              <div 
                key={service.id} 
                className="group flex flex-col justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.08] hover:border-white/20 transition-all text-left h-full"
              >
                <div>
                  <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400 mb-6 group-hover:scale-105 transition-transform">
                    <Activity className="w-5.5 h-5.5" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight mb-2 text-white">{service.name}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">{service.description}</p>
                </div>
                
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono">From £{service.price}</span>
                  <button 
                    onClick={() => setCurrentTab('services')}
                    className="inline-flex items-center gap-1 text-teal-400 hover:text-white transition-colors cursor-pointer font-medium"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. URGENT BOOKING / CREDENTIALS BANNER */}
      <section id="banner-booking-trigger" className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-3xl p-10 md:p-14 text-white text-left shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.1),transparent_40%)] pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold tracking-tight">Ready to prioritize your health?</h2>
              <p className="text-sm sm:text-base text-teal-50 opacity-90 leading-relaxed max-w-xl">
                Our seamless booking platform allows you to schedule your visit in under two minutes. Same-day clinical assessments and pathology screening available.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span className="text-xs font-medium">Online Booking 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span className="text-xs font-medium">Same-Day Referrals*</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span className="text-xs font-medium">Digital Patient Records</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 justify-self-center lg:justify-self-end w-full sm:w-auto">
              <button 
                id="banner-direct-booking-btn"
                onClick={onOpenBooking}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-teal-950 font-bold hover:bg-slate-50 active:bg-slate-100 rounded-2xl transition-all shadow-md cursor-pointer whitespace-nowrap text-base"
              >
                <span>Start Booking Now</span>
                <ArrowRight className="w-4 h-4 text-teal-600" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. HEALTH INSIGHTS PREVIEW GRID */}
      <section id="health-insights-preview" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="text-left space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-600">Expert Guidance</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-slate-900">Featured Health Insights</h2>
            <p className="text-sm text-slate-500 max-w-lg">Clinically reviewed medical articles covering nutrition, immunology, and body wellness.</p>
          </div>
          <button 
            onClick={() => setCurrentTab('insights')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 font-sans cursor-pointer text-left focus:outline-hidden"
          >
            <span>Read all doctor articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.slice(0, 3).map((article) => (
            <article 
              key={article.id}
              className="flex flex-col h-full bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex-1"
              onClick={() => {
                setSelectedArticle(article);
                setCurrentTab('insights');
              }}
            >
              <div className="aspect-video w-full overflow-hidden relative bg-slate-100">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover grayscale-5 hover:scale-103 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 inline-block px-2.5 py-1 text-[10px] font-semibold bg-white/90 backdrop-blur-md rounded-full text-teal-800 uppercase tracking-wider">
                  {article.category}
                </span>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow text-left">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono font-medium">
                    <span>{article.date}</span>
                    <span>&bull;</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 line-clamp-2 leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                    {article.subtitle}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={article.author.avatarUrl} 
                      alt={article.author.name} 
                      className="w-7 h-7 rounded-full object-cover object-center border border-slate-100"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-xs font-semibold text-slate-900">{article.author.name}</p>
                      <p className="text-[10px] text-slate-400">{article.author.role}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-teal-600 inline-flex items-center gap-1">
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. SOCIAL MEDIA WALL */}
      <section id="social-wall-section" className="py-24 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-600">Our Feed</span>
            <h2 className="text-3xl font-sans font-bold tracking-tight text-slate-900">Follow Our Community</h2>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">Get healthy routines, diet tips, and updates directly to your screen.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            
            {/* Instagram simulation */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 shadow-2xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                  <Instagram className="w-4 h-4 text-rose-500" /> Instagram
                </span>
                <span className="text-slate-400 text-xs">@healthpod_frodsham</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-sans italic">
                "Winter immune support: Dr. Jenkins discusses blood vitamin reviews and gut immunity barrier adjustments. Watch full breakdown at clinical series."
              </p>
              <div className="h-44 rounded-xl bg-slate-200 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=300"
                  alt="Post preview" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* TikTok simulation */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 shadow-2xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-600 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-teal-500" /> TikTok
                </span>
                <span className="text-slate-400 text-xs">@healthpod_frodsham</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-sans italic">
                "How long should you hold box breathing before stressful meetings? Dr. Mark Walton breaks down vagus nerve direct stimulation in 60s."
              </p>
              <div className="h-44 rounded-xl bg-slate-200 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=300" 
                  alt="Post preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Facebook simulation */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 shadow-2xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                  <Facebook className="w-4 h-4 text-blue-600" /> Facebook
                </span>
                <span className="text-slate-400 text-xs">@healthpod_frodsham</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-sans italic">
                "Our physical therapist Elena Jenkins is hosting free community alignment checks and gait assessments this Saturday. Drop by from 9 AM."
              </p>
              <div className="h-44 rounded-xl bg-slate-200 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=300" 
                  alt="Post preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER SUBSCRIPTION CARD */}
      <section id="newsletter-section" className="py-20 bg-slate-50 border-t border-slate-100 flex justify-center">
        <div className="max-w-3xl w-full mx-auto px-4 sm:px-6">
          <div className="p-10 md:p-12 bg-white rounded-3xl border border-slate-150 text-center space-y-8 shadow-sm">
            
            <div className="inline-flex p-3 bg-teal-50 rounded-full text-teal-600 mx-auto">
              <Mail className="w-6 h-6" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="text-2xl font-sans font-bold text-slate-900">Stay Informed & Proactive</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Join our premium patient circular. Receive the latest clinically reviewed insights, health tips, and clinic updates from our practitioners.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row items-stretch gap-3">
              <input 
                id="newsletter-email-input"
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your primary email address" 
                className="flex-grow px-5 py-3.5 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded-2xl text-sm transition-all focus:outline-hidden"
              />
              <button 
                id="newsletter-submit-btn"
                type="submit"
                disabled={subscribed}
                className="px-6 py-3.5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 disabled:bg-emerald-600 text-white font-semibold rounded-2xl text-sm transition-all shadow-xs cursor-pointer inline-flex items-center justify-center gap-1 whitespace-nowrap"
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <span>Subscribe Now</span>
                )}
              </button>
            </form>

            <p className="text-[11px] text-slate-400">
              We operate a zero-spam policy. Unsubscribe anytime in one click. Read our Privacy Policy.
            </p>

          </div>
        </div>
      </section>

    </div>
  );
}
