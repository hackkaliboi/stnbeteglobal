-- Add Selar URL column to books table
ALTER TABLE public.books 
ADD COLUMN IF NOT EXISTS selar_url TEXT;

-- Update existing books with sample Selar URLs
-- Replace these with your actual Selar product URLs
UPDATE public.books SET selar_url = 'https://selar.co/your-store/the-art-of-creative-writing' WHERE title = 'The Art of Creative Writing';
UPDATE public.books SET selar_url = 'https://selar.co/your-store/journey-through-time' WHERE title = 'Journey Through Time';
UPDATE public.books SET selar_url = 'https://selar.co/your-store/mindful-living' WHERE title = 'Mindful Living';
UPDATE public.books SET selar_url = 'https://selar.co/your-store/the-silent-observer' WHERE title = 'The Silent Observer';
UPDATE public.books SET selar_url = 'https://selar.co/your-store/oceans-whisper' WHERE title = 'Ocean''s Whisper';
UPDATE public.books SET selar_url = 'https://selar.co/your-store/the-entrepreneurs-guide' WHERE title = 'The Entrepreneur''s Guide';
UPDATE public.books SET selar_url = 'https://selar.co/your-store/stars-beyond' WHERE title = 'Stars Beyond';
UPDATE public.books SET selar_url = 'https://selar.co/your-store/cooking-with-love' WHERE title = 'Cooking with Love';

-- For books without specific Selar URLs, set a default store URL
UPDATE public.books 
SET selar_url = 'https://selar.co/your-store' 
WHERE selar_url IS NULL;