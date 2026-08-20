import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DietaryFilter from '../components/menu/DietaryFilter';
import PrintedMenuSection from '../components/menu/PrintedMenuSection';
import Button from '../components/common/Button';
import { menuService } from '../services/api';
import { Calendar, RefreshCw } from 'lucide-react';

export const MenuPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Determine menu type: 'food' or 'drinks'
  const typeParam = searchParams.get('type');
  const menuType = typeParam === 'drinks' ? 'drinks' : 'food';

  // Category param
  const catParam = searchParams.get('category');
  const initialCategory = catParam || (menuType === 'drinks' ? 'all-drinks' : 'all-food');

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeDietary, setActiveDietary] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sync category & menuType when URL changes
  useEffect(() => {
    const currentType = searchParams.get('type') === 'drinks' ? 'drinks' : 'food';
    const currentCat = searchParams.get('category');
    if (currentCat) {
      setActiveCategory(currentCat);
    } else {
      setActiveCategory(currentType === 'drinks' ? 'all-drinks' : 'all-food');
    }
    setActiveDietary('all');
    setSearchQuery('');
  }, [typeParam]);

  // Fetch and strictly filter items based on menuType
  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const allItems = await menuService.getItems('all');
      let filtered = (allItems || []).filter((item) => {
        if (item.published === false || item.archived === true) return false;
        const cat = (item.category || '').toLowerCase();
        if (menuType === 'drinks') {
          return (
            cat === 'cocktails' ||
            cat === 'beer' ||
            cat === 'wine' ||
            cat === 'non-alcoholic' ||
            cat === 'drinks' ||
            cat === 'craft-cocktails' ||
            cat === 'single-malts-wines'
          );
        } else {
          return (
            cat === 'food' ||
            !['cocktails', 'beer', 'wine', 'non-alcoholic', 'drinks', 'craft-cocktails', 'single-malts-wines'].includes(cat)
          );
        }
      });

      // Category filter
      if (menuType === 'food') {
        if (activeCategory === 'signatures') {
          filtered = filtered.filter((i) => i.subCategory === 'signatures' || i.isChefsSpecial);
        } else if (activeCategory === 'wood-fired-pizza') {
          filtered = filtered.filter((i) => i.subCategory === 'wood-fired-pizza');
        } else if (activeCategory === 'mains-indian') {
          filtered = filtered.filter((i) => i.subCategory === 'mains-indian');
        } else if (activeCategory === 'starters') {
          filtered = filtered.filter((i) => i.subCategory === 'starters');
        }
      } else {
        // drinks
        if (activeCategory === 'Cocktails') {
          filtered = filtered.filter((i) => i.category === 'Cocktails');
        } else if (activeCategory === 'Beer') {
          filtered = filtered.filter((i) => i.category === 'Beer');
        } else if (activeCategory === 'Wine') {
          filtered = filtered.filter((i) => i.category === 'Wine');
        } else if (activeCategory === 'Non-Alcoholic') {
          filtered = filtered.filter((i) => i.category === 'Non-Alcoholic');
        }
      }

      // Dietary filter (veg / non-veg for food)
      if (menuType === 'food' && activeDietary !== 'all') {
        if (activeDietary === 'veg') {
          filtered = filtered.filter((i) => i.dietary === 'veg' || i.dietary === 'vegan');
        } else if (activeDietary === 'non-veg') {
          filtered = filtered.filter((i) => i.dietary === 'non-veg');
        }
      }

      // Search filter (strictly within the active menuType)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(
          (i) =>
            i.name.toLowerCase().includes(q) ||
            (i.description && i.description.toLowerCase().includes(q)) ||
            (i.tags && i.tags.some((t) => t.toLowerCase().includes(q))) ||
            (i.pairWith && i.pairWith.toLowerCase().includes(q))
        );
      }

      setItems(filtered);
    } catch (err) {
      console.error('Failed to load menu', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [menuType, activeCategory, activeDietary, searchQuery]);

  // Group items into printed menu sections
  const sections = useMemo(() => {
    if (!items || items.length === 0) return [];

    // When searching
    if (searchQuery.trim()) {
      return [
        {
          id: 'search-results',
          categoryTitle: menuType === 'food' ? 'FOOD SEARCH RESULTS' : 'DRINKS SEARCH RESULTS',
          subTitle: `MATCHING "${searchQuery.toUpperCase()}"`,
          items: items,
        },
      ];
    }

    // FOOD MENU SECTIONS
    if (menuType === 'food') {
      if (activeCategory === 'signatures') {
        return [
          {
            id: 'signatures',
            categoryTitle: "CHEF'S MASTERPIECES",
            subTitle: 'KUNDAPUR ROOTS & COASTAL GASTRO CREATIONS',
            items: items,
          },
        ];
      }
      if (activeCategory === 'wood-fired-pizza') {
        return [
          {
            id: 'wood-fired-pizza',
            categoryTitle: 'WOOD-FIRED PIZZAS',
            subTitle: '48-HOUR FERMENTED SOURDOUGH CRUSTS',
            items: items,
          },
        ];
      }
      if (activeCategory === 'mains-indian') {
        return [
          {
            id: 'mains-indian',
            categoryTitle: 'HERITAGE INDIAN MAINS',
            subTitle: 'SLOW-SIMMERED ROASTS & 24-HOUR DAL 1522',
            items: items,
          },
        ];
      }
      if (activeCategory === 'starters') {
        return [
          {
            id: 'starters',
            categoryTitle: 'STARTERS & COASTAL TAPAS',
            subTitle: 'CRISP SEAFOOD & TANDOORI APPETIZERS',
            items: items,
          },
        ];
      }

      // Default 'all-food' view: Group into authentic printed restaurant menu sheets
      const foodGroups = [
        {
          id: 'food-curries-non-veg',
          categoryTitle: 'INDIAN CURRY',
          subTitle: 'NON-VEG',
          items: items.filter((i) => i.subCategory === 'curries-non-veg'),
        },
        {
          id: 'food-curries-coastal',
          categoryTitle: 'INDIAN CURRY',
          subTitle: 'REGIONAL & COASTAL CURRIES',
          items: items.filter((i) => i.subCategory === 'curries-coastal'),
        },
        {
          id: 'food-rice-biryani',
          categoryTitle: 'RICE & BIRYANI',
          subTitle: 'AWADHI DUM BIRYANIS & FRAGRANT RICE',
          items: items.filter((i) => i.subCategory === 'rice-biryani'),
        },
        {
          id: 'food-signatures',
          categoryTitle: "CHEF'S MASTERPIECES",
          subTitle: 'COASTAL ROOTS & SIGNATURE CREATIONS',
          items: items.filter((i) => i.subCategory === 'signatures'),
        },
        {
          id: 'food-starters',
          categoryTitle: 'STARTERS & TAPAS',
          subTitle: 'CRISP SEAFOOD & TANDOORI APPETIZERS',
          items: items.filter((i) => i.subCategory === 'starters'),
        },
        {
          id: 'food-pizza',
          categoryTitle: 'WOOD-FIRED OVEN',
          subTitle: 'ARTISANAL SOURDOUGH PIZZAS',
          items: items.filter((i) => i.subCategory === 'wood-fired-pizza'),
        },
        {
          id: 'food-desserts',
          categoryTitle: 'SWEET FINALES',
          subTitle: 'ARTISANAL PATISSERIE & DESSERTS',
          items: items.filter((i) => i.subCategory === 'desserts'),
        },
      ];

      const visibleGroups = foodGroups.filter((g) => g.items.length > 0);
      const matchedItemIds = new Set(visibleGroups.flatMap(g => g.items.map(i => i._id || i.name)));
      const otherFoodItems = items.filter(i => !matchedItemIds.has(i._id || i.name));
      if (otherFoodItems.length > 0) {
        visibleGroups.push({
          id: 'food-curated-creations',
          categoryTitle: 'CHEF SPECIALS & CURATIONS',
          subTitle: 'NEW CREATIONS',
          items: otherFoodItems,
        });
      }
      if (visibleGroups.length > 0) return visibleGroups;

      return [
        {
          id: 'all-food-section',
          categoryTitle: 'INDIAN CURRY',
          subTitle: 'NON-VEG',
          items: items,
        },
      ];
    }

    // DRINKS MENU SECTIONS
    if (menuType === 'drinks') {
      if (activeCategory === 'Cocktails') {
        return [
          {
            id: 'cocktails',
            categoryTitle: 'BOTANICAL LAB & MIXOLOGY',
            subTitle: 'SMOKED INFUSIONS & BESPOKE SPIRITS',
            items: items,
          },
        ];
      }
      if (activeCategory === 'Beer') {
        return [
          {
            id: 'beer',
            categoryTitle: 'BREWERY & DRAUGHTS',
            subTitle: 'CRAFT BEERS ON TAP & CHILLED PINTS',
            items: items,
          },
        ];
      }
      if (activeCategory === 'Wine') {
        return [
          {
            id: 'wine',
            categoryTitle: 'VINTAGE RESERVES & SPARKLING',
            subTitle: 'GLOBAL VINEYARDS & SPARKLING WINES',
            items: items,
          },
        ];
      }
      if (activeCategory === 'Non-Alcoholic') {
        return [
          {
            id: 'non-alcoholic',
            categoryTitle: 'ZERO-PROOF & ARTISAN BREWS',
            subTitle: 'COLD BREWS & REFRESHING COOLERS',
            items: items,
          },
        ];
      }

      // Default 'all-drinks' view: Group into authentic printed restaurant menu sheets
      const drinkGroups = [
        {
          id: 'drinks-cocktails',
          categoryTitle: 'BOTANICAL LAB & MIXOLOGY',
          subTitle: 'SMOKED INFUSIONS & BESPOKE SPIRITS',
          items: items.filter((i) => i.category === 'Cocktails'),
        },
        {
          id: 'drinks-beer',
          categoryTitle: 'BREWERY & DRAUGHT SELECTION',
          subTitle: 'CRAFT BEERS ON TAP & IMPORTED PINTS',
          items: items.filter((i) => i.category === 'Beer'),
        },
        {
          id: 'drinks-wine',
          categoryTitle: 'VINTAGE CELLAR & SPARKLING',
          subTitle: 'GLOBAL VINEYARDS & SPARKLING RESERVES',
          items: items.filter((i) => i.category === 'Wine'),
        },
        {
          id: 'drinks-zero-proof',
          categoryTitle: 'ZERO-PROOF & ARTISAN BREWS',
          subTitle: 'REFRESHING COOLERS & COLD BREWS',
          items: items.filter((i) => i.category === 'Non-Alcoholic'),
        },
      ];

      const visibleDrinkGroups = drinkGroups.filter((g) => g.items.length > 0);
      if (visibleDrinkGroups.length > 0) return visibleDrinkGroups;

      return [
        {
          id: 'all-drinks-section',
          categoryTitle: 'BOTANICAL LAB & MIXOLOGY',
          subTitle: 'SMOKED INFUSIONS & FINE LIBATIONS',
          items: items,
        },
      ];
    }

    return [];
  }, [items, menuType, activeCategory, activeDietary, searchQuery]);

  return (
    <div className="pt-28 pb-24 bg-charcoal-950 text-stone-100 min-h-screen">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header (Tailored to Food Menu vs Drinks Menu) */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-terracotta-500/60 inline-block" />
            <span className="text-[11px] font-sans font-semibold tracking-widest text-terracotta-400 uppercase">
              {menuType === 'drinks' ? 'The 1522 Bar &amp; Cellar' : 'The 1522 Kitchen'}
            </span>
            <span className="w-6 h-px bg-terracotta-500/60 inline-block" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-stone-100 font-normal leading-tight mb-4">
            {menuType === 'drinks'
              ? 'Artisanal Mixology & Fine Libations'
              : 'Curated Food & Coastal Gastronomy'}
          </h1>

          <p className="text-stone-300 text-sm sm:text-base font-sans font-light leading-relaxed">
            {menuType === 'drinks'
              ? 'Crafted by master mixologists at Level 2, Goldfinch Hotel Mumbai. Featuring theatrical smoked bourbon cocktails, botanical gin infusions, craft draught beers, and vintage reserves.'
              : 'Crafted by master chefs at Level 2, Goldfinch Hotel Mumbai. Celebrating authentic coastal heritage, wood-fired sourdough pizzas, and slow-simmered tandoori roasts.'}
          </p>
        </div>

        {/* Printed Menu Sections (Two-Column Layout: Left Menu Text + Right ONE Large Food Image) */}
        {loading ? (
          <div className="bg-[#FAF7F0] rounded-3xl p-4 sm:p-7 animate-pulse space-y-5 border-2 border-[#D8CFC4] max-w-[850px] mx-auto">
            <div className="h-9 bg-[#E8DFC8] rounded-full w-56 mx-auto" />
            <div className="h-7 bg-[#E8DFC8] rounded w-44 mx-auto" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
              <div className="lg:col-span-7 space-y-4">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="h-11 bg-[#E8DFC8]/70 rounded w-full" />
                ))}
              </div>
              <div className="lg:col-span-5 h-80 bg-[#E8DFC8]/80 rounded-t-[125px] rounded-b-2xl" />
            </div>
          </div>
        ) : sections.length === 0 ? (
          <div className="text-center py-16 bg-[#FAF7F0] text-[#2C241E] rounded-3xl border-2 border-[#D8CFC4] p-8 space-y-4 shadow-xl">
            <p className="font-serif text-2xl text-[#4A3F35]">
              No {menuType === 'drinks' ? 'beverages' : 'dishes'} match your filter criteria.
            </p>
            <p className="text-xs sm:text-sm text-[#5C5248] font-sans">
              Try selecting another category or resetting your search term.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setActiveCategory(menuType === 'drinks' ? 'all-drinks' : 'all-food');
                setActiveDietary('all');
                setSearchQuery('');
                setSearchParams({ type: menuType });
              }}
              className="border-[#4A3F35] text-[#4A3F35] hover:bg-[#4A3F35] hover:text-white"
            >
              Show All {menuType === 'drinks' ? 'Drinks' : 'Food'}
            </Button>
          </div>
        ) : (
          <div className="space-y-12 animate-fade-in">
            {sections.map((section) => (
              <PrintedMenuSection
                key={section.id}
                categoryTitle={section.categoryTitle}
                subTitle={section.subTitle}
                items={section.items}
              />
            ))}
          </div>
        )}

        {/* Bottom Reservation Callout Strip */}
        <div className="mt-16 bg-charcoal-900 border border-stone-800 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-100 font-normal">
              Ready to Savor These Flavors Under the Stars?
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 font-sans">
              Book your preferred rooftop deck or sunset cabana in advance.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={Calendar}
            onClick={() => navigate('/reservation')}
            className="shrink-0"
          >
            Book Table Online
          </Button>
        </div>

      </div>
    </div>
  );
};

export default MenuPage;
