import SectionHeading from '../components/common/SectionHeading';
import { Star } from 'lucide-react';
import { initialReviews } from '../services/seedData.js';

export const GuestReviewsSection = () => {
  return (
    <section className="py-24 bg-charcoal-900 border-t border-stone-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Verified Hospitality Accolades"
          title="Loved by Mumbai’s Connoisseurs & Night Owls"
          subtitle="Real impressions from guests celebrating birthdays, weekend sundowners, and business dinners at 1522 Bar & Kitchen."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {initialReviews.map((rev, index) => (
            <div
              key={index}
              className="bg-charcoal-850 border border-stone-700/70 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative shadow-subtle hover:border-terracotta-500/40 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Rating stars & deck badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-terracotta-400 text-terracotta-400" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-charcoal-750 text-stone-300 border border-stone-700">
                    {rev.deck}
                  </span>
                </div>

                <p className="text-stone-300 text-xs sm:text-sm font-sans font-light leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-800/80 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm text-stone-100 font-medium">
                    {rev.guestName}
                  </h4>
                  <span className="text-[11px] text-stone-400 font-sans block">
                    {rev.role}
                  </span>
                </div>
                <span className="text-[10px] text-stone-500 font-sans">
                  {rev.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuestReviewsSection;
