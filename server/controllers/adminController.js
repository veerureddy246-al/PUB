import { dataStore } from '../services/dataStore.js';
import { getDBStatus } from '../config/db.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const reservations = await dataStore.getAllReservations();
    const menuItems = await dataStore.getAllMenuItems();
    const events = await dataStore.getAllEvents(true);
    const offers = await dataStore.getAllOffers(true);
    const galleryItems = await dataStore.getAllGalleryItems('All');
    const subscribers = await dataStore.getAllSubscribers();
    const messages = await dataStore.getAllContactMessages();

    // Compute deck distribution
    const deckStats = {
      'sky-deck': 0,
      'sunset-cabana': 0,
      'botanical-pergola': 0,
      'inner-lounge': 0
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
    const todayBookings = reservations.filter(r => r.date === todayStr).length;
    const unreadMessages = messages.filter(m => m.status === 'unread').length;

    res.json({
      success: true,
      stats: {
        totalReservations: reservations.length,
        totalGuestsBooked,
        todayBookings,
        unreadMessages,
        totalMenuItems: menuItems.length,
        availableMenuItems: menuItems.filter(m => m.available).length,
        totalEvents: events.length,
        totalOffers: offers.length,
        activeOffers: offers.filter(o => o.active).length,
        totalGalleryItems: galleryItems.length,
        totalSubscribers: subscribers.length,
        totalMessages: messages.length,
        deckStats,
        databaseConnected: getDBStatus()
      }
    });
  } catch (error) {
    next(error);
  }
};
