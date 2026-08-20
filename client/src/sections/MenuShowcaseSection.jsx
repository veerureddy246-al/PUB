import React, { useState, useEffect } from 'react';
import SectionHeading from '../components/common/SectionHeading';
import MenuCard from '../components/menu/MenuCard';
import Button from '../components/common/Button';
import { menuService } from '../services/api';
import { ArrowRight, Utensils, Wine, Sparkles } from 'lucide-react';

export const MenuShowcaseSection = ({ onNavigate }) => {
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState('signatures');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const data = await menuService.getItems(activeTab);
        setItems(data.slice(0, 6)); // Display top curated items
      } catch (err) {
        console.error('Failed to load menu items', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [activeTab]);

  const tabs = [
    { id: 'signatures', label: "Chef's Signatures" },
    { id: 'starters', label: 'Starters & Tapas' },
    { id: 'craft-cocktails', label: 'Artisanal Mixology' },
    { id: 'wood-fired-pizza', label: 'Wood-Fired Pizzas' },
    { id: 'mains-indian', label: 'Progressive Indian' },
  ];

  return (
    <section className="py-24 bg-charcoal-900 border-t border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Culinary & Mixology Curation"
          title="Gastronomic Craftsmanship High Above Mumbai"
          subtitle="From our legendary Mangalorean Ghee Roasts to slow-fermented sourdough pizzas and applewood-smoked bourbon cocktails, every dish tells a story of passion and authentic provenance."
        />

        {/* Tab Navigation */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-sans uppercase tracking-luxury transition-all whitespace-nowrap border ${
                  isActive
                    ? 'bg-terracotta-500 border-terracotta-500 text-stone-50 font-bold shadow-md'
                    : 'bg-charcoal-850 border-stone-700/80 text-stone-400 hover:text-stone-200 hover:border-stone-500'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Menu Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-72 bg-charcoal-800/60 rounded-2xl border border-stone-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {items.map((item) => (
              <MenuCard key={item._id || item.name} item={item} />
            ))}
          </div>
        )}

        {/* Explore Full Menu Action Banner */}
        <div className="mt-14 p-8 rounded-3xl bg-charcoal-850 border border-stone-700/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-serif text-xl sm:text-2xl text-stone-100 font-normal">
              Craving More? Explore Our 80+ Item Digital Compendium
            </h4>
            <p className="text-stone-400 text-xs sm:text-sm font-sans font-light">
              Filter by dietary preferences, spice tolerance, single malts, and chef pairing recommendations.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => onNavigate('menu')}
            className="shrink-0"
          >
            View Complete Digital Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MenuShowcaseSection;
