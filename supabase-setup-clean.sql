-- Supabase Database Setup Script (Clean Version)
-- Run this in your Supabase SQL Editor

-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create books table
CREATE TABLE IF NOT EXISTS public.books (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    cover_image TEXT,
    category TEXT NOT NULL,
    description TEXT,
    is_new BOOLEAN DEFAULT false,
    is_bestseller BOOLEAN DEFAULT false,
    in_stock BOOLEAN DEFAULT true,
    selar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    image TEXT,
    category TEXT NOT NULL,
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    read_time TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    total_amount DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    shipping_address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    book_id UUID REFERENCES public.books(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users only" ON public.users
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policies for books table (public read, admin write)
CREATE POLICY "Anyone can view books" ON public.books
    FOR SELECT USING (true);

CREATE POLICY "Only admins can insert books" ON public.books
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Only admins can update books" ON public.books
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Only admins can delete books" ON public.books
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create policies for blog_posts table (public read, admin write)
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts
    FOR SELECT USING (published = true);

CREATE POLICY "Admins can view all blog posts" ON public.blog_posts
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Only admins can insert blog posts" ON public.blog_posts
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Only admins can update blog posts" ON public.blog_posts
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Only admins can delete blog posts" ON public.blog_posts
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create policies for orders table
CREATE POLICY "Users can view their own orders" ON public.orders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON public.orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders" ON public.orders
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update all orders" ON public.orders
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create policies for order_items table
CREATE POLICY "Users can view their own order items" ON public.order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.orders 
            WHERE id = order_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create order items for their orders" ON public.order_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.orders 
            WHERE id = order_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can view all order items" ON public.order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON public.books
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO public.books (title, author, price, cover_image, category, description, is_new, is_bestseller, in_stock, selar_url) VALUES
('The Art of Creative Writing', 'Sarah Mitchell', 24.99, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop', 'Writing', 'A comprehensive guide to unleashing your creative potential through the written word.', true, false, true, 'https://selar.co/stnbeteglobal/the-art-of-creative-writing'),
('Journey Through Time', 'Michael Chen', 19.99, 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop', 'Fiction', 'An epic tale spanning centuries, following the interconnected lives of extraordinary individuals.', false, true, true, 'https://selar.co/stnbeteglobal/journey-through-time'),
('Mindful Living', 'Emma Thompson', 16.99, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop', 'Self-Help', 'Discover the power of mindfulness and transform your daily life with practical techniques.', true, true, true, 'https://selar.co/stnbeteglobal/mindful-living'),
('The Silent Observer', 'James Wilson', 21.99, 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop', 'Mystery', 'A gripping psychological thriller that will keep you guessing until the very last page.', false, false, true, 'https://selar.co/stnbeteglobal/the-silent-observer'),
('Ocean''s Whisper', 'Lisa Park', 18.99, 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop', 'Romance', 'A heartwarming love story set against the backdrop of a coastal town''s changing seasons.', true, false, true, 'https://selar.co/stnbeteglobal/oceans-whisper'),
('The Entrepreneur''s Guide', 'Robert Blake', 29.99, 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop', 'Business', 'Essential strategies and insights for building a successful business in the modern world.', false, true, false, 'https://selar.co/stnbeteglobal/the-entrepreneurs-guide'),
('Stars Beyond', 'Maria Santos', 22.99, 'https://images.unsplash.com/photo-1518744386442-2d48ac47a0e0?w=400&h=600&fit=crop', 'Science Fiction', 'A thrilling space odyssey exploring humanity''s place in the vast cosmos.', true, false, true, 'https://selar.co/stnbeteglobal/stars-beyond'),
('Cooking with Love', 'Chef Antonio', 34.99, 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop', 'Cooking', 'Authentic recipes and culinary wisdom passed down through generations.', false, true, true, 'https://selar.co/stnbeteglobal/cooking-with-love');

INSERT INTO public.blog_posts (title, excerpt, content, author, image, category, featured, read_time) VALUES
('The Rise of Independent Authors in 2024', 'Self-publishing has revolutionized the literary world, giving voice to countless talented writers who might otherwise never have been heard.', 'Self-publishing has revolutionized the literary world, giving voice to countless talented writers who might otherwise never have been heard. In 2024, we''re seeing unprecedented growth in independent publishing, with authors taking control of their creative destiny and building direct relationships with their readers.

The traditional publishing model, while still relevant, is no longer the only path to literary success. Independent authors are leveraging digital platforms, social media, and innovative marketing strategies to reach global audiences. This shift has democratized publishing, allowing diverse voices and unique stories to flourish.

Key trends we''re observing include the rise of serialized fiction, interactive storytelling, and genre-blending narratives that challenge conventional literary boundaries. Authors are also embracing multimedia approaches, incorporating audio, visual, and interactive elements into their work.

The success of independent authors is reshaping the entire industry, forcing traditional publishers to adapt and innovate. This evolution benefits readers by providing more diverse content and giving them direct access to their favorite authors.', 'stnbeteglobal Team', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=500&fit=crop', 'Industry News', true, '5 min read'),
('10 Must-Read Books for Personal Growth', 'Transform your mindset with these powerful reads that have helped millions achieve their potential.', 'Personal growth is a lifelong journey, and books can be powerful catalysts for transformation. Here are ten essential reads that have helped millions of people unlock their potential and create meaningful change in their lives.

1. "Atomic Habits" by James Clear - Learn how small changes can make a big difference
2. "Mindset" by Carol Dweck - Discover the power of believing you can improve
3. "The 7 Habits of Highly Effective People" by Stephen Covey - Timeless principles for personal effectiveness
4. "Daring Greatly" by Brené Brown - Embrace vulnerability as a source of strength
5. "The Power of Now" by Eckhart Tolle - Find peace in the present moment

Each of these books offers unique insights and practical strategies for personal development. Whether you''re looking to build better habits, develop resilience, or find your purpose, these authors provide roadmaps for transformation.

The key to getting the most from these books is not just reading them, but implementing their teachings in your daily life. Start with one book, apply its principles consistently, and then move on to the next.', 'Emma Richardson', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=500&fit=crop', 'Book Lists', false, '8 min read'),
('How to Build a Daily Reading Habit', 'Struggling to find time to read? Here are proven strategies to make reading a consistent part of your routine.', 'Building a daily reading habit can transform your life, but many people struggle to find the time or maintain consistency. Here are proven strategies to make reading a natural part of your daily routine.

Start Small: Begin with just 10-15 minutes per day. This feels manageable and helps build the habit without overwhelming your schedule.

Choose the Right Time: Identify when you''re most alert and have fewer distractions. Many successful readers prefer early morning or before bed.

Create a Reading Environment: Designate a comfortable, well-lit space specifically for reading. Having a dedicated spot signals to your brain that it''s time to focus.

Always Have a Book Ready: Keep books in multiple locations - your bag, car, bedside table. This ensures you can read whenever you have a few spare minutes.

Use the "One Page Rule": On busy days, commit to reading just one page. Often, you''ll find yourself reading more, but even one page maintains the habit.

Track Your Progress: Use a reading journal or app to log your daily reading time. Seeing your streak grow becomes motivating.

Join a Reading Community: Connect with other readers through book clubs, online forums, or social media groups. Accountability and discussion enhance the experience.

Remember, the goal is consistency, not speed. Focus on building the habit first, and your reading volume will naturally increase over time.', 'Michael Torres', 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=500&fit=crop', 'Tips & Advice', false, '4 min read'),
('Interview with Bestselling Author Sarah Mitchell', 'We sat down with the acclaimed author to discuss her creative process, inspirations, and upcoming projects.', 'We recently had the pleasure of sitting down with bestselling author Sarah Mitchell to discuss her creative journey, writing process, and what''s next for this talented storyteller.

Q: What inspired you to start writing?

Sarah: "I''ve always been fascinated by the power of stories to connect people across different backgrounds and experiences. Growing up, books were my escape and my teachers. I wanted to create that same sense of wonder and connection for others."

Q: Can you tell us about your writing process?

Sarah: "I''m definitely a planner. I spend weeks outlining before I write the first sentence. I create detailed character profiles and plot timelines. But I also leave room for surprises - some of my best scenes have come from unexpected moments during the writing process."

Q: What advice would you give to aspiring writers?

Sarah: "Read voraciously and write consistently. Don''t wait for inspiration - treat writing like any other skill that requires practice. And don''t be afraid to share your work. Feedback, even criticism, is invaluable for growth."

Q: What can readers expect from your upcoming novel?

Sarah: "Without giving too much away, it''s a departure from my usual contemporary fiction. I''m exploring historical fiction for the first time, set in 1920s Paris. It''s been an incredible research journey, and I''m excited to share this new world with my readers."

Sarah''s dedication to her craft and her readers is evident in every conversation. We can''t wait to see what she creates next.', 'stnbeteglobal Team', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=500&fit=crop', 'Author Interviews', false, '10 min read');