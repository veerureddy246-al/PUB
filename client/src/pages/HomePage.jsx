import React from 'react';
import HeroSection from '../sections/HeroSection';
import BrandStorySection from '../sections/BrandStorySection';
import ExperienceSection from '../sections/ExperienceSection';
import SignatureDishesSection from '../sections/SignatureDishesSection';
import BarCocktailsSection from '../sections/BarCocktailsSection';
import GallerySection from '../sections/GallerySection';
import LiveEventsSection from '../sections/LiveEventsSection';
import OffersNewsSection from '../sections/OffersNewsSection';
import GuestReviewsSection from '../sections/GuestReviewsSection';
import LocationContactSection from '../sections/LocationContactSection';

export const HomePage = () => {
  return (
    <div className="space-y-0 overflow-hidden">
      {/* 1. Cinematic Full-Screen Hero */}
      <HeroSection />

      {/* 2. Brand Story (Editorial Split Layout) */}
      <BrandStorySection />

      {/* 3. The 4 Experiences (Dining, Cocktails, Rooftop, Music/Events) */}
      <ExperienceSection />

      {/* 4. Signature Dishes (Visual Showcase) */}
      <SignatureDishesSection />

      {/* 5. Bar & Cocktails (Dark Editorial Showcase) */}
      <BarCocktailsSection />

      {/* 7. Editorial Gallery & Lightbox */}
      <GallerySection />

      {/* 8. Live Events & Rhythm */}
      <LiveEventsSection />

      {/* 9. Offers & News */}
      <OffersNewsSection />

      {/* 10. Verified Guest Reviews */}
      <GuestReviewsSection />

      {/* 11. Location & Contact */}
      <LocationContactSection />
    </div>
  );
};

export default HomePage;
