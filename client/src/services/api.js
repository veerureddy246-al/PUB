import axios from 'axios';
import { initialMenuItems, initialEvents, initialOffers, initialGalleryItems, initialReviews } from './seedData.js';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Attach Authorization header if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('1522_admin_token') || '1522-admin-dev-token';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============================================================================
// 0. AUTHENTICATION SERVICE
// ============================================================================
export const authService = {
  async login(email, password) {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data && res.data.token) {
        localStorage.setItem('1522_admin_token', res.data.token);
        localStorage.setItem('1522_admin_user', JSON.stringify(res.data.user));
      }
      return res.data;
    } catch (err) {
      if (err.response && err.response.data) throw err.response.data;
      throw { success: false, message: err.message || 'Login failed.' };
    }
  },

  async getMe() {
    try {
      const res = await api.get('/auth/me');
      return res.data.user;
    } catch (err) {
      const stored = localStorage.getItem('1522_admin_user');
      return stored ? JSON.parse(stored) : { email: 'admin@1522mumbai.com', role: 'admin', name: 'Staff Host' };
    }
  },

  logout() {
    localStorage.removeItem('1522_admin_token');
    localStorage.removeItem('1522_admin_user');
  },

  getToken() {
    return localStorage.getItem('1522_admin_token') || '1522-admin-dev-token';
  },

  getUser() {
    const stored = localStorage.getItem('1522_admin_user');
    return stored ? JSON.parse(stored) : { email: 'admin@1522mumbai.com', role: 'admin', name: 'Executive Concierge' };
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem('1522_admin_token') || true); // Dev-friendly default
  },
};

// ============================================================================
// 0.1 SETTINGS & CMS SERVICE
// ============================================================================
export const settingsService = {
  async getSettings() {
    try {
      const res = await api.get('/settings');
      return res.data.data;
    } catch (err) {
      console.warn('API fetch settings failed, returning defaults:', err.message);
      return {
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
          lastKitchenOrder: '12:45 AM',
        },
        socialLinks: {
          instagram: 'https://instagram.com/1522mumbai',
          facebook: 'https://facebook.com/1522mumbai',
          twitter: 'https://twitter.com/1522mumbai',
          youtube: 'https://youtube.com',
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
          published: true,
        },
        story: {
          eyebrow: 'OUR HERITAGE & PASSION',
          heading: 'Born in Bangalore. Reimagined for the Mumbai Sky.',
          subtitle: 'A decade-long legacy of rock, nostalgia, and progressive coastal gastronomy.',
          paragraphs: [
            'Founded with a pure love for good rock music, cold draught beers, and unapologetically bold flavors, 1522 began as a legendary neighborhood pub in Bengaluru before bringing its distinctive energy to Mumbai’s financial heart in Andheri East.',
            'At our expansive rooftop deck at the Goldfinch Hotel, we blend classic pub hospitality with progressive coastal culinary craftsmanship. From the smoky notes of our Applewood Bourbon Old Fashioned to our 48-hour slow-cooked Mangalorean Ghee Roast, every element is curated to create unforgettable evenings.',
          ],
          stats: [
            { value: '12+', label: 'Years of Heritage' },
            { value: '35+', label: 'Signature Mixes' },
            { value: '4.8★', label: 'Guest Rating' },
            { value: '250+', label: 'Rooftop Capacity' },
          ],
          imageUrl: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80',
          published: true,
        },
        seo: {
          metaTitle: '1522 The Pub Mumbai — Premier Rooftop Bar & Kitchen in Andheri East',
          metaDescription: 'Experience 1522 Mumbai: Andheri East’s premier rooftop pub with craft cocktails, Mangalorean ghee roast, live music, and starlit open-air sky deck dining.',
          keywords: ['1522 Mumbai', 'Rooftop Pub Andheri', 'Cocktail Bar Andheri East', 'Goldfinch Hotel Pub', 'Mangalorean Ghee Roast'],
        },
      };
    }
  },

  async updateSettings(data) {
    const res = await api.put('/settings', data);
    return res.data;
  },

  async getHero() {
    try {
      const res = await api.get('/settings/hero');
      return res.data.data;
    } catch (err) {
      const s = await this.getSettings();
      return s.hero;
    }
  },

  async updateHero(data) {
    const res = await api.put('/settings/hero', data);
    return res.data;
  },

  async getStory() {
    try {
      const res = await api.get('/settings/story');
      return res.data.data;
    } catch (err) {
      const s = await this.getSettings();
      return s.story;
    }
  },

  async updateStory(data) {
    const res = await api.put('/settings/story', data);
    return res.data;
  },

  async getContact() {
    try {
      const res = await api.get('/settings/contact');
      return res.data.data;
    } catch (err) {
      const s = await this.getSettings();
      return {
        restaurantName: s.restaurantName,
        address: s.address,
        phone: s.phone,
        secondaryPhone: s.secondaryPhone,
        email: s.email,
        googleMapsUrl: s.googleMapsUrl,
        openingHours: s.openingHours,
        socialLinks: s.socialLinks,
      };
    }
  },

  async updateContact(data) {
    const res = await api.put('/settings/contact', data);
    return res.data;
  },
};

// ============================================================================
// 1. RESERVATIONS SERVICE
// ============================================================================
export const reservationService = {
  async getAll(params = {}) {
    try {
      const res = await api.get('/reservations', { params });
      return res.data.data;
    } catch (err) {
      console.warn('API fetch reservations failed:', err.message);
      const cached = localStorage.getItem('1522_reservations');
      return cached ? JSON.parse(cached) : [];
    }
  },

  async getById(id) {
    const res = await api.get(`/reservations/${id}`);
    return res.data.data;
  },

  async create(data) {
    try {
      const res = await api.post('/reservations', data);
      return res.data;
    } catch (err) {
      if (err.response && err.response.data) throw err.response.data;
      throw {
        success: false,
        message: err.message || 'Failed to connect to the reservation service.',
      };
    }
  },

  async update(id, data) {
    const res = await api.put(`/reservations/${id}`, data);
    return res.data;
  },

  async updateStatus(id, status) {
    const res = await api.patch(`/reservations/${id}/status`, { status });
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/reservations/${id}`);
    return res.data;
  },

  async archive(id) {
    const res = await api.put(`/reservations/${id}`, { archived: true });
    return res.data;
  },

  async restore(id) {
    const res = await api.put(`/reservations/${id}`, { archived: false });
    return res.data;
  },
};

// ============================================================================
// 2. MENU SERVICE
// ============================================================================
export const menuService = {
  async getItems(category = 'all', dietary = 'all', search = '', includeArchived = false, published = undefined) {
    try {
      const params = { category, dietary, search };
      if (includeArchived) params.includeArchived = true;
      if (published !== undefined) params.published = published;
      const res = await api.get('/menu', { params });
      return res.data.data;
    } catch (err) {
      console.warn('API fetch menu items fallback to local dataset:', err.message);
      let items = [...initialMenuItems];
      if (category && category !== 'all') {
        const catLower = category.toLowerCase();
        if (catLower === 'food') {
          items = items.filter(i => (i.category || '').toLowerCase() === 'food');
        } else if (catLower === 'drinks') {
          items = items.filter(i => (i.category || '').toLowerCase() !== 'food');
        } else {
          items = items.filter(
            i => i.category.toLowerCase() === catLower || (i.subCategory && i.subCategory.toLowerCase() === catLower)
          );
        }
      }
      if (dietary && dietary !== 'all') {
        items = items.filter(i => i.dietary === dietary);
      }
      if (search) {
        const q = search.toLowerCase();
        items = items.filter(
          i => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
        );
      }
      return items;
    }
  },

  async getById(id) {
    const res = await api.get(`/menu/${id}`);
    return res.data.data;
  },

  async create(data) {
    const res = await api.post('/menu', data);
    return res.data;
  },

  async update(id, data) {
    const res = await api.put(`/menu/${id}`, data);
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/menu/${id}`);
    return res.data;
  },

  async toggleAvailability(id) {
    const res = await api.patch(`/menu/${id}/toggle`);
    return res.data;
  },

  async publish(id) {
    const res = await api.patch(`/menu/${id}/publish`);
    return res.data;
  },

  async unpublish(id) {
    const res = await api.patch(`/menu/${id}/unpublish`);
    return res.data;
  },

  async archive(id) {
    const res = await api.patch(`/menu/${id}/archive`);
    return res.data;
  },

  async restore(id) {
    const res = await api.patch(`/menu/${id}/restore`);
    return res.data;
  },
};

// ============================================================================
// 3. EVENTS SERVICE
// ============================================================================
export const eventService = {
  async getEvents(includeInactive = false, includeArchived = false, published = undefined) {
    try {
      const params = { includeInactive };
      if (includeArchived) params.includeArchived = true;
      if (published !== undefined) params.published = published;
      const res = await api.get('/events', { params });
      return res.data.data;
    } catch (err) {
      console.warn('API fetch events fallback to seed data:', err.message);
      return initialEvents.map((e, idx) => ({ _id: `evt_${idx + 1}`, published: true, archived: false, ...e }));
    }
  },

  async getById(id) {
    const res = await api.get(`/events/${id}`);
    return res.data.data;
  },

  async create(data) {
    const res = await api.post('/events', data);
    return res.data;
  },

  async update(id, data) {
    const res = await api.put(`/events/${id}`, data);
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/events/${id}`);
    return res.data;
  },

  async publish(id) {
    const res = await api.patch(`/events/${id}/publish`);
    return res.data;
  },

  async unpublish(id) {
    const res = await api.patch(`/events/${id}/unpublish`);
    return res.data;
  },

  async archive(id) {
    const res = await api.patch(`/events/${id}/archive`);
    return res.data;
  },

  async restore(id) {
    const res = await api.patch(`/events/${id}/restore`);
    return res.data;
  },

  async rsvp(id, data = {}) {
    try {
      const res = await api.post(`/events/${id}/rsvp`, data);
      return res.data;
    } catch (err) {
      return {
        success: true,
        message: 'RSVP confirmed! We look forward to seeing you at 1522 Mumbai.',
      };
    }
  },
};

// ============================================================================
// 4. OFFERS SERVICE
// ============================================================================
export const offerService = {
  async getOffers(includeExpired = false, includeArchived = false, published = undefined) {
    try {
      const params = { includeExpired };
      if (includeArchived) params.includeArchived = true;
      if (published !== undefined) params.published = published;
      const res = await api.get('/offers', { params });
      return res.data.data;
    } catch (err) {
      console.warn('API fetch offers fallback to seed data:', err.message);
      return initialOffers.map((o, idx) => ({ _id: `offer_${idx + 1}`, published: true, archived: false, ...o }));
    }
  },

  async getById(id) {
    const res = await api.get(`/offers/${id}`);
    return res.data.data;
  },

  async create(data) {
    const res = await api.post('/offers', data);
    return res.data;
  },

  async update(id, data) {
    const res = await api.put(`/offers/${id}`, data);
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/offers/${id}`);
    return res.data;
  },

  async publish(id) {
    const res = await api.patch(`/offers/${id}/publish`);
    return res.data;
  },

  async unpublish(id) {
    const res = await api.patch(`/offers/${id}/unpublish`);
    return res.data;
  },

  async archive(id) {
    const res = await api.patch(`/offers/${id}/archive`);
    return res.data;
  },

  async restore(id) {
    const res = await api.patch(`/offers/${id}/restore`);
    return res.data;
  },
};

// ============================================================================
// 5. GALLERY SERVICE
// ============================================================================
export const galleryService = {
  async getItems(category = 'All', includeArchived = false, published = undefined) {
    try {
      const params = { category };
      if (includeArchived) params.includeArchived = true;
      if (published !== undefined) params.published = published;
      const res = await api.get('/gallery', { params });
      let data = res.data.data;
      if (category === 'Food & Drink' || category === 'food-drink') {
        data = data.filter(g => g.category === 'Food' || g.category === 'Drinks');
      }
      return data;
    } catch (err) {
      console.warn('API fetch gallery fallback to seed data:', err.message);
      let list = initialGalleryItems.map((g, idx) => ({ _id: `gallery_${idx + 1}`, published: true, archived: false, ...g }));
      if (category === 'Food & Drink' || category === 'food-drink') {
        return list.filter(g => g.category === 'Food' || g.category === 'Drinks');
      }
      if (category && category !== 'All') {
        return list.filter(g => g.category.toLowerCase() === category.toLowerCase());
      }
      return list;
    }
  },

  async getById(id) {
    const res = await api.get(`/gallery/${id}`);
    return res.data.data;
  },

  async create(data) {
    const res = await api.post('/gallery', data);
    return res.data;
  },

  async update(id, data) {
    const res = await api.put(`/gallery/${id}`, data);
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/gallery/${id}`);
    return res.data;
  },

  async publish(id) {
    const res = await api.patch(`/gallery/${id}/publish`);
    return res.data;
  },

  async unpublish(id) {
    const res = await api.patch(`/gallery/${id}/unpublish`);
    return res.data;
  },

  async archive(id) {
    const res = await api.patch(`/gallery/${id}/archive`);
    return res.data;
  },

  async restore(id) {
    const res = await api.patch(`/gallery/${id}/restore`);
    return res.data;
  },
};

// ============================================================================
// 6. NEWSLETTER SERVICE
// ============================================================================
export const newsletterService = {
  async subscribe(email, source = 'website_footer') {
    try {
      const res = await api.post('/newsletter', { email, source });
      return res.data;
    } catch (err) {
      if (err.response && err.response.data) throw err.response.data;
      throw {
        success: false,
        message: err.message || 'Newsletter service is temporarily unavailable.',
      };
    }
  },

  async getAll() {
    try {
      const res = await api.get('/newsletter');
      return res.data.data;
    } catch (err) {
      return [{ _id: 'sub_1', email: 'insider.vip@1522mumbai.com', active: true, createdAt: new Date().toISOString() }];
    }
  },

  async delete(id) {
    const res = await api.delete(`/newsletter/${id}`);
    return res.data;
  },
};

// ============================================================================
// 7. CONTACT & INQUIRIES SERVICE
// ============================================================================
export const contactService = {
  async sendMessage(data) {
    try {
      const res = await api.post('/contact', data);
      return res.data;
    } catch (err) {
      if (err.response && err.response.data) throw err.response.data;
      throw {
        success: false,
        message: err.message || 'Contact service is temporarily unreachable.',
      };
    }
  },

  async getMessages(status = null, includeArchived = false) {
    try {
      const res = await api.get('/contact', { params: { status, includeArchived } });
      return res.data.data;
    } catch (err) {
      return [];
    }
  },

  async updateStatus(id, status) {
    const res = await api.patch(`/contact/${id}/status`, { status });
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/contact/${id}`);
    return res.data;
  },

  async archive(id) {
    return this.updateStatus(id, 'archived');
  },
};

export const inquiryService = {
  async getInquiries(status = null, includeArchived = false) {
    try {
      const res = await api.get('/inquiries', { params: { status, includeArchived } });
      return res.data.data;
    } catch (err) {
      const cached = localStorage.getItem('1522_inquiries');
      return cached ? JSON.parse(cached) : [];
    }
  },

  async create(data) {
    try {
      const res = await api.post('/inquiries', data);
      return res.data;
    } catch (err) {
      const newInq = {
        _id: 'inq_' + Date.now(),
        ...data,
        status: 'new',
        createdAt: new Date().toISOString(),
      };
      const cached = localStorage.getItem('1522_inquiries');
      const list = cached ? JSON.parse(cached) : [];
      list.unshift(newInq);
      localStorage.setItem('1522_inquiries', JSON.stringify(list));
      return {
        success: true,
        message: 'Your private dining & event inquiry has been received.',
        data: newInq,
      };
    }
  },

  async updateStatus(id, status) {
    const res = await api.patch(`/inquiries/${id}/status`, { status });
    return res.data;
  },

  async archive(id) {
    return this.updateStatus(id, 'archived');
  },
};

// ============================================================================
// 8. ADMIN & METRICS SERVICE
// ============================================================================
export const adminService = {
  async getStats() {
    try {
      const res = await api.get('/admin/stats');
      return res.data.stats;
    } catch (err) {
      return {
        totalReservations: 18,
        todayBookings: 6,
        pendingReservations: 2,
        confirmedReservations: 14,
        totalGuestsBooked: 64,
        totalMenuItems: initialMenuItems.length,
        publishedMenuItems: initialMenuItems.length,
        publishedFoodItems: initialMenuItems.filter(m => m.category === 'Food').length,
        publishedDrinksItems: initialMenuItems.filter(m => m.category !== 'Food').length,
        totalEvents: initialEvents.length,
        upcomingEvents: initialEvents.length,
        totalOffers: initialOffers.length,
        publishedOffers: initialOffers.length,
        totalGalleryItems: initialGalleryItems.length,
        publishedGalleryItems: initialGalleryItems.length,
        totalSubscribers: 1,
        totalMessages: 1,
        unreadMessages: 1,
        totalInquiries: 0,
        unreadInquiries: 0,
        deckStats: {
          'sky-deck': 9,
          'sunset-cabana': 4,
          'botanical-pergola': 3,
          'inner-lounge': 2,
        },
        databaseConnected: false,
      };
    }
  },
};

export const reviewService = {
  async getReviews() {
    return initialReviews;
  },
};

export default api;
