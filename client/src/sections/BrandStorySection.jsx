import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Flame, Music, UtensilsCrossed, Wine, Compass, Sparkles } from 'lucide-react';
import Button from '../components/common/Button';

export const BrandStorySection = () => {
  const navigate = useNavigate();
  return (
    <section id="story" className="py-24 sm:py-32 bg-charcoal-900 border-t border-stone-800/80 relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-terracotta-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Multi-layer Editorial Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden border border-stone-700/80 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80"
                alt="1522 Mumbai Rooftop Experience and Architecture"
                className="w-full h-[420px] sm:h-[500px] object-cover object-center img-editorial filter contrast-[1.08] brightness-[0.92]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/95 via-charcoal-950/30 to-transparent" />

              {/* Bottom Editorial Caption */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-charcoal-900/90 border border-stone-700/80 backdrop-blur-md">
                <span className="text-[10px] uppercase tracking-widest text-terracotta-400 font-bold block mb-1 font-sans">
                  The Goldfinch Sanctuary • Level 2, Andheri East
                </span>
                <p className="font-serif text-sm sm:text-base text-stone-100 italic leading-snug">
                  "Where vintage rock spirit embraces high-altitude culinary craftsmanship."
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-charcoal-800 border border-stone-700/80 text-terracotta-400 text-[10px] font-sans font-bold uppercase tracking-widest mb-4">
                <Compass className="w-3 h-3" />
                Our Story & Philosophy
              </div>

              {/* Large Headline */}
              <h2 className="headline-section text-stone-100 font-normal">
                Born From Rhythm, <br />
                <span className="italic font-light text-terracotta-300">Crafted for Mumbai’s Skyline</span>
              </h2>
            </div>

            {/* Narrative text */}
            <div className="space-y-4 text-stone-300 text-sm sm:text-base font-sans font-light leading-relaxed">
              <p>
                Established with a passion for soulful classic rock and generous hospitality, <strong className="text-stone-100 font-semibold">1522 Bar & Kitchen</strong> has evolved into one of Mumbai's most iconic open-air rooftop sanctuaries.
              </p>
              <p>
                Perched high on Level 2 of the Goldfinch Hotel in Chakala, Andheri East, 1522 offers a welcoming breath of fresh air amidst the rapid pulse of the city. Here, sweeping evening breezes meet warm wooden decks, lush cascading botanical ivy, and softly glowing candlelit pergolas.
              </p>
              <p>
                Our menu is an homage to authentic coastal provenance blended with contemporary global flair—from fiery Mangalorean Ghee Roasts and 48-hour fermented sourdough pizzas to applewood-smoked bourbon cocktails and artisanal botanicals.
              </p>
            </div>

            {/* Editorial Feature Pillars (Not generic cards, clean typography split) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-800">
              <div className="space-y-1">
                <span className="text-terracotta-400 font-serif text-lg font-bold">01. The Atmosphere</span>
                <h4 className="text-xs font-sans uppercase tracking-wider font-semibold text-stone-200">
                  Open-Air Sky Decks
                </h4>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  Panoramic night sky views, intimate sunset cabanas, and breezy botanical pergolas.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-terracotta-400 font-serif text-lg font-bold">02. The Culinary Soul</span>
                <h4 className="text-xs font-sans uppercase tracking-wider font-semibold text-stone-200">
                  Coastal Craft & Tandoor
                </h4>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  Stone-ground Kundapur spices, wood-fired artisanal pizzas, and wok-tossed Asian tapas.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-terracotta-400 font-serif text-lg font-bold">03. The Mixology</span>
                <h4 className="text-xs font-sans uppercase tracking-wider font-semibold text-stone-200">
                  Smoked Spirits & Gin Lab
                </h4>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  35+ bespoke concoctions, indigenous infusions, and rare single malt selections.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-terracotta-400 font-serif text-lg font-bold">04. The Sound</span>
                <h4 className="text-xs font-sans uppercase tracking-wider font-semibold text-stone-200">
                  Live Acoustic & Deep Beats
                </h4>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  Acoustic Friday sundowners, Latin jazz brunches, and vinyl rock sessions.
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2">
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/experience')}
                icon={ArrowRight}
                iconPosition="right"
                className="border-stone-700 hover:border-terracotta-500 hover:text-terracotta-300"
              >
                Discover The 4 Experiences
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStorySection;
