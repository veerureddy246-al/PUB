import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Flame, 
  Wine, 
  UtensilsCrossed, 
  Music2, 
  Sparkles, 
  Clock, 
  MapPin, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  Compass,
  Star
} from 'lucide-react';
import Button from '../components/common/Button';
import BrandStorySection from '../sections/BrandStorySection';
import { GlowingEffect } from '../components/ui/glowing-effect';

export const OurStoryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-28 pb-24 bg-charcoal-950 text-stone-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-terracotta-500/60 inline-block" />
            <span className="text-[11px] font-sans font-semibold tracking-widest text-terracotta-400 uppercase">
              The Aurel Chronicle
            </span>
            <span className="w-6 h-px bg-terracotta-500/60 inline-block" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-stone-100 font-normal leading-tight mb-4">
            Our Story &amp; Philosophy
          </h1>

          <p className="text-stone-300 text-sm sm:text-base font-sans font-light leading-relaxed">
            Born from a deep love for soulful rock rhythm, open-air living, and coastal culinary heritage. Discover how Aurel became one of Mumbai's most iconic rooftop dining and nightlife sanctuaries.
          </p>
        </div>

        {/* Embedded Brand Story Split Section */}
        <div className="rounded-3xl overflow-hidden border border-stone-800 bg-charcoal-900/60 shadow-2xl mb-20">
          <BrandStorySection onNavigate={(dest) => navigate(`/${dest}`)} />
        </div>

        {/* The 4 Architectural & Culinary Pillars with Glowing Effect */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-widest text-terracotta-400 font-sans font-bold block mb-2">
              Core Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-100 font-normal">
              The Four Pillars of Aurel
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="relative h-full rounded-2xl border border-stone-800 p-2 md:rounded-3xl md:p-3 bg-charcoal-950/60 transition-all">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl bg-charcoal-900 border border-stone-800/90 p-6 space-y-4 hover:border-terracotta-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-terracotta-500/15 border border-terracotta-500/30 flex items-center justify-center text-terracotta-400 group-hover:scale-105 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase tracking-widest text-stone-500 font-sans font-bold block">
                  01 / SANCTUARY
                </span>
                <h3 className="font-serif text-xl text-stone-100 font-medium">
                  High-Altitude Escape
                </h3>
                <p className="text-xs text-stone-400 font-sans leading-relaxed font-light">
                  Perched on Level 2 of Goldfinch Hotel in Andheri East, our multi-zoned open sky deck offers a breath of fresh air and panoramic city breezes away from chaotic street traffic.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="relative h-full rounded-2xl border border-stone-800 p-2 md:rounded-3xl md:p-3 bg-charcoal-950/60 transition-all">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl bg-charcoal-900 border border-stone-800/90 p-6 space-y-4 hover:border-terracotta-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-terracotta-500/15 border border-terracotta-500/30 flex items-center justify-center text-terracotta-400 group-hover:scale-105 transition-transform">
                  <Flame className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase tracking-widest text-stone-500 font-sans font-bold block">
                  02 / CULINARY SOUL
                </span>
                <h3 className="font-serif text-xl text-stone-100 font-medium">
                  Coastal Heritage Craft
                </h3>
                <p className="text-xs text-stone-400 font-sans leading-relaxed font-light">
                  Authentic Kundapur stone-ground spices, slow-simmered ghee roasts, 24-hour Dal, and wood-fired artisanal pizzas crafted from slow-fermented dough in open tandoors.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="relative h-full rounded-2xl border border-stone-800 p-2 md:rounded-3xl md:p-3 bg-charcoal-950/60 transition-all">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl bg-charcoal-900 border border-stone-800/90 p-6 space-y-4 hover:border-terracotta-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-terracotta-500/15 border border-terracotta-500/30 flex items-center justify-center text-terracotta-400 group-hover:scale-105 transition-transform">
                  <Wine className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase tracking-widest text-stone-500 font-sans font-bold block">
                  03 / MIXOLOGY LAB
                </span>
                <h3 className="font-serif text-xl text-stone-100 font-medium">
                  Smoked &amp; Botanical Mixes
                </h3>
                <p className="text-xs text-stone-400 font-sans leading-relaxed font-light">
                  Over 35 bespoke concoctions smoked under applewood cloches, wild forest berry reductions, artisanal tonic mists, and rare single malts from world-class distilleries.
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="relative h-full rounded-2xl border border-stone-800 p-2 md:rounded-3xl md:p-3 bg-charcoal-950/60 transition-all">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl bg-charcoal-900 border border-stone-800/90 p-6 space-y-4 hover:border-terracotta-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-terracotta-500/15 border border-terracotta-500/30 flex items-center justify-center text-terracotta-400 group-hover:scale-105 transition-transform">
                  <Music2 className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase tracking-widest text-stone-500 font-sans font-bold block">
                  04 / SOUNDSCAPE
                </span>
                <h3 className="font-serif text-xl text-stone-100 font-medium">
                  Vintage Rock &amp; Beats
                </h3>
                <p className="text-xs text-stone-400 font-sans leading-relaxed font-light">
                  Music is woven into our DNA. From soulful acoustic indie sundowners on Friday evenings to deep house rooftop weekend grooves and laidback Sunday Latin jazz brunches.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Heritage Quote & Atmosphere Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-stone-800 bg-charcoal-900 p-8 sm:p-14 mb-20 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl relative z-10 space-y-6">
            <span className="text-[10px] uppercase tracking-widest text-terracotta-400 font-sans font-bold block">
              The Hospitality Ethos
            </span>
            <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-stone-100 font-light italic leading-snug">
              "We built Aurel as an antidote to crowded, enclosed nightlife—a place where the sky is open, the music is soulful, and every guest feels like an old friend returning home."
            </blockquote>
            <div className="pt-2 flex items-center gap-4 text-xs font-sans text-stone-400">
              <div className="w-10 h-10 rounded-full bg-charcoal-800 border border-stone-700 flex items-center justify-center font-serif font-bold text-terracotta-400">
                A
              </div>
              <div>
                <span className="font-semibold text-stone-200 block">The Aurel Mumbai Team</span>
                <span>Level 2, Goldfinch Hotel • Andheri East</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action Strip */}
        <div className="bg-gradient-to-r from-charcoal-900 via-charcoal-850 to-charcoal-900 border border-stone-800 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl text-center md:text-left">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-100 font-normal">
              Experience Aurel Mumbai in Person
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm font-sans max-w-lg">
              Join us for sunset sundowners, wood-fired dinners, or live acoustic nights under the Mumbai stars.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Button
              variant="primary"
              size="lg"
              icon={Calendar}
              onClick={() => navigate('/reservation')}
            >
              Reserve a Table
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon={UtensilsCrossed}
              onClick={() => navigate('/menu')}
            >
              Explore Menu
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OurStoryPage;
