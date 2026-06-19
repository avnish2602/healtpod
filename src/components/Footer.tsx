import React from 'react';
import { Activity, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Info */}
          <div id="footer-col-brand" className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
                <Activity className="w-5.5 h-5.5" />
              </div>
              <span className="text-xl font-sans font-bold tracking-tight text-white">
                Healthpod <span className="font-light text-teal-400">Frodsham</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Redefining the clinical experience. We combine unhurried primary medical consultations, state-of-the-art laboratory testing, and bespoke physical wellness plans.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Full CQC Registered Standards Compliant</span>
            </div>
          </div>

          {/* Quick Links */}
          <div id="footer-col-links" className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase">Sitemap</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => setCurrentTab('home')}
                  className="hover:text-teal-400 transition-colors cursor-pointer text-left focus:outline-hidden"
                >
                  Clinical Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentTab('services')}
                  className="hover:text-teal-400 transition-colors cursor-pointer text-left focus:outline-hidden"
                >
                  Medical Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentTab('about')}
                  className="hover:text-teal-400 transition-colors cursor-pointer text-left focus:outline-hidden"
                >
                  Meet Our Experts (About)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentTab('insights')}
                  className="hover:text-teal-400 transition-colors cursor-pointer text-left focus:outline-hidden"
                >
                  Health Insights
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentTab('contact')}
                  className="hover:text-teal-400 transition-colors cursor-pointer text-left focus:outline-hidden"
                >
                  Contact Clinic
                </button>
              </li>
            </ul>
          </div>

          {/* Clinic Hours */}
          <div id="footer-col-hours" className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase">Opening Hours</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex justify-between pb-1.5 border-b border-slate-800">
                <span>Monday - Friday</span>
                <span className="font-mono text-white text-xs">8:00 AM - 6:30 PM</span>
              </li>
              <li className="flex justify-between pb-1.5 border-b border-slate-800">
                <span>Saturday</span>
                <span className="font-mono text-white text-xs">9:00 AM - 1:00 PM</span>
              </li>
              <li className="flex justify-between pb-1.5">
                <span>Sunday & Holidays</span>
                <span className="text-rose-400 text-xs font-medium">Closed</span>
              </li>
            </ul>
          </div>

          {/* Direct Address & Contact */}
          <div id="footer-col-contact" className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase">Get In Touch</h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <a href="tel:01928123456" className="hover:text-teal-400 transition-colors font-mono">
                  01928 123 456
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <a href="mailto:care@healthpodfrodsham.co.uk" className="hover:text-teal-400 transition-colors">
                  care@healthpodfrodsham.co.uk
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-1" />
                <span>
                  High Street, Frodsham,<br />
                  Cheshire, WA6 7HZ
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Disclaimer & Bar */}
        <div id="footer-bottom-bar" className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <p className="max-w-2xl leading-relaxed text-center md:text-left">
            * Same-Day Diagnostics, prescription pathways, and laboratory screenings depend on clinical assessment during your consultation, appointment timing, and individual lab capacities.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>&copy; {currentYear} Healthpod Frodsham. All rights reserved.</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Patient Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
