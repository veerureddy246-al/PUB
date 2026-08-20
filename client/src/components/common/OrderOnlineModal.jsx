import React, { useEffect } from 'react';
import { X, ShoppingBag, Phone, ExternalLink, Utensils, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import Button from './Button';

export const OrderOnlineModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1500] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-charcoal-950/85 backdrop-blur-xl animate-fade-in">
      <div 
        className="relative w-full max-w-xl bg-charcoal-900 border border-stone-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl animate-slide-up my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-charcoal-800 text-stone-400 hover:text-stone-100 hover:bg-charcoal-700 border border-stone-700/80 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-md mx-auto mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-terracotta-500/15 border border-terracotta-500/30 text-terracotta-400 mb-3">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-terracotta-400 font-sans font-bold block mb-1">
            Gourmet Takeaway & Delivery
          </span>
          <h3 id="order-modal-title" className="font-serif text-2xl sm:text-3xl text-stone-100 font-normal">
            Order From 1522 Mumbai
          </h3>
          <p className="text-stone-400 text-xs sm:text-sm font-sans mt-2">
            Enjoy our wood-fired pizzas, Kundapur ghee roasts, and signature dishes packaged hot and fresh from Goldfinch Hotel.
          </p>
        </div>

        {/* Options Grid */}
        <div className="space-y-4">
          {/* Direct Concierge Takeaway */}
          <div className="p-4 rounded-2xl bg-charcoal-850 border border-stone-700/70 hover:border-terracotta-500/50 transition-all">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400 uppercase tracking-wider">
                    Direct Kitchen
                  </span>
                  <h4 className="font-serif text-base text-stone-100">
                    Direct Hotel Takeaway / Curbside Pick-up
                  </h4>
                </div>
                <p className="text-stone-400 text-xs font-sans mt-1">
                  Call our chef desk directly for special customized platters, large family orders & zero platform markups.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-stone-300 font-sans flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-terracotta-400" /> Ready in 20–30 mins
              </span>
              <a
                href="tel:+919892283330"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-stone-50 text-xs font-sans font-semibold transition-colors"
              >
                <Phone className="w-3.5 h-3.5" /> Call: +91 98922 83330
              </a>
            </div>
          </div>

          {/* Delivery Platforms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Zomato */}
            <a
              href="https://www.zomato.com/mumbai/1522-bar-and-kitchen-andheri-east"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-charcoal-850 border border-stone-800 hover:border-stone-600 flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center font-bold text-red-400 text-sm font-sans">
                  Z
                </div>
                <div>
                  <span className="font-medium text-stone-100 text-sm block group-hover:text-terracotta-400 transition-colors">
                    Order via Zomato
                  </span>
                  <span className="text-[10px] text-stone-400 font-sans">Rating 4.4 ★ • 35-45 mins</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-stone-500 group-hover:text-stone-300 transition-colors" />
            </a>

            {/* Swiggy */}
            <a
              href="https://www.swiggy.com/city/mumbai/1522-bar-and-kitchen-andheri-east"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-charcoal-850 border border-stone-800 hover:border-stone-600 flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-600/20 border border-orange-500/30 flex items-center justify-center font-bold text-orange-400 text-sm font-sans">
                  S
                </div>
                <div>
                  <span className="font-medium text-stone-100 text-sm block group-hover:text-terracotta-400 transition-colors">
                    Order via Swiggy
                  </span>
                  <span className="text-[10px] text-stone-400 font-sans">Live tracking • Express</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-stone-500 group-hover:text-stone-300 transition-colors" />
            </a>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-stone-800/80 text-center">
          <p className="text-[11px] text-stone-400 font-sans">
            Delivery available 12:00 PM – 01:00 AM daily across Andheri East, Powai, Vile Parle & MIDC.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderOnlineModal;
