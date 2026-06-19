import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Clock, ArrowLeft, Calendar, Share2, 
  Sparkles, CheckCircle, ChevronRight, Bookmark, ArrowRight
} from 'lucide-react';
import { ARTICLES } from '../data';
import { Article } from '../types';

interface InsightsViewProps {
  onOpenBooking: () => void;
  selectedArticle: Article | null;
  setSelectedArticle: (article: Article | null) => void;
}

export default function InsightsView({ onOpenBooking, selectedArticle, setSelectedArticle }: InsightsViewProps) {
  
  // Set default article if none is selected
  const activeArticle = selectedArticle || ARTICLES[0];

  const handleSelectArticle = (articleId: string) => {
    const article = ARTICLES.find(a => a.id === articleId) || null;
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    // Elegant clipboard share simulation
    navigator.clipboard.writeText(window.location.href);
    alert('Article link copied to clipboard!');
  };

  const otherArticles = ARTICLES.filter(art => art.id !== activeArticle.id);

  return (
    <div id="insights-view-container" className="bg-slate-50/50 min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* VIEW SHIFT ENGINE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          
          {/* LEFT: READ ACTIVE ARTICLE */}
          <main id="active-article-panel" className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-3xs p-6 sm:p-10 md:p-12 space-y-8">
            
            {/* Custom Breadcrumb Back Buttons if user swapped from home or list */}
            {selectedArticle && (
              <button 
                id="back-to-insights-btn"
                onClick={() => setSelectedArticle(null)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors uppercase tracking-widest cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to primary news feed</span>
              </button>
            )}

            {/* Article general facts */}
            <div className="space-y-4">
              <span className="inline-block px-3 py-1.5 bg-teal-50 text-teal-700 text-[10px] font-mono font-bold rounded-lg uppercase tracking-wider">
                {activeArticle.category}
              </span>
              <h1 className="text-2xl sm:text-3.5xl md:text-4xl font-sans font-bold tracking-tight text-slate-900 leading-tight">
                {activeArticle.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed font-sans">
                {activeArticle.subtitle}
              </p>
            </div>

            {/* Author details box & tools */}
            <div className="py-5 border-y border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src={activeArticle.author.avatarUrl} 
                  alt={activeArticle.author.name} 
                  className="w-10 h-10 rounded-full object-cover border border-slate-100 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{activeArticle.author.name}</p>
                  <p className="text-xs text-slate-400">{activeArticle.author.role} &bull; Healthpod Frodsham</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-405">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {activeArticle.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {activeArticle.readTime}
                </span>
                <button 
                  onClick={handleShare}
                  className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-500 hover:text-slate-900 cursor-pointer"
                  title="Share article copy"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Article Image Banner */}
            <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden bg-slate-100 shadow-2xs relative">
              <img 
                src={activeArticle.imageUrl} 
                alt={activeArticle.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Article Rich Copy Content text */}
            <div className="space-y-6 text-sm sm:text-base text-slate-650 leading-relaxed font-sans font-normal">
              {activeArticle.content.map((paragraph, index) => {
                // Style paragraphs that start with points separately to highlight guidelines (Anti-AI-Slop/Bento style structure)
                const isPoint = paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('3.');
                
                if (isPoint) {
                  const [pointTitle, ...pointBody] = paragraph.split(':');
                  return (
                    <div key={index} className="p-6 bg-teal-50/40 border-l-4 border-teal-500 rounded-r-xl space-y-1.5 mt-4">
                      <p className="text-base font-bold text-slate-900">{pointTitle}</p>
                      <p className="text-slate-600 font-sans leading-relaxed text-sm sm:text-base">{pointBody.join(':').trim()}</p>
                    </div>
                  );
                }

                return (
                  <p key={index} className="text-justify sm:text-left">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Article Tag Badges */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-2">
              {activeArticle.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Inline Booking Callout for reader */}
            <div className="p-8 bg-gradient-to-r from-teal-950 to-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 text-left">
              <div className="space-y-1.5">
                <p className="text-sm font-semibold text-teal-400 font-mono tracking-widest uppercase">Proactive Prevention</p>
                <h4 className="text-lg font-bold">Schedule an Annual Screen / Review</h4>
                <p className="text-xs text-slate-350 leading-relaxed max-w-md">Our lead clinicians will review your health baselines with you in depth, helping you craft a highly preventative longevity life path.</p>
              </div>
              <button 
                id="inline-article-booking-btn"
                onClick={onOpenBooking}
                className="px-6 py-3 bg-teal-500 font-bold hover:bg-teal-600 active:bg-teal-700 text-slate-950 text-sm rounded-xl transition-all shadow-xs shrink-0 whitespace-nowrap cursor-pointer"
              >
                Book with Us
              </button>
            </div>

          </main>

          {/* RIGHT: RECOMMENDED READS & WIDGETS */}
          <aside id="insights-sidebar" className="lg:col-span-4 space-y-8 sticky top-24">
            
            {/* Category Banner Card */}
            <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-3xs text-left space-y-4">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">More from Health Insights</h3>
              
              <div className="space-y-4">
                {otherArticles.map((art) => (
                  <div 
                    id={`recommended-art-${art.id}`}
                    key={art.id}
                    onClick={() => handleSelectArticle(art.id)}
                    className="group flex gap-4 cursor-pointer py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 p-2 rounded-xl transition-colors"
                  >
                    <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                      <img 
                        src={art.imageUrl} 
                        alt={art.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-1 text-left justify-center flex flex-col">
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-2 group-hover:text-teal-600 leading-snug">
                        {art.title}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                        <span>{art.date}</span>
                        <span>&bull;</span>
                        <span className="text-teal-600 font-semibold">{art.readTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Clinical Service Offer */}
            <div className="p-8 bg-teal-50 border border-teal-150 rounded-2xl text-left space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-100/40 rounded-full blur-xl pointer-events-none" />
              
              <span className="inline-block px-2 py-0.5 bg-teal-600 text-white rounded-sm text-[9px] font-mono font-bold uppercase tracking-wider">
                Support
              </span>
              <h3 className="text-lg font-bold text-teal-950 font-sans tracking-tight">Need Medical Clarity?</h3>
              <p className="text-xs text-teal-850 leading-relaxed">
                If you are fighting recurrent infection, chronic lethargy, or joint pain, bring your symptom lists directly to a private consultation.
              </p>
              
              <button 
                id="sidebar-about-btn"
                onClick={onOpenBooking}
                className="flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 transition-colors group text-left cursor-pointer"
              >
                <span>Book a consult in under 2 mins</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </aside>

        </div>

      </div>
    </div>
  );
}
