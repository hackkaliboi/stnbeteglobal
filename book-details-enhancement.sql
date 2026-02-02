-- Enhancement for Book Details Page
-- Add additional columns to books table for richer book information

-- Add new columns to books table
ALTER TABLE public.books 
ADD COLUMN IF NOT EXISTS isbn TEXT,
ADD COLUMN IF NOT EXISTS pages INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS publisher TEXT DEFAULT 'stnbeteglobal',
ADD COLUMN IF NOT EXISTS publication_year INTEGER,
ADD COLUMN IF NOT EXISTS format TEXT DEFAULT 'Paperback',
ADD COLUMN IF NOT EXISTS dimensions TEXT DEFAULT '6 x 9 inches',
ADD COLUMN IF NOT EXISTS weight TEXT DEFAULT '1.2 lbs',
ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'English',
ADD COLUMN IF NOT EXISTS edition TEXT DEFAULT '1st Edition',
ADD COLUMN IF NOT EXISTS rating DECIMAL(2,1) DEFAULT 4.2,
ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0;

-- Update existing books with sample data
UPDATE public.books SET 
  isbn = '978-' || LPAD((RANDOM() * 9999999999)::bigint::text, 10, '0'),
  pages = 250 + (RANDOM() * 300)::integer,
  publication_year = 2020 + (RANDOM() * 4)::integer,
  rating = 3.5 + (RANDOM() * 1.5),
  review_count = 50 + (RANDOM() * 200)::integer
WHERE isbn IS NULL;

-- Update specific books with more realistic data
UPDATE public.books SET 
  pages = 324,
  publication_year = 2024,
  isbn = '978-0123456789',
  rating = 4.2,
  review_count = 127
WHERE title = 'The Art of Creative Writing';

UPDATE public.books SET 
  pages = 298,
  publication_year = 2023,
  isbn = '978-0987654321',
  rating = 4.5,
  review_count = 89
WHERE title = 'Journey Through Time';

UPDATE public.books SET 
  pages = 276,
  publication_year = 2024,
  isbn = '978-0456789123',
  rating = 4.3,
  review_count = 156
WHERE title = 'Mindful Living';