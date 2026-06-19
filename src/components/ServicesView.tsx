import React, { useState, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';
import { Service } from '../types';

interface ServicesViewProps {
  onOpenBookingWithService: (service: Service) => void;
  setCurrentTab: (tab: string) => void;
}

export default function ServicesView({ onOpenBookingWithService, setCurrentTab }: ServicesViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeAccordionId, setActiveAccordionId] = useState<string | null>(null);

  // Dynamically import icon helper
  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="w-5.5 h-5.5 text-teal-600 shrink-0" />;
    }
    return <LucideIcons.Activity className="w-5.5 h-5.5 text-teal-600 shrink-0" />;
  };

  const categories = useMemo(() => {
    const cats = new Set(SERVICES.map(s => s.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesSearch = 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleAccordion = (id: string) => {
    if (activeAccordionId === id) {
      setActiveAccordionId(null);
    } else {
      setActiveAccordionId(id);
    }
  };

  return (
    <div id="services-view-container" className="flex flex-col bg-slate-50/50 min-h-screen">
      
      {/* 1. HERO BANNER */}
      <section id="services-hero" className="relative py-20 bg-slate-900 text-white overflow-hidden text-center md:text-left">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(13,148,136,0.15),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-400">Clinical Directory</span>
            <h1 className="text-4xl sm:text-5xl font-sans font-bold tracking-tight mt-2">
              Healthcare Services Tailored to You
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mt-4">
              Explore our comprehensive range of private primary medicine services, high-precision imaging directories, dynamic physical therapy pathways, and pathology screenings.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FILTER & INDEX CONTROLLER */}
      <section id="services-filter-panel" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 pb-8 border-b border-slate-200">
          
          {/* Category Selector Pills */}
          <div id="category-pills" className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                id={`category-pill-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4.5 py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-teal-600 border-teal-600 text-white shadow-xs'
                    : 'bg-white border-slate-250 text-slate-650 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div id="services-search" className="relative min-w-[280px]">
            <LucideIcons.Search className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-450" />
            <input 
              id="services-search-input"
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search our medical index..." 
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-500 rounded-xl text-sm shadow-2xs transition-colors"
            />
          </div>

        </div>

        {/* 3. CORE SERVICES LIST (BENTO-STYLE CARDS WITH ACCORDION DETAILS) */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 text-left">
            {filteredServices.map((service) => {
              const isExpanded = activeAccordionId === service.id;
              
              return (
                <div 
                  key={service.id} 
                  className={`bg-white rounded-2xl border transition-all shadow-2xs duration-300 flex flex-col justify-between overflow-hidden ${
                    isExpanded 
                      ? 'border-teal-500 ring-1.5 ring-teal-500/20 shadow-md' 
                      : 'border-slate-100 hover:border-slate-250 hover:shadow-md'
                  }`}
                >
                  <div className="p-6 sm:p-8 space-y-6 flex-grow">
                    
                    {/* Header line icon & category */}
                    <div className="flex items-start justify-between">
                      <div className="p-3 bg-teal-50 rounded-xl">
                        {renderIcon(service.icon)}
                      </div>
                      <span className="text-[10px] font-mono font-medium tracking-wider uppercase bg-slate-50 border border-slate-150 rounded-sm px-2.5 py-1 text-slate-550">
                        {service.category}
                      </span>
                    </div>

                    {/* Service copy */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900 leading-snug">{service.name}</h3>
                      <p className="text-sm text-slate-550 leading-relaxed font-sans">
                        {service.description}
                      </p>
                    </div>

                    {/* Highlights Preview */}
                    <ul className="space-y-2">
                      {service.highlights.slice(0, 3).map((hl, idx) => (
                        <li key={idx} className="flex gap-2.5 text-xs text-slate-650 font-medium">
                          <LucideIcons.Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Advanced expandable prep & facts */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-6 border-t border-slate-100 space-y-4 text-xs overflow-hidden"
                        >
                          {service.preparation && (
                            <div className="space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-150">
                              <p className="font-semibold text-slate-800 flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-mono">
                                <LucideIcons.Info className="w-3.5 h-3.5 text-teal-600" /> Appointment Preparation
                              </p>
                              <p className="text-slate-550 leading-relaxed text-[11px]">{service.preparation}</p>
                            </div>
                          )}
                          <div className="space-y-1">
                            <p className="font-semibold text-slate-900">Coverage highlights:</p>
                            <ul className="space-y-1.5 pl-1.5">
                              {service.highlights.map((hl, i) => (
                                <li key={i} className="flex gap-2 text-slate-500 text-[11px]">
                                  <span className="text-teal-600 font-bold">&bull;</span>
                                  <span>{hl}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>

                  {/* Pricing line & primary booking actions */}
                  <div className="p-6 sm:px-8 sm:pb-8 bg-slate-50/60 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="text-left">
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 block uppercase">Standard Fee</span>
                      <span className="text-lg font-bold text-slate-950 font-mono">
                        £{service.price} <span className="text-xs font-normal text-slate-500">/ {service.duration} mins</span>
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        id={`service-details-btn-${service.id}`}
                        onClick={() => toggleAccordion(service.id)}
                        className="px-4 py-2.5 border border-slate-200 hover:border-slate-350 bg-white text-xs font-semibold rounded-xl text-slate-700 hover:text-slate-900 shadow-3xs cursor-pointer transition-all"
                      >
                        {isExpanded ? 'Hide Info' : 'More Info'}
                      </button>
                      <button 
                        id={`service-book-btn-${service.id}`}
                        onClick={() => onOpenBookingWithService(service)}
                        className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white text-xs font-bold rounded-xl shadow-3xs cursor-pointer transition-colors inline-flex items-center gap-1"
                      >
                        <span>Schedule</span>
                        <LucideIcons.ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div id="no-services-found" className="text-center py-24 max-w-md mx-auto space-y-4">
            <LucideIcons.AlertTriangle className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">No Services Found</h3>
            <p className="text-slate-500 text-sm">We couldn't find any medical directory items matching "{searchQuery}". Try adjusting your keywords or clearing the category filter.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* 4. CLINICAL CALL-TO-ACTION */}
      <section id="services-contingency-cta" className="py-24 bg-slate-100 border-t border-slate-200/60 flex justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-slate-900">Need a specialized consultation or custom plan?</h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            If you are looking for complex multiple screenings, occupational services, or bespoke medical arrangements, please connect directly with our patient care coordinators.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 text-sm">
            <a href="tel:01928123456" className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl font-bold font-mono text-slate-900 hover:border-teal-500 transition-colors">
              <LucideIcons.Phone className="w-4.5 h-4.5 text-teal-600" /> Call 01928 123 456
            </a>
            <button 
              onClick={() => setCurrentTab('contact')}
              className="flex items-center gap-2 px-5 py-3 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-2xl font-bold text-white transition-colors cursor-pointer"
            >
              <LucideIcons.Mail className="w-4.5 h-4.5" /> Email Our Care Team
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
