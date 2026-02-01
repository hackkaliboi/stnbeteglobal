import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2, User, Mail, Shield, Calendar } from "lucide-react";
import { Navigate } from "react-router-dom";

const Profile = () => {
    const { user, loading } = useAuth();
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: user?.user_metadata?.full_name || "",
        email: user?.email || "",
    });

    if (loading) {
        return (
            <MainLayout>
                <div className="container mx-auto py-20">
                    <div className="flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="ml-2 text-muted-foreground">Loading profile...</span>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    const getUserInitials = (name: string | null) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const handleSave = async () => {
        // In a real app, you would update the user profile here
        toast({
            title: "Profile Updated",
            description: "Your profile has been updated successfully.",
        });
        setIsEditing(false);
    };

    const userRole = user.user_metadata?.role || 'user';
    const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <MainLayout>
            <div className="container mx-auto py-20">
                <div className="max-w-2xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
                        <p className="text-muted-foreground">Manage your account settings and preferences</p>
                    </div>

                    {/* Profile Card */}
                    <Card>
                        <CardHeader className="text-center pb-6">
                            <div className="flex justify-center mb-4">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name} />
                                    <AvatarFallback className="text-2xl">
                                        {getUserInitials(user.user_metadata?.full_name)}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <CardTitle className="text-2xl">
                                {user.user_metadata?.full_name || "User"}
                            </CardTitle>
                            <p className="text-muted-foreground">{user.email}</p>
                            {userRole === 'admin' && (
                                <div className="flex justify-center mt-2">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                        <Shield className="h-3 w-3 mr-1" />
                                        Administrator
                                    </span>
                                </div>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Separator />

                            {/* Account Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-foreground">Account Information</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Full Name</Label>
                                        {isEditing ? (
                                            <Input
                                                id="fullName"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                                                placeholder="Enter your full name"
                                            />
                                        ) : (
                                            <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded-md">
                                                <User className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-foreground">{user.user_metadata?.full_name || "Not set"}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded-md">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-foreground">{user.email}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Account Type</Label>
                                        <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded-md">
                                            <Shield className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-foreground capitalize">{userRole}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Member Since</Label>
                                        <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded-md">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-foreground">{joinDate}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Actions */}
                            <div className="flex justify-end space-x-2">
                                {isEditing ? (
                                    <>
                                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                                            Cancel
                                        </Button>
                                        <Button onClick={handleSave}>
                                            Save Changes
                                        </Button>
                                    </>
                                ) : (
                                    <Button onClick={() => setIsEditing(true)}>
                                        Edit Profile
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Additional Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium text-foreground">Email Notifications</h4>
                                    <p className="text-sm text-muted-foreground">Receive updates about new books and blog posts</p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Manage
                                </Button>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium text-foreground">Privacy Settings</h4>
                                    <p className="text-sm text-muted-foreground">Control your data and privacy preferences</p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Configure
                                </Button>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium text-foreground">Change Password</h4>
                                    <p className="text-sm text-muted-foreground">Update your account password</p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Change
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