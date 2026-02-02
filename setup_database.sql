-- Complete Database Setup for Authors Haven (Merged & Updated)
-- Run this in your Supabase SQL Editor to set up the entire database.

-- ==========================================
-- 1. TABLES SETUP
-- ==========================================

-- 1.1 Users Table (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 1.2 Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL CHECK (type IN ('book', 'blog')),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 1.3 Books Table
CREATE TABLE IF NOT EXISTS public.books (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    cover_image TEXT,
    category TEXT NOT NULL, -- Legacy text field, can be migrated to foreign key later
    description TEXT,
    is_new BOOLEAN DEFAULT false,
    is_bestseller BOOLEAN DEFAULT false,
    in_stock BOOLEAN DEFAULT true,
    selar_url TEXT,
    isbn TEXT,
    pages INTEGER DEFAULT 0,
    publisher TEXT DEFAULT 'stnbeteglobal',
    publication_year INTEGER,
    format TEXT DEFAULT 'Paperback',
    dimensions TEXT DEFAULT '6 x 9 inches',
    weight TEXT DEFAULT '1.2 lbs',
    language TEXT DEFAULT 'English',
    edition TEXT DEFAULT '1st Edition',
    rating DECIMAL(2,1) DEFAULT 4.2,
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 1.4 Blog Posts Table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    image TEXT,
    category TEXT NOT NULL, -- Legacy text field
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    read_time TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 1.5 Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    type TEXT NOT NULL DEFAULT 'text', -- text, json, boolean, image
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 1.6 Pages Table
CREATE TABLE IF NOT EXISTS public.pages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    meta_description TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 1.7 Page Sections Table
CREATE TABLE IF NOT EXISTS public.page_sections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE,
    section_key TEXT NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(page_id, section_key)
);

-- 1.8 Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- ==========================================
-- 2. ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to ensure clean state
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.users;
DROP POLICY IF EXISTS "Anyone can view books" ON public.books;
DROP POLICY IF EXISTS "Only admins can insert books" ON public.books;
DROP POLICY IF EXISTS "Only admins can update books" ON public.books;
DROP POLICY IF EXISTS "Only admins can delete books" ON public.books;
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can view all blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Only admins can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Only admins can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Only admins can delete blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can view all subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can view categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;
DROP POLICY IF EXISTS "Anyone can view site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can manage site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Anyone can view published pages" ON public.pages;
DROP POLICY IF EXISTS "Admins can manage pages" ON public.pages;
DROP POLICY IF EXISTS "Anyone can view page_sections" ON public.page_sections;
DROP POLICY IF EXISTS "Admins can manage page_sections" ON public.page_sections;

-- 2.1 Users Policies
CREATE POLICY "Users can view their own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Enable insert for authenticated users only" ON public.users FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 2.2 Books Policies
CREATE POLICY "Anyone can view books" ON public.books FOR SELECT USING (true);
CREATE POLICY "Only admins can insert books" ON public.books FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Only admins can update books" ON public.books FOR UPDATE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Only admins can delete books" ON public.books FOR DELETE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- 2.3 Blog Posts Policies
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Admins can view all blog posts" ON public.blog_posts FOR SELECT USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Only admins can insert blog posts" ON public.blog_posts FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Only admins can update blog posts" ON public.blog_posts FOR UPDATE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Only admins can delete blog posts" ON public.blog_posts FOR DELETE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- 2.4 Newsletter Policies
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all subscribers" ON public.newsletter_subscribers FOR SELECT USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- 2.5 Categories Policies
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage categories" ON public.categories USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- 2.6 Site Settings Policies
CREATE POLICY "Anyone can view site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage site_settings" ON public.site_settings USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- 2.7 Pages Policies
CREATE POLICY "Anyone can view published pages" ON public.pages FOR SELECT USING (is_published = true);
-- Allow admins to see all pages regardless of publication status (this fixes the issue where admins couldn't edit drafts)
CREATE POLICY "Admins can view all pages" ON public.pages FOR SELECT USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can manage pages" ON public.pages USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- 2.8 Page Sections Policies
CREATE POLICY "Anyone can view page_sections" ON public.page_sections FOR SELECT USING (true);
CREATE POLICY "Admins can manage page_sections" ON public.page_sections USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- ==========================================
-- 3. TRIGGERS
-- ==========================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
DROP TRIGGER IF EXISTS update_books_updated_at ON public.books;
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON public.blog_posts;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON public.books FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ==========================================
-- 4. INSERT DEFAULT DATA
-- ==========================================

-- 4.1 Default Site Settings
INSERT INTO public.site_settings (key, value, type, description) VALUES
('site_name', '"stnbeteglobal"', 'text', 'The name of the website'),
('site_description', '"Curated books for curious minds. Explore our collection of bestsellers, new releases, and timeless classics."', 'text', 'Default meta description'),
('contact_email', '"hello@stnbeteglobal.com"', 'text', 'Contact email address'),
('footer_text', '"© 2024 stnbeteglobal. All rights reserved."', 'text', 'Text displayed in the footer')
ON CONFLICT (key) DO NOTHING;

-- 4.2 Default Categories
INSERT INTO public.categories (name, slug, type, description) VALUES
('Fiction', 'fiction', 'book', 'Narrative literature created from imagination'),
('Non-Fiction', 'non-fiction', 'book', 'Informative literature based on facts'),
('Business', 'business', 'book', 'Books about commerce, finance, and management'),
('Self-Help', 'self-help', 'book', 'Books for personal improvement'),
('Writing', 'writing', 'blog', 'Tips and guides for writers'),
('Industry News', 'industry-news', 'blog', 'Latest updates from the publishing world')
ON CONFLICT (slug) DO NOTHING;

-- 4.3 Default Pages
DO $$
DECLARE
    home_page_id UUID;
    about_page_id UUID;
    books_page_id UUID;
    blog_page_id UUID;
    contact_page_id UUID;
BEGIN
    -- Home Page
    INSERT INTO public.pages (slug, title, meta_description)
    VALUES ('/', 'Home', 'Welcome to stnbeteglobal - Your Premier Online Bookstore')
    ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title
    RETURNING id INTO home_page_id;

    -- Home Hero Section
    INSERT INTO public.page_sections (page_id, section_key, content)
    VALUES (home_page_id, 'hero', '{
        "title": "Discover Your Next Favorite Book",
        "subtitle": "Explore our curated collection of bestsellers, new releases, and timeless classics.",
        "cta_text": "Shop Now",
        "cta_link": "/books",
        "image_url": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&h=600&fit=crop"
    }')
    ON CONFLICT (page_id, section_key) DO NOTHING;

    -- About Page
    INSERT INTO public.pages (slug, title, meta_description)
    VALUES ('/about', 'About Us', 'Learn more about stnbeteglobal and our mission')
    ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title
    RETURNING id INTO about_page_id;

    INSERT INTO public.page_sections (page_id, section_key, content)
    VALUES (about_page_id, 'main_content', '{
        "title": "Our Story",
        "content": "stnbeteglobal was founded with a simple mission: to make great literature accessible to everyone.",
        "image_url": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop"
    }')
    ON CONFLICT (page_id, section_key) DO NOTHING;

    -- Books Page
    INSERT INTO public.pages (slug, title, meta_description)
    VALUES ('/books', 'Books', 'Browse our extensive collection of books')
    ON CONFLICT (slug) DO NOTHING;

    -- Blog Page
    INSERT INTO public.pages (slug, title, meta_description)
    VALUES ('/blog', 'Blog', 'Read the latest news and author interviews')
    ON CONFLICT (slug) DO NOTHING;

    -- Contact Page
    INSERT INTO public.pages (slug, title, meta_description)
    VALUES ('/contact', 'Contact Us', 'Get in touch with our team')
    ON CONFLICT (slug) DO NOTHING;

END $$;

SELECT 'Database setup completed successfully! All tables, policies, and expanded page data have been created.' as message;
