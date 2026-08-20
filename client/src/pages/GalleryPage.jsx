import React from 'react';
import { useNavigate } from 'react-router-dom';
import GallerySection from '../sections/GallerySection';
import Button from '../components/common/Button';
import { Calendar } from 'lucide-react';

export const GalleryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-28 pb-24 bg-charcoal-950 text-stone-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-terracotta-500/60 inline-block" />
            <span className="text-[11px] font-sans font-semibold tracking-widest text-terracotta-400 uppercase">
              The Aurel Visual Archive
            </span>
            <span className="w-6 h-px bg-terracotta-500/60 inline-block" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-stone-100 font-normal leading-tight mb-4">
            Moments Under The Mumbai Sky
          </h1>

          <p className="text-stone-300 text-sm sm:text-base font-sans font-light leading-relaxed">
            Explore the textures, cocktails, sunset lights, and electric rooftop energy captured at Aurel Bar &amp; Kitchen, Goldfinch Hotel.
          </p>
        </div>

        <GallerySection />

        <div className="mt-16 text-center space-y-4">
          <p className="text-xs text-stone-400 uppercase tracking-widest font-sans font-semibold">
            Tag us in your stories @AurelMumbai to be featured
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="primary"
              size="md"
              icon={Calendar}
              onClick={() => navigate('/reservation')}
            >
              Book Your Table Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
