import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import OurStoryPage from './pages/OurStoryPage';
import MenuPage from './pages/MenuPage';
import GalleryPage from './pages/GalleryPage';
import EventsPage from './pages/EventsPage';
import ContactPage from './pages/ContactPage';
import ReservationPage from './pages/ReservationPage';
import PrivateDiningPage from './pages/PrivateDiningPage';
import RooftopExperiencePage from './pages/RooftopExperiencePage';
import AdminDashboardPage from './pages/AdminDashboardPage';

// Modals & Contexts
import ReservationModal from './components/reservation/ReservationModal';
import OrderOnlineModal from './components/common/OrderOnlineModal';
import { NotificationProvider } from './context/NotificationContext';
import { ReservationProvider } from './context/ReservationContext';

function AppLayout() {
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-charcoal-950 text-stone-100 flex flex-col justify-between selection:bg-terracotta-500 selection:text-stone-50">
      {/* Scroll restoration to top (0,0) on every route navigation */}
      <ScrollToTop />

      {/* Shared Global Luxury Navbar */}
      <Navbar onOpenOrder={() => setOrderModalOpen(true)} />

      {/* Main Dedicated Page Route Outlets */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/our-story" element={<OurStoryPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/reserve" element={<Navigate to="/reservation" replace />} />
          <Route path="/private-dining" element={<PrivateDiningPage />} />
          <Route path="/experience" element={<RooftopExperiencePage />} />
          <Route path="/rooftop" element={<RooftopExperiencePage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Quick Reservation Modal */}
      <ReservationModal />

      {/* Global Order Online Modal */}
      <OrderOnlineModal 
        isOpen={orderModalOpen} 
        onClose={() => setOrderModalOpen(false)} 
      />

      {/* Shared Global Footer */}
      <Footer onOpenOrder={() => setOrderModalOpen(true)} />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <ReservationProvider>
          <AppLayout />
        </ReservationProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
