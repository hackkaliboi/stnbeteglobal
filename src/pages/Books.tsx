import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import BookCard from "@/components/books/BookCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SlidersHorizontal, Loader2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useBooks } from "@/hooks/useBooks";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = ["All", "Fiction", "Non-Fiction", "Romance", "Mystery", "Self-Help", "Business", "Science Fiction", "Cooking", "Writing"];

const Books = () => {
  const { data: books = [], isLoading, error } = useBooks();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();

  const filteredBooks = books
    .filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  return (
    <MainLayout>
      {/* Enhanced Hero Section */}
      <section className="min-h-[60vh] flex items-center bg-gradient-to-br from-background via-blue-50 to-blue-100 dark:from-background dark:via-blue-950/50 dark:to-blue-900/30 pt-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div
              ref={heroRef}
              className={cn(
                "lg:col-span-7 animate-on-scroll-left",
                heroVisible && "is-visible"
              )}
            >
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 font-mono">
                Curated Collection
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-foreground leading-[0.95] tracking-tight mb-6">
                Our
                <br />
                <span className="font-medium">Collection</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
                Browse through our extensive catalog of handpicked books for every reader.
                From bestsellers to hidden gems, discover your next favorite story.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{books.length}+ Titles</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>12 Categories</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>New Arrivals Weekly</span>
                </div>
              </div>
            </div>

            {/* Right Content - Stats */}
            <div
              ref={statsRef}
              className={cn(
                "lg:col-span-4 lg:col-start-9 animate-on-scroll-right",
                statsVisible && "is-visible"
              )}
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-light text-foreground mb-2">{books.length}+</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Books</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-light text-foreground mb-2">12</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-light text-foreground mb-2">2k+</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Readers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-light text-foreground mb-2">15</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-8 md:py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="title">Title: A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters */}
        {(selectedCategory !== "All" || searchQuery) && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {selectedCategory !== "All" && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCategory("All")}>
                {selectedCategory} ×
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchQuery("")}>
                "{searchQuery}" ×
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}>
              Clear all
            </Button>
          </div>
        )}

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"}
          </p>
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={{
                  ...book,
                  coverImage: book.cover_image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
                  isNew: book.is_new,
                  isBestseller: book.is_bestseller,
                  inStock: book.in_stock,
                  selarUrl: book.selar_url,
                  isbn: book.isbn,
                  pages: book.pages,
                  publisher: book.publisher,
                  publicationYear: book.publication_year,
                  format: book.format,
                  dimensions: book.dimensions,
                  weight: book.weight,
                  language: book.language,
                  edition: book.edition,
                  rating: book.rating,
                  reviewCount: book.review_count
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">
              No books found matching your criteria.
            </p>
            <Button onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Books;
