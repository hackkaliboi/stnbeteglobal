import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ArrowLeft, Loader2 } from "lucide-react";
import { useBook, useBooks } from "@/hooks/useBooks";

const BookDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { data: book, isLoading: bookLoading } = useBook(id);
    const { data: allBooks = [] } = useBooks();

    // We can infer related books from the same author or just random ones since we removed categories
    const relatedBooks = allBooks
        .filter(b => b.id !== id)
        .slice(0, 4);

    if (bookLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-950/20 dark:via-background dark:to-blue-950/20 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (!book) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-950/20 dark:via-background dark:to-blue-950/20">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Book Not Found</h1>
                        <Link to="/books">
                            <Button variant="outline">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Books
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-950/20 dark:via-background dark:to-blue-950/20">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <Link to="/books" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Books
                </Link>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Book Cover */}
                    <div className="relative">
                        <div className="aspect-[3/4] overflow-hidden bg-muted shadow-2xl" style={{ borderRadius: '50px 0 50px 0' }}>
                            <img
                                src={book.cover_image || "/placeholder.svg"}
                                alt={book.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {book.is_featured && (
                                <Badge variant="secondary">Featured</Badge>
                            )}
                        </div>
                    </div>

                    {/* Book Info */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">{book.title}</h1>
                        <p className="text-xl text-muted-foreground mb-6">by {book.author}</p>

                        <div className="flex flex-col gap-4 max-w-md">
                            <a href={book.selar_url || "#"} target="_blank" rel="noopener noreferrer">
                                <Button size="lg" className="w-full">
                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                    Buy on Selar
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;