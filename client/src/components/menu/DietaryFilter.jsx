import React from 'react';
import { Search } from 'lucide-react';

export const foodCategories = [
  { id: 'all-food', label: 'All Food' },
  { id: 'signatures', label: "Chef's Signatures" },
  { id: 'wood-fired-pizza', label: 'Wood-Fired Pizza' },
  { id: 'mains-indian', label: 'Progressive Indian' },
  { id: 'starters', label: 'Starters & Tapas' },
];

export const drinkCategories = [
  { id: 'all-drinks', label: 'All Drinks' },
  { id: 'Cocktails', label: 'Artisanal Cocktails' },
  { id: 'Beer', label: 'Beer & Draughts' },
  { id: 'Wine', label: 'Wine & Sparkling' },
  { id: 'Non-Alcoholic', label: 'Zero-Proof & Brews' },
];

export const DietaryFilter = ({
  menuType = 'food',
  activeCategory,
  onCategoryChange,
  activeDietary,
  onDietaryChange,
  searchQuery,
  onSearchChange,
}) => {
  const currentCategories = menuType === 'drinks' ? drinkCategories : foodCategories;
  const isDrinks = menuType === 'drinks';

  return (
    <div className="space-y-6 mb-10">
      {/* Search & Dietary Filters Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={
              isDrinks
                ? 'Search cocktails, beers, wines, zero-proof...'
                : 'Search dishes, pizzas, starters, ingredients...'
            }
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-charcoal-900 border border-stone-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-terracotta-500 font-sans transition-colors"
          />
        </div>

        {/* Dietary Toggle Pills (Shown for Food Menu) */}
        {!isDrinks && (
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold font-sans mr-1 shrink-0">
              Diet:
            </span>
            {[
              { id: 'all', label: 'All' },
              { id: 'veg', label: 'Vegetarian Only' },
              { id: 'non-veg', label: 'Non-Veg' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => onDietaryChange(d.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-sans whitespace-nowrap transition-all border ${
                  activeDietary === d.id
                    ? 'bg-charcoal-800 border-terracotta-500/80 text-stone-100 font-medium shadow-sm'
                    : 'bg-charcoal-900/80 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Category Scrollable Navigation Tabs (Filtered strictly by Food or Drinks) */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-stone-800/80 pb-3 no-scrollbar">
        {currentCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-sans uppercase tracking-wider whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-terracotta-500 border-terracotta-500 text-stone-50 font-semibold shadow-md'
                  : 'bg-charcoal-900 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DietaryFilter;
