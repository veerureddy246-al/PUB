import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, ArrowUpRight, Check, ShoppingBag, Calendar, RefreshCw } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import { newsletterService } from '../../services/api';

export const Footer = ({ onOpenOrder }) => {
  const [emailInput, setEmailInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useNotification();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const email = emailInput.trim();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await newsletterService.subscribe(email, 'website_footer');
      setSubscribed(true);
      addToast(res.message || 'Thank you for subscribing to Aurel Mumbai Insider Access!', 'success');
      setEmailInput('');
    } catch (err) {
      const msg = err.message || 'Subscription failed. Please check your email and try again.';
      addToast(msg, err.status === 409 || msg.includes('already') ? 'info' : 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-charcoal-950 border-t border-stone-800 text-stone-300 pt-20 pb-12 font-sans relative overflow-hidden">
      {/* Subtle warm glow in background */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-terracotta-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Col 1: Logo & Brand Story (Col span 4) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="flex flex-col items-start leading-none gap-[4px] group">
              {/* Brand wordmark */}
              <span className="font-serif text-[30px] text-stone-100 group-hover:text-stone-50 transition-colors font-normal tracking-[0.06em] leading-none">
                AUREL
              </span>
              {/* Location */}
              <span className="font-sans text-[11px] text-stone-400 tracking-[0.2em] uppercase font-medium leading-none">
                MUMBAI
              </span>
              {/* Category */}
              <span className="font-sans text-[8.5px] text-stone-500 tracking-[0.18em] uppercase font-normal leading-none mt-[2px]">
                BAR &amp; KITCHEN &bull; ROOFTOP
              </span>
            </Link>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm font-light">
              An iconic rooftop dining and nightlife retreat nestled on Level 2 of Goldfinch Hotel, Andheri East. Celebrating bespoke craft mixology, coastal heritage gastronomy, and open-sky evenings.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-charcoal-900 hover:bg-terracotta-500/20 hover:border-terracotta-500 text-stone-300 hover:text-terracotta-400 border border-stone-800 flex items-center justify-center transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-charcoal-900 hover:bg-terracotta-500/20 hover:border-terracotta-500 text-stone-300 hover:text-terracotta-400 border border-stone-800 flex items-center justify-center transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (Col span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-stone-100 font-semibold font-sans">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-light">
              <li>
                <Link
                  to="/"
                  className="text-stone-400 hover:text-terracotta-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/our-story"
                  className="text-stone-400 hover:text-terracotta-400 transition-colors"
                >
                  Our Story &amp; Philosophy
                </Link>
              </li>
              <li>
                <Link
                  to="/experience"
                  className="text-stone-400 hover:text-terracotta-400 transition-colors"
                >
                  The 4 Experiences
                </Link>
              </li>
              <li>
                <Link
                  to="/menu"
                  className="text-stone-400 hover:text-terracotta-400 transition-colors"
                >
                  Food &amp; Drinks Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-stone-400 hover:text-terracotta-400 transition-colors"
                >
                  Editorial Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-stone-400 hover:text-terracotta-400 transition-colors"
                >
                  Live Gigs &amp; Acoustic Calendar
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Actions & Hospitality (Col span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-stone-100 font-semibold font-sans">
              Reservations &amp; Orders
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-light">
              <li>
                <Link
                  to="/reservation"
                  className="text-stone-400 hover:text-terracotta-400 transition-colors flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-terracotta-400" />
                  <span>Reserve a Table</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={onOpenOrder}
                  className="text-stone-400 hover:text-terracotta-400 transition-colors flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-terracotta-400" />
                  <span>Order Online</span>
                </button>
              </li>
              <li>
                <Link
                  to="/private-dining"
                  className="text-stone-400 hover:text-terracotta-400 transition-colors"
                >
                  Private Gatherings
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-stone-400 hover:text-terracotta-400 transition-colors"
                >
                  Location &amp; Map
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="text-stone-500 hover:text-stone-300 transition-colors text-xs"
                >
                  Staff Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Contact Info (Col span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-stone-100 font-semibold font-sans">
              Contact &amp; Address
            </h4>
            <div className="space-y-3 text-xs leading-relaxed text-stone-400 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-terracotta-400 shrink-0 mt-0.5" />
                <span>Level 2, Goldfinch Hotel, MIDC Central Rd, Chakala, Andheri East, Mumbai 400093</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-olive-400 shrink-0" />
                <span>12:00 PM – 01:30 AM Daily</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-terracotta-400 shrink-0" />
                <a href="tel:+919892283330" className="hover:text-stone-100 transition-colors">
                  +91 98922 83330
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                <span>reservations@aurelmumbai.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup Strip with Live Backend Connection */}
        <div className="border-y border-stone-800/80 py-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-lg text-stone-100 font-medium">
              Join the Aurel Mumbai Insider Society
            </h4>
            <p className="text-xs text-stone-400 font-sans mt-0.5">
              Receive secret sunset invitations, seasonal tasting menus, and guest artist line-ups.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center w-full md:w-auto max-w-md gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              disabled={submitting}
              className="bg-charcoal-900 border border-stone-700 text-stone-100 placeholder-stone-500 text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-terracotta-500 flex-1 md:w-72 font-sans"
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-terracotta-500 hover:bg-terracotta-600 text-stone-50 text-xs uppercase tracking-wider font-semibold px-5 py-3 rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
            >
              {submitting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : subscribed ? (
                <Check className="w-4 h-4" />
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
        </div>

        {/* Bottom Copyright & Hospitality Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-sans gap-4">
          <div>
            &copy; {new Date().getFullYear()} Aurel Bar &amp; Kitchen, Mumbai. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <span>Valet Parking Available</span>
            <span>&bull;</span>
            <span>Goldfinch Hospitality</span>
            <span>&bull;</span>
            <Link to="/contact" className="hover:text-stone-300 transition-colors">
              Dress Code &amp; Policies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
