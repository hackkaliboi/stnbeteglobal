import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
    Settings,
    Globe,
    Mail,
    Shield,
    Database,
    Palette,
    Save,
    RefreshCw
} from "lucide-react";

const AdminSettings = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    // Site Settings
    const [siteSettings, setSiteSettings] = useState({
        siteName: "stnbeteglobal",
        siteDescription: "Curated books for curious minds. Explore our collection of bestsellers, new releases, and timeless classics.",
        contactEmail: "hello@stnbeteglobal.com",
        whatsappNumber: "+1234567890",
        maintenanceMode: false,
    });

    // Email Settings
    const [emailSettings, setEmailSettings] = useState({
        smtpHost: "",
        smtpPort: "587",
        smtpUser: "",
        smtpPassword: "",
        fromEmail: "noreply@stnbeteglobal.com",
        fromName: "stnbeteglobal",
    });

    // SEO Settings
    const [seoSettings, setSeoSettings] = useState({
        metaTitle: "stnbeteglobal - Your Premier Online Bookstore",
        metaDescription: "Discover amazing books at stnbeteglobal. From bestsellers to hidden gems, find your next great read.",
        metaKeywords: "books, bookstore, reading, literature, bestsellers",
        googleAnalyticsId: "",
        facebookPixelId: "",
    });

    const handleSaveSiteSettings = async () => {
        setLoading(true);
        try {
            // In a real app, you would save these to your database or config
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

            toast({
                title: "Success",
                description: "Site settings have been saved successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save site settings.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSaveEmailSettings = async () => {
        setLoading(true);
        try {
            // In a real app, you would save these to your database or config
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

            toast({
                title: "Success",
                description: "Email settings have been saved successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save email settings.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSaveSeoSettings = async () => {
        setLoading(true);
        try {
            // In a real app, you would save these to your database or config
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

            toast({
                title: "Success",
                description: "SEO settings have been saved successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save SEO settings.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const clearCache = async () => {
        setLoading(true);
        try {
            // In a real app, you would clear your cache
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

            toast({
                title: "Success",
                description: "Cache has been cleared successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to clear cache.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Settings</h1>
                    <p className="text-muted-foreground">
                        Manage your store settings and configuration
                    </p>
                </div>

                {/* Site Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5" />
                            Site Settings
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="siteName">Site Name</Label>
                                <Input
                                    id="siteName"
                                    value={siteSettings.siteName}
                                    onChange={(e) => setSiteSettings(prev => ({ ...prev, siteName: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="contactEmail">Contact Email</Label>
                                <Input
                                    id="contactEmail"
                                    type="email"
                                    value={siteSettings.contactEmail}
                                    onChange={(e) => setSiteSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="siteDescription">Site Description</Label>
                            <Textarea
                                id="siteDescription"
                                value={siteSettings.siteDescription}
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                                rows={3}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                            <Input
                                id="whatsappNumber"
                                value={siteSettings.whatsappNumber}
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                                placeholder="+1234567890"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Maintenance Mode</Label>
                                <p className="text-sm text-muted-foreground">
                                    Enable to show maintenance page to visitors
                                </p>
                            </div>
                            <Switch
                                checked={siteSettings.maintenanceMode}
                                onCheckedChange={(checked) => setSiteSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                            />
                        </div>

                        <Button onClick={handleSaveSiteSettings} disabled={loading}>
                            <Save className="h-4 w-4 mr-2" />
                            Save Site Settings
                        </Button>
                    </CardContent>
                </Card>

                {/* SEO Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Palette className="h-5 w-5" />
                            SEO & Analytics
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="metaTitle">Meta Title</Label>
                            <Input
                                id="metaTitle"
                                value={seoSettings.metaTitle}
                                onChange={(e) => setSeoSettings(prev => ({ ...prev, metaTitle: e.target.value }))}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="metaDescription">Meta Description</Label>
                            <Textarea
                                id="metaDescription"
                                value={seoSettings.metaDescription}
                                onChange={(e) => setSeoSettings(prev => ({ ...prev, metaDescription: e.target.value }))}
                                rows={3}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="metaKeywords">Meta Keywords</Label>
                            <Input
                                id="metaKeywords"
                                value={seoSettings.metaKeywords}
                                onChange={(e) => setSeoSettings(prev => ({ ...prev, metaKeywords: e.target.value }))}
                                placeholder="Separate keywords with commas"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                                <Input
                                    id="googleAnalyticsId"
                                    value={seoSettings.googleAnalyticsId}
                                    onChange={(e) => setSeoSettings(prev => ({ ...prev, googleAnalyticsId: e.target.value }))}
                                    placeholder="GA-XXXXXXXXX-X"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
                                <Input
                                    id="facebookPixelId"
                                    value={seoSettings.facebookPixelId}
                                    onChange={(e) => setSeoSettings(prev => ({ ...prev, facebookPixelId: e.target.value }))}
                                    placeholder="123456789012345"
                                />
                            </div>
                        </div>

                        <Button onClick={handleSaveSeoSettings} disabled={loading}>
                            <Save className="h-4 w-4 mr-2" />
                            Save SEO Settings
                        </Button>
                    </CardContent>
                </Card>

                {/* Email Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="h-5 w-5" />
                            Email Configuration
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="smtpHost">SMTP Host</Label>
                                <Input
                                    id="smtpHost"
                                    value={emailSettings.smtpHost}
                                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
                                    placeholder="smtp.gmail.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="smtpPort">SMTP Port</Label>
                                <Input
                                    id="smtpPort"
                                    value={emailSettings.smtpPort}
                                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPort: e.target.value }))}
                                    placeholder="587"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="smtpUser">SMTP Username</Label>
                                <Input
                                    id="smtpUser"
                                    value={emailSettings.smtpUser}
                                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpUser: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="smtpPassword">SMTP Password</Label>
                                <Input
                                    id="smtpPassword"
                                    type="password"
                                    value={emailSettings.smtpPassword}
                                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPassword: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fromEmail">From Email</Label>
                                <Input
                                    id="fromEmail"
                                    type="email"
                                    value={emailSettings.fromEmail}
                                    onChange={(e) => setEmailSettings(prev => ({ ...prev, fromEmail: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="fromName">From Name</Label>
                                <Input
                                    id="fromName"
                                    value={emailSettings.fromName}
                                    onChange={(e) => setEmailSettings(prev => ({ ...prev, fromName: e.target.value }))}
                                />
                            </div>
                        </div>

                        <Button onClick={handleSaveEmailSettings} disabled={loading}>
                            <Save className="h-4 w-4 mr-2" />
                            Save Email Settings
                        </Button>
                    </CardContent>
                </Card>

                {/* System Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Database className="h-5 w-5" />
                            System Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <h4 className="font-medium">Clear Cache</h4>
                                <p className="text-sm text-muted-foreground">
                                    Clear all cached data to improve performance
                                </p>
                            </div>
                            <Button variant="outline" onClick={clearCache} disabled={loading}>
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Clear Cache
                            </Button>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <h4 className="font-medium">Database Backup</h4>
                                <p className="text-sm text-muted-foreground">
                                    Create a backup of your database
                                </p>
                            </div>
                            <Button variant="outline" disabled>
                                <Database className="h-4 w-4 mr-2" />
                                Coming Soon
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
};

export default AdminSettings;