import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Car, Navigation, Calendar } from 'lucide-react';
import Button from '../components/common/Button';
import { useReservationModal } from '../context/ReservationContext';
import { settingsService } from '../services/api';

export const LocationContactSection = () => {
  const { openReservation } = useReservationModal();
  const [settings, setSettings] = useState({
    restaurantName: '1522 Bar & Kitchen, Mumbai',
    address: 'Level 2, Goldfinch Hotel, MIDC Central Road, Near Akruti Center Point, Chakala Industrial Area, Andheri East, Mumbai, Maharashtra 400093.',
    phone: '+91 98922 83330',
    secondaryPhone: '+91 98201 44552',
    email: 'reservations@1522mumbai.com',
    openingHours: {
      weekday: '12:00 PM – 01:30 AM',
      weekend: '12:00 PM – 01:30 AM',
    },
    googleMapsUrl: 'https://maps.google.com/?q=1522+Bar+and+Kitchen+Goldfinch+Hotel+Mumbai',
  });

  useEffect(() => {
    settingsService.getSettings().then(data => {
      if (data) setSettings(prev => ({ ...prev, ...data }));
    }).catch(() => {});
  }, []);

  return (
    <section id="contact" className="py-24 sm:py-32 bg-charcoal-950 text-stone-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-charcoal-900 border border-stone-800 text-terracotta-400 text-[10px] font-sans font-bold uppercase tracking-widest mb-3">
            <MapPin className="w-3 h-3" />
            Location & Reservations
          </div>
          <h2 className="headline-section text-stone-100 font-normal">
            Visit 1522 Mumbai
          </h2>
          <p className="text-stone-400 text-sm sm:text-base font-sans font-light mt-3 leading-relaxed">
            Perched on Level 2 of Goldfinch Hotel in Chakala, Andheri East. Open 7 days a week with complimentary valet parking and dedicated elevator access.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Essential Contact Details & Direct CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-charcoal-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-terracotta-400 font-sans font-bold block mb-1">
                  Prime Andheri East Address
                </span>
                <h3 className="font-serif text-2xl text-stone-100 font-normal">
                  {settings.restaurantName || '1522 Bar & Kitchen, Mumbai'}
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm font-sans mt-2 leading-relaxed">
                  {settings.address}
                </p>
              </div>

              {/* Information Strip */}
              <div className="space-y-4 pt-4 border-t border-stone-800 text-xs font-sans">
                {/* Hours */}
                <div className="flex items-center gap-3.5 text-stone-200">
                  <div className="p-2.5 rounded-xl bg-charcoal-800 text-olive-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block text-stone-100">Hours of Operation</span>
                    <span className="text-stone-400 text-[11px]">{settings.openingHours?.weekday || '12:00 PM – 01:30 AM'} (Open Daily)</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3.5 text-stone-200">
                  <div className="p-2.5 rounded-xl bg-charcoal-800 text-terracotta-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block text-stone-100">Direct Reservations Hotline</span>
                    <div className="flex flex-wrap gap-2 text-[11px] text-terracotta-400">
                      <a href={`tel:${settings.phone}`} className="hover:underline">{settings.phone}</a>
                      {settings.secondaryPhone && (
                        <>
                          <span>•</span>
                          <a href={`tel:${settings.secondaryPhone}`} className="hover:underline">{settings.secondaryPhone}</a>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3.5 text-stone-200">
                  <div className="p-2.5 rounded-xl bg-charcoal-800 text-stone-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block text-stone-100">Guest Relations & Corporate</span>
                    <a href={`mailto:${settings.email}`} className="text-stone-400 hover:text-stone-200 text-[11px]">
                      {settings.email}
                    </a>
                  </div>
                </div>

                {/* Valet */}
                <div className="flex items-center gap-3.5 text-stone-200">
                  <div className="p-2.5 rounded-xl bg-charcoal-800 text-terracotta-400 shrink-0">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block text-stone-100">Complimentary Valet Parking</span>
                    <span className="text-stone-400 text-[11px]">Available at Goldfinch Hotel Main Porch</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Reservation CTA */}
            <Button
              variant="primary"
              size="lg"
              icon={Calendar}
              onClick={() => openReservation()}
              className="w-full justify-center shadow-xl hover:shadow-glow-terracotta text-xs uppercase tracking-wider font-semibold"
            >
              RESERVE A TABLE NOW
            </Button>
          </div>

          {/* Right Column: Google Maps Visualizer & Direction CTA */}
          <div className="lg:col-span-7 bg-charcoal-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
            <div className="relative w-full h-[360px] sm:h-[420px] bg-charcoal-950">
              <iframe
                title="1522 Mumbai Google Map Location"
                src="https://maps.google.com/maps?q=1522%20Bar%20and%20Kitchen%20Goldfinch%20Hotel%20Andheri%20East%20Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-85"
                loading="lazy"
                allowFullScreen
              />

              {/* Floating Address Badge */}
              <div className="absolute top-4 left-4 bg-charcoal-900/95 backdrop-blur-md border border-stone-700 p-4 rounded-2xl shadow-xl max-w-xs">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-terracotta-400" />
                  <span className="font-serif text-sm font-semibold text-stone-100">{settings.restaurantName || '1522 Bar & Kitchen'}</span>
                </div>
                <p className="text-[10px] text-stone-300 font-sans">
                  {settings.address}
                </p>
                <div className="mt-2 pt-2 border-t border-stone-800 text-[10px] text-stone-400 font-sans flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">● Open Now</span>
                  <span>Closes 01:30 AM</span>
                </div>
              </div>
            </div>

            {/* Directions assistance strip + Map CTA */}
            <div className="p-6 bg-charcoal-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
              <div className="text-stone-300">
                <strong className="text-stone-100 block">Accessibility:</strong>
                <span className="text-stone-400 text-[11px]">
                  5 mins from Chakala Metro / WEH • 15 mins from Mumbai Int'l Airport (T2).
                </span>
              </div>
              
              <a
                href={settings.googleMapsUrl || 'https://maps.google.com/?q=1522+Bar+and+Kitchen+Goldfinch+Hotel+Mumbai'}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-charcoal-750 hover:bg-charcoal-700 text-terracotta-400 hover:text-terracotta-300 border border-stone-700 font-semibold uppercase tracking-wider text-[11px] shrink-0 transition-colors flex items-center gap-2 shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationContactSection;
