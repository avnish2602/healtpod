import React, { useState } from 'react';
import { Menu, X, Calendar, Activity, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Booking } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenMyBookings: () => void;
  activeBookingsCount: number;
}

export default function Header({
  currentTab,
  setCurrentTab,
  onOpenBooking,
  onOpenMyBookings,
  activeBookingsCount
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
    { id: 'insights', label: 'Health Insights' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header id="main-header" className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            id="logo-container"
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-xs group-hover:bg-teal-700 transition-colors">
              <Activity className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="text-xl font-sans font-bold tracking-tight text-slate-900">
                Healthpod <span className="font-light text-teal-600">Frodsham</span>
              </span>
              <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Clinic Excellence</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  id={`nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 font-sans text-sm font-medium transition-colors ${
                    isActive ? 'text-teal-600' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Call-to-Actions */}
          <div id="desktop-cta" className="hidden md:flex items-center gap-4">
            {/* My Bookings Trigger */}
            <button
              id="my-bookings-btn"
              onClick={onOpenMyBookings}
              className="relative flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>My Visits</span>
              {activeBookingsCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-[10px] font-semibold text-white">
                  {activeBookingsCount}
                </span>
              )}
            </button>

            {/* Direct Booking CTA */}
            <button
              id="book-appointment-btn"
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl text-sm font-medium shadow-sm hover:shadow-md hover:from-teal-700 hover:to-emerald-700 transition-all cursor-pointer"
            >
              <span>Book Appointment</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu & Bookings Quick Access */}
          <div id="mobile-controls" className="flex md:hidden items-center gap-3">
            {activeBookingsCount > 0 && (
              <button
                id="mobile-bookings-badge"
                onClick={onOpenMyBookings}
                className="relative p-2 text-slate-700 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="View bookings"
              >
                <Calendar className="w-5 h-5 text-teal-600" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-teal-600 text-[8px] font-bold text-white">
                  {activeBookingsCount}
                </span>
              </button>
            )}

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-slate-100 bg-white"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <button
                  id={`mobile-nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    currentTab === item.id
                      ? 'bg-teal-50 text-teal-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <button
                  id="mobile-my-visits-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenMyBookings();
                  }}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-slate-700 bg-slate-50 text-base font-medium"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-slate-500" />
                    <span>My Upcoming Visits</span>
                  </div>
                  {activeBookingsCount > 0 ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
                      {activeBookingsCount}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">None</span>
                  )}
                </button>

                <button
                  id="mobile-book-now-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-medium rounded-xl shadow-xs"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Appointment Now</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
