import { useState, useEffect } from "react";
import { useBooks } from "@/hooks/useBooks";
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

type Book = Database['public']['Tables']['books']['Row'];
type BookInsert = Database['public']['Tables']['books']['Insert'];

interface BookFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    book?: Book | null;
}

const categories = [
    "Fiction",
    "Non-Fiction",
    "Romance",
    "Mystery",
    "Self-Help",
    "Business",
    "Science Fiction",
    "Cooking",
    "Writing",
    "Biography",
    "History",
    "Science",
];

export function BookFormModal({ open, onOpenChange, book }: BookFormModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<BookInsert>({
        title: "",
        author: "",
        price: 0,
        cover_image: "",
        category: "",
        description: "",
        is_new: false,
        is_bestseller: false,
        in_stock: true,
        selar_url: "",
    });

    const { addBook, updateBook } = useBooks();
    const { toast } = useToast();

    const isEditing = !!book;

    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title,
                author: book.author,
                price: book.price,
                cover_image: book.cover_image || "",
                category: book.category,
                description: book.description || "",
                is_new: book.is_new,
                is_bestseller: book.is_bestseller,
                in_stock: book.in_stock,
                selar_url: (book as any).selar_url || "",
            });
        } else {
            setFormData({
                title: "",
                author: "",
                price: 0,
                cover_image: "",
                category: "",
                description: "",
                is_new: false,
                is_bestseller: false,
                in_stock: true,
                selar_url: "",
            });
        }
    }, [book, open]);

    const handleInputChange = (field: keyof BookInsert, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.author || !formData.category || formData.price <= 0 || !formData.selar_url) {
            toast({
                title: "Error",
                description: "Please fill in all required fields including the Selar URL",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            let result;
            if (isEditing && book) {
                result = await updateBook(book.id, formData);
            } else {
                result = await addBook(formData);
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
                    description: `Book ${isEditing ? 'updated' : 'added'} successfully`,
                });
                onOpenChange(false);
            }
        } catch (error) {
            toast({
                title: "Error",
                description: `Failed to ${isEditing ? 'update' : 'add'} book`,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Book' : 'Add New Book'}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? 'Update the book information below.' : 'Fill in the details to add a new book to your inventory.'}
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
                                placeholder="Enter book title"
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">Price *</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.price}
                                onChange={(e) => handleInputChange("price", parseFloat(e.target.value) || 0)}
                                placeholder="0.00"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Category *</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => handleInputChange("category", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cover_image">Cover Image URL</Label>
                        <Input
                            id="cover_image"
                            value={formData.cover_image || ""}
                            onChange={(e) => handleInputChange("cover_image", e.target.value)}
                            placeholder="https://example.com/book-cover.jpg"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="selar_url">Selar Product URL *</Label>
                        <Input
                            id="selar_url"
                            value={formData.selar_url || ""}
                            onChange={(e) => handleInputChange("selar_url", e.target.value)}
                            placeholder="https://selar.co/your-store/book-name"
                        />
                        <p className="text-xs text-muted-foreground">
                            The Selar URL where customers will be redirected to purchase this book
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description || ""}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            placeholder="Enter book description"
                            rows={4}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="in_stock"
                                checked={formData.in_stock}
                                onCheckedChange={(checked) => handleInputChange("in_stock", checked)}
                            />
                            <Label htmlFor="in_stock">In Stock</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="is_new"
                                checked={formData.is_new}
                                onCheckedChange={(checked) => handleInputChange("is_new", checked)}
                            />
                            <Label htmlFor="is_new">New Release</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="is_bestseller"
                                checked={formData.is_bestseller}
                                onCheckedChange={(checked) => handleInputChange("is_bestseller", checked)}
                            />
                            <Label htmlFor="is_bestseller">Bestseller</Label>
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
                            {isEditing ? 'Update Book' : 'Add Book'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}