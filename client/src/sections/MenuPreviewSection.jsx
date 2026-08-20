import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Utensils, Wine, Beer, Coffee, Flame, RefreshCw, AlertCircle } from 'lucide-react';
import Button from '../components/common/Button';
import { menuService } from '../services/api';

const categories = [
  { id: 'Food', label: 'Food', icon: Utensils, desc: 'Coastal Provenance & Wood-Fired Gastronomy' },
  { id: 'Cocktails', label: 'Cocktails', icon: Flame, desc: 'Smoked Infusions & Botanical Mixology' },
  { id: 'Beer', label: 'Beer', icon: Beer, desc: 'Craft Draughts on Tap & Chilled Pints' },
  { id: 'Wine', label: 'Wine', icon: Wine, desc: 'Sparkling Reserves & Global Vineyards' },
  { id: 'Non-Alcoholic', label: 'Non-Alcoholic', icon: Coffee, desc: 'Artisanal Zero-Proof Coolers & Cold Brews' },
];

export const MenuPreviewSection = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Food');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategoryItems = async (cat) => {
    setLoading(true);
    setError(null);
    try {
      const items = await menuService.getItems(cat);
      setMenuItems(items || []);
    } catch (err) {
      console.warn('Error loading menu items:', err);
      setError('Could not refresh menu items from server. Displaying local selections.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryItems(activeCategory);
  }, [activeCategory]);

  const activeCategoryMeta = categories.find(c => c.id === activeCategory) || categories[0];

  return (
    <section id="menu" className="py-24 sm:py-32 bg-charcoal-900 text-stone-100 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terracotta-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-charcoal-800 border border-stone-800 text-terracotta-400 text-[10px] font-sans font-bold uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            Gastronomy & Libations
          </div>

          <h2 className="headline-section text-stone-100 font-normal">
            The 1522 Culinary & Cocktail Repertoire
          </h2>

          <p className="text-stone-400 text-sm sm:text-base font-sans font-light leading-relaxed">
            From iconic slow-roasted coastal delicacies to theatrical smoked bourbon cocktails, explore our carefully curated selection crafted for Mumbai’s starlit nights.
          </p>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-sans font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-terracotta-500 text-stone-50 shadow-lg shadow-terracotta-500/20 scale-105'
                    : 'bg-charcoal-950/80 text-stone-300 hover:text-stone-100 hover:bg-charcoal-800 border border-stone-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-stone-50' : 'text-stone-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Subtitle Description of Active Category */}
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-terracotta-400/90 font-sans font-semibold">
            — {activeCategoryMeta.desc} —
          </span>
        </div>

        {/* Error Notice if any */}
        {error && (
          <div className="max-w-md mx-auto mb-6 p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-200 text-xs flex items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              {error}
            </span>
            <button
              onClick={() => fetchCategoryItems(activeCategory)}
              className="text-terracotta-400 underline font-semibold"
            >
              Retry
            </button>
          </div>
        )}

        {/* Dynamic Menu Grid with Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto py-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="animate-pulse space-y-2.5 pb-6 border-b border-stone-800/40">
                <div className="flex justify-between items-center">
                  <div className="h-5 bg-charcoal-800 rounded w-1/2" />
                  <div className="h-5 bg-charcoal-800 rounded w-16" />
                </div>
                <div className="h-3 bg-charcoal-800/60 rounded w-3/4" />
                <div className="h-3 bg-charcoal-800/40 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : menuItems.length === 0 ? (
          <div className="text-center py-16 bg-charcoal-950/40 rounded-3xl border border-stone-800 max-w-2xl mx-auto">
            <p className="text-stone-400 text-sm font-sans">No menu items found in this section at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto">
            {menuItems.map((item, idx) => (
              <div
                key={item._id || idx}
                className="group relative pb-6 border-b border-stone-800/80 hover:border-terracotta-500/40 transition-colors duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Dietary Indicator */}
                    {item.dietary === 'veg' ? (
                      <span className="w-3.5 h-3.5 rounded-sm border border-emerald-500 flex items-center justify-center p-0.5" title="Vegetarian">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      </span>
                    ) : item.dietary === 'non-veg' ? (
                      <span className="w-3.5 h-3.5 rounded-sm border border-terracotta-500 flex items-center justify-center p-0.5" title="Non-Vegetarian">
                        <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500" />
                      </span>
                    ) : null}

                    {/* Item Name */}
                    <h3 className="font-serif text-lg sm:text-xl text-stone-100 font-medium group-hover:text-terracotta-300 transition-colors">
                      {item.name}
                    </h3>

                    {/* Badge */}
                    {(item.featured || item.isChefsSpecial) && (
                      <span className="text-[9px] uppercase tracking-wider font-sans font-bold px-2 py-0.5 rounded bg-terracotta-500/20 text-terracotta-300 border border-terracotta-500/30">
                        Chef's Choice
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="font-serif text-lg font-semibold text-stone-200 shrink-0">
                    {typeof item.price === 'number' ? `₹${item.price}` : item.price}
                  </div>
                </div>

                {/* Description */}
                <p className="text-stone-400 text-xs sm:text-sm font-sans font-light leading-relaxed">
                  {item.description}
                </p>

                {/* Pairing Note if present */}
                {item.pairWith && (
                  <p className="text-[11px] text-terracotta-400/90 italic font-sans mt-1.5">
                    Pair with: <span className="text-stone-300">{item.pairWith}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* View Full Menu CTA */}
        <div className="mt-16 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/menu')}
            icon={ArrowRight}
            iconPosition="right"
            className="border-stone-700 hover:border-terracotta-500 text-stone-100 hover:text-terracotta-400"
          >
            VIEW FULL DINING & BAR MENU
          </Button>
        </div>

      </div>
    </section>
  );
};

export default MenuPreviewSection;
