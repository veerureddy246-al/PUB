import React, { useState } from 'react';
import LocationContactSection from '../sections/LocationContactSection';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import { useReservationModal } from '../context/ReservationContext';
import { useNotification } from '../context/NotificationContext';
import { contactService } from '../services/api';
import { Calendar, Phone, Mail, Clock, MapPin, HelpCircle, Send, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export const ContactPage = () => {
  const { openReservation } = useReservationModal();
  const { addToast } = useNotification();

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Please enter your name.';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      errors.phone = 'Please enter a valid contact phone number.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errors.message = 'Please provide a message of at least 5 characters.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!validate()) {
      addToast('Please complete all required fields correctly.', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await contactService.sendMessage(formData);
      if (res.success) {
        setSubmitted(true);
        addToast(res.message || 'Your message has been sent to our guest relations team.', 'success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setErrorMsg(res.message || 'Could not send message.');
        addToast(res.message || 'Could not send message.', 'error');
      }
    } catch (err) {
      const msg = err.message || (err.errors && err.errors.join(', ')) || 'Server error while sending message. Please try again.';
      setErrorMsg(msg);
      addToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      q: 'Do I need a prior reservation on weekends?',
      a: 'We strongly advise reserving tables in advance for Friday & Saturday nights, as well as Sunday brunches, to guarantee seating on your preferred deck.'
    },
    {
      q: 'Is there parking available on-site?',
      a: 'Yes, complimentary valet parking is provided at the main porch of Goldfinch Hotel for all 1522 guests.'
    },
    {
      q: 'What is the dress code policy?',
      a: 'We maintain a smart casual dress code. Slippers, open flip-flops, and athletic sportswear are strictly discouraged during evening dining hours.'
    },
    {
      q: 'Are children / families allowed?',
      a: 'Families and children are warmly welcomed during our afternoon lunch hours and Sunday brunches (12:00 PM – 05:00 PM). Post 08:00 PM, entry is restricted to 21+.'
    }
  ];

  return (
    <div className="pt-28 pb-24 bg-charcoal-950 text-stone-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-terracotta-500/60 inline-block" />
            <span className="text-[11px] font-sans font-semibold tracking-widest text-terracotta-400 uppercase">
              Hospitality & Concierge
            </span>
            <span className="w-6 h-px bg-terracotta-500/60 inline-block" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-stone-100 font-normal leading-tight mb-4">
            Connect With 1522 Mumbai
          </h1>

          <p className="text-stone-300 text-sm sm:text-base font-sans font-light leading-relaxed">
            Have questions about table reservations, corporate buyouts, or dietary curations? Our guest concierge team is at your service 7 days a week.
          </p>
        </div>

        {/* Location & Map Section */}
        <LocationContactSection />

        {/* Direct Guest Relations Message Form */}
        <div className="mt-20 pt-16 border-t border-stone-800">
          <div className="max-w-3xl mx-auto bg-charcoal-900 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="text-center mb-8">
              <span className="text-[10px] uppercase tracking-widest text-terracotta-400 font-sans font-bold block mb-1">
                Direct Inquiries
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-stone-100 font-normal">
                Leave a Message for Concierge
              </h3>
              <p className="text-stone-400 text-xs sm:text-sm font-sans mt-2">
                We review all messages within 2 hours during operational hours.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-xl text-stone-100">Message Received</h4>
                <p className="text-stone-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-sans">
                  Thank you! Our hospitality concierge desk at Goldfinch Hotel will reach back via phone or email shortly.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSubmitted(false)}
                  className="mt-4"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleMessageSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs text-stone-300 font-sans font-semibold">Your Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Rohan Varma"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, name: e.target.value }));
                        if (fieldErrors.name) setFieldErrors(prev => ({ ...prev, name: null }));
                      }}
                      className={`w-full bg-charcoal-950 border ${
                        fieldErrors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-700'
                      } rounded-xl px-4 py-2.5 text-stone-100 text-xs focus:outline-none focus:border-terracotta-500 font-sans`}
                    />
                    {fieldErrors.name && <span className="text-[10px] text-red-400 font-sans">{fieldErrors.name}</span>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs text-stone-300 font-sans font-semibold">Email Address *</label>
                    <input
                      type="email"
                      placeholder="rohan.v@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, email: e.target.value }));
                        if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: null }));
                      }}
                      className={`w-full bg-charcoal-950 border ${
                        fieldErrors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-700'
                      } rounded-xl px-4 py-2.5 text-stone-100 text-xs focus:outline-none focus:border-terracotta-500 font-sans`}
                    />
                    {fieldErrors.email && <span className="text-[10px] text-red-400 font-sans">{fieldErrors.email}</span>}
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-xs text-stone-300 font-sans font-semibold">Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="+91 98200 12345"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, phone: e.target.value }));
                      if (fieldErrors.phone) setFieldErrors(prev => ({ ...prev, phone: null }));
                    }}
                    className={`w-full bg-charcoal-950 border ${
                      fieldErrors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-700'
                    } rounded-xl px-4 py-2.5 text-stone-100 text-xs focus:outline-none focus:border-terracotta-500 font-sans`}
                  />
                  {fieldErrors.phone && <span className="text-[10px] text-red-400 font-sans">{fieldErrors.phone}</span>}
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs text-stone-300 font-sans font-semibold">Message / Inquiry Details *</label>
                  <textarea
                    rows="3"
                    placeholder="How can we assist you? (e.g. Dietary inquiries, table arrangement, lost item...)"
                    value={formData.message}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, message: e.target.value }));
                      if (fieldErrors.message) setFieldErrors(prev => ({ ...prev, message: null }));
                    }}
                    className={`w-full bg-charcoal-950 border ${
                      fieldErrors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-700'
                    } rounded-xl px-4 py-2.5 text-stone-100 text-xs focus:outline-none focus:border-terracotta-500 font-sans`}
                  />
                  {fieldErrors.message && <span className="text-[10px] text-red-400 font-sans">{fieldErrors.message}</span>}
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={loading}
                    className="w-full justify-center text-xs uppercase tracking-wider font-semibold shadow-lg"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" /> Sending Message...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-3.5 h-3.5" /> Send Message to Concierge
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-20 pt-16 border-t border-stone-800">
          <SectionHeading
            badge="Frequently Asked Questions"
            title="Guest Essentials & Policies"
            subtitle="Everything you need to know before your rooftop visit."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-charcoal-900 border border-stone-800 rounded-2xl p-6 space-y-2">
                <div className="flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-terracotta-400 shrink-0 mt-0.5" />
                  <h4 className="font-serif text-base text-stone-100 font-medium">{faq.q}</h4>
                </div>
                <p className="text-stone-400 text-xs sm:text-[13px] leading-relaxed font-sans font-light pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
