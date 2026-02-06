import { useState, useEffect } from "react";
import { useCreateBook, useUpdateBook } from "../../hooks/useBooks";
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
import { Switch } from "@/components/ui/switch";
import { Loader2, Upload } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import type { Book } from "../../lib/supabase";

interface BookFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editBook?: Book | null;
}

export function BookFormModal({ open, onOpenChange, editBook }: BookFormModalProps) {
    const { toast } = useToast();
    const createBook = useCreateBook();
    const updateBook = useUpdateBook();

    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Form states
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [selarUrl, setSelarUrl] = useState("");
    const [isFeatured, setIsFeatured] = useState(false);

    useEffect(() => {
        if (editBook) {
            setTitle(editBook.title);
            setAuthor(editBook.author);
            setSelarUrl(editBook.selar_url || "");
            setIsFeatured(editBook.is_featured);
        } else {
            // Reset form for new book
            setTitle("");
            setAuthor("");
            setSelarUrl("");
            setIsFeatured(false);
            setSelectedFile(null);
        }
    }, [editBook, open]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editBook) {
                await updateBook.mutateAsync({
                    id: editBook.id,
                    title,
                    author,
                    selar_url: selarUrl,
                    is_featured: isFeatured,
                    coverFile: selectedFile || undefined
                });
            } else {
                await createBook.mutateAsync({
                    title,
                    author,
                    selar_url: selarUrl,
                    is_featured: isFeatured,
                    coverFile: selectedFile || undefined
                });
            }
            onOpenChange(false);
        } catch (error) {
            console.error("Error submitting form:", error);
            // Toast is handled in hooks
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{editBook ? "Edit Book" : "Add New Book"}</DialogTitle>
                    <DialogDescription>
                        {editBook ? "Update book details." : "Add a new book to your collection."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="author">Author</Label>
                        <Input
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="selarUrl">Selar URL</Label>
                        <Input
                            id="selarUrl"
                            value={selarUrl}
                            onChange={(e) => setSelarUrl(e.target.value)}
                            placeholder="https://selar.co/..."
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch
                            id="featured"
                            checked={isFeatured}
                            onCheckedChange={setIsFeatured}
                        />
                        <Label htmlFor="featured">Featured Book</Label>
                    </div>

                    <div className="space-y-2">
                        <Label>Cover Image</Label>
                        <div className="flex items-center gap-4">
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="cursor-pointer"
                            />
                            {selectedFile ? (
                                <span className="text-xs text-muted-foreground">
                                    {selectedFile.name}
                                </span>
                            ) : null}
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="mr-2">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading || createBook.isPending || updateBook.isPending}>
                            {(loading || createBook.isPending || updateBook.isPending) && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {editBook ? "Save Changes" : "Create Book"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
