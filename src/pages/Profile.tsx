import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, LogOut, User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, signOut, loading, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate("/login");
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="min-h-[60vh] flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </MainLayout>
        );
    }

    if (!user) {
        navigate("/login");
        return null;
    }

    return (
        <MainLayout>
            <div className="container mx-auto py-12 md:py-24">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">My Profile</h1>

                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={user.user_metadata?.avatar_url} />
                                <AvatarFallback className="text-xl">
                                    {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-2xl">{user.user_metadata?.full_name || "User"}</CardTitle>
                                <CardDescription>{user.email}</CardDescription>
                                {isAdmin && (
                                    <span className="inline-block px-2 py-1 mt-2 text-xs font-bold text-white bg-primary rounded-full">
                                        Admin
                                    </span>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4">
                                <div className="p-4 rounded-lg bg-muted/20 border">
                                    <div className="flex items-center gap-2 mb-2 font-medium">
                                        <UserIcon className="h-4 w-4" />
                                        Account Details
                                    </div>
                                    <dl className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <dt className="text-muted-foreground">User ID</dt>
                                            <dd className="font-mono">{user.id.substring(0, 8)}...</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-muted-foreground">Joined</dt>
                                            <dd>{new Date(user.created_at).toLocaleDateString()}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-muted-foreground">Last Sign In</dt>
                                            <dd>{user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'Never'}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {isAdmin && (
                                    <Button onClick={() => navigate("/admin")} variant="default">
                                        Go to Dashboard
                                    </Button>
                                )}
                                <Button onClick={handleSignOut} variant="destructive">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Sign Out
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </MainLayout>
    );
};

export default Profile;
