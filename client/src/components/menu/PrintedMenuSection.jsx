import React from 'react';
import { Sparkles, Wine, Flame } from 'lucide-react';

export const PrintedMenuSection = ({
  categoryTitle = 'AROUND THE WORLD',
  subTitle = 'NON-VEGETARIAN',
  items = [],
  featuredImage = null,
  featuredDishName = '',
  featuredDishPrice = null,
}) => {
  if (!items || items.length === 0) return null;

  // Pick the featured image: either explicitly passed, or from the first item with an image
  const displayImage =
    featuredImage ||
    items.find((i) => i.featured && i.image)?.image ||
    items.find((i) => i.image)?.image ||
    items[0]?.image;

  const displayDishName =
    featuredDishName ||
    items.find((i) => i.featured && i.image)?.name ||
    items.find((i) => i.image)?.name ||
    items[0]?.name;

  const displayDishPrice =
    featuredDishPrice !== undefined && featuredDishPrice !== null
      ? featuredDishPrice
      : items.find((i) => i.featured && i.image)?.price ||
        items.find((i) => i.image)?.price ||
        items[0]?.price;

  // When there are 4 or more items, split items so that left column displays the main set,
  // and additional items continue naturally below the featured image on the right.
  // The image + caption occupies the height of ~3-4 items, so left column receives (N - 2 or N - 3) items.
  const shouldSplit = items.length >= 4;
  const leftCount = shouldSplit
    ? items.length >= 10
      ? items.length - 3 // e.g. 11 -> 8 left, 3 right
      : items.length >= 7
      ? items.length - 2 // e.g. 9 -> 7 left, 2 right; 8 -> 6 left, 2 right; 7 -> 5 left, 2 right
      : items.length - 1 // e.g. 6 -> 5 left, 1 right; 5 -> 4 left, 1 right; 4 -> 3 left, 1 right
    : items.length;

  const leftItems = items.slice(0, leftCount);
  const rightItems = shouldSplit ? items.slice(leftCount) : [];

  const renderMenuItem = (item, idx) => {
    const isVeg = item.dietary === 'veg' || item.dietary === 'vegan';
    const priceFormatted = typeof item.price === 'number' ? `₹${item.price}` : item.price;

    return (
      <div key={item._id || item.name || idx} className="group">
        {/* Item Row: Name + Shorter Dotted Leader Line + Price */}
        <div className="flex items-baseline justify-between w-full gap-2">
          
          {/* Left: Dietary mark + Item Name + Badges */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Dietary indicator dot (Classic restaurant symbol) */}
            <span
              className={`inline-flex items-center justify-center w-3 h-3 rounded-sm border ${
                isVeg ? 'border-emerald-600 bg-emerald-50' : 'border-red-600 bg-red-50'
              } shrink-0`}
              title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            >
              <span className={`w-1 h-1 rounded-full ${isVeg ? 'bg-emerald-600' : 'bg-red-600'}`} />
            </span>

            {/* Item Name in Bold Classic Restaurant Typography */}
            <span className="font-sans font-extrabold uppercase tracking-wide text-[12px] sm:text-[13px] text-[#1C1917] group-hover:text-terracotta-800 transition-colors">
              {item.name}
            </span>

            {/* Chef's Signature Badge */}
            {item.isChefsSpecial && (
              <span className="inline-flex items-center gap-0.5 text-[8px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-terracotta-100/90 text-terracotta-800 border border-terracotta-300 shrink-0">
                <Sparkles className="w-2 h-2 text-terracotta-700" />
                Chef Special
              </span>
            )}

            {/* Gluten Free Badge */}
            {item.isGlutenFree && (
              <span className="text-[8px] font-bold px-1.5 py-0.2 rounded bg-stone-200 text-stone-700 shrink-0">
                GF
              </span>
            )}
          </div>

          {/* Shorter Dotted Leader Line (Significantly shorter, non-stretching) */}
          <div className="flex-1 max-w-[40px] sm:max-w-[60px] border-b border-dotted border-[#9C8F82]/80 min-w-[14px] mb-1" />

          {/* Price on the far right */}
          <span className="font-sans font-bold text-[12px] sm:text-[13px] text-[#1C1917] shrink-0 tracking-tight ml-auto">
            {priceFormatted}
          </span>
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-[#5C5248] text-[10.5px] sm:text-[11px] font-sans font-normal leading-relaxed mt-0.5 pl-4.5 max-w-xl">
            {item.description}
          </p>
        )}

        {/* Pairing Note / Spiciness / Tags if present */}
        {(item.pairWith || (item.spiciness > 0)) && (
          <div className="flex items-center gap-2.5 text-[9.5px] text-[#8C7E72] font-sans mt-0.5 pl-4.5">
            {item.pairWith && (
              <span className="italic flex items-center gap-1">
                <Wine className="w-2.5 h-2.5 text-terracotta-700 shrink-0" />
                Pair with: <strong className="text-[#3D352E] font-medium not-italic">{item.pairWith}</strong>
              </span>
            )}
            {item.spiciness > 0 && (
              <span className="flex items-center gap-0.5" title={`Spiciness: ${item.spiciness}/3`}>
                {[...Array(item.spiciness)].map((_, i) => (
                  <Flame key={i} className="w-2.5 h-2.5 text-terracotta-600 fill-terracotta-600" />
                ))}
              </span>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative bg-[#FAF7F0] text-[#2C241E] rounded-3xl border-2 border-[#D8CFC4] p-4 sm:p-6 md:p-7 lg:p-8 shadow-2xl overflow-hidden mb-7 mx-auto max-w-[850px]">
      
      {/* Top Header: Vintage Double-Line Oval Badge */}
      <div className="text-center mb-3.5 sm:mb-4.5">
        <div className="inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-1 sm:py-1.5 rounded-full border-2 border-[#4A3F35] bg-[#F4EFE6] shadow-sm mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4A3F35]" />
          <span className="font-serif uppercase tracking-[0.2em] text-xs sm:text-[12.5px] font-bold text-[#4A3F35]">
            {categoryTitle}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#4A3F35]" />
        </div>

        {/* Sub-category Heading in condensed uppercase */}
        {subTitle && (
          <h2 className="font-sans font-black text-lg sm:text-xl md:text-[26px] uppercase tracking-wider text-[#4A3F35] mt-0.5 mb-1.5">
            {subTitle}
          </h2>
        )}

        {/* Decorative Divider with Arrows */}
        <div className="flex items-center justify-center gap-2 max-w-[240px] mx-auto text-[#8C7E72]">
          <span className="text-[11px] font-serif leading-none select-none">◄</span>
          <span className="h-[1.5px] bg-[#8C7E72]/80 flex-1" />
          <span className="text-[11px] font-serif leading-none select-none">►</span>
        </div>
      </div>

      {/* Main Two-Column Printed Menu Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
        
        {/* LEFT COLUMN: First set of Menu Items (~58% width on desktop) */}
        <div className="lg:col-span-7 space-y-2.5 sm:space-y-3">
          {leftItems.map((item, idx) => renderMenuItem(item, idx))}
        </div>

        {/* RIGHT COLUMN: Featured Image + Additional Menu Items continuing below (~42% width) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-start space-y-2.5">
          {displayImage && (
            <div className="w-full max-w-[250px] sm:max-w-[270px] aspect-[4/5] rounded-t-[85px] sm:rounded-t-[105px] rounded-b-2xl overflow-hidden border-2 border-[#4A3F35] shadow-2xl bg-[#EFE9DC] relative group">
              <img
                src={displayImage}
                alt={displayDishName || 'Featured Restaurant Selection'}
                className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-[0.96] transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 border border-white/25 rounded-t-[83px] sm:rounded-t-[103px] rounded-b-xl pointer-events-none" />
            </div>
          )}

          {/* Featured Dish Caption / Price Underneath Photo */}
          {displayDishName && (
            <div className="text-center px-3 -mt-0.5 mb-0.5">
              <span className="font-sans font-bold uppercase tracking-wider text-xs text-[#4A3F35]">
                {displayDishName}
              </span>
              {displayDishPrice !== undefined && displayDishPrice !== null && (
                <span className="font-sans font-semibold text-xs text-[#1C1917] ml-2">
                  .................. ₹{displayDishPrice}
                </span>
              )}
            </div>
          )}

          {/* Additional Menu Items continuing below the image */}
          {rightItems.length > 0 && (
            <div className="w-full pt-2 border-t border-[#8C7E72]/20 space-y-2.5 sm:space-y-3">
              {rightItems.map((item, idx) => renderMenuItem(item, leftCount + idx))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default PrintedMenuSection;
