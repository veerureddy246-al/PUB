import { dataStore } from '../services/dataStore.js';
import { getDBStatus } from '../config/db.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const reservations = await dataStore.getAllReservations();
    const menuItems = await dataStore.getAllMenuItems({ includeArchived: true });
    const events = await dataStore.getAllEvents({ includeArchived: true, includeInactive: true });
    const offers = await dataStore.getAllOffers({ includeArchived: true, includeExpired: true });
    const galleryItems = await dataStore.getAllGalleryItems({ includeArchived: true });
    const subscribers = await dataStore.getAllSubscribers();
    const messages = await dataStore.getAllContactMessages();
    const inquiries = await dataStore.getAllInquiries();

    // Compute deck distribution
    const deckStats = {
      'sky-deck': 0,
      'sunset-cabana': 0,
      'botanical-pergola': 0,
      'inner-lounge': 0,
    };

    let totalGuestsBooked = 0;
    reservations.forEach(r => {
      const g = Number(r.guests || r.partySize || 0);
      totalGuestsBooked += g;
      const d = r.deckZone || 'sky-deck';
      if (deckStats[d] !== undefined) {
        deckStats[d] += 1;
      }
    });

    const todayStr = new Date().toISOString().split('T')[0];
    const todayBookings = reservations.filter(r => r.date === todayStr && !r.archived).length;
    const pendingReservations = reservations.filter(r => (r.status === 'pending' || !r.status) && !r.archived).length;
    const confirmedReservations = reservations.filter(r => r.status === 'confirmed' && !r.archived).length;

    const unreadMessages = messages.filter(m => m.status === 'unread' && !m.archived).length;
    const unreadInquiries = inquiries.filter(i => (i.status === 'new' || i.status === 'in-review') && !i.archived).length;

    const publishedMenuItems = menuItems.filter(m => m.published !== false && !m.archived).length;
    const publishedFoodItems = menuItems.filter(m => m.category === 'Food' && m.published !== false && !m.archived).length;
    const publishedDrinksItems = menuItems.filter(m => m.category !== 'Food' && m.published !== false && !m.archived).length;

    const upcomingEvents = events.filter(e => e.published !== false && e.active !== false && !e.archived).length;
    const publishedOffers = offers.filter(o => o.published !== false && o.active !== false && !o.archived).length;
    const publishedGallery = galleryItems.filter(g => g.published !== false && !g.archived).length;

    res.json({
      success: true,
      stats: {
        totalReservations: reservations.filter(r => !r.archived).length,
        todayBookings,
        pendingReservations,
        confirmedReservations,
        totalGuestsBooked,
        totalMenuItems: menuItems.length,
        publishedMenuItems,
        publishedFoodItems,
        publishedDrinksItems,
        totalEvents: events.length,
        upcomingEvents,
        totalOffers: offers.length,
        publishedOffers,
        totalGalleryItems: galleryItems.length,
        publishedGalleryItems: publishedGallery,
        totalSubscribers: subscribers.length,
        totalMessages: messages.length,
        unreadMessages,
        totalInquiries: inquiries.length,
        unreadInquiries,
        deckStats,
        databaseConnected: getDBStatus(),
      },
    });
  } catch (error) {
    next(error);
  }
};
