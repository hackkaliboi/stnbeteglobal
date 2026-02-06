import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, type Book, uploadBookCover, deleteBookCover } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

// Fetch all books
export function useBooks() {
    return useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('books')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data as Book[];
        },
    });
}

// Fetch a single book by ID
export function useBook(id: string | undefined) {
    return useQuery({
        queryKey: ['book', id],
        queryFn: async () => {
            if (!id) return null;

            const { data, error } = await supabase
                .from('books')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            return data as Book;
        },
        enabled: !!id,
    });
}

// Create a new book
export function useCreateBook() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async ({
            title,
            author,
            selar_url,
            is_featured = false,
            coverFile
        }: {
            title: string;
            author: string;
            selar_url: string;
            is_featured?: boolean;
            coverFile?: File;
        }) => {
            // First, insert the book
            const { data, error } = await supabase
                .from('books')
                .insert([{ title, author, selar_url, is_featured }])
                .select()
                .single();

            if (error) throw error;

            // If there's a cover file, upload it
            if (coverFile && data) {
                const coverUrl = await uploadBookCover(coverFile, data.id);

                if (coverUrl) {
                    // Update the book with the cover URL
                    const { error: updateError } = await supabase
                        .from('books')
                        .update({ cover_image: coverUrl })
                        .eq('id', data.id);

                    if (updateError) throw updateError;

                    return { ...data, cover_image: coverUrl };
                }
            }

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
            toast({
                title: 'Success',
                description: 'Book created successfully',
            });
        },
        onError: (error: Error) => {
            toast({
                title: 'Error',
                description: `Failed to create book: ${error.message}`,
                variant: 'destructive',
            });
        },
    });
}

// Update an existing book
export function useUpdateBook() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async ({
            id,
            title,
            author,
            selar_url,
            is_featured,
            coverFile,
            deletePreviousCover
        }: {
            id: string;
            title?: string;
            author?: string;
            selar_url?: string;
            is_featured?: boolean;
            coverFile?: File;
            deletePreviousCover?: string;
        }) => {
            // If there's a new cover file, upload it first
            let coverUrl: string | undefined;

            if (coverFile) {
                coverUrl = await uploadBookCover(coverFile, id) || undefined;

                // Delete the previous cover if it exists and we have a new one
                if (deletePreviousCover && coverUrl) {
                    await deleteBookCover(deletePreviousCover);
                }
            }

            // Update the book
            const updates: Partial<Book> = {};
            if (title !== undefined) updates.title = title;
            if (author !== undefined) updates.author = author;
            if (selar_url !== undefined) updates.selar_url = selar_url;
            if (is_featured !== undefined) updates.is_featured = is_featured;
            if (coverUrl) updates.cover_image = coverUrl;

            const { data, error } = await supabase
                .from('books')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
            toast({
                title: 'Success',
                description: 'Book updated successfully',
            });
        },
        onError: (error: Error) => {
            toast({
                title: 'Error',
                description: `Failed to update book: ${error.message}`,
                variant: 'destructive',
            });
        },
    });
}

// Delete a book
export function useDeleteBook() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async ({ id, coverImage }: { id: string; coverImage?: string | null }) => {
            // Delete the cover image first if it exists
            if (coverImage) {
                await deleteBookCover(coverImage);
            }

            // Delete the book
            const { error } = await supabase
                .from('books')
                .delete()
                .eq('id', id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
            toast({
                title: 'Success',
                description: 'Book deleted successfully',
            });
        },
        onError: (error: Error) => {
            toast({
                title: 'Error',
                description: `Failed to delete book: ${error.message}`,
                variant: 'destructive',
            });
        },
    });
}
