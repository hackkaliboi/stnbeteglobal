-- ============================================
-- Debug Admin Role Issue
-- ============================================
-- Run these queries in Supabase SQL Editor to debug

-- 1. Check current user's role
-- Replace 'your-email@example.com' with your actual email
SELECT id, email, role, created_at 
FROM auth.users 
JOIN public.users ON auth.users.id = public.users.id
WHERE auth.users.email = 'your-email@example.com';

-- 2. View all users and their roles
SELECT id, email, role 
FROM public.users 
ORDER BY created_at DESC;

-- 3. Check RLS policies on users table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'users';

-- 4. Manually set a user to admin (if needed)
-- Replace 'user-uuid-here' with the actual user ID from query #1
UPDATE public.users 
SET role = 'admin' 
WHERE id = 'user-uuid-here';

-- 5. Verify the update worked
SELECT id, email, role 
FROM public.users 
WHERE role = 'admin';
