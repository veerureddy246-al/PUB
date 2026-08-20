import React from 'react';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import { ArrowRight, Flame, Music, UtensilsCrossed } from 'lucide-react';

export const PhilosophySection = ({ onNavigate }) => {
  return (
    <section className="py-24 bg-charcoal-900 border-t border-stone-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden border border-stone-700/80 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1000&q=80"
                alt="1522 Mumbai Rooftop Dining and Cocktails"
                className="w-full h-[450px] object-cover object-center filter contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-charcoal-900/90 border border-stone-700/80 backdrop-blur-md">
                <span className="text-[10px] uppercase tracking-widest text-terracotta-400 font-bold block mb-1">
                  The Goldfinch Sanctuary • Level 2
                </span>
                <p className="font-serif text-base text-stone-100 italic">
                  "Where classic rock soul embraces high-altitude culinary craftsmanship."
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              align="left"
              badge="Our Story & Philosophy"
              title="A Mumbai Rooftop Icon Born From Passion & Rhythm"
              subtitle="From our legendary roots in vintage rock and welcoming hospitality, 1522 Bar & Kitchen has blossomed into one of Mumbai's most sought-after open-sky rooftop destinations."
            />

            <div className="space-y-4 text-stone-300 text-sm sm:text-base font-sans font-light leading-relaxed">
              <p>
                Perched on Level 2 of the distinguished Goldfinch Hotel in Chakala, Andheri East, 1522 was designed as an antidote to claustrophobic nightlife. Here, sweeping sea-breezes meet warm wooden textures, lush cascading greenery, and candle-lit pergolas.
              </p>
              <p>
                Our culinary philosophy honors heritage flavors with contemporary finesse—bringing together authentic Mangalorean Ghee Roasts, artisanal sourdough pizzas, wok-tossed Asian tapas, and molecular cocktails smoked over applewood embers.
              </p>
            </div>

            {/* Three Pillar Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-800">
              <div className="space-y-1.5">
                <div className="text-terracotta-400 font-serif text-2xl font-bold">01</div>
                <h4 className="text-xs font-sans uppercase tracking-wider font-semibold text-stone-100">
                  Open-Air Sky Deck
                </h4>
                <p className="text-[11px] text-stone-400 font-sans">
                  Panoramic night sky seating and vibrant energy.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-terracotta-400 font-serif text-2xl font-bold">02</div>
                <h4 className="text-xs font-sans uppercase tracking-wider font-semibold text-stone-100">
                  Curated Libations
                </h4>
                <p className="text-[11px] text-stone-400 font-sans">
                  Over 35 bespoke signature mixes and rare single malts.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-terracotta-400 font-serif text-2xl font-bold">03</div>
                <h4 className="text-xs font-sans uppercase tracking-wider font-semibold text-stone-100">
                  Live Rhythm & Soul
                </h4>
                <p className="text-[11px] text-stone-400 font-sans">
                  Acoustic Fridays, deep sundowner sets, and rock vinyls.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Button
                variant="outline"
                size="md"
                onClick={() => onNavigate('experience')}
                icon={ArrowRight}
                iconPosition="right"
              >
                Explore The Rooftop Decks
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
