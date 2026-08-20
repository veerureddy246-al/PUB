import React from 'react';
import { Sparkles, Flame, Wine } from 'lucide-react';

export const MenuCard = ({ item }) => {
  const isVeg = item.dietary === 'veg' || item.dietary === 'vegan';

  return (
    <article className="group relative bg-charcoal-900/90 border border-stone-800/90 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1 hover:border-terracotta-500/40 hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.85),0_0_20px_-5px_rgba(195,107,78,0.12)]">
      
      {/* 1. Food Image with Editorial Frame */}
      {item.image && (
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-charcoal-950 border-b border-stone-800/80">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-[0.95] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          {/* Subtle bottom gradient to ensure clean visual transition */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-black/20 pointer-events-none" />

          {/* Top Left: Refined Badges (Chef's Signature / GF) */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
            {item.isChefsSpecial && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-charcoal-950/90 backdrop-blur-md border border-terracotta-500/40 text-terracotta-300 text-[10px] font-sans font-semibold tracking-wider uppercase shadow-sm">
                <Sparkles className="w-2.5 h-2.5 text-terracotta-400" />
                Chef's Signature
              </span>
            )}
            {item.isGlutenFree && (
              <span className="inline-flex items-center px-2 py-1 rounded bg-charcoal-950/90 backdrop-blur-md border border-stone-700/80 text-stone-300 text-[9px] font-sans font-medium uppercase tracking-wider shadow-sm">
                GF
              </span>
            )}
          </div>

          {/* Top Right: Dietary Indicator (Classic Minimalist Restaurant Symbol) */}
          <div className="absolute top-3 right-3 z-10">
            <span
              className={`inline-flex items-center justify-center w-5 h-5 rounded bg-charcoal-950/90 backdrop-blur-md border ${
                isVeg ? 'border-emerald-500/80' : 'border-red-500/80'
              } shadow-sm`}
              title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            >
              <span className={`w-2 h-2 rounded-full ${isVeg ? 'bg-emerald-400' : 'bg-red-400'}`} />
            </span>
          </div>
        </div>
      )}

      {/* 2. Menu Item Details & Editorial Typography */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Item Category / Subcategory Eyebrow if available */}
          {(item.subCategory || item.category) && (
            <div className="text-[10px] font-sans font-semibold uppercase tracking-widest text-terracotta-400/90 mb-1.5">
              {item.subCategory ? item.subCategory.replace(/-/g, ' ') : item.category}
            </div>
          )}

          {/* Title and Price Header */}
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <h3 className="font-serif text-lg sm:text-[19px] text-stone-100 font-medium leading-snug group-hover:text-terracotta-200 transition-colors">
              {item.name}
            </h3>
            <span className="font-serif text-lg sm:text-[19px] font-semibold text-terracotta-300 shrink-0 tracking-tight">
              ₹{item.price}
            </span>
          </div>

          {/* Description */}
          <p className="text-stone-400 text-xs sm:text-[13px] leading-relaxed font-sans font-light">
            {item.description}
          </p>
        </div>

        {/* 3. Footer: Pairing, Spiciness & Tags */}
        <div className="pt-3.5 border-t border-stone-800/80 space-y-2.5">
          {/* Wine / Cocktail Pairing */}
          {item.pairWith && (
            <div className="flex items-center gap-1.5 text-[11px] text-stone-400 font-sans font-light">
              <Wine className="w-3.5 h-3.5 text-terracotta-400 shrink-0" />
              <span className="truncate">
                Pairs with: <strong className="text-stone-300 font-normal">{item.pairWith}</strong>
              </span>
            </div>
          )}

          {/* Spiciness & Category Tags */}
          <div className="flex items-center justify-between gap-2 pt-0.5">
            {/* Spiciness indicator */}
            <div className="flex items-center gap-1">
              {item.spiciness > 0 && (
                <div
                  className="flex items-center gap-0.5 text-[10px] text-stone-400 font-sans"
                  title={`Spiciness: ${item.spiciness} of 3`}
                >
                  {[...Array(item.spiciness)].map((_, idx) => (
                    <Flame key={idx} className="w-3 h-3 text-terracotta-400 fill-terracotta-400/40" />
                  ))}
                </div>
              )}
            </div>

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap justify-end">
                {item.tags.slice(0, 2).map((tag, i) => (
                  <span
                    key={i}
                    className="text-[9px] uppercase tracking-wider font-semibold text-stone-400 bg-charcoal-950/80 px-2 py-0.5 rounded border border-stone-800/80 font-sans"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default MenuCard;
