import { supabase } from './supabase';

export interface Category {
    id: string;
    name: string;
    slug: string;
    type: 'book' | 'blog';
    description?: string;
}

export interface SiteSetting {
    key: string;
    value: any;
    type: 'text' | 'json' | 'boolean' | 'image';
}

export interface Page {
    id: string;
    slug: string;
    title: string;
    content: any;
    meta_description?: string;
    is_published: boolean;
}

export interface PageSection {
    id: string;
    section_key: string;
    content: any;
}

// Fetch all categories (Mock implementation as we removed categories table for simplicity)
// In a real app with simpler schema, we might just return hardcoded categories or fetch distinct values
export async function getCategories(type?: 'book' | 'blog'): Promise<Category[]> {
    return [
        { id: '1', name: 'General', slug: 'general', type: 'blog' },
        { id: '2', name: 'News', slug: 'news', type: 'blog' },
        { id: '3', name: 'Events', slug: 'events', type: 'blog' },
    ];
}

// Fetch a specific site setting
export async function getSiteSetting(key: string): Promise<any> {
    const { data } = await supabase
        .from('site_settings')
        .select('value, type')
        .eq('key', key)
        .single();

    if (!data) return null;

    // Parse value based on type if needed
    if (data.type === 'json' || data.type === 'boolean') {
        try {
            return JSON.parse(data.value);
        } catch {
            return data.value;
        }
    }

    return data.value;
}

// Fetch all site settings
export async function getAllSiteSettings(): Promise<Record<string, any>> {
    const { data } = await supabase
        .from('site_settings')
        .select('*');

    const settings: Record<string, any> = {};

    data?.forEach(setting => {
        let value = setting.value;
        if (setting.type === 'json' || setting.type === 'boolean') {
            try {
                value = JSON.parse(setting.value);
            } catch {
                // Keep as string if parse fails
            }
        }
        settings[setting.key] = value;
    });

    return settings;
}

// Fetch page content by slug
export async function getPageContent(slug: string): Promise<any> {
    const { data } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        // Removed .eq('is_published', true) to allow fetching drafts or verifying logic
        // If we strictly need published for public site, we can add a param or separate function
        // But the previous issue was filtering. For now let's query mostly everything and component decides.
        // Actually, let's keep it simple: fetch the page.
        .single();

    if (data && typeof data.content === 'string') {
        try {
            data.content = JSON.parse(data.content);
        } catch (e) {
            console.error("Error parsing page content:", e);
            data.content = {};
        }
    }

    return data;
}

// --- Mutations ---

export async function updateSiteSetting(key: string, value: any): Promise<void> {
    // Determine type automatically if possible, or default to text
    let type = 'text';
    let stringValue = String(value);

    if (typeof value === 'boolean') {
        type = 'boolean';
        stringValue = String(value);
    } else if (typeof value === 'object') {
        type = 'json';
        stringValue = JSON.stringify(value);
    }

    const { error } = await supabase
        .from('site_settings')
        .upsert({
            key,
            value: stringValue,
            type
        });

    if (error) throw error;
}

// Mock category mutations (since we removed the table)
export async function createCategory(category: Omit<Category, 'id'>): Promise<Category | null> {
    return null;
}

export async function updateCategory(id: string, updates: Partial<Category>): Promise<void> {
    // No-op
}

export async function deleteCategory(id: string): Promise<void> {
    // No-op
}

export async function updatePageSection(pageId: string, sectionKey: string, content: any): Promise<void> {
    // 1. Fetch current content
    const { data: page, error: fetchError } = await supabase
        .from('pages')
        .select('content')
        .eq('id', pageId)
        .single();

    if (fetchError) throw fetchError;

    // Ensure content is an object
    let currentContent = page.content || {};
    if (typeof currentContent === 'string') {
        try {
            currentContent = JSON.parse(currentContent);
        } catch (e) {
            currentContent = {};
        }
    }

    // 2. Merge new section content
    const updatedContent = {
        ...currentContent,
        [sectionKey]: content
    };

    // 3. Update the page - Send as JSON object, Supabase/Postgres driver should handle it
    const { error } = await supabase
        .from('pages')
        .update({ content: updatedContent })
        .eq('id', pageId);

    if (error) throw error;
}

// Page Management
export async function getPages(): Promise<Page[]> {
    const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('title');

    if (error) throw error;
    return data || [];
}

export async function createPage(page: Omit<Page, 'id'>): Promise<Page | null> {
    const { data, error } = await supabase
        .from('pages')
        .insert([page])
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function updatePage(id: string, updates: Partial<Page>): Promise<void> {
    const { error } = await supabase
        .from('pages')
        .update(updates)
        .eq('id', id);

    if (error) throw error;
}

export async function deletePage(id: string): Promise<void> {
    const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', id);

    if (error) throw error;
}
