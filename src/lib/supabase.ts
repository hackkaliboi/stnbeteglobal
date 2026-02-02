import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (we'll expand these as we create tables)
export type Database = {
    public: {
        Tables: {
            books: {
                Row: {
                    id: string
                    title: string
                    author: string
                    price: number
                    cover_image: string | null
                    category: string
                    description: string | null
                    is_new: boolean
                    is_bestseller: boolean
                    in_stock: boolean
                    selar_url: string | null
                    isbn: string | null
                    pages: number
                    publisher: string
                    publication_year: number | null
                    format: string
                    dimensions: string
                    weight: string
                    language: string
                    edition: string
                    rating: number
                    review_count: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    author: string
                    price: number
                    cover_image?: string | null
                    category: string
                    description?: string | null
                    is_new?: boolean
                    is_bestseller?: boolean
                    in_stock?: boolean
                    selar_url?: string | null
                    isbn?: string | null
                    pages?: number
                    publisher?: string
                    publication_year?: number | null
                    format?: string
                    dimensions?: string
                    weight?: string
                    language?: string
                    edition?: string
                    rating?: number
                    review_count?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    author?: string
                    price?: number
                    cover_image?: string | null
                    category?: string
                    description?: string | null
                    is_new?: boolean
                    is_bestseller?: boolean
                    in_stock?: boolean
                    selar_url?: string | null
                    isbn?: string | null
                    pages?: number
                    publisher?: string
                    publication_year?: number | null
                    format?: string
                    dimensions?: string
                    weight?: string
                    language?: string
                    edition?: string
                    rating?: number
                    review_count?: number
                    created_at?: string
                    updated_at?: string
                }
            }
            blog_posts: {
                Row: {
                    id: string
                    title: string
                    excerpt: string
                    content: string
                    author: string
                    image: string | null
                    category: string
                    featured: boolean
                    published: boolean
                    read_time: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    excerpt: string
                    content: string
                    author: string
                    image?: string | null
                    category: string
                    featured?: boolean
                    published?: boolean
                    read_time: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    excerpt?: string
                    content?: string
                    author?: string
                    image?: string | null
                    category?: string
                    featured?: boolean
                    published?: boolean
                    read_time?: string
                    created_at?: string
                    updated_at?: string
                }
            }
            users: {
                Row: {
                    id: string
                    email: string
                    full_name: string | null
                    avatar_url: string | null
                    role: 'user' | 'admin'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email: string
                    full_name?: string | null
                    avatar_url?: string | null
                    role?: 'user' | 'admin'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    full_name?: string | null
                    avatar_url?: string | null
                    role?: 'user' | 'admin'
                    created_at?: string
                    updated_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}