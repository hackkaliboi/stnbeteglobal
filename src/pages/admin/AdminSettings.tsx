import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { getAllSiteSettings, updateSiteSetting } from "@/lib/cms";
import {
    Globe,
    Mail,
    Palette,
    Save,
    RefreshCw,
    Loader2
} from "lucide-react";

const AdminSettings = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Site Settings
    const [siteSettings, setSiteSettings] = useState({
        siteName: "",
        siteDescription: "",
        contactEmail: "",
        whatsappNumber: "",
        maintenanceMode: false,
    });

    // Email Settings
    const [emailSettings, setEmailSettings] = useState({
        smtpHost: "",
        smtpPort: "587",
        smtpUser: "",
        smtpPassword: "",
        fromEmail: "",
        fromName: "",
    });

    // SEO Settings
    const [seoSettings, setSeoSettings] = useState({
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        googleAnalyticsId: "",
        facebookPixelId: "",
    });

    // Fetch initial settings
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await getAllSiteSettings();

                setSiteSettings({
                    siteName: data.site_name || "",
                    siteDescription: data.site_description || "",
                    contactEmail: data.contact_email || "",
                    whatsappNumber: data.whatsapp_number || "",
                    maintenanceMode: data.maintenance_mode || false,
                });

                setEmailSettings({
                    smtpHost: data.smtp_host || "",
                    smtpPort: data.smtp_port || "587",
                    smtpUser: data.smtp_user || "",
                    smtpPassword: data.smtp_password || "",
                    fromEmail: data.from_email || "",
                    fromName: data.from_name || "",
                });

                setSeoSettings({
                    metaTitle: data.meta_title || "",
                    metaDescription: data.meta_description || "",
                    metaKeywords: data.meta_keywords || "",
                    googleAnalyticsId: data.google_analytics_id || "",
                    facebookPixelId: data.facebook_pixel_id || "",
                });

            } catch (error) {
                console.error("Failed to load settings:", error);
                toast({
                    title: "Error",
                    description: "Failed to load settings from database.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, [toast]);

    const saveSettingsGroup = async (groupName: string, settings: Record<string, any>) => {
        setSaving(true);
        try {
            // Map camelCase to snake_case keys for database
            const updates = Object.entries(settings).map(([key, value]) => {
                const dbKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
                return updateSiteSetting(dbKey, value);
            });

            await Promise.all(updates);

            toast({
                title: "Success",
                description: `${groupName} have been saved successfully.`,
            });
        } catch (error) {
            console.error(`Failed to save ${groupName}:`, error);
            toast({
                title: "Error",
                description: `Failed to save ${groupName}.`,
                variant: "destructive",
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-full min-h-[500px]">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </AdminLayout>
        );
    }

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

                        <Button onClick={() => saveSettingsGroup("Site settings", siteSettings)} disabled={saving}>
                            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {!saving && <Save className="h-4 w-4 mr-2" />}
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

                        <Button onClick={() => saveSettingsGroup("SEO settings", seoSettings)} disabled={saving}>
                            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {!saving && <Save className="h-4 w-4 mr-2" />}
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

                        <Button onClick={() => saveSettingsGroup("Email settings", emailSettings)} disabled={saving}>
                            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {!saving && <Save className="h-4 w-4 mr-2" />}
                            Save Email Settings
                        </Button>
                    </CardContent>
                </Card>

                {/* System Actions - Kept mocked for now as cache clearing is backend specific */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-1">
                            <RefreshCw className="h-5 w-5" />
                            System Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <h4 className="font-medium">Clear Client Cache</h4>
                                <p className="text-sm text-muted-foreground">
                                    Force browser to reload latest assets
                                </p>
                            </div>
                            <Button variant="outline" onClick={() => window.location.reload()}>
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Reload Page
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
};

export default AdminSettings;