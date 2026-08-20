import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Utensils, Star, Flame, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';
import { useReservationModal } from '../context/ReservationContext';

export const SignatureDishesSection = () => {
  const navigate = useNavigate();
  const { openReservation } = useReservationModal();

  const featuredDish = {
    name: "Mangalorean Chicken Ghee Roast",
    subtitle: "The Legendary 1522 Heritage Creation",
    price: "₹645",
    description: "Tender succulently roasted chicken morsels steeped in crushed Byadgi red chilies, hand-roasted Kundapur coriander seeds, and pure clarified butter, finished with crisp curry leaves and served alongside steaming soft neer dosa.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80",
    tags: ["Legendary", "Kundapur Spices", "Pure Ghee", "Gluten-Free"],
    pairWith: "The 1522 Mumbai Skyline Smoked Old Fashioned"
  };

  const supportingDishes = [
    {
      name: "Truffle Edamame & Mushroom Dim Sum",
      price: "₹595",
      description: "Translucent crystal skin stuffed with charred forest mushrooms, edamame puree, winter truffle oil, and chili scallion crisp.",
      image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80",
      tag: "Artisanal"
    },
    {
      name: "Truffled Funghi & Fior di Latte Pizza",
      price: "₹675",
      description: "48-hour slow cold-fermented sourdough crust, San Marzano tomato reduction, wild porcini, fior di latte mozzarella, and truffle oil.",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      tag: "Wood-Fired"
    },
    {
      name: "Koliwada Prawns Crisp Bowl",
      price: "₹725",
      description: "Arabian Sea fresh tiger prawns marinated in coastal red pepper paste, ajwain, fried crisp with mint drizzle and lemon wedges.",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
      tag: "Coastal Classic"
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-charcoal-950 text-stone-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-charcoal-900 border border-stone-800 text-terracotta-400 text-[10px] font-sans font-bold uppercase tracking-widest mb-3">
              <Flame className="w-3 h-3" />
              Culinary Signatures
            </div>
            <h2 className="headline-section text-stone-100 font-normal">
              Masterpieces of the Kitchen
            </h2>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/menu')}
            icon={ArrowRight}
            iconPosition="right"
          >
            Explore Complete Menu
          </Button>
        </div>

        {/* Visual Showcase: 1 Large Featured Dish + 3 Supporting Dishes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* 1 Large Featured Dish (Col span 7) */}
          <div className="lg:col-span-7 bg-charcoal-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group">
            {/* Image Container with Consistent Aspect Ratio */}
            <div className="relative w-full h-[320px] sm:h-[400px] overflow-hidden">
              <img
                src={featuredDish.image}
                alt={featuredDish.name}
                className="w-full h-full object-cover object-center img-editorial filter contrast-[1.05] brightness-[0.92]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/20 to-transparent" />

              <div className="absolute top-5 left-5 bg-charcoal-950/85 backdrop-blur-md border border-stone-700/80 px-3.5 py-1.5 rounded-full flex items-center gap-2">
                <Star className="w-3.5 h-3.5 text-terracotta-400 fill-terracotta-400" />
                <span className="text-[10px] uppercase tracking-widest text-stone-200 font-bold font-sans">
                  #1 Guest Bestseller
                </span>
              </div>

              <div className="absolute bottom-4 right-5 font-serif text-2xl sm:text-3xl font-semibold text-stone-100 bg-charcoal-950/80 backdrop-blur-md px-4 py-1.5 rounded-xl border border-stone-800">
                {featuredDish.price}
              </div>
            </div>

            {/* Featured Dish Narrative */}
            <div className="p-6 sm:p-8 space-y-4">
              <div>
                <span className="text-[10px] font-sans uppercase tracking-widest text-terracotta-400 font-bold block mb-1">
                  {featuredDish.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-stone-100 font-medium group-hover:text-terracotta-300 transition-colors">
                  {featuredDish.name}
                </h3>
              </div>

              <p className="text-stone-300 text-sm font-sans font-light leading-relaxed">
                {featuredDish.description}
              </p>

              {/* Tags & Pairing */}
              <div className="pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
                <div className="flex flex-wrap gap-1.5">
                  {featuredDish.tags.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-charcoal-800 text-stone-300 text-[10px] uppercase tracking-wider border border-stone-700/60">
                      {t}
                    </span>
                  ))}
                </div>

                <span className="text-stone-400 text-[11px] italic">
                  Pair with: <strong className="text-terracotta-300 font-medium">{featuredDish.pairWith}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* 3 Supporting Dishes (Col span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {supportingDishes.map((dish, idx) => (
              <div
                key={idx}
                className="bg-charcoal-900 border border-stone-800 rounded-2xl p-4 sm:p-5 flex items-center gap-5 hover:border-terracotta-500/50 transition-all duration-300 group shadow-lg"
              >
                {/* Image */}
                <div className="w-24 sm:w-28 h-24 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-stone-700/80">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover object-center img-editorial filter contrast-[1.05]"
                    loading="lazy"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-terracotta-400 bg-terracotta-500/10 px-2 py-0.5 rounded border border-terracotta-500/20">
                      {dish.tag}
                    </span>
                    <span className="font-serif text-sm font-semibold text-stone-200">
                      {dish.price}
                    </span>
                  </div>

                  <h4 className="font-serif text-base text-stone-100 font-medium truncate group-hover:text-terracotta-300 transition-colors">
                    {dish.name}
                  </h4>

                  <p className="text-stone-400 text-xs font-sans font-light line-clamp-2 leading-relaxed">
                    {dish.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureDishesSection;
