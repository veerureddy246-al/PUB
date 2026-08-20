import React from 'react';
import { Sun, CloudMoon, Wine, Trees } from 'lucide-react';

export const decks = [
  {
    id: 'sky-deck',
    name: 'Upper Open-Air Sky Deck',
    tagline: 'Mumbai Skyline & Night Breeze',
    icon: CloudMoon,
    capacity: '2 – 14 Guests',
    vibe: 'High-energy, skyline views, DJ beats & live music',
    bestFor: 'Couples, groups of friends & weekend sundowners',
    badge: 'Most Popular'
  },
  {
    id: 'sunset-cabana',
    name: 'Private Sunset Cabanas',
    tagline: 'Intimate Canopy Seating',
    icon: Sun,
    capacity: '2 – 6 Guests',
    vibe: 'Romantic, candlelight setup, cushioned loungers',
    bestFor: 'Anniversaries, date nights & intimate milestones',
    badge: 'VIP Intimate'
  },
  {
    id: 'botanical-pergola',
    name: 'Botanical Pergola (Lower Deck)',
    tagline: 'Lush Foliage & Sheltered Open-Air',
    icon: Trees,
    capacity: '4 – 20 Guests',
    vibe: 'Organic greenery, relaxed dining, acoustic ambience',
    bestFor: 'Family dinners, Sunday brunches & corporate teams',
    badge: 'Lush Garden'
  },
  {
    id: 'inner-lounge',
    name: 'Inner Rock Lounge & Mixology Bar',
    tagline: 'Craft Cocktails & Velvet Comfort',
    icon: Wine,
    capacity: '2 – 10 Guests',
    vibe: 'Air-conditioned comfort, bar counter action, classic rock',
    bestFor: 'Cocktail connoisseurs, single malt lovers & casual drinks',
    badge: 'Bar Central'
  }
];

export const DeckSelector = ({ selectedDeck, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      {decks.map((deck) => {
        const isSelected = selectedDeck === deck.id;
        const Icon = deck.icon;

        return (
          <div
            key={deck.id}
            onClick={() => onSelect(deck.id)}
            className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 relative text-left flex flex-col justify-between ${
              isSelected
                ? 'bg-charcoal-800 border-terracotta-500 ring-1 ring-terracotta-500 shadow-glow-terracotta'
                : 'bg-charcoal-850/70 border-stone-700/60 hover:border-stone-500 hover:bg-charcoal-800/80'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md ${isSelected ? 'bg-terracotta-500 text-stone-50' : 'bg-charcoal-700 text-stone-300'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-serif text-sm font-medium text-stone-100">
                    {deck.name}
                  </span>
                </div>
                {deck.badge && (
                  <span className={`text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-terracotta-500/20 text-terracotta-300' : 'bg-charcoal-700 text-stone-400'
                  }`}>
                    {deck.badge}
                  </span>
                )}
              </div>

              <p className="text-xs text-stone-300 font-sans mb-1">
                {deck.tagline}
              </p>
              <p className="text-[11px] text-stone-400 font-sans">
                {deck.vibe}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-stone-800 flex items-center justify-between text-[11px] font-sans">
              <span className="text-terracotta-400 font-medium">
                {deck.capacity}
              </span>
              <span className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? 'text-terracotta-400' : 'text-stone-400'}`}>
                {isSelected ? '✓ Selected' : 'Select Deck'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DeckSelector;
