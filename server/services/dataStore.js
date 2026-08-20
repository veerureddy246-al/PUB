import { initialMenuItems, initialEvents, initialOffers, initialGalleryItems, initialReviews } from './seedData.js';
import Reservation from '../models/Reservation.js';
import MenuItem from '../models/MenuItem.js';
import Event from '../models/Event.js';
import Offer from '../models/Offer.js';
import GalleryItem from '../models/GalleryItem.js';
import NewsletterSubscriber from '../models/NewsletterSubscriber.js';
import ContactMessage from '../models/ContactMessage.js';
import Inquiry from '../models/Inquiry.js';
import SiteSettings from '../models/SiteSettings.js';
import { getDBStatus } from '../config/db.js';
import { supabaseService } from './supabaseService.js';

// In-Memory Backing Stores
let memorySettings = {
  restaurantName: '1522 The Pub — Mumbai',
  tagline: 'Rooftop Lounge • Craft Cocktails • Heritage Flavors',
  address: 'Level 2, Goldfinch Hotel, MIDC Central Road, Chakala, Andheri East, Mumbai, Maharashtra 400093',
  phone: '+91 80 4748 3333',
  secondaryPhone: '+91 98201 52200',
  email: 'concierge.mumbai@1522thepub.com',
  googleMapsUrl: 'https://maps.google.com/?q=1522+The+Pub+Andheri+East+Mumbai',
  openingHours: {
    weekday: '12:00 PM – 01:30 AM',
    weekend: '12:00 PM – 01:30 AM',
    happyHours: '04:00 PM – 08:00 PM (Monday to Friday)',
    lastKitchenOrder: '12:45 AM'
  },
  socialLinks: {
    instagram: 'https://instagram.com/1522mumbai',
    facebook: 'https://facebook.com/1522mumbai',
    twitter: 'https://twitter.com/1522mumbai',
    youtube: 'https://youtube.com'
  },
  hero: {
    eyebrow: 'ANDHERI EAST • ROOFTOP SKY DECK',
    heading: 'Where Mumbai’s Skyline Meets Crafted Mixology',
    subheading: 'An open-air rooftop sanctuary perched above Andheri East. Artisanal cocktails, legendary Kundapur ghee roasts, and soulful live music under the stars.',
    primaryButtonText: 'Reserve a Table',
    primaryButtonLink: '/reservations',
    secondaryButtonText: 'Explore Menu',
    secondaryButtonLink: '/menu',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80',
    published: true
  },
  story: {
    eyebrow: 'OUR HERITAGE & PASSION',
    heading: 'Born in Bangalore. Reimagined for the Mumbai Sky.',
    subtitle: 'A decade-long legacy of rock, nostalgia, and progressive coastal gastronomy.',
    paragraphs: [
      'Founded with a pure love for good rock music, cold draught beers, and unapologetically bold flavors, 1522 began as a legendary neighborhood pub in Bengaluru before bringing its distinctive energy to Mumbai’s financial heart in Andheri East.',
      'At our expansive rooftop deck at the Goldfinch Hotel, we blend classic pub hospitality with progressive coastal culinary craftsmanship. From the smoky notes of our Applewood Bourbon Old Fashioned to our 48-hour slow-cooked Mangalorean Ghee Roast, every element is curated to create unforgettable evenings.'
    ],
    stats: [
      { value: '12+', label: 'Years of Heritage' },
      { value: '35+', label: 'Signature Mixes' },
      { value: '4.8★', label: 'Guest Rating' },
      { value: '250+', label: 'Rooftop Capacity' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80',
    published: true
  },
  seo: {
    metaTitle: '1522 The Pub Mumbai — Premier Rooftop Bar & Kitchen in Andheri East',
    metaDescription: 'Experience 1522 Mumbai: Andheri East’s premier rooftop pub with craft cocktails, Mangalorean ghee roast, live music, and starlit open-air sky deck dining.',
    keywords: ['1522 Mumbai', 'Rooftop Pub Andheri', 'Cocktail Bar Andheri East', 'Goldfinch Hotel Pub', 'Mangalorean Ghee Roast']
  }
};

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
    published: true,
    archived: false,
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
    published: true,
    archived: false,
    createdAt: new Date('2026-08-18T11:30:00Z'),
    updatedAt: new Date('2026-08-18T11:30:00Z')
  }
];

let memoryMenuItems = initialMenuItems.map((item, index) => ({
  _id: `menu_${index + 1}`,
  ...item,
  published: true,
  archived: false,
  createdAt: new Date(),
  updatedAt: new Date()
}));

let memoryEvents = initialEvents.map((evt, index) => ({
  _id: `evt_${index + 1}`,
  ...evt,
  published: true,
  archived: false,
  createdAt: new Date(),
  updatedAt: new Date()
}));

let memoryOffers = initialOffers.map((offer, index) => ({
  _id: `offer_${index + 1}`,
  ...offer,
  published: true,
  archived: false,
  createdAt: new Date(),
  updatedAt: new Date()
}));

let memoryGalleryItems = initialGalleryItems.map((item, index) => ({
  _id: `gallery_${index + 1}`,
  ...item,
  published: true,
  archived: false,
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
    archived: false,
    createdAt: new Date('2026-08-18T12:00:00Z'),
    updatedAt: new Date('2026-08-18T12:00:00Z')
  }
];

let memoryInquiries = [];

export const dataStore = {
  // =========================================================================
  // 0. SETTINGS & CMS
  // =========================================================================
  async getSettings() {
    if (getDBStatus()) {
      try {
        let settings = await SiteSettings.findOne();
        if (!settings) {
          settings = await SiteSettings.create(memorySettings);
        }
        return settings;
      } catch (err) {
        console.warn('DB error getSettings, using memory:', err.message);
      }
    }
    return memorySettings;
  },

  async updateSettings(updateData) {
    if (getDBStatus()) {
      try {
        let settings = await SiteSettings.findOne();
        if (!settings) {
          settings = await SiteSettings.create({ ...memorySettings, ...updateData });
        } else {
          Object.assign(settings, updateData);
          await settings.save();
        }
        memorySettings = { ...memorySettings, ...updateData };
        return settings;
      } catch (err) {
        console.warn('DB error updateSettings:', err.message);
      }
    }
    memorySettings = { ...memorySettings, ...updateData };
    return memorySettings;
  },

  // =========================================================================
  // 1. RESERVATIONS
  // =========================================================================
  async getAllReservations(filters = {}) {
    const { status, date, archived, includeArchived } = filters;
    if (getDBStatus()) {
      try {
        const query = {};
        if (status) query.status = status;
        if (date) query.date = date;
        if (!includeArchived) {
          query.archived = archived === true || archived === 'true' ? true : { $ne: true };
        }
        return await Reservation.find(query).sort({ createdAt: -1 });
      } catch (err) {
        console.warn('DB error fetching reservations, using memory fallback:', err.message);
      }
    }
    let res = [...memoryReservations];
    if (status) res = res.filter(r => r.status === status);
    if (date) res = res.filter(r => r.date === date);
    if (!includeArchived) {
      if (archived === true || archived === 'true') {
        res = res.filter(r => r.archived === true);
      } else {
        res = res.filter(r => !r.archived);
      }
    }
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
    return memoryReservations.find(r => r.bookingReference?.toLowerCase() === reference.toLowerCase()) || null;
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
      status: data.status || 'confirmed',
      published: true,
      archived: false,
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
    return this.updateReservation(id, { archived: true });
  },

  // =========================================================================
  // 2. MENU ITEMS
  // =========================================================================
  async getAllMenuItems(query = {}) {
    const { category, dietary, search, available, published, archived, includeArchived } = query;

    // 1. Try MongoDB if connected
    if (getDBStatus()) {
      try {
        const filter = {};
        if (category && category !== 'all') {
          if (category === 'Food') {
            filter.category = 'Food';
          } else if (category === 'Drinks' || category === 'Cocktails') {
            filter.category = { $in: ['Cocktails', 'Beer', 'Wine', 'Non-Alcoholic', 'craft-cocktails', 'single-malts-wines'] };
          } else {
            filter.category = category;
          }
        }
        if (dietary && dietary !== 'all') filter.dietary = dietary;
        if (available !== undefined) filter.available = available === 'true' || available === true;
        if (published !== undefined) filter.published = published === 'true' || published === true;
        if (!includeArchived) {
          filter.archived = archived === 'true' || archived === true ? true : { $ne: true };
        }
        if (search) {
          filter.$or = [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
          ];
        }
        const items = await MenuItem.find(filter).sort({ sortOrder: 1, createdAt: -1 });
        if (items && items.length > 0) return items;
      } catch (err) {
        console.warn('DB error getAllMenuItems, using memory store:', err.message);
      }
    }

    // 2. Memory store
    let items = [...memoryMenuItems];
    if (category && category !== 'all') {
      const catLower = category.toLowerCase();
      if (catLower === 'food') {
        items = items.filter(i => (i.category || '').toLowerCase() === 'food');
      } else if (catLower === 'drinks') {
        items = items.filter(i => (i.category || '').toLowerCase() !== 'food');
      } else {
        items = items.filter(i => 
          (i.category || '').toLowerCase() === catLower || 
          (i.subCategory && i.subCategory.toLowerCase() === catLower)
        );
      }
    }
    if (dietary && dietary !== 'all') {
      items = items.filter(i => i.dietary === dietary);
    }
    if (available !== undefined) {
      const isAvail = available === 'true' || available === true;
      items = items.filter(i => i.available === isAvail);
    }
    if (published !== undefined) {
      const isPub = published === 'true' || published === true;
      items = items.filter(i => (i.published !== undefined ? i.published === isPub : isPub));
    }
    if (!includeArchived) {
      if (archived === true || archived === 'true') {
        items = items.filter(i => i.archived === true);
      } else {
        items = items.filter(i => !i.archived);
      }
    }
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(i => 
        (i.name || '').toLowerCase().includes(q) || 
        (i.description || '').toLowerCase().includes(q)
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
    const newItemData = {
      ...data,
      available: data.available !== undefined ? data.available : true,
      published: data.published !== undefined ? data.published : true,
      archived: false,
      featured: data.featured || data.isChefsSpecial || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (getDBStatus()) {
      try {
        return await MenuItem.create(newItemData);
      } catch (err) {
        console.warn('DB error createMenuItem:', err.message);
      }
    }
    const newItem = {
      _id: `menu_${Date.now()}`,
      ...newItemData
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
    return this.updateMenuItem(id, { archived: true, published: false });
  },

  async toggleMenuItemAvailability(id) {
    const item = await this.getMenuItemById(id);
    if (!item) return null;
    return this.updateMenuItem(id, { available: !item.available });
  },

  // =========================================================================
  // 3. EVENTS
  // =========================================================================
  async getAllEvents(query = {}) {
    const { includeInactive, published, archived, includeArchived } = typeof query === 'boolean' ? { includeInactive: query } : query;

    if (getDBStatus()) {
      try {
        const filter = {};
        if (!includeInactive) filter.active = true;
        if (published !== undefined) filter.published = published === 'true' || published === true;
        if (!includeArchived) {
          filter.archived = archived === 'true' || archived === true ? true : { $ne: true };
        }
        const events = await Event.find(filter).sort({ date: 1, createdAt: -1 });
        if (events && events.length > 0) return events;
      } catch (err) {
        console.warn('DB error getAllEvents:', err.message);
      }
    }

    let list = [...memoryEvents];
    if (!includeInactive) list = list.filter(e => e.active !== false);
    if (published !== undefined) {
      const isPub = published === 'true' || published === true;
      list = list.filter(e => (e.published !== undefined ? e.published === isPub : isPub));
    }
    if (!includeArchived) {
      if (archived === true || archived === 'true') {
        list = list.filter(e => e.archived === true);
      } else {
        list = list.filter(e => !e.archived);
      }
    }
    return list;
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
    const newEventData = {
      ...data,
      rsvpCount: 0,
      active: data.active !== undefined ? data.active : true,
      published: data.published !== undefined ? data.published : true,
      archived: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (getDBStatus()) {
      try {
        return await Event.create(newEventData);
      } catch (err) {
        console.warn('DB error createEvent:', err.message);
      }
    }
    const newEvt = {
      _id: `evt_${Date.now()}`,
      ...newEventData
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
    return this.updateEvent(id, { archived: true, published: false, active: false });
  },

  async rsvpEvent(eventId) {
    const evt = await this.getEventById(eventId);
    if (!evt) return null;
    const newCount = (evt.rsvpCount || 0) + 1;
    return this.updateEvent(eventId, { rsvpCount: newCount });
  },

  // =========================================================================
  // 4. OFFERS
  // =========================================================================
  async getAllOffers(query = {}) {
    const { includeExpired, published, archived, includeArchived } = typeof query === 'boolean' ? { includeExpired: query } : query;
    const now = new Date();

    if (getDBStatus()) {
      try {
        const filter = {};
        if (!includeExpired) {
          filter.active = true;
          filter.endDate = { $gte: now };
        }
        if (published !== undefined) filter.published = published === 'true' || published === true;
        if (!includeArchived) {
          filter.archived = archived === 'true' || archived === true ? true : { $ne: true };
        }
        const offers = await Offer.find(filter).sort({ createdAt: -1 });
        if (offers && offers.length > 0) return offers;
      } catch (err) {
        console.warn('DB error getAllOffers:', err.message);
      }
    }

    let list = [...memoryOffers];
    if (!includeExpired) {
      list = list.filter(o => {
        const notExpired = !o.endDate || new Date(o.endDate) >= now;
        return o.active !== false && notExpired;
      });
    }
    if (published !== undefined) {
      const isPub = published === 'true' || published === true;
      list = list.filter(o => (o.published !== undefined ? o.published === isPub : isPub));
    }
    if (!includeArchived) {
      if (archived === true || archived === 'true') {
        list = list.filter(o => o.archived === true);
      } else {
        list = list.filter(o => !o.archived);
      }
    }
    return list;
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
    const newOfferData = {
      ...data,
      active: data.active !== undefined ? data.active : true,
      published: data.published !== undefined ? data.published : true,
      archived: false,
      startDate: data.startDate || new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (getDBStatus()) {
      try {
        return await Offer.create(newOfferData);
      } catch (err) {
        console.warn('DB error createOffer:', err.message);
      }
    }
    const newOffer = {
      _id: `offer_${Date.now()}`,
      ...newOfferData
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
    return this.updateOffer(id, { archived: true, published: false, active: false });
  },

  // =========================================================================
  // 5. GALLERY ITEMS
  // =========================================================================
  async getAllGalleryItems(query = {}) {
    const { category, published, archived, includeArchived } = typeof query === 'string' ? { category: query } : query;

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
        if (published !== undefined) filter.published = published === 'true' || published === true;
        if (!includeArchived) {
          filter.archived = archived === 'true' || archived === true ? true : { $ne: true };
        }
        const items = await GalleryItem.find(filter).sort({ order: 1, createdAt: -1 });
        if (items && items.length > 0) return items;
      } catch (err) {
        console.warn('DB error getAllGalleryItems:', err.message);
      }
    }

    let items = [...memoryGalleryItems];
    if (category && category !== 'All') {
      if (category === 'Food & Drink' || category.toLowerCase() === 'food-drink') {
        items = items.filter(item => item.category === 'Food' || item.category === 'Drinks');
      } else {
        items = items.filter(item => item.category.toLowerCase() === category.toLowerCase());
      }
    }
    if (published !== undefined) {
      const isPub = published === 'true' || published === true;
      items = items.filter(item => (item.published !== undefined ? item.published === isPub : isPub));
    }
    if (!includeArchived) {
      if (archived === true || archived === 'true') {
        items = items.filter(item => item.archived === true);
      } else {
        items = items.filter(item => !item.archived);
      }
    }
    return items.sort((a, b) => (a.order || 0) - (b.order || 0));
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
    const newItemData = {
      ...data,
      order: memoryGalleryItems.length + 1,
      published: data.published !== undefined ? data.published : true,
      archived: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (getDBStatus()) {
      try {
        return await GalleryItem.create(newItemData);
      } catch (err) {
        console.warn('DB error createGalleryItem:', err.message);
      }
    }
    const newItem = {
      _id: `gallery_${Date.now()}`,
      ...newItemData
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
    return this.updateGalleryItem(id, { archived: true, published: false });
  },

  // =========================================================================
  // 6. NEWSLETTER SUBSCRIBERS
  // =========================================================================
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

  // =========================================================================
  // 7. CONTACT MESSAGES
  // =========================================================================
  async getAllContactMessages(filters = {}) {
    const { status, archived, includeArchived } = typeof filters === 'string' ? { status: filters } : filters;
    if (getDBStatus()) {
      try {
        const query = {};
        if (status) query.status = status;
        if (!includeArchived) {
          query.archived = archived === true || archived === 'true' ? true : { $ne: true };
        }
        return await ContactMessage.find(query).sort({ createdAt: -1 });
      } catch (err) {
        console.warn('DB error getAllContactMessages:', err.message);
      }
    }
    let list = [...memoryMessages];
    if (status) list = list.filter(m => m.status === status);
    if (!includeArchived) {
      if (archived === true || archived === 'true') {
        list = list.filter(m => m.archived === true);
      } else {
        list = list.filter(m => !m.archived);
      }
    }
    return list;
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
    const newMsgData = {
      ...data,
      status: 'unread',
      archived: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (getDBStatus()) {
      try {
        return await ContactMessage.create(newMsgData);
      } catch (err) {
        console.warn('DB error createContactMessage:', err.message);
      }
    }
    const newMsg = {
      _id: `msg_${Date.now()}`,
      ...newMsgData
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
        const updated = await ContactMessage.findByIdAndUpdate(id, { archived: true, status: 'archived' }, { new: true });
        if (updated) return updated;
      } catch (err) {
        console.warn('DB error deleteContactMessage:', err.message);
      }
    }
    const msg = memoryMessages.find(m => m._id === id);
    if (msg) {
      msg.archived = true;
      msg.status = 'archived';
      return msg;
    }
    return null;
  },

  // =========================================================================
  // 8. PRIVATE DINING & EVENT INQUIRIES
  // =========================================================================
  async getAllInquiries(filters = {}) {
    const { status, archived, includeArchived } = typeof filters === 'string' ? { status: filters } : filters;
    if (getDBStatus()) {
      try {
        const query = {};
        if (status) query.status = status;
        if (!includeArchived) {
          query.archived = archived === true || archived === 'true' ? true : { $ne: true };
        }
        return await Inquiry.find(query).sort({ createdAt: -1 });
      } catch (err) {
        console.warn('DB error getAllInquiries:', err.message);
      }
    }
    let list = [...memoryInquiries];
    if (status) list = list.filter(i => i.status === status);
    if (!includeArchived) {
      if (archived === true || archived === 'true') {
        list = list.filter(i => i.archived === true);
      } else {
        list = list.filter(i => !i.archived);
      }
    }
    return list;
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
    const newInqData = {
      ...data,
      status: 'new',
      archived: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // 1. Try Supabase
    await supabaseService.createInquiry(newInqData);

    // 2. Try MongoDB
    if (getDBStatus()) {
      try {
        return await Inquiry.create(newInqData);
      } catch (err) {
        console.warn('DB error createInquiry:', err.message);
      }
    }
    const newInquiry = {
      _id: `inq_${Date.now()}`,
      ...newInqData
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
        const updated = await Inquiry.findByIdAndUpdate(id, { archived: true, status: 'archived' }, { new: true });
        if (updated) return updated;
      } catch (err) {
        console.warn('DB error deleteInquiry:', err.message);
      }
    }
    const inq = memoryInquiries.find(i => i._id === id);
    if (inq) {
      inq.archived = true;
      inq.status = 'archived';
      return inq;
    }
    return null;
  },

  // =========================================================================
  // 9. AUTO-SEEDER
  // =========================================================================
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
        await MenuItem.insertMany(initialMenuItems.map(m => ({ ...m, published: true, archived: false })));
      }

      const eventCount = await Event.countDocuments();
      if (eventCount === 0) {
        console.log('[Database] Seeding Initial Events...');
        await Event.insertMany(initialEvents.map(e => ({ ...e, published: true, archived: false })));
      }

      const offerCount = await Offer.countDocuments();
      if (offerCount === 0) {
        console.log('[Database] Seeding Initial Offers...');
        await Offer.insertMany(initialOffers.map(o => ({ ...o, published: true, archived: false })));
      }

      const galleryCount = await GalleryItem.countDocuments();
      if (galleryCount === 0) {
        console.log('[Database] Seeding Initial Gallery Items...');
        await GalleryItem.insertMany(initialGalleryItems.map(g => ({ ...g, published: true, archived: false })));
      }

      const settingsCount = await SiteSettings.countDocuments();
      if (settingsCount === 0) {
        console.log('[Database] Seeding Initial Site Settings...');
        await SiteSettings.create(memorySettings);
      }
      console.log('[Database] Seed validation complete.');
    } catch (err) {
      console.warn('[Database] Seed operation note:', err.message);
    }
  }
};
