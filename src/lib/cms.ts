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
    meta_description?: string;
    is_published: boolean;
}

export interface PageSection {
    id: string;
    section_key: string;
    content: any;
}

// Fetch all categories
export async function getCategories(type?: 'book' | 'blog') {
    let query = supabase.from('categories').select('*');
    if (type) {
        query = query.eq('type', type);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data as Category[];
}

// Fetch a specific site setting
export async function getSiteSetting(key: string) {
    const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', key)
        .single();

    if (error) return null;
    return data.value;
}

// Fetch all site settings (useful for initial app load)
export async function getAllSiteSettings() {
    const { data, error } = await supabase.from('site_settings').select('*');
    if (error) throw error;

    // Convert array to object for easier access
    const settings: Record<string, any> = {};
    data.forEach(item => {
        settings[item.key] = item.value;
    });
    return settings;
}

// Fetch page content by slug
export async function getPageContent(slug: string) {
    // 1. Get Page Details
    const { data: page, error: pageError } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

    if (pageError || !page) return null;

    // 2. Get Page Sections
    const { data: sections, error: sectionsError } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page_id', page.id);

    if (sectionsError) throw sectionsError;

    // 3. Format sections as object
    const sectionsMap: Record<string, any> = {};
    sections.forEach(section => {
        sectionsMap[section.section_key] = section.content;
    });

    return {
        ...page,
        sections: sectionsMap
    };
}

// --- Mutations ---

// Update a site setting
export async function updateSiteSetting(key: string, value: any) {
    const { error } = await supabase
        .from('site_settings')
        .upsert({ key, value, updated_at: new Date().toISOString() });

    if (error) throw error;
}

// Create a new category
export async function createCategory(category: Omit<Category, 'id'>) {
    const { data, error } = await supabase
        .from('categories')
        .insert(category)
        .select()
        .single();

    if (error) throw error;
    return data;
}

// Update a category
export async function updateCategory(id: string, updates: Partial<Category>) {
    const { error } = await supabase
        .from('categories')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

    if (error) throw error;
}

// Delete a category
export async function deleteCategory(id: string) {
    const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

    if (error) throw error;
}

// Update page section content
export async function updatePageSection(pageId: string, sectionKey: string, content: any) {
    const { error } = await supabase
        .from('page_sections')
        .upsert({
            page_id: pageId,
            section_key: sectionKey,
            content,
            updated_at: new Date().toISOString()
        }, { onConflict: 'page_id, section_key' });

    if (error) throw error;
}

// Fetch all pages
export async function getPages() {
    const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('title');

    if (error) throw error;
    return data as Page[];
}

// Create a new page
export async function createPage(page: Omit<Page, 'id'>) {
    const { data, error } = await supabase
        .from('pages')
        .insert(page)
        .select()
        .single();

    if (error) throw error;
    return data;
}

// Update a page
export async function updatePage(id: string, updates: Partial<Page>) {
    const { error } = await supabase
        .from('pages')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

    if (error) throw error;
}

// Delete a page
export async function deletePage(id: string) {
    const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', id);

    if (error) throw error;
}


