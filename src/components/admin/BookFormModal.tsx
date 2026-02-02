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
        isbn: "",
        pages: 0,
        publisher: "stnbeteglobal",
        publication_year: new Date().getFullYear(),
        format: "Paperback",
        dimensions: "6 x 9 inches",
        weight: "1.2 lbs",
        language: "English",
        edition: "1st Edition",
        rating: 4.2,
        review_count: 0,
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
                selar_url: book.selar_url || "",
                isbn: book.isbn || "",
                pages: book.pages || 0,
                publisher: book.publisher || "stnbeteglobal",
                publication_year: book.publication_year || new Date().getFullYear(),
                format: book.format || "Paperback",
                dimensions: book.dimensions || "6 x 9 inches",
                weight: book.weight || "1.2 lbs",
                language: book.language || "English",
                edition: book.edition || "1st Edition",
                rating: book.rating || 4.2,
                review_count: book.review_count || 0,
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
                isbn: "",
                pages: 0,
                publisher: "stnbeteglobal",
                publication_year: new Date().getFullYear(),
                format: "Paperback",
                dimensions: "6 x 9 inches",
                weight: "1.2 lbs",
                language: "English",
                edition: "1st Edition",
                rating: 4.2,
                review_count: 0,
            });
        }
    }, [book, open]);

    const handleInputChange = (field: keyof BookInsert, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.author || !formData.category || formData.price <= 0 || !formData.selar_url || !formData.isbn || formData.pages <= 0) {
            toast({
                title: "Error",
                description: "Please fill in all required fields including title, author, category, price, Selar URL, ISBN, and pages",
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

                    {/* Additional Book Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="isbn">ISBN</Label>
                            <Input
                                id="isbn"
                                value={formData.isbn || ""}
                                onChange={(e) => handleInputChange("isbn", e.target.value)}
                                placeholder="978-0123456789"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pages">Pages</Label>
                            <Input
                                id="pages"
                                type="number"
                                min="0"
                                value={formData.pages || 0}
                                onChange={(e) => handleInputChange("pages", parseInt(e.target.value) || 0)}
                                placeholder="324"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="publisher">Publisher</Label>
                            <Input
                                id="publisher"
                                value={formData.publisher || ""}
                                onChange={(e) => handleInputChange("publisher", e.target.value)}
                                placeholder="stnbeteglobal"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="publication_year">Publication Year</Label>
                            <Input
                                id="publication_year"
                                type="number"
                                min="1900"
                                max="2030"
                                value={formData.publication_year || new Date().getFullYear()}
                                onChange={(e) => handleInputChange("publication_year", parseInt(e.target.value) || new Date().getFullYear())}
                                placeholder="2024"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="format">Format</Label>
                            <Select
                                value={formData.format || "Paperback"}
                                onValueChange={(value) => handleInputChange("format", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select format" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Paperback">Paperback</SelectItem>
                                    <SelectItem value="Hardcover">Hardcover</SelectItem>
                                    <SelectItem value="eBook">eBook</SelectItem>
                                    <SelectItem value="Audiobook">Audiobook</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="language">Language</Label>
                            <Select
                                value={formData.language || "English"}
                                onValueChange={(value) => handleInputChange("language", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="English">English</SelectItem>
                                    <SelectItem value="Spanish">Spanish</SelectItem>
                                    <SelectItem value="French">French</SelectItem>
                                    <SelectItem value="German">German</SelectItem>
                                    <SelectItem value="Italian">Italian</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="dimensions">Dimensions</Label>
                            <Input
                                id="dimensions"
                                value={formData.dimensions || ""}
                                onChange={(e) => handleInputChange("dimensions", e.target.value)}
                                placeholder="6 x 9 inches"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="weight">Weight</Label>
                            <Input
                                id="weight"
                                value={formData.weight || ""}
                                onChange={(e) => handleInputChange("weight", e.target.value)}
                                placeholder="1.2 lbs"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edition">Edition</Label>
                            <Input
                                id="edition"
                                value={formData.edition || ""}
                                onChange={(e) => handleInputChange("edition", e.target.value)}
                                placeholder="1st Edition"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="rating">Rating</Label>
                            <Input
                                id="rating"
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                value={formData.rating || 4.2}
                                onChange={(e) => handleInputChange("rating", parseFloat(e.target.value) || 4.2)}
                                placeholder="4.2"
                            />
                        </div>
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