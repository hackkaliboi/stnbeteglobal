-- ============================================
-- Fix RLS Policies for Author's Haven
-- ============================================
-- Run this in Supabase SQL Editor to fix 406 errors

-- Drop all existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public read books" ON books;
DROP POLICY IF EXISTS "Admin insert books" ON books;
DROP POLICY IF EXISTS "Admin update books" ON books;
DROP POLICY IF EXISTS "Admin delete books" ON books;

DROP POLICY IF EXISTS "Public read published posts" ON posts;
DROP POLICY IF EXISTS "Admin read all posts" ON posts;
DROP POLICY IF EXISTS "Admin modify posts" ON posts;

DROP POLICY IF EXISTS "Public read pages" ON pages;
DROP POLICY IF EXISTS "Admin read all pages" ON pages;
DROP POLICY IF EXISTS "Admin modify pages" ON pages;

DROP POLICY IF EXISTS "Public read settings" ON site_settings;
DROP POLICY IF EXISTS "Admin modify settings" ON site_settings;

DROP POLICY IF EXISTS "Public subscribe" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Admin manage newsletter" ON newsletter_subscribers;

DROP POLICY IF EXISTS "Users read own data" ON users;
DROP POLICY IF EXISTS "Admin read all users" ON users;

-- Recreate policies with correct permissions

-- BOOKS Policies (Public can read all books)
CREATE POLICY "Public read books" ON books 
    FOR SELECT 
    USING (true);

CREATE POLICY "Admin insert books" ON books 
    FOR INSERT 
    TO authenticated 
    WITH CHECK (true);

CREATE POLICY "Admin update books" ON books 
    FOR UPDATE 
    TO authenticated 
    USING (true);

CREATE POLICY "Admin delete books" ON books 
    FOR DELETE 
    TO authenticated 
    USING (true);

-- PAGES Policies (Public can read published pages)
CREATE POLICY "Public read pages" ON pages 
    FOR SELECT 
    USING (is_published = true);

CREATE POLICY "Admin read all pages" ON pages 
    FOR SELECT 
    TO authenticated 
    USING (true);

CREATE POLICY "Admin modify pages" ON pages 
    FOR ALL 
    TO authenticated 
    USING (true);

-- SETTINGS Policies (Public can read all settings)
CREATE POLICY "Public read settings" ON site_settings 
    FOR SELECT 
    USING (true);

CREATE POLICY "Admin modify settings" ON site_settings 
    FOR ALL 
    TO authenticated 
    USING (true);

-- POSTS Policies (Public can read published posts)
CREATE POLICY "Public read published posts" ON posts 
    FOR SELECT 
    USING (published = true);

CREATE POLICY "Admin read all posts" ON posts 
    FOR SELECT 
    TO authenticated 
    USING (true);

CREATE POLICY "Admin modify posts" ON posts 
    FOR ALL 
    TO authenticated 
    USING (true);

-- NEWSLETTER Policies (Public can subscribe)
CREATE POLICY "Public subscribe" ON newsletter_subscribers 
    FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Admin manage newsletter" ON newsletter_subscribers 
    FOR ALL 
    TO authenticated 
    USING (true);

-- USERS Policies
CREATE POLICY "Users read own data" ON users 
    FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Admin read all users" ON users 
    FOR SELECT 
    TO authenticated 
    USING (true);
