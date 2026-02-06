import { useState, useEffect } from "react";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/lib/supabase";

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert'];

interface PostFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    post?: BlogPost | null;
}

export function PostFormModal({ open, onOpenChange, post }: PostFormModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<BlogPostInsert>({
        title: "",
        excerpt: "",
        content: "",
        author: "",
        image: "",
        category: "General",
        featured: false,
        published: true,
        read_time: "5 min read",
    });

    const { addPost, updatePost } = useBlogPosts();
    const { toast } = useToast();

    const isEditing = !!post;

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title,
                excerpt: post.excerpt,
                content: post.content,
                author: post.author,
                image: post.image || "",
                category: post.category || "General",
                featured: post.featured,
                published: post.published,
                read_time: post.read_time,
            });
        } else {
            setFormData({
                title: "",
                excerpt: "",
                content: "",
                author: "stnbeteglobal Team",
                image: "",
                category: "General",
                featured: false,
                published: true,
                read_time: "5 min read",
            });
        }
    }, [post, open]);

    const handleInputChange = (field: keyof BlogPostInsert, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.excerpt || !formData.content || !formData.author) {
            toast({
                title: "Error",
                description: "Please fill in all required fields",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            let result;
            if (isEditing && post) {
                result = await updatePost(post.id, formData);
            } else {
                result = await addPost(formData);
            }

            if (result.error) {
                toast({
                    title: "Error",
                    description: result.error,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Success",
                    description: `Post ${isEditing ? 'updated' : 'created'} successfully`,
                });
                onOpenChange(false);
            }
        } catch (error) {
            toast({
                title: "Error",
                description: `Failed to ${isEditing ? 'update' : 'create'} post`,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Post' : 'Create New Post'}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? 'Update the blog post information below.' : 'Fill in the details to create a new blog post.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => handleInputChange("title", e.target.value)}
                                placeholder="Enter post title"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="author">Author *</Label>
                            <Input
                                id="author"
                                value={formData.author}
                                onChange={(e) => handleInputChange("author", e.target.value)}
                                placeholder="Enter author name"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="read_time">Read Time</Label>
                        <Input
                            id="read_time"
                            value={formData.read_time}
                            onChange={(e) => handleInputChange("read_time", e.target.value)}
                            placeholder="5 min read"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Featured Image URL</Label>
                        <Input
                            id="image"
                            value={formData.image || ""}
                            onChange={(e) => handleInputChange("image", e.target.value)}
                            placeholder="https://example.com/featured-image.jpg"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="excerpt">Excerpt *</Label>
                        <Textarea
                            id="excerpt"
                            value={formData.excerpt}
                            onChange={(e) => handleInputChange("excerpt", e.target.value)}
                            placeholder="Brief description of the post"
                            rows={3}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">Content *</Label>
                        <Textarea
                            id="content"
                            value={formData.content}
                            onChange={(e) => handleInputChange("content", e.target.value)}
                            placeholder="Write your blog post content here..."
                            rows={12}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="published"
                                checked={formData.published}
                                onCheckedChange={(checked) => handleInputChange("published", checked)}
                            />
                            <Label htmlFor="published">Published</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="featured"
                                checked={formData.featured}
                                onCheckedChange={(checked) => handleInputChange("featured", checked)}
                            />
                            <Label htmlFor="featured">Featured Post</Label>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isEditing ? 'Update Post' : 'Create Post'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}