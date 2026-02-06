# Database Setup Guide - The Complete Script

We have consolidated everything into a single, master script that sets up your entire application backend.

## Step 1: Run the Master Script

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste the **entire contents** of `database/setup.sql`
6. Click **Run**

**Note:** If you see errors about tables already existing, you can uncomment the "DROP TABLE" lines at the very top of `setup.sql` to wipe everything and start fresh.

## Step 2: Create Storage Buckets

Search for "Storage" in the sidebar and make sure you have these two buckets:

1. **book-covers** (Public)
   - Used for book cover mockups
   - Access: Public Read, Authenticated Upload/Delete

2. **blog-images** (Public)
   - Used for blog post covers and content images
   - Access: Public Read, Authenticated Upload/Delete

## Step 3: Storage Policies

Since we can't fully script storage policies via SQL easily in the editor sometimes, double-check them manually:

1. Go to **Storage > Policies**
2. Ensure both buckets have:
   - SELECT: Allow public read access (`true`)
   - INSERT/UPDATE/DELETE: Allow authenticated users (`true`)

## What this sets up:

- **Books:** Title, Author, Cover, Link (Simplified)
- **Blog:** Full blogging system with categories and publishing
- **Pages:** CMS for creating/editing pages like About, Contact
- **Settings:** Global site settings (Site Name, SEO, Email)
- **Newsletter:** Subscriber management
- **Users:** Public profiles linked to Auth

## Next Steps

1. Your database is ready!
2. You can now use the Admin Dashboard to:
   - Add books
   - Write blog posts
   - Edit site settings
   - Manage pages
