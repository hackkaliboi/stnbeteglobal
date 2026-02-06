import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    cover_image: string | null;
    author: string;
    category: string;
    published: boolean;
    featured: boolean;
    created_at: string;
    updated_at: string;
}

// Helper to upload blog images
export async function uploadBlogImage(file: File): Promise<string | null> {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `blog-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('blog-images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: true
            });

        if (uploadError) {
            console.error('Upload error:', uploadError);
            return null;
        }

        const { data } = supabase.storage
            .from('blog-images')
            .getPublicUrl(filePath);

        return data.publicUrl;
    } catch (error) {
        console.error('Error uploading blog image:', error);
        return null;
    }
}

// Fetch all posts
export function useBlogPosts() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data as BlogPost[];
        },
    });

    // Delete mutation included in the hook return for convenience
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('posts')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });

    const deletePost = async (id: string) => {
        try {
            await deleteMutation.mutateAsync(id);
            return { error: null };
        } catch (error: any) {
            return { error: error.message };
        }
    };

    return {
        posts: query.data || [],
        loading: query.isLoading,
        error: query.error ? (query.error as Error).message : null,
        deletePost
    };
}

// Fetch single post
export function useBlogPost(slug: string | undefined) {
    return useQuery({
        queryKey: ['post', slug],
        queryFn: async () => {
            if (!slug) return null;

            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error) throw error;
            return data as BlogPost;
        },
        enabled: !!slug,
    });
}

// Create post
export function useCreatePost() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async ({ post, coverFile }: { post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>; coverFile?: File }) => {
            // Create slug if missing
            if (!post.slug) {
                post.slug = post.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)+/g, '');
            }

            // Upload cover if present
            let coverUrl = post.cover_image;
            if (coverFile) {
                const uploadedUrl = await uploadBlogImage(coverFile);
                if (uploadedUrl) coverUrl = uploadedUrl;
            }

            const { data, error } = await supabase
                .from('posts')
                .insert([{ ...post, cover_image: coverUrl }])
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            toast({ title: "Success", description: "Post created successfully" });
        },
        onError: (error: Error) => {
            toast({ title: "Error", description: `Failed to create post: ${error.message}`, variant: "destructive" });
        },
    });
}

// Update post
export function useUpdatePost() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async ({ id, updates, coverFile }: { id: string; updates: Partial<BlogPost>; coverFile?: File }) => {
            let coverUrl = updates.cover_image;

            if (coverFile) {
                const uploadedUrl = await uploadBlogImage(coverFile);
                if (uploadedUrl) coverUrl = uploadedUrl;
            }

            const { data, error } = await supabase
                .from('posts')
                .update({ ...updates, cover_image: coverUrl })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.invalidateQueries({ queryKey: ['post'] }); // Invalidate specific post too
            toast({ title: "Success", description: "Post updated successfully" });
        },
        onError: (error: Error) => {
            toast({ title: "Error", description: `Failed to update post: ${error.message}`, variant: "destructive" });
        },
    });
}
