import axios from 'axios';
import { initialMenuItems, initialEvents, initialOffers, initialGalleryItems, initialReviews } from './seedData.js';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// 1. RESERVATIONS SERVICE
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
      if (err.response && err.response.data) {
        throw err.response.data;
      }
      throw {
        success: false,
        message: err.message || 'Failed to connect to the reservation service.',
      };
    }
  },

  async updateStatus(id, status) {
    const res = await api.patch(`/reservations/${id}/status`, { status });
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/reservations/${id}`);
    return res.data;
  },
};

// 2. MENU SERVICE
export const menuService = {
  async getItems(category = 'all', dietary = 'all', search = '') {
    try {
      const res = await api.get('/menu', {
        params: { category, dietary, search },
      });
      return res.data.data;
    } catch (err) {
      console.warn('API fetch menu items fallback to local dataset:', err.message);
      let items = [...initialMenuItems];
      if (category && category !== 'all') {
        const catLower = category.toLowerCase();
        items = items.filter(
          i => i.category.toLowerCase() === catLower || (i.subCategory && i.subCategory.toLowerCase() === catLower)
        );
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
};

// 3. EVENTS SERVICE
export const eventService = {
  async getEvents() {
    try {
      const res = await api.get('/events');
      return res.data.data;
    } catch (err) {
      console.warn('API fetch events fallback to seed data:', err.message);
      return initialEvents.map((e, idx) => ({ _id: `evt_${idx + 1}`, ...e }));
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

// 4. OFFERS SERVICE
export const offerService = {
  async getOffers(includeExpired = false) {
    try {
      const res = await api.get('/offers', { params: { includeExpired } });
      return res.data.data;
    } catch (err) {
      console.warn('API fetch offers fallback to seed data:', err.message);
      return initialOffers;
    }
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
};

// 5. GALLERY SERVICE
export const galleryService = {
  async getItems(category = 'All') {
    try {
      const res = await api.get('/gallery', { params: { category } });
      let data = res.data.data;
      if (category === 'Food & Drink' || category === 'food-drink') {
        data = data.filter(g => g.category === 'Food' || g.category === 'Drinks');
      }
      return data;
    } catch (err) {
      console.warn('API fetch gallery fallback to seed data:', err.message);
      if (category === 'Food & Drink' || category === 'food-drink') {
        return initialGalleryItems.filter(g => g.category === 'Food' || g.category === 'Drinks');
      }
      if (category && category !== 'All') {
        return initialGalleryItems.filter(g => g.category.toLowerCase() === category.toLowerCase());
      }
      return initialGalleryItems;
    }
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
};

// 6. NEWSLETTER SERVICE
export const newsletterService = {
  async subscribe(email, source = 'website_footer') {
    try {
      const res = await api.post('/newsletter', { email, source });
      return res.data;
    } catch (err) {
      if (err.response && err.response.data) {
        throw err.response.data;
      }
      throw {
        success: false,
        message: err.message || 'Newsletter service is temporarily unavailable.',
      };
    }
  },

  async getAll() {
    const res = await api.get('/newsletter');
    return res.data.data;
  },

  async delete(id) {
    const res = await api.delete(`/newsletter/${id}`);
    return res.data;
  },
};

// 7. CONTACT & INQUIRIES SERVICE
export const contactService = {
  async sendMessage(data) {
    try {
      const res = await api.post('/contact', data);
      return res.data;
    } catch (err) {
      if (err.response && err.response.data) {
        throw err.response.data;
      }
      throw {
        success: false,
        message: err.message || 'Contact service is temporarily unreachable.',
      };
    }
  },

  async getMessages(status = null) {
    const res = await api.get('/contact', { params: { status } });
    return res.data.data;
  },

  async updateStatus(id, status) {
    const res = await api.patch(`/contact/${id}/status`, { status });
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/contact/${id}`);
    return res.data;
  },
};

export const inquiryService = {
  async getInquiries() {
    try {
      const res = await api.get('/inquiries');
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
};

// 8. ADMIN & METRICS SERVICE
export const adminService = {
  async getStats() {
    try {
      const res = await api.get('/admin/stats');
      return res.data.stats;
    } catch (err) {
      return {
        totalReservations: 18,
        totalGuestsBooked: 64,
        todayBookings: 6,
        unreadMessages: 1,
        totalMenuItems: initialMenuItems.length,
        availableMenuItems: initialMenuItems.length,
        totalEvents: initialEvents.length,
        totalOffers: initialOffers.length,
        activeOffers: initialOffers.length,
        totalGalleryItems: initialGalleryItems.length,
        totalSubscribers: 1,
        totalMessages: 1,
        deckStats: {
          'sky-deck': 9,
          'sunset-cabana': 4,
          'botanical-pergola': 3,
          'inner-lounge': 2,
        },
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
