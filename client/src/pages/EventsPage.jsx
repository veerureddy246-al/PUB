import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../components/common/SectionHeading';
import EventCard from '../components/events/EventCard';
import Button from '../components/common/Button';
import { eventService } from '../services/api';
import { Calendar, Music, Sparkles, Phone } from 'lucide-react';

export const EventsPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getEvents();
        setEvents(data);
      } catch (err) {
        console.error('Failed to load events', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="pt-28 pb-24 bg-charcoal-950 text-stone-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-terracotta-500/60 inline-block" />
            <span className="text-[11px] font-sans font-semibold tracking-widest text-terracotta-400 uppercase">
              Rhythm & Skyline Nights
            </span>
            <span className="w-6 h-px bg-terracotta-500/60 inline-block" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-stone-100 font-normal leading-tight mb-4">
            Live Performances & Weekly Soundscapes
          </h1>

          <p className="text-stone-300 text-sm sm:text-base font-sans font-light leading-relaxed">
            From acoustic Friday sundowners and rock nostalgia Thursdays to high-octane weekend DJ sets and Sunday Latin jazz brunches.
          </p>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="h-96 bg-charcoal-900 rounded-2xl border border-stone-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
              <EventCard key={event._id || event.title} event={event} />
            ))}
          </div>
        )}

        {/* Private Gig / Event booking banner */}
        <div className="mt-16 bg-charcoal-900 border border-stone-800 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-widest text-terracotta-400 font-sans font-bold block">
              Artists & Private Gigs
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-100 font-normal">
              Want to Perform or Host a Curated Music Mixer at 1522?
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 font-sans max-w-xl">
              We collaborate with touring independent artists, live vocalists, and international DJs. Inquire with our programming team.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:+919892283330"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-charcoal-800 hover:bg-charcoal-750 border border-stone-700 text-stone-200 rounded-lg text-xs font-sans uppercase tracking-wider font-semibold transition-colors"
            >
              <Phone className="w-4 h-4 text-terracotta-400" /> Call Programming
            </a>
            <Button
              variant="primary"
              size="md"
              icon={Calendar}
              onClick={() => navigate('/reservation')}
            >
              Reserve Table for Upcoming Gig
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
