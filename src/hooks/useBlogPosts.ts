import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

type BlogPost = Database['public']['Tables']['blog_posts']['Row']

export function useBlogPosts() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('published', true)
                .order('created_at', { ascending: false })

            if (error) throw error
            setPosts(data || [])
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    const addPost = async (post: Database['public']['Tables']['blog_posts']['Insert']) => {
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .insert([post])
                .select()
                .single()

            if (error) throw error
            setPosts(prev => [data, ...prev])
            return { data, error: null }
        } catch (err) {
            const error = err instanceof Error ? err.message : 'An error occurred'
            return { data: null, error }
        }
    }

    const updatePost = async (id: string, updates: Database['public']['Tables']['blog_posts']['Update']) => {
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .update({ ...updates, updated_at: new Date().toISOString() })
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            setPosts(prev => prev.map(post => post.id === id ? data : post))
            return { data, error: null }
        } catch (err) {
            const error = err instanceof Error ? err.message : 'An error occurred'
            return { data: null, error }
        }
    }

    const deletePost = async (id: string) => {
        try {
            const { error } = await supabase
                .from('blog_posts')
                .delete()
                .eq('id', id)

            if (error) throw error
            setPosts(prev => prev.filter(post => post.id !== id))
            return { error: null }
        } catch (err) {
            const error = err instanceof Error ? err.message : 'An error occurred'
            return { error }
        }
    }

    return {
        posts,
        loading,
        error,
        addPost,
        updatePost,
        deletePost,
        refetch: fetchPosts,
    }
}