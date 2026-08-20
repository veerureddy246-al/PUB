import { initialMenuItems, initialEvents, initialOffers, initialGalleryItems, initialReviews } from './seedData.js';
import Reservation from '../models/Reservation.js';
import MenuItem from '../models/MenuItem.js';
import Event from '../models/Event.js';
import Offer from '../models/Offer.js';
import GalleryItem from '../models/GalleryItem.js';
import NewsletterSubscriber from '../models/NewsletterSubscriber.js';
import ContactMessage from '../models/ContactMessage.js';
import Inquiry from '../models/Inquiry.js';
import { getDBStatus } from '../config/db.js';
import { supabaseService } from './supabaseService.js';

// In-Memory Backing Stores
let memoryReservations = [
  {
    _id: 'res_sample_1',
    bookingReference: '1522-MB-8291',
    name: 'Kunal Kapoor',
    guestName: 'Kunal Kapoor',
    email: 'kunal.kapoor@example.com',
    phone: '+91 98201 44552',
    date: '2026-08-22',
    time: '20:30',
    timeSlot: '20:30',
    guests: 4,
    partySize: 4,
    deckZone: 'sky-deck',
    occasion: 'celebration',
    specialRequest: 'Corner table with Mumbai skyline view, celebrating promotion',
    specialRequests: 'Corner table with Mumbai skyline view, celebrating promotion',
    status: 'confirmed',
    createdAt: new Date('2026-08-18T10:00:00Z'),
    updatedAt: new Date('2026-08-18T10:00:00Z')
  },
  {
    _id: 'res_sample_2',
    bookingReference: '1522-MB-7734',
    name: 'Pooja Hegde',
    guestName: 'Pooja Hegde',
    email: 'pooja.h@example.com',
    phone: '+91 98111 22334',
    date: '2026-08-21',
    time: '19:00',
    timeSlot: '19:00',
    guests: 2,
    partySize: 2,
    deckZone: 'sunset-cabana',
    occasion: 'date-night',
    specialRequest: 'Candlelight setup with complimentary sparkling mocktail',
    specialRequests: 'Candlelight setup with complimentary sparkling mocktail',
    status: 'confirmed',
    createdAt: new Date('2026-08-18T11:30:00Z'),
    updatedAt: new Date('2026-08-18T11:30:00Z')
  }
];

let memoryMenuItems = initialMenuItems.map((item, index) => ({
  _id: `menu_${index + 1}`,
  ...item,
  createdAt: new Date(),
  updatedAt: new Date()
}));

let memoryEvents = initialEvents.map((evt, index) => ({
  _id: `evt_${index + 1}`,
  ...evt,
  createdAt: new Date(),
  updatedAt: new Date()
}));

let memoryOffers = initialOffers.map((offer, index) => ({
  _id: `offer_${index + 1}`,
  ...offer,
  createdAt: new Date(),
  updatedAt: new Date()
}));

let memoryGalleryItems = initialGalleryItems.map((item, index) => ({
  _id: `gallery_${index + 1}`,
  ...item,
  createdAt: new Date(),
  updatedAt: new Date()
}));

let memorySubscribers = [
  {
    _id: 'sub_1',
    email: 'insider.vip@1522mumbai.com',
    active: true,
    source: 'website_footer',
    createdAt: new Date('2026-08-01T00:00:00Z')
  }
];

let memoryMessages = [
  {
    _id: 'msg_1',
    name: 'Rajiv Mehra',
    email: 'rajiv.m@corporatemumbai.com',
    phone: '+91 98920 11223',
    message: 'Looking to organize an exclusive rooftop sundowner mixer for 60 people next month.',
    status: 'unread',
    createdAt: new Date('2026-08-18T12:00:00Z'),
    updatedAt: new Date('2026-08-18T12:00:00Z')
  }
];

let memoryInquiries = [];
let memoryReviews = [...initialReviews];

export const dataStore = {
  // 1. RESERVATIONS
  async getAllReservations(filters = {}) {
    if (getDBStatus()) {
      try {
        const query = {};
        if (filters.status) query.status = filters.status;
        if (filters.date) query.date = filters.date;
        return await Reservation.find(query).sort({ createdAt: -1 });
      } catch (err) {
        console.warn('DB error fetching reservations, using memory fallback:', err.message);
      }
    }
    let res = [...memoryReservations];
    if (filters.status) res = res.filter(r => r.status === filters.status);
    if (filters.date) res = res.filter(r => r.date === filters.date);
    return res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async getReservationById(id) {
    if (getDBStatus()) {
      try {
        return await Reservation.findById(id);
      } catch (err) {
        console.warn('DB error getReservationById:', err.message);
      }
    }
    return memoryReservations.find(r => r._id === id || r.bookingReference === id) || null;
  },

  async getReservationByReference(reference) {
    if (getDBStatus()) {
      try {
        const found = await Reservation.findOne({ bookingReference: reference });
        if (found) return found;
      } catch (err) {
        console.warn('DB error getReservationByReference:', err.message);
      }
    }
    return memoryReservations.find(r => r.bookingReference.toLowerCase() === reference.toLowerCase()) || null;
  },

  async createReservation(data) {
    const reference = '1522-MB-' + Math.floor(1000 + Math.random() * 9000);
    const newReservationData = {
      ...data,
      name: data.name || data.guestName,
      guestName: data.name || data.guestName,
      time: data.time || data.timeSlot,
      timeSlot: data.time || data.timeSlot,
      guests: Number(data.guests || data.partySize || 2),
      partySize: Number(data.guests || data.partySize || 2),
      specialRequest: data.specialRequest || data.specialRequests || '',
      specialRequests: data.specialRequest || data.specialRequests || '',
      bookingReference: reference,
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // 1. Try Supabase
    const spCreated = await supabaseService.createReservation(newReservationData);
    if (spCreated) {
      memoryReservations.unshift(spCreated);
      return spCreated;
    }

    // 2. Try MongoDB
    if (getDBStatus()) {
      try {
        const created = await Reservation.create(newReservationData);
        return created;
      } catch (err) {
        console.warn('DB error creating reservation, saving to memory fallback:', err.message);
      }
    }

    const saved = {
      _id: `res_${Date.now()}`,
      ...newReservationData
    };
    memoryReservations.unshift(saved);
    return saved;
  },

  async updateReservation(id, updateData) {
    if (getDBStatus()) {
      try {
        const updated = await Reservation.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (updated) return updated;
      } catch (err) {
        console.warn('DB error updateReservation:', err.message);
      }
    }
    const idx = memoryReservations.findIndex(r => r._id === id || r.bookingReference === id);
    if (idx !== -1) {
      memoryReservations[idx] = {
        ...memoryReservations[idx],
        ...updateData,
        updatedAt: new Date()
      };
      return memoryReservations[idx];
    }
    return null;
  },

  async updateReservationStatus(id, status) {
    return this.updateReservation(id, { status });
  },

  async deleteReservation(id) {
    if (getDBStatus()) {
      try {
        const deleted = await Reservation.findByIdAndDelete(id);
        if (deleted) return true;
      } catch (err) {
        console.warn('DB error deleteReservation:', err.message);
      }
    }
    const lenBefore = memoryReservations.length;
    memoryReservations = memoryReservations.filter(r => r._id !== id && r.bookingReference !== id);
    return memoryReservations.length < lenBefore;
  },

  // 2. MENU ITEMS
  async getAllMenuItems(query = {}) {
    const { category, dietary, search, available } = query;
    // 1. Try Supabase
    const spItems = await supabaseService.getMenuItems(query);
    if (spItems && spItems.length > 0) return spItems;

    // 2. Try MongoDB if connected
    if (getDBStatus()) {
      try {
        const filter = {};
        if (category && category !== 'all') filter.category = category;
        if (dietary && dietary !== 'all') filter.dietary = dietary;
        if (available !== undefined) filter.available = available === 'true' || available === true;
        if (search) {
          filter.$or = [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
          ];
        }
        const items = await MenuItem.find(filter).sort({ createdAt: -1 });
        if (items && items.length > 0) return items;
      } catch (err) {
        console.warn('DB error getAllMenuItems, using memory store:', err.message);
      }
    }

    let items = [...memoryMenuItems];
    if (category && category !== 'all') {
      const catLower = category.toLowerCase();
      items = items.filter(i => 
        i.category.toLowerCase() === catLower || 
        (i.subCategory && i.subCategory.toLowerCase() === catLower)
      );
    }
    if (dietary && dietary !== 'all') {
      items = items.filter(i => i.dietary === dietary);
    }
    if (available !== undefined) {
      const isAvail = available === 'true' || available === true;
      items = items.filter(i => i.available === isAvail);
    }
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(i => 
        i.name.toLowerCase().includes(q) || 
        i.description.toLowerCase().includes(q)
      );
    }
    return items;
  },

  async getMenuItemById(id) {
    if (getDBStatus()) {
      try {
        return await MenuItem.findById(id);
      } catch (err) {
        console.warn('DB error getMenuItemById:', err.message);
      }
    }
    return memoryMenuItems.find(m => m._id === id) || null;
  },

  async createMenuItem(data) {
    if (getDBStatus()) {
      try {
        return await MenuItem.create(data);
      } catch (err) {
        console.warn('DB error createMenuItem:', err.message);
      }
    }
    const newItem = {
      _id: `menu_${Date.now()}`,
      ...data,
      available: data.available !== undefined ? data.available : true,
      featured: data.featured || data.isChefsSpecial || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    memoryMenuItems.unshift(newItem);
    return newItem;
  },

  async updateMenuItem(id, updateData) {
    if (getDBStatus()) {
      try {
        const updated = await MenuItem.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (updated) return updated;
      } catch (err) {
        console.warn('DB error updateMenuItem:', err.message);
      }
    }
    const idx = memoryMenuItems.findIndex(m => m._id === id);
    if (idx !== -1) {
      memoryMenuItems[idx] = {
        ...memoryMenuItems[idx],
        ...updateData,
        updatedAt: new Date()
      };
      return memoryMenuItems[idx];
    }
    return null;
  },

  async deleteMenuItem(id) {
    if (getDBStatus()) {
      try {
        const deleted = await MenuItem.findByIdAndDelete(id);
        if (deleted) return true;
      } catch (err) {
        console.warn('DB error deleteMenuItem:', err.message);
      }
    }
    const lenBefore = memoryMenuItems.length;
    memoryMenuItems = memoryMenuItems.filter(m => m._id !== id);
    return memoryMenuItems.length < lenBefore;
  },

  async toggleMenuItemAvailability(id) {
    const item = await this.getMenuItemById(id);
    if (!item) return null;
    return this.updateMenuItem(id, { available: !item.available });
  },

  // 3. EVENTS
  async getAllEvents(includeInactive = false) {
    // 1. Try Supabase
    const spEvents = await supabaseService.getEvents();
    if (spEvents && spEvents.length > 0) return spEvents;

    // 2. Try MongoDB if connected
    if (getDBStatus()) {
      try {
        const filter = includeInactive ? {} : { active: true };
        const events = await Event.find(filter).sort({ createdAt: -1 });
        if (events && events.length > 0) return events;
      } catch (err) {
        console.warn('DB error getAllEvents:', err.message);
      }
    }
    if (includeInactive) return memoryEvents;
    return memoryEvents.filter(e => e.active !== false);
  },

  async getEventById(id) {
    if (getDBStatus()) {
      try {
        return await Event.findById(id);
      } catch (err) {
        console.warn('DB error getEventById:', err.message);
      }
    }
    return memoryEvents.find(e => e._id === id) || null;
  },

  async createEvent(data) {
    if (getDBStatus()) {
      try {
        return await Event.create(data);
      } catch (err) {
        console.warn('DB error createEvent:', err.message);
      }
    }
    const newEvt = {
      _id: `evt_${Date.now()}`,
      rsvpCount: 0,
      active: true,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    memoryEvents.unshift(newEvt);
    return newEvt;
  },

  async updateEvent(id, updateData) {
    if (getDBStatus()) {
      try {
        const updated = await Event.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (updated) return updated;
      } catch (err) {
        console.warn('DB error updateEvent:', err.message);
      }
    }
    const idx = memoryEvents.findIndex(e => e._id === id);
    if (idx !== -1) {
      memoryEvents[idx] = {
        ...memoryEvents[idx],
        ...updateData,
        updatedAt: new Date()
      };
      return memoryEvents[idx];
    }
    return null;
  },

  async deleteEvent(id) {
    if (getDBStatus()) {
      try {
        const deleted = await Event.findByIdAndDelete(id);
        if (deleted) return true;
      } catch (err) {
        console.warn('DB error deleteEvent:', err.message);
      }
    }
    const lenBefore = memoryEvents.length;
    memoryEvents = memoryEvents.filter(e => e._id !== id);
    return memoryEvents.length < lenBefore;
  },

  async rsvpEvent(eventId) {
    const evt = await this.getEventById(eventId);
    if (!evt) return null;
    const newCount = (evt.rsvpCount || 0) + 1;
    return this.updateEvent(eventId, { rsvpCount: newCount });
  },

  // 4. OFFERS & SPECIAL NEWS
  async getAllOffers(includeExpired = false) {
    // 1. Try Supabase
    const spOffers = await supabaseService.getOffers();
    if (spOffers && spOffers.length > 0) return spOffers;

    // 2. Try MongoDB if connected
    const now = new Date();
    if (getDBStatus()) {
      try {
        const filter = includeExpired 
          ? {} 
          : { active: true, endDate: { $gte: now } };
        const offers = await Offer.find(filter).sort({ createdAt: -1 });
        if (offers && offers.length > 0) return offers;
      } catch (err) {
        console.warn('DB error getAllOffers:', err.message);
      }
    }

    if (includeExpired) return memoryOffers;
    return memoryOffers.filter(o => {
      const notExpired = !o.endDate || new Date(o.endDate) >= now;
      return o.active !== false && notExpired;
    });
  },

  async getOfferById(id) {
    if (getDBStatus()) {
      try {
        return await Offer.findById(id);
      } catch (err) {
        console.warn('DB error getOfferById:', err.message);
      }
    }
    return memoryOffers.find(o => o._id === id) || null;
  },

  async createOffer(data) {
    if (getDBStatus()) {
      try {
        return await Offer.create(data);
      } catch (err) {
        console.warn('DB error createOffer:', err.message);
      }
    }
    const newOffer = {
      _id: `offer_${Date.now()}`,
      active: true,
      startDate: new Date(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    memoryOffers.unshift(newOffer);
    return newOffer;
  },

  async updateOffer(id, updateData) {
    if (getDBStatus()) {
      try {
        const updated = await Offer.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (updated) return updated;
      } catch (err) {
        console.warn('DB error updateOffer:', err.message);
      }
    }
    const idx = memoryOffers.findIndex(o => o._id === id);
    if (idx !== -1) {
      memoryOffers[idx] = {
        ...memoryOffers[idx],
        ...updateData,
        updatedAt: new Date()
      };
      return memoryOffers[idx];
    }
    return null;
  },

  async deleteOffer(id) {
    if (getDBStatus()) {
      try {
        const deleted = await Offer.findByIdAndDelete(id);
        if (deleted) return true;
      } catch (err) {
        console.warn('DB error deleteOffer:', err.message);
      }
    }
    const lenBefore = memoryOffers.length;
    memoryOffers = memoryOffers.filter(o => o._id !== id);
    return memoryOffers.length < lenBefore;
  },

  // 5. GALLERY ITEMS
  async getAllGalleryItems(category = 'All') {
    // 1. Try Supabase
    const spGallery = await supabaseService.getGalleryItems({ category });
    if (spGallery && spGallery.length > 0) return spGallery;

    // 2. Try MongoDB if connected
    if (getDBStatus()) {
      try {
        let filter = {};
        if (category && category !== 'All') {
          if (category === 'Food & Drink' || category.toLowerCase() === 'food-drink') {
            filter.category = { $in: ['Food', 'Drinks'] };
          } else {
            filter.category = category;
          }
        }
        const items = await GalleryItem.find(filter).sort({ order: 1, createdAt: -1 });
        if (items && items.length > 0) return items;
      } catch (err) {
        console.warn('DB error getAllGalleryItems:', err.message);
      }
    }

    if (category && category !== 'All') {
      if (category === 'Food & Drink' || category.toLowerCase() === 'food-drink') {
        return memoryGalleryItems.filter(item => item.category === 'Food' || item.category === 'Drinks');
      }
      return memoryGalleryItems.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }
    return [...memoryGalleryItems].sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  async getGalleryItemById(id) {
    if (getDBStatus()) {
      try {
        return await GalleryItem.findById(id);
      } catch (err) {
        console.warn('DB error getGalleryItemById:', err.message);
      }
    }
    return memoryGalleryItems.find(g => g._id === id) || null;
  },

  async createGalleryItem(data) {
    if (getDBStatus()) {
      try {
        return await GalleryItem.create(data);
      } catch (err) {
        console.warn('DB error createGalleryItem:', err.message);
      }
    }
    const newItem = {
      _id: `gallery_${Date.now()}`,
      order: memoryGalleryItems.length + 1,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    memoryGalleryItems.push(newItem);
    return newItem;
  },

  async updateGalleryItem(id, updateData) {
    if (getDBStatus()) {
      try {
        const updated = await GalleryItem.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (updated) return updated;
      } catch (err) {
        console.warn('DB error updateGalleryItem:', err.message);
      }
    }
    const idx = memoryGalleryItems.findIndex(g => g._id === id);
    if (idx !== -1) {
      memoryGalleryItems[idx] = {
        ...memoryGalleryItems[idx],
        ...updateData,
        updatedAt: new Date()
      };
      return memoryGalleryItems[idx];
    }
    return null;
  },

  async deleteGalleryItem(id) {
    if (getDBStatus()) {
      try {
        const deleted = await GalleryItem.findByIdAndDelete(id);
        if (deleted) return true;
      } catch (err) {
        console.warn('DB error deleteGalleryItem:', err.message);
      }
    }
    const lenBefore = memoryGalleryItems.length;
    memoryGalleryItems = memoryGalleryItems.filter(g => g._id !== id);
    return memoryGalleryItems.length < lenBefore;
  },

  // 6. NEWSLETTER SUBSCRIBERS
  async getAllSubscribers() {
    if (getDBStatus()) {
      try {
        return await NewsletterSubscriber.find().sort({ createdAt: -1 });
      } catch (err) {
        console.warn('DB error getAllSubscribers:', err.message);
      }
    }
    return memorySubscribers;
  },

  async findSubscriberByEmail(email) {
    const normalized = email.toLowerCase().trim();
    if (getDBStatus()) {
      try {
        return await NewsletterSubscriber.findOne({ email: normalized });
      } catch (err) {
        console.warn('DB error findSubscriberByEmail:', err.message);
      }
    }
    return memorySubscribers.find(s => s.email.toLowerCase() === normalized) || null;
  },

  async createSubscriber(email, source = 'website_footer') {
    const normalized = email.toLowerCase().trim();
    if (getDBStatus()) {
      try {
        return await NewsletterSubscriber.create({ email: normalized, source, active: true });
      } catch (err) {
        console.warn('DB error createSubscriber:', err.message);
      }
    }
    const newSub = {
      _id: `sub_${Date.now()}`,
      email: normalized,
      active: true,
      source,
      createdAt: new Date()
    };
    memorySubscribers.unshift(newSub);
    return newSub;
  },

  async deleteSubscriber(id) {
    if (getDBStatus()) {
      try {
        const deleted = await NewsletterSubscriber.findByIdAndDelete(id);
        if (deleted) return true;
      } catch (err) {
        console.warn('DB error deleteSubscriber:', err.message);
      }
    }
    const lenBefore = memorySubscribers.length;
    memorySubscribers = memorySubscribers.filter(s => s._id !== id && s.email !== id);
    return memorySubscribers.length < lenBefore;
  },

  // 7. CONTACT MESSAGES
  async getAllContactMessages(status = null) {
    if (getDBStatus()) {
      try {
        const filter = status ? { status } : {};
        return await ContactMessage.find(filter).sort({ createdAt: -1 });
      } catch (err) {
        console.warn('DB error getAllContactMessages:', err.message);
      }
    }
    if (status) return memoryMessages.filter(m => m.status === status);
    return memoryMessages;
  },

  async getContactMessageById(id) {
    if (getDBStatus()) {
      try {
        return await ContactMessage.findById(id);
      } catch (err) {
        console.warn('DB error getContactMessageById:', err.message);
      }
    }
    return memoryMessages.find(m => m._id === id) || null;
  },

  async createContactMessage(data) {
    if (getDBStatus()) {
      try {
        return await ContactMessage.create(data);
      } catch (err) {
        console.warn('DB error createContactMessage:', err.message);
      }
    }
    const newMsg = {
      _id: `msg_${Date.now()}`,
      status: 'unread',
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    memoryMessages.unshift(newMsg);
    return newMsg;
  },

  async updateContactMessageStatus(id, status) {
    if (getDBStatus()) {
      try {
        const updated = await ContactMessage.findByIdAndUpdate(id, { status }, { new: true });
        if (updated) return updated;
      } catch (err) {
        console.warn('DB error updateContactMessageStatus:', err.message);
      }
    }
    const msg = memoryMessages.find(m => m._id === id);
    if (msg) {
      msg.status = status;
      msg.updatedAt = new Date();
      return msg;
    }
    return null;
  },

  async deleteContactMessage(id) {
    if (getDBStatus()) {
      try {
        const deleted = await ContactMessage.findByIdAndDelete(id);
        if (deleted) return true;
      } catch (err) {
        console.warn('DB error deleteContactMessage:', err.message);
      }
    }
    const lenBefore = memoryMessages.length;
    memoryMessages = memoryMessages.filter(m => m._id !== id);
    return memoryMessages.length < lenBefore;
  },

  // 8. PRIVATE DINING & EVENT INQUIRIES
  async getAllInquiries(status = null) {
    if (getDBStatus()) {
      try {
        const filter = status ? { status } : {};
        return await Inquiry.find(filter).sort({ createdAt: -1 });
      } catch (err) {
        console.warn('DB error getAllInquiries:', err.message);
      }
    }
    if (status) return memoryInquiries.filter(i => i.status === status);
    return memoryInquiries;
  },

  async getInquiryById(id) {
    if (getDBStatus()) {
      try {
        return await Inquiry.findById(id);
      } catch (err) {
        console.warn('DB error getInquiryById:', err.message);
      }
    }
    return memoryInquiries.find(i => i._id === id) || null;
  },

  async createInquiry(data) {
    // 1. Try Supabase
    await supabaseService.createInquiry(data);

    // 2. Try MongoDB
    if (getDBStatus()) {
      try {
        return await Inquiry.create(data);
      } catch (err) {
        console.warn('DB error createInquiry:', err.message);
      }
    }
    const newInquiry = {
      _id: `inq_${Date.now()}`,
      status: 'new',
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    memoryInquiries.unshift(newInquiry);
    return newInquiry;
  },

  async updateInquiryStatus(id, status) {
    if (getDBStatus()) {
      try {
        const updated = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
        if (updated) return updated;
      } catch (err) {
        console.warn('DB error updateInquiryStatus:', err.message);
      }
    }
    const inq = memoryInquiries.find(i => i._id === id);
    if (inq) {
      inq.status = status;
      inq.updatedAt = new Date();
      return inq;
    }
    return null;
  },

  async deleteInquiry(id) {
    if (getDBStatus()) {
      try {
        const deleted = await Inquiry.findByIdAndDelete(id);
        if (deleted) return true;
      } catch (err) {
        console.warn('DB error deleteInquiry:', err.message);
      }
    }
    const lenBefore = memoryInquiries.length;
    memoryInquiries = memoryInquiries.filter(i => i._id !== id);
    return memoryInquiries.length < lenBefore;
  },

  // 9. AUTO-SEEDER (Runs on startup for Supabase and MongoDB)
  async seedDatabaseIfConnected() {
    // 1. Supabase auto-sync and seed
    try {
      await supabaseService.seedIfEmpty();
    } catch (err) {
      console.warn('[Supabase] Sync note:', err.message);
    }

    // 2. MongoDB auto-sync if connected
    if (!getDBStatus()) return;
    try {
      const menuCount = await MenuItem.countDocuments();
      if (menuCount === 0) {
        console.log('[Database] Seeding Initial Menu Items...');
        await MenuItem.insertMany(initialMenuItems);
      }

      const eventCount = await Event.countDocuments();
      if (eventCount === 0) {
        console.log('[Database] Seeding Initial Events...');
        await Event.insertMany(initialEvents);
      }

      const offerCount = await Offer.countDocuments();
      if (offerCount === 0) {
        console.log('[Database] Seeding Initial Offers...');
        await Offer.insertMany(initialOffers);
      }

      const galleryCount = await GalleryItem.countDocuments();
      if (galleryCount === 0) {
        console.log('[Database] Seeding Initial Gallery Items...');
        await GalleryItem.insertMany(initialGalleryItems);
      }
      console.log('[Database] Seed validation complete.');
    } catch (err) {
      console.warn('[Database] Seed operation note:', err.message);
    }
  }
};
