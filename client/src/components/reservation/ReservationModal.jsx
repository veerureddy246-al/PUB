import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Users, Sparkles, Check, Download, Share2, MapPin, AlertCircle, RefreshCw, Phone, Mail, User } from 'lucide-react';
import confetti from 'canvas-confetti';
import Modal from '../common/Modal';
import Button from '../common/Button';
import DeckSelector, { decks } from './DeckSelector';
import { reservationService } from '../../services/api';
import { useNotification } from '../../context/NotificationContext';
import { useReservationModal } from '../../context/ReservationContext';

export const ReservationModal = () => {
  const { isOpen, initialParams, closeReservation } = useReservationModal();
  const { addToast } = useNotification();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const todayStr = new Date().toISOString().split('T')[0];

  // Form State
  const [formData, setFormData] = useState({
    deckZone: 'sky-deck',
    date: todayStr,
    time: '20:00',
    timeSlot: '20:00',
    guests: 2,
    partySize: 2,
    occasion: 'casual',
    name: '',
    guestName: '',
    email: '',
    phone: '',
    specialRequest: '',
    specialRequests: '',
  });

  // Sync initial params when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setServerError(null);
      setValidationErrors({});
      setConfirmedBooking(null);
      setFormData(prev => ({
        ...prev,
        deckZone: initialParams.deckZone || 'sky-deck',
        guests: initialParams.guests || initialParams.partySize || 2,
        partySize: initialParams.guests || initialParams.partySize || 2,
        date: initialParams.date || todayStr,
        time: initialParams.time || initialParams.timeSlot || '20:00',
        timeSlot: initialParams.time || initialParams.timeSlot || '20:00',
        occasion: initialParams.occasion || 'casual',
      }));
    }
  }, [isOpen, initialParams, todayStr]);

  // Available Time Slots
  const lunchSlots = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'];
  const sunsetSlots = ['17:00', '17:30', '18:00', '18:30', '19:00'];
  const dinnerSlots = ['19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'];

  const occasions = [
    { id: 'casual', label: 'Casual Drinks & Dining' },
    { id: 'date-night', label: 'Romantic Date Night' },
    { id: 'birthday', label: 'Birthday Celebration' },
    { id: 'anniversary', label: 'Anniversary Celebration' },
    { id: 'corporate-dinner', label: 'Business / Team Dinner' },
    { id: 'celebration', label: 'Special Milestone Celebration' },
  ];

  const handleNext = () => {
    setServerError(null);
    setValidationErrors({});
    if (step === 1) {
      if (!formData.date) {
        setValidationErrors({ date: 'Please select a reservation date.' });
        return;
      }
      if (formData.date < todayStr) {
        setValidationErrors({ date: 'Reservation date cannot be in the past.' });
        return;
      }
      if (!formData.time && !formData.timeSlot) {
        setValidationErrors({ time: 'Please select an arrival time slot.' });
        return;
      }
      setStep(2);
    }
  };

  const validateStep2 = () => {
    const errors = {};
    const nameVal = (formData.name || formData.guestName || '').trim();
    const emailVal = (formData.email || '').trim();
    const phoneVal = (formData.phone || '').trim();

    if (!nameVal || nameVal.length < 2) {
      errors.name = 'Full name is required (at least 2 characters).';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailVal || !emailRegex.test(emailVal)) {
      errors.email = 'Please provide a valid email address.';
    }

    const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$|^[0-9+()\-.\s]{7,20}$/;
    if (!phoneVal || !phoneRegex.test(phoneVal)) {
      errors.phone = 'Please provide a valid 10-digit mobile number.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    if (!validateStep2()) {
      addToast('Please correct the highlighted fields before submitting.', 'error');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: formData.name || formData.guestName,
        guestName: formData.name || formData.guestName,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        date: formData.date,
        time: formData.time || formData.timeSlot,
        timeSlot: formData.time || formData.timeSlot,
        guests: Number(formData.guests || formData.partySize),
        partySize: Number(formData.guests || formData.partySize),
        deckZone: formData.deckZone,
        occasion: formData.occasion,
        specialRequest: formData.specialRequest || formData.specialRequests || '',
        specialRequests: formData.specialRequest || formData.specialRequests || ''
      };

      const res = await reservationService.create(payload);
      if (res.success && res.data) {
        setConfirmedBooking(res.data);
        setStep(3);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#C36B4E', '#EDE9E1', '#8A9777', '#E1A28F']
          });
        } catch (e) {
          // Silent fallback for confetti
        }
        addToast(`Table confirmed! Reference: ${res.data.bookingReference}`, 'success');
      } else {
        setServerError(res.message || 'Could not confirm reservation.');
        addToast(res.message || 'Could not complete reservation.', 'error');
      }
    } catch (err) {
      const errMsg = err.message || (err.errors && err.errors.join(', ')) || 'Server error while processing reservation. Please try again.';
      setServerError(errMsg);
      addToast(errMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const selectedDeck = decks.find(d => d.id === formData.deckZone) || decks[0];

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeReservation}
      title={
        step === 3
          ? 'Reservation Confirmed'
          : step === 2
          ? 'Guest & Host Details'
          : 'Reserve a Table at 1522 Mumbai'
      }
      subtitle={
        step === 3
          ? 'Level 2, Goldfinch Hotel • Andheri East'
          : step === 2
          ? 'Step 2 of 2: Who should we welcome?'
          : 'Step 1 of 2: Select Date, Time & Deck Atmosphere'
      }
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        
        {/* Server Error State Banner */}
        {serverError && (
          <div className="p-4 rounded-2xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs font-sans flex items-start gap-3 animate-fade-in">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold block text-red-300">Reservation Notice:</span>
              <p className="mt-0.5 leading-relaxed">{serverError}</p>
            </div>
            <button
              onClick={() => setServerError(null)}
              className="text-red-400 hover:text-red-200 text-xs underline shrink-0"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* STEP 1: ATMOSPHERE & TIME SELECTION */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            {/* Deck Selector */}
            <DeckSelector
              selectedDeck={formData.deckZone}
              onSelectDeck={(deckId) => setFormData(prev => ({ ...prev, deckZone: deckId }))}
            />

            {/* Date & Guests Pickers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-stone-300 font-sans font-semibold flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-terracotta-400" />
                  Select Date <span className="text-terracotta-400">*</span>
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={formData.date}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, date: e.target.value }));
                    if (validationErrors.date) setValidationErrors(prev => ({ ...prev, date: null }));
                  }}
                  className={`w-full bg-charcoal-900 border ${
                    validationErrors.date ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-700'
                  } rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-terracotta-500 font-sans`}
                />
                {validationErrors.date && (
                  <span className="text-[11px] text-red-400 font-sans block">{validationErrors.date}</span>
                )}
              </div>

              {/* Number of Guests */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-stone-300 font-sans font-semibold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-terracotta-400" />
                  Party Size <span className="text-terracotta-400">*</span>
                </label>
                <div className="flex items-center gap-2">
                  {[2, 4, 6, 8, 10, 12].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, guests: num, partySize: num }))}
                      className={`flex-1 py-2.5 rounded-xl border text-xs font-sans font-semibold transition-all ${
                        (formData.guests === num || formData.partySize === num)
                          ? 'bg-terracotta-500 border-terracotta-500 text-stone-50 shadow-md'
                          : 'bg-charcoal-900 border-stone-700 text-stone-300 hover:border-stone-500'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Time Slot Selector */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider text-stone-300 font-sans font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-terracotta-400" />
                Select Arrival Time <span className="text-terracotta-400">*</span>
              </label>

              {/* Sunset & Dinner Slots */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-stone-400 font-sans font-semibold">
                  Sunset & Dinner Prime Time (05:00 PM – 11:30 PM)
                </span>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {[...sunsetSlots, ...dinnerSlots].slice(0, 14).map((slot) => {
                    const isSelected = formData.time === slot || formData.timeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, time: slot, timeSlot: slot }));
                          if (validationErrors.time) setValidationErrors(prev => ({ ...prev, time: null }));
                        }}
                        className={`py-2 px-1 rounded-xl border text-xs font-sans transition-all text-center ${
                          isSelected
                            ? 'bg-terracotta-500 border-terracotta-500 text-stone-50 font-bold shadow-md'
                            : 'bg-charcoal-900 border-stone-700 text-stone-300 hover:border-stone-500 hover:text-stone-100'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lunch Slots */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] uppercase tracking-widest text-stone-400 font-sans font-semibold">
                  Lunch & Afternoon Hours (12:00 PM – 03:00 PM)
                </span>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {lunchSlots.map((slot) => {
                    const isSelected = formData.time === slot || formData.timeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, time: slot, timeSlot: slot }));
                          if (validationErrors.time) setValidationErrors(prev => ({ ...prev, time: null }));
                        }}
                        className={`py-2 px-1 rounded-xl border text-xs font-sans transition-all text-center ${
                          isSelected
                            ? 'bg-terracotta-500 border-terracotta-500 text-stone-50 font-bold shadow-md'
                            : 'bg-charcoal-900 border-stone-700 text-stone-300 hover:border-stone-500'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Occasion Selector */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-stone-300 font-sans font-semibold">
                Dining Occasion
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {occasions.map((occ) => {
                  const isSelected = formData.occasion === occ.id;
                  return (
                    <button
                      key={occ.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, occasion: occ.id }))}
                      className={`p-2.5 rounded-xl border text-xs font-sans text-left transition-all ${
                        isSelected
                          ? 'bg-charcoal-800 border-terracotta-500 text-terracotta-300 font-medium ring-1 ring-terracotta-500'
                          : 'bg-charcoal-900 border-stone-700 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {occ.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next Step Action */}
            <div className="pt-4 border-t border-stone-800 flex justify-end">
              <Button
                variant="primary"
                size="md"
                onClick={handleNext}
                className="px-8"
              >
                Proceed to Guest Details →
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: GUEST CONTACT DETAILS */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
            {/* Booking Summary Strip */}
            <div className="p-4 rounded-2xl bg-charcoal-900 border border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-stone-300">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-stone-100 flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-terracotta-400" />
                  {formData.date}
                </span>
                <span className="text-stone-600">|</span>
                <span className="font-semibold text-stone-100 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-olive-400" />
                  {formData.time || formData.timeSlot}
                </span>
                <span className="text-stone-600">|</span>
                <span className="font-semibold text-stone-100 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-terracotta-400" />
                  {formData.guests || formData.partySize} Guests
                </span>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-[11px] text-terracotta-400 hover:underline"
              >
                Edit Details
              </button>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs uppercase tracking-wider text-stone-300 font-sans font-semibold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-terracotta-400" />
                  Full Name <span className="text-terracotta-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kunal Kapoor"
                  value={formData.name || formData.guestName}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, name: e.target.value, guestName: e.target.value }));
                    if (validationErrors.name) setValidationErrors(prev => ({ ...prev, name: null }));
                  }}
                  className={`w-full bg-charcoal-900 border ${
                    validationErrors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-700'
                  } rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-terracotta-500 font-sans`}
                />
                {validationErrors.name && (
                  <span className="text-[11px] text-red-400 font-sans block">{validationErrors.name}</span>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-stone-300 font-sans font-semibold flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-terracotta-400" />
                  Email Address <span className="text-terracotta-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder="kunal.kapoor@example.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, email: e.target.value }));
                    if (validationErrors.email) setValidationErrors(prev => ({ ...prev, email: null }));
                  }}
                  className={`w-full bg-charcoal-900 border ${
                    validationErrors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-700'
                  } rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-terracotta-500 font-sans`}
                />
                {validationErrors.email && (
                  <span className="text-[11px] text-red-400 font-sans block">{validationErrors.email}</span>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-stone-300 font-sans font-semibold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-terracotta-400" />
                  Mobile Number <span className="text-terracotta-400">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 98201 44552"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, phone: e.target.value }));
                    if (validationErrors.phone) setValidationErrors(prev => ({ ...prev, phone: null }));
                  }}
                  className={`w-full bg-charcoal-900 border ${
                    validationErrors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-700'
                  } rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-terracotta-500 font-sans`}
                />
                {validationErrors.phone && (
                  <span className="text-[11px] text-red-400 font-sans block">{validationErrors.phone}</span>
                )}
              </div>

              {/* Special Requests */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs uppercase tracking-wider text-stone-300 font-sans font-semibold">
                  Special Requests / Dietary Preferences (Optional)
                </label>
                <textarea
                  rows="2"
                  placeholder="e.g. Corner table preferred, celebrating anniversary with complimentary cake slice..."
                  value={formData.specialRequest || formData.specialRequests}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    specialRequest: e.target.value,
                    specialRequests: e.target.value
                  }))}
                  className="w-full bg-charcoal-900 border border-stone-700 rounded-xl px-4 py-2.5 text-stone-100 text-xs focus:outline-none focus:border-terracotta-500 font-sans"
                />
              </div>
            </div>

            {/* Terms notice */}
            <p className="text-[11px] text-stone-400 font-sans leading-relaxed">
              * Tables are held for 15 minutes past arrival slot. Dress code: Smart casuals. Valet parking available at Goldfinch Hotel porch.
            </p>

            {/* Actions */}
            <div className="pt-4 border-t border-stone-800 flex items-center justify-between gap-4">
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={() => setStep(1)}
              >
                ← Back
              </Button>

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={loading}
                className="px-8 shadow-xl hover:shadow-glow-terracotta"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" /> Confirming Booking...
                  </span>
                ) : (
                  'Confirm Table Reservation'
                )}
              </Button>
            </div>
          </form>
        )}

        {/* STEP 3: SUCCESS CONFIRMATION STATE */}
        {step === 3 && confirmedBooking && (
          <div className="text-center space-y-6 py-4 animate-fade-in">
            {/* Success Check Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-2">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-terracotta-400 font-sans font-bold">
                Booking Reference
              </span>
              <h3 className="font-serif text-3xl font-bold text-stone-100 tracking-wider">
                {confirmedBooking.bookingReference}
              </h3>
              <p className="text-stone-300 text-sm font-sans">
                A confirmation has been logged for <strong className="text-stone-100">{confirmedBooking.name || confirmedBooking.guestName}</strong>.
              </p>
            </div>

            {/* Booking Details Card */}
            <div className="max-w-md mx-auto bg-charcoal-900 border border-stone-800 rounded-2xl p-5 text-xs font-sans space-y-3 text-left">
              <div className="flex justify-between border-b border-stone-800 pb-2.5">
                <span className="text-stone-400">Date & Time:</span>
                <span className="text-stone-100 font-semibold">{confirmedBooking.date} at {confirmedBooking.time || confirmedBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between border-b border-stone-800 pb-2.5">
                <span className="text-stone-400">Party Size:</span>
                <span className="text-stone-100 font-semibold">{confirmedBooking.guests || confirmedBooking.partySize} Guests</span>
              </div>
              <div className="flex justify-between border-b border-stone-800 pb-2.5">
                <span className="text-stone-400">Deck Zone:</span>
                <span className="text-terracotta-300 font-semibold uppercase tracking-wider">{selectedDeck.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Venue Address:</span>
                <span className="text-stone-300 text-right">Level 2, Goldfinch Hotel, Andheri (E)</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button
                variant="primary"
                size="md"
                onClick={closeReservation}
                className="px-8"
              >
                Done & Return to Site
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ReservationModal;
