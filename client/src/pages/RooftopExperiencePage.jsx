import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeckExperienceSection from '../sections/DeckExperienceSection';
import PhilosophySection from '../sections/PhilosophySection';
import Button from '../components/common/Button';
import { Calendar, Sun, CloudMoon, Clock, ShieldCheck, MapPin } from 'lucide-react';

export const RooftopExperiencePage = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-24 bg-charcoal-950 text-stone-100">
      {/* Hero Header */}
      <div className="relative py-20 bg-charcoal-900 border-b border-stone-800 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C36B4E_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <span className="text-[11px] uppercase tracking-widest text-terracotta-400 font-sans font-bold block mb-3">
            Open-Air Sanctuary • Level 2 Goldfinch Hotel
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-stone-100 font-normal mb-6 leading-tight">
            The Aurel Rooftop Atmosphere
          </h1>
          <p className="text-stone-300 text-base sm:text-lg font-sans font-light leading-relaxed max-w-2xl mx-auto mb-8">
            Experience Mumbai from a higher perspective. Four curated zones designed for high-energy weekend nights, intimate romantic sunsets, and leisurely botanical brunches.
          </p>

          <Button
            variant="primary"
            size="lg"
            icon={Calendar}
            onClick={() => navigate('/reservation')}
          >
            Reserve Your Preferred Deck
          </Button>
        </div>
      </div>

      {/* Main Deck Visualizer */}
      <DeckExperienceSection />

      {/* Ambiance Insights Strip */}
      <div className="py-20 bg-charcoal-900 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-charcoal-850 p-8 rounded-2xl border border-stone-800 space-y-3">
              <Sun className="w-8 h-8 text-terracotta-400" />
              <h3 className="font-serif text-xl text-stone-100 font-normal">
                Golden Hour & Sundowners
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 font-sans leading-relaxed">
                Between 05:30 PM and 07:30 PM, the Mumbai sky transforms into hues of amber and violet. Sip our signature Jamun Gin Fizz as the evening cools down.
              </p>
            </div>

            <div className="bg-charcoal-850 p-8 rounded-2xl border border-stone-800 space-y-3">
              <CloudMoon className="w-8 h-8 text-terracotta-400" />
              <h3 className="font-serif text-xl text-stone-100 font-normal">
                Midnight Skyline & Beats
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 font-sans leading-relaxed">
                After 09:30 PM, the energy elevates on the Upper Sky Deck. Live percussion, guest DJs, and vibrant nightlife under ambient terrace lighting.
              </p>
            </div>

            <div className="bg-charcoal-850 p-8 rounded-2xl border border-stone-800 space-y-3">
              <ShieldCheck className="w-8 h-8 text-terracotta-400" />
              <h3 className="font-serif text-xl text-stone-100 font-normal">
                Five-Star Hospitality
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 font-sans leading-relaxed">
                Goldfinch Hotel security, attentive service captains, dedicated valet parking, and seamless contactless table bill settlements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RooftopExperiencePage;
