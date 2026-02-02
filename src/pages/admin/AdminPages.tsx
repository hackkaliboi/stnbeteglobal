import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { getPages, createPage, updatePage, deletePage, Page } from "@/lib/cms";
import { Plus, Pencil, Trash2, LayoutTemplate, Loader2, ExternalLink, FileEdit } from "lucide-react";

const AdminPages = () => {
    const { toast } = useToast();
    const [pages, setPages] = useState<Page[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPage, setEditingPage] = useState<Page | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        meta_description: "",
        is_published: true,
    });

    const fetchPages = async () => {
        setLoading(true);
        try {
            const data = await getPages();
            setPages(data);
        } catch (error) {
            console.error("Failed to load pages:", error);
            toast({
                title: "Error",
                description: "Failed to load pages.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPages();
    }, []);

    const handleOpenDialog = (page?: Page) => {
        if (page) {
            setEditingPage(page);
            setFormData({
                title: page.title,
                slug: page.slug,
                meta_description: page.meta_description || "",
                is_published: page.is_published,
            });
        } else {
            setEditingPage(null);
            setFormData({
                title: "",
                slug: "",
                meta_description: "",
                is_published: true,
            });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingPage) {
                await updatePage(editingPage.id, formData);
                toast({ title: "Success", description: "Page metadata updated successfully." });
            } else {
                await createPage(formData);
                toast({ title: "Success", description: "Page created successfully." });
            }
            setIsDialogOpen(false);
            fetchPages();
        } catch (error) {
            console.error("Failed to save page:", error);
            toast({
                title: "Error",
                description: "Failed to save page.",
                variant: "destructive",
            });
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this page? This cannot be undone.")) return;
        try {
            await deletePage(id);
            toast({ title: "Success", description: "Page deleted successfully." });
            fetchPages();
        } catch (error) {
            console.error("Failed to delete page:", error);
            toast({
                title: "Error",
                description: "Failed to delete page.",
                variant: "destructive",
            });
        }
    };

    const handleTitleChange = (title: string) => {
        // Only auto-generate slug if creating a new page and slug is empty or matches previous title
        if (!editingPage && (!formData.slug || formData.slug === formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))) {
            setFormData(prev => ({
                ...prev,
                title,
                slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
            }));
        } else {
            setFormData(prev => ({ ...prev, title }));
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Pages</h1>
                        <p className="text-muted-foreground">
                            Manage website pages and SEO
                        </p>
                    </div>
                    <Button onClick={() => handleOpenDialog()}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Page
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <LayoutTemplate className="h-5 w-5" />
                            All Pages
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex justify-center p-8">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Slug</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pages.map((page) => (
                                        <TableRow key={page.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex flex-col">
                                                    <span>{page.title}</span>
                                                    <span className="text-xs text-muted-foreground truncate max-w-[200px]">{page.meta_description}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-sm font-mono">{page.slug}</TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${page.is_published ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                    }`}>
                                                    {page.is_published ? 'Published' : 'Draft'}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link to={`/admin/pages/edit/${page.slug}`}>
                                                            <FileEdit className="h-4 w-4 mr-2" />
                                                            Edit Content
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(page)} title="Edit Metadata">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" asChild title="View Page">
                                                        <a href={page.slug} target="_blank" rel="noopener noreferrer">
                                                            <ExternalLink className="h-4 w-4" />
                                                        </a>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/90" onClick={() => handleDelete(page.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {pages.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                                No pages found. Create one (e.g., Home, About) to get started.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingPage ? "Edit Page Metadata" : "New Page"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Page Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => handleTitleChange(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input
                                    id="slug"
                                    value={formData.slug}
                                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                    required
                                    placeholder="/about"
                                />
                                <p className="text-xs text-muted-foreground">URL path (e.g. "/" or "/about")</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="meta_description">Meta Description</Label>
                                <Input
                                    id="meta_description"
                                    value={formData.meta_description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                                />
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                                <Switch
                                    id="is_published"
                                    checked={formData.is_published}
                                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
                                />
                                <Label htmlFor="is_published">Published</Label>
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    {editingPage ? "Update Metadata" : "Create Page"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
};

export default AdminPages;
