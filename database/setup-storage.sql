-- ============================================
-- Storage Policies for book-covers Bucket
-- ============================================
-- IMPORTANT: You must create the 'book-covers' bucket first via the Dashboard!
-- Go to: Supabase Dashboard → Storage → New bucket → Name: "book-covers" → Check "Public bucket"
-- 
-- After creating the bucket, run this script to set up access policies.

-- ============================================
-- 1. Allow public read access to book covers
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('book-covers', 'book-covers', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- ============================================
-- 2. Storage Object Policies
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;

-- Allow anyone to read book covers (public access)
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'book-covers');

-- Allow authenticated users to upload book covers
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'book-covers');

-- Allow authenticated users to update book covers
CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'book-covers');

-- Allow authenticated users to delete book covers
CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'book-covers');

-- ============================================
-- VERIFICATION
-- ============================================
-- Check if bucket exists
SELECT id, name, public FROM storage.buckets WHERE id = 'book-covers';

-- Check policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename = 'objects' AND schemaname = 'storage';
