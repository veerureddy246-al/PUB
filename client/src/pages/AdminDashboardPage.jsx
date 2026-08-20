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
  adminService
} from '../services/api';
import { useNotification } from '../context/NotificationContext';
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
  Trash2
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const { addToast } = useNotification();

  const [activeTab, setActiveTab] = useState('reservations'); // 'reservations', 'menu', 'events', 'offers', 'gallery', 'messages', 'subscribers', 'inquiries'
  const [stats, setStats] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [events, setEvents] = useState([]);
  const [offers, setOffers] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [messages, setMessages] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [sData, rData, iData, mData, eData, oData, gData, msgData, subData] = await Promise.all([
        adminService.getStats(),
        reservationService.getAll(),
        inquiryService.getInquiries(),
        menuService.getItems('all'),
        eventService.getEvents(),
        offerService.getOffers(true),
        galleryService.getItems('All'),
        contactService.getMessages(),
        newsletterService.getAll()
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
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateReservationStatus = async (id, newStatus) => {
    try {
      await reservationService.updateStatus(id, newStatus);
      addToast(`Reservation status updated to "${newStatus}".`, 'success');
      loadData();
    } catch (err) {
      addToast('Failed to update status.', 'error');
    }
  };

  const handleToggleMenuAvailability = async (id) => {
    try {
      await menuService.toggleAvailability(id);
      addToast('Menu item availability toggled.', 'info');
      loadData();
    } catch (err) {
      addToast('Failed to update menu item.', 'error');
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

  const handleDeleteMessage = async (id) => {
    try {
      await contactService.delete(id);
      addToast('Message deleted.', 'info');
      loadData();
    } catch (err) {
      addToast('Failed to delete message.', 'error');
    }
  };

  const filteredReservations = reservations.filter(r =>
    ((r.name || r.guestName) && (r.name || r.guestName).toLowerCase().includes(search.toLowerCase())) ||
    (r.bookingReference && r.bookingReference.toLowerCase().includes(search.toLowerCase())) ||
    (r.phone && r.phone.includes(search))
  );

  return (
    <div className="pt-28 pb-24 bg-charcoal-950 text-stone-100 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-terracotta-400 bg-terracotta-500/10 px-2.5 py-0.5 rounded border border-terracotta-500/20">
                Staff Operations Portal
              </span>
              {stats?.databaseConnected ? (
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                  MongoDB Connected
                </span>
              ) : (
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                  In-Memory State Backing
                </span>
              )}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-stone-100 font-normal">
              1522 Mumbai Host Desk
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={RefreshCw}
              onClick={loadData}
              loading={loading}
            >
              Refresh Real-time Feeds
            </Button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-charcoal-900 border border-stone-800 rounded-2xl p-5 space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">
              Total Table Bookings
            </span>
            <div className="font-serif text-3xl font-bold text-stone-100">
              {stats?.totalReservations || reservations.length}
            </div>
            <span className="text-[11px] text-terracotta-400 font-sans">
              {stats?.totalGuestsBooked || 0} total guests accommodated
            </span>
          </div>

          <div className="bg-charcoal-900 border border-stone-800 rounded-2xl p-5 space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">
              Unread Concierge Messages
            </span>
            <div className="font-serif text-3xl font-bold text-terracotta-400">
              {messages.filter(m => m.status === 'unread').length}
            </div>
            <span className="text-[11px] text-stone-400">Direct guest inquiries</span>
          </div>

          <div className="bg-charcoal-900 border border-stone-800 rounded-2xl p-5 space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">
              Menu & Bar Items
            </span>
            <div className="font-serif text-3xl font-bold text-stone-100">
              {menuItems.length}
            </div>
            <span className="text-[11px] text-emerald-400">
              {menuItems.filter(m => m.available).length} active on menu
            </span>
          </div>

          <div className="bg-charcoal-900 border border-stone-800 rounded-2xl p-5 space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">
              Newsletter Insiders
            </span>
            <div className="font-serif text-3xl font-bold text-stone-100">
              {subscribers.length}
            </div>
            <span className="text-[11px] text-stone-400">Registered subscribers</span>
          </div>
        </div>

        {/* Tab Navigation Strip */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-stone-800 pb-3 mb-6 no-scrollbar">
          {[
            { id: 'reservations', label: `Table Reservations (${reservations.length})`, icon: Calendar },
            { id: 'messages', label: `Contact Inquiries (${messages.length})`, icon: MessageSquare },
            { id: 'menu', label: `Menu Repertoire (${menuItems.length})`, icon: Wine },
            { id: 'events', label: `Live Events (${events.length})`, icon: Music },
            { id: 'offers', label: `Offers & News (${offers.length})`, icon: Tag },
            { id: 'gallery', label: `Gallery (${galleryItems.length})`, icon: Camera },
            { id: 'subscribers', label: `Subscribers (${subscribers.length})`, icon: Mail },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-terracotta-500 text-stone-50 font-semibold shadow-md'
                    : 'bg-charcoal-900 border border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: RESERVATIONS */}
        {activeTab === 'reservations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative w-full max-w-sm">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search guest name, ref #, phone..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-charcoal-900 border border-stone-700 rounded-xl pl-9 pr-4 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-terracotta-500 font-sans"
                />
              </div>
            </div>

            <div className="bg-charcoal-900 border border-stone-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-charcoal-850 text-stone-400 uppercase tracking-wider text-[10px] border-b border-stone-800">
                    <tr>
                      <th className="py-3.5 px-4">Booking Ref</th>
                      <th className="py-3.5 px-4">Guest Info</th>
                      <th className="py-3.5 px-4">Date & Time</th>
                      <th className="py-3.5 px-4">Party & Deck</th>
                      <th className="py-3.5 px-4">Occasion & Requests</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 text-stone-300">
                    {filteredReservations.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center py-8 text-stone-500">
                          No reservations match search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredReservations.map((r) => (
                        <tr key={r._id || r.bookingReference} className="hover:bg-charcoal-850/50 transition-colors">
                          <td className="py-4 px-4 font-mono font-semibold text-terracotta-400">
                            {r.bookingReference}
                          </td>
                          <td className="py-4 px-4">
                            <strong className="text-stone-100 block">{r.name || r.guestName}</strong>
                            <span className="text-stone-400 text-[11px] block">{r.phone}</span>
                            <span className="text-stone-500 text-[10px] block">{r.email}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-stone-200 block">{r.date}</span>
                            <span className="text-olive-400 font-medium">{r.time || r.timeSlot}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-stone-100 font-semibold">{r.guests || r.partySize} Guests</span>
                            <span className="text-stone-400 text-[10px] uppercase block">{r.deckZone}</span>
                          </td>
                          <td className="py-4 px-4 max-w-xs">
                            <span className="capitalize text-terracotta-300 text-[11px] font-medium block">{r.occasion}</span>
                            <span className="text-stone-400 text-[11px] line-clamp-1 italic">{r.specialRequest || r.specialRequests || 'None'}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                              r.status === 'confirmed'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : r.status === 'seated'
                                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                                : r.status === 'cancelled'
                                ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                : 'bg-stone-800 text-stone-300'
                            }`}>
                              {r.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {r.status !== 'seated' && (
                                <button
                                  onClick={() => handleUpdateReservationStatus(r._id || r.bookingReference, 'seated')}
                                  className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-emerald-950/60 text-emerald-400 hover:border-emerald-500/40 border border-stone-700"
                                  title="Mark Seated"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                              {r.status !== 'cancelled' && (
                                <button
                                  onClick={() => handleUpdateReservationStatus(r._id || r.bookingReference, 'cancelled')}
                                  className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-red-950/60 text-red-400 hover:border-red-500/40 border border-stone-700"
                                  title="Cancel Booking"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CONTACT MESSAGES */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            <div className="bg-charcoal-900 border border-stone-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-charcoal-850 text-stone-400 uppercase tracking-wider text-[10px] border-b border-stone-800">
                    <tr>
                      <th className="py-3.5 px-4">From</th>
                      <th className="py-3.5 px-4">Phone / Email</th>
                      <th className="py-3.5 px-4">Message Content</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 text-stone-300">
                    {messages.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-8 text-stone-500">
                          No concierge messages received yet.
                        </td>
                      </tr>
                    ) : (
                      messages.map((m) => (
                        <tr key={m._id} className="hover:bg-charcoal-850/50 transition-colors">
                          <td className="py-4 px-4 font-semibold text-stone-100">
                            {m.name}
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-terracotta-400 block">{m.phone}</span>
                            <span className="text-stone-500 text-[10px]">{m.email}</span>
                          </td>
                          <td className="py-4 px-4 max-w-md">
                            <p className="text-stone-300 text-xs leading-relaxed">{m.message}</p>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                              m.status === 'unread' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                            }`}>
                              {m.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right space-x-2">
                            {m.status === 'unread' && (
                              <button
                                onClick={() => handleUpdateMessageStatus(m._id, 'read')}
                                className="px-2.5 py-1 rounded bg-charcoal-800 hover:bg-charcoal-700 text-stone-200 border border-stone-700 text-[10px]"
                              >
                                Mark Read
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteMessage(m._id)}
                              className="p-1.5 rounded bg-charcoal-800 hover:bg-red-950 text-red-400 border border-stone-700"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MENU ITEMS */}
        {activeTab === 'menu' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.map((item) => (
                <div key={item._id} className="bg-charcoal-900 border border-stone-800 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] uppercase font-bold text-terracotta-400 bg-terracotta-500/10 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <span className="font-serif text-sm font-semibold text-stone-200">
                        ₹{item.price}
                      </span>
                    </div>
                    <h4 className="font-serif text-base text-stone-100 truncate mt-1">{item.name}</h4>
                    <p className="text-stone-400 text-xs line-clamp-1">{item.description}</p>
                  </div>
                  <button
                    onClick={() => handleToggleMenuAvailability(item._id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold shrink-0 transition-all ${
                      item.available
                        ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                        : 'bg-red-950/60 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {item.available ? 'In Stock' : 'Sold Out'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: LIVE EVENTS */}
        {activeTab === 'events' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((evt) => (
                <div key={evt._id} className="bg-charcoal-900 border border-stone-800 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-terracotta-400 text-xs font-bold uppercase">{evt.date} • {evt.timing}</span>
                    <span className="text-stone-400 text-xs">{evt.rsvpCount || 0} RSVPs</span>
                  </div>
                  <h3 className="font-serif text-xl text-stone-100">{evt.title}</h3>
                  <p className="text-stone-400 text-xs">{evt.description}</p>
                  <div className="text-[11px] text-stone-300 font-sans">
                    Artist: <strong className="text-stone-100">{evt.artist}</strong> | Deck: <strong className="text-stone-100">{evt.deck}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: OFFERS & NEWS */}
        {activeTab === 'offers' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <div key={offer._id} className="bg-charcoal-900 border border-stone-800 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-terracotta-400 text-xs font-bold uppercase">{offer.badge}</span>
                    <span className="text-emerald-400 text-xs font-semibold">Active</span>
                  </div>
                  <h3 className="font-serif text-lg text-stone-100">{offer.title}</h3>
                  <p className="text-stone-400 text-xs leading-relaxed">{offer.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: GALLERY */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {galleryItems.map((g) => (
              <div key={g._id} className="bg-charcoal-900 border border-stone-800 rounded-xl overflow-hidden group relative">
                <img src={g.image || g.url} alt={g.title} className="w-full h-36 object-cover" />
                <div className="p-3">
                  <span className="text-[9px] uppercase font-bold text-terracotta-400 block">{g.category}</span>
                  <p className="text-stone-200 text-xs truncate mt-0.5">{g.title || g.caption}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 7: SUBSCRIBERS */}
        {activeTab === 'subscribers' && (
          <div className="bg-charcoal-900 border border-stone-800 rounded-2xl p-6">
            <h3 className="font-serif text-lg text-stone-100 mb-4">Insider Society Mailing List ({subscribers.length})</h3>
            <div className="divide-y divide-stone-800">
              {subscribers.map((sub, i) => (
                <div key={sub._id || i} className="py-3 flex items-center justify-between text-xs">
                  <span className="text-stone-100 font-mono">{sub.email}</span>
                  <span className="text-stone-500 text-[11px]">{new Date(sub.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboardPage;
