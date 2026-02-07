import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Mail, Calendar, Users, Search, Download, UserX, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../../contexts/AuthContext";
import { format } from "date-fns";

interface NewsletterSubscriber {
    id: string;
    email: string;
    name: string | null;
    subscribed_at: string;
    is_active: boolean;
}

const AdminNewsletter = () => {
    const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const { toast } = useToast();
    const { isAdmin, loading: profileLoading } = useAuth();

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            const { data, error } = await supabase
                .from('newsletter_subscribers')
                .select('*')
                .order('subscribed_at', { ascending: false });

            if (error) throw error;
            setSubscribers(data || []);
        } catch (error) {
            console.error('Error fetching subscribers:', error);
            toast({
                title: "Error",
                description: "Failed to load newsletter subscribers",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const toggleSubscriberStatus = async (id: string, isActive: boolean) => {
        try {
            const { error } = await supabase
                .from('newsletter_subscribers')
                .update({ is_active: isActive })
                .eq('id', id);

            if (error) throw error;

            setSubscribers(prev =>
                prev.map(sub =>
                    sub.id === id ? { ...sub, is_active: isActive } : sub
                )
            );

            toast({
                title: "Success",
                description: `Subscriber ${isActive ? 'activated' : 'deactivated'}`,
            });
        } catch (error) {
            console.error('Error updating subscriber:', error);
            toast({
                title: "Error",
                description: "Failed to update subscriber status",
                variant: "destructive",
            });
        }
    };

    const exportSubscribers = () => {
        const activeSubscribers = subscribers.filter(sub => sub.is_active);
        const csvContent = [
            ['Email', 'Name', 'Subscribed Date'],
            ...activeSubscribers.map(sub => [
                sub.email,
                sub.name || '',
                format(new Date(sub.subscribed_at), 'yyyy-MM-dd')
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `newsletter-subscribers-${format(new Date(), 'yyyy-MM-dd')}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);

        toast({
            title: "Success",
            description: "Subscriber list exported successfully",
        });
    };

    const filteredSubscribers = subscribers.filter(subscriber =>
        subscriber.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (subscriber.name && subscriber.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const activeCount = subscribers.filter(sub => sub.is_active).length;
    const totalCount = subscribers.length;

    if (profileLoading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </AdminLayout>
        );
    }

    if (!isAdmin) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-foreground mb-2">Access Denied</h2>
                        <p className="text-muted-foreground">You need admin privileges to access this page.</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (loading) {
        return (
            <AdminLayout>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">Newsletter Subscribers</h1>
                    </div>
                    <div className="grid gap-4">
                        {[...Array(3)].map((_, i) => (
                            <Card key={i}>
                                <CardContent className="p-6">
                                    <div className="animate-pulse space-y-3">
                                        <div className="h-4 bg-muted rounded w-1/4"></div>
                                        <div className="h-4 bg-muted rounded w-1/2"></div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Newsletter Subscribers</h1>
                        <p className="text-muted-foreground">
                            Manage your newsletter subscriber list
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Badge variant="secondary">
                            {activeCount} active of {totalCount} total
                        </Badge>
                        <Button onClick={exportSubscribers} disabled={activeCount === 0}>
                            <Download className="h-4 w-4 mr-2" />
                            Export CSV
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalCount}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
                            <Mail className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{activeCount}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Inactive Subscribers</CardTitle>
                            <UserX className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{totalCount - activeCount}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search subscribers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Subscribers List */}
                {filteredSubscribers.length === 0 ? (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">
                                {searchQuery ? 'No subscribers found' : 'No subscribers yet'}
                            </h3>
                            <p className="text-muted-foreground">
                                {searchQuery
                                    ? 'Try adjusting your search terms'
                                    : 'Newsletter subscribers will appear here when people sign up.'
                                }
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Subscribers ({filteredSubscribers.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {filteredSubscribers.map((subscriber) => (
                                    <div key={subscriber.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{subscriber.email}</span>
                                                <Badge variant={subscriber.is_active ? "default" : "secondary"}>
                                                    {subscriber.is_active ? "Active" : "Inactive"}
                                                </Badge>
                                            </div>
                                            {subscriber.name && (
                                                <p className="text-sm text-muted-foreground">{subscriber.name}</p>
                                            )}
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Calendar className="h-3 w-3" />
                                                <span>Subscribed {format(new Date(subscriber.subscribed_at), 'PPP')}</span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => toggleSubscriberStatus(subscriber.id, !subscriber.is_active)}
                                        >
                                            {subscriber.is_active ? 'Deactivate' : 'Activate'}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminNewsletter;