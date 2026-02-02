import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    ShoppingCart,
    Heart,
    Share2,
    Star,
    ArrowLeft,
    Truck,
    Shield,
    RotateCcw,
    BookOpen,
    Calendar,
    User,
    Tag,
    Loader2
} from "lucide-react";
import { useBooks } from "@/hooks/useBooks";
import { useToast } from "@/hooks/use-toast";
import BookCard from "@/components/books/BookCard";
import { cn } from "@/lib/utils";

const BookDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { books, loading } = useBooks();
    const { toast } = useToast();

    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const book = books.find(b => b.id === id);
    const relatedBooks = books.filter(b => b.id !== id && b.category === book?.category).slice(0, 4);

    useEffect(() => {
        if (!loading && !book && id) {
            // Book not found, redirect to books page
            navigate('/books');
        }
    }, [book, loading, id, navigate]);

    if (loading) {
        return (
            <MainLayout>
                <div className="container mx-auto py-20">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="ml-2 text-muted-foreground">Loading book details...</span>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (!book) {
        return (
            <MainLayout>
                <div className="container mx-auto py-20">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-foreground mb-4">Book Not Found</h1>
                        <p className="text-muted-foreground mb-6">The book you're looking for doesn't exist.</p>
                        <Link to="/books">
                            <Button>Browse All Books</Button>
                        </Link>
                    </div>
                </div>
            </MainLayout>
        );
    }

    const handleAddToCart = () => {
        toast({
            title: "Added to Cart",
            description: `${book.title} has been added to your cart.`,
        });
    };

    const handleWishlist = () => {
        setIsWishlisted(!isWishlisted);
        toast({
            title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
            description: `${book.title} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
        });
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: book.title,
                text: `Check out "${book.title}" by ${book.author}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast({
                title: "Link Copied",
                description: "Book link has been copied to clipboard.",
            });
        }
    };

    // Mock additional images for demonstration
    const bookImages = [
        book.cover_image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=800&fit=crop",
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&h=800&fit=crop",
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=800&fit=crop"
    ];

    return (
        <MainLayout>
            <div className="container mx-auto py-8 md:py-12">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                    <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/books" className="hover:text-foreground transition-colors">Books</Link>
                    <span>/</span>
                    <span className="text-foreground">{book.title}</span>
                </div>

                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="mb-6 -ml-4"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Left Column - Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="aspect-[3/4] overflow-hidden rounded-xl bg-muted">
                            <img
                                src={bookImages[selectedImage]}
                                alt={book.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Thumbnail Images */}
                        <div className="flex gap-2">
                            {bookImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={cn(
                                        "w-20 h-24 rounded-lg overflow-hidden border-2 transition-colors",
                                        selectedImage === index
                                            ? "border-primary"
                                            : "border-transparent hover:border-border"
                                    )}
                                >
                                    <img
                                        src={image}
                                        alt={`${book.title} view ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="space-y-6">
                        {/* Title and Author */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                    {book.category}
                                </Badge>
                                {book.is_new && (
                                    <Badge variant="secondary" className="text-xs">New Release</Badge>
                                )}
                                {book.is_bestseller && (
                                    <Badge className="text-xs">Bestseller</Badge>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                                {book.title}
                            </h1>
                            <p className="text-xl text-muted-foreground mb-4">
                                by <span className="text-foreground font-medium">{book.author}</span>
                            </p>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={cn(
                                                "h-4 w-4",
                                                i < 4 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                            )}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    ({((book as any).rating || 4.2).toFixed(1)} • {(book as any).review_count || 127} reviews)
                                </span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-foreground">
                                ${book.price.toFixed(2)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {book.in_stock ? (
                                    <span className="text-green-600 font-medium">✓ In Stock</span>
                                ) : (
                                    <span className="text-red-600 font-medium">✗ Out of Stock</span>
                                )}
                            </div>
                        </div>

                        {/* Quantity and Actions */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-border rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-3 py-2 hover:bg-muted transition-colors"
                                        disabled={!book.in_stock}
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-2 border-x border-border">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-3 py-2 hover:bg-muted transition-colors"
                                        disabled={!book.in_stock}
                                    >
                                        +
                                    </button>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    Total: ${(book.price * quantity).toFixed(2)}
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    onClick={handleAddToCart}
                                    disabled={!book.in_stock}
                                    className="flex-1"
                                    size="lg"
                                >
                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                    {book.in_stock ? "Add to Cart" : "Out of Stock"}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleWishlist}
                                    size="lg"
                                >
                                    <Heart className={cn(
                                        "h-4 w-4",
                                        isWishlisted && "fill-red-500 text-red-500"
                                    )} />
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleShare}
                                    size="lg"
                                >
                                    <Share2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Truck className="h-4 w-4" />
                                <span>Free Shipping</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Shield className="h-4 w-4" />
                                <span>Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <RotateCcw className="h-4 w-4" />
                                <span>Easy Returns</span>
                            </div>
                        </div>

                        {/* Quick Info */}
                        <Card>
                            <CardContent className="p-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Pages:</span>
                                        <span className="font-medium">324</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Published:</span>
                                        <span className="font-medium">2024</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Publisher:</span>
                                        <span className="font-medium">stnbeteglobal</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Tag className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">ISBN:</span>
                                        <span className="font-medium">978-0123456789</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Tabs Section */}
                <Tabs defaultValue="description" className="mb-16">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews (127)</TabsTrigger>
                        <TabsTrigger value="details">Details</TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="mt-6">
                        <Card>
                            <CardContent className="p-6">
                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                    <p className="text-lg leading-relaxed mb-4">
                                        {book.description || `Discover the captivating world of "${book.title}" by renowned author ${book.author}. This remarkable work takes readers on an unforgettable journey through compelling characters and intricate storytelling.`}
                                    </p>
                                    <p className="leading-relaxed mb-4">
                                        With masterful prose and deep insights into the human condition, this book explores themes of love, loss, redemption, and the power of hope. Each page draws you deeper into a world where every character feels real and every emotion resonates with authenticity.
                                    </p>
                                    <p className="leading-relaxed">
                                        Whether you're a longtime fan of {book.category.toLowerCase()} or new to the genre, this book offers something special for every reader. Its blend of engaging narrative and profound themes makes it a perfect addition to any personal library.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="reviews" className="mt-6">
                        <div className="space-y-6">
                            {/* Review Summary */}
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-6 mb-6">
                                        <div className="text-center">
                                            <div className="text-4xl font-bold text-foreground">4.2</div>
                                            <div className="flex items-center justify-center mb-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={cn(
                                                            "h-4 w-4",
                                                            i < 4 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                            <div className="text-sm text-muted-foreground">127 reviews</div>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            {[5, 4, 3, 2, 1].map((stars) => (
                                                <div key={stars} className="flex items-center gap-2">
                                                    <span className="text-sm w-8">{stars}★</span>
                                                    <div className="flex-1 bg-muted rounded-full h-2">
                                                        <div
                                                            className="bg-yellow-400 h-2 rounded-full"
                                                            style={{ width: `${stars === 5 ? 60 : stars === 4 ? 25 : stars === 3 ? 10 : 3}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm text-muted-foreground w-8">
                                                        {stars === 5 ? 76 : stars === 4 ? 32 : stars === 3 ? 13 : stars === 2 ? 4 : 2}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <Button className="w-full">Write a Review</Button>
                                </CardContent>
                            </Card>

                            {/* Individual Reviews */}
                            <div className="space-y-4">
                                {[
                                    { name: "Sarah Johnson", rating: 5, date: "2 days ago", review: "Absolutely captivating! Couldn't put it down once I started reading." },
                                    { name: "Mike Chen", rating: 4, date: "1 week ago", review: "Great storytelling and well-developed characters. Highly recommend!" },
                                    { name: "Emma Wilson", rating: 5, date: "2 weeks ago", review: "One of the best books I've read this year. The author's writing style is incredible." }
                                ].map((review, index) => (
                                    <Card key={index}>
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <div className="font-medium text-foreground">{review.name}</div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex items-center">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={cn(
                                                                        "h-3 w-3",
                                                                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                                                    )}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="text-sm text-muted-foreground">{review.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground">{review.review}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="details" className="mt-6">
                        <Card>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-foreground">Product Details</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Format:</span>
                                                <span className="font-medium">Paperback</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Pages:</span>
                                                <span className="font-medium">324</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Dimensions:</span>
                                                <span className="font-medium">6 x 9 inches</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Weight:</span>
                                                <span className="font-medium">1.2 lbs</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Language:</span>
                                                <span className="font-medium">English</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-foreground">Publication Info</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Publisher:</span>
                                                <span className="font-medium">stnbeteglobal</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Publication Date:</span>
                                                <span className="font-medium">January 2024</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">ISBN-10:</span>
                                                <span className="font-medium">0123456789</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">ISBN-13:</span>
                                                <span className="font-medium">978-0123456789</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Edition:</span>
                                                <span className="font-medium">1st Edition</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Related Books */}
                {relatedBooks.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-foreground">More in {book.category}</h2>
                            <Link to={`/books?category=${book.category}`}>
                                <Button variant="outline">View All</Button>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedBooks.map((relatedBook) => (
                                <BookCard
                                    key={relatedBook.id}
                                    book={{
                                        ...relatedBook,
                                        coverImage: relatedBook.cover_image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
                                        isNew: relatedBook.is_new,
                                        isBestseller: relatedBook.is_bestseller,
                                        inStock: relatedBook.in_stock
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default BookDetails;