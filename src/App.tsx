import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ServicesView from './components/ServicesView';
import InsightsView from './components/InsightsView';
import ContactView from './components/ContactView';
import BookingWizard from './components/BookingWizard';
import AppointmentList from './components/AppointmentList';
import { Booking, Service, Article } from './types';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Modal / Drawer Open States
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isVisitsOpen, setIsVisitsOpen] = useState<boolean>(false);
  
  // Selected service starting point for booking wizard
  const [preselectedService, setPreselectedService] = useState<Service | null>(null);

  // Bookings Store (synchronized with localStorage)
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load initial bookings from localStorage on mount
  useEffect(() => {
    try {
      const storedBookings = localStorage.getItem('healthpod_visits');
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      }
    } catch (e) {
      console.error('Failed to parse cached bookings:', e);
    }
  }, []);

  // Save bookings to localStorage whenever they change
  const saveBookings = (updatedBookings: Booking[]) => {
    setBookings(updatedBookings);
    try {
      localStorage.setItem('healthpod_visits', JSON.stringify(updatedBookings));
    } catch (e) {
      console.error('Failed to update local storage visits:', e);
    }
  };

  const handleBookingSuccess = (newBooking: Booking) => {
    const updated = [newBooking, ...bookings];
    saveBookings(updated);
  };

  const handleCancelBooking = (bookingId: string) => {
    const updated = bookings.map((b) => {
      if (b.id === bookingId) {
        return { ...b, status: 'cancelled' as const };
      }
      return b;
    });
    saveBookings(updated);
  };

  // Launchers
  const openBookingWizard = () => {
    setPreselectedService(null);
    setIsBookingOpen(true);
  };

  const openBookingWithService = (service: Service) => {
    setPreselectedService(service);
    setIsBookingOpen(true);
  };

  const activeBookingsCount = bookings.filter(b => b.status === 'confirmed').length;

  return (
    <div id="app-root-frame" className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-teal-500/25 selection:text-teal-900">
      
      {/* 1. Header Navigation Bar */}
      <Header 
        currentTab={currentTab}
        setCurrentTab={(tabId) => {
          setCurrentTab(tabId);
          // If moving to another tab, reset any single active article reading view
          if (tabId !== 'insights') {
            setSelectedArticle(null);
          }
        }}
        onOpenBooking={openBookingWizard}
        onOpenMyBookings={() => setIsVisitsOpen(true)}
        activeBookingsCount={activeBookingsCount}
      />

      {/* 2. Main Page Views Swappers */}
      <main id="primary-app-container" className="flex-grow">
        {currentTab === 'home' && (
          <HomeView 
            setCurrentTab={setCurrentTab}
            onOpenBooking={openBookingWizard}
            setSelectedArticle={setSelectedArticle}
          />
        )}

        {currentTab === 'services' && (
          <ServicesView 
            onOpenBookingWithService={openBookingWithService}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'about' && (
          <AboutView 
            onOpenBooking={openBookingWizard}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'insights' && (
          <InsightsView 
            onOpenBooking={openBookingWizard}
            selectedArticle={selectedArticle}
            setSelectedArticle={setSelectedArticle}
          />
        )}

        {currentTab === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* 3. Footer Bar */}
      <Footer setCurrentTab={setCurrentTab} />

      {/* 4. Overlays: Wizard modals, Slide Drawers */}
      <BookingWizard 
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setPreselectedService(null);
        }}
        initialSelectedService={preselectedService}
        onBookingSuccess={handleBookingSuccess}
      />

      <AppointmentList 
        isOpen={isVisitsOpen}
        onClose={() => setIsVisitsOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        onOpenBooking={openBookingWizard}
      />

    </div>
  );
}
