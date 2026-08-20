import { supabase, isSupabaseConfigured } from '../config/supabase.js';
import { initialMenuItems, initialGalleryItems, initialEvents, initialOffers, initialReviews } from './seedData.js';

class SupabaseService {
  constructor() {
    this.isReady = false;
    this.tablesExist = {
      menu_items: false,
      gallery_items: false,
      reservations: false,
      events: false,
      offers: false,
      contact_messages: false,
      newsletter_subscribers: false,
      inquiries: false,
      reviews: false,
    };
  }

  async checkTables() {
    if (!isSupabaseConfigured()) return false;
    try {
      const results = await Promise.allSettled([
        supabase.from('menu_items').select('id').limit(1),
        supabase.from('gallery_items').select('id').limit(1),
        supabase.from('reservations').select('id').limit(1),
        supabase.from('events').select('id').limit(1),
        supabase.from('offers').select('id').limit(1),
      ]);

      this.tablesExist.menu_items = results[0].status === 'fulfilled' && !results[0].value.error;
      this.tablesExist.gallery_items = results[1].status === 'fulfilled' && !results[1].value.error;
      this.tablesExist.reservations = results[2].status === 'fulfilled' && !results[2].value.error;
      this.tablesExist.events = results[3].status === 'fulfilled' && !results[3].value.error;
      this.tablesExist.offers = results[4].status === 'fulfilled' && !results[4].value.error;

      const anyReady = Object.values(this.tablesExist).some(Boolean);
      this.isReady = anyReady;
      return anyReady;
    } catch (err) {
      console.warn('[Supabase] Health check error:', err.message);
      return false;
    }
  }

  // --- MENU ITEMS ---
  async getMenuItems({ category = 'all', dietary = 'all', search = '' } = {}) {
    if (!this.tablesExist.menu_items) return null;
    try {
      let query = supabase.from('menu_items').select('*').eq('available', true);

      if (category && category !== 'all') {
        query = query.ilike('category', `%${category}%`);
      }
      if (dietary && dietary !== 'all') {
        query = query.eq('dietary', dietary);
      }
      if (search) {
        query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      if (!data || data.length === 0) return null;

      return data.map((item) => ({
        _id: item.id,
        name: item.name,
        description: item.description,
        category: item.category,
        subCategory: item.sub_category,
        price: Number(item.price),
        dietary: item.dietary,
        spiciness: item.spiciness,
        pairWith: item.pair_with,
        image: item.image,
        featured: item.featured,
        isChefsSpecial: item.is_chefs_special,
        isGlutenFree: item.is_gluten_free,
        available: item.available,
        tags: item.tags || [],
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));
    } catch (err) {
      console.warn('[Supabase] getMenuItems fallback:', err.message);
      return null;
    }
  }

  // --- GALLERY ITEMS ---
  async getGalleryItems({ category = 'All' } = {}) {
    if (!this.tablesExist.gallery_items) return null;
    try {
      let query = supabase.from('gallery_items').select('*').order('sort_order', { ascending: true });

      if (category && category !== 'All') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      if (error) throw error;
      if (!data || data.length === 0) return null;

      return data.map((item) => ({
        _id: item.id,
        title: item.title,
        category: item.category,
        caption: item.caption,
        imageUrl: item.image_url,
        image: item.image_url,
        featured: item.featured,
        createdAt: item.created_at,
      }));
    } catch (err) {
      console.warn('[Supabase] getGalleryItems fallback:', err.message);
      return null;
    }
  }

  // --- RESERVATIONS ---
  async createReservation(data) {
    if (!this.tablesExist.reservations) return null;
    try {
      const payload = {
        booking_reference: data.bookingReference,
        name: data.name || data.guestName,
        email: data.email,
        phone: data.phone,
        reservation_date: data.date,
        reservation_time: data.time || data.timeSlot,
        party_size: Number(data.guests || data.partySize || 2),
        deck_zone: data.deckZone || 'sky-deck',
        occasion: data.occasion || 'general',
        special_requests: data.specialRequest || data.specialRequests || '',
        status: data.status || 'confirmed',
      };

      const { data: result, error } = await supabase.from('reservations').insert([payload]).select().single();
      if (error) throw error;

      return {
        _id: result.id,
        bookingReference: result.booking_reference,
        name: result.name,
        guestName: result.name,
        email: result.email,
        phone: result.phone,
        date: result.reservation_date,
        time: result.reservation_time,
        timeSlot: result.reservation_time,
        guests: result.party_size,
        partySize: result.party_size,
        deckZone: result.deck_zone,
        occasion: result.occasion,
        specialRequest: result.special_requests,
        specialRequests: result.special_requests,
        status: result.status,
        createdAt: result.created_at,
        updatedAt: result.updated_at,
      };
    } catch (err) {
      console.warn('[Supabase] createReservation fallback:', err.message);
      return null;
    }
  }

  // --- EVENTS ---
  async getEvents() {
    if (!this.tablesExist.events) return null;
    try {
      const { data, error } = await supabase.from('events').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      if (!data || data.length === 0) return null;

      return data.map((evt) => ({
        _id: evt.id,
        title: evt.title,
        genre: evt.genre,
        date: evt.date_formatted,
        time: evt.time_formatted,
        day: evt.day_name,
        artist: evt.artist_name,
        artistTagline: evt.artist_tagline,
        image: evt.image_url,
        ticketStatus: evt.ticket_status,
        description: evt.description,
        entryFee: evt.entry_fee,
        isFeatured: evt.is_featured,
        createdAt: evt.created_at,
      }));
    } catch (err) {
      console.warn('[Supabase] getEvents fallback:', err.message);
      return null;
    }
  }

  // --- OFFERS ---
  async getOffers() {
    if (!this.tablesExist.offers) return null;
    try {
      const { data, error } = await supabase.from('offers').select('*').eq('active', true);
      if (error) throw error;
      if (!data || data.length === 0) return null;

      return data.map((offer) => ({
        _id: offer.id,
        title: offer.title,
        tagline: offer.tagline,
        badge: offer.badge,
        schedule: offer.schedule,
        terms: offer.terms,
        accent: offer.accent_color,
        isFeatured: offer.is_featured,
        active: offer.active,
        createdAt: offer.created_at,
      }));
    } catch (err) {
      console.warn('[Supabase] getOffers fallback:', err.message);
      return null;
    }
  }

  // --- CONTACT MESSAGES ---
  async createContactMessage(data) {
    if (!this.tablesExist.contact_messages) return null;
    try {
      const { data: result, error } = await supabase.from('contact_messages').insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          message: data.message,
          status: 'unread',
        },
      ]).select().single();

      if (error) throw error;
      return result;
    } catch (err) {
      console.warn('[Supabase] createContactMessage fallback:', err.message);
      return null;
    }
  }

  // --- NEWSLETTER ---
  async createSubscriber(email) {
    if (!this.tablesExist.newsletter_subscribers) return null;
    try {
      const { data: result, error } = await supabase.from('newsletter_subscribers').insert([
        {
          email,
          active: true,
          source: 'website_footer',
        },
      ]).select().single();

      if (error) throw error;
      return result;
    } catch (err) {
      console.warn('[Supabase] createSubscriber fallback:', err.message);
      return null;
    }
  }

  // --- INQUIRIES (PRIVATE DINING & EVENTS) ---
  async createInquiry(data) {
    if (!this.tablesExist.inquiries) return null;
    try {
      const { data: result, error } = await supabase.from('inquiries').insert([
        {
          event_type: data.eventType || data.type || 'corporate',
          name: data.name,
          email: data.email,
          phone: data.phone,
          guest_count: Number(data.guestCount || data.guests || 20),
          preferred_date: data.preferredDate || null,
          preferred_zone: data.preferredZone || 'exclusive-full-rooftop',
          special_requirements: data.specialRequirements || data.message || '',
          status: 'pending',
        },
      ]).select().single();

      if (error) throw error;
      return result;
    } catch (err) {
      console.warn('[Supabase] createInquiry fallback:', err.message);
      return null;
    }
  }

  // --- AUTOMATED SEEDER FOR SUPABASE ---
  async seedIfEmpty() {
    if (!isSupabaseConfigured()) return;
    await this.checkTables();

    // 1. Seed & Sync Menu Items
    if (this.tablesExist.menu_items) {
      try {
        const { count, error } = await supabase.from('menu_items').select('*', { count: 'exact', head: true });
        if (!error && count === 0) {
          console.log('[Supabase] Seeding menu_items table...');
          const rows = initialMenuItems.map((item) => ({
            name: item.name,
            description: item.description,
            category: item.category,
            sub_category: item.subCategory,
            price: item.price,
            dietary: item.dietary,
            spiciness: item.spiciness || 0,
            pair_with: item.pairWith || null,
            image: item.image || null,
            featured: Boolean(item.featured),
            is_chefs_special: Boolean(item.isChefsSpecial),
            is_gluten_free: Boolean(item.isGlutenFree),
            available: item.available !== false,
            tags: item.tags || [],
          }));
          await supabase.from('menu_items').insert(rows);
          console.log(`[Supabase] Successfully seeded ${rows.length} menu items.`);
        } else if (!error) {
          // Update Jamun & Gin Fizz image in Supabase
          await supabase.from('menu_items').update({ image: '/images/drinks/botanical-gin-fizz.jpg' }).ilike('name', '%Jamun%');
          // Update Smoked Kokum image in Supabase
          await supabase.from('menu_items').update({ image: '/images/drinks/smoked-rosemary-cocktail.jpg' }).ilike('name', '%Kokum%');
          // Update Espresso Martini image in Supabase
          await supabase.from('menu_items').update({ image: '/images/drinks/espresso-martini.jpg' }).ilike('name', '%Espresso%');
          // Update Old Fashioned image in Supabase
          await supabase.from('menu_items').update({ image: '/images/drinks/smoked-cinnamon-old-fashioned.jpg' }).ilike('name', '%Old Fashioned%');
          // Update Dal 1522 image in Supabase
          await supabase.from('menu_items').update({ image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80' }).ilike('image', '%1546833999%');
          // Update Chicken Ghee Roast image in Supabase
          await supabase.from('menu_items').update({ image: '/images/food/chicken-ghee-roast.jpg' }).ilike('name', '%Ghee Roast%');
        }
      } catch (e) {
        console.warn('[Supabase] Menu seed error:', e.message);
      }
    }

    // 2. Seed & Sync Gallery Items
    if (this.tablesExist.gallery_items) {
      try {
        const { count, error } = await supabase.from('gallery_items').select('*', { count: 'exact', head: true });
        if (!error && count === 0) {
          console.log('[Supabase] Seeding gallery_items table...');
          const rows = initialGalleryItems.map((item, idx) => ({
            title: item.title,
            category: item.category,
            caption: item.caption || '',
            image_url: item.imageUrl || item.image,
            featured: Boolean(item.featured),
            sort_order: idx + 1,
          }));
          await supabase.from('gallery_items').insert(rows);
          console.log(`[Supabase] Successfully seeded ${rows.length} gallery items.`);
        } else if (!error) {
          // Delete the 3 removed photos (Santorini sea view, Aquarium fish, Steel Dal thali)
          await supabase.from('gallery_items').delete().ilike('image_url', '%1525610553991%');
          await supabase.from('gallery_items').delete().ilike('image_url', '%1566417713940%');
          await supabase.from('gallery_items').delete().ilike('image_url', '%1546833999%');
          await supabase.from('gallery_items').delete().ilike('title', '%Dal 1522%');
          await supabase.from('gallery_items').delete().ilike('title', '%Vibrant Neon%');
          await supabase.from('gallery_items').delete().ilike('title', '%Twilight Terrace%');

          // Update Chicken Ghee Roast in Supabase gallery
          await supabase.from('gallery_items').update({ image_url: '/images/food/chicken-ghee-roast.jpg' }).ilike('title', '%Ghee Roast%');
          // Update all 4 cocktails in Supabase gallery
          await supabase.from('gallery_items').update({ image_url: '/images/drinks/botanical-gin-fizz.jpg' }).ilike('title', '%Jamun%');
          await supabase.from('gallery_items').update({ image_url: '/images/drinks/smoked-rosemary-cocktail.jpg' }).ilike('title', '%Blood Orange%');
          await supabase.from('gallery_items').update({ image_url: '/images/drinks/espresso-martini.jpg', title: 'Handcrafted Cold Brew Nitrogen Espresso Martini' }).ilike('title', '%Espresso%');
          await supabase.from('gallery_items').update({ image_url: '/images/drinks/smoked-cinnamon-old-fashioned.jpg' }).ilike('title', '%Old Fashioned%');
        }
      } catch (e) {
        console.warn('[Supabase] Gallery seed error:', e.message);
      }
    }

    // 3. Seed Events
    if (this.tablesExist.events) {
      try {
        const { count, error } = await supabase.from('events').select('*', { count: 'exact', head: true });
        if (!error && count === 0) {
          console.log('[Supabase] Seeding events table...');
          const rows = initialEvents.map((evt) => ({
            title: evt.title,
            genre: evt.genre,
            date_formatted: evt.date,
            time_formatted: evt.time,
            day_name: evt.day,
            artist_name: evt.artist,
            artist_tagline: evt.artistTagline,
            image_url: evt.image,
            ticket_status: evt.ticketStatus || 'available',
            description: evt.description,
            entry_fee: evt.entryFee || 0,
            is_featured: Boolean(evt.isFeatured),
          }));
          await supabase.from('events').insert(rows);
          console.log(`[Supabase] Successfully seeded ${rows.length} events.`);
        }
      } catch (e) {
        console.warn('[Supabase] Events seed error:', e.message);
      }
    }

    // 4. Seed Offers
    if (this.tablesExist.offers) {
      try {
        const { count, error } = await supabase.from('offers').select('*', { count: 'exact', head: true });
        if (!error && count === 0) {
          console.log('[Supabase] Seeding offers table...');
          const rows = initialOffers.map((offer) => ({
            title: offer.title,
            tagline: offer.tagline,
            badge: offer.badge,
            schedule: offer.schedule,
            terms: offer.terms,
            accent_color: offer.accent || 'terracotta',
            is_featured: Boolean(offer.isFeatured),
            active: offer.active !== false,
          }));
          await supabase.from('offers').insert(rows);
          console.log(`[Supabase] Successfully seeded ${rows.length} offers.`);
        }
      } catch (e) {
        console.warn('[Supabase] Offers seed error:', e.message);
      }
    }
  }
}

export const supabaseService = new SupabaseService();
export default supabaseService;
