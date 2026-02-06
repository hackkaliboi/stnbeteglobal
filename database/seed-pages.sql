-- ============================================
-- Seed Pages Content (Fully Editable)
-- ============================================

-- 1. Home Page (/)
INSERT INTO pages (slug, title, is_published, content, meta_description)
VALUES (
    '/', 
    'Home', 
    true, 
    '{
        "hero": {
            "title": "Rebuilding Society\nThrough Multifaceted Wisdom",
            "subtitle": "Leadership Development • Mentorship • Life-transforming Resources • Consultancy",
            "cta_text": "Browse Resources",
            "cta_link": "/books",
            "secondary_cta_text": "Our Story",
            "secondary_cta_link": "/about",
            "image_url": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
            "stats_titles": "500+",
            "stats_categories": "4",
            "stats_readers": "2k+"
        }
    }'::jsonb, 
    'Rebuilding Society Through Multifaceted Wisdom - STNBETE Global'
)
ON CONFLICT (slug) DO UPDATE 
SET content = EXCLUDED.content;

-- 2. About Page (/about)
INSERT INTO pages (slug, title, is_published, content, meta_description)
VALUES (
    '/about', 
    'About Us', 
    true, 
    '{
        "hero": {
            "label": "Our Story",
            "title": "About STNBETE Global",
            "subtitle": "For over 15 years, we have been on a mission to connect readers with stories that inspire, educate, and transform.",
            "est_label": "Est. 2008",
            "exp_label": "15+ Years Experience"
        },
        "mission": {
            "title": "Our Mission",
            "description": "To create a sanctuary where book lovers can discover, discuss, and share their passion for reading.",
            "stats": {
                "readers_count": "2k+",
                "readers_label": "Readers",
                "books_count": "500+",
                "books_label": "Books",
                "years_count": "15",
                "years_label": "Years"
            }
        },
        "story": {
            "label": "Our Journey",
            "title": "Our Story - From Small Beginnings",
            "description": "STNBETE Global started as a small corner shop in 2008... What began as a modest collection has grown into a comprehensive library."
        },
        "values": [
            {
                "title": "Passion for Literature",
                "description": "Every book we curate reflects our deep love for storytelling."
            },
            {
                "title": "Community First",
                "description": "We build connections between readers, authors, and book lovers."
            },
            {
                "title": "Quality Selection",
                "description": "Our expert team carefully selects each title."
            },
            {
                "title": "Accessible Reading",
                "description": "We believe everyone deserves access to great literature."
            }
        ],
        "values_header": {
            "title": "Our Values",
            "subtitle": "These core principles guide everything we do at STNBETE Global."
        },
        "team_header": {
            "title": "Meet Our Team",
            "subtitle": "The passionate individuals behind STNBETE Global."
        },
        "team": [
            {
                "name": "Saturday T. Nbete",
                "role": "Founder & CEO",
                "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
            },
            {
                "name": "Sarah Williams",
                "role": "Community Manager",
                "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
            }
        ]
    }'::jsonb, 
    'Learn about STNBETE Global, our mission, and our team.'
)
ON CONFLICT (slug) DO UPDATE 
SET content = EXCLUDED.content;

-- 3. Contact Page (/contact)
INSERT INTO pages (slug, title, is_published, content, meta_description)
VALUES (
    '/contact', 
    'Contact Us', 
    true, 
    '{
        "hero": {
            "label": "Get In Touch",
            "title": "Contact Us",
            "subtitle": "Have questions? We would love to hear from you. Send us a message and we replacement_content ll respond as soon as possible.",
            "badge_1": "Quick Response",
            "badge_2": "Expert Support",
            "badge_3": "Book Consultations"
        },
        "contact_info": {
            "header": "Reach Out",
            "email_label": "Email",
            "email_1": "stnbete@yahoo.com",
            "email_2": "satnbete@gmail.com",
            "phone_label": "Phone",
            "phone": "+2347034546060",
            "website_label": "Website",
            "website": "www.stnbeteglobal.com",
            "facebook_handle": "Saturday Tormaaa Nbete",
            "youtube_handle": "Saturday T. Nbete",
            "hours_label": "Hours",
            "hours": "Mon-Fri 9AM-6PM"
        },
        "booking": {
            "title": "Book a Consultation or Speaking Engagement",
            "description": "Interested in booking the author for a speaking engagement, book signing, or literary consultation? Fill out the contact form below with your request details.",
            "response_time": "Typical response time: 24-48 hours"
        }
    }'::jsonb, 
    'Contact STNBETE Global for inquiries.'
)
ON CONFLICT (slug) DO UPDATE 
SET content = EXCLUDED.content;
