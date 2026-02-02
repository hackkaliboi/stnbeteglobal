import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

// Define the shape of our User Profile from the database
export interface UserProfile {
    id: string;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
    role: 'user' | 'admin';
    created_at: string;
    updated_at: string;
}

interface AuthContextType {
    user: User | null
    session: Session | null
    profile: UserProfile | null
    loading: boolean
    isAdmin: boolean
    signUp: (email: string, password: string, fullName?: string) => Promise<{ error: AuthError | null }>
    signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
    signOut: () => Promise<{ error: AuthError | null }>
    refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)

    // Helper to fetch profile from public.users table
    const fetchProfile = async (userId: string) => {
        try {
            console.log('Fetching profile for...', userId)
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .single()

            if (error) {
                console.warn('Error fetching profile:', error)
                return null
            }
            console.log('Fetched profile:', data)
            return data as UserProfile
        } catch (err) {
            console.error('Exception fetching profile:', err)
            return null
        }
    }

    // Helper to ensure public.users record exists
    const ensureUserProfile = async (authUser: User) => {
        const { error } = await supabase
            .from('users')
            .upsert({
                id: authUser.id,
                email: authUser.email!,
                full_name: authUser.user_metadata?.full_name || 'User',
                avatar_url: authUser.user_metadata?.avatar_url || null,
                updated_at: new Date().toISOString(),
            }, { onConflict: 'id' }) // Just update timestamp if exists, or insert if missing

        if (error) console.error('Error syncing user profile:', error)
    }

    useEffect(() => {
        let mounted = true;

        const initAuth = async () => {
            // 1. Get Session
            const { data: { session } } = await supabase.auth.getSession()

            if (mounted) {
                setSession(session)
                setUser(session?.user ?? null)
            }

            // 2. If user exists, fetch profile
            if (session?.user) {
                const userProfile = await fetchProfile(session.user.id)
                if (mounted) setProfile(userProfile)
            } else {
                if (mounted) setProfile(null)
            }

            if (mounted) setLoading(false)
        }

        initAuth()

        // 3. Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state changed:', event)

            if (mounted) {
                setSession(session)
                setUser(session?.user ?? null)
            }

            if (session?.user) {
                // On sign in, ensure profile exists then fetch it
                if (event === 'SIGNED_IN') {
                    await ensureUserProfile(session.user)
                }
                const userProfile = await fetchProfile(session.user.id)
                if (mounted) setProfile(userProfile)
            } else {
                if (mounted) setProfile(null)
            }

            if (mounted) setLoading(false)
        })

        return () => {
            mounted = false
            subscription.unsubscribe()
        }
    }, [])

    const signUp = async (email: string, password: string, fullName?: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        })

        // If signup successful and we have a user (auto-confirm enabled or dev env), sync profile immediately
        if (data.user && !error) {
            await ensureUserProfile(data.user)
        }

        return { error }
    }

    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        return { error }
    }

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            // Always clear local state
            setUser(null)
            setSession(null)
            setProfile(null)
            // Force reload to completely clear any lingering app state
            window.location.href = '/'
            return { error }
        } catch (error) {
            console.error('Sign out error:', error)
            setUser(null)
            setSession(null)
            setProfile(null)
            window.location.href = '/'
            return { error: error as any }
        }
    }

    const refreshProfile = async () => {
        if (user) {
            const userProfile = await fetchProfile(user.id)
            setProfile(userProfile)
        }
    }

    const value = {
        user,
        session,
        profile,
        loading,
        isAdmin: profile?.role === 'admin',
        signUp,
        signIn,
        signOut,
        refreshProfile
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
