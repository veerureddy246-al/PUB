import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, ShoppingBag, MapPin, Clock, Phone, ChevronDown } from 'lucide-react';
import Button from '../common/Button';

export const Navbar = ({ onOpenOrder }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Desktop Dropdown States
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [galleryDropdownOpen, setGalleryDropdownOpen] = useState(false);
  
  // Mobile Dropdown States
  const [mobileMenuDropdownOpen, setMobileMenuDropdownOpen] = useState(false);
  const [mobileGalleryDropdownOpen, setMobileGalleryDropdownOpen] = useState(false);
  
  const menuDropdownRef = useRef(null);
  const galleryDropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuDropdownRef.current && !menuDropdownRef.current.contains(event.target)) {
        setMenuDropdownOpen(false);
      }
      if (galleryDropdownRef.current && !galleryDropdownRef.current.contains(event.target)) {
        setGalleryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/our-story', label: 'Our Story' },
    { to: '/menu', label: 'Menu', isDropdown: 'menu' },
    { to: '/gallery', label: 'Gallery', isDropdown: 'gallery' },
    { to: '/events', label: 'Events' },
    { to: '/contact', label: 'Contact' },
  ];

  const handleLinkClick = (targetPath) => {
    setMobileMenuOpen(false);
    setMenuDropdownOpen(false);
    setGalleryDropdownOpen(false);
    setMobileMenuDropdownOpen(false);
    setMobileGalleryDropdownOpen(false);
    // Explicitly guarantee instant scroll reset to top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  // Active state calculations
  const isMenuActive = location.pathname === '/menu' || location.pathname.startsWith('/menu');
  const isFoodActive = location.pathname === '/menu' && (location.search.includes('food') || (!location.search.includes('drinks') && !location.search.includes('Cocktails')));
  const isDrinksActive = location.pathname === '/menu' && (location.search.includes('drinks') || location.search.includes('Cocktails'));

  const isGalleryActive = location.pathname === '/gallery' || location.pathname.startsWith('/gallery');
  const isAmbienceActive = location.pathname === '/gallery' && (location.search.includes('ambience') || location.search.includes('Ambience'));
  const isFoodDrinkActive = location.pathname === '/gallery' && (location.search.includes('food-drink') || location.search.includes('food') || location.search.includes('drinks'));

  return (
    <>
      {/* 
        FIXED LUXURY NAVBAR SYSTEM
        Always remains fixed at the top of the viewport across all pages and viewports (desktop, tablet, mobile).
      */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-charcoal-950/95 backdrop-blur-md border-b border-stone-800/90 shadow-lg'
            : 'bg-gradient-to-b from-charcoal-950/95 via-charcoal-950/80 to-charcoal-950/40 backdrop-blur-sm border-b border-stone-800/30'
        }`}
      >
        {/* Top Location & Timing Info Strip (Collapses smoothly on scroll) */}
        <div
          className={`bg-charcoal-950/90 border-b border-stone-800/50 px-4 text-xs font-sans text-stone-300 hidden md:block transition-all duration-300 overflow-hidden ${
            isScrolled ? 'max-h-0 opacity-0 py-0 border-transparent' : 'max-h-10 opacity-100 py-1'
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-stone-300 text-[11px]">
                <MapPin className="w-3 h-3 text-terracotta-400" />
                Level 2, Goldfinch Hotel, MIDC Central Road, Andheri East, Mumbai
              </span>
              <span className="flex items-center gap-1.5 text-stone-300 text-[11px]">
                <Clock className="w-3 h-3 text-olive-400" />
                Open Daily: 12:00 PM – 01:30 AM
              </span>
            </div>

            <div className="flex items-center gap-5 text-[11px]">
              <a
                href="tel:+919892283330"
                className="flex items-center gap-1 text-stone-300 hover:text-terracotta-400 transition-colors"
              >
                <Phone className="w-3 h-3 text-terracotta-400" />
                +91 98922 83330
              </a>
              <Link
                to="/admin"
                onClick={() => handleLinkClick('/admin')}
                className="uppercase tracking-widest text-[10px] text-stone-400 hover:text-stone-200 border-l border-stone-800 pl-4 transition-colors"
              >
                Staff Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between gap-4 transition-all duration-300">
          
          {/* LEFT: Logo / Wordmark (Aurel Mumbai Branding) */}
          <Link
            to="/"
            onClick={() => handleLinkClick('/')}
            className="flex flex-col items-start text-left group focus:outline-none shrink-0 leading-none gap-[3px]"
            aria-label="Aurel — Mumbai Rooftop Bar & Kitchen"
          >
            {/* Brand wordmark */}
            <span
              className="font-serif text-[26px] sm:text-[30px] text-stone-100 group-hover:text-stone-50 transition-colors font-normal tracking-[0.06em] leading-none"
              style={{ letterSpacing: '0.06em' }}
            >
              AUREL
            </span>
            {/* Location — separate, smaller */}
            <span className="font-sans text-[10.5px] text-stone-400 tracking-[0.2em] uppercase font-medium leading-none">
              MUMBAI
            </span>
            {/* Category — tertiary, smallest */}
            <span className="font-sans text-[8.5px] text-stone-500 tracking-[0.18em] uppercase font-normal leading-none hidden sm:block">
              BAR &amp; KITCHEN &bull; ROOFTOP
            </span>
          </Link>

          {/* CENTER: Dedicated Route Navigation Links with Dropdowns for MENU & GALLERY */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              // MENU DROPDOWN
              if (link.isDropdown === 'menu') {
                return (
                  <div
                    key={link.to}
                    ref={menuDropdownRef}
                    className="relative"
                    onMouseEnter={() => setMenuDropdownOpen(true)}
                    onMouseLeave={() => setMenuDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        navigate('/menu?type=food');
                        handleLinkClick('/menu?type=food');
                      }}
                      className={`text-xs uppercase tracking-luxury font-medium font-sans transition-all relative py-1 focus:outline-none flex items-center gap-1 ${
                        isMenuActive
                          ? 'text-terracotta-300 font-semibold after:content-[""] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-terracotta-400 after:rounded-full'
                          : 'text-stone-300 hover:text-stone-50'
                      }`}
                      aria-expanded={menuDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{link.label}</span>
                    </button>

                    {/* MENU DROPDOWN (ONLY TWO OPTIONS: FOOD MENU, DRINKS MENU) */}
                    {menuDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-fade-in">
                        <div className="w-36 bg-charcoal-900/98 backdrop-blur-xl border border-stone-800/90 rounded-xl p-1 shadow-2xl overflow-hidden">
                          <Link
                            to="/menu?type=food"
                            onClick={() => handleLinkClick('/menu?type=food')}
                            className={`block w-full text-left text-[11px] uppercase tracking-wider font-semibold font-sans px-3.5 py-2.5 rounded-lg transition-colors ${
                              isFoodActive
                                ? 'text-terracotta-300 bg-charcoal-800/90 font-bold'
                                : 'text-stone-300 hover:text-stone-100 hover:bg-charcoal-800/60'
                            }`}
                          >
                            Food Menu
                          </Link>
                          <Link
                            to="/menu?type=drinks"
                            onClick={() => handleLinkClick('/menu?type=drinks')}
                            className={`block w-full text-left text-[11px] uppercase tracking-wider font-semibold font-sans px-3.5 py-2.5 rounded-lg transition-colors ${
                              isDrinksActive
                                ? 'text-terracotta-300 bg-charcoal-800/90 font-bold'
                                : 'text-stone-300 hover:text-stone-100 hover:bg-charcoal-800/60'
                            }`}
                          >
                            Drinks Menu
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              // GALLERY DROPDOWN
              if (link.isDropdown === 'gallery') {
                return (
                  <div
                    key={link.to}
                    ref={galleryDropdownRef}
                    className="relative"
                    onMouseEnter={() => setGalleryDropdownOpen(true)}
                    onMouseLeave={() => setGalleryDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        navigate('/gallery?type=ambience');
                        handleLinkClick('/gallery?type=ambience');
                      }}
                      className={`text-xs uppercase tracking-luxury font-medium font-sans transition-all relative py-1 focus:outline-none flex items-center gap-1 ${
                        isGalleryActive
                          ? 'text-terracotta-300 font-semibold after:content-[""] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-terracotta-400 after:rounded-full'
                          : 'text-stone-300 hover:text-stone-50'
                      }`}
                      aria-expanded={galleryDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{link.label}</span>
                    </button>

                    {/* GALLERY DROPDOWN (ONLY TWO OPTIONS: AMBIENCE, FOOD & DRINK) */}
                    {galleryDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-fade-in">
                        <div className="w-36 bg-charcoal-900/98 backdrop-blur-xl border border-stone-800/90 rounded-xl p-1 shadow-2xl overflow-hidden">
                          <Link
                            to="/gallery?type=ambience"
                            onClick={() => handleLinkClick('/gallery?type=ambience')}
                            className={`block w-full text-left text-[11px] uppercase tracking-wider font-semibold font-sans px-3.5 py-2.5 rounded-lg transition-colors ${
                              isAmbienceActive
                                ? 'text-terracotta-300 bg-charcoal-800/90 font-bold'
                                : 'text-stone-300 hover:text-stone-100 hover:bg-charcoal-800/60'
                            }`}
                          >
                            Ambience
                          </Link>
                          <Link
                            to="/gallery?type=food-drink"
                            onClick={() => handleLinkClick('/gallery?type=food-drink')}
                            className={`block w-full text-left text-[11px] uppercase tracking-wider font-semibold font-sans px-3.5 py-2.5 rounded-lg transition-colors ${
                              isFoodDrinkActive
                                ? 'text-terracotta-300 bg-charcoal-800/90 font-bold'
                                : 'text-stone-300 hover:text-stone-100 hover:bg-charcoal-800/60'
                            }`}
                          >
                            Food &amp; Drink
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => handleLinkClick(link.to)}
                  className={({ isActive }) =>
                    `text-xs uppercase tracking-luxury font-medium font-sans transition-all relative py-1 focus:outline-none ${
                      isActive
                        ? 'text-terracotta-300 font-semibold after:content-[""] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-terracotta-400 after:rounded-full'
                        : 'text-stone-300 hover:text-stone-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* RIGHT: CTAs (Reserve a Table + Order Online) */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Order Online CTA */}
            <button
              onClick={onOpenOrder}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold font-sans text-stone-200 bg-charcoal-900/90 hover:bg-charcoal-800 border border-stone-700/80 hover:border-stone-500 transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-terracotta-400" />
              <span>Order Online</span>
            </button>

            {/* Reserve a Table CTA -> Dedicated /reservation Route */}
            <Link
              to="/reservation"
              onClick={() => handleLinkClick('/reservation')}
              className="hidden sm:inline-flex items-center justify-center font-sans font-semibold transition-all duration-300 rounded-lg focus:outline-none select-none tracking-luxury uppercase text-xs px-4 py-2 text-[11px] gap-1.5 bg-terracotta-500 text-stone-50 hover:bg-terracotta-600 shadow-md hover:shadow-glow-terracotta active:scale-[0.99]"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>Reserve a Table</span>
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-charcoal-900 text-stone-200 hover:text-stone-100 border border-stone-700/80 focus:outline-none transition-colors"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer / Full Screen Menu (Higher z-index than navbar) */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-[60] bg-charcoal-950/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 animate-fade-in overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Row with Logo & Close */}
          <div className="flex items-center justify-between pb-6 border-b border-stone-800">
            <Link 
              to="/" 
              onClick={() => handleLinkClick('/')}
              className="flex flex-col items-start leading-none gap-[3px]"
            >
              {/* Brand wordmark */}
              <span className="font-serif text-[26px] text-stone-100 font-normal tracking-[0.06em] leading-none">
                AUREL
              </span>
              {/* Location */}
              <span className="font-sans text-[11px] text-stone-400 tracking-[0.2em] uppercase font-medium leading-none">
                MUMBAI
              </span>
              {/* Category */}
              <span className="font-sans text-[8px] text-stone-500 tracking-[0.18em] uppercase font-normal leading-none">
                BAR &amp; KITCHEN &bull; ROOFTOP
              </span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-charcoal-900 text-stone-300 border border-stone-800 hover:text-stone-100"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links with Mobile Dropdowns for Menu and Gallery */}
          <div className="flex flex-col gap-2 py-6 my-auto">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-sans font-bold mb-2">
              Navigation &amp; Experiences
            </span>
            {navLinks.map((link) => {
              // Mobile MENU Dropdown
              if (link.isDropdown === 'menu') {
                return (
                  <div key={link.to} className="border-b border-stone-900 py-1">
                    <div
                      onClick={() => setMobileMenuDropdownOpen(!mobileMenuDropdownOpen)}
                      className={`flex items-center justify-between font-serif text-2xl sm:text-3xl py-2 cursor-pointer transition-colors ${
                        isMenuActive ? 'text-terracotta-400 font-medium pl-2' : 'text-stone-200 hover:text-terracotta-400'
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className={`text-xs font-sans text-stone-400 transition-transform ${mobileMenuDropdownOpen ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </div>

                    {/* Mobile Menu Dropdown: ONLY TWO OPTIONS */}
                    {mobileMenuDropdownOpen && (
                      <div className="pl-4 pb-2 space-y-2 flex flex-col pt-1">
                        <Link
                          to="/menu?type=food"
                          onClick={() => handleLinkClick('/menu?type=food')}
                          className={`text-sm font-sans uppercase tracking-wider py-1.5 transition-colors ${
                            isFoodActive
                              ? 'text-terracotta-300 font-semibold pl-1'
                              : 'text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          Food Menu
                        </Link>
                        <Link
                          to="/menu?type=drinks"
                          onClick={() => handleLinkClick('/menu?type=drinks')}
                          className={`text-sm font-sans uppercase tracking-wider py-1.5 transition-colors ${
                            isDrinksActive
                              ? 'text-terracotta-300 font-semibold pl-1'
                              : 'text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          Drinks Menu
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

              // Mobile GALLERY Dropdown
              if (link.isDropdown === 'gallery') {
                return (
                  <div key={link.to} className="border-b border-stone-900 py-1">
                    <div
                      onClick={() => setMobileGalleryDropdownOpen(!mobileGalleryDropdownOpen)}
                      className={`flex items-center justify-between font-serif text-2xl sm:text-3xl py-2 cursor-pointer transition-colors ${
                        isGalleryActive ? 'text-terracotta-400 font-medium pl-2' : 'text-stone-200 hover:text-terracotta-400'
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className={`text-xs font-sans text-stone-400 transition-transform ${mobileGalleryDropdownOpen ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </div>

                    {/* Mobile Gallery Dropdown: ONLY TWO OPTIONS */}
                    {mobileGalleryDropdownOpen && (
                      <div className="pl-4 pb-2 space-y-2 flex flex-col pt-1">
                        <Link
                          to="/gallery?type=ambience"
                          onClick={() => handleLinkClick('/gallery?type=ambience')}
                          className={`text-sm font-sans uppercase tracking-wider py-1.5 transition-colors ${
                            isAmbienceActive
                              ? 'text-terracotta-300 font-semibold pl-1'
                              : 'text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          Ambience
                        </Link>
                        <Link
                          to="/gallery?type=food-drink"
                          onClick={() => handleLinkClick('/gallery?type=food-drink')}
                          className={`text-sm font-sans uppercase tracking-wider py-1.5 transition-colors ${
                            isFoodDrinkActive
                              ? 'text-terracotta-300 font-semibold pl-1'
                              : 'text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          Food &amp; Drink
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => handleLinkClick(link.to)}
                  className={({ isActive }) =>
                    `text-left font-serif text-2xl sm:text-3xl py-2.5 transition-colors border-b border-stone-900 flex items-center justify-between group ${
                      isActive ? 'text-terracotta-400 font-medium pl-2' : 'text-stone-200 hover:text-terracotta-400'
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <span className="text-sm font-sans text-stone-500 group-hover:text-terracotta-400 transition-colors">→</span>
                </NavLink>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col gap-3 pt-6 border-t border-stone-800">
            <Link
              to="/reservation"
              onClick={() => handleLinkClick('/reservation')}
              className="w-full py-3.5 px-4 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-stone-50 text-xs uppercase tracking-wider font-semibold font-sans flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrder();
              }}
              className="w-full py-3 px-4 rounded-xl bg-charcoal-900 border border-stone-700 text-stone-200 hover:text-stone-100 text-xs uppercase tracking-wider font-semibold font-sans flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-terracotta-400" />
              <span>Order Online (Takeaway &amp; Delivery)</span>
            </button>

            <div className="text-center text-xs text-stone-400 font-sans mt-2">
              Level 2, Goldfinch Hotel, Andheri East • Tel: +91 98922 83330
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
