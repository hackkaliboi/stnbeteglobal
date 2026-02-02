import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const AdminTest = () => {
    const { user } = useAuth();
    const { profile, isAdmin, loading } = useUserProfile();
    const { toast } = useToast();
    const [email, setEmail] = useState("");
    const [updating, setUpdating] = useState(false);

    const makeUserAdmin = async () => {
        if (!email) {
            toast({
                title: "Error",
                description: "Please enter an email address",
                variant: "destructive",
            });
            return;
        }

        setUpdating(true);
        try {
            const { error } = await supabase
                .from('users')
                .update({ role: 'admin' })
                .eq('email', email);

            if (error) {
                toast({
                    title: "Error",
                    description: `Failed to update user: ${error.message}`,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Success",
                    description: `User ${email} has been made an admin`,
                });
                setEmail("");
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An unexpected error occurred",
                variant: "destructive",
            });
        } finally {
            setUpdating(false);
        }
    };

    const makeCurrentUserAdmin = async () => {
        if (!user?.email) return;

        setUpdating(true);
        try {
            const { error } = await supabase
                .from('users')
                .update({ role: 'admin' })
                .eq('id', user.id);

            if (error) {
                toast({
                    title: "Error",
                    description: `Failed to update user: ${error.message}`,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Success",
                    description: "You have been made an admin. Please refresh the page.",
                });
                // Refresh the page to reload user data
                window.location.reload();
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An unexpected error occurred",
                variant: "destructive",
            });
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto py-20">
                <div className="flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-20 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">Admin Test Page</h1>

            <div className="space-y-6">
                {/* Current User Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Current User Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label>User ID</Label>
                            <p className="text-sm text-muted-foreground">{user?.id}</p>
                        </div>
                        <div>
                            <Label>Email</Label>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                        <div>
                            <Label>Profile Data</Label>
                            <pre className="text-xs bg-muted p-2 rounded overflow-auto">
                                {JSON.stringify(profile, null, 2)}
                            </pre>
                        </div>
                        <div>
                            <Label>Is Admin</Label>
                            <p className="text-sm text-muted-foreground">
                                {isAdmin ? "Yes" : "No"}
                            </p>
                        </div>
                        <Button
                            onClick={makeCurrentUserAdmin}
                            disabled={updating || isAdmin}
                            className="w-full"
                        >
                            {updating ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Make Me Admin"
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Make User Admin */}
                <Card>
                    <CardHeader>
                        <CardTitle>Make User Admin</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="user@example.com"
                            />
                        </div>
                        <Button
                            onClick={makeUserAdmin}
                            disabled={updating || !email}
                            className="w-full"
                        >
                            {updating ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Make Admin"
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminTest;