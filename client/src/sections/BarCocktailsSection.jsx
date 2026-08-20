import React from 'react';
import { Wine, Sparkles, Flame, Clock, Award } from 'lucide-react';
import Button from '../components/common/Button';
import { useReservationModal } from '../context/ReservationContext';

const signatureCocktails = [
  {
    name: "The 1522 Mumbai Skyline",
    category: "Applewood Smoked Old Fashioned",
    price: "₹745",
    description: "Our crowning libation. Aged Kentucky bourbon infused with roasted cinnamon bark, organic fig reduction, and aromatic bitters, presented tableside under a glass cloche filled with aromatic applewood smoke.",
    ingredients: ["Kentucky Bourbon", "Roasted Cinnamon Bark", "Wild Fig Reduction", "Angostura Bitters", "Applewood Smoke"],
    flavorProfile: "Smoky, Rich, Velvety",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Jamun & Botanical Gin Fizz",
    category: "Sunset Botanical Highball",
    price: "₹695",
    description: "An homage to Indian botanicals. Artisanal craft gin muddled with wild monsoon jamun fruit, kaffir lime leaves, and elderflower liqueur, topped with elderflower tonic mist and pink Himalayan crystal salt.",
    ingredients: ["Artisanal Craft Gin", "Wild Jamun Pulp", "Elderflower Liqueur", "Kaffir Lime", "Tonic Mist"],
    flavorProfile: "Floral, Tart, Effervescent",
    image: "/images/drinks/smoked-rosemary-cocktail.jpg"
  },
  {
    name: "Smoked Kokum & Tequila Picante",
    category: "Coastal Agave Picante",
    price: "₹725",
    description: "100% Blue Agave Reposado tequila shaken with sun-dried coastal kokum extract, bird's eye chili syrup, fresh lime juice, agave nectar, and black volcanic salt rim.",
    ingredients: ["100% Blue Agave Tequila", "Artisanal Kokum Extract", "Bird's Eye Chili", "Fresh Lime", "Volcanic Salt"],
    flavorProfile: "Spicy, Tangy, Earthy",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Cold Brew Espresso Nitrogen Martini",
    category: "Single-Estate Nightcap",
    price: "₹675",
    description: "Single-origin Chikmagalur dark roast slow-steeped for 16 hours, premium vanilla vodka, coffee liqueur, shaken vigorously to create a velvety nitrogen crema, dusted with 70% dark cocoa.",
    ingredients: ["Chikmagalur Cold Brew", "Vanilla Infused Vodka", "Kahlúa Coffee Liqueur", "Nitrogen Foam", "Shaved Dark Cocoa"],
    flavorProfile: "Bold, Roasted, Silky",
    image: "/images/drinks/espresso-martini.jpg"
  }
];

export const BarCocktailsSection = () => {
  const { openReservation } = useReservationModal();

  return (
    <section className="py-24 sm:py-32 bg-charcoal-950 border-t border-stone-800/80 text-stone-100 relative overflow-hidden">
      {/* Ambient background glow - subtle warm amber */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-terracotta-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-charcoal-900 border border-stone-800 text-terracotta-400 text-[10px] font-sans font-bold uppercase tracking-widest mb-3">
            <Wine className="w-3 h-3" />
            The Mixology Laboratory
          </div>
          <h2 className="headline-section text-stone-100 font-normal">
            Smoked Spirits & Botanical Libations
          </h2>
          <p className="text-stone-400 text-sm sm:text-base font-sans font-light mt-3 leading-relaxed">
            Crafted with artisanal precision, rare single malts, and hand-foraged Indian botanicals. Dark editorial luxury in every crystal pour.
          </p>
        </div>

        {/* Cocktails Grid (2x2 luxury cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {signatureCocktails.map((cocktail, idx) => (
            <div
              key={idx}
              className="bg-charcoal-900/90 border border-stone-800/90 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 hover:border-terracotta-500/50 transition-all duration-300 group shadow-2xl backdrop-blur-md"
            >
              {/* Image with subtle hover zoom */}
              <div className="sm:w-44 sm:h-auto h-48 rounded-2xl overflow-hidden shrink-0 border border-stone-700/80 relative">
                <img
                  src={cocktail.image}
                  alt={cocktail.name}
                  className="w-full h-full object-cover object-center img-editorial filter contrast-[1.1] brightness-[0.9]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent sm:hidden" />
              </div>

              {/* Cocktail Information */}
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[10px] font-sans uppercase tracking-widest text-terracotta-400 font-bold block">
                      {cocktail.category}
                    </span>
                    <span className="font-serif text-lg font-semibold text-stone-100">
                      {cocktail.price}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-stone-100 font-normal group-hover:text-terracotta-300 transition-colors mt-1">
                    {cocktail.name}
                  </h3>

                  <p className="text-stone-400 text-xs sm:text-sm font-sans font-light leading-relaxed mt-2">
                    {cocktail.description}
                  </p>
                </div>

                {/* Ingredients Pills */}
                <div className="space-y-2 pt-3 border-t border-stone-800/80">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 font-sans font-semibold block">
                    Key Ingredients:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cocktail.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-sans text-stone-300 bg-charcoal-850 px-2 py-0.5 rounded border border-stone-700/60"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bar Feature Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-charcoal-900/60 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-stone-300">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-charcoal-800 text-terracotta-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold text-stone-100 block">Rare Single Malt Vault & Japanese Whiskies</span>
              <span className="text-stone-400 text-[11px]">Featuring Macallan, Glenfiddich 18, Yamazaki, and Balvenie DoubleWood.</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => openReservation({ deckZone: 'inner-lounge' })}
            className="text-terracotta-400 hover:text-terracotta-300 shrink-0"
          >
            Reserve at Inner Rock Lounge Bar →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BarCocktailsSection;
