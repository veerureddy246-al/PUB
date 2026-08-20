import React from 'react';
import PrivateDiningSection from '../sections/PrivateDiningSection';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import { Users, Wine, UtensilsCrossed, ShieldCheck, Sparkles, Phone, Mail } from 'lucide-react';

export const PrivateDiningPage = () => {
  return (
    <div className="pt-28 pb-24 bg-charcoal-950 text-stone-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-terracotta-500/60 inline-block" />
            <span className="text-[11px] font-sans font-semibold tracking-widest text-terracotta-400 uppercase">
              Exclusive Buyouts & Corporate Hospitality
            </span>
            <span className="w-6 h-px bg-terracotta-500/60 inline-block" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-stone-100 font-normal leading-tight mb-4">
            Private Gatherings & Celebrations
          </h1>

          <p className="text-stone-300 text-sm sm:text-base font-sans font-light leading-relaxed">
            Host milestone birthdays, executive corporate mixers, brand launches, and cocktail evenings across our open-air decks and botanical lounges for 20 to 150 guests.
          </p>
        </div>

        {/* Curation highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-charcoal-900 p-6 rounded-2xl border border-stone-800 text-left space-y-2">
            <Users className="w-6 h-6 text-terracotta-400" />
            <h4 className="font-serif text-lg text-stone-100 font-medium">20 to 150 Guests</h4>
            <p className="text-xs text-stone-400 font-sans">Tailored zones, from private cabana pods to full rooftop buyouts.</p>
          </div>

          <div className="bg-charcoal-900 p-6 rounded-2xl border border-stone-800 text-left space-y-2">
            <Wine className="w-6 h-6 text-terracotta-400" />
            <h4 className="font-serif text-lg text-stone-100 font-medium">Craft Bar Menus</h4>
            <p className="text-xs text-stone-400 font-sans">Personalized cocktail naming, sommelier wine curation & live mixologist counter.</p>
          </div>

          <div className="bg-charcoal-900 p-6 rounded-2xl border border-stone-800 text-left space-y-2">
            <UtensilsCrossed className="w-6 h-6 text-terracotta-400" />
            <h4 className="font-serif text-lg text-stone-100 font-medium">Live Cooking Grills</h4>
            <p className="text-xs text-stone-400 font-sans">Pass-around coastal tandoor bites, wood-fired pizzas and artisanal dessert carts.</p>
          </div>

          <div className="bg-charcoal-900 p-6 rounded-2xl border border-stone-800 text-left space-y-2">
            <ShieldCheck className="w-6 h-6 text-terracotta-400" />
            <h4 className="font-serif text-lg text-stone-100 font-medium">Goldfinch Hotel Amenities</h4>
            <p className="text-xs text-stone-400 font-sans">Dedicated hotel valet parking, luxury elevator foyer, and high-speed Wi-Fi & AV.</p>
          </div>
        </div>

        {/* Main interactive quote section */}
        <PrivateDiningSection />
      </div>
    </div>
  );
};

export default PrivateDiningPage;
