import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
    ShoppingCart,
    ArrowLeft,
    Star,
    BookOpen,
    Calendar,
    Building,
    Package,
    Ruler,
    Weight,
    Globe,
    Hash
} from "lucide-react";
import { useBooks } from "@/hooks/useBooks";
import type { Database } from "@/lib/supabase";

type Book = Database['public']['Tables']['books']['Row'];

const BookDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
    const { books } = useBooks();

    useEffect(() => {
        const fetchBook = async () => {
            if (!id) return;

            try {
                const { data, error } = await supabase
                    .from('books')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    console.error('Error fetching book:', error);
                    return;
                }

                setBook(data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    useEffect(() => {
        if (book && books.length > 0) {
            // Get related books from the same category, excluding current book
            const related = books
                .filter(b => b.category === book.category && b.id !== book.id)
                .slice(0, 4);
            setRelatedBooks(related);
        }
    }, [book, books]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-950/20 dark:via-background dark:to-blue-950/20">
                <div className="container mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="aspect-[3/4] bg-muted" style={{ borderRadius: '50px 0 50px 0' }}></div>
                            <div className="space-y-4">
                                <div className="h-8 bg-muted rounded w-3/4"></div>
                                <div className="h-6 bg-muted rounded w-1/2"></div>
                                <div className="h-4 bg-muted rounded w-1/4"></div>
                                <div className="h-20 bg-muted rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
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

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : i < rating
                        ? "fill-yellow-400/50 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
            />
        ));
    };

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
                            {book.is_new && (
                                <Badge variant="secondary">New Release</Badge>
                            )}
                            {book.is_bestseller && (
                                <Badge variant="outline" className="bg-background/90">Bestseller</Badge>
                            )}
                            {!book.in_stock && (
                                <Badge variant="destructive">Out of Stock</Badge>
                            )}
                        </div>
                    </div>

                    {/* Book Information */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm text-muted-foreground uppercase tracking-wider font-mono mb-2">
                                {book.category}
                            </p>
                            <h1 className="text-4xl font-light text-foreground mb-4">
                                {book.title}
                            </h1>
                            <p className="text-xl text-muted-foreground mb-4">
                                by {book.author}
                            </p>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex items-center">
                                    {renderStars(book.rating || 4.2)}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {book.rating?.toFixed(1) || "4.2"} ({book.review_count || 0} reviews)
                                </span>
                            </div>
                        </div>

                        {/* Price and Purchase */}
                        <div className="space-y-4">
                            <div className="text-3xl font-light text-foreground">
                                ${book.price.toFixed(2)}
                            </div>

                            <a
                                href={book.selar_url || `https://selar.co/stnbeteglobal/${book.title.toLowerCase().replace(/\s+/g, '-')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <Button
                                    size="lg"
                                    className="w-full sm:w-auto"
                                    disabled={!book.in_stock}
                                >
                                    <ShoppingCart className="h-5 w-5 mr-2" />
                                    {book.in_stock ? "Buy Now on Selar" : "Out of Stock"}
                                </Button>
                            </a>
                        </div>

                        {/* Quick Details */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-4">Book Details</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                                        <span>{book.pages || 0} pages</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span>{book.publication_year || "2024"}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Building className="h-4 w-4 text-muted-foreground" />
                                        <span>{book.publisher || "stnbeteglobal"}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Package className="h-4 w-4 text-muted-foreground" />
                                        <span>{book.format || "Paperback"}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Globe className="h-4 w-4 text-muted-foreground" />
                                        <span>{book.language || "English"}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Hash className="h-4 w-4 text-muted-foreground" />
                                        <span>{book.edition || "1st Edition"}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Detailed Information Tabs */}
                <Tabs defaultValue="description" className="mb-16">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="mt-6">
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-4">About This Book</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {book.description || "A compelling story that captures the essence of human experience and takes readers on an unforgettable journey. This book explores themes of love, loss, and redemption while weaving together multiple narratives that will keep you engaged from beginning to end."}
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="details" className="mt-6">
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-4">Product Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">ISBN:</span>
                                            <span>{book.isbn || "Not available"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Pages:</span>
                                            <span>{book.pages || 0}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Publisher:</span>
                                            <span>{book.publisher || "stnbeteglobal"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Publication Year:</span>
                                            <span>{book.publication_year || "2024"}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Format:</span>
                                            <span>{book.format || "Paperback"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Dimensions:</span>
                                            <span>{book.dimensions || "6 x 9 inches"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Weight:</span>
                                            <span>{book.weight || "1.2 lbs"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Language:</span>
                                            <span>{book.language || "English"}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="reviews" className="mt-6">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold">Customer Reviews</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center">
                                            {renderStars(book.rating || 4.2)}
                                        </div>
                                        <span className="text-sm text-muted-foreground">
                                            {book.rating?.toFixed(1) || "4.2"} out of 5
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="border-l-4 border-blue-500 pl-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex items-center">
                                                {renderStars(5)}
                                            </div>
                                            <span className="text-sm font-medium">Sarah M.</span>
                                        </div>
                                        <p className="text-muted-foreground text-sm">
                                            "An absolutely captivating read! The author's writing style is engaging and the story kept me hooked from start to finish."
                                        </p>
                                    </div>

                                    <Separator />

                                    <div className="border-l-4 border-blue-500 pl-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex items-center">
                                                {renderStars(4)}
                                            </div>
                                            <span className="text-sm font-medium">Michael R.</span>
                                        </div>
                                        <p className="text-muted-foreground text-sm">
                                            "Great book with excellent character development. Highly recommend for anyone interested in this genre."
                                        </p>
                                    </div>

                                    <div className="text-center pt-4">
                                        <Button variant="outline" size="sm">
                                            View All Reviews
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Related Books */}
                {relatedBooks.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-light mb-8">More from {book.category}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedBooks.map((relatedBook) => (
                                <Link key={relatedBook.id} to={`/books/${relatedBook.id}`} className="group">
                                    <div className="aspect-[3/4] overflow-hidden bg-muted mb-3" style={{ borderRadius: '25px 0 25px 0' }}>
                                        <img
                                            src={relatedBook.cover_image || "/placeholder.svg"}
                                            alt={relatedBook.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <h3 className="font-medium text-foreground group-hover:text-muted-foreground transition-colors line-clamp-1">
                                        {relatedBook.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">{relatedBook.author}</p>
                                    <p className="text-foreground font-medium">${relatedBook.price.toFixed(2)}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookDetails;