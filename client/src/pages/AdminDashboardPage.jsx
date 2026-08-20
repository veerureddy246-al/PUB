import React, { useState, useEffect } from 'react';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import {
  reservationService,
  inquiryService,
  menuService,
  eventService,
  offerService,
  galleryService,
  newsletterService,
  contactService,
  adminService,
  settingsService
} from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import {
  Users,
  Calendar,
  Clock,
  Wine,
  CheckCircle2,
  XCircle,
  Clock3,
  RefreshCw,
  Search,
  Filter,
  Phone,
  Mail,
  ShieldCheck,
  Tag,
  Camera,
  MessageSquare,
  Sparkles,
  Music,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Archive,
  RotateCcw,
  Edit3,
  Globe,
  Settings,
  BookOpen,
  Layout,
  Share2,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Copy,
  ExternalLink,
  Lock,
  LogOut
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const { addToast } = useNotification();
  const { user, logout } = useAuth();

  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'reservations', 'menu', 'food', 'drinks', 'gallery', 'events', 'offers', 'story', 'hero', 'contact', 'socials', 'subscribers', 'inquiries', 'media', 'seo'
  
  // Data States
  const [stats, setStats] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [events, setEvents] = useState([]);
  const [offers, setOffers] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [messages, setMessages] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);

  // Filters & Search
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [archivedFilter, setArchivedFilter] = useState('active'); // 'active', 'archived', 'all'

  // Modals & Editing States
  const [modalType, setModalType] = useState(null); // 'create_menu', 'edit_menu', 'create_event', 'edit_event', 'create_offer', 'edit_offer', 'create_gallery', 'edit_gallery', 'view_reservation', 'view_inquiry'
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch all CMS datasets
  const loadData = async () => {
    setLoading(true);
    try {
      const [sData, rData, iData, mData, eData, oData, gData, msgData, subData, setts] = await Promise.all([
        adminService.getStats(),
        reservationService.getAll({ includeArchived: true }),
        inquiryService.getInquiries(null, true),
        menuService.getItems('all', 'all', '', true),
        eventService.getEvents(true, true),
        offerService.getOffers(true, true),
        galleryService.getItems('All', true),
        contactService.getMessages(null, true),
        newsletterService.getAll(),
        settingsService.getSettings()
      ]);
      setStats(sData);
      setReservations(rData || []);
      setInquiries(iData || []);
      setMenuItems(mData || []);
      setEvents(eData || []);
      setOffers(oData || []);
      setGalleryItems(gData || []);
      setMessages(msgData || []);
      setSubscribers(subData || []);
      setSettings(setts || {});
    } catch (err) {
      console.error('Failed to load admin dashboard data', err);
      addToast('Error loading live CMS feeds.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Lifecycle Actions (Publish, Unpublish, Archive, Restore)
  const handleTogglePublish = async (type, item) => {
    const isCurrentlyPublished = item.published !== false;
    try {
      if (type === 'menu') {
        if (isCurrentlyPublished) await menuService.unpublish(item._id);
        else await menuService.publish(item._id);
      } else if (type === 'event') {
        if (isCurrentlyPublished) await eventService.unpublish(item._id);
        else await eventService.publish(item._id);
      } else if (type === 'offer') {
        if (isCurrentlyPublished) await offerService.unpublish(item._id);
        else await offerService.publish(item._id);
      } else if (type === 'gallery') {
        if (isCurrentlyPublished) await galleryService.unpublish(item._id);
        else await galleryService.publish(item._id);
      }
      addToast(`Item ${isCurrentlyPublished ? 'unpublished' : 'published'} successfully.`, 'success');
      loadData();
    } catch (err) {
      addToast('Failed to update publication status.', 'error');
    }
  };

  const handleToggleArchive = async (type, item) => {
    const isCurrentlyArchived = item.archived === true;
    try {
      if (type === 'menu') {
        if (isCurrentlyArchived) await menuService.restore(item._id);
        else await menuService.archive(item._id);
      } else if (type === 'event') {
        if (isCurrentlyArchived) await eventService.restore(item._id);
        else await eventService.archive(item._id);
      } else if (type === 'offer') {
        if (isCurrentlyArchived) await offerService.restore(item._id);
        else await offerService.archive(item._id);
      } else if (type === 'gallery') {
        if (isCurrentlyArchived) await galleryService.restore(item._id);
        else await galleryService.archive(item._id);
      } else if (type === 'reservation') {
        if (isCurrentlyArchived) await reservationService.restore(item._id);
        else await reservationService.archive(item._id);
      } else if (type === 'inquiry') {
        await inquiryService.archive(item._id);
      } else if (type === 'message') {
        await contactService.archive(item._id);
      }
      addToast(`Item ${isCurrentlyArchived ? 'restored' : 'archived'} successfully.`, 'info');
      loadData();
    } catch (err) {
      addToast('Failed to update archive status.', 'error');
    }
  };

  const handleUpdateReservationStatus = async (id, newStatus) => {
    try {
      await reservationService.updateStatus(id, newStatus);
      addToast(`Reservation status updated to "${newStatus}".`, 'success');
      loadData();
    } catch (err) {
      addToast('Failed to update reservation status.', 'error');
    }
  };

  const handleUpdateInquiryStatus = async (id, newStatus) => {
    try {
      await inquiryService.updateStatus(id, newStatus);
      addToast(`Inquiry marked as ${newStatus}.`, 'success');
      loadData();
    } catch (err) {
      addToast('Failed to update inquiry status.', 'error');
    }
  };

  const handleUpdateMessageStatus = async (id, newStatus) => {
    try {
      await contactService.updateStatus(id, newStatus);
      addToast(`Message marked as ${newStatus}.`, 'success');
      loadData();
    } catch (err) {
      addToast('Failed to update message status.', 'error');
    }
  };

  const handleSaveSettings = async (section, data) => {
    setSavingSettings(true);
    try {
      if (section === 'hero') {
        await settingsService.updateHero(data);
      } else if (section === 'story') {
        await settingsService.updateStory(data);
      } else if (section === 'contact') {
        await settingsService.updateContact(data);
      } else {
        await settingsService.updateSettings(data);
      }
      addToast('Website CMS settings saved & published successfully!', 'success');
      loadData();
    } catch (err) {
      addToast('Failed to save settings.', 'error');
    } finally {
      setSavingSettings(false);
    }
  };

  // Generic Save Handler for Modals
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'create_menu') {
        await menuService.create(formData);
        addToast('New menu item added to catalog.', 'success');
      } else if (modalType === 'edit_menu') {
        await menuService.update(selectedItem._id, formData);
        addToast('Menu item updated successfully.', 'success');
      } else if (modalType === 'create_event') {
        await eventService.create(formData);
        addToast('Live event scheduled & published.', 'success');
      } else if (modalType === 'edit_event') {
        await eventService.update(selectedItem._id, formData);
        addToast('Event details updated.', 'success');
      } else if (modalType === 'create_offer') {
        await offerService.create(formData);
        addToast('New offer created.', 'success');
      } else if (modalType === 'edit_offer') {
        await offerService.update(selectedItem._id, formData);
        addToast('Offer updated.', 'success');
      } else if (modalType === 'create_gallery') {
        await galleryService.create(formData);
        addToast('Gallery photograph uploaded.', 'success');
      } else if (modalType === 'edit_gallery') {
        await galleryService.update(selectedItem._id, formData);
        addToast('Gallery item updated.', 'success');
      }
      setModalType(null);
      setSelectedItem(null);
      setFormData({});
      loadData();
    } catch (err) {
      addToast(err.message || 'Operation failed.', 'error');
    }
  };

  // Open Modal Helper
  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setFormData(item ? { ...item } : {});
  };

  // Filter Helper
  const filterList = (list, searchFields = ['name', 'title', 'email']) => {
    return list.filter(item => {
      // Archive Filter
      if (archivedFilter === 'active' && item.archived === true) return false;
      if (archivedFilter === 'archived' && item.archived !== true) return false;

      // Status Filter
      if (statusFilter !== 'all') {
        if (statusFilter === 'published' && item.published === false) return false;
        if (statusFilter === 'unpublished' && item.published !== false) return false;
        if (['pending', 'confirmed', 'cancelled', 'completed', 'unread', 'read', 'replied'].includes(statusFilter)) {
          if (item.status !== statusFilter) return false;
        }
      }

      // Category Filter
      if (categoryFilter !== 'all') {
        if (item.category && item.category.toLowerCase() !== categoryFilter.toLowerCase()) return false;
      }

      // Search Query
      if (search.trim()) {
        const q = search.toLowerCase();
        const match = searchFields.some(field => {
          const val = item[field];
          return val && String(val).toLowerCase().includes(q);
        });
        if (!match) return false;
      }

      return true;
    });
  };

  return (
    <div className="pt-28 pb-24 bg-charcoal-950 text-stone-100 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-terracotta-400 bg-terracotta-500/10 px-2.5 py-0.5 rounded border border-terracotta-500/20">
                1522 Master Control Hub
              </span>
              {stats?.databaseConnected ? (
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> MongoDB Live
                </span>
              ) : (
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                  Resilient Store Active
                </span>
              )}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-stone-100 font-normal">
              1522 Mumbai CMS & Admin Portal
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              icon={RefreshCw}
              onClick={loadData}
              loading={loading}
            >
              Sync Live Feeds
            </Button>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-300 bg-charcoal-900 border border-stone-700 hover:border-stone-500 rounded-xl transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Live Site</span>
            </a>
          </div>
        </div>

        {/* Top Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto border-b border-stone-800 pb-3 mb-6 no-scrollbar">
          {[
            { id: 'dashboard', label: 'Dashboard Overview', icon: Layout },
            { id: 'reservations', label: `Reservations (${reservations.filter(r => !r.archived).length})`, icon: Calendar },
            { id: 'menu', label: `Menu (${menuItems.filter(m => !m.archived).length})`, icon: Wine },
            { id: 'food', label: `Food (${menuItems.filter(m => m.category === 'Food' && !m.archived).length})`, icon: Wine },
            { id: 'drinks', label: `Drinks (${menuItems.filter(m => m.category !== 'Food' && !m.archived).length})`, icon: Wine },
            { id: 'gallery', label: `Gallery (${galleryItems.filter(g => !g.archived).length})`, icon: Camera },
            { id: 'events', label: `Live Events (${events.filter(e => !e.archived).length})`, icon: Music },
            { id: 'offers', label: `Offers (${offers.filter(o => !o.archived).length})`, icon: Tag },
            { id: 'inquiries', label: `Inquiries (${inquiries.filter(i => !i.archived).length + messages.filter(m => !m.archived).length})`, icon: MessageSquare },
            { id: 'hero', label: 'Hero & Homepage CMS', icon: Sparkles },
            { id: 'story', label: 'Our Story CMS', icon: BookOpen },
            { id: 'contact', label: 'Contact & Hours', icon: Phone },
            { id: 'socials', label: 'Social Links', icon: Share2 },
            { id: 'subscribers', label: `Subscribers (${subscribers.length})`, icon: Mail },
            { id: 'media', label: 'Media Library', icon: ImageIcon },
            { id: 'seo', label: 'SEO & Site Settings', icon: Settings },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearch('');
                  setStatusFilter('all');
                  setCategoryFilter('all');
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-sans whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-terracotta-500 text-stone-50 font-semibold shadow-md'
                    : 'bg-charcoal-900 border border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {/* ========================================================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Metric Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { label: "Today's Bookings", val: stats?.todayBookings || 0, sub: 'Guests booked today', tab: 'reservations', color: 'text-terracotta-400', filter: 'all' },
                { label: "Pending Requests", val: stats?.pendingReservations || 0, sub: 'Needs confirmation', tab: 'reservations', color: 'text-amber-400', filter: 'pending' },
                { label: "Confirmed Tables", val: stats?.confirmedReservations || 0, sub: 'Ready for arrival', tab: 'reservations', color: 'text-emerald-400', filter: 'confirmed' },
                { label: "Published Menu", val: stats?.publishedMenuItems || menuItems.filter(m => m.published !== false && !m.archived).length, sub: 'Live dishes & drinks', tab: 'menu', color: 'text-stone-100', filter: 'published' },
                { label: "Live Events", val: stats?.upcomingEvents || events.filter(e => e.published !== false && !e.archived).length, sub: 'Upcoming gigs & DJs', tab: 'events', color: 'text-stone-100', filter: 'published' },
                { label: "Active Offers", val: stats?.publishedOffers || offers.filter(o => o.published !== false && !o.archived).length, sub: 'Live rituals & deals', tab: 'offers', color: 'text-stone-100', filter: 'published' },
                { label: "Gallery Photos", val: stats?.publishedGalleryItems || galleryItems.filter(g => g.published !== false && !g.archived).length, sub: 'Live rooftop photos', tab: 'gallery', color: 'text-stone-100', filter: 'published' },
                { label: "Newsletter Insiders", val: stats?.totalSubscribers || subscribers.length, sub: 'VIP registered emails', tab: 'subscribers', color: 'text-stone-100', filter: 'all' },
                { label: "Unread Inquiries", val: (stats?.unreadInquiries || 0) + (stats?.unreadMessages || 0), sub: 'Pending response', tab: 'inquiries', color: 'text-terracotta-400', filter: 'unread' },
                { label: "Total Guests Booked", val: stats?.totalGuestsBooked || 0, sub: 'Lifetime capacity', tab: 'reservations', color: 'text-emerald-400', filter: 'all' },
              ].map((card, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveTab(card.tab);
                    if (card.filter !== 'all') setStatusFilter(card.filter);
                  }}
                  className="bg-charcoal-900 border border-stone-800 hover:border-terracotta-500/50 rounded-2xl p-4 space-y-1.5 cursor-pointer transition-all hover:scale-[1.02] shadow-sm"
                >
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium block truncate">
                    {card.label}
                  </span>
                  <div className={`font-serif text-3xl font-bold ${card.color}`}>
                    {card.val}
                  </div>
                  <span className="text-[11px] text-stone-400 block truncate">
                    {card.sub}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Overview Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Reservations Panel */}
              <div className="bg-charcoal-900 border border-stone-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg text-stone-100 font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-terracotta-400" />
                    <span>Recent Table Bookings</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('reservations')}
                    className="text-xs text-terracotta-400 hover:underline font-medium"
                  >
                    View All &rarr;
                  </button>
                </div>
                <div className="divide-y divide-stone-800">
                  {reservations.filter(r => !r.archived).slice(0, 5).map(res => (
                    <div key={res._id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-stone-200">{res.name || res.guestName}</div>
                        <div className="text-stone-400">{res.date} • {res.time || res.timeSlot} • {res.guests || res.partySize} Guests</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                          res.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          res.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-stone-800 text-stone-400'
                        }`}>
                          {res.status || 'confirmed'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deck Capacity & Distribution */}
              <div className="bg-charcoal-900 border border-stone-800 rounded-2xl p-6 space-y-4">
                <h3 className="font-serif text-lg text-stone-100 font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-terracotta-400" />
                  <span>Rooftop Deck Booking Distribution</span>
                </h3>
                <div className="space-y-3 pt-2">
                  {[
                    { name: 'Upper Sky Deck (Open Air)', key: 'sky-deck', color: 'bg-terracotta-500' },
                    { name: 'Sunset Cabanas (City Vista)', key: 'sunset-cabana', color: 'bg-amber-500' },
                    { name: 'Botanical Pergola (Lush Green)', key: 'botanical-pergola', color: 'bg-emerald-500' },
                    { name: 'Heritage Inner Lounge (Cozy)', key: 'inner-lounge', color: 'bg-indigo-500' },
                  ].map(deck => {
                    const count = stats?.deckStats?.[deck.key] || reservations.filter(r => (r.deckZone || 'sky-deck') === deck.key).length;
                    const pct = reservations.length ? Math.round((count / reservations.length) * 100) : 25;
                    return (
                      <div key={deck.key} className="space-y-1">
                        <div className="flex justify-between text-xs text-stone-300">
                          <span>{deck.name}</span>
                          <span className="font-semibold text-stone-100">{count} bookings ({pct}%)</span>
                        </div>
                        <div className="w-full bg-stone-800 rounded-full h-2 overflow-hidden">
                          <div className={`${deck.color} h-2 rounded-full`} style={{ width: `${Math.max(pct, 5)}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: RESERVATIONS CMS */}
        {/* ========================================================================= */}
        {activeTab === 'reservations' && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-charcoal-900 p-4 rounded-2xl border border-stone-800">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search by guest name, phone, reference..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-terracotta-500"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="bg-charcoal-950 border border-stone-700 text-stone-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-terracotta-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <select
                  value={archivedFilter}
                  onChange={e => setArchivedFilter(e.target.value)}
                  className="bg-charcoal-950 border border-stone-700 text-stone-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-terracotta-500"
                >
                  <option value="active">Active Only</option>
                  <option value="archived">Archived Only</option>
                  <option value="all">Active + Archived</option>
                </select>
              </div>
              <span className="text-xs text-stone-400">
                Showing {filterList(reservations, ['name', 'guestName', 'bookingReference', 'phone', 'email']).length} bookings
              </span>
            </div>

            {/* Table */}
            <div className="bg-charcoal-900 border border-stone-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-300">
                  <thead className="bg-charcoal-950 text-stone-400 uppercase tracking-wider font-semibold border-b border-stone-800 text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4">Guest Details</th>
                      <th className="py-3.5 px-4">Date & Time</th>
                      <th className="py-3.5 px-4">Deck / Party</th>
                      <th className="py-3.5 px-4">Occasion & Requests</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                    {filterList(reservations, ['name', 'guestName', 'bookingReference', 'phone', 'email']).map(res => (
                      <tr key={res._id} className="hover:bg-charcoal-800/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-stone-100">{res.name || res.guestName}</div>
                          <div className="text-[11px] text-stone-400 font-mono">{res.bookingReference}</div>
                          <div className="text-[11px] text-terracotta-400">{res.phone} • {res.email}</div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="text-stone-200 font-medium">{res.date}</div>
                          <div className="text-[11px] text-stone-400">{res.time || res.timeSlot}</div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="text-stone-200 font-medium">{res.guests || res.partySize} Guests</div>
                          <div className="text-[11px] text-stone-400 capitalize">{res.deckZone || 'sky-deck'}</div>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="text-[11px] text-stone-300 font-medium capitalize">{res.occasion || 'Casual'}</div>
                          <div className="text-[11px] text-stone-400 truncate">{res.specialRequest || res.specialRequests || 'None'}</div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <select
                            value={res.status || 'confirmed'}
                            onChange={e => handleUpdateReservationStatus(res._id, e.target.value)}
                            className={`px-2 py-1 rounded text-[11px] font-semibold border bg-charcoal-950 focus:outline-none ${
                              res.status === 'confirmed' ? 'text-emerald-400 border-emerald-500/30' :
                              res.status === 'pending' ? 'text-amber-400 border-amber-500/30' :
                              res.status === 'cancelled' ? 'text-rose-400 border-rose-500/30' :
                              'text-stone-300 border-stone-700'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleToggleArchive('reservation', res)}
                              className="p-1.5 text-stone-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                              title={res.archived ? 'Restore Booking' : 'Archive Booking'}
                            >
                              {res.archived ? <RotateCcw className="w-3.5 h-3.5" /> : <Archive className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3, 4, 5: MENU / FOOD / DRINKS CMS */}
        {/* ========================================================================= */}
        {(activeTab === 'menu' || activeTab === 'food' || activeTab === 'drinks') && (
          <div className="space-y-6">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-charcoal-900 p-4 rounded-2xl border border-stone-800">
              <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search dishes, cocktails, ingredients..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-terracotta-500"
                  />
                </div>
                {activeTab === 'menu' && (
                  <select
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                    className="bg-charcoal-950 border border-stone-700 text-stone-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-terracotta-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="Food">Food</option>
                    <option value="Cocktails">Cocktails</option>
                    <option value="Beer">Beer</option>
                    <option value="Wine">Wine</option>
                    <option value="Non-Alcoholic">Non-Alcoholic</option>
                  </select>
                )}
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="bg-charcoal-950 border border-stone-700 text-stone-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-terracotta-500"
                >
                  <option value="all">All States</option>
                  <option value="published">Published Only</option>
                  <option value="unpublished">Unpublished Only</option>
                </select>
                <select
                  value={archivedFilter}
                  onChange={e => setArchivedFilter(e.target.value)}
                  className="bg-charcoal-950 border border-stone-700 text-stone-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-terracotta-500"
                >
                  <option value="active">Active Catalog</option>
                  <option value="archived">Archived Items</option>
                  <option value="all">All Items</option>
                </select>
              </div>

              <Button
                variant="primary"
                size="sm"
                icon={Plus}
                onClick={() => openModal('create_menu', {
                  category: activeTab === 'drinks' ? 'Cocktails' : 'Food',
                  dietary: 'veg',
                  price: 495,
                  available: true,
                  published: true,
                  image: '/images/food/chicken-ghee-roast.jpg'
                })}
              >
                Add Menu Item
              </Button>
            </div>

            {/* Menu Items Table */}
            <div className="bg-charcoal-900 border border-stone-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-300">
                  <thead className="bg-charcoal-950 text-stone-400 uppercase tracking-wider font-semibold border-b border-stone-800 text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4">Item & Image</th>
                      <th className="py-3.5 px-4">Category / Type</th>
                      <th className="py-3.5 px-4">Price</th>
                      <th className="py-3.5 px-4">Publication Status</th>
                      <th className="py-3.5 px-4">Stock Availability</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                    {filterList(
                      activeTab === 'food' ? menuItems.filter(m => m.category === 'Food') :
                      activeTab === 'drinks' ? menuItems.filter(m => m.category !== 'Food') :
                      menuItems,
                      ['name', 'description', 'category', 'subCategory']
                    ).map(item => (
                      <tr key={item._id} className="hover:bg-charcoal-800/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-xl border border-stone-700 bg-stone-800 flex-shrink-0"
                            />
                            <div>
                              <div className="font-semibold text-stone-100 flex items-center gap-1.5">
                                <span>{item.name}</span>
                                {item.featured && (
                                  <span className="bg-terracotta-500/20 text-terracotta-400 text-[9px] px-1.5 py-0.2 rounded border border-terracotta-500/30">
                                    Featured
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-stone-400 max-w-sm line-clamp-1">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="px-2 py-0.5 bg-stone-800 text-stone-300 rounded text-[10px] font-medium border border-stone-700">
                            {item.category}
                          </span>
                          {item.subCategory && (
                            <span className="block text-[10px] text-stone-400 mt-0.5 capitalize">
                              {item.subCategory}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap font-serif font-bold text-stone-100">
                          ₹{item.price}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <button
                            onClick={() => handleTogglePublish('menu', item)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                              item.published !== false
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20'
                            }`}
                          >
                            {item.published !== false ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            <span>{item.published !== false ? 'Published (Live)' : 'Unpublished (Hidden)'}</span>
                          </button>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <button
                            onClick={() => menuService.toggleAvailability(item._id).then(loadData)}
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                              item.available
                                ? 'bg-stone-800 text-stone-300 border-stone-700'
                                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            }`}
                          >
                            {item.available ? 'In Stock' : 'Out of Stock'}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openModal('edit_menu', item)}
                              className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-all"
                              title="Edit Item"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleToggleArchive('menu', item)}
                              className="p-1.5 text-stone-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                              title={item.archived ? 'Restore to Catalog' : 'Archive Item'}
                            >
                              {item.archived ? <RotateCcw className="w-3.5 h-3.5" /> : <Archive className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: GALLERY CMS */}
        {/* ========================================================================= */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-charcoal-900 p-4 rounded-2xl border border-stone-800">
              <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search gallery titles, tags..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-terracotta-500"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="bg-charcoal-950 border border-stone-700 text-stone-200 rounded-xl px-3 py-1.5 text-xs"
                >
                  <option value="all">All States</option>
                  <option value="published">Published</option>
                  <option value="unpublished">Unpublished</option>
                </select>
              </div>

              <Button
                variant="primary"
                size="sm"
                icon={Plus}
                onClick={() => openModal('create_gallery', {
                  category: 'Ambience',
                  published: true,
                  image: '/images/drinks/botanical-gin-fizz.jpg'
                })}
              >
                Upload Photo
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filterList(galleryItems, ['title', 'category', 'caption']).map(item => (
                <div key={item._id} className="bg-charcoal-900 border border-stone-800 rounded-2xl overflow-hidden group hover:border-terracotta-500/40 transition-all">
                  <div className="relative h-44 overflow-hidden bg-stone-900">
                    <img
                      src={item.image || item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      <span className="px-2 py-0.5 bg-charcoal-950/80 backdrop-blur text-stone-200 text-[10px] font-semibold rounded border border-stone-700">
                        {item.category}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => handleTogglePublish('gallery', item)}
                        className={`p-1.5 rounded-lg backdrop-blur text-xs ${
                          item.published !== false ? 'bg-emerald-500/80 text-white' : 'bg-rose-500/80 text-white'
                        }`}
                        title={item.published !== false ? 'Click to Unpublish' : 'Click to Publish'}
                      >
                        {item.published !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="font-semibold text-xs text-stone-100 line-clamp-1">{item.title || item.caption}</div>
                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-stone-800">
                      <span className={item.published !== false ? 'text-emerald-400 font-medium' : 'text-rose-400 font-medium'}>
                        {item.published !== false ? 'Live on Website' : 'Hidden from Public'}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openModal('edit_gallery', item)}
                          className="p-1 text-stone-400 hover:text-stone-100"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleToggleArchive('gallery', item)}
                          className="p-1 text-stone-400 hover:text-rose-400"
                        >
                          {item.archived ? <RotateCcw className="w-3.5 h-3.5" /> : <Archive className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: LIVE EVENTS CMS */}
        {/* ========================================================================= */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-charcoal-900 p-4 rounded-2xl border border-stone-800">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search events, artists, dates..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-terracotta-500"
                />
              </div>

              <Button
                variant="primary"
                size="sm"
                icon={Plus}
                onClick={() => openModal('create_event', {
                  category: 'Live Music',
                  active: true,
                  published: true,
                  deck: 'Upper Sky Deck (Open Air)',
                  coverCharge: 'Free Entry • Prior Table Reservation Recommended',
                  image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80'
                })}
              >
                Schedule Live Event
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterList(events, ['title', 'artist', 'category', 'description']).map(evt => (
                <div key={evt._id} className="bg-charcoal-900 border border-stone-800 rounded-2xl overflow-hidden space-y-3 p-4">
                  <div className="h-36 rounded-xl overflow-hidden relative bg-stone-900">
                    <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => handleTogglePublish('event', evt)}
                        className={`px-2 py-1 rounded text-[10px] font-bold uppercase backdrop-blur ${
                          evt.published !== false ? 'bg-emerald-500/80 text-white' : 'bg-rose-500/80 text-white'
                        }`}
                      >
                        {evt.published !== false ? 'Published' : 'Hidden'}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-terracotta-400 font-bold uppercase tracking-wider">{evt.category} • {evt.artist}</div>
                    <div className="font-serif font-bold text-base text-stone-100">{evt.title}</div>
                    <div className="text-xs text-stone-300 font-medium">{evt.date} • {evt.time || evt.timing}</div>
                    <div className="text-[11px] text-stone-400 line-clamp-2">{evt.description}</div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-800 text-xs">
                    <span className="text-[11px] text-stone-400">{evt.rsvpCount || 0} RSVPs</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openModal('edit_event', evt)} className="p-1 text-stone-400 hover:text-stone-100">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleToggleArchive('event', evt)} className="p-1 text-stone-400 hover:text-rose-400">
                        {evt.archived ? <RotateCcw className="w-3.5 h-3.5" /> : <Archive className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: OFFERS & RITUALS CMS */}
        {/* ========================================================================= */}
        {activeTab === 'offers' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-charcoal-900 p-4 rounded-2xl border border-stone-800">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search offers, happy hours..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-terracotta-500"
                />
              </div>

              <Button
                variant="primary"
                size="sm"
                icon={Plus}
                onClick={() => openModal('create_offer', {
                  badge: 'Active Ritual',
                  active: true,
                  published: true,
                  startDate: new Date().toISOString().split('T')[0],
                  endDate: new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0],
                  image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
                })}
              >
                Create Offer / Ritual
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterList(offers, ['title', 'description', 'badge']).map(offer => (
                <div key={offer._id} className="bg-charcoal-900 border border-stone-800 rounded-2xl overflow-hidden space-y-3 p-4">
                  <div className="h-36 rounded-xl overflow-hidden relative bg-stone-900">
                    <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-charcoal-950/90 text-terracotta-400 text-[10px] font-bold uppercase rounded border border-terracotta-500/20">
                      {offer.badge || 'Ritual'}
                    </span>
                    <button
                      onClick={() => handleTogglePublish('offer', offer)}
                      className={`absolute top-2 right-2 px-2 py-1 rounded text-[10px] font-bold uppercase backdrop-blur ${
                        offer.published !== false ? 'bg-emerald-500/80 text-white' : 'bg-rose-500/80 text-white'
                      }`}
                    >
                      {offer.published !== false ? 'Published' : 'Hidden'}
                    </button>
                  </div>
                  <div className="space-y-1">
                    <div className="font-serif font-bold text-base text-stone-100">{offer.title}</div>
                    <div className="text-[11px] text-stone-400">{offer.timing || 'All Day'}</div>
                    <div className="text-[11px] text-stone-300 line-clamp-2">{offer.description}</div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-800 text-xs">
                    <span className="text-[11px] text-stone-400">Valid till {new Date(offer.endDate).toLocaleDateString()}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openModal('edit_offer', offer)} className="p-1 text-stone-400 hover:text-stone-100">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleToggleArchive('offer', offer)} className="p-1 text-stone-400 hover:text-rose-400">
                        {offer.archived ? <RotateCcw className="w-3.5 h-3.5" /> : <Archive className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 9: OUR STORY CMS */}
        {/* ========================================================================= */}
        {activeTab === 'story' && settings && (
          <div className="bg-charcoal-900 border border-stone-800 rounded-2xl p-6 space-y-6 max-w-4xl">
            <div>
              <h3 className="font-serif text-xl text-stone-100 font-medium">Our Story CMS Editor</h3>
              <p className="text-xs text-stone-400">Manage the brand history, narrative paragraphs, and heritage statistics displayed on the public website.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Eyebrow Tagline</label>
                <input
                  type="text"
                  value={settings.story?.eyebrow || ''}
                  onChange={e => setSettings({ ...settings, story: { ...settings.story, eyebrow: e.target.value } })}
                  className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-terracotta-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Main Heading</label>
                <input
                  type="text"
                  value={settings.story?.heading || ''}
                  onChange={e => setSettings({ ...settings, story: { ...settings.story, heading: e.target.value } })}
                  className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-terracotta-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Story Paragraph 1</label>
                <textarea
                  rows={3}
                  value={settings.story?.paragraphs?.[0] || ''}
                  onChange={e => {
                    const p = [...(settings.story?.paragraphs || ['', ''])];
                    p[0] = e.target.value;
                    setSettings({ ...settings, story: { ...settings.story, paragraphs: p } });
                  }}
                  className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-terracotta-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Story Paragraph 2</label>
                <textarea
                  rows={3}
                  value={settings.story?.paragraphs?.[1] || ''}
                  onChange={e => {
                    const p = [...(settings.story?.paragraphs || ['', ''])];
                    p[1] = e.target.value;
                    setSettings({ ...settings, story: { ...settings.story, paragraphs: p } });
                  }}
                  className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-terracotta-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Story Feature Image URL</label>
                <input
                  type="text"
                  value={settings.story?.imageUrl || ''}
                  onChange={e => setSettings({ ...settings, story: { ...settings.story, imageUrl: e.target.value } })}
                  className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-terracotta-500"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  variant="primary"
                  onClick={() => handleSaveSettings('story', settings.story)}
                  loading={savingSettings}
                >
                  Save & Publish Story
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 10: HERO & HOMEPAGE CMS */}
        {/* ========================================================================= */}
        {activeTab === 'hero' && settings && (
          <div className="bg-charcoal-900 border border-stone-800 rounded-2xl p-6 space-y-6 max-w-4xl">
            <div>
              <h3 className="font-serif text-xl text-stone-100 font-medium">Hero Section CMS Editor</h3>
              <p className="text-xs text-stone-400">Customize the top visual impression, headings, and primary call-to-actions on the home page.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Eyebrow Badge</label>
                <input
                  type="text"
                  value={settings.hero?.eyebrow || ''}
                  onChange={e => setSettings({ ...settings, hero: { ...settings.hero, eyebrow: e.target.value } })}
                  className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-terracotta-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Main Hero Headline</label>
                <input
                  type="text"
                  value={settings.hero?.heading || ''}
                  onChange={e => setSettings({ ...settings, hero: { ...settings.hero, heading: e.target.value } })}
                  className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-terracotta-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Subheading Description</label>
                <textarea
                  rows={2}
                  value={settings.hero?.subheading || ''}
                  onChange={e => setSettings({ ...settings, hero: { ...settings.hero, subheading: e.target.value } })}
                  className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-terracotta-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Primary Button Text</label>
                  <input
                    type="text"
                    value={settings.hero?.primaryButtonText || ''}
                    onChange={e => setSettings({ ...settings, hero: { ...settings.hero, primaryButtonText: e.target.value } })}
                    className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Primary Button Link</label>
                  <input
                    type="text"
                    value={settings.hero?.primaryButtonLink || ''}
                    onChange={e => setSettings({ ...settings, hero: { ...settings.hero, primaryButtonLink: e.target.value } })}
                    className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Hero Background Image/Video URL</label>
                <input
                  type="text"
                  value={settings.hero?.mediaUrl || ''}
                  onChange={e => setSettings({ ...settings, hero: { ...settings.hero, mediaUrl: e.target.value } })}
                  className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-terracotta-500"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  variant="primary"
                  onClick={() => handleSaveSettings('hero', settings.hero)}
                  loading={savingSettings}
                >
                  Save & Publish Hero
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 11: CONTACT & OPENING HOURS CMS */}
        {/* ========================================================================= */}
        {activeTab === 'contact' && settings && (
          <div className="bg-charcoal-900 border border-stone-800 rounded-2xl p-6 space-y-6 max-w-4xl">
            <div>
              <h3 className="font-serif text-xl text-stone-100 font-medium">Contact Details & Opening Hours</h3>
              <p className="text-xs text-stone-400">Updates made here automatically appear on the Contact Page, Footer, and Header.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Primary Phone</label>
                <input
                  type="text"
                  value={settings.phone || ''}
                  onChange={e => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Secondary / WhatsApp Phone</label>
                <input
                  type="text"
                  value={settings.secondaryPhone || ''}
                  onChange={e => setSettings({ ...settings, secondaryPhone: e.target.value })}
                  className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-300 mb-1">Concierge Email</label>
                <input
                  type="text"
                  value={settings.email || ''}
                  onChange={e => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-300 mb-1">Physical Address</label>
                <input
                  type="text"
                  value={settings.address || ''}
                  onChange={e => setSettings({ ...settings, address: e.target.value })}
                  className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Weekday Hours (Mon–Fri)</label>
                <input
                  type="text"
                  value={settings.openingHours?.weekday || ''}
                  onChange={e => setSettings({ ...settings, openingHours: { ...settings.openingHours, weekday: e.target.value } })}
                  className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Weekend Hours (Sat–Sun)</label>
                <input
                  type="text"
                  value={settings.openingHours?.weekend || ''}
                  onChange={e => setSettings({ ...settings, openingHours: { ...settings.openingHours, weekend: e.target.value } })}
                  className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Happy Hours</label>
                <input
                  type="text"
                  value={settings.openingHours?.happyHours || ''}
                  onChange={e => setSettings({ ...settings, openingHours: { ...settings.openingHours, happyHours: e.target.value } })}
                  className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Last Kitchen Order</label>
                <input
                  type="text"
                  value={settings.openingHours?.lastKitchenOrder || ''}
                  onChange={e => setSettings({ ...settings, openingHours: { ...settings.openingHours, lastKitchenOrder: e.target.value } })}
                  className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                variant="primary"
                onClick={() => handleSaveSettings('contact', {
                  phone: settings.phone,
                  secondaryPhone: settings.secondaryPhone,
                  email: settings.email,
                  address: settings.address,
                  openingHours: settings.openingHours
                })}
                loading={savingSettings}
              >
                Save Contact & Hours
              </Button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 12: SOCIAL LINKS CMS */}
        {/* ========================================================================= */}
        {activeTab === 'socials' && settings && (
          <div className="bg-charcoal-900 border border-stone-800 rounded-2xl p-6 space-y-6 max-w-4xl">
            <div>
              <h3 className="font-serif text-xl text-stone-100 font-medium">Official Social Links</h3>
              <p className="text-xs text-stone-400">Configure outbound social media links displayed across the footer and contact sections.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Instagram URL</label>
                <input
                  type="text"
                  value={settings.socialLinks?.instagram || ''}
                  onChange={e => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, instagram: e.target.value } })}
                  className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Facebook URL</label>
                <input
                  type="text"
                  value={settings.socialLinks?.facebook || ''}
                  onChange={e => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, facebook: e.target.value } })}
                  className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Google Maps / Directions URL</label>
                <input
                  type="text"
                  value={settings.googleMapsUrl || ''}
                  onChange={e => setSettings({ ...settings, googleMapsUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  variant="primary"
                  onClick={() => handleSaveSettings('socials', {
                    socialLinks: settings.socialLinks,
                    googleMapsUrl: settings.googleMapsUrl
                  })}
                  loading={savingSettings}
                >
                  Save Social Links
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 13: SUBSCRIBERS */}
        {/* ========================================================================= */}
        {activeTab === 'subscribers' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-charcoal-900 p-4 rounded-2xl border border-stone-800">
              <span className="text-xs text-stone-300 font-medium">
                Total Registered Newsletter Insiders: {subscribers.length}
              </span>
            </div>

            <div className="bg-charcoal-900 border border-stone-800 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="bg-charcoal-950 text-stone-400 uppercase tracking-wider font-semibold border-b border-stone-800 text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4">Subscriber Email</th>
                    <th className="py-3.5 px-4">Subscription Source</th>
                    <th className="py-3.5 px-4">Registered Date</th>
                    <th className="py-3.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800">
                  {subscribers.map(sub => (
                    <tr key={sub._id || sub.email} className="hover:bg-charcoal-800/40">
                      <td className="py-3 px-4 font-medium text-stone-100">{sub.email}</td>
                      <td className="py-3 px-4 text-stone-400 capitalize">{sub.source || 'Website'}</td>
                      <td className="py-3 px-4 text-stone-400">{new Date(sub.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Active VIP
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 14: INQUIRIES & CONTACT MESSAGES */}
        {/* ========================================================================= */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-stone-100 font-medium">Private Dining & Event Inquiries ({inquiries.filter(i => !i.archived).length})</h3>
              <div className="bg-charcoal-900 border border-stone-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs text-stone-300">
                  <thead className="bg-charcoal-950 text-stone-400 uppercase tracking-wider font-semibold border-b border-stone-800 text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4">Organizer</th>
                      <th className="py-3.5 px-4">Event Type / Target Date</th>
                      <th className="py-3.5 px-4">Guests / Deck</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                    {inquiries.filter(i => !i.archived).map(inq => (
                      <tr key={inq._id} className="hover:bg-charcoal-800/40">
                        <td className="py-3 px-4">
                          <div className="font-semibold text-stone-100">{inq.organizerName}</div>
                          <div className="text-[11px] text-terracotta-400">{inq.phone} • {inq.email}</div>
                          {inq.companyName && <div className="text-[10px] text-stone-400">{inq.companyName}</div>}
                        </td>
                        <td className="py-3 px-4">
                          <div className="capitalize font-medium text-stone-200">{inq.eventType}</div>
                          <div className="text-[11px] text-stone-400">{inq.targetDate}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-stone-200 font-medium">{inq.estimatedGuests} Guests</div>
                          <div className="text-[11px] text-stone-400">{inq.deckPreference}</div>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={inq.status || 'new'}
                            onChange={e => handleUpdateInquiryStatus(inq._id, e.target.value)}
                            className="px-2 py-1 bg-charcoal-950 border border-stone-700 rounded text-[11px] text-stone-200 focus:outline-none"
                          >
                            <option value="new">New</option>
                            <option value="in-review">In Review</option>
                            <option value="quoted">Quoted</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="declined">Declined</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleToggleArchive('inquiry', inq)}
                            className="p-1 text-stone-400 hover:text-rose-400"
                            title="Archive Inquiry"
                          >
                            <Archive className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* General Contact Messages */}
            <div className="space-y-4 pt-6">
              <h3 className="font-serif text-lg text-stone-100 font-medium">Direct Concierge Messages ({messages.filter(m => !m.archived).length})</h3>
              <div className="bg-charcoal-900 border border-stone-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs text-stone-300">
                  <thead className="bg-charcoal-950 text-stone-400 uppercase tracking-wider font-semibold border-b border-stone-800 text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4">Sender</th>
                      <th className="py-3.5 px-4">Message Details</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                    {messages.filter(m => !m.archived).map(msg => (
                      <tr key={msg._id} className="hover:bg-charcoal-800/40">
                        <td className="py-3 px-4">
                          <div className="font-semibold text-stone-100">{msg.name}</div>
                          <div className="text-[11px] text-terracotta-400">{msg.phone} • {msg.email}</div>
                        </td>
                        <td className="py-3 px-4 max-w-md">
                          <div className="text-stone-300 line-clamp-2">{msg.message}</div>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={msg.status || 'unread'}
                            onChange={e => handleUpdateMessageStatus(msg._id, e.target.value)}
                            className="px-2 py-1 bg-charcoal-950 border border-stone-700 rounded text-[11px] text-stone-200 focus:outline-none"
                          >
                            <option value="unread">Unread</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleToggleArchive('message', msg)}
                            className="p-1 text-stone-400 hover:text-rose-400"
                            title="Archive Message"
                          >
                            <Archive className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 15: MEDIA LIBRARY */}
        {/* ========================================================================= */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="bg-charcoal-900 border border-stone-800 rounded-2xl p-4 flex justify-between items-center">
              <div>
                <h3 className="font-serif text-base text-stone-100">Active High-Resolution Media Assets</h3>
                <p className="text-xs text-stone-400">Click any image to copy its asset URL for use in Menu items, Events, Hero, or Gallery.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                { name: 'Chicken Ghee Roast', path: '/images/food/chicken-ghee-roast.jpg' },
                { name: 'Koliwada Prawns', path: '/images/food/koliwada-prawns.png' },
                { name: 'Old Fashioned Cocktail', path: '/images/drinks/smoked-cinnamon-old-fashioned.jpg' },
                { name: 'Botanical Gin Fizz', path: '/images/drinks/botanical-gin-fizz.jpg' },
                { name: 'Espresso Nitrogen Martini', path: '/images/drinks/espresso-martini.jpg' },
                { name: 'Smoked Rosemary Picante', path: '/images/drinks/smoked-rosemary-cocktail.jpg' },
                { name: 'Craft Beer Draught Tap', path: '/images/drinks/craft-beer-tap.jpg' },
              ].map((media, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    navigator.clipboard.writeText(media.path);
                    addToast(`Copied URL: ${media.path}`, 'info');
                  }}
                  className="bg-charcoal-900 border border-stone-800 hover:border-terracotta-500 rounded-xl overflow-hidden p-2 space-y-2 cursor-pointer transition-all hover:scale-105"
                >
                  <div className="h-28 rounded-lg overflow-hidden bg-stone-950">
                    <img src={media.path} alt={media.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-[11px] font-medium text-stone-200 truncate">{media.name}</div>
                  <div className="text-[9px] text-stone-400 font-mono truncate">{media.path}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 16: SEO & WEBSITE SETTINGS */}
        {/* ========================================================================= */}
        {activeTab === 'seo' && settings && (
          <div className="bg-charcoal-900 border border-stone-800 rounded-2xl p-6 space-y-6 max-w-4xl">
            <div>
              <h3 className="font-serif text-xl text-stone-100 font-medium">SEO & Website Meta Settings</h3>
              <p className="text-xs text-stone-400">Configure global search engine optimization, page titles, and social sharing metadata.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Global Meta Title</label>
                <input
                  type="text"
                  value={settings.seo?.metaTitle || ''}
                  onChange={e => setSettings({ ...settings, seo: { ...settings.seo, metaTitle: e.target.value } })}
                  className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Meta Description</label>
                <textarea
                  rows={3}
                  value={settings.seo?.metaDescription || ''}
                  onChange={e => setSettings({ ...settings, seo: { ...settings.seo, metaDescription: e.target.value } })}
                  className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Brand Tagline</label>
                <input
                  type="text"
                  value={settings.tagline || ''}
                  onChange={e => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  variant="primary"
                  onClick={() => handleSaveSettings('seo', {
                    seo: settings.seo,
                    tagline: settings.tagline
                  })}
                  loading={savingSettings}
                >
                  Save SEO Settings
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: CREATE / EDIT MENU ITEM */}
        {/* ========================================================================= */}
        {(modalType === 'create_menu' || modalType === 'edit_menu') && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-charcoal-900 border border-stone-800 rounded-2xl p-6 w-full max-w-lg space-y-4 max-h-[90vh] overflow-y-auto">
              <h3 className="font-serif text-xl text-stone-100 font-medium">
                {modalType === 'create_menu' ? 'Add New Menu Item' : 'Edit Menu Item'}
              </h3>
              <form onSubmit={handleModalSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Item Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Description</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.description || ''}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Category</label>
                    <select
                      value={formData.category || 'Food'}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                    >
                      <option value="Food">Food</option>
                      <option value="Cocktails">Cocktails</option>
                      <option value="Beer">Beer</option>
                      <option value="Wine">Wine</option>
                      <option value="Non-Alcoholic">Non-Alcoholic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Price (₹)</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formData.price || ''}
                      onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Image URL / Path</label>
                  <input
                    type="text"
                    required
                    value={formData.image || ''}
                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                  />
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.published !== false}
                      onChange={e => setFormData({ ...formData, published: e.target.checked })}
                      className="rounded border-stone-700 text-terracotta-500 focus:ring-0"
                    />
                    <span>Publish Immediately (Live)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured || false}
                      onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded border-stone-700 text-terracotta-500 focus:ring-0"
                    />
                    <span>Featured Special</span>
                  </label>
                </div>
                <div className="pt-4 flex justify-end gap-2">
                  <Button variant="outline" type="button" onClick={() => setModalType(null)}>Cancel</Button>
                  <Button variant="primary" type="submit">Save Menu Item</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: CREATE / EDIT EVENT */}
        {/* ========================================================================= */}
        {(modalType === 'create_event' || modalType === 'edit_event') && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-charcoal-900 border border-stone-800 rounded-2xl p-6 w-full max-w-lg space-y-4 max-h-[90vh] overflow-y-auto">
              <h3 className="font-serif text-xl text-stone-100 font-medium">
                {modalType === 'create_event' ? 'Schedule Live Event' : 'Edit Live Event'}
              </h3>
              <form onSubmit={handleModalSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Event Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Artist / Performer</label>
                  <input
                    type="text"
                    value={formData.artist || ''}
                    onChange={e => setFormData({ ...formData, artist: e.target.value })}
                    className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Date</label>
                    <input
                      type="date"
                      required
                      value={formData.date || ''}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Timing</label>
                    <input
                      type="text"
                      required
                      placeholder="08:00 PM onwards"
                      value={formData.time || formData.timing || ''}
                      onChange={e => setFormData({ ...formData, time: e.target.value, timing: e.target.value })}
                      className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Description</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.description || ''}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Banner Image URL</label>
                  <input
                    type="text"
                    required
                    value={formData.image || ''}
                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                  />
                </div>
                <div className="pt-4 flex justify-end gap-2">
                  <Button variant="outline" type="button" onClick={() => setModalType(null)}>Cancel</Button>
                  <Button variant="primary" type="submit">Save Event</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: CREATE / EDIT GALLERY */}
        {/* ========================================================================= */}
        {(modalType === 'create_gallery' || modalType === 'edit_gallery') && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-charcoal-900 border border-stone-800 rounded-2xl p-6 w-full max-w-lg space-y-4">
              <h3 className="font-serif text-xl text-stone-100 font-medium">
                {modalType === 'create_gallery' ? 'Upload Gallery Photograph' : 'Edit Gallery Photograph'}
              </h3>
              <form onSubmit={handleModalSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Title / Caption</label>
                  <input
                    type="text"
                    required
                    value={formData.title || formData.caption || ''}
                    onChange={e => setFormData({ ...formData, title: e.target.value, caption: e.target.value })}
                    className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Category</label>
                  <select
                    value={formData.category || 'Ambience'}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                  >
                    <option value="Ambience">Ambience</option>
                    <option value="Food">Food</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Events">Events</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Image URL / Path</label>
                  <input
                    type="text"
                    required
                    value={formData.image || formData.url || ''}
                    onChange={e => setFormData({ ...formData, image: e.target.value, url: e.target.value })}
                    className="w-full px-3 py-2 bg-charcoal-950 border border-stone-700 rounded-xl text-xs text-stone-100"
                  />
                </div>
                <div className="pt-4 flex justify-end gap-2">
                  <Button variant="outline" type="button" onClick={() => setModalType(null)}>Cancel</Button>
                  <Button variant="primary" type="submit">Save Photograph</Button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboardPage;
