-- ============================================
-- Author's Haven - Master Database Setup
-- ============================================
-- Run this entire script in Supabase SQL Editor
-- It handles everything: Books, Blog, Pages, Settings, Users

-- ============================================
-- 1. CLEANUP (Optional - be careful!)
-- ============================================
-- DROP TABLE IF EXISTS books CASCADE;
-- DROP TABLE IF EXISTS posts CASCADE;
-- DROP TABLE IF EXISTS newsletter_subscribers CASCADE;
-- DROP TABLE IF EXISTS site_settings CASCADE;
-- DROP TABLE IF EXISTS pages CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;

-- ============================================
-- 2. USERS & PROFILES
-- ============================================
-- We use a public users table that syncs with auth.users
CREATE TABLE IF NOT EXISTS users (
    id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'user', -- 'user' or 'admin'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Trigger to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name, avatar_url, role)
    VALUES (
        new.id, 
        new.email, 
        new.raw_user_meta_data->>'full_name', 
        new.raw_user_meta_data->>'avatar_url',
        COALESCE(new.raw_user_meta_data->>'role', 'user')
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists to avoid duplication errors on re-run
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 3. BOOKS (Simplified Schema)
-- ============================================
CREATE TABLE IF NOT EXISTS books (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    cover_image TEXT, -- URL to Supabase Storage
    selar_url TEXT NOT NULL, -- Direct buy link
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- 4. BLOG POSTS
-- ============================================
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT, -- HTML content
    excerpt TEXT,
    cover_image TEXT,
    author TEXT,
    category TEXT DEFAULT 'General',
    published BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- 5. SITE PAGES (CMS)
-- ============================================
CREATE TABLE IF NOT EXISTS pages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT, -- HTML or JSON content
    meta_description TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- 6. NEWSLETTER SUBSCRIBERS
-- ============================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- 7. SITE SETTINGS
-- ============================================
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT, -- We'll store values as strings (stringify JSON if needed)
    type TEXT DEFAULT 'text', -- 'text', 'json', 'boolean', 'image'
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Seed initial settings if they don't exist
INSERT INTO site_settings (key, value, type) VALUES
('site_name', 'Author''s Haven', 'text'),
('site_description', 'Your premium destination for books.', 'text'),
('contact_email', 'contact@example.com', 'text'),
('maintenance_mode', 'false', 'boolean')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- 8. SECURITY (RLS POLICIES)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- BOOKS Policies
CREATE POLICY "Public read books" ON books FOR SELECT USING (true);
CREATE POLICY "Admin insert books" ON books FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update books" ON books FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete books" ON books FOR DELETE TO authenticated USING (true);

-- POSTS Policies
CREATE POLICY "Public read published posts" ON posts FOR SELECT USING (published = true);
CREATE POLICY "Admin read all posts" ON posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin modify posts" ON posts FOR ALL TO authenticated USING (true);

-- PAGES Policies
CREATE POLICY "Public read pages" ON pages FOR SELECT USING (is_published = true);
CREATE POLICY "Admin read all pages" ON pages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin modify pages" ON pages FOR ALL TO authenticated USING (true);

-- SETTINGS Policies
CREATE POLICY "Public read settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admin modify settings" ON site_settings FOR ALL TO authenticated USING (true);

-- NEWSLETTER Policies
-- Only needed if you have a public subscribe form (INSERT)
CREATE POLICY "Public subscribe" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin manage newsletter" ON newsletter_subscribers FOR ALL TO authenticated USING (true);

-- USERS Policies
CREATE POLICY "Users read own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admin read all users" ON users FOR SELECT TO authenticated USING (true); -- Ideally check for role='admin' but simpler for now

-- ============================================
-- 9. UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all relevant tables
DROP TRIGGER IF EXISTS update_books_updated_at ON books;
CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON books FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_pages_updated_at ON pages;
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_settings_updated_at ON site_settings;
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
