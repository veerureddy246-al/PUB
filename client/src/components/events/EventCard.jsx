import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Music, Users, Check } from 'lucide-react';
import Button from '../common/Button';
import { useReservationModal } from '../../context/ReservationContext';
import { useNotification } from '../../context/NotificationContext';
import { eventService } from '../../services/api';

export const EventCard = ({ event }) => {
  const { openReservation } = useReservationModal();
  const { addToast } = useNotification();
  const [rsvpDone, setRsvpDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRSVP = async () => {
    setLoading(true);
    try {
      await eventService.rsvp(event._id, { guestName: 'Guest' });
      setRsvpDone(true);
      addToast(`RSVP registered for ${event.title}! Table reservation is recommended to guarantee entry.`, 'success');
    } catch (err) {
      addToast('Could not register RSVP. Please book a table directly.', 'info');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group bg-charcoal-850/80 border border-stone-700/60 rounded-2xl overflow-hidden hover:border-terracotta-500/40 hover:bg-charcoal-800 transition-all duration-300 flex flex-col justify-between shadow-subtle hover:shadow-glow-terracotta">
      {/* Image Banner */}
      <div className="relative h-56 w-full overflow-hidden bg-charcoal-900">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-transparent" />

        {/* Date / Day Badge */}
        <div className="absolute top-4 left-4 bg-charcoal-950/90 border border-stone-700 px-3 py-1.5 rounded-xl text-center backdrop-blur-md">
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-terracotta-400 block">
            {event.day}
          </span>
          <span className="font-serif text-sm text-stone-100 font-semibold block">
            {event.date}
          </span>
        </div>

        {/* Deck Zone Pill */}
        <div className="absolute top-4 right-4 bg-charcoal-950/80 border border-stone-700/80 px-2.5 py-1 rounded-full text-[10px] uppercase font-sans tracking-wider text-stone-300">
          {event.deck}
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-[11px] uppercase tracking-luxury text-terracotta-300 font-sans font-semibold mb-1 block">
            {event.genre}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl text-stone-100 font-normal leading-snug">
            {event.title}
          </h3>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between text-xs text-stone-300 font-sans border-b border-stone-800 pb-3">
            <div className="flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-terracotta-400" />
              <span>Artist: <strong className="text-stone-100">{event.artist}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-olive-400" />
              <span>{event.timing}</span>
            </div>
          </div>

          <p className="text-stone-400 text-xs sm:text-[13px] leading-relaxed font-sans font-light">
            {event.description}
          </p>

          <div className="bg-charcoal-900/60 p-3 rounded-lg border border-stone-800 text-[11px] text-stone-400 font-sans">
            <span className="text-terracotta-400 font-semibold uppercase block mb-0.5">Policy / Entry</span>
            {event.coverCharge}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() => openReservation({ occasion: 'celebration' })}
            className="flex-1"
          >
            Reserve Table for Event
          </Button>

          <button
            onClick={handleRSVP}
            disabled={rsvpDone || loading}
            className={`px-4 py-2.5 rounded-lg text-xs font-sans font-medium uppercase tracking-wider transition-all border shrink-0 ${
              rsvpDone
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                : 'bg-charcoal-800 border-stone-700 text-stone-300 hover:text-stone-100 hover:border-stone-500'
            }`}
          >
            {rsvpDone ? (
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> RSVP'd ({event.rsvpCount + 1})
              </span>
            ) : (
              'Quick RSVP'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
