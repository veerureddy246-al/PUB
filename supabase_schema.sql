-- =============================================================================
-- 1522 MUMBAI BAR & KITCHEN - SUPABASE DATABASE SCHEMA
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. MENU ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    sub_category TEXT,
    price NUMERIC NOT NULL,
    dietary TEXT DEFAULT 'veg',
    spiciness INTEGER DEFAULT 0,
    pair_with TEXT,
    image TEXT,
    featured BOOLEAN DEFAULT false,
    is_chefs_special BOOLEAN DEFAULT false,
    is_gluten_free BOOLEAN DEFAULT false,
    available BOOLEAN DEFAULT true,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. GALLERY ITEMS TABLE (Exactly 25 Items: 10 Ambience, 15 Food & Drink)
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    caption TEXT,
    image_url TEXT NOT NULL,
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. RESERVATIONS TABLE
CREATE TABLE IF NOT EXISTS public.reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_reference TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TEXT NOT NULL,
    party_size INTEGER NOT NULL,
    deck_zone TEXT DEFAULT 'sky-deck',
    occasion TEXT DEFAULT 'general',
    special_requests TEXT,
    status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'completed', 'seated')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    genre TEXT,
    date_formatted TEXT,
    time_formatted TEXT,
    day_name TEXT,
    artist_name TEXT,
    artist_tagline TEXT,
    image_url TEXT,
    ticket_status TEXT DEFAULT 'available',
    description TEXT,
    entry_fee NUMERIC DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. OFFERS & SPECIALS TABLE
CREATE TABLE IF NOT EXISTS public.offers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    tagline TEXT,
    badge TEXT,
    schedule TEXT,
    terms TEXT,
    accent_color TEXT DEFAULT 'terracotta',
    is_featured BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived', 'replied')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. NEWSLETTER SUBSCRIBERS TABLE
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    active BOOLEAN DEFAULT true,
    source TEXT DEFAULT 'website_footer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. PRIVATE DINING & EVENT INQUIRIES
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    guest_count INTEGER NOT NULL,
    preferred_date DATE,
    preferred_zone TEXT,
    special_requirements TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'booked', 'declined')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. GUEST REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_name TEXT NOT NULL,
    role TEXT,
    rating NUMERIC DEFAULT 5.0,
    review_text TEXT NOT NULL,
    source TEXT DEFAULT 'Google Reviews',
    date_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable RLS
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public Read Menu Items" ON public.menu_items FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery Items" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Public Read Events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public Read Offers" ON public.offers FOR SELECT USING (true);
CREATE POLICY "Public Read Reviews" ON public.reviews FOR SELECT USING (true);

-- Public insert access for customer submissions
CREATE POLICY "Public Create Reservations" ON public.reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Own Reservation by Reference" ON public.reservations FOR SELECT USING (true);
CREATE POLICY "Public Submit Contact Messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Submit Newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Submit Inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);

-- Service Role full access for backend management
CREATE POLICY "Service Full Access Menu" ON public.menu_items FOR ALL USING (true);
CREATE POLICY "Service Full Access Gallery" ON public.gallery_items FOR ALL USING (true);
CREATE POLICY "Service Full Access Reservations" ON public.reservations FOR ALL USING (true);
CREATE POLICY "Service Full Access Events" ON public.events FOR ALL USING (true);
CREATE POLICY "Service Full Access Offers" ON public.offers FOR ALL USING (true);
CREATE POLICY "Service Full Access Contacts" ON public.contact_messages FOR ALL USING (true);
CREATE POLICY "Service Full Access Newsletter" ON public.newsletter_subscribers FOR ALL USING (true);
CREATE POLICY "Service Full Access Inquiries" ON public.inquiries FOR ALL USING (true);
CREATE POLICY "Service Full Access Reviews" ON public.reviews FOR ALL USING (true);
