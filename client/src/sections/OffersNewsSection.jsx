import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, Clock, Calendar, Sparkles, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import Button from '../components/common/Button';
import { useReservationModal } from '../context/ReservationContext';
import { offerService } from '../services/api';

export const OffersNewsSection = () => {
  const navigate = useNavigate();
  const { openReservation } = useReservationModal();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await offerService.getOffers();
        setOffers(data || []);
      } catch (err) {
        console.warn('Failed to load offers from server:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  return (
    <section className="py-24 sm:py-32 bg-charcoal-900 border-t border-stone-800/80 text-stone-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-charcoal-800 border border-stone-700/80 text-terracotta-400 text-[10px] font-sans font-bold uppercase tracking-widest mb-3">
            <Tag className="w-3 h-3" />
            Seasonal Specials & Weekly Rituals
          </div>
          <h2 className="headline-section text-stone-100 font-normal">
            Curated Experiences & News
          </h2>
          <p className="text-stone-400 text-sm sm:text-base font-sans font-light mt-3 leading-relaxed">
            Discover our signature rooftop sunset hours, weekend acoustic brunches, and bespoke group packages at Goldfinch Hotel.
          </p>
        </div>

        {/* Offers Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 bg-charcoal-950/80 rounded-3xl border border-stone-800" />
            ))}
          </div>
        ) : offers.length === 0 ? (
          <div className="text-center py-16 bg-charcoal-950/60 rounded-3xl border border-stone-800">
            <p className="text-stone-400 text-sm font-sans">No active seasonal offers right now. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offers.map((offer, idx) => (
              <div
                key={offer._id || offer.title || idx}
                className="bg-charcoal-950/80 border border-stone-800/90 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-terracotta-500/50 transition-all duration-300 group shadow-2xl backdrop-blur-sm"
              >
                <div className="space-y-4">
                  {/* Top Type & Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-sans uppercase tracking-widest text-terracotta-400 font-bold">
                      {offer.badge || 'Active Ritual'}
                    </span>
                    <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      Live
                    </span>
                  </div>

                  {/* Offer Title & Subtitle */}
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-stone-100 font-normal group-hover:text-terracotta-300 transition-colors">
                      {offer.title}
                    </h3>
                    {offer.subtitle && (
                      <p className="text-stone-300 text-xs sm:text-sm font-sans font-medium mt-1">
                        {offer.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Timing */}
                  {offer.timing && (
                    <div className="flex items-center gap-2 text-xs text-stone-400 font-sans bg-charcoal-900 p-2.5 rounded-xl border border-stone-800">
                      <Clock className="w-3.5 h-3.5 text-terracotta-400 shrink-0" />
                      <span>{offer.timing}</span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-stone-400 text-xs font-sans font-light leading-relaxed">
                    {offer.description}
                  </p>

                  {/* Terms / Note */}
                  {offer.terms && (
                    <p className="text-[11px] text-stone-500 font-sans italic border-t border-stone-800/80 pt-3">
                      * {offer.terms}
                    </p>
                  )}
                </div>

                {/* Action Button */}
                <div className="pt-6">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      if (offer.title.toLowerCase().includes('corporate') || offer.title.toLowerCase().includes('buyout')) {
                        navigate('/private-dining');
                      } else {
                        navigate('/reservation');
                      }
                    }}
                    className="w-full justify-center text-xs uppercase tracking-wider font-semibold"
                  >
                    Reserve Table for Experience
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OffersNewsSection;
