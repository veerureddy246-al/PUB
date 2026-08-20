import React, { useState } from 'react';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import { inquiryService } from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { Users, CheckCircle2, Sparkles, Building, Wine, Utensils, Send } from 'lucide-react';

export const PrivateDiningSection = () => {
  const { addToast } = useNotification();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Inquiry Form State
  const [formData, setFormData] = useState({
    eventType: 'corporate',
    organizerName: '',
    email: '',
    phone: '',
    companyName: '',
    estimatedGuests: 40,
    targetDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
    deckPreference: 'Upper Sky Deck & Cocktail Lounge',
    cateringPackage: 'signature-cocktail-tapas',
    additionalNotes: '',
  });

  const packages = [
    {
      id: 'signature-cocktail-tapas',
      name: 'Signature Cocktails & Tapas Soiree',
      price: '₹2,200++ per guest',
      includes: '4 Signature Cocktails, 4 Veg & 4 Non-Veg Tapas, Live DJ Sound',
    },
    {
      id: 'grand-rooftop-buffet',
      name: 'Grand Rooftop Feast & Bar',
      price: '₹2,950++ per guest',
      includes: 'Full Premium Spirits Bar, Wood-Fired Pizzas, Coastal Mains & Dessert Station',
    },
    {
      id: 'custom-curation',
      name: 'Exclusive Deck Buyout & Master Mixology',
      price: 'Custom Curated Quote',
      includes: 'Full deck privatization, customized cocktail menus & dedicated hospitality captain',
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.organizerName || !formData.email || !formData.phone) {
      addToast('Please complete all required fields.', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await inquiryService.create(formData);
      if (res.success) {
        setSubmitted(true);
        addToast('Your Private Gathering inquiry has been dispatched to our hospitality curators!', 'success');
      }
    } catch (err) {
      addToast('Could not submit inquiry. Please call +91 98922 83330 directly.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-charcoal-900 border-t border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Gathering Overview & Capacities */}
          <div className="lg:col-span-5 space-y-6">
            <SectionHeading
              align="left"
              badge="Corporate & Private Soirées"
              title="Elevate Your Next Milestone Under The Stars"
              subtitle="From Fortune 500 corporate mixers to unforgettable milestone birthdays and intimate brand launches, 1522 Mumbai offers unmatched rooftop sophistication."
              className="mb-6"
            />

            <div className="space-y-4 text-xs sm:text-sm text-stone-300 font-sans font-light">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-charcoal-850 border border-stone-800">
                <Users className="w-5 h-5 text-terracotta-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-stone-100 mb-0.5">Flexible Capacity: 20 to 150 Guests</h4>
                  <p className="text-stone-400 text-xs">Full deck buyouts or semi-private botanical pergolas tailored to your guest count.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-charcoal-850 border border-stone-800">
                <Wine className="w-5 h-5 text-terracotta-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-stone-100 mb-0.5">Bespoke F&B & Bar Packages</h4>
                  <p className="text-stone-400 text-xs">Custom branded welcome cocktails, curated pass-around tandoor grills and sommelier pairings.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-charcoal-850 border border-stone-800">
                <Sparkles className="w-5 h-5 text-terracotta-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-stone-100 mb-0.5">AV, Live Music & Valet Hospitality</h4>
                  <p className="text-stone-400 text-xs">Equipped with wireless mics, projector setups, dedicated event host and valet parking at Goldfinch Hotel.</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-charcoal-950/80 border border-stone-800 text-xs text-stone-400 font-sans">
              <span className="text-stone-200 font-medium block mb-1">Direct Event Concierge Helpline:</span>
              <div className="flex items-center gap-4 text-stone-300 font-serif text-sm">
                <a href="tel:+919892283330" className="hover:text-terracotta-400 transition-colors">+91 98922 83330</a>
                <span>•</span>
                <a href="mailto:events@1522mumbai.com" className="hover:text-terracotta-400 transition-colors">events@1522mumbai.com</a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry & Quote Wizard */}
          <div className="lg:col-span-7 bg-charcoal-850 border border-stone-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-stone-100">Inquiry Successfully Received</h3>
                <p className="text-stone-300 text-sm max-w-md mx-auto font-sans font-light">
                  Thank you, <strong className="text-stone-100">{formData.organizerName}</strong>. Our Private Dining Director will review your requirements for {formData.estimatedGuests} guests on {formData.targetDate} and prepare a custom proposal within 2 hours.
                </p>
                <div className="pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData(prev => ({ ...prev, organizerName: '', email: '', phone: '', additionalNotes: '' }));
                    }}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-terracotta-400 font-sans font-bold block mb-1">
                    Step 1 of 2
                  </span>
                  <h3 className="font-serif text-2xl text-stone-100 font-normal">
                    Request an Event Curation Quote
                  </h3>
                  <p className="text-xs text-stone-400 font-sans mt-0.5">
                    Tell us about your gathering, guest count, and preferred date.
                  </p>
                </div>

                {/* Event Type Grid */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-300 font-semibold font-sans mb-2">
                    Event Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'corporate', label: 'Corporate Mixer' },
                      { id: 'birthday', label: 'Birthday Celebration' },
                      { id: 'anniversary', label: 'Anniversary / Family' },
                      { id: 'cocktail-mixer', label: 'Cocktail & DJ Soirée' },
                      { id: 'brand-launch', label: 'Brand / Media Launch' },
                      { id: 'custom', label: 'Full Deck Buyout' },
                    ].map(t => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, eventType: t.id }))}
                        className={`p-2.5 rounded-lg text-xs font-sans text-left transition-all border ${
                          formData.eventType === t.id
                            ? 'bg-terracotta-500/20 border-terracotta-500 text-terracotta-300 font-semibold'
                            : 'bg-charcoal-900 border-stone-700/80 text-stone-300 hover:border-stone-500'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guest Count Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs font-sans mb-2">
                    <span className="text-stone-300 font-semibold uppercase tracking-widest text-[11px]">
                      Estimated Guests
                    </span>
                    <span className="font-serif text-lg font-bold text-terracotta-400">
                      {formData.estimatedGuests} Guests
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="150"
                    step="5"
                    value={formData.estimatedGuests}
                    onChange={(e) => setFormData(prev => ({ ...prev, estimatedGuests: Number(e.target.value) }))}
                    className="w-full h-1.5 bg-charcoal-700 rounded-lg appearance-none cursor-pointer accent-terracotta-500"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 font-sans mt-1">
                    <span>15 Pax (Intimate)</span>
                    <span>75 Pax (Half Deck)</span>
                    <span>150 Pax (Full Buyout)</span>
                  </div>
                </div>

                {/* Package Select */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-300 font-semibold font-sans mb-2">
                    Preferred F&B Curation
                  </label>
                  <div className="space-y-2">
                    {packages.map(pkg => (
                      <div
                        key={pkg.id}
                        onClick={() => setFormData(prev => ({ ...prev, cateringPackage: pkg.id }))}
                        className={`p-3 rounded-xl border cursor-pointer transition-all text-left flex items-start justify-between gap-3 ${
                          formData.cateringPackage === pkg.id
                            ? 'bg-charcoal-800 border-terracotta-500 ring-1 ring-terracotta-500'
                            : 'bg-charcoal-900 border-stone-800 hover:border-stone-600'
                        }`}
                      >
                        <div>
                          <span className="font-serif text-sm text-stone-100 block font-medium">
                            {pkg.name}
                          </span>
                          <span className="text-[11px] text-stone-400 font-sans block">
                            {pkg.includes}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-terracotta-400 shrink-0 font-sans">
                          {pkg.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-300 font-semibold font-sans mb-1.5">
                      Organizer Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Shalini Roy"
                      value={formData.organizerName}
                      onChange={(e) => setFormData(prev => ({ ...prev, organizerName: e.target.value }))}
                      className="w-full bg-charcoal-900 border border-stone-700 rounded-lg px-4 py-2.5 text-stone-100 text-xs focus:outline-none focus:border-terracotta-500 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-300 font-semibold font-sans mb-1.5">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98200 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-charcoal-900 border border-stone-700 rounded-lg px-4 py-2.5 text-stone-100 text-xs focus:outline-none focus:border-terracotta-500 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-300 font-semibold font-sans mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. shalini@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-charcoal-900 border border-stone-700 rounded-lg px-4 py-2.5 text-stone-100 text-xs focus:outline-none focus:border-terracotta-500 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-300 font-semibold font-sans mb-1.5">
                      Company / Organization (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Corp"
                      value={formData.companyName}
                      onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      className="w-full bg-charcoal-900 border border-stone-700 rounded-lg px-4 py-2.5 text-stone-100 text-xs focus:outline-none focus:border-terracotta-500 font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-300 font-semibold font-sans mb-1.5">
                    Target Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.targetDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, targetDate: e.target.value }))}
                    className="w-full bg-charcoal-900 border border-stone-700 rounded-lg px-4 py-2.5 text-stone-100 text-xs focus:outline-none focus:border-terracotta-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-300 font-semibold font-sans mb-1.5">
                    Specific Requirements or AV / Sound Needs
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Need dedicated bar counter, acoustic live setup, Jain food options, welcome podium..."
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                    className="w-full bg-charcoal-900 border border-stone-700 rounded-lg px-4 py-2 text-stone-100 text-xs focus:outline-none focus:border-terracotta-500 font-sans"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={Send}
                  loading={loading}
                  className="w-full"
                >
                  Submit Private Event Inquiry
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivateDiningSection;
