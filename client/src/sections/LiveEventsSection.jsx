import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Music2, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import EventCard from '../components/events/EventCard';
import Button from '../components/common/Button';
import { eventService } from '../services/api';

export const LiveEventsSection = () => {
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
    <section id="events" className="py-24 sm:py-32 bg-charcoal-950 text-stone-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-charcoal-900 border border-stone-800 text-terracotta-400 text-[10px] font-sans font-bold uppercase tracking-widest mb-3">
              <Music2 className="w-3 h-3" />
              Soundscape & Rhythm
            </div>
            <h2 className="headline-section text-stone-100 font-normal">
              Live Acoustic Nights & Rooftop Gigs
            </h2>
            <p className="text-stone-400 text-sm sm:text-base font-sans font-light mt-3 leading-relaxed">
              At 1522 Mumbai, music is woven into our heritage. Experience soulful indie acoustics, Latin Sunday brunches, and melodic weekend DJ sundowners.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={Calendar}
              onClick={() => navigate('/events')}
            >
              All Events Schedule
            </Button>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
            {[1, 2].map((n) => (
              <div key={n} className="h-96 bg-charcoal-900 rounded-3xl border border-stone-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.slice(0, 2).map((event) => (
              <EventCard key={event._id || event.title} event={event} />
            ))}
          </div>
        )}

        {/* Private Stage / Corporate Gathering Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-charcoal-900/70 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-sans text-stone-300">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-charcoal-800 text-terracotta-400 shrink-0">
              <Music2 className="w-6 h-6" />
            </div>
            <div>
              <span className="font-semibold text-stone-100 text-sm block">
                Hosting a Brand Launch, Live Gig or Private Sundowner?
              </span>
              <span className="text-stone-400 text-xs">
                We provide full concert-grade acoustics, PA sound staging, and DJ console setups for up to 150 guests.
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/private-dining')}
            className="shrink-0 text-terracotta-400 hover:text-terracotta-300 whitespace-nowrap"
          >
            Inquire for Private Sound & Stage →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LiveEventsSection;
