import React, { useState } from 'react';
import { UtensilsCrossed, Wine, CloudMoon, Music2, ArrowUpRight, Sparkles } from 'lucide-react';
import { useReservationModal } from '../context/ReservationContext';

const experiences = [
  {
    id: 'dining',
    tag: 'EXPERIENCE 01',
    title: 'DINING',
    subtitle: 'Coastal Provenance & Wood-Fired Gastronomy',
    description: 'An eclectic culinary journey spanning authentic Kundapur Ghee Roasts, slow-simmered 24-hour Dal 1522, and artisanal sourdough pizzas blistered in stone ovens.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    icon: UtensilsCrossed,
    highlights: ['Mangalorean Specialties', 'Wood-Fired Oven Pizzas', 'Asian Wok & Dim Sum', 'Progressive North Indian'],
    colSpan: 'lg:col-span-7',
    minHeight: 'min-h-[420px] sm:min-h-[460px]',
  },
  {
    id: 'cocktails',
    tag: 'EXPERIENCE 02',
    title: 'COCKTAILS',
    subtitle: 'Smoked Libations & Botanical Mixology',
    description: 'Bespoke cocktails crafted with indigenous infusions, wild jamun reductions, artisanal tonic mists, and glass cloches filled with fragrant applewood smoke.',
    image: '/images/drinks/smoked-cinnamon-old-fashioned.jpg',
    icon: Wine,
    highlights: ['35+ Signature Mixes', 'Rare Single Malt Vault', 'Smoked Fig Old Fashioned', 'Zero-Proof Elixirs'],
    colSpan: 'lg:col-span-5',
    minHeight: 'min-h-[420px] sm:min-h-[460px]',
  },
  {
    id: 'rooftop',
    tag: 'EXPERIENCE 03',
    title: 'ROOFTOP',
    subtitle: 'Panoramic Open-Air Skyline Sanctuary',
    description: 'Breathe in Mumbai’s night breeze across our Upper Sky Deck, private draped sunset cabanas, and leafy botanical pergola bistro setting.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    icon: CloudMoon,
    highlights: ['360° Open Night Sky', 'Private Candlelit Cabanas', 'Cascading Botanical Decks', 'Dedicated Table Butler'],
    colSpan: 'lg:col-span-5',
    minHeight: 'min-h-[420px] sm:min-h-[460px]',
  },
  {
    id: 'music-events',
    tag: 'EXPERIENCE 04',
    title: 'MUSIC / EVENTS',
    subtitle: 'Soulful Acoustic Sundowners & Deep Beats',
    description: 'Live Friday acoustic indie sets, Sunday Latin jazz brunches, and high-energy Saturday night rooftop DJ rhythms beneath the stars.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    icon: Music2,
    highlights: ['Acoustic Fridays', 'Saturday DJ Sessions', 'Latin Sunday Brunches', 'Concert-Grade Sound'],
    colSpan: 'lg:col-span-7',
    minHeight: 'min-h-[420px] sm:min-h-[460px]',
  }
];

export const ExperienceSection = ({ onNavigate }) => {
  const { openReservation } = useReservationModal();
  const [hoveredExp, setHoveredExp] = useState(null);

  return (
    <section id="experience" className="py-24 sm:py-32 bg-charcoal-950 text-stone-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-charcoal-900 border border-stone-800 text-terracotta-400 text-[10px] font-sans font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3 h-3" />
              Four Pillars of Hospitality
            </div>
            <h2 className="headline-section text-stone-100 font-normal">
              The 1522 Experience
            </h2>
            <p className="text-stone-400 text-sm sm:text-base font-sans font-light mt-3 leading-relaxed">
              Four distinct atmospheres woven together under one starlit Mumbai sky. Designed for memorable dinners, celebratory toasts, and vibrant social evenings.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => openReservation()}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury font-bold text-terracotta-400 hover:text-terracotta-300 font-sans border-b border-terracotta-500/40 pb-1 hover:border-terracotta-400 transition-all"
            >
              Reserve an Experience Deck →
            </button>
          </div>
        </div>

        {/* Asymmetrical Editorial Grid on Desktop, Clean Stacked on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {experiences.map((exp) => {
            const Icon = exp.icon;
            const isHovered = hoveredExp === exp.id;

            return (
              <div
                key={exp.id}
                onMouseEnter={() => setHoveredExp(exp.id)}
                onMouseLeave={() => setHoveredExp(null)}
                onClick={() => openReservation({ deckZone: exp.id })}
                className={`${exp.colSpan} ${exp.minHeight} group relative rounded-3xl overflow-hidden border border-stone-800/90 bg-charcoal-900 hover:border-terracotta-500/60 transition-all duration-500 shadow-2xl flex flex-col justify-between p-6 sm:p-10 cursor-pointer`}
              >
                {/* Background Image with subtle parallax/zoom */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover object-center img-editorial filter brightness-[0.45] contrast-[1.1] group-hover:brightness-[0.55] transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-charcoal-950/30 group-hover:via-charcoal-950/40 transition-all duration-500" />
                </div>

                {/* Top Info Row */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-charcoal-950/80 backdrop-blur-md border border-stone-700/80 flex items-center justify-center text-terracotta-400 group-hover:bg-terracotta-500 group-hover:text-stone-50 transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-terracotta-400 font-bold font-sans bg-charcoal-950/80 px-3 py-1 rounded-full border border-stone-800 backdrop-blur-sm">
                      {exp.tag}
                    </span>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-charcoal-950/70 border border-stone-700/80 flex items-center justify-center text-stone-300 group-hover:text-terracotta-400 group-hover:border-terracotta-500 transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 space-y-3 pt-12">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 font-normal tracking-wide group-hover:text-stone-50 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-terracotta-300/90 text-xs sm:text-sm font-sans font-medium mt-1">
                      {exp.subtitle}
                    </p>
                  </div>

                  <p className="text-stone-300 text-xs sm:text-sm font-sans font-light leading-relaxed max-w-xl">
                    {exp.description}
                  </p>

                  {/* Highlights Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-sans uppercase tracking-wider text-stone-300 bg-charcoal-950/80 border border-stone-800/90 px-2.5 py-1 rounded-lg backdrop-blur-sm"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
