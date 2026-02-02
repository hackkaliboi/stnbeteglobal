import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function AuthDebugger() {
    const { user, session, profile, isAdmin } = useAuth();
    const [dbCheck, setDbCheck] = useState<{ status: string; data?: any; error?: any }>({ status: 'idle' });
    const [rlsCheck, setRlsCheck] = useState<{ status: string; data?: any; error?: any }>({ status: 'idle' });

    const runDiagnostics = async () => {
        setDbCheck({ status: 'loading' });
        setRlsCheck({ status: 'loading' });

        // 1. Check direct DB connection and User table access
        try {
            if (!user) {
                setDbCheck({ status: 'error', error: 'No authenticated user' });
                setRlsCheck({ status: 'skipped' });
                return;
            }

            console.log("Testing DB access for user:", user.id);

            // Try to read own profile specifically
            const { data: profileData, error: profileError } = await supabase
                .from('users')
                .select('*')
                .eq('id', user.id)
                .single();

            if (profileError) {
                setDbCheck({ status: 'error', error: profileError });
            } else {
                setDbCheck({ status: 'success', data: profileData });
            }

            // 2. Test RLS/Permissions by trying to update a dummy field (timestamp)
            const { data: updateData, error: updateError } = await supabase
                .from('users')
                .update({ updated_at: new Date().toISOString() })
                .eq('id', user.id)
                .select()
                .single();

            if (updateError) {
                setRlsCheck({ status: 'error', error: updateError });
            } else {
                setRlsCheck({ status: 'success', data: updateData });
            }

        } catch (err: any) {
            setDbCheck({ status: 'error', error: err.message });
        }
    };

    return (
        <div className="container mx-auto py-10 space-y-8 p-4">
            <h1 className="text-3xl font-bold text-red-600 flex items-center gap-2">
                <AlertTriangle /> Authentication Debugger
            </h1>
            <p className="text-muted-foreground">
                Use this page to diagnose why Admin access is failing.
            </p>

            <Button onClick={runDiagnostics} size="lg" className="w-full md:w-auto">
                Run Diagnostics
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Auth Context State */}
                <Card>
                    <CardHeader>
                        <CardTitle>1. App State (AuthContext)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <span className="font-bold">User Authenticated:</span> {user ? <span className="text-green-600">Yes ({user.email})</span> : <span className="text-red-600">No</span>}
                        </div>
                        <div>
                            <span className="font-bold">Is Admin (Context):</span> {isAdmin ? <span className="text-green-600 font-bold">YES</span> : <span className="text-red-600 font-bold">NO</span>}
                        </div>
                        <div>
                            <span className="font-bold">Profile Loaded:</span> {profile ? <span className="text-green-600">Yes</span> : <span className="text-red-600">No</span>}
                        </div>
                        <pre className="bg-slate-950 text-slate-50 p-4 rounded text-xs overflow-auto max-h-40">
                            {JSON.stringify({ user: user?.id, role: profile?.role, isAdmin }, null, 2)}
                        </pre>
                    </CardContent>
                </Card>

                {/* Database & RLS Check */}
                <Card>
                    <CardHeader>
                        <CardTitle>2. Database & RLS Permissions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">

                        {/* Read Check */}
                        <div className="border p-3 rounded">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold">Read Profile (public.users)</span>
                                {dbCheck.status === 'loading' && <Loader2 className="animate-spin h-4 w-4" />}
                                {dbCheck.status === 'success' && <CheckCircle className="text-green-500 h-4 w-4" />}
                                {dbCheck.status === 'error' && <XCircle className="text-red-500 h-4 w-4" />}
                            </div>
                            {dbCheck.error && (
                                <div className="text-red-500 text-xs bg-red-50 p-2 rounded">
                                    Error: {JSON.stringify(dbCheck.error)}
                                    <p className="mt-1 font-bold">Likely Cause: RLS Policy blocking 'SELECT' or user not in table.</p>
                                </div>
                            )}
                            {dbCheck.data && (
                                <div className="text-green-600 text-xs bg-green-50 p-2 rounded">
                                    Success! Role in DB: <strong>{dbCheck.data.role}</strong>
                                </div>
                            )}
                        </div>

                        {/* Write Check */}
                        <div className="border p-3 rounded">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold">Write Profile (Update)</span>
                                {rlsCheck.status === 'loading' && <Loader2 className="animate-spin h-4 w-4" />}
                                {rlsCheck.status === 'success' && <CheckCircle className="text-green-500 h-4 w-4" />}
                                {rlsCheck.status === 'error' && <XCircle className="text-red-500 h-4 w-4" />}
                            </div>
                            {rlsCheck.error && (
                                <div className="text-red-500 text-xs bg-red-50 p-2 rounded">
                                    Error: {JSON.stringify(rlsCheck.error)}
                                    <p className="mt-1 font-bold">Likely Cause: RLS Policy blocking 'UPDATE'.</p>
                                </div>
                            )}
                        </div>

                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
