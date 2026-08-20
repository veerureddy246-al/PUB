import React, { useState } from 'react';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import { useReservationModal } from '../context/ReservationContext';
import { Users, Sparkles, CloudMoon, Sun, Trees, Wine, ArrowRight } from 'lucide-react';

const deckData = [
  {
    id: 'sky-deck',
    name: 'The Upper Sky Deck',
    subtitle: 'Panoramic Open-Air Skyline',
    icon: CloudMoon,
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80',
    description: 'Elevated under the stars, the Upper Deck is the crown jewel of 1522 Mumbai. Feel the evening coastal breeze while listening to live acoustic acts and savoring handcrafted cocktails amidst Mumbai’s glowing skyline.',
    highlights: [
      '360° Open-Air Rooftop Atmosphere',
      'Weekend Live Acoustic & DJ Performances',
      'Dedicated Skyline Cocktail Station',
      'Seating for couples, social groups and birthday tables'
    ],
    capacity: '2 – 14 Guests per table',
    timings: '05:00 PM – 01:30 AM',
  },
  {
    id: 'sunset-cabana',
    name: 'Private Sunset Cabanas',
    subtitle: 'Intimate Candlelit Sanctuary',
    icon: Sun,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    description: 'Designed for couples, intimate anniversaries, and high-profile private dining. Our draped sunset cabanas feature plush upholstered banquettes, warm ambient lantern light, and dedicated personal butler service.',
    highlights: [
      'Private Draped Enclosures with Lantern Lighting',
      'Curated Champagne & Chef Tasting Menus',
      'Exclusive Sunset Golden Hour Viewing',
      'Advance reservation strictly recommended'
    ],
    capacity: '2 – 6 Guests per cabana',
    timings: '12:00 PM – 01:30 AM',
  },
  {
    id: 'botanical-pergola',
    name: 'Botanical Pergola & Lower Deck',
    subtitle: 'Lush Foliage & Sheltered Open-Air',
    icon: Trees,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    description: 'Immerse yourself in a botanical oasis. Sheltered under rustic wooden pergolas adorned with cascading ivy and tropical greenery, the Lower Deck offers relaxed European outdoor bistro vibes right in Andheri East.',
    highlights: [
      'Verdant Plant Installations & Wooden Beams',
      'All-Weather Sheltered Open-Air Comfort',
      'Ideal for Sunday Brunches & Corporate Mixers',
      'Warm family-friendly & large group dining tables'
    ],
    capacity: '4 – 20 Guests',
    timings: '12:00 PM – 01:30 AM',
  },
  {
    id: 'inner-lounge',
    name: 'Inner Rock Lounge & Mixology Bar',
    subtitle: 'Vintage Rock Soul & Velvet Comfort',
    icon: Wine,
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1200&q=80',
    description: 'For those who love the rhythm of the bar. Featuring a polished onyx bar counter, plush velvet armchairs, vintage rock vinyl aesthetics, and climate-controlled luxury for cocktail purists and single malt enthusiasts.',
    highlights: [
      'Full Air-Conditioned High-End Lounge',
      'Front-Row Seating to Master Bartenders',
      'Extensive Single Malt & Rare Bourbon Cellar',
      'Classic Rock, Soul & Vinyl Playlists'
    ],
    capacity: '2 – 10 Guests',
    timings: '12:00 PM – 01:30 AM',
  }
];

export const DeckExperienceSection = () => {
  const [activeDeckId, setActiveDeckId] = useState('sky-deck');
  const { openReservation } = useReservationModal();

  const activeDeck = deckData.find(d => d.id === activeDeckId) || deckData[0];
  const Icon = activeDeck.icon;

  return (
    <section className="py-24 bg-charcoal-950 text-stone-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Atmosphere & Ambiance"
          title="Four Distinct Worlds Under One Mumbai Sky"
          subtitle="Whether you seek the vibrant energy of the open-air rooftop, an intimate candlelit cabana, or the air-conditioned elegance of our rock lounge, 1522 offers a bespoke setting for every mood."
        />

        {/* Deck Navigation Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {deckData.map((deck) => {
            const isSelected = deck.id === activeDeckId;
            const TabIcon = deck.icon;
            return (
              <button
                key={deck.id}
                onClick={() => setActiveDeckId(deck.id)}
                className={`p-4 rounded-xl border text-left transition-all duration-300 flex items-center gap-3 ${
                  isSelected
                    ? 'bg-charcoal-800 border-terracotta-500 ring-1 ring-terracotta-500 shadow-glow-terracotta'
                    : 'bg-charcoal-900 border-stone-800 hover:border-stone-600 hover:bg-charcoal-850'
                }`}
              >
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-terracotta-500 text-stone-50' : 'bg-charcoal-800 text-stone-400'}`}>
                  <TabIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-medium text-stone-100">
                    {deck.name}
                  </h4>
                  <span className="text-[10px] text-stone-400 font-sans block">
                    {deck.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Deck Showcase Display */}
        <div className="bg-charcoal-900 border border-stone-800 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl animate-fade-in">
          {/* Visual Column */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[480px]">
            <img
              src={activeDeck.image}
              alt={activeDeck.name}
              className="w-full h-full object-cover object-center filter contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-charcoal-900 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent lg:hidden" />

            {/* Float badge */}
            <div className="absolute top-6 left-6 bg-charcoal-950/80 backdrop-blur-md border border-stone-700 px-3.5 py-1.5 rounded-full flex items-center gap-2">
              <Icon className="w-4 h-4 text-terracotta-400" />
              <span className="text-xs font-sans uppercase tracking-wider font-semibold text-stone-200">
                {activeDeck.subtitle}
              </span>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-terracotta-400 font-sans font-bold block mb-1">
                  1522 Experience Zone
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-stone-100 font-normal">
                  {activeDeck.name}
                </h3>
              </div>

              <p className="text-stone-300 text-sm leading-relaxed font-sans font-light">
                {activeDeck.description}
              </p>

              {/* Highlights List */}
              <div className="space-y-2.5">
                <span className="text-[11px] uppercase tracking-widest text-stone-400 font-semibold font-sans block">
                  Deck Highlights:
                </span>
                {activeDeck.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs font-sans text-stone-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500 shrink-0 mt-1.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Capacity & Timings Strip */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-800 text-xs font-sans">
                <div className="bg-charcoal-850 p-3 rounded-xl border border-stone-800">
                  <span className="text-stone-400 text-[10px] uppercase block mb-0.5">Capacity</span>
                  <span className="text-stone-100 font-semibold">{activeDeck.capacity}</span>
                </div>
                <div className="bg-charcoal-850 p-3 rounded-xl border border-stone-800">
                  <span className="text-stone-400 text-[10px] uppercase block mb-0.5">Hours</span>
                  <span className="text-stone-100 font-semibold">{activeDeck.timings}</span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="pt-8">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => openReservation({ deckZone: activeDeck.id })}
              >
                Reserve Table at {activeDeck.name}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeckExperienceSection;
