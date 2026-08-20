import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, Maximize2, Camera } from 'lucide-react';
import LightboxModal from '../components/gallery/LightboxModal';
import { galleryService } from '../services/api';

const categories = [
  { id: 'All', label: 'All Photos' },
  { id: 'Ambience', label: 'Ambience' },
  { id: 'Food & Drink', label: 'Food & Drink' },
];

export const GallerySection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get('type') || searchParams.get('category');

  const getInitialCategory = () => {
    if (typeParam === 'ambience' || typeParam === 'Ambience') return 'Ambience';
    if (typeParam === 'food-drink' || typeParam === 'food' || typeParam === 'drinks' || typeParam === 'Food & Drink') return 'Food & Drink';
    return 'All';
  };

  const [selectedCat, setSelectedCat] = useState(getInitialCategory);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePhotoIdx, setActivePhotoIdx] = useState(null);

  // Sync state when URL params change
  useEffect(() => {
    const type = searchParams.get('type') || searchParams.get('category');
    if (type === 'ambience' || type === 'Ambience') {
      setSelectedCat('Ambience');
    } else if (type === 'food-drink' || type === 'food' || type === 'drinks' || type === 'Food & Drink') {
      setSelectedCat('Food & Drink');
    } else {
      setSelectedCat('All');
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const allItems = await galleryService.getItems('All');
        let filtered = allItems || [];
        if (selectedCat === 'Ambience') {
          filtered = filtered.filter((p) => p.category === 'Ambience');
        } else if (selectedCat === 'Food & Drink') {
          filtered = filtered.filter((p) => p.category === 'Food' || p.category === 'Drinks');
        }
        setPhotos(filtered);
      } catch (err) {
        console.warn('Failed to load gallery from server:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [selectedCat]);

  const handleCategoryClick = (catId) => {
    setSelectedCat(catId);
    if (catId === 'Ambience') {
      setSearchParams({ type: 'ambience' });
    } else if (catId === 'Food & Drink') {
      setSearchParams({ type: 'food-drink' });
    } else {
      setSearchParams({});
    }
  };

  const activePhoto = activePhotoIdx !== null ? photos[activePhotoIdx] : null;

  const handlePrev = () => {
    setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNext = () => {
    setActivePhotoIdx((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="gallery" className="py-12 bg-charcoal-900 border-t border-stone-800/80 text-stone-100 relative rounded-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-charcoal-800 border border-stone-700/80 text-terracotta-400 text-[10px] font-sans font-bold uppercase tracking-widest mb-3">
            <Camera className="w-3 h-3" />
            Visual Vignettes
          </div>
          <h2 className="headline-section text-stone-100 font-normal">
            {selectedCat === 'Ambience'
              ? 'Ambience & Atmosphere'
              : selectedCat === 'Food & Drink'
              ? 'Food & Artisanal Drinks'
              : 'The 1522 Visual Archive'}
          </h2>
          <p className="text-stone-400 text-sm sm:text-base font-sans font-light mt-3 leading-relaxed">
            {selectedCat === 'Ambience'
              ? 'Panoramic night sky seating, cascading botanical pergolas, warm timber textures, and candlelit sunset cabanas.'
              : selectedCat === 'Food & Drink'
              ? 'Authentic Mangalorean ghee roasts, 48-hour sourdough pizzas, theatrical smoked cocktails, and botanical libations.'
              : 'A window into starry Mumbai nights, clinking cocktail crystal, wood-fired flames, and electric rooftop moments.'}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-sans uppercase tracking-luxury transition-all whitespace-nowrap border ${
                selectedCat === cat.id
                  ? 'bg-terracotta-500 border-terracotta-500 text-stone-50 font-bold shadow-md'
                  : 'bg-charcoal-850 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry / Editorial Grid: Desktop 4 cols, Tablet 2-3 cols, Mobile 2 cols */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="h-48 sm:h-64 lg:h-72 rounded-2xl bg-charcoal-950 border border-stone-800" />
            ))}
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-16 bg-charcoal-950 rounded-2xl border border-stone-800 p-8 space-y-3">
            <p className="font-serif text-xl text-stone-200">No photos found in this category.</p>
            <button
              onClick={() => handleCategoryClick('All')}
              className="text-xs uppercase tracking-wider text-terracotta-400 hover:underline font-semibold"
            >
              View All Photos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 animate-fade-in">
            {photos.map((photo, index) => (
              <div
                key={photo._id || photo.id || index}
                onClick={() => setActivePhotoIdx(index)}
                className="group relative h-48 sm:h-64 lg:h-72 rounded-2xl overflow-hidden cursor-pointer border border-stone-800/80 bg-charcoal-950 hover:border-terracotta-500/50 transition-all duration-300 shadow-subtle hover:shadow-glow-terracotta"
              >
                <img
                  src={photo.image || photo.url}
                  alt={photo.title || photo.caption}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                {/* Hover overlay details */}
                <div className="absolute inset-0 p-3 sm:p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex justify-end">
                    <div className="w-8 h-8 rounded-full bg-charcoal-900/90 border border-stone-700 flex items-center justify-center text-stone-200 shadow-lg">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-terracotta-400 font-sans font-bold block mb-1">
                      {photo.category}
                    </span>
                    <p className="font-serif text-xs sm:text-sm text-stone-100 font-normal leading-snug line-clamp-2">
                      {photo.title || photo.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={activePhotoIdx !== null}
        activeImage={activePhoto}
        onClose={() => setActivePhotoIdx(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
};

export default GallerySection;
