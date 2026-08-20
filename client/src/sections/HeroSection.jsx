import React from 'react';

export const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-32 sm:pt-36 pb-20 sm:pb-24 overflow-hidden">
      {/* Background Image with Cinematic Dark Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
          alt="1522 Mumbai Rooftop Dining Atmosphere"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.32] contrast-[1.12] transition-transform duration-1000"
          loading="eager"
        />
        {/* Cinematic gradient overlays for high contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/50 to-charcoal-950/80" />
        <div className="absolute inset-0 bg-radial-gradient from-terracotta-500/10 via-transparent to-charcoal-950/90" />
      </div>

      {/* Architectural subtle grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]" />

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
