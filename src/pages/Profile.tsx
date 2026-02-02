import { useState, useEffect } from "react";
import { useAuth, UserProfile } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MainLayout from "@/components/layout/MainLayout";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Loader2, User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const { user, profile, loading: authLoading, refreshProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [fullName, setFullName] = useState("");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    // Redirect if not logged in
    useEffect(() => {
        if (!authLoading && !user) {
            navigate("/");
        }
    }, [user, authLoading, navigate]);

    // Initialize form with profile data
    useEffect(() => {
        if (profile) {
            setFullName(profile.full_name || "");
        }
    }, [profile]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        try {
            const { error } = await supabase
                .from("users")
                .update({ full_name: fullName })
                .eq("id", user.id);

            if (error) throw error;

            toast({
                title: "Profile Updated",
                description: "Your profile information has been updated successfully.",
            });

            await refreshProfile();
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to update profile.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <MainLayout>
                <div className="container mx-auto py-20 flex justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            </MainLayout>
        );
    }

    if (!user) return null;

    return (
        <MainLayout>
            <div className="container mx-auto py-10 px-4 md:px-0">
                <div className="max-w-2xl mx-auto space-y-8">
                    <div>
                        <h1 className="text-3xl font-serif font-bold mb-2">My Profile</h1>
                        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
                    </div>

                    <div className="bg-card border rounded-lg p-6 shadow-sm">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center text-3xl font-medium">
                                {profile?.avatar_url ? (
                                    <img src={profile.avatar_url} alt="Profile" className="h-full w-full rounded-full object-cover" />
                                ) : (
                                    <span>{profile?.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}</span>
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">{profile?.full_name || "User"}</h2>
                                <p className="text-muted-foreground">{user.email}</p>
                                <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${profile?.role === 'admin'
                                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                    }`}>
                                    {profile?.role === 'admin' ? "Administrator" : "Member"}
                                </span>
                            </div>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" value={user.email || ""} disabled className="bg-muted/50" />
                                <p className="text-xs text-muted-foreground">Email address cannot be changed.</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                {isEditing ? (
                                    <>
                                        <Button type="button" variant="ghost" onClick={() => setIsEditing(false)} disabled={loading}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={loading}>
                                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Save Changes
                                        </Button>
                                    </>
                                ) : (
                                    <Button type="button" onClick={() => setIsEditing(true)}>
                                        Edit Profile
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
