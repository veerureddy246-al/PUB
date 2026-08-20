import React, { useState, useEffect } from 'react';
import { settingsService } from '../services/api';

export const HeroSection = () => {
  const [heroData, setHeroData] = useState({
    mediaUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2400&q=95',
  });

  useEffect(() => {
    settingsService.getHero().then((data) => {
      if (data && data.mediaUrl) {
        setHeroData(data);
      }
    }).catch(() => {});
  }, []);

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-32 sm:pt-36 pb-20 sm:pb-24 overflow-hidden">
      {/* High-Clarity, Vibrant, Bright Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroData.mediaUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2400&q=95'}
          alt="1522 Mumbai Rooftop Dining Atmosphere"
          className="w-full h-full object-cover object-center scale-100 filter brightness-[1.02] contrast-[1.06] saturate-[1.12] transition-transform duration-1000"
          loading="eager"
        />
        {/* Gentle natural vignette - soft top for navbar contrast, gentle bottom fade into next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/50 via-transparent to-charcoal-950/80 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        {/* Accessible SEO Heading */}
        <h1 className="sr-only">
          1522 Bar &amp; Kitchen Mumbai — Rooftop Gastronomy &amp; Mixology
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;
