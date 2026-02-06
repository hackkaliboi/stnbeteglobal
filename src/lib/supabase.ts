import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Simplified Book type - just mockup and Selar link
// All other book details (price, description, etc.) are on Selar
export interface Book {
    id: string;
    title: string;
    author: string;
    cover_image: string | null; // Book cover mockup
    selar_url: string; // Link to Selar product page
    is_featured: boolean; // Show on homepage
    created_at: string;
    updated_at: string;
}

// Helper function to upload book cover mockup
export async function uploadBookCover(file: File, bookId: string): Promise<string | null> {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${bookId}-${Date.now()}.${fileExt}`;
        const filePath = `covers/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('book-covers')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: true
            });

        if (uploadError) {
            console.error('Upload error:', uploadError);
            return null;
        }

        // Get public URL
        const { data } = supabase.storage
            .from('book-covers')
            .getPublicUrl(filePath);

        return data.publicUrl;
    } catch (error) {
        console.error('Error uploading book cover:', error);
        return null;
    }
}

// Helper function to delete book cover
export async function deleteBookCover(coverUrl: string): Promise<boolean> {
    try {
        // Extract file path from URL
        const urlParts = coverUrl.split('/book-covers/');
        if (urlParts.length < 2) return false;

        const filePath = urlParts[1];

        const { error } = await supabase.storage
            .from('book-covers')
            .remove([filePath]);

        if (error) {
            console.error('Delete error:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error deleting book cover:', error);
        return false;
    }
}
