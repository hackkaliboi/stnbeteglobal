import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

type Book = Database['public']['Tables']['books']['Row']

export function useBooks() {
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchBooks()
    }, [])

    const fetchBooks = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('books')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setBooks(data || [])
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    const addBook = async (book: Database['public']['Tables']['books']['Insert']) => {
        try {
            const { data, error } = await supabase
                .from('books')
                .insert([book])
                .select()
                .single()

            if (error) throw error
            setBooks(prev => [data, ...prev])
            return { data, error: null }
        } catch (err) {
            const error = err instanceof Error ? err.message : 'An error occurred'
            return { data: null, error }
        }
    }

    const updateBook = async (id: string, updates: Database['public']['Tables']['books']['Update']) => {
        try {
            const { data, error } = await supabase
                .from('books')
                .update({ ...updates, updated_at: new Date().toISOString() })
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            setBooks(prev => prev.map(book => book.id === id ? data : book))
            return { data, error: null }
        } catch (err) {
            const error = err instanceof Error ? err.message : 'An error occurred'
            return { data: null, error }
        }
    }

    const deleteBook = async (id: string) => {
        try {
            const { error } = await supabase
                .from('books')
                .delete()
                .eq('id', id)

            if (error) throw error
            setBooks(prev => prev.filter(book => book.id !== id))
            return { error: null }
        } catch (err) {
            const error = err instanceof Error ? err.message : 'An error occurred'
            return { error }
        }
    }

    return {
        books,
        loading,
        error,
        addBook,
        updateBook,
        deleteBook,
        refetch: fetchBooks,
    }
}