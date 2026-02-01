# Supabase Setup Instructions

## 1. Database Setup

1. Go to your Supabase project dashboard: https://pfdkrdavjsnbqpctyjhx.supabase.co
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-setup.sql` into the SQL Editor
4. Run the script to create all tables, policies, and sample data

## 2. Environment Variables

The `.env` file is already configured with your Supabase credentials:
```
VITE_SUPABASE_URL=https://pfdkrdavjsnbqpctyjhx.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_CKnfzakByoaWszLqVkSVKg_rU7RnBEN
```

## 3. Authentication Setup

1. In your Supabase dashboard, go to Authentication > Settings
2. Configure your site URL: `http://localhost:5173` (for development)
3. Add any additional redirect URLs as needed
4. Email templates can be customized in Authentication > Templates

## 4. Row Level Security (RLS)

The setup script automatically enables RLS and creates policies for:
- **Books**: Public read access, admin-only write access
- **Blog Posts**: Public read for published posts, admin-only write access
- **Users**: Users can view/edit their own profile
- **Orders**: Users can view their own orders, admins can view all

## 5. Admin User Setup

To create an admin user:
1. Sign up through the website
2. Go to Supabase dashboard > Authentication > Users
3. Find your user and edit the `raw_user_meta_data`
4. Add: `{"role": "admin"}` to the metadata
5. Or run this SQL query:
```sql
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb 
WHERE email = 'your-email@example.com';
```

## 6. Features Implemented

### Authentication
- ✅ User registration and login
- ✅ Email verification
- ✅ Password reset
- ✅ User profiles
- ✅ Role-based access (user/admin)

### Books Management
- ✅ Display books from Supabase
- ✅ Search and filter functionality
- ✅ Admin can add/edit/delete books
- ✅ Stock management

### Blog System
- ✅ Display blog posts from Supabase
- ✅ Featured posts
- ✅ Admin can manage posts
- ✅ Rich content support

### UI/UX
- ✅ Responsive design
- ✅ Dark/light mode
- ✅ Loading states
- ✅ Error handling
- ✅ Toast notifications

## 7. Next Steps

To continue development:

1. **Shopping Cart**: Implement cart functionality with local storage or database
2. **Order Management**: Complete the order flow and payment integration
3. **Search**: Add full-text search capabilities
4. **File Upload**: Add image upload for books and blog posts
5. **Email Notifications**: Set up email templates for orders and notifications
6. **Analytics**: Add tracking for popular books and user behavior

## 8. Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 9. Troubleshooting

### Common Issues:

1. **Authentication not working**: Check that your Supabase URL and anon key are correct in `.env`
2. **Database errors**: Ensure you've run the setup SQL script
3. **RLS errors**: Check that policies are properly configured
4. **CORS issues**: Add your domain to Supabase allowed origins

### Useful SQL Queries:

```sql
-- Check if tables exist
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- View all users
SELECT * FROM auth.users;

-- Check user roles
SELECT email, raw_user_meta_data FROM auth.users;

-- View books
SELECT * FROM public.books;

-- View blog posts
SELECT * FROM public.blog_posts;
```